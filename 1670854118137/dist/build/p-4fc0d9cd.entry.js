import{r as o,h as d,H as i,g as r,c as t}from"./p-765a6fc5.js";import{g as c}from"./p-891005fd.js";import{c as l}from"./p-dfb8e7ac.js";const a=class{constructor(d){o(this,d),this.scrollIntoViewOnTransitionEnd=!1,this.scrollIntoView=o=>{var d;const i=function(o){let d=getComputedStyle(o);if("fixed"===d.position)return document.scrollingElement;const i="absolute"===d.position,r=/(auto|scroll)/;for(let t=o;t=t.parentElement;)if(d=getComputedStyle(t),(!i||"static"!==d.position)&&r.test(d.overflow+d.overflowY+d.overflowX))return t;return document.scrollingElement}(o),r=o.querySelector("ld-accordion-toggle"),t=o.querySelector("ld-accordion-panel"),c=Array.from(o.parentElement.children),l=this.single&&!this.scrollIntoViewOnTransitionEnd&&(null===(d=c.slice(0,c.findIndex((d=>d===o))).find((o=>o.classList.contains("ld-accordion-section--expanded"))))||void 0===d?void 0:d.children[1].scrollHeight)||0,a=i.scrollTop+t.getBoundingClientRect().top-Math.max(0,i.getBoundingClientRect().top),e=parseFloat(window.getComputedStyle(i).scrollPaddingTop)||0,n=a+Math.min(t.scrollHeight,i.clientHeight-r.clientHeight-e)-l;if(!this.scrollIntoViewOnTransitionEnd&&i.scrollHeight<n)this.scrollIntoViewOnTransitionEnd=!0;else if(!this.el.closest("ld-accordion-panel")&&i.clientHeight+i.scrollTop<n){const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches;i.scrollTo({top:n-i.clientHeight,behavior:o?"auto":"smooth"})}},this.focusToggle=(o,d)=>{var i;const r=null===(i="prev"===d?o.parentElement.previousElementSibling:o.parentElement.nextElementSibling)||void 0===i?void 0:i.querySelector("ld-accordion-toggle");r&&r.focusInner()},this.onKeydown=o=>{if("LD-ACCORDION-TOGGLE"===o.target.tagName)switch(o.key){case"ArrowUp":return o.preventDefault(),void this.focusToggle(o.target,"prev");case"ArrowDown":return o.preventDefault(),void this.focusToggle(o.target,"next")}},this.onTransitionEnd=o=>{const d=o.target;this.scrollIntoViewOnTransitionEnd&&"LD-ACCORDION-PANEL"===d.tagName&&d.closest("ld-accordion")===this.el&&d.closest("ld-accordion-section").expanded&&(this.scrollIntoView(d.closest("ld-accordion-section")),this.scrollIntoViewOnTransitionEnd=!1)},this.brandColor=void 0,this.detached=!1,this.rounded=!1,this.single=!1,this.tone=void 0}handleAccordionExpandChange(o){"LD-ACCORDION-SECTION"===o.target.tagName&&(this.single&&o.target.expanded&&[...o.target.parentElement.children].filter((d=>d!==o.target)).forEach((o=>{o.expanded=!1})),o.detail&&this.scrollIntoView(o.target))}render(){const o=c(["ld-accordion",this.detached&&"ld-accordion--detached",this.brandColor&&"ld-accordion--brand-color",!this.brandColor&&this.tone&&`ld-accordion--${this.tone}`,this.rounded&&"ld-accordion--rounded"]);return d(i,{class:o,onKeydown:this.onKeydown,onTransitionEnd:this.onTransitionEnd},d("slot",null))}get el(){return r(this)}};a.style=":host{--ld-accordion-col:var(--ld-col-neutral-900);--ld-accordion-col-disabled:var(--ld-col-neutral-100);--ld-accordion-col-hover:var(--ld-col-neutral-900);--ld-accordion-col-focus:var(--ld-col-neutral-900);--ld-accordion-bg-col:var(--ld-col-wht);--ld-accordion-bg-col-active:var(--ld-col-wht);--ld-accordion-bg-col-disabled:var(--ld-col-neutral-100);--ld-accordion-bg-col-focus:var(--ld-col-neutral-100);--ld-accordion-bg-col-hover:var(--ld-col-neutral-050);--ld-accordion-trigger-icon-col-disabled:var(--ld-col-neutral-100);--ld-accordion-col-active:var(--ld-thm-primary);--ld-accordion-col-selected:var(--ld-thm-primary);--ld-accordion-toggle-col:inherit;--ld-accordion-toggle-indicator-bg-col:#0000;--ld-accordion-toggle-trigger-col:var(--ld-thm-primary);--ld-accordion-trigger-icon-col:var(--ld-thm-primary);--ld-accordion-trigger-icon-col-hover:var(--ld-thm-primary-hover);--ld-accordion-trigger-icon-col-focus:var(--ld-thm-primary-focus);--ld-accordion-trigger-icon-col-active:var(--ld-thm-primary-active);--ld-accordion-toggle-expanded-col:var(--ld-thm-primary);--ld-accordion-padding-y:0.45rem;--ld-accordion-padding-x:1.25rem;--ld-accordion-toggle-size:2.5rem;--ld-accordion-toggle-line-height:180%;--ld-accordion-border-radius-size:0;--ld-accordion-border-radius:var(--ld-accordion-border-radius-size);--ld-accordion-gap:var(--ld-sp-2);--ld-accordion-gap-col:var(--ld-accordion-panel-border-top-col);--ld-accordion-panel-border-top-col:var(--ld-col-neutral-010)}:host(:where(.ld-accordion)){color-scheme:none;color-scheme:var(--ld-accordion-color-scheme,none);display:block;flex-grow:1}:host(.ld-accordion--rounded){--ld-accordion-border-radius-size:var(--ld-br-m)}:host(.ld-accordion--dark){--ld-accordion-bg-col:var(--ld-col-neutral-010);--ld-accordion-bg-col-active:var(--ld-col-neutral-010);--ld-accordion-panel-border-top-col:var(--ld-col-neutral-050)}:host(.ld-accordion--brand-color){--ld-accordion-bg-col-hover:var(--ld-thm-primary-alpha-lowest);--ld-accordion-bg-col-focus:var(--ld-thm-primary-alpha-low)}:host(.ld-accordion--detached){--ld-accordion-gap:var(--ld-sp-8);--ld-accordion-gap-col:#0000}:host(.ld-accordion:not(.ld-accordion--detached)) ::slotted(ld-accordion-section){--ld-accordion-border-radius:0}:host(.ld-accordion:not(.ld-accordion--detached)) ::slotted(ld-accordion-section:first-of-type){--ld-accordion-border-radius:var(--ld-accordion-border-radius-size) var(--ld-accordion-border-radius-size) 0 0}:host(.ld-accordion:not(.ld-accordion--detached)) ::slotted(ld-accordion-section:last-of-type){--ld-accordion-border-radius:0 0 var(--ld-accordion-border-radius-size) var(--ld-accordion-border-radius-size)}:host ::slotted(ld-accordion-section:not(:first-of-type)){border-top:solid var(--ld-accordion-gap) var(--ld-accordion-gap-col)}";const e=class{constructor(d){o(this,d),this.ldaccordionmaxheightchange=t(this,"ldaccordionmaxheightchange",7),this.applyMaxHeight=(o=0)=>{o&&(this.innerPanelExpanding=!0),this.expanded&&this.ldaccordionmaxheightchange.emit(this.el.scrollHeight),this.maxHeight=this.expanded?this.el.scrollHeight+o:0},this.handleInnerMaxHeightChange=o=>{o.target!==this.el&&(o.stopImmediatePropagation(),this.applyMaxHeight(o.detail))},this.onTransitionEnd=o=>{o.target===this.el&&(this.innerPanelExpanding=!1)},this.expanded=void 0,this.initialized=!1,this.transitionEnabled=!1,this.maxHeight=void 0,this.resizeObserver=void 0,this.innerPanelExpanding=!1}async setExpanded(o){this.expanded=o,this.applyMaxHeight()}componentDidLoad(){setTimeout((()=>{this.resizeObserver=new ResizeObserver((()=>{this.innerPanelExpanding||this.applyMaxHeight()})),this.resizeObserver.observe(this.contentRef),this.initialized=!0}))}disconnectedCallback(){var o;null===(o=this.resizeObserver)||void 0===o||o.unobserve(this.contentRef)}render(){const o=c(["ld-accordion-panel",this.expanded&&"ld-accordion-panel--expanded",this.initialized&&"ld-accordion-panel--initialized"]);return d(i,{style:{"--ld-accordion-panel-max-height":this.maxHeight+"px"},class:o,onTransitionEnd:this.onTransitionEnd,onLdaccordionmaxheightchange:this.handleInnerMaxHeightChange},d("div",{part:"content",ref:o=>this.contentRef=o,class:"ld-accordion-panel__content"},d("slot",null)))}get el(){return r(this)}};e.style=':host{--ld-accordion-panel-transition-duration:0.001s;background-color:var(--ld-accordion-bg-col);border-radius:var(--ld-accordion-border-radius);border-top-left-radius:inherit;border-top-right-radius:inherit;box-sizing:border-box;display:block;max-height:auto;max-height:var(--ld-accordion-panel-max-height,auto);overflow:hidden;position:relative;will-change:max-height}:host(.ld-accordion-panel--initialized){transition:max-height var(--ld-accordion-panel-transition-duration) ease}@media (prefers-reduced-motion:no-preference){:host(.ld-accordion-panel--initialized){--ld-accordion-panel-transition-duration:0.2s}}:host(.ld-accordion-panel--expanded):before{background-color:var(--ld-accordion-panel-border-top-col);content:"";height:var(--ld-sp-2);left:0;position:absolute;right:0;top:0}:host(.ld-accordion-panel--expanded) .ld-accordion-panel__content{opacity:1;transition:opacity var(--ld-accordion-panel-transition-duration) linear;visibility:inherit}.ld-accordion-panel__content{opacity:0;transition:opacity var(--ld-accordion-panel-transition-duration) linear,visibility 0s var(--ld-accordion-panel-transition-duration) linear;visibility:hidden}';const n=class{constructor(d){o(this,d),this.ldaccordionchange=t(this,"ldaccordionchange",7),this.expanded=void 0,this.initialized=!1}updateExpandedState(o){Array.from(this.el.children).forEach((d=>{"function"==typeof d.setExpanded&&d.setExpanded(o)})),this.initialized&&this.ldaccordionchange.emit(o)}handleToggleClick(o){const d="composedPath"in o?o.composedPath().at(0):o.target;l("ld-accordion-section",d)===this.el&&(this.expanded=!this.expanded)}componentWillLoad(){this.updateExpandedState(this.expanded),this.initialized=!0}render(){const o=c(["ld-accordion-section",this.expanded&&"ld-accordion-section--expanded"]);return d(i,{class:o,onLdaccordiontoggleclick:this.handleToggleClick.bind(this)},d("slot",null))}get el(){return r(this)}static get watchers(){return{expanded:["updateExpandedState"]}}};n.style=":host{display:block}";const s=class{constructor(d){o(this,d),this.ldaccordiontoggleclick=t(this,"ldaccordiontoggleclick",7),this.ldaccordionlabelclick=t(this,"ldaccordionlabelclick",7),this.handleToggleClick=o=>{o.preventDefault(),this.disabled||this.ldaccordiontoggleclick.emit()},this.handleLabelClick=o=>{o.preventDefault(),this.disabled||this.ldaccordionlabelclick.emit()},this.disabled=void 0,this.labelTag="button",this.ldTabindex=void 0,this.split=void 0,this.toggleLabel="Toggle",this.expanded=void 0,this.hasCustomIcon=!1}async focusInner(){this.btnRef.focus({preventScroll:!0})}async setExpanded(o){this.expanded=o}componentWillLoad(){this.hasCustomIcon=!!this.el.querySelector('[slot="icon"]')}render(){const o=c(["ld-accordion-toggle",this.expanded&&"ld-accordion-toggle--expanded",this.split&&"ld-accordion-toggle--split"]),r=d("div",{class:"ld-accordion-toggle__trigger-content",part:"trigger-content"},d("slot",{name:"icon"}),!this.hasCustomIcon&&d("ld-icon",{name:"arrow-down",size:"sm",part:"trigger-icon","aria-hidden":"true",class:"ld-accordion-toggle__trigger-icon"})),t=this.split?d("button",{part:"trigger focusable",class:"ld-accordion-toggle__trigger","aria-disabled":this.disabled?"true":void 0,"aria-expanded":this.expanded?"true":"false","aria-label":this.toggleLabel,onClick:this.handleToggleClick,ref:o=>this.btnRef=o},r):d("div",{part:"trigger",class:"ld-accordion-toggle__trigger"},r),l=this.split?d(this.labelTag,{part:"label"+("button"===this.labelTag?" focusable":""),"aria-disabled":this.disabled?"true":void 0,class:"ld-accordion-toggle__label",onClick:this.handleLabelClick},d("div",{class:"ld-accordion-toggle__label-content",part:"label-content"},d("slot",null))):d("div",{part:"label",class:"ld-accordion-toggle__label"},d("div",{class:"ld-accordion-toggle__label-content",part:"label-content"},d("slot",null))),a=d("div",{part:"content",class:"ld-accordion-toggle__content"},l,t),e=this.split?d("div",{part:"toggle",class:"ld-accordion-toggle__button"},a):d("button",{"aria-disabled":this.disabled?"true":void 0,"aria-expanded":this.expanded?"true":"false",class:"ld-accordion-toggle__button",onClick:this.handleToggleClick,part:"toggle focusable",ref:o=>this.btnRef=o,tabindex:this.ldTabindex},a);return d(i,{class:o},e)}get el(){return r(this)}};s.style=':host{border-radius:var(--ld-accordion-border-radius);display:block;position:relative;z-index:1}.ld-accordion-toggle__button,.ld-accordion-toggle__label,.ld-accordion-toggle__trigger{-webkit-touch-callout:none;border:0;box-sizing:border-box;margin:0;text-align:left;touch-action:manipulation;-webkit-user-select:none;user-select:none;width:100%}.ld-accordion-toggle__button{align-items:center;background-color:var(--ld-accordion-bg-col);border-radius:inherit;color:var(--ld-accordion-col);direction:var(--ld-accordion-grid-dir);display:grid;font:var(--ld-typo-body-m);grid-template-columns:1fr var(--ld-accordion-toggle-size);padding:0;position:relative}.ld-accordion-toggle__button[aria-disabled]{color:var(--ld-accordion-col-disabled)}:host(.ld-accordion-toggle:not(.ld-accordion-toggle--split)) .ld-accordion-toggle__button:before{background-color:var(--ld-accordion-toggle-indicator-bg-col);border-radius:var(--ld-accordion-border-radius);bottom:0;content:"";left:0;position:absolute;right:0;top:0}:host(.ld-accordion-toggle:not(.ld-accordion-toggle--split)) .ld-accordion-toggle__button:not([aria-disabled]):where(:focus:focus-visible){--ld-accordion-toggle-indicator-bg-col:var(\n          --ld-accordion-bg-col-focus\n        )}@media (hover:hover){:host(.ld-accordion-toggle:not(.ld-accordion-toggle--split)) .ld-accordion-toggle__button:not([aria-disabled]):where(:hover){--ld-accordion-toggle-indicator-bg-col:var(\n            --ld-accordion-bg-col-hover\n          )}}:host(.ld-accordion-toggle:not(.ld-accordion-toggle--split)) .ld-accordion-toggle__button:not([aria-disabled]):where(:active),:host(.ld-accordion-toggle:not(.ld-accordion-toggle--split)) .ld-accordion-toggle__button:not([aria-disabled]):where(:active:focus-visible){--ld-accordion-toggle-indicator-bg-col:var(\n          --ld-accordion-bg-col-active\n        )}:host(.ld-accordion-toggle--expanded:not(.ld-accordion-toggle--split)) .ld-accordion-toggle__button:before{border-bottom-left-radius:0;border-bottom-right-radius:0}:host(.ld-accordion-toggle:not(.ld-accordion-toggle--split):not(.ld-accordion-toggle--expanded)) .ld-accordion-toggle__button:not([aria-disabled]):where(:focus:focus-visible){--ld-accordion-toggle-col:var(--ld-accordion-col-focus)}@media (hover:hover){:host(.ld-accordion-toggle:not(.ld-accordion-toggle--split):not(.ld-accordion-toggle--expanded)) .ld-accordion-toggle__button:not([aria-disabled]):where(:hover){--ld-accordion-toggle-col:var(--ld-accordion-col-hover)}}:host(.ld-accordion-toggle:not(.ld-accordion-toggle--split):not(.ld-accordion-toggle--expanded)) .ld-accordion-toggle__button:not([aria-disabled]):where(:active),:host(.ld-accordion-toggle:not(.ld-accordion-toggle--split):not(.ld-accordion-toggle--expanded)) .ld-accordion-toggle__button:not([aria-disabled]):where(:active:focus-visible){--ld-accordion-toggle-col:var(--ld-accordion-col-active)}.ld-accordion-toggle__button:not([aria-disabled]) .ld-accordion-toggle__trigger{color:var(--ld-accordion-trigger-icon-col)}.ld-accordion-toggle__label,.ld-accordion-toggle__trigger{background-color:initial;font:inherit}button.ld-accordion-toggle__button:not([aria-disabled]),button.ld-accordion-toggle__label:not([aria-disabled]),button.ld-accordion-toggle__trigger:not([aria-disabled]){cursor:pointer}.ld-accordion-toggle__label{border-radius:var(--ld-accordion-border-radius);border-bottom-right-radius:0;border-top-right-radius:0;padding:var(--ld-accordion-padding-y) var(--ld-accordion-padding-x);position:relative}.ld-accordion-toggle__trigger{align-items:center;border-radius:var(--ld-accordion-border-radius);border-bottom-left-radius:0;border-top-left-radius:0;display:grid;height:var(--ld-accordion-toggle-size);justify-items:center;overflow:hidden;place-items:center;position:relative;width:var(--ld-accordion-toggle-size)}.ld-accordion-toggle__label-content,.ld-accordion-toggle__trigger-content{display:grid;position:relative;transform:translateX(calc(var(--ld-sp-1)*-1))}.ld-accordion-toggle__label:not([aria-disabled]) .ld-accordion-toggle__label-content{color:var(--ld-accordion-toggle-col)}:host(.ld-accordion-toggle--expanded){--ld-accordion-toggle-col:var(--ld-accordion-toggle-expanded-col);border-bottom-left-radius:0;border-bottom-right-radius:0}:host(.ld-accordion-toggle--expanded) .ld-accordion-toggle__trigger-icon{transform:scaleY(-1)}:host(.ld-accordion-toggle--split) .ld-accordion-toggle__label:before,:host(.ld-accordion-toggle--split) .ld-accordion-toggle__trigger:before{border-radius:var(--ld-br-s);bottom:var(--ld-sp-4);content:"";left:var(--ld-sp-4);left:var(--ld-sp-2);position:absolute;right:var(--ld-sp-4);top:var(--ld-sp-4)}:host(.ld-accordion-toggle--split) .ld-accordion-toggle__label[aria-disabled],:host(.ld-accordion-toggle--split) .ld-accordion-toggle__trigger[aria-disabled]{color:var(--ld-accordion-col-disabled)}:host(.ld-accordion-toggle--split) .ld-accordion-toggle__label:before{background-color:var(--ld-accordion-toggle-label-indicator-bg-col);transform:translateX(calc(var(--ld-sp-2)))}:host(.ld-accordion-toggle--split) .ld-accordion-toggle__trigger:before{background-color:var(--ld-accordion-toggle-trigger-indicator-bg-col)}:host(.ld-accordion-toggle--split) .ld-accordion-toggle__button:not([aria-disabled]){background-color:var(--ld-accordion-bg-col)}:host(.ld-accordion-toggle--split) .ld-accordion-toggle__label:not([aria-disabled]):where(:focus:focus-visible){--ld-accordion-toggle-label-indicator-bg-col:var(\n        --ld-accordion-bg-col-focus\n      )}@media (hover:hover){:host(.ld-accordion-toggle--split) .ld-accordion-toggle__label:not([aria-disabled]):where(:hover){--ld-accordion-toggle-label-indicator-bg-col:var(\n          --ld-accordion-bg-col-hover\n        )}}:host(.ld-accordion-toggle--split) .ld-accordion-toggle__label:not([aria-disabled]):where(:active),:host(.ld-accordion-toggle--split) .ld-accordion-toggle__label:not([aria-disabled]):where(:active:focus-visible){--ld-accordion-toggle-label-indicator-bg-col:var(\n        --ld-accordion-bg-col-active\n      )}:host(.ld-accordion-toggle--split) .ld-accordion-toggle__trigger:not([aria-disabled]):where(:focus:focus-visible){--ld-accordion-toggle-trigger-col:var(--ld-accordion-col-focus);--ld-accordion-toggle-trigger-indicator-bg-col:var(\n        --ld-accordion-bg-col-focus\n      )}@media (hover:hover){:host(.ld-accordion-toggle--split) .ld-accordion-toggle__trigger:not([aria-disabled]):where(:hover){--ld-accordion-toggle-trigger-col:var(--ld-accordion-col-hover);--ld-accordion-toggle-trigger-indicator-bg-col:var(\n          --ld-accordion-bg-col-hover\n        )}}:host(.ld-accordion-toggle--split) .ld-accordion-toggle__trigger:not([aria-disabled]):where(:active),:host(.ld-accordion-toggle--split) .ld-accordion-toggle__trigger:not([aria-disabled]):where(:active:focus-visible){--ld-accordion-toggle-trigger-col:var(--ld-accordion-col-active);--ld-accordion-toggle-trigger-indicator-bg-col:var(\n        --ld-accordion-bg-col-active\n      )}.ld-accordion-toggle__content{display:contents}';export{a as ld_accordion,e as ld_accordion_panel,n as ld_accordion_section,s as ld_accordion_toggle}