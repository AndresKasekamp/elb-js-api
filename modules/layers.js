define([
  "esri/layers/GraphicsLayer",
  "esri/layers/SceneLayer",
  "esri/layers/WMSLayer",
  "esri/layers/GroupLayer",
], (GraphicsLayer, SceneLayer, WMSLayer, GroupLayer) => ({
  setupGraphicsLayer: () =>
    new GraphicsLayer({
      elevationInfo: { mode: "absolute-height" },
      title: "Joonistatud kihid",
    }),

  setupInternalLayer: (id, title) =>
    new SceneLayer({
      portalItem: {
        id,
      },
      title,
    }),

  setupWMSLayer: () =>
    new WMSLayer({
      portalItem: {
        id: "38a98f83f3a248faaea9ce793e50ddee",
      },
      title: "Ortofoto WMS",
      visible: false,
      listMode: "hide",
    }),

  setupGroupLayer: (title, visibilityMode, visible = false) =>
    new GroupLayer({
      title,
      visible,
      visibilityMode,
    }),

  taimkateWorkaround: (treeGroupLayer, view) => {
    const taimkateAnalytical = view.map.allLayers.items.find(
      (layer) => layer.title === "Taimkate analüütiline"
    );
    taimkateAnalytical.visible = true;

    const taimkateRealistic = view.map.allLayers.items.find(
      (layer) => layer.title === "Taimkate realistlik"
    );

    treeGroupLayer.addMany([taimkateAnalytical, taimkateRealistic]);
    view.map.removeMany([taimkateAnalytical, taimkateRealistic]);
  },

  getGeologyLayers: (view) => {
    const geologyLayerTitles = [
      "Puurkaevud/puuraugud",
      "Ehitusgeoloogia",
      "Geoloogia WMS",
    ];

    const geologyLayers = {};
    view.map.layers.forEach((layer) => {
      const layerTitle = layer.title;
      if (geologyLayerTitles.includes(layerTitle)) {
        geologyLayers[layerTitle] = layer;
      }
    });

    const returnLayers = geologyLayerTitles
      .map((title) => geologyLayers[title])
      .filter(Boolean);
    return { items: returnLayers };
  },

  getVisibleLayers: (view) => {
    const { items } = view.map.allLayers;
    const { initVisible } = items.reduce(
      (acc, obj) => {
        if (obj.visible === true) {
          acc.initVisible.push(obj);
        }
        return acc;
      },
      { initVisible: [] }
    );

    return initVisible;
  },

  compareVisibleLayers: (initVisibleLayers, visibleLayersCurrently) => {
    const difference1 = initVisibleLayers.filter(
      (item) => !visibleLayersCurrently.includes(item)
    );
    const difference2 = visibleLayersCurrently.filter(
      (item) => !initVisibleLayers.includes(item)
    );

    const getTitle = (obj) => obj.title;
    const layerVisibilityChanged = [
      ...difference1.map(getTitle),
      ...difference2.map(getTitle),
    ];

    const elevationTitles = ["Kõrgusmudel", "Aluspõhi 50m", "Aluskord 50m"];
    const regularLayers = layerVisibilityChanged.filter(
      (item) => !elevationTitles.includes(item)
    );
    const elevationChanged = layerVisibilityChanged.filter((item) =>
      elevationTitles.includes(item)
    );

    return [regularLayers, elevationChanged];
  },
}));
