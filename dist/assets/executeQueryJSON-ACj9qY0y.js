import{dZ as f,ca as i}from"./index-J0iiHjMT.js";import{c as e}from"./query-rG0aX6cE.js";import{d as m}from"./FeatureSet-d4S1oKME.js";async function y(a,r,o){const t=await p(a,r,o);return m.fromJSON(t)}async function p(a,r,o){const t=f(a),c={...o},n=i.from(r),{data:s}=await e(t,n,n.sourceSpatialReference,c);return s}export{p as a,y as s};