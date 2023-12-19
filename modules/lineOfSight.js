define(["esri/widgets/LineOfSight"], (LineOfSight) => ({
  setupLoS: (view) =>
    new LineOfSight({
      view,
      container: "line-of-sight-container"
    }),
}));
