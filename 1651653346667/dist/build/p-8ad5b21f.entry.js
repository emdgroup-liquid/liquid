import{r as o,c as t,h as e,H as c}from"./p-24a1cdec.js";const i=class{constructor(e){o(this,e),this.pickTheme=t(this,"pickTheme",7),this.currentTheme="ocean",this.themes=["ocean","bubblegum","shake","solvent","tea"]}handleChange(o){this.pickTheme.emit(o.detail[0]),this.currentTheme=o.detail[0]}render(){return e(c,{class:`docs-pick-theme ld-theme-${this.currentTheme.toLowerCase()}`},e("form",null,e("fieldset",{class:"docs-pick-theme__fieldset"},e("ld-sr-only",null,e("legend",null,"Pick a theme")),e("ld-select",{class:"docs-pick-theme__select",onLdchange:this.handleChange.bind(this),preventDeselection:!0,mode:"ghost",tetherOptions:JSON.stringify({attachment:"top right",targetAttachment:"bottom right",offset:"-2px -8px"}),popperClass:"docs-pick-theme__popper"},this.themes.map((o=>e("ld-option",{value:o.toLowerCase(),class:`docs-pick-theme__option ld-theme-${o.toLowerCase()}`,selected:o===this.currentTheme},o.charAt(0).toUpperCase()+o.slice(1).toLowerCase(),e("svg",{role:"presentation",class:"docs-pick-theme__option-pattern",xmlns:"http://www.w3.org/2000/svg","fill-rule":"evenodd","stroke-linejoin":"round","stroke-miterlimit":"2","clip-rule":"evenodd",viewBox:"0 0 88 41"},e("path",{class:"docs-pick-theme__option-pattern-primary",d:"M88 41V0H72.894L50.257 15.408c-6.465 4.408-5.884 5.492-6.428 8.6-.262 1.493-.256 9.29-.173 16.992H88z"}),e("path",{class:"docs-pick-theme__option-pattern-accent",d:"M9.372 14.479c.445-.889.369-1.265 2.712-2.031 2.339-.753 12.084-3.895 12.088-3.908 1.067-.574 2.663-.369 3.547.461l10.055 9.513c.879.844 1.581 2.515 1.549 3.737l-.236 10.345c-.033 1.221-1.048 2.314-2.255 2.42l-19.07 1.741c-1.208.106-2.918-.5-3.78-1.354l-7.428-7.431c-.863-.854-.714-1.793-.207-3.302 0 0 2.581-9.302 3.025-10.191z"}))))),e("ld-icon",{slot:"icon"},e("svg",{class:"docs-pick-theme__icon",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 32 32"},e("path",{fill:"currentColor",stroke:"currentColor",d:"M9 20l-.7-.7a1 1 0 00-.3.7h1zm3.5 3.5v1a1 1 0 00.7-.3l-.7-.7zm9-9l.7.7a1 1 0 000-1.4l-.7.7zM18 11l.7-.7a1 1 0 00-1.4 0l.7.7zM8 20v2.5h2V20H8zm2 4.5h2.5v-2H10v2zm3.2-.3l9-9-1.4-1.4-9 9 1.4 1.4zm9-10.4l-3.5-3.5-1.4 1.4 3.5 3.5 1.4-1.4zm-4.9-3.5l-9 9 1.4 1.4 9-9-1.4-1.4zM8 22.5c0 1.1.9 2 2 2v-2H8z"}),e("path",{fill:"currentColor",stroke:"currentColor",d:"M17.58 10.33L19.92 8a2 2 0 012.83 0l1.79 1.79a2 2 0 010 2.83l-2.35 2.34-4.61-4.62zM9 23v-4l4 4H9z"}),e("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M23 16l-6.5-6.5"})))))))}};i.style=".docs-pick-theme{--docs-pick-theme-icon-size:1.25rem}.docs-pick-theme__fieldset{border:0}.docs-pick-theme ld-icon{height:var(--docs-pick-theme-icon-size);width:var(--docs-pick-theme-icon-size)}.docs-pick-theme__select::part(trigger-text-wrapper){display:none}.docs-pick-theme__select::part(btn-trigger){padding:var(--ld-sp-6)}.docs-pick-theme__select,.docs-pick-theme__select::part(btn-trigger),.docs-pick-theme__select::part(select){height:var(--ld-sp-32);width:var(--ld-sp-32)}.docs-pick-theme__popper{min-width:14rem}.docs-pick-theme__option-pattern{bottom:0;height:100%;position:absolute;right:0;top:0}.docs-pick-theme__option::part(option){font-weight:700;overflow:hidden}.docs-pick-theme__option.ld-theme-ocean::part(check){color:var(--ld-thm-ocean-primary)}.docs-pick-theme__option.ld-theme-ocean::part(option){color:var(--ld-thm-ocean-primary)}@media (hover:hover){.docs-pick-theme__option.ld-theme-ocean::part(option):hover{background-color:var(--ld-col-rb-010);color:var(--ld-thm-ocean-primary-hover)}}.docs-pick-theme__option.ld-theme-ocean::part(option):focus:focus-visible{background-color:var(--ld-col-rb-010);color:var(--ld-col-rb-800)}.docs-pick-theme__option.ld-theme-ocean::part(option):focus:focus-visible:before{box-shadow:inset 0 0 0 var(--ld-sp-1) var(--ld-thm-ocean-primary-focus)}.docs-pick-theme__option.ld-theme-ocean .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-ocean-primary)}.docs-pick-theme__option.ld-theme-ocean .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-ocean-secondary)}.docs-pick-theme__option.ld-theme-ocean.ld-option-internal--hover-within .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-ocean-primary-hover)}.docs-pick-theme__option.ld-theme-ocean.ld-option-internal--hover-within .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-ocean-secondary-hover)}.docs-pick-theme__option.ld-theme-ocean.ld-option-internal--hover-within::part(check){color:var(--ld-thm-ocean-primary-hover)}.docs-pick-theme__option.ld-theme-ocean.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-ocean-primary-focus)}.docs-pick-theme__option.ld-theme-ocean.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-ocean-secondary-focus)}.docs-pick-theme__option.ld-theme-ocean.ld-option-internal--focus-within:focus-visible::part(check){color:var(--ld-col-rb-800)}.docs-pick-theme__option.ld-theme-bubblegum::part(check){color:var(--ld-thm-bubblegum-primary)}.docs-pick-theme__option.ld-theme-bubblegum::part(option){color:var(--ld-thm-bubblegum-primary)}@media (hover:hover){.docs-pick-theme__option.ld-theme-bubblegum::part(option):hover{background-color:var(--ld-col-rp-010);color:var(--ld-thm-bubblegum-primary-hover)}}.docs-pick-theme__option.ld-theme-bubblegum::part(option):focus:focus-visible{background-color:var(--ld-col-rp-010);color:var(--ld-col-rp-900)}.docs-pick-theme__option.ld-theme-bubblegum::part(option):focus:focus-visible:before{box-shadow:inset 0 0 0 var(--ld-sp-1) var(--ld-thm-bubblegum-primary-focus)}.docs-pick-theme__option.ld-theme-bubblegum .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-bubblegum-primary)}.docs-pick-theme__option.ld-theme-bubblegum .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-bubblegum-secondary)}.docs-pick-theme__option.ld-theme-bubblegum.ld-option-internal--hover-within .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-bubblegum-primary-hover)}.docs-pick-theme__option.ld-theme-bubblegum.ld-option-internal--hover-within .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-bubblegum-secondary-hover)}.docs-pick-theme__option.ld-theme-bubblegum.ld-option-internal--hover-within::part(check){color:var(--ld-thm-bubblegum-primary-hover)}.docs-pick-theme__option.ld-theme-bubblegum.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-bubblegum-primary-focus)}.docs-pick-theme__option.ld-theme-bubblegum.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-bubblegum-primary-focus)}.docs-pick-theme__option.ld-theme-bubblegum.ld-option-internal--focus-within:focus-visible::part(check){color:var(--ld-col-rp-900)}.docs-pick-theme__option.ld-theme-shake::part(check){color:var(--ld-thm-shake-primary)}.docs-pick-theme__option.ld-theme-shake::part(option){color:var(--ld-thm-shake-primary)}@media (hover:hover){.docs-pick-theme__option.ld-theme-shake::part(option):hover{background-color:var(--ld-col-rp-010);color:var(--ld-thm-shake-primary-hover)}}.docs-pick-theme__option.ld-theme-shake::part(option):focus:focus-visible{background-color:var(--ld-col-rp-010);color:var(--ld-col-rp-900)}.docs-pick-theme__option.ld-theme-shake::part(option):focus:focus-visible:before{box-shadow:inset 0 0 0 var(--ld-sp-1) var(--ld-thm-shake-primary-focus)}.docs-pick-theme__option.ld-theme-shake .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-shake-primary)}.docs-pick-theme__option.ld-theme-shake .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-shake-secondary)}.docs-pick-theme__option.ld-theme-shake.ld-option-internal--hover-within .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-shake-primary-hover)}.docs-pick-theme__option.ld-theme-shake.ld-option-internal--hover-within .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-shake-secondary-hover)}.docs-pick-theme__option.ld-theme-shake.ld-option-internal--hover-within::part(check){color:var(--ld-thm-shake-primary-hover)}.docs-pick-theme__option.ld-theme-shake.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-shake-primary-focus)}.docs-pick-theme__option.ld-theme-shake.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-shake-secondary-focus)}.docs-pick-theme__option.ld-theme-shake.ld-option-internal--focus-within:focus-visible::part(check){color:var(--ld-col-rp-900)}.docs-pick-theme__option.ld-theme-solvent::part(check){color:var(--ld-thm-solvent-primary)}.docs-pick-theme__option.ld-theme-solvent::part(option){color:var(--ld-thm-solvent-primary)}@media (hover:hover){.docs-pick-theme__option.ld-theme-solvent::part(option):hover{background-color:var(--ld-col-rp-010);color:var(--ld-thm-solvent-primary-hover)}}.docs-pick-theme__option.ld-theme-solvent::part(option):focus:focus-visible{background-color:var(--ld-col-rp-010);color:var(--ld-col-rp-900)}.docs-pick-theme__option.ld-theme-solvent::part(option):focus:focus-visible:before{box-shadow:inset 0 0 0 var(--ld-sp-1) var(--ld-thm-solvent-primary-focus)}.docs-pick-theme__option.ld-theme-solvent .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-solvent-primary)}.docs-pick-theme__option.ld-theme-solvent .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-solvent-secondary)}.docs-pick-theme__option.ld-theme-solvent.ld-option-internal--hover-within .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-solvent-primary-hover)}.docs-pick-theme__option.ld-theme-solvent.ld-option-internal--hover-within .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-solvent-secondary-hover)}.docs-pick-theme__option.ld-theme-solvent.ld-option-internal--hover-within::part(check){color:var(--ld-thm-solvent-primary-hover)}.docs-pick-theme__option.ld-theme-solvent.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-solvent-primary-focus)}.docs-pick-theme__option.ld-theme-solvent.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-solvent-primary-focus)}.docs-pick-theme__option.ld-theme-solvent.ld-option-internal--focus-within:focus-visible::part(check){color:var(--ld-col-rp-900)}.docs-pick-theme__option.ld-theme-tea::part(check){color:var(--ld-thm-tea-primary)}.docs-pick-theme__option.ld-theme-tea::part(option){color:var(--ld-thm-tea-primary)}@media (hover:hover){.docs-pick-theme__option.ld-theme-tea::part(option):hover{background-color:var(--ld-col-rg-010);color:var(--ld-thm-tea-primary-hover)}}.docs-pick-theme__option.ld-theme-tea::part(option):focus:focus-visible{background-color:var(--ld-col-rg-010);color:var(--ld-col-rg-900)}.docs-pick-theme__option.ld-theme-tea::part(option):focus:focus-visible:before{box-shadow:inset 0 0 0 var(--ld-sp-1) var(--ld-thm-tea-primary-focus)}.docs-pick-theme__option.ld-theme-tea .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-tea-primary)}.docs-pick-theme__option.ld-theme-tea .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-tea-secondary)}.docs-pick-theme__option.ld-theme-tea.ld-option-internal--hover-within .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-tea-primary-hover)}.docs-pick-theme__option.ld-theme-tea.ld-option-internal--hover-within .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-tea-secondary-hover)}.docs-pick-theme__option.ld-theme-tea.ld-option-internal--hover-within::part(check){color:var(--ld-thm-tea-primary-hover)}.docs-pick-theme__option.ld-theme-tea.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-primary{fill:var(--ld-thm-tea-primary-focus)}.docs-pick-theme__option.ld-theme-tea.ld-option-internal--focus-within:focus-visible .docs-pick-theme__option-pattern-accent{fill:var(--ld-thm-tea-secondary-focus)}.docs-pick-theme__option.ld-theme-tea.ld-option-internal--focus-within:focus-visible::part(check){color:var(--ld-col-rg-900)}";const s=class{constructor(e){o(this,e),this.switchComponent=t(this,"switchComponent",7),this.isOn=!0}handleClick(o){o.preventDefault(),this.isOn=!this.isOn,this.switchComponent.emit(this.isOn)}render(){return e(c,{class:"docs-switch-web-css"},e("button",{role:"switch","aria-checked":this.isOn?"true":"false"},e("ld-sr-only",null,e("slot",null)),e("span",{class:"docs-switch-web-css__option"+(this.isOn?" docs-switch-web-css__option--active":"")},e("svg",{class:"docs-switch-web-css__icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 800 800"},e("title",null,"Web Component"),e("path",{fill:"currentColor",d:"M196.3 400l200 346.4H200L0 400 200 53.6h196.3L196.3 400zM505.4 53.6H600L800 400 600 746.4h-94.6l-98-169.8H502L604 400 502 223.4h-94.7l98-169.8z"}))),e("span",{class:"docs-switch-web-css__option"+(this.isOn?"":" docs-switch-web-css__option--active")},e("svg",{class:"docs-switch-web-css__icon",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 800 300"},e("title",null,"CSS Component"),e("path",{fill:"currentColor",d:"M0 0h238.7v99.8H99.8v99.8h139v99.9H0V0zM283.2 0h235.3v85.6H381.6v17h136.9v196.9H283.2v-89.9h136.9v-17H283.2V0zM564.7 0H800v85.6H663.1v17H800v196.9H564.7v-89.9h136.9v-17H564.7V0z"})))))}};s.style=".docs-switch-web-css button{background-color:var(--ld-col-neutral-050)}.docs-switch-web-css button:focus:focus-visible .docs-switch-web-css__option:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-010);color:var(--ld-col-rb)}.docs-switch-web-css button:active .docs-switch-web-css__option:not(.docs-switch-web-css__option--active),.docs-switch-web-css button:active:focus-visible .docs-switch-web-css__option:not(.docs-switch-web-css__option--active){background-color:initial;color:var(--ld-col-rb-700)}.docs-switch-web-css__option{color:var(--ld-col-neutral-600)}.docs-switch-web-css__option:hover:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-010);color:var(--ld-col-rb)}.docs-switch-web-css__option--active{background-color:var(--ld-col-rb);color:var(--ld-col-wht)}@media (prefers-color-scheme:dark){.docs-switch-web-css button{background-color:var(--ld-col-neutral-400)}.docs-switch-web-css button:focus:focus-visible .docs-switch-web-css__option:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-900);color:var(--ld-col-rb-400)}.docs-switch-web-css button:active .docs-switch-web-css__option:not(.docs-switch-web-css__option--active),.docs-switch-web-css button:active:focus-visible .docs-switch-web-css__option:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-900);color:var(--ld-col-rb-300)}.docs-switch-web-css__option{color:var(--ld-col-neutral-800)}.docs-switch-web-css__option:hover:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-900);color:var(--ld-col-rb-400)}.docs-switch-web-css__option--active{background-color:var(--ld-col-rb-400);color:var(--ld-col-neutral-900)}}.docs-ui-dark .docs-switch-web-css button{background-color:var(--ld-col-neutral-400)}.docs-ui-dark .docs-switch-web-css button:focus:focus-visible .docs-switch-web-css__option:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-900);color:var(--ld-col-rb-400)}.docs-ui-dark .docs-switch-web-css button:active .docs-switch-web-css__option:not(.docs-switch-web-css__option--active),.docs-ui-dark .docs-switch-web-css button:active:focus-visible .docs-switch-web-css__option:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-900);color:var(--ld-col-rb-300)}.docs-ui-dark .docs-switch-web-css__option{color:var(--ld-col-neutral-800)}.docs-ui-dark .docs-switch-web-css__option:hover:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-900);color:var(--ld-col-rb-400)}.docs-ui-dark .docs-switch-web-css__option--active{background-color:var(--ld-col-rb-400);color:var(--ld-col-neutral-900)}.docs-ui-light .docs-switch-web-css button{background-color:var(--ld-col-neutral-050)}.docs-ui-light .docs-switch-web-css button:focus:focus-visible .docs-switch-web-css__option:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-010);color:var(--ld-col-rb)}.docs-ui-light .docs-switch-web-css button:active .docs-switch-web-css__option:not(.docs-switch-web-css__option--active),.docs-ui-light .docs-switch-web-css button:active:focus-visible .docs-switch-web-css__option:not(.docs-switch-web-css__option--active){background-color:initial;color:var(--ld-col-rb-700)}.docs-ui-light .docs-switch-web-css__option{color:var(--ld-col-neutral-600)}.docs-ui-light .docs-switch-web-css__option:hover:not(.docs-switch-web-css__option--active){background-color:var(--ld-col-neutral-010);color:var(--ld-col-rb)}.docs-ui-light .docs-switch-web-css__option--active{background-color:var(--ld-col-rb);color:var(--ld-col-wht)}.docs-switch-web-css button{align-items:stretch;border:0;border-radius:var(--ld-br-m);cursor:pointer;display:flex;font:var(--ld-typo-body-s);font-weight:700;overflow:hidden;padding:0;position:relative}.docs-switch-web-css__option{line-height:0;padding:var(--ld-sp-8) var(--ld-sp-12);position:relative;z-index:0}.docs-switch-web-css__icon{height:1rem;width:1.5rem}";const r=class{constructor(e){o(this,e),this.toggleCode=t(this,"toggleCode",7)}handleClick(o){o.preventDefault(),this.toggleCode.emit(!this.isOn)}render(){return e("ld-button",{role:"switch","aria-checked":this.isOn?"true":"false",class:"docs-toggle-code",mode:this.isOn?void 0:"ghost",size:"sm"},e("ld-sr-only",null,"Toggle code"),e("ld-icon",{size:"sm"},e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 22 22"},e("path",{stroke:"currentcolor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m8 18 6-13m3 10 4-4-4-4M5 7l-4 4 4 4"}))))}};r.style=".docs-toggle-code svg{height:100%;width:100%}";export{i as docs_pick_theme,s as docs_switch_web_css,r as docs_toggle_code}