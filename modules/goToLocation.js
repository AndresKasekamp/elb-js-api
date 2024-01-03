define(["esri/Viewpoint", "esri/Camera", "esri/geometry/Point"], (
  Viewpoint,
  Camera,
  Point
) => ({
  getUndergroundInfo: (view) => {
    const urlString = new URL(window.location.href);

    // Create a URL object
    const url = new URLSearchParams(urlString.search);

    const undergroundParam = url.get("underground");

    if (undergroundParam === "true") {
      view.map.ground.navigationConstraint.type = "none";
    }
  },

  getLayerVisibility: (view) => {
    const urlString = new URL(window.location.href);

    // Create a URL object
    const url = new URLSearchParams(urlString.search);

    // TODO mis juhtub, kui on puudu ja kas on mingid probleemid ka id parsimiga?
    const layersParamStr = url.get("layers");

    if (layersParamStr !== null) {
      const layersParamArr = layersParamStr.split(","); // Splitting the string at commas

      view.map.allLayers.items.forEach((obj) => {
        if (layersParamArr.includes(obj.title)) {
          console.log(obj)
          obj.visible = !obj.visible;
        }
      });
    }
  },

  getElevationVisibility: (view) => {
    const urlString = new URL(window.location.href);

    // Create a URL object
    const url = new URLSearchParams(urlString.search);

    // TODO mis juhtub, kui on puudu ja kas on mingid probleemid ka id parsimiga?
    const layersParamStr = url.get("elevation");

    // Changing layer visibility back and front end
    if (layersParamStr !== null) {
      const layersParamArr = layersParamStr.split(","); // Splitting the string at commas

      view.map.ground.layers.forEach((obj) => {
        if (layersParamArr.includes(obj.title)) {
          obj.visible = !obj.visible;
        }   
      });

    }
  },

  // TODO mis juhtub kui üks element jääb puud, ilmselt kasutada ka ; kui on kaamera parameetrid?
  getLocation: () => {
    // Sample URL with parameters
    const urlString = new URL(window.location.href);

    // Create a URL object
    const url = new URLSearchParams(urlString.search);

    // Get the value of the 'view' parameter from the URL
    const viewpointParam = url.get("view");

    // Split the viewpoint parameter to extract x, y, and z values
    if (viewpointParam) {
      const [x, y, z, heading, tilt, rotation, scale] =
        viewpointParam.split(",");

      // Convert strings to numbers if needed
      const parsedX = parseFloat(x);
      const parsedY = parseFloat(y);
      const parsedZ = parseFloat(z);
      const parsedHeading = parseFloat(heading);
      const parsedTilt = parseFloat(tilt);
      const parsedRotation = parseFloat(rotation);
      const parsedScale = parseFloat(scale);

      return [
        parsedX,
        parsedY,
        parsedZ,
        parsedHeading,
        parsedTilt,
        parsedRotation,
        parsedScale,
      ];
    }

    return null;
  },

  async copyTextToClipboard(text) {
    await navigator.clipboard.writeText(text);
  },

  createURL: (view, regularLayers, elevationLayers) => {
    // Get the current URL
    const currentURL = window.location.href;

    // Remove parameters from the URL
    const urlWithoutParams = new URL(currentURL.split("?")[0]);

    const viewpoint = view.viewpoint;
    const { rotation, scale } = viewpoint;
    const { heading, tilt } = viewpoint.camera;
    const { x, y, z } = viewpoint.camera.position;

    // Construct the URL parameters
    const queryParams = new URLSearchParams();
    queryParams.set(
      "view",
      `${x},${y},${z},${heading},${tilt},${rotation},${scale}`
    );

    // Check underground navigation
    if (view.map.ground.navigationConstraint.type === "none") {
      queryParams.set("underground", "true");
    }

    
    if (regularLayers.length !== 0) {
      const regularLayerVisibilityJoined = regularLayers.join(",");
      queryParams.set("layers", regularLayerVisibilityJoined);
    }

    if (elevationLayers.length !== 0) {
      const elevationLayerVisibilityJoined = elevationLayers.join(",");
      queryParams.set("elevation", elevationLayerVisibilityJoined);
    }

    // Append parameters to the URL
    urlWithoutParams.search = queryParams.toString();

    return urlWithoutParams.toString();
  },

  setupViewPoint: (locationArray) => {
    const [
      locationX,
      locationY,
      locationZ,
      locationHeading,
      locationTilt,
      locationRotate,
      locationScale,
    ] = locationArray;
    const viewpoint = new Viewpoint({
      camera: new Camera({
        position: new Point({
          x: locationX,
          y: locationY,
          z: locationZ,
          spatialReference: {
            wkid: 3301,
          },
        }),
        heading: locationHeading,
        tilt: locationTilt,
      }),
      rotation: locationRotate,
      scale: locationScale,
    });
    return viewpoint;
  },
}));
