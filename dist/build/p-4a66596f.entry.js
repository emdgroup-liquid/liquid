import{r as t,h as e,H as i}from"./p-b16379ff.js";import{c as n,a as o}from"./p-112455b1.js";var r=n((function(t,e){
/*! @license DOMPurify 3.0.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.5/LICENSE */
(function(e,i){t.exports=i()})(o,(function(){const{entries:t,setPrototypeOf:e,isFrozen:i,getPrototypeOf:n,getOwnPropertyDescriptor:o}=Object;let{freeze:r,seal:a,create:l}=Object;let{apply:s,construct:c}=typeof Reflect!=="undefined"&&Reflect;if(!s){s=function t(e,i,n){return e.apply(i,n)}}if(!r){r=function t(e){return e}}if(!a){a=function t(e){return e}}if(!c){c=function t(e,i){return new e(...i)}}const f=v(Array.prototype.forEach);const u=v(Array.prototype.pop);const d=v(Array.prototype.push);const m=v(String.prototype.toLowerCase);const p=v(String.prototype.toString);const h=v(String.prototype.match);const g=v(String.prototype.replace);const y=v(String.prototype.indexOf);const b=v(String.prototype.trim);const _=v(RegExp.prototype.test);const w=x(TypeError);function v(t){return function(e){for(var i=arguments.length,n=new Array(i>1?i-1:0),o=1;o<i;o++){n[o-1]=arguments[o]}return s(t,e,n)}}function x(t){return function(){for(var e=arguments.length,i=new Array(e),n=0;n<e;n++){i[n]=arguments[n]}return c(t,i)}}function k(t,n,o){var r;o=(r=o)!==null&&r!==void 0?r:m;if(e){e(t,null)}let a=n.length;while(a--){let e=n[a];if(typeof e==="string"){const t=o(e);if(t!==e){if(!i(n)){n[a]=t}e=t}}t[e]=true}return t}function T(e){const i=l(null);for(const[n,o]of t(e)){i[n]=o}return i}function A(t,e){while(t!==null){const i=o(t,e);if(i){if(i.get){return v(i.get)}if(typeof i.value==="function"){return v(i.value)}}t=n(t)}function i(t){console.warn("fallback value for",t);return null}return i}const E=r(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]);const S=r(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]);const R=r(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]);const D=r(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]);const L=r(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]);const O=r(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]);const N=r(["#text"]);const z=r(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]);const M=r(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]);const I=r(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]);const C=r(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]);const F=a(/\{\{[\w\W]*|[\w\W]*\}\}/gm);const P=a(/<%[\w\W]*|[\w\W]*%>/gm);const j=a(/\${[\w\W]*}/gm);const B=a(/^data-[\-\w.\u00B7-\uFFFF]/);const U=a(/^aria-[\-\w]+$/);const H=a(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);const Y=a(/^(?:\w+script|data):/i);const W=a(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);const q=a(/^html$/i);var G=Object.freeze({__proto__:null,MUSTACHE_EXPR:F,ERB_EXPR:P,TMPLIT_EXPR:j,DATA_ATTR:B,ARIA_ATTR:U,IS_ALLOWED_URI:H,IS_SCRIPT_OR_DATA:Y,ATTR_WHITESPACE:W,DOCTYPE_NAME:q});const X=()=>typeof window==="undefined"?null:window;const $=function t(e,i){if(typeof e!=="object"||typeof e.createPolicy!=="function"){return null}let n=null;const o="data-tt-policy-suffix";if(i&&i.hasAttribute(o)){n=i.getAttribute(o)}const r="dompurify"+(n?"#"+n:"");try{return e.createPolicy(r,{createHTML(t){return t},createScriptURL(t){return t}})}catch(t){console.warn("TrustedTypes policy "+r+" could not be created.");return null}};function J(){let e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:X();const i=t=>J(t);i.version="3.0.5";i.removed=[];if(!e||!e.document||e.document.nodeType!==9){i.isSupported=false;return i}const n=e.document;const o=n.currentScript;let{document:a}=e;const{DocumentFragment:l,HTMLTemplateElement:s,Node:c,Element:v,NodeFilter:x,NamedNodeMap:F=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:P,DOMParser:j,trustedTypes:B}=e;const U=v.prototype;const Y=A(U,"cloneNode");const W=A(U,"nextSibling");const V=A(U,"childNodes");const K=A(U,"parentNode");if(typeof s==="function"){const t=a.createElement("template");if(t.content&&t.content.ownerDocument){a=t.content.ownerDocument}}let Q;let Z="";const{implementation:tt,createNodeIterator:et,createDocumentFragment:it,getElementsByTagName:nt}=a;const{importNode:ot}=n;let rt={};i.isSupported=typeof t==="function"&&typeof K==="function"&&tt&&tt.createHTMLDocument!==undefined;const{MUSTACHE_EXPR:at,ERB_EXPR:lt,TMPLIT_EXPR:st,DATA_ATTR:ct,ARIA_ATTR:ft,IS_SCRIPT_OR_DATA:ut,ATTR_WHITESPACE:dt}=G;let{IS_ALLOWED_URI:mt}=G;let pt=null;const ht=k({},[...E,...S,...R,...L,...N]);let gt=null;const yt=k({},[...z,...M,...I,...C]);let bt=Object.seal(Object.create(null,{tagNameCheck:{writable:true,configurable:false,enumerable:true,value:null},attributeNameCheck:{writable:true,configurable:false,enumerable:true,value:null},allowCustomizedBuiltInElements:{writable:true,configurable:false,enumerable:true,value:false}}));let _t=null;let wt=null;let vt=true;let xt=true;let kt=false;let Tt=true;let At=false;let Et=false;let St=false;let Rt=false;let Dt=false;let Lt=false;let Ot=false;let Nt=true;let zt=false;const Mt="user-content-";let It=true;let Ct=false;let Ft={};let Pt=null;const jt=k({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Bt=null;const Ut=k({},["audio","video","img","source","image","track"]);let Ht=null;const Yt=k({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]);const Wt="http://www.w3.org/1998/Math/MathML";const qt="http://www.w3.org/2000/svg";const Gt="http://www.w3.org/1999/xhtml";let Xt=Gt;let $t=false;let Jt=null;const Vt=k({},[Wt,qt,Gt],p);let Kt;const Qt=["application/xhtml+xml","text/html"];const Zt="text/html";let te;let ee=null;const ie=a.createElement("form");const ne=function t(e){return e instanceof RegExp||e instanceof Function};const oe=function t(e){if(ee&&ee===e){return}if(!e||typeof e!=="object"){e={}}e=T(e);Kt=Qt.indexOf(e.PARSER_MEDIA_TYPE)===-1?Kt=Zt:Kt=e.PARSER_MEDIA_TYPE;te=Kt==="application/xhtml+xml"?p:m;pt="ALLOWED_TAGS"in e?k({},e.ALLOWED_TAGS,te):ht;gt="ALLOWED_ATTR"in e?k({},e.ALLOWED_ATTR,te):yt;Jt="ALLOWED_NAMESPACES"in e?k({},e.ALLOWED_NAMESPACES,p):Vt;Ht="ADD_URI_SAFE_ATTR"in e?k(T(Yt),e.ADD_URI_SAFE_ATTR,te):Yt;Bt="ADD_DATA_URI_TAGS"in e?k(T(Ut),e.ADD_DATA_URI_TAGS,te):Ut;Pt="FORBID_CONTENTS"in e?k({},e.FORBID_CONTENTS,te):jt;_t="FORBID_TAGS"in e?k({},e.FORBID_TAGS,te):{};wt="FORBID_ATTR"in e?k({},e.FORBID_ATTR,te):{};Ft="USE_PROFILES"in e?e.USE_PROFILES:false;vt=e.ALLOW_ARIA_ATTR!==false;xt=e.ALLOW_DATA_ATTR!==false;kt=e.ALLOW_UNKNOWN_PROTOCOLS||false;Tt=e.ALLOW_SELF_CLOSE_IN_ATTR!==false;At=e.SAFE_FOR_TEMPLATES||false;Et=e.WHOLE_DOCUMENT||false;Dt=e.RETURN_DOM||false;Lt=e.RETURN_DOM_FRAGMENT||false;Ot=e.RETURN_TRUSTED_TYPE||false;Rt=e.FORCE_BODY||false;Nt=e.SANITIZE_DOM!==false;zt=e.SANITIZE_NAMED_PROPS||false;It=e.KEEP_CONTENT!==false;Ct=e.IN_PLACE||false;mt=e.ALLOWED_URI_REGEXP||H;Xt=e.NAMESPACE||Gt;bt=e.CUSTOM_ELEMENT_HANDLING||{};if(e.CUSTOM_ELEMENT_HANDLING&&ne(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)){bt.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck}if(e.CUSTOM_ELEMENT_HANDLING&&ne(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)){bt.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck}if(e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements==="boolean"){bt.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements}if(At){xt=false}if(Lt){Dt=true}if(Ft){pt=k({},[...N]);gt=[];if(Ft.html===true){k(pt,E);k(gt,z)}if(Ft.svg===true){k(pt,S);k(gt,M);k(gt,C)}if(Ft.svgFilters===true){k(pt,R);k(gt,M);k(gt,C)}if(Ft.mathMl===true){k(pt,L);k(gt,I);k(gt,C)}}if(e.ADD_TAGS){if(pt===ht){pt=T(pt)}k(pt,e.ADD_TAGS,te)}if(e.ADD_ATTR){if(gt===yt){gt=T(gt)}k(gt,e.ADD_ATTR,te)}if(e.ADD_URI_SAFE_ATTR){k(Ht,e.ADD_URI_SAFE_ATTR,te)}if(e.FORBID_CONTENTS){if(Pt===jt){Pt=T(Pt)}k(Pt,e.FORBID_CONTENTS,te)}if(It){pt["#text"]=true}if(Et){k(pt,["html","head","body"])}if(pt.table){k(pt,["tbody"]);delete _t.tbody}if(e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=="function"){throw w('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.')}if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=="function"){throw w('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.')}Q=e.TRUSTED_TYPES_POLICY;Z=Q.createHTML("")}else{if(Q===undefined){Q=$(B,o)}if(Q!==null&&typeof Z==="string"){Z=Q.createHTML("")}}if(r){r(e)}ee=e};const re=k({},["mi","mo","mn","ms","mtext"]);const ae=k({},["foreignobject","desc","title","annotation-xml"]);const le=k({},["title","style","font","a","script"]);const se=k({},S);k(se,R);k(se,D);const ce=k({},L);k(ce,O);const fe=function t(e){let i=K(e);if(!i||!i.tagName){i={namespaceURI:Xt,tagName:"template"}}const n=m(e.tagName);const o=m(i.tagName);if(!Jt[e.namespaceURI]){return false}if(e.namespaceURI===qt){if(i.namespaceURI===Gt){return n==="svg"}if(i.namespaceURI===Wt){return n==="svg"&&(o==="annotation-xml"||re[o])}return Boolean(se[n])}if(e.namespaceURI===Wt){if(i.namespaceURI===Gt){return n==="math"}if(i.namespaceURI===qt){return n==="math"&&ae[o]}return Boolean(ce[n])}if(e.namespaceURI===Gt){if(i.namespaceURI===qt&&!ae[o]){return false}if(i.namespaceURI===Wt&&!re[o]){return false}return!ce[n]&&(le[n]||!se[n])}if(Kt==="application/xhtml+xml"&&Jt[e.namespaceURI]){return true}return false};const ue=function t(e){d(i.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){e.remove()}};const de=function t(e,n){try{d(i.removed,{attribute:n.getAttributeNode(e),from:n})}catch(t){d(i.removed,{attribute:null,from:n})}n.removeAttribute(e);if(e==="is"&&!gt[e]){if(Dt||Lt){try{ue(n)}catch(t){}}else{try{n.setAttribute(e,"")}catch(t){}}}};const me=function t(e){let i;let n;if(Rt){e="<remove></remove>"+e}else{const t=h(e,/^[\r\n\t ]+/);n=t&&t[0]}if(Kt==="application/xhtml+xml"&&Xt===Gt){e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>"}const o=Q?Q.createHTML(e):e;if(Xt===Gt){try{i=(new j).parseFromString(o,Kt)}catch(t){}}if(!i||!i.documentElement){i=tt.createDocument(Xt,"template",null);try{i.documentElement.innerHTML=$t?Z:o}catch(t){}}const r=i.body||i.documentElement;if(e&&n){r.insertBefore(a.createTextNode(n),r.childNodes[0]||null)}if(Xt===Gt){return nt.call(i,Et?"html":"body")[0]}return Et?i.documentElement:r};const pe=function t(e){return et.call(e.ownerDocument||e,e,x.SHOW_ELEMENT|x.SHOW_COMMENT|x.SHOW_TEXT,null,false)};const he=function t(e){return e instanceof P&&(typeof e.nodeName!=="string"||typeof e.textContent!=="string"||typeof e.removeChild!=="function"||!(e.attributes instanceof F)||typeof e.removeAttribute!=="function"||typeof e.setAttribute!=="function"||typeof e.namespaceURI!=="string"||typeof e.insertBefore!=="function"||typeof e.hasChildNodes!=="function")};const ge=function t(e){return typeof c==="object"?e instanceof c:e&&typeof e==="object"&&typeof e.nodeType==="number"&&typeof e.nodeName==="string"};const ye=function t(e,n,o){if(!rt[e]){return}f(rt[e],(t=>{t.call(i,n,o,ee)}))};const be=function t(e){let n;ye("beforeSanitizeElements",e,null);if(he(e)){ue(e);return true}const o=te(e.nodeName);ye("uponSanitizeElement",e,{tagName:o,allowedTags:pt});if(e.hasChildNodes()&&!ge(e.firstElementChild)&&(!ge(e.content)||!ge(e.content.firstElementChild))&&_(/<[/\w]/g,e.innerHTML)&&_(/<[/\w]/g,e.textContent)){ue(e);return true}if(!pt[o]||_t[o]){if(!_t[o]&&we(o)){if(bt.tagNameCheck instanceof RegExp&&_(bt.tagNameCheck,o))return false;if(bt.tagNameCheck instanceof Function&&bt.tagNameCheck(o))return false}if(It&&!Pt[o]){const t=K(e)||e.parentNode;const i=V(e)||e.childNodes;if(i&&t){const n=i.length;for(let o=n-1;o>=0;--o){t.insertBefore(Y(i[o],true),W(e))}}}ue(e);return true}if(e instanceof v&&!fe(e)){ue(e);return true}if((o==="noscript"||o==="noembed"||o==="noframes")&&_(/<\/no(script|embed|frames)/i,e.innerHTML)){ue(e);return true}if(At&&e.nodeType===3){n=e.textContent;n=g(n,at," ");n=g(n,lt," ");n=g(n,st," ");if(e.textContent!==n){d(i.removed,{element:e.cloneNode()});e.textContent=n}}ye("afterSanitizeElements",e,null);return false};const _e=function t(e,i,n){if(Nt&&(i==="id"||i==="name")&&(n in a||n in ie)){return false}if(xt&&!wt[i]&&_(ct,i));else if(vt&&_(ft,i));else if(!gt[i]||wt[i]){if(we(e)&&(bt.tagNameCheck instanceof RegExp&&_(bt.tagNameCheck,e)||bt.tagNameCheck instanceof Function&&bt.tagNameCheck(e))&&(bt.attributeNameCheck instanceof RegExp&&_(bt.attributeNameCheck,i)||bt.attributeNameCheck instanceof Function&&bt.attributeNameCheck(i))||i==="is"&&bt.allowCustomizedBuiltInElements&&(bt.tagNameCheck instanceof RegExp&&_(bt.tagNameCheck,n)||bt.tagNameCheck instanceof Function&&bt.tagNameCheck(n)));else{return false}}else if(Ht[i]);else if(_(mt,g(n,dt,"")));else if((i==="src"||i==="xlink:href"||i==="href")&&e!=="script"&&y(n,"data:")===0&&Bt[e]);else if(kt&&!_(ut,g(n,dt,"")));else if(n){return false}else;return true};const we=function t(e){return e.indexOf("-")>0};const ve=function t(e){let n;let o;let r;let a;ye("beforeSanitizeAttributes",e,null);const{attributes:l}=e;if(!l){return}const s={attrName:"",attrValue:"",keepAttr:true,allowedAttributes:gt};a=l.length;while(a--){n=l[a];const{name:t,namespaceURI:c}=n;o=t==="value"?n.value:b(n.value);r=te(t);s.attrName=r;s.attrValue=o;s.keepAttr=true;s.forceKeepAttr=undefined;ye("uponSanitizeAttribute",e,s);o=s.attrValue;if(s.forceKeepAttr){continue}de(t,e);if(!s.keepAttr){continue}if(!Tt&&_(/\/>/i,o)){de(t,e);continue}if(At){o=g(o,at," ");o=g(o,lt," ");o=g(o,st," ")}const f=te(e.nodeName);if(!_e(f,r,o)){continue}if(zt&&(r==="id"||r==="name")){de(t,e);o=Mt+o}if(Q&&typeof B==="object"&&typeof B.getAttributeType==="function"){if(c);else{switch(B.getAttributeType(f,r)){case"TrustedHTML":{o=Q.createHTML(o);break}case"TrustedScriptURL":{o=Q.createScriptURL(o);break}}}}try{if(c){e.setAttributeNS(c,t,o)}else{e.setAttribute(t,o)}u(i.removed)}catch(t){}}ye("afterSanitizeAttributes",e,null)};const xe=function t(e){let i;const n=pe(e);ye("beforeSanitizeShadowDOM",e,null);while(i=n.nextNode()){ye("uponSanitizeShadowNode",i,null);if(be(i)){continue}if(i.content instanceof l){t(i.content)}ve(i)}ye("afterSanitizeShadowDOM",e,null)};i.sanitize=function(t){let e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};let o;let r;let a;let s;$t=!t;if($t){t="\x3c!--\x3e"}if(typeof t!=="string"&&!ge(t)){if(typeof t.toString==="function"){t=t.toString();if(typeof t!=="string"){throw w("dirty is not a string, aborting")}}else{throw w("toString is not a function")}}if(!i.isSupported){return t}if(!St){oe(e)}i.removed=[];if(typeof t==="string"){Ct=false}if(Ct){if(t.nodeName){const e=te(t.nodeName);if(!pt[e]||_t[e]){throw w("root node is forbidden and cannot be sanitized in-place")}}}else if(t instanceof c){o=me("\x3c!----\x3e");r=o.ownerDocument.importNode(t,true);if(r.nodeType===1&&r.nodeName==="BODY"){o=r}else if(r.nodeName==="HTML"){o=r}else{o.appendChild(r)}}else{if(!Dt&&!At&&!Et&&t.indexOf("<")===-1){return Q&&Ot?Q.createHTML(t):t}o=me(t);if(!o){return Dt?null:Ot?Z:""}}if(o&&Rt){ue(o.firstChild)}const f=pe(Ct?t:o);while(a=f.nextNode()){if(be(a)){continue}if(a.content instanceof l){xe(a.content)}ve(a)}if(Ct){return t}if(Dt){if(Lt){s=it.call(o.ownerDocument);while(o.firstChild){s.appendChild(o.firstChild)}}else{s=o}if(gt.shadowroot||gt.shadowrootmode){s=ot.call(n,s,true)}return s}let u=Et?o.outerHTML:o.innerHTML;if(Et&&pt["!doctype"]&&o.ownerDocument&&o.ownerDocument.doctype&&o.ownerDocument.doctype.name&&_(q,o.ownerDocument.doctype.name)){u="<!DOCTYPE "+o.ownerDocument.doctype.name+">\n"+u}if(At){u=g(u,at," ");u=g(u,lt," ");u=g(u,st," ")}return Q&&Ot?Q.createHTML(u):u};i.setConfig=function(t){oe(t);St=true};i.clearConfig=function(){ee=null;St=false};i.isValidAttribute=function(t,e,i){if(!ee){oe({})}const n=te(t);const o=te(e);return _e(n,o,i)};i.addHook=function(t,e){if(typeof e!=="function"){return}rt[t]=rt[t]||[];d(rt[t],e)};i.removeHook=function(t){if(rt[t]){return u(rt[t])}};i.removeHooks=function(t){if(rt[t]){rt[t]=[]}};i.removeAllHooks=function(){rt={}};return i}var V=J();return V}))}));const a={CUSTOM_ELEMENT_HANDLING:{tagNameCheck:/^ld-/}};const l=(t,e)=>r.sanitize(t,Object.assign(Object.assign({},a),typeof e==="string"?JSON.parse(e):e||{}));const s=":host{--ld-notification-min-height:var(--ld-sp-40);--ld-notification-border-radius:var(--ld-br-m);--ld-notification-inset-y:var(--ld-sp-32);--ld-notification-col:var(--ld-col-wht);--ld-notification-warn-col:var(--ld-col-neutral-900);--ld-notification-alert-col:var(--ld-col-wht);--ld-notification-bg-col:var(--ld-thm-primary);--ld-notification-warn-bg-col:var(--ld-thm-warning);--ld-notification-alert-bg-col:var(--ld-thm-error);display:flex;font:var(--ld-typo-body-m);inset:0;justify-content:center;min-width:20rem;pointer-events:none;position:fixed;z-index:2147483647}@keyframes ld-notification-fade-in{0%{opacity:0}to{opacity:1}}@keyframes ld-notification-fade-out{0%{opacity:1;transform:none}to{opacity:0;transform:none}}.ld-notification__item{border-radius:var(--ld-notification-border-radius);box-shadow:var(--ld-shadow-sticky);display:flex;justify-content:space-between;max-height:80vh;max-width:calc(90% - 1rem);min-height:var(--ld-notification-min-height);min-width:19rem;overflow-y:auto;pointer-events:auto;position:absolute;transform-origin:center;transition:transform var(--ld-transition-duration-normal) ease,opacity var(--ld-transition-duration-normal) linear;width:-moz-fit-content;width:fit-content}.ld-notification__item:where(:not(.ld-notification__item--dismissed)){animation:ld-notification-fade-in var(--ld-transition-duration-normal) linear}.ld-notification__item:nth-last-of-type(n+2) .ld-notification__btn-dismiss,.ld-notification__item:nth-last-of-type(n+2) .ld-notification__item-content,.ld-notification__item:nth-last-of-type(n+5){opacity:0}.ld-notification__item:nth-last-of-type(2){opacity:.75}.ld-notification__item:nth-last-of-type(3){opacity:.5}.ld-notification__item:nth-last-of-type(4){opacity:.25}.ld-notification__item.ld-notification__item--dismissed{animation:ld-notification-fade-out var(--ld-transition-duration-normal) linear forwards;opacity:0}:host(.ld-notification--bottom) .ld-notification__item{bottom:var(--ld-notification-inset-y)}:host(.ld-notification--bottom) .ld-notification__item:nth-last-of-type(2){transform:scale(.975) translateY(25%)}:host(.ld-notification--bottom) .ld-notification__item:nth-last-of-type(3){transform:scale(.95) translateY(50%)}:host(.ld-notification--bottom) .ld-notification__item:nth-last-of-type(4){transform:scale(.925) translateY(75%)}:host(.ld-notification--top) .ld-notification__item{top:var(--ld-notification-inset-y)}:host(.ld-notification--top) .ld-notification__item:nth-last-of-type(2){transform:scale(.975) translateY(-25%)}:host(.ld-notification--top) .ld-notification__item:nth-last-of-type(3){transform:scale(.95) translateY(-50%)}:host(.ld-notification--top) .ld-notification__item:nth-last-of-type(4){transform:scale(.925) translateY(-75%)}.ld-notification__item--info{background-color:var(--ld-notification-bg-col);color:var(--ld-notification-col)}.ld-notification__item--warn{background-color:var(--ld-notification-warn-bg-col);color:var(--ld-notification-warn-col)}.ld-notification__item--alert{background-color:var(--ld-notification-alert-bg-col);color:var(--ld-notification-alert-col)}.ld-notification__btn-dismiss,.ld-notification__item-content{transition:opacity var(--ld-transition-duration-normal) linear}.ld-notification__item-content{align-items:baseline;display:grid;gap:var(--ld-sp-12);grid-auto-flow:column;padding:var(--ld-sp-6) var(--ld-sp-12)}.ld-notification__item-content>*{align-self:center}.ld-notification__btn-dismiss{-webkit-touch-callout:none;align-self:center;background-color:initial;border:0;border-radius:var(--ld-br-full);color:inherit;cursor:pointer;display:inline-grid;flex-shrink:0;height:var(--ld-sp-40);margin-left:var(--ld-sp-16);padding:0;place-items:center;touch-action:manipulation;-webkit-user-select:none;user-select:none;width:var(--ld-sp-40)}";const c=6e3;const f=200;const u=class{constructor(e){t(this,e);this.placement="top";this.sanitizeConfig=undefined;this.queue=[];this.queueDismissed=[];this.dismissTimeout=undefined;this.fadeoutTimeouts=[];this.currentNotification=undefined}updateDismissTimeout(){clearTimeout(this.dismissTimeout);if(!this.currentNotification)return;if(this.currentNotification.type==="alert"&&!this.currentNotification.timeout){return}if(this.currentNotification.timeout===0)return;this.dismissTimeout=setTimeout((()=>{this.handleNotificationDismiss()}),this.currentNotification.timeout||c)}handleNotification(t){t.stopImmediatePropagation();const e=t.detail;const i=this.queue.some((t=>t.content===e.content&&t.type===e.type));if(i)return;if(e.type==="alert"){this.queue=[...this.queue,e];this.currentNotification=e;return}const n=this.queue.findIndex((t=>t.type==="alert"));if(n===-1){this.queue=[...this.queue,e];this.currentNotification=e;return}this.queue.splice(n,0,e);this.queue=[...this.queue]}handleNotificationDismiss(){if(!this.currentNotification)return;this.queueDismissed.unshift(this.queue.pop());this.queueDismissed=[...this.queueDismissed];this.queue=[...this.queue];this.currentNotification=this.queue[this.queue.length-1];this.fadeoutTimeouts.push(setTimeout((()=>{this.queueDismissed=this.queueDismissed.slice(0,-1)}),f))}handleNotificationClear(){this.queueDismissed=[...this.queue];this.queue=[];this.currentNotification=undefined;this.fadeoutTimeouts.forEach(clearTimeout);this.fadeoutTimeouts.push(setTimeout((()=>{this.queueDismissed=[]}),f))}renderNotification(t,i=false){let n=`ld-notification__item ld-notification__item--${t.type||"info"}`;if(i)n+=" ld-notification__item--dismissed";return e("div",{class:n,key:t.type+t.content,part:"item"},e("div",{class:"ld-notification__item-content",innerHTML:l(t.content,this.sanitizeConfig),role:t.type==="alert"?"alert":"status",part:"content"}),e("button",{class:"ld-notification__btn-dismiss",onClick:i?undefined:this.handleNotificationDismiss.bind(this),part:"btn-dismiss focusable"},e("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",part:"btn-dismiss-icon"},e("title",null,"Dismiss"),e("path",{d:"M6 6L18 18",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round"}),e("path",{d:"M6 18L18 6",stroke:"currentColor","stroke-width":"3","stroke-linecap":"round","stroke-linejoin":"round"}))))}disconnectedCallback(){clearTimeout(this.dismissTimeout);this.fadeoutTimeouts.forEach(clearTimeout)}render(){const t=`ld-notification ld-notification--${this.placement}`;return e(i,{class:t,role:"region","aria-label":"Notifications"},this.queue.map((t=>this.renderNotification.call(this,t))),this.queueDismissed.map((t=>this.renderNotification.call(this,t,true))))}static get watchers(){return{currentNotification:["updateDismissTimeout"]}}};u.style=s;export{u as ld_notification};
//# sourceMappingURL=p-4a66596f.entry.js.map