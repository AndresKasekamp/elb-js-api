define([
  "esri/widgets/DirectLineMeasurement3D",
  "esri/widgets/AreaMeasurement3D",
  "esri/core/promiseUtils",
], (DirectLineMeasurement3D, AreaMeasurement3D, promiseUtils) => ({

  setupMeasurement: (view) => {
    let activeWidget = null;

    // add the toolbar for the measurement widgets
    //view.ui.add("topbar", "top-left");

    const distanceBtn = document.getElementById("distanceButton");
    const areaBtn = document.getElementById("areaButton");
    const clearBtn = document.getElementById("clearButton");

    distanceBtn.addEventListener("click", (event) => {
      setActiveWidget(null);
      if (!event.target.classList.contains("active")) {
        setActiveWidget("distance");
      } else {
        setActiveButton(null);
      }
    });

    areaBtn.addEventListener("click", (event) => {
      setActiveWidget(null);
      if (!event.target.classList.contains("active")) {
        setActiveWidget("area");
      } else {
        setActiveButton(null);
      }
    });

    clearBtn.addEventListener("click", (event) => {
      setActiveWidget(null);
      setActiveButton(null);
    });

    function setActiveWidget(type) {
      switch (type) {
        case "distance":
          activeWidget = new DirectLineMeasurement3D({
            view: view,
          });

          // skip the initial 'new measurement' button
          activeWidget.viewModel.start().catch((error) => {
            if (promiseUtils.isAbortError(error)) {
              return; // don't display abort errors
            }
            throw error; // throw other errors since they are of interest
          });

          view.ui.add(activeWidget, "top-right");
          setActiveButton(document.getElementById("distanceButton"));
          break;
        case "area":
          activeWidget = new AreaMeasurement3D({
            view: view,
          });

          // skip the initial 'new measurement' button
          activeWidget.viewModel.start().catch((error) => {
            if (promiseUtils.isAbortError(error)) {
              return; // don't display abort errors
            }
            throw error; // throw other errors since they are of interest
          });

          view.ui.add(activeWidget, "top-right");
          setActiveButton(document.getElementById("areaButton"));
          break;
        case null:
          if (activeWidget) {
            view.ui.remove(activeWidget);
            activeWidget.destroy();
            activeWidget = null;
          }
          break;
      }
    }

    function setActiveButton(selectedButton) {
      // focus the view to activate keyboard shortcuts for sketching
      view.focus();
      const elements = document.getElementsByClassName("active");
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("active");
      }
      if (selectedButton) {
        selectedButton.classList.add("active");
      }
    }
  },
}));
