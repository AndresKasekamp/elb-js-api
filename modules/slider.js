define(["esri/widgets/Slider"], (Slider) => ({
  setupSlider: (container, label) =>
    new Slider({
      min: 0,
      max: 1,
      precision: 2,
      values: [1],
      visibleElements: {
        labels: label,
        rangeLabels: true,
      },
      container: container,
    }),

  setupSliderStyle: () => {
    const itemPanelDiv = document.createElement("div");
    const sliderDiv = document.createElement("div");
    sliderDiv.classList.add("esri-widget");

    return [itemPanelDiv, sliderDiv];
  },
}));
