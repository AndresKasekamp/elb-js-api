import{aT as u}from"./index-pCX-0tJH.js";import{g as f}from"./locale-tKMV0J87.js";/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */const t={};async function i(e,s){const a=`${s}_${e}`;return t[a]||(t[a]=fetch(u(`./assets/${s}/t9n/messages_${e}.json`)).then(n=>(n.ok||g(),n.json())).catch(()=>g())),t[a]}function g(){throw new Error("could not fetch component message bundle")}function c(e){e.messages={...e.defaultMessages,...e.messageOverrides}}async function l(e){e.defaultMessages=await o(e,e.effectiveLocale),c(e)}async function o(e,s){const{el:a}=e,r=a.tagName.toLowerCase().replace("calcite-","");return i(f(s,"t9n"),r)}async function m(e,s){e.defaultMessages=await o(e,s),c(e)}function w(e){e.onMessagesChange=d}function y(e){e.onMessagesChange=void 0}function d(){c(this)}export{w as c,y as d,l as s,m as u};
