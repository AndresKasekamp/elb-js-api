define(["./modules/slider.js"], (initSlider) => ({
  elevationManipulation: (scene) => {
    const opacitySlider = initSlider.setupSlider("opacitySlider", false);

    // Update the building layer extrusion
    opacitySlider.on(["thumb-change", "thumb-drag"], opacityChanged);

    function opacityChanged(event) {
      const value = event.value;
      document.getElementById("opacity").innerHTML = value;
      scene.ground.opacity = event.value;
    }

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
