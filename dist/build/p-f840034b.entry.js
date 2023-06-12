import{r as t,c as e,h as s,H as i,g as a}from"./p-fbb57a27.js";const d="";let l=0;const n=class{constructor(s){t(this,s);this.ldtabchange=e(this,"ldtabchange",7);this.idDescriber=`ld-tabs-${l++}`;this.handleLdtabselect=t=>{t.stopImmediatePropagation();const e=t.target;this.updateTabs(e);this.updateTabPanels(e.id);this.ldtabchange.emit(e.id)}}updateTabs(t){var e;(e=Array.from(this.el.querySelectorAll("ld-tab")).find((t=>t.hasAttribute("selected"))))===null||e===void 0?void 0:e.removeAttribute("selected");t.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}updateTabPanels(t){var e,s;const i=Array.from(this.el.querySelectorAll("ld-tabpanel"));(e=i.find((t=>!t.hasAttribute("hidden"))))===null||e===void 0?void 0:e.setAttribute("hidden",undefined);(s=i.find((e=>e.getAttribute("aria-labelledby")===t)))===null||s===void 0?void 0:s.removeAttribute("hidden")}async switchTab(t){const e=typeof t==="number"?this.el.querySelectorAll("ld-tab")[t]:this.el.querySelector(`ld-tab#${t}`);if(!e){throw new Error(`Could not find ld-tab with ${typeof t==="number"?"index":"id"} ${typeof t==="number"?t:`"${t}"`}.`)}e.select()}componentDidRender(){let t;this.el.querySelectorAll("ld-tab").forEach(((e,s)=>{e.id=`${this.idDescriber}-tab-${s}`;if(e.selected){t=s}}));this.el.querySelectorAll("ld-tabpanel").forEach(((e,s)=>{e.setAttribute("aria-labelledby",`${this.idDescriber}-tab-${s}`);if(t===s){e.removeAttribute("hidden")}else{e.setAttribute("hidden","true")}}))}render(){return s(i,{onLdtabselect:this.handleLdtabselect,class:"ld-tabs"},s("slot",null))}get el(){return a(this)}};n.style=d;export{n as ld_tabs};
//# sourceMappingURL=p-f840034b.entry.js.map