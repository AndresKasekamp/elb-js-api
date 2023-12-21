define([], () => ({
  setupMeasurement: (measurement) => {
    const distanceBtn = document.getElementById("distanceButton");
    const areaBtn = document.getElementById("areaButton");
    const clearBtn = document.getElementById("clearButton");

    distanceBtn.addEventListener("click", () => {
      distanceBtn.active = "true"
      areaBtn.active = "false"
      measurement.activeTool = "direct-line";
    });

    areaBtn.addEventListener("click", () => {
      distanceBtn.active = "false"
      areaBtn.active = "true"
      measurement.activeTool = "area";
    });

    clearBtn.addEventListener("click", () => {
      distanceBtn.active = "false"
      areaBtn.active = "false"
      measurement.clear();
    });
  },
}));
