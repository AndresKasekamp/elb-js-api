// TODO vaata kas siin saaks lahtipakkimisega teha
define(["esri/WebScene", "esri/views/SceneView"], (WebScene, SceneView) => ({
  setupWebScene: (id, ...layers) =>
    new WebScene({
      portalItem: {
        id,
      },
      layers: [...layers],
    }),

  setupWebView: (scene) =>
    new SceneView({
      map: scene,
      container: "viewDiv",
      qualityProfile: "high",
    }),
}));
