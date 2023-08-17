// TODO lisada BASEMAP with Z?
// TODO koordinaatide conversion on ikka lappes

define([
  "esri/widgets/CoordinateConversion",
  "esri/widgets/CoordinateConversion/support/Format",
  "esri/geometry/Point",
  "esri/geometry/support/webMercatorUtils",
], (CoordinateConversion, Format, Point, webMercatorUtils) => ({
  setupCoordinateWidget: (view) =>
    new CoordinateConversion({
      view: view,
    }),

  setupNewFormat: (numberSearchPattern) =>
    new Format({
      // The format's name should be unique with respect to other formats used by the widget
      name: "XYZ",
      conversionInfo: {
        // Define a convert function
        // Point -> Position
        convert: function (point) {
          const returnPoint = point;
          const x = returnPoint.x.toFixed(2);
          const y = returnPoint.y.toFixed(2);
          const z = returnPoint.z.toFixed(2);
          return {
            location: returnPoint,
            coordinate: `${x}, ${y}, ${z}`,
          };
        },
        // Define a reverse convert function
        // String -> Point
        reverseConvert: function (string) {
          const parts = string.split(",");
          return new Point({
            x: parseFloat(parts[0]),
            y: parseFloat(parts[1]),
            z: parseFloat(parts[2]),
            spatialReference: { wkid: 3301 },
          });
        },
      },
      // Define each segment of the coordinate
      coordinateSegments: [
        {
          alias: "X",
          description: "Longitude",
          searchPattern: numberSearchPattern,
        },
        {
          alias: "Y",
          description: "Latitude",
          searchPattern: numberSearchPattern,
        },
        {
          alias: "Z",
          description: "Elevation",
          searchPattern: numberSearchPattern,
        },
      ],
      defaultPattern: "X, Y, Z",
    }),
}));
