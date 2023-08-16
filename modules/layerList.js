define([
  "esri/widgets/LayerList",
  "esri/widgets/Expand",
  "esri/Basemap",
  "esri/widgets/BasemapGallery",
], (LayerList, Expand, Basemap, BasemapGallery) => ({
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

  setupBasemapGallery: (view, basemapIds) =>
    new BasemapGallery({
      view: view,
      source: basemapIds.map(
        (id) =>
          new Basemap({
            portalItem: {
              id: id,
            },
          })
      ),
    }),
}));
