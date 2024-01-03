import{p as E,gC as F,d as h,P as d,fl as V,gD as C,gE as D,gF as $,s as p,e as o,y as r,c as A,gG as I}from"./index-J0iiHjMT.js";import{o as G,a as P}from"./queryEngineUtils-0F1SWi13.js";import{i as v,r as q,n as S}from"./symbologySnappingCandidates-Sz0MFOvR.js";import"./VertexSnappingCandidate-sgrBHAMS.js";import"./PointSnappingHint-ULetRXiW.js";let a=class extends E{get availability(){return 1}get updating(){return this.layerSource.updating}get _snappingElevationAligner(){const{view:e}=this,{layer:t}=this.layerSource,i=e!=null&&e.type==="3d";if(!i||t.type==="subtype-group")return v();const n=async(l,s)=>(await I(e.whenLayerView(t),s)).elevationAlignPointsInFeatures(l,s);return v(i,{elevationInfo:t.elevationInfo,alignPointsInFeatures:n})}get _snappingElevationFilter(){const{view:e}=this,t=e!=null&&e.type==="3d"&&this.layerSource.layer.type!=="subtype-group";return q(t)}get _symbologySnappingFetcher(){const{view:e}=this,{layer:t}=this.layerSource;return e!=null&&e.type==="3d"&&t.type!=="subtype-group"?S(this._symbologySnappingSupported,async(i,n)=>{const l=await e.whenLayerView(t);return p(n),l.queryForSymbologySnapping({candidates:i,spatialReference:e.spatialReference},n)}):S()}get _symbologySnappingSupported(){return this._layerView3D!=null&&this._layerView3D.symbologySnappingSupported}initialize(){const{view:e}=this,{layer:t}=this.layerSource;e!=null&&e.type==="3d"&&t.type!=="subtype-group"&&(e.whenLayerView(t).then(i=>this._layerView3D=i),this.addHandles([e.elevationProvider.on("elevation-change",({context:i})=>{const{elevationInfo:n}=t;F(i,n)&&this._snappingElevationAligner.notifyElevationSourceChange()}),h(()=>t.elevationInfo,()=>this._snappingElevationAligner.notifyElevationSourceChange(),d),h(()=>{var i;return this._layerView3D!=null?(i=this._layerView3D.processor)==null?void 0:i.renderer:null},()=>this._symbologySnappingFetcher.notifySymbologyChange(),d),V(()=>{var i;return(i=this._layerView3D)==null?void 0:i.layer},["edits","apply-edits","graphic-update"],()=>this._symbologySnappingFetcher.notifySymbologyChange())]))}constructor(e){super(e),this.view=null,this._layerView3D=null,this._memoizedMakeGetGroundElevation=C(G)}refresh(){}async fetchCandidates(e,t){var c;const{layer:i}=this.layerSource,n=i.source;if(!(n!=null&&n.querySnapping))return[];const l=D(i),s=$(e,((c=this.view)==null?void 0:c.type)??"2d",l),w=await n.querySnapping(s,{signal:t});p(t);const g=e.coordinateHelper.spatialReference,y=await this._snappingElevationAligner.alignCandidates(w.candidates,g,t);p(t);const u=await this._symbologySnappingFetcher.fetch(y,t);p(t);const m=u.length===0?y:[...y,...u],_=this._snappingElevationFilter.filter(s,m),f=this._memoizedMakeGetGroundElevation(this.view,g);return _.map(b=>P(b,f))}};o([r({constructOnly:!0})],a.prototype,"layerSource",void 0),o([r({constructOnly:!0})],a.prototype,"view",void 0),o([r()],a.prototype,"_snappingElevationAligner",null),o([r()],a.prototype,"_snappingElevationFilter",null),o([r()],a.prototype,"_symbologySnappingFetcher",null),o([r()],a.prototype,"_layerView3D",void 0),o([r()],a.prototype,"_symbologySnappingSupported",null),a=o([A("esri.views.interactive.snapping.featureSources.FeatureCollectionSnappingSource")],a);export{a as FeatureCollectionSnappingSource};