define(["esri/widgets/LineOfSight"], (LineOfSight) => ({
  setupLoS: (view) =>
    new LineOfSight({
      view: view,
    }),
}));
