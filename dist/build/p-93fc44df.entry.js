import{r as a,h as s,H as o,g as e}from"./p-4bb69ba2.js";let n=class{constructor(s){a(this,s),this.prevTitle="Back",this.nextTitle="Next",this.hasSlot=!1}componentWillLoad(){this.hasSlot=this.el.childNodes.length>2}render(){return s(o,{class:{"docs-page-nav":!0,"docs-page-nav--has-slot":this.hasSlot}},s("div",{class:"docs-page-nav__container docs-page-nav__dark"},s("div",{class:"docs-page-nav__content"},this.prevHref?s("ld-button",{"brand-color":!0,class:"docs-page-nav__pull",mode:"secondary",href:this.prevHref},this.prevTitle):"",this.nextHref?s("ld-button",{"brand-color":!0,class:"docs-page-nav__push",href:this.nextHref},this.nextTitle):"")),s("div",{class:"docs-page-nav__container docs-page-nav__light"},s("div",{class:"docs-page-nav__content"},this.prevHref?s("ld-button",{class:"docs-page-nav__pull",mode:"secondary",href:this.prevHref},this.prevTitle):"",this.nextHref?s("ld-button",{class:"docs-page-nav__push",href:this.nextHref},this.nextTitle):"")),s("slot",null))}get el(){return e(this)}};n.style=".docs-page-nav__dark{display:none}.docs-page-nav__light{display:block}@media (prefers-color-scheme:dark){.docs-page-nav__dark{display:block}.docs-page-nav__light{display:none}}.docs-ui-dark .docs-page-nav__dark{display:block}.docs-ui-dark .docs-page-nav__light{display:none}.docs-ui-light .docs-page-nav__dark{display:none}.docs-ui-light .docs-page-nav__light{display:block}.docs-page-nav{display:flex;flex-wrap:wrap;justify-content:space-between;width:100%}.docs-page-nav__container{width:100%}.docs-page-nav__content{display:flex;grid-auto-flow:column;justify-content:space-between}.docs-page-nav__pull,.docs-page-nav__push{margin-bottom:var(--ld-sp-16);flex-shrink:0}.docs-page-nav__pull{margin-right:var(--ld-sp-16)}.docs-page-nav__push{margin-left:auto}.docs-page-nav--has-slot .docs-page-nav__push{margin-right:var(--ld-sp-16)}.docs-page-nav--has-slot .docs-page-nav__container{width:auto}@media (max-width:51.2rem){.docs-page-nav--has-slot>:last-child{display:none}}";export{n as docs_page_nav}