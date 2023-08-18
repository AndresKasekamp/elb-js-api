// TODO legendi widget
// TODO pärast lükata view.when() kõigile tööriistadele
// TODO widgeti järjekord paika saada
// TODO memory tabel on lappes css

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
  "./modules/daylight.js",
  "./modules/elevationProfile.js",
  "./modules/measurement.js",
  "./modules/shadowCast.js",
  "./modules/slice.js",
  "./modules/locate.js",
  "./modules/screenShot.js",
  "./modules/memoryTest.js",
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
  initSketch,
  initDaylight,
  initElevationProfile,
  initMeasurement,
  initShadowCast,
  initSlice,
  initLocate,
  initScreenShot,
  initMemoryTest
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
  const basemaps = initLayerList.setupBasemapGallery(view);
  const basemapsExpand = initLayerList.setupExpand(
    "List of Basemaps",
    view,
    basemaps,
    false,
    "top-left"
  );
  view.ui.add(basemapsExpand, "top-left");

  /**************************************
   * Perfomance info
   **************************************/
  // TODO see performance oleks vaja importida ja vaadata mis on reaaselt aktiivne
  // TODO ilmselt peaita mingisuguse tabi taha ka expand
  view.when(() => {
    const expandMemory = initLayerList.setupExpand(
      "Memory",
      view,
      document.getElementById("performanceInfo"),
      false,
      "top-right"
    )
    view.ui.add(expandMemory, "top-right");
    updatePerformanceInfo();
  });

  const updatePerformanceInfo = () => {
    const performanceInfo = view.performanceInfo;
    updateMemoryTitle(
      performanceInfo.usedMemory,
      performanceInfo.totalMemory,
      performanceInfo.quality
    );
    updateTables(performanceInfo);
    setTimeout(updatePerformanceInfo, 1000);
  };

  function updateMemoryTitle(used, total, quality) {
    const title = document.getElementById("title");
    title.innerHTML = `Memory: ${getMB(used)}MB/${getMB(
      total
    )}MB  -  Quality: ${Math.round(100 * quality)} %`;
  }

  function updateTables(stats) {
    const tableMemoryContainer = document.getElementById("memory");
    const tableCountContainer = document.getElementById("count");
    tableMemoryContainer.innerHTML = `<tr>
      <th>Resource</th>
      <th>Memory(MB)</th>
    </tr>`;
    for (let layerInfo of stats.layerPerformanceInfos) {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${
        layerInfo.layer.title
      }</td><td class="center">${getMB(layerInfo.memory)}</td>`;
      tableMemoryContainer.appendChild(row);
    }

    tableCountContainer.innerHTML = `<tr>
      <th>Layer - Features</th>
      <th>Displayed / Max<br>(count)</th>
      <th>Total<br>(count)</th>
    </tr>`;

    for (let layerInfo of stats.layerPerformanceInfos) {
      if (layerInfo.maximumNumberOfFeatures) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${layerInfo.layer.title}`;
        row.innerHTML += `<td class="center">${
          layerInfo.displayedNumberOfFeatures
            ? layerInfo.displayedNumberOfFeatures
            : "-"
        } / ${
          layerInfo.maximumNumberOfFeatures
            ? layerInfo.maximumNumberOfFeatures
            : "-"
        }</td>`;
        row.innerHTML += `<td class="center">${
          layerInfo.totalNumberOfFeatures
            ? layerInfo.totalNumberOfFeatures
            : "-"
        }</td>`;
        tableCountContainer.appendChild(row);
      }
    }
  }

  function getMB(bytes) {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    return Math.round(bytes / megabyte);
  }

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
  const customSearchSource = initSearch.setupCustomSearchSource();
  const searchWidget = initSearch.setupSearchWidget(view, customSearchSource);
  view.ui.add(searchWidget, "top-right");

  /**************************************
   *  Daylight tool
   **************************************/
  const dayLightWidget = initDaylight.setupDaylight(view);
  const expandDlight = initLayerList.setupExpand(
    "Expand daylight",
    view,
    dayLightWidget,
    false,
    "top-left"
  );

  view.ui.add(expandDlight, "top-left");

  /**************************************
   *  Elevation profile
   **************************************/
  const elevationProfileWidget =
    initElevationProfile.setupElevationProfile(view);
  const expandEprofile = initLayerList.setupExpand(
    "Expand elevation profile",
    view,
    elevationProfileWidget,
    false,
    "top-left"
  );

  view.ui.add(expandEprofile, "top-left");

  /**************************************
   *  Measurement 3D
   * TODO custom expand widget ka muuta, aga initimise peab üle vaatama
   **************************************/

  initMeasurement.setupMeasurement(view);

  const expandMeasurement = initLayerList.setupExpand(
    "Measurement toolbar",
    view,
    document.getElementById("topbar"),
    false,
    "top-left"
  );

  view.ui.add(expandMeasurement, "top-left");

  /**************************************
   * Shadow casting
   **************************************/

  const shadowCast = initShadowCast.setupShadowCast(view);

  const expandShadowCast = initLayerList.setupExpand(
    "Shadow casting",
    view,
    shadowCast,
    false,
    "top-left"
  );

  view.ui.add(expandShadowCast, "top-left");

  /**************************************
   * Slicing
   **************************************/

  const slicing = initSlice.setupSlice(view);

  const expandSlicing = initLayerList.setupExpand(
    "Slicing",
    view,
    slicing,
    false,
    "top-left"
  );

  view.ui.add(expandSlicing, "top-left");

  /**************************************
   * Locate
   **************************************/
  const locate = initLocate.setupLocate(view);

  view.ui.add(locate, "top-left");

  /**************************************
   * Screenshot
   **************************************/

  initScreenShot.setupScreenshot(view);

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

  function extrudeSizeChanged(event) {
    // Constructing a new graphic
    let geom = graphicsLayer.graphics.getItemAt(0).geometry;
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
    graphicsLayer.add(p);

    // This did not work
    //extrudedPolygon.symbolLayers[0].size = event.value; // Update extrude size
    //sketchViewModel.polygonSymbol = extrudedPolygon; // Apply updated symbol to SketchViewModel

    // This did not work either
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
