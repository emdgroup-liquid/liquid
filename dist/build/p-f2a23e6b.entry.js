import{r as e,h as l,H as t,g as d}from"./p-375b7112.js";import{g as o}from"./p-891005fd.js";const g=class{constructor(l){e(this,l),this.disabled=!1}componentWillLoad(){this.hasIcons=!!this.element.querySelector('[slot="icon-start"]')||!!this.element.querySelector('[slot="icon-end"]')}handleBlur(e){setTimeout((()=>{this.element.dispatchEvent(e)}))}handleFocus(e){setTimeout((()=>{this.element.dispatchEvent(e)}))}handleClick(e){"true"!==e.target.getAttribute("aria-disabled")?this.checked=e.target.checked:e.preventDefault()}render(){return l(t,{class:o(["ld-toggle","lg"===this.size&&"ld-toggle--lg",this.hasIcons&&"ld-toggle--with-icons"])},l("input",{"aria-disabled":this.ariaDisabled,checked:this.checked,disabled:this.disabled,onBlur:this.handleBlur.bind(this),onClick:this.handleClick.bind(this),onFocus:this.handleFocus.bind(this),required:this.required,type:"checkbox"}),l("span",{class:"ld-toggle__knob"}),this.hasIcons&&l("div",{class:"ld-toggle__icon-start"},l("slot",{name:"icon-start"})),this.hasIcons&&l("div",{class:"ld-toggle__icon-end"},l("slot",{name:"icon-end"})))}get element(){return d(this)}};g.style=".ld-toggle{--ld-toggle-height:2rem;--ld-toggle-width:3.375rem;--ld-toggle-inner-space:0.125rem;align-items:center;display:flex;height:var(--ld-toggle-height);min-width:auto!important;position:relative;transition:background-color .2s ease-in-out;width:var(--ld-toggle-width)}.ld-toggle input{background-color:var(--ld-col-rblck4);border-radius:var(--ld-br-full);-webkit-appearance:none;appearance:none;position:absolute;width:100%;height:100%;z-index:0}.ld-toggle input:not(:disabled):not([aria-disabled=true]){cursor:pointer}.ld-toggle input:checked~.ld-toggle__knob{transform:translateX(calc(var(--ld-toggle-width) - var(--ld-toggle-height)))}.ld-toggle input:checked~.ld-toggle__icon-start{color:var(--ld-col-rblck6)}.ld-toggle input:checked~.ld-toggle__icon-end{color:var(--ld-col-wht)}.ld-toggle input:disabled,.ld-toggle input[aria-disabled=true]{background-color:var(--ld-col-bg-g)}.ld-toggle input:disabled:checked~.ld-toggle__icon-start,.ld-toggle input:disabled:not(:checked)~.ld-toggle__icon-end,.ld-toggle input[aria-disabled=true]:checked~.ld-toggle__icon-start,.ld-toggle input[aria-disabled=true]:not(:checked)~.ld-toggle__icon-end{color:var(--ld-col-rblck4)}.ld-toggle .ld-toggle__knob{background-color:var(--ld-col-wht);border-radius:var(--ld-br-full);display:block;height:calc(var(--ld-toggle-height) - var(--ld-toggle-inner-space)*2);margin:var(--ld-toggle-inner-space);pointer-events:none;transition:transform .2s ease-in-out;width:calc(var(--ld-toggle-height) - var(--ld-toggle-inner-space)*2);z-index:1}.ld-toggle--lg{--ld-toggle-height:2.5rem;--ld-toggle-width:4.1875rem;--ld-toggle-inner-space:0.1875rem}.ld-toggle--lg.ld-toggle--with-icons{--ld-toggle-width:6rem}.ld-toggle--lg.ld-toggle--with-icons .ld-toggle__icon-end,.ld-toggle--lg.ld-toggle--with-icons .ld-toggle__icon-start{margin:.75rem}.ld-toggle--with-icons{--ld-toggle-width:4.5rem}.ld-toggle--with-icons input{background-color:var(--ld-col-rblck1)!important}.ld-toggle--with-icons input:invalid~.ld-toggle__knob{background-color:var(--ld-col-rr-default)!important}.ld-toggle--with-icons input:disabled,.ld-toggle--with-icons input[aria-disabled=true]{background-color:var(--ld-col-bg-g)!important}.ld-toggle--with-icons input:disabled~.ld-toggle__knob,.ld-toggle--with-icons input[aria-disabled=true]~.ld-toggle__knob{background-color:var(--ld-col-wht)}.ld-toggle--with-icons .ld-toggle__icon-end,.ld-toggle--with-icons .ld-toggle__icon-start{margin:.5rem}.ld-toggle input:invalid{background-color:var(--ld-col-rr-default)}.ld-theme-ocean .ld-toggle input:checked,.ld-toggle input:checked,[class*=ld-theme] .ld-theme-ocean .ld-toggle input:checked{background-color:var(--ld-thm-ocean-bg-primary)}.ld-theme-ocean .ld-toggle input:checked:disabled,.ld-theme-ocean .ld-toggle input:checked[aria-disabled=true],.ld-toggle input:checked:disabled,.ld-toggle input:checked[aria-disabled=true],[class*=ld-theme] .ld-theme-ocean .ld-toggle input:checked:disabled,[class*=ld-theme] .ld-theme-ocean .ld-toggle input:checked[aria-disabled=true]{background-color:var(--ld-col-rb2)}.ld-theme-ocean .ld-toggle--with-icons .ld-toggle__knob,.ld-toggle--with-icons .ld-toggle__knob,[class*=ld-theme] .ld-theme-ocean .ld-toggle--with-icons .ld-toggle__knob{background-color:var(--ld-thm-ocean-bg-primary)}.ld-toggle__icon-end,.ld-toggle__icon-start{display:flex;align-items:center;pointer-events:none;position:absolute;transition:color .2s ease-in-out;z-index:1}.ld-toggle__icon-end:empty,.ld-toggle__icon-start:empty{display:none}.ld-toggle__icon-start{color:var(--ld-col-wht);left:0}.ld-toggle__icon-end{color:var(--ld-col-rblck6);right:0}.ld-theme-tea .ld-toggle input:checked,[class*=ld-theme] .ld-theme-tea .ld-toggle input:checked{background-color:var(--ld-thm-tea-bg-primary)}.ld-theme-tea .ld-toggle input:checked:disabled,.ld-theme-tea .ld-toggle input:checked[aria-disabled=true],[class*=ld-theme] .ld-theme-tea .ld-toggle input:checked:disabled,[class*=ld-theme] .ld-theme-tea .ld-toggle input:checked[aria-disabled=true]{background-color:var(--ld-col-rg2)}.ld-theme-tea .ld-toggle--with-icons .ld-toggle__knob,[class*=ld-theme] .ld-theme-tea .ld-toggle--with-icons .ld-toggle__knob{background-color:var(--ld-thm-tea-bg-primary)}.ld-theme-bubblegum .ld-toggle input:checked,[class*=ld-theme] .ld-theme-bubblegum .ld-toggle input:checked{background-color:var(--ld-thm-bubblegum-bg-primary)}.ld-theme-bubblegum .ld-toggle input:checked:disabled,.ld-theme-bubblegum .ld-toggle input:checked[aria-disabled=true],[class*=ld-theme] .ld-theme-bubblegum .ld-toggle input:checked:disabled,[class*=ld-theme] .ld-theme-bubblegum .ld-toggle input:checked[aria-disabled=true]{background-color:var(--ld-col-rp2)}.ld-theme-bubblegum .ld-toggle--with-icons .ld-toggle__knob,[class*=ld-theme] .ld-theme-bubblegum .ld-toggle--with-icons .ld-toggle__knob{background-color:var(--ld-thm-bubblegum-bg-primary)}.ld-theme-shake .ld-toggle input:checked,[class*=ld-theme] .ld-theme-shake .ld-toggle input:checked{background-color:var(--ld-thm-shake-bg-primary)}.ld-theme-shake .ld-toggle input:checked:disabled,.ld-theme-shake .ld-toggle input:checked[aria-disabled=true],[class*=ld-theme] .ld-theme-shake .ld-toggle input:checked:disabled,[class*=ld-theme] .ld-theme-shake .ld-toggle input:checked[aria-disabled=true]{background-color:var(--ld-col-rp2)}.ld-theme-shake .ld-toggle--with-icons .ld-toggle__knob,[class*=ld-theme] .ld-theme-shake .ld-toggle--with-icons .ld-toggle__knob{background-color:var(--ld-thm-shake-bg-primary)}.ld-theme-solvent .ld-toggle input:checked,[class*=ld-theme] .ld-theme-solvent .ld-toggle input:checked{background-color:var(--ld-thm-solvent-bg-primary)}.ld-theme-solvent .ld-toggle input:checked:disabled,.ld-theme-solvent .ld-toggle input:checked[aria-disabled=true],[class*=ld-theme] .ld-theme-solvent .ld-toggle input:checked:disabled,[class*=ld-theme] .ld-theme-solvent .ld-toggle input:checked[aria-disabled=true]{background-color:var(--ld-col-rp2)}.ld-theme-solvent .ld-toggle--with-icons .ld-toggle__knob,[class*=ld-theme] .ld-theme-solvent .ld-toggle--with-icons .ld-toggle__knob{background-color:var(--ld-thm-solvent-bg-primary)}";export{g as ld_toggle}