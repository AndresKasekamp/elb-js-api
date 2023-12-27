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

  setupGroupLayer: (title, visibilityMode) =>
    new GroupLayer({
      title,
      visible: false,
      visibilityMode,
    }),

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
}));
