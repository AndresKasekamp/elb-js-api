/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */const s=(e,a,t)=>Math.max(a,Math.min(e,t)),r=new RegExp(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/),m=e=>{const a=(""+e).match(r);return!a||parseInt(a[1])===0?0:Math.max(0,(a[1]?a[1].length:0)-(a[2]?+a[2]:0))};function o(e,a,t,n,c){return(e-a)*(c-n)/(t-a)+n}function u(e,a,t){return e<t?-1:e>a-t?1:0}export{u as a,s as c,m as d,o as r};
