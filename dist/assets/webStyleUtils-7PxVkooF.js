import{E as c,hc as u,dQ as r,hd as h,he as i,hf as m,bS as b,bV as f,hg as d,hh as p,hi as w,hj as g,hk as $}from"./index-J0iiHjMT.js";async function D(e,t,a){if(!e.name)throw new c("style-symbol-reference-name-missing","Missing name in style symbol reference");if(e.styleName&&e.styleName==="Esri2DPointSymbolsStyle")return S(e,a);try{return j(await u(e,t,a),e.name,t,a)}catch(n){return r(n),null}}async function S(e,t){const a=h.replaceAll(/\{SymbolName\}/gi,e.name);try{const n=await i(a,t);return m(n.data)}catch(n){return r(n),null}}async function j(e,t,a,n){const y={portal:(a==null?void 0:a.portal)!=null?a.portal:b.getDefault(),url:f(e.baseUrl),origin:"portal-item"},o=d(t,e.data);if(!o)throw new c("symbolstyleutils:symbol-name-not-found",`The symbol name '${t}' could not be found`,{symbolName:t});let s=p(w(o,"cimRef"),y);g()&&(s=$(s));try{const l=await i(s,n);return m(l.data)}catch(l){return r(l),null}}export{D as fetchCIMSymbolReference};