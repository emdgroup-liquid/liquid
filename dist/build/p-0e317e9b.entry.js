import{r as t,h as s,g as i}from"./p-183495a2.js";import{i as e}from"./p-f13d3119.js";import{i as r}from"./p-44396e3f.js";const o=":host{display:inline-flex}";const n=class{constructor(s){t(this,s);this.resetFocus=async()=>{const[t]=this.triggerSlotRef.assignedElements();if(r(t)){await t.focusInner();return}if(e(t)){t.focus()}};this.handleKeyDown=async t=>{switch(t.key){case"Escape":t.preventDefault();await this.tooltipRef.hideTooltip();break;case"Tab":t.preventDefault()}};this.handleMenuOpen=async()=>{const t=await this.tooltipRef.getTooltip();const s=t.querySelector("ld-menu");if(!this.initialized){s.addEventListener("keydown",this.handleKeyDown);this.initialized=true}const i=await s.getFirstMenuItem();if(!i){return}await i.focusInner()};this.position="bottom left";this.size=undefined;this.initialized=false}updateSize(){if(this.size){this.menuRef.setAttribute("size",this.size)}else{this.menuRef.removeAttribute("size")}}componentDidLoad(){const t=this.el.getAttribute("style");this.updateSize();if(t){this.menuRef.setAttribute("style",t);this.el.removeAttribute("style")}this.triggerSlotRef.assignedElements().forEach((t=>t.ariaHasPopup="menu"))}render(){return s("ld-tooltip",{onLdtooltipclose:this.resetFocus,onLdtooltipopen:this.handleMenuOpen,ref:t=>this.tooltipRef=t,part:"tooltip",position:this.position,preventScreenreader:true,tag:"span",triggerType:"click",unstyled:true},s("slot",{name:"trigger",ref:t=>this.triggerSlotRef=t,slot:"trigger"}),s("ld-menu",{part:"menu",ref:t=>this.menuRef=t},s("slot",null)))}get el(){return i(this)}static get watchers(){return{size:["updateSize"]}}};n.style=o;export{n as ld_context_menu};
//# sourceMappingURL=p-0e317e9b.entry.js.map