import{fU as s,N as c,aa as v,bq as r,B as u,T as w}from"./index-pCX-0tJH.js";function y(t,a){t.interactive=!0;const{tool:n,view:e}=t;e.activeTool=n;let i=s(a,()=>{e.activeTool===n&&(e.activeTool=null)});return c(async o=>{await v(()=>n==null||!n.active,o),i=r(i)},a)}function T(t,a){return u(()=>t.interactive,()=>f(t,a),w)}function f(t,a){t.interactive?d(t,a):l(t)}function d(t,a){l(t);const{view:n,analysis:e}=t,i=new a({view:n,analysis:e,analysisViewData:t});return t.tool=i,n.tools.add(i),i}function l(t){const{view:a,tool:n}=t;n!=null&&(a.tools.remove(n),t.tool=null)}export{T as a,y as l,l as v};