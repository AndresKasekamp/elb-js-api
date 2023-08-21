// TODO kui tööle saad, siis interface ära muuta

// Graphic UI parameters
const blue = [82, 82, 122, 0.9];
const white = [255, 255, 255, 0.8];
// polygon symbol used for sketching the extruded building footprints
const extrudedPolygon = {
  type: "polygon-3d",
  symbolLayers: [
    {
      type: "extrude",
      size: 10, // extrude by 10 meters
      material: {
        color: white,
      },
      edges: {
        type: "solid",
        size: "3px",
        color: blue,
      },
    },
  ],
};

// polyline symbol used for sketching routes
const route = {
  type: "line-3d",
  symbolLayers: [
    {
      type: "line",
      size: "10px",
      material: {
        color: white,
      },
    },
    {
      type: "line",
      size: "3px",
      material: {
        color: blue,
      },
    },
  ],
};

// point symbol used for sketching points of interest
const point = {
  type: "point-3d",
  symbolLayers: [
    {
      type: "icon",
      size: "30px",
      resource: { primitive: "kite" },
      outline: {
        color: blue,
        size: "3px",
      },
      material: {
        color: white,
      },
    },
  ],
};

define(["esri/widgets/Sketch/SketchViewModel", "esri/widgets/Slider"], (
  SketchViewModel,
  Slider
) => ({
  setupSketch: (view, graphicsLayer) => {
    /**************************************
     * Sketching (1): Init settings
     **************************************/
    // Set-up event handlers for buttons and click events
    const startbuttons = document.getElementById("startbuttons");
    const actionbuttons = document.getElementById("actionbuttons");
    const edgeoperationbuttons = document.getElementById(
      "edgeoperationbuttons"
    );

    const extrudeSlider = new Slider({
      container: "extrudeSlider",
      precision: 2,
      min: 0,
      max: 100,
      steps: 1,
      values: [10],

      /*     labelFormatFunction: function (value, type) {
        return `${value.toString()} m`; // Format label to show whole numbers
      },
      visibleElements: {
        labels: true,
        rangeLabels: true,
      },
      values: [10], */
    });

    const sketchViewModel = new SketchViewModel({
      layer: graphicsLayer,
      view: view,
      pointSymbol: point,
      polygonSymbol: extrudedPolygon,
      polylineSymbol: route,
      defaultCreateOptions: {
        hasZ: true, // default value
      },
      snappingOptions: {
        enabled: true,
        featureSources: [{ layer: graphicsLayer }],
      },
      tooltipOptions: { enabled: true },
      labelOptions: { enabled: true },
      defaultUpdateOptions: {
        tool: "transform",
        enableScaling: true,
        enableZ: true,
      },
    });

    sketchViewModel.on("create", (event) => {
      if (event.state === "complete") {
        startbuttons.style.display = "inline";
        actionbuttons.style.display = "none";
        sketchViewModel.update(event.graphic);
      }
      if (event.state === "cancel") {
        startbuttons.style.display = "inline";
        actionbuttons.style.display = "none";
      }
    });

    sketchViewModel.on("update", (event) => {
      if (event.state === "start") {
        startbuttons.style.display = "none";
        actionbuttons.style.display = "inline";

        if (
          event.graphics[0].geometry.type === "polygon" ||
          event.graphics[0].geometry.type === "polyline"
        ) {
          edgeoperationbuttons.style.display = "inline";
        }
      }
      if (event.state === "complete") {
        startbuttons.style.display = "inline";
        actionbuttons.style.display = "none";
        edgeoperationbuttons.style.display = "none";
      }
    });

    /**********************************************
     * Sketching (2): Drawing UI with configuration
     *********************************************/

    const drawButtons = Array.prototype.slice.call(
      document.getElementsByClassName("starttool")
    );
    const cancelBtn = document.getElementById("cancel");
    const doneBtn = document.getElementById("done");

    // set event listeners to activate sketching graphics
    drawButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        // to activate sketching the create method is called passing in the geometry type
        // from the data-type attribute of the html element
        sketchViewModel.create(event.target.getAttribute("data-type"));
        startbuttons.style.display = "none";
        actionbuttons.style.display = "inline";
      });
    });

    cancelBtn.addEventListener("click", (event) => {
      sketchViewModel.cancel();
    });
    doneBtn.addEventListener("click", (event) => {
      if (sketchViewModel.updateGraphics.length !== 0) {
        sketchViewModel.complete();
      } else {
        sketchViewModel.cancel();
      }
    });

    // Update the building layer extrusion
    extrudeSlider.on(["thumb-change", "thumb-drag"], extrudeSizeChanged);

    function extrudeSizeChanged(event) {
      const value = event.value;
      document.getElementById("extrude").innerHTML = value;
      const extrudedPolygon = sketchViewModel.layer.graphics.getItemAt(0);
      const updatedSymbol = extrudedPolygon.symbol.clone();
      updatedSymbol.symbolLayers.items[0].size = value;
      extrudedPolygon.symbol = updatedSymbol;
      // Constructing a new graphic
      /*     let geom = graphicsLayer.graphics.getItemAt(0).geometry;
    let symStyle = {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "extrude",
          size: event.value,
          material: {
            color: white,
          },
          edges: {
            type: "solid",
            size: "3px",
            color: blue,
          },
        },
      ],
    };
    let p = new Graphic({
      geometry: geom,
      symbol: symStyle,
    });
    graphicsLayer.add(p); */

      // This did not work
      //extrudedPolygon.symbolLayers[0].size = event.value; // Update extrude size
      //sketchViewModel.polygonSymbol = extrudedPolygon; // Apply updated symbol to SketchViewModel

      // This did not work either
      /*     sketchViewModel.polygonSymbol.symbolLayers.find(
      (symbolLayer) => symbolLayer.type === "extrude"
    ).size = event.value; */
    }

    view.ui.add("sketchPanel", "bottom-right");

    // default values for edge/move operations
    let edgeType = "split";
    let shapeType = "move";

    // Handling the configuration for edge operation
    const noneEdgeBtn = document.getElementById("none-edge-button");
    const splitEdgeBtn = document.getElementById("split-edge-button");
    const offsetEdgeBtn = document.getElementById("offset-edge-button");
    noneEdgeBtn.onclick = edgeChangedClickHandler;
    splitEdgeBtn.onclick = edgeChangedClickHandler;
    offsetEdgeBtn.onclick = edgeChangedClickHandler;

    function edgeChangedClickHandler(event) {
      edgeType = event.target.value;

      // handle the buttons
      const buttons = document.getElementsByClassName("edge-button");
      for (const button of buttons) {
        button.classList.remove("edge-button-selected");
      }
      this.classList.add("edge-button-selected");
      restartUpdateMode({
        reshapeOptions: {
          edgeOperation: edgeType,
          shapeOperation: shapeType,
        },
      });
    }

    // Handling the configuration for move operation
    const noneShapeButton = document.getElementById("none-shape-button");
    const moveShapeButton = document.getElementById("move-shape-button");
    noneShapeButton.onclick = shapeChangedClickHandler;
    moveShapeButton.onclick = shapeChangedClickHandler;

    function shapeChangedClickHandler(event) {
      shapeType = event.target.value;

      // handle the buttons
      const buttons = document.getElementsByClassName("shape-button");
      for (const button of buttons) {
        button.classList.remove("shape-button-selected");
      }
      this.classList.add("shape-button-selected");
      restartUpdateMode({
        reshapeOptions: {
          edgeOperation: edgeType,
          shapeOperation: shapeType,
        },
      });
    }

    function restartUpdateMode(updateOptions) {
      sketchViewModel.defaultUpdateOptions = {
        ...sketchViewModel.defaultUpdateOptions,
        ...updateOptions,
      };

      if (sketchViewModel.activeTool) {
        if (
          sketchViewModel.activeTool === "transform" ||
          sketchViewModel.activeTool === "move" ||
          sketchViewModel.activeTool === "reshape"
        ) {
          updateOptions.tool = sketchViewModel.activeTool;
          sketchViewModel.update(
            sketchViewModel.updateGraphics.toArray(),
            updateOptions
          );
        }
      }
    }
  },
}));
