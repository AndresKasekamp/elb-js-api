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
}));
