require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/widgets/LineOfSight",
  "esri/widgets/Expand",
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/widgets/LayerList",
  "esri/widgets/CoordinateConversion",
], (
  WebScene,
  SceneView,
  LineOfSight,
  Expand,
  Point,
  Graphic,
  LayerList,
  CoordinateConversion
) => {
  /************************************************************
   * Load a web scene and set it to the map property in a SceneView.
   ************************************************************/
  const scene = new WebScene({
    portalItem: {
      id: "92d29869db444e28beab584f696b86c3",
    },
  });

  const view = new SceneView({
    map: scene,
    container: "viewDiv",
  });

  /**************************************
   * Adding a layer group, expand o
   * TODO add a basemap
   **************************************/
  view.when(() => {
    const layerList = new LayerList({
      view: view,
    });

    // add an Expand widget to make the menu responsive
    const expand2 = new Expand({
      expandTooltip: "LoL",
      view: view,
      content: layerList,
      expanded: false,
    });

    view.ui.add(expand2, "top-left");
  });

  /**************************************
   *  Coordinate tool
   * TODO add z
   **************************************/
  const ccWidget = new CoordinateConversion({
    view: view,
  });

  view.ui.add(ccWidget, "bottom-left");

  /**************************************
   * Initialize the LineOfSight widget
   **************************************/

  const lineOfSight = new LineOfSight({
    view: view,
  });

  /**************************************
   * Create expand
   **************************************/

  // add an Expand widget to make the menu responsive
  const expand = new Expand({
    expandTooltip: "Expand line of sight widget",
    view: view,
    content: lineOfSight,
    expanded: true,
  });

  view.ui.add(expand, "top-right");
});
