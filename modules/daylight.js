define(["esri/widgets/Daylight"], (Daylight) => ({
  setupDaylight: (view) =>
    new Daylight({
      view,
      container: "daylight-container"
    }),
}));
