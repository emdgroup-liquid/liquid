import{r as t,h as i,H as l,g as d}from"./p-4bb69ba2.js";import{c as n}from"./p-90475272.js";import{g as o}from"./p-891005fd.js";let e=class{constructor(i){t(this,i),this.handleBlur=t=>{setTimeout((()=>{this.el.dispatchEvent(t)}))},this.handleFocus=t=>{setTimeout((()=>{this.el.dispatchEvent(t)}))},this.handleClick=t=>{const i=t.target;this.el.hasAttribute("disabled")||"true"===this.el.getAttribute("aria-disabled")?t.preventDefault():i.closest("ld-button")||(i===this.el?(this.input.focus(),this.input.dispatchEvent(new Event("click",{bubbles:!1}))):this.input.focus())},this.handleKeyDown=t=>{"true"!==this.el.getAttribute("aria-disabled")||["ArrowLeft","ArrowRight","Tab"].includes(t.code)||t.preventDefault()}}async focusInner(){void 0!==this.input&&this.input.focus()}updateHiddenInput(){const t=this.el.closest("form");if(!this.hiddenInput&&this.name&&(t||this.form)&&this.createHiddenInput(),this.hiddenInput){if(this.hiddenInput.dirName=this.dirname,this.name)this.hiddenInput.name=this.name;else if(this.hiddenInput.name)return this.hiddenInput.remove(),void(this.hiddenInput=void 0);if(this.form)this.hiddenInput.setAttribute("form",this.form);else if(this.hiddenInput.getAttribute("form")){if(!t)return this.hiddenInput.remove(),void(this.hiddenInput=void 0);this.hiddenInput.removeAttribute("form")}this.value?this.hiddenInput.value=this.value:this.hiddenInput.value&&this.hiddenInput.removeAttribute("value")}}createHiddenInput(){this.hiddenInput=document.createElement("input"),this.hiddenInput.type="hidden",this.el.appendChild(this.hiddenInput)}componentWillLoad(){const t=this.el.closest("form");t&&!this.autocomplete&&(this.autocomplete=t.getAttribute("autocomplete")),this.name&&(t||this.form)&&(this.createHiddenInput(),this.hiddenInput.dirName=this.dirname,this.hiddenInput.name=this.name,this.form&&this.hiddenInput.setAttribute("form",this.form),this.value&&(this.hiddenInput.value=this.value)),this.el.querySelectorAll("ld-button").forEach((t=>{void 0!==this.size?t.setAttribute("size",this.size):t.removeAttribute("size")})),this.el.querySelectorAll(".ld-button").forEach((t=>{"sm"===this.size?(t.classList.remove("ld-button--lg"),t.classList.add("ld-button--sm")):"lg"===this.size?(t.classList.remove("ld-button--sm"),t.classList.add("ld-button--lg")):t.classList.remove("ld-button--sm","ld-button--lg")})),this.el.querySelectorAll("ld-icon").forEach((t=>{void 0!==this.size?t.setAttribute("size",this.size):t.removeAttribute("size")})),this.el.querySelectorAll(".ld-icon").forEach((t=>{"sm"===this.size?(t.classList.remove("ld-icon--lg"),t.classList.add("ld-icon--sm")):"lg"===this.size?(t.classList.remove("ld-icon--sm"),t.classList.add("ld-icon--lg")):t.classList.remove("ld-icon--sm","ld-icon--lg")}))}componentDidLoad(){this.autofocus&&this.focusInner()}handleInput(){var t;"true"===this.input.getAttribute("aria-disabled")?this.input.value=null!==(t=this.value)&&void 0!==t?t:"":this.value=this.input.value}render(){var t,d;const e=o(["ld-input",this.size&&`ld-input--${this.size}`,this.tone&&`ld-input--${this.tone}`,this.invalid&&"ld-input--invalid"]);return this.multiline?i(l,{class:e,onClick:this.handleClick},i("textarea",Object.assign({onBlur:this.handleBlur,onFocus:this.handleFocus,onInput:this.handleInput.bind(this),part:"input focusable",ref:t=>this.input=t},n(this.el,["multiline","type"]))),"file"===this.type&&i("span",{class:"ld-input__placeholder",part:"placeholder"},(null===(t=this.input)||void 0===t?void 0:t.value)||this.placeholder)):i(l,{class:e,onClick:this.handleClick},i("slot",{name:"start"}),i("input",Object.assign({autocomplete:this.autocomplete,onBlur:this.handleBlur,onFocus:this.handleFocus,onInput:this.handleInput.bind(this),onKeyDown:this.handleKeyDown,part:"input focusable",ref:t=>this.input=t},n(this.el,["autocomplete"]))),"file"===this.type&&i("span",{class:"ld-input__placeholder",part:"placeholder"},(null===(d=this.input)||void 0===d?void 0:d.value)||this.placeholder),i("slot",{name:"end"}))}get el(){return d(this)}static get watchers(){return{dirname:["updateHiddenInput"],form:["updateHiddenInput"],name:["updateHiddenInput"],value:["updateHiddenInput"]}}};e.style='.ld-input,:host{--ld-input-padding-x-sm:0.5rem;--ld-input-padding-x-md:0.625rem;--ld-input-padding-x-lg:0.875rem;--ld-input-padding-top-sm:0.25rem;--ld-input-padding-top-md:0.625rem;--ld-input-padding-top-lg:0.625rem;--ld-input-padding-bottom-sm:0.25rem;--ld-input-padding-bottom-md:0.6875rem;--ld-input-padding-bottom-lg:0.6875rem;--ld-input-min-height-sm:2rem;--ld-input-min-height-md:2.5rem;--ld-input-min-height-lg:3.125rem;--ld-input-max-height-sm:2rem;--ld-input-max-height-md:2.5rem;--ld-input-max-height-lg:3.125rem;--ld-input-time-min-width-sm:5.125rem;--ld-input-time-min-width-md:6.25rem;--ld-input-time-min-width-lg:7.5rem;--ld-input-bg-col-disabled:var(--ld-col-wht-alpha-none);--ld-input-bg-col-invalid-focus:var(--ld-col-wht);--ld-input-bg-col-invalid:var(--ld-thm-error-disabled);--ld-input-bg-col:var(--ld-col-wht);--ld-input-border-col-disabled:var(--ld-col-neutral-100);--ld-input-border-col-hover:var(--ld-col-neutral-300);--ld-input-border-col:var(--ld-col-neutral-100);--ld-input-icon-col-focus:var(--ld-thm-primary-focus);--ld-input-icon-col-invalid-focus:var(--ld-thm-error-focus);--ld-input-icon-col:var(--ld-thm-primary);--ld-input-placeholder-col-invalid:var(--ld-thm-error-focus);--ld-input-placeholder-col:var(--ld-col-neutral-600);--ld-input-text-col-disabled:var(--ld-col-neutral-300);--ld-input-text-col-invalid-focus:var(--ld-col-neutral-900);--ld-input-text-col-invalid:var(--ld-thm-error);--ld-input-text-col:var(--ld-col-neutral-900);--ld-input-dark-bg-col-focus:var(--ld-col-wht);--ld-input-dark-bg-col:var(--ld-col-neutral-010);cursor:text;position:relative;display:inline-flex;align-items:center;background-color:var(--ld-input-bg-col);color:var(--ld-input-text-col);max-width:100%;border-radius:var(--ld-br-m);line-height:1;min-height:var(--ld-input-min-height-md)}.ld-input:before,:host:before{content:"";position:absolute;top:0;bottom:0;right:0;left:0;border-radius:var(--ld-br-m);display:block;pointer-events:none;box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-input-border-col)}.ld-input ::slotted(*),.ld-input>:where(:not(input):not(textarea)),:host ::slotted(*),:host>:where(:not(input):not(textarea)){-webkit-user-select:none;user-select:none}.ld-input ::slotted(:not(ld-button):not(.ld-button)[slot=start]),.ld-input>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=end]):first-child),:host ::slotted(:not(ld-button):not(.ld-button)[slot=start]),:host>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=end]):first-child){margin-left:var(--ld-input-padding-x-md)}.ld-input ::slotted(:not(ld-button):not(.ld-button)[slot=end]),.ld-input>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=start]):last-child),:host ::slotted(:not(ld-button):not(.ld-button)[slot=end]),:host>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=start]):last-child){margin-right:var(--ld-input-padding-x-md)}.ld-input>input,:host>input{align-self:stretch;max-height:var(--ld-input-max-height-md)}.ld-input>input[type=file],:host>input[type=file]{opacity:0}.ld-input>input[type=file]:not(:disabled):not([aria-disabled=true]),:host>input[type=file]:not(:disabled):not([aria-disabled=true]){cursor:pointer}.ld-input>input[type=file]::-webkit-file-upload-button,:host>input[type=file]::-webkit-file-upload-button{display:none}.ld-input>input[type=number],:host>input[type=number]{-webkit-appearance:textfield;appearance:textfield}.ld-input>input[type=number]::-webkit-inner-spin-button,.ld-input>input[type=number]::-webkit-outer-spin-button,:host>input[type=number]::-webkit-inner-spin-button,:host>input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.ld-input>input[type=search]::-webkit-search-cancel-button,.ld-input>input[type=search]::-webkit-search-decoration,.ld-input>input[type=search]::-webkit-search-results-button,.ld-input>input[type=search]::-webkit-search-results-decoration,:host>input[type=search]::-webkit-search-cancel-button,:host>input[type=search]::-webkit-search-decoration,:host>input[type=search]::-webkit-search-results-button,:host>input[type=search]::-webkit-search-results-decoration{-webkit-appearance:none}.ld-input>input::-webkit-calendar-picker-indicator,:host>input::-webkit-calendar-picker-indicator{cursor:pointer;background:var(--ld-input-icon-col);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;outline:none}.ld-input>input::-webkit-calendar-picker-indicator:focus:focus-visible,:host>input::-webkit-calendar-picker-indicator:focus:focus-visible{background:var(--ld-input-icon-col-focus)}.ld-input>input[type=date]::-webkit-calendar-picker-indicator,:host>input[type=date]::-webkit-calendar-picker-indicator{-webkit-mask-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path fill="currentColor" fill-rule="evenodd" d="M2 6v9.69c0 .65.28.93.48 1.01C3.8 17.26 6.24 18 10 18s6.2-.74 7.52-1.3c.2-.08.48-.36.48-1.01V6H2zM3.08.53A3.68 3.68 0 000 4.24V15.7c0 1.22.57 2.37 1.7 2.85C3.25 19.2 5.96 20 10 20c4.03 0 6.74-.8 8.3-1.46 1.13-.48 1.7-1.63 1.7-2.85V4.24a3.68 3.68 0 00-3.08-3.7C15.12.25 12.68 0 10 0 7.32 0 4.88.26 3.08.53zM8.25 8.5c0-.28.22-.5.5-.5h2.5c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-2.5a.5.5 0 01-.5-.5v-2zm5.5-.5a.5.5 0 00-.5.5v2c0 .28.22.5.5.5h2.5a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-2.5zm-10.5.5c0-.28.22-.5.5-.5h2.5c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-2.5a.5.5 0 01-.5-.5v-2zm5.5 3.75a.5.5 0 00-.5.5v2c0 .28.22.5.5.5h2.5a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-2.5zm-5.5.5c0-.28.22-.5.5-.5h2.5c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-2.5a.5.5 0 01-.5-.5v-2z" clip-rule="evenodd"/></svg>\');mask-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path fill="currentColor" fill-rule="evenodd" d="M2 6v9.69c0 .65.28.93.48 1.01C3.8 17.26 6.24 18 10 18s6.2-.74 7.52-1.3c.2-.08.48-.36.48-1.01V6H2zM3.08.53A3.68 3.68 0 000 4.24V15.7c0 1.22.57 2.37 1.7 2.85C3.25 19.2 5.96 20 10 20c4.03 0 6.74-.8 8.3-1.46 1.13-.48 1.7-1.63 1.7-2.85V4.24a3.68 3.68 0 00-3.08-3.7C15.12.25 12.68 0 10 0 7.32 0 4.88.26 3.08.53zM8.25 8.5c0-.28.22-.5.5-.5h2.5c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-2.5a.5.5 0 01-.5-.5v-2zm5.5-.5a.5.5 0 00-.5.5v2c0 .28.22.5.5.5h2.5a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-2.5zm-10.5.5c0-.28.22-.5.5-.5h2.5c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-2.5a.5.5 0 01-.5-.5v-2zm5.5 3.75a.5.5 0 00-.5.5v2c0 .28.22.5.5.5h2.5a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-2.5zm-5.5.5c0-.28.22-.5.5-.5h2.5c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-2.5a.5.5 0 01-.5-.5v-2z" clip-rule="evenodd"/></svg>\');transform:translateY(4%)}.ld-input>input[type=time],:host>input[type=time]{min-width:var(--ld-input-time-min-width-md)}.ld-input>input[type=time]::-webkit-calendar-picker-indicator,:host>input[type=time]::-webkit-calendar-picker-indicator{-webkit-mask-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M3 6.24c0-1.39.94-2.53 2.23-2.72C6.99 3.26 9.38 3 12 3c2.62 0 5 .26 6.77.52A2.68 2.68 0 0121 6.24V17.7c0 .93-.43 1.65-1.08 1.93C18.47 20.24 15.9 21 12 21c-3.9 0-6.47-.76-7.92-1.38-.65-.28-1.08-1-1.08-1.93V6.24z"/><path fill="currentColor" d="M11 3.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-2zM11 18.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-2zM5.5 11c.28 0 .5.22.5.5v1a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-1c0-.28.22-.5.5-.5h2zM20.5 11c.28 0 .5.22.5.5v1a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-1c0-.28.22-.5.5-.5h2z"/><path fill="currentColor" fill-rule="evenodd" d="M7.68 10.24a.5.5 0 01.61-.34l3.86 1.1c.25.07.47.2.65.38l4.26 4.27c.2.2.2.5 0 .7l-.7.71a.5.5 0 01-.71 0l-4.08-4.08a.5.5 0 00-.22-.13l-3.6-1.03a.5.5 0 01-.35-.61l.28-.97z" clip-rule="evenodd"/></svg>\');mask-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M3 6.24c0-1.39.94-2.53 2.23-2.72C6.99 3.26 9.38 3 12 3c2.62 0 5 .26 6.77.52A2.68 2.68 0 0121 6.24V17.7c0 .93-.43 1.65-1.08 1.93C18.47 20.24 15.9 21 12 21c-3.9 0-6.47-.76-7.92-1.38-.65-.28-1.08-1-1.08-1.93V6.24z"/><path fill="currentColor" d="M11 3.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-2zM11 18.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v2a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-2zM5.5 11c.28 0 .5.22.5.5v1a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-1c0-.28.22-.5.5-.5h2zM20.5 11c.28 0 .5.22.5.5v1a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-1c0-.28.22-.5.5-.5h2z"/><path fill="currentColor" fill-rule="evenodd" d="M7.68 10.24a.5.5 0 01.61-.34l3.86 1.1c.25.07.47.2.65.38l4.26 4.27c.2.2.2.5 0 .7l-.7.71a.5.5 0 01-.71 0l-4.08-4.08a.5.5 0 00-.22-.13l-3.6-1.03a.5.5 0 01-.35-.61l.28-.97z" clip-rule="evenodd"/></svg>\')}.ld-input>input,.ld-input>textarea,:host>input,:host>textarea{padding:var(--ld-input-padding-top-md) var(--ld-input-padding-x-md) var(--ld-input-padding-bottom-md);font:var(--ld-typo-body-m);line-height:1;background-color:hsla(0,0%,100%,0);width:100%;border:0;border-radius:var(--ld-br-m);outline:none;-webkit-appearance:none;appearance:none;box-sizing:border-box}.ld-input>input::placeholder,.ld-input>textarea::placeholder,:host>input::placeholder,:host>textarea::placeholder{color:var(--ld-input-placeholder-col)}.ld-input>textarea,:host>textarea{height:100%;max-height:inherit;min-height:inherit;max-width:inherit;min-width:inherit}.ld-input ::slotted(.ld-button),.ld-input ::slotted(ld-button),.ld-input>.ld-button,.ld-input>ld-button,:host ::slotted(.ld-button),:host ::slotted(ld-button),:host>.ld-button,:host>ld-button{--ld-button-ghost-bg-color-active:transparent;--ld-button-ghost-bg-color-focus:transparent;--ld-button-ghost-bg-color-hover:transparent;flex-shrink:0;z-index:0}.ld-input ::slotted(.ld-button[slot=start]),.ld-input ::slotted(ld-button[slot=start]),.ld-input>.ld-button:where(:not([slot=end])):first-child,.ld-input>ld-button:where(:not([slot=end])):first-child,:host ::slotted(.ld-button[slot=start]),:host ::slotted(ld-button[slot=start]),:host>.ld-button:where(:not([slot=end])):first-child,:host>ld-button:where(:not([slot=end])):first-child{--ld-button-border-top-right-radius:0;--ld-button-border-bottom-right-radius:0}.ld-input ::slotted(.ld-button[slot=end]),.ld-input ::slotted(ld-button[slot=end]),.ld-input>.ld-button:where(:not([slot=start])):last-child,.ld-input>ld-button:where(:not([slot=start])):last-child,:host ::slotted(.ld-button[slot=end]),:host ::slotted(ld-button[slot=end]),:host>.ld-button:where(:not([slot=start])):last-child,:host>ld-button:where(:not([slot=start])):last-child{--ld-button-border-top-left-radius:0;--ld-button-border-bottom-left-radius:0}.ld-input ::slotted(.ld-button.ld-button--ghost:where([slot=start])),.ld-input ::slotted(ld-button[mode=ghost]:where([slot=start])),.ld-input>.ld-button.ld-button--ghost:where(:not([slot=end])):first-child,.ld-input>ld-button[mode=ghost]:where(:not([slot=end])):first-child,:host ::slotted(.ld-button.ld-button--ghost:where([slot=start])),:host ::slotted(ld-button[mode=ghost]:where([slot=start])),:host>.ld-button.ld-button--ghost:where(:not([slot=end])):first-child,:host>ld-button[mode=ghost]:where(:not([slot=end])):first-child{margin-right:calc(var(--ld-input-padding-x-md)*-1)}.ld-input ::slotted(.ld-button.ld-button--ghost:where([slot=end])),.ld-input ::slotted(ld-button[mode=ghost]:where([slot=end])),.ld-input>.ld-button.ld-button--ghost:where(:not([slot=start])):last-child,.ld-input>ld-button[mode=ghost]:where(:not([slot=start])):last-child,:host ::slotted(.ld-button.ld-button--ghost:where([slot=end])),:host ::slotted(ld-button[mode=ghost]:where([slot=end])),:host>.ld-button.ld-button--ghost:where(:not([slot=start])):last-child,:host>ld-button[mode=ghost]:where(:not([slot=start])):last-child{margin-left:calc(var(--ld-input-padding-x-md)*-1)}.ld-input ::slotted(.ld-icon),.ld-input ::slotted(ld-icon),.ld-input>.ld-icon,.ld-input>ld-icon,:host ::slotted(.ld-icon),:host ::slotted(ld-icon),:host>.ld-icon,:host>ld-icon{color:var(--ld-input-icon-col);cursor:text;display:inline-flex}.ld-input--sm,:host(.ld-input--sm){min-height:var(--ld-input-min-height-sm)}.ld-input--sm ::slotted(:not(ld-button):not(.ld-button)[slot=start]),.ld-input--sm>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=end]):first-child),:host(.ld-input--sm) ::slotted(:not(ld-button):not(.ld-button)[slot=start]),:host(.ld-input--sm)>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=end]):first-child){margin-left:var(--ld-input-padding-x-sm)}.ld-input--sm ::slotted(:not(ld-button):not(.ld-button)[slot=end]),.ld-input--sm>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=start]):last-child),:host(.ld-input--sm) ::slotted(:not(ld-button):not(.ld-button)[slot=end]),:host(.ld-input--sm)>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=start]):last-child){margin-right:var(--ld-input-padding-x-sm)}.ld-input--sm>input,:host(.ld-input--sm)>input{max-height:var(--ld-input-max-height-sm)}.ld-input--sm>input[type=date]::-webkit-calendar-picker-indicator,:host(.ld-input--sm)>input[type=date]::-webkit-calendar-picker-indicator{-webkit-mask-size:65%;mask-size:65%}.ld-input--sm>input[type=time],:host(.ld-input--sm)>input[type=time]{min-width:var(--ld-input-time-min-width-sm)}.ld-input--sm>input[type=time]::-webkit-calendar-picker-indicator,:host(.ld-input--sm)>input[type=time]::-webkit-calendar-picker-indicator{-webkit-mask-size:85%;mask-size:85%}.ld-input--sm>input,.ld-input--sm>textarea,:host(.ld-input--sm)>input,:host(.ld-input--sm)>textarea{padding:var(--ld-input-padding-top-sm) var(--ld-input-padding-x-sm) var(--ld-input-padding-bottom-sm);font:var(--ld-typo-body-s)}.ld-input--sm ::slotted(.ld-button.ld-button--ghost:where([slot=start])),.ld-input--sm ::slotted(ld-button[mode=ghost]:where([slot=start])),.ld-input--sm>.ld-button.ld-button--ghost:where(:not([slot=end])):first-child,.ld-input--sm>ld-button[mode=ghost]:where(:not([slot=end])):first-child,:host(.ld-input--sm) ::slotted(.ld-button.ld-button--ghost:where([slot=start])),:host(.ld-input--sm) ::slotted(ld-button[mode=ghost]:where([slot=start])),:host(.ld-input--sm)>.ld-button.ld-button--ghost:where(:not([slot=end])):first-child,:host(.ld-input--sm)>ld-button[mode=ghost]:where(:not([slot=end])):first-child{margin-right:calc(var(--ld-input-padding-x-sm)*-1)}.ld-input--sm ::slotted(.ld-button.ld-button--ghost:where([slot=end])),.ld-input--sm ::slotted(ld-button[mode=ghost]:where([slot=end])),.ld-input--sm>.ld-button.ld-button--ghost:where(:not([slot=start])):last-child,.ld-input--sm>ld-button[mode=ghost]:where(:not([slot=start])):last-child,:host(.ld-input--sm) ::slotted(.ld-button.ld-button--ghost:where([slot=end])),:host(.ld-input--sm) ::slotted(ld-button[mode=ghost]:where([slot=end])),:host(.ld-input--sm)>.ld-button.ld-button--ghost:where(:not([slot=start])):last-child,:host(.ld-input--sm)>ld-button[mode=ghost]:where(:not([slot=start])):last-child{margin-left:calc(var(--ld-input-padding-x-sm)*-1)}.ld-input--lg,:host(.ld-input--lg){min-height:var(--ld-input-min-height-lg)}.ld-input--lg ::slotted(:not(ld-button):not(.ld-button)[slot=start]),.ld-input--lg>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=end]):first-child),:host(.ld-input--lg) ::slotted(:not(ld-button):not(.ld-button)[slot=start]),:host(.ld-input--lg)>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=end]):first-child){margin-left:var(--ld-input-padding-x-lg)}.ld-input--lg ::slotted(:not(ld-button):not(.ld-button)[slot=end]),.ld-input--lg>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=start]):last-child),:host(.ld-input--lg) ::slotted(:not(ld-button):not(.ld-button)[slot=end]),:host(.ld-input--lg)>:where(:not(input):not(textarea):not(ld-button):not(.ld-button):not([slot=start]):last-child){margin-right:var(--ld-input-padding-x-lg)}.ld-input--lg>input,:host(.ld-input--lg)>input{max-height:var(--ld-input-max-height-lg)}.ld-input--lg>input[type=date]::-webkit-calendar-picker-indicator,:host(.ld-input--lg)>input[type=date]::-webkit-calendar-picker-indicator{-webkit-mask-size:90%;mask-size:90%}.ld-input--lg>input[type=time],:host(.ld-input--lg)>input[type=time]{min-width:var(--ld-input-time-min-width-lg)}.ld-input--lg>input[type=time]::-webkit-calendar-picker-indicator,:host(.ld-input--lg)>input[type=time]::-webkit-calendar-picker-indicator{-webkit-mask-size:114%;mask-size:114%}.ld-input--lg>input,.ld-input--lg>textarea,:host(.ld-input--lg)>input,:host(.ld-input--lg)>textarea{padding:var(--ld-input-padding-top-lg) var(--ld-input-padding-x-lg) var(--ld-input-padding-bottom-lg);font:var(--ld-typo-body-l)}.ld-input--lg ::slotted(.ld-button.ld-button--ghost:where([slot=start])),.ld-input--lg ::slotted(ld-button[mode=ghost]:where([slot=start])),.ld-input--lg>.ld-button.ld-button--ghost:where(:not([slot=end])):first-child,.ld-input--lg>ld-button[mode=ghost]:where(:not([slot=end])):first-child,:host(.ld-input--lg) ::slotted(.ld-button.ld-button--ghost:where([slot=start])),:host(.ld-input--lg) ::slotted(ld-button[mode=ghost]:where([slot=start])),:host(.ld-input--lg)>.ld-button.ld-button--ghost:where(:not([slot=end])):first-child,:host(.ld-input--lg)>ld-button[mode=ghost]:where(:not([slot=end])):first-child{margin-right:calc(var(--ld-input-padding-x-lg)*-1)}.ld-input--lg ::slotted(.ld-button.ld-button--ghost:where([slot=end])),.ld-input--lg ::slotted(ld-button[mode=ghost]:where([slot=end])),.ld-input--lg>.ld-button.ld-button--ghost:where(:not([slot=start])):last-child,.ld-input--lg>ld-button[mode=ghost]:where(:not([slot=start])):last-child,:host(.ld-input--lg) ::slotted(.ld-button.ld-button--ghost:where([slot=end])),:host(.ld-input--lg) ::slotted(ld-button[mode=ghost]:where([slot=end])),:host(.ld-input--lg)>.ld-button.ld-button--ghost:where(:not([slot=start])):last-child,:host(.ld-input--lg)>ld-button[mode=ghost]:where(:not([slot=start])):last-child{margin-left:calc(var(--ld-input-padding-x-lg)*-1)}.ld-input--dark,:host(.ld-input--dark){background-color:var(--ld-input-dark-bg-col)}@media (hover:hover){.ld-input:not(.ld-input--invalid):not([aria-disabled=true]):not([disabled]):hover:not(:focus-within):before,:host(:not(.ld-input--invalid):not([aria-disabled=true]):not([disabled]):hover:not(:focus-within)):before{box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-input-border-col-hover)}}.ld-input:not(.ld-input--invalid):focus-within:before,:host(:not(.ld-input--invalid):focus-within):before{box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-thm-primary)}.ld-input--dark:not(.ld-input--invalid):focus-within,:host(.ld-input--dark:not(.ld-input--invalid):focus-within){background-color:var(--ld-input-dark-bg-col-focus)}.ld-input--invalid:focus-within,:host(.ld-input--invalid:focus-within){background-color:var(--ld-input-bg-col-invalid-focus)}.ld-input--invalid:not([disabled]):not([aria-disabled=true]):where(:not(:focus)),:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]):where(:not(:focus))){background-color:var(--ld-input-bg-col-invalid);color:var(--ld-input-text-col-invalid)}.ld-input--invalid:not([disabled]):not([aria-disabled=true]):before,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true])):before{box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-input-text-col-invalid)}.ld-input--invalid:not([disabled]):not([aria-disabled=true])>input,.ld-input--invalid:not([disabled]):not([aria-disabled=true])>textarea,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]))>input,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]))>textarea{color:var(--ld-input-text-col-invalid)}.ld-input--invalid:not([disabled]):not([aria-disabled=true])>input::placeholder,.ld-input--invalid:not([disabled]):not([aria-disabled=true])>textarea::placeholder,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]))>input::placeholder,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]))>textarea::placeholder{color:var(--ld-input-placeholder-col-invalid)}.ld-input--invalid:not([disabled]):not([aria-disabled=true])>input::-webkit-calendar-picker-indicator,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]))>input::-webkit-calendar-picker-indicator{background:var(--ld-input-text-col-invalid)}.ld-input--invalid:not([disabled]):not([aria-disabled=true])>input::-webkit-calendar-picker-indicator:focus:focus-visible,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]))>input::-webkit-calendar-picker-indicator:focus:focus-visible{background:var(--ld-input-icon-col-invalid-focus)}.ld-input--invalid:not([disabled]):not([aria-disabled=true]) .ld-input__placeholder,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true])) .ld-input__placeholder{color:var(--ld-input-placeholder-col-invalid)}.ld-input--invalid:not([disabled]):not([aria-disabled=true]):focus-within,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]):focus-within){background-color:var(--ld-input-bg-col-invalid-focus)}.ld-input--invalid:not([disabled]):not([aria-disabled=true]):focus-within>input,.ld-input--invalid:not([disabled]):not([aria-disabled=true]):focus-within>textarea,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]):focus-within)>input,:host(.ld-input--invalid:not([disabled]):not([aria-disabled=true]):focus-within)>textarea{color:var(--ld-input-text-col-invalid-focus)}.ld-input[aria-disabled=true],.ld-input[disabled],:host([aria-disabled=true]),:host([disabled]){color:var(--ld-input-text-col-disabled);background-color:var(--ld-input-bg-col-disabled)}.ld-input[aria-disabled=true]:before,.ld-input[disabled]:before,:host([aria-disabled=true]):before,:host([disabled]):before{box-shadow:inset 0 0 0 var(--ld-sp-2) var(--ld-input-border-col-disabled)}.ld-input[aria-disabled=true] input,.ld-input[aria-disabled=true] textarea,.ld-input[disabled] input,.ld-input[disabled] textarea,:host([aria-disabled=true]) input,:host([aria-disabled=true]) textarea,:host([disabled]) input,:host([disabled]) textarea{color:currentColor;caret-color:transparent}.ld-input[aria-disabled=true] input::placeholder,.ld-input[aria-disabled=true] textarea::placeholder,.ld-input[disabled] input::placeholder,.ld-input[disabled] textarea::placeholder,:host([aria-disabled=true]) input::placeholder,:host([aria-disabled=true]) textarea::placeholder,:host([disabled]) input::placeholder,:host([disabled]) textarea::placeholder{opacity:.25}.ld-input[aria-disabled=true] input::-webkit-calendar-picker-indicator,.ld-input[disabled] input::-webkit-calendar-picker-indicator,:host([aria-disabled=true]) input::-webkit-calendar-picker-indicator,:host([disabled]) input::-webkit-calendar-picker-indicator{background:var(--ld-input-text-col-disabled);pointer-events:none}.ld-input[aria-disabled=true] .ld-icon,.ld-input[aria-disabled=true] ::slotted(.ld-icon),.ld-input[aria-disabled=true] ::slotted(ld-icon),.ld-input[aria-disabled=true] ld-icon,.ld-input[disabled] .ld-icon,.ld-input[disabled] ::slotted(.ld-icon),.ld-input[disabled] ::slotted(ld-icon),.ld-input[disabled] ld-icon,:host([aria-disabled=true]) .ld-icon,:host([aria-disabled=true]) ::slotted(.ld-icon),:host([aria-disabled=true]) ::slotted(ld-icon),:host([aria-disabled=true]) ld-icon,:host([disabled]) .ld-icon,:host([disabled]) ::slotted(.ld-icon),:host([disabled]) ::slotted(ld-icon),:host([disabled]) ld-icon{color:currentColor}.ld-input__placeholder{position:absolute;display:flex;height:100%;align-items:center;pointer-events:none;color:var(--ld-input-placeholder-col);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;right:var(--ld-input-padding-x-md);left:var(--ld-input-padding-x-md);margin-right:0}.ld-input[disabled] .ld-input__placeholder,:host([disabled]) .ld-input__placeholder{opacity:.25}.ld-select__slot-container{display:none}';export{e as ld_input}