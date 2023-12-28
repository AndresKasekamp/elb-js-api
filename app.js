// TODO point cloud renderers: https://developers.arcgis.com/javascript/latest/sample-code/layers-pointcloud/

// TODO võrkmudelile luua oma lokaator

// TODO calcite slider sketchile

// TODO hiljem proovida ka vajalike kihtide koosseis säilitada
// TODO seda peaks ilmselt tegema hard codega esialgse seisuga ja siis listide võrdlemine
// TODO los arendus
// TODO kui määrata id title asemel (töökindlam), määrata vb ka kuskil failis? ja jagada läbi selle?
// TODO fronti nupud jäävad jagamisele muutmata, kuidagi peab lahendama, et topelt muutus ei tuleks

require([
  "esri/widgets/CoordinateConversion/support/Conversion",

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

  "./modules/elevation.js",

  "./modules/goToLocation.js",
  "esri/widgets/Measurement",
  "./modules/mediaQuery.js",
], (
  Conversion,

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

  const ortofotoWMS = initLayers.setupWMSLayer();

  const scene = initScene.setupWebScene(
    "92d29869db444e28beab584f696b86c3",
    graphicsLayer,
    ortofotoWMS
  );

  const geologyScene = initScene.setupWebScene(
    "da15a55042b54c31b0208ba98c1647fc"
  );

  const geologyView = initScene.setupWebView(geologyScene);

  const apDTM = initELevation.setupElevationLayer(
    "https://tiles.arcgis.com/tiles/ZYGCYltwz5ExeoGm/arcgis/rest/services/APR_50m_Eesti_tif/ImageServer",
    "Aluspõhi 50m"
  );
  const akDTM = initELevation.setupElevationLayer(
    "https://tiles.arcgis.com/tiles/ZYGCYltwz5ExeoGm/arcgis/rest/services/AKR_50m_2/ImageServer",
    "Aluskord 50m"
  );

  const view = initScene.setupWebView(scene);

  view.when(() => {
    /**************************************
     * Geology layer setup
     **************************************/
    const geologyLayers = initLayers.getGeologyLayers(geologyView);
    const boreholes = geologyLayers.items.find(
      (layer) => layer.title === "Puurkaevud/puuraugud"
    );
    const constructionGeology = geologyLayers.items.find(
      (layer) => layer.title === "Ehitusgeoloogia"
    );
    const geologyWMS = geologyLayers.items.find(
      (layer) => layer.title === "Geoloogia WMS"
    );
    geologyWMS.visible = false;

    // Adding other DTM layers layers
    view.map.ground.layers.addMany([apDTM, akDTM]);

    /**************************************
     * Desc info
     **************************************/

    // TODO kui kakskeelseks teha, siis peaks ilmselt läbi portaali ära kaotama ja tekstid kuhugi lisama
    const { description } = scene.portalItem;
    const itemDesc = document.querySelector("#item-description");
    itemDesc.innerHTML = description;

    /**************************************
     * Built-in UI components
     **************************************/
    view.ui.move("zoom", "top-right");
    view.ui.move("navigation-toggle", "top-right");
    view.ui.move("compass", "top-right");

    /**************************************
     * Line of Sight analysis custom
     **************************************/
    initLoS.getStartPoint(view);

    /**************************************
     * Reworking taimkate logic
     **************************************/

    const treeGroupLayer = initLayers.setupGroupLayer("Taimkate", "exclusive");

    initLayers.taimkateWorkaround(treeGroupLayer, view);

    // Add the GroupLayer to view
    view.map.add(treeGroupLayer);

    /**************************************
     * Layerlist from scene
     **************************************/
    const layerList = initLayerList.setupLayerListMain(view);

    initLayerList.getLayerInfo(layerList, view);

    /**************************************
     * WMS layerlist gallery
     **************************************/
    const wmsLayerList = initLayerList.setupLayerListWMS(view);

    initLayerList.getLayerInfo(wmsLayerList, view);

    /**************************************
     * Basemap gallery
     **************************************/
    const basemaps = initLayerList.setupBasemapGallery(view);

    initLayerList.loadWMStile(basemaps, view);

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

    // Geology WMS
    view.map.add(geologyWMS);

    // TODO exxaggeration ka tuua üle - aga see veits keerulisem
    /**************************************
     * Elevation toolbox
     **************************************/

    initELevation.elevationManipulation(view);

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

    initSketch.setupSketch(view, graphicsLayer);

    /**************************************
     * Reordering layers
     **************************************/

    // Reordering for on-the-fly layers
    view.map.reorder(treeGroupLayer, 6);
    view.map.reorder(geologyGroupLayer, 6);
    view.map.reorder(geologyWMS, -1);

    // Replacing sidemastid location, adding to correct group
    const rajatisedGroup = view.map.findLayerById("180fa46104d-layer-35");
    rajatisedGroup.add(communicationTower);

    /**************************************
     * Collecting visible layers before modification and rerendering
     **************************************/
    const initVisibleLayers = initLayers.getVisibleLayers(view);

    /**************************************
     * Calcite CSS/JS
     **************************************/

    // TODO võiks ka eraldi calcite funktsioonideks kirjutada
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
        const visibleLayersCurrently = initLayers.getVisibleLayers(view);

        const [regularLayers, elevationChanged] =
          initLayers.compareVisibleLayers(
            initVisibleLayers,
            visibleLayersCurrently
          );
        console.log(regularLayers);
        console.log(elevationChanged);

        const sharedLocation = goToLocation.createURL(
          view,
          regularLayers,
          elevationChanged
        );
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
     * Parsing URL if sharing is used
     **************************************/

    // Going to specified location at runtime
    const locationArray = goToLocation.getLocation();
    goToLocation.getUndergroundInfo(view);
    goToLocation.getLayerVisibility(view);
    goToLocation.getElevationVisibility(view);

    if (locationArray !== null) {
      const viewpoint = goToLocation.setupViewPoint(locationArray);
      view.goTo(viewpoint, { animate: false });
    }
  });
});
