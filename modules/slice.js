define(["esri/widgets/Slice"], (Slice) => ({
  setupSlice: (view) =>
    new Slice({
      view: view,
      container: "slicing-container"
    }),
}));
