// TODO basemap gallery
// TODO replace coordinate conversion with Z widget
// TODO add Senyang in-ads widget (kontrollida), muuta mõõtmeid
// TODO legendi widget
// TODO peab panema kuulama kui widget avaneb, siis teine läheb kinni

require([
  "esri/widgets/Expand",
  "esri/geometry/Point",
  "esri/Graphic",

  "esri/widgets/Sketch/SketchViewModel",

  "esri/widgets/CoordinateConversion",

  "./modules/layers.js",
  "./modules/scene.js",
  "./modules/layerList.js",
  "./modules/coordinate.js",
  "./modules/lineOfSight.js",
  "./modules/search.js",
], (
  Expand,
  Point,
  Graphic,

  SketchViewModel,

  Conversion,

  layers,
  initScene,
  initLayerList,
  initCoordinates,
  initLoS,
  initSearch
) => {
  /************************************************************
   * Init scene (/w layers) and view
   ************************************************************/

  const graphicsLayer = layers.setupGraphicsLayer();
  const communicationTower = layers.setupInternalLayer();

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
  const ccWidget = initCoordinates.setupCoordinateWidget(view);

  view.ui.add(ccWidget, "bottom-left");

  const numberSearchPattern = /-?\d+[\.]?\d*/;

  const newFormat = initCoordinates.setupNewFormat(numberSearchPattern);
  ccWidget.formats.add(newFormat);

  ccWidget.conversions.splice(0, 0, new Conversion({ format: newFormat }));

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

  // Set-up event handlers for buttons and click events
  const enabledcheckbox = document.getElementById("enabledcheckbox");
  const startbuttons = document.getElementById("startbuttons");
  const actionbuttons = document.getElementById("actionbuttons");
  const edgeoperationbuttons = document.getElementById("edgeoperationbuttons");
  const tooltipOptionsheckbox = document.getElementById(
    "tooltipOptionsheckbox"
  );
  const configurationInfoDiv = document.getElementById("configurationInfoDiv");
  const labelOptionscheckbox = document.getElementById("labelOptionscheckbox");
  const selfsnappingcheckbox = document.getElementById("selfsnappingcheckbox");
  const snappingctrlkey = document.getElementById("snappingctrlkey");
  const featuresnappingcheckbox = document.getElementById(
    "featuresnappingcheckbox"
  );

  // load the default value from the snapping checkbox
  let snappingcheckboxsavedstate = enabledcheckbox.checked ? true : false;

  // define the SketchViewModel and pass in the symbols for each geometry type
  // set the snappingOptions.selfEnabled to the default state
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
      enabled: snappingcheckboxsavedstate,
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

  /**********************************************
   * Sketching (3): UI for snapping
   *********************************************/
  sketchViewModel.watch("snappingOptions.enabled", (newValue) => {
    enabledcheckbox.checked = newValue;
  });

  enabledcheckbox.checked = sketchViewModel.snappingOptions.enabled;
  enabledcheckbox.addEventListener("change", (event) => {
    sketchViewModel.snappingOptions.enabled = event.target.checked
      ? true
      : false;
  });

  tooltipOptionsheckbox.checked = sketchViewModel.tooltipOptions.enabled;
  tooltipOptionsheckbox.addEventListener("change", (event) => {
    sketchViewModel.tooltipOptions.enabled = event.target.checked
      ? true
      : false;
  });

  labelOptionscheckbox.checked = sketchViewModel.labelOptions.enabled;
  labelOptionscheckbox.addEventListener("change", (event) => {
    sketchViewModel.labelOptions.enabled = event.target.checked ? true : false;
  });

  selfsnappingcheckbox.checked = sketchViewModel.snappingOptions.selfEnabled;
  selfsnappingcheckbox.addEventListener("change", (event) => {
    sketchViewModel.snappingOptions.selfEnabled = event.target.checked
      ? true
      : false;
  });

  featuresnappingcheckbox.checked =
    sketchViewModel.snappingOptions.featureEnabled;
  featuresnappingcheckbox.addEventListener("change", (event) => {
    sketchViewModel.snappingOptions.featureEnabled = event.target.checked
      ? true
      : false;
  });

  const configurationExpand = new Expand({
    expandIcon: "gear",
    expandTooltip: "Show configuration",
    expanded: false,
    view: view,
    content: document.getElementById("configurationDiv"),
  });

  // observe the if the CTRL-key got pressed to give the user a visual feedback
  // the logic itself for toggling snapping is in the SketchViewModel
  view.on(["key-down"], (ev) => {
    if (ev.key === "Control") {
      snappingctrlkey.style.fontWeight = "bold";
      snappingctrlkey.style.color = "royalblue";
    }
  });
  view.on(["key-up"], (ev) => {
    if (ev.key === "Control") {
      snappingctrlkey.style.fontWeight = "normal";
      snappingctrlkey.style.color = "black";
    }
  });

  view.ui.add(configurationExpand, "bottom-right");

  configurationInfoDiv.addEventListener("click", (event) => {
    configurationExpand.expand();
  });
  view.ui.add("configurationInfoDiv", "bottom-right");
});
