/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let o=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new o(n,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:s,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,h=globalThis,f=h.trustedTypes,g=f?f.emptyScript:"",m=h.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!s(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),h.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&l(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const r=n?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,n)=>{if(e)i.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of n){const n=document.createElement("style"),o=t.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,i.appendChild(n)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=n;const r=o.fromAttribute(e,t.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(t,e,i,n=!1,o){if(void 0!==t){const r=this.constructor;if(!1===n&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,m?.({ReactiveElement:w}),(h.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _=globalThis,$=t=>t,k=_.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,O="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,A=`<${S}>`,P=document,j=()=>P.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,L="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,D=/>/g,z=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,U=/"/g,B=/^(?:script|style|textarea|title)$/i,H=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),G=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),X=new WeakMap,V=P.createTreeWalker(P,129);function q(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,n=[];let o,r=2===e?"<svg>":3===e?"<math>":"",a=M;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===M?"!--"===l[1]?a=R:void 0!==l[1]?a=D:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=z):void 0!==l[3]&&(a=z):a===z?">"===l[0]?(a=o??M,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?z:'"'===l[3]?U:N):a===U||a===N?a=z:a===R||a===D?a=M:(a=z,o=void 0);const u=a===z&&t[e+1].startsWith("/>")?" ":"";r+=a===M?i+A:c>=0?(n.push(s),i.slice(0,c)+O+i.slice(c)+C+u):i+C+(-2===c?e:u)}return[q(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Q{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,r=0;const a=t.length-1,s=this.parts,[l,c]=W(t,e);if(this.el=Q.createElement(l,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=V.nextNode())&&s.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(O)){const e=c[r++],i=n.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);s.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:K}),n.removeAttribute(t)}else t.startsWith(C)&&(s.push({type:6,index:o}),n.removeAttribute(t));if(B.test(n.tagName)){const t=n.textContent.split(C),e=t.length-1;if(e>0){n.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],j()),V.nextNode(),s.push({type:2,index:++o});n.append(t[e],j())}}}else if(8===n.nodeType)if(n.data===S)s.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(C,t+1));)s.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,n){if(e===G)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const r=I(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=Y(t,o._$AS(t,e.values),o,n)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??P).importNode(e,!0);V.currentNode=n;let o=V.nextNode(),r=0,a=0,s=i[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new Z(o,o.nextSibling,this,t):1===s.type?e=new s.ctor(o,s.name,s.strings,this,t):6===s.type&&(e=new nt(o,this,t)),this._$AV.push(e),s=i[++a]}r!==s?.index&&(o=V.nextNode(),r++)}return V.currentNode=P,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),I(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new J(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new Q(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new Z(this.O(j()),this.O(j()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class K{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,n){const o=this.strings;let r=!1;if(void 0===o)t=Y(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==G,r&&(this._$AH=t);else{const n=t;let a,s;for(t=o[0],a=0;a<o.length-1;a++)s=Y(this,n[i+a],e,a),s===G&&(s=this._$AH[a]),r||=!I(s)||s!==this._$AH[a],s===F?t=F:t!==F&&(t+=(s??"")+o[a+1]),this._$AH[a]=s}r&&!n&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class et extends K{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends K{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??F)===G)return;const i=this._$AH,n=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==F&&(i===F||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const ot=_.litHtmlPolyfillSupport;ot?.(Q,Z),(_.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new Z(e.insertBefore(j(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const st=rt.litElementPolyfillSupport;st?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");class lt{constructor(t){this.hass=t}subscribeToUpdates(t){const e=["shopping_list_manager_item_added","shopping_list_manager_item_updated","shopping_list_manager_item_checked","shopping_list_manager_item_deleted","shopping_list_manager_list_updated"].map(e=>this.hass.connection.subscribeEvents(t,e));return()=>{e.forEach(t=>t())}}async getLists(){return await this.hass.callWS({type:"shopping_list_manager/lists/get_all"})}async createList(t,e="mdi:cart"){return await this.hass.callWS({type:"shopping_list_manager/lists/create",name:t,icon:e})}async updateList(t,e){return await this.hass.callWS({type:"shopping_list_manager/lists/update",list_id:t,...e})}async deleteList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/delete",list_id:t})}async setActiveList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/set_active",list_id:t})}async incrementItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/increment",item_id:t,amount:e})}async getItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/get",list_id:t})}async addItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/add",list_id:t,...e})}async updateItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/update",item_id:t,...e})}async checkItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/check",item_id:t,checked:e})}async deleteItem(t){return await this.hass.callWS({type:"shopping_list_manager/items/delete",item_id:t})}async bulkCheckItems(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/bulk_check",item_ids:t,checked:e})}async clearCheckedItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/clear_checked",list_id:t})}async getListTotal(t){return await this.hass.callWS({type:"shopping_list_manager/items/get_total",list_id:t})}async searchProducts(t,e={}){return await this.hass.callWS({type:"shopping_list_manager/products/search",query:t,limit:e.limit||20,exclude_allergens:e.excludeAllergens,include_tags:e.includeTags,substitution_group:e.substitutionGroup})}async getProductSuggestions(t=20){return await this.hass.callWS({type:"shopping_list_manager/products/suggestions",limit:t})}async getProductSubstitutes(t,e=5){return await this.hass.callWS({type:"shopping_list_manager/products/substitutes",product_id:t,limit:e})}async addProduct(t){return await this.hass.callWS({type:"shopping_list_manager/products/add",...t})}async updateProduct(t,e){return await this.hass.callWS({type:"shopping_list_manager/products/update",product_id:t,...e})}async getCategories(){return await this.hass.callWS({type:"shopping_list_manager/categories/get_all"})}}class ct extends at{static properties={currentView:{type:String}};handleNavClick(t){this.dispatchEvent(new CustomEvent("nav-changed",{detail:{view:t},bubbles:!0,composed:!0}))}render(){return H`
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
    `}static styles=r`
    .bottom-nav {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      background: var(--slm-bg-surface);
      border-top: 1px solid var(--slm-border-subtle);
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
      color: var(--slm-text-secondary);
      cursor: pointer;
      transition: color 0.2s;
      -webkit-tap-highlight-color: transparent;
      outline: none;
    }
    .nav-item.active {
      color: var(--slm-accent-primary);
    }
    .emoji {
      font-size: 22px;
    }
    .label {
      font-size: 11px;
      font-weight: 500;
    }
  `}customElements.define("slm-bottom-nav",ct);class dt extends at{static properties={activeList:{type:Object},itemCount:{type:Number}};handleBack(){this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}handleShare(){this.dispatchEvent(new CustomEvent("share",{bubbles:!0,composed:!0}))}handleMenu(){alert("List menu coming soon")}render(){return H`
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
    `}static styles=r`
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
  `}customElements.define("slm-list-header",dt);class ut extends at{static properties={api:{type:Object},settings:{type:Object},categories:{type:Array},activeListId:{type:String},searchQuery:{type:String},searchResults:{type:Array},recentProducts:{type:Array},showResults:{type:Boolean}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.recentProducts=[],this.showResults=!1}async firstUpdated(){await this.loadRecentProducts()}async loadRecentProducts(){const t=localStorage.getItem("slm_recent_products"),e=t?JSON.parse(t):[],i=this.settings?.recentProductsCount||8;this.recentProducts=e.slice(0,i)}async handleSearch(t){if(this.searchQuery=t.target.value,this.searchQuery.length<1)this.showResults=!1;else{if(this.searchQuery.length>=2){const t=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=t.products||[]}else this.searchResults=[];this.showResults=!0}}handleProductSelect(t){this.dispatchEvent(new CustomEvent("add-item",{detail:{name:t.name,category_id:t.category_id,product_id:t.id,quantity:1,unit:t.default_unit,price:t.price,image_url:t.image_url},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1,this.shadowRoot.querySelector("input").blur()}handleAddCustom(){this.searchQuery.trim()&&(this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.searchQuery.trim(),category_id:"other",quantity:1,unit:"units"},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1)}render(){return H`
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
          ${this.searchQuery?H`
            <button class="clear-btn" @click=${()=>{this.searchQuery="",this.showResults=!1}}>
              ✖
            </button>
          `:""}
        </div>

        ${this.showResults?H`
          <div class="results-dropdown">
            ${this.searchResults.length>0?H`
              ${this.searchResults.map(t=>H`
                <button class="result-item" @click=${()=>this.handleProductSelect(t)}>
                  ${t.image_url?H`
                    <img src="${t.image_url}" alt="${t.name}">
                  `:H`
                    <div class="no-image">📦</div>
                  `}
                  <div class="result-info">
                    <div class="result-name">${t.name}</div>
                    ${t.price?H`
                      <div class="result-price">$${t.price.toFixed(2)}</div>
                    `:""}
                  </div>
                  <span class="add-icon">➕</span>
                </button>
              `)}
            `:H`
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
    `}static styles=r`
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
      box-shadow: 0 4px 16px rgba(--slm-shadow-soft);
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
  `}customElements.define("slm-search-bar",ut);class pt extends at{static properties={item:{type:Object},categoryColor:{type:String},isRecentlyUsed:{type:Boolean},touchStartX:{type:Number},touchStartY:{type:Number},touchStartTime:{type:Number},longPressTimer:{type:Number},longPressTriggered:{type:Boolean}};constructor(){super(),this.isRecentlyUsed=!1,this.touchStartX=0,this.touchStartY=0,this.touchStartTime=0,this.longPressTimer=null,this.longPressTriggered=!1}handleTileClick(t){this.longPressTriggered?this.longPressTriggered=!1:t.target.closest(".decrease-btn")||t.target.closest(".quantity-badge")||this.dispatchEvent(new CustomEvent("item-check",{detail:{itemId:this.item.id,checked:!this.item.checked},bubbles:!0,composed:!0}))}handleDecrease(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleQuantityClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleContextMenu(t){return t.preventDefault(),t.stopPropagation(),!1}handleTouchStart(t){this.touchStartX=t.touches[0].clientX,this.touchStartY=t.touches[0].clientY,this.touchStartTime=Date.now(),this.longPressTriggered=!1,this.longPressTimer=setTimeout(()=>{this.longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:this.item},bubbles:!0,composed:!0}))},500)}handleTouchMove(t){if(this.longPressTimer){const e=t.touches[0].clientX,i=t.touches[0].clientY,n=Math.abs(e-this.touchStartX),o=Math.abs(i-this.touchStartY);(n>10||o>10)&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}}handleTouchEnd(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}handleMouseDown(t){if(2===t.button)return t.preventDefault(),!1;this.longPressTriggered=!1,this.longPressTimer=setTimeout(()=>{this.longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:this.item},bubbles:!0,composed:!0}))},500)}handleMouseUp(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}handleMouseLeave(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}firstUpdated(){const t=this.shadowRoot.querySelector(".tile");t&&(t.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!0}),t.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!0}),t.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!0}),t.addEventListener("contextmenu",this.handleContextMenu.bind(this)))}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}render(){return H`
      <div 
        class="tile ${this.item.checked?"checked":""} ${this.isRecentlyUsed?"recently-used":""}"
        @click=${this.handleTileClick}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseLeave}
      >
        ${this.item.checked?"":H`
          <button class="decrease-btn" @click=${this.handleDecrease}>
            <span>−</span>
          </button>
        `}

        ${this.item.checked?"":H`
          <div 
            class="quantity-badge" 
            style="background: ${this.categoryColor}"
            @click=${this.handleQuantityClick}
          >
            ${this.item.quantity}
          </div>
        `}

        ${this.item.image_url?H`
          <img src="${this.item.image_url}" alt="${this.item.name}">
        `:H`
          <div class="no-image" style="background: ${this.categoryColor}15">
            <div class="emoji">${this.getCategoryEmoji(this.item.category_id)}</div>
          </div>
        `}

        <div class="info">
          <div class="name">${this.item.name}</div>
          ${this.item.price?H`
            <div class="price">$${(this.item.price*this.item.quantity).toFixed(2)}</div>
          `:""}
        </div>

        ${this.item.checked?H`
          <div class="checked-overlay">
            <span class="check-icon">✓</span>
          </div>
        `:""}
      </div>
    `}static styles=r`
    .tile {
      position: relative;
      background: var(--slm-tile-bg);
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
      opacity: var(--slm-tile-checked-opacity);
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
  `}customElements.define("slm-item-tile",pt);class ht extends at{constructor(){super(),console.log("GRID CONSTRUCTOR")}static properties={items:{type:Array},categories:{type:Array},settings:{type:Object},api:{type:Object},recentItems:{type:Array}};groupItemsByCategory(){const t={};return this.categories.forEach(e=>{t[e.id]={category:e,items:this.items.filter(t=>t.category_id===e.id&&!t.checked)}}),Object.values(t).filter(t=>t.items.length>0)}async getRecentlyUsedItems(){if(!this.api)return[];const t=localStorage.getItem("slm_recent_products"),e=t?JSON.parse(t):[],i=this.settings?.recentProductsCount||8,n=this.items.map(t=>t.product_id),o=e.filter(t=>!n.includes(t)).slice(0,i);if(0===o.length)return[];return(await Promise.all(o.map(t=>this.api.getProductSuggestions(1)))).flatMap(t=>t.products||[])}render(){const t=this.groupItemsByCategory(),e=this.getRecentlyUsedItems(),i=this.settings?.tilesPerRow||3;return H`
      <style>
        .items-grid {
          grid-template-columns: repeat(${i}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${e.length>0?H`
          <div class="category-section">
            <div class="category-header">
              <span class="emoji">⏱️</span>
              <span class="category-name">Recently Used</span>
            </div>
            <div class="items-grid">
              ${e.map(t=>H`
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

        ${0===t.length&&0===e.length?H`
          <div class="empty">
            <div class="empty-emoji">🛒</div>
            <p>Your shopping list is empty</p>
            <p class="hint">Search for products to add items</p>
          </div>
        `:""}

        ${t.map(t=>H`
          <div class="category-section">
            <div class="category-header">
              <span class="emoji">${this.getCategoryEmoji(t.category.id)}</span>
              <span class="category-name">${t.category.name}</span>
            </div>
            <div class="items-grid">
              ${t.items.map(e=>H`
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
    `}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}getPastelColor(t){return{"#4CAF50":"#a5d6a7","#2196F3":"#90caf9","#F44336":"#ef9a9a","#FF9800":"#ffcc80","#9C27B0":"#ce93d8","#795548":"#bcaaa4","#607D8B":"#b0bec5"}[t]||t}handleItemClick(t){t.stopPropagation(),console.log("GRID RECEIVED ITEM CLICK"),this.dispatchEvent(new CustomEvent("item-click",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemDecrease(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemCheck(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-check",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemLongPress(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-long-press",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemSwipeDelete(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-swipe-delete",{detail:t.detail,bubbles:!0,composed:!0}))}static styles=r`
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
      color: var(--slm-text-secondary);
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
      color: var(--slm-text-secondary);
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
  `}customElements.define("slm-item-grid",ht);class ft extends at{static properties={api:{type:Object},categories:{type:Array},searchQuery:{type:String},searchResults:{type:Array},selectedProduct:{type:Object},quantity:{type:Number},customName:{type:String}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.selectedProduct=null,this.quantity=1,this.customName=""}async handleSearch(t){if(this.searchQuery=t.target.value,this.searchQuery.length<2)return void(this.searchResults=[]);const e=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=e.products}selectProduct(t){this.selectedProduct=t,this.quantity=t.default_quantity,this.searchQuery="",this.searchResults=[]}handleAdd(){this.selectedProduct?this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.selectedProduct.name,category_id:this.selectedProduct.category_id,product_id:this.selectedProduct.id,quantity:this.quantity,unit:this.selectedProduct.default_unit,price:this.selectedProduct.price,image_url:this.selectedProduct.image_url},bubbles:!0,composed:!0})):this.customName&&this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.customName,category_id:"other",quantity:this.quantity,unit:"units"},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return H`
      <div class="overlay" @click=${this.handleClose}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-header">
            <h3>Add Item</h3>
            <button class="close-btn" @click=${this.handleClose}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="dialog-content">
            ${this.selectedProduct?H`
              <div class="selected-product">
                ${this.selectedProduct.image_url?H`
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

                ${this.selectedProduct.price?H`
                  <div class="total-price">
                    Total: $${(this.selectedProduct.price*this.quantity).toFixed(2)}
                  </div>
                `:""}
              </div>
            `:H`
              <div class="search-section">
                <input
                  type="text"
                  placeholder="Search products..."
                  .value=${this.searchQuery}
                  @input=${this.handleSearch}
                  autofocus
                />

                ${this.searchResults.length>0?H`
                  <div class="results">
                    ${this.searchResults.map(t=>H`
                      <div class="result-item" @click=${()=>this.selectProduct(t)}>
                        ${t.image_url?H`
                          <img src="${t.image_url}" alt="${t.name}">
                        `:H`
                          <div class="no-image">
                            <ha-icon icon="mdi:food-variant"></ha-icon>
                          </div>
                        `}
                        <div class="result-info">
                          <div class="result-name">${t.name}</div>
                          ${t.price?H`
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
    `}static styles=r`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(--slm-shadow-medium);
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
  `}customElements.define("slm-add-item-dialog",ft);class gt extends at{static properties={api:{type:Object},item:{type:Object},categories:{type:Array},editedItem:{type:Object},imagePreview:{type:String}};constructor(){super(),this.editedItem={},this.imagePreview=null}updated(t){t.has("item")&&this.item&&(this.editedItem={name:this.item.name,quantity:this.item.quantity,unit:this.item.unit,notes:this.item.notes||"",image_url:this.item.image_url||""},this.imagePreview=this.item.image_url||null)}handleSave(){this.dispatchEvent(new CustomEvent("save-item",{detail:{itemId:this.item.id,data:this.editedItem},bubbles:!0,composed:!0}))}handleDelete(){confirm(`Delete ${this.item.name}?`)&&this.dispatchEvent(new CustomEvent("delete-item",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleDuplicate(){alert("Duplicate feature coming soon")}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}handleImageUrlInput(t){const e=t.target.value;this.editedItem={...this.editedItem,image_url:e},this.imagePreview=e||null}handleFilePick(){const t=this.shadowRoot.querySelector("#file-input");t&&t.click()}handleFileChange(t){const e=t.target.files[0];if(!e)return;const i=new FileReader;i.onload=t=>{const e=t.target.result;this.editedItem={...this.editedItem,image_url:e},this.imagePreview=e},i.readAsDataURL(e)}handleClearImage(){this.editedItem={...this.editedItem,image_url:""},this.imagePreview=null;const t=this.shadowRoot.querySelector("#file-input");t&&(t.value="");const e=this.shadowRoot.querySelector("#image-url-input");e&&(e.value="")}render(){return this.item?H`
      <div class="overlay" @click=${this.handleClose}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-header">
            <h3>Edit Item</h3>
            <button class="close-btn" @click=${this.handleClose}>✕</button>
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

            ${this.item.price?H`
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

            <div class="form-group image-section">
              <label>Product Image</label>

              ${this.imagePreview?H`
                <div class="image-preview-wrap">
                  <img class="image-preview" src="${this.imagePreview}" alt="Product image" />
                  <button class="clear-image-btn" @click=${this.handleClearImage} title="Remove image">✕</button>
                </div>
              `:""}

              <div class="image-url-row">
                <input
                  id="image-url-input"
                  type="url"
                  placeholder="Paste image URL..."
                  .value=${this.editedItem.image_url&&!this.editedItem.image_url.startsWith("data:")?this.editedItem.image_url:""}
                  @input=${this.handleImageUrlInput}
                />
                <button class="browse-btn" @click=${this.handleFilePick} title="Browse local file">
                  📁
                </button>
              </div>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style="display:none"
                @change=${this.handleFileChange}
              />
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
    `:H``}static styles=r`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.55);
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
      width: 95%;
      max-width: 500px;
      margin: 0 auto;
      background: var(--slm-bg-surface, #ffffff);
      color: var(--slm-text-primary, #424242);
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
      border-bottom: 1px solid var(--slm-border-subtle, #e8eaf6);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: var(--slm-text-primary, #424242);
    }
    .close-btn {
      background: none;
      border: none;
      padding: 4px 8px;
      cursor: pointer;
      font-size: 18px;
      color: var(--slm-text-secondary, #757575);
      line-height: 1;
      border-radius: 6px;
    }
    .close-btn:hover {
      background: var(--slm-border-subtle, #e8eaf6);
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
      color: var(--slm-text-secondary, #757575);
    }
    .form-group input,
    .form-group textarea {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 12px;
      border: 2px solid var(--slm-border-subtle, #e8eaf6);
      border-radius: 8px;
      font-size: 15px;
      font-family: inherit;
      color: var(--slm-text-primary, #424242);
      background: var(--slm-bg-elevated, #ffffff);
      transition: border-color 0.15s;
    }
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--slm-accent-primary, #9fa8da);
    }
    .form-group textarea {
      resize: vertical;
    }
    .price-info {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: var(--slm-bg-main, #fafbfc);
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 15px;
      color: var(--slm-text-primary, #424242);
    }
    .price-value {
      font-weight: 700;
      color: var(--slm-accent-primary, #9fa8da);
    }

    /* Image section */
    .image-section {}
    .image-preview-wrap {
      position: relative;
      display: inline-block;
      margin-bottom: 10px;
    }
    .image-preview {
      display: block;
      width: 100%;
      max-height: 180px;
      object-fit: contain;
      border-radius: 8px;
      border: 2px solid var(--slm-border-subtle, #e8eaf6);
      background: var(--slm-bg-main, #fafbfc);
    }
    .clear-image-btn {
      position: absolute;
      top: 6px;
      right: 6px;
      background: rgba(0,0,0,0.55);
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      line-height: 1;
    }
    .image-url-row {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }
    .image-url-row input {
      flex: 1;
    }
    .browse-btn {
      flex-shrink: 0;
      padding: 0 12px;
      border: 2px solid var(--slm-border-subtle, #e8eaf6);
      border-radius: 8px;
      background: var(--slm-bg-elevated, #ffffff);
      color: var(--slm-text-primary, #424242);
      font-size: 18px;
      cursor: pointer;
      transition: border-color 0.15s;
    }
    .browse-btn:hover {
      border-color: var(--slm-accent-primary, #9fa8da);
    }

    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--slm-border-subtle, #e8eaf6);
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
      background: var(--slm-bg-main, #fafbfc);
      color: var(--slm-text-primary, #424242);
      border: 1px solid var(--slm-border-subtle, #e8eaf6);
    }
    .action-btn.danger {
      background: var(--slm-accent-danger, #ef9a9a);
      color: white;
    }
    .action-btn:active {
      transform: scale(0.97);
    }
  `}customElements.define("slm-edit-item-dialog",gt);class mt extends at{static properties={list:{type:Object},isActive:{type:Boolean},itemCount:{type:Number},totalCost:{type:Number},currency:{type:String},emoji:{type:String},showMenu:{type:Boolean},menuX:{type:Number},menuY:{type:Number}};constructor(){super(),this.showMenu=!1,this.itemCount=0,this.totalCost=0,this.currency="NZD",this.menuX=0,this.menuY=0}getColorClass(){return`color-${parseInt(this.list.id.slice(-1),16)%6}`}dimColor(t){return`rgba(${parseInt(t.slice(1,3),16)}, ${parseInt(t.slice(3,5),16)}, ${parseInt(t.slice(5,7),16)}, 0.5)`}handleCardClick(t){t.target.closest(".menu-btn")||this.dispatchEvent(new CustomEvent("list-select",{detail:{listId:this.list.id},bubbles:!0,composed:!0}))}handleMenuClick(t){t.stopPropagation();const e=t.target.closest(".menu-btn").getBoundingClientRect();this.menuX=e.right-160,this.menuY=e.bottom+5,this.showMenu=!this.showMenu}handleAction(t,e){e.stopPropagation(),this.showMenu=!1,this.dispatchEvent(new CustomEvent("list-action",{detail:{action:t,listId:this.list.id},bubbles:!0,composed:!0}))}render(){return H`
      <div 
        class="list-card ${this.isActive?"active":"inactive"} ${this.getColorClass()}"
        @click=${this.handleCardClick}
      >

        ${this.isActive?H`
          <div class="active-badge">Active</div>
        `:""}

        <div class="card-header">
          <ha-icon icon="${this.list.icon}"></ha-icon>
          <h3>${this.list.name}</h3>
        </div>

        <div class="card-stats">
          <span>${this.itemCount}</span>
          <span class="separator">·</span>
          <span>${this.currency} $${this.totalCost.toFixed(2)}</span>
        </div>


        <button class="menu-btn" @click=${this.handleMenuClick}>
          <ha-icon icon="mdi:dots-vertical"></ha-icon>
        </button>

        ${this.showMenu?H`
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
    `}static styles=r`
    .list-card {
      position: relative;
      border-radius: 14px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.25s ease;
      height: 110px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: white;
      overflow: hidden;
    }

    .list-card.active {
      box-shadow: var(--slm-shadow-medium);
      transform: scale(1);
    }

    .list-card.inactive {
      opacity: 0.65;
      filter: saturate(0.6);
      box-shadow: none;
    }

    .list-card:active {
      transform: scale(0.97);
    }

    /* ===============================
      Color Gradients
    ================================ */

    .color-0 { background: linear-gradient(135deg, #7986cb, #9fa8da); }
    .color-1 { background: linear-gradient(135deg, #81c784, #a5d6a7); }
    .color-2 { background: linear-gradient(135deg, #ffb74d, #ffcc80); }
    .color-3 { background: linear-gradient(135deg, #ba68c8, #ce93d8); }
    .color-4 { background: linear-gradient(135deg, #4dd0e1, #80deea); }
    .color-5 { background: linear-gradient(135deg, #f06292, #f48fb1); }

    /* Dark Mode Adjustments */

    :host([data-theme="dark"]) .color-0 { background: linear-gradient(135deg, #5c6bc0, #7986cb); }
    :host([data-theme="dark"]) .color-1 { background: linear-gradient(135deg, #43a047, #66bb6a); }
    :host([data-theme="dark"]) .color-2 { background: linear-gradient(135deg, #fb8c00, #ffb74d); }
    :host([data-theme="dark"]) .color-3 { background: linear-gradient(135deg, #8e24aa, #ab47bc); }
    :host([data-theme="dark"]) .color-4 { background: linear-gradient(135deg, #00838f, #26c6da); }
    :host([data-theme="dark"]) .color-5 { background: linear-gradient(135deg, #c2185b, #ec407a); }

    .active-badge {
      position: absolute;
      top: 8px;
      left: 8px;
      background: rgba(255,255,255,0.25);
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .card-header ha-icon {
      --mdc-icon-size: 28px;
      flex-shrink: 0;
    }
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      flex: 1;
    }
    .card-stats {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 600;
      opacity: 0.95;
    }
    .separator {
      opacity: 0.6;
    }
    .menu-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255,255,255,0.15);
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
      background: var(--slm-bg-elevated);
      box-shadow: var(--slm-shadow-medium);
      border-radius: 10px;
      overflow: hidden;
      min-width: 160px;
      z-index: 10000;
    }
    .menu-popup button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border: none;
      background: transparent;
      color: var(--slm-text-primary);
      cursor: pointer;
      font-size: 14px;
      text-align: left;
      -webkit-tap-highlight-color: transparent;
    }
    .menu-popup button:active {
      background:  var(--slm-bg-surface);
    }
    .menu-popup button.danger {
      color: var(--slm-accent-danger);
    }
    .menu-popup button.danger:active {
      background: #ef5350;
      color: white;
    }
    .menu-popup ha-icon {
      --mdc-icon-size: 20px;
    }
  `}customElements.define("slm-list-card",mt);class bt extends at{static properties={api:{type:Object},lists:{type:Array},activeList:{type:Object},items:{type:Array},total:{type:Object},listTotals:{type:Object},showCreateDialog:{type:Boolean},newListName:{type:String},newListIcon:{type:String}};constructor(){super(),this.lists=[],this.showCreateDialog=!1,this.listTotals={},this.newListName="",this.newListIcon="mdi:cart"}handleCreateList(){this.showCreateDialog=!0}async loadTotals(){if(!this.api||!this.lists?.length)return;const t={};await Promise.all(this.lists.map(async e=>{try{const i=await this.api.getListTotal(e.id);t[e.id]=i}catch(t){console.error("Failed to load total for list",e.id,t)}})),this.listTotals=t}async handleSaveNewList(){this.newListName.trim()&&(await this.api.createList(this.newListName,this.newListIcon),this.showCreateDialog=!1,this.newListName="",this.newListIcon="mdi:cart",this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})))}handleListSelect(t){this.dispatchEvent(new CustomEvent("list-selected",{detail:t.detail,bubbles:!0,composed:!0}))}async handleListAction(t){const{action:e,listId:i}=t.detail;switch(e){case"rename":const t=prompt("Enter new list name:");t&&(await this.api.updateList(i,{name:t}),this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})));break;case"delete":confirm("Delete this list?")&&(await this.api.deleteList(i),this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})));break;case"share":alert("Share feature coming soon!");break;case"copy":alert("Copy feature coming soon!")}}getListEmoji(t){return{"mdi:cart":"🛒","mdi:home":"🏠","mdi:food":"🍽️","mdi:shopping":"🛍️","mdi:store":"🏪"}[t]||"🛒"}updated(t){t.has("lists")&&this.loadTotals()}render(){return H`
      <div class="lists-view">
        <div class="header">
          <h2>My Lists</h2>
          <button class="create-btn" @click=${this.handleCreateList}>
            <span class="emoji">➕</span>
            New List
          </button>
        </div>

        ${0===this.lists.length?H`
          <div class="empty">
            <div class="empty-emoji">📋</div>
            <p>No lists yet</p>
            <p class="hint">Create your first shopping list</p>
            <button class="primary-btn" @click=${this.handleCreateList}>
              <span class="emoji">➕</span>
              Create List
            </button>
          </div>
        `:H`
          <div class="lists-grid">
            ${this.lists.map(t=>H`
              <slm-list-card
                .list=${t}
                .isActive=${t.id===this.activeList?.id}
                .itemCount=${t.id===this.activeList?.id?this.items.filter(t=>!t.checked).length:this.listTotals[t.id]?.item_count||0}

                .totalCost=${t.id===this.activeList?.id?this.total.total:this.listTotals[t.id]?.total||0}

                .currency=${this.listTotals[t.id]?.currency||this.total?.currency||"NZD"}

                .emoji=${this.getListEmoji(t.icon)}
                @list-select=${this.handleListSelect}
                @list-action=${this.handleListAction}
              ></slm-list-card>
            `)}
          </div>
        `}

        ${this.showCreateDialog?H`
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
                  ${["mdi:cart","mdi:home","mdi:food","mdi:shopping","mdi:store"].map(t=>H`
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
    `}static styles=r`
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
      box-shadow: 0 2px 6px rgba(--slm-shadow-soft);
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
      box-shadow: 0 3px 8px rgba(--slm-shadow-soft);
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
      background: rgba(--slm-shadow-medium);
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
  `}function vt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}customElements.define("slm-lists-view",bt);var yt={},xt={},wt={};Object.defineProperty(wt,"__esModule",{value:!0});wt.default=function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.data=e,this.text=i.text||e,this.options=i},Object.defineProperty(xt,"__esModule",{value:!0}),xt.CODE39=void 0;var _t,$t=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),kt=(_t=wt)&&_t.__esModule?_t:{default:_t};var Et=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e=e.toUpperCase(),i.mod43&&(e+=function(t){return Ot[t]}(function(t){for(var e=0,i=0;i<t.length;i++)e+=At(t[i]);return e%=43,e}(e))),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,kt.default),$t(t,[{key:"encode",value:function(){for(var t=St("*"),e=0;e<this.data.length;e++)t+=St(this.data[e])+"0";return{data:t+=St("*"),text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)}}]),t}(),Ot=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],Ct=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];function St(t){return function(t){return Ct[t].toString(2)}(At(t))}function At(t){return Ot.indexOf(t)}xt.CODE39=Et;var Pt,jt={},It={},Tt={},Lt={};function Mt(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}Object.defineProperty(Lt,"__esModule",{value:!0});var Rt=Lt.SET_A=0,Dt=Lt.SET_B=1,zt=Lt.SET_C=2;Lt.SHIFT=98;var Nt=Lt.START_A=103,Ut=Lt.START_B=104,Bt=Lt.START_C=105;Lt.MODULO=103,Lt.STOP=106,Lt.FNC1=207,Lt.SET_BY_CODE=(Mt(Pt={},Nt,Rt),Mt(Pt,Ut,Dt),Mt(Pt,Bt,zt),Pt),Lt.SWAP={101:Rt,100:Dt,99:zt},Lt.A_START_CHAR=String.fromCharCode(208),Lt.B_START_CHAR=String.fromCharCode(209),Lt.C_START_CHAR=String.fromCharCode(210),Lt.A_CHARS="[\0-_È-Ï]",Lt.B_CHARS="[ -È-Ï]",Lt.C_CHARS="(Ï*[0-9]{2}Ï*)",Lt.BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011],Object.defineProperty(Tt,"__esModule",{value:!0});var Ht=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Gt=function(t){return t&&t.__esModule?t:{default:t}}(wt),Ft=Lt;var Xt=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.substring(1),i));return n.bytes=e.split("").map(function(t){return t.charCodeAt(0)}),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Gt.default),Ht(t,[{key:"valid",value:function(){return/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function(){var e=this.bytes,i=e.shift()-105,n=Ft.SET_BY_CODE[i];if(void 0===n)throw new RangeError("The encoding does not start with a start character.");!0===this.shouldEncodeAsEan128()&&e.unshift(Ft.FNC1);var o=t.next(e,1,n);return{text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:t.getBar(i)+o.result+t.getBar((o.checksum+i)%Ft.MODULO)+t.getBar(Ft.STOP)}}},{key:"shouldEncodeAsEan128",value:function(){var t=this.options.ean128||!1;return"string"==typeof t&&(t="true"===t.toLowerCase()),t}}],[{key:"getBar",value:function(t){return Ft.BARS[t]?Ft.BARS[t].toString():""}},{key:"correctIndex",value:function(t,e){if(e===Ft.SET_A){var i=t.shift();return i<32?i+64:i-32}return e===Ft.SET_B?t.shift()-32:10*(t.shift()-48)+t.shift()-48}},{key:"next",value:function(e,i,n){if(!e.length)return{result:"",checksum:0};var o=void 0,r=void 0;if(e[0]>=200){r=e.shift()-105;var a=Ft.SWAP[r];void 0!==a?o=t.next(e,i+1,a):(n!==Ft.SET_A&&n!==Ft.SET_B||r!==Ft.SHIFT||(e[0]=n===Ft.SET_A?e[0]>95?e[0]-96:e[0]:e[0]<32?e[0]+96:e[0]),o=t.next(e,i+1,n))}else r=t.correctIndex(e,n),o=t.next(e,i+1,n);var s=r*i;return{result:t.getBar(r)+o.result,checksum:s+o.checksum}}}]),t}();Tt.default=Xt;var Vt={};Object.defineProperty(Vt,"__esModule",{value:!0});var qt=Lt,Wt=function(t){return t.match(new RegExp("^"+qt.A_CHARS+"*"))[0].length},Qt=function(t){return t.match(new RegExp("^"+qt.B_CHARS+"*"))[0].length},Yt=function(t){return t.match(new RegExp("^"+qt.C_CHARS+"*"))[0]};function Jt(t,e){var i=e?qt.A_CHARS:qt.B_CHARS,n=t.match(new RegExp("^("+i+"+?)(([0-9]{2}){2,})([^0-9]|$)"));if(n)return n[1]+String.fromCharCode(204)+Zt(t.substring(n[1].length));var o=t.match(new RegExp("^"+i+"+"))[0];return o.length===t.length?t:o+String.fromCharCode(e?205:206)+Jt(t.substring(o.length),!e)}function Zt(t){var e=Yt(t),i=e.length;if(i===t.length)return t;t=t.substring(i);var n=Wt(t)>=Qt(t);return e+String.fromCharCode(n?206:205)+Jt(t,n)}Vt.default=function(t){var e=void 0;if(Yt(t).length>=2)e=qt.C_START_CHAR+Zt(t);else{var i=Wt(t)>Qt(t);e=(i?qt.A_START_CHAR:qt.B_START_CHAR)+Jt(t,i)}return e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(t,e){return String.fromCharCode(203)+e})},Object.defineProperty(It,"__esModule",{value:!0});var Kt=ee(Tt),te=ee(Vt);function ee(t){return t&&t.__esModule?t:{default:t}}function ie(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var ne=function(){function t(e,i){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),/^[\x00-\x7F\xC8-\xD3]+$/.test(e))var n=ie(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,(0,te.default)(e),i));else n=ie(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return ie(n)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Kt.default),t}();It.default=ne;var oe={};Object.defineProperty(oe,"__esModule",{value:!0});var re=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),ae=function(t){return t&&t.__esModule?t:{default:t}}(Tt),se=Lt;var le=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,se.A_START_CHAR+e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ae.default),re(t,[{key:"valid",value:function(){return new RegExp("^"+se.A_CHARS+"+$").test(this.data)}}]),t}();oe.default=le;var ce={};Object.defineProperty(ce,"__esModule",{value:!0});var de=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),ue=function(t){return t&&t.__esModule?t:{default:t}}(Tt),pe=Lt;var he=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,pe.B_START_CHAR+e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ue.default),de(t,[{key:"valid",value:function(){return new RegExp("^"+pe.B_CHARS+"+$").test(this.data)}}]),t}();ce.default=he;var fe={};Object.defineProperty(fe,"__esModule",{value:!0});var ge=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),me=function(t){return t&&t.__esModule?t:{default:t}}(Tt),be=Lt;var ve=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,be.C_START_CHAR+e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,me.default),ge(t,[{key:"valid",value:function(){return new RegExp("^"+be.C_CHARS+"+$").test(this.data)}}]),t}();fe.default=ve,Object.defineProperty(jt,"__esModule",{value:!0}),jt.CODE128C=jt.CODE128B=jt.CODE128A=jt.CODE128=void 0;var ye=$e(It),xe=$e(oe),we=$e(ce),_e=$e(fe);function $e(t){return t&&t.__esModule?t:{default:t}}jt.CODE128=ye.default,jt.CODE128A=xe.default,jt.CODE128B=we.default,jt.CODE128C=_e.default;var ke={},Ee={},Oe={};Object.defineProperty(Oe,"__esModule",{value:!0}),Oe.SIDE_BIN="101",Oe.MIDDLE_BIN="01010",Oe.BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]},Oe.EAN2_STRUCTURE=["LL","LG","GL","GG"],Oe.EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"],Oe.EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];var Ce={},Se={};Object.defineProperty(Se,"__esModule",{value:!0});var Ae=Oe;Se.default=function(t,e,i){var n=t.split("").map(function(t,i){return Ae.BINARIES[e[i]]}).map(function(e,i){return e?e[t[i]]:""});if(i){var o=t.length-1;n=n.map(function(t,e){return e<o?t+i:t})}return n.join("")},Object.defineProperty(Ce,"__esModule",{value:!0});var Pe=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),je=Oe,Ie=Le(Se),Te=Le(wt);function Le(t){return t&&t.__esModule?t:{default:t}}var Me=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return n.fontSize=!i.flat&&i.fontSize>10*i.width?10*i.width:i.fontSize,n.guardHeight=i.height+n.fontSize/2+i.textMargin,n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Te.default),Pe(t,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function(t,e){return this.text.substr(t,e)}},{key:"leftEncode",value:function(t,e){return(0,Ie.default)(t,e)}},{key:"rightText",value:function(t,e){return this.text.substr(t,e)}},{key:"rightEncode",value:function(t,e){return(0,Ie.default)(t,e)}},{key:"encodeGuarded",value:function(){var t={fontSize:this.fontSize},e={height:this.guardHeight};return[{data:je.SIDE_BIN,options:e},{data:this.leftEncode(),text:this.leftText(),options:t},{data:je.MIDDLE_BIN,options:e},{data:this.rightEncode(),text:this.rightText(),options:t},{data:je.SIDE_BIN,options:e}]}},{key:"encodeFlat",value:function(){return{data:[je.SIDE_BIN,this.leftEncode(),je.MIDDLE_BIN,this.rightEncode(),je.SIDE_BIN].join(""),text:this.text}}}]),t}();Ce.default=Me,Object.defineProperty(Ee,"__esModule",{value:!0});var Re=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),De=function t(e,i,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,i);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,i,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0},ze=Oe,Ne=function(t){return t&&t.__esModule?t:{default:t}}(Ce);var Ue=function(t){var e=t.substr(0,12).split("").map(function(t){return+t}).reduce(function(t,e,i){return i%2?t+3*e:t+e},0);return(10-e%10)%10},Be=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{12}$/)&&(e+=Ue(e));var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return n.lastChar=i.lastChar,n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Ne.default),Re(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{13}$/)&&+this.data[12]===Ue(this.data)}},{key:"leftText",value:function(){return De(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function(){var e=this.data.substr(1,6),i=ze.EAN13_STRUCTURE[this.data[0]];return De(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftEncode",this).call(this,e,i)}},{key:"rightText",value:function(){return De(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function(){var e=this.data.substr(7,6);return De(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightEncode",this).call(this,e,"RRRRRR")}},{key:"encodeGuarded",value:function(){var e=De(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(e.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(e.push({data:"00"}),e.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),e}}]),t}();Ee.default=Be;var He={};Object.defineProperty(He,"__esModule",{value:!0});var Ge=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Fe=function t(e,i,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,i);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:t(r,i,n)}if("value"in o)return o.value;var a=o.get;return void 0!==a?a.call(n):void 0},Xe=function(t){return t&&t.__esModule?t:{default:t}}(Ce);var Ve=function(t){var e=t.substr(0,7).split("").map(function(t){return+t}).reduce(function(t,e,i){return i%2?t+e:t+3*e},0);return(10-e%10)%10},qe=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{7}$/)&&(e+=Ve(e)),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Xe.default),Ge(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{8}$/)&&+this.data[7]===Ve(this.data)}},{key:"leftText",value:function(){return Fe(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function(){var e=this.data.substr(0,4);return Fe(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftEncode",this).call(this,e,"LLLL")}},{key:"rightText",value:function(){return Fe(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function(){var e=this.data.substr(4,4);return Fe(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightEncode",this).call(this,e,"RRRR")}}]),t}();He.default=qe;var We={};Object.defineProperty(We,"__esModule",{value:!0});var Qe=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Ye=Oe,Je=Ke(Se),Ze=Ke(wt);function Ke(t){return t&&t.__esModule?t:{default:t}}var ti=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Ze.default),Qe(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{5}$/)}},{key:"encode",value:function(){var t,e,i=Ye.EAN5_STRUCTURE[(t=this.data,e=t.split("").map(function(t){return+t}).reduce(function(t,e,i){return i%2?t+9*e:t+3*e},0),e%10)];return{data:"1011"+(0,Je.default)(this.data,i,"01"),text:this.text}}}]),t}();We.default=ti;var ei={};Object.defineProperty(ei,"__esModule",{value:!0});var ii=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),ni=Oe,oi=ai(Se),ri=ai(wt);function ai(t){return t&&t.__esModule?t:{default:t}}var si=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ri.default),ii(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{2}$/)}},{key:"encode",value:function(){var t=ni.EAN2_STRUCTURE[parseInt(this.data)%4];return{data:"1011"+(0,oi.default)(this.data,t,"01"),text:this.text}}}]),t}();ei.default=si;var li={};Object.defineProperty(li,"__esModule",{value:!0});var ci=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();li.checksum=fi;var di=pi(Se),ui=pi(wt);function pi(t){return t&&t.__esModule?t:{default:t}}var hi=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{11}$/)&&(e+=fi(e));var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return n.displayValue=i.displayValue,i.fontSize>10*i.width?n.fontSize=10*i.width:n.fontSize=i.fontSize,n.guardHeight=i.height+n.fontSize/2+i.textMargin,n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ui.default),ci(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{12}$/)&&this.data[11]==fi(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=(0,di.default)(this.data.substr(0,6),"LLLLLL"),t+="01010",t+=(0,di.default)(this.data.substr(6,6),"RRRRRR"),{data:t+="101",text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101"+(0,di.default)(this.data[0],"L"),options:{height:this.guardHeight}}),t.push({data:(0,di.default)(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),t.push({data:"01010",options:{height:this.guardHeight}}),t.push({data:(0,di.default)(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),t.push({data:(0,di.default)(this.data[11],"R")+"101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),t}}]),t}();function fi(t){var e,i=0;for(e=1;e<11;e+=2)i+=parseInt(t[e]);for(e=0;e<11;e+=2)i+=3*parseInt(t[e]);return(10-i%10)%10}li.default=hi;var gi={};Object.defineProperty(gi,"__esModule",{value:!0});var mi=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),bi=xi(Se),vi=xi(wt),yi=li;function xi(t){return t&&t.__esModule?t:{default:t}}function wi(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var _i=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],$i=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],ki=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n=wi(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));if(n.isValid=!1,-1!==e.search(/^[0-9]{6}$/))n.middleDigits=e,n.upcA=Ei(e,"0"),n.text=i.text||""+n.upcA[0]+e+n.upcA[n.upcA.length-1],n.isValid=!0;else{if(-1===e.search(/^[01][0-9]{7}$/))return wi(n);if(n.middleDigits=e.substring(1,e.length-1),n.upcA=Ei(n.middleDigits,e[0]),n.upcA[n.upcA.length-1]!==e[e.length-1])return wi(n);n.isValid=!0}return n.displayValue=i.displayValue,i.fontSize>10*i.width?n.fontSize=10*i.width:n.fontSize=i.fontSize,n.guardHeight=i.height+n.fontSize/2+i.textMargin,n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,vi.default),mi(t,[{key:"valid",value:function(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=this.encodeMiddleDigits(),{data:t+="010101",text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101",options:{height:this.guardHeight}}),t.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),t.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),t}},{key:"encodeMiddleDigits",value:function(){var t=this.upcA[0],e=this.upcA[this.upcA.length-1],i=$i[parseInt(e)][parseInt(t)];return(0,bi.default)(this.middleDigits,i)}}]),t}();function Ei(t,e){for(var i=parseInt(t[t.length-1]),n=_i[i],o="",r=0,a=0;a<n.length;a++){var s=n[a];o+="X"===s?t[r++]:s}return""+(o=""+e+o)+(0,yi.checksum)(o)}gi.default=ki,Object.defineProperty(ke,"__esModule",{value:!0}),ke.UPCE=ke.UPC=ke.EAN2=ke.EAN5=ke.EAN8=ke.EAN13=void 0;var Oi=Ii(Ee),Ci=Ii(He),Si=Ii(We),Ai=Ii(ei),Pi=Ii(li),ji=Ii(gi);function Ii(t){return t&&t.__esModule?t:{default:t}}ke.EAN13=Oi.default,ke.EAN8=Ci.default,ke.EAN5=Si.default,ke.EAN2=Ai.default,ke.UPC=Pi.default,ke.UPCE=ji.default;var Ti={},Li={},Mi={};Object.defineProperty(Mi,"__esModule",{value:!0}),Mi.START_BIN="1010",Mi.END_BIN="11101",Mi.BINARIES=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"],Object.defineProperty(Li,"__esModule",{value:!0});var Ri=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Di=Mi,zi=function(t){return t&&t.__esModule?t:{default:t}}(wt);var Ni=function(){function t(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,zi.default),Ri(t,[{key:"valid",value:function(){return-1!==this.data.search(/^([0-9]{2})+$/)}},{key:"encode",value:function(){var t=this,e=this.data.match(/.{2}/g).map(function(e){return t.encodePair(e)}).join("");return{data:Di.START_BIN+e+Di.END_BIN,text:this.text}}},{key:"encodePair",value:function(t){var e=Di.BINARIES[t[1]];return Di.BINARIES[t[0]].split("").map(function(t,i){return("1"===t?"111":"1")+("1"===e[i]?"000":"0")}).join("")}}]),t}();Li.default=Ni;var Ui={};Object.defineProperty(Ui,"__esModule",{value:!0});var Bi=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Hi=function(t){return t&&t.__esModule?t:{default:t}}(Li);var Gi=function(t){var e=t.substr(0,13).split("").map(function(t){return parseInt(t,10)}).reduce(function(t,e,i){return t+e*(3-i%2*2)},0);return 10*Math.ceil(e/10)-e},Fi=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{13}$/)&&(e+=Gi(e)),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Hi.default),Bi(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{14}$/)&&+this.data[13]===Gi(this.data)}}]),t}();Ui.default=Fi,Object.defineProperty(Ti,"__esModule",{value:!0}),Ti.ITF14=Ti.ITF=void 0;var Xi=qi(Li),Vi=qi(Ui);function qi(t){return t&&t.__esModule?t:{default:t}}Ti.ITF=Xi.default,Ti.ITF14=Vi.default;var Wi={},Qi={};Object.defineProperty(Qi,"__esModule",{value:!0});var Yi=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Ji=function(t){return t&&t.__esModule?t:{default:t}}(wt);var Zi=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Ji.default),Yi(t,[{key:"encode",value:function(){for(var t="110",e=0;e<this.data.length;e++){var i=parseInt(this.data[e]).toString(2);i=Ki(i,4-i.length);for(var n=0;n<i.length;n++)t+="0"==i[n]?"100":"110"}return{data:t+="1001",text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]+$/)}}]),t}();function Ki(t,e){for(var i=0;i<e;i++)t="0"+t;return t}Qi.default=Zi;var tn={},en={};Object.defineProperty(en,"__esModule",{value:!0}),en.mod10=function(t){for(var e=0,i=0;i<t.length;i++){var n=parseInt(t[i]);(i+t.length)%2==0?e+=n:e+=2*n%10+Math.floor(2*n/10)}return(10-e%10)%10},en.mod11=function(t){for(var e=0,i=[2,3,4,5,6,7],n=0;n<t.length;n++){var o=parseInt(t[t.length-1-n]);e+=i[n%i.length]*o}return(11-e%11)%11},Object.defineProperty(tn,"__esModule",{value:!0});var nn=function(t){return t&&t.__esModule?t:{default:t}}(Qi),on=en;var rn=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e+(0,on.mod10)(e),i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,nn.default),t}();tn.default=rn;var an={};Object.defineProperty(an,"__esModule",{value:!0});var sn=function(t){return t&&t.__esModule?t:{default:t}}(Qi),ln=en;var cn=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e+(0,ln.mod11)(e),i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,sn.default),t}();an.default=cn;var dn={};Object.defineProperty(dn,"__esModule",{value:!0});var un=function(t){return t&&t.__esModule?t:{default:t}}(Qi),pn=en;var hn=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e+=(0,pn.mod10)(e),e+=(0,pn.mod10)(e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,un.default),t}();dn.default=hn;var fn={};Object.defineProperty(fn,"__esModule",{value:!0});var gn=function(t){return t&&t.__esModule?t:{default:t}}(Qi),mn=en;var bn=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e+=(0,mn.mod11)(e),e+=(0,mn.mod10)(e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,gn.default),t}();fn.default=bn,Object.defineProperty(Wi,"__esModule",{value:!0}),Wi.MSI1110=Wi.MSI1010=Wi.MSI11=Wi.MSI10=Wi.MSI=void 0;var vn=$n(Qi),yn=$n(tn),xn=$n(an),wn=$n(dn),_n=$n(fn);function $n(t){return t&&t.__esModule?t:{default:t}}Wi.MSI=vn.default,Wi.MSI10=yn.default,Wi.MSI11=xn.default,Wi.MSI1010=wn.default,Wi.MSI1110=_n.default;var kn={};Object.defineProperty(kn,"__esModule",{value:!0}),kn.pharmacode=void 0;var En=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),On=function(t){return t&&t.__esModule?t:{default:t}}(wt);var Cn=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return n.number=parseInt(e,10),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,On.default),En(t,[{key:"encode",value:function(){for(var t=this.number,e="";!isNaN(t)&&0!=t;)t%2==0?(e="11100"+e,t=(t-2)/2):(e="100"+e,t=(t-1)/2);return{data:e=e.slice(0,-2),text:this.text}}},{key:"valid",value:function(){return this.number>=3&&this.number<=131070}}]),t}();kn.pharmacode=Cn;var Sn={};Object.defineProperty(Sn,"__esModule",{value:!0}),Sn.codabar=void 0;var An=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Pn=function(t){return t&&t.__esModule?t:{default:t}}(wt);var jn=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),0===e.search(/^[0-9\-\$\:\.\+\/]+$/)&&(e="A"+e+"A");var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.toUpperCase(),i));return n.text=n.options.text||n.text.replace(/[A-D]/g,""),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Pn.default),An(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)}},{key:"encode",value:function(){for(var t=[],e=this.getEncodings(),i=0;i<this.data.length;i++)t.push(e[this.data.charAt(i)]),i!==this.data.length-1&&t.push("0");return{text:this.text,data:t.join("")}}},{key:"getEncodings",value:function(){return{0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"1011011011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),t}();Sn.codabar=jn;var In={},Tn={},Ln={};Object.defineProperty(Ln,"__esModule",{value:!0}),Ln.SYMBOLS=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","($)","(%)","(/)","(+)","ÿ"],Ln.BINARIES=["100010100","101001000","101000100","101000010","100101000","100100100","100100010","101010000","100010010","100001010","110101000","110100100","110100010","110010100","110010010","110001010","101101000","101100100","101100010","100110100","100011010","101011000","101001100","101000110","100101100","100010110","110110100","110110010","110101100","110100110","110010110","110011010","101101100","101100110","100110110","100111010","100101110","111010100","111010010","111001010","101101110","101110110","110101110","100100110","111011010","111010110","100110010","101011110"],Ln.MULTI_SYMBOLS={"\0":["(%)","U"],"":["($)","A"],"":["($)","B"],"":["($)","C"],"":["($)","D"],"":["($)","E"],"":["($)","F"],"":["($)","G"],"\b":["($)","H"],"\t":["($)","I"],"\n":["($)","J"],"\v":["($)","K"],"\f":["($)","L"],"\r":["($)","M"],"":["($)","N"],"":["($)","O"],"":["($)","P"],"":["($)","Q"],"":["($)","R"],"":["($)","S"],"":["($)","T"],"":["($)","U"],"":["($)","V"],"":["($)","W"],"":["($)","X"],"":["($)","Y"],"":["($)","Z"],"":["(%)","A"],"":["(%)","B"],"":["(%)","C"],"":["(%)","D"],"":["(%)","E"],"!":["(/)","A"],'"':["(/)","B"],"#":["(/)","C"],"&":["(/)","F"],"'":["(/)","G"],"(":["(/)","H"],")":["(/)","I"],"*":["(/)","J"],",":["(/)","L"],":":["(/)","Z"],";":["(%)","F"],"<":["(%)","G"],"=":["(%)","H"],">":["(%)","I"],"?":["(%)","J"],"@":["(%)","V"],"[":["(%)","K"],"\\":["(%)","L"],"]":["(%)","M"],"^":["(%)","N"],_:["(%)","O"],"`":["(%)","W"],a:["(+)","A"],b:["(+)","B"],c:["(+)","C"],d:["(+)","D"],e:["(+)","E"],f:["(+)","F"],g:["(+)","G"],h:["(+)","H"],i:["(+)","I"],j:["(+)","J"],k:["(+)","K"],l:["(+)","L"],m:["(+)","M"],n:["(+)","N"],o:["(+)","O"],p:["(+)","P"],q:["(+)","Q"],r:["(+)","R"],s:["(+)","S"],t:["(+)","T"],u:["(+)","U"],v:["(+)","V"],w:["(+)","W"],x:["(+)","X"],y:["(+)","Y"],z:["(+)","Z"],"{":["(%)","P"],"|":["(%)","Q"],"}":["(%)","R"],"~":["(%)","S"],"":["(%)","T"]},Object.defineProperty(Tn,"__esModule",{value:!0});var Mn=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Rn=Ln,Dn=function(t){return t&&t.__esModule?t:{default:t}}(wt);var zn=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Dn.default),Mn(t,[{key:"valid",value:function(){return/^[0-9A-Z\-. $/+%]+$/.test(this.data)}},{key:"encode",value:function(){var e=this.data.split("").flatMap(function(t){return Rn.MULTI_SYMBOLS[t]||t}),i=e.map(function(e){return t.getEncoding(e)}).join(""),n=t.checksum(e,20),o=t.checksum(e.concat(n),15);return{text:this.text,data:t.getEncoding("ÿ")+i+t.getEncoding(n)+t.getEncoding(o)+t.getEncoding("ÿ")+"1"}}}],[{key:"getEncoding",value:function(e){return Rn.BINARIES[t.symbolValue(e)]}},{key:"getSymbol",value:function(t){return Rn.SYMBOLS[t]}},{key:"symbolValue",value:function(t){return Rn.SYMBOLS.indexOf(t)}},{key:"checksum",value:function(e,i){var n=e.slice().reverse().reduce(function(e,n,o){var r=o%i+1;return e+t.symbolValue(n)*r},0);return t.getSymbol(n%47)}}]),t}();Tn.default=zn;var Nn={};Object.defineProperty(Nn,"__esModule",{value:!0});var Un=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Bn=function(t){return t&&t.__esModule?t:{default:t}}(Tn);var Hn=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Bn.default),Un(t,[{key:"valid",value:function(){return/^[\x00-\x7f]+$/.test(this.data)}}]),t}();Nn.default=Hn,Object.defineProperty(In,"__esModule",{value:!0}),In.CODE93FullASCII=In.CODE93=void 0;var Gn=Xn(Tn),Fn=Xn(Nn);function Xn(t){return t&&t.__esModule?t:{default:t}}In.CODE93=Gn.default,In.CODE93FullASCII=Fn.default;var Vn={};Object.defineProperty(Vn,"__esModule",{value:!0}),Vn.GenericBarcode=void 0;var qn=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Wn=function(t){return t&&t.__esModule?t:{default:t}}(wt);var Qn=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Wn.default),qn(t,[{key:"encode",value:function(){return{data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function(){return!0}}]),t}();Vn.GenericBarcode=Qn,Object.defineProperty(yt,"__esModule",{value:!0});var Yn=xt,Jn=jt,Zn=ke,Kn=Ti,to=Wi,eo=kn,io=Sn,no=In,oo=Vn;yt.default={CODE39:Yn.CODE39,CODE128:Jn.CODE128,CODE128A:Jn.CODE128A,CODE128B:Jn.CODE128B,CODE128C:Jn.CODE128C,EAN13:Zn.EAN13,EAN8:Zn.EAN8,EAN5:Zn.EAN5,EAN2:Zn.EAN2,UPC:Zn.UPC,UPCE:Zn.UPCE,ITF14:Kn.ITF14,ITF:Kn.ITF,MSI:to.MSI,MSI10:to.MSI10,MSI11:to.MSI11,MSI1010:to.MSI1010,MSI1110:to.MSI1110,pharmacode:eo.pharmacode,codabar:io.codabar,CODE93:no.CODE93,CODE93FullASCII:no.CODE93FullASCII,GenericBarcode:oo.GenericBarcode};var ro={};Object.defineProperty(ro,"__esModule",{value:!0});var ao=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t};ro.default=function(t,e){return ao({},t,e)};var so={};Object.defineProperty(so,"__esModule",{value:!0}),so.default=function(t){var e=[];return function t(i){if(Array.isArray(i))for(var n=0;n<i.length;n++)t(i[n]);else i.text=i.text||"",i.data=i.data||"",e.push(i)}(t),e};var lo={};Object.defineProperty(lo,"__esModule",{value:!0}),lo.default=function(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t};var co={},uo={},po={};Object.defineProperty(po,"__esModule",{value:!0}),po.default=function(t){var e=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var i in e)e.hasOwnProperty(i)&&"string"==typeof t[i=e[i]]&&(t[i]=parseInt(t[i],10));"string"==typeof t.displayValue&&(t.displayValue="false"!=t.displayValue);return t};var ho={};Object.defineProperty(ho,"__esModule",{value:!0});var fo={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(){}};ho.default=fo,Object.defineProperty(uo,"__esModule",{value:!0});var go=bo(po),mo=bo(ho);function bo(t){return t&&t.__esModule?t:{default:t}}uo.default=function(t){var e={};for(var i in mo.default)mo.default.hasOwnProperty(i)&&(t.hasAttribute("jsbarcode-"+i.toLowerCase())&&(e[i]=t.getAttribute("jsbarcode-"+i.toLowerCase())),t.hasAttribute("data-"+i.toLowerCase())&&(e[i]=t.getAttribute("data-"+i.toLowerCase())));return e.value=t.getAttribute("jsbarcode-value")||t.getAttribute("data-value"),e=(0,go.default)(e)};var vo={},yo={},xo={};Object.defineProperty(xo,"__esModule",{value:!0}),xo.getTotalWidthOfEncodings=xo.calculateEncodingAttributes=xo.getBarcodePadding=xo.getEncodingHeight=xo.getMaximumHeightOfEncodings=void 0;var wo=function(t){return t&&t.__esModule?t:{default:t}}(ro);function _o(t,e){return e.height+(e.displayValue&&t.text.length>0?e.fontSize+e.textMargin:0)+e.marginTop+e.marginBottom}function $o(t,e,i){if(i.displayValue&&e<t){if("center"==i.textAlign)return Math.floor((t-e)/2);if("left"==i.textAlign)return 0;if("right"==i.textAlign)return Math.floor(t-e)}return 0}function ko(t,e,i){var n;if(i)n=i;else{if("undefined"==typeof document)return 0;n=document.createElement("canvas").getContext("2d")}n.font=e.fontOptions+" "+e.fontSize+"px "+e.font;var o=n.measureText(t);return o?o.width:0}xo.getMaximumHeightOfEncodings=function(t){for(var e=0,i=0;i<t.length;i++)t[i].height>e&&(e=t[i].height);return e},xo.getEncodingHeight=_o,xo.getBarcodePadding=$o,xo.calculateEncodingAttributes=function(t,e,i){for(var n=0;n<t.length;n++){var o,r=t[n],a=(0,wo.default)(e,r.options);o=a.displayValue?ko(r.text,a,i):0;var s=r.data.length*a.width;r.width=Math.ceil(Math.max(o,s)),r.height=_o(r,a),r.barcodePadding=$o(o,s,a)}},xo.getTotalWidthOfEncodings=function(t){for(var e=0,i=0;i<t.length;i++)e+=t[i].width;return e},Object.defineProperty(yo,"__esModule",{value:!0});var Eo=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Oo=function(t){return t&&t.__esModule?t:{default:t}}(ro),Co=xo;var So=function(){function t(e,i,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=e,this.encodings=i,this.options=n}return Eo(t,[{key:"render",value:function(){if(!this.canvas.getContext)throw new Error("The browser does not support canvas.");this.prepareCanvas();for(var t=0;t<this.encodings.length;t++){var e=(0,Oo.default)(this.options,this.encodings[t].options);this.drawCanvasBarcode(e,this.encodings[t]),this.drawCanvasText(e,this.encodings[t]),this.moveCanvasDrawing(this.encodings[t])}this.restoreCanvas()}},{key:"prepareCanvas",value:function(){var t=this.canvas.getContext("2d");t.save(),(0,Co.calculateEncodingAttributes)(this.encodings,this.options,t);var e=(0,Co.getTotalWidthOfEncodings)(this.encodings),i=(0,Co.getMaximumHeightOfEncodings)(this.encodings);this.canvas.width=e+this.options.marginLeft+this.options.marginRight,this.canvas.height=i,t.clearRect(0,0,this.canvas.width,this.canvas.height),this.options.background&&(t.fillStyle=this.options.background,t.fillRect(0,0,this.canvas.width,this.canvas.height)),t.translate(this.options.marginLeft,0)}},{key:"drawCanvasBarcode",value:function(t,e){var i,n=this.canvas.getContext("2d"),o=e.data;i="top"==t.textPosition?t.marginTop+t.fontSize+t.textMargin:t.marginTop,n.fillStyle=t.lineColor;for(var r=0;r<o.length;r++){var a=r*t.width+e.barcodePadding;"1"===o[r]?n.fillRect(a,i,t.width,t.height):o[r]&&n.fillRect(a,i,t.width,t.height*o[r])}}},{key:"drawCanvasText",value:function(t,e){var i,n,o=this.canvas.getContext("2d"),r=t.fontOptions+" "+t.fontSize+"px "+t.font;t.displayValue&&(n="top"==t.textPosition?t.marginTop+t.fontSize-t.textMargin:t.height+t.textMargin+t.marginTop+t.fontSize,o.font=r,"left"==t.textAlign||e.barcodePadding>0?(i=0,o.textAlign="left"):"right"==t.textAlign?(i=e.width-1,o.textAlign="right"):(i=e.width/2,o.textAlign="center"),o.fillText(e.text,i,n))}},{key:"moveCanvasDrawing",value:function(t){this.canvas.getContext("2d").translate(t.width,0)}},{key:"restoreCanvas",value:function(){this.canvas.getContext("2d").restore()}}]),t}();yo.default=So;var Ao={};Object.defineProperty(Ao,"__esModule",{value:!0});var Po=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),jo=function(t){return t&&t.__esModule?t:{default:t}}(ro),Io=xo;var To="http://www.w3.org/2000/svg",Lo=function(){function t(e,i,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.svg=e,this.encodings=i,this.options=n,this.document=n.xmlDocument||document}return Po(t,[{key:"render",value:function(){var t=this.options.marginLeft;this.prepareSVG();for(var e=0;e<this.encodings.length;e++){var i=this.encodings[e],n=(0,jo.default)(this.options,i.options),o=this.createGroup(t,n.marginTop,this.svg);this.setGroupOptions(o,n),this.drawSvgBarcode(o,n,i),this.drawSVGText(o,n,i),t+=i.width}}},{key:"prepareSVG",value:function(){for(;this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);(0,Io.calculateEncodingAttributes)(this.encodings,this.options);var t=(0,Io.getTotalWidthOfEncodings)(this.encodings),e=(0,Io.getMaximumHeightOfEncodings)(this.encodings),i=t+this.options.marginLeft+this.options.marginRight;this.setSvgAttributes(i,e),this.options.background&&this.drawRect(0,0,i,e,this.svg).setAttribute("fill",this.options.background)}},{key:"drawSvgBarcode",value:function(t,e,i){var n,o=i.data;n="top"==e.textPosition?e.fontSize+e.textMargin:0;for(var r=0,a=0,s=0;s<o.length;s++)a=s*e.width+i.barcodePadding,"1"===o[s]?r++:r>0&&(this.drawRect(a-e.width*r,n,e.width*r,e.height,t),r=0);r>0&&this.drawRect(a-e.width*(r-1),n,e.width*r,e.height,t)}},{key:"drawSVGText",value:function(t,e,i){var n,o,r=this.document.createElementNS(To,"text");e.displayValue&&(r.setAttribute("font-family",e.font),r.setAttribute("font-size",e.fontSize),e.fontOptions.includes("bold")&&r.setAttribute("font-weight","bold"),e.fontOptions.includes("italic")&&r.setAttribute("font-style","italic"),o="top"==e.textPosition?e.fontSize-e.textMargin:e.height+e.textMargin+e.fontSize,"left"==e.textAlign||i.barcodePadding>0?(n=0,r.setAttribute("text-anchor","start")):"right"==e.textAlign?(n=i.width-1,r.setAttribute("text-anchor","end")):(n=i.width/2,r.setAttribute("text-anchor","middle")),r.setAttribute("x",n),r.setAttribute("y",o),r.appendChild(this.document.createTextNode(i.text)),t.appendChild(r))}},{key:"setSvgAttributes",value:function(t,e){var i=this.svg;i.setAttribute("width",t+"px"),i.setAttribute("height",e+"px"),i.setAttribute("x","0px"),i.setAttribute("y","0px"),i.setAttribute("viewBox","0 0 "+t+" "+e),i.setAttribute("xmlns",To),i.setAttribute("version","1.1")}},{key:"createGroup",value:function(t,e,i){var n=this.document.createElementNS(To,"g");return n.setAttribute("transform","translate("+t+", "+e+")"),i.appendChild(n),n}},{key:"setGroupOptions",value:function(t,e){t.setAttribute("fill",e.lineColor)}},{key:"drawRect",value:function(t,e,i,n,o){var r=this.document.createElementNS(To,"rect");return r.setAttribute("x",t),r.setAttribute("y",e),r.setAttribute("width",i),r.setAttribute("height",n),o.appendChild(r),r}}]),t}();Ao.default=Lo;var Mo={};Object.defineProperty(Mo,"__esModule",{value:!0});var Ro=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();var Do=function(){function t(e,i,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.object=e,this.encodings=i,this.options=n}return Ro(t,[{key:"render",value:function(){this.object.encodings=this.encodings}}]),t}();Mo.default=Do,Object.defineProperty(vo,"__esModule",{value:!0});var zo=Bo(yo),No=Bo(Ao),Uo=Bo(Mo);function Bo(t){return t&&t.__esModule?t:{default:t}}vo.default={CanvasRenderer:zo.default,SVGRenderer:No.default,ObjectRenderer:Uo.default};var Ho={};function Go(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Fo(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function Xo(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(Ho,"__esModule",{value:!0});var Vo=function(){function t(e,i){Go(this,t);var n=Fo(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.name="InvalidInputException",n.symbology=e,n.input=i,n.message='"'+n.input+'" is not a valid input for '+n.symbology,n}return Xo(t,Error),t}(),qo=function(){function t(){Go(this,t);var e=Fo(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.name="InvalidElementException",e.message="Not supported type to render on",e}return Xo(t,Error),t}(),Wo=function(){function t(){Go(this,t);var e=Fo(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.name="NoElementException",e.message="No element to render on.",e}return Xo(t,Error),t}();Ho.InvalidInputException=Vo,Ho.InvalidElementException=qo,Ho.NoElementException=Wo,Object.defineProperty(co,"__esModule",{value:!0});var Qo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Yo=Ko(uo),Jo=Ko(vo),Zo=Ho;function Ko(t){return t&&t.__esModule?t:{default:t}}function tr(t){if("string"==typeof t)return function(t){var e=document.querySelectorAll(t);if(0===e.length)return;for(var i=[],n=0;n<e.length;n++)i.push(tr(e[n]));return i}(t);if(Array.isArray(t)){for(var e=[],i=0;i<t.length;i++)e.push(tr(t[i]));return e}if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLImageElement)return function(t){var e=document.createElement("canvas");return{element:e,options:(0,Yo.default)(t),renderer:Jo.default.CanvasRenderer,afterRender:function(){t.setAttribute("src",e.toDataURL())}}}(t);if(t&&t.nodeName&&"svg"===t.nodeName.toLowerCase()||"undefined"!=typeof SVGElement&&t instanceof SVGElement)return{element:t,options:(0,Yo.default)(t),renderer:Jo.default.SVGRenderer};if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement)return{element:t,options:(0,Yo.default)(t),renderer:Jo.default.CanvasRenderer};if(t&&t.getContext)return{element:t,renderer:Jo.default.CanvasRenderer};if(t&&"object"===(void 0===t?"undefined":Qo(t))&&!t.nodeName)return{element:t,renderer:Jo.default.ObjectRenderer};throw new Zo.InvalidElementException}co.default=tr;var er={};Object.defineProperty(er,"__esModule",{value:!0});var ir=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();var nr=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.api=e}return ir(t,[{key:"handleCatch",value:function(t){if("InvalidInputException"!==t.name)throw t;if(this.api._options.valid===this.api._defaults.valid)throw t.message;this.api._options.valid(!1),this.api.render=function(){}}},{key:"wrapBarcodeCall",value:function(t){try{var e=t.apply(void 0,arguments);return this.api._options.valid(!0),e}catch(t){return this.handleCatch(t),this.api}}}]),t}();er.default=nr;var or=hr(yt),rr=hr(ro),ar=hr(so),sr=hr(lo),lr=hr(co),cr=hr(po),dr=hr(er),ur=Ho,pr=hr(ho);function hr(t){return t&&t.__esModule?t:{default:t}}var fr=function(){},gr=function(t,e,i){var n=new fr;if(void 0===t)throw Error("No element to render on was provided.");return n._renderProperties=(0,lr.default)(t),n._encodings=[],n._options=pr.default,n._errorHandler=new dr.default(n),void 0!==e&&((i=i||{}).format||(i.format=yr()),n.options(i)[i.format](e,i).render()),n};for(var mr in gr.getModule=function(t){return or.default[t]},or.default)or.default.hasOwnProperty(mr)&&br(or.default,mr);function br(t,e){fr.prototype[e]=fr.prototype[e.toUpperCase()]=fr.prototype[e.toLowerCase()]=function(i,n){var o=this;return o._errorHandler.wrapBarcodeCall(function(){n.text=void 0===n.text?void 0:""+n.text;var r=(0,rr.default)(o._options,n);r=(0,cr.default)(r);var a=t[e],s=vr(i,a,r);return o._encodings.push(s),o})}}function vr(t,e,i){var n=new e(t=""+t,i);if(!n.valid())throw new ur.InvalidInputException(n.constructor.name,t);var o=n.encode();o=(0,ar.default)(o);for(var r=0;r<o.length;r++)o[r].options=(0,rr.default)(i,o[r].options);return o}function yr(){return or.default.CODE128?"CODE128":Object.keys(or.default)[0]}function xr(t,e,i){e=(0,ar.default)(e);for(var n=0;n<e.length;n++)e[n].options=(0,rr.default)(i,e[n].options),(0,sr.default)(e[n].options);(0,sr.default)(i),new(0,t.renderer)(t.element,e,i).render(),t.afterRender&&t.afterRender()}fr.prototype.options=function(t){return this._options=(0,rr.default)(this._options,t),this},fr.prototype.blank=function(t){var e=new Array(t+1).join("0");return this._encodings.push({data:e}),this},fr.prototype.init=function(){var t;if(this._renderProperties)for(var e in Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]),this._renderProperties){t=this._renderProperties[e];var i=(0,rr.default)(this._options,t.options);"auto"==i.format&&(i.format=yr()),this._errorHandler.wrapBarcodeCall(function(){var e=vr(i.value,or.default[i.format.toUpperCase()],i);xr(t,e,i)})}},fr.prototype.render=function(){if(!this._renderProperties)throw new ur.NoElementException;if(Array.isArray(this._renderProperties))for(var t=0;t<this._renderProperties.length;t++)xr(this._renderProperties[t],this._encodings,this._options);else xr(this._renderProperties,this._encodings,this._options);return this},fr.prototype._defaults=pr.default,"undefined"!=typeof window&&(window.JsBarcode=gr),"undefined"!=typeof jQuery&&(jQuery.fn.JsBarcode=function(t,e){var i=[];return jQuery(this).each(function(){i.push(this)}),gr(i,t,e)});var wr=vt(gr);class _r extends at{static properties={api:{type:Object},cards:{type:Array},showAddDialog:{type:Boolean},showEditDialog:{type:Boolean},showFullscreenCard:{type:Boolean},editingCard:{type:Object},fullscreenCard:{type:Object},newCard:{type:Object}};constructor(){super(),this.cards=[],this.showAddDialog=!1,this.showEditDialog=!1,this.showFullscreenCard=!1,this.editingCard=null,this.fullscreenCard=null,this.newCard={name:"",number:"",barcode:"",logo:"",notes:"",color:"#9fa8da"},this.loadCards()}loadCards(){const t=localStorage.getItem("slm_loyalty_cards");this.cards=t?JSON.parse(t):[]}saveCards(){localStorage.setItem("slm_loyalty_cards",JSON.stringify(this.cards))}handleAddCard(){this.newCard={name:"",number:"",barcode:"",logo:"",notes:"",color:"#9fa8da"},this.showAddDialog=!0}handleSaveNewCard(t){t.preventDefault();const e=new FormData(t.target),i={id:Date.now().toString(),name:e.get("name"),number:e.get("number"),barcode:e.get("barcode")||this.generateBarcode(e.get("number")),logo:e.get("logo")||"",notes:e.get("notes")||"",color:e.get("color")||"#9fa8da"};this.cards=[...this.cards,i],this.saveCards(),this.showAddDialog=!1}handleEditCard(t){this.editingCard={...t},this.showEditDialog=!0}handleSaveEditCard(t){t.preventDefault();const e=new FormData(t.target),i={...this.editingCard,name:e.get("name"),number:e.get("number"),barcode:e.get("barcode")||this.generateBarcode(e.get("number")),logo:e.get("logo")||"",notes:e.get("notes")||"",color:e.get("color")};this.cards=this.cards.map(t=>t.id===i.id?i:t),this.saveCards(),this.showEditDialog=!1,this.editingCard=null}handleDeleteCard(t){confirm("Delete this loyalty card?")&&(this.cards=this.cards.filter(e=>e.id!==t),this.saveCards(),this.showEditDialog=!1,this.editingCard=null)}handleDuplicateCard(t){const e={...t,id:Date.now().toString(),name:`${t.name} (Copy)`};this.cards=[...this.cards,e],this.saveCards()}handleCardClick(t){this.fullscreenCard=t,this.showFullscreenCard=!0}updated(t){if(super.updated(t),this.showFullscreenCard&&this.fullscreenCard?.barcode){const t=this.shadowRoot.getElementById("barcode-svg");if(t)try{wr(t,this.fullscreenCard.barcode,{format:"CODE128",width:2,height:80,displayValue:!0,fontSize:20,background:"#ffffff",lineColor:"#000000"})}catch(t){console.warn("Barcode generation failed:",t)}}}generateBarcode(t){return t.replace(/\D/g,"")}render(){return H`
      <div class="loyalty-view">
        <div class="header">
          <h2>Loyalty Cards</h2>
          <button class="add-btn" @click=${this.handleAddCard}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        ${0===this.cards.length?H`
          <div class="empty">
            <div class="empty-emoji">💳</div>
            <p>No loyalty cards yet</p>
            <p class="hint">Add your store loyalty cards for quick access</p>
          </div>
        `:H`
          <div class="cards-grid">
            ${this.cards.map(t=>H`
              <div class="loyalty-card" style="background: ${t.color}" @click=${()=>this.handleCardClick(t)}>
                <button class="menu-btn" @click=${e=>{e.stopPropagation(),this.handleEditCard(t)}}>
                  <ha-icon icon="mdi:dots-vertical"></ha-icon>
                </button>
                
                <div class="card-body">
                  ${t.logo?H`
                    <img src="${t.logo}" alt="${t.name}" class="card-logo">
                  `:""}
                  <h3>${t.name}</h3>
                  <div class="card-number">${t.number}</div>
                  ${t.barcode?H`
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
    `}renderDialog(t){const e=t?this.editingCard:this.newCard;return H`
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
            ${t?H`
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
    `}renderFullscreen(){const t=this.fullscreenCard;return H`
      <div class="fullscreen-overlay" @click=${()=>this.showFullscreenCard=!1}>
        <div class="fullscreen-card">
          <h2>${t.name}</h2>
          <div class="fullscreen-number">${t.number}</div>
          ${t.barcode?H`
            <div class="fullscreen-barcode">
              <div class="barcode-display">
                <svg id="barcode-svg"></svg>
              </div>
            </div>
          `:""}
          <p class="tap-hint">Tap anywhere to close</p>
        </div>
      </div>
    `}static styles=r`
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
      color: var(--slm-text-primary);
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
      box-shadow: var(--slm-shadow-soft);
      -webkit-tap-highlight-color: transparent;
    }
    .add-btn ha-icon {
      --mdc-icon-size: 24px;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--slm-text-secondary);
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
      box-shadow: var(--slm-shadow-soft);
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
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .dialog {
      width: 90%;
      max-width: 400px;
      background: var(--slm-bg-surface, #ffffff);
      color: var(--slm-text-primary);
      border-radius: 16px;
      box-shadow: var(--slm-shadow-medium);
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid var(--slm-border-subtle);
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 18px;
      color: var(--slm-text-primary);
    }
    .dialog-header button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: var(--slm-text-secondary);
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
      color: var(--slm-text-secondary);
    }
    .dialog-content input,
    .dialog-content textarea {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      margin-top: 6px;
      border: 2px solid var(--slm-border-subtle);
      border-radius: 8px;
      font-size: 15px;
      font-family: inherit;
      color: var(--slm-text-primary);
      background: var(--slm-bg-main, #fafbfc);
    }
    .dialog-content input[type="color"] {
      padding: 4px;
      height: 40px;
      cursor: pointer;
    }
    .dialog-footer {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid var(--slm-border-subtle);
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
      background: var(--slm-accent-primary, #9fa8da);
      color: white;
    }
    .action-btn.secondary {
      background: var(--slm-bg-main, #fafbfc);
      color: var(--slm-text-primary);
      border: 1px solid var(--slm-border-subtle);
    }
    .action-btn.danger {
      background: var(--slm-accent-danger, #ef9a9a);
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
  `}customElements.define("slm-loyalty-cards-view",_r);class $r extends at{static properties={hass:{type:Object}};render(){return H`
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
    `}static styles=r`
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
  `}customElements.define("slm-profile-settings",$r);class kr extends at{static properties={currentMode:{type:String}};handleSelect(t){this.dispatchEvent(new CustomEvent("mode-selected",{detail:{mode:t},bubbles:!0,composed:!0}))}render(){return H`
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
              ${"on"===this.currentMode?H`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              `:""}
            </button>

            <button 
              class="mode-option ${"off"===this.currentMode?"selected":""}"
              @click=${()=>this.handleSelect("off")}
            >
              <ha-icon icon="mdi:weather-sunny"></ha-icon>
              <span>Off</span>
              ${"off"===this.currentMode?H`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              `:""}
            </button>

            <button 
              class="mode-option ${"system"===this.currentMode?"selected":""}"
              @click=${()=>this.handleSelect("system")}
            >
              <ha-icon icon="mdi:cellphone"></ha-icon>
              <span>As on Device</span>
              ${"system"===this.currentMode?H`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              `:""}
            </button>
          </div>
        </div>
      </div>
    `}static styles=r`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(--slm-shadow-medium);
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
  `}customElements.define("slm-dark-mode-popup",kr);class Er extends at{static properties={currentFont:{type:String}};fonts=[{name:"System Default",value:"system"},{name:"Roboto",value:"Roboto, sans-serif"},{name:"Open Sans",value:'"Open Sans", sans-serif'},{name:"Lato",value:"Lato, sans-serif"},{name:"Montserrat",value:"Montserrat, sans-serif"},{name:"Inter",value:"Inter, sans-serif"}];handleSelect(t){this.dispatchEvent(new CustomEvent("font-selected",{detail:{font:t},bubbles:!0,composed:!0}))}render(){return H`
      <div class="overlay" @click=${()=>this.dispatchEvent(new Event("close"))}>
        <div class="popup" @click=${t=>t.stopPropagation()}>
          <div class="popup-header">
            <h3>Font Family</h3>
          </div>

          <div class="popup-content">
            ${this.fonts.map(t=>H`
              <button 
                class="font-option ${this.currentFont===t.value?"selected":""}"
                style="font-family: ${t.value}"
                @click=${()=>this.handleSelect(t.value)}
              >
                <span>${t.name}</span>
                ${this.currentFont===t.value?H`
                  <ha-icon class="check" icon="mdi:check"></ha-icon>
                `:""}
              </button>
            `)}
          </div>
        </div>
      </div>
    `}static styles=r`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(--slm-shadow-medium);
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
  `}customElements.define("font-settings",Er);class Or extends at{static properties={settings:{type:Object},showDarkModePopup:{type:Boolean},showFontSettings:{type:Boolean}};constructor(){super(),this.showDarkModePopup=!1,this.showFontSettings=!1}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}render(){return H`
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

          <div class="settings-item">
            <div class="item-content">
              <div class="item-title">Theme Style</div>
              <div class="item-subtitle">
                ${this.settings.theme||"soft"}
              </div>
            </div>

            <select
              class="theme-select"
              @change=${t=>this.handleSettingChange("theme",t.target.value)}
            >
              <option value="soft" ?selected=${"soft"===this.settings.theme}>
                Soft Pastel
              </option>
              <option value="minimal" ?selected=${"minimal"===this.settings.theme}>
                Minimal
              </option>
              <option value="vibrant" ?selected=${"vibrant"===this.settings.theme}>
                Vibrant
              </option>
            </select>
          </div>

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
                ${[2,3,4,5].map(t=>H`
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

          ${this.settings.useSystemTextSize?"":H`
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

        ${this.showDarkModePopup?H`
          <slm-dark-mode-popup
            .currentMode=${this.settings.darkMode}
            @mode-selected=${t=>{this.handleSettingChange("darkMode",t.detail.mode),this.showDarkModePopup=!1}}
            @close=${()=>this.showDarkModePopup=!1}
          ></slm-dark-mode-popup>
        `:""}

        ${this.showFontSettings?H`
          <slm-font-settings
            .currentFont=${this.settings.fontFamily}
            @font-selected=${t=>{this.handleSettingChange("fontFamily",t.detail.font),this.showFontSettings=!1}}
            @close=${()=>this.showFontSettings=!1}
          ></slm-font-settings>
        `:""}
      </div>
    `}getDarkModeLabel(){switch(this.settings.darkMode){case"on":return"On";case"off":return"Off";default:return"As on Device"}}static styles=r`
    .theme-select {
      background: var(--slm-bg-elevated);
      color: var(--slm-text-primary);
      border: 1px solid var(--slm-border-subtle);
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 13px;
      cursor: pointer;
    }

    .appearance-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      border-bottom: 1px solid var(--slm-border-subtle);
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
      color: var(--slm-text-primary);
    }
    .section-header {
      padding: 14px 16px 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--slm-text-secondary);
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
      border-bottom: 1px solid var(--slm-border-subtle);
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
      color: var(--slm-text-primary);
    }
    .item-subtitle {
      font-size: 12px;
      color: var(--slm-text-secondary);
    }
    .tile-options {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .tile-option {
      flex: 1;
      padding: 10px;
      border: 2px solid var(--slm-border-subtle);
      border-radius: 8px;
      background: transparent;
      cursor: pointer;
      font-weight: 600;
      color: var(--slm-text-primary);
      -webkit-tap-highlight-color: transparent;
    }
    .tile-option.selected {
      background: var(--slm-accent-primary);
      color: white;
      border-color: var(--slm-accent-primary);
    }
    .size-slider {
      width: 100%;
      margin: 12px 0;
    }
    .size-value {
      text-align: center;
      font-weight: 600;
      color: var(--slm-accent-primary);
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
      background: var(--slm-accent-primary);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `}customElements.define("slm-appearance-settings",Or);class Cr extends at{static properties={settings:{type:Object}};handleSettingChange(t,e){const i={...this.settings.notifications,[t]:e};this.dispatchEvent(new CustomEvent("settings-changed",{detail:{notifications:i},bubbles:!0,composed:!0}))}render(){return H`
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
    `}static styles=r`
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
  `}customElements.define("slm-notification-settings",Cr);class Sr extends at{static properties={api:{type:Object},categories:{type:Array},showAddDialog:{type:Boolean},newCategory:{type:Object}};constructor(){super(),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"}}handleAddCategory(){this.showAddDialog=!0}async handleSaveCategory(){this.newCategory.name.trim()&&(alert("Category management coming soon!"),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"})}render(){return H`
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
          ${this.categories.map(t=>H`
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

        ${this.showAddDialog?H`
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
    `}static styles=r`
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
      background: rgba(--slm-shadow-medium);
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
  `}customElements.define("slm-category-settings",Sr);class Ar extends at{render(){return H`
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
    `}static styles=r`
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
  `}customElements.define("slm-support-settings",Ar);class Pr extends at{static properties={hass:{type:Object},api:{type:Object},settings:{type:Object},categories:{type:Array},currentSection:{type:String}};constructor(){super(),this.currentSection="main"}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}handleNavigation(t){this.currentSection=t}renderMainSettings(){return H`
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
            <span class="chevron">></span>
          </button>

          <button class="settings-item" @click=${()=>this.handleNavigation("appearance")}>
            <div class="item-icon">
              <span class="emoji">🎨</span>
            </div>
            <div class="item-content">
              <div class="item-title">Appearance</div>
              <div class="item-subtitle">Theme, tiles, fonts</div>
            </div>
            <span class="chevron">></span>
          </button>

          <button class="settings-item" @click=${()=>this.handleNavigation("notifications")}>
            <div class="item-icon">
              <span class="emoji">🔔</span>
            </div>
            <div class="item-content">
              <div class="item-title">Notifications</div>
              <div class="item-subtitle">List sharing, emails</div>
            </div>
            <span class="chevron">></span>
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
            <span class="chevron">></span>
          </button>

          <div class="section-header">Support</div>

          <button class="settings-item" @click=${()=>this.handleNavigation("support")}>
            <div class="item-icon">
              <span class="emoji">❓</span>
            </div>
            <div class="item-content">
              <div class="item-title">FAQ & Support</div>
            </div>
            <span class="chevron">></span>
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
    `}render(){switch(this.currentSection){case"profile":return H`
          <slm-profile-settings
            .hass=${this.hass}
            @back=${()=>this.currentSection="main"}
          ></slm-profile-settings>
        `;case"appearance":return H`
          <slm-appearance-settings
            .settings=${this.settings}
            @settings-changed=${t=>this.dispatchEvent(t)}
            @back=${()=>this.currentSection="main"}
          ></slm-appearance-settings>
        `;case"notifications":return H`
          <slm-notification-settings
            .settings=${this.settings}
            @settings-changed=${t=>this.dispatchEvent(t)}
            @back=${()=>this.currentSection="main"}
          ></slm-notification-settings>
        `;case"categories":return H`
          <slm-category-settings
            .api=${this.api}
            .categories=${this.categories}
            @back=${()=>this.currentSection="main"}
          ></slm-category-settings>
        `;case"support":return H`
          <slm-support-settings
            @back=${()=>this.currentSection="main"}
          ></slm-support-settings>
        `;default:return this.renderMainSettings()}}static styles=r`
    .settings-main {
      padding-bottom: 80px;
    }
    .settings-header {
      padding: 16px;
      border-bottom: 1px solid var(--slm-border-subtle);
    }
    .settings-header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: var(var(--slm-text-primary)
);
    }
    .section-header {
      padding: 14px 16px 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--slm-text-secondary);
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
      border-bottom: 1px solid var(--slm-border-subtle);
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
      color: var(var(--slm-text-primary)
);
    }
    .item-subtitle {
      font-size: 12px;
      color: var(--slm-text-secondary);
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
  `}customElements.define("slm-settings-view",Pr);class jr extends at{static properties={hass:{type:Object},config:{type:Object},currentView:{type:String},lists:{type:Array},activeList:{type:Object},items:{type:Array},categories:{type:Array},total:{type:Object},loading:{type:Boolean},showAddDialog:{type:Boolean},showEditDialog:{type:Boolean},editingItem:{type:Object},settings:{type:Object},cardId:{type:String}};set hass(t){this._hass=t,this.api&&(this.api.hass=t),!this._subscribed&&t?.connection&&(this._subscribed=!0,this.subscribeToUpdates())}get hass(){return this._hass}constructor(){super(),this.currentView="shopping",this.lists=[],this.activeList=null,this.recentItems=[],this.items=[],this.categories=[],this.total={total:0,currency:"NZD",item_count:0},this.loading=!0,this.showAddDialog=!1,this.showEditDialog=!1,this.editingItem=null,this.cardId=this.generateCardId(),this.settings=this.loadSettings(),this._subscribed=!1}generateCardId(){return`card_${Date.now()}_${Math.random().toString(36).substring(2,9)}`}loadSettings(){const t={theme:"auto",darkMode:"system",fontSize:16,fontFamily:"system",useSystemTextSize:!0,openLastUsedList:!0,keepScreenOn:!1,notifications:{listSharing:!0,emails:!0},recentProductsCount:8,tilesPerRow:3,useEmojis:!0,colorScheme:"pastel"},e=`slm_settings_${this.cardId}`,i=localStorage.getItem(e);return i?{...t,...JSON.parse(i)}:t}saveSettings(){const t=`slm_settings_${this.cardId}`;localStorage.setItem(t,JSON.stringify(this.settings))}async firstUpdated(){this.api=new lt(this.hass),await this.loadData(),this.applyColorScheme()}applyColorScheme(){const t=this.settings.darkMode;"on"===t?this.setAttribute("data-theme","dark"):"off"===t?this.setAttribute("data-theme","light"):this.removeAttribute("data-theme")}async loadData(){try{this.loading=!0;const t=await this.api.getLists();this.lists=t.lists||[];const e=`slm_last_list_${this.cardId}`;if(this.settings.openLastUsedList){const t=localStorage.getItem(e);this.activeList=this.lists.find(e=>e.id===t)||this.lists.find(t=>t.active)||this.lists[0]}else this.activeList=this.lists.find(t=>t.active)||this.lists[0];const i=await this.api.getCategories();this.categories=i.categories,this.activeList&&await this.loadActiveListData()}catch(t){console.error("Failed to load data:",t)}finally{this.loading=!1}}async loadActiveListData(){if(!this.activeList)return;const t=await this.api.getItems(this.activeList.id);this.items=t.items;const e=await this.api.getListTotal(this.activeList.id);this.total=e;const i=`slm_last_list_${this.cardId}`;localStorage.setItem(i,this.activeList.id)}async handleListChange(t){const e=t.detail.listId;await this.api.setActiveList(e),this.activeList=this.lists.find(t=>t.id===e),await this.loadActiveListData(),this.currentView="shopping"}async handleItemClick(t){console.log("HANDLE ITEM CLICK",t.detail);const{itemId:e}=t.detail,i=this.items.find(t=>t.id===e);i&&!i.checked&&(await this.api.incrementItem(e,1),this.loadActiveListData())}async handleItemDecrease(t){const{itemId:e}=t.detail,i=this.items.find(t=>t.id===e);i&&(i.quantity>1?await this.api.incrementItem(e,-1):await this.api.deleteItem(e),this.loadActiveListData())}async handleItemCheck(t){const{itemId:e,checked:i}=t.detail;await this.api.checkItem(e,i),await this.loadActiveListData()}async handleItemLongPress(t){this.editingItem=t.detail.item,this.showEditDialog=!0}async handleItemSwipeDelete(t){const{itemId:e}=t.detail;await this.api.deleteItem(e),await this.loadActiveListData()}async handleAddItem(t){const e=t.detail,i=this.items.find(t=>t.product_id===e.product_id&&!t.checked);i?await this.api.updateItem(i.id,{quantity:i.quantity+1}):await this.api.addItem(this.activeList.id,e),this.trackRecentlyUsed(e.product_id),await this.loadActiveListData(),this.showAddDialog=!1}trackRecentlyUsed(t){if(!t)return;const e="slm_recent_products",i=localStorage.getItem(e),n=(i?JSON.parse(i):[]).filter(e=>e!==t);n.unshift(t);const o=n.slice(0,50);localStorage.setItem(e,JSON.stringify(o))}async handleEditItem(t){const{itemId:e,data:i}=t.detail;await this.api.updateItem(e,i),await this.loadActiveListData(),this.showEditDialog=!1,this.editingItem=null}handleNavChange(t){this.currentView=t.detail.view}handleSettingsChange(t){this.settings={...this.settings,...t.detail},this.saveSettings(),this.applyColorScheme(),this.requestUpdate()}handleBackToLists(){this.currentView="lists"}async handleShareList(){const t=this.activeList?.name||"Shopping List",e=this.items.filter(t=>!t.checked).map(t=>`${t.quantity} ${t.unit} ${t.name}`).join("\n"),i=`${t}\n\n${e}`;if(navigator.share)try{await navigator.share({title:t,text:i})}catch(t){"AbortError"!==t.name&&console.error("Share failed:",t)}else navigator.clipboard.writeText(i),alert("List copied to clipboard!")}async subscribeToUpdates(){if(this.hass?.connection)try{const t=await this.hass.connection.subscribeMessage(t=>{console.log("[SLM] ✅ Received update:",t.event_type),this.loadActiveListData()},{type:"shopping_list_manager/subscribe"});this._unsubscribers=[t],console.log("[SLM] ✅ Subscribed to shopping list updates")}catch(t){console.error("[SLM] ❌ Failed to subscribe:",t)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribers&&(console.log("[SLM] Cleaning up event subscriptions"),this._unsubscribers.forEach(t=>{try{t()}catch(t){console.error("[SLM] Error unsubscribing:",t)}}),this._unsubscribers=[])}renderCurrentView(){switch(this.currentView){case"shopping":return H`
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
              .api=${this.api}
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
        `;case"lists":return H`
          <slm-lists-view
            .api=${this.api}
            .lists=${this.lists}
            .activeList=${this.activeList}
            .items=${this.items}
            .total=${this.total}
            @list-selected=${this.handleListChange}
            @lists-updated=${()=>this.loadData()}
          ></slm-lists-view>
        `;case"loyalty":return H`
          <slm-loyalty-cards-view
            .api=${this.api}
          ></slm-loyalty-cards-view>
        `;case"settings":return H`
          <slm-settings-view
            .hass=${this.hass}
            .api=${this.api}
            .settings=${this.settings}
            .categories=${this.categories}
            @settings-changed=${this.handleSettingsChange}
          ></slm-settings-view>
        `;default:return H`<div>Unknown view</div>`}}render(){return this.loading?H`
        <ha-card>
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading...</p>
          </div>
        </ha-card>
      `:H`
      <ha-card>
        <div class="card-container">
          ${this.renderCurrentView()}
        </div>

        <slm-bottom-nav
          .currentView=${this.currentView}
          @nav-changed=${this.handleNavChange}
        ></slm-bottom-nav>

        ${this.showEditDialog?H`
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
    `}static styles=r`
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
      bottom: 10px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      margin: 0 4px 4px 4px;
      background: linear-gradient(90deg, #b0a8da 0%, #d4d0e8 100%);
      color: var(--slm-bg-surface);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(--slm-shadow-soft);
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

    /* ===============================
      DEFAULT (Home Assistant Theme – placeholder)
    ================================ */
    :host {
      --slm-bg-main: var(--primary-background-color);
      --slm-bg-surface: var(--card-background-color);
      --slm-bg-elevated: var(--card-background-color);

      --slm-text-primary: var(--primary-text-color);
      --slm-text-secondary: var(--secondary-text-color);
      --slm-text-muted: var(--secondary-text-color);

      --slm-border-subtle: var(--divider-color);

      --slm-accent-primary: var(--primary-color);
      --slm-accent-secondary: var(--success-color, var(--primary-color));
      --slm-accent-warning: var(--warning-color, var(--primary-color));
      --slm-accent-danger: var(--error-color, var(--primary-color));

      --slm-tile-bg: var(--card-background-color);
      --slm-tile-checked-opacity: 0.4;

      --slm-shadow-soft: 0 2px 6px rgba(0,0,0,0.1);
      --slm-shadow-medium: 0 4px 12px rgba(0,0,0,0.2);
    }

    /* ===============================
      LIGHT – Soft Pastel Modern
    ================================ */
    :host([data-theme="light"]) {
      --slm-bg-main: #fafbfc;
      --slm-bg-surface: #ffffff;
      --slm-bg-elevated: #ffffff;

      --slm-text-primary: #424242;
      --slm-text-secondary: #757575;
      --slm-text-muted: #9e9e9e;

      --slm-border-subtle: #e8eaf6;

      --slm-accent-primary: #9fa8da;
      --slm-accent-secondary: #a5d6a7;
      --slm-accent-warning: #ffcc80;
      --slm-accent-danger: #ef9a9a;

      --slm-tile-bg: #ffffff;
      --slm-tile-checked-opacity: 0.4;

      --slm-shadow-soft: 0 2px 6px rgba(0,0,0,0.08);
      --slm-shadow-medium: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    /* ===============================
      DARK – Soft Pastel Modern
    ================================ */
    :host([data-theme="dark"]) {
      --slm-bg-main: #14161a;
      --slm-bg-surface: #1b1f25;
      --slm-bg-elevated: #232833;

      --slm-text-primary: #e4e7ec;
      --slm-text-secondary: #a8b0bd;
      --slm-text-muted: #7a8594;

      --slm-border-subtle: #2b313c;

      --slm-accent-primary: #9fa8da;
      --slm-accent-secondary: #81c784;
      --slm-accent-warning: #ffb74d;
      --slm-accent-danger: #ef9a9a;

      --slm-tile-bg: #20242c;
      --slm-tile-checked-opacity: 0.35;

      --slm-shadow-soft: 0 2px 6px rgba(0,0,0,0.1);
      --slm-shadow-medium: 0 6px 18px rgba(0,0,0,0.6);
    }

  `;setConfig(t){this.config=t}getCardSize(){return 12}}customElements.define("shopping-list-manager-card",jr);
