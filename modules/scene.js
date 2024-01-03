import WebScene from "@arcgis/core/WebScene.js";
import SceneView from "@arcgis/core/views/SceneView.js";

// TODO vaata kas siin saaks lahtipakkimisega teha
const setupWebScene = (id, ...layers) => {
  return new WebScene({
    portalItem: {
      id,
    },
    layers: [...layers],
  });
};

const setupWebView = (scene) => {
  return new SceneView({
    map: scene,
    container: "viewDiv",
    qualityProfile: "high",
  });
};

export { setupWebScene, setupWebView };
