import{xS as I,xX as O,xU as $,bi as p,xR as c,xV as x,x_ as A,yD as b,xQ as S,xT as n,tJ as P,xW as C,y1 as d,yE as D,va as m,e as r,y2 as o,hY as g,y3 as w,de as N,y4 as R,y5 as V,y6 as L,y7 as M,y9 as F,ya as U,yF as z,yb as B,yc as G,yd as W,yG as j,yH as H,yI as Q,yJ as J,ys as k,yK as q,m3 as u,yv as K,yL as X,yu as Y,yl as Z,yM as ee,yN as te,yO as se,yi as ae}from"./index-pCX-0tJH.js";function E(t){const e=new I,{vertex:s,fragment:a}=e;return O(s,t),e.include($,t),e.attributes.add(p.POSITION,"vec3"),e.attributes.add(p.UV0,"vec2"),t.perspectiveInterpolation&&e.attributes.add(p.PERSPECTIVEDIVIDE,"float"),e.varyings.add("vpos","vec3"),t.multipassEnabled&&e.varyings.add("depth","float"),s.code.add(c`
    void main(void) {
      vpos = position;
      ${t.multipassEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0;
      gl_Position = transformPosition(proj, view, vpos);

      ${t.perspectiveInterpolation?"gl_Position *= perspectiveDivide;":""}
    }
  `),e.include(x,t),e.include(A,t),a.uniforms.add(new b("tex",l=>l.texture),new S("opacity",l=>l.opacity)),e.varyings.add("vTexCoord","vec2"),t.output===n.Alpha?a.code.add(c`
    void main() {
      discardBySlice(vpos);
      ${t.multipassEnabled?"terrainDepthTest(depth);":""}

      float alpha = texture(tex, vTexCoord).a * opacity;
      if (alpha  < ${c.float(P)}) {
        discard;
      }

      fragColor = vec4(alpha);
    }
    `):(a.include(C),a.code.add(c`
    void main() {
      discardBySlice(vpos);
      ${t.multipassEnabled?"terrainDepthTest(depth);":""}
      fragColor = texture(tex, vTexCoord) * opacity;

      if (fragColor.a < ${c.float(P)}) {
        discard;
      }

      fragColor = highlightSlice(fragColor, vpos);
      ${t.transparencyPassType===d.Color?"fragColor = premultiplyAlpha(fragColor);":""}
    }
    `)),e}const ie=Object.freeze(Object.defineProperty({__proto__:null,build:E},Symbol.toStringTag,{value:"Module"}));class _ extends V{initializeProgram(e){return new L(e.rctx,_.shader.get().build(this.configuration),T)}_setPipelineState(e,s){const a=this.configuration,l=e===d.NONE,h=e===d.FrontFace;return M({blending:a.output!==n.Color&&a.output!==n.Alpha||!a.transparent?null:l?re:F(e),culling:U(a.cullFace),depthTest:{func:z(e)},depthWrite:l?a.writeDepth?B:null:G(e),colorWrite:W,stencilWrite:a.hasOccludees?j:null,stencilTest:a.hasOccludees?s?H:Q:null,polygonOffset:l||h?null:J(a.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._setPipelineState(this.configuration.transparencyPassType,!0),this._setPipelineState(this.configuration.transparencyPassType,!1)}getPipeline(e){return e?this._occludeePipelineState:super.getPipeline()}}_.shader=new w(ie,()=>N(()=>Promise.resolve().then(()=>pe),void 0));const re=D(m.ONE,m.ONE_MINUS_SRC_ALPHA);class i extends R{constructor(){super(...arguments),this.output=n.Color,this.cullFace=g.None,this.hasSlicePlane=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!0,this.hasOccludees=!1,this.transparencyPassType=d.NONE,this.multipassEnabled=!1,this.cullAboveGround=!1,this.perspectiveInterpolation=!0}}r([o({count:n.COUNT})],i.prototype,"output",void 0),r([o({count:g.COUNT})],i.prototype,"cullFace",void 0),r([o()],i.prototype,"hasSlicePlane",void 0),r([o()],i.prototype,"transparent",void 0),r([o()],i.prototype,"enableOffset",void 0),r([o()],i.prototype,"writeDepth",void 0),r([o()],i.prototype,"hasOccludees",void 0),r([o({count:d.COUNT})],i.prototype,"transparencyPassType",void 0),r([o()],i.prototype,"multipassEnabled",void 0),r([o()],i.prototype,"cullAboveGround",void 0),r([o()],i.prototype,"perspectiveInterpolation",void 0),r([o({constValue:!1})],i.prototype,"occlusionPass",void 0);const T=new Map([[p.POSITION,0],[p.UV0,2],[p.PERSPECTIVEDIVIDE,3]]);let ue=class extends k{constructor(e){super(e,new le),this.supportsEdges=!0,this._vertexAttributeLocations=T,this._configuration=new i}getConfiguration(e,s){return this._configuration.output=e,this._configuration.cullFace=this.parameters.cullFace,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.transparencyPassType=s.transparencyPassType,this._configuration.enableOffset=s.camera.relativeElevation<q,this._configuration.multipassEnabled=s.multipassEnabled,this._configuration.cullAboveGround=s.multipassTerrain.cullAboveGround,this._configuration.perspectiveInterpolation=this.parameters.perspectiveInterpolation,this._configuration}produces(e,s){return s===n.Color||s===n.Alpha||s===n.Highlight?e===u.DRAPED_MATERIAL?!0:s===n.Highlight?e===u.OPAQUE_MATERIAL:e===(this.parameters.transparent?this.parameters.writeDepth?u.TRANSPARENT_MATERIAL:u.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:u.OPAQUE_MATERIAL):!1}createGLMaterial(e){return new oe(e)}createBufferWriter(){const e=K.clone();return this.parameters.perspectiveInterpolation&&e.f32(p.PERSPECTIVEDIVIDE),new ne(e)}};class oe extends X{constructor(e){super({...e,...e.material.parameters})}_updateParameters(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(_,e)}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&(this._material.setParameters({hasOccludees:e.hasOccludees}),this._updateParameters(e))}beginSlot(e){return this._output!==n.Color&&this._output!==n.Alpha||this._updateOccludeeState(e),this._updateParameters(e)}}class ne extends Y{write(e,s,a,l,h){for(const y of this.vertexBufferLayout.fields.keys()){const f=a.attributes.get(y);if(f)if(y===p.PERSPECTIVEDIVIDE){Z(f.size===1);const v=l.getField(y,ee);v&&te(f,v,h)}else se(y,f,e,s,l,h)}}}class le extends ae{constructor(){super(...arguments),this.transparent=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.cullFace=g.None,this.hasOccludees=!1,this.opacity=1,this.textureId=null,this.initTextureTransparent=!0,this.perspectiveInterpolation=!1}}const pe=Object.freeze(Object.defineProperty({__proto__:null,build:E},Symbol.toStringTag,{value:"Module"}));export{ue as g};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}