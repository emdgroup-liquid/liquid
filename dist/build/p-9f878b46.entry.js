import{r as t,h as e,H as o,g as l}from"./p-375b7112.js";import{T as r}from"./p-11844eb3.js";import{g as i}from"./p-891005fd.js";import{a as d}from"./p-e8172058.js";let a=0;const h=class{constructor(e){t(this,e),this.arrow=!1,this.hideDelay=0,this.showDelay=0,this.disabled=!1,this.position="top center",this.triggerType="hover",this.hasDefaultTrigger=!0,this.visible=!1,this.id="ld-tooltip-"+ ++a,this.initTooltip=()=>{const t=null!==(o={"left bottom":"bottom left","left middle":"middle left","left top":"top left","right bottom":"bottom right","right middle":"middle right","right top":"top right"}[e=this.position])&&void 0!==o?o:e;var e,o;this.popper=new r({attachment:{"bottom center":"top center","bottom left":"top left","bottom right":"top right","left bottom":"bottom right","left middle":"middle right","left top":"top right","right bottom":"bottom left","right middle":"middle left","right top":"top left","top center":"bottom center","top left":"bottom left","top right":"bottom right"}[this.position],classPrefix:"ld-tether",constraints:[{attachment:"together",to:"window"}],element:this.tooltipRef,target:this.triggerRef,targetAttachment:t}),this.visible=!0},this.hideTooltip=()=>{this.popper.disable(),this.visible=!1},this.showTooltip=()=>{this.popper.enable(),this.visible=!0},this.toggleTooltip=()=>{null!=this.popper&&(this.visible?this.hideTooltip():this.showTooltip())},this.handleHideTrigger=t=>{"click"===this.triggerType||this.disabled?t.stopPropagation():(clearTimeout(this.delayTimeout),this.popper&&(this.delayTimeout=setTimeout(this.hideTooltip,this.hideDelay)))},this.handleShowTrigger=t=>{"click"===this.triggerType||this.disabled?t.stopPropagation():(clearTimeout(this.delayTimeout),this.delayTimeout=void 0===this.popper?setTimeout(this.initTooltip,this.showDelay):setTimeout(this.showTooltip,this.showDelay))},this.handleToggleTrigger=t=>{"hover"===this.triggerType||this.disabled?t.stopPropagation():void 0===this.popper?this.initTooltip():this.toggleTooltip()}}componentWillLoad(){d.call(this),this.hasDefaultTrigger=!this.element.querySelector('[slot="trigger"]')}handleClickOutside(t){this.popper&&"click"===this.triggerType&&t.target.closest("ld-tooltip")!==this.element&&t.target.closest(".ld-tooltip")!==this.tooltipRef&&this.hideTooltip()}handleTouchOutside(t){this.handleClickOutside(t)}render(){return e(o,null,e("button",{"aria-describedby":this.id,class:i(["ld-tooltip__trigger","click"===this.triggerType&&"ld-tooltip__trigger--clickable"]),onClick:this.handleToggleTrigger,onMouseEnter:this.handleShowTrigger,onFocus:this.handleShowTrigger,onMouseLeave:this.handleHideTrigger,onBlur:this.handleHideTrigger,ref:t=>{this.triggerRef=t},type:"button"},e("slot",{name:"trigger"},e("ld-icon",{class:"ld-tooltip__icon",name:"info",size:"sm",filled:!0}))),e("div",{"aria-hidden":this.visible?"false":"true",class:i(["ld-tooltip",this.arrow&&"ld-tooltip--with-arrow",this.hasDefaultTrigger&&"ld-tooltip--with-default-trigger","click"===this.triggerType&&"ld-tooltip--interactive"]),id:this.id,ref:t=>{this.tooltipRef=t},role:"tooltip"},e("slot",null)))}get element(){return l(this)}};h.style='@keyframes ld-tooltip-show{0%{opacity:0}to{opacity:1}}@keyframes ld-tooltip-hide{to{visibility:hidden}}.ld-tooltip{--ld-ad-default:200ms;--ld-zi-max:2147483647;--ld-tooltip-animation-duration:var(--ld-ad-default);--ld-tooltip-distance-from-trigger:var(--ld-sp-8);--ld-tooltip-max-width:20rem;--ld-tooltip-offset-x:0px;--ld-tooltip-offset-y:0px;animation:ld-tooltip-hide 0s ease var(--ld-tooltip-animation-duration);animation-fill-mode:forwards;background-color:var(--ld-col-wht);border-radius:var(--ld-br-m);color:var(--ld-col-rblck-default);filter:var(--ld-drop-shadow-hover);margin-left:var(--ld-tooltip-offset-x);margin-top:var(--ld-tooltip-offset-y);max-width:var(--ld-tooltip-max-width);opacity:0;padding:var(--ld-sp-16);pointer-events:none;position:relative;transition:opacity var(--ld-tooltip-animation-duration) ease-in;z-index:var(--ld-zi-max)}.ld-tooltip--with-arrow{--ld-tooltip-arrow-size:0.5rem;--ld-tooltip-arrow-offset:var(--ld-sp-16);--ld-tooltip-distance-from-trigger:calc(var(--ld-tooltip-arrow-size) + var(--ld-sp-8))}.ld-tooltip--with-arrow:before{border:var(--ld-tooltip-arrow-size) solid transparent;content:"";position:absolute}.ld-tooltip--interactive{pointer-events:auto}.ld-tooltip.ld-tether-enabled{animation:ld-tooltip-show var(--ld-tooltip-animation-duration) ease-out;opacity:1}.ld-tooltip.ld-tether-element-attached-bottom:before{bottom:var(--ld-tooltip-arrow-offset)}.ld-tooltip.ld-tether-element-attached-bottom.ld-tether-target-attached-top{margin-top:calc(var(--ld-tooltip-distance-from-trigger)*-1 - var(--ld-tooltip-offset-y))}.ld-tooltip.ld-tether-element-attached-bottom.ld-tether-target-attached-top:before{border-top-color:var(--ld-col-wht);top:100%}.ld-tooltip.ld-tether-element-attached-center:before{left:calc(50% - var(--ld-tooltip-arrow-size))}.ld-tooltip.ld-tether-element-attached-left.ld-tether-target-attached-right{margin-left:calc(var(--ld-tooltip-offset-x) + var(--ld-tooltip-distance-from-trigger))}.ld-tooltip.ld-tether-element-attached-left.ld-tether-target-attached-right:before{border-right-color:var(--ld-col-wht);right:100%}.ld-tooltip.ld-tether-element-attached-middle:before{top:calc(50% - var(--ld-tooltip-arrow-size))}.ld-tooltip.ld-tether-element-attached-right:before{right:var(--ld-tooltip-arrow-offset)}.ld-tooltip.ld-tether-element-attached-right.ld-tether-target-attached-left{margin-left:calc(var(--ld-tooltip-distance-from-trigger)*-1 - var(--ld-tooltip-offset-x))}.ld-tooltip.ld-tether-element-attached-right.ld-tether-target-attached-left:before{border-left-color:var(--ld-col-wht);left:100%}.ld-tooltip.ld-tether-element-attached-top.ld-tether-target-attached-bottom{margin-top:calc(var(--ld-tooltip-distance-from-trigger) + var(--ld-tooltip-offset-y))}.ld-tooltip.ld-tether-element-attached-top.ld-tether-target-attached-bottom:before{border-bottom-color:var(--ld-col-wht);bottom:100%}.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-bottom.ld-tether-target-attached-top):where(.ld-tether-element-attached-right),.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-top.ld-tether-target-attached-bottom):where(.ld-tether-element-attached-right){--ld-tooltip-offset-x:1rem}.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-bottom.ld-tether-target-attached-top):where(.ld-tether-element-attached-left),.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-top.ld-tether-target-attached-bottom):where(.ld-tether-element-attached-left){--ld-tooltip-offset-x:-1rem}.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-left.ld-tether-target-attached-right):where(.ld-tether-element-attached-bottom),.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-right.ld-tether-target-attached-left):where(.ld-tether-element-attached-bottom){--ld-tooltip-offset-y:1rem}.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-left.ld-tether-target-attached-right):where(.ld-tether-element-attached-top),.ld-tooltip--with-default-trigger:where(.ld-tooltip--with-arrow):where(.ld-tether-element-attached-right.ld-tether-target-attached-left):where(.ld-tether-element-attached-top){--ld-tooltip-offset-y:-1rem}.ld-tooltip__trigger{background:none;border:0;display:inline-block;font-family:inherit;font-size:inherit;padding:0}.ld-tooltip__trigger--clickable{cursor:pointer}.ld-tooltip__trigger:focus:focus-visible .ld-tooltip__icon{color:var(--ld-tooltip-icon-color-focus)}.ld-tooltip__trigger:hover .ld-tooltip__icon{color:var(--ld-tooltip-icon-color-hover)}.ld-tooltip__trigger+.ld-tooltip{opacity:0;position:absolute}.ld-tooltip__icon{color:var(--ld-tooltip-icon-color);display:flex}.ld-tooltip__trigger,:where(.ld-theme-ocean) .ld-tooltip__trigger,:where([class*=ld-theme] .ld-theme-ocean) .ld-tooltip__trigger{--ld-tooltip-icon-color:var(--ld-thm-ocean-bg-primary);--ld-tooltip-icon-color-hover:var(--ld-col-rb55);--ld-tooltip-icon-color-focus:var(--ld-col-rb-focus)}:where(.ld-theme-tea) .ld-tooltip__trigger,:where([class*=ld-theme] .ld-theme-tea) .ld-tooltip__trigger{--ld-tooltip-icon-color:var(--ld-thm-tea-bg-primary);--ld-tooltip-icon-color-hover:var(--ld-col-rg5);--ld-tooltip-icon-color-focus:var(--ld-col-rg-focus)}:where(.ld-theme-bubblegum) .ld-tooltip__trigger,:where([class*=ld-theme] .ld-theme-bubblegum) .ld-tooltip__trigger{--ld-tooltip-icon-color:var(--ld-thm-bubblegum-bg-primary);--ld-tooltip-icon-color-hover:var(--ld-col-rp55);--ld-tooltip-icon-color-focus:var(--ld-col-rp-focus)}:where(.ld-theme-shake) .ld-tooltip__trigger,:where([class*=ld-theme] .ld-theme-shake) .ld-tooltip__trigger{--ld-tooltip-icon-color:var(--ld-thm-shake-bg-primary);--ld-tooltip-icon-color-hover:var(--ld-col-rp55);--ld-tooltip-icon-color-focus:var(--ld-col-rp-focus)}:where(.ld-theme-solvent) .ld-tooltip__trigger,:where([class*=ld-theme] .ld-theme-solvent) .ld-tooltip__trigger{--ld-tooltip-icon-color:var(--ld-thm-solvent-bg-primary);--ld-tooltip-icon-color-hover:var(--ld-col-rp55);--ld-tooltip-icon-color-focus:var(--ld-col-rp-focus)}';export{h as ld_tooltip}