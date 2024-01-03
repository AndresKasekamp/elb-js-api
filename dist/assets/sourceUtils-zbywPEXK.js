import{gf as d,gg as g,eY as h,gh as m,gi as p,gj as y,gk as a,de as w}from"./index-J0iiHjMT.js";import{n as I}from"./date-be_IQzZd.js";class _{constructor(){this.code=null,this.description=null}}class b{constructor(e){this.error=new _,this.globalId=null,this.objectId=null,this.success=!1,this.uniqueId=null,this.error.description=e}}function c(n){return new b(n)}class j{constructor(e){this.globalId=null,this.success=!0,this.objectId=this.uniqueId=e}}function A(n){return new j(n)}const u=new Set;function F(n,e,t,f=!1){u.clear();for(const i in t){const r=n.get(i);if(!r)continue;const o=q(r,t[i]);if(u.add(r.name),r&&(f||r.editable)){const l=d(r,o);if(l)return c(g(l,r,o));e[r.name]=o}}for(const i of(n==null?void 0:n.requiredFields)??[])if(!u.has(i.name))return c(`missing required field "${i.name}"`);return null}function q(n,e){let t=e;return h(n)&&typeof e=="string"?t=parseFloat(e):m(n)&&e!=null&&typeof e!="string"?t=String(e):p(n)&&typeof e=="string"&&(t=I(e)),y(t)}let s;function G(n,e){if(!n||!a(e))return n;if("rings"in n||"paths"in n){if(s==null)throw new TypeError("geometry engine not loaded");return s.simplify(e,n)}return n}async function P(){return s==null&&(s=await w(()=>import("./geometryEngineJSON-FxYgI0L3.js").then(n=>n.g),__vite__mapDeps([0,1,2,3]))),s}async function S(n,e){!a(n)||e!=="esriGeometryPolygon"&&e!=="esriGeometryPolyline"||await P()}export{S as I,A as d,c as f,F as p,G as w};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/geometryEngineJSON-FxYgI0L3.js","assets/index-J0iiHjMT.js","assets/index-PpMPqKeV.css","assets/json-v6EOeNTY.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}