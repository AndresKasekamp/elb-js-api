// TODO kas siin saaks sisendina deklareerida kohe view.map scene asemel, et konstukrutori ülesannet kergemaks teha
define(["esri/layers/ElevationLayer"], (ElevationLayer) => ({
  elevationManipulation: (view) => {
    const opacitySlider = document.getElementById("opacitySlider");
    opacitySlider.addEventListener("calciteSliderInput", () => {
      const value = opacitySlider.value / 100;
      view.map.ground.opacity = value;
    });

    const navigateUndergroundInput = document.getElementById(
      "navigationUnderground"
    );
    const elevationInput = document.getElementById("elevationInput");

    navigateUndergroundInput.addEventListener(
      "calciteCheckboxChange",
      (event) => {
        view.map.ground.navigationConstraint.type = event.target.checked
          ? "none"
          : "stay-above";
      }
    );

    // TODO arrow function ümber teha
    elevationInput.addEventListener("calciteCheckboxChange", updateElevation);

    function updateElevation(e) {
      // Turn ground layers visibility on/off
      view.map.ground.layers.forEach((layer) => {
        layer.visible = e.target.checked;
      });
    }

    const elevationLayerGroup = document.getElementById("elevationModels");

    elevationLayerGroup.addEventListener(
      "calciteRadioButtonGroupChange",
      () => {
        const selectedItem = elevationLayerGroup.selectedItem.value;

        view.map.ground.layers.forEach((layer) => {
          layer.visible = layer.id === selectedItem;
        });
      }
    );
  },

  setupElevationLayer: (url, title) =>
    new ElevationLayer({
      url,
      title,
      visible: false,
    }),
}));
