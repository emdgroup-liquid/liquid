import{r as e,h as c,H as o,g as d}from"./p-4bb69ba2.js";import{c as t}from"./p-4c64775c.js";import{g as i}from"./p-891005fd.js";let h=class{constructor(c){e(this,c),this.handleFocus=e=>{setTimeout((()=>{this.el.dispatchEvent(e)}))},this.handleClick=e=>{this.disabled||"true"===this.el.getAttribute("aria-disabled")?null==e||e.preventDefault():(this.checked=!this.checked,e.isTrusted||this.el.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})))}}async focusInner(){void 0!==this.input&&this.input.focus()}updateIndeterminate(){this.indeterminate=void 0}updateHiddenInput(){const e=this.el.closest("form");if(!this.hiddenInput&&this.name&&(e||this.form)&&this.createHiddenInput(),this.hiddenInput){if(!this.name)return this.hiddenInput.remove(),void(this.hiddenInput=void 0);this.hiddenInput.name=this.name,this.hiddenInput.checked=this.checked,this.value?this.hiddenInput.value=this.value:this.hiddenInput.removeAttribute("value"),this.form?this.hiddenInput.setAttribute("form",this.form):this.hiddenInput.getAttribute("form")&&(e?this.hiddenInput.removeAttribute("form"):(this.hiddenInput.remove(),this.hiddenInput=void 0))}}createHiddenInput(){this.hiddenInput=document.createElement("input"),this.hiddenInput.type="checkbox",this.hiddenInput.style.visibility="hidden",this.hiddenInput.style.position="absolute",this.hiddenInput.style.pointerEvents="none",this.el.appendChild(this.hiddenInput)}handleBlur(e){setTimeout((()=>{this.el.dispatchEvent(e)}))}componentWillLoad(){this.attributesObserver=t.call(this,["tone","mode"]);const e=this.el.closest("form");this.name&&(e||this.form)&&(this.createHiddenInput(),this.hiddenInput.checked=this.checked,this.hiddenInput.name=this.name,this.form&&this.hiddenInput.setAttribute("form",this.form),this.value&&(this.hiddenInput.value=this.value))}componentDidLoad(){this.autofocus&&this.focusInner()}disconnectedCallback(){this.attributesObserver.disconnect()}render(){return c(o,{part:"root",class:i(["ld-checkbox",this.mode&&`ld-checkbox--${this.mode}`,this.tone&&`ld-checkbox--${this.tone}`,this.invalid&&"ld-checkbox--invalid"]),onClick:this.handleClick},c("input",Object.assign({},this.clonedAttributes,{part:"input focusable",onBlur:this.handleBlur.bind(this),onFocus:this.handleFocus,ref:e=>this.input=e,type:"checkbox",disabled:this.disabled,checked:this.checked})),c("svg",{class:"ld-checkbox__check",part:"check",width:"14",height:"14",fill:"none",viewBox:"0 0 14 14",xmlns:"http://www.w3.org/2000/svg"},c("path",{d:"M12 4L5.40795 10L2 6.63964",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round"})),c("div",{class:"ld-checkbox__box",part:"box"}))}get el(){return d(this)}static get watchers(){return{checked:["updateIndeterminate","updateHiddenInput"],name:["updateHiddenInput"],value:["updateHiddenInput"]}}};h.style='.ld-checkbox,:host{--ld-checkbox-size:1.25rem;--ld-checkbox-bg-col:var(--ld-col-wht);--ld-checkbox-bg-col-hover:var(--ld-col-neutral-010);--ld-checkbox-bg-col-active:var(--ld-col-neutral-050);--ld-checkbox-disabled-col:var(--ld-col-neutral-300);--ld-checkbox-disabled-bg-col:var(--ld-col-neutral-100);--ld-checkbox-dark-bg-col:var(--ld-col-neutral-050);--ld-checkbox-dark-bg-col-hover:var(--ld-col-neutral-100);--ld-checkbox-dark-bg-col-active:var(--ld-col-neutral-300);--ld-checkbox-checked-col:var(--ld-col-wht);--ld-checkbox-checked-col-active:var(--ld-col-wht);--ld-checkbox-col:var(--ld-thm-primary);--ld-checkbox-col-hover:var(--ld-thm-primary-hover);--ld-checkbox-col-active:var(--ld-thm-primary-active);--ld-checkbox-col-focus:var(--ld-thm-primary-focus);--ld-checkbox-invalid-col:var(--ld-thm-error);--ld-checkbox-invalid-col-hover:var(--ld-thm-error-hover);--ld-checkbox-invalid-col-focus:var(--ld-thm-error-focus);--ld-checkbox-invalid-col-active:var(--ld-thm-error-active);--ld-checkbox-warn-col:var(--ld-thm-warning);--ld-checkbox-warn-col-hover:var(--ld-thm-warning-hover);--ld-checkbox-warn-col-focus:var(--ld-thm-warning-focus);--ld-checkbox-warn-col-active:var(--ld-thm-warning-active);--ld-checkbox-warn-checked-col:var(--ld-thm-warning-active);--ld-checkbox-warn-checked-col-active:var(--ld-thm-warning-hover);position:relative;display:inline-flex;flex-shrink:0;width:var(--ld-checkbox-size);height:var(--ld-checkbox-size);min-width:auto!important;box-sizing:border-box}.ld-checkbox input,:host input{-webkit-appearance:none;appearance:none;position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;width:100%;height:100%;margin:0}.ld-checkbox input:checked~.ld-checkbox__check,:host input:checked~.ld-checkbox__check{visibility:inherit}.ld-checkbox input:indeterminate~.ld-checkbox__box:before,:host input:indeterminate~.ld-checkbox__box:before{content:"";position:absolute;width:50%;height:var(--ld-sp-2);border-radius:var(--ld-sp-2);left:50%;top:50%;transform:translate(-50%,-50%);box-shadow:inherit}.ld-checkbox input:where(:disabled)~.ld-checkbox__check,.ld-checkbox input:where([aria-disabled=true])~.ld-checkbox__check,:host input:where(:disabled)~.ld-checkbox__check,:host input:where([aria-disabled=true])~.ld-checkbox__check{color:var(--ld-checkbox-disabled-col)}.ld-checkbox input:where(:disabled)~.ld-checkbox__box,.ld-checkbox input:where([aria-disabled=true])~.ld-checkbox__box,:host input:where(:disabled)~.ld-checkbox__box,:host input:where([aria-disabled=true])~.ld-checkbox__box{background-color:initial;box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-checkbox-disabled-bg-col)}.ld-checkbox input:where(:disabled):checked~.ld-checkbox__box,.ld-checkbox input:where([aria-disabled=true]):checked~.ld-checkbox__box,:host input:where(:disabled):checked~.ld-checkbox__box,:host input:where([aria-disabled=true]):checked~.ld-checkbox__box{background-color:var(--ld-checkbox-disabled-bg-col)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])),:host input:where(:not(:disabled):not([aria-disabled=true])){cursor:pointer}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true]))~.ld-checkbox__check,:host input:where(:not(:disabled):not([aria-disabled=true]))~.ld-checkbox__check{color:var(--ld-checkbox-col-active)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true]))~.ld-checkbox__box,:host input:where(:not(:disabled):not([aria-disabled=true]))~.ld-checkbox__box{box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-checkbox-col)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):focus:focus-visible~.ld-checkbox__box,:host input:where(:not(:disabled):not([aria-disabled=true])):focus:focus-visible~.ld-checkbox__box{background-color:initial;box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-checkbox-col-focus)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):active~.ld-checkbox__box,.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):active:focus-visible~.ld-checkbox__box,:host input:where(:not(:disabled):not([aria-disabled=true])):active~.ld-checkbox__box,:host input:where(:not(:disabled):not([aria-disabled=true])):active:focus-visible~.ld-checkbox__box{background-color:var(--ld-checkbox-bg-col-active);box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-checkbox-col-active)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):checked~.ld-checkbox__check,:host input:where(:not(:disabled):not([aria-disabled=true])):checked~.ld-checkbox__check{color:var(--ld-checkbox-checked-col)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):checked~.ld-checkbox__box,:host input:where(:not(:disabled):not([aria-disabled=true])):checked~.ld-checkbox__box{background-color:var(--ld-checkbox-col);box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-checkbox-col)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):checked:focus:focus-visible~.ld-checkbox__check,:host input:where(:not(:disabled):not([aria-disabled=true])):checked:focus:focus-visible~.ld-checkbox__check{color:var(--ld-checkbox-col-active)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):checked:focus:focus-visible~.ld-checkbox__box,:host input:where(:not(:disabled):not([aria-disabled=true])):checked:focus:focus-visible~.ld-checkbox__box{background-color:var(--ld-checkbox-col-focus);box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-checkbox-col-focus)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):checked:active~.ld-checkbox__check,.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):checked:active:focus-visible~.ld-checkbox__check,:host input:where(:not(:disabled):not([aria-disabled=true])):checked:active~.ld-checkbox__check,:host input:where(:not(:disabled):not([aria-disabled=true])):checked:active:focus-visible~.ld-checkbox__check{color:var(--ld-checkbox-checked-col-active)}.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):checked:active~.ld-checkbox__box,.ld-checkbox input:where(:not(:disabled):not([aria-disabled=true])):checked:active:focus-visible~.ld-checkbox__box,:host input:where(:not(:disabled):not([aria-disabled=true])):checked:active~.ld-checkbox__box,:host input:where(:not(:disabled):not([aria-disabled=true])):checked:active:focus-visible~.ld-checkbox__box{background-color:var(--ld-checkbox-col-active);box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-checkbox-col-active)}.ld-checkbox :where(input:not(:disabled):not(input[aria-disabled=true]))~.ld-checkbox__box,:host :where(input:not(:disabled):not(input[aria-disabled=true]))~.ld-checkbox__box{background-color:var(--ld-checkbox-bg-col)}@media (hover:hover){.ld-checkbox :where(input:not(:disabled):not(input[aria-disabled=true])):hover~.ld-checkbox__box,:host :where(input:not(:disabled):not(input[aria-disabled=true])):hover~.ld-checkbox__box{background-color:var(--ld-checkbox-bg-col-hover);box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-checkbox-col-hover)}.ld-checkbox :where(input:not(:disabled):not(input[aria-disabled=true])):hover:checked~.ld-checkbox__check,:host :where(input:not(:disabled):not(input[aria-disabled=true])):hover:checked~.ld-checkbox__check{color:var(--ld-checkbox-checked-col)}.ld-checkbox :where(input:not(:disabled):not(input[aria-disabled=true])):hover:checked~.ld-checkbox__box,:host :where(input:not(:disabled):not(input[aria-disabled=true])):hover:checked~.ld-checkbox__box{background-color:var(--ld-checkbox-col-hover);box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-checkbox-col-hover)}}.ld-checkbox.ld-checkbox--dark :where(input):not(:disabled):not(input[aria-disabled=true]):not(:checked)~.ld-checkbox__box,:host(.ld-checkbox.ld-checkbox--dark) :where(input):not(:disabled):not(input[aria-disabled=true]):not(:checked)~.ld-checkbox__box{background-color:var(--ld-checkbox-dark-bg-col)}@media (hover:hover){.ld-checkbox.ld-checkbox--dark :where(input):not(:disabled):not(input[aria-disabled=true]):not(:checked):hover~.ld-checkbox__box,:host(.ld-checkbox.ld-checkbox--dark) :where(input):not(:disabled):not(input[aria-disabled=true]):not(:checked):hover~.ld-checkbox__box{background-color:var(--ld-checkbox-dark-bg-col-hover)}}.ld-checkbox.ld-checkbox--dark :where(input):not(:disabled):not(input[aria-disabled=true]):not(:checked):active~.ld-checkbox__box,.ld-checkbox.ld-checkbox--dark :where(input):not(:disabled):not(input[aria-disabled=true]):not(:checked):active:focus-visible~.ld-checkbox__box,:host(.ld-checkbox.ld-checkbox--dark) :where(input):not(:disabled):not(input[aria-disabled=true]):not(:checked):active~.ld-checkbox__box,:host(.ld-checkbox.ld-checkbox--dark) :where(input):not(:disabled):not(input[aria-disabled=true]):not(:checked):active:focus-visible~.ld-checkbox__box{background-color:var(--ld-checkbox-dark-bg-col-active)}.ld-checkbox__check{visibility:hidden;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:1}.ld-checkbox__box{position:absolute;width:100%;height:100%;pointer-events:none}.ld-checkbox,.ld-checkbox__box,:host{border-radius:var(--ld-br-m)}.ld-checkbox--highlight,:host(.ld-checkbox--highlight){--ld-checkbox-col:var(--ld-checkbox-warn-col);--ld-checkbox-col-hover:var(--ld-checkbox-warn-col-hover);--ld-checkbox-col-focus:var(--ld-checkbox-warn-col-focus);--ld-checkbox-col-active:var(--ld-checkbox-warn-col-active);--ld-checkbox-checked-col:var(--ld-checkbox-warn-checked-col);--ld-checkbox-checked-col-active:var(--ld-checkbox-warn-checked-col-active)}.ld-checkbox--danger,.ld-checkbox--invalid,:host(.ld-checkbox--danger),:host(.ld-checkbox--invalid){--ld-checkbox-col:var(--ld-checkbox-invalid-col);--ld-checkbox-col-hover:var(--ld-checkbox-invalid-col-hover);--ld-checkbox-col-active:var(--ld-checkbox-invalid-col-active);--ld-checkbox-col-focus:var(--ld-checkbox-invalid-col-focus)}';export{h as ld_checkbox}