import{bU as P,d2 as D,i6 as q,i7 as E,ab as z,i8 as G,i9 as H,ia as A,bH as B,ib as J,cZ as N}from"./index-pCX-0tJH.js";async function W(a,d,l,p,o){const{elevationProvider:u,renderCoordsHelper:r}=a,{elevationInfo:g}=d,{pointsInFeatures:w,spatialReference:h}=p,y=D.fromJSON(h),b=q(g,!0),I=await E(b,y,o);z(o);const c=[],e=new Set,t=new Set;f.spatialReference=y;const s=a.elevationProvider.spatialReference??a.spatialReference;for(const{objectId:n,points:i}of w){const m=l(n);if(m==null){for(const R of i)c.push(R.z??0);e.add(n);continue}m.isDraped&&t.add(n);const C=m.graphic.geometry;S.setFromElevationInfo(G(C,g)),S.updateFeatureExpressionInfoContext(I,m.graphic,d);for(const{x:R,y:F,z:O}of i)f.x=R,f.y=F,f.z=O??0,await H(f,j,s,0,{signal:o}),A(j,u,S,r,v),c.push(v.z)}return{elevations:c,drapedObjectIds:t,failedObjectIds:e}}const S=new B,f=P(0,0,0,D.WGS84),v=new J,j=[0,0,0];async function Z(a,d,l){if(a==null||d.candidates.length===0)return x;const p=a.graphics3DGraphicsByObjectID??a.graphics3DGraphics,o=[],u=[],{renderer:r}=a,g=r!=null&&"arcadeRequired"in r&&r.arcadeRequired?N():null,w=async(e,{graphic:t,graphics3DSymbol:s})=>{const n=await g,i=await a.getRenderingInfoAsync(t,r,n,{signal:l});return i==null?[]:s.queryForSnapping(e,y,i,l)},{candidates:h,spatialReference:y}=d;for(let e=0;e<h.length;++e){const t=h[e],{objectId:s}=t,n=typeof s=="number"?p==null?void 0:p.get(s):void 0;if(n==null)continue;const{graphics3DSymbol:i}=n;i.symbologySnappingSupported&&(o.push(w(t,n)),u.push(e))}if(o.length===0)return x;const b=await Promise.all(o);z(l);const I=[],c=[];for(let e=0;e<b.length;++e){const t=b[e],s=u[e];for(const n of t)I.push(n),c.push(s)}return{candidates:I,sourceCandidateIndices:c}}const x={candidates:[],sourceCandidateIndices:[]};export{W as c,Z as r};