import{b0 as Re,aI as xe,aT as je,T as C,xp as Pe,bA as I,aa as $,q8 as D,K as De,aR as ye,j_ as Fe,a2 as ze,bC as Ce,an as Y,kT as Me,at as M,aJ as Ie,k4 as Ne,aM as V,qk as Z,i$ as ee,aV as te,aN as ie,h9 as A,xq as ke,b9 as se,br as y,au as H,xr as ne,aE as ae,bv as We,av as Be,xs as Ve,hu as Ue,bD as Ge,G as qe,ct as He,n as Qe,aS as Je,q6 as Ke,i5 as U,rm as T,bE as Xe,as as Q,aU as $e,xt as Ye,o7 as re,mJ as Ze,xu as et,xv as tt,pl as oe,ro as it,fB as st,xw as nt,xx as ce,xy as v,xz as at,xA as g,xB as rt,xC as ot,xD as ct,xE as lt,xF as le,bf as h,xG as ht,xH as dt,xI as ut,xJ as _t,xK as P,ou as gt,e as m,xL as S,i2 as R,xM as pt,de as ft,xN as vt,xO as bt,xP as mt,xQ as St,xR as yt,xS as $t,xT as wt,lZ as G,xU as Ot,xV as Tt,xW as Et,xX as Lt,xY as At,xZ as he,lX as x,x_ as Rt,x$ as xt,bi as de,aF as J,y0 as jt,y1 as Pt,y2 as Dt,nc as Ft,y3 as zt,s1 as Ct,y4 as Mt,nm as we,bu as Oe,b2 as Te,sc as It,nR as Nt,o4 as kt,aG as Ee,y5 as Wt}from"./index-J0iiHjMT.js";class ri{constructor(e){var i;this.metadata=void 0,this._camera=new Pe,this._elevation={offset:0,override:null},this.collisionType={type:"point"},this.collisionPriority=0,this._renderObjects=new Array,this.autoScaleRenderObjects=!0,this._available=!0,this._noDisplayCount=0,this._radius=10,this._worldSized=!1,this.focusMultiplier=2,this.touchMultiplier=2.5,this.worldOriented=!1,this._modelTransform=I(),this._worldFrame=null,this._renderLocation=$(),this._renderLocationDirty=!0,this._location=new C({x:0,y:0,z:0}),this._elevationAlignedLocation=new C,this._elevationAlignedLocationDirty=!0,this.interactive=!0,this.selectable=!1,this.grabbable=!0,this.consumesClicks=!0,this.cursor=null,this.grabCursor=null,this._grabbing=!1,this.dragging=!1,this._hovering=!1,this._selected=!1,this._state=D.None,this._focused=!1,this.events=new De.EventEmitter,this._screenLocation={screenPointArray:ye(),renderScreenPointArray:Fe(),pixelSize:0},this._screenLocationDirty=!0,this._engineResourcesAddedToStage=!1,this._attached=!1,this._location.spatialReference=e.view.spatialReference,Object.assign(this,e);const t=(i=this.view.state)==null?void 0:i.camera;t&&this._camera.copyFrom(t)}destroy(){this._applyObjectTransform=qt,this._removeResourcesFromStage(),this._engineResources=null,this.view=null,this._camera=null}get _stage(){var e;return(e=this.view)==null?void 0:e._stage}get elevationInfo(){return this._elevationInfo}set elevationInfo(e){this._elevationInfo=e,this._elevationAlignedLocationDirty=!0,this._renderLocationDirty=!0,this._updateEngineObject()}get renderObjects(){return this._renderObjects}set renderObjects(e){this._removeResourcesFromStage(),this._engineResources=null,this._renderObjects=e.slice(),this._updateEngineObject()}set available(e){e!==this._available&&(this._available=e,this._updateEngineObject())}get available(){return this._available}disableDisplay(){return this._noDisplayCount++,this._noDisplayCount===1&&this._updateEngineObject(),ze(()=>{this._noDisplayCount--,this._noDisplayCount===0&&this._updateEngineObject()})}set radius(e){e!==this._radius&&(this._radius=e,this._updateEngineObject())}get radius(){return this._radius}set worldSized(e){e!==this._worldSized&&(this._worldSized=e,this._updateEngineObject())}get worldSized(){return this._worldSized}get modelTransform(){return this._modelTransform}set modelTransform(e){ue(e)&&(this._screenLocationDirty=!0),Ce(this._modelTransform,e),this._updateEngineObject()}get renderLocation(){return this._renderLocationDirty&&(this._renderLocationDirty=!1,this.view.renderCoordsHelper.toRenderCoords(this.elevationAlignedLocation,this._renderLocation),this.worldOriented?(this._worldFrame||(this._worldFrame=I()),Bt(this.view,this._renderLocation,this._worldFrame)):this._worldFrame&&(this._worldFrame=null)),this._renderLocation}set renderLocation(e){this.view.renderCoordsHelper.fromRenderCoords(e,this._location),this.elevationAlignedLocation=this._location}get location(){return this._location}set location(e){Y(e,this._location),this._notifyLocationChanged()}_notifyLocationChanged(){this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!0,this._updateEngineObject(),this.events.emit("location-update",{location:this._location})}get elevationAlignedLocation(){return this._elevationAlignedLocationDirty?(this._evaluateElevationAlignment(),this._updateElevationAlignedLocation(),this._elevationAlignedLocation):this._elevationAlignedLocation}set elevationAlignedLocation(e){Y(e,this._location),this._evaluateElevationAlignment(),this._location.z-=this._elevation.offset,this._updateElevationAlignedLocation(),this._updateEngineObject(),this.events.emit("location-update",{location:this._location})}_updateElevationAlignedLocation(){const e=this._elevation.override!=null?this._elevation.override:this.location.z||0;this._elevationAlignedLocation.x=this.location.x,this._elevationAlignedLocation.y=this.location.y,this._elevationAlignedLocation.z=e+this._elevation.offset,this._elevationAlignedLocation.spatialReference=Me(this.location.spatialReference),this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!1}grabbableForEvent(){return!0}get grabbing(){return this._grabbing}set grabbing(e){e!==this._grabbing&&(this._grabbing=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())}get hovering(){return this._hovering}set hovering(e){e!==this._hovering&&(this._hovering=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())}get selected(){return this._selected}set selected(e){e!==this._selected&&(this._selected=e,this._updateEngineObject(),this.events.emit("select-changed",{action:e?"select":"deselect"}))}get state(){return this._state}set state(e){e!==this._state&&(this._state=e,this._updateEngineObject())}updateStateEnabled(e,t){t?this.state|=e:this.state&=~e}_setFocused(e){e!==this._focused&&(this._focused=e,this.events.emit("focus-changed",{action:e===!0?"focus":"unfocus"}))}get focused(){return this._focused}get screenLocation(){return this._ensureScreenLocation(),this._screenLocation}_ensureScreenLocation(){if(!this._screenLocationDirty)return;this._screenLocation.pixelSize=this._camera.computeScreenPixelSizeAt(this.renderLocation),this._screenLocationDirty=!1;let e;if(ue(this._modelTransform)){const t=this._calculateModelTransformOffset(Gt);e=M(t,t,this.renderLocation)}else e=this.renderLocation;this._camera.projectToRenderScreen(e,this._screenLocation.renderScreenPointArray),this._camera.renderToScreen(this._screenLocation.renderScreenPointArray,this._screenLocation.screenPointArray)}get applyObjectTransform(){return this._applyObjectTransform}set applyObjectTransform(e){this._applyObjectTransform=e,this._screenLocationDirty=!0,this._updateEngineObject()}get attached(){return this._attached}intersectionDistance(e,t){if(!this.available)return null;const i=Ie(e,Vt),n=this._getCollisionRadius(t),a=-1*this.collisionPriority;switch(this.collisionType.type){case"point":if(Ue(this.screenLocation.screenPointArray,i)<n*n)return this.screenLocation.renderScreenPointArray[2]+a;break;case"line":{const r=this.collisionType.paths,o=this._getWorldToScreenObjectScale(),p=this._calculateObjectTransform(o,F),l=n*this.screenLocation.pixelSize,d=V(this._camera,i,q);if(d==null)return null;for(const u of r){if(u.length===0)continue;const c=A(j,u[0],p);for(let f=1;f<u.length;f++){const _=A(pe,u[f],p),w=Ve(se(c,_,_e),d);if(w!=null&&w<l*l){const O=M(y.get(),c,_);H(O,O,.5);const L=ne(y.get());return this._camera.projectToRenderScreen(O,L),L[2]+a}ae(c,_)}}break}case"disc":{const r=this.collisionType.direction,o=this.collisionType.offset??We,p=this._getWorldToScreenObjectScale(),l=this._calculateObjectTransform(p,F),d=n*this.screenLocation.pixelSize,u=V(this._camera,i,q);if(u==null)return null;const c=Z(ge,l),f=ee(ve,r,c),_=A(be,o,l);te(_,f,z);const w=fe;if(ie(z,u,w)&&Be(w,_)<d*d)return this.screenLocation.renderScreenPointArray[2]+a;break}case"ribbon":{const{paths:r,direction:o}=this.collisionType,p=this._getWorldToScreenObjectScale(),l=this._calculateObjectTransform(p,F),d=n*this._camera.computeScreenPixelSizeAt(this.renderLocation),u=V(this._camera,i,q);if(u==null)return null;const c=Z(ge,l),f=ee(ve,o,c),_=this._calculateModelTransformPosition(be);te(_,f,z);const w=fe;if(!ie(z,u,w))break;for(const O of r){if(O.length===0)continue;const L=A(j,O[0],l);for(let k=1;k<O.length;k++){const W=A(pe,O[k],l),K=ke(se(L,W,_e),w);if(K!=null&&K<d*d){const B=M(y.get(),L,W);H(B,B,.5);const X=ne(y.get());return this._camera.projectToRenderScreen(B,X),X[2]+a}ae(L,W)}}break}default:Ne(this.collisionType)}return null}attach(e={manipulator3D:{}}){const t=this._stage;if(!t)return;const i=e.manipulator3D;i.engineLayerId==null?(this._engineLayer=new Ge(t,{pickable:!1,updatePolicy:qe.SYNC}),i.engineLayerId=this._engineLayer.id):t!=null&&t.getObject&&(this._engineLayer=t.getObject(i.engineLayerId)),i.engineLayerReferences=(i.engineLayerReferences||0)+1,this._materialIdReferences=i.materialIdReferences,this._materialIdReferences==null&&(this._materialIdReferences=new Map,i.materialIdReferences=this._materialIdReferences),this._camera.copyFrom(this.view.state.camera),this._attached=!0,this._updateEngineObject(),He(this._location.spatialReference,this.view.spatialReference)||(this.location=new C({x:0,y:0,z:0,spatialReference:this.view.spatialReference}))}detach(e={manipulator3D:{}}){const t=e.manipulator3D;t.engineLayerReferences--;const i=t.engineLayerReferences===0;this._removeResourcesFromStage(),i&&(t.engineLayerId=null,Qe(this._engineLayer)),this._engineResources=null,this._engineLayer=null,this._materialIdReferences=null,this._attached=!1}onViewChange(){this._camera.copyFrom(this.view.state.camera),this._screenLocationDirty=!0,this._updateEngineObject()}onElevationChange(e){Je(this.location,me,e.spatialReference)&&Ke(e.extent,me)&&this._notifyLocationChanged()}_evaluateElevationAlignment(){if(this.elevationInfo==null)return;let e=null,t=0;const i=this.elevationInfo.offset??0;switch(this.elevationInfo.mode){case"on-the-ground":e=U(this.view.elevationProvider,this.location,"ground")??0;break;case"relative-to-ground":t=(U(this.view.elevationProvider,this.location,"ground")??0)+i;break;case"relative-to-scene":t=(U(this.view.elevationProvider,this.location,"scene")??0)+i;break;case"absolute-height":t=i}return t!==this._elevation.offset||e!==this._elevation.override?(this._elevation.offset=t,void(this._elevation.override=e)):void 0}_updateEngineObject(){if(!this._attached)return;if(!this.available)return void this._removeResourcesFromStage();const e=this._getWorldToScreenObjectScale(),t=F;if(this.autoScaleRenderObjects===!0){const r=this._getFocusedSize(this._radius,this.focused)*e;this._calculateObjectTransform(r,t)}else this._calculateObjectTransform(e,t);const{objectsByState:i}=this._ensureEngineResources(),n=(this.focused?T.Focused:T.Unfocused)|(this.selected?T.Selected:T.Unselected),a=this._noDisplayCount>0;for(const{stateMask:r,objects:o}of i){if(a){for(const c of o)c.visible=!1;continue}const p=(r&T.All)!==T.None,l=(r&D.All)!==D.None,d=!p||(n&r)==(r&T.All),u=!l||(this.state&r)==(r&D.All);if(d&&u)for(const c of o)c.visible=!0,c.transformation=t;else for(const c of o)c.visible=!1}}_ensureEngineResources(){if(this._engineResources==null){const e=this._engineLayer,t=[],i=new Set;this.renderObjects.forEach(({geometry:{material:r}})=>{i.has(r)||(t.push(r),i.add(r))});const n=new Map;this._renderObjects.forEach(r=>{const o=new Xe({castShadow:!1,geometries:[r.geometry]}),p=n.get(r.stateMask)||[];p.push(o),n.set(r.stateMask,p)});const a=[];n.forEach((r,o)=>a.push({stateMask:o,objects:r})),this._engineResources={objectsByState:a,layer:e,materials:t}}return this._addResourcesToStage(),this._engineResources}_addResourcesToStage(){const e=this._stage;if(this._engineResourcesAddedToStage||this._engineResources==null||!e)return;const{objectsByState:t,layer:i,materials:n}=this._engineResources;n.forEach(a=>{const r=this._materialIdReferences,o=r.get(a.id)||0;o===0&&e.add(a),r.set(a.id,o+1)}),t.forEach(({objects:a})=>{i.addMany(a),e.addMany(a)}),this._engineResourcesAddedToStage=!0}_removeResourcesFromStage(){const e=this._stage;if(!this._engineResourcesAddedToStage||this._engineResources==null||!e)return;const{objectsByState:t,layer:i,materials:n}=this._engineResources;t.forEach(({objects:a})=>{i.removeMany(a),e.removeMany(a)}),n.forEach(a=>{const r=this._materialIdReferences,o=r.get(a.id);o===1?(e.remove(a),r.delete(a.id)):r.set(a.id,o-1)}),this._engineResourcesAddedToStage=!1}_getCollisionRadius(e){return this._getFocusedSize(this.radius,!0)*(e==="touch"?this.touchMultiplier:1)}_getFocusedSize(e,t){return e*(t?this.focusMultiplier:1)}_getWorldToScreenObjectScale(){return this._worldSized?1:this.screenLocation.pixelSize}_calculateModelTransformPosition(e){const t=this._getWorldToScreenObjectScale(),i=this._calculateObjectTransform(t,Ut);return Q(e,i[12],i[13],i[14])}_calculateModelTransformOffset(e){const t=this._calculateModelTransformPosition(e);return $e(e,t,this.renderLocation)}_calculateObjectTransform(e,t){return Ye(t,e,0,0,0,0,e,0,0,0,0,e,0,0,0,0,1),this._worldFrame&&re(t,t,this._worldFrame),re(t,t,this._modelTransform),t[12]+=this.renderLocation[0],t[13]+=this.renderLocation[1],t[14]+=this.renderLocation[2],t[15]=1,this._applyObjectTransform!=null&&this._applyObjectTransform(t),t}get test(){let e=!1;if(this._engineResources!=null)for(const t of this._engineResources.objectsByState){for(const i of t.objects)if(i.visible){e=!0;break}if(e)break}return{areAnyResourcesVisible:e}}}function ue(s){return s[12]!==0||s[13]!==0||s[14]!==0}function Bt(s,e,t){switch(s.viewingMode){case"local":return it(t),!0;case"global":{const i=Ze(s.renderCoordsHelper.spatialReference);return et(e,0,j,0,i.radius),tt(oe(j[0]),oe(j[1]),t),!0}}}const Vt=ye(),_e=Re(),q=xe(),ge=st(),Ut=I(),F=I(),z=je(),j=$(),pe=$(),fe=$(),ve=$(),be=$(),Gt=$(),me=new C({x:0,y:0,z:0,spatialReference:null}),qt=()=>{};class oi{constructor(e,t=T.None){this.geometry=e,this.stateMask=t}}function Ht(s,e){if(!e.screenSizeEnabled)return;const t=s.vertex;nt(t,e),t.uniforms.add(new ce("perScreenPixelRatio",(i,n)=>n.camera.perScreenPixelRatio),new ce("screenSizeScale",i=>i.screenSizeScale)),t.code.add(v`float computeRenderPixelSizeAt( vec3 pWorld ){
vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
float viewDirectionDistance = abs(dot(viewForward, pWorld - cameraPosition));
return viewDirectionDistance * perScreenPixelRatio;
}
vec3 screenSizeScaling(vec3 position, vec3 anchor){
return position * screenSizeScale * computeRenderPixelSizeAt(anchor) + anchor;
}`)}function Le(s){const e=new at,t=s.multipassEnabled&&(s.output===g.Color||s.output===g.Alpha);e.include(rt,s),e.include(Ht,s),e.include(ot,s);const{vertex:i,fragment:n}=e;return n.include(ct),lt(i,s),n.uniforms.add(new le("uColor",a=>a.color)),e.attributes.add(h.POSITION,"vec3"),e.varyings.add("vWorldPosition","vec3"),t&&e.varyings.add("depth","float"),s.screenSizeEnabled&&e.attributes.add(h.OFFSET,"vec3"),s.shadingEnabled&&(ht(i),e.attributes.add(h.NORMAL,"vec3"),e.varyings.add("vViewNormal","vec3")),i.code.add(v`
    void main(void) {
      vWorldPosition = ${s.screenSizeEnabled?"screenSizeScaling(offset, position)":"position"};
  `),s.shadingEnabled&&i.code.add(v`vec3 worldNormal = normal;
vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`),i.code.add(v`
    ${t?"depth = (view * vec4(vWorldPosition, 1.0)).z;":""}
    gl_Position = transformPosition(proj, view, vWorldPosition);
  }
  `),t&&e.include(dt,s),n.code.add(v`
    void main() {
      discardBySlice(vWorldPosition);
      ${t?"terrainDepthTest(depth);":""}
    `),s.shadingEnabled?(n.uniforms.add(new ut("shadingDirection",a=>a.shadingDirection)),n.uniforms.add(new le("shadedColor",a=>Qt(a.shadingTint,a.color))),n.code.add(v`vec3 viewNormalNorm = normalize(vViewNormal);
float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`)):n.code.add(v`vec4 finalColor = uColor;`),n.code.add(v`
      ${s.output===g.ObjectAndLayerIdColor?v`finalColor.a = 1.0;`:""}
      if (finalColor.a < ${v.float(_t)}) {
        discard;
      }
      ${s.output===g.Alpha?v`fragColor = vec4(finalColor.a);`:""}

      ${s.output===g.Color?v`fragColor = highlightSlice(finalColor, vWorldPosition); ${s.transparencyPassType===P.Color?"fragColor = premultiplyAlpha(fragColor);":""}`:""}
    }
    `),e}function Qt(s,e){const t=1-s[3],i=s[3]+e[3]*t;return i===0?(E[3]=i,E):(E[0]=(s[0]*s[3]+e[0]*e[3]*t)/i,E[1]=(s[1]*s[3]+e[1]*e[3]*t)/i,E[2]=(s[2]*s[3]+e[2]*e[3]*t)/i,E[3]=e[3],E)}const E=gt(),Jt=Object.freeze(Object.defineProperty({__proto__:null,build:Le},Symbol.toStringTag,{value:"Module"}));class N extends bt{initializeProgram(e){return new mt(e.rctx,N.shader.get().build(this.configuration),Ae)}_setPipelineState(e){const t=this.configuration,i=e===P.NONE,n=e===P.FrontFace;return St({blending:t.output!==g.Color&&t.output!==g.Alpha||!t.transparent?null:i?yt:$t(e),culling:wt(t.cullFace),depthTest:{func:n?G.LESS:t.shadingEnabled?G.LEQUAL:G.LESS},depthWrite:i?t.writeDepth?Ot:null:Tt(e),colorWrite:Et,polygonOffset:i||n?null:Lt})}initializePipeline(){return this._setPipelineState(this.configuration.transparencyPassType)}}N.shader=new pt(Jt,()=>ft(()=>Promise.resolve().then(()=>ni),void 0));let b=class extends vt{constructor(){super(...arguments),this.output=g.Color,this.cullFace=R.None,this.transparencyPassType=P.NONE,this.hasSlicePlane=!1,this.transparent=!1,this.writeDepth=!0,this.screenSizeEnabled=!0,this.shadingEnabled=!0,this.multipassEnabled=!1,this.cullAboveGround=!1}};m([S({count:g.COUNT})],b.prototype,"output",void 0),m([S({count:R.COUNT})],b.prototype,"cullFace",void 0),m([S({count:P.COUNT})],b.prototype,"transparencyPassType",void 0),m([S()],b.prototype,"hasSlicePlane",void 0),m([S()],b.prototype,"transparent",void 0),m([S()],b.prototype,"writeDepth",void 0),m([S()],b.prototype,"screenSizeEnabled",void 0),m([S()],b.prototype,"shadingEnabled",void 0),m([S()],b.prototype,"multipassEnabled",void 0),m([S()],b.prototype,"cullAboveGround",void 0),m([S({constValue:!1})],b.prototype,"occlusionPass",void 0);const Ae=new Map([[h.POSITION,0],[h.NORMAL,1],[h.OFFSET,2]]);class Kt extends At{constructor(e){super(e,new Yt),this.supportsEdges=!0,this._configuration=new b,this._vertexAttributeLocations=Ae}getConfiguration(e,t){return this._configuration.output=e,this._configuration.cullFace=this.parameters.cullFace,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.transparent=this._isTransparent,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.screenSizeEnabled=this.parameters.screenSizeEnabled,this._configuration.shadingEnabled=this.parameters.shadingEnabled,this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.multipassEnabled=t.multipassEnabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration}intersect(e,t,i,n,a,r){if(this.parameters.screenSizeEnabled){const o=e.attributes.get(h.OFFSET);he(e,i,n,a,{applyToVertex:(l,d,u,c)=>{const f=Q(Se,o.data[3*c],o.data[3*c+1],o.data[3*c+2]),_=Q(ei,l,d,u);return H(f,f,this.parameters.screenSizeScale*i.camera.computeScreenPixelSizeAt(f)),M(_,_,f),[_[0],_[1],_[2]]},applyToAabb:l=>{const d=Ct(l,Se);return Mt(l,this.parameters.screenSizeScale*i.camera.computeScreenPixelSizeAt(d))}},r)}else he(e,i,n,a,void 0,r)}produces(e,t){if(t===g.Highlight)return e===x.OPAQUE_MATERIAL;if(t===g.Color||t===g.Alpha||t===g.ObjectAndLayerIdColor){let i=x.OPAQUE_MATERIAL;return this._isTransparent&&(i=this.parameters.writeDepth?x.TRANSPARENT_MATERIAL:x.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL),e===i||e===x.DRAPED_MATERIAL}return!1}createGLMaterial(e){return new Xt(e)}createBufferWriter(){return new Zt(this.parameters.screenSizeEnabled)}get _isTransparent(){return this.parameters.color[3]<1||this.parameters.forceTransparentMode}}let Xt=class extends Rt{beginSlot(e){return this.ensureTechnique(N,e)}},Yt=class extends xt{constructor(){super(...arguments),this.color=de(1,1,1,1),this.shadingTint=de(0,0,0,.25),this.shadingDirection=J($(),[.5,-.5,-.5]),this.screenSizeScale=14,this.forceTransparentMode=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.cullFace=R.None,this.screenSizeEnabled=!1,this.shadingEnabled=!0}},Zt=class{constructor(e){this.screenSizeEnabled=e;const t=jt().vec3f(h.POSITION).vec3f(h.NORMAL);this.screenSizeEnabled&&t.vec3f(h.OFFSET),this.vertexBufferLayout=t}elementCount(e){return e.attributes.get(h.POSITION).indices.length}write(e,t,i,n,a){if(Pt(i,this.vertexBufferLayout,e,t,n,a),this.screenSizeEnabled){if(!i.attributes.has(h.OFFSET))throw new Error(`${h.OFFSET} vertex attribute required for screenSizeEnabled ShadedColorMaterial`);{const r=i.attributes.get(h.OFFSET);Dt(r.size===3);const o=n.getField(h.OFFSET,Ft);if(!o)throw new Error("unable to acquire view for "+h.OFFSET);zt(r,t,o,a)}}}};const Se=$(),ei=$();function ui(s,e=Te.OccludeAndTransparent,t=!0){const i=we(s),n=!(s[3]<1);return t?new Kt({color:i,writeDepth:n,cullFace:R.Back,renderOccluded:e,isDecoration:!0}):new Oe({color:i,writeDepth:n,cullFace:R.Back,renderOccluded:e,isDecoration:!0})}function _i(s,e=Te.OccludeAndTransparent){const t=we(s);return new Oe({color:t,writeDepth:!0,cullFace:R.Front,renderOccluded:e,isDecoration:!0})}const gi=Object.freeze({calloutLength:40,calloutWidth:1,discRadius:27,focusMultiplier:1.1}),pi=Object.freeze({autoScaleRenderObjects:!1,worldSized:!0});function fi(s,e,t,i){const n=$e(y.get(),s,t),a=ti(n,Ee(y.get(),i,n),t,kt.get());Wt(a,a);const r=A(y.get(),e,a);return Math.atan2(r[1],r[0])}function ti(s,e,t,i){const n=J(y.get(),s),a=J(y.get(),e),r=Ee(y.get(),n,a);return i[0]=n[0],i[1]=n[1],i[2]=n[2],i[3]=0,i[4]=a[0],i[5]=a[1],i[6]=a[2],i[7]=0,i[8]=r[0],i[9]=r[1],i[10]=r[2],i[11]=0,i[12]=t[0],i[13]=t[1],i[14]=t[2],i[15]=1,i}function ii(s,e){const t=s.getViewForGraphic(e);return t!=null&&"computeAttachmentOrigin"in t?t.computeAttachmentOrigin(e,s.spatialReference):null}function vi(s,e,t){const i=ii(s,t);i==null?si(e,t.geometry):e.elevationAlignedLocation=i}function si(s,e){if(e==null)return;const t=e.type==="mesh"?e.anchor:It(e);t!=null&&(s.location=Nt(t))}const ni=Object.freeze(Object.defineProperty({__proto__:null,build:Le},Symbol.toStringTag,{value:"Module"}));export{ri as $,pi as D,fi as F,ti as M,gi as O,_i as b,oi as e,Kt as j,ii as k,vi as v,ui as w};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}