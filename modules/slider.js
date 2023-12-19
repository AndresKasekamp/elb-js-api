define(["esri/widgets/Slider"], (Slider) => ({
  setupSlider: (sliderDiv) =>
    new Slider({
      min: 0,
      max: 1,
      precision: 2,
      values: [1],
      visibleElements: {
        labels: true,
        rangeLabels: true,
      },
      container: sliderDiv,
    }),

  setupSliderStyle: () => {
    // TODO need on eraldi suur funktsioon
    const itemPanelDiv = document.createElement("div");
    const sliderDiv = document.createElement("div");
    sliderDiv.classList.add("esri-widget");

    return [itemPanelDiv, sliderDiv];
  },
}));
