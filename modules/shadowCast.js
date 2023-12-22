

define(["esri/widgets/ShadowCast"], (ShadowCast) => ({
  setupShadowCast: (view) =>
    new ShadowCast({
      view: view,
      visible: false,
      container: "shadowcast-container",
    }),
}));
