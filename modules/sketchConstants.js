// TODO kui tööle saad, siis interface ära muuta

// Graphic UI parameters
const blue = [82, 82, 122, 0.9];
const white = [255, 255, 255, 0.8];
// polygon symbol used for sketching the extruded building footprints
const extrudedPolygon = {
  type: "polygon-3d",
  symbolLayers: [
    {
      type: "extrude",
      size: 10, // extrude by 10 meters
      material: {
        color: white,
      },
      edges: {
        type: "solid",
        size: "3px",
        color: blue,
      },
    },
  ],
};

// polyline symbol used for sketching routes
const route = {
  type: "line-3d",
  symbolLayers: [
    {
      type: "line",
      size: "10px",
      material: {
        color: white,
      },
    },
    {
      type: "line",
      size: "3px",
      material: {
        color: blue,
      },
    },
  ],
};

// point symbol used for sketching points of interest
const point = {
  type: "point-3d",
  symbolLayers: [
    {
      type: "icon",
      size: "30px",
      resource: { primitive: "kite" },
      outline: {
        color: blue,
        size: "3px",
      },
      material: {
        color: white,
      },
    },
  ],
};

define(["esri/widgets/Sketch/SketchViewModel"], (SketchViewModel) => ({
  setupSketchViewModel: (view, graphicsLayer) =>
    new SketchViewModel({
      layer: graphicsLayer,
      view: view,
      pointSymbol: point,
      polygonSymbol: extrudedPolygon,
      polylineSymbol: route,
      defaultCreateOptions: {
        hasZ: true, // default value
      },
      snappingOptions: {
        enabled: true,
        featureSources: [{ layer: graphicsLayer }],
      },
      tooltipOptions: { enabled: true },
      labelOptions: { enabled: true },
      defaultUpdateOptions: {
        tool: "transform",
        enableScaling: true,
        enableZ: true,
      },
    }),
}));
