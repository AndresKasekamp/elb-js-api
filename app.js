// TODO legendi widget
// TODO pärast lükata view.when() kõigile tööriistadele
// TODO widgeti järjekord paika saada
// TODO memory tabel on lappes css

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
  "./modules/screenShot.js",
  "./modules/memoryTest.js",
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
    const layerList = initLayerList.setupLayerList(view);
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
     * Sketching
     **************************************/
    initSketch.setupSketch(view, graphicsLayer);
  });

  /**************************************
   * Perfomance info
   **************************************/
  /*   // TODO see performance oleks vaja importida ja vaadata mis on reaaselt aktiivne
  // TODO ilmselt peaita mingisuguse tabi taha ka expand (ikoon lisada)
  view.when(() => {
    const expandMemory = initLayerList.setupExpand(
      "Memory",
      view,
      document.getElementById("performanceInfo"),
      false,
      "top-right"
    );
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
  } */
});
