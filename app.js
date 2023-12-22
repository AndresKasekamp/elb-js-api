// TODO point cloud renderers: https://developers.arcgis.com/javascript/latest/sample-code/layers-pointcloud/
// TODO scrolling panel ei tööta?
// TODO ilmselt WMS kihid eraldi gruppi lisada, kataster ja kpo jne
// TODO kas remove või hide ilmselt või disable layerile

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

  "./modules/legend.js",
  "./modules/elevation.js",

  "./modules/goToLocation.js",
  "esri/widgets/Measurement",
  "./modules/mediaQuery.js"
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
  initLegend,
  initELevation,
  goToLocation,
  Measurement,
  initMediaQuery
) => {
  /************************************************************
   * Init scene (/w layers) and view
   ************************************************************/
  // const mediaQuery = window.matchMedia('(max-width: 768px)');
  // initMediaQuery.handleMediaQueryChange(mediaQuery)
  // mediaQuery.addEventListener(initMediaQuery.handleMediaQueryChange);

  const graphicsLayer = initLayers.setupGraphicsLayer();

  const communicationTower = initLayers.setupInternalLayer(
    "66e382030b224ffa999249a4d1cbbf4f",
    "Sidemastid"
  );
  communicationTower.visible = true;

  const boreholes = initLayers.setupInternalLayer(
    "3636989db65e4f749dea778829bf30b5",
    "Puuraugud"
  );
  boreholes.visible = true;
  const constructionGeology = initLayers.setupInternalLayer(
    "faab65d9d2d84e45a704b33ab763166a",
    "Ehitusgeoloogia"
  );
  constructionGeology.visible = true;

  const ortofotoWMS = initLayers.setupWMSLayer();

  const scene = initScene.setupWebScene(graphicsLayer, ortofotoWMS);

  const view = initScene.setupWebView(scene);



  /**************************************
   * Adding a layer group, expand
   **************************************/
  view.when(() => {
    // Media query


    // Going to specified location at runtime
    const locationArray = goToLocation.getLocation();

    if (locationArray !== null) {
      const viewpoint = goToLocation.setupViewPoint(locationArray);
      view.goTo(viewpoint, { animate: false });
    }

    const { title, description, thumbnailUrl, avgRating } = scene.portalItem;
    document.querySelector("#header-title").textContent = title;
    document.querySelector("#item-description").innerHTML = description;
    document.querySelector("#item-thumbnail").src = thumbnailUrl;
    document.querySelector("#item-rating").value = avgRating;

    /**************************************
     * Built-in UI components
     **************************************/
    view.ui.move("zoom", "top-right");
    view.ui.move("navigation-toggle", "top-right");
    view.ui.move("compass", "top-right");
    /**************************************
     * Calcite CSS/JS
     **************************************/

    const shadowCast = initShadowCast.setupShadowCast(view);

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
      if (nextWidget !== activeWidget) {
        document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
        document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
        activeWidget = nextWidget;
      } else {
        activeWidget = null;
      }

      if (nextWidget === "shadowCast") {
        shadowCast.visible = !shadowCast.visible;
      }

      if (nextWidget === "share") {
        const sharedLocation = goToLocation.createURL(view);
        goToLocation.copyTextToClipboard(sharedLocation);

        // Displaying popup
        const shareMapAlert = document.getElementById("share-map-alert");
        shareMapAlert.open = "true";
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
      const [itemPanelDiv, sliderDiv] = initSlider.setupSliderStyle(item);

      // Legend settings
      const legendDiv = initLegend.setupLegendStyle();
      initLegend.setupLegend(view, item.layer, legendDiv);

      itemPanelDiv.append(sliderDiv, legendDiv);

      if (item.title === "Kataster" || item.title === "Kitsendused" || item.title === "Kitsendusi põhjustavad objektid") {
        item.hidden = true;
      }
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

      sliderDiv.addEventListener("calciteSliderInput", () => {
        const value = sliderDiv.value / 100;
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

    /**************************************
     * WMS layerlist gallery
     **************************************/
    // define a layerlist
    const wmsLayerList = new LayerList({
      view,
      container: "wms-layers-container",
      listItemCreatedFunction: defineActions2,
    });

    async function defineActions2(e) {
      const item = e.item;

      await item.layer.when();

      // Slider settings
      const [itemPanelDiv, sliderDiv] = initSlider.setupSliderStyle(item);

      // Legend settings
      const legendDiv = initLegend.setupLegendStyle();
      initLegend.setupLegend(view, item.layer, legendDiv);

      itemPanelDiv.append(sliderDiv, legendDiv);

      if (item.title !== "Kataster" && item.title !== "Kitsendused" && item.title !== "Kitsendusi põhjustavad objektid") {
        item.hidden = true;
      }
      // when the item is the name of the tree,
      // add the layers of the items to the group layer

      sliderDiv.addEventListener("calciteSliderInput", () => {
        const value = sliderDiv.value / 100;
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

    initLayerList.getLayerInfo(wmsLayerList);

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
    /**************************************
     * Elevation toolbox
     **************************************/

    initELevation.elevationManipulation(scene);

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
    initSearch.setupSearchWidget(view, customSearchSource);

    /**************************************
     * Initialize daylight
     **************************************/

    initDaylight.setupDaylight(view);

    /**************************************
     *  Elevation profile
     **************************************/

    initElevationProfile.setupElevationProfile(view);

    /**************************************
     *  Measurement 3D
     **************************************/
    const measurement = new Measurement({
      view,
      container: "measurement-container",
    });

    initMeasurement.setupMeasurement(measurement);

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

    // Reordering for on-the-fly layers
    view.map.reorder(treeGroupLayer, 8);
    view.map.reorder(geologyGroupLayer, 6);

    // Replacing sidemastid location, adding to correct group
    const rajatisedGroup = view.map.findLayerById("180fa46104d-layer-35");
    rajatisedGroup.add(communicationTower);
  });
});
