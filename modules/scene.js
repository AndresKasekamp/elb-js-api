define(["esri/WebScene", "esri/views/SceneView"], (WebScene, SceneView) => ({
  setupWebScene: (graphics, internal) =>
    new WebScene({
      portalItem: {
        id: "92d29869db444e28beab584f696b86c3",
      },
      layers: [graphics, internal],
    }),

  setupWebView: (scene) =>
    new SceneView({
      map: scene,
      container: "viewDiv",
      qualityProfile: "high",
    }),
}));
