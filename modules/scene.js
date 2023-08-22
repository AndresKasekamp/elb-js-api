// TODO vaata kas siin saaks lahtipakkimisega teha
define(["esri/WebScene", "esri/views/SceneView"], (WebScene, SceneView) => ({
  setupWebScene: (...layers) =>
    new WebScene({
      portalItem: {
        id: "92d29869db444e28beab584f696b86c3",
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
