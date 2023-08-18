// TODO leida viis kuidas shadow casting by deafult välja lülitada

define([
  "esri/widgets/ShadowCast",
  "esri/widgets/ShadowCast/ShadowCastViewModel",
], (ShadowCast, ShadowCastViewModel) => ({
  setupShadowCast: (view) =>
    new ShadowCast({
      view: view,
      visible: false,
    }),
}));
