import{e as o,y as r,c as u,g as y}from"./index-pCX-0tJH.js";function f(s,c,p,i){const e=s.clone(),n=1<<e.level,l=e.col+c,a=e.row+p;return i&&l<0?(e.col=l+n,e.world-=1):l>=n?(e.col=l-n,e.world+=1):e.col=l,e.row=a,e}let t=class extends y{initialize(){}destroy(){}get supportsTileUpdates(){return!1}get spatialReference(){const s=this.tileStore.tileScheme.spatialReference;return s&&s.toJSON()||null}};o([r({readOnly:!0})],t.prototype,"supportsTileUpdates",null),o([r({constructOnly:!0})],t.prototype,"remoteClient",void 0),o([r({constructOnly:!0})],t.prototype,"service",void 0),o([r()],t.prototype,"spatialReference",null),o([r({constructOnly:!0})],t.prototype,"tileInfo",void 0),o([r({constructOnly:!0})],t.prototype,"tileStore",void 0),t=o([u("esri.views.2d.layers.features.processors.BaseProcessor")],t);const v=t;export{f as o,v as p};