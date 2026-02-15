/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",b=u.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!r(t,e),f={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:x};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??f}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=h(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...l(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=a.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const o=this.constructor;if(!1===s&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??x)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[v("elementProperties")]=new Map,w[v("finalized")]=new Map,b?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,k=t=>t,_=$.trustedTypes,C=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+A,z=`<${E}>`,P=document,I=()=>P.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,j="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,M=/>/g,O=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,U=/"/g,q=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),Q=new WeakMap,W=P.createTreeWalker(P,129);function V(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let a,o=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let r,c,d=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===N?"!--"===c[1]?n=T:void 0!==c[1]?n=M:void 0!==c[2]?(q.test(c[2])&&(a=RegExp("</"+c[2],"g")),n=O):void 0!==c[3]&&(n=O):n===O?">"===c[0]?(n=a??N,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,r=c[1],n=void 0===c[3]?O:'"'===c[3]?U:R):n===U||n===R?n=O:n===T||n===M?n=N:(n=O,a=void 0);const p=n===O&&t[e+1].startsWith("/>")?" ":"";o+=n===N?i+z:d>=0?(s.push(r),i.slice(0,d)+S+i.slice(d)+A+p):i+A+(-2===d?e:p)}return[V(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,o=0;const n=t.length-1,r=this.parts,[c,d]=Y(t,e);if(this.el=X.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[o++],i=s.getAttribute(t).split(A),n=/([.?@])?(.*)/.exec(e);r.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:K}),s.removeAttribute(t)}else t.startsWith(A)&&(r.push({type:6,index:a}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],I()),W.nextNode(),r.push({type:2,index:++a});s.append(t[e],I())}}}else if(8===s.nodeType)if(s.data===E)r.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)r.push({type:7,index:a}),t+=A.length-1}a++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===B)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=L(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=J(t,a._$AS(t,e.values),a,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);W.currentNode=s;let a=W.nextNode(),o=0,n=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new Z(a,a.nextSibling,this,t):1===r.type?e=new r.ctor(a,r.name,r.strings,this,t):6===r.type&&(e=new st(a,this,t)),this._$AV.push(e),r=i[++n]}o!==r?.index&&(a=W.nextNode(),o++)}return W.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),L(t)?t===H||null==t||""===t?(this._$AH!==H&&this._$AR(),this._$AH=H):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==H&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new X(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new Z(this.O(I()),this.O(I()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class K{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=H,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}_$AI(t,e=this,i,s){const a=this.strings;let o=!1;if(void 0===a)t=J(this,t,e,0),o=!L(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let n,r;for(t=a[0],n=0;n<a.length-1;n++)r=J(this,s[i+n],e,n),r===B&&(r=this._$AH[n]),o||=!L(r)||r!==this._$AH[n],r===H?t=H:t!==H&&(t+=(r??"")+a[n+1]),this._$AH[n]=r}o&&!s&&this.j(t)}j(t){t===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===H?void 0:t}}class et extends K{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==H)}}class it extends K{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??H)===B)return;const i=this._$AH,s=t===H&&i!==H||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==H&&(i===H||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const at=$.litHtmlPolyfillSupport;at?.(X,Z),($.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new Z(e.insertBefore(I(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const rt=ot.litElementPolyfillSupport;rt?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");class ct{constructor(t){this.hass=t}async getLists(){return await this.hass.callWS({type:"shopping_list_manager/lists/get_all"})}async createList(t,e="mdi:cart"){return await this.hass.callWS({type:"shopping_list_manager/lists/create",name:t,icon:e})}async updateList(t,e){return await this.hass.callWS({type:"shopping_list_manager/lists/update",list_id:t,...e})}async deleteList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/delete",list_id:t})}async setActiveList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/set_active",list_id:t})}async getItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/get",list_id:t})}async addItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/add",list_id:t,...e})}async updateItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/update",item_id:t,...e})}async checkItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/check",item_id:t,checked:e})}async deleteItem(t){return await this.hass.callWS({type:"shopping_list_manager/items/delete",item_id:t})}async bulkCheckItems(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/bulk_check",item_ids:t,checked:e})}async clearCheckedItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/clear_checked",list_id:t})}async getListTotal(t){return await this.hass.callWS({type:"shopping_list_manager/items/get_total",list_id:t})}async searchProducts(t,e={}){return await this.hass.callWS({type:"shopping_list_manager/products/search",query:t,limit:e.limit||20,exclude_allergens:e.excludeAllergens,include_tags:e.includeTags,substitution_group:e.substitutionGroup})}async getProductSuggestions(t=20){return await this.hass.callWS({type:"shopping_list_manager/products/suggestions",limit:t})}async getProductSubstitutes(t,e=5){return await this.hass.callWS({type:"shopping_list_manager/products/substitutes",product_id:t,limit:e})}async addProduct(t){return await this.hass.callWS({type:"shopping_list_manager/products/add",...t})}async updateProduct(t,e){return await this.hass.callWS({type:"shopping_list_manager/products/update",product_id:t,...e})}async getCategories(){return await this.hass.callWS({type:"shopping_list_manager/categories/get_all"})}}class dt extends nt{static properties={currentView:{type:String}};handleNavClick(t){this.dispatchEvent(new CustomEvent("nav-changed",{detail:{view:t},bubbles:!0,composed:!0}))}render(){return F`
      <nav class="bottom-nav">
        <button
          class="nav-item ${"shopping"===this.currentView?"active":""}"
          @click=${()=>this.handleNavClick("shopping")}
        >
          <span class="emoji">🛒</span>
          <span class="label">Shopping</span>
        </button>

        <button
          class="nav-item ${"lists"===this.currentView?"active":""}"
          @click=${()=>this.handleNavClick("lists")}
        >
          <span class="emoji">📋</span>
          <span class="label">Lists</span>
        </button>

        <button
          class="nav-item ${"loyalty"===this.currentView?"active":""}"
          @click=${()=>this.handleNavClick("loyalty")}
        >
          <span class="emoji">💳</span>
          <span class="label">Loyalty</span>
        </button>

        <button
          class="nav-item ${"settings"===this.currentView?"active":""}"
          @click=${()=>this.handleNavClick("settings")}
        >
          <span class="emoji">⚙️</span>
          <span class="label">Settings</span>
        </button>
      </nav>
    `}static styles=o`
    .bottom-nav {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      background: white;
      border-top: 1px solid var(--border-color, #e8eaf6);
      padding: 6px 0;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
      z-index: 100;
    }
    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      padding: 6px;
      border: none;
      background: transparent;
      color: var(--text-secondary, #757575);
      cursor: pointer;
      transition: color 0.2s;
      -webkit-tap-highlight-color: transparent;
      outline: none;
    }
    .nav-item.active {
      color: var(--primary-pastel, #9fa8da);
    }
    .emoji {
      font-size: 22px;
    }
    .label {
      font-size: 11px;
      font-weight: 500;
    }
  `}customElements.define("slm-bottom-nav",dt);class lt extends nt{static properties={activeList:{type:Object},itemCount:{type:Number}};handleBack(){this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}handleShare(){this.dispatchEvent(new CustomEvent("share",{bubbles:!0,composed:!0}))}handleMenu(){alert("List menu coming soon")}render(){return F`
      <div class="header">
        <button class="back-btn" @click=${this.handleBack}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>
        
        <h2>${this.activeList?.name||"Shopping List"}</h2>
        
        <div class="header-actions">
          <button class="action-btn" @click=${this.handleShare}>
            <ha-icon icon="mdi:account-plus-outline"></ha-icon>
          </button>
          <button class="action-btn" @click=${this.handleMenu}>
            <ha-icon icon="mdi:dots-vertical"></ha-icon>
          </button>
        </div>
      </div>
    `}static styles=o`
    .header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      background: var(--card-background-color);
      border-bottom: 1px solid var(--divider-color);
      z-index: 100;
      min-height: 40px;
      max-height: 40px;
    }
    .back-btn,
    .action-btn {
      background: none;
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      color: var(--primary-text-color);
      -webkit-tap-highlight-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .back-btn:active,
    .action-btn:active {
      opacity: 0.6;
    }
    ha-icon {
      --mdc-icon-size: 24px;
    }
    h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
      flex: 1;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 8px;
    }
    .header-actions {
      display: flex;
      gap: 4px;
    }
  `}customElements.define("slm-list-header",lt);class pt extends nt{static properties={api:{type:Object},settings:{type:Object},categories:{type:Array},activeListId:{type:String},searchQuery:{type:String},searchResults:{type:Array},recentProducts:{type:Array},showResults:{type:Boolean}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.recentProducts=[],this.showResults=!1}async firstUpdated(){await this.loadRecentProducts()}async loadRecentProducts(){const t=localStorage.getItem("slm_recent_products"),e=t?JSON.parse(t):[],i=this.settings?.recentProductsCount||8;this.recentProducts=e.slice(0,i)}async handleSearch(t){if(this.searchQuery=t.target.value,this.searchQuery.length<1)this.showResults=!1;else{if(this.searchQuery.length>=2){const t=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=t.products||[]}else this.searchResults=[];this.showResults=!0}}handleProductSelect(t){this.dispatchEvent(new CustomEvent("add-item",{detail:{name:t.name,category_id:t.category_id,product_id:t.id,quantity:1,unit:t.default_unit,price:t.price,image_url:t.image_url},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1,this.shadowRoot.querySelector("input").blur()}handleAddCustom(){this.searchQuery.trim()&&(this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.searchQuery.trim(),category_id:"other",quantity:1,unit:"units"},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1)}render(){return F`
      <div class="search-container">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search or add products..."
            .value=${this.searchQuery}
            @input=${this.handleSearch}
            @focus=${()=>this.showResults=this.searchQuery.length>0}
          />
          ${this.searchQuery?F`
            <button class="clear-btn" @click=${()=>{this.searchQuery="",this.showResults=!1}}>
              ✖
            </button>
          `:""}
        </div>

        ${this.showResults?F`
          <div class="results-dropdown">
            ${this.searchResults.length>0?F`
              ${this.searchResults.map(t=>F`
                <button class="result-item" @click=${()=>this.handleProductSelect(t)}>
                  ${t.image_url?F`
                    <img src="${t.image_url}" alt="${t.name}">
                  `:F`
                    <div class="no-image">📦</div>
                  `}
                  <div class="result-info">
                    <div class="result-name">${t.name}</div>
                    ${t.price?F`
                      <div class="result-price">$${t.price.toFixed(2)}</div>
                    `:""}
                  </div>
                  <span class="add-icon">➕</span>
                </button>
              `)}
            `:F`
              <button class="result-item add-custom" @click=${this.handleAddCustom}>
                <div class="no-image">📝</div>
                <div class="result-info">
                  <div class="result-name">Add "${this.searchQuery}"</div>
                  <div class="result-subtitle">as custom product</div>
                </div>
                <span class="add-icon">➕</span>
              </button>
            `}
          </div>
        `:""}
      </div>
    `}static styles=o`
    .search-container {
      padding: 8px;
      position: relative;
      background: var(--card-background-color);
      z-index: 50;
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--primary-background-color);
      border-radius: 12px;
      border: 1px solid var(--divider-color);
    }
    .search-icon {
      font-size: 16px;
      opacity: 0.6;
    }
    input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 15px;
      color: var(--primary-text-color);
    }
    input::placeholder {
      color: var(--secondary-text-color);
    }
    .clear-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 14px;
      opacity: 0.5;
      -webkit-tap-highlight-color: transparent;
    }
    .results-dropdown {
      position: absolute;
      top: calc(100% - 4px);
      left: 8px;
      right: 8px;
      background: var(--card-background-color);
      border-radius: 0 0 12px 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      max-height: 400px;
      overflow-y: auto;
      z-index: 100;
      border: 1px solid var(--divider-color);
      border-top: none;
    }
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      width: 100%;
      border: none;
      background: transparent;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .result-item:last-child {
      border-bottom: none;
    }
    .result-item:active {
      background: var(--secondary-background-color);
    }
    .result-item img,
    .no-image {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--secondary-background-color);
      font-size: 20px;
    }
    .result-info {
      flex: 1;
    }
    .result-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--primary-text-color);
      margin-bottom: 2px;
    }
    .result-price {
      font-size: 13px;
      color: var(--primary-color);
      font-weight: 600;
    }
    .result-subtitle {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .add-icon {
      font-size: 20px;
      color: var(--primary-color);
    }
  `}customElements.define("slm-search-bar",pt);class ht extends nt{static properties={item:{type:Object},categoryColor:{type:String},isRecentlyUsed:{type:Boolean},touchStartX:{type:Number},touchStartY:{type:Number},touchStartTime:{type:Number},longPressTimer:{type:Number},longPressTriggered:{type:Boolean}};constructor(){super(),this.isRecentlyUsed=!1,this.touchStartX=0,this.touchStartY=0,this.touchStartTime=0,this.longPressTimer=null,this.longPressTriggered=!1}handleTileClick(t){this.longPressTriggered?this.longPressTriggered=!1:t.target.closest(".decrease-btn")||t.target.closest(".quantity-badge")||this.dispatchEvent(new CustomEvent("item-check",{detail:{itemId:this.item.id,checked:!this.item.checked},bubbles:!0,composed:!0}))}handleDecrease(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleQuantityClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleContextMenu(t){return t.preventDefault(),t.stopPropagation(),!1}handleTouchStart(t){this.touchStartX=t.touches[0].clientX,this.touchStartY=t.touches[0].clientY,this.touchStartTime=Date.now(),this.longPressTriggered=!1,this.longPressTimer=setTimeout(()=>{this.longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:this.item},bubbles:!0,composed:!0}))},500)}handleTouchMove(t){if(this.longPressTimer){const e=t.touches[0].clientX,i=t.touches[0].clientY,s=Math.abs(e-this.touchStartX),a=Math.abs(i-this.touchStartY);(s>10||a>10)&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}}handleTouchEnd(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}handleMouseDown(t){if(2===t.button)return t.preventDefault(),!1;this.longPressTriggered=!1,this.longPressTimer=setTimeout(()=>{this.longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:this.item},bubbles:!0,composed:!0}))},500)}handleMouseUp(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}handleMouseLeave(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}firstUpdated(){const t=this.shadowRoot.querySelector(".tile");t&&(t.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!0}),t.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!0}),t.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!0}),t.addEventListener("contextmenu",this.handleContextMenu.bind(this)))}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}render(){return F`
      <div 
        class="tile ${this.item.checked?"checked":""} ${this.isRecentlyUsed?"recently-used":""}"
        @click=${this.handleTileClick}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseLeave}
      >
        ${this.item.checked?"":F`
          <button class="decrease-btn" @click=${this.handleDecrease}>
            <span>−</span>
          </button>
        `}

        ${this.item.checked?"":F`
          <div 
            class="quantity-badge" 
            style="background: ${this.categoryColor}"
            @click=${this.handleQuantityClick}
          >
            ${this.item.quantity}
          </div>
        `}

        ${this.item.image_url?F`
          <img src="${this.item.image_url}" alt="${this.item.name}">
        `:F`
          <div class="no-image" style="background: ${this.categoryColor}15">
            <div class="emoji">${this.getCategoryEmoji(this.item.category_id)}</div>
          </div>
        `}

        <div class="info">
          <div class="name">${this.item.name}</div>
          ${this.item.price?F`
            <div class="price">$${(this.item.price*this.item.quantity).toFixed(2)}</div>
          `:""}
        </div>

        ${this.item.checked?F`
          <div class="checked-overlay">
            <span class="check-icon">✓</span>
          </div>
        `:""}
      </div>
    `}static styles=o`
    .tile {
      position: relative;
      background: #1a1a1a;
      border-radius: 8px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      cursor: pointer;
      transition: all 0.15s;
      user-select: none;
      aspect-ratio: 1;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    .tile:active {
      transform: scale(0.97);
    }
    .tile.recently-used {
      opacity: 0.6;
    }
    .tile.checked {
      opacity: 0.4;
    }
    .decrease-btn {
      position: absolute;
      top: 6px;
      left: 6px;
      background: #8b4545;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      z-index: 2;
      padding: 0;
      font-size: 18px;
      font-weight: 300;
    }
    .quantity-badge {
      position: absolute;
      top: 6px;
      right: 6px;
      color: white;
      padding: 3px 8px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 700;
      z-index: 2;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      cursor: pointer;
    }
    .quantity-badge:hover {
      transform: scale(1.05);
    }
    img, .no-image {
      width: 100%;
      flex: 1;
      border-radius: 6px;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .emoji {
      font-size: 40px;
    }
    .info {
      flex-shrink: 0;
    }
    .name {
      font-weight: 600;
      font-size: 12px;
      line-height: 1.2;
      margin-bottom: 2px;
      color: #e0e0e0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
      font-size: 11px;
      color: #9fa8da;
      font-weight: 700;
    }
    .checked-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(159, 168, 218, 0.9);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .check-icon {
      font-size: 40px;
      color: white;
    }
  `}customElements.define("slm-item-tile",ht);class ut extends nt{static properties={items:{type:Array},categories:{type:Array},settings:{type:Object}};groupItemsByCategory(){const t={};return this.categories.forEach(e=>{t[e.id]={category:e,items:this.items.filter(t=>t.category_id===e.id&&!t.checked)}}),Object.values(t).filter(t=>t.items.length>0)}getRecentlyUsedItems(){const t=localStorage.getItem("slm_recent_products"),e=t?JSON.parse(t):[],i=this.settings?.recentProductsCount||8,s=this.items.map(t=>t.product_id);return e.filter(t=>!s.includes(t)).slice(0,i),[]}render(){const t=this.groupItemsByCategory(),e=this.getRecentlyUsedItems(),i=this.settings?.tilesPerRow||3;return F`
      <style>
        .items-grid {
          grid-template-columns: repeat(${i}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${e.length>0?F`
          <div class="category-section">
            <div class="category-header">
              <span class="emoji">⏱️</span>
              <span class="category-name">Recently Used</span>
            </div>
            <div class="items-grid">
              ${e.map(t=>F`
                <slm-item-tile
                  .item=${t}
                  .categoryColor=${"#b0bec5"}
                  .isRecentlyUsed=${!0}
                  @item-click=${this.handleItemClick}
                  @item-decrease=${this.handleItemDecrease}
                  @item-check=${this.handleItemCheck}
                  @item-long-press=${this.handleItemLongPress}
                  @item-swipe-delete=${this.handleItemSwipeDelete}
                ></slm-item-tile>
              `)}
            </div>
          </div>
        `:""}

        ${0===t.length&&0===e.length?F`
          <div class="empty">
            <div class="empty-emoji">🛒</div>
            <p>Your shopping list is empty</p>
            <p class="hint">Search for products to add items</p>
          </div>
        `:""}

        ${t.map(t=>F`
          <div class="category-section">
            <div class="category-header">
              <span class="emoji">${this.getCategoryEmoji(t.category.id)}</span>
              <span class="category-name">${t.category.name}</span>
            </div>
            <div class="items-grid">
              ${t.items.map(e=>F`
                <slm-item-tile
                  .item=${e}
                  .categoryColor=${this.getPastelColor(t.category.color)}
                  @item-click=${this.handleItemClick}
                  @item-decrease=${this.handleItemDecrease}
                  @item-check=${this.handleItemCheck}
                  @item-long-press=${this.handleItemLongPress}
                  @item-swipe-delete=${this.handleItemSwipeDelete}
                ></slm-item-tile>
              `)}
            </div>
          </div>
        `)}
      </div>
    `}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}getPastelColor(t){return{"#4CAF50":"#a5d6a7","#2196F3":"#90caf9","#F44336":"#ef9a9a","#FF9800":"#ffcc80","#9C27B0":"#ce93d8","#795548":"#bcaaa4","#607D8B":"#b0bec5"}[t]||t}handleItemClick(t){this.dispatchEvent(new CustomEvent("item-click",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemDecrease(t){this.dispatchEvent(new CustomEvent("item-decrease",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemCheck(t){this.dispatchEvent(new CustomEvent("item-check",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemLongPress(t){this.dispatchEvent(new CustomEvent("item-long-press",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemSwipeDelete(t){this.dispatchEvent(new CustomEvent("item-swipe-delete",{detail:t.detail,bubbles:!0,composed:!0}))}static styles=o`
    .grid-container {
      padding: 4px;
    }
    .category-section {
      margin-bottom: 16px;
    }
    .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 4px;
      font-weight: 600;
      font-size: 14px;
      color: var(--text-secondary, #757575);
    }
    .emoji {
      font-size: 20px;
    }
    .category-name {
      flex: 1;
    }
    .items-grid {
      display: grid;
      gap: 4px;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--text-secondary, #757575);
    }
    .empty-emoji {
      font-size: 80px;
      margin-bottom: 16px;
      opacity: 0.3;
    }
    .empty p {
      margin: 8px 0;
    }
    .hint {
      font-size: 14px;
      opacity: 0.7;
    }
  `}customElements.define("slm-item-grid",ut);class gt extends nt{static properties={api:{type:Object},categories:{type:Array},searchQuery:{type:String},searchResults:{type:Array},selectedProduct:{type:Object},quantity:{type:Number},customName:{type:String}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.selectedProduct=null,this.quantity=1,this.customName=""}async handleSearch(t){if(this.searchQuery=t.target.value,this.searchQuery.length<2)return void(this.searchResults=[]);const e=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=e.products}selectProduct(t){this.selectedProduct=t,this.quantity=t.default_quantity,this.searchQuery="",this.searchResults=[]}handleAdd(){this.selectedProduct?this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.selectedProduct.name,category_id:this.selectedProduct.category_id,product_id:this.selectedProduct.id,quantity:this.quantity,unit:this.selectedProduct.default_unit,price:this.selectedProduct.price,image_url:this.selectedProduct.image_url},bubbles:!0,composed:!0})):this.customName&&this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.customName,category_id:"other",quantity:this.quantity,unit:"units"},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return F`
      <div class="overlay" @click=${this.handleClose}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-header">
            <h3>Add Item</h3>
            <button class="close-btn" @click=${this.handleClose}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="dialog-content">
            ${this.selectedProduct?F`
              <div class="selected-product">
                ${this.selectedProduct.image_url?F`
                  <img src="${this.selectedProduct.image_url}" alt="${this.selectedProduct.name}">
                `:""}
                <h4>${this.selectedProduct.name}</h4>

                <div class="quantity-control">
                  <button @click=${()=>this.quantity=Math.max(1,this.quantity-1)}>
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </button>
                  <span>${this.quantity} ${this.selectedProduct.default_unit}</span>
                  <button @click=${()=>this.quantity++}>
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </button>
                </div>

                ${this.selectedProduct.price?F`
                  <div class="total-price">
                    Total: $${(this.selectedProduct.price*this.quantity).toFixed(2)}
                  </div>
                `:""}
              </div>
            `:F`
              <div class="search-section">
                <input
                  type="text"
                  placeholder="Search products..."
                  .value=${this.searchQuery}
                  @input=${this.handleSearch}
                  autofocus
                />

                ${this.searchResults.length>0?F`
                  <div class="results">
                    ${this.searchResults.map(t=>F`
                      <div class="result-item" @click=${()=>this.selectProduct(t)}>
                        ${t.image_url?F`
                          <img src="${t.image_url}" alt="${t.name}">
                        `:F`
                          <div class="no-image">
                            <ha-icon icon="mdi:food-variant"></ha-icon>
                          </div>
                        `}
                        <div class="result-info">
                          <div class="result-name">${t.name}</div>
                          ${t.price?F`
                            <div class="result-price">$${t.price.toFixed(2)}</div>
                          `:""}
                        </div>
                      </div>
                    `)}
                  </div>
                `:""}

                <div class="divider">OR</div>

                <input
                  type="text"
                  placeholder="Add custom item..."
                  .value=${this.customName}
                  @input=${t=>this.customName=t.target.value}
                />
              </div>
            `}
          </div>

          <div class="dialog-footer">
            <button class="cancel-btn" @click=${this.handleClose}>Cancel</button>
            <button 
              class="add-btn" 
              @click=${this.handleAdd}
              ?disabled=${!this.selectedProduct&&!this.customName}
            >
              Add to List
            </button>
          </div>
        </div>
      </div>
    `}static styles=o`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: flex-end;
      z-index: 1000;
      animation: fadeIn 0.2s;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .dialog {
      width: 100%;
      max-height: 80vh;
      background: var(--card-background-color);
      border-radius: 16px 16px 0 0;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    .close-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .dialog-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
    .search-section input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid var(--divider-color);
      border-radius: 12px;
      font-size: 16px;
      margin-bottom: 16px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .results {
      max-height: 300px;
      overflow-y: auto;
      margin-bottom: 16px;
    }
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      cursor: pointer;
      border-radius: 8px;
      transition: background 0.2s;
    }
    .result-item:hover {
      background: var(--primary-color);
      color: white;
    }
    .result-item img,
    .no-image {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--disabled-color);
    }
    .result-info {
      flex: 1;
    }
    .result-name {
      font-weight: 500;
    }
    .result-price {
      font-size: 14px;
      color: var(--primary-color);
      font-weight: 600;
    }
    .divider {
      text-align: center;
      color: var(--secondary-text-color);
      margin: 16px 0;
      font-size: 14px;
    }
    .selected-product {
      text-align: center;
    }
    .selected-product img {
      width: 120px;
      height: 120px;
      border-radius: 16px;
      margin: 0 auto 16px;
      object-fit: cover;
    }
    .selected-product h4 {
      margin: 0 0 24px;
      font-size: 18px;
    }
    .quantity-control {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
    }
    .quantity-control button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .quantity-control span {
      font-size: 18px;
      font-weight: 600;
      min-width: 100px;
    }
    .total-price {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-color);
    }
    .dialog-footer {
      display: flex;
      gap: 12px;
      padding: 16px 20px;
      border-top: 1px solid var(--divider-color);
    }
    .cancel-btn,
    .add-btn {
      flex: 1;
      padding: 12px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .cancel-btn {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
    .add-btn {
      background: var(--primary-color);
      color: white;
    }
    .add-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}customElements.define("slm-add-item-dialog",gt);class mt extends nt{static properties={api:{type:Object},item:{type:Object},categories:{type:Array},editedItem:{type:Object}};constructor(){super(),this.editedItem={}}updated(t){t.has("item")&&this.item&&(this.editedItem={name:this.item.name,quantity:this.item.quantity,unit:this.item.unit,notes:this.item.notes||""})}handleSave(){this.dispatchEvent(new CustomEvent("save-item",{detail:{itemId:this.item.id,data:this.editedItem},bubbles:!0,composed:!0}))}handleDelete(){confirm(`Delete ${this.item.name}?`)&&this.dispatchEvent(new CustomEvent("delete-item",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleDuplicate(){alert("Duplicate feature coming soon")}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return this.item?F`
      <div class="overlay" @click=${this.handleClose}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-header">
            <h3>Edit Item</h3>
            <button class="close-btn" @click=${this.handleClose}>
              <span class="emoji">✖️</span>
            </button>
          </div>

          <div class="dialog-content">
            <div class="form-group">
              <label>Product Name</label>
              <input
                type="text"
                .value=${this.editedItem.name||""}
                @input=${t=>this.editedItem={...this.editedItem,name:t.target.value}}
              />
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  .value=${this.editedItem.quantity||1}
                  @input=${t=>this.editedItem={...this.editedItem,quantity:parseInt(t.target.value)||1}}
                />
              </div>

              <div class="form-group half">
                <label>Unit</label>
                <input
                  type="text"
                  .value=${this.editedItem.unit||""}
                  @input=${t=>this.editedItem={...this.editedItem,unit:t.target.value}}
                />
              </div>
            </div>

            ${this.item.price?F`
              <div class="price-info">
                <span>Total:</span>
                <span class="price-value">$${(this.item.price*(this.editedItem.quantity||1)).toFixed(2)}</span>
              </div>
            `:""}

            <div class="form-group">
              <label>Notes</label>
              <textarea
                placeholder="Add notes (optional)..."
                .value=${this.editedItem.notes||""}
                @input=${t=>this.editedItem={...this.editedItem,notes:t.target.value}}
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="dialog-footer">
            <button class="action-btn secondary" @click=${this.handleDuplicate}>
              Duplicate
            </button>
            <button class="action-btn danger" @click=${this.handleDelete}>
              Delete
            </button>
            <button class="action-btn primary" @click=${this.handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    `:F``}static styles=o`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: flex-end;
      z-index: 1000;
      animation: fadeIn 0.2s;
    }
    .dialog {
      width: 95%;
      max-width: 500px;
      margin: 0 auto;
      background: white;
      border-radius: 16px 16px 0 0;
      display: flex;
      flex-direction: column;
      max-height: 85vh;
      animation: slideUp 0.3s;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--border-color, #e8eaf6);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary, #424242);
    }
    .close-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 18px;
    }
    .dialog-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }
    .form-group {
      margin-bottom: 16px;
    }
    .form-row {
      display: flex;
      gap: 12px;
    }
    .form-group.half {
      flex: 1;
    }
    .form-group label {
      display: block;
      margin-bottom: 6px;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-secondary, #757575);
    }
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 10px;
      border: 2px solid var(--border-color, #e8eaf6);
      border-radius: 8px;
      font-size: 15px;
      font-family: inherit;
      color: var(--text-primary, #424242);
      background: white;
    }
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary-pastel, #9fa8da);
    }
    .form-group textarea {
      resize: vertical;
    }
    .price-info {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: var(--surface-pastel, #fafbfc);
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 15px;
    }
    .price-value {
      font-weight: 700;
      color: var(--primary-pastel, #9fa8da);
    }
    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--border-color, #e8eaf6);
    }
    .action-btn {
      flex: 1;
      padding: 12px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
    }
    .action-btn.primary {
      background: linear-gradient(135deg, #9fa8da 0%, #c5cae9 100%);
      color: white;
    }
    .action-btn.secondary {
      background: var(--surface-pastel, #fafbfc);
      color: var(--text-primary, #424242);
    }
    .action-btn.danger {
      background: #ef9a9a;
      color: white;
    }
    .action-btn:active {
      transform: scale(0.97);
    }
  `}customElements.define("slm-edit-item-dialog",mt);class bt extends nt{static properties={list:{type:Object},isActive:{type:Boolean},itemCount:{type:Number},totalCost:{type:Number},currency:{type:String},emoji:{type:String},showMenu:{type:Boolean},menuX:{type:Number},menuY:{type:Number}};constructor(){super(),this.showMenu=!1,this.itemCount=0,this.totalCost=0,this.currency="NZD",this.menuX=0,this.menuY=0}getCardColor(){const t=["#7986cb","#81c784","#ffb74d","#ba68c8","#4dd0e1","#f06292"],e=t[parseInt(this.list.id.slice(-1),16)%t.length];return this.isActive?e:this.dimColor(e)}dimColor(t){return`rgba(${parseInt(t.slice(1,3),16)}, ${parseInt(t.slice(3,5),16)}, ${parseInt(t.slice(5,7),16)}, 0.4)`}handleCardClick(){this.dispatchEvent(new CustomEvent("list-select",{detail:{listId:this.list.id},bubbles:!0,composed:!0}))}handleMenuClick(t){t.stopPropagation();const e=t.target.getBoundingClientRect();this.menuX=e.right-150,this.menuY=e.bottom+5,this.showMenu=!this.showMenu}handleAction(t,e){e.stopPropagation(),this.showMenu=!1,this.dispatchEvent(new CustomEvent("list-action",{detail:{action:t,listId:this.list.id},bubbles:!0,composed:!0}))}render(){return F`
      <div 
        class="list-card ${this.isActive?"active":""}" 
        style="background: ${this.getCardColor()}"
        @click=${this.handleCardClick}
      >
        ${this.isActive?F`
          <div class="active-badge">Active</div>
        `:""}

        <div class="card-content">
          <div class="card-header">
            <ha-icon icon="${this.list.icon}"></ha-icon>
            <h3>${this.list.name}</h3>
          </div>

          ${this.isActive?F`
            <div class="card-stats">
              <span class="stat-value">${this.itemCount}</span>
              <span class="stat-separator">·</span>
              <span class="stat-value">${this.currency} $${this.totalCost.toFixed(2)}</span>
            </div>
          `:""}
        </div>

        <button class="menu-btn" @click=${this.handleMenuClick}>
          <ha-icon icon="mdi:dots-vertical"></ha-icon>
        </button>

        ${this.showMenu?F`
          <div class="menu-overlay" @click=${t=>{t.stopPropagation(),this.showMenu=!1}}>
            <div class="menu-popup" style="left: ${this.menuX}px; top: ${this.menuY}px;">
              <button @click=${t=>this.handleAction("rename",t)}>
                <ha-icon icon="mdi:pencil"></ha-icon>
                Rename
              </button>
              <button @click=${t=>this.handleAction("share",t)}>
                <ha-icon icon="mdi:share-variant"></ha-icon>
                Share
              </button>
              <button @click=${t=>this.handleAction("copy",t)}>
                <ha-icon icon="mdi:content-copy"></ha-icon>
                Copy
              </button>
              <button class="danger" @click=${t=>this.handleAction("delete",t)}>
                <ha-icon icon="mdi:delete"></ha-icon>
                Delete
              </button>
            </div>
          </div>
        `:""}
      </div>
    `}static styles=o`
    .list-card {
      position: relative;
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;
      min-height: 100px;
      display: flex;
      align-items: center;
      color: white;
    }
    .list-card:active {
      transform: scale(0.98);
    }
    .active-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      background: rgba(255,255,255,0.3);
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
      pointer-events: none;
    }
    .card-content {
      flex: 1;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .card-header ha-icon {
      --mdc-icon-size: 28px;
    }
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
    .card-stats {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      opacity: 0.95;
    }
    .stat-value {
      font-weight: 600;
    }
    .stat-separator {
      opacity: 0.6;
    }
    .menu-btn {
      background: rgba(255,255,255,0.2);
      border: none;
      padding: 6px;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-tap-highlight-color: transparent;
      z-index: 10;
    }
    .menu-btn ha-icon {
      --mdc-icon-size: 20px;
      color: white;
    }
    .menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
    }
    .menu-popup {
      position: fixed;
      background: var(--card-background-color);
      border-radius: 10px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
      overflow: hidden;
      min-width: 150px;
      z-index: 10000;
    }
    .menu-popup button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border: none;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .menu-popup button:active {
      background: var(--secondary-background-color);
    }
    .menu-popup button.danger {
      color: var(--error-color);
    }
    .menu-popup button.danger:active {
      background: var(--error-color);
      color: white;
    }
    .menu-popup ha-icon {
      --mdc-icon-size: 18px;
    }
  `}customElements.define("slm-list-card",bt);class vt extends nt{static properties={api:{type:Object},lists:{type:Array},activeList:{type:Object},items:{type:Array},total:{type:Object},showCreateDialog:{type:Boolean},newListName:{type:String},newListIcon:{type:String}};constructor(){super(),this.lists=[],this.showCreateDialog=!1,this.newListName="",this.newListIcon="mdi:cart"}handleCreateList(){this.showCreateDialog=!0}async handleSaveNewList(){this.newListName.trim()&&(await this.api.createList(this.newListName,this.newListIcon),this.showCreateDialog=!1,this.newListName="",this.newListIcon="mdi:cart",this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})))}handleListSelect(t){this.dispatchEvent(new CustomEvent("list-selected",{detail:t.detail,bubbles:!0,composed:!0}))}async handleListAction(t){const{action:e,listId:i}=t.detail;switch(e){case"rename":const t=prompt("Enter new list name:");t&&(await this.api.updateList(i,{name:t}),this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})));break;case"delete":confirm("Delete this list?")&&(await this.api.deleteList(i),this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})));break;case"share":alert("Share feature coming soon!");break;case"copy":alert("Copy feature coming soon!")}}getListEmoji(t){return{"mdi:cart":"🛒","mdi:home":"🏠","mdi:food":"🍽️","mdi:shopping":"🛍️","mdi:store":"🏪"}[t]||"🛒"}render(){return F`
      <div class="lists-view">
        <div class="header">
          <h2>My Lists</h2>
          <button class="create-btn" @click=${this.handleCreateList}>
            <span class="emoji">➕</span>
            New List
          </button>
        </div>

        ${0===this.lists.length?F`
          <div class="empty">
            <div class="empty-emoji">📋</div>
            <p>No lists yet</p>
            <p class="hint">Create your first shopping list</p>
            <button class="primary-btn" @click=${this.handleCreateList}>
              <span class="emoji">➕</span>
              Create List
            </button>
          </div>
        `:F`
          <div class="lists-grid">
            ${this.lists.map(t=>F`
              <slm-list-card
                .list=${t}
                .isActive=${t.id===this.activeList?.id}
                .itemCount=${t.id===this.activeList?.id?this.items.filter(t=>!t.checked).length:0}
                .totalCost=${t.id===this.activeList?.id?this.total.total:0}
                .currency=${this.total.currency}
                .emoji=${this.getListEmoji(t.icon)}
                @list-select=${this.handleListSelect}
                @list-action=${this.handleListAction}
              ></slm-list-card>
            `)}
          </div>
        `}

        ${this.showCreateDialog?F`
          <div class="overlay" @click=${()=>this.showCreateDialog=!1}>
            <div class="dialog" @click=${t=>t.stopPropagation()}>
              <div class="dialog-header">
                <h3>Create New List</h3>
                <button @click=${()=>this.showCreateDialog=!1}>
                  <span class="emoji">✖️</span>
                </button>
              </div>
              <div class="dialog-content">
                <label>List Name</label>
                <input
                  type="text"
                  placeholder="e.g., Weekly Shopping"
                  .value=${this.newListName}
                  @input=${t=>this.newListName=t.target.value}
                  autofocus
                />

                <label>Icon</label>
                <div class="icon-picker">
                  ${["mdi:cart","mdi:home","mdi:food","mdi:shopping","mdi:store"].map(t=>F`
                    <button
                      class="icon-option ${this.newListIcon===t?"selected":""}"
                      @click=${()=>this.newListIcon=t}
                    >
                      <span class="emoji">${this.getListEmoji(t)}</span>
                    </button>
                  `)}
                </div>
              </div>
              <div class="dialog-footer">
                <button class="cancel-btn" @click=${()=>this.showCreateDialog=!1}>Cancel</button>
                <button class="save-btn" @click=${this.handleSaveNewList}>Create</button>
              </div>
            </div>
          </div>
        `:""}
      </div>
    `}static styles=o`
    .lists-view {
      padding: 16px 8px;
      min-height: 100%;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 0 8px;
    }
    .header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .create-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      -webkit-tap-highlight-color: transparent;
    }
    .emoji {
      font-size: 16px;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--secondary-text-color);
    }
    .empty-emoji {
      font-size: 80px;
      margin-bottom: 16px;
      opacity: 0.3;
    }
    .empty p {
      margin: 8px 0;
    }
    .hint {
      font-size: 14px;
      opacity: 0.7;
      margin-bottom: 24px;
    }
    .primary-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 3px 8px rgba(0,0,0,0.2);
      -webkit-tap-highlight-color: transparent;
    }
    .lists-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
      position: relative;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .dialog {
      width: 90%;
      max-width: 400px;
      background: var(--card-background-color);
      border-radius: 16px;
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--divider-color);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 18px;
      color: var(--primary-text-color);
    }
    .dialog-header button {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 18px;
      -webkit-tap-highlight-color: transparent;
    }
    .dialog-content {
      padding: 20px;
    }
    .dialog-content label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .dialog-content input {
      width: 100%;
      padding: 10px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      font-size: 15px;
      margin-bottom: 20px;
      color: var(--primary-text-color);
      background: var(--card-background-color);
    }
    .icon-picker {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .icon-option {
      width: 48px;
      height: 48px;
      border-radius: 10px;
      border: 2px solid var(--divider-color);
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .icon-option.selected {
      border-color: var(--primary-color);
      background: var(--primary-color);
    }
    .dialog-footer {
      display: flex;
      gap: 10px;
      padding: 16px;
      border-top: 1px solid var(--divider-color);
    }
    .cancel-btn,
    .save-btn {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      -webkit-tap-highlight-color: transparent;
    }
    .cancel-btn {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
    .save-btn {
      background: var(--primary-color);
      color: white;
    }
  `}customElements.define("slm-lists-view",vt);class yt extends nt{static properties={api:{type:Object},cards:{type:Array},showAddDialog:{type:Boolean},showEditDialog:{type:Boolean},showFullscreenCard:{type:Boolean},editingCard:{type:Object},fullscreenCard:{type:Object},newCard:{type:Object}};constructor(){super(),this.cards=[],this.showAddDialog=!1,this.showEditDialog=!1,this.showFullscreenCard=!1,this.editingCard=null,this.fullscreenCard=null,this.newCard={name:"",number:"",barcode:"",logo:"",notes:"",color:"#9fa8da"},this.loadCards()}loadCards(){const t=localStorage.getItem("slm_loyalty_cards");this.cards=t?JSON.parse(t):[]}saveCards(){localStorage.setItem("slm_loyalty_cards",JSON.stringify(this.cards))}handleAddCard(){this.newCard={name:"",number:"",barcode:"",logo:"",notes:"",color:"#9fa8da"},this.showAddDialog=!0}handleSaveNewCard(t){t.preventDefault();const e=new FormData(t.target),i={id:Date.now().toString(),name:e.get("name"),number:e.get("number"),barcode:e.get("barcode")||this.generateBarcode(e.get("number")),logo:e.get("logo")||"",notes:e.get("notes")||"",color:e.get("color")||"#9fa8da"};this.cards=[...this.cards,i],this.saveCards(),this.showAddDialog=!1}handleEditCard(t){this.editingCard={...t},this.showEditDialog=!0}handleSaveEditCard(t){t.preventDefault();const e=new FormData(t.target),i={...this.editingCard,name:e.get("name"),number:e.get("number"),barcode:e.get("barcode")||this.generateBarcode(e.get("number")),logo:e.get("logo")||"",notes:e.get("notes")||"",color:e.get("color")};this.cards=this.cards.map(t=>t.id===i.id?i:t),this.saveCards(),this.showEditDialog=!1,this.editingCard=null}handleDeleteCard(t){confirm("Delete this loyalty card?")&&(this.cards=this.cards.filter(e=>e.id!==t),this.saveCards(),this.showEditDialog=!1,this.editingCard=null)}handleDuplicateCard(t){const e={...t,id:Date.now().toString(),name:`${t.name} (Copy)`};this.cards=[...this.cards,e],this.saveCards()}handleCardClick(t){this.fullscreenCard=t,this.showFullscreenCard=!0}generateBarcode(t){return t.replace(/\D/g,"")}render(){return F`
      <div class="loyalty-view">
        <div class="header">
          <h2>Loyalty Cards</h2>
          <button class="add-btn" @click=${this.handleAddCard}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        ${0===this.cards.length?F`
          <div class="empty">
            <div class="empty-emoji">💳</div>
            <p>No loyalty cards yet</p>
            <p class="hint">Add your store loyalty cards for quick access</p>
          </div>
        `:F`
          <div class="cards-grid">
            ${this.cards.map(t=>F`
              <div class="loyalty-card" style="background: ${t.color}">
                <button class="menu-btn" @click=${e=>{e.stopPropagation(),this.handleEditCard(t)}}>
                  <ha-icon icon="mdi:dots-vertical"></ha-icon>
                </button>
                
                <div class="card-body" @click=${()=>this.handleCardClick(t)}>
                  ${t.logo?F`
                    <img src="${t.logo}" alt="${t.name}" class="card-logo">
                  `:""}
                  <h3>${t.name}</h3>
                  <div class="card-number">${t.number}</div>
                  ${t.barcode?F`
                    <div class="barcode-preview">
                      <ha-icon icon="mdi:barcode"></ha-icon>
                      <span>${t.barcode}</span>
                    </div>
                  `:""}
                </div>
              </div>
            `)}
          </div>
        `}

        ${this.showAddDialog?this.renderDialog(!1):""}
        ${this.showEditDialog?this.renderDialog(!0):""}
        ${this.showFullscreenCard?this.renderFullscreen():""}
      </div>
    `}renderDialog(t){const e=t?this.editingCard:this.newCard;return F`
      <div class="overlay" @click=${()=>t?this.showEditDialog=!1:this.showAddDialog=!1}>
        <form class="dialog" @click=${t=>t.stopPropagation()} @submit=${t?this.handleSaveEditCard:this.handleSaveNewCard}>
          <div class="dialog-header">
            <h3>${t?"Edit Card":"Add Loyalty Card"}</h3>
            <button type="button" @click=${()=>t?this.showEditDialog=!1:this.showAddDialog=!1}>
              <span class="emoji">✖️</span>
            </button>
          </div>
          <div class="dialog-content">
            <label>
              Store Name
              <input type="text" name="name" placeholder="e.g., Countdown" .value=${e.name} required />
            </label>
            <label>
              Card Number
              <input type="text" name="number" placeholder="Card/Member number" .value=${e.number} required />
            </label>
            <label>
              Barcode
              <input type="text" name="barcode" placeholder="Auto-generated from number" .value=${e.barcode} />
            </label>
            <label>
              Shop Logo URL (optional)
              <input type="url" name="logo" placeholder="https://..." .value=${e.logo||""} />
            </label>
            <label>
              Notes
              <textarea name="notes" placeholder="Additional notes..." rows="3" .value=${e.notes||""}></textarea>
            </label>
            <label>
              Card Color
              <input type="color" name="color" .value=${e.color} />
            </label>
          </div>
          <div class="dialog-footer">
            ${t?F`
              <button type="button" class="action-btn secondary" @click=${()=>this.handleDuplicateCard(e)}>
                Duplicate
              </button>
              <button type="button" class="action-btn danger" @click=${()=>this.handleDeleteCard(e.id)}>
                Delete
              </button>
            `:""}
            <button type="submit" class="action-btn primary">
              ${t?"Save":"Add"}
            </button>
          </div>
        </form>
      </div>
    `}renderFullscreen(){const t=this.fullscreenCard;return F`
      <div class="fullscreen-overlay" @click=${()=>this.showFullscreenCard=!1}>
        <div class="fullscreen-card">
          <h2>${t.name}</h2>
          <div class="fullscreen-number">${t.number}</div>
          ${t.barcode?F`
            <div class="fullscreen-barcode">
              <div class="barcode-display">
                ${this.renderBarcodeImage(t.barcode)}
              </div>
              <div class="barcode-number">${t.barcode}</div>
            </div>
          `:""}
          <p class="tap-hint">Tap anywhere to close</p>
        </div>
      </div>
    `}renderBarcodeImage(t){return F`
      <svg class="barcode-svg" viewBox="0 0 200 80">
        ${t.split("").map((t,e)=>F`
          <rect x="${15*e}" y="0" width="${parseInt(t)+3}" height="80" fill="black"></rect>
        `)}
      </svg>
    `}static styles=o`
    .loyalty-view {
      padding: 16px 8px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 0 8px;
    }
    .header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: var(--text-primary, #424242);
    }
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      -webkit-tap-highlight-color: transparent;
    }
    .add-btn ha-icon {
      --mdc-icon-size: 24px;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--text-secondary, #757575);
    }
    .empty-emoji {
      font-size: 80px;
      margin-bottom: 16px;
      opacity: 0.3;
    }
    .hint {
      font-size: 14px;
      opacity: 0.7;
      margin-bottom: 24px;
    }
    .primary-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: linear-gradient(135deg, #9fa8da 0%, #c5cae9 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 3px 8px rgba(159, 168, 218, 0.3);
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 12px;
    }
    .loyalty-card {
      position: relative;
      padding: 20px;
      border-radius: 12px;
      color: white;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .menu-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    .card-body {
      flex: 1;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card-logo {
      width: 60px;
      height: 60px;
      object-fit: contain;
      margin-bottom: 10px;
      background: rgba(255,255,255,0.9);
      padding: 8px;
      border-radius: 8px;
    }
    .loyalty-card h3 {
      margin: 0 0 12px 0;
      font-size: 18px;
      font-weight: 700;
    }
    .card-number {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .barcode-preview {
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0.9;
      font-size: 13px;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .dialog {
      width: 90%;
      max-width: 400px;
      background: white;
      border-radius: 16px;
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--border-color, #e8eaf6);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 18px;
    }
    .dialog-header button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
    }
    .dialog-content {
      padding: 20px;
      max-height: 60vh;
      overflow-y: auto;
    }
    .dialog-content label {
      display: block;
      margin-bottom: 14px;
      font-weight: 600;
      font-size: 13px;
      color: var(--text-secondary, #757575);
    }
    .dialog-content input,
    .dialog-content textarea {
      display: block;
      width: 100%;
      padding: 10px;
      margin-top: 6px;
      border: 2px solid var(--border-color, #e8eaf6);
      border-radius: 8px;
      font-size: 15px;
      font-family: inherit;
      color: var(--text-primary, #424242);
    }
    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--border-color, #e8eaf6);
    }
    .action-btn {
      flex: 1;
      padding: 10px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .action-btn.primary {
      background: linear-gradient(135deg, #9fa8da 0%, #c5cae9 100%);
      color: white;
    }
    .action-btn.secondary {
      background: var(--surface-pastel, #fafbfc);
      color: var(--text-primary, #424242);
    }
    .action-btn.danger {
      background: #ef9a9a;
      color: white;
    }
    .fullscreen-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      cursor: pointer;
    }
    .fullscreen-card {
      text-align: center;
      color: white;
      padding: 40px;
      max-width: 90%;
    }
    .fullscreen-card h2 {
      margin: 0 0 20px 0;
      font-size: 28px;
    }
    .fullscreen-number {
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 3px;
      margin-bottom: 40px;
    }
    .fullscreen-barcode {
      margin: 40px auto;
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 400px;
    }
    .barcode-display {
      margin-bottom: 20px;
    }
    .barcode-svg {
      width: 100%;
      height: 120px;
    }
    .barcode-number {
      font-size: 24px;
      font-weight: 700;
      color: black;
      letter-spacing: 2px;
    }
    .tap-hint {
      margin-top: 40px;
      opacity: 0.7;
      font-size: 14px;
    }
  `}customElements.define("slm-loyalty-cards-view",yt);class xt extends nt{static properties={hass:{type:Object}};render(){return F`
      <div class="slm-profile-settings">
        <div class="header">
          <button class="back-btn" @click=${()=>this.dispatchEvent(new Event("back"))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>Profile</h2>
        </div>

        <div class="profile-content">
          <div class="profile-avatar">
            <div class="avatar-circle">
              ${this.hass.user?.name?.charAt(0).toUpperCase()||"U"}
            </div>
          </div>

          <div class="profile-info">
            <div class="info-item">
              <label>Name</label>
              <div class="info-value">${this.hass.user?.name||"User"}</div>
            </div>

            <div class="info-item">
              <label>Home Assistant Account</label>
              <div class="info-value">${this.hass.user?.is_admin?"Administrator":"User"}</div>
            </div>
          </div>

          <div class="info-notice">
            Profile information is managed through Home Assistant settings.
          </div>
        </div>
      </div>
    `}static styles=o`
    .slm-profile-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.2s;
    }
    .back-btn:hover {
      background: var(--primary-background-color);
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .profile-content {
      padding: 20px;
    }
    .profile-avatar {
      text-align: center;
      margin-bottom: 32px;
    }
    .avatar-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: 700;
    }
    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;
    }
    .info-item label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .info-value {
      font-size: 18px;
      font-weight: 600;
      padding: 12px;
      background: var(--primary-background-color);
      border-radius: 8px;
    }
    .info-notice {
      padding: 16px;
      background: var(--info-color);
      color: white;
      border-radius: 8px;
      font-size: 14px;
      text-align: center;
    }
  `}customElements.define("slm-profile-settings",xt);class ft extends nt{static properties={currentMode:{type:String}};handleSelect(t){this.dispatchEvent(new CustomEvent("mode-selected",{detail:{mode:t},bubbles:!0,composed:!0}))}render(){return F`
      <div class="overlay" @click=${()=>this.dispatchEvent(new Event("close"))}>
        <div class="popup" @click=${t=>t.stopPropagation()}>
          <div class="popup-header">
            <h3>Dark Mode</h3>
          </div>

          <div class="popup-content">
            <button 
              class="mode-option ${"on"===this.currentMode?"selected":""}"
              @click=${()=>this.handleSelect("on")}
            >
              <ha-icon icon="mdi:weather-night"></ha-icon>
              <span>On</span>
              ${"on"===this.currentMode?F`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              `:""}
            </button>

            <button 
              class="mode-option ${"off"===this.currentMode?"selected":""}"
              @click=${()=>this.handleSelect("off")}
            >
              <ha-icon icon="mdi:weather-sunny"></ha-icon>
              <span>Off</span>
              ${"off"===this.currentMode?F`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              `:""}
            </button>

            <button 
              class="mode-option ${"system"===this.currentMode?"selected":""}"
              @click=${()=>this.handleSelect("system")}
            >
              <ha-icon icon="mdi:cellphone"></ha-icon>
              <span>As on Device</span>
              ${"system"===this.currentMode?F`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              `:""}
            </button>
          </div>
        </div>
      </div>
    `}static styles=o`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: flex-end;
      z-index: 1000;
      animation: fadeIn 0.2s;
    }
    .popup {
      width: 100%;
      background: var(--card-background-color);
      border-radius: 16px 16px 0 0;
      animation: slideUp 0.3s;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .popup-header {
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .popup-header h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
    }
    .popup-content {
      padding: 20px;
    }
    .mode-option {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      padding: 16px;
      margin-bottom: 12px;
      border: 2px solid var(--divider-color);
      border-radius: 12px;
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s;
    }
    .mode-option:hover {
      border-color: var(--primary-color);
    }
    .mode-option.selected {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: white;
    }
    .mode-option span {
      flex: 1;
      text-align: left;
      font-weight: 600;
    }
    .mode-option .check {
      color: white;
    }
  `}customElements.define("slm-dark-mode-popup",ft);class wt extends nt{static properties={currentFont:{type:String}};fonts=[{name:"System Default",value:"system"},{name:"Roboto",value:"Roboto, sans-serif"},{name:"Open Sans",value:'"Open Sans", sans-serif'},{name:"Lato",value:"Lato, sans-serif"},{name:"Montserrat",value:"Montserrat, sans-serif"},{name:"Inter",value:"Inter, sans-serif"}];handleSelect(t){this.dispatchEvent(new CustomEvent("font-selected",{detail:{font:t},bubbles:!0,composed:!0}))}render(){return F`
      <div class="overlay" @click=${()=>this.dispatchEvent(new Event("close"))}>
        <div class="popup" @click=${t=>t.stopPropagation()}>
          <div class="popup-header">
            <h3>Font Family</h3>
          </div>

          <div class="popup-content">
            ${this.fonts.map(t=>F`
              <button 
                class="font-option ${this.currentFont===t.value?"selected":""}"
                style="font-family: ${t.value}"
                @click=${()=>this.handleSelect(t.value)}
              >
                <span>${t.name}</span>
                ${this.currentFont===t.value?F`
                  <ha-icon class="check" icon="mdi:check"></ha-icon>
                `:""}
              </button>
            `)}
          </div>
        </div>
      </div>
    `}static styles=o`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: flex-end;
      z-index: 1000;
    }
    .popup {
      width: 100%;
      background: var(--card-background-color);
      border-radius: 16px 16px 0 0;
      max-height: 70vh;
      overflow-y: auto;
    }
    .popup-header {
      position: sticky;
      top: 0;
      background: var(--card-background-color);
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
      z-index: 1;
    }
    .popup-header h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
    }
    .popup-content {
      padding: 20px;
    }
    .font-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 16px;
      margin-bottom: 12px;
      border: 2px solid var(--divider-color);
      border-radius: 12px;
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s;
    }
    .font-option:hover {
      border-color: var(--primary-color);
    }
    .font-option.selected {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: white;
    }
    .font-option span {
      font-weight: 600;
    }
  `}customElements.define("font-settings",wt);class $t extends nt{static properties={settings:{type:Object},showDarkModePopup:{type:Boolean},showFontSettings:{type:Boolean}};constructor(){super(),this.showDarkModePopup=!1,this.showFontSettings=!1}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}render(){return F`
      <div class="appearance-settings">
        <div class="header">
          <button class="back-btn" @click=${()=>this.dispatchEvent(new Event("back"))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>Appearance</h2>
        </div>

        <div class="settings-list">
          <button class="settings-item" @click=${()=>this.showDarkModePopup=!0}>
            <div class="item-content">
              <div class="item-title">Dark Mode</div>
              <div class="item-subtitle">${this.getDarkModeLabel()}</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <div class="section-header">Display</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Use Emojis Instead of Icons</div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.useEmojis}
                @change=${t=>this.handleSettingChange("useEmojis",t.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="settings-item">
            <div class="item-content full-width">
              <div class="item-title">Tiles Per Row</div>
              <div class="tile-options">
                ${[2,3,4,5].map(t=>F`
                  <button 
                    class="tile-option ${this.settings.tilesPerRow===t?"selected":""}"
                    @click=${()=>this.handleSettingChange("tilesPerRow",t)}
                  >
                    ${t}
                  </button>
                `)}
              </div>
            </div>
          </div>

          <div class="section-header">Recently Used</div>

          <div class="settings-item">
            <div class="item-content full-width">
              <div class="item-title">Recently Used Products</div>
              <input 
                type="range" 
                min="4" 
                max="20" 
                step="4"
                .value=${this.settings.recentProductsCount}
                @input=${t=>this.handleSettingChange("recentProductsCount",parseInt(t.target.value))}
                class="size-slider"
              />
              <div class="size-value">${this.settings.recentProductsCount} products</div>
            </div>
          </div>

          <div class="section-header">Font</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Use system text size</div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.useSystemTextSize}
                @change=${t=>this.handleSettingChange("useSystemTextSize",t.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          ${this.settings.useSystemTextSize?"":F`
            <div class="settings-item">
              <div class="item-content full-width">
                <div class="item-title">Font Size</div>
                <input 
                  type="range" 
                  min="12" 
                  max="24" 
                  .value=${this.settings.fontSize}
                  @input=${t=>this.handleSettingChange("fontSize",parseInt(t.target.value))}
                  class="size-slider"
                />
                <div class="size-value">${this.settings.fontSize}px</div>
              </div>
            </div>
          `}

          <button class="settings-item" @click=${()=>this.showFontSettings=!0}>
            <div class="item-content">
              <div class="item-title">Font Family</div>
              <div class="item-subtitle">${this.settings.fontFamily}</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>

        ${this.showDarkModePopup?F`
          <slm-dark-mode-popup
            .currentMode=${this.settings.darkMode}
            @mode-selected=${t=>{this.handleSettingChange("darkMode",t.detail.mode),this.showDarkModePopup=!1}}
            @close=${()=>this.showDarkModePopup=!1}
          ></slm-dark-mode-popup>
        `:""}

        ${this.showFontSettings?F`
          <slm-font-settings
            .currentFont=${this.settings.fontFamily}
            @font-selected=${t=>{this.handleSettingChange("fontFamily",t.detail.font),this.showFontSettings=!1}}
            @close=${()=>this.showFontSettings=!1}
          ></slm-font-settings>
        `:""}
      </div>
    `}getDarkModeLabel(){switch(this.settings.darkMode){case"on":return"On";case"off":return"Off";default:return"As on Device"}}static styles=o`
    .appearance-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      border-bottom: 1px solid var(--divider-color);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      -webkit-tap-highlight-color: transparent;
    }
    .header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .section-header {
      padding: 14px 16px 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
    }
    .settings-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
      -webkit-tap-highlight-color: transparent;
    }
    .item-content {
      flex: 1;
    }
    .item-content.full-width {
      width: 100%;
    }
    .item-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 2px;
      color: var(--primary-text-color);
    }
    .item-subtitle {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .tile-options {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .tile-option {
      flex: 1;
      padding: 10px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      background: transparent;
      cursor: pointer;
      font-weight: 600;
      color: var(--primary-text-color);
      -webkit-tap-highlight-color: transparent;
    }
    .tile-option.selected {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    .size-slider {
      width: 100%;
      margin: 12px 0;
    }
    .size-value {
      text-align: center;
      font-weight: 600;
      color: var(--primary-color);
    }
    .toggle {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 28px;
    }
    .toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--disabled-color);
      transition: 0.3s;
      border-radius: 28px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background: var(--primary-color);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `}customElements.define("slm-appearance-settings",$t);class kt extends nt{static properties={settings:{type:Object}};handleSettingChange(t,e){const i={...this.settings.notifications,[t]:e};this.dispatchEvent(new CustomEvent("settings-changed",{detail:{notifications:i},bubbles:!0,composed:!0}))}render(){return F`
      <div class="slm-notification-settings">
        <div class="header">
          <button class="back-btn" @click=${()=>this.dispatchEvent(new Event("back"))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>Notifications</h2>
        </div>

        <div class="settings-list">
          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">List Sharing</div>
              <div class="item-description">
                Get notified when somebody shares a list with you or makes changes on shared lists
              </div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.notifications?.listSharing}
                @change=${t=>this.handleSettingChange("listSharing",t.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">E-Mails</div>
              <div class="item-description">
                Get notified about changes to your shared lists
              </div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.notifications?.emails}
                @change=${t=>this.handleSettingChange("emails",t.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    `}static styles=o`
    .slm-notification-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
    }
    .back-btn:hover {
      background: var(--primary-background-color);
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .settings-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .item-content {
      flex: 1;
    }
    .item-title {
      font-weight: 600;
      margin-bottom: 6px;
    }
    .item-description {
      font-size: 14px;
      color: var(--secondary-text-color);
      line-height: 1.4;
    }
    .toggle {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 28px;
      flex-shrink: 0;
    }
    .toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--disabled-color);
      transition: 0.3s;
      border-radius: 28px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: var(--primary-color);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `}customElements.define("slm-notification-settings",kt);class _t extends nt{static properties={api:{type:Object},categories:{type:Array},showAddDialog:{type:Boolean},newCategory:{type:Object}};constructor(){super(),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"}}handleAddCategory(){this.showAddDialog=!0}async handleSaveCategory(){this.newCategory.name.trim()&&(alert("Category management coming soon!"),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"})}render(){return F`
      <div class="slm-category-settings">
        <div class="header">
          <button class="back-btn" @click=${()=>this.dispatchEvent(new Event("back"))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>Manage Categories</h2>
        </div>

        <div class="category-actions">
          <button class="action-btn" @click=${this.handleAddCategory}>
            <ha-icon icon="mdi:plus"></ha-icon>
            <span>Add Category</span>
          </button>
          <button class="action-btn">
            <ha-icon icon="mdi:swap-vertical"></ha-icon>
            <span>Reorder</span>
          </button>
        </div>

        <div class="categories-list">
          ${this.categories.map(t=>F`
            <div class="category-item">
              <div class="category-icon" style="background: ${t.color}">
                <ha-icon icon="${t.icon}"></ha-icon>
              </div>
              <div class="category-info">
                <div class="category-name">${t.name}</div>
              </div>
              <button class="edit-btn">
                <ha-icon icon="mdi:pencil"></ha-icon>
              </button>
            </div>
          `)}
        </div>

        ${this.showAddDialog?F`
          <div class="overlay" @click=${()=>this.showAddDialog=!1}>
            <div class="dialog" @click=${t=>t.stopPropagation()}>
              <div class="dialog-header">
                <h3>Add Category</h3>
                <button @click=${()=>this.showAddDialog=!1}>
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>
              <div class="dialog-content">
                <label>
                  Category Name
                  <input 
                    type="text" 
                    .value=${this.newCategory.name}
                    @input=${t=>this.newCategory={...this.newCategory,name:t.target.value}}
                    placeholder="e.g., Snacks"
                  />
                </label>
                <label>
                  Icon
                  <input 
                    type="text" 
                    .value=${this.newCategory.icon}
                    @input=${t=>this.newCategory={...this.newCategory,icon:t.target.value}}
                    placeholder="mdi:shape"
                  />
                </label>
                <label>
                  Color
                  <input 
                    type="color" 
                    .value=${this.newCategory.color}
                    @input=${t=>this.newCategory={...this.newCategory,color:t.target.value}}
                  />
                </label>
              </div>
              <div class="dialog-footer">
                <button class="cancel-btn" @click=${()=>this.showAddDialog=!1}>Cancel</button>
                <button class="save-btn" @click=${this.handleSaveCategory}>Add</button>
              </div>
            </div>
          </div>
        `:""}
      </div>
    `}static styles=o`
    .slm-category-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .category-actions {
      display: flex;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .action-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .categories-list {
      padding: 8px 0;
    }
    .category-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .category-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .category-icon ha-icon {
      --mdc-icon-size: 28px;
    }
    .category-info {
      flex: 1;
    }
    .category-name {
      font-weight: 600;
      font-size: 16px;
    }
    .edit-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .dialog {
      width: 90%;
      max-width: 400px;
      background: var(--card-background-color);
      border-radius: 16px;
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .dialog-header h3 {
      margin: 0;
    }
    .dialog-header button {
      background: none;
      border: none;
      cursor: pointer;
    }
    .dialog-content {
      padding: 20px;
    }
    .dialog-content label {
      display: block;
      margin-bottom: 16px;
      font-weight: 600;
    }
    .dialog-content input {
      display: block;
      width: 100%;
      padding: 12px;
      margin-top: 8px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      font-size: 16px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .dialog-footer {
      display: flex;
      gap: 12px;
      padding: 20px;
      border-top: 1px solid var(--divider-color);
    }
    .cancel-btn,
    .save-btn {
      flex: 1;
      padding: 12px;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .cancel-btn {
      background: var(--secondary-background-color);
    }
    .save-btn {
      background: var(--primary-color);
      color: white;
    }
  `}customElements.define("slm-category-settings",_t);class Ct extends nt{render(){return F`
      <div class="slm-support-settings">
        <div class="header">
          <button class="back-btn" @click=${()=>this.dispatchEvent(new Event("back"))}>
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <h2>FAQ & Support</h2>
        </div>

        <div class="support-list">
          <a 
            href="https://github.com/thekiwismarthome/shopping-list-manager/wiki" 
            target="_blank"
            class="support-item"
          >
            <div class="item-icon">
              <ha-icon icon="mdi:help-circle"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">FAQ</div>
              <div class="item-subtitle">Frequently asked questions</div>
            </div>
            <ha-icon icon="mdi:open-in-new"></ha-icon>
          </a>

          <a 
            href="https://github.com/thekiwismarthome/shopping-list-manager/issues" 
            target="_blank"
            class="support-item"
          >
            <div class="item-icon">
              <ha-icon icon="mdi:bug"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Report a Problem</div>
              <div class="item-subtitle">Submit an issue on GitHub</div>
            </div>
            <ha-icon icon="mdi:open-in-new"></ha-icon>
          </a>

          <a 
            href="https://github.com/thekiwismarthome/shopping-list-manager" 
            target="_blank"
            class="support-item"
          >
            <div class="item-icon">
              <ha-icon icon="mdi:github"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">GitHub Repository</div>
              <div class="item-subtitle">View source code</div>
            </div>
            <ha-icon icon="mdi:open-in-new"></ha-icon>
          </a>

          <div class="support-item">
            <div class="item-icon">
              <ha-icon icon="mdi:information"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Version</div>
              <div class="item-subtitle">3.0.0</div>
            </div>
          </div>
        </div>
      </div>
    `}static styles=o`
    .slm-support-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
    }
    .back-btn:hover {
      background: var(--primary-background-color);
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .support-list {
      padding: 8px 0;
    }
    .support-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--divider-color);
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      transition: background 0.2s;
    }
    .support-item:hover {
      background: var(--primary-background-color);
    }
    .item-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .item-icon ha-icon {
      --mdc-icon-size: 24px;
    }
    .item-content {
      flex: 1;
    }
    .item-title {
      font-weight: 600;
      margin-bottom: 4px;
    }
    .item-subtitle {
      font-size: 14px;
      color: var(--secondary-text-color);
    }
  `}customElements.define("slm-support-settings",Ct);class St extends nt{static properties={hass:{type:Object},api:{type:Object},settings:{type:Object},categories:{type:Array},currentSection:{type:String}};constructor(){super(),this.currentSection="main"}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}handleNavigation(t){this.currentSection=t}renderMainSettings(){return F`
      <div class="settings-main">
        <div class="settings-header">
          <h2>Settings</h2>
        </div>

        <div class="settings-list">
          <button class="settings-item" @click=${()=>this.handleNavigation("profile")}>
            <div class="item-icon">
              <span class="emoji">👤</span>
            </div>
            <div class="item-content">
              <div class="item-title">Profile</div>
              <div class="item-subtitle">${this.hass.user?.name||"User"}</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <button class="settings-item" @click=${()=>this.handleNavigation("appearance")}>
            <div class="item-icon">
              <span class="emoji">🎨</span>
            </div>
            <div class="item-content">
              <div class="item-title">Appearance</div>
              <div class="item-subtitle">Theme, tiles, fonts</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <button class="settings-item" @click=${()=>this.handleNavigation("notifications")}>
            <div class="item-icon">
              <span class="emoji">🔔</span>
            </div>
            <div class="item-content">
              <div class="item-title">Notifications</div>
              <div class="item-subtitle">List sharing, emails</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <div class="section-header">Preferences</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Open last used list at launch</div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.openLastUsedList}
                @change=${t=>this.handleSettingChange("openLastUsedList",t.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Keep screen turned on</div>
            </div>
            <label class="toggle">
              <input 
                type="checkbox" 
                .checked=${this.settings.keepScreenOn}
                @change=${t=>this.handleSettingChange("keepScreenOn",t.target.checked)}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="section-header">Lists</div>

          <button class="settings-item" @click=${()=>this.handleNavigation("categories")}>
            <div class="item-icon">
              <span class="emoji">📦</span>
            </div>
            <div class="item-content">
              <div class="item-title">Manage Categories</div>
              <div class="item-subtitle">${this.categories.length} categories</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <div class="section-header">Support</div>

          <button class="settings-item" @click=${()=>this.handleNavigation("support")}>
            <div class="item-icon">
              <span class="emoji">❓</span>
            </div>
            <div class="item-content">
              <div class="item-title">FAQ & Support</div>
            </div>
            <span class="chevron">▶️</span>
          </button>

          <button class="settings-item" @click=${()=>window.location.reload()}>
            <div class="item-icon">
              <span class="emoji">🔄</span>
            </div>
            <div class="item-content">
              <div class="item-title">Refresh</div>
            </div>
          </button>

          <div class="section-header">App</div>

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Version</div>
              <div class="item-subtitle">3.0.0</div>
            </div>
          </div>
        </div>
      </div>
    `}render(){switch(this.currentSection){case"profile":return F`
          <slm-profile-settings
            .hass=${this.hass}
            @back=${()=>this.currentSection="main"}
          ></slm-profile-settings>
        `;case"appearance":return F`
          <slm-appearance-settings
            .settings=${this.settings}
            @settings-changed=${t=>this.dispatchEvent(t)}
            @back=${()=>this.currentSection="main"}
          ></slm-appearance-settings>
        `;case"notifications":return F`
          <slm-notification-settings
            .settings=${this.settings}
            @settings-changed=${t=>this.dispatchEvent(t)}
            @back=${()=>this.currentSection="main"}
          ></slm-notification-settings>
        `;case"categories":return F`
          <slm-category-settings
            .api=${this.api}
            .categories=${this.categories}
            @back=${()=>this.currentSection="main"}
          ></slm-category-settings>
        `;case"support":return F`
          <slm-support-settings
            @back=${()=>this.currentSection="main"}
          ></slm-support-settings>
        `;default:return this.renderMainSettings()}}static styles=o`
    .settings-main {
      padding-bottom: 80px;
    }
    .settings-header {
      padding: 16px;
      border-bottom: 1px solid var(--border-color, #e8eaf6);
    }
    .settings-header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary, #424242);
    }
    .section-header {
      padding: 14px 16px 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-secondary, #757575);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .settings-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-bottom: 1px solid var(--border-color, #e8eaf6);
      transition: background 0.2s;
      -webkit-tap-highlight-color: transparent;
    }
    .settings-item:active {
      background: var(--surface-pastel, #fafbfc);
    }
    .item-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #c5cae9 0%, #e1e8f0 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .item-content {
      flex: 1;
    }
    .item-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 2px;
      color: var(--text-primary, #424242);
    }
    .item-subtitle {
      font-size: 12px;
      color: var(--text-secondary, #757575);
    }
    .chevron {
      font-size: 14px;
      opacity: 0.4;
    }
    .toggle {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 28px;
    }
    .toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #e0e0e0;
      transition: 0.3s;
      border-radius: 28px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background: linear-gradient(135deg, #9fa8da 0%, #c5cae9 100%);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `}customElements.define("slm-settings-view",St);class At extends nt{static properties={hass:{type:Object},config:{type:Object},currentView:{type:String},lists:{type:Array},activeList:{type:Object},items:{type:Array},categories:{type:Array},total:{type:Object},loading:{type:Boolean},showAddDialog:{type:Boolean},showEditDialog:{type:Boolean},editingItem:{type:Object},settings:{type:Object},cardId:{type:String}};constructor(){super(),this.currentView="shopping",this.lists=[],this.activeList=null,this.items=[],this.categories=[],this.total={total:0,currency:"NZD",item_count:0},this.loading=!0,this.showAddDialog=!1,this.showEditDialog=!1,this.editingItem=null,this.cardId=this.generateCardId(),this.settings=this.loadSettings()}generateCardId(){return`card_${Date.now()}_${Math.random().toString(36).substring(2,9)}`}loadSettings(){const t={theme:"auto",darkMode:"system",fontSize:16,fontFamily:"system",useSystemTextSize:!0,openLastUsedList:!0,keepScreenOn:!1,notifications:{listSharing:!0,emails:!0},recentProductsCount:8,tilesPerRow:3,useEmojis:!0,colorScheme:"pastel"},e=`slm_settings_${this.cardId}`,i=localStorage.getItem(e);return i?{...t,...JSON.parse(i)}:t}saveSettings(){const t=`slm_settings_${this.cardId}`;localStorage.setItem(t,JSON.stringify(this.settings))}async firstUpdated(){this.api=new ct(this.hass),await this.loadData(),this.subscribeToUpdates(),this.applyColorScheme()}applyColorScheme(){const t=window.matchMedia("(prefers-color-scheme: dark)").matches,e="on"===this.settings.darkMode||"system"===this.settings.darkMode&&t;document.documentElement.setAttribute("data-theme",e?"dark":"light")}async loadData(){try{this.loading=!0;const t=await this.api.getLists();this.lists=t.lists||[];const e=`slm_last_list_${this.cardId}`;if(this.settings.openLastUsedList){const t=localStorage.getItem(e);this.activeList=this.lists.find(e=>e.id===t)||this.lists.find(t=>t.active)||this.lists[0]}else this.activeList=this.lists.find(t=>t.active)||this.lists[0];const i=await this.api.getCategories();this.categories=i.categories,this.activeList&&await this.loadActiveListData()}catch(t){console.error("Failed to load data:",t)}finally{this.loading=!1}}async loadActiveListData(){if(!this.activeList)return;const t=await this.api.getItems(this.activeList.id);this.items=t.items;const e=await this.api.getListTotal(this.activeList.id);this.total=e;const i=`slm_last_list_${this.cardId}`;localStorage.setItem(i,this.activeList.id)}async handleListChange(t){const e=t.detail.listId;await this.api.setActiveList(e),this.activeList=this.lists.find(t=>t.id===e),await this.loadActiveListData(),this.currentView="shopping"}async handleItemClick(t){const{itemId:e}=t.detail,i=this.items.find(t=>t.id===e);i&&!i.checked&&(await this.api.updateItem(e,{quantity:i.quantity+1}),await this.loadActiveListData())}async handleItemDecrease(t){const{itemId:e}=t.detail,i=this.items.find(t=>t.id===e);i&&(i.quantity>1?await this.api.updateItem(e,{quantity:i.quantity-1}):await this.api.deleteItem(e),await this.loadActiveListData())}async handleItemCheck(t){const{itemId:e,checked:i}=t.detail;await this.api.checkItem(e,i),await this.loadActiveListData()}async handleItemLongPress(t){this.editingItem=t.detail.item,this.showEditDialog=!0}async handleItemSwipeDelete(t){const{itemId:e}=t.detail;await this.api.deleteItem(e),await this.loadActiveListData()}async handleAddItem(t){const e=t.detail,i=this.items.find(t=>t.product_id===e.product_id&&!t.checked);i?await this.api.updateItem(i.id,{quantity:i.quantity+1}):await this.api.addItem(this.activeList.id,e),this.trackRecentlyUsed(e.product_id),await this.loadActiveListData(),this.showAddDialog=!1}trackRecentlyUsed(t){if(!t)return;const e="slm_recent_products",i=localStorage.getItem(e),s=(i?JSON.parse(i):[]).filter(e=>e!==t);s.unshift(t);const a=s.slice(0,50);localStorage.setItem(e,JSON.stringify(a))}async handleEditItem(t){const{itemId:e,data:i}=t.detail;await this.api.updateItem(e,i),await this.loadActiveListData(),this.showEditDialog=!1,this.editingItem=null}handleNavChange(t){this.currentView=t.detail.view}handleSettingsChange(t){this.settings={...this.settings,...t.detail},this.saveSettings(),this.applyColorScheme(),this.requestUpdate()}handleBackToLists(){this.currentView="lists"}async handleShareList(){const t=this.activeList?.name||"Shopping List",e=this.items.filter(t=>!t.checked).map(t=>`${t.quantity} ${t.unit} ${t.name}`).join("\n"),i=`${t}\n\n${e}`;if(navigator.share)try{await navigator.share({title:t,text:i})}catch(t){"AbortError"!==t.name&&console.error("Share failed:",t)}else navigator.clipboard.writeText(i),alert("List copied to clipboard!")}subscribeToUpdates(){["shopping_list_manager_item_added","shopping_list_manager_item_updated","shopping_list_manager_item_checked","shopping_list_manager_item_deleted"].forEach(t=>{this.hass.connection.subscribeEvents(()=>{this.loadActiveListData()},t)})}renderCurrentView(){switch(this.currentView){case"shopping":return F`
          <slm-list-header
            .activeList=${this.activeList}
            .itemCount=${this.items.filter(t=>!t.checked).length}
            @back=${this.handleBackToLists}
            @share=${this.handleShareList}
          ></slm-list-header>

          <div class="content-area">
            <slm-search-bar
              .api=${this.api}
              .settings=${this.settings}
              .categories=${this.categories}
              .activeListId=${this.activeList?.id}
              @add-item=${this.handleAddItem}
            ></slm-search-bar>

            <slm-item-grid
              .items=${this.items}
              .categories=${this.categories}
              .settings=${this.settings}
              @item-click=${this.handleItemClick}
              @item-decrease=${this.handleItemDecrease}
              @item-check=${this.handleItemCheck}
              @item-long-press=${this.handleItemLongPress}
              @item-swipe-delete=${this.handleItemSwipeDelete}
            ></slm-item-grid>
          </div>

          <div class="total-bar">
            <div class="total-amount">
              ${this.total.currency} $${this.total.total.toFixed(2)}
            </div>
            <div class="total-count">${this.total.item_count} items</div>
          </div>
        `;case"lists":return F`
          <slm-lists-view
            .api=${this.api}
            .lists=${this.lists}
            .activeList=${this.activeList}
            .items=${this.items}
            .total=${this.total}
            @list-selected=${this.handleListChange}
            @lists-updated=${()=>this.loadData()}
          ></slm-lists-view>
        `;case"loyalty":return F`
          <slm-loyalty-cards-view
            .api=${this.api}
          ></slm-loyalty-cards-view>
        `;case"settings":return F`
          <slm-settings-view
            .hass=${this.hass}
            .api=${this.api}
            .settings=${this.settings}
            .categories=${this.categories}
            @settings-changed=${this.handleSettingsChange}
          ></slm-settings-view>
        `;default:return F`<div>Unknown view</div>`}}render(){return this.loading?F`
        <ha-card>
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading...</p>
          </div>
        </ha-card>
      `:F`
      <ha-card>
        <div class="card-container">
          ${this.renderCurrentView()}
        </div>

        <slm-bottom-nav
          .currentView=${this.currentView}
          @nav-changed=${this.handleNavChange}
        ></slm-bottom-nav>

        ${this.showEditDialog?F`
          <slm-edit-item-dialog
            .api=${this.api}
            .item=${this.editingItem}
            .categories=${this.categories}
            @save-item=${this.handleEditItem}
            @delete-item=${this.handleItemSwipeDelete}
            @close=${()=>{this.showEditDialog=!1,this.editingItem=null}}
          ></slm-edit-item-dialog>
        `:""}
      </ha-card>
    `}static styles=o`
    :host {
      display: block;
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
      max-height: -webkit-fill-available;
    }
    ha-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
      overflow: hidden;
      position: relative;
      background: var(--card-background-color);
    }
    .card-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }
    .content-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 60px;
      -webkit-overflow-scrolling: touch;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 32px;
      gap: 16px;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--divider-color);
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .total-bar {
      position: sticky;
      bottom: 60px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      margin: 0 4px 4px 4px;
      background: linear-gradient(90deg, #b0a8da 0%, #d4d0e8 100%);
      color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      z-index: 90;
    }
    .total-amount {
      font-size: 16px;
      font-weight: 700;
    }
    .total-count {
      font-size: 12px;
      opacity: 0.9;
    }

    /* Pastel Light Theme */
    :host {
      --primary-pastel: #9fa8da;
      --primary-light: #c5cae9;
      --secondary-pastel: #a5d6a7;
      --accent-pastel: #ffcc80;
      --surface-pastel: #fafbfc;
      --text-primary: #424242;
      --text-secondary: #757575;
      --border-color: #e8eaf6;
    }

    /* Dark Theme */
    :host([data-theme="dark"]) {
      --primary-pastel: #7986cb;
      --primary-light: #9499d4;
      --secondary-pastel: #81c784;
      --accent-pastel: #ffb74d;
      --surface-pastel: #1e1e1e;
      --text-primary: #e0e0e0;
      --text-secondary: #b0b0b0;
      --border-color: #2d2d2d;
    }
  `;setConfig(t){this.config=t}getCardSize(){return 12}}customElements.define("shopping-list-manager-card",At);
