/*! tether 2.0.0 */
function t(t,e){t.prototype=Object.create(e.prototype);t.prototype.constructor=t;i(t,e)}function i(t,e){i=Object.setPrototypeOf||function t(i,e){i.__proto__=e;return i};return i(t,e)}function e(t){if(t===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t}function r(t){return typeof t==="function"}function n(t){return typeof t==="number"}function f(t){return typeof t==="object"}function o(t){return typeof t==="string"}function a(t){return t===undefined}function s(t,i){i.split(" ").forEach((function(i){if(i.trim()){t.classList.add(i)}}))}function h(t,i,e){if(t===void 0){t=""}if(!a(i)&&!a(i[t])){if(i[t]===false){return""}return i[t]}else if(e){return e+"-"+t}else{return t}}function u(t,i){i.split(" ").forEach((function(i){if(i.trim()){t.classList.remove(i)}}))}function l(t,i,e){e.forEach((function(e){if(i.indexOf(e)===-1&&t.classList.contains(e)){u(t,e)}}));i.forEach((function(i){if(!t.classList.contains(i)){s(t,i)}}))}var v=[];function c(t){v.push(t)}function d(){var t;while(t=v.pop()){t()}}var p=null;function m(t){if(t===void 0){t={}}var i=[];Array.prototype.push.apply(i,arguments);i.slice(1).forEach((function(i){if(i){for(var e in i){if({}.hasOwnProperty.call(i,e)){t[e]=i[e]}}}}));return t}function g(){if(p){return p}var t=document.createElement("div");t.style.width="100%";t.style.height="200px";var i=document.createElement("div");m(i.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"});i.appendChild(t);document.body.appendChild(i);var e=t.offsetWidth;i.style.overflow="scroll";var r=t.offsetWidth;if(e===r){r=i.clientWidth}document.body.removeChild(i);var n=e-r;p={width:n,height:n};return p}var b=function(){var t=0;return function(){return++t}}();var w={};var O=new Map;function x(t,i){var e;if(i===document){e=document;i=document.documentElement}else{e=i.ownerDocument}var r=e.documentElement;var n=T(i);var f=Y(t);n.top-=f.top;n.left-=f.left;if(a(n.width)){n.width=document.body.scrollWidth-n.left-n.right}if(a(n.height)){n.height=document.body.scrollHeight-n.top-n.bottom}n.top=n.top-r.clientTop;n.left=n.left-r.clientLeft;n.right=e.body.clientWidth-n.width-n.left;n.bottom=e.body.clientHeight-n.height-n.top;return n}function y(t,i){var e;var r=i.scrollTop;var n=i===document.body;if(n){i=document.documentElement;e={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}}else{e=x(t,i)}var f=getComputedStyle(i);var o=i.scrollWidth>i.clientWidth||[f.overflow,f.overflowX].indexOf("scroll")>=0||!n;var a=0;if(o){a=15}var s=e.height-parseFloat(f.borderTopWidth)-parseFloat(f.borderBottomWidth)-a;var h={width:15,height:s*.975*(s/i.scrollHeight),left:e.left+e.width-parseFloat(f.borderLeftWidth)-15};var u=0;if(s<408&&n){u=-11e-5*Math.pow(s,2)-.00727*s+22.58}if(!n){h.height=Math.max(h.height,24)}var l=r/(i.scrollHeight-s);h.top=l*(s-h.height-u)+e.top+parseFloat(f.borderTopWidth);if(n){h.height=Math.max(h.height,24)}return h}function M(t,i){if(i===document.body){return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth}}else{var e=x(t,i);var r={height:e.height,width:e.width,top:e.top,left:e.left};r.height=Math.min(r.height,e.height-(pageYOffset-e.top));r.height=Math.min(r.height,e.height-(e.top+e.height-(pageYOffset+innerHeight)));r.height=Math.min(innerHeight,r.height);r.height-=2;r.width=Math.min(r.width,e.width-(pageXOffset-e.left));r.width=Math.min(r.width,e.width-(e.left+e.width-(pageXOffset+innerWidth)));r.width=Math.min(innerWidth,r.width);r.width-=2;if(r.top<pageYOffset){r.top=pageYOffset}if(r.left<pageXOffset){r.left=pageXOffset}return r}}function F(t){if(O.has(t)){t.removeChild(O.get(t))}O.delete(t)}function T(t){var i=t.getBoundingClientRect();var e={};for(var r in i){e[r]=i[r]}try{if(t.ownerDocument!==document){var n=t.ownerDocument.defaultView.frameElement;if(n){var f=T(n);e.top+=f.top;e.bottom+=f.top;e.left+=f.left;e.right+=f.left}}}catch(t){}return e}function Y(t){var i=O.get(t);if(!i||!t.contains(i)){i=document.createElement("div");i.setAttribute("data-tether-id",b());m(i.style,{top:0,left:0,position:"absolute"});t.appendChild(i);O.set(t,i)}var e=i.getAttribute("data-tether-id");if(a(w[e])){w[e]=T(i);c((function(){delete w[e]}))}return w[e]}var X={position:function t(i){var e=this;var r=i.top,n=i.left;var f=this.cache("element-bounds",(function(){return x(e.element)})),o=f.height,a=f.width;var s=this.getTargetBounds();var u=r+o;var v=n+a;var d=[];if(r<=s.bottom&&u>=s.top){["left","right"].forEach((function(t){var i=s[t];if(i===n||i===v){d.push(t)}}))}if(n<=s.right&&v>=s.left){["top","bottom"].forEach((function(t){var i=s[t];if(i===r||i===u){d.push(t)}}))}var p=["left","top","right","bottom"];var m=this.options,g=m.classes,b=m.classPrefix;this.all.push(h("abutted",g,b));p.forEach((function(t){e.all.push(h("abutted",g,b)+"-"+t)}));if(d.length){this.add.push(h("abutted",g,b))}d.forEach((function(t){e.add.push(h("abutted",g,b)+"-"+t)}));c((function(){if(!(e.options.addTargetClasses===false)){l(e.target,e.add,e.all)}l(e.element,e.add,e.all)}));return true}};var W=["left","top","right","bottom"];function P(t,i,e){if(!e){return null}if(e==="scrollParent"){e=i.scrollParents[0]}else if(e==="window"){e=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]}if(e===document){e=e.documentElement}if(!a(e.nodeType)){var r=e;var n=x(t,e);var f=n;var o=getComputedStyle(e);e=[f.left,f.top,n.width+f.left,n.height+f.top];if(r.ownerDocument!==document){var s=r.ownerDocument.defaultView;e[0]+=s.pageXOffset;e[1]+=s.pageYOffset;e[2]+=s.pageXOffset;e[3]+=s.pageYOffset}W.forEach((function(t,i){t=t[0].toUpperCase()+t.substr(1);if(t==="Top"||t==="Left"){e[i]+=parseFloat(o["border"+t+"Width"])}else{e[i]-=parseFloat(o["border"+t+"Width"])}}))}return e}function E(t,i,e,r,n){if(t.length){var f;if(!a(n)){f=n}else{f=h("out-of-bounds",e,r)}i.push(f);t.forEach((function(t){i.push(f+"-"+t)}))}}function R(t,i,e,r,n,f){if(t<i[0]){if(r.indexOf("left")>=0){t=i[0];n.push("left")}else{f.push("left")}}if(t+e>i[2]){if(r.indexOf("right")>=0){t=i[2]-e;n.push("right")}else{f.push("right")}}return t}function S(t,i,e,r,n,f){if(t<i[1]){if(r.indexOf("top")>=0){t=i[1];n.push("top")}else{f.push("top")}}if(t+e>i[3]){if(r.indexOf("bottom")>=0){t=i[3]-e;n.push("bottom")}else{f.push("bottom")}}return t}function z(t,i,e,r,n,f){if(f<e[0]&&t.left==="left"){if(i.left==="right"){f+=n;t.left="right";f+=r;i.left="left"}else if(i.left==="left"){f+=n;t.left="right";f-=r;i.left="right"}}else if(f+r>e[2]&&t.left==="right"){if(i.left==="left"){f-=n;t.left="left";f-=r;i.left="right"}else if(i.left==="right"){f-=n;t.left="left";f+=r;i.left="left"}}else if(t.left==="center"){if(f+r>e[2]&&i.left==="left"){f-=r;i.left="right"}else if(f<e[0]&&i.left==="right"){f+=r;i.left="left"}}return f}function A(t,i,e,r,n,f){if(t.top==="top"){if(i.top==="bottom"&&f<e[1]){f+=n;t.top="bottom";f+=r;i.top="top"}else if(i.top==="top"&&f+r>e[3]&&f-(r-n)>=e[1]){f-=r-n;t.top="bottom";i.top="bottom"}}if(t.top==="bottom"){if(i.top==="top"&&f+r>e[3]){f-=n;t.top="top";f-=r;i.top="bottom"}else if(i.top==="bottom"&&f<e[1]&&f+(r*2-n)<=e[3]){f+=r-n;t.top="top";i.top="top"}}if(t.top==="middle"){if(f+r>e[3]&&i.top==="top"){f-=r;i.top="bottom"}else if(f<e[1]&&i.top==="bottom"){f+=r;i.top="top"}}return f}function C(t,i,e){var r=[h("pinned",t,i),h("out-of-bounds",t,i)];e.forEach((function(t){var i=t.outOfBoundsClass,e=t.pinnedClass;if(i){r.push(i)}if(e){r.push(e)}}));r.forEach((function(t){["left","top","right","bottom"].forEach((function(i){r.push(t+"-"+i)}))}));return r}var H={position:function t(i){var e=this;var r=i.top,n=i.left,f=i.targetAttachment;if(!this.options.constraints){return true}var s=this.cache("element-bounds",(function(){return x(e.bodyElement,e.element)})),u=s.height,v=s.width;if(v===0&&u===0&&!a(this.lastSize)){var d=this.lastSize;v=d.width;u=d.height}var p=this.cache("target-bounds",(function(){return e.getTargetBounds()}));var g=p.height,b=p.width;var w=this.options,O=w.classes,y=w.classPrefix;var M=C(O,y,this.options.constraints);var F=[];var T=m({},f);var Y=m({},this.attachment);this.options.constraints.forEach((function(t){var i=t.to,s=t.attachment,l=t.pin;if(a(s)){s=""}var c,d;if(s.indexOf(" ")>=0){var p=s.split(" ");d=p[0];c=p[1]}else{c=d=s}var m=P(e.bodyElement,e,i);if(d==="target"||d==="both"){if(r<m[1]&&T.top==="top"){r+=g;T.top="bottom"}if(r+u>m[3]&&T.top==="bottom"){r-=g;T.top="top"}}if(d==="together"){r=A(T,Y,m,u,g,r)}if(c==="target"||c==="both"){if(n<m[0]&&T.left==="left"){n+=b;T.left="right"}if(n+v>m[2]&&T.left==="right"){n-=b;T.left="left"}}if(c==="together"){n=z(T,Y,m,v,b,n)}if(d==="element"||d==="both"){if(r<m[1]&&Y.top==="bottom"){r+=u;Y.top="top"}if(r+u>m[3]&&Y.top==="top"){r-=u;Y.top="bottom"}}if(c==="element"||c==="both"){if(n<m[0]){if(Y.left==="right"){n+=v;Y.left="left"}else if(Y.left==="center"){n+=v/2;Y.left="left"}}if(n+v>m[2]){if(Y.left==="left"){n-=v;Y.left="right"}else if(Y.left==="center"){n-=v/2;Y.left="right"}}}if(o(l)){l=l.split(",").map((function(t){return t.trim()}))}else if(l===true){l=["top","left","right","bottom"]}l=l||[];var w=[];var x=[];n=R(n,m,v,l,w,x);r=S(r,m,u,l,w,x);if(w.length){var M;if(!a(e.options.pinnedClass)){M=e.options.pinnedClass}else{M=h("pinned",O,y)}F.push(M);w.forEach((function(t){F.push(M+"-"+t)}))}E(x,F,O,y,e.options.outOfBoundsClass);if(w.indexOf("left")>=0||w.indexOf("right")>=0){Y.left=T.left=false}if(w.indexOf("top")>=0||w.indexOf("bottom")>=0){Y.top=T.top=false}if(T.top!==f.top||T.left!==f.left||Y.top!==e.attachment.top||Y.left!==e.attachment.left){e.updateAttachClasses(Y,T);e.trigger("update",{attachment:Y,targetAttachment:T})}}));c((function(){if(!(e.options.addTargetClasses===false)){l(e.target,F,M)}l(e.element,F,M)}));return{top:r,left:n}}};var k={position:function t(i){var e=i.top,n=i.left;if(!this.options.shift){return}var f=this.options.shift;if(r(f)){f=f.call(this,{top:e,left:n})}var a,s;if(o(f)){f=f.split(" ");f[1]=f[1]||f[0];var h=f;a=h[0];s=h[1];a=parseFloat(a,10);s=parseFloat(s,10)}else{var u=[f.top,f.left];a=u[0];s=u[1]}e+=a;n+=s;return{top:e,left:n}}};var j=function(){function t(){}var i=t.prototype;i.on=function t(i,e,r,n){if(n===void 0){n=false}if(a(this.bindings)){this.bindings={}}if(a(this.bindings[i])){this.bindings[i]=[]}this.bindings[i].push({handler:e,ctx:r,once:n});return this};i.once=function t(i,e,r){return this.on(i,e,r,true)};i.off=function t(i,e){var r=this;if(a(this.bindings)||a(this.bindings[i])){return this}if(a(e)){delete this.bindings[i]}else{this.bindings[i].forEach((function(t,n){if(t.handler===e){r.bindings[i].splice(n,1)}}))}return this};i.trigger=function t(i){var e=this;for(var r=arguments.length,n=new Array(r>1?r-1:0),f=1;f<r;f++){n[f-1]=arguments[f]}if(!a(this.bindings)&&this.bindings[i]){this.bindings[i].forEach((function(t,r){var f=t.ctx,o=t.handler,a=t.once;var s=f||e;o.apply(s,n);if(a){e.bindings[i].splice(r,1)}}))}return this};return t}();var B={center:"center",left:"right",right:"left"};var L={middle:"middle",top:"bottom",bottom:"top"};var D={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"};function Z(){var t={top:0,left:0};for(var i=arguments.length,e=new Array(i),r=0;r<i;r++){e[r]=arguments[r]}e.forEach((function(i){var e=i.top,r=i.left;if(o(e)){e=parseFloat(e)}if(o(r)){r=parseFloat(r)}t.top+=e;t.left+=r}));return t}function q(t){var i=t.left,e=t.top;if(!a(D[t.left])){i=D[t.left]}if(!a(D[t.top])){e=D[t.top]}return{left:i,top:e}}function G(t,i){var e=t.left,r=t.top;if(e==="auto"){e=B[i.left]}if(r==="auto"){r=L[i.top]}return{left:e,top:r}}function I(t,i){if(o(t.left)&&t.left.indexOf("%")!==-1){t.left=parseFloat(t.left)/100*i.width}if(o(t.top)&&t.top.indexOf("%")!==-1){t.top=parseFloat(t.top)/100*i.height}return t}function J(t){var i=t.split(" "),e=i[0],r=i[1];return{top:e,left:r}}function K(t){var i=getComputedStyle(t)||{};var e=i.position;var r=[];if(e==="fixed"){return[t]}var n=t;while((n=n.parentNode)&&n&&n.nodeType===1){var f=void 0;try{f=getComputedStyle(n)}catch(t){}if(a(f)||f===null){r.push(n);return r}var o=f,s=o.overflow,h=o.overflowX,u=o.overflowY;if(/(auto|scroll|overlay)/.test(s+u+h)){if(e!=="absolute"||["relative","absolute","fixed"].indexOf(f.position)>=0){r.push(n)}}}r.push(t.ownerDocument.body);if(t.ownerDocument!==document){r.push(t.ownerDocument.defaultView)}return r}function N(t){return t.offsetParent||document.documentElement}var Q={modules:[H,X,k]};function U(t){var i=t.ownerDocument;var e=i.fullscreenElement||i.webkitFullscreenElement||i.mozFullScreenElement||i.msFullscreenElement;return e===t}function V(t,i,e){if(e===void 0){e=1}return t+e>=i&&i>=t-e}var $=function(){if(a(document)){return""}var t=document.createElement("div");var i=["transform","WebkitTransform","OTransform","MozTransform","msTransform"];for(var e=0;e<i.length;++e){var r=i[e];if(t.style[r]!==undefined){return r}}}();var _=[];var tt=function t(){_.forEach((function(t){t.position(false)}));d()};function it(){return performance.now()}(function(){var t=null;var i=null;var e=null;var r=function r(){if(!a(i)&&i>16){i=Math.min(i-16,250);e=setTimeout(r,250);return}if(!a(t)&&it()-t<10){return}if(e!=null){clearTimeout(e);e=null}t=it();tt();i=it()-t};if(!a(window)&&!a(window.addEventListener)){["resize","scroll","touchmove"].forEach((function(t){window.addEventListener(t,r)}))}})();var et=function(i){t(r,i);function r(t){var r;r=i.call(this)||this;r.position=r.position.bind(e(r));_.push(e(r));r.history=[];r.setOptions(t,false);Q.modules.forEach((function(t){if(!a(t.initialize)){t.initialize.call(e(r))}}));r.position();return r}var v=r.prototype;v.setOptions=function t(i,e){var r=this;if(e===void 0){e=true}var n={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether",bodyElement:document.body};this.options=m(n,i);var f=this.options,s=f.element,h=f.target,u=f.targetModifier,l=f.bodyElement;this.element=s;this.target=h;this.targetModifier=u;if(typeof l==="string"){l=document.querySelector(l)}this.bodyElement=l;if(this.target==="viewport"){this.target=document.body;this.targetModifier="visible"}else if(this.target==="scroll-handle"){this.target=document.body;this.targetModifier="scroll-handle"}["element","target"].forEach((function(t){if(a(r[t])){throw new Error("Tether Error: Both element and target must be defined")}if(!a(r[t].jquery)){r[t]=r[t][0]}else if(o(r[t])){r[t]=document.querySelector(r[t])}}));this._addClasses();if(!this.options.attachment){throw new Error("Tether Error: You must provide an attachment")}this.targetAttachment=J(this.options.targetAttachment);this.attachment=J(this.options.attachment);this.offset=J(this.options.offset);this.targetOffset=J(this.options.targetOffset);if(!a(this.scrollParents)){this.disable()}if(this.targetModifier==="scroll-handle"){this.scrollParents=[this.target]}else{this.scrollParents=K(this.target)}if(!(this.options.enabled===false)){this.enable(e)}};v.getTargetBounds=function t(){if(!a(this.targetModifier)){if(this.targetModifier==="visible"){return M(this.bodyElement,this.target)}else if(this.targetModifier==="scroll-handle"){return y(this.bodyElement,this.target)}}else{return x(this.bodyElement,this.target)}};v.clearCache=function t(){this._cache={}};v.cache=function t(i,e){if(a(this._cache)){this._cache={}}if(a(this._cache[i])){this._cache[i]=e.call(this)}return this._cache[i]};v.enable=function t(i){var e=this;if(i===void 0){i=true}var r=this.options,n=r.classes,f=r.classPrefix;if(!(this.options.addTargetClasses===false)){s(this.target,h("enabled",n,f))}s(this.element,h("enabled",n,f));this.enabled=true;this.scrollParents.forEach((function(t){if(t!==e.target.ownerDocument){t.addEventListener("scroll",e.position)}}));if(i){this.position()}};v.disable=function t(){var i=this;var e=this.options,r=e.classes,n=e.classPrefix;u(this.target,h("enabled",r,n));u(this.element,h("enabled",r,n));this.enabled=false;if(!a(this.scrollParents)){this.scrollParents.forEach((function(t){if(t&&t.removeEventListener){t.removeEventListener("scroll",i.position)}}))}};v.destroy=function t(){var i=this;this.disable();this._removeClasses();_.forEach((function(t,e){if(t===i){_.splice(e,1)}}));if(_.length===0){F(this.bodyElement)}};v.updateAttachClasses=function t(i,e){var r=this;i=i||this.attachment;e=e||this.targetAttachment;var n=["left","top","bottom","right","middle","center"];var f=this.options,o=f.classes,s=f.classPrefix;if(!a(this._addAttachClasses)&&this._addAttachClasses.length){this._addAttachClasses.splice(0,this._addAttachClasses.length)}if(a(this._addAttachClasses)){this._addAttachClasses=[]}this.add=this._addAttachClasses;if(i.top){this.add.push(h("element-attached",o,s)+"-"+i.top)}if(i.left){this.add.push(h("element-attached",o,s)+"-"+i.left)}if(e.top){this.add.push(h("target-attached",o,s)+"-"+e.top)}if(e.left){this.add.push(h("target-attached",o,s)+"-"+e.left)}this.all=[];n.forEach((function(t){r.all.push(h("element-attached",o,s)+"-"+t);r.all.push(h("target-attached",o,s)+"-"+t)}));c((function(){if(a(r._addAttachClasses)){return}l(r.element,r._addAttachClasses,r.all);if(!(r.options.addTargetClasses===false)){l(r.target,r._addAttachClasses,r.all)}delete r._addAttachClasses}))};v.position=function t(i){var e=this;if(i===void 0){i=true}if(!this.enabled){return}this.clearCache();var r=G(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,r);var n=this.cache("element-bounds",(function(){return x(e.bodyElement,e.element)}));var o=n.width,s=n.height;if(o===0&&s===0&&!a(this.lastSize)){var h=this.lastSize;o=h.width;s=h.height}else{this.lastSize={width:o,height:s}}var u=this.cache("target-bounds",(function(){return e.getTargetBounds()}));var l=u;var v=I(q(this.attachment),{width:o,height:s});var c=I(q(r),l);var p=I(this.offset,{width:o,height:s});var m=I(this.targetOffset,l);v=Z(v,p);c=Z(c,m);var b=u.left+c.left-v.left;var w=u.top+c.top-v.top;for(var O=0;O<Q.modules.length;++O){var y=Q.modules[O];var M=y.position.call(this,{left:b,top:w,targetAttachment:r,targetPos:u,elementPos:n,offset:v,targetOffset:c,manualOffset:p,manualTargetOffset:m,scrollbarSize:X,attachment:this.attachment});if(M===false){return false}else if(a(M)||!f(M)){continue}else{w=M.top;b=M.left}}var F={page:{top:w,left:b},viewport:{top:w-pageYOffset,bottom:pageYOffset-w-s+innerHeight,left:b-pageXOffset,right:pageXOffset-b-o+innerWidth}};var T=this.target.ownerDocument;var Y=T.defaultView;var X;if(Y.innerHeight>T.documentElement.clientHeight){X=this.cache("scrollbar-size",g);F.viewport.bottom-=X.height}if(Y.innerWidth>T.documentElement.clientWidth){X=this.cache("scrollbar-size",g);F.viewport.right-=X.width}if(["","static"].indexOf(T.body.style.position)===-1||["","static"].indexOf(T.body.parentElement.style.position)===-1){F.page.bottom=T.body.scrollHeight-w-s;F.page.right=T.body.scrollWidth-b-o}if(!a(this.options.optimizations)&&this.options.optimizations.moveElement!==false&&a(this.targetModifier)){var W=this.cache("target-offsetparent",(function(){return N(e.target)}));var P=this.cache("target-offsetparent-bounds",(function(){return x(e.bodyElement,W)}));var E=getComputedStyle(W);var R=P;var S={};["Top","Left","Bottom","Right"].forEach((function(t){S[t.toLowerCase()]=parseFloat(E["border"+t+"Width"])}));P.right=T.body.scrollWidth-P.left-R.width+S.right;P.bottom=T.body.scrollHeight-P.top-R.height+S.bottom;if(F.page.top>=P.top+S.top&&F.page.bottom>=P.bottom){if(F.page.left>=P.left+S.left&&F.page.right>=P.right){var z=W.scrollLeft,A=W.scrollTop;F.offset={top:F.page.top-P.top+A-S.top,left:F.page.left-P.left+z-S.left}}}}this.move(F);this.history.unshift(F);if(this.history.length>3){this.history.pop()}if(i){d()}return true};v.move=function t(i){var e=this;if(a(this.element.parentNode)){return}var r={};for(var f in i){r[f]={};for(var o in i[f]){var s=false;for(var h=0;h<this.history.length;++h){var u=this.history[h];if(!a(u[f])&&!V(u[f][o],i[f][o])){s=true;break}}if(!s){r[f][o]=true}}}var l={top:"",left:"",right:"",bottom:""};var v=function t(i,r){var f=!a(e.options.optimizations);var o=f?e.options.optimizations.gpu:null;if(o!==false){var s,h;if(i.top){l.top=0;s=r.top}else{l.bottom=0;s=-r.bottom}if(i.left){l.left=0;h=r.left}else{l.right=0;h=-r.right}if(n(window.devicePixelRatio)&&devicePixelRatio%1===0){h=Math.round(h*devicePixelRatio)/devicePixelRatio;s=Math.round(s*devicePixelRatio)/devicePixelRatio}l[$]="translateX("+h+"px) translateY("+s+"px)";if($!=="msTransform"){l[$]+=" translateZ(0)"}}else{if(i.top){l.top=r.top+"px"}else{l.bottom=r.bottom+"px"}if(i.left){l.left=r.left+"px"}else{l.right=r.right+"px"}}};var d=!a(this.options.optimizations);var p=true;if(d&&this.options.optimizations.allowPositionFixed===false){p=false}var g=false;if((r.page.top||r.page.bottom)&&(r.page.left||r.page.right)){l.position="absolute";v(r.page,i.page)}else if(p&&(r.viewport.top||r.viewport.bottom)&&(r.viewport.left||r.viewport.right)){l.position="fixed";v(r.viewport,i.viewport)}else if(!a(r.offset)&&r.offset.top&&r.offset.left){l.position="absolute";var b=this.cache("target-offsetparent",(function(){return N(e.target)}));if(N(this.element)!==b){c((function(){e.element.parentNode.removeChild(e.element);b.appendChild(e.element)}))}v(r.offset,i.offset);g=true}else{l.position="absolute";v({top:true,left:true},i.page)}if(!g){if(this.options.bodyElement){if(this.element.parentNode!==this.options.bodyElement){this.options.bodyElement.appendChild(this.element)}}else{var w=true;var O=this.element.parentNode;while(O&&O.nodeType===1&&O.tagName!=="BODY"&&!U(O)){if(getComputedStyle(O).position!=="static"){w=false;break}O=O.parentNode}if(!w){this.element.parentNode.removeChild(this.element);this.element.ownerDocument.body.appendChild(this.element)}}}var x={};var y=false;for(var M in l){var F=l[M];var T=this.element.style[M];if(T!==F){y=true;x[M]=F}}if(y){c((function(){m(e.element.style,x);e.trigger("repositioned")}))}};v._addClasses=function t(){var i=this.options,e=i.classes,r=i.classPrefix;s(this.element,h("element",e,r));if(!(this.options.addTargetClasses===false)){s(this.target,h("target",e,r))}};v._removeClasses=function t(){var i=this;var e=this.options,r=e.classes,n=e.classPrefix;u(this.element,h("element",r,n));if(!(this.options.addTargetClasses===false)){u(this.target,h("target",r,n))}this.all.forEach((function(t){i.element.classList.remove(t);i.target.classList.remove(t)}))};return r}(j);et.modules=[];Q.position=tt;var rt=m(et,Q);rt.modules.push({initialize:function t(){var i=this;var e=this.options,r=e.classes,n=e.classPrefix;this.markers={};["target","element"].forEach((function(t){var e=document.createElement("div");e.className=h(t+"-marker",r,n);var f=document.createElement("div");f.className=h("marker-dot",r,n);e.appendChild(f);i[t].appendChild(e);i.markers[t]={dot:f,el:e}}))},position:function t(i){var e=i.manualOffset,r=i.manualTargetOffset;var n={element:e,target:r};for(var f in n){var a=n[f];for(var s in a){var h;var u=a[s];if(!o(u)||u.indexOf("%")===-1&&u.indexOf("px")===-1){u+="px"}if(this.markers[f]&&((h=this.markers[f].dot)==null?void 0:h.style[s])!==u){this.markers[f].dot.style[s]=u}}}return true}});export{rt as T};
//# sourceMappingURL=p-6679d6f6.js.map