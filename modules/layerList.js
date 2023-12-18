// TODO siin saaks veel sättida layerList with actions et sättida opacity slideriga ning saada informatsiooni kihi kohta portaalist
// TODO selleks peaks aga esmalt listima kõik kihid selle all ära või proovima teha seda esmalt läbi sidemastide

const basemapIds = [
  "be99602fc02d448eb859a0b426c0d5b6",
  "b6517d264b8f467fa5b14c382dfdf87a",
  "c5773442e91c48c392f28af6600169d0",
  "1bc7e98137fe44129dd6653bef1920d0",
  "287be80ff31d4c8babc48b2f959214f5",
  "4ee7ecad357844bba5b95001de39f1e3",
  "e5c6a086a5ae4d1991d4ca35733fe0ed",
];

define([
  "esri/widgets/LayerList",
  "esri/widgets/Expand",
  "esri/Basemap",
  "esri/widgets/BasemapGallery",
], (LayerList, Expand, Basemap, BasemapGallery) => ({
  setupLayerList: (view) =>
    new LayerList({
      view,
      icon: "map-contents",
      listItemCreatedFunction: (event) => {
        const item = event.item;

        if (item.layer.type !== "group") {
          // don't show legend twice
          item.panel = {
            content: "legend",
            open: false,
            className: "esri-icon-legend",
            title: "Leppemärgid",
          };
        }
      },
    }),

  setupExpand: (
    toolTipText,
    view,
    content,
    expanded,
    group,
    expandIcon = null
  ) =>
    new Expand({
      expandTooltip: toolTipText,
      view,
      content,
      expanded,
      group,
      expandIcon,
    }),

  setupBasemapGallery: (view) =>
    new BasemapGallery({
      view,
      icon: "layer-basemap",
      source: basemapIds.map(
        (id) =>
          new Basemap({
            portalItem: {
              id,
            },
          })
      ),
    }),
}));
