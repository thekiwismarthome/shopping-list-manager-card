/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=o.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(o,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:s,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,h=globalThis,g=h.trustedTypes,f=g?g.emptyScript:"",m=h.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!s(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),h.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&c(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(e)i.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),r=t.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=e.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=o;const n=r.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const n=this.constructor;if(!1===o&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,m?.({ReactiveElement:w}),(h.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _=globalThis,$=t=>t,k=_.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+O,P=`<${S}>`,A=document,j=()=>A.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,L="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,D=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,U=/"/g,B=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),q=new WeakMap,X=A.createTreeWalker(A,129);function V(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,o=[];let r,n=2===e?"<svg>":3===e?"<math>":"",a=M;for(let e=0;e<i;e++){const i=t[e];let s,c,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,c=a.exec(i),null!==c);)d=a.lastIndex,a===M?"!--"===c[1]?a=R:void 0!==c[1]?a=z:void 0!==c[2]?(B.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=D):void 0!==c[3]&&(a=D):a===D?">"===c[0]?(a=r??M,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,s=c[1],a=void 0===c[3]?D:'"'===c[3]?U:N):a===U||a===N?a=D:a===R||a===z?a=M:(a=D,r=void 0);const p=a===D&&t[e+1].startsWith("/>")?" ":"";n+=a===M?i+P:l>=0?(o.push(s),i.slice(0,l)+C+i.slice(l)+O+p):i+O+(-2===l?e:p)}return[V(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class W{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,n=0;const a=t.length-1,s=this.parts,[c,l]=Q(t,e);if(this.el=W.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=X.nextNode())&&s.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(C)){const e=l[n++],i=o.getAttribute(t).split(O),a=/([.?@])?(.*)/.exec(e);s.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:K}),o.removeAttribute(t)}else t.startsWith(O)&&(s.push({type:6,index:r}),o.removeAttribute(t));if(B.test(o.tagName)){const t=o.textContent.split(O),e=t.length-1;if(e>0){o.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],j()),X.nextNode(),s.push({type:2,index:++r});o.append(t[e],j())}}}else if(8===o.nodeType)if(o.data===S)s.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(O,t+1));)s.push({type:7,index:r}),t+=O.length-1}r++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,o){if(e===H)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const n=I(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=Y(t,r._$AS(t,e.values),r,o)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??A).importNode(e,!0);X.currentNode=o;let r=X.nextNode(),n=0,a=0,s=i[0];for(;void 0!==s;){if(n===s.index){let e;2===s.type?e=new Z(r,r.nextSibling,this,t):1===s.type?e=new s.ctor(r,s.name,s.strings,this,t):6===s.type&&(e=new ot(r,this,t)),this._$AV.push(e),s=i[++a]}n!==s?.index&&(r=X.nextNode(),n++)}return X.currentNode=A,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),I(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==G&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=W.createElement(V(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new J(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new W(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new Z(this.O(j()),this.O(j()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class K{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(t,e=this,i,o){const r=this.strings;let n=!1;if(void 0===r)t=Y(this,t,e,0),n=!I(t)||t!==this._$AH&&t!==H,n&&(this._$AH=t);else{const o=t;let a,s;for(t=r[0],a=0;a<r.length-1;a++)s=Y(this,o[i+a],e,a),s===H&&(s=this._$AH[a]),n||=!I(s)||s!==this._$AH[a],s===G?t=G:t!==G&&(t+=(s??"")+r[a+1]),this._$AH[a]=s}n&&!o&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}class et extends K{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==G)}}class it extends K{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??G)===H)return;const i=this._$AH,o=t===G&&i!==G||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==G&&(i===G||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const rt=_.litHtmlPolyfillSupport;rt?.(W,Z),(_.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new Z(e.insertBefore(j(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const st=nt.litElementPolyfillSupport;st?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");class ct{constructor(t){this.hass=t}subscribeToUpdates(t){const e=["shopping_list_manager_item_added","shopping_list_manager_item_updated","shopping_list_manager_item_checked","shopping_list_manager_item_deleted","shopping_list_manager_list_updated"].map(e=>this.hass.connection.subscribeEvents(t,e));return()=>{e.forEach(t=>t())}}async getLists(){return await this.hass.callWS({type:"shopping_list_manager/lists/get_all"})}async createList(t,e="mdi:cart"){return await this.hass.callWS({type:"shopping_list_manager/lists/create",name:t,icon:e})}async updateList(t,e){return await this.hass.callWS({type:"shopping_list_manager/lists/update",list_id:t,...e})}async deleteList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/delete",list_id:t})}async setActiveList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/set_active",list_id:t})}async incrementItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/increment",item_id:t,amount:e})}async getItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/get",list_id:t})}async addItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/add",list_id:t,...e})}async updateItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/update",item_id:t,...e})}async checkItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/check",item_id:t,checked:e})}async deleteItem(t){return await this.hass.callWS({type:"shopping_list_manager/items/delete",item_id:t})}async bulkCheckItems(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/bulk_check",item_ids:t,checked:e})}async clearCheckedItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/clear_checked",list_id:t})}async getListTotal(t){return await this.hass.callWS({type:"shopping_list_manager/items/get_total",list_id:t})}async searchProducts(t,e={}){return await this.hass.callWS({type:"shopping_list_manager/products/search",query:t,limit:e.limit||20,exclude_allergens:e.excludeAllergens,include_tags:e.includeTags,substitution_group:e.substitutionGroup})}async getProductSuggestions(t=20){return await this.hass.callWS({type:"shopping_list_manager/products/suggestions",limit:t})}async getProductSubstitutes(t,e=5){return await this.hass.callWS({type:"shopping_list_manager/products/substitutes",product_id:t,limit:e})}async addProduct(t){return await this.hass.callWS({type:"shopping_list_manager/products/add",...t})}async updateProduct(t,e){return await this.hass.callWS({type:"shopping_list_manager/products/update",product_id:t,...e})}async getProductsByIds(t){return await this.hass.callWS({type:"shopping_list_manager/products/get_by_ids",product_ids:t})}async getCategories(){return await this.hass.callWS({type:"shopping_list_manager/categories/get_all"})}}class lt extends at{static properties={currentView:{type:String}};handleNavClick(t){this.dispatchEvent(new CustomEvent("nav-changed",{detail:{view:t},bubbles:!0,composed:!0}))}render(){return F`
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
    `}static styles=n`
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
  `}customElements.define("slm-bottom-nav",lt);class dt extends at{static properties={activeList:{type:Object},itemCount:{type:Number},settings:{type:Object},_menuOpen:{type:Boolean,state:!0}};constructor(){super(),this._menuOpen=!1,this._boundCloseMenu=this._closeMenu.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundCloseMenu)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundCloseMenu)}_closeMenu(t){this._menuOpen&&!this.shadowRoot.contains(t.target)&&(this._menuOpen=!1)}handleBack(){this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}handleShare(){this.dispatchEvent(new CustomEvent("share",{bubbles:!0,composed:!0}))}handleMenuToggle(t){t.stopPropagation(),this._menuOpen=!this._menuOpen}_dispatchSetting(t,e){this.dispatchEvent(new CustomEvent("menu-setting-change",{detail:{key:t,value:e},bubbles:!0,composed:!0}))}render(){const t=this.settings||{},e=t.viewMode||"tile",i=t.sortMode||"category",o=!1!==t.showRecentlyUsed,r=!1!==t.showPriceOnTile;return F`
      <div class="header">
        <button class="back-btn" @click=${this.handleBack}>
          <ha-icon icon="mdi:arrow-left"></ha-icon>
        </button>

        <h2>${this.activeList?.name||"Shopping List"}</h2>

        <div class="header-actions">
          <button class="action-btn" @click=${this.handleShare}>
            <ha-icon icon="mdi:account-plus-outline"></ha-icon>
          </button>
          <div class="menu-wrap">
            <button class="action-btn" @click=${this.handleMenuToggle}>
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </button>
            ${this._menuOpen?F`
              <div class="menu-dropdown" @click=${t=>t.stopPropagation()}>

                <div class="menu-section-label">View</div>
                <div class="menu-toggle-row">
                  <button
                    class="toggle-btn ${"tile"===e?"active":""}"
                    @click=${()=>{this._dispatchSetting("viewMode","tile"),this._menuOpen=!1}}
                  >🔲 Tiles</button>
                  <button
                    class="toggle-btn ${"list"===e?"active":""}"
                    @click=${()=>{this._dispatchSetting("viewMode","list"),this._menuOpen=!1}}
                  >☰ List</button>
                </div>

                <div class="menu-section-label">Sort</div>
                <div class="menu-toggle-row">
                  <button
                    class="toggle-btn ${"category"===i?"active":""}"
                    @click=${()=>{this._dispatchSetting("sortMode","category"),this._menuOpen=!1}}
                  >By Category</button>
                  <button
                    class="toggle-btn ${"alphabetical"===i?"active":""}"
                    @click=${()=>{this._dispatchSetting("sortMode","alphabetical"),this._menuOpen=!1}}
                  >A–Z</button>
                </div>

                <div class="menu-divider"></div>

                <button class="menu-switch-row" @click=${()=>this._dispatchSetting("showRecentlyUsed",!o)}>
                  <span class="menu-switch-label">Recently Used</span>
                  <span class="switch ${o?"on":"off"}">${o?"✓":"✕"}</span>
                </button>

                <button class="menu-switch-row" @click=${()=>this._dispatchSetting("showPriceOnTile",!r)}>
                  <span class="menu-switch-label">Show Price</span>
                  <span class="switch ${r?"on":"off"}">${r?"✓":"✕"}</span>
                </button>

              </div>
            `:""}
          </div>
        </div>
      </div>
    `}static styles=n`
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
      position: relative;
    }
    .menu-wrap {
      position: relative;
    }
    .menu-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      z-index: 200;
      min-width: 190px;
      padding: 8px 0;
      overflow: hidden;
    }
    .menu-section-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      padding: 6px 14px 2px;
    }
    .menu-toggle-row {
      display: flex;
      gap: 6px;
      padding: 4px 10px 8px;
    }
    .toggle-btn {
      flex: 1;
      padding: 6px 4px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      background: transparent;
      color: var(--primary-text-color);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .toggle-btn.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: white;
      font-weight: 600;
    }
    .menu-divider {
      height: 1px;
      background: var(--divider-color);
      margin: 4px 0;
    }
    .menu-switch-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 14px;
      border: none;
      background: transparent;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .menu-switch-row:active {
      background: var(--secondary-background-color);
    }
    .menu-switch-label {
      font-size: 14px;
      color: var(--primary-text-color);
    }
    .switch {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
    }
    .switch.on {
      background: var(--primary-color);
      color: white;
    }
    .switch.off {
      background: var(--divider-color);
      color: var(--secondary-text-color);
    }
  `}customElements.define("slm-list-header",dt);class pt extends at{static properties={api:{type:Object},settings:{type:Object},categories:{type:Array},activeListId:{type:String},searchQuery:{type:String},searchResults:{type:Array},recentProducts:{type:Array},showResults:{type:Boolean},_showCreateForm:{type:Boolean,state:!0},_createName:{type:String,state:!0},_createCategory:{type:String,state:!0},_createPrice:{type:String,state:!0}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.recentProducts=[],this.showResults=!1,this._showCreateForm=!1,this._createName="",this._createCategory="other",this._createPrice=""}async firstUpdated(){await this.loadRecentProducts()}async loadRecentProducts(){const t=localStorage.getItem("slm_recent_products"),e=t?JSON.parse(t):[],i=this.settings?.recentProductsCount||8;this.recentProducts=e.slice(0,i)}async handleSearch(t){if(this.searchQuery=t.target.value,this._showCreateForm=!1,this.searchQuery.length<1)this.showResults=!1;else{if(this.searchQuery.length>=2){const t=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=t.products||[]}else this.searchResults=[];this.showResults=!0}}handleProductSelect(t){this.dispatchEvent(new CustomEvent("add-item",{detail:{name:t.name,category_id:t.category_id,product_id:t.id,quantity:1,unit:t.default_unit,price:t.price,image_url:t.image_url},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1,this._showCreateForm=!1,this.shadowRoot.querySelector("input").blur()}handleAddCustom(){this.searchQuery.trim()&&(this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.searchQuery.trim(),category_id:"other",quantity:1,unit:"units"},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1,this._showCreateForm=!1)}handleShowCreateForm(){this._createName=this.searchQuery.trim(),this._createCategory="other",this._createPrice="",this._showCreateForm=!0}handleCancelCreate(){this._showCreateForm=!1}handleCreateAndAdd(){this._createName.trim()&&(this.dispatchEvent(new CustomEvent("create-and-add-product",{detail:{name:this._createName.trim(),category_id:this._createCategory,price:this._createPrice?parseFloat(this._createPrice):null},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1,this._showCreateForm=!1,this.shadowRoot.querySelector("input").blur())}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}render(){const t=this.categories||[];return F`
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
            <button class="clear-btn" @click=${()=>{this.searchQuery="",this.showResults=!1,this._showCreateForm=!1}}>✖</button>
          `:""}
        </div>

        ${this.showResults?F`
          <div class="results-dropdown">

            <!-- Always-visible add row pinned to the top -->
            ${this._showCreateForm?"":F`
              <button class="result-item add-quick" @click=${this.handleAddCustom}>
                <div class="no-image add-plus">➕</div>
                <div class="result-info">
                  <div class="result-name">Add "${this.searchQuery}"</div>
                  <div class="result-subtitle">quick add to list</div>
                </div>
              </button>
            `}

            ${this._showCreateForm?F`
              <!-- Inline create-product form -->
              <div class="create-form">
                <div class="create-form-title">Create new product</div>
                <input
                  class="create-input"
                  type="text"
                  placeholder="Product name"
                  .value=${this._createName}
                  @input=${t=>this._createName=t.target.value}
                />
                <select
                  class="create-select"
                  .value=${this._createCategory}
                  @change=${t=>this._createCategory=t.target.value}
                >
                  ${t.map(t=>F`
                    <option value="${t.id}" ?selected=${t.id===this._createCategory}>
                      ${this.getCategoryEmoji(t.id)} ${t.name}
                    </option>
                  `)}
                </select>
                <input
                  class="create-input"
                  type="text"
                  inputmode="decimal"
                  placeholder="Price (optional)"
                  .value=${this._createPrice}
                  @input=${t=>this._createPrice=t.target.value}
                />
                <div class="create-actions">
                  <button class="create-btn secondary" @click=${this.handleCancelCreate}>Cancel</button>
                  <button class="create-btn primary" @click=${this.handleCreateAndAdd}>Create &amp; Add</button>
                </div>
              </div>
            `:this.searchResults.length>0?F`
              <!-- Search results below the add row -->
              <div class="results-divider">Matching products</div>
              ${this.searchResults.map(t=>F`
                <button class="result-item" @click=${()=>this.handleProductSelect(t)}>
                  ${t.image_url?F`
                    <img src="${t.image_url}" alt="${t.name}">
                  `:F`
                    <div class="no-image">${this.getCategoryEmoji(t.category_id)}</div>
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
              <!-- No results: offer to create a catalog product -->
              <button class="result-item create-product" @click=${this.handleShowCreateForm}>
                <div class="no-image">🆕</div>
                <div class="result-info">
                  <div class="result-name">Create product "${this.searchQuery}"</div>
                  <div class="result-subtitle">save to catalog with category &amp; price</div>
                </div>
                <span class="add-icon">➕</span>
              </button>
            `}

          </div>
        `:""}
      </div>
    `}static styles=n`
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
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
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
    .add-quick {
      background: var(--secondary-background-color);
      border-bottom: 2px solid var(--divider-color);
    }
    .add-plus {
      background: var(--primary-color);
      color: white;
      font-size: 18px;
    }
    .results-divider {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      padding: 6px 12px 2px;
      opacity: 0.7;
    }
    .add-custom {
      background: rgba(0,0,0,0.02);
    }
    .create-product {
      background: rgba(0,0,0,0.02);
    }

    /* Inline create form */
    .create-form {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .create-form-title {
      font-weight: 700;
      font-size: 13px;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .create-input,
    .create-select {
      box-sizing: border-box;
      width: 100%;
      padding: 9px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      color: var(--primary-text-color);
      background: var(--primary-background-color);
      outline: none;
    }
    .create-input:focus,
    .create-select:focus {
      border-color: var(--primary-color);
    }
    .create-actions {
      display: flex;
      gap: 8px;
    }
    .create-btn {
      flex: 1;
      padding: 10px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
    }
    .create-btn.primary {
      background: var(--primary-color);
      color: white;
    }
    .create-btn.secondary {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
  `}customElements.define("slm-search-bar",pt);const ut={chicken:"chicken",turkey:"turkey",beef:"beef",steak:"steak",mince:"minced-meat",bacon:"bacon",ham:"ham",sausage:"sausage",pork:"pork",lamb:"lamb-chops",salami:"salami",fish:"fish",salmon:"salmon-fillet",tuna:"tuna",prawn:"shrimp",shrimp:"shrimp",lobster:"lobster",milk:"milk-bottle",cheese:"cheese",butter:"butter",egg:"egg",yogurt:"yogurt",yoghurt:"yogurt",cream:"whipped-cream","ice cream":"ice-cream-cone",bread:"bread",sourdough:"bread",loaf:"bread",bun:"burger-bun",bagel:"bagel",croissant:"croissant",muffin:"muffin",cake:"cake",cookie:"cookie",biscuit:"cookie",apple:"apple",banana:"banana",orange:"orange",grape:"grapes",strawberry:"strawberry",blueberry:"blueberries",lemon:"lemon",avocado:"avocado",pineapple:"pineapple",watermelon:"watermelon",mango:"mango",kiwi:"kiwi",peach:"peach",pear:"pear",cherry:"cherry",tomato:"tomato",potato:"potato",carrot:"carrot",broccoli:"broccoli",lettuce:"lettuce",spinach:"spinach",onion:"onion",garlic:"garlic",corn:"corn",pepper:"bell-pepper",cucumber:"cucumber",mushroom:"mushroom",peas:"peas",coffee:"coffee",tea:"tea",juice:"juice",wine:"wine-bottle",beer:"beer",water:"water-bottle",soda:"soda-can",cola:"soda-can",pasta:"pasta",rice:"rice-bowl",flour:"flour",sugar:"sugar",salt:"salt",oil:"olive-oil",honey:"honey",chocolate:"chocolate-bar",chips:"chips",popcorn:"popcorn",soap:"soap",shampoo:"shampoo",toothpaste:"toothpaste","toilet paper":"toilet-paper",sponge:"sponge"},ht={};class gt extends at{static properties={item:{type:Object},categoryColor:{type:String},isRecentlyUsed:{type:Boolean},settings:{type:Object},touchStartX:{type:Number},touchStartY:{type:Number},touchStartTime:{type:Number},longPressTimer:{type:Number},longPressTriggered:{type:Boolean},_localImgError:{type:Boolean,state:!0}};constructor(){super(),this.isRecentlyUsed=!1,this.touchStartX=0,this.touchStartY=0,this.touchStartTime=0,this.longPressTimer=null,this.longPressTriggered=!1,this._localImgError=!1}hexToRgb(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:159,g:168,b:218}}handleTileClick(t){this.longPressTriggered?this.longPressTriggered=!1:t.target.closest(".decrease-btn")||t.target.closest(".quantity-badge")||(this.isRecentlyUsed?this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.item.name,category_id:this.item.category_id,product_id:this.item.id,quantity:1,unit:this.item.default_unit||"units",price:this.item.price||null,image_url:this.item.image_url||null,fromRecentlyUsed:!0},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("item-check",{detail:{itemId:this.item.id,checked:!this.item.checked},bubbles:!0,composed:!0})))}handleDecrease(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleQuantityClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleContextMenu(t){return t.preventDefault(),t.stopPropagation(),!1}handleTouchStart(t){this.touchStartX=t.touches[0].clientX,this.touchStartY=t.touches[0].clientY,this.touchStartTime=Date.now(),this.longPressTriggered=!1,this.longPressTimer=setTimeout(()=>{this.longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:this.item},bubbles:!0,composed:!0}))},500)}handleTouchMove(t){if(this.longPressTimer){const e=t.touches[0].clientX,i=t.touches[0].clientY,o=Math.abs(e-this.touchStartX),r=Math.abs(i-this.touchStartY);(o>10||r>10)&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}}handleTouchEnd(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}handleMouseDown(t){if(2===t.button)return t.preventDefault(),!1;this.longPressTriggered=!1,this.longPressTimer=setTimeout(()=>{this.longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:this.item},bubbles:!0,composed:!0}))},500)}handleMouseUp(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}handleMouseLeave(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}firstUpdated(){const t=this.shadowRoot.querySelector(".tile");t&&(t.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!0}),t.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!0}),t.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!0}),t.addEventListener("contextmenu",this.handleContextMenu.bind(this)))}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}getProductEmoji(t,e){if(!t)return this.getCategoryEmoji(e);const i=t.toLowerCase(),o={chicken:"🍗",turkey:"🦃",duck:"🦆",beef:"🥩",steak:"🥩",mince:"🥩",lamb:"🍖",pork:"🥓",bacon:"🥓",ham:"🍖",sausage:"🌭",salami:"🍖",fish:"🐟",salmon:"🐟",tuna:"🐟",prawn:"🦐",shrimp:"🦐",egg:"🥚",eggs:"🥚",milk:"🥛",cream:"🥛",yogurt:"🫙",yoghurt:"🫙",cheese:"🧀",cheddar:"🧀",feta:"🧀",mozzarella:"🧀",butter:"🧈",bread:"🍞",toast:"🍞",bun:"🥖",roll:"🥖",bagel:"🥯",loaf:"🍞",sourdough:"🍞",wrap:"🫓",croissant:"🥐",apple:"🍎",orange:"🍊",banana:"🍌",grape:"🍇",strawberry:"🍓",blueberry:"🫐",raspberry:"🍓",lemon:"🍋",lime:"🍋",pineapple:"🍍",mango:"🥭",watermelon:"🍉",melon:"🍈",peach:"🍑",pear:"🍐",cherry:"🍒",kiwi:"🥝",avocado:"🥑",tomato:"🍅",potato:"🥔",carrot:"🥕",broccoli:"🥦",lettuce:"🥬",spinach:"🥬",salad:"🥗",kale:"🥬",onion:"🧅",garlic:"🧄",corn:"🌽",pepper:"🫑",cucumber:"🥒",mushroom:"🍄",eggplant:"🍆",peas:"🫛",beans:"🫘",lentil:"🫘",coffee:"☕",espresso:"☕",latte:"☕",tea:"🍵",juice:"🧃",water:"💧",sparkling:"💧",beer:"🍺",wine:"🍷",cider:"🍺",spirits:"🥃",whisky:"🥃",soda:"🥤",cola:"🥤",pasta:"🍝",noodle:"🍜",rice:"🍚",oat:"🌾",cereal:"🥣",flour:"🌾",sugar:"🍬",salt:"🧂",oil:"🫙",vinegar:"🫙",sauce:"🫙",ketchup:"🫙",mustard:"🫙",mayonnaise:"🫙",honey:"🍯",jam:"🫙","peanut butter":"🥜",chocolate:"🍫",chips:"🥔",popcorn:"🍿",biscuit:"🍪",cookie:"🍪",cake:"🎂",muffin:"🧁",doughnut:"🍩","ice cream":"🍦",shampoo:"🧴",conditioner:"🧴",soap:"🧼",toothpaste:"🦷","toilet paper":"🧻",tissues:"🧻",nappy:"👶",diaper:"👶",formula:"👶","pet food":"🐾","dog food":"🐕","cat food":"🐈"};for(const[t,e]of Object.entries(o))if(i.includes(t))return e;return this.getCategoryEmoji(e)}getBundledIcon(t){if(!t)return null;const e=t.toLowerCase();for(const[t,i]of Object.entries(ut))if(e.includes(t)&&ht[i])return ht[i];return null}getLocalImageUrl(t){const e=this.settings?.localImagePath;if(!e||!t)return null;const i=t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/_+$/,"");return`${e.replace(/\/$/,"")}/${i}.jpg`}renderImage(){const t=this.item?.name,e=this.item?.category_id;if(this.item?.image_url)return F`<img src="${this.item.image_url}" alt="${t}">`;const i=this.getBundledIcon(t);if(i)return F`<div class="no-image"><img src="${i}" alt="${t}" class="product-icon"></div>`;const o=this.getLocalImageUrl(t);return o&&!this._localImgError?F`
        <div class="no-image">
          <img
            src="${o}"
            alt="${t}"
            class="product-icon"
            @error=${()=>{this._localImgError=!0}}
          >
        </div>
      `:F`
      <div class="no-image">
        <div class="emoji">${this.getProductEmoji(t,e)}</div>
      </div>
    `}render(){const{r:t,g:e,b:i}=this.hexToRgb(this.categoryColor),o=this.isRecentlyUsed?`rgba(${t},${e},${i},0.12)`:`rgba(${t},${e},${i},0.25)`,r=!1!==this.settings?.showPriceOnTile;return F`
      <div
        class="tile ${this.item.checked?"checked":""} ${this.isRecentlyUsed?"recently-used":""}"
        style="background: ${o}"
        @click=${this.handleTileClick}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseLeave}
      >
        ${this.isRecentlyUsed?F`
          <div class="quantity-badge" style="background: ${this.categoryColor}">+</div>
        `:F`
          ${this.item.checked?"":F`
            <button class="decrease-btn" style="background: rgba(${t},${e},${i},0.7)" @click=${this.handleDecrease}>
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
        `}

        ${this.renderImage()}

        <div class="info">
          <div class="name">${this.item.name}</div>
          ${r&&this.item.price?F`
            <div class="price">$${(this.item.price*(this.item.quantity||1)).toFixed(2)}</div>
          `:""}
        </div>

        ${this.item.checked?F`
          <div class="checked-overlay">
            <span class="check-icon">✓</span>
          </div>
        `:""}
      </div>
    `}static styles=n`
    .tile {
      position: relative;
      border-radius: 14px;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
      cursor: pointer;
      transition: all 0.15s;
      user-select: none;
      aspect-ratio: 1;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .tile:active {
      transform: scale(0.97);
    }
    .tile.recently-used {
      opacity: 0.8;
    }
    .tile.checked {
      opacity: var(--slm-tile-checked-opacity);
    }
    .decrease-btn,
    .quantity-badge {
      position: absolute;
      top: 0;
      width: 44px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      box-sizing: border-box;
      color: white;
      border: none;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      z-index: 2;
    }
    .decrease-btn {
      left: 0;
      border-radius: 14px 0 14px 0;
      box-shadow: 2px 2px 6px rgba(0,0,0,0.25);
    }
    .quantity-badge {
      right: 0;
      border-radius: 0 14px 0 14px;
      box-shadow: -2px 2px 6px rgba(0,0,0,0.25);
    }
    img, .no-image {
      width: 100%;
      flex: 1;
      min-height: 0;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
    .product-icon {
      width: 60%;
      height: 60%;
      object-fit: contain;
    }
    .emoji {
      font-size: 40px;
    }
    .info {
      flex-shrink: 0;
      padding: 5px 8px 7px;
    }
    .name {
      font-weight: 600;
      font-size: 12px;
      line-height: 1.2;
      margin-bottom: 2px;
      color: var(--slm-text-primary, #e0e0e0);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
      font-size: 11px;
      color: var(--slm-accent-primary, #9fa8da);
      font-weight: 700;
    }
    .checked-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(159, 168, 218, 0.9);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .check-icon {
      font-size: 40px;
      color: white;
    }
  `}customElements.define("slm-item-tile",gt);class ft extends at{constructor(){super(),this._recentItems=[]}static properties={items:{type:Array},categories:{type:Array},settings:{type:Object},api:{type:Object},_recentItems:{type:Array,state:!0}};updated(t){(t.has("items")||t.has("settings")||t.has("api"))&&this._loadRecentItems()}async _loadRecentItems(){if(!this.api||!1===this.settings?.showRecentlyUsed)return void(this._recentItems=[]);const t=this.settings?.recentProductsCount||8,e=new Set((this.items||[]).filter(t=>!t.checked).map(t=>t.product_id).filter(Boolean));try{const i="slm_recent_products",o=localStorage.getItem(i),r=o?JSON.parse(o):[],n=[...new Set(r)].filter(t=>!e.has(t)).slice(0,t);if(n.length>0){const t=await this.api.getProductsByIds(n);return void(this._recentItems=t.products||[])}const a=await this.api.getProductSuggestions(t+e.size);this._recentItems=(a.products||[]).filter(t=>!e.has(t.id)).slice(0,t)}catch(t){console.error("Failed to load recent items:",t),this._recentItems=[]}}groupItemsByCategory(){if("alphabetical"===(this.settings?.sortMode||"category")){const t=(this.items||[]).filter(t=>!t.checked);return t.sort((t,e)=>t.name.localeCompare(e.name)),[{category:{id:"_alpha",name:null,color:"#9fa8da"},items:t}]}const t={};return(this.categories||[]).forEach(e=>{t[e.id]={category:e,items:(this.items||[]).filter(t=>t.category_id===e.id&&!t.checked)}}),Object.values(t).filter(t=>t.items.length>0)}hexToRgb(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:159,g:168,b:218}}getCategoryHeaderStyle(t){const{r:e,g:i,b:o}=this.hexToRgb(t);return`border-left: 4px solid ${t}; background: linear-gradient(to right, rgba(${e},${i},${o},0.22), rgba(${e},${i},${o},0.066)); border-radius: 0 8px 8px 0;`}render(){const t=this.groupItemsByCategory(),e=this.settings?.tilesPerRow||3,i="#9e9e9e";return F`
      <style>
        .items-grid {
          grid-template-columns: repeat(${e}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${!1!==this.settings?.showRecentlyUsed&&this._recentItems.length>0?F`
          <div class="category-section">
            <div class="category-header" style="${this.getCategoryHeaderStyle(i)}">
              <span class="emoji">⏱️</span>
              <span class="category-name" style="color: ${i}">Recently Used</span>
            </div>
            <div class="items-grid">
              ${this._recentItems.map(t=>F`
                <slm-item-tile
                  .item=${t}
                  .categoryColor=${i}
                  .isRecentlyUsed=${!0}
                  .settings=${this.settings}
                  @add-item=${this.handleAddItem}
                ></slm-item-tile>
              `)}
            </div>
          </div>
        `:""}

        ${0===t.length&&0===this._recentItems.length?F`
          <div class="empty">
            <div class="empty-emoji">🛒</div>
            <p>Your shopping list is empty</p>
            <p class="hint">Search for products to add items</p>
          </div>
        `:""}

        ${t.map(t=>{const e=t.category.color||"#9fa8da";return F`
            <div class="category-section">
              ${"_alpha"!==t.category.id?F`
                <div class="category-header" style="${this.getCategoryHeaderStyle(e)}">
                  <span class="emoji">${this.getCategoryEmoji(t.category.id)}</span>
                  <span class="category-name" style="color: ${e}">${t.category.name}</span>
                </div>
              `:""}
              <div class="items-grid">
                ${t.items.map(t=>F`
                  <slm-item-tile
                    .item=${t}
                    .categoryColor=${e}
                    .settings=${this.settings}
                    @item-click=${this.handleItemClick}
                    @item-decrease=${this.handleItemDecrease}
                    @item-check=${this.handleItemCheck}
                    @item-long-press=${this.handleItemLongPress}
                    @item-swipe-delete=${this.handleItemSwipeDelete}
                  ></slm-item-tile>
                `)}
              </div>
            </div>
          `})}
      </div>
    `}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}handleAddItem(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("add-item",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-click",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemDecrease(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemCheck(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-check",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemLongPress(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-long-press",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemSwipeDelete(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-swipe-delete",{detail:t.detail,bubbles:!0,composed:!0}))}static styles=n`
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
      padding: 8px 12px;
      margin-bottom: 6px;
      font-weight: 700;
      font-size: 16px;
    }
    .emoji {
      font-size: 20px;
    }
    .category-name {
      flex: 1;
      font-weight: 700;
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
  `}customElements.define("slm-item-grid",ft);class mt extends at{static properties={items:{type:Array},categories:{type:Array},settings:{type:Object},api:{type:Object},_recentItems:{type:Array,state:!0},_longPressTimer:{state:!0},_longPressTriggered:{state:!0}};constructor(){super(),this._recentItems=[],this._longPressTimer=null,this._longPressTriggered=!1}updated(t){(t.has("items")||t.has("settings")||t.has("api"))&&this._loadRecentItems()}async _loadRecentItems(){if(!this.api||!1===this.settings?.showRecentlyUsed)return void(this._recentItems=[]);const t=this.settings?.recentProductsCount||8,e=new Set((this.items||[]).filter(t=>!t.checked).map(t=>t.product_id).filter(Boolean));try{const i="slm_recent_products",o=localStorage.getItem(i),r=o?JSON.parse(o):[],n=[...new Set(r)].filter(t=>!e.has(t)).slice(0,t);if(n.length>0){const t=await this.api.getProductsByIds(n);return void(this._recentItems=t.products||[])}const a=await this.api.getProductSuggestions(t+e.size);this._recentItems=(a.products||[]).filter(t=>!e.has(t.id)).slice(0,t)}catch(t){console.error("Failed to load recent items:",t),this._recentItems=[]}}hexToRgb(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:159,g:168,b:218}}getCategoryHeaderStyle(t){const{r:e,g:i,b:o}=this.hexToRgb(t);return`border-left: 4px solid ${t}; background: linear-gradient(to right, rgba(${e},${i},${o},0.22), rgba(${e},${i},${o},0.066)); border-radius: 0 8px 8px 0;`}getCategoryColor(t){const e=(this.categories||[]).find(e=>e.id===t);return e?.color||"#9fa8da"}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}getProductEmoji(t,e){if(!t)return this.getCategoryEmoji(e);const i=t.toLowerCase(),o={chicken:"🍗",turkey:"🦃",duck:"🦆",beef:"🥩",steak:"🥩",mince:"🥩",lamb:"🍖",pork:"🥓",bacon:"🥓",ham:"🍖",sausage:"🌭",salami:"🍖",fish:"🐟",salmon:"🐟",tuna:"🐟",prawn:"🦐",shrimp:"🦐",egg:"🥚",eggs:"🥚",milk:"🥛",cream:"🥛",yogurt:"🫙",yoghurt:"🫙",cheese:"🧀",cheddar:"🧀",feta:"🧀",mozzarella:"🧀",butter:"🧈",bread:"🍞",toast:"🍞",bun:"🥖",roll:"🥖",bagel:"🥯",loaf:"🍞",sourdough:"🍞",wrap:"🫓",croissant:"🥐",apple:"🍎",orange:"🍊",banana:"🍌",grape:"🍇",strawberry:"🍓",blueberry:"🫐",raspberry:"🍓",lemon:"🍋",lime:"🍋",pineapple:"🍍",mango:"🥭",watermelon:"🍉",melon:"🍈",peach:"🍑",pear:"🍐",cherry:"🍒",kiwi:"🥝",avocado:"🥑",tomato:"🍅",potato:"🥔",carrot:"🥕",broccoli:"🥦",lettuce:"🥬",spinach:"🥬",salad:"🥗",kale:"🥬",onion:"🧅",garlic:"🧄",corn:"🌽",pepper:"🫑",cucumber:"🥒",mushroom:"🍄",eggplant:"🍆",peas:"🫛",beans:"🫘",lentil:"🫘",coffee:"☕",espresso:"☕",tea:"🍵",juice:"🧃",water:"💧",beer:"🍺",wine:"🍷",soda:"🥤",cola:"🥤",pasta:"🍝",noodle:"🍜",rice:"🍚",oat:"🌾",cereal:"🥣",flour:"🌾",sugar:"🍬",salt:"🧂",honey:"🍯",chocolate:"🍫",chips:"🥔",popcorn:"🍿",biscuit:"🍪",cookie:"🍪",cake:"🎂",muffin:"🧁","ice cream":"🍦",shampoo:"🧴",soap:"🧼",toothpaste:"🦷","toilet paper":"🧻",nappy:"👶",diaper:"👶","pet food":"🐾"};for(const[t,e]of Object.entries(o))if(i.includes(t))return e;return this.getCategoryEmoji(e)}getBundledIcon(t){if(!t)return null;const e=t.toLowerCase();for(const[t,i]of Object.entries(ut))if(e.includes(t)&&ht[i])return ht[i];return null}getLocalImageUrl(t){const e=this.settings?.localImagePath;if(!e||!t)return null;const i=t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/_+$/,"");return`${e.replace(/\/$/,"")}/${i}.jpg`}groupItems(){const t=this.settings?.sortMode||"category",e=(this.items||[]).filter(t=>!t.checked);if("alphabetical"===t)return e.sort((t,e)=>t.name.localeCompare(e.name)),{mode:"alpha",sections:[{id:"_alpha",items:e}]};const i={};return(this.categories||[]).forEach(t=>{const o=e.filter(e=>e.category_id===t.id);o.length>0&&(i[t.id]={category:t,items:o})}),{mode:"category",sections:Object.values(i)}}handleRowClick(t,e){this._longPressTriggered?this._longPressTriggered=!1:t.target.closest(".list-decrease-btn")||t.target.closest(".list-qty-badge")||this.dispatchEvent(new CustomEvent("item-check",{detail:{itemId:e.id,checked:!e.checked},bubbles:!0,composed:!0}))}handleQtyClick(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:e.id},bubbles:!0,composed:!0}))}handleDecrease(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:{itemId:e.id},bubbles:!0,composed:!0}))}handleRecentClick(t){this.dispatchEvent(new CustomEvent("add-item",{detail:{name:t.name,category_id:t.category_id,product_id:t.id,quantity:1,unit:t.default_unit||"units",price:t.price||null,image_url:t.image_url||null,fromRecentlyUsed:!0},bubbles:!0,composed:!0}))}handleMouseDown(t){this._longPressTriggered=!1,this._longPressTimer=setTimeout(()=>{this._longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:t},bubbles:!0,composed:!0}))},500)}handleMouseUp(){this._longPressTimer&&(clearTimeout(this._longPressTimer),this._longPressTimer=null)}renderRowIcon(t,e,i){if(i)return F`<img src="${i}" alt="${t}" class="row-img" />`;const o=this.getBundledIcon(t);if(o)return F`<img src="${o}" alt="${t}" class="row-img icon-img" />`;const r=this.getLocalImageUrl(t);return r?F`
        <img
          src="${r}"
          alt="${t}"
          class="row-img icon-img"
          @error=${t=>{t.target.style.display="none",t.target.nextElementSibling?.style.removeProperty("display")}}
        /><span class="row-emoji" style="display:none">${this.getProductEmoji(t,e)}</span>
      `:F`<span class="row-emoji">${this.getProductEmoji(t,e)}</span>`}renderRow(t){const e=this.getCategoryColor(t.category_id),{r:i,g:o,b:r}=this.hexToRgb(e),n=!1!==this.settings?.showPriceOnTile;return F`
      <div
        class="list-row"
        @click=${e=>this.handleRowClick(e,t)}
        @mousedown=${()=>this.handleMouseDown(t)}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseUp}
        @touchstart=${()=>this.handleMouseDown(t)}
        @touchend=${this.handleMouseUp}
      >
        <div class="row-left">
          <div class="cat-dot" style="background: ${e}"></div>
          <div class="row-icon">
            ${this.renderRowIcon(t.name,t.category_id,t.image_url)}
          </div>
        </div>

        <div class="row-middle">
          <div class="row-name">${t.name}</div>
          ${n&&t.price?F`
            <div class="row-price">$${(t.price*t.quantity).toFixed(2)}</div>
          `:""}
        </div>

        <div class="row-right">
          <button
            class="list-decrease-btn"
            style="background: rgba(${i},${o},${r},0.15); color: ${e};"
            @click=${e=>this.handleDecrease(e,t)}
          >−</button>
          <div
            class="list-qty-badge"
            style="background: ${e}"
            @click=${e=>this.handleQtyClick(e,t)}
          >${t.quantity}</div>
        </div>
      </div>
    `}renderRecentRow(t){const e="#9e9e9e",i=!1!==this.settings?.showPriceOnTile;return F`
      <div
        class="list-row recent-row"
        @click=${()=>this.handleRecentClick(t)}
      >
        <div class="row-left">
          <div class="cat-dot" style="background: ${e}"></div>
          <div class="row-icon">
            ${this.renderRowIcon(t.name,t.category_id,t.image_url)}
          </div>
        </div>

        <div class="row-middle">
          <div class="row-name">${t.name}</div>
          ${i&&t.price?F`
            <div class="row-price">$${t.price.toFixed(2)}</div>
          `:""}
        </div>

        <div class="row-right">
          <div class="list-qty-badge recent-add" style="background: ${e}">+</div>
        </div>
      </div>
    `}render(){const{mode:t,sections:e}=this.groupItems(),i=!1!==this.settings?.showRecentlyUsed,o="#9e9e9e",r=e.every(t=>0===t.items.length)&&(!i||0===this._recentItems.length);return r?F`
        <div class="empty">
          <div class="empty-emoji">🛒</div>
          <p>Your shopping list is empty</p>
          <p class="hint">Search for products to add items</p>
        </div>
      `:F`
      <div class="list-container">

        ${i&&this._recentItems.length>0?F`
          <div class="list-section">
            <div class="category-header" style="${this.getCategoryHeaderStyle(o)}">
              <span class="cat-emoji">⏱️</span>
              <span class="cat-name" style="color: ${o}">Recently Used</span>
            </div>
            ${this._recentItems.map(t=>this.renderRecentRow(t))}
          </div>
        `:""}

        ${e.map(e=>F`
          <div class="list-section">
            ${"category"===t?F`
              <div class="category-header" style="${this.getCategoryHeaderStyle(e.category.color||"#9fa8da")}">
                <span class="cat-emoji">${this.getCategoryEmoji(e.category.id)}</span>
                <span class="cat-name" style="color: ${e.category.color||"#9fa8da"}">${e.category.name}</span>
              </div>
            `:""}
            ${e.items.map(t=>this.renderRow(t))}
          </div>
        `)}

      </div>
    `}static styles=n`
    .list-container {
      padding: 4px;
    }
    .list-section {
      margin-bottom: 12px;
    }
    .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 12px;
      margin-bottom: 4px;
      font-weight: 700;
      font-size: 15px;
    }
    .cat-emoji {
      font-size: 18px;
    }
    .cat-name {
      flex: 1;
      font-weight: 700;
    }
    .list-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
      transition: background 0.1s;
      -webkit-tap-highlight-color: transparent;
    }
    .list-row:active {
      background: var(--secondary-background-color, rgba(0,0,0,0.05));
    }
    .recent-row {
      opacity: 0.75;
    }
    .row-left {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .cat-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .row-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      flex-shrink: 0;
    }
    .row-img {
      width: 36px;
      height: 36px;
      object-fit: cover;
    }
    .icon-img {
      object-fit: contain;
    }
    .row-emoji {
      font-size: 24px;
      line-height: 1;
    }
    .row-middle {
      flex: 1;
      min-width: 0;
    }
    .row-name {
      font-weight: 600;
      font-size: 14px;
      color: var(--slm-text-primary, #e0e0e0);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .row-price {
      font-size: 12px;
      color: var(--slm-accent-primary, #9fa8da);
      font-weight: 600;
      margin-top: 1px;
    }
    .row-right {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .list-decrease-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .list-qty-badge {
      min-width: 32px;
      height: 32px;
      border-radius: 8px;
      color: white;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 6px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .recent-add {
      font-size: 20px;
      cursor: default;
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
  `}customElements.define("slm-item-list",mt);class bt extends at{static properties={api:{type:Object},categories:{type:Array},searchQuery:{type:String},searchResults:{type:Array},selectedProduct:{type:Object},quantity:{type:Number},customName:{type:String}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.selectedProduct=null,this.quantity=1,this.customName=""}async handleSearch(t){if(this.searchQuery=t.target.value,this.searchQuery.length<2)return void(this.searchResults=[]);const e=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=e.products}selectProduct(t){this.selectedProduct=t,this.quantity=t.default_quantity,this.searchQuery="",this.searchResults=[]}handleAdd(){this.selectedProduct?this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.selectedProduct.name,category_id:this.selectedProduct.category_id,product_id:this.selectedProduct.id,quantity:this.quantity,unit:this.selectedProduct.default_unit,price:this.selectedProduct.price,image_url:this.selectedProduct.image_url},bubbles:!0,composed:!0})):this.customName&&this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.customName,category_id:"other",quantity:this.quantity,unit:"units"},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return F`
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
    `}static styles=n`
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
  `}customElements.define("slm-add-item-dialog",bt);const vt=["units","kg","g","L","mL","pack","bunch","dozen","bottle","can","bag","box","loaf","slice"];class yt extends at{static properties={api:{type:Object},item:{type:Object},categories:{type:Array},editedItem:{type:Object},imagePreview:{type:String},_customUnit:{type:Boolean,state:!0}};constructor(){super(),this.editedItem={},this.imagePreview=null,this._customUnit=!1}updated(t){if(t.has("item")&&this.item){const t=this.item.unit||"units";this._customUnit=!vt.includes(t),this.editedItem={name:this.item.name,category_id:this.item.category_id||"other",quantity:this.item.quantity,unit:t,note:this.item.note||"",image_url:this.item.image_url||"",price:null!=this.item.price?this.item.price:""},this.imagePreview=this.item.image_url||null}}handleSave(){const t={...this.editedItem};""===t.price||null===t.price?delete t.price:t.price=parseFloat(t.price)||0,this.dispatchEvent(new CustomEvent("save-item",{detail:{itemId:this.item.id,data:t},bubbles:!0,composed:!0}))}handleDelete(){confirm(`Delete ${this.item.name}?`)&&this.dispatchEvent(new CustomEvent("delete-item",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}handleQtyChange(t){const e=Math.max(1,(this.editedItem.quantity||1)+t);this.editedItem={...this.editedItem,quantity:e}}handleUnitSelect(t){const e=t.target.value;"__other__"===e?(this._customUnit=!0,this.editedItem={...this.editedItem,unit:""}):(this._customUnit=!1,this.editedItem={...this.editedItem,unit:e})}handleImageUrlInput(t){const e=t.target.value;this.editedItem={...this.editedItem,image_url:e},this.imagePreview=e||null}handleFilePick(){const t=this.shadowRoot.querySelector("#file-input");t&&t.click()}handleFileChange(t){const e=t.target.files[0];if(!e)return;const i=new FileReader;i.onload=t=>{const e=t.target.result;this.editedItem={...this.editedItem,image_url:e},this.imagePreview=e},i.readAsDataURL(e)}handleClearImage(){this.editedItem={...this.editedItem,image_url:""},this.imagePreview=null;const t=this.shadowRoot.querySelector("#file-input");t&&(t.value="");const e=this.shadowRoot.querySelector("#image-url-input");e&&(e.value="")}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}render(){if(!this.item)return F``;const t=this.categories||[],e=this.editedItem.unit||"units",i=this._customUnit?"__other__":e;return F`
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

            <div class="form-group">
              <label>Category</label>
              <select
                .value=${this.editedItem.category_id||"other"}
                @change=${t=>this.editedItem={...this.editedItem,category_id:t.target.value}}
              >
                ${t.map(t=>F`
                  <option value="${t.id}" ?selected=${t.id===this.editedItem.category_id}>
                    ${this.getCategoryEmoji(t.id)} ${t.name}
                  </option>
                `)}
              </select>
            </div>

            <div class="form-row">
              <div class="form-group half">
                <label>Quantity</label>
                <div class="qty-stepper">
                  <button class="qty-btn" @click=${()=>this.handleQtyChange(-1)}>−</button>
                  <span class="qty-value">${this.editedItem.quantity||1}</span>
                  <button class="qty-btn" @click=${()=>this.handleQtyChange(1)}>+</button>
                </div>
              </div>

              <div class="form-group half">
                <label>Unit</label>
                <select .value=${i} @change=${this.handleUnitSelect}>
                  ${vt.map(t=>F`<option value="${t}" ?selected=${t===i}>${t}</option>`)}
                  <option value="__other__" ?selected=${this._customUnit}>Other…</option>
                </select>
                ${this._customUnit?F`
                  <input
                    type="text"
                    placeholder="e.g. jar, punnet…"
                    .value=${e}
                    @input=${t=>this.editedItem={...this.editedItem,unit:t.target.value}}
                    style="margin-top: 6px;"
                  />
                `:""}
              </div>
            </div>

            <div class="form-group">
              <label>Unit Price ($)</label>
              <input
                type="text"
                inputmode="decimal"
                placeholder="0.00"
                .value=${""!==this.editedItem.price&&null!=this.editedItem.price?String(this.editedItem.price):""}
                @input=${t=>this.editedItem={...this.editedItem,price:t.target.value}}
              />
              ${this.editedItem.price&&""!==this.editedItem.price?F`
                <div class="price-info">
                  <span>Total:</span>
                  <span class="price-value">$${(parseFloat(this.editedItem.price)*(this.editedItem.quantity||1)).toFixed(2)}</span>
                </div>
              `:""}
            </div>

            <div class="form-group">
              <label>Notes</label>
              <textarea
                placeholder="Add notes (optional)..."
                .value=${this.editedItem.note||""}
                @input=${t=>this.editedItem={...this.editedItem,note:t.target.value}}
                rows="3"
              ></textarea>
            </div>

            <div class="form-group image-section">
              <label>Product Image</label>

              ${this.imagePreview?F`
                <div class="image-preview-wrap">
                  <img class="image-preview" src="${this.imagePreview}" alt="Product image" />
                  <button class="clear-image-btn" @click=${this.handleClearImage} title="Remove image">✕</button>
                </div>
              `:""}

              <div class="image-url-row">
                <input
                  id="image-url-input"
                  type="text"
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
            <button class="action-btn danger" @click=${this.handleDelete}>
              Delete
            </button>
            <button class="action-btn primary" @click=${this.handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    `}static styles=n`
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
    .form-group textarea,
    .form-group select {
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
    .form-group textarea:focus,
    .form-group select:focus {
      outline: none;
      border-color: var(--slm-accent-primary, #9fa8da);
    }
    .form-group textarea {
      resize: vertical;
    }
    .qty-stepper {
      display: flex;
      align-items: center;
      border: 2px solid var(--slm-border-subtle, #e8eaf6);
      border-radius: 8px;
      overflow: hidden;
    }
    .qty-btn {
      width: 40px;
      height: 44px;
      border: none;
      background: var(--slm-bg-main, #fafbfc);
      color: var(--slm-text-primary, #424242);
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qty-btn:active {
      background: var(--slm-border-subtle, #e8eaf6);
    }
    .qty-value {
      flex: 1;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: var(--slm-text-primary, #424242);
      background: var(--slm-bg-elevated, #ffffff);
      padding: 10px 0;
      min-width: 40px;
    }
    .price-info {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--slm-bg-main, #fafbfc);
      border-radius: 8px;
      margin-top: 8px;
      font-size: 14px;
      color: var(--slm-text-primary, #424242);
    }
    .price-value {
      font-weight: 700;
      color: var(--slm-accent-primary, #9fa8da);
    }
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
    .action-btn.danger {
      background: var(--slm-accent-danger, #ef9a9a);
      color: white;
    }
    .action-btn:active {
      transform: scale(0.97);
    }
  `}customElements.define("slm-edit-item-dialog",yt);class xt extends at{static properties={list:{type:Object},isActive:{type:Boolean},itemCount:{type:Number},totalCost:{type:Number},currency:{type:String},emoji:{type:String},showMenu:{type:Boolean},menuX:{type:Number},menuY:{type:Number}};constructor(){super(),this.showMenu=!1,this.itemCount=0,this.totalCost=0,this.currency="NZD",this.menuX=0,this.menuY=0}getColorClass(){return`color-${parseInt(this.list.id.slice(-1),16)%6}`}dimColor(t){return`rgba(${parseInt(t.slice(1,3),16)}, ${parseInt(t.slice(3,5),16)}, ${parseInt(t.slice(5,7),16)}, 0.5)`}handleCardClick(t){t.target.closest(".menu-btn")||this.dispatchEvent(new CustomEvent("list-select",{detail:{listId:this.list.id},bubbles:!0,composed:!0}))}handleMenuClick(t){t.stopPropagation();const e=t.target.closest(".menu-btn").getBoundingClientRect();this.menuX=e.right-160,this.menuY=e.bottom+5,this.showMenu=!this.showMenu}handleAction(t,e){e.stopPropagation(),this.showMenu=!1,this.dispatchEvent(new CustomEvent("list-action",{detail:{action:t,listId:this.list.id},bubbles:!0,composed:!0}))}render(){return F`
      <div 
        class="list-card ${this.isActive?"active":"inactive"} ${this.getColorClass()}"
        @click=${this.handleCardClick}
      >

        ${this.isActive?F`
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
    `}static styles=n`
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
  `}customElements.define("slm-list-card",xt);class wt extends at{static properties={api:{type:Object},lists:{type:Array},activeList:{type:Object},items:{type:Array},total:{type:Object},listTotals:{type:Object},showCreateDialog:{type:Boolean},newListName:{type:String},newListIcon:{type:String}};constructor(){super(),this.lists=[],this.showCreateDialog=!1,this.listTotals={},this.newListName="",this.newListIcon="mdi:cart"}handleCreateList(){this.showCreateDialog=!0}async loadTotals(){if(!this.api||!this.lists?.length)return;const t={};await Promise.all(this.lists.map(async e=>{try{const i=await this.api.getListTotal(e.id);t[e.id]=i}catch(t){console.error("Failed to load total for list",e.id,t)}})),this.listTotals=t}async handleSaveNewList(){this.newListName.trim()&&(await this.api.createList(this.newListName,this.newListIcon),this.showCreateDialog=!1,this.newListName="",this.newListIcon="mdi:cart",this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})))}handleListSelect(t){this.dispatchEvent(new CustomEvent("list-selected",{detail:t.detail,bubbles:!0,composed:!0}))}async handleListAction(t){const{action:e,listId:i}=t.detail;switch(e){case"rename":const t=prompt("Enter new list name:");t&&(await this.api.updateList(i,{name:t}),this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})));break;case"delete":confirm("Delete this list?")&&(await this.api.deleteList(i),this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})));break;case"share":alert("Share feature coming soon!");break;case"copy":alert("Copy feature coming soon!")}}getListEmoji(t){return{"mdi:cart":"🛒","mdi:home":"🏠","mdi:food":"🍽️","mdi:shopping":"🛍️","mdi:store":"🏪"}[t]||"🛒"}updated(t){t.has("lists")&&this.loadTotals()}render(){return F`
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
    `}static styles=n`
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
  `}function _t(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}customElements.define("slm-lists-view",wt);var $t={},kt={},Et={};Object.defineProperty(Et,"__esModule",{value:!0});Et.default=function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.data=e,this.text=i.text||e,this.options=i},Object.defineProperty(kt,"__esModule",{value:!0}),kt.CODE39=void 0;var Ct,Ot=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),St=(Ct=Et)&&Ct.__esModule?Ct:{default:Ct};var Pt=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e=e.toUpperCase(),i.mod43&&(e+=function(t){return At[t]}(function(t){for(var e=0,i=0;i<t.length;i++)e+=Tt(t[i]);return e%=43,e}(e))),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,St.default),Ot(t,[{key:"encode",value:function(){for(var t=It("*"),e=0;e<this.data.length;e++)t+=It(this.data[e])+"0";return{data:t+=It("*"),text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)}}]),t}(),At=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],jt=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];function It(t){return function(t){return jt[t].toString(2)}(Tt(t))}function Tt(t){return At.indexOf(t)}kt.CODE39=Pt;var Lt,Mt={},Rt={},zt={},Dt={};function Nt(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}Object.defineProperty(Dt,"__esModule",{value:!0});var Ut=Dt.SET_A=0,Bt=Dt.SET_B=1,Ft=Dt.SET_C=2;Dt.SHIFT=98;var Ht=Dt.START_A=103,Gt=Dt.START_B=104,qt=Dt.START_C=105;Dt.MODULO=103,Dt.STOP=106,Dt.FNC1=207,Dt.SET_BY_CODE=(Nt(Lt={},Ht,Ut),Nt(Lt,Gt,Bt),Nt(Lt,qt,Ft),Lt),Dt.SWAP={101:Ut,100:Bt,99:Ft},Dt.A_START_CHAR=String.fromCharCode(208),Dt.B_START_CHAR=String.fromCharCode(209),Dt.C_START_CHAR=String.fromCharCode(210),Dt.A_CHARS="[\0-_È-Ï]",Dt.B_CHARS="[ -È-Ï]",Dt.C_CHARS="(Ï*[0-9]{2}Ï*)",Dt.BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011],Object.defineProperty(zt,"__esModule",{value:!0});var Xt=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Vt=function(t){return t&&t.__esModule?t:{default:t}}(Et),Qt=Dt;var Wt=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.substring(1),i));return o.bytes=e.split("").map(function(t){return t.charCodeAt(0)}),o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Vt.default),Xt(t,[{key:"valid",value:function(){return/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function(){var e=this.bytes,i=e.shift()-105,o=Qt.SET_BY_CODE[i];if(void 0===o)throw new RangeError("The encoding does not start with a start character.");!0===this.shouldEncodeAsEan128()&&e.unshift(Qt.FNC1);var r=t.next(e,1,o);return{text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:t.getBar(i)+r.result+t.getBar((r.checksum+i)%Qt.MODULO)+t.getBar(Qt.STOP)}}},{key:"shouldEncodeAsEan128",value:function(){var t=this.options.ean128||!1;return"string"==typeof t&&(t="true"===t.toLowerCase()),t}}],[{key:"getBar",value:function(t){return Qt.BARS[t]?Qt.BARS[t].toString():""}},{key:"correctIndex",value:function(t,e){if(e===Qt.SET_A){var i=t.shift();return i<32?i+64:i-32}return e===Qt.SET_B?t.shift()-32:10*(t.shift()-48)+t.shift()-48}},{key:"next",value:function(e,i,o){if(!e.length)return{result:"",checksum:0};var r=void 0,n=void 0;if(e[0]>=200){n=e.shift()-105;var a=Qt.SWAP[n];void 0!==a?r=t.next(e,i+1,a):(o!==Qt.SET_A&&o!==Qt.SET_B||n!==Qt.SHIFT||(e[0]=o===Qt.SET_A?e[0]>95?e[0]-96:e[0]:e[0]<32?e[0]+96:e[0]),r=t.next(e,i+1,o))}else n=t.correctIndex(e,o),r=t.next(e,i+1,o);var s=n*i;return{result:t.getBar(n)+r.result,checksum:s+r.checksum}}}]),t}();zt.default=Wt;var Yt={};Object.defineProperty(Yt,"__esModule",{value:!0});var Jt=Dt,Zt=function(t){return t.match(new RegExp("^"+Jt.A_CHARS+"*"))[0].length},Kt=function(t){return t.match(new RegExp("^"+Jt.B_CHARS+"*"))[0].length},te=function(t){return t.match(new RegExp("^"+Jt.C_CHARS+"*"))[0]};function ee(t,e){var i=e?Jt.A_CHARS:Jt.B_CHARS,o=t.match(new RegExp("^("+i+"+?)(([0-9]{2}){2,})([^0-9]|$)"));if(o)return o[1]+String.fromCharCode(204)+ie(t.substring(o[1].length));var r=t.match(new RegExp("^"+i+"+"))[0];return r.length===t.length?t:r+String.fromCharCode(e?205:206)+ee(t.substring(r.length),!e)}function ie(t){var e=te(t),i=e.length;if(i===t.length)return t;t=t.substring(i);var o=Zt(t)>=Kt(t);return e+String.fromCharCode(o?206:205)+ee(t,o)}Yt.default=function(t){var e=void 0;if(te(t).length>=2)e=Jt.C_START_CHAR+ie(t);else{var i=Zt(t)>Kt(t);e=(i?Jt.A_START_CHAR:Jt.B_START_CHAR)+ee(t,i)}return e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(t,e){return String.fromCharCode(203)+e})},Object.defineProperty(Rt,"__esModule",{value:!0});var oe=ne(zt),re=ne(Yt);function ne(t){return t&&t.__esModule?t:{default:t}}function ae(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var se=function(){function t(e,i){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),/^[\x00-\x7F\xC8-\xD3]+$/.test(e))var o=ae(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,(0,re.default)(e),i));else o=ae(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return ae(o)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,oe.default),t}();Rt.default=se;var ce={};Object.defineProperty(ce,"__esModule",{value:!0});var le=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),de=function(t){return t&&t.__esModule?t:{default:t}}(zt),pe=Dt;var ue=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,pe.A_START_CHAR+e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,de.default),le(t,[{key:"valid",value:function(){return new RegExp("^"+pe.A_CHARS+"+$").test(this.data)}}]),t}();ce.default=ue;var he={};Object.defineProperty(he,"__esModule",{value:!0});var ge=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),fe=function(t){return t&&t.__esModule?t:{default:t}}(zt),me=Dt;var be=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,me.B_START_CHAR+e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,fe.default),ge(t,[{key:"valid",value:function(){return new RegExp("^"+me.B_CHARS+"+$").test(this.data)}}]),t}();he.default=be;var ve={};Object.defineProperty(ve,"__esModule",{value:!0});var ye=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),xe=function(t){return t&&t.__esModule?t:{default:t}}(zt),we=Dt;var _e=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,we.C_START_CHAR+e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,xe.default),ye(t,[{key:"valid",value:function(){return new RegExp("^"+we.C_CHARS+"+$").test(this.data)}}]),t}();ve.default=_e,Object.defineProperty(Mt,"__esModule",{value:!0}),Mt.CODE128C=Mt.CODE128B=Mt.CODE128A=Mt.CODE128=void 0;var $e=Oe(Rt),ke=Oe(ce),Ee=Oe(he),Ce=Oe(ve);function Oe(t){return t&&t.__esModule?t:{default:t}}Mt.CODE128=$e.default,Mt.CODE128A=ke.default,Mt.CODE128B=Ee.default,Mt.CODE128C=Ce.default;var Se={},Pe={},Ae={};Object.defineProperty(Ae,"__esModule",{value:!0}),Ae.SIDE_BIN="101",Ae.MIDDLE_BIN="01010",Ae.BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]},Ae.EAN2_STRUCTURE=["LL","LG","GL","GG"],Ae.EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"],Ae.EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];var je={},Ie={};Object.defineProperty(Ie,"__esModule",{value:!0});var Te=Ae;Ie.default=function(t,e,i){var o=t.split("").map(function(t,i){return Te.BINARIES[e[i]]}).map(function(e,i){return e?e[t[i]]:""});if(i){var r=t.length-1;o=o.map(function(t,e){return e<r?t+i:t})}return o.join("")},Object.defineProperty(je,"__esModule",{value:!0});var Le=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Me=Ae,Re=De(Ie),ze=De(Et);function De(t){return t&&t.__esModule?t:{default:t}}var Ne=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return o.fontSize=!i.flat&&i.fontSize>10*i.width?10*i.width:i.fontSize,o.guardHeight=i.height+o.fontSize/2+i.textMargin,o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ze.default),Le(t,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function(t,e){return this.text.substr(t,e)}},{key:"leftEncode",value:function(t,e){return(0,Re.default)(t,e)}},{key:"rightText",value:function(t,e){return this.text.substr(t,e)}},{key:"rightEncode",value:function(t,e){return(0,Re.default)(t,e)}},{key:"encodeGuarded",value:function(){var t={fontSize:this.fontSize},e={height:this.guardHeight};return[{data:Me.SIDE_BIN,options:e},{data:this.leftEncode(),text:this.leftText(),options:t},{data:Me.MIDDLE_BIN,options:e},{data:this.rightEncode(),text:this.rightText(),options:t},{data:Me.SIDE_BIN,options:e}]}},{key:"encodeFlat",value:function(){return{data:[Me.SIDE_BIN,this.leftEncode(),Me.MIDDLE_BIN,this.rightEncode(),Me.SIDE_BIN].join(""),text:this.text}}}]),t}();je.default=Ne,Object.defineProperty(Pe,"__esModule",{value:!0});var Ue=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Be=function t(e,i,o){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,i);if(void 0===r){var n=Object.getPrototypeOf(e);return null===n?void 0:t(n,i,o)}if("value"in r)return r.value;var a=r.get;return void 0!==a?a.call(o):void 0},Fe=Ae,He=function(t){return t&&t.__esModule?t:{default:t}}(je);var Ge=function(t){var e=t.substr(0,12).split("").map(function(t){return+t}).reduce(function(t,e,i){return i%2?t+3*e:t+e},0);return(10-e%10)%10},qe=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{12}$/)&&(e+=Ge(e));var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return o.lastChar=i.lastChar,o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,He.default),Ue(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{13}$/)&&+this.data[12]===Ge(this.data)}},{key:"leftText",value:function(){return Be(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function(){var e=this.data.substr(1,6),i=Fe.EAN13_STRUCTURE[this.data[0]];return Be(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftEncode",this).call(this,e,i)}},{key:"rightText",value:function(){return Be(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function(){var e=this.data.substr(7,6);return Be(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightEncode",this).call(this,e,"RRRRRR")}},{key:"encodeGuarded",value:function(){var e=Be(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(e.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(e.push({data:"00"}),e.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),e}}]),t}();Pe.default=qe;var Xe={};Object.defineProperty(Xe,"__esModule",{value:!0});var Ve=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Qe=function t(e,i,o){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,i);if(void 0===r){var n=Object.getPrototypeOf(e);return null===n?void 0:t(n,i,o)}if("value"in r)return r.value;var a=r.get;return void 0!==a?a.call(o):void 0},We=function(t){return t&&t.__esModule?t:{default:t}}(je);var Ye=function(t){var e=t.substr(0,7).split("").map(function(t){return+t}).reduce(function(t,e,i){return i%2?t+e:t+3*e},0);return(10-e%10)%10},Je=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{7}$/)&&(e+=Ye(e)),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,We.default),Ve(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{8}$/)&&+this.data[7]===Ye(this.data)}},{key:"leftText",value:function(){return Qe(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function(){var e=this.data.substr(0,4);return Qe(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftEncode",this).call(this,e,"LLLL")}},{key:"rightText",value:function(){return Qe(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function(){var e=this.data.substr(4,4);return Qe(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightEncode",this).call(this,e,"RRRR")}}]),t}();Xe.default=Je;var Ze={};Object.defineProperty(Ze,"__esModule",{value:!0});var Ke=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),ti=Ae,ei=oi(Ie),ii=oi(Et);function oi(t){return t&&t.__esModule?t:{default:t}}var ri=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ii.default),Ke(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{5}$/)}},{key:"encode",value:function(){var t,e,i=ti.EAN5_STRUCTURE[(t=this.data,e=t.split("").map(function(t){return+t}).reduce(function(t,e,i){return i%2?t+9*e:t+3*e},0),e%10)];return{data:"1011"+(0,ei.default)(this.data,i,"01"),text:this.text}}}]),t}();Ze.default=ri;var ni={};Object.defineProperty(ni,"__esModule",{value:!0});var ai=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),si=Ae,ci=di(Ie),li=di(Et);function di(t){return t&&t.__esModule?t:{default:t}}var pi=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,li.default),ai(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{2}$/)}},{key:"encode",value:function(){var t=si.EAN2_STRUCTURE[parseInt(this.data)%4];return{data:"1011"+(0,ci.default)(this.data,t,"01"),text:this.text}}}]),t}();ni.default=pi;var ui={};Object.defineProperty(ui,"__esModule",{value:!0});var hi=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}();ui.checksum=vi;var gi=mi(Ie),fi=mi(Et);function mi(t){return t&&t.__esModule?t:{default:t}}var bi=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{11}$/)&&(e+=vi(e));var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return o.displayValue=i.displayValue,i.fontSize>10*i.width?o.fontSize=10*i.width:o.fontSize=i.fontSize,o.guardHeight=i.height+o.fontSize/2+i.textMargin,o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,fi.default),hi(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{12}$/)&&this.data[11]==vi(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=(0,gi.default)(this.data.substr(0,6),"LLLLLL"),t+="01010",t+=(0,gi.default)(this.data.substr(6,6),"RRRRRR"),{data:t+="101",text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101"+(0,gi.default)(this.data[0],"L"),options:{height:this.guardHeight}}),t.push({data:(0,gi.default)(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),t.push({data:"01010",options:{height:this.guardHeight}}),t.push({data:(0,gi.default)(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),t.push({data:(0,gi.default)(this.data[11],"R")+"101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),t}}]),t}();function vi(t){var e,i=0;for(e=1;e<11;e+=2)i+=parseInt(t[e]);for(e=0;e<11;e+=2)i+=3*parseInt(t[e]);return(10-i%10)%10}ui.default=bi;var yi={};Object.defineProperty(yi,"__esModule",{value:!0});var xi=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),wi=ki(Ie),_i=ki(Et),$i=ui;function ki(t){return t&&t.__esModule?t:{default:t}}function Ei(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var Ci=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],Oi=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],Si=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var o=Ei(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));if(o.isValid=!1,-1!==e.search(/^[0-9]{6}$/))o.middleDigits=e,o.upcA=Pi(e,"0"),o.text=i.text||""+o.upcA[0]+e+o.upcA[o.upcA.length-1],o.isValid=!0;else{if(-1===e.search(/^[01][0-9]{7}$/))return Ei(o);if(o.middleDigits=e.substring(1,e.length-1),o.upcA=Pi(o.middleDigits,e[0]),o.upcA[o.upcA.length-1]!==e[e.length-1])return Ei(o);o.isValid=!0}return o.displayValue=i.displayValue,i.fontSize>10*i.width?o.fontSize=10*i.width:o.fontSize=i.fontSize,o.guardHeight=i.height+o.fontSize/2+i.textMargin,o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,_i.default),xi(t,[{key:"valid",value:function(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=this.encodeMiddleDigits(),{data:t+="010101",text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101",options:{height:this.guardHeight}}),t.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),t.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),t}},{key:"encodeMiddleDigits",value:function(){var t=this.upcA[0],e=this.upcA[this.upcA.length-1],i=Oi[parseInt(e)][parseInt(t)];return(0,wi.default)(this.middleDigits,i)}}]),t}();function Pi(t,e){for(var i=parseInt(t[t.length-1]),o=Ci[i],r="",n=0,a=0;a<o.length;a++){var s=o[a];r+="X"===s?t[n++]:s}return""+(r=""+e+r)+(0,$i.checksum)(r)}yi.default=Si,Object.defineProperty(Se,"__esModule",{value:!0}),Se.UPCE=Se.UPC=Se.EAN2=Se.EAN5=Se.EAN8=Se.EAN13=void 0;var Ai=Ri(Pe),ji=Ri(Xe),Ii=Ri(Ze),Ti=Ri(ni),Li=Ri(ui),Mi=Ri(yi);function Ri(t){return t&&t.__esModule?t:{default:t}}Se.EAN13=Ai.default,Se.EAN8=ji.default,Se.EAN5=Ii.default,Se.EAN2=Ti.default,Se.UPC=Li.default,Se.UPCE=Mi.default;var zi={},Di={},Ni={};Object.defineProperty(Ni,"__esModule",{value:!0}),Ni.START_BIN="1010",Ni.END_BIN="11101",Ni.BINARIES=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"],Object.defineProperty(Di,"__esModule",{value:!0});var Ui=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Bi=Ni,Fi=function(t){return t&&t.__esModule?t:{default:t}}(Et);var Hi=function(){function t(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Fi.default),Ui(t,[{key:"valid",value:function(){return-1!==this.data.search(/^([0-9]{2})+$/)}},{key:"encode",value:function(){var t=this,e=this.data.match(/.{2}/g).map(function(e){return t.encodePair(e)}).join("");return{data:Bi.START_BIN+e+Bi.END_BIN,text:this.text}}},{key:"encodePair",value:function(t){var e=Bi.BINARIES[t[1]];return Bi.BINARIES[t[0]].split("").map(function(t,i){return("1"===t?"111":"1")+("1"===e[i]?"000":"0")}).join("")}}]),t}();Di.default=Hi;var Gi={};Object.defineProperty(Gi,"__esModule",{value:!0});var qi=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Xi=function(t){return t&&t.__esModule?t:{default:t}}(Di);var Vi=function(t){var e=t.substr(0,13).split("").map(function(t){return parseInt(t,10)}).reduce(function(t,e,i){return t+e*(3-i%2*2)},0);return 10*Math.ceil(e/10)-e},Qi=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{13}$/)&&(e+=Vi(e)),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Xi.default),qi(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{14}$/)&&+this.data[13]===Vi(this.data)}}]),t}();Gi.default=Qi,Object.defineProperty(zi,"__esModule",{value:!0}),zi.ITF14=zi.ITF=void 0;var Wi=Ji(Di),Yi=Ji(Gi);function Ji(t){return t&&t.__esModule?t:{default:t}}zi.ITF=Wi.default,zi.ITF14=Yi.default;var Zi={},Ki={};Object.defineProperty(Ki,"__esModule",{value:!0});var to=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),eo=function(t){return t&&t.__esModule?t:{default:t}}(Et);var io=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,eo.default),to(t,[{key:"encode",value:function(){for(var t="110",e=0;e<this.data.length;e++){var i=parseInt(this.data[e]).toString(2);i=oo(i,4-i.length);for(var o=0;o<i.length;o++)t+="0"==i[o]?"100":"110"}return{data:t+="1001",text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]+$/)}}]),t}();function oo(t,e){for(var i=0;i<e;i++)t="0"+t;return t}Ki.default=io;var ro={},no={};Object.defineProperty(no,"__esModule",{value:!0}),no.mod10=function(t){for(var e=0,i=0;i<t.length;i++){var o=parseInt(t[i]);(i+t.length)%2==0?e+=o:e+=2*o%10+Math.floor(2*o/10)}return(10-e%10)%10},no.mod11=function(t){for(var e=0,i=[2,3,4,5,6,7],o=0;o<t.length;o++){var r=parseInt(t[t.length-1-o]);e+=i[o%i.length]*r}return(11-e%11)%11},Object.defineProperty(ro,"__esModule",{value:!0});var ao=function(t){return t&&t.__esModule?t:{default:t}}(Ki),so=no;var co=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e+(0,so.mod10)(e),i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ao.default),t}();ro.default=co;var lo={};Object.defineProperty(lo,"__esModule",{value:!0});var po=function(t){return t&&t.__esModule?t:{default:t}}(Ki),uo=no;var ho=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e+(0,uo.mod11)(e),i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,po.default),t}();lo.default=ho;var go={};Object.defineProperty(go,"__esModule",{value:!0});var fo=function(t){return t&&t.__esModule?t:{default:t}}(Ki),mo=no;var bo=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e+=(0,mo.mod10)(e),e+=(0,mo.mod10)(e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,fo.default),t}();go.default=bo;var vo={};Object.defineProperty(vo,"__esModule",{value:!0});var yo=function(t){return t&&t.__esModule?t:{default:t}}(Ki),xo=no;var wo=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e+=(0,xo.mod11)(e),e+=(0,xo.mod10)(e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,yo.default),t}();vo.default=wo,Object.defineProperty(Zi,"__esModule",{value:!0}),Zi.MSI1110=Zi.MSI1010=Zi.MSI11=Zi.MSI10=Zi.MSI=void 0;var _o=Oo(Ki),$o=Oo(ro),ko=Oo(lo),Eo=Oo(go),Co=Oo(vo);function Oo(t){return t&&t.__esModule?t:{default:t}}Zi.MSI=_o.default,Zi.MSI10=$o.default,Zi.MSI11=ko.default,Zi.MSI1010=Eo.default,Zi.MSI1110=Co.default;var So={};Object.defineProperty(So,"__esModule",{value:!0}),So.pharmacode=void 0;var Po=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Ao=function(t){return t&&t.__esModule?t:{default:t}}(Et);var jo=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i));return o.number=parseInt(e,10),o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Ao.default),Po(t,[{key:"encode",value:function(){for(var t=this.number,e="";!isNaN(t)&&0!=t;)t%2==0?(e="11100"+e,t=(t-2)/2):(e="100"+e,t=(t-1)/2);return{data:e=e.slice(0,-2),text:this.text}}},{key:"valid",value:function(){return this.number>=3&&this.number<=131070}}]),t}();So.pharmacode=jo;var Io={};Object.defineProperty(Io,"__esModule",{value:!0}),Io.codabar=void 0;var To=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Lo=function(t){return t&&t.__esModule?t:{default:t}}(Et);var Mo=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),0===e.search(/^[0-9\-\$\:\.\+\/]+$/)&&(e="A"+e+"A");var o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.toUpperCase(),i));return o.text=o.options.text||o.text.replace(/[A-D]/g,""),o}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Lo.default),To(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)}},{key:"encode",value:function(){for(var t=[],e=this.getEncodings(),i=0;i<this.data.length;i++)t.push(e[this.data.charAt(i)]),i!==this.data.length-1&&t.push("0");return{text:this.text,data:t.join("")}}},{key:"getEncodings",value:function(){return{0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"1011011011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),t}();Io.codabar=Mo;var Ro={},zo={},Do={};Object.defineProperty(Do,"__esModule",{value:!0}),Do.SYMBOLS=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","($)","(%)","(/)","(+)","ÿ"],Do.BINARIES=["100010100","101001000","101000100","101000010","100101000","100100100","100100010","101010000","100010010","100001010","110101000","110100100","110100010","110010100","110010010","110001010","101101000","101100100","101100010","100110100","100011010","101011000","101001100","101000110","100101100","100010110","110110100","110110010","110101100","110100110","110010110","110011010","101101100","101100110","100110110","100111010","100101110","111010100","111010010","111001010","101101110","101110110","110101110","100100110","111011010","111010110","100110010","101011110"],Do.MULTI_SYMBOLS={"\0":["(%)","U"],"":["($)","A"],"":["($)","B"],"":["($)","C"],"":["($)","D"],"":["($)","E"],"":["($)","F"],"":["($)","G"],"\b":["($)","H"],"\t":["($)","I"],"\n":["($)","J"],"\v":["($)","K"],"\f":["($)","L"],"\r":["($)","M"],"":["($)","N"],"":["($)","O"],"":["($)","P"],"":["($)","Q"],"":["($)","R"],"":["($)","S"],"":["($)","T"],"":["($)","U"],"":["($)","V"],"":["($)","W"],"":["($)","X"],"":["($)","Y"],"":["($)","Z"],"":["(%)","A"],"":["(%)","B"],"":["(%)","C"],"":["(%)","D"],"":["(%)","E"],"!":["(/)","A"],'"':["(/)","B"],"#":["(/)","C"],"&":["(/)","F"],"'":["(/)","G"],"(":["(/)","H"],")":["(/)","I"],"*":["(/)","J"],",":["(/)","L"],":":["(/)","Z"],";":["(%)","F"],"<":["(%)","G"],"=":["(%)","H"],">":["(%)","I"],"?":["(%)","J"],"@":["(%)","V"],"[":["(%)","K"],"\\":["(%)","L"],"]":["(%)","M"],"^":["(%)","N"],_:["(%)","O"],"`":["(%)","W"],a:["(+)","A"],b:["(+)","B"],c:["(+)","C"],d:["(+)","D"],e:["(+)","E"],f:["(+)","F"],g:["(+)","G"],h:["(+)","H"],i:["(+)","I"],j:["(+)","J"],k:["(+)","K"],l:["(+)","L"],m:["(+)","M"],n:["(+)","N"],o:["(+)","O"],p:["(+)","P"],q:["(+)","Q"],r:["(+)","R"],s:["(+)","S"],t:["(+)","T"],u:["(+)","U"],v:["(+)","V"],w:["(+)","W"],x:["(+)","X"],y:["(+)","Y"],z:["(+)","Z"],"{":["(%)","P"],"|":["(%)","Q"],"}":["(%)","R"],"~":["(%)","S"],"":["(%)","T"]},Object.defineProperty(zo,"__esModule",{value:!0});var No=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Uo=Do,Bo=function(t){return t&&t.__esModule?t:{default:t}}(Et);var Fo=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Bo.default),No(t,[{key:"valid",value:function(){return/^[0-9A-Z\-. $/+%]+$/.test(this.data)}},{key:"encode",value:function(){var e=this.data.split("").flatMap(function(t){return Uo.MULTI_SYMBOLS[t]||t}),i=e.map(function(e){return t.getEncoding(e)}).join(""),o=t.checksum(e,20),r=t.checksum(e.concat(o),15);return{text:this.text,data:t.getEncoding("ÿ")+i+t.getEncoding(o)+t.getEncoding(r)+t.getEncoding("ÿ")+"1"}}}],[{key:"getEncoding",value:function(e){return Uo.BINARIES[t.symbolValue(e)]}},{key:"getSymbol",value:function(t){return Uo.SYMBOLS[t]}},{key:"symbolValue",value:function(t){return Uo.SYMBOLS.indexOf(t)}},{key:"checksum",value:function(e,i){var o=e.slice().reverse().reduce(function(e,o,r){var n=r%i+1;return e+t.symbolValue(o)*n},0);return t.getSymbol(o%47)}}]),t}();zo.default=Fo;var Ho={};Object.defineProperty(Ho,"__esModule",{value:!0});var Go=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),qo=function(t){return t&&t.__esModule?t:{default:t}}(zo);var Xo=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,qo.default),Go(t,[{key:"valid",value:function(){return/^[\x00-\x7f]+$/.test(this.data)}}]),t}();Ho.default=Xo,Object.defineProperty(Ro,"__esModule",{value:!0}),Ro.CODE93FullASCII=Ro.CODE93=void 0;var Vo=Wo(zo),Qo=Wo(Ho);function Wo(t){return t&&t.__esModule?t:{default:t}}Ro.CODE93=Vo.default,Ro.CODE93FullASCII=Qo.default;var Yo={};Object.defineProperty(Yo,"__esModule",{value:!0}),Yo.GenericBarcode=void 0;var Jo=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Zo=function(t){return t&&t.__esModule?t:{default:t}}(Et);var Ko=function(){function t(e,i){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Zo.default),Jo(t,[{key:"encode",value:function(){return{data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function(){return!0}}]),t}();Yo.GenericBarcode=Ko,Object.defineProperty($t,"__esModule",{value:!0});var tr=kt,er=Mt,ir=Se,or=zi,rr=Zi,nr=So,ar=Io,sr=Ro,cr=Yo;$t.default={CODE39:tr.CODE39,CODE128:er.CODE128,CODE128A:er.CODE128A,CODE128B:er.CODE128B,CODE128C:er.CODE128C,EAN13:ir.EAN13,EAN8:ir.EAN8,EAN5:ir.EAN5,EAN2:ir.EAN2,UPC:ir.UPC,UPCE:ir.UPCE,ITF14:or.ITF14,ITF:or.ITF,MSI:rr.MSI,MSI10:rr.MSI10,MSI11:rr.MSI11,MSI1010:rr.MSI1010,MSI1110:rr.MSI1110,pharmacode:nr.pharmacode,codabar:ar.codabar,CODE93:sr.CODE93,CODE93FullASCII:sr.CODE93FullASCII,GenericBarcode:cr.GenericBarcode};var lr={};Object.defineProperty(lr,"__esModule",{value:!0});var dr=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t};lr.default=function(t,e){return dr({},t,e)};var pr={};Object.defineProperty(pr,"__esModule",{value:!0}),pr.default=function(t){var e=[];return function t(i){if(Array.isArray(i))for(var o=0;o<i.length;o++)t(i[o]);else i.text=i.text||"",i.data=i.data||"",e.push(i)}(t),e};var ur={};Object.defineProperty(ur,"__esModule",{value:!0}),ur.default=function(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t};var hr={},gr={},fr={};Object.defineProperty(fr,"__esModule",{value:!0}),fr.default=function(t){var e=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var i in e)e.hasOwnProperty(i)&&"string"==typeof t[i=e[i]]&&(t[i]=parseInt(t[i],10));"string"==typeof t.displayValue&&(t.displayValue="false"!=t.displayValue);return t};var mr={};Object.defineProperty(mr,"__esModule",{value:!0});var br={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(){}};mr.default=br,Object.defineProperty(gr,"__esModule",{value:!0});var vr=xr(fr),yr=xr(mr);function xr(t){return t&&t.__esModule?t:{default:t}}gr.default=function(t){var e={};for(var i in yr.default)yr.default.hasOwnProperty(i)&&(t.hasAttribute("jsbarcode-"+i.toLowerCase())&&(e[i]=t.getAttribute("jsbarcode-"+i.toLowerCase())),t.hasAttribute("data-"+i.toLowerCase())&&(e[i]=t.getAttribute("data-"+i.toLowerCase())));return e.value=t.getAttribute("jsbarcode-value")||t.getAttribute("data-value"),e=(0,vr.default)(e)};var wr={},_r={},$r={};Object.defineProperty($r,"__esModule",{value:!0}),$r.getTotalWidthOfEncodings=$r.calculateEncodingAttributes=$r.getBarcodePadding=$r.getEncodingHeight=$r.getMaximumHeightOfEncodings=void 0;var kr=function(t){return t&&t.__esModule?t:{default:t}}(lr);function Er(t,e){return e.height+(e.displayValue&&t.text.length>0?e.fontSize+e.textMargin:0)+e.marginTop+e.marginBottom}function Cr(t,e,i){if(i.displayValue&&e<t){if("center"==i.textAlign)return Math.floor((t-e)/2);if("left"==i.textAlign)return 0;if("right"==i.textAlign)return Math.floor(t-e)}return 0}function Or(t,e,i){var o;if(i)o=i;else{if("undefined"==typeof document)return 0;o=document.createElement("canvas").getContext("2d")}o.font=e.fontOptions+" "+e.fontSize+"px "+e.font;var r=o.measureText(t);return r?r.width:0}$r.getMaximumHeightOfEncodings=function(t){for(var e=0,i=0;i<t.length;i++)t[i].height>e&&(e=t[i].height);return e},$r.getEncodingHeight=Er,$r.getBarcodePadding=Cr,$r.calculateEncodingAttributes=function(t,e,i){for(var o=0;o<t.length;o++){var r,n=t[o],a=(0,kr.default)(e,n.options);r=a.displayValue?Or(n.text,a,i):0;var s=n.data.length*a.width;n.width=Math.ceil(Math.max(r,s)),n.height=Er(n,a),n.barcodePadding=Cr(r,s,a)}},$r.getTotalWidthOfEncodings=function(t){for(var e=0,i=0;i<t.length;i++)e+=t[i].width;return e},Object.defineProperty(_r,"__esModule",{value:!0});var Sr=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Pr=function(t){return t&&t.__esModule?t:{default:t}}(lr),Ar=$r;var jr=function(){function t(e,i,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=e,this.encodings=i,this.options=o}return Sr(t,[{key:"render",value:function(){if(!this.canvas.getContext)throw new Error("The browser does not support canvas.");this.prepareCanvas();for(var t=0;t<this.encodings.length;t++){var e=(0,Pr.default)(this.options,this.encodings[t].options);this.drawCanvasBarcode(e,this.encodings[t]),this.drawCanvasText(e,this.encodings[t]),this.moveCanvasDrawing(this.encodings[t])}this.restoreCanvas()}},{key:"prepareCanvas",value:function(){var t=this.canvas.getContext("2d");t.save(),(0,Ar.calculateEncodingAttributes)(this.encodings,this.options,t);var e=(0,Ar.getTotalWidthOfEncodings)(this.encodings),i=(0,Ar.getMaximumHeightOfEncodings)(this.encodings);this.canvas.width=e+this.options.marginLeft+this.options.marginRight,this.canvas.height=i,t.clearRect(0,0,this.canvas.width,this.canvas.height),this.options.background&&(t.fillStyle=this.options.background,t.fillRect(0,0,this.canvas.width,this.canvas.height)),t.translate(this.options.marginLeft,0)}},{key:"drawCanvasBarcode",value:function(t,e){var i,o=this.canvas.getContext("2d"),r=e.data;i="top"==t.textPosition?t.marginTop+t.fontSize+t.textMargin:t.marginTop,o.fillStyle=t.lineColor;for(var n=0;n<r.length;n++){var a=n*t.width+e.barcodePadding;"1"===r[n]?o.fillRect(a,i,t.width,t.height):r[n]&&o.fillRect(a,i,t.width,t.height*r[n])}}},{key:"drawCanvasText",value:function(t,e){var i,o,r=this.canvas.getContext("2d"),n=t.fontOptions+" "+t.fontSize+"px "+t.font;t.displayValue&&(o="top"==t.textPosition?t.marginTop+t.fontSize-t.textMargin:t.height+t.textMargin+t.marginTop+t.fontSize,r.font=n,"left"==t.textAlign||e.barcodePadding>0?(i=0,r.textAlign="left"):"right"==t.textAlign?(i=e.width-1,r.textAlign="right"):(i=e.width/2,r.textAlign="center"),r.fillText(e.text,i,o))}},{key:"moveCanvasDrawing",value:function(t){this.canvas.getContext("2d").translate(t.width,0)}},{key:"restoreCanvas",value:function(){this.canvas.getContext("2d").restore()}}]),t}();_r.default=jr;var Ir={};Object.defineProperty(Ir,"__esModule",{value:!0});var Tr=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),Lr=function(t){return t&&t.__esModule?t:{default:t}}(lr),Mr=$r;var Rr="http://www.w3.org/2000/svg",zr=function(){function t(e,i,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.svg=e,this.encodings=i,this.options=o,this.document=o.xmlDocument||document}return Tr(t,[{key:"render",value:function(){var t=this.options.marginLeft;this.prepareSVG();for(var e=0;e<this.encodings.length;e++){var i=this.encodings[e],o=(0,Lr.default)(this.options,i.options),r=this.createGroup(t,o.marginTop,this.svg);this.setGroupOptions(r,o),this.drawSvgBarcode(r,o,i),this.drawSVGText(r,o,i),t+=i.width}}},{key:"prepareSVG",value:function(){for(;this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);(0,Mr.calculateEncodingAttributes)(this.encodings,this.options);var t=(0,Mr.getTotalWidthOfEncodings)(this.encodings),e=(0,Mr.getMaximumHeightOfEncodings)(this.encodings),i=t+this.options.marginLeft+this.options.marginRight;this.setSvgAttributes(i,e),this.options.background&&this.drawRect(0,0,i,e,this.svg).setAttribute("fill",this.options.background)}},{key:"drawSvgBarcode",value:function(t,e,i){var o,r=i.data;o="top"==e.textPosition?e.fontSize+e.textMargin:0;for(var n=0,a=0,s=0;s<r.length;s++)a=s*e.width+i.barcodePadding,"1"===r[s]?n++:n>0&&(this.drawRect(a-e.width*n,o,e.width*n,e.height,t),n=0);n>0&&this.drawRect(a-e.width*(n-1),o,e.width*n,e.height,t)}},{key:"drawSVGText",value:function(t,e,i){var o,r,n=this.document.createElementNS(Rr,"text");e.displayValue&&(n.setAttribute("font-family",e.font),n.setAttribute("font-size",e.fontSize),e.fontOptions.includes("bold")&&n.setAttribute("font-weight","bold"),e.fontOptions.includes("italic")&&n.setAttribute("font-style","italic"),r="top"==e.textPosition?e.fontSize-e.textMargin:e.height+e.textMargin+e.fontSize,"left"==e.textAlign||i.barcodePadding>0?(o=0,n.setAttribute("text-anchor","start")):"right"==e.textAlign?(o=i.width-1,n.setAttribute("text-anchor","end")):(o=i.width/2,n.setAttribute("text-anchor","middle")),n.setAttribute("x",o),n.setAttribute("y",r),n.appendChild(this.document.createTextNode(i.text)),t.appendChild(n))}},{key:"setSvgAttributes",value:function(t,e){var i=this.svg;i.setAttribute("width",t+"px"),i.setAttribute("height",e+"px"),i.setAttribute("x","0px"),i.setAttribute("y","0px"),i.setAttribute("viewBox","0 0 "+t+" "+e),i.setAttribute("xmlns",Rr),i.setAttribute("version","1.1")}},{key:"createGroup",value:function(t,e,i){var o=this.document.createElementNS(Rr,"g");return o.setAttribute("transform","translate("+t+", "+e+")"),i.appendChild(o),o}},{key:"setGroupOptions",value:function(t,e){t.setAttribute("fill",e.lineColor)}},{key:"drawRect",value:function(t,e,i,o,r){var n=this.document.createElementNS(Rr,"rect");return n.setAttribute("x",t),n.setAttribute("y",e),n.setAttribute("width",i),n.setAttribute("height",o),r.appendChild(n),n}}]),t}();Ir.default=zr;var Dr={};Object.defineProperty(Dr,"__esModule",{value:!0});var Nr=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}();var Ur=function(){function t(e,i,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.object=e,this.encodings=i,this.options=o}return Nr(t,[{key:"render",value:function(){this.object.encodings=this.encodings}}]),t}();Dr.default=Ur,Object.defineProperty(wr,"__esModule",{value:!0});var Br=Gr(_r),Fr=Gr(Ir),Hr=Gr(Dr);function Gr(t){return t&&t.__esModule?t:{default:t}}wr.default={CanvasRenderer:Br.default,SVGRenderer:Fr.default,ObjectRenderer:Hr.default};var qr={};function Xr(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Vr(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function Qr(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(qr,"__esModule",{value:!0});var Wr=function(){function t(e,i){Xr(this,t);var o=Vr(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return o.name="InvalidInputException",o.symbology=e,o.input=i,o.message='"'+o.input+'" is not a valid input for '+o.symbology,o}return Qr(t,Error),t}(),Yr=function(){function t(){Xr(this,t);var e=Vr(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.name="InvalidElementException",e.message="Not supported type to render on",e}return Qr(t,Error),t}(),Jr=function(){function t(){Xr(this,t);var e=Vr(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.name="NoElementException",e.message="No element to render on.",e}return Qr(t,Error),t}();qr.InvalidInputException=Wr,qr.InvalidElementException=Yr,qr.NoElementException=Jr,Object.defineProperty(hr,"__esModule",{value:!0});var Zr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Kr=on(gr),tn=on(wr),en=qr;function on(t){return t&&t.__esModule?t:{default:t}}function rn(t){if("string"==typeof t)return function(t){var e=document.querySelectorAll(t);if(0===e.length)return;for(var i=[],o=0;o<e.length;o++)i.push(rn(e[o]));return i}(t);if(Array.isArray(t)){for(var e=[],i=0;i<t.length;i++)e.push(rn(t[i]));return e}if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLImageElement)return function(t){var e=document.createElement("canvas");return{element:e,options:(0,Kr.default)(t),renderer:tn.default.CanvasRenderer,afterRender:function(){t.setAttribute("src",e.toDataURL())}}}(t);if(t&&t.nodeName&&"svg"===t.nodeName.toLowerCase()||"undefined"!=typeof SVGElement&&t instanceof SVGElement)return{element:t,options:(0,Kr.default)(t),renderer:tn.default.SVGRenderer};if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement)return{element:t,options:(0,Kr.default)(t),renderer:tn.default.CanvasRenderer};if(t&&t.getContext)return{element:t,renderer:tn.default.CanvasRenderer};if(t&&"object"===(void 0===t?"undefined":Zr(t))&&!t.nodeName)return{element:t,renderer:tn.default.ObjectRenderer};throw new en.InvalidElementException}hr.default=rn;var nn={};Object.defineProperty(nn,"__esModule",{value:!0});var an=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}();var sn=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.api=e}return an(t,[{key:"handleCatch",value:function(t){if("InvalidInputException"!==t.name)throw t;if(this.api._options.valid===this.api._defaults.valid)throw t.message;this.api._options.valid(!1),this.api.render=function(){}}},{key:"wrapBarcodeCall",value:function(t){try{var e=t.apply(void 0,arguments);return this.api._options.valid(!0),e}catch(t){return this.handleCatch(t),this.api}}}]),t}();nn.default=sn;var cn=bn($t),ln=bn(lr),dn=bn(pr),pn=bn(ur),un=bn(hr),hn=bn(fr),gn=bn(nn),fn=qr,mn=bn(mr);function bn(t){return t&&t.__esModule?t:{default:t}}var vn=function(){},yn=function(t,e,i){var o=new vn;if(void 0===t)throw Error("No element to render on was provided.");return o._renderProperties=(0,un.default)(t),o._encodings=[],o._options=mn.default,o._errorHandler=new gn.default(o),void 0!==e&&((i=i||{}).format||(i.format=$n()),o.options(i)[i.format](e,i).render()),o};for(var xn in yn.getModule=function(t){return cn.default[t]},cn.default)cn.default.hasOwnProperty(xn)&&wn(cn.default,xn);function wn(t,e){vn.prototype[e]=vn.prototype[e.toUpperCase()]=vn.prototype[e.toLowerCase()]=function(i,o){var r=this;return r._errorHandler.wrapBarcodeCall(function(){o.text=void 0===o.text?void 0:""+o.text;var n=(0,ln.default)(r._options,o);n=(0,hn.default)(n);var a=t[e],s=_n(i,a,n);return r._encodings.push(s),r})}}function _n(t,e,i){var o=new e(t=""+t,i);if(!o.valid())throw new fn.InvalidInputException(o.constructor.name,t);var r=o.encode();r=(0,dn.default)(r);for(var n=0;n<r.length;n++)r[n].options=(0,ln.default)(i,r[n].options);return r}function $n(){return cn.default.CODE128?"CODE128":Object.keys(cn.default)[0]}function kn(t,e,i){e=(0,dn.default)(e);for(var o=0;o<e.length;o++)e[o].options=(0,ln.default)(i,e[o].options),(0,pn.default)(e[o].options);(0,pn.default)(i),new(0,t.renderer)(t.element,e,i).render(),t.afterRender&&t.afterRender()}vn.prototype.options=function(t){return this._options=(0,ln.default)(this._options,t),this},vn.prototype.blank=function(t){var e=new Array(t+1).join("0");return this._encodings.push({data:e}),this},vn.prototype.init=function(){var t;if(this._renderProperties)for(var e in Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]),this._renderProperties){t=this._renderProperties[e];var i=(0,ln.default)(this._options,t.options);"auto"==i.format&&(i.format=$n()),this._errorHandler.wrapBarcodeCall(function(){var e=_n(i.value,cn.default[i.format.toUpperCase()],i);kn(t,e,i)})}},vn.prototype.render=function(){if(!this._renderProperties)throw new fn.NoElementException;if(Array.isArray(this._renderProperties))for(var t=0;t<this._renderProperties.length;t++)kn(this._renderProperties[t],this._encodings,this._options);else kn(this._renderProperties,this._encodings,this._options);return this},vn.prototype._defaults=mn.default,"undefined"!=typeof window&&(window.JsBarcode=yn),"undefined"!=typeof jQuery&&(jQuery.fn.JsBarcode=function(t,e){var i=[];return jQuery(this).each(function(){i.push(this)}),yn(i,t,e)});var En=_t(yn);class Cn extends at{static properties={api:{type:Object},cards:{type:Array},showAddDialog:{type:Boolean},showEditDialog:{type:Boolean},showFullscreenCard:{type:Boolean},editingCard:{type:Object},fullscreenCard:{type:Object},newCard:{type:Object}};constructor(){super(),this.cards=[],this.showAddDialog=!1,this.showEditDialog=!1,this.showFullscreenCard=!1,this.editingCard=null,this.fullscreenCard=null,this.newCard={name:"",number:"",barcode:"",logo:"",notes:"",color:"#9fa8da"},this.loadCards()}loadCards(){const t=localStorage.getItem("slm_loyalty_cards");this.cards=t?JSON.parse(t):[]}saveCards(){localStorage.setItem("slm_loyalty_cards",JSON.stringify(this.cards))}handleAddCard(){this.newCard={name:"",number:"",barcode:"",logo:"",notes:"",color:"#9fa8da"},this.showAddDialog=!0}handleSaveNewCard(t){t.preventDefault();const e=new FormData(t.target),i={id:Date.now().toString(),name:e.get("name"),number:e.get("number"),barcode:e.get("barcode")||this.generateBarcode(e.get("number")),logo:e.get("logo")||"",notes:e.get("notes")||"",color:e.get("color")||"#9fa8da"};this.cards=[...this.cards,i],this.saveCards(),this.showAddDialog=!1}handleEditCard(t){this.editingCard={...t},this.showEditDialog=!0}handleSaveEditCard(t){t.preventDefault();const e=new FormData(t.target),i={...this.editingCard,name:e.get("name"),number:e.get("number"),barcode:e.get("barcode")||this.generateBarcode(e.get("number")),logo:e.get("logo")||"",notes:e.get("notes")||"",color:e.get("color")};this.cards=this.cards.map(t=>t.id===i.id?i:t),this.saveCards(),this.showEditDialog=!1,this.editingCard=null}handleDeleteCard(t){confirm("Delete this loyalty card?")&&(this.cards=this.cards.filter(e=>e.id!==t),this.saveCards(),this.showEditDialog=!1,this.editingCard=null)}handleDuplicateCard(t){const e={...t,id:Date.now().toString(),name:`${t.name} (Copy)`};this.cards=[...this.cards,e],this.saveCards()}handleCardClick(t){this.fullscreenCard=t,this.showFullscreenCard=!0}updated(t){if(super.updated(t),this.showFullscreenCard&&this.fullscreenCard?.barcode){const t=this.shadowRoot.getElementById("barcode-svg");if(t)try{En(t,this.fullscreenCard.barcode,{format:"CODE128",width:2,height:80,displayValue:!0,fontSize:20,background:"#ffffff",lineColor:"#000000"})}catch(t){console.warn("Barcode generation failed:",t)}}}generateBarcode(t){return t.replace(/\D/g,"")}render(){return F`
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
              <div class="loyalty-card" style="background: ${t.color}" @click=${()=>this.handleCardClick(t)}>
                <button class="menu-btn" @click=${e=>{e.stopPropagation(),this.handleEditCard(t)}}>
                  <ha-icon icon="mdi:dots-vertical"></ha-icon>
                </button>
                
                <div class="card-body">
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
                <svg id="barcode-svg"></svg>
              </div>
            </div>
          `:""}
          <p class="tap-hint">Tap anywhere to close</p>
        </div>
      </div>
    `}static styles=n`
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
  `}customElements.define("slm-loyalty-cards-view",Cn);class On extends at{static properties={hass:{type:Object}};render(){return F`
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
    `}static styles=n`
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
  `}customElements.define("slm-profile-settings",On);class Sn extends at{static properties={currentMode:{type:String}};handleSelect(t){this.dispatchEvent(new CustomEvent("mode-selected",{detail:{mode:t},bubbles:!0,composed:!0}))}render(){return F`
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
    `}static styles=n`
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
  `}customElements.define("slm-dark-mode-popup",Sn);class Pn extends at{static properties={currentFont:{type:String}};fonts=[{name:"System Default",value:"system"},{name:"Roboto",value:"Roboto, sans-serif"},{name:"Open Sans",value:'"Open Sans", sans-serif'},{name:"Lato",value:"Lato, sans-serif"},{name:"Montserrat",value:"Montserrat, sans-serif"},{name:"Inter",value:"Inter, sans-serif"}];handleSelect(t){this.dispatchEvent(new CustomEvent("font-selected",{detail:{font:t},bubbles:!0,composed:!0}))}render(){return F`
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
    `}static styles=n`
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
  `}customElements.define("font-settings",Pn);class An extends at{static properties={settings:{type:Object},showDarkModePopup:{type:Boolean},showFontSettings:{type:Boolean}};constructor(){super(),this.showDarkModePopup=!1,this.showFontSettings=!1}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}render(){return F`
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

          <div class="section-header">Product Images</div>

          <div class="settings-item">
            <div class="item-content full-width">
              <div class="item-title">Local HA Image Path</div>
              <div class="item-subtitle">Auto-match images by product name slug</div>
              <input
                class="text-input"
                type="text"
                placeholder="/local/images/groceries"
                .value=${this.settings.localImagePath||""}
                @change=${t=>this.handleSettingChange("localImagePath",t.target.value.trim())}
              />
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
    `}getDarkModeLabel(){switch(this.settings.darkMode){case"on":return"On";case"off":return"Off";default:return"As on Device"}}static styles=n`
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
    .text-input {
      box-sizing: border-box;
      width: 100%;
      margin-top: 10px;
      padding: 9px 12px;
      border: 1px solid var(--slm-border-subtle);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      color: var(--slm-text-primary);
      background: var(--slm-bg-elevated);
    }
    .text-input:focus {
      outline: none;
      border-color: var(--slm-accent-primary);
    }
  `}customElements.define("slm-appearance-settings",An);class jn extends at{static properties={settings:{type:Object}};handleSettingChange(t,e){const i={...this.settings.notifications,[t]:e};this.dispatchEvent(new CustomEvent("settings-changed",{detail:{notifications:i},bubbles:!0,composed:!0}))}render(){return F`
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
    `}static styles=n`
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
  `}customElements.define("slm-notification-settings",jn);class In extends at{static properties={api:{type:Object},categories:{type:Array},showAddDialog:{type:Boolean},newCategory:{type:Object}};constructor(){super(),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"}}handleAddCategory(){this.showAddDialog=!0}async handleSaveCategory(){this.newCategory.name.trim()&&(alert("Category management coming soon!"),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"})}render(){return F`
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
    `}static styles=n`
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
  `}customElements.define("slm-category-settings",In);class Tn extends at{render(){return F`
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
    `}static styles=n`
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
  `}customElements.define("slm-support-settings",Tn);class Ln extends at{static properties={hass:{type:Object},api:{type:Object},settings:{type:Object},categories:{type:Array},currentSection:{type:String}};constructor(){super(),this.currentSection="main"}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}handleNavigation(t){this.currentSection=t}renderMainSettings(){return F`
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
        `;default:return this.renderMainSettings()}}static styles=n`
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
  `}customElements.define("slm-settings-view",Ln);class Mn extends at{static properties={hass:{type:Object},config:{type:Object},currentView:{type:String},lists:{type:Array},activeList:{type:Object},items:{type:Array},categories:{type:Array},total:{type:Object},loading:{type:Boolean},showAddDialog:{type:Boolean},showEditDialog:{type:Boolean},editingItem:{type:Object},settings:{type:Object},cardId:{type:String}};set hass(t){this._hass=t,this.api&&(this.api.hass=t),!this._subscribed&&t?.connection&&(this._subscribed=!0,this.subscribeToUpdates())}get hass(){return this._hass}constructor(){super(),this.currentView="shopping",this.lists=[],this.activeList=null,this.recentItems=[],this.items=[],this.categories=[],this.total={total:0,currency:"NZD",item_count:0},this.loading=!0,this.showAddDialog=!1,this.showEditDialog=!1,this.editingItem=null,this.cardId=this.generateCardId(),this.settings=this.loadSettings(),this._subscribed=!1}generateCardId(){return`card_${Date.now()}_${Math.random().toString(36).substring(2,9)}`}loadSettings(){const t={theme:"auto",darkMode:"system",fontSize:16,fontFamily:"system",useSystemTextSize:!0,openLastUsedList:!0,keepScreenOn:!1,notifications:{listSharing:!0,emails:!0},recentProductsCount:8,tilesPerRow:3,useEmojis:!0,colorScheme:"pastel",viewMode:"tile",sortMode:"category",showRecentlyUsed:!0,showPriceOnTile:!0,localImagePath:""},e=`slm_settings_${this.cardId}`,i=localStorage.getItem(e);return i?{...t,...JSON.parse(i)}:t}saveSettings(){const t=`slm_settings_${this.cardId}`;localStorage.setItem(t,JSON.stringify(this.settings))}async firstUpdated(){this.api=new ct(this.hass),await this.loadData(),this.applyColorScheme()}applyColorScheme(){const t=this.settings.darkMode;"on"===t?this.setAttribute("data-theme","dark"):"off"===t?this.setAttribute("data-theme","light"):this.removeAttribute("data-theme")}async loadData(){try{this.loading=!0;const t=await this.api.getLists();this.lists=t.lists||[];const e=`slm_last_list_${this.cardId}`;if(this.settings.openLastUsedList){const t=localStorage.getItem(e);this.activeList=this.lists.find(e=>e.id===t)||this.lists.find(t=>t.active)||this.lists[0]}else this.activeList=this.lists.find(t=>t.active)||this.lists[0];const i=await this.api.getCategories();this.categories=i.categories,this.activeList&&await this.loadActiveListData()}catch(t){console.error("Failed to load data:",t)}finally{this.loading=!1}}async loadActiveListData(){if(!this.activeList)return;const t=await this.api.getItems(this.activeList.id);this.items=t.items;const e=await this.api.getListTotal(this.activeList.id);this.total=e;const i=`slm_last_list_${this.cardId}`;localStorage.setItem(i,this.activeList.id)}async handleListChange(t){const e=t.detail.listId;await this.api.setActiveList(e),this.activeList=this.lists.find(t=>t.id===e),await this.loadActiveListData(),this.currentView="shopping"}async handleItemClick(t){console.log("HANDLE ITEM CLICK",t.detail);const{itemId:e}=t.detail,i=this.items.find(t=>t.id===e);i&&!i.checked&&(await this.api.incrementItem(e,1),this.loadActiveListData())}async handleItemDecrease(t){const{itemId:e}=t.detail,i=this.items.find(t=>t.id===e);i&&(i.quantity>1?await this.api.incrementItem(e,-1):await this.api.deleteItem(e),this.loadActiveListData())}async handleItemCheck(t){const{itemId:e,checked:i}=t.detail;await this.api.checkItem(e,i),await this.loadActiveListData()}async handleItemLongPress(t){this.editingItem=t.detail.item,this.showEditDialog=!0}async handleItemSwipeDelete(t){const{itemId:e}=t.detail;await this.api.deleteItem(e),await this.loadActiveListData()}async handleAddItem(t){const e=t.detail,i=this.items.find(t=>t.product_id&&t.product_id===e.product_id&&!t.checked);if(e.fromRecentlyUsed)if(i)await this.api.updateItem(i.id,{quantity:1});else{const{fromRecentlyUsed:t,...i}=e,o={quantity:1};for(const[t,e]of Object.entries(i))null!=e&&(o[t]=e);await this.api.addItem(this.activeList.id,o)}else i?await this.api.updateItem(i.id,{quantity:i.quantity+1}):await this.api.addItem(this.activeList.id,e);this.trackRecentlyUsed(e.product_id),await this.loadActiveListData(),this.showAddDialog=!1}trackRecentlyUsed(t){if(!t)return;const e="slm_recent_products",i=localStorage.getItem(e),o=(i?JSON.parse(i):[]).filter(e=>e!==t);o.unshift(t);const r=o.slice(0,50);localStorage.setItem(e,JSON.stringify(r))}async handleEditItem(t){const{itemId:e,data:i}=t.detail;await this.api.updateItem(e,i),await this.loadActiveListData(),this.showEditDialog=!1,this.editingItem=null}handleNavChange(t){this.currentView=t.detail.view}handleSettingsChange(t){this.settings={...this.settings,...t.detail},this.saveSettings(),this.applyColorScheme(),this.requestUpdate()}handleMenuSettingChange(t){const{key:e,value:i}=t.detail;this.settings={...this.settings,[e]:i},this.saveSettings(),this.requestUpdate()}async handleCreateAndAddProduct(t){const{name:e,category_id:i,price:o}=t.detail;try{const t={name:e,category_id:i,custom:!0};o&&(t.price=parseFloat(o));const r=await this.api.addProduct(t),n=r.product||r,a={name:e,category_id:i,product_id:n.id,quantity:1,unit:"units"};o&&(a.price=parseFloat(o)),await this.api.addItem(this.activeList.id,a),n.id&&this.trackRecentlyUsed(n.id),await this.loadActiveListData()}catch(t){console.error("Failed to create product:",t)}}handleBackToLists(){this.currentView="lists"}async handleShareList(){const t=this.activeList?.name||"Shopping List",e=this.items.filter(t=>!t.checked).map(t=>`${t.quantity} ${t.unit} ${t.name}`).join("\n"),i=`${t}\n\n${e}`;if(navigator.share)try{await navigator.share({title:t,text:i})}catch(t){"AbortError"!==t.name&&console.error("Share failed:",t)}else navigator.clipboard.writeText(i),alert("List copied to clipboard!")}async subscribeToUpdates(){if(this.hass?.connection)try{const t=await this.hass.connection.subscribeMessage(t=>{console.log("[SLM] ✅ Received update:",t.event_type),this.loadActiveListData()},{type:"shopping_list_manager/subscribe"});this._unsubscribers=[t],console.log("[SLM] ✅ Subscribed to shopping list updates")}catch(t){console.error("[SLM] ❌ Failed to subscribe:",t)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribers&&(console.log("[SLM] Cleaning up event subscriptions"),this._unsubscribers.forEach(t=>{try{t()}catch(t){console.error("[SLM] Error unsubscribing:",t)}}),this._unsubscribers=[])}renderCurrentView(){switch(this.currentView){case"shopping":return F`
          <slm-list-header
            .activeList=${this.activeList}
            .itemCount=${this.items.filter(t=>!t.checked).length}
            .settings=${this.settings}
            @back=${this.handleBackToLists}
            @share=${this.handleShareList}
            @menu-setting-change=${this.handleMenuSettingChange}
          ></slm-list-header>

          <div class="content-area">
            <slm-search-bar
              .api=${this.api}
              .settings=${this.settings}
              .categories=${this.categories}
              .activeListId=${this.activeList?.id}
              @add-item=${this.handleAddItem}
              @create-and-add-product=${this.handleCreateAndAddProduct}
            ></slm-search-bar>

            ${"list"===this.settings.viewMode?F`
              <slm-item-list
                .items=${this.items}
                .categories=${this.categories}
                .settings=${this.settings}
                .api=${this.api}
                @add-item=${this.handleAddItem}
                @item-click=${this.handleItemClick}
                @item-decrease=${this.handleItemDecrease}
                @item-check=${this.handleItemCheck}
                @item-long-press=${this.handleItemLongPress}
                @item-swipe-delete=${this.handleItemSwipeDelete}
              ></slm-item-list>
            `:F`
              <slm-item-grid
                .items=${this.items}
                .categories=${this.categories}
                .settings=${this.settings}
                .api=${this.api}
                @add-item=${this.handleAddItem}
                @item-click=${this.handleItemClick}
                @item-decrease=${this.handleItemDecrease}
                @item-check=${this.handleItemCheck}
                @item-long-press=${this.handleItemLongPress}
                @item-swipe-delete=${this.handleItemSwipeDelete}
              ></slm-item-grid>
            `}
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
    `}static styles=n`
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

  `;setConfig(t){this.config=t}getCardSize(){return 12}}customElements.define("shopping-list-manager-card",Mn);
