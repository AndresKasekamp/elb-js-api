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
    const sliderDiv = document.createElement("calcite-slider");

    // Set attributes for the slider
    sliderDiv.min = 0;
    sliderDiv.max = 100;
    sliderDiv.step = 1;
    sliderDiv.value = 100;
    sliderDiv.labelHandles = "true";

    return [itemPanelDiv, sliderDiv];
  },
}));
