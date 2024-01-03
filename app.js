// TODO point cloud renderers: https://developers.arcgis.com/javascript/latest/sample-code/layers-pointcloud/

// TODO võrkmudelile luua oma lokaator

// TODO calcite slider sketchile

// TODO hiljem proovida ka vajalike kihtide koosseis säilitada
// TODO seda peaks ilmselt tegema hard codega esialgse seisuga ja siis listide võrdlemine
// TODO los arendus
// TODO kui määrata id title asemel (töökindlam), määrata vb ka kuskil failis? ja jagada läbi selle?
// TODO fronti nupud jäävad jagamisele muutmata, kuidagi peab lahendama, et topelt muutus ei tuleks
// TODO kuidagi läbi tekkinud bugi (otsides basemap mis pole allLayers all tekkis olukord, kus visibility muutus ja jäi nahk kihiks), proovida taasluua nupp, mis kasutaks ära seda käitumist
// TODO uurida mis state on ja kuidas seda kasutada, et teha tühi basemap võimalus kasutajale, ilmselt peab basemaps ka eraldi parameetrina välja tooma
// TODO ilmselt peab muutma activeBasemap hübriidiks vms

// Esri imports
import Conversion from "@arcgis/core/widgets/CoordinateConversion/support/Conversion.js";
import Measurement from "@arcgis/core/widgets/Measurement.js";

// Local imports
import {
  setupGraphicsLayer,
  setupInternalLayer,
  setupWMSLayer,
  getGeologyLayers,
  setupGroupLayer,
  taimkateWorkaround,
  getVisibleLayers,
  compareVisibleLayers,
} from "./modules/layers.js";
import { setupWebScene, setupWebView } from "./modules/scene.js";
import {
  setupLayerListMain,
  setupLayerListWMS,
  setupBasemapGallery,
  loadWMStile,
  getLayerInfo,
} from "./modules/layerList";
import { setupCoordinateWidget, setupNewFormat } from "./modules/coordinate.js";
import { setupLoS, getStartPoint } from "./modules/lineOfSight.js";
import {
  setupCustomSearchSource,
  setupSearchWidget,
} from "./modules/search.js";
import { setupSketch } from "./modules/sketch.js";
import { setupDaylight } from "./modules/daylight.js";
import { setupElevationProfile } from "./modules/elevationProfile.js";
import { setupMeasurement } from "./modules/measurement.js";
import { setupShadowCast } from "./modules/shadowCast.js";
import { setupSlice } from "./modules/slice.js";
import { setupLocate } from "./modules/locate.js";
import {
  elevationManipulation,
  setupElevationLayer,
} from "./modules/elevation.js";
import {
  getUndergroundInfo,
  getLayerVisibility,
  getElevationVisibility,
  getLocation,
  copyTextToClipboard,
  createURL,
  setupViewPoint,
} from "./modules/goToLocation.js";

/************************************************************
 * Init scene (/w layers) and view
 ************************************************************/
// const mediaQuery = window.matchMedia('(max-width: 768px)');
// initMediaQuery.handleMediaQueryChange(mediaQuery)
// mediaQuery.addEventListener(initMediaQuery.handleMediaQueryChange);

const graphicsLayer = setupGraphicsLayer();

const communicationTower = setupInternalLayer(
  "66e382030b224ffa999249a4d1cbbf4f",
  "Sidemastid"
);

const ortofotoWMS = setupWMSLayer();

const scene = setupWebScene(
  "92d29869db444e28beab584f696b86c3",
  graphicsLayer,
  ortofotoWMS
);

const geologyScene = setupWebScene("da15a55042b54c31b0208ba98c1647fc");

const geologyView = setupWebView(geologyScene);

const apDTM = setupElevationLayer(
  "https://tiles.arcgis.com/tiles/ZYGCYltwz5ExeoGm/arcgis/rest/services/APR_50m_Eesti_tif/ImageServer",
  "Aluspõhi 50m"
);
const akDTM = setupElevationLayer(
  "https://tiles.arcgis.com/tiles/ZYGCYltwz5ExeoGm/arcgis/rest/services/AKR_50m_2/ImageServer",
  "Aluskord 50m"
);

