import{e as i,y as n,T as H,kP as V,c as L,l2 as it,p as nt,d as D,n as A,ab as z,kz as st,nk as at,b9 as rt,nl as lt,nm as ot,P as $,aa as x,i3 as ut,k as dt,gD as ht,A as q,nn as pt,kS as G,i5 as ct,an as gt,kK as mt,kM as I,hl as vt,hn as R,ao as yt,kN as F,kO as wt}from"./index-J0iiHjMT.js";import{W as _t}from"./measurementUtils-St7B-HxA.js";import{O as bt}from"./SnappingVisualizer3D-KWlqByBu.js";import{G as Pt,F as ft,A as Dt}from"./dragEventPipeline3D-4CqrlxD2.js";import{e as Mt}from"./interfaces-tkyofe_Z.js";import{e as W}from"./interfaces-lHX1zDRv.js";import{$ as B,w as Lt,e as St}from"./ShadedColorMaterial.glsl-Fp4o6LjC.js";import{c as Vt}from"./Laserlines.glsl-nvjcCsAw.js";import{a as Ot}from"./AnalysisToolBase-3A13PdgS.js";import{V as $t,p as xt,w as Ct}from"./EditGeometryOperations-TPE5Wzab.js";import{d as Tt,R as Ut}from"./InteractiveToolBase-WDic4GPF.js";import{a as Ht}from"./SceneSnappingManagerPool-OpebO9Di.js";import{e as At}from"./SnappingContext-6K6JmvvY.js";import{f as kt}from"./SnappingDragPipelineStep-THHIXt-p.js";import{u as Et}from"./InteractiveAnalysisViewModel-RI-qFGDH.js";import{u as zt}from"./MeasurementWidgetContent-d8uX7Gw_.js";import"./ExtendedLineVisualElement-YbjiXiBG.js";import"./vec4f32-NvfHy9q7.js";import"./EngineVisualElement-eZNKTKsI.js";import"./VisualElement-kjYXz27t.js";import"./PointVisualElement-bX-_4FqS.js";import"./Object3DVisualElement-TMb7y_wl.js";import"./RightAngleQuadVisualElement-y_W8r903.js";import"./drawUtils-woTYaREB.js";import"./PointSnappingHint-ULetRXiW.js";import"./dehydratedFeatureComparison-hdPq-zad.js";let f=class extends it{constructor(t){super(t),this.type="direct-line-measurement",this.startPoint=null,this.endPoint=null,this.unit=null}get requiredPropertiesForEditing(){return[this.startPoint,this.endPoint]}clear(){this.startPoint=null,this.endPoint=null}};i([n({type:["direct-line-measurement"]})],f.prototype,"type",void 0),i([n({type:H})],f.prototype,"startPoint",void 0),i([n({type:H})],f.prototype,"endPoint",void 0),i([n({type:V,value:null})],f.prototype,"unit",void 0),i([n({readOnly:!0})],f.prototype,"requiredPropertiesForEditing",null),f=i([L("esri.analysis.DirectLineMeasurementAnalysis")],f);const j=f;var M;(function(t){t.Manipulators="manipulators",t.AnalysisViewDestroyed="analysis-view-destroyed",t.AnalysisView="analysis-view"})(M||(M={}));let d=class extends nt{constructor(t){super(t),this.cursorPoint=null,this._visible=!1,this._laserLine=null,this.laserLineEnabled=!0,this._lastDraggedHandle=null}initialize(){this._laserLine=new Vt({view:this.view,attached:!0,isDecoration:!0}),this._updateVisibility(this._visible),this._connectToAnalysisView(),this.addHandles(D(()=>this._params,({laserLineGlowColor:t,laserLineInnerColor:e,laserLineGlobalAlpha:s})=>{const a=this._laserLine,l=a.style;a.style={...l,innerColor:e,glowColor:t,globalAlpha:s}}))}destroy(){this._laserLine=A(this._laserLine)}get _params(){const{accentColor:t}=this.view.effectiveTheme;return{laserLineGlowColor:z.toUnitRGB(t),laserLineGlowWidth:8,laserLineGlowFalloff:8,laserLineInnerColor:z.toUnitRGB(st(t)),laserLineInnerWidth:.75,laserLineGlobalAlpha:.75*t.a,handleColor:at(t,.5),handleRadius:5}}get visible(){return this._visible}set visible(t){t?this.show():this.hide()}get testData(){const t=this._laserLine.testData,e=this.analysisViewData.testData;return{labels:e==null?void 0:e.labels,stripeLength:e==null?void 0:e.stripeLength,laserLineRenderer:{heightManifoldEnabled:t!=null&&t.heightManifoldEnabled,heightManifoldTarget:t!=null?t.heightManifoldTarget:null,pointDistanceEnabled:t!=null&&t.pointDistanceEnabled,pointDistanceOrigin:t!=null?t.pointDistanceOrigin:null,pointDistanceTarget:t!=null?t.pointDistanceTarget:null,lineVerticalPlaneEnabled:t!=null&&t.lineVerticalPlaneEnabled}}}get _cursorPosition(){const t=x(),e=this.cursorPoint;return e&&this.view.renderCoordsHelper.toRenderCoords(e,t),t}get _startPosition(){const t=x(),e=this.analysis.startPoint;return e&&this.view.renderCoordsHelper.toRenderCoords(e,t),t}get _endPosition(){const t=x(),e=this.analysis.endPoint;return e&&this.view.renderCoordsHelper.toRenderCoords(e,t),t}get _laserLineParams(){const t=this._focusPosition,{active:e,lineState:s}=this.toolState,a=this.analysisViewData,l=this.laserLineEnabled&&!!t&&s!=="measured"&&e;if(!l||!this.visible||a==null||a.destroyed)return{heightManifoldTarget:null,pointDistanceLine:null,lineVerticalPlaneSegment:null};const o=a.actualVisualizedMeasurement,r=this.view.viewingMode!=="local"&&l&&!!this.analysis.startPoint&&o==="geodesic",h=l&&a.viewMode===W.Triangle;return{heightManifoldTarget:o==="euclidean"?t:null,pointDistanceLine:r?this._pointDistanceLine:null,lineVerticalPlaneSegment:h?rt(this._startPosition,this._endPosition):null}}get _focusPosition(){const{lineState:t}=this.toolState,e=this.analysisViewData,s=e!=null&&!e.destroyed&&e.measurementMode===Mt.Euclidean&&e.viewMode===W.Direct;switch(t){case"drawing":return s?this._startPosition:this.analysis.endPoint?this._endPosition:this._startPosition;case"editing":return s?this._lastDraggedHandle==="start"?this._endPosition:this._startPosition:this._lastDraggedHandle==="start"?this._startPosition:this._endPosition;default:return this.cursorPoint!=null?this._cursorPosition:null}}get _pointDistanceLine(){return{origin:this.toolState.lineState==="drawing"||this._lastDraggedHandle==="end"?this._startPosition:this._endPosition,target:this._focusPosition}}createManipulators(){const t=this._params,{view:e}=this,s=()=>{const u=Lt(t.handleColor),P=[new St(ut(u,1,32,32))],_=new B({view:e,renderObjects:P});return _.available=!1,_.radius=t.handleRadius,[_,u]},[a,l]=s(),[o,r]=s(),h=new B({view:this.view});h.available=!1,h.interactive=!1,this.analysis.startPoint!=null&&(a.location=this.analysis.startPoint,a.available=!0),this.analysis.endPoint!=null&&(o.location=this.analysis.endPoint,o.available=!0);const g=()=>{let u=this._lastDraggedHandle;a.grabbing&&!o.grabbing&&(u="start"),o.grabbing&&!a.grabbing&&(u="end"),a.grabbing||o.grabbing||(u=null),this._lastDraggedHandle=u},b=a.events.on("grab-changed",g),w=o.events.on("grab-changed",g);return this.addHandles([b,w,D(()=>ot(this._params.handleColor),u=>{l.setParameters({color:u}),r.setParameters({color:u})},{equals:lt})],M.Manipulators),{start:a,end:o,cursor:h}}show(){this.destroyed||this._visible||this._updateVisibility(!0)}hide(){!this.destroyed&&this._visible&&this._updateVisibility(!1)}_connectToAnalysisView(){this.removeHandles(M.AnalysisView),this.addHandles([D(()=>{var t;return(t=this.analysisViewData)==null?void 0:t.destroyed},t=>{t&&this.removeHandles(M.AnalysisView)},$),D(()=>[this.toolState.lineState==="measured",this.analysisViewData],([t,e])=>{e==null||e.destroyed||(e.allowVisualElementsOrientationChange=!t)},$),D(()=>this._laserLineParams,t=>{const e=this._laserLine;e.heightManifoldTarget=t.heightManifoldTarget,e.pointDistanceLine=t.pointDistanceLine,e.lineVerticalPlaneSegment=t.lineVerticalPlaneSegment},$)],M.AnalysisView)}_updateVisibility(t){this.initialized&&(this._visible=t,t?this._laserLine.style={innerColor:this._params.laserLineInnerColor,innerWidth:this._params.laserLineInnerWidth,glowColor:this._params.laserLineGlowColor,glowWidth:this._params.laserLineGlowWidth,glowFalloff:this._params.laserLineGlowFalloff,globalAlpha:this._params.laserLineGlobalAlpha}:this.view.cursor=null,this._laserLine.visible=t)}};i([n({constructOnly:!0})],d.prototype,"view",void 0),i([n()],d.prototype,"_params",null),i([n({constructOnly:!0})],d.prototype,"analysis",void 0),i([n({constructOnly:!0})],d.prototype,"analysisViewData",void 0),i([n()],d.prototype,"cursorPoint",void 0),i([n()],d.prototype,"toolState",void 0),i([n()],d.prototype,"visible",null),i([n()],d.prototype,"testData",null),i([n()],d.prototype,"_visible",void 0),i([n()],d.prototype,"_laserLine",void 0),i([n({constructOnly:!0})],d.prototype,"laserLineEnabled",void 0),i([n()],d.prototype,"_cursorPosition",null),i([n()],d.prototype,"_startPosition",null),i([n()],d.prototype,"_endPosition",null),i([n()],d.prototype,"_lastDraggedHandle",void 0),i([n()],d.prototype,"_laserLineParams",null),i([n()],d.prototype,"_focusPosition",null),i([n()],d.prototype,"_pointDistanceLine",null),d=i([L("esri.views.3d.interactive.measurementTools.directLineMeasurement3D.DirectLineMeasurement3DView")],d);let p=class extends Ot{constructor(t){super(t),this._updatingHandles=new dt,this._emulatedDrag=null,this.lineState="initial",this.startPointSurfaceLocation=null,this.endPointSurfaceLocation=null,this.cursorPointSurfaceLocation=null,this.startManipulator=null,this.endManipulator=null,this.cursorManipulator=null,this._getSnappingContext=ht(e=>new At({elevationInfo:{mode:"absolute-height",offset:0},pointer:e,editGeometryOperations:new $t(new xt("point",Ct(!0,!1,this.view.spatialReference))),visualizer:new bt}))}initialize(){const{view:t,analysis:e,analysisViewData:s,visible:a}=this;this.measurementView=new d({toolState:this,view:t,analysis:e,analysisViewData:s,visible:a});const l=Ht(t);this._snappingManagerResult=l,this.addHandles(l);const{start:o,end:r,cursor:h}=this.measurementView.createManipulators(),g=(w,u,P)=>Tt(w,(_,J,S,k)=>{const E=Dt(_),Q=this._snappingManager,X=this._getSnappingContext(k),Y=this._updatingHandles,{lineState:Z}=this;S=S.next(E).next(Ut(this,[P,u])).next(m=>{if(u!=="cursorPoint"){const v=this.analysis[u];v!=null&&(_.location=v)}return m});const tt=ft(this.view),et=m=>{const v=tt(m);return v||this.lineState!=="drawing"&&this.lineState!=="initial"||(this[u]=null,this[P]=null),v};let O=J.next(E).next(et);if(k!=="touch"||Z==="editing"){const{snappingStep:m,cancelSnapping:v}=kt({snappingManager:Q,snappingContext:X,updatingHandles:Y});S=S.next(v),O=O.next(...m)}O.next(m=>m.action!=="start"?m:null).next(m=>{const v=gt(m.mapEnd,new H);this[u]=v,_.location=v,this[P]=this._surfaceLocation(v,m.surfaceType)})}),b=w=>w.events.on("grab-changed",()=>{const u=o.grabbing||r.grabbing;this.lineState=u?"editing":"measured"});this.addHandles([g(o,"startPoint","startPointSurfaceLocation"),g(r,"endPoint","endPointSurfaceLocation"),g(h,"cursorPoint","cursorPointSurfaceLocation"),b(o),b(r)]),this.manipulators.add(o),this.manipulators.add(r),this.manipulators.add(h),this.startManipulator=o,this.endManipulator=r,this.cursorManipulator=h,this.addHandles(D(()=>this.state,w=>{w==="measured"&&this.finishToolCreation()},q)),pt(this)}destroy(){this._updatingHandles=A(this._updatingHandles),this.measurementView=A(this.measurementView)}get _snappingManager(){return this._snappingManagerResult.snappingManager}get state(){const{analysis:t}=this;if(t.startPoint==null&&t.endPoint==null)return"ready";const{lineState:e}=this;return this.validMeasurement&&e!=="editing"&&e!=="drawing"?"measured":"measuring"}get cursor(){return this.state==="ready"||this.lineState==="drawing"?"crosshair":null}get startPoint(){return this.analysis.startPoint}set startPoint(t){this.analysis.startPoint=t}get endPoint(){return this.analysis.endPoint}set endPoint(t){this.analysis.endPoint=t}get cursorPoint(){return this.measurementView.cursorPoint}set cursorPoint(t){this.measurementView.cursorPoint=t}get snappingOptions(){return this._snappingManager.options}get validMeasurement(){return this.analysis.startPoint!=null&&this.analysis.endPoint!=null}get updating(){return this._updatingHandles.updating||this._snappingManager.updating}onShow(){this.measurementView.show(),this._updateManipulatorAvailability()}onHide(){this.measurementView.hide()}onDeactivate(){var t;(t=this._emulatedDrag)==null||t.cancel(),this._emulatedDrag=null}onInputEvent(t){switch(t.type){case"immediate-click":this._handleImmediateClick(t);break;case"pointer-move":this._handlePointerMove(t)}this._updateManipulatorAvailability()}_handlePointerMove(t){var h,g;if(!this.active||this.view.navigating)return;const{pointerType:e}=t;if(e!=="mouse")return;const s=G(t),{lineState:a,cursorManipulator:l,endManipulator:o}=this;let r=!1;this.cursorPoint==null&&((h=this._emulatedDrag)==null||h.cancel(),this._emulatedDrag=C(l,e,s),r=!0),a==="initial"&&((g=this._emulatedDrag)==null||g.update(s),r=!0),a==="drawing"&&(o.events.emit("drag",{action:"update",start:s,screenPoint:s}),r=!0),r&&t.stopPropagation()}_handleImmediateClick(t){var g,b,w,u,P;if(!this.active||!_t(t))return;const e=G(t),{pointerType:s}=t,{cursorManipulator:a,startManipulator:l,endManipulator:o,lineState:r}=this;let h=!1;switch(this.cursorPoint==null&&((g=this._emulatedDrag)==null||g.cancel(),this._emulatedDrag=C(a,s,e)),r){case"initial":if((b=this._emulatedDrag)==null||b.update(e),this.cursorPoint!=null){(w=this._emulatedDrag)==null||w.end(e),this._emulatedDrag=null;const{cursorPoint:_}=this;this.startPoint=_,this.startPointSurfaceLocation=this.cursorPointSurfaceLocation,l.location=_,l.interactive=!1,o.interactive=!1,this.lineState="drawing",this._emulatedDrag=C(o,s,e),h=!0}break;case"drawing":(u=this._emulatedDrag)==null||u.update(e),this.endPoint!=null&&((P=this._emulatedDrag)==null||P.end(e),this._emulatedDrag=null,l.interactive=!0,o.interactive=!0,this.lineState="measured",h=!0)}h&&t.stopPropagation()}_surfaceLocation(t,e){return e===Pt.GROUND?"on-the-surface":(t.z??0)>=this._getElevation(t)?"above-the-surface":"below-the-surface"}_updateManipulatorAvailability(){this.startManipulator.available=this.analysis.startPoint!=null,this.endManipulator.available=this.analysis.endPoint!=null}_getElevation(t){return this.view.basemapTerrain.ready?ct(this.view.elevationProvider,t)??0:0}get test(){return{snappingManager:this._snappingManager}}};function C(t,e,s){return t.events.emit("drag",{action:"start",pointerType:e,start:s,screenPoint:s}),{update:a=>t.events.emit("drag",{action:"update",start:a,screenPoint:a}),end:a=>t.events.emit("drag",{action:"end",start:a,screenPoint:a}),cancel:()=>t.events.emit("drag",{action:"cancel"})}}i([n({readOnly:!0})],p.prototype,"state",null),i([n()],p.prototype,"lineState",void 0),i([n({readOnly:!0})],p.prototype,"cursor",null),i([n()],p.prototype,"startPoint",null),i([n()],p.prototype,"endPoint",null),i([n()],p.prototype,"cursorPoint",null),i([n({constructOnly:!0})],p.prototype,"analysis",void 0),i([n({constructOnly:!0})],p.prototype,"analysisViewData",void 0),i([n()],p.prototype,"measurementView",void 0),i([n({constructOnly:!0})],p.prototype,"view",void 0),i([n({readOnly:!0})],p.prototype,"validMeasurement",null),i([n({value:null})],p.prototype,"startPointSurfaceLocation",void 0),i([n({value:null})],p.prototype,"endPointSurfaceLocation",void 0),i([n({value:null})],p.prototype,"cursorPointSurfaceLocation",void 0),i([n()],p.prototype,"updating",null),p=i([L("esri.views.3d.interactive.measurementTools.directLineMeasurement3D.DirectLineMeasurement3DTool")],p);const Gt=p;let y=class extends Et{constructor(e){super(e),this.analysis=null,this.supportedViewType="3d",this.unsupportedErrorMessage="DirectLineMeasurement3DViewModel is only supported in 3D views.",this._userUnit=null,this._userUnitOptions=null}initialize(){this.addHandles(D(()=>({analysis:this.analysis,unit:this.unit}),({analysis:e,unit:s})=>{e!=null&&(e.unit=s)},q))}get state(){return this.disabled||!this.ready?"disabled":this.tool==null?"ready":this.tool.state}get measurement(){if(this.tool==null)return null;const e={mode:"euclidean",directDistance:{text:null,state:"unavailable"},horizontalDistance:{text:null,state:"unavailable"},verticalDistance:{text:null,state:"unavailable"}},{analysisViewData:s}=this.tool;if(s==null)return e;const a=s.actualVisualizedMeasurement,l=s.result!=null?"available":"unavailable";switch(a){case"euclidean":return{mode:"euclidean",directDistance:{text:s.directLabelText,state:l},horizontalDistance:{text:s.horizontalLabelText,state:l},verticalDistance:{text:s.verticalLabelText,state:l}};case"geodesic":return{mode:"geodesic",directDistance:{text:null,state:"unavailable"},horizontalDistance:{text:s.horizontalLabelText,state:l},verticalDistance:{text:s.verticalLabelText,state:l}};default:return e}}set unitOptions(e){this._userUnitOptions=e,this._set("unitOptions",this._filteredOrAllUnits(this._userUnitOptions))}get unitOptions(){return this._filteredOrAllUnits(this._userUnitOptions)}set unit(e){this._userUnit=e?this._findSelectableUnit(e,this._userUnit):null}get unit(){return this._userUnit?(this._userUnit=this._findSelectableUnit(this._userUnit,this.defaultUnit),this._userUnit):this._findSelectableUnit(this.defaultUnit)}constructAnalysis(){return new j}constructTool(){return new Gt({view:this.view,analysis:this.analysis,analysisViewData:this.analysisView,visible:this.visible})}_findSelectableUnit(e,s){const a=this.unitOptions;return a.includes(e)?e:s?this._findSelectableUnit(s):a[0]}_filteredOrAllUnits(e){if(!e)return V.slice();const s=e.filter(a=>V.includes(a));return s.length===0?V.slice():s}};i([n({type:j})],y.prototype,"analysis",void 0),i([n({readOnly:!0})],y.prototype,"state",null),i([n({readOnly:!0})],y.prototype,"measurement",null),i([n()],y.prototype,"unitOptions",null),i([n()],y.prototype,"unit",null),i([n(mt)],y.prototype,"defaultUnit",void 0),i([n()],y.prototype,"_userUnit",void 0),i([n()],y.prototype,"_userUnitOptions",void 0),y=i([L("esri.widgets.DirectLineMeasurement3D.DirectLineMeasurement3DViewModel")],y);const K=y,N="esri-direct-line-measurement-3d",T={base:N,newMeasurementButton:`${N}__clear-button`,widgetIcon:wt.measureLine};let c=class extends vt{constructor(t,e){super(t,e),this.iconClass=T.widgetIcon,this.icon=null,this.messages=null,this.messagesCommon=null,this.viewModel=new K}get view(){return this.viewModel.view}set view(t){this.viewModel.view=t}get visible(){return this.viewModel.visible}set visible(t){this.viewModel.visible=t}get active(){return this.viewModel.active}get analysis(){return this.viewModel.analysis}set analysis(t){this.viewModel.analysis=t}get label(){var t;return((t=this.messages)==null?void 0:t.widgetLabel)??""}set label(t){this._overrideIfSome("label",t)}get unitOptions(){return this.viewModel.unitOptions}set unitOptions(t){this.viewModel.unitOptions=t}get unit(){return this.viewModel.unit}set unit(t){this.viewModel.unit=t}render(){const{messages:t,messagesCommon:e,unit:s,unitOptions:a,viewModel:l}=this,{active:o,measurement:r,state:h,supported:g}=l;return R("div",{"aria-label":this.messages.widgetLabel,class:this.classes(T.base,F.widget,F.panel),key:this,role:"presentation"},this.visible?R(zt,{active:o,measurementItems:[{key:"direct",title:t.direct,value:U(r==null?void 0:r.directDistance)},{key:"horizontal",title:t.horizontal,value:U(r==null?void 0:r.horizontalDistance)},{key:"vertical",title:t.vertical,value:U(r==null?void 0:r.verticalDistance)}],messages:{...t,notApplicable:e==null?void 0:e.notApplicable},newMeasurementButtonClass:T.newMeasurementButton,state:h,supported:g,unit:s,unitOptions:a,onNewMeasurementClick:()=>{yt(this.viewModel.start())},onUnitChange:b=>{this.unit=b}}):null)}};function U(t){return(t==null?void 0:t.state)==="available"?t.text:null}i([n()],c.prototype,"view",null),i([n()],c.prototype,"visible",null),i([n()],c.prototype,"active",null),i([n({constructOnly:!0,nonNullable:!0})],c.prototype,"analysis",null),i([n()],c.prototype,"iconClass",void 0),i([n()],c.prototype,"icon",void 0),i([n()],c.prototype,"label",null),i([n(),I("esri/widgets/DirectLineMeasurement3D/t9n/DirectLineMeasurement3D")],c.prototype,"messages",void 0),i([n(),I("esri/t9n/common")],c.prototype,"messagesCommon",void 0),i([n()],c.prototype,"uiStrings",void 0),i([n({type:K})],c.prototype,"viewModel",void 0),i([n()],c.prototype,"unitOptions",null),i([n()],c.prototype,"unit",null),c=i([L("esri.widgets.DirectLineMeasurement3D")],c);const ce=c;export{ce as default};