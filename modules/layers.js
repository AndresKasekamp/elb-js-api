define(["esri/layers/GraphicsLayer", "esri/layers/SceneLayer"], (
  GraphicsLayer,
  SceneLayer
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
}));
