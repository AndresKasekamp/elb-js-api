import{ho as Zt,E as Qt,pB as Ct,ah as Wt,fj as Yt,j as jt,hn as Kt,gh as Rt,kR as qt,dY as lt,hO as Jt,a8 as M,pC as Xt,dX as Bt,pD as te,pE as ee,L as Pt,bz as ot,b6 as ie,d8 as dt,b4 as oe,bL as ne,pF as re,pG as ae,pH as j,d7 as se,da as le,pI as nt,hr as K,bx as rt,d2 as yt,pJ as pe,pK as ce,bw as gt,nC as at,pL as St,pM as ue,pN as he,nw as de,cD as ye,by as ge,pO as fe,pP as ve,bv as me,pQ as xe,e as r,y as l,c as V,g as we,pi as _e,w,bu as q,cp as pt,pR as Ut,iD as $e,pS as F,cK as Oe,z as be,nz as kt,A as Et,gA as N,G as Te,B as ft,pT as Ie,b as H,pU as Me,K as Ve,a0 as vt,nE as ze,dw as Ge,T as mt,b1 as Ce,bO as Re,pV as J,pW as xt,bN as wt,ca as _t,pX as $t,o7 as Pe,hJ as E,b_ as Z,pY as Ot,pZ as Se,p_ as Ue,Z as ke,hK as B,hI as bt}from"./index-pCX-0tJH.js";import{g as v,F as Tt}from"./drawSurfaces-t1mGEx1r.js";import{l as Ee}from"./InteractiveToolBase-6mltmL27.js";import{i as Dt}from"./measurementUtils-69EiqRp6.js";import{s as A,p as De,d as Le,a as tt,u as Fe}from"./Tooltip-a9KqLK1p.js";import{o as It}from"./automaticAreaMeasurementUtils-kRuWnHc-.js";import{t as Ae,a as Ne,s as He,c as Ze}from"./EditGeometryOperations-vpHcsZOg.js";function S(t,e){const i=new Pt({x:t[0],y:t[1],spatialReference:e});return t.length>2&&(i.z=t[2]),i}function Qe(t,e){return new Zt({points:t,spatialReference:e})}function Mt(t,e,i){const o=new Qt({paths:t,spatialReference:e});return i&&Ct(o),o}function U(t,e,i,o=!0){const s=Wt(t);s.forEach(a=>{const u=a[0],p=a[a.length-1];Yt(u,p)&&a.length!==1||a.push(a[0])});let n=new jt({rings:s,spatialReference:e});return n.rings.forEach(a=>{Kt(a)||a.reverse()}),i&&Ct(n),o&&n.isSelfIntersecting&&Rt(e)&&(n=qt(n)),n}function Vt(t,e,i){const o=e.mapToLocalMultiple(t),s=[],n={x:o[0].x,y:o[0].y},a={x:o[1].x,y:o[1].y},u=Math.round(a.x-n.x),p=Math.round(a.y-n.y),h=Math.max(Math.abs(u),Math.abs(p));if(i){const y={x:n.x+h,y:n.y+h},g={x:n.x-h,y:n.y-h};s.push(v(y.x,g.y),v(g.x,g.y),v(g.x,y.y),v(y.x,y.y))}else{const y={x:u>0?n.x+h:n.x-h,y:p>0?n.y+h:n.y-h};s.push(v(n.x,n.y),v(y.x,n.y),v(y.x,y.y),v(n.x,y.y))}return Lt(U([s.map(y=>e.localToMap(y)).filter(lt)],e.spatialReference,e.doUnnormalization,!0),s,e)}function We(t,e,i){let o=e.mapToLocalMultiple(t);if(o.length===1){const p=o[0];o=[v(p.x-48,p.y+48),v(p.x+48,p.y-48),v(p.x+48,p.y-48),v(p.x-48,p.y+48)]}const s=[],n={x:o[0].x,y:o[0].y},a={x:o[1].x,y:o[1].y};if(i){const u=Math.round(a.x-n.x),p=Math.round(a.y-n.y);s.push(v(n.x-u,n.y-p),v(a.x,n.y-p),v(a.x,a.y),v(n.x-u,a.y))}else s.push(v(n.x,n.y),v(a.x,n.y),v(a.x,a.y),v(n.x,a.y));return Lt(U([s.map(u=>e.localToMap(u)).filter(lt)],e.spatialReference,e.doUnnormalization,!0),s,e)}function Lt(t,e,i){const o=Q(e[3],e[2],i),s=Q(e[1],e[2],i),n=Q(e[0],e[1],i),a=Q(e[0],e[3],i);return{geometry:t,midpoints:o!=null&&s!=null&&n!=null&&a!=null?{top:o,right:s,bottom:n,left:a}:null}}function Q(t,e,i){D[0]=t.x,D[1]=t.y,D[2]=0,L[0]=e.x,L[1]=e.y,L[2]=0,Jt(D,D,L,.5),W.x=D[0],W.y=L[1],W.z=L[2];const o=i.localToMap(W);return o!=null?S(o,i.spatialReference):null}const W=v(0,0,0),D=M(),L=M();function zt(t,e,i,o){const s=e.mapToLocalMultiple(t);let n=null,a=null;if(i)n=s[0],a=s[1];else{const f=s[0],x=s[1],_=Math.round(x.x-f.x),k=Math.round(x.y-f.y),O=Math.max(Math.abs(_),Math.abs(k));n=v(_>0?f.x+O/2:f.x-O/2,k>0?f.y+O/2:f.y-O/2),a=v(Math.abs(_)>Math.abs(k)?n.x-O/2:n.x,Math.abs(_)>Math.abs(k)?n.y:n.y-O/2)}const u=e.localToMap(n),p=e.localToMap(a);if(u==null||p==null)return null;e.doUnnormalization&&Xt([[u,p]],e.spatialReference);const h=S(u,e.spatialReference),y=S(p,e.spatialReference),g=Bt(e.spatialReference);let c=0;if(Rt(e.spatialReference))c=g*te(h,y,null);else{const f=n.x-a.x,x=n.y-a.y;c=g*Math.sqrt(f*f+x*x)*(o||1)}const C=new ee({center:h,radius:c,radiusUnit:"meters",spatialReference:e.spatialReference});return{geometry:U(C.rings,C.spatialReference,!1),center:h,edge:y}}function Ye(t,e,i){const o=e.mapToLocalMultiple(t),s=o[0],n=o[1],a=Math.round(n.x-s.x),u=Math.round(n.y-s.y),p=v(i?s.x:s.x+a/2,i?s.y:s.y+u/2),h=i?a:a/2,y=i?u:u/2,g=60,c=[],C=2*Math.PI/g;function f(z){const Nt=Math.cos(z),Ht=Math.sin(z);return v(h*Nt+p.x,y*Ht+p.y)}for(let z=0;z<g;z++)c.push(f(z*C));c.push(c[0]);const{spatialReference:x,doUnnormalization:_}=e,k=U([c.map(z=>e.localToMap(z)).filter(lt)],x,_,!1),O=e.localToMap(f(Math.PI/2)),ct=e.localToMap(f(0)),ut=e.localToMap(f(-Math.PI/2)),ht=e.localToMap(f(Math.PI));return{geometry:k,midpoints:O!=null&&ct!=null&&ut!=null&&ht!=null?{top:S(O,x),right:S(ct,x),bottom:S(ut,x),left:S(ht,x)}:null}}function et(t,e){switch(t){case"point":case"multipoint":return je();case"polyline":return Ke(e);case"polygon":return qe(e);default:return}}function je(t){return"point"}function Ke(t){return(t!=null&&t.type==="polyline"&&t.paths.length?t.paths[0].length:0)<2?"polylineZeroVertices":"polylineOneVertex"}function qe(t){const e=t!=null&&t.type==="polygon"&&t.rings.length?t.rings[0].length:0;return e<3?"polylineZeroVertices":e<4?"polygonOneVertex":"polygonTwoVertices"}const Je=(()=>{const t=M(),e=M(),i=M();return(o,s)=>{if(ot(e,o.x,o.y,o.z??0),ot(i,s.x,s.y,s.z??0),ie(e,i))return null;if(!dt(e,o.spatialReference,e)||!dt(i,s.spatialReference,i)){oe(t,i,e),t[2]=0,ne(t,t);let a=re(ae,t);return t[0]<0&&(a=2*Math.PI-a),j(a,"radians","geographic")}const{azimuth:n}=se(Be,e,i);return n!=null?j(n,"degrees","geographic"):void 0}})(),Xe=(()=>{const t=M(),e=M();return({x:i,y:o,z:s,spatialReference:n},a,u)=>{const p=s??0;ot(t,i,o,p);const h=nt(K(u.value,u.unit,"degrees"),u.rotationType,"geographic");if(!rt(t,n,t,yt.WGS84)){const y=nt(h,"geographic","arithmetic"),g=K(y,"degrees","radians");return new Pt({x:i+a*Math.cos(g),y:o+a*Math.sin(g),z:p,spatialReference:n})}return pe(e,t,h,a),e[2]=p,ce(e,yt.WGS84,n)}})(),Be=new le;function ti(t,e,i,o){if(!e)return;const{spatialReference:s}=t;if(!gt(s))return;const n=Dt(s),a=gt(n);if(!a)return;const u=at(t,i,o),p=ni;if(!rt(u,s,p,n))return;const h=St(e,a);if((i==null?void 0:i.type)==="3d"&&i.viewingMode==="local")p[0]+=h;else{const g=ue(n),c=he(g,p,de.X,ri);ye(p,p,c,h)}if(!rt(p,n,p,s))return;const y=ge(u,p);return new fe(u,y)}function ei(t,e,i,o){if(!e)return;const s=at(t,i,o),n=Xe(t,1,e);if(!n)return;const a=at(n,i,o);return new ve(s,a)}function ii(t,e,i,o){if(t==null)return;const s=Dt(e),n=me(s);return n?new xe(St(t,n)):void 0}function oi(t){let e;for(const i of t)i&&(e=(e==null?void 0:e.intersect(i))??i);return e}const ni=M(),ri=M();let m=class extends we{constructor(e){super(e),this.committed=null,this.disabled=!1,this.hidden=!1,this.id=_e(),this.inputValue=null,this.readOnly=!1}get dirty(){return this.inputValue!=null}get locked(){return this.committed!=null}lock(e){this.inputValue=null,this.committed=e??this.actual}unlock(){this.committed=null,this.inputValue=null}};r([l()],m.prototype,"actual",void 0),r([l()],m.prototype,"committed",void 0),r([l()],m.prototype,"createQuantity",void 0),r([l()],m.prototype,"disabled",void 0),r([l()],m.prototype,"hidden",void 0),r([l()],m.prototype,"format",void 0),r([l()],m.prototype,"id",void 0),r([l()],m.prototype,"inputValue",void 0),r([l()],m.prototype,"readOnly",void 0),r([l()],m.prototype,"suffix",void 0),r([l()],m.prototype,"title",void 0),r([l()],m.prototype,"toInputUnits",void 0),r([l()],m.prototype,"dirty",null),r([l()],m.prototype,"locked",null),m=r([V("esri.views.interactive.tooltip.fields.TooltipField")],m);let Y=class extends m{constructor(e){super(e),this.mode="absolute-height"}normalizeCtorArgs(e){const i=o=>o.inputUnitInfos.verticalLength.unit;return{actual:w,createQuantity:(o,s)=>q(o,i(s)),toInputUnits:(o,s)=>pt(o,i(s)),format:(o,s)=>s.formatters.verticalLength(o),suffix:o=>o.inputUnitInfos.verticalLength.abbreviation,title:o=>o.messages.sketch.elevation,...e}}};r([l()],Y.prototype,"mode",void 0),Y=r([V("esri.views.interactive.tooltip.fields.TooltipFieldElevation")],Y);const Ft=t=>{const e=i=>i.inputUnitInfos.orientation.unit;return new m({actual:Ut,createQuantity:(i,o)=>j(i,e(o),"geographic"),toInputUnits:({value:i,unit:o,rotationType:s},n)=>{const p=nt(K(i,o,"degrees"),s,"geographic"),h=$e.normalize(p,0,!0),y=e(n),g=K(h,"degrees",y);return j(g,y,"geographic")},format:(i,o)=>o.formatters.angle(i),suffix:i=>i.inputUnitInfos.orientation.abbreviation,title:i=>i.messages.sketch.orientation,...t})},st=t=>{const e=i=>i.inputUnitInfos.length.unit;return new m({actual:w,createQuantity:(i,o)=>q(i,e(o)),toInputUnits:(i,o)=>pt(i,e(o)),format:(i,o)=>o.formatters.length(i),suffix:i=>i.inputUnitInfos.length.abbreviation,title:i=>i.messages.sketch.distance,...t})},X=t=>new Y(t),ai=t=>{const e=i=>i.inputUnitInfos.area.unit;return new m({actual:F,createQuantity:(i,o)=>Oe(i,e(o)),toInputUnits:(i,o)=>pt(i,e(o)),format:(i,o)=>o.formatters.area(i),suffix:i=>i.inputUnitInfos.area.abbreviation,title:i=>i.messages.sketch.area,...t})};let R=class extends A{constructor(e){super(e),this.type="draw-point",this.elevation=X()}get allFields(){return[this.elevation]}};r([l()],R.prototype,"type",void 0),r([l()],R.prototype,"elevation",void 0),r([l()],R.prototype,"allFields",null),r([l()],R.prototype,"helpMessage",void 0),R=r([V("esri.views.interactive.tooltip.DrawPointTooltipInfo")],R);let $=class extends A{constructor(t){super(t),this.type="draw-polyline",this.orientation=Ft(),this.distance=st({title:e=>e.messages.sketch.distance}),this.elevation=X(),this.totalLength=st({format:(e,i)=>i.formatters.totalLength(e),title:e=>e.messages.sketch.totalLength,readOnly:!0})}get allFields(){return[this.orientation,this.distance,this.elevation,this.totalLength]}};r([l()],$.prototype,"type",void 0),r([l()],$.prototype,"orientation",void 0),r([l()],$.prototype,"distance",void 0),r([l()],$.prototype,"elevation",void 0),r([l()],$.prototype,"totalLength",void 0),r([l()],$.prototype,"allFields",null),r([l()],$.prototype,"helpMessage",void 0),$=r([V("esri.views.interactive.tooltip.DrawPolylineTooltipInfo")],$);let T=class extends A{constructor(t){super(t),this.type="draw-polygon",this.orientation=Ft(),this.distance=st({title:e=>e.messages.sketch.distance}),this.elevation=X(),this.area=ai({readOnly:!0})}get allFields(){return[this.orientation,this.distance,this.elevation,this.area]}};r([l()],T.prototype,"type",void 0),r([l()],T.prototype,"distance",void 0),r([l()],T.prototype,"elevation",void 0),r([l()],T.prototype,"area",void 0),r([l()],T.prototype,"allFields",null),r([l()],T.prototype,"helpMessage",void 0),T=r([V("esri.views.interactive.tooltip.DrawPolygonTooltipInfo")],T);let P=class extends A{constructor(e){super(e),this.type="draw-mesh",this.elevation=X()}get allFields(){return[this.elevation]}};r([l()],P.prototype,"type",void 0),r([l()],P.prototype,"elevation",void 0),r([l()],P.prototype,"allFields",null),r([l()],P.prototype,"helpMessage",void 0),P=r([V("esri.views.interactive.tooltip.DrawMeshTooltipInfo")],P);let G=class extends A{constructor(e){super(e),this.type="draw-rectangle",this.xSize=w,this.ySize=w,this.area=F}get allFields(){return[]}};r([l()],G.prototype,"type",void 0),r([l()],G.prototype,"xSize",void 0),r([l()],G.prototype,"ySize",void 0),r([l()],G.prototype,"area",void 0),r([l()],G.prototype,"allFields",null),G=r([V("esri.views.interactive.tooltip.DrawRectangleTooltipInfo")],G);let I=class extends A{constructor(t){super(t),this.type="draw-circle",this.radius=null,this.xSize=null,this.ySize=null,this.area=F}get allFields(){return[]}};r([l()],I.prototype,"type",void 0),r([l()],I.prototype,"radius",void 0),r([l()],I.prototype,"xSize",void 0),r([l()],I.prototype,"ySize",void 0),r([l()],I.prototype,"area",void 0),r([l()],I.prototype,"allFields",null),I=r([V("esri.views.interactive.tooltip.DrawCircleTooltipInfo")],I);class si{constructor(){this.regularVertices=null,this.activeVertex=null,this.full=null,this.outline=null,this.circle=null,this.rectangle=null}}let d=class extends be.EventedMixin(Ee){constructor(t){super(t),this._graphic=null,this._createOperationGeometry=null,this.defaultZ=0,this.geometryType=null,this.hasZ=!0,this.labelOptions=new kt,this.geometryToPlace=null,this.mode=null,this.snappingManager=null,this.snapToScene=!1,this.tooltip=null,this.tooltipOptions=new Et,this._getPointConstraint=N(e=>e),this._getPolylineOrPolygonConstraint=N((e,i,o)=>oi([e,i,o])),this._getDistanceConstraint=N(ti),this._getOrientationConstraint=N(ei),this._getElevationConstraint=N(ii)}initialize(){this.internalGraphicsLayer=new Te({listMode:"hide",internal:!0}),this.view.map.layers.add(this.internalGraphicsLayer),this.drawOperation=this.makeDrawOperation();const t=this.tooltipOptions,e=this.view.type;this.tooltipInfos={point:new R({tooltipOptions:t,viewType:e}),polyline:new $({tooltipOptions:t,viewType:e}),polygon:new T({tooltipOptions:t,viewType:e}),mesh:new P({tooltipOptions:t,viewType:e}),rectangle:new G({tooltipOptions:t}),circle:new I({tooltipOptions:t})},this.addHandles([this.drawOperation.on("vertex-add",i=>this.onVertexAdd(i)),this.drawOperation.on("vertex-remove",i=>this.onVertexRemove(i)),this.drawOperation.on("vertex-update",i=>this.onVertexUpdate(i)),this.drawOperation.on("cursor-update",i=>this.onCursorUpdate(i)),this.drawOperation.on("complete",i=>this.onComplete(i)),ft(()=>this.cursor,i=>{this.drawOperation.cursor=i},mt),ft(()=>this.tooltipOptions.enabled,i=>{this.tooltip=i?new Fe({view:this.view,info:this._tooltipInfo}):H(this.tooltip)},mt),Ie(()=>this._updateTooltipInfo())]),this.finishToolCreation()}destroy(){this.drawOperation=H(this.drawOperation),this.tooltip=H(this.tooltip),this._destroyAllVisualisations(),this.view.map.remove(this.internalGraphicsLayer),this.internalGraphicsLayer=H(this.internalGraphicsLayer),this._set("view",null)}get _defaultElevation(){return q(this.defaultZ,"meters")}get canRedo(){return this.drawOperation.canRedo}get canUndo(){return this.drawOperation.canUndo}set centered(t){this._set("centered",t),this._updateGraphic()}get cursor(){return this._get("cursor")}set cursor(t){this._set("cursor",t)}set enabled(t){this.drawOperation.interactive=t,this._set("enabled",t)}set forceUniformSize(t){this._set("forceUniformSize",t),this._updateGraphic()}get graphic(){return this._graphic}set graphicSymbol(t){this._set("graphicSymbol",t),this._graphic!=null&&(this._graphic.symbol=t)}get updating(){var t;return((t=this.drawOperation)==null?void 0:t.updating)??!1}completeCreateOperation(){this.drawOperation.complete()}onInputEvent(t){const e=this._tooltipInfo;if(t.type==="key-down"&&t.key===Me.enterInputMode&&e!=null&&e.editableFields.length>0&&this.tooltipOptions.inputEnabled)return e.enterInputMode(),void t.stopPropagation();this.drawOperation.onInputEvent(t)}redo(){this.drawOperation.redo()}reset(){}undo(){this.drawOperation.undo()}_destroyAllVisualisations(){this.removeHandles(b.outline),this.removeHandles(b.regularVertices),this.removeHandles(b.activeVertex),this.removeHandles(it)}_createOrUpdateGraphic(t){if(this._graphic!=null)return this.updateGraphicGeometry(this._graphic,t),this._graphic;const e=this._graphic=new Ve({...this.graphicProperties,symbol:this.graphicSymbol});return this.updateGraphicGeometry(e,t),this.internalGraphicsLayer.add(e),this.addHandles(this.initializeGraphic(e)),this.notifyChange("graphic"),this.addHandles(vt(()=>{this.internalGraphicsLayer.remove(e),H(e),this._graphic===e&&(this._graphic=null)}),it),e}updateGraphicGeometry(t,e){t.geometry=e}_getCreateOperationGeometry(t={operationComplete:!1}){var C;const{drawOperation:e}=this;if(e==null||e.numVertices===0)return null;const{coordinateHelper:i,view:o}=e,s=e.stagedVertex,n=e.committedVertices,a=n.slice(),u=s!=null;u&&a.push(i.pointToArray(s));const p=u?i.pointToArray(s):n.splice(-1)[0],h=a.length,y=o.spatialReference,g=o.type==="3d"&&o.viewingMode==="global",c=new si;switch(this.geometryType){case"point":case"mesh":c.regularVertices=n,c.activeVertex=p,c.full=i.arrayToPoint(a[0]);break;case"multipoint":c.regularVertices=n,c.activeVertex=p,h>0&&(c.full=Qe(a,y));break;case"polyline":c.regularVertices=n,c.activeVertex=p,h>0&&(c.full=Mt([a],y,g));break;case"polygon":c.regularVertices=n,c.activeVertex=p,h>0&&(c.full=U([a],y,g,!0));break;case"circle":if(h>0){const f=Tt(o,a[0]);if(h===1&&t.operationComplete){const x=a[0],_=f.makeMapPoint(x[0]+Gt*o.resolution,x[1]);c.circle=zt([x,_],f,!0),c.full=c.circle!=null?c.circle.geometry:null}else h===2&&(this.forceUniformSize?(c.circle=zt(a,f,this.centered),c.full=c.circle!=null?c.circle.geometry:null):(c.rectangle=Ye(a,f,this.centered),c.full=c.rectangle.geometry))}break;case"rectangle":if(h>0){const f=Tt(o,a[0]);if(h===1&&t.operationComplete){const x=a[0],_=f.makeMapPoint(x[0]+Gt*o.resolution,x[1]);c.rectangle=Vt([x,_],f,!0),c.full=c.rectangle.geometry}else h===2&&(c.rectangle=this.forceUniformSize?Vt(a,f,this.centered):We(a,f,this.centered),c.full=c.rectangle.geometry)}break;default:return null}switch(this.geometryType){case"point":case"multipoint":break;case"polyline":c.outline=h>1?Mt([a],y,g):null;break;case"polygon":c.outline=h>1?U([a],y,g):null;break;case"circle":case"rectangle":c.outline=((C=c.full)==null?void 0:C.type)==="polygon"?U(c.full.rings,y,g):null}return c}initializeGraphic(t){return vt()}onComplete(t){this._updateGraphic();let e=null;if(this.drawOperation.isCompleted){const i=this._getCreateOperationGeometry({operationComplete:!0});i!=null&&(e=this._createOrUpdateGraphic(i.full).clone())}this._createOperationGeometry=null,this.emit("complete",{graphic:e,...t})}onCursorUpdate(t){this._updateGraphic(),this.emit("cursor-update",t)}onDeactivate(){this.drawOperation.isCompleted||this.drawOperation.cancel()}onVertexAdd(t){this._updateGraphic(),this._clearConstraints(),this.emit("vertex-add",t)}onVertexRemove(t){this._updateGraphic(),this._clearConstraints(),this.emit("vertex-remove",t)}onVertexUpdate(t){this._updateGraphic(),this.emit("vertex-update",t)}_updateGraphic(){const t=this._getCreateOperationGeometry();this._createOperationGeometry=t,t!=null?(t.outline!=null?this.addHandles(this.onOutlineChanged(t.outline),b.outline):this.removeHandles(b.outline),t.regularVertices!=null?this.addHandles(this.onRegularVerticesChanged(t.regularVertices),b.regularVertices):this.removeHandles(b.regularVertices),t.activeVertex!=null?this.addHandles(this.onActiveVertexChanged(t.activeVertex),b.activeVertex):this.removeHandles(b.activeVertex),t.full!=null?this._createOrUpdateGraphic(t.full):this.removeHandles(it)):this._destroyAllVisualisations()}get _tooltipInfo(){var n;const{drawOperation:t,graphic:e,view:i}=this;if(!t)return null;const o=this.tooltipInfos,s=(n=e==null?void 0:e.geometry)==null?void 0:n.type;switch(this.geometryType){case"point":return i.type==="2d"&&this.defaultZ===0?null:s==="point"?o.point:null;case"polyline":return s==="polyline"?o.polyline:null;case"polygon":return s==="polygon"?o.polygon:null;case"rectangle":return s==="polygon"?o.rectangle:null;case"circle":return s==="polygon"?o.circle:null;case"mesh":return s==="mesh"?o.mesh:null;default:return null}}_updateTooltipInfo(){const{_tooltipInfo:t,tooltip:e}=this;if(t&&e){switch(t.type){case"draw-point":this._updateDrawPointTooltipInfo(t);break;case"draw-polyline":this._updateDrawPolylineTooltipInfo(t);break;case"draw-polygon":this._updateDrawPolygonTooltipInfo(t);break;case"draw-rectangle":this._updateDrawRectangleTooltipInfo(t);break;case"draw-circle":this._updateDrawCircleTooltipInfo(t);break;case"draw-mesh":this.updateDrawMeshTooltipInfo(t)}e.info=t}}_updateDrawPointTooltipInfo(t){const{drawOperation:e,graphic:i,view:o,tooltipOptions:s}=this,{elevationInfo:n,stagedVertex:a}=e;if(t.tooltipOptions=s,t.viewType=o.type,t.helpMessage=et("point",i==null?void 0:i.geometry),this.updateElevation(t.elevation),!a)return void(e.constraint=void 0);const u=e.coordinateHelper.spatialReference;e.constraint=this._getPointConstraint(this._getElevationConstraint(t.elevation.committed,u,o,n))}_updateDrawPolylineTooltipInfo(t){const e=this._createOperationGeometry,i=e!=null?e.full:null;if((i==null?void 0:i.type)!=="polyline")return;const{drawOperation:o,tooltipOptions:s,view:n}=this,{lastVertex:a,stagedVertex:u}=o;this._updatePolylineOrPolygonCommon(t,u);const p=De(i,this._elevationMode);t.totalLength.actual=p??w,t.totalLength.hidden=length==null||!a,t.tooltipOptions=s,t.viewType=n.type,t.helpMessage=et("polyline",i),this.updateElevation(t.elevation)}_updateDrawPolygonTooltipInfo(t){const e=this._createOperationGeometry,i=e!=null?e.full:null;if((i==null?void 0:i.type)!=="polygon")return;const{drawOperation:o,tooltipOptions:s,view:n}=this,{lastVertex:a}=o;let u=o.stagedVertex;(i==null?void 0:i.type)==="polygon"&&a&&!u&&(u=i.getPoint(0,i.rings[0].length-1)),this._updatePolylineOrPolygonCommon(t,u);const p=It(i,this._elevationMode);t.area.actual=p??F,t.area.hidden=p==null&&!a,t.tooltipOptions=s,t.viewType=n.type,t.helpMessage=et("polygon",i),this.updateElevation(t.elevation)}_updatePolylineOrPolygonCommon(t,e){const{view:i,drawOperation:o}=this,{elevationInfo:s,lastVertex:n}=o;if(!n||!e)return t.distance.hidden=!0,t.orientation.hidden=!0,void(o.constraint=void 0);const a=Le(n,e,this._elevationMode);t.distance.actual=a??w,t.distance.hidden=!1;const u=Je(n,e);t.orientation.actual=u??Ut,t.orientation.hidden=!1;const p=o.coordinateHelper.spatialReference;o.constraint=this._getPolylineOrPolygonConstraint(this._getDistanceConstraint(n,t.distance.committed,i,s),this._getOrientationConstraint(n,t.orientation.committed,i,s),this._getElevationConstraint(t.elevation.committed,p,i,s))}updateDrawMeshTooltipInfo(t){}_updateDrawRectangleTooltipInfo(t){t.tooltipOptions=this.tooltipOptions,t.xSize=this._xSize??w,t.ySize=this._ySize??w,t.area=this._fullGeometryArea??F}_updateDrawCircleTooltipInfo(t){const{forceUniformSize:e}=this;t.tooltipOptions=this.tooltipOptions,t.radius=e?this._circleRadius??w:null,t.xSize=e?null:this._xSize??w,t.ySize=e?null:this._ySize??w,t.area=this._fullGeometryArea??F}get _circleRadius(){var e;const t=this._createOperationGeometry;return((e=t==null?void 0:t.circle)==null?void 0:e.center)!=null&&t.circle.edge!=null?tt(t.circle.center,t.circle.edge,this._elevationMode):null}get _xSize(){var e,i;const t=(i=(e=this._createOperationGeometry)==null?void 0:e.rectangle)==null?void 0:i.midpoints;return t!=null?tt(t.left,t.right,this._elevationMode):null}get _ySize(){var e,i;const t=(i=(e=this._createOperationGeometry)==null?void 0:e.rectangle)==null?void 0:i.midpoints;return t!=null?tt(t.top,t.bottom,this._elevationMode):null}get _fullGeometryArea(){var e;const t=(e=this._createOperationGeometry)==null?void 0:e.full;return(t==null?void 0:t.type)!=="polygon"?null:It(t,this._elevationMode)}updateElevation(t){t.actual=this._vertexTooltipElevation}get _vertexTooltipElevation(){const{tooltipOptions:t,view:e,drawOperation:i}=this;if(i==null)return this._defaultElevation;const o=i.stagedVertex??i.lastVertex;if(o==null||e.type==="2d")return this._defaultElevation;const s={mode:t.elevation.mode,offset:0},n=(ze(e,o,i.elevationInfo,s)??0)*Ge(o.spatialReference);return q(n,"meters")}get _elevationMode(){return this.drawOperation.isDraped?"on-the-ground":"absolute-height"}_clearConstraints(){for(const[,t]of Object.entries(this.tooltipInfos))t.unlockAllFields()}};r([l()],d.prototype,"_createOperationGeometry",void 0),r([l()],d.prototype,"_defaultElevation",null),r([l({value:!0})],d.prototype,"centered",null),r([l()],d.prototype,"cursor",null),r([l({nonNullable:!0})],d.prototype,"defaultZ",void 0),r([l()],d.prototype,"drawOperation",void 0),r([l({value:!0})],d.prototype,"enabled",null),r([l({value:!0})],d.prototype,"forceUniformSize",null),r([l({constructOnly:!0})],d.prototype,"geometryType",void 0),r([l()],d.prototype,"graphic",null),r([l({constructOnly:!0})],d.prototype,"graphicProperties",void 0),r([l()],d.prototype,"graphicSymbol",null),r([l({constructOnly:!0})],d.prototype,"hasZ",void 0),r([l({constructOnly:!0,type:kt})],d.prototype,"labelOptions",void 0),r([l({constructOnly:!0})],d.prototype,"geometryToPlace",void 0),r([l({constructOnly:!0})],d.prototype,"mode",void 0),r([l()],d.prototype,"snappingManager",void 0),r([l()],d.prototype,"snapToScene",void 0),r([l()],d.prototype,"tooltip",void 0),r([l()],d.prototype,"tooltipInfos",void 0),r([l({constructOnly:!0,type:Et})],d.prototype,"tooltipOptions",void 0),r([l({readOnly:!0})],d.prototype,"type",void 0),r([l({readOnly:!0})],d.prototype,"updating",null),r([l({constructOnly:!0,nonNullable:!0})],d.prototype,"view",void 0),r([l()],d.prototype,"_tooltipInfo",null),r([l()],d.prototype,"_circleRadius",null),r([l()],d.prototype,"_xSize",null),r([l()],d.prototype,"_ySize",null),r([l()],d.prototype,"_fullGeometryArea",null),r([l()],d.prototype,"_vertexTooltipElevation",null),r([l()],d.prototype,"_elevationMode",null),d=r([V("esri.views.draw.DrawGraphicTool")],d);const it="create-operation-graphic",b={outline:"outline-visual",regularVertices:"regular-vertices-visual",activeVertex:"active-vertex-visual"};function Oi(t){switch(t){case"point":case"polyline":case"polygon":case"multipoint":return t;case"circle":case"rectangle":return"segment";case"mesh":return"point"}}const Gt=48;function bi(t,e){return At(t,e,!1)}function Ti(t,e){return At(t,e,!0)}function At(t,e,i){if(t instanceof Ae){if(t.operation instanceof Ne)return li(t.operation,e,i),!0;if(t.operation instanceof He)return pi(t.operation,e,i),!0;if(t.operation instanceof Ze)return ci(t.operation,e,i),!0}return!1}function li(t,e,i=!1){const o=i?-1:1,s=Ce(o*t.dx,o*t.dy,o*t.dz);Re(e.origin,e.origin,s),J(e)}function pi(t,e,i=!1){const o=i?-t.angle:t.angle;xt(e.basis1,e.basis1,wt,o),xt(e.basis2,e.basis2,wt,o),J(e)}function ci(t,e,i=!1){const o=i?1/t.factor1:t.factor1,s=i?1/t.factor2:t.factor2;_t(e.basis1,e.basis1,o),_t(e.basis2,e.basis2,s),$t(e.origin,e.origin,t.origin,t.axis1,o),$t(e.origin,e.origin,t.origin,t.axis2,s),J(e)}function Ii(t,e,i,o){o||(o=Pe());const s=E(Z.get(),t[1],-t[0]),n=E(Z.get(),Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),a=E(Z.get(),Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY),u=Z.get();e.components.forEach(y=>y.vertices.forEach(g=>{const c=g.pos;E(u,Ot(t,c),Ot(s,c)),Se(n,n,u),Ue(a,a,u)}));const p=1e-6,h=E(Z.get(),a[0]-n[0]<p?i/2:0,a[1]-n[1]<p?i/2:0);return ke(n,n,h),B(a,a,h),bt(o.basis1,t,(a[0]-n[0])/2),bt(o.basis2,s,(a[1]-n[1])/2),E(o.origin,n[0]*t[0]+n[1]*s[0],n[0]*t[1]+n[1]*s[1]),B(o.origin,o.origin,o.basis1),B(o.origin,o.origin,o.basis2),J(o),o}export{d as K,bi as V,Oi as X,X as g,Ii as l,Ti as x};