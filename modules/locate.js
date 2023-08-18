define(["esri/widgets/Locate"], (Locate) => ({
  setupLocate: (view) =>
    new Locate({
      view: view,
    }),
}));
