define(["esri/widgets/Legend"], (Legend) => ({
  setupLegend: (view, layer, div) =>
    new Legend({
      view: view,
      layerInfos: [
        {
          layer: layer,
        },
      ],
      container: div,
    }),
}));
