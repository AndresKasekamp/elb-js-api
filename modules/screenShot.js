define(["esri/widgets/Expand"], (Expand) => ({
  setupScreenshot: (view) => {
    // the orange mask used to select the area
    const maskDiv = document.getElementById("maskDiv");

    // element where we display the print preview
    const screenshotDiv = document.getElementById("screenshotDiv");

    // the button that triggers download
    const downloadBtn = document.getElementById("downloadBtn");

    // the button to hide the print preview html element
    const closeBtn = document.getElementById("closeBtn");

    // the button that triggers area selection mode
    const screenshotBtn = document.getElementById("screenShotButton");

    const expandScreenShot = new Expand({
      expandTooltip: "Screenshot",
      view: view,
      content: screenshotBtn,
      expanded: false,
      group: "top-left",
      expandIcon: "camera-plus",
    });

    view.ui.add(screenshotBtn, "top-left");

    //view.ui.add(screenshotBtn, "top-right");
    //view.ui.add(expandScreenShot, "top-left");

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
  },
}));
