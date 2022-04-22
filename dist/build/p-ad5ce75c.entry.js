import{r as o,c as t,h as e,H as i,g as l}from"./p-24a1cdec.js";import{g as n}from"./p-891005fd.js";const r=class{constructor(e){o(this,e),this.ldoptionselect=t(this,"ldoptionselect",7),this.selected=!1,this.disabled=!1}async focusOption(){this.optionRef.focus()}handleClick(){this.disabled||(this.preventDeselection&&this.selected&&"checkbox"!==this.mode||(this.selected=!this.selected),"checkbox"!==this.mode&&(this.hasFocus=!1,this.hasHover=!1),this.ldoptionselect.emit(this.selected))}handleKeyDown(o){" "!==o.key&&"Enter"!==o.key||(o.preventDefault(),o.stopImmediatePropagation(),this.handleClick()),"Escape"===o.key&&(this.hasFocus=!1,this.hasHover=!1)}componentWillLoad(){void 0===this.value&&requestAnimationFrame((()=>{this.value=this.el.innerText}))}render(){return e(i,{class:n([this.disabled&&"ld-option-internal--disabled",this.hasFocus&&"ld-option-internal--focus-within",this.hasHover&&"ld-option-internal--hover-within"])},e("div",{class:n(["ld-option-internal",this.size&&`ld-option-internal--${this.size}`]),role:"option",ref:o=>this.optionRef=o,"aria-selected":this.selected?"true":void 0,"aria-disabled":this.disabled?"true":void 0,onClick:this.handleClick.bind(this),onFocus:()=>this.hasFocus=!0,onBlur:()=>this.hasFocus=!1,onMouseOver:()=>this.hasHover=!0,onMouseOut:()=>this.hasHover=!1,tabindex:"-1",part:"option focusable"},"checkbox"===this.mode?e("div",{class:"ld-option-internal__checkbox-wrapper",role:"presentation",part:"checkbox-wrapper"},e("ld-checkbox",{class:"ld-option-internal__checkbox",checked:this.selected,disabled:this.disabled,part:"checkbox"})):e("svg",{role:"presentation",class:"ld-option-internal__check",width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",part:"check"},e("path",{style:{visibility:this.selected?"inherit":"hidden"},d:"M15 7L8.40795 13L5 9.63964",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round"})),e("span",{class:"ld-option-internal__label",title:this.title,part:"label"},e("slot",null))))}get el(){return l(this)}};r.style=':host(:not(:last-of-type)) .ld-option-internal{border-bottom:solid var(--ld-option-border-col) var(--ld-sp-1)}.ld-option-internal{--ld-option-padding-left-sm:0.625rem;--ld-option-padding-left-lg:0.875rem;--ld-option-bg-col:var(--ld-col-wht);--ld-option-border-col:var(--ld-col-neutral-100);--ld-option-disabled-text-col:var(--ld-col-neutral-100);--ld-option-text-col:var(--ld-col-neutral-900);--ld-option-thm-col:var(--ld-thm-primary);--ld-option-thm-col-hover:var(--ld-thm-primary-hover);--ld-option-thm-col-focus:var(--ld-thm-primary-focus);--ld-option-thm-col-active:var(--ld-thm-primary-active);--ld-option-thm-bg-col-hover:var(--ld-thm-primary-highlight);--ld-option-thm-bg-col-focus:var(--ld-thm-primary-highlight);--ld-option-thm-bg-col-active:var(--ld-thm-primary-highlight);-webkit-touch-callout:none;background-color:var(--ld-option-bg-col);border:0;box-sizing:border-box;color:var(--ld-option-text-col);display:flex;font:var(--ld-typo-label-m);min-height:2.5rem;outline:none;padding:var(--ld-sp-8) var(--ld-sp-12);position:relative;touch-action:manipulation;-webkit-user-select:none;user-select:none;white-space:nowrap}.ld-option-internal--sm{padding-left:var(--ld-option-padding-left-sm)}.ld-option-internal--lg{padding-left:var(--ld-option-padding-left-lg)}.ld-option-internal *,.ld-option-internal :after,.ld-option-internal :before{box-sizing:inherit}[data-popper-placement*=bottom] .ld-option-internal:last-of-type{border-bottom-left-radius:var(--ld-br-m);border-bottom-right-radius:var(--ld-br-m)}[data-popper-placement*=top] .ld-option-internal:first-of-type{border-top-left-radius:var(--ld-br-m);border-top-right-radius:var(--ld-br-m)}.ld-option-internal:not([aria-disabled=true]){cursor:pointer}.ld-option-internal[aria-disabled=true]{color:var(--ld-option-disabled-text-col)}.ld-option-internal:before{border-radius:var(--ld-br-m);bottom:0;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.ld-option-internal:where(:focus):before,.ld-option-internal:where(:focus:focus-visible):before{box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-option-thm-col)}.ld-option-internal:where(:focus:not(:focus-visible)):before{box-shadow:none}.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])) :where(.ld-option-internal__check){color:var(--ld-option-thm-col)}.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:focus),.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:focus:focus-visible){background-color:var(--ld-option-thm-bg-col-focus)}.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:focus) :where(.ld-option-internal__check),.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:focus:focus-visible) :where(.ld-option-internal__check){color:var(--ld-option-thm-col-focus)}.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:focus:not(:focus-visible)){background-color:var(--ld-option-bg-col)}.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:focus:not(:focus-visible)) :where(.ld-option-internal__check){color:var(--ld-option-thm-col)}@media (hover:hover){.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:hover){background-color:var(--ld-option-thm-bg-col-hover)}.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:hover) :where(.ld-option-internal__check){color:var(--ld-option-thm-col-hover)}}.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:active),.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:active:focus-visible){background-color:var(--ld-option-thm-bg-col-active)}.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:active) :where(.ld-option-internal__check),.ld-option-internal:where(:not(.ld-option-internal--disabled):not([aria-disabled=true])):where(:active:focus-visible) :where(.ld-option-internal__check){color:var(--ld-option-thm-col-active)}.ld-option-internal__checkbox-wrapper{display:inline-flex;flex-shrink:0}.ld-option-internal__check,.ld-option-internal__checkbox{align-self:center;flex-shrink:0;transform:translateX(calc(var(--ld-sp-2)*-1))}.ld-option-internal__check{margin-right:var(--ld-sp-4)}.ld-option-internal__checkbox{margin-left:var(--ld-sp-2);margin-right:var(--ld-sp-6)}.ld-option-internal__label{overflow:hidden;text-overflow:ellipsis}';export{r as ld_option_internal}