define([
  "esri/layers/GraphicsLayer",
  "esri/layers/SceneLayer",
  "esri/layers/WMSLayer",
  "esri/layers/GroupLayer"
], (GraphicsLayer, SceneLayer, WMSLayer, GroupLayer) => ({
  setupGraphicsLayer: () =>
    new GraphicsLayer({
      elevationInfo: { mode: "absolute-height" },
      title: "Joonistatud kihid",
    }),

  setupInternalLayer: (layerID, layerTitle) =>
    new SceneLayer({
      portalItem: {
        id: layerID,
      },
      title: layerTitle,
      visible: false,
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

  setupGroupLayer: (groupName, visibilityMode) =>
    new GroupLayer({
      title: groupName,
      visible: false,
      visibilityMode: visibilityMode,
    }),
}));
