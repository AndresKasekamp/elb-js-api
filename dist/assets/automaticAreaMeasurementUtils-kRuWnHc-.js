import{h,g,k as i}from"./euclideanAreaMeasurementUtils-jpli3_gk.js";import{kE as q,bz as $,a8 as k,cK as o,kF as l,d9 as b,d2 as d}from"./index-pCX-0tJH.js";import{r as y}from"./Tooltip-a9KqLK1p.js";function M({hasZ:r,spatialReference:n,rings:e},s,u=0){const a=q(n);if(a==null)return!1;const m=r?t=>t:t=>$(R,t[0],t[1],u);for(const t of e){const c=[];for(const p of t){const f=[0,0,u];a(m(p),0,f,0),c.push(f)}s.push(c)}return!0}const R=k();function G(r){const{spatialReference:n}=r;return y(n,w,x,z,r)}function w(r){return o(Math.abs(l([r],"square-meters")[0]),"square-meters")}function x(r){try{return o(Math.abs(b(r,"square-meters")),"square-meters")}catch{return null}}function z(r){const n=[];return M(r,n)?o(Math.abs(l([{type:"polygon",rings:n,spatialReference:d.WGS84}],"square-meters")[0]),"square-meters"):null}function E(r,n,e=i()){if(n==="on-the-ground"){const s=G(r);return s??h(r,e)}return g(r,e)}function W(r,n=i()){return E(r,"on-the-ground",n)}export{E as o,W as u};