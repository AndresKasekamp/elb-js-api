// TODO point cloud renderers: https://developers.arcgis.com/javascript/latest/sample-code/layers-pointcloud/

// TODO elementide ümberjärjestmaine teha

// TODO kui geoloogia andmed lisada, siis arvatavasti erinev layerList luua
// TODO natuke UI teha ja vidinad paremale/in ads vasakule

// TODO kui joonistatud kihi all ei ole veel ühtegi üksust, siis võtta ära menüüdst
// TODO mingi kerge ülemine navigation bar teha (infoaken) ja proovi muuta vidiane värvi ja kujundust kasvõi natuke

// TODO kihtide järjekord paika seada (miks peab olema asünkroonne?)

require([
  "esri/widgets/CoordinateConversion/support/Conversion",

  "esri/widgets/LayerList",

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
  "./modules/slider.js",
  "./modules/locate.js",
  "./modules/memoryTest.js",
  "./modules/legend.js",
], (
  Conversion,

  LayerList,

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
  initSlider,
  initLocate,
  initMemoryTest,
  initLegend
) => {
  /************************************************************
   * Init scene (/w layers) and view
   ************************************************************/

  const graphicsLayer = initLayers.setupGraphicsLayer();
  const communicationTower = initLayers.setupInternalLayer(
    "66e382030b224ffa999249a4d1cbbf4f",
    "Sidemastid"
  );
  const boreholes = initLayers.setupInternalLayer(
    "e1ceb1c5197b401e88deba0888f97000",
    "Puuraugud"
  );
  const constructionGeology = initLayers.setupInternalLayer(
    "35026f30f1d94e438110ad23b8dfb1fa",
    "Ehitusgeoloogia"
  );

  const ortofotoWMS = initLayers.setupWMSLayer();

  const scene = initScene.setupWebScene(
    graphicsLayer,
    communicationTower,
    ortofotoWMS
  );

  const view = initScene.setupWebView(scene);

  /**************************************
   * Adding a layer group, expand
   **************************************/

  view.when(() => {
    /**************************************
     * Layerlist from scene
     **************************************/
    // deifne a layerlist
    const layerList = new LayerList({
      view,
      listItemCreatedFunction: defineActions,
    });

    const treeGroupLayer = initLayers.setupGroupLayer("Taimkate", "exclusive");

    async function defineActions(e) {
      const taimkateAnalytical = "Taimkate analüütiline";
      const taimkateRealistic = "Taimkate realistlik";

      const item = e.item;

      await item.layer.when();

      // Slider settings
      const [itemPanelDiv, sliderDiv] = initSlider.setupSliderStyle();
      const slider = initSlider.setupSlider(sliderDiv, true);

      // Legend settings
      const legendDiv = initLegend.setupLegendStyle();
      initLegend.setupLegend(view, item.layer, legendDiv);

      itemPanelDiv.append(sliderDiv, legendDiv);

      // when the item is the name of the tree,
      // add the layers of the items to the group layer
      if (
        item.title === taimkateAnalytical ||
        item.title === taimkateRealistic
      ) {
        treeGroupLayer.add(item.layer);
        view.map.remove(item.layer);
      }

      if (
        item.layer.type !== "group" ||
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

    // Add the GroupLayer to view
    view.map.add(treeGroupLayer);

    /**************************************
     * LayerList
     **************************************/

    initLayerList.getLayerInfo(layerList);

    const layerListExpand = initLayerList.setupExpand(
      "List of Layers",
      view,
      layerList,
      false,
      "top-right"
    );
    view.ui.add(layerListExpand, "top-right");

    /**************************************
     * Basemap gallery
     **************************************/
    const basemaps = initLayerList.setupBasemapGallery(view);
    const basemapsExpand = initLayerList.setupExpand(
      "List of Basemaps",
      view,
      basemaps,
      false,
      "top-right"
    );
    view.ui.add(basemapsExpand, "top-right");

    // Ortophoto WMS activated if zoom is close enough
    basemaps.watch("activeBasemap", () => {
      const isOrtofoto = basemaps.activeBasemap.title === "Ortofoto";

      view.watch("zoom", () => {
        scene.layers.forEach((layer) => {
          if (layer.title === "Ortofoto WMS") {
            layer.visible = isOrtofoto && view.zoom >= 12.5;
          }
        });
      });
    });

    /**************************************
     * Geology layer group
     **************************************/

    // Creating a geology layer group
    const geologyGroupLayer = initLayers.setupGroupLayer(
      "Geoloogia",
      "independent"
    );
    geologyGroupLayer.addMany([boreholes, constructionGeology]);

    // Adding a geology layer group to view
    view.map.add(geologyGroupLayer);

    // TODO exxaggeration ka tuua üle - aga see veits keerulisem
    // TODO modulariseeri
    /**************************************
     * Elevation toolbox
     **************************************/

    const opacitySlider = initSlider.setupSlider("opacitySlider", false);

    // Update the building layer extrusion
    opacitySlider.on(["thumb-change", "thumb-drag"], opacityChanged);

    function opacityChanged(event) {
      const value = event.value;
      document.getElementById("opacity").innerHTML = value;
      scene.ground.opacity = event.value;
    }

    // const opacityInput = document.getElementById("opacityInput");
    const navigateUndergroundInput = document.getElementById(
      "navigationUnderground"
    );
    const elevationInput = document.getElementById("elevationInput");

    navigateUndergroundInput.addEventListener("change", (event) => {
      scene.ground.navigationConstraint.type = event.target.checked
        ? "none"
        : "stay-above";
    });

    // Elevation on /ff
    elevationInput.addEventListener("change", updateElevation);

    function updateElevation(e) {
      // Turn ground layers visibility on/off
      scene.ground.layers.forEach((layer) => {
        layer.visible = e.target.checked;
      });
    }

    const elevationSettingsExpand = initLayerList.setupExpand(
      "Elevation settings",
      view,
      document.getElementById("elevationMenu"),
      false,
      "top-right",
      "sky-plot"
    );

    view.ui.add(elevationSettingsExpand, "top-right");

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
      "top-right"
    );

    view.ui.add(expandLoS, "top-right");

    /**************************************
     * Initialize the Search Widget
     **************************************/
    const customSearchSource = initSearch.setupCustomSearchSource();
    const searchWidget = initSearch.setupSearchWidget(view, customSearchSource);
    view.ui.add(searchWidget, "top-left");

    /**************************************
     *  Daylight tool
     **************************************/
    const dayLightWidget = initDaylight.setupDaylight(view);
    const expandDlight = initLayerList.setupExpand(
      "Expand daylight",
      view,
      dayLightWidget,
      false,
      "top-right"
    );

    view.ui.add(expandDlight, "top-right");

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
      "top-right"
    );

    view.ui.add(expandEprofile, "top-right");

    /**************************************
     *  Measurement 3D
     **************************************/

    initMeasurement.setupMeasurement(view);

    const expandMeasurement = initLayerList.setupExpand(
      "Measurement toolbar",
      view,
      document.getElementById("topbar"),
      false,
      "top-right",
      "plans"
    );

    view.ui.add(expandMeasurement, "top-right");

    /**************************************
     * Shadow casting
     **************************************/
    const shadowCast = initShadowCast.setupShadowCast(view);

    const shadowCastBtn = document.getElementById("shadowCastBtn");

    view.ui.add(shadowCastBtn, "top-right");

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
      "top-right"
    );

    view.ui.add(expandSlicing, "top-right");

    /**************************************
     * Locate
     **************************************/
    const locate = initLocate.setupLocate(view);

    view.ui.add(locate, "top-right");

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

    view.ui.add(performanceMeasureBtn, "top-right");
    const performanceMeasureInfo = document.getElementById("performanceInfo");
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

    // Reordering for on-the-fly layers
    view.map.reorder(treeGroupLayer, 8);
    view.map.reorder(geologyGroupLayer, 6);

    view.ui.move("zoom", "top-left");
    view.ui.move("navigation-toggle", "top-left");
    view.ui.move("compass", "top-left");
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
