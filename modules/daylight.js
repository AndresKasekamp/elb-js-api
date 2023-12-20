define(["esri/widgets/Daylight"], (Daylight) => ({
  setupDaylight: (view) =>
    new Daylight({
      view,
      visible: false,
    }),
}));