const view = setupWebView(scene);

view.when(() => {
  /**************************************
   * Geology layer setup
   **************************************/
  const geologyLayers = getGeologyLayers(geologyView);
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
  getStartPoint(view);

  /**************************************
   * Reworking taimkate logic
   **************************************/

  const treeGroupLayer = setupGroupLayer("Taimkate", "exclusive");

  taimkateWorkaround(treeGroupLayer, view);

  // Add the GroupLayer to view
  view.map.add(treeGroupLayer);

  /**************************************
   * Layerlist from scene
   **************************************/
  const layerList = setupLayerListMain(view);

  getLayerInfo(layerList, view);

  /**************************************
   * WMS layerlist gallery
   **************************************/
  const wmsLayerList = setupLayerListWMS(view);

  getLayerInfo(wmsLayerList, view);

  /**************************************
   * Basemap gallery
   **************************************/
  const basemaps = setupBasemapGallery(view);

  loadWMStile(basemaps, view);

  /**************************************
   * Geology layer group
   **************************************/

  // Creating a geology layer group
  const geologyGroupLayer = setupGroupLayer("Geoloogia", "independent");
  geologyGroupLayer.addMany([boreholes, constructionGeology]);

  // Adding a geology layer group to view
  view.map.add(geologyGroupLayer);

  // Geology WMS
  view.map.add(geologyWMS);

  // TODO exxaggeration ka tuua üle - aga see veits keerulisem
  /**************************************
   * Elevation toolbox
   **************************************/

  elevationManipulation(view);

  /**************************************
   *  Coordinate tool
   **************************************/
  const ccWidget = setupCoordinateWidget(view);
  const newFormat = setupNewFormat();
  ccWidget.formats.add(newFormat);

  ccWidget.conversions.splice(0, 0, new Conversion({ format: newFormat }));

  view.ui.add(ccWidget, "bottom-right");

  /**************************************
   * Initialize the LineOfSight widget
   **************************************/
  setupLoS(view);

  /**************************************
   * Initialize the Search Widget
   **************************************/
  const customSearchSource = setupCustomSearchSource();
  setupSearchWidget(view, customSearchSource);

  /**************************************
   * Initialize daylight
   **************************************/

  setupDaylight(view);

  /**************************************
   *  Elevation profile
   **************************************/

  setupElevationProfile(view);

  /**************************************
   *  Measurement 3D
   **************************************/
  const measurement = new Measurement({
    view,
    container: "measurement-container",
  });

  setupMeasurement(measurement);

  /**************************************
   * Slicing
   **************************************/

  setupSlice(view);

  /**************************************
   * Locate
   **************************************/
  const locate = setupLocate(view);

  view.ui.add(locate, "top-right");

  /**************************************
   * Sketching
   **************************************/

  setupSketch(view, graphicsLayer);

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
  const initVisibleLayers = getVisibleLayers(view);

  /**************************************
   * Calcite CSS/JS
   **************************************/

  // TODO võiks ka eraldi calcite funktsioonideks kirjutada
  const shadowCast = setupShadowCast(view);

  let activeWidget;

  const handleActionBarClick = ({ target }) => {
    if (target.tagName !== "CALCITE-ACTION") {
      return;
    }

    if (activeWidget) {
      document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
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
      const visibleLayersCurrently = getVisibleLayers(view);

      const [regularLayers, elevationChanged] = compareVisibleLayers(
        initVisibleLayers,
        visibleLayersCurrently
      );
      console.log(regularLayers);
      console.log(elevationChanged);

      const sharedLocation = createURL(view, regularLayers, elevationChanged);
      copyTextToClipboard(sharedLocation);

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
  const locationArray = getLocation();
  getUndergroundInfo(view);
  getLayerVisibility(view);
  getElevationVisibility(view);

  if (locationArray !== null) {
    const viewpoint = setupViewPoint(locationArray);
    view.goTo(viewpoint, { animate: false });
    console.log(basemaps);
  }
});
