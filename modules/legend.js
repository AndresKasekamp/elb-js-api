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

  setupLegendStyle: () => {
    const legendDiv = document.createElement("div");
    legendDiv.classList.add("esri-widget");
    return legendDiv;
  },
}));
