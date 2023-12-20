// TODO point cloud renderers: https://developers.arcgis.com/javascript/latest/sample-code/layers-pointcloud/

// TODO infopaneel appi kohta ka ilmselt lisada

// TODO legend ja opacity slider ei tule enam kaasa CASCADE CSS-ga

// TODO elevation migration

// TODO daylight ja measurements eraldi tõsta

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
     * Calcite CSS/JS
     **************************************/

    const shadowCast = initShadowCast.setupShadowCast(view);
    const daylight = initDaylight.setupDaylight(view);

    let activeWidget;

    const handleActionBarClick = ({ target }) => {
      if (target.tagName !== "CALCITE-ACTION") {
        return;
      }

      if (activeWidget) {
        document.querySelector(
          `[data-action-id=${activeWidget}]`
        ).active = false;
        document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
      }

      const nextWidget = target.dataset.actionId;
      console.log("Next widget", nextWidget);
      if (nextWidget !== activeWidget) {
        document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
        document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
        activeWidget = nextWidget;
      } else {
        activeWidget = null;
      }

      if (nextWidget === "shadowCast") {
        shadowCast.visible = !shadowCast.visible;
        view.ui.add(shadowCast, "top-right");
      }

      if (nextWidget === "daylight") {
        daylight.visible = !daylight.visible;
        view.ui.add(daylight, "top-right");
      }

    };

    document
      .querySelector("calcite-action-bar")
      .addEventListener("click", handleActionBarClick);

    let actionBarExpanded = false;

    document.addEventListener("calciteActionBarToggle", (event) => {
      actionBarExpanded = !actionBarExpanded;
      view.padding = {
        left: actionBarExpanded ? 135 : 49,
      };
    });

    /**************************************
     * Layerlist from scene
     **************************************/
    // deifne a layerlist
    const layerList = new LayerList({
      view,
      container: "layers-container",
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
    // opacitySlider.on(["calciteSliderChange"], opacityChanged);

    function opacityChanged(event) {
      const value = event.value;
      document.getElementById("opacity").innerHTML = value;
      scene.ground.opacity = event.value;
    }

    const navigateUndergroundInput = document.getElementById(
      "navigationUnderground"
    );
    const elevationInput = document.getElementById("elevationInput");

    navigateUndergroundInput.addEventListener("calciteCheckboxChange", (event) => {
      console.log("Navigation changed")
      scene.ground.navigationConstraint.type = event.target.checked
        ? "none"
        : "stay-above";
    });

    // navigateUndergroundInput.addEventListener("change", (event) => {
    //   console.log("Navigation changed")
    //   scene.ground.navigationConstraint.type = event.target.checked
    //     ? "none"
    //     : "stay-above";
    // });

    // Elevation on /ff
    // elevationInput.addEventListener("change", updateElevation);
    elevationInput.addEventListener("calciteCheckboxChange", updateElevation);

    function updateElevation(e) {
      // Turn ground layers visibility on/off
      scene.ground.layers.forEach((layer) => {
        layer.visible = e.target.checked;
      });
    }

    /**************************************
     *  Coordinate tool
     **************************************/
    const ccWidget = initCoordinates.setupCoordinateWidget(view);
    const newFormat = initCoordinates.setupNewFormat();
    ccWidget.formats.add(newFormat);

    ccWidget.conversions.splice(0, 0, new Conversion({ format: newFormat }));

    view.ui.add(ccWidget, "bottom-right");

    /**************************************
     * Initialize the LineOfSight widget
     **************************************/
    initLoS.setupLoS(view);

    /**************************************
     * Initialize the Search Widget
     **************************************/
    const customSearchSource = initSearch.setupCustomSearchSource();
    const searchWidget = initSearch.setupSearchWidget(view, customSearchSource);
    view.ui.add(searchWidget, "bottom-right");

    /**************************************
     *  Daylight tool
     **************************************/
    initDaylight.setupDaylight(view);

    /**************************************
     *  Elevation profile
     **************************************/

    initElevationProfile.setupElevationProfile(view);

    /**************************************
     *  Measurement 3D
     **************************************/

    initMeasurement.setupMeasurement(view);

    /**************************************
     * Shadow casting
     **************************************/
    // TODO selle migreerumine ebaõnnestus, peab vaatama kas õnnestub skripti calcite ikooni avamisel runnida
    // const shadowCast = initShadowCast.setupShadowCast(view);

    // // const shadowCastBtn = document.getElementById("shadowcast-container");
    // const shadowCastBtn = document.getElementById("shadowCastBtn");
    // // const shadowCastBtn = document.getElementById("shadowCast");

    // view.ui.add(shadowCastBtn, "top-right");

    // shadowCastBtn.addEventListener("click", () => {
    //   console.log("Here");
    //   shadowCast.visible = !shadowCast.visible;
    //   view.ui.add(shadowCast, "top-right");
    // });

    /**************************************
     * Slicing
     **************************************/

    initSlice.setupSlice(view);

    /**************************************
     * Locate
     **************************************/
    const locate = initLocate.setupLocate(view);

    view.ui.add(locate, "top-right");

    /**************************************
     * Sketching
     **************************************/
    // TODO peab koodi sisse vaatama, et kuidas elemendid defineerida ja expand loogiliselt töötaks
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

    view.ui.move("zoom", "bottom-right");
    view.ui.move("navigation-toggle", "bottom-right");
    view.ui.move("compass", "bottom-right");
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
