import{r as t,c as i,h as s,H as e,g as n}from"./p-5c3033fa.js";import{c as d}from"./p-37422124.js";const l=":host{display:block}.ld-menuitem .ld-menuitem__button{display:grid;width:100%}";const h=new Map([["danger","danger-ghost"],["highlight","ghost"],["neutral","neutral-ghost"]]);const o=class{constructor(s){t(this,s);this.ldclosetooltip=i(this,"ldclosetooltip",7);this.handleClick=t=>{if(this.preventClose)return;this.ldclosetooltip.emit(t)};this.disabled=undefined;this.href=undefined;this.ldTabindex=undefined;this.preventClose=undefined;this.mode="neutral";this.size=undefined;this.target=undefined;this.clonedAttributes=undefined}async focusInner(){var t;(t=this.buttonRef)===null||t===void 0?void 0:t.focusInner()}componentWillLoad(){this.attributesObserver=d.call(this,["ld-tabindex","mode","size"])}disconnectedCallback(){if(this.attributesObserver)this.attributesObserver.disconnect()}render(){return s(e,null,s("li",{class:"ld-menuitem",part:"listitem",role:"menuitem"},s("ld-button",Object.assign({},this.clonedAttributes,{class:"ld-menuitem__button",disabled:this.disabled,href:this.href,iconOnly:false,justifyContent:"start",ldTabindex:this.ldTabindex,mode:h.get(this.mode),onClick:this.handleClick,part:"focusable button",ref:t=>this.buttonRef=t,size:this.size,target:this.target,type:"button"}),s("slot",null))))}get el(){return n(this)}};o.style=l;export{o as ld_menuitem};
//# sourceMappingURL=p-649b0116.entry.js.map