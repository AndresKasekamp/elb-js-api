// TODO kas siin saaks sisendina deklareerida kohe view.map scene asemel, et konstukrutori ülesannet kergemaks teha
define(["esri/layers/ElevationLayer"], (ElevationLayer) => ({
  elevationManipulation: (scene) => {
    const opacitySlider = document.getElementById("opacitySlider");
    opacitySlider.addEventListener("calciteSliderInput", () => {
      const value = opacitySlider.value / 100;
      scene.ground.opacity = value;
    });

    const navigateUndergroundInput = document.getElementById(
      "navigationUnderground"
    );
    const elevationInput = document.getElementById("elevationInput");

    navigateUndergroundInput.addEventListener(
      "calciteCheckboxChange",
      (event) => {
        scene.ground.navigationConstraint.type = event.target.checked
          ? "none"
          : "stay-above";
      }
    );

    // TODO arrow function ümber teha
    elevationInput.addEventListener("calciteCheckboxChange", updateElevation);

    function updateElevation(e) {
      // Turn ground layers visibility on/off
      scene.ground.layers.forEach((layer) => {
        layer.visible = e.target.checked;
      });
    }

    const elevationLayerGroup = document.getElementById("elevationModels");

    elevationLayerGroup.addEventListener(
      "calciteRadioButtonGroupChange",
      () => {
        const selectedItem = elevationLayerGroup.selectedItem.value;

        scene.ground.layers.forEach((layer) => {
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
