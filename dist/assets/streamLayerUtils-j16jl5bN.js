import{I as o,b as m}from"./utils-rBsg-VY8.js";import{h0 as c,i as u,h as y}from"./index-J0iiHjMT.js";import"./jsonContext-cWV_-jAj.js";const s="Stream Service",f="stream-layer-save",p="stream-layer-save-as";function n(r){return{isValid:r.type==="stream"&&!!r.url&&!r.webSocketUrl,errorMessage:"Stream layer should be created using a url to a stream service"}}function l(r){const e=r.layerJSON;return Promise.resolve(e&&Object.keys(e).length?e:null)}async function v(r,e){const{parsedUrl:a,title:i,fullExtent:t}=r;e.url=a.path,e.title||(e.title=i),e.extent=null,t!=null&&(e.extent=await c(t)),u(e,y.SINGLE_LAYER)}async function S(r,e){return o({layer:r,itemType:s,validateLayer:n,createItemData:l,errorNamePrefix:f},e)}async function h(r,e,a){return m({layer:r,itemType:s,validateLayer:n,createItemData:l,errorNamePrefix:p,newItem:e,setItemProperties:v},a)}export{S as save,h as saveAs};