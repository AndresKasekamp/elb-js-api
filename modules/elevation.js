define(["./modules/slider.js"], (initSlider) => ({
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
        console.log("Navigation changed");
        scene.ground.navigationConstraint.type = event.target.checked
          ? "none"
          : "stay-above";
      }
    );

    elevationInput.addEventListener("calciteCheckboxChange", updateElevation);

    function updateElevation(e) {
      // Turn ground layers visibility on/off
      scene.ground.layers.forEach((layer) => {
        layer.visible = e.target.checked;
      });
    }
  },
}));
