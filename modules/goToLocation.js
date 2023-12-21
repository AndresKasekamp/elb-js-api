define(["esri/Viewpoint", "esri/Camera", "esri/geometry/Point"], (
  Viewpoint,
  Camera,
  Point
) => ({
  // TODO ilmselt kui liidestada 2D-ga, peab mingit default kaamera parameetrid määrama kui neid pole
  getLocation: () => {
    // Sample URL with parameters
    const urlString = window.location.href;

    // Create a URL object
    const url = new URL(urlString);

    // Get the value of the 'viewpoint' parameter from the URL
    const viewpointParam = url.searchParams.get("viewpoint");

    // Split the viewpoint parameter to extract x, y, and z values
    if (viewpointParam) {
      const [x, y, z, heading, tilt, rotation, scale] = viewpointParam
        .split(":")[1]
        .split(",");

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
      // You can show a success message or perform other actions after copying
    } catch (err) {
      console.error("Error copying text to clipboard:", err);
      // Handle any errors that may occur while copying
    }
  },

  createURL: (view) => {
    // Get the current URL
    const currentURL = window.location.href;

    // Remove parameters from the URL
    const urlWithoutParams = currentURL.split("?")[0];

    const viewpoint = view.viewpoint;
    const { rotation, scale } = viewpoint;
    const { heading, tilt } = viewpoint.camera;
    const { x, y, z } = viewpoint.camera.position;
    const viewPointParameter = "?viewpoint=cam:";
    const sharedLocation = `${urlWithoutParams}${viewPointParameter}${x}${x},${y},${z},${heading},${tilt},${rotation},${scale}`;
    return sharedLocation;
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
