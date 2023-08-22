define(["esri/layers/GraphicsLayer", "esri/layers/SceneLayer", "esri/layers/WMSLayer"], (
  GraphicsLayer,
  SceneLayer,
  WMSLayer
) => ({
  setupGraphicsLayer: () =>
    new GraphicsLayer({
      elevationInfo: { mode: "absolute-height" },
      title: "Joonistatud kihid",
    }),

  setupInternalLayer: () =>
    new SceneLayer({
      portalItem: {
        id: "66e382030b224ffa999249a4d1cbbf4f",
      },
      title: "Sidemastid",
    }),
  
    // TODO seda saaks võibolla ka otse tuua teenusest üle ja proovi WMTS-ga niimoodi, äkki saaks basemap alla lisada
    // TODO ilmselt hidden ka sisse lülitada (aga pärast)
  setupWMSLayer: () => new WMSLayer({
    portalItem: {
      id: "38a98f83f3a248faaea9ce793e50ddee",
    },
    title: "Ortofoto WMS",
    visible: false,
    listMode: "hide",
  })
}));
