import{r as l,h as r}from"./p-765a6fc5.js";import{g as i}from"./p-891005fd.js";const n=class{constructor(r){l(this,r),this.current=void 0,this.href=void 0}render(){return r("li",{class:"ld-crumb"},r("ld-link",{href:this.href,class:i(["ld-crumb__link",this.current&&"ld-crumb__link--current"]),part:"link","aria-current":this.current?"page":void 0,chevron:this.current?void 0:"end"},r("slot",null)))}};n.style=".ld-breadcrumbs .ld-link,.ld-crumb__link::part(anchor){--ld-link-gap:var(--ld-crumb-icon-gap);--ld-link-chevron-gap:var(--ld-crumb-gap);display:inline-flex}.ld-breadcrumbs li:not(:last-of-type) .ld-link,.ld-crumb__link:not(.ld-crumb__link--current)::part(anchor){--ld-link-col:var(--ld-col-neutral-600);font-weight:400;margin-right:calc(var(--ld-crumb-gap) + .5em)}.ld-breadcrumbs li:not(:last-of-type) .ld-link:hover,.ld-crumb__link:not(.ld-crumb__link--current)::part(anchor):hover{--ld-link-col:var(--ld-thm-primary-hover)}.ld-breadcrumbs li:not(:last-of-type) .ld-link:focus:focus-visible,.ld-crumb__link:not(.ld-crumb__link--current)::part(anchor):focus:focus-visible{--ld-link-col:var(--ld-thm-primary-focus)}.ld-breadcrumbs li:not(:last-of-type) .ld-link:active,.ld-crumb__link:not(.ld-crumb__link--current)::part(anchor):active{--ld-link-col:var(--ld-thm-primary-active)}.ld-breadcrumbs li:last-of-type .ld-link,.ld-crumb__link--current{cursor:default;pointer-events:none}";export{n as ld_crumb}