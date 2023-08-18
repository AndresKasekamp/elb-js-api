// TODO legendi widget
// TODO pärast lükata view.when() kõigile tööriistadele
// TODO widgeti järjekord paika saada

// TODO locate widget kui localhosti pealt saab ära tulla

// TODO screenshot widget lisada

require([
  "esri/widgets/CoordinateConversion/support/Conversion",
  "esri/widgets/Slider",
  "esri/Graphic",

  "./modules/layers.js",
  "./modules/scene.js",
  "./modules/layerList.js",
  "./modules/coordinate.js",
  "./modules/lineOfSight.js",
  "./modules/search.js",
  "./modules/sketch.js",
  "./modules/daylight.js",
  "./modules/elevationProfile.js",
  "./modules/measurement.js",
  "./modules/shadowCast.js",
  "./modules/slice.js",
  "./modules/locate.js",
], (
  Conversion,
  Slider,
  Graphic,

  initLayers,
  initScene,
  initLayerList,
  initCoordinates,
  initLoS,
  initSearch,
  initSketch,
  initDaylight,
  initElevationProfile,
  initMeasurement,
  initShadowCast,
  initSlice,
  initLocate
) => {
  /************************************************************
   * Init scene (/w layers) and view
   ************************************************************/

  const graphicsLayer = initLayers.setupGraphicsLayer();
  const communicationTower = initLayers.setupInternalLayer();

  const scene = initScene.setupWebScene(graphicsLayer, communicationTower);
  const view = initScene.setupWebView(scene);

  /**************************************
   * Adding a layer group, expand
   **************************************/
  view.when(() => {
    const layerList = initLayerList.setupLayerList(view);
    const layerListExpand = initLayerList.setupExpand(
      "List of Layers",
      view,
      layerList,
      false,
      "top-left"
    );
    view.ui.add(layerListExpand, "top-left");
  });

  /**************************************
   * Basemap gallery
   **************************************/
  const basemaps = initLayerList.setupBasemapGallery(view);
  const basemapsExpand = initLayerList.setupExpand(
    "List of Basemaps",
    view,
    basemaps,
    false,
    "top-left"
  );
  view.ui.add(basemapsExpand, "top-left");

  /**************************************
   *  Coordinate tool
   **************************************/
  view.when(() => {
    const ccWidget = initCoordinates.setupCoordinateWidget(view);
    const numberSearchPattern = /-?\d+[\.]?\d*/;
    const newFormat = initCoordinates.setupNewFormat(numberSearchPattern);
    ccWidget.formats.add(newFormat);

    ccWidget.conversions.splice(0, 0, new Conversion({ format: newFormat }));

    view.ui.add(ccWidget, "bottom-left");
  });

  /**************************************
   * Initialize the LineOfSight widget
   **************************************/
  const lineOfSight = initLoS.setupLoS(view);

  const expandLoS = initLayerList.setupExpand(
    "Expand line of sight widget",
    view,
    lineOfSight,
    false,
    "top-left"
  );

  view.ui.add(expandLoS, "top-left");

  /**************************************
   * Initialize the Search Widget
   **************************************/
  const customSearchSource = initSearch.setupCustomSearchSource();
  const searchWidget = initSearch.setupSearchWidget(view, customSearchSource);
  view.ui.add(searchWidget, "top-right");

  /**************************************
   *  Daylight tool
   **************************************/
  const dayLightWidget = initDaylight.setupDaylight(view);
  const expandDlight = initLayerList.setupExpand(
    "Expand daylight",
    view,
    dayLightWidget,
    false,
    "top-left"
  );

  view.ui.add(expandDlight, "top-left");

  /**************************************
   *  Elevation profile
   **************************************/
  const elevationProfileWidget =
    initElevationProfile.setupElevationProfile(view);
  const expandEprofile = initLayerList.setupExpand(
    "Expand elevation profile",
    view,
    elevationProfileWidget,
    false,
    "top-left"
  );

  view.ui.add(expandEprofile, "top-left");

  /**************************************
   *  Measurement 3D
   * TODO custom expand widget ka muuta, aga initimise peab üle vaatama
   **************************************/

  initMeasurement.setupMeasurement(view);

  const expandMeasurement = initLayerList.setupExpand(
    "Measurement toolbar",
    view,
    document.getElementById("topbar"),
    false,
    "top-left"
  );

  view.ui.add(expandMeasurement, "top-left");

  /**************************************
   * Shadow casting
   **************************************/

  const shadowCast = initShadowCast.setupShadowCast(view);

  const expandShadowCast = initLayerList.setupExpand(
    "Shadow casting",
    view,
    shadowCast,
    false,
    "top-left"
  );

  view.ui.add(expandShadowCast, "top-left");

  /**************************************
   * Slicing
   **************************************/

  const slicing = initSlice.setupSlice(view);

  const expandSlicing = initLayerList.setupExpand(
    "Slicing",
    view,
    slicing,
    false,
    "top-left"
  );

  view.ui.add(expandSlicing, "top-left");

  /**************************************
   * Locate
   **************************************/
  const locate = initLocate.setupLocate(view);

  view.ui.add(locate, "top-left");

  /**************************************
   * Screenshot
   **************************************/
  // the button that triggers area selection mode
  const screenshotBtn = document.getElementById("screenshotBtn");

  // the orange mask used to select the area
  const maskDiv = document.getElementById("maskDiv");

  // element where we display the print preview
  const screenshotDiv = document.getElementById("screenshotDiv");

  // the button that triggers download
  const downloadBtn = document.getElementById("downloadBtn");

  // the button to hide the print preview html element
  const closeBtn = document.getElementById("closeBtn");

  view.ui.add(screenshotBtn, "top-right");

  // add an event listener to trigger the area selection mode
  screenshotBtn.addEventListener("click", () => {
    screenshotBtn.classList.add("active");
    view.container.classList.add("screenshotCursor");
    let area = null;

    // listen for drag events and compute the selected area
    const dragHandler = view.on("drag", (event) => {
      // prevent navigation in the view
      event.stopPropagation();

      // when the user starts dragging or is dragging
      if (event.action !== "end") {
        // calculate the extent of the area selected by dragging the cursor
        const xmin = clamp(Math.min(event.origin.x, event.x), 0, view.width);
        const xmax = clamp(Math.max(event.origin.x, event.x), 0, view.width);
        const ymin = clamp(Math.min(event.origin.y, event.y), 0, view.height);
        const ymax = clamp(Math.max(event.origin.y, event.y), 0, view.height);
        area = {
          x: xmin,
          y: ymin,
          width: xmax - xmin,
          height: ymax - ymin,
        };
        // set the position of the div element that marks the selected area
        setMaskPosition(area);
      }
      // when the user stops dragging
      else {
        // remove the drag event listener from the SceneView
        dragHandler.remove();
        // the screenshot of the selected area is taken
        view
          .takeScreenshot({ area: area, format: "png" })
          .then((screenshot) => {
            // display a preview of the image
            showPreview(screenshot);

            // create the image for download
            downloadBtn.onclick = () => {
              const text = document.getElementById("textInput").value;
              // if a text exists, then add it to the image
              if (text) {
                const dataUrl = getImageWithText(screenshot, text);
                downloadImage(`${webscene.portalItem.title}.png`, dataUrl);
              }
              // otherwise download only the webscene screenshot
              else {
                downloadImage(
                  `${webscene.portalItem.title}.png`,
                  screenshot.dataUrl
                );
              }
            };

            // the screenshot mode is disabled
            screenshotBtn.classList.remove("active");
            view.container.classList.remove("screenshotCursor");
            setMaskPosition(null);
          });
      }
    });

    function setMaskPosition(area) {
      if (area) {
        maskDiv.classList.remove("hide");
        maskDiv.style.left = `${area.x}px`;
        maskDiv.style.top = `${area.y}px`;
        maskDiv.style.width = `${area.width}px`;
        maskDiv.style.height = `${area.height}px`;
      } else {
        maskDiv.classList.add("hide");
      }
    }

    function clamp(value, from, to) {
      return value < from ? from : value > to ? to : value;
    }
  });

  // creates an image that will be appended to the DOM
  // so that users can have a preview of what they will download
  function showPreview(screenshot) {
    screenshotDiv.classList.remove("hide");
    // add the screenshot dataUrl as the src of an image element
    const screenshotImage = document.getElementsByClassName(
      "js-screenshot-image"
    )[0];
    screenshotImage.width = screenshot.data.width;
    screenshotImage.height = screenshot.data.height;
    screenshotImage.src = screenshot.dataUrl;
  }

  // returns a new image created by adding a custom text to the webscene image
  function getImageWithText(screenshot, text) {
    const imageData = screenshot.data;

    // to add the text to the screenshot we create a new canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = imageData.height;
    canvas.width = imageData.width;

    // add the screenshot data to the canvas
    context.putImageData(imageData, 0, 0);
    context.font = "20px Arial";
    context.fillStyle = "#000";
    context.fillRect(
      0,
      imageData.height - 40,
      context.measureText(text).width + 20,
      30
    );

    // add the text from the textInput element
    context.fillStyle = "#fff";
    context.fillText(text, 10, imageData.height - 20);

    return canvas.toDataURL();
  }

  function downloadImage(filename, dataUrl) {
    // the download is handled differently in Microsoft browsers
    // because the download attribute for <a> elements is not supported
    if (!window.navigator.msSaveOrOpenBlob) {
      // in browsers that support the download attribute
      // a link is created and a programmatic click will trigger the download
      const element = document.createElement("a");
      element.setAttribute("href", dataUrl);
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      // for MS browsers convert dataUrl to Blob
      const byteString = atob(dataUrl.split(",")[1]);
      const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // download file
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
  }
  // hide the print preview html element on click
  closeBtn.addEventListener("click", () => {
    screenshotDiv.classList.add("hide");
  });

  /**************************************
   * Sketching (1): Init settings
   **************************************/
  // Set-up event handlers for buttons and click events
  const startbuttons = document.getElementById("startbuttons");
  const actionbuttons = document.getElementById("actionbuttons");
  const edgeoperationbuttons = document.getElementById("edgeoperationbuttons");

  const sliderbutton = document.getElementById("sliderDiv");

  const extrudeSlider = new Slider({
    container: sliderbutton,
    min: 0,
    max: 100,
    steps: 1,
    precision: 0,
    labelFormatFunction: function (value, type) {
      return `${value.toString()} m`; // Format label to show whole numbers
    },
    visibleElements: {
      labels: true,
      rangeLabels: true,
    },
    values: [10],
  });

  const sketchViewModel = initSketch.setupSketchViewModel(view, graphicsLayer);

  // after drawing the geometry, enter the update mode to update the geometry
  // and the deactivate the buttons
  sketchViewModel.on("create", (event) => {
    if (event.state === "complete") {
      startbuttons.style.display = "inline";
      actionbuttons.style.display = "none";
      sketchViewModel.update(event.graphic);
    }
    if (event.state === "cancel") {
      startbuttons.style.display = "inline";
      actionbuttons.style.display = "none";
    }
  });

  sketchViewModel.on("update", (event) => {
    if (event.state === "start") {
      startbuttons.style.display = "none";
      actionbuttons.style.display = "inline";
      sliderbutton.style.display = "inline";
      if (
        event.graphics[0].geometry.type === "polygon" ||
        event.graphics[0].geometry.type === "polyline"
      ) {
        edgeoperationbuttons.style.display = "inline";
        sliderbutton.style.display = "inline";
      }
    }
    if (event.state === "complete") {
      startbuttons.style.display = "inline";
      actionbuttons.style.display = "none";
      edgeoperationbuttons.style.display = "none";
      sliderbutton.style.display = "none";
    }
  });

  /**********************************************
   * Sketching (2): Drawing UI with configuration
   *********************************************/

  const drawButtons = Array.prototype.slice.call(
    document.getElementsByClassName("starttool")
  );
  const cancelBtn = document.getElementById("cancel");
  const doneBtn = document.getElementById("done");

  // set event listeners to activate sketching graphics
  drawButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // to activate sketching the create method is called passing in the geometry type
      // from the data-type attribute of the html element
      sketchViewModel.create(event.target.getAttribute("data-type"));

      startbuttons.style.display = "none";
      actionbuttons.style.display = "inline";
      sliderbutton.style.display = "none";
    });
  });

  cancelBtn.addEventListener("click", (event) => {
    sketchViewModel.cancel();
  });
  doneBtn.addEventListener("click", (event) => {
    if (sketchViewModel.updateGraphics.length !== 0) {
      sketchViewModel.complete();
    } else {
      sketchViewModel.cancel();
    }
  });

  view.ui.add("sketchPanel", "bottom-right");

  // Update the building layer extrusion
  extrudeSlider.on(["thumb-change", "thumb-drag"], extrudeSizeChanged);

  function extrudeSizeChanged(event) {
    // Constructing a new graphic
    let geom = graphicsLayer.graphics.getItemAt(0).geometry;
    let symStyle = {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "extrude",
          size: event.value,
          material: {
            color: white,
          },
          edges: {
            type: "solid",
            size: "3px",
            color: blue,
          },
        },
      ],
    };
    let p = new Graphic({
      geometry: geom,
      symbol: symStyle,
    });
    graphicsLayer.add(p);

    // This did not work
    //extrudedPolygon.symbolLayers[0].size = event.value; // Update extrude size
    //sketchViewModel.polygonSymbol = extrudedPolygon; // Apply updated symbol to SketchViewModel

    // This did not work either
    /*     sketchViewModel.polygonSymbol.symbolLayers.find(
      (symbolLayer) => symbolLayer.type === "extrude"
    ).size = event.value; */
  }

  // default values for edge/move operations
  let edgeType = "split";
  let shapeType = "move";

  // Handling the configuration for edge operation
  const noneEdgeBtn = document.getElementById("none-edge-button");
  const splitEdgeBtn = document.getElementById("split-edge-button");
  const offsetEdgeBtn = document.getElementById("offset-edge-button");
  noneEdgeBtn.onclick = edgeChangedClickHandler;
  splitEdgeBtn.onclick = edgeChangedClickHandler;
  offsetEdgeBtn.onclick = edgeChangedClickHandler;

  function edgeChangedClickHandler(event) {
    edgeType = event.target.value;

    // handle the buttons
    const buttons = document.getElementsByClassName("edge-button");
    for (const button of buttons) {
      button.classList.remove("edge-button-selected");
    }
    this.classList.add("edge-button-selected");
    restartUpdateMode({
      reshapeOptions: {
        edgeOperation: edgeType,
        shapeOperation: shapeType,
      },
    });
  }

  // Handling the configuration for move operation
  const noneShapeButton = document.getElementById("none-shape-button");
  const moveShapeButton = document.getElementById("move-shape-button");
  noneShapeButton.onclick = shapeChangedClickHandler;
  moveShapeButton.onclick = shapeChangedClickHandler;

  function shapeChangedClickHandler(event) {
    shapeType = event.target.value;

    // handle the buttons
    const buttons = document.getElementsByClassName("shape-button");
    for (const button of buttons) {
      button.classList.remove("shape-button-selected");
    }
    this.classList.add("shape-button-selected");
    restartUpdateMode({
      reshapeOptions: {
        edgeOperation: edgeType,
        shapeOperation: shapeType,
      },
    });
  }

  function restartUpdateMode(updateOptions) {
    sketchViewModel.defaultUpdateOptions = {
      ...sketchViewModel.defaultUpdateOptions,
      ...updateOptions,
    };

    if (sketchViewModel.activeTool) {
      if (
        sketchViewModel.activeTool === "transform" ||
        sketchViewModel.activeTool === "move" ||
        sketchViewModel.activeTool === "reshape"
      ) {
        updateOptions.tool = sketchViewModel.activeTool;
        sketchViewModel.update(
          sketchViewModel.updateGraphics.toArray(),
          updateOptions
        );
      }
    }
  }
});
