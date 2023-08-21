require([
  "esri/widgets/CoordinateConversion/support/Conversion",
  "esri/widgets/LayerList",
  "esri/widgets/Expand",
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
  // TODO kõik mõistlik läheb selle sisse

  view.when(() => {
    /**************************************
     * Layerlist from scene
     **************************************/
    /*     const layerList = initLayerList.setupLayerList(view);
    const layerListExpand = initLayerList.setupExpand(
      "List of Layers",
      view,
      layerList,
      false,
      "top-left"
    );
    view.ui.add(layerListExpand, "top-left"); */

    /**************************************
     * Layerlist version 2
     * TODO fixi see osa modulaarsemaks
     * TODO järjekord ja opacity peaks olema slider
     **************************************/
    //deifne a layerlist
    const layerList = new LayerList({
      view: view,
      listItemCreatedFunction: defineActions,
    });

    // have the names of the two types of trees
    const layer1Name = "Taimkate analüütiline";
    const layer2Name = "Taimkate realistlik";
    const layersToRemove = [];
    // Build a GroupLayer
    const groupLayer = new GroupLayer({
      title: "Taimkate",
      visible: true,
      visibilityMode: "exclusive",
    });

    async function defineActions(event) {
      const item = event.item;

      // TODO see on vaja fixida funktsiooni ssiise
      await item.layer.when();
      // when the item is the name of the tree,
      // add the layers of the items to the group layer
      if (item.title === layer1Name || item.title === layer2Name) {
        groupLayer.add(item.layer);
        layersToRemove.push(item.layer);
      }

      item.panel = {
        content: "legend",
      };

      item.actionsSections = [
        [
          {
            title: "Increase opacity",
            className: "esri-icon-up",
            id: "increase-opacity",
          },
          {
            title: "Decrease opacity",
            className: "esri-icon-down",
            id: "decrease-opacity",
          },
        ],
      ];
    }

    layerList.on("trigger-action", (event) => {
      const layer = event.item.layer;

      // Capture the action id.
      const id = event.action.id;

      if (id === "increase-opacity") {
        // if the increase-opacity action is triggered, then
        // increase the opacity of the GroupLayer by 0.25

        if (layer.opacity < 1) {
          layer.opacity += 0.25;
        }
      } else if (id === "decrease-opacity") {
        // if the decrease-opacity action is triggered, then
        // decrease the opacity of the GroupLayer by 0.25

        if (layer.opacity > 0) {
          layer.opacity -= 0.25;
        }
      }
    });

    const llExpand = new Expand({
      view: view,
      content: layerList,
    });

    view.ui.add(llExpand, "top-left");

    // Remove the layers
    layersToRemove.forEach((layer) => {
      view.map.remove(layer);
    });

    // Add the GroupLayer to view
    view.map.add(groupLayer);

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
