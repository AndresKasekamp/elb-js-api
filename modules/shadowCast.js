// TODO leida viis kuidas shadow casting by deafult välja lülitada

define([
  "esri/widgets/ShadowCast",
], (ShadowCast) => ({
  setupShadowCast: (view) =>
    new ShadowCast({
      view: view,
      visible: true,
/*       viewModel: {
          view: view,
      } */
    }),
}));
