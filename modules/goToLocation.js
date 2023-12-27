define(["esri/Viewpoint", "esri/Camera", "esri/geometry/Point"], (
  Viewpoint,
  Camera,
  Point
) => ({
  getUndergroundInfo: (view) => {
    const urlString = window.location.href;

    // Create a URL object
    const url = new URLSearchParams(urlString);

    const undergroundParam = url.get("underground");

    if (undergroundParam === "true") {
      view.map.ground.navigationConstraint.type = "none";
    }
  },

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
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
    } catch (err) {
      console.error("Error copying text to clipboard:", err);
    }
  },

  createURL: (view) => {
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
