// TODO vahetada OF viimane tail WMS vastu välja

require([
  "esri/widgets/CoordinateConversion/support/Conversion",
  "esri/widgets/LayerList",
  "esri/widgets/Expand",
  "esri/widgets/Slider",
  "esri/widgets/Legend",
  "esri/layers/GroupLayer",

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
  LayerList,
  Expand,
  Slider,
  Legend,
  GroupLayer,

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
    /**************************************
     * Layerlist from scene
     **************************************/
    //deifne a layerlist
    const layerList = new LayerList({
      view: view,
      listItemCreatedFunction: defineActions,
    });

    // have the names of the two types of trees
    const taimkateAnalytical = "Taimkate analüütiline";
    const taimkateRealistic = "Taimkate realistlik";
    const layersToRemove = [];
    // Build a GroupLayer
    const treeGroupLayer = new GroupLayer({
      title: "Taimkate",
      visible: true,
      visibilityMode: "exclusive",
    });

    async function defineActions(event) {
      const item = event.item;

      await item.layer.when();

      const itemPanelDiv = document.createElement("div");
      const sliderDiv = document.createElement("div");
      sliderDiv.classList.add("esri-widget");

      // Adds a slider for updating a group layer's opacity
      const slider = new Slider({
        min: 0,
        max: 1,
        precision: 2,
        values: [1],
        visibleElements: {
          labels: true,
          rangeLabels: true,
        },
        container: sliderDiv,
      });

      const legendDiv = document.createElement("div");
      legendDiv.classList.add("esri-widget");
      const legend = new Legend({
        view: view,
        layerInfos: [
          {
            layer: item.layer,
          },
        ],
        container: legendDiv,
      });

      itemPanelDiv.append(sliderDiv, legendDiv);

      // when the item is the name of the tree,
      // add the layers of the items to the group layer
      if (
        item.title === taimkateAnalytical ||
        item.title === taimkateRealistic
      ) {
        treeGroupLayer.add(item.layer);
        layersToRemove.push(item.layer);
      }

      // TODO ilmselt lisada kataster ka siia
      if (
        item.layer.type != "group" ||
        item.title === taimkateAnalytical ||
        item.title === taimkateRealistic
      ) {
        item.panel = {
          content: itemPanelDiv,
          className: "esri-icon-legend",
          open: false,
          title: "Legend and layer opacity",
        };
      }

      slider.on("thumb-drag", (event) => {
        const { value } = event;
        item.layer.opacity = value;
      });

      item.actionsSections = [
        [
          {
            title: "Layer information",
            className: "esri-icon-description",
            id: "information",
          },
        ],
      ];
    }

    layerList.on("trigger-action", (event) => {
      const layer = event.item.layer;

      // Capture the action id.
      const id = event.action.id;

      if (layer.type != "group") {
        if (id === "information") {
          // If the information action is triggered, then
          // open the item details page of the service layer.
          window.open(layer.url);
        }
      }
    });

    // Remove the layers
    layersToRemove.forEach((layer) => {
      view.map.remove(layer);
    });

    // Add the GroupLayer to view
    view.map.add(treeGroupLayer);

    const layerListExpand = initLayerList.setupExpand(
      "List of Layers",
      view,
      layerList,
      false,
      "top-left"
    );
    view.ui.add(layerListExpand, "top-left");

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
     *  Coordinate tool
     **************************************/
    const ccWidget = initCoordinates.setupCoordinateWidget(view);
    const newFormat = initCoordinates.setupNewFormat();
    ccWidget.formats.add(newFormat);

    ccWidget.conversions.splice(0, 0, new Conversion({ format: newFormat }));

    view.ui.add(ccWidget, "bottom-left");

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
     **************************************/

    initMeasurement.setupMeasurement(view);

    const expandMeasurement = initLayerList.setupExpand(
      "Measurement toolbar",
      view,
      document.getElementById("topbar"),
      false,
      "top-left",
      "plans"
    );

    view.ui.add(expandMeasurement, "top-left");

    /**************************************
     * Shadow casting
     **************************************/
    const shadowCast = initShadowCast.setupShadowCast(view);

    const shadowCastBtn = document.getElementById("shadowCastBtn");

    view.ui.add(shadowCastBtn, "top-left");

    shadowCastBtn.addEventListener("click", () => {
      shadowCast.visible = !shadowCast.visible;
      view.ui.add(shadowCast, "top-right");
    });

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
     * Sketching
     **************************************/
    initSketch.setupSketch(view, graphicsLayer);

    /**************************************
     * Perfomance info
     **************************************/

    let isPerformanceInfoVisible = false;
    const performanceMeasureBtn = document.getElementById(
      "performanceMeasureBtn"
    );

    view.ui.add(performanceMeasureBtn, "top-left");
    const performanceMeasureInfo = document.getElementById("performanceInfo");

    //view.ui.remove(performanceMeasureInfo, "top-right")
    performanceMeasureBtn.addEventListener("click", () => {
      if (isPerformanceInfoVisible) {
        performanceMeasureInfo.style.display = "none";
      } else {
        updatePerformanceInfo();
        performanceMeasureInfo.style.display = "inline";
        view.ui.add(performanceMeasureInfo, "top-right");
      }
      // Update the flag to reflect the new visibility state
      isPerformanceInfoVisible = !isPerformanceInfoVisible;
    });
  });

  const updatePerformanceInfo = () => {
    const performanceInfo = view.performanceInfo;

    initMemoryTest.updateMemoryTitle(
      performanceInfo.usedMemory,
      performanceInfo.totalMemory,
      performanceInfo.quality
    );
    initMemoryTest.updateTables(performanceInfo);
    setTimeout(updatePerformanceInfo, 1000);
  };
});
