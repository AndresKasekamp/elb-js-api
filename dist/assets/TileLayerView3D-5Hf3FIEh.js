import{ct as p,E as n,e as i,y as a,c as h}from"./index-J0iiHjMT.js";import{n as u}from"./LayerView3D-iOx2MD1g.js";import{o as f}from"./TiledLayerView3D-Av58zTxG.js";import{u as m}from"./LayerView-efDufa6j.js";import{a as y}from"./RefreshableLayerView-Pd4dLcWr.js";import{S as c,G as d}from"./MapServiceLayerViewHelper-a8WMaeWS.js";import{r as g}from"./drapedUtils-9db1OpTX.js";let t=class extends y(f(u(m))){constructor(){super(...arguments),this.type="tile-3d",this._popupHighlightHelper=null}get imageFormatIsOpaque(){return this.layer.tileInfo.format==="jpg"}get hasMixedImageFormats(){return this.layer.tileInfo.format==="mixed"}get tileInfo(){return this.layer.tileInfo}initialize(){var e,r;if(this.layer.type==="web-tile"){const l=(e=this.layer.fullExtent)==null?void 0:e.spatialReference,s=(r=this.layer.tileInfo)==null?void 0:r.spatialReference;if(l==null||s==null||!p(l,s)){const o=this.layer.originOf("fullExtent")==="defaults"||this.layer.fullExtent==null?"SceneView requires fullExtent to be specified by the user on WebTileLayer":"SceneView requires fullExtent to be specified in the same spatial reference as tileInfo on WebTileLayer";this.addResolvingPromise(Promise.reject(new n("layerview:incompatible-fullextent",o)))}}c(this,this.layer)&&(this._popupHighlightHelper=new d({createFetchPopupFeaturesQueryGeometry:(l,s)=>g(l,s,this.view),layerView:this,updatingHandles:this._updatingHandles})),this._addTilingSchemeMatchPromise()}destroy(){var e;(e=this._popupHighlightHelper)==null||e.destroy()}async fetchPopupFeatures(e,r){return this._popupHighlightHelper?this._popupHighlightHelper.fetchPopupFeatures(e,r):[]}async doRefresh(){this.suspended||this.emit("data-changed")}};i([a()],t.prototype,"imageFormatIsOpaque",null),i([a()],t.prototype,"hasMixedImageFormats",null),i([a()],t.prototype,"layer",void 0),i([a()],t.prototype,"tileInfo",null),t=i([h("esri.views.3d.layers.TileLayerView3D")],t);const E=t;export{E as default};