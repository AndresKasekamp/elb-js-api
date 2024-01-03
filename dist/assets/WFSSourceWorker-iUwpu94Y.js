import{E as l,s as c,eQ as g,eR as _,b as d,f as F,Z as w,al as E,eU as S,eT as q}from"./index-J0iiHjMT.js";import{m as x}from"./FeatureStore-X-AIJLo2.js";import{x as T,W as R,j as I}from"./QueryEngine-8tLWlkSE.js";import{E as b,N as j}from"./geojson-fSjaGZrp.js";import{p as C}from"./sourceUtils-zbywPEXK.js";import{a as $,B as k}from"./wfsUtils-6CAR46-c.js";import"./BoundsStore-wmwfHjhp.js";import"./PooledRBush-o8tLYBG5.js";import"./quickselect-UFB0jJTZ.js";import"./optimizedFeatureQueryEngineAdapter-KnoSHZzG.js";import"./WhereClause-XAMIZ4-B.js";import"./TimeOnly-ljWtUK7N.js";import"./json-v6EOeNTY.js";import"./QueryEngineCapabilities-PzVpW5yD.js";import"./utils-P5wTOmqv.js";import"./generateRendererUtils-_1jVE02H.js";import"./date-be_IQzZd.js";import"./xmlUtils-Q_9cB30b.js";class X{constructor(){this._queryEngine=null,this._customParameters=null}destroy(){var e;(e=this._queryEngine)==null||e.destroy(),this._queryEngine=null}async load(e,t){const{getFeatureUrl:r,getFeatureOutputFormat:p,fields:o,geometryType:i,featureType:n,objectIdField:u,customParameters:a}=e,{spatialReference:s,getFeatureSpatialReference:h}=$(r,n,e.spatialReference);this._featureType=n,this._customParameters=a,this._getFeatureUrl=r,this._getFeatureOutputFormat=p,this._getFeatureSpatialReference=h;try{await T(h,s)}catch{throw new l("unsupported-projection","Projection not supported",{inSpatialReference:h,outSpatialReference:s})}c(t);const y=g.fromLayerJSON({fields:o,dateFieldsTimeReference:o.some(f=>f.type==="esriFieldTypeDate")?{timeZoneIANA:_}:null}),m=await this._snapshotFeatures({fieldsIndex:y,geometryType:i,objectIdField:u,spatialReference:s},t.signal);return this._queryEngine=new R({fieldsIndex:y,geometryType:i,hasM:!1,hasZ:!1,objectIdField:u,spatialReference:s,timeInfo:null,featureStore:new x({geometryType:i,hasM:!1,hasZ:!1})}),this._queryEngine.featureStore.addMany(m),{extent:(await this._queryEngine.fetchRecomputedExtents()).fullExtent}}async applyEdits(){throw new l("wfs-source:editing-not-supported","applyEdits() is not supported on WFSLayer")}async queryFeatures(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQuery(e,t.signal)}async queryFeatureCount(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForCount(e,t.signal)}async queryObjectIds(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForIds(e,t.signal)}async queryExtent(e={},t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForExtent(e,t.signal)}async querySnapping(e,t={}){return await this._waitSnapshotComplete(),this._queryEngine.executeQueryForSnapping(e,t.signal)}async refresh(e){var t;return this._customParameters=e,(t=this._snapshotTask)==null||t.abort(),this._snapshotTask=d(r=>this._snapshotFeatures(this._queryEngine,r)),this._snapshotTask.promise.then(r=>{this._queryEngine.featureStore.clear(),r&&this._queryEngine.featureStore.addMany(r)},r=>{this._queryEngine.featureStore.clear(),F(r)||w.getLogger("esri.layers.WFSLayer").error(new l("wfs-layer:getfeature-error","An error occurred during the GetFeature request",{error:r}))}),await this._waitSnapshotComplete(),{extent:(await this._queryEngine.fetchRecomputedExtents()).fullExtent}}async _waitSnapshotComplete(){if(this._snapshotTask&&!this._snapshotTask.finished){try{await this._snapshotTask.promise}catch{}return this._waitSnapshotComplete()}}async _snapshotFeatures({objectIdField:e,geometryType:t,spatialReference:r,fieldsIndex:p},o){const i=await k(this._getFeatureUrl??"",this._featureType.typeName,this._getFeatureSpatialReference,this._getFeatureOutputFormat,{customParameters:this._customParameters,signal:o});b(i,this._getFeatureSpatialReference.wkid),c(o);const n=j(i,{geometryType:t,hasZ:!1,objectIdField:e});if(!E(r,this._getFeatureSpatialReference))for(const a of n)a.geometry!=null&&(a.geometry=S(I(q(a.geometry,t,!1,!1),this._getFeatureSpatialReference,r)));let u=1;for(const a of n){const s={};C(p,s,a.attributes,!0),a.attributes=s,s[e]==null&&(a.objectId=s[e]=u++)}return n}}export{X as default};