// TODO add Senyang in-ads widget (kontrollida), muuta mõõtmeid
// TODO legendi widget

require([
  "esri/widgets/CoordinateConversion/support/Conversion",
  "esri/widgets/Slider",
  "esri/Graphic",

  "./modules/layers.js",
  "./modules/scene.js",
  "./modules/layerList.js",
  "./modules/coordinate.js",
  "./modules/lineOfSight.js",
  "./modules/search.js",
  "./modules/sketch.js",
], (
  Conversion,
  Slider,
  Graphic,

  initLayers,
  initScene,
  initLayerList,
  initCoordinates,
  initLoS,
  initSearch,
  initSketch
) => {
  /************************************************************
   * Init scene (/w layers) and view
   ************************************************************/

  const graphicsLayer = initLayers.setupGraphicsLayer();
  const communicationTower = initLayers.setupInternalLayer();

  const scene = initScene.setupWebScene(graphicsLayer, communicationTower);
  const view = initScene.setupWebView(scene);

  /**************************************
   * Adding a layer group, expand
   **************************************/
  view.when(() => {
    const layerList = initLayerList.setupLayerList(view);
    const layerListExpand = initLayerList.setupExpand(
      "List of Layers",
      view,
      layerList,
      false,
      "top-left"
    );
    view.ui.add(layerListExpand, "top-left");
  });

  /**************************************
   * Basemap gallery
   **************************************/
  // TODO need viia konstandiks äkki kuhugi
  const basemapIds = [
    "be99602fc02d448eb859a0b426c0d5b6",
    "b6517d264b8f467fa5b14c382dfdf87a",
    "c5773442e91c48c392f28af6600169d0",
    "1bc7e98137fe44129dd6653bef1920d0",
    "287be80ff31d4c8babc48b2f959214f5",
    "4ee7ecad357844bba5b95001de39f1e3",
    "e5c6a086a5ae4d1991d4ca35733fe0ed",
  ];
  const basemaps = initLayerList.setupBasemapGallery(view, basemapIds);
  const basemapsExpand = initLayerList.setupExpand(
    "List of Basemaps",
    view,
    basemaps,
    false,
    "top-left"
  );
  view.ui.add(basemapsExpand, "top-left");
  /**************************************
   *  Coordinate tool

   **************************************/
  view.when(() => {
    const ccWidget = initCoordinates.setupCoordinateWidget(view);
    const numberSearchPattern = /-?\d+[\.]?\d*/;
    const newFormat = initCoordinates.setupNewFormat(numberSearchPattern);
    ccWidget.formats.add(newFormat);

    ccWidget.conversions.splice(0, 0, new Conversion({ format: newFormat }));

    view.ui.add(ccWidget, "bottom-left");
  });

  /**************************************
   * Initialize the LineOfSight widget
   **************************************/
  const lineOfSight = initLoS.setupLoS(view);

  const expandLoS = initLayerList.setupExpand(
    "Expand line of sight widget",
    view,
    lineOfSight,
    false,
    "top-left"
  );

  view.ui.add(expandLoS, "top-left");

  /**************************************
   * Initialize the Search Widget
   **************************************/
  const url = "http://inaadress.maaamet.ee/inaadress/gazetteer/";

  const customSearchSource = initSearch.setupCustomSearchSource(url);
  const searchWidget = initSearch.setupSearchWidget(view, customSearchSource);
  view.ui.add(searchWidget, "top-right");

  /**************************************
   * Sketching (1): Init settings
   **************************************/
  // Set-up event handlers for buttons and click events
  const startbuttons = document.getElementById("startbuttons");
  const actionbuttons = document.getElementById("actionbuttons");
  const edgeoperationbuttons = document.getElementById("edgeoperationbuttons");

  const sliderbutton = document.getElementById("sliderDiv");

  const extrudeSlider = new Slider({
    container: sliderbutton,
    min: 0,
    max: 100,
    steps: 1,
    precision: 0,
    labelFormatFunction: function (value, type) {
      return `${value.toString()} m`; // Format label to show whole numbers
    },
    visibleElements: {
      labels: true,
      rangeLabels: true,
    },
    values: [10],
  });

  const sketchViewModel = initSketch.setupSketchViewModel(view, graphicsLayer);

  // after drawing the geometry, enter the update mode to update the geometry
  // and the deactivate the buttons
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
      sliderbutton.style.display = "inline";
      if (
        event.graphics[0].geometry.type === "polygon" ||
        event.graphics[0].geometry.type === "polyline"
      ) {
        edgeoperationbuttons.style.display = "inline";
        sliderbutton.style.display = "inline";
      }
    }
    if (event.state === "complete") {
      startbuttons.style.display = "inline";
      actionbuttons.style.display = "none";
      edgeoperationbuttons.style.display = "none";
      sliderbutton.style.display = "none";
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
      sliderbutton.style.display = "none";
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

  view.ui.add("sketchPanel", "bottom-right");

  // Update the building layer extrusion
  extrudeSlider.on(["thumb-change", "thumb-drag"], extrudeSizeChanged);

  // TODO vb siiski kutsuda uuendada ja siis teha restartupdatevent vms?
  // TODO või kuidagi listida ja siis matchida aktiivse elemendiga?
  function extrudeSizeChanged(event) {

    //let first = graphicsLayer.graphics._items[0]
    // Constructing a new graphic
    let geom = graphicsLayer.graphics.getItemAt(0).geometry
    let s = {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "extrude",
          size: event.value, // extrude by 10 meters
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
      symbol: s,
    })
    graphicsLayer.add(p)
    graphicsLayer.remove(graphicsLayer.graphics[0])
    
    //extrudedPolygon.symbolLayers[0].size = event.value; // Update extrude size
    //sketchViewModel.polygonSymbol = extrudedPolygon; // Apply updated symbol to SketchViewModel
    /*     sketchViewModel.polygonSymbol.symbolLayers.find(
      (symbolLayer) => symbolLayer.type === "extrude"
    ).size = event.value; */
  }

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
});
