import{r as t,h as o,g as r}from"./p-4bb69ba2.js";import{g as e}from"./p-891005fd.js";import{c as d}from"./p-0c5b1c57.js";let l=class{constructor(o){t(this,o),this.autofocus=!1,this.type="submit",this.iconOnly=!1,this.handleClick=t=>{const o=this.button.getAttribute("aria-disabled");if(this.disabled||o&&"false"!==o)return t.preventDefault(),void t.stopImmediatePropagation();this.href||"button"===this.type||setTimeout((()=>{t.defaultPrevented||(this.el.closest("form")||this.form)&&this.clickHiddenButton()}))}}async focusInner(){void 0!==this.button&&this.button.focus()}connectedCallback(){this.el.addEventListener("click",this.handleClick,{capture:!0})}componentDidLoad(){this.autofocus&&this.focusInner()}disconnectedCallback(){var t;this.el.removeEventListener("click",this.handleClick,{capture:!0}),null===(t=this.attributesObserver)||void 0===t||t.disconnect()}clickHiddenButton(){const t=document.createElement("button");t.style.pointerEvents="none",t.style.position="absolute",t.style.visibility="hidden",this.form&&t.setAttribute("form",this.form),void 0!==this.formaction&&(t.formAction=this.formaction),void 0!==this.formenctype&&(t.formEnctype=this.formenctype),void 0!==this.formmethod&&(t.formMethod=this.formmethod),void 0!==this.formnovalidate&&(t.formNoValidate=this.formnovalidate),void 0!==this.formtarget&&(t.formTarget=this.formtarget),void 0!==this.name&&(t.name=this.name),void 0!==this.type&&(t.type=this.type),void 0!==this.value&&(t.value=this.value),this.el.parentNode.append(t),t.click(),t.remove()}componentWillLoad(){this.attributesObserver=d.call(this,["align-text","brand-color","justify-content","ld-tabindex","mode","progress","size","submit"===this.type?"type":void 0]),this.el.textContent.trim()||(this.iconOnly=!0)}render(){const t=e(["ld-button",this.alignText&&`ld-button--align-text-${this.alignText}`,this.brandColor&&"ld-button--brand-color",this.iconOnly&&"ld-button--icon-only",this.justifyContent&&`ld-button--justify-${this.justifyContent}`,this.mode&&`ld-button--${this.mode}`,this.size&&`ld-button--${this.size}`]),r=this.href?"a":"button",d=null!=this.progress,l=isNaN(parseFloat(this.progress+""))?void 0:{"--ld-button-progress":this.progress+""},n="ld-button__progress"+("pending"===this.progress?" ld-button__progress--pending":"");return o(r,Object.assign({},this.clonedAttributes,{href:this.href,"aria-busy":d?"true":void 0,"aria-disabled":this.disabled||"true"===this.el.getAttribute("aria-disabled")?"true":void 0,"aria-live":"polite",class:t,disabled:this.disabled,part:"button focusable",ref:t=>this.button=t,rel:"_blank"===this.target?"noreferrer noopener":void 0,tabIndex:this.ldTabindex,value:this.value}),o("slot",null),d&&o("span",{class:n,part:"progress-bar",style:l}))}get el(){return r(this)}};l.style=':host{-webkit-appearance:none!important;appearance:none!important;display:inline-flex}:host>:where(.ld-button){width:100%}.ld-button{--ld-button-icon-size-sm:1rem;--ld-button-icon-size-md:1.25rem;--ld-button-icon-size-lg:1.5rem;--ld-button-icon-margin-x-sm:-0.125rem;--ld-button-icon-margin-x-md:-0.25rem;--ld-button-icon-margin-x-lg:-0.5rem;--ld-button-padding-x-sm:0.625rem;--ld-button-padding-y-sm:0.5rem;--ld-button-padding-x-md:0.875rem;--ld-button-padding-y-md:0.625rem;--ld-button-padding-x-lg:1.3125rem;--ld-button-padding-y-lg:0.75rem;--ld-button-gap-sm:0.625rem;--ld-button-gap-md:0.875rem;--ld-button-gap-lg:1.1875rem;background-color:var(--ld-button-bg-color,var(--ld-thm-primary));box-sizing:border-box;margin:0;position:relative;font:var(--ld-typo-body-m);border:0;overflow:hidden;transform:translateZ(0);padding:var(--ld-button-padding-y-md) var(--ld-button-padding-x-md);border-radius:var(--ld-button-border-top-left-radius,var(--ld-br-m)) var(--ld-button-border-top-right-radius,var(--ld-br-m)) var(--ld-button-border-bottom-right-radius,var(--ld-br-m)) var(--ld-button-border-bottom-left-radius,var(--ld-br-m));min-height:2.5rem;min-width:2.5rem;text-decoration:none;-webkit-user-select:none;user-select:none;touch-action:manipulation;color:var(--ld-button-text-color,var(--ld-col-wht));display:inline-grid;grid-auto-flow:column;gap:var(--ld-button-gap-md);align-items:center;text-align:center;justify-content:center;font-weight:700;line-height:1;-webkit-touch-callout:none}.ld-button:where(:disabled),.ld-button:where([aria-disabled=true]){opacity:.2}.ld-button:where(:not(:disabled):not([aria-disabled=true])){cursor:pointer}.ld-button:where(:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible){background-color:var(--ld-button-bg-color-focus,var(--ld-thm-primary-focus));color:var(--ld-button-text-color-focus,var(--ld-thm-primary-active))}@media (hover:hover){.ld-button:where(:not(:disabled):not([aria-disabled=true])):where(:hover){background-color:var(--ld-button-bg-color-hover,var(--ld-thm-primary-hover));color:var(--ld-button-text-color-hover,var(--ld-col-wht))}}.ld-button:where(:not(:disabled):not([aria-disabled=true])):where(:active),.ld-button:where(:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible){background-color:var(--ld-button-bg-color-active,var(--ld-thm-primary-active));color:var(--ld-button-text-color-active,var(--ld-col-wht))}.ld-button ::slotted(ld-icon),.ld-button :where(ld-icon){line-height:0}.ld-button ::slotted(.ld-icon),.ld-button ::slotted(ld-icon),.ld-button>.ld-icon,.ld-button>ld-icon{margin:auto var(--ld-button-icon-margin-x-md)}.ld-button:where(.ld-button--sm){min-height:2rem;min-width:2rem;padding:var(--ld-button-padding-y-sm) var(--ld-button-padding-x-sm);font:var(--ld-typo-body-s);font-weight:700;line-height:1;gap:var(--ld-button-gap-sm)}.ld-button:where(.ld-button--sm) ::slotted(.ld-icon),.ld-button:where(.ld-button--sm) ::slotted(ld-icon),.ld-button:where(.ld-button--sm)>.ld-icon,.ld-button:where(.ld-button--sm)>ld-icon{margin:auto var(--ld-button-icon-margin-x-sm)}.ld-button:where(.ld-button--lg){min-height:3.125rem;min-width:3.125rem;padding:var(--ld-button-padding-y-lg) var(--ld-button-padding-x-lg);font:var(--ld-typo-body-l);font-weight:700;line-height:1;gap:var(--ld-button-gap-lg)}.ld-button:where(.ld-button--lg) ::slotted(.ld-icon),.ld-button:where(.ld-button--lg) ::slotted(ld-icon),.ld-button:where(.ld-button--lg)>.ld-icon,.ld-button:where(.ld-button--lg)>ld-icon{margin:auto var(--ld-button-icon-margin-x-lg)}.ld-button:where(.ld-button--align-text-right){text-align:right}.ld-button:where(.ld-button--align-text-left){text-align:left}.ld-button:where(.ld-button--justify-start){justify-content:flex-start}.ld-button:where(.ld-button--justify-end){justify-content:flex-end}.ld-button:where(.ld-button--justify-between){justify-content:space-between}.ld-button:where(.ld-button--icon-only){--ld-button-padding-x-sm:0;--ld-button-padding-y-sm:0;--ld-button-padding-x-md:0;--ld-button-padding-y-md:0;--ld-button-padding-x-lg:0;--ld-button-padding-y-lg:0}.ld-button[aria-busy=true]{cursor:progress}@keyframes ld-button-progress-pending{0%{transform:translateX(-100%);z-index:-1}to{transform:translateX(100%);z-index:-1}}.ld-button__progress{--ld-button-progress:0;position:absolute;top:auto;right:0;bottom:0;left:0;z-index:-1}.ld-button__progress:after{background-color:var(--ld-button-progress-color,var(--ld-thm-secondary));content:"";display:block;height:var(--ld-sp-4);transform:translateX(-100%) translateX(calc(var(--ld-button-progress)*100%));transition:transform .2s ease}.ld-button__progress--pending:after{animation:ld-button-progress-pending 1s linear infinite}.ld-button--highlight{background-color:var(--ld-button-highlight-bg-color,var(--ld-thm-warning));color:var(--ld-button-highlight-text-color,var(--ld-thm-warning-active))}.ld-button--highlight .ld-button__progress:after{background-color:var(--ld-button-highlight-progress-color,var(--ld-thm-warning-active))}.ld-button--highlight:where(:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible){background-color:var(--ld-button-highlight-bg-color-focus,var(--ld-thm-warning-focus))}@media (hover:hover){.ld-button--highlight:where(:not(:disabled):not([aria-disabled=true])):where(:hover){background-color:var(--ld-button-highlight-bg-color-hover,var(--ld-thm-warning-hover))}}.ld-button--highlight:where(:not(:disabled):not([aria-disabled=true])):where(:active),.ld-button--highlight:where(:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible){background-color:var(--ld-button-highlight-bg-color-active,var(--ld-thm-warning-active));color:var(--ld-button-highlight-text-color-active,var(--ld-thm-warning-hover))}.ld-button--highlight:where(:not(:disabled):not([aria-disabled=true])):where(:active) .ld-button__progress:after,.ld-button--highlight:where(:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible) .ld-button__progress:after{background-color:var(--ld-button-highlight-progress-active,var(--ld-thm-warning-hover))}.ld-button--danger{background-color:var(--ld-button-danger-bg-color,var(--ld-thm-error));color:var(--ld-button-danger-text-color,var(--ld-col-wht))}.ld-button--danger .ld-button__progress:after{background-color:var(--ld-button-danger-progress-color,var(--ld-thm-error-hover))}.ld-button--danger:where(:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible){background-color:var(--ld-button-danger-bg-color-focus,var(--ld-thm-error-focus))}.ld-button--danger:where(:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible) .ld-button__progress:after{background-color:var(--ld-button-danger-progress-color,var(--ld-thm-error-active))}@media (hover:hover){.ld-button--danger:where(:not(:disabled):not([aria-disabled=true])):where(:hover){background-color:var(--ld-button-danger-bg-color-hover,var(--ld-thm-error-hover));color:var(--ld-button-danger-text-color-hover,var(--ld-col-wht))}.ld-button--danger:where(:not(:disabled):not([aria-disabled=true])):where(:hover) .ld-button__progress:after{background-color:var(--ld-button-danger-progress-color,var(--ld-thm-error))}}.ld-button--danger:where(:not(:disabled):not([aria-disabled=true])):where(:active),.ld-button--danger:where(:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible){background-color:var(--ld-button-danger-bg-color-active,var(--ld-thm-error-active));color:var(--ld-button-danger-text-color-active,var(--ld-col-wht))}.ld-button--danger:where(:not(:disabled):not([aria-disabled=true])):where(:active) .ld-button__progress:after,.ld-button--danger:where(:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible) .ld-button__progress:after{background-color:var(--ld-button-danger-progress-color,var(--ld-thm-error))}.ld-button--ghost,.ld-button--secondary{background-color:initial;color:var(--ld-button-ghost-text-color,var(--ld-thm-primary))}.ld-button--ghost .ld-button__progress:after,.ld-button--secondary .ld-button__progress:after{background-color:var(--ld-button-ghost-progress-color,var(--ld-thm-primary))}.ld-button--ghost:where(:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible),.ld-button--secondary:where(:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible){color:var(--ld-button-ghost-text-color-focus,var(--ld-thm-primary-focus))}.ld-button--ghost:where(:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible) .ld-button__progress:after,.ld-button--secondary:where(:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible) .ld-button__progress:after{background-color:var(--ld-button-ghost-progress-color-focus,var(--ld-thm-primary-focus))}@media (hover:hover){.ld-button--ghost:where(:not(:disabled):not([aria-disabled=true])):where(:hover),.ld-button--secondary:where(:not(:disabled):not([aria-disabled=true])):where(:hover){background-color:var(--ld-button-ghost-bg-color-hover,var(--ld-thm-primary-alpha-lowest));color:var(--ld-button-ghost-text-color-hover,var(--ld-thm-primary-hover))}.ld-button--ghost:where(:not(:disabled):not([aria-disabled=true])):where(:hover) .ld-button__progress:after,.ld-button--secondary:where(:not(:disabled):not([aria-disabled=true])):where(:hover) .ld-button__progress:after{background-color:var(--ld-button-ghost-progress-color-hover,var(--ld-thm-primary-hover))}}.ld-button--ghost:where(:not(:disabled):not([aria-disabled=true])):where(:active),.ld-button--ghost:where(:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible),.ld-button--secondary:where(:not(:disabled):not([aria-disabled=true])):where(:active),.ld-button--secondary:where(:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible){background-color:var(--ld-button-ghost-bg-color-active,var(--ld-thm-primary-alpha-low));color:var(--ld-button-ghost-text-color-active,var(--ld-thm-primary-active))}.ld-button--ghost:where(:not(:disabled):not([aria-disabled=true])):where(:active) .ld-button__progress:after,.ld-button--ghost:where(:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible) .ld-button__progress:after,.ld-button--secondary:where(:not(:disabled):not([aria-disabled=true])):where(:active) .ld-button__progress:after,.ld-button--secondary:where(:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible) .ld-button__progress:after{background-color:var(--ld-button-ghost-progress-color-active,var(--ld-thm-primary-active))}.ld-button--secondary{box-shadow:inset 0 0 0 2px}.ld-button--ghost .ld-button__progress{background-color:var(--ld-button-ghost-progress-track-color,var(--ld-thm-primary-alpha-low))}@media (hover:hover){.ld-button--ghost:where(:hover) .ld-button__progress{background-color:initial}}.ld-button--ghost:where(:active) .ld-button__progress,.ld-button--ghost:where(:active:focus-visible) .ld-button__progress{background-color:initial}.ld-button--brand-color:where(:not(.ld-button--secondary):not(.ld-button--ghost)){background-color:var(--ld-button-brand-bg-color,var(--ld-col-wht));color:var(--ld-button-brand-text-color,var(--ld-thm-primary))}.ld-button--brand-color:where(:not(.ld-button--secondary):not(.ld-button--ghost)):where(.ld-button--brand-color:where(:not(.ld-button--secondary):not(.ld-button--ghost)):not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible){color:var(--ld-button-brand-text-color-focus,var(--ld-thm-primary-focus))}@media (hover:hover){.ld-button--brand-color:where(:not(.ld-button--secondary):not(.ld-button--ghost)):where(.ld-button--brand-color:where(:not(.ld-button--secondary):not(.ld-button--ghost)):not(:disabled):not([aria-disabled=true])):where(:hover){background-color:var(--ld-button-brand-bg-color-hover,var(--ld-col-wht-alpha-high))}}.ld-button--brand-color:where(:not(.ld-button--secondary):not(.ld-button--ghost)):where(.ld-button--brand-color:where(:not(.ld-button--secondary):not(.ld-button--ghost)):not(:disabled):not([aria-disabled=true])):where(:active),.ld-button--brand-color:where(:not(.ld-button--secondary):not(.ld-button--ghost)):where(.ld-button--brand-color:where(:not(.ld-button--secondary):not(.ld-button--ghost)):not(:disabled):not([aria-disabled=true])):where(:active:focus-visible){background-color:var(--ld-button-brand-bg-color-active,var(--ld-col-wht-alpha-medium))}.ld-button--brand-color.ld-button--ghost,.ld-button--brand-color.ld-button--secondary{background-color:initial;color:var(--ld-button-secondary-brand-text-color,var(--ld-col-wht))}.ld-button--brand-color.ld-button--ghost .ld-button__progress:after,.ld-button--brand-color.ld-button--secondary .ld-button__progress:after{background-color:var(--ld-button-secondary-brand-progress-color,var(--ld-col-wht))}.ld-button--brand-color.ld-button--ghost:where(.ld-button--brand-color.ld-button--ghost:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible),.ld-button--brand-color.ld-button--secondary:where(.ld-button--brand-color.ld-button--secondary:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible){color:var(--ld-button-secondary-brand-text-color,var(--ld-col-wht-alpha-high))}.ld-button--brand-color.ld-button--ghost:where(.ld-button--brand-color.ld-button--ghost:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible) .ld-button__progress:after,.ld-button--brand-color.ld-button--secondary:where(.ld-button--brand-color.ld-button--secondary:not(:disabled):not([aria-disabled=true])):where(:focus:focus-visible) .ld-button__progress:after{background-color:var(--ld-button-secondary-brand-progress-color-focus,var(--ld-col-wht-alpha-high))}@media (hover:hover){.ld-button--brand-color.ld-button--ghost:where(.ld-button--brand-color.ld-button--ghost:not(:disabled):not([aria-disabled=true])):where(:hover),.ld-button--brand-color.ld-button--secondary:where(.ld-button--brand-color.ld-button--secondary:not(:disabled):not([aria-disabled=true])):where(:hover){background-color:var(--ld-button-secondary-brand-bg-color-hover,var(--ld-col-wht-alpha-low))}}.ld-button--brand-color.ld-button--ghost:where(.ld-button--brand-color.ld-button--ghost:not(:disabled):not([aria-disabled=true])):where(:active),.ld-button--brand-color.ld-button--ghost:where(.ld-button--brand-color.ld-button--ghost:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible),.ld-button--brand-color.ld-button--secondary:where(.ld-button--brand-color.ld-button--secondary:not(:disabled):not([aria-disabled=true])):where(:active),.ld-button--brand-color.ld-button--secondary:where(.ld-button--brand-color.ld-button--secondary:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible){background-color:var(--ld-button-secondary-brand-bg-color-active,var(--ld-col-wht-alpha-lowest));color:var(--ld-button-secondary-brand-text-color,var(--ld-col-wht-alpha-highest))}.ld-button--brand-color.ld-button--ghost:where(.ld-button--brand-color.ld-button--ghost:not(:disabled):not([aria-disabled=true])):where(:active) .ld-button__progress:after,.ld-button--brand-color.ld-button--ghost:where(.ld-button--brand-color.ld-button--ghost:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible) .ld-button__progress:after,.ld-button--brand-color.ld-button--secondary:where(.ld-button--brand-color.ld-button--secondary:not(:disabled):not([aria-disabled=true])):where(:active) .ld-button__progress:after,.ld-button--brand-color.ld-button--secondary:where(.ld-button--brand-color.ld-button--secondary:not(:disabled):not([aria-disabled=true])):where(:active:focus-visible) .ld-button__progress:after{background-color:var(--ld-button-secondary-brand-progress-color-active,var(--ld-col-wht-alpha-highest))}.ld-button--brand-color.ld-button--secondary{box-shadow:inset 0 0 0 2px}';export{l as ld_button}