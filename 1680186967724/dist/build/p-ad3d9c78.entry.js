import{r as t,c as e,h as o,H as i,g as l}from"./p-183495a2.js";import{T as r}from"./p-a834665a.js";import{g as d}from"./p-1133c92e.js";import{a as h,i as a}from"./p-44396e3f.js";const s=".ld-tooltip__trigger{--ld-tooltip-trigger-icon-col:var(--ld-thm-primary);--ld-tooltip-trigger-icon-col-hover:var(--ld-thm-primary-hover);--ld-tooltip-trigger-icon-col-focus:var(--ld-thm-primary-focus);background:none;border:0;color:inherit;display:inline-block;font-family:inherit;font-size:inherit;padding:0}.ld-tooltip__trigger--clickable{cursor:pointer}.ld-tooltip__trigger:focus:focus-visible .ld-tooltip__icon{color:var(--ld-tooltip-trigger-icon-col-focus)}.ld-tooltip__trigger:hover .ld-tooltip__icon{color:var(--ld-tooltip-trigger-icon-col-hover)}.ld-tooltip__trigger~.ld-tooltip{display:none;opacity:0;position:absolute}.ld-tooltip__icon{color:var(--ld-tooltip-trigger-icon-col);display:flex;height:var(--ld-sp-16);width:var(--ld-sp-16)}.ld-tooltip__content{display:none}";let n=0;const p=t=>"classList"in t;const c=t=>t&&t.tagName==="SLOT";const f=t=>({"bottom center":"top center","bottom left":"top left","bottom right":"top right","left bottom":"bottom right","left middle":"middle right","left top":"top right","right bottom":"bottom left","right middle":"middle left","right top":"top left","top center":"bottom center","top left":"bottom left","top right":"bottom right"}[t]);const g=t=>{var e;return(e={"left bottom":"bottom left","left middle":"middle left","left top":"top left","right bottom":"bottom right","right middle":"middle right","right top":"top right"}[t])!==null&&e!==void 0?e:t};const m=t=>{if(!("querySelectorAll"in t)){return}t.querySelectorAll("slot").forEach((t=>{t.assignedNodes().forEach((e=>{m(e);t.parentElement.insertBefore(e,t)}));t.remove()}))};const u=class{constructor(o){t(this,o);this.ldtooltipopen=e(this,"ldtooltipopen",7);this.ldtooltipclose=e(this,"ldtooltipclose",7);this.idDescriber=`ld-tooltip-${++n}`;this.syncContent=()=>{const t=this.contentRef.querySelector("slot").assignedNodes();t.forEach((t=>{m(t);const e=t.cloneNode(true);this.tooltipRef.appendChild(e)}))};this.initTooltip=async()=>{const t=f(this.position);const e=g(this.position);const o=typeof this.tetherOptions==="string"?JSON.parse(this.tetherOptions):this.tetherOptions;const i=Object.assign({attachment:t,classPrefix:"ld-tether",constraints:[{attachment:"together",to:"window"}],element:this.tooltipRef,target:this.triggerRef,targetAttachment:e},o);this.popper=new r(i);this.popper.enable();this.popper.enable();this.popper.enable();await this.showTooltip()};this.toggleTooltip=()=>{if(this.popper==undefined){return}if(this.visible){this.hideTooltip()}else{this.showTooltip()}};this.handleHideTrigger=()=>{if(this.triggerType==="click"||this.disabled){return}clearTimeout(this.delayTimeout);if(this.popper){this.delayTimeout=setTimeout((()=>{this.hideTooltip()}),this.hideDelay)}};this.handleShowTrigger=()=>{if(this.triggerType==="click"||this.disabled){return}clearTimeout(this.delayTimeout);if(this.popper===undefined){this.delayTimeout=setTimeout(this.initTooltip,this.showDelay)}else{this.delayTimeout=setTimeout(this.showTooltip.bind(this),this.showDelay)}};this.handleToggleTrigger=()=>{if(this.triggerType==="hover"||this.disabled){return}if(this.popper===undefined){this.initTooltip()}else{this.toggleTooltip()}};this.handleSlotChange=()=>{this.tooltipRef.childNodes.forEach((t=>{if(p(t)&&t.classList.contains("ld-tether-element-marker")){return}t.remove()}));this.syncContent()};this.initObserver=()=>{this.observer=new MutationObserver(this.handleSlotChange);this.observer.observe(this.el,{subtree:true,childList:true,attributes:true})};this.findFirstSlottedTrigger=()=>{let t=this.el.querySelector('[slot="trigger"]');while(c(t)){t=t.assignedElements()[0]}return t};this.arrow=undefined;this.disabled=undefined;this.hideDelay=0;this.position="top center";this.preventScreenreader=false;this.showDelay=0;this.size=undefined;this.unstyled=undefined;this.tag="button";this.tetherOptions=undefined;this.triggerType="hover";this.hasDefaultTrigger=true;this.triggerTabIndex=undefined;this.visible=false}updatePopper(t){if(t){this.hideTooltip()}}async getTooltip(){return this.tooltipRef}async hideTooltip(){var t;clearTimeout(this.delayTimeout);(t=this.popper)===null||t===void 0?void 0:t.disable();this.visible=false;this.ldtooltipclose.emit()}async showTooltip(){if(this.disabled)return;clearTimeout(this.delayTimeout);this.popper.enable();this.visible=true;this.ldtooltipopen.emit()}handleClickOutside(t){if(this.visible&&this.triggerType==="click"&&t.isTrusted&&!t.composedPath().includes(this.el)){this.hideTooltip()}}handleTouchOutside(t){this.handleClickOutside(t)}componentWillLoad(){const t=this.findFirstSlottedTrigger();this.hasDefaultTrigger=!t;if(t&&(t.matches(h)||a(t))){this.triggerTabIndex=-1}this.el.addEventListener("focus",this.handleShowTrigger,true);this.el.addEventListener("blur",this.handleHideTrigger,true)}componentDidLoad(){setTimeout((()=>{this.syncContent();this.initObserver()}))}disconnectedCallback(){var t,e,o;(t=this.observer)===null||t===void 0?void 0:t.disconnect();(e=this.popper)===null||e===void 0?void 0:e.destroy();(o=this.tooltipRef)===null||o===void 0?void 0:o.remove()}render(){const t=this.tag;return o(i,null,o(t,{"aria-describedby":this.preventScreenreader?undefined:this.idDescriber,class:d(["ld-tooltip__trigger",this.triggerType==="click"&&"ld-tooltip__trigger--clickable"]),onClick:this.handleToggleTrigger,onMouseEnter:this.handleShowTrigger,onMouseLeave:this.handleHideTrigger,part:"trigger focusable",ref:t=>{this.triggerRef=t},tabIndex:this.triggerTabIndex,type:"button"},o("ld-sr-only",null,"Info"),o("slot",{name:"trigger"},o("svg",{class:"ld-tooltip__icon",fill:"none",part:"icon",viewBox:"0 0 24 24"},o("path",{"clip-rule":"evenodd",d:"M12 23C18.0751 23 23 18.0751 23 12C23 5.9249 18.0751 1 12 1C5.9249 1 1 5.9249 1 12C1 18.0751 5.9249 23 12 23Z","fill-rule":"evenodd",fill:"currentColor"}),o("path",{"clip-rule":"evenodd",d:"M11.9996 8.6477C12.9254 8.6477 13.6758 7.8973 13.6758 6.9715C13.6758 6.0458 12.9254 5.2953 11.9996 5.2953C11.0739 5.2953 10.3235 6.0458 10.3235 6.9715C10.3235 7.8973 11.0739 8.6477 11.9996 8.6477ZM10.8453 17.8038C11.1932 18.1517 11.6736 18.3256 12.2865 18.3256H13.4545C13.6864 18.3256 13.8023 18.2263 13.8023 18.0275V12.2873C13.8023 11.6744 13.6284 11.1939 13.2805 10.8461C12.9326 10.4982 12.4522 10.3242 11.8393 10.3242H10.6713C10.4394 10.3242 10.3235 10.4236 10.3235 10.6224V16.3626C10.3235 16.9755 10.4974 17.456 10.8453 17.8038Z","fill-rule":"evenodd",fill:"var(--ld-col-wht)"})))),o("span",{class:"ld-tooltip__content",part:"content",ref:t=>this.contentRef=t},o("slot",null)),o("ld-tooltip-popper",{"aria-hidden":this.visible?undefined:"true",arrow:this.arrow,hasDefaultTrigger:this.hasDefaultTrigger,id:this.preventScreenreader?undefined:this.idDescriber,unstyled:this.unstyled,part:"popper",ref:t=>{this.tooltipRef=t},size:this.size,triggerType:this.triggerType}))}get el(){return l(this)}static get watchers(){return{disabled:["updatePopper"]}}};u.style=s;const w="@keyframes ld-tooltip-show{0%{opacity:0}to{opacity:1}}@keyframes ld-tooltip-hide{to{visibility:hidden}}:host(.ld-tooltip){--ld-zi-max:2147483647;--ld-tooltip-animation-duration:0s;--ld-tooltip-distance-from-trigger:var(--ld-sp-8);--ld-tooltip-max-width:20rem;--ld-tooltip-offset-x:0px;--ld-tooltip-offset-y:0px;--ld-tooltip-padding:var(--ld-sp-16);--ld-tooltip-sm-padding:var(--ld-sp-6) var(--ld-sp-8);--tooltip-col:var(--ld-col-neutral-900);--tooltip-bg-col:var(--ld-col-wht);animation:ld-tooltip-hide 0s ease 0s;animation:ld-tooltip-hide 0s ease var(--ld-tooltip-animation-duration);animation-fill-mode:forwards;margin-left:0;margin-left:var(--ld-tooltip-offset-x);margin-top:0;margin-top:var(--ld-tooltip-offset-y);max-width:20rem;max-width:var(--ld-tooltip-max-width);opacity:0;pointer-events:none;position:relative;transition:opacity 0s ease-in;transition:opacity var(--ld-tooltip-animation-duration) ease-in;z-index:2147483647;z-index:var(--ld-zi-max)}:host(.ld-tooltip:not(.ld-tooltip--unstyled)){background-color:var(--tooltip-bg-col);border-radius:var(--ld-br-m);color:var(--tooltip-col);filter:var(--ld-drop-shadow-hover);padding:var(--ld-tooltip-padding)}@media (prefers-reduced-motion:no-preference){:host(.ld-tooltip--initialized){--ld-tooltip-animation-duration:var(--ld-transition-duration-normal)}}:host(.ld-tooltip--sm){--ld-tooltip-padding:var(--ld-tooltip-sm-padding)}:host(.ld-tooltip--with-arrow){--ld-tooltip-arrow-size:0.5rem;--ld-tooltip-arrow-offset:var(--ld-sp-16);--ld-tooltip-distance-from-trigger:calc(var(--ld-tooltip-arrow-size) + var(--ld-sp-8))}:host(.ld-tooltip--interactive){pointer-events:auto}:host(.ld-tooltip.ld-tether-enabled){animation:ld-tooltip-show var(--ld-tooltip-animation-duration) ease-out;opacity:1}:host(.ld-tooltip.ld-tether-element-attached-bottom) .ld-tooltip__arrow{bottom:var(--ld-tooltip-arrow-offset)}:host(.ld-tooltip.ld-tether-element-attached-bottom.ld-tether-target-attached-top){margin-top:calc(var(--ld-tooltip-distance-from-trigger) * -1 - var(--ld-tooltip-offset-y))}:host(.ld-tooltip.ld-tether-element-attached-bottom.ld-tether-target-attached-top) .ld-tooltip__arrow{border-top-color:var(--tooltip-bg-col);top:100%}:host(.ld-tooltip.ld-tether-element-attached-center) .ld-tooltip__arrow{left:calc(50% - var(--ld-tooltip-arrow-size))}:host(.ld-tooltip.ld-tether-element-attached-left.ld-tether-target-attached-right){margin-left:calc(var(--ld-tooltip-offset-x) + var(--ld-tooltip-distance-from-trigger))}:host(.ld-tooltip.ld-tether-element-attached-left.ld-tether-target-attached-right) .ld-tooltip__arrow{border-right-color:var(--tooltip-bg-col);right:100%}:host(.ld-tooltip.ld-tether-element-attached-middle) .ld-tooltip__arrow{top:calc(50% - var(--ld-tooltip-arrow-size))}:host(.ld-tooltip.ld-tether-element-attached-right) .ld-tooltip__arrow{right:var(--ld-tooltip-arrow-offset)}:host(.ld-tooltip.ld-tether-element-attached-right.ld-tether-target-attached-left){margin-left:calc(var(--ld-tooltip-distance-from-trigger) * -1 - var(--ld-tooltip-offset-x))}:host(.ld-tooltip.ld-tether-element-attached-right.ld-tether-target-attached-left) .ld-tooltip__arrow{border-left-color:var(--tooltip-bg-col);left:100%}:host(.ld-tooltip.ld-tether-element-attached-top.ld-tether-target-attached-bottom){margin-top:calc(var(--ld-tooltip-distance-from-trigger) + var(--ld-tooltip-offset-y))}:host(.ld-tooltip.ld-tether-element-attached-top.ld-tether-target-attached-bottom) .ld-tooltip__arrow{border-bottom-color:var(--tooltip-bg-col);bottom:100%}:host(.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-bottom.ld-tether-target-attached-top):where(.ld-tether-element-attached-right)),:host(.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-top.ld-tether-target-attached-bottom):where(.ld-tether-element-attached-right)){--ld-tooltip-offset-x:1rem}:host(.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-bottom.ld-tether-target-attached-top):where(.ld-tether-element-attached-left)),:host(.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-top.ld-tether-target-attached-bottom):where(.ld-tether-element-attached-left)){--ld-tooltip-offset-x:-1rem}:host(.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-left.ld-tether-target-attached-right):where(.ld-tether-element-attached-bottom)),:host(.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-right.ld-tether-target-attached-left):where(.ld-tether-element-attached-bottom)){--ld-tooltip-offset-y:1rem}:host(.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-left.ld-tether-target-attached-right):where(.ld-tether-element-attached-top)),:host(.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-right.ld-tether-target-attached-left):where(.ld-tether-element-attached-top)){--ld-tooltip-offset-y:-1rem}.ld-tooltip__arrow{border:var(--ld-tooltip-arrow-size) solid #0000;position:absolute}";const v=class{constructor(e){t(this,e);this.initialized=false;this.arrow=undefined;this.size=undefined;this.triggerType="hover";this.unstyled=false;this.hasDefaultTrigger=undefined}componentDidLoad(){setTimeout((()=>{this.initialized=true}))}render(){return o(i,{class:d(["ld-tooltip",this.arrow&&"ld-tooltip--with-arrow",this.hasDefaultTrigger&&"ld-tooltip--with-default-trigger",this.initialized&&"ld-tooltip--initialized",this.size&&`ld-tooltip--${this.size}`,this.triggerType==="click"&&"ld-tooltip--interactive",this.unstyled&&"ld-tooltip--unstyled"]),role:"tooltip"},this.arrow&&o("span",{class:"ld-tooltip__arrow"}),o("slot",null))}get element(){return l(this)}};v.style=w;export{u as ld_tooltip,v as ld_tooltip_popper};
//# sourceMappingURL=p-ad3d9c78.entry.js.map