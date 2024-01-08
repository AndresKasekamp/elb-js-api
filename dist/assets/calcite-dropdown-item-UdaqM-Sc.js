import{p as k,H as v,d as c,k as i,t as I,l as D}from"./index-pCX-0tJH.js";import{C as t}from"./resources2-gI505pgk.js";import{c as E,s as x,a as y}from"./loadable-uNbe2Ndt.js";import{g as a}from"./component-dtiBfYiX.js";import{d as C}from"./icon-BW6RCrUr.js";import"./observers-eNe735aq.js";/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v1.11.0
 */const z=`.container--s{padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-inline-end:0.5rem;padding-inline-start:1.5rem}.container--m{padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-inline-end:0.75rem;padding-inline-start:2rem}.container--l{padding-block:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-inline-end:1rem;padding-inline-start:2.5rem}.container--s.container--none-selection{padding-inline-start:0.25rem}.container--s.container--none-selection .dropdown-link{padding-inline-start:0px}.container--m.container--none-selection{padding-inline-start:0.5rem}.container--m.container--none-selection .dropdown-link{padding-inline-start:0px}.container--l.container--none-selection{padding-inline-start:0.75rem}.container--l.container--none-selection .dropdown-link{padding-inline-start:0px}:host{position:relative;display:flex;flex-grow:1;align-items:center}.container{position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;color:var(--calcite-ui-text-3);text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);text-align:start}.dropdown-item-content{flex:1 1 auto;padding-block:0.125rem;padding-inline-end:auto;padding-inline-start:0.25rem}:host,.container--link a{outline-color:transparent}:host(:focus){outline:2px solid transparent;outline-offset:2px;outline:2px solid var(--calcite-ui-focus-color, var(--calcite-ui-brand));outline-offset:calc(
            -2px *
            calc(
              1 -
              2 * clamp(
                0,
                var(--calcite-ui-focus-offset-invert),
                1
              )
            )
          )}.container--link{padding:0px}.container--link a{position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;color:var(--calcite-ui-text-3);text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.container--s .dropdown-link{padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-inline-end:0.5rem;padding-inline-start:1.5rem}.container--m .dropdown-link{padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-inline-end:0.75rem;padding-inline-start:2rem}.container--l .dropdown-link{padding-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-inline-end:1rem;padding-inline-start:2.5rem}:host(:hover) .container,:host(:active) .container{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);text-decoration-line:none}:host(:hover) .container--link .dropdown-link,:host(:active) .container--link .dropdown-link{color:var(--calcite-ui-text-1)}:host(:focus) .container{color:var(--calcite-ui-text-1);text-decoration-line:none}:host(:active) .container{background-color:var(--calcite-ui-foreground-3)}:host(:hover) .container:before,:host(:active) .container:before,:host(:focus) .container:before{opacity:1}:host([selected]) .container:not(.container--none-selection),:host([selected]) .container--link .dropdown-link{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}:host([selected]) .container:not(.container--none-selection):before,:host([selected]) .container--link .dropdown-link:before{opacity:1;color:var(--calcite-ui-brand)}:host([selected]) .container:not(.container--none-selection) calcite-icon,:host([selected]) .container--link .dropdown-link calcite-icon{color:var(--calcite-ui-brand)}.container--multi-selection:before,.container--none-selection:before{display:none}.container--s:before{inset-inline-start:0.5rem}.container--m:before{inset-inline-start:0.75rem}.container--l:before{inset-inline-start:1rem}.dropdown-item-icon{position:absolute;opacity:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:scale(0.9)}.container--s .dropdown-item-icon{inset-inline-start:0.25rem}.container--m .dropdown-item-icon{inset-inline-start:0.5rem}.container--l .dropdown-item-icon{inset-inline-start:0.75rem}:host(:hover) .dropdown-item-icon{color:var(--calcite-ui-border-1);opacity:1}:host([selected]) .dropdown-item-icon{color:var(--calcite-ui-brand);opacity:1}.container--s .dropdown-item-icon-start{margin-inline-end:0.5rem;margin-inline-start:0.25rem}.container--s .dropdown-item-icon-end{margin-inline-start:0.5rem}.container--m .dropdown-item-icon-start{margin-inline-end:0.75rem;margin-inline-start:0.25rem}.container--m .dropdown-item-icon-end{margin-inline-start:0.75rem}.container--l .dropdown-item-icon-start{margin-inline-end:1rem;margin-inline-start:0.25rem}.container--l .dropdown-item-icon-end{margin-inline-start:1rem}:host([hidden]){display:none}[hidden]{display:none}`,p=k(class extends v{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteDropdownItemSelect=c(this,"calciteDropdownItemSelect",6),this.calciteInternalDropdownItemSelect=c(this,"calciteInternalDropdownItemSelect",6),this.calciteInternalDropdownItemKeyEvent=c(this,"calciteInternalDropdownItemKeyEvent",6),this.calciteInternalDropdownCloseRequest=c(this,"calciteInternalDropdownCloseRequest",6),this.selected=!1,this.iconFlipRtl=void 0,this.iconStart=void 0,this.iconEnd=void 0,this.href=void 0,this.label=void 0,this.rel=void 0,this.target=void 0,this.selectionMode="single",this.scale="m"}async setFocus(){var e;await E(this),(e=this.el)==null||e.focus()}componentWillLoad(){x(this),this.initialize()}componentDidLoad(){y(this)}connectedCallback(){this.initialize()}render(){const{href:e,selectionMode:n,label:s,iconFlipRtl:o,scale:u}=this,l=i("calcite-icon",{class:t.iconStart,flipRtl:o==="start"||o==="both",icon:this.iconStart,scale:a(this.scale)}),r=i("span",{class:t.itemContent},i("slot",null)),d=i("calcite-icon",{class:t.iconEnd,flipRtl:o==="end"||o==="both",icon:this.iconEnd,scale:a(this.scale)}),m=this.iconStart&&this.iconEnd?[l,r,d]:this.iconStart?[l,r]:this.iconEnd?[r,d]:r,f=e?i("a",{"aria-label":s,class:t.link,href:e,rel:this.rel,tabIndex:-1,target:this.target,ref:b=>this.childLink=b},m):m,g=e?null:n==="single"?"menuitemradio":n==="multiple"?"menuitemcheckbox":"menuitem",w=n!=="none"?I(this.selected):null;return i(D,{"aria-checked":w,"aria-label":e?"":s,role:g,tabindex:"0"},i("div",{class:{[t.container]:!0,[t.containerLink]:!!e,[`${t.container}--${u}`]:!0,[t.containerMulti]:n==="multiple",[t.containerSingle]:n==="single",[t.containerNone]:n==="none"}},n!=="none"?i("calcite-icon",{class:t.icon,icon:n==="multiple"?"check":"bullet-point",scale:a(this.scale)}):null,f))}onClick(){this.emitRequestedItem()}keyDownHandler(e){switch(e.key){case" ":case"Enter":this.emitRequestedItem(),this.href&&this.childLink.click(),e.preventDefault();break;case"Escape":this.calciteInternalDropdownCloseRequest.emit(),e.preventDefault();break;case"Tab":this.calciteInternalDropdownItemKeyEvent.emit({keyboardEvent:e});break;case"ArrowUp":case"ArrowDown":case"Home":case"End":e.preventDefault(),this.calciteInternalDropdownItemKeyEvent.emit({keyboardEvent:e});break}}updateActiveItemOnChange(e){e.composedPath().includes(this.parentDropdownGroupEl)&&(this.requestedDropdownGroup=e.detail.requestedDropdownGroup,this.requestedDropdownItem=e.detail.requestedDropdownItem,this.determineActiveItem()),e.stopPropagation()}initialize(){this.parentDropdownGroupEl=this.el.closest("calcite-dropdown-group"),this.selectionMode==="none"&&(this.selected=!1)}determineActiveItem(){switch(this.selectionMode){case"multiple":this.el===this.requestedDropdownItem&&(this.selected=!this.selected);break;case"single":this.el===this.requestedDropdownItem?this.selected=!0:this.requestedDropdownGroup===this.parentDropdownGroupEl&&(this.selected=!1);break;case"none":this.selected=!1;break}}emitRequestedItem(){this.calciteDropdownItemSelect.emit(),this.calciteInternalDropdownItemSelect.emit({requestedDropdownItem:this.el,requestedDropdownGroup:this.parentDropdownGroupEl})}get el(){return this}static get style(){return z}},[1,"calcite-dropdown-item",{selected:[1540],iconFlipRtl:[513,"icon-flip-rtl"],iconStart:[513,"icon-start"],iconEnd:[513,"icon-end"],href:[513],label:[1],rel:[513],target:[513],selectionMode:[1,"selection-mode"],scale:[1],setFocus:[64]},[[0,"click","onClick"],[0,"keydown","keyDownHandler"],[16,"calciteInternalDropdownItemChange","updateActiveItemOnChange"]]]);function h(){if(typeof customElements>"u")return;["calcite-dropdown-item","calcite-icon"].forEach(n=>{switch(n){case"calcite-dropdown-item":customElements.get(n)||customElements.define(n,p);break;case"calcite-icon":customElements.get(n)||C();break}})}h();const F=p,H=h;export{F as CalciteDropdownItem,H as defineCustomElement};