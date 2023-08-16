define(["esri/widgets/LayerList", "esri/widgets/Expand"], (
  LayerList,
  Expand
) => ({
  setupLayerList: (view) =>
    new LayerList({
      view: view,
    }),

  setupExpand: (toolTipText, view, content, expanded) =>
    new Expand({
      expandTooltip: toolTipText,
      view: view,
      content: content,
      expanded: expanded,
    }),
}));
