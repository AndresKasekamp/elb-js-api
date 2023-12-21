define([], () => ({
  getLocation: () => {
    // Sample URL with parameters
    const urlString = window.location.href;

    // Create a URL object
    const url = new URL(urlString);

    // Get the value of the 'viewpoint' parameter from the URL
    const viewpointParam = url.searchParams.get("viewpoint");

    // Split the viewpoint parameter to extract x, y, and z values
    if (viewpointParam) {
      const [x, y, z] = viewpointParam.split(":")[1].split(",");

      // Convert strings to numbers if needed
      const parsedX = parseFloat(x);
      const parsedY = parseFloat(y);
      const parsedZ = parseFloat(z);

      return [parsedX, parsedY, parsedZ];
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

    const { x, y, z } = view.viewpoint.targetGeometry;
    const viewPointParameter = "?viewpoint=cam:";
    const sharedLocation = `${urlWithoutParams}${viewPointParameter}${x}${x},${y},${z}`;
    return sharedLocation;
  },
}));
