import{a as y,ak as _,b as $,s as E,km as D,aP as R,b2 as b,d as h,fw as H,fv as L,e as m,y as v,c as P,p as k,ma as T,A as d,i1 as z,ab as V,N as G,gL as O,kn as S,n as c,ko as f}from"./index-J0iiHjMT.js";import{a as I}from"./HoveredPoints-BD2phuV6.js";import{z as M,w,e as x}from"./GraphicState-2UcU5UAX.js";import"./AnchorElementViewModel-SDYg-P9c.js";import"./ExtendedLineVisualElement-YbjiXiBG.js";import"./vec4f32-NvfHy9q7.js";import"./EngineVisualElement-eZNKTKsI.js";import"./VisualElement-kjYXz27t.js";import"./Laserlines.glsl-nvjcCsAw.js";let A=class{constructor(e){this._params=e,this._highlightTask=null,this._highlightHandle=null,this._visualElementHandle=null,this._settings=new M({getTheme:()=>this._params.view.effectiveTheme})}destroy(){this.remove()}remove(){this._highlightTask=y(this._highlightTask),this._highlightHandle=_(this._highlightHandle),this._visualElementHandle=_(this._visualElementHandle)}showHighlight(e){if(this.remove(),e==null||!g(e))return;const i=e.layer;this._highlightTask=$(async t=>{const n=await this._params.view.whenLayerView(i);E(t),D(n)&&(this._highlightHandle=n.highlight(e))})}showReshaping(e){if(this.remove(),e==null)return;const i=this._params.view,t=new w({view:i,geometry:g(e)?e.geometry:null,attached:!1,elevationInfo:R(e),renderOccluded:b.OccludeAndTransparentStencil,isDecoration:!0}),n=new x({graphic:e}),s=[h(()=>n.isDraped,o=>{t.isDraped=o}),n.on("changed",()=>{t.geometry=g(e)?e.geometry:null}),i.trackGraphicState(n),i.maskOccludee(e),H(t)];this._settings.visualElements.lineGraphics.outline.apply(t),t.attached=!0,this._visualElementHandle=L(s)}};function g(a){return a.geometry!=null&&a.geometry.type==="polyline"}const C=100;let p=class extends k{constructor(a){super(a),this._chartData=null,this._visualElements=[]}initialize(){const a=T(e=>{this._update(e)},C);this.addHandles([h(()=>({spatialReference:this.view.spatialReference,chartData:this._chartData}),a,d),a])}destroy(){this._destroyVisualElements()}remove(){this._destroyVisualElements()}update(a){this._chartData=a}_update(a){const{chartData:e}=a;if(e==null)return this.remove();if(!e.refined)return;const i=this._visualElements,t=e.lines.filter(l=>l.viewVisualizationEnabled),n=t.length;for(;i.length>n;)i.pop().destroy();const s=O().profileLinesStyle3D;for(;i.length<n;){const l=new w({view:this.view,elevationInfo:{mode:"absolute-height",offset:0},innerWidth:s.width-s.outlineSize,width:s.width,falloff:s.falloff,color:s.outlineColor,renderOccluded:s.renderOccluded,isDecoration:!0});i.push(l)}const o=a.spatialReference;for(let l=0;l<n;++l){const u=i[l],r=t[n-1-l];u.geometry=this._createLineGeometry(r,o),u.innerColor=z(V.toUnitRGBA(r.color))}}_createLineGeometry(a,e){const i=a.samples??[],t=i.length-1,n=[];let s=[];for(let o=0;o<=t;o++){const{x:l,y:u,z:r}=i[o];r!=null&&s.push([l,u,r]),o!==t&&r!=null||!s.length||(n.push(s),s=[])}return new G({paths:n,hasZ:!0,spatialReference:e})}_destroyVisualElements(){this._visualElements.forEach(a=>a.destroy()),this._visualElements.length=0}};m([v()],p.prototype,"view",void 0),m([v()],p.prototype,"_chartData",void 0),p=m([P("esri.widgets.ElevationProfile.support.ProfileLines3D")],p);class Q{constructor(e,i){this._handles=new S,this._inputRepresentation=new A({view:e}),this._hoveredPoints=new I({view:e}),this._profileLines=new p({view:e}),this._handles.add([h(()=>i.viewModel.hoveredPoints,t=>this._hoveredPoints.update(t),d),h(()=>{const{state:t,editable:n,highlightEnabled:s,viewModel:o}=i,l=o.input;return l&&(l.commitProperty("geometry"),l.commitProperty("layer")),{input:l,state:t,editable:n,highlightEnabled:s}},t=>this._updateInputRepresentation(t),d),h(()=>i.viewModel.chartData,t=>this._profileLines.update(t),d),h(()=>{var t;return(t=i.viewModel.input)==null?void 0:t.geometry},()=>{this._profileLines.remove()},d)])}destroy(){this._handles=c(this._handles),this._inputRepresentation=c(this._inputRepresentation),this._hoveredPoints=c(this._hoveredPoints),this._profileLines=c(this._profileLines)}_updateInputRepresentation({input:e,state:i,editable:t,highlightEnabled:n}){const s=this._inputRepresentation;if(!n)return s.remove();i===f.Selected?s.showHighlight(e):i!==f.Created||t?s.remove():s.showReshaping(e)}}export{Q as ElevationProfileView3D};