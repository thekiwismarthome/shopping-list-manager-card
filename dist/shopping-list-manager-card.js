/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),i=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const r=this.t;if(e&&void 0===t){const e=void 0!==r&&1===r.length;e&&(t=i.get(r)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(r,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new n(i,t,r)},s=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,g=f?f.emptyScript:"",m=p.reactiveElementPolyfillSupport,w=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},y=(t,e)=>!a(t,e),_={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);n?.call(this,e),this.requestUpdate(t,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((r,i)=>{if(e)r.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,r.appendChild(i)}})(r,this.constructor.elementStyles),r}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(void 0!==i&&!0===r.reflect){const n=(void 0!==r.converter?.toAttribute?r.converter:b).toAttribute(e,r.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=r.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const o=n.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,r,i=!1,n){if(void 0!==t){const o=this.constructor;if(!1===i&&(n=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??y)(n,e)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:n},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,r,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[w("elementProperties")]=new Map,E[w("finalized")]=new Map,m?.({ReactiveElement:E}),(p.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C=globalThis,v=t=>t,A=C.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,I="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+T,R=`<${x}>`,O=document,N=()=>O.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,M="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,L=/>/g,F=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),$=/'/g,U=/"/g,H=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),z=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),G=new WeakMap,X=O.createTreeWalker(O,129);function W(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const r=t.length-1,i=[];let n,o=2===e?"<svg>":3===e?"<math>":"",s=k;for(let e=0;e<r;e++){const r=t[e];let a,l,c=-1,d=0;for(;d<r.length&&(s.lastIndex=d,l=s.exec(r),null!==l);)d=s.lastIndex,s===k?"!--"===l[1]?s=B:void 0!==l[1]?s=L:void 0!==l[2]?(H.test(l[2])&&(n=RegExp("</"+l[2],"g")),s=F):void 0!==l[3]&&(s=F):s===F?">"===l[0]?(s=n??k,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?F:'"'===l[3]?U:$):s===U||s===$?s=F:s===B||s===L?s=k:(s=F,n=void 0);const h=s===F&&t[e+1].startsWith("/>")?" ":"";o+=s===k?r+R:c>=0?(i.push(a),r.slice(0,c)+I+r.slice(c)+T+h):r+T+(-2===c?e:h)}return[W(t,o+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let n=0,o=0;const s=t.length-1,a=this.parts,[l,c]=Y(t,e);if(this.el=Z.createElement(l,r),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=X.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(I)){const e=c[o++],r=i.getAttribute(t).split(T),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:s[2],strings:r,ctor:"."===s[1]?tt:"?"===s[1]?et:"@"===s[1]?rt:J}),i.removeAttribute(t)}else t.startsWith(T)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(H.test(i.tagName)){const t=i.textContent.split(T),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],N()),X.nextNode(),a.push({type:2,index:++n});i.append(t[e],N())}}}else if(8===i.nodeType)if(i.data===x)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(T,t+1));)a.push({type:7,index:n}),t+=T.length-1}n++}}static createElement(t,e){const r=O.createElement("template");return r.innerHTML=t,r}}function q(t,e,r=t,i){if(e===z)return e;let n=void 0!==i?r._$Co?.[i]:r._$Cl;const o=D(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,r,i)),void 0!==i?(r._$Co??=[])[i]=n:r._$Cl=n),void 0!==n&&(e=q(t,n._$AS(t,e.values),n,i)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);X.currentNode=i;let n=X.nextNode(),o=0,s=0,a=r[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=r[++s]}o!==a?.index&&(n=X.nextNode(),o++)}return X.currentNode=O,i}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),D(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==j&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=Z.createElement(W(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new K(i,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new Z(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const n of t)i===e.length?e.push(r=new Q(this.O(N()),this.O(N()),this,this.options)):r=e[i],r._$AI(n),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=v(t).nextSibling;v(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,n){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=j}_$AI(t,e=this,r,i){const n=this.strings;let o=!1;if(void 0===n)t=q(this,t,e,0),o=!D(t)||t!==this._$AH&&t!==z,o&&(this._$AH=t);else{const i=t;let s,a;for(t=n[0],s=0;s<n.length-1;s++)a=q(this,i[r+s],e,s),a===z&&(a=this._$AH[s]),o||=!D(a)||a!==this._$AH[s],a===j?t=j:t!==j&&(t+=(a??"")+n[s+1]),this._$AH[s]=a}o&&!i&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}class et extends J{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==j)}}class rt extends J{constructor(t,e,r,i,n){super(t,e,r,i,n),this.type=5}_$AI(t,e=this){if((t=q(this,t,e,0)??j)===z)return;const r=this._$AH,i=t===j&&r!==j||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==j&&(r===j||i);i&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const nt=C.litHtmlPolyfillSupport;nt?.(Z,Q),(C.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class st extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const i=r?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=r?.renderBefore??null;i._$litPart$=n=new Q(e.insertBefore(N(),t),t,void 0,r??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}}st._$litElement$=!0,st.finalized=!0,ot.litElementHydrateSupport?.({LitElement:st});const at=ot.litElementPolyfillSupport;at?.({LitElement:st}),(ot.litElementVersions??=[]).push("4.2.2");class lt{constructor(t){this.hass=t}subscribeToUpdates(t){const e=["shopping_list_manager_item_added","shopping_list_manager_item_updated","shopping_list_manager_item_checked","shopping_list_manager_item_deleted","shopping_list_manager_list_updated"].map(e=>this.hass.connection.subscribeEvents(t,e));return()=>{e.forEach(t=>t())}}async getLists(){return await this.hass.callWS({type:"shopping_list_manager/lists/get_all"})}async createList(t,e="mdi:cart"){return await this.hass.callWS({type:"shopping_list_manager/lists/create",name:t,icon:e})}async updateList(t,e){return await this.hass.callWS({type:"shopping_list_manager/lists/update",list_id:t,...e})}async deleteList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/delete",list_id:t})}async setActiveList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/set_active",list_id:t})}async incrementItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/increment",item_id:t,amount:e})}async getItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/get",list_id:t})}async addItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/add",list_id:t,...e})}async updateItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/update",item_id:t,...e})}async checkItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/check",item_id:t,checked:e})}async deleteItem(t){return await this.hass.callWS({type:"shopping_list_manager/items/delete",item_id:t})}async bulkCheckItems(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/bulk_check",item_ids:t,checked:e})}async clearCheckedItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/clear_checked",list_id:t})}async getListTotal(t){return await this.hass.callWS({type:"shopping_list_manager/items/get_total",list_id:t})}async searchProducts(t,e={}){return await this.hass.callWS({type:"shopping_list_manager/products/search",query:t,limit:e.limit||20,exclude_allergens:e.excludeAllergens,include_tags:e.includeTags,substitution_group:e.substitutionGroup})}async getProductSuggestions(t=20){return await this.hass.callWS({type:"shopping_list_manager/products/suggestions",limit:t})}async getProductSubstitutes(t,e=5){return await this.hass.callWS({type:"shopping_list_manager/products/substitutes",product_id:t,limit:e})}async addProduct(t){return await this.hass.callWS({type:"shopping_list_manager/products/add",...t})}async updateProduct(t,e){return await this.hass.callWS({type:"shopping_list_manager/products/update",product_id:t,...e})}async getProductsByIds(t){return await this.hass.callWS({type:"shopping_list_manager/products/get_by_ids",product_ids:t})}async getCategories(){return await this.hass.callWS({type:"shopping_list_manager/categories/get_all"})}}class ct extends st{static properties={currentView:{type:String}};handleNavClick(t){this.dispatchEvent(new CustomEvent("nav-changed",{detail:{view:t},bubbles:!0,composed:!0}))}render(){return V`
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
  `}customElements.define("slm-bottom-nav",ct);class dt extends st{static properties={activeList:{type:Object},itemCount:{type:Number},settings:{type:Object},_menuOpen:{type:Boolean,state:!0}};constructor(){super(),this._menuOpen=!1,this._boundCloseMenu=this._closeMenu.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._boundCloseMenu)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._boundCloseMenu)}_closeMenu(t){this._menuOpen&&!this.shadowRoot.contains(t.target)&&(this._menuOpen=!1)}handleBack(){this.dispatchEvent(new CustomEvent("back",{bubbles:!0,composed:!0}))}handleShare(){this.dispatchEvent(new CustomEvent("share",{bubbles:!0,composed:!0}))}handleMenuToggle(t){t.stopPropagation(),this._menuOpen=!this._menuOpen}_dispatchSetting(t,e){this.dispatchEvent(new CustomEvent("menu-setting-change",{detail:{key:t,value:e},bubbles:!0,composed:!0}))}render(){const t=this.settings||{},e=t.viewMode||"tile",r=t.sortMode||"category",i=!1!==t.showRecentlyUsed,n=!1!==t.showPriceOnTile;return V`
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
            ${this._menuOpen?V`
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
                    class="toggle-btn ${"category"===r?"active":""}"
                    @click=${()=>{this._dispatchSetting("sortMode","category"),this._menuOpen=!1}}
                  >By Category</button>
                  <button
                    class="toggle-btn ${"alphabetical"===r?"active":""}"
                    @click=${()=>{this._dispatchSetting("sortMode","alphabetical"),this._menuOpen=!1}}
                  >A–Z</button>
                </div>

                <div class="menu-divider"></div>

                <button class="menu-switch-row" @click=${()=>this._dispatchSetting("showRecentlyUsed",!i)}>
                  <span class="menu-switch-label">Recently Used</span>
                  <span class="switch ${i?"on":"off"}">${i?"✓":"✕"}</span>
                </button>

                <button class="menu-switch-row" @click=${()=>this._dispatchSetting("showPriceOnTile",!n)}>
                  <span class="menu-switch-label">Show Price</span>
                  <span class="switch ${n?"on":"off"}">${n?"✓":"✕"}</span>
                </button>

              </div>
            `:""}
          </div>
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
  `}customElements.define("slm-list-header",dt);class ht extends st{static properties={api:{type:Object},settings:{type:Object},categories:{type:Array},activeListId:{type:String},searchQuery:{type:String},searchResults:{type:Array},recentProducts:{type:Array},showResults:{type:Boolean},_showCreateForm:{type:Boolean,state:!0},_createName:{type:String,state:!0},_createCategory:{type:String,state:!0},_createPrice:{type:String,state:!0}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.recentProducts=[],this.showResults=!1,this._showCreateForm=!1,this._createName="",this._createCategory="other",this._createPrice=""}async firstUpdated(){await this.loadRecentProducts()}async loadRecentProducts(){const t=localStorage.getItem("slm_recent_products"),e=t?JSON.parse(t):[],r=this.settings?.recentProductsCount||8;this.recentProducts=e.slice(0,r)}async handleSearch(t){if(this.searchQuery=t.target.value,this._showCreateForm=!1,this.searchQuery.length<1)this.showResults=!1;else{if(this.searchQuery.length>=2){const t=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=t.products||[]}else this.searchResults=[];this.showResults=!0}}handleProductSelect(t){this.dispatchEvent(new CustomEvent("add-item",{detail:{name:t.name,category_id:t.category_id,product_id:t.id,quantity:1,unit:t.default_unit,price:t.price,image_url:t.image_url},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1,this._showCreateForm=!1,this.shadowRoot.querySelector("input").blur()}handleAddCustom(){this.searchQuery.trim()&&(this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.searchQuery.trim(),category_id:"other",quantity:1,unit:"units"},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1,this._showCreateForm=!1)}handleShowCreateForm(){this._createName=this.searchQuery.trim(),this._createCategory="other",this._createPrice="",this._showCreateForm=!0}handleCancelCreate(){this._showCreateForm=!1}handleCreateAndAdd(){this._createName.trim()&&(this.dispatchEvent(new CustomEvent("create-and-add-product",{detail:{name:this._createName.trim(),category_id:this._createCategory,price:this._createPrice?parseFloat(this._createPrice):null},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1,this._showCreateForm=!1,this.shadowRoot.querySelector("input").blur())}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}render(){const t=this.categories||[];return V`
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
          ${this.searchQuery?V`
            <button class="clear-btn" @click=${()=>{this.searchQuery="",this.showResults=!1,this._showCreateForm=!1}}>✖</button>
          `:""}
        </div>

        ${this.showResults?V`
          <div class="results-dropdown">

            <!-- Always-visible add row pinned to the top -->
            ${this._showCreateForm?"":V`
              <button class="result-item add-quick" @click=${this.handleAddCustom}>
                <div class="no-image add-plus">➕</div>
                <div class="result-info">
                  <div class="result-name">Add "${this.searchQuery}"</div>
                  <div class="result-subtitle">quick add to list</div>
                </div>
              </button>
            `}

            ${this._showCreateForm?V`
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
                  ${t.map(t=>V`
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
            `:this.searchResults.length>0?V`
              <!-- Search results below the add row -->
              <div class="results-divider">Matching products</div>
              ${this.searchResults.map(t=>V`
                <button class="result-item" @click=${()=>this.handleProductSelect(t)}>
                  ${t.image_url?V`
                    <img src="${t.image_url}" alt="${t.name}">
                  `:V`
                    <div class="no-image">${this.getCategoryEmoji(t.category_id)}</div>
                  `}
                  <div class="result-info">
                    <div class="result-name">${t.name}</div>
                    ${t.price?V`
                      <div class="result-price">$${t.price.toFixed(2)}</div>
                    `:""}
                  </div>
                  <span class="add-icon">➕</span>
                </button>
              `)}
            `:V`
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
  `}customElements.define("slm-search-bar",ht);const ut={chicken:"chicken",turkey:"turkey",beef:"beef",steak:"steak",mince:"minced-meat",bacon:"bacon",ham:"ham",sausage:"sausage",pork:"pork",lamb:"lamb-chops",salami:"salami",fish:"fish",salmon:"salmon-fillet",tuna:"tuna",prawn:"shrimp",shrimp:"shrimp",lobster:"lobster",milk:"milk-bottle",cheese:"cheese",butter:"butter",egg:"egg",yogurt:"yogurt",yoghurt:"yogurt",cream:"whipped-cream","ice cream":"ice-cream-cone",bread:"bread",sourdough:"bread",loaf:"bread",bun:"burger-bun",bagel:"bagel",croissant:"croissant",muffin:"muffin",cake:"cake",cookie:"cookie",biscuit:"cookie",apple:"apple",banana:"banana",orange:"orange",grape:"grapes",strawberry:"strawberry",blueberry:"blueberries",lemon:"lemon",avocado:"avocado",pineapple:"pineapple",watermelon:"watermelon",mango:"mango",kiwi:"kiwi",peach:"peach",pear:"pear",cherry:"cherry",tomato:"tomato",potato:"potato",carrot:"carrot",broccoli:"broccoli",lettuce:"lettuce",spinach:"spinach",onion:"onion",garlic:"garlic",corn:"corn",pepper:"bell-pepper",cucumber:"cucumber",mushroom:"mushroom",peas:"peas",coffee:"coffee",tea:"tea",juice:"juice",wine:"wine-bottle",beer:"beer",water:"water-bottle",soda:"soda-can",cola:"soda-can",pasta:"pasta",rice:"rice-bowl",flour:"flour",sugar:"sugar",salt:"salt",oil:"olive-oil",honey:"honey",chocolate:"chocolate-bar",chips:"chips",popcorn:"popcorn",soap:"soap",shampoo:"shampoo",toothpaste:"toothpaste","toilet paper":"toilet-paper",sponge:"sponge"},pt={};class ft extends st{static properties={item:{type:Object},categoryColor:{type:String},isRecentlyUsed:{type:Boolean},settings:{type:Object},touchStartX:{type:Number},touchStartY:{type:Number},touchStartTime:{type:Number},longPressTimer:{type:Number},longPressTriggered:{type:Boolean},_localImgError:{type:Boolean,state:!0}};constructor(){super(),this.isRecentlyUsed=!1,this.touchStartX=0,this.touchStartY=0,this.touchStartTime=0,this.longPressTimer=null,this.longPressTriggered=!1,this._localImgError=!1}hexToRgb(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:159,g:168,b:218}}handleTileClick(t){this.longPressTriggered?this.longPressTriggered=!1:t.target.closest(".decrease-btn")||!this.isRecentlyUsed&&t.target.closest(".quantity-badge")||(this.isRecentlyUsed?this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.item.name,category_id:this.item.category_id,product_id:this.item.id,quantity:1,unit:this.item.default_unit||"units",price:this.item.price||null,image_url:this.item.image_url||null,fromRecentlyUsed:!0},bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("item-check",{detail:{itemId:this.item.id,checked:!this.item.checked},bubbles:!0,composed:!0})))}handleDecrease(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleQuantityClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleContextMenu(t){return t.preventDefault(),t.stopPropagation(),!1}handleTouchStart(t){this.touchStartX=t.touches[0].clientX,this.touchStartY=t.touches[0].clientY,this.touchStartTime=Date.now(),this.longPressTriggered=!1,this.longPressTimer=setTimeout(()=>{this.longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:this.item},bubbles:!0,composed:!0}))},500)}handleTouchMove(t){if(this.longPressTimer){const e=t.touches[0].clientX,r=t.touches[0].clientY,i=Math.abs(e-this.touchStartX),n=Math.abs(r-this.touchStartY);(i>10||n>10)&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}}handleTouchEnd(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}handleMouseDown(t){if(2===t.button)return t.preventDefault(),!1;this.longPressTriggered=!1,this.longPressTimer=setTimeout(()=>{this.longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:this.item},bubbles:!0,composed:!0}))},500)}handleMouseUp(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}handleMouseLeave(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null)}firstUpdated(){const t=this.shadowRoot.querySelector(".tile");t&&(t.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!0}),t.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!0}),t.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!0}),t.addEventListener("contextmenu",this.handleContextMenu.bind(this)))}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}getProductEmoji(t,e){if(!t)return this.getCategoryEmoji(e);const r=t.toLowerCase(),i={chicken:"🍗",turkey:"🦃",duck:"🦆",beef:"🥩",steak:"🥩",mince:"🥩",lamb:"🍖",pork:"🥓",bacon:"🥓",ham:"🍖",sausage:"🌭",salami:"🍖",fish:"🐟",salmon:"🐟",tuna:"🐟",prawn:"🦐",shrimp:"🦐",egg:"🥚",eggs:"🥚",milk:"🥛",cream:"🥛",yogurt:"🫙",yoghurt:"🫙",cheese:"🧀",cheddar:"🧀",feta:"🧀",mozzarella:"🧀",butter:"🧈",bread:"🍞",toast:"🍞",bun:"🥖",roll:"🥖",bagel:"🥯",loaf:"🍞",sourdough:"🍞",wrap:"🫓",croissant:"🥐",apple:"🍎",orange:"🍊",banana:"🍌",grape:"🍇",strawberry:"🍓",blueberry:"🫐",raspberry:"🍓",lemon:"🍋",lime:"🍋",pineapple:"🍍",mango:"🥭",watermelon:"🍉",melon:"🍈",peach:"🍑",pear:"🍐",cherry:"🍒",kiwi:"🥝",avocado:"🥑",tomato:"🍅",potato:"🥔",carrot:"🥕",broccoli:"🥦",lettuce:"🥬",spinach:"🥬",salad:"🥗",kale:"🥬",onion:"🧅",garlic:"🧄",corn:"🌽",pepper:"🫑",cucumber:"🥒",mushroom:"🍄",eggplant:"🍆",peas:"🫛",beans:"🫘",lentil:"🫘",coffee:"☕",espresso:"☕",latte:"☕",tea:"🍵",juice:"🧃",water:"💧",sparkling:"💧",beer:"🍺",wine:"🍷",cider:"🍺",spirits:"🥃",whisky:"🥃",soda:"🥤",cola:"🥤",pasta:"🍝",noodle:"🍜",rice:"🍚",oat:"🌾",cereal:"🥣",flour:"🌾",sugar:"🍬",salt:"🧂",oil:"🫙",vinegar:"🫙",sauce:"🫙",ketchup:"🫙",mustard:"🫙",mayonnaise:"🫙",honey:"🍯",jam:"🫙","peanut butter":"🥜",chocolate:"🍫",chips:"🥔",popcorn:"🍿",biscuit:"🍪",cookie:"🍪",cake:"🎂",muffin:"🧁",doughnut:"🍩","ice cream":"🍦",shampoo:"🧴",conditioner:"🧴",soap:"🧼",toothpaste:"🦷","toilet paper":"🧻",tissues:"🧻",nappy:"👶",diaper:"👶",formula:"👶","pet food":"🐾","dog food":"🐕","cat food":"🐈"};for(const[t,e]of Object.entries(i))if(r.includes(t))return e;return this.getCategoryEmoji(e)}getBundledIcon(t){if(!t)return null;const e=t.toLowerCase();for(const[t,r]of Object.entries(ut))if(e.includes(t)&&pt[r])return pt[r];return null}getLocalImageUrl(t){const e=this.settings?.localImagePath;if(!e||!t)return null;const r=t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/_+$/,"");return`${e.replace(/\/$/,"")}/${r}.jpg`}renderImage(){const t=this.item?.name,e=this.item?.category_id;if(this.item?.image_url)return V`<img src="${this.item.image_url}" alt="${t}">`;const r=this.getBundledIcon(t);if(r)return V`<div class="no-image"><img src="${r}" alt="${t}" class="product-icon"></div>`;const i=this.getLocalImageUrl(t);return i&&!this._localImgError?V`
        <div class="no-image">
          <img
            src="${i}"
            alt="${t}"
            class="product-icon"
            @error=${()=>{this._localImgError=!0}}
          >
        </div>
      `:V`
      <div class="no-image">
        <div class="emoji">${this.getProductEmoji(t,e)}</div>
      </div>
    `}render(){const{r:t,g:e,b:r}=this.hexToRgb(this.categoryColor),i=this.isRecentlyUsed?`rgba(${t},${e},${r},0.12)`:`rgba(${t},${e},${r},0.25)`,n=!1!==this.settings?.showPriceOnTile;return V`
      <div
        class="tile ${this.item.checked?"checked":""} ${this.isRecentlyUsed?"recently-used":""}"
        style="background: ${i}"
        @click=${this.handleTileClick}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseLeave}
      >
        ${this.isRecentlyUsed?V`
          <div class="quantity-badge" style="background: ${this.categoryColor}">+</div>
        `:V`
          ${this.item.checked?"":V`
            <button class="decrease-btn" style="background: rgba(${t},${e},${r},0.7)" @click=${this.handleDecrease}>
              <span>−</span>
            </button>
          `}
          ${this.item.checked?"":V`
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
          ${n&&this.item.price?V`
            <div class="price">$${(this.item.price*(this.item.quantity||1)).toFixed(2)}</div>
          `:""}
        </div>

        ${this.item.checked?V`
          <div class="checked-overlay">
            <span class="check-icon">✓</span>
          </div>
        `:""}
      </div>
    `}static styles=o`
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
  `}customElements.define("slm-item-tile",ft);class gt extends st{constructor(){super(),this._recentItems=[]}static properties={items:{type:Array},categories:{type:Array},settings:{type:Object},api:{type:Object},_recentItems:{type:Array,state:!0}};updated(t){(t.has("items")||t.has("settings")||t.has("api"))&&this._loadRecentItems()}async _loadRecentItems(){if(!this.api||!1===this.settings?.showRecentlyUsed)return void(this._recentItems=[]);const t=this.settings?.recentProductsCount||8,e=new Set((this.items||[]).filter(t=>!t.checked).map(t=>t.product_id).filter(Boolean));try{const r="slm_recent_products",i=localStorage.getItem(r),n=i?JSON.parse(i):[],o=[...new Set(n)].filter(t=>!e.has(t)).slice(0,t);if(o.length>0){const t=await this.api.getProductsByIds(o);return void(this._recentItems=t.products||[])}const s=await this.api.getProductSuggestions(t+e.size);this._recentItems=(s.products||[]).filter(t=>!e.has(t.id)).slice(0,t)}catch(t){console.error("Failed to load recent items:",t),this._recentItems=[]}}groupItemsByCategory(){if("alphabetical"===(this.settings?.sortMode||"category")){const t=(this.items||[]).filter(t=>!t.checked);return t.sort((t,e)=>t.name.localeCompare(e.name)),[{category:{id:"_alpha",name:null,color:"#9fa8da"},items:t}]}const t={};return(this.categories||[]).forEach(e=>{t[e.id]={category:e,items:(this.items||[]).filter(t=>t.category_id===e.id&&!t.checked)}}),Object.values(t).filter(t=>t.items.length>0)}hexToRgb(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:159,g:168,b:218}}getCategoryHeaderStyle(t){const{r:e,g:r,b:i}=this.hexToRgb(t);return`border-left: 4px solid ${t}; background: linear-gradient(to right, rgba(${e},${r},${i},0.22), rgba(${e},${r},${i},0.066)); border-radius: 0 8px 8px 0;`}render(){const t=this.groupItemsByCategory(),e=this.settings?.tilesPerRow||3;return V`
      <style>
        .items-grid {
          grid-template-columns: repeat(${e}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${0===t.length&&0===this._recentItems.length?V`
          <div class="empty">
            <div class="empty-emoji">🛒</div>
            <p>Your shopping list is empty</p>
            <p class="hint">Search for products to add items</p>
          </div>
        `:""}

        ${t.map(t=>{const e=t.category.color||"#9fa8da";return V`
            <div class="category-section">
              ${"_alpha"!==t.category.id?V`
                <div class="category-header" style="${this.getCategoryHeaderStyle(e)}">
                  <span class="emoji">${this.getCategoryEmoji(t.category.id)}</span>
                  <span class="category-name" style="color: ${e}">${t.category.name}</span>
                </div>
              `:""}
              <div class="items-grid">
                ${t.items.map(t=>V`
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

        ${!1!==this.settings?.showRecentlyUsed&&this._recentItems.length>0?V`
          <div class="category-section">
            <div class="category-header" style="${this.getCategoryHeaderStyle("#9e9e9e")}">
              <span class="emoji">⏱️</span>
              <span class="category-name" style="color: #9e9e9e">Recently Used</span>
            </div>
            <div class="items-grid">
              ${this._recentItems.map(t=>V`
                <slm-item-tile
                  .item=${t}
                  .categoryColor=${"#9e9e9e"}
                  .isRecentlyUsed=${!0}
                  .settings=${this.settings}
                  @add-item=${this.handleAddItem}
                ></slm-item-tile>
              `)}
            </div>
          </div>
        `:""}
      </div>
    `}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}handleAddItem(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("add-item",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-click",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemDecrease(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemCheck(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-check",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemLongPress(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-long-press",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemSwipeDelete(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-swipe-delete",{detail:t.detail,bubbles:!0,composed:!0}))}static styles=o`
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
  `}customElements.define("slm-item-grid",gt);class mt extends st{static properties={items:{type:Array},categories:{type:Array},settings:{type:Object},api:{type:Object},_recentItems:{type:Array,state:!0},_longPressTimer:{state:!0},_longPressTriggered:{state:!0}};constructor(){super(),this._recentItems=[],this._longPressTimer=null,this._longPressTriggered=!1}updated(t){(t.has("items")||t.has("settings")||t.has("api"))&&this._loadRecentItems()}async _loadRecentItems(){if(!this.api||!1===this.settings?.showRecentlyUsed)return void(this._recentItems=[]);const t=this.settings?.recentProductsCount||8,e=new Set((this.items||[]).filter(t=>!t.checked).map(t=>t.product_id).filter(Boolean));try{const r="slm_recent_products",i=localStorage.getItem(r),n=i?JSON.parse(i):[],o=[...new Set(n)].filter(t=>!e.has(t)).slice(0,t);if(o.length>0){const t=await this.api.getProductsByIds(o);return void(this._recentItems=t.products||[])}const s=await this.api.getProductSuggestions(t+e.size);this._recentItems=(s.products||[]).filter(t=>!e.has(t.id)).slice(0,t)}catch(t){console.error("Failed to load recent items:",t),this._recentItems=[]}}hexToRgb(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:{r:159,g:168,b:218}}getCategoryHeaderStyle(t){const{r:e,g:r,b:i}=this.hexToRgb(t);return`border-left: 4px solid ${t}; background: linear-gradient(to right, rgba(${e},${r},${i},0.22), rgba(${e},${r},${i},0.066)); border-radius: 0 8px 8px 0;`}getCategoryColor(t){const e=(this.categories||[]).find(e=>e.id===t);return e?.color||"#9fa8da"}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}getProductEmoji(t,e){if(!t)return this.getCategoryEmoji(e);const r=t.toLowerCase(),i={chicken:"🍗",turkey:"🦃",duck:"🦆",beef:"🥩",steak:"🥩",mince:"🥩",lamb:"🍖",pork:"🥓",bacon:"🥓",ham:"🍖",sausage:"🌭",salami:"🍖",fish:"🐟",salmon:"🐟",tuna:"🐟",prawn:"🦐",shrimp:"🦐",egg:"🥚",eggs:"🥚",milk:"🥛",cream:"🥛",yogurt:"🫙",yoghurt:"🫙",cheese:"🧀",cheddar:"🧀",feta:"🧀",mozzarella:"🧀",butter:"🧈",bread:"🍞",toast:"🍞",bun:"🥖",roll:"🥖",bagel:"🥯",loaf:"🍞",sourdough:"🍞",wrap:"🫓",croissant:"🥐",apple:"🍎",orange:"🍊",banana:"🍌",grape:"🍇",strawberry:"🍓",blueberry:"🫐",raspberry:"🍓",lemon:"🍋",lime:"🍋",pineapple:"🍍",mango:"🥭",watermelon:"🍉",melon:"🍈",peach:"🍑",pear:"🍐",cherry:"🍒",kiwi:"🥝",avocado:"🥑",tomato:"🍅",potato:"🥔",carrot:"🥕",broccoli:"🥦",lettuce:"🥬",spinach:"🥬",salad:"🥗",kale:"🥬",onion:"🧅",garlic:"🧄",corn:"🌽",pepper:"🫑",cucumber:"🥒",mushroom:"🍄",eggplant:"🍆",peas:"🫛",beans:"🫘",lentil:"🫘",coffee:"☕",espresso:"☕",tea:"🍵",juice:"🧃",water:"💧",beer:"🍺",wine:"🍷",soda:"🥤",cola:"🥤",pasta:"🍝",noodle:"🍜",rice:"🍚",oat:"🌾",cereal:"🥣",flour:"🌾",sugar:"🍬",salt:"🧂",honey:"🍯",chocolate:"🍫",chips:"🥔",popcorn:"🍿",biscuit:"🍪",cookie:"🍪",cake:"🎂",muffin:"🧁","ice cream":"🍦",shampoo:"🧴",soap:"🧼",toothpaste:"🦷","toilet paper":"🧻",nappy:"👶",diaper:"👶","pet food":"🐾"};for(const[t,e]of Object.entries(i))if(r.includes(t))return e;return this.getCategoryEmoji(e)}getBundledIcon(t){if(!t)return null;const e=t.toLowerCase();for(const[t,r]of Object.entries(ut))if(e.includes(t)&&pt[r])return pt[r];return null}getLocalImageUrl(t){const e=this.settings?.localImagePath;if(!e||!t)return null;const r=t.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/_+$/,"");return`${e.replace(/\/$/,"")}/${r}.jpg`}groupItems(){const t=this.settings?.sortMode||"category",e=(this.items||[]).filter(t=>!t.checked);if("alphabetical"===t)return e.sort((t,e)=>t.name.localeCompare(e.name)),{mode:"alpha",sections:[{id:"_alpha",items:e}]};const r={};return(this.categories||[]).forEach(t=>{const i=e.filter(e=>e.category_id===t.id);i.length>0&&(r[t.id]={category:t,items:i})}),{mode:"category",sections:Object.values(r)}}handleRowClick(t,e){this._longPressTriggered?this._longPressTriggered=!1:t.target.closest(".list-decrease-btn")||t.target.closest(".list-qty-badge")||this.dispatchEvent(new CustomEvent("item-check",{detail:{itemId:e.id,checked:!e.checked},bubbles:!0,composed:!0}))}handleQtyClick(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:e.id},bubbles:!0,composed:!0}))}handleDecrease(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:{itemId:e.id},bubbles:!0,composed:!0}))}handleRecentClick(t){this.dispatchEvent(new CustomEvent("add-item",{detail:{name:t.name,category_id:t.category_id,product_id:t.id,quantity:1,unit:t.default_unit||"units",price:t.price||null,image_url:t.image_url||null,fromRecentlyUsed:!0},bubbles:!0,composed:!0}))}handleMouseDown(t){this._longPressTriggered=!1,this._longPressTimer=setTimeout(()=>{this._longPressTriggered=!0,this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:t},bubbles:!0,composed:!0}))},500)}handleMouseUp(){this._longPressTimer&&(clearTimeout(this._longPressTimer),this._longPressTimer=null)}renderRowIcon(t,e,r){if(r)return V`<img src="${r}" alt="${t}" class="row-img" />`;const i=this.getBundledIcon(t);if(i)return V`<img src="${i}" alt="${t}" class="row-img icon-img" />`;const n=this.getLocalImageUrl(t);return n?V`
        <img
          src="${n}"
          alt="${t}"
          class="row-img icon-img"
          @error=${t=>{t.target.style.display="none",t.target.nextElementSibling?.style.removeProperty("display")}}
        /><span class="row-emoji" style="display:none">${this.getProductEmoji(t,e)}</span>
      `:V`<span class="row-emoji">${this.getProductEmoji(t,e)}</span>`}renderRow(t){const e=this.getCategoryColor(t.category_id),{r:r,g:i,b:n}=this.hexToRgb(e),o=!1!==this.settings?.showPriceOnTile;return V`
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
          ${o&&t.price?V`
            <div class="row-price">$${(t.price*t.quantity).toFixed(2)}</div>
          `:""}
        </div>

        <div class="row-right">
          <button
            class="list-decrease-btn"
            style="background: rgba(${r},${i},${n},0.15); color: ${e};"
            @click=${e=>this.handleDecrease(e,t)}
          >−</button>
          <div
            class="list-qty-badge"
            style="background: ${e}"
            @click=${e=>this.handleQtyClick(e,t)}
          >${t.quantity}</div>
        </div>
      </div>
    `}renderRecentRow(t){const e="#9e9e9e",r=!1!==this.settings?.showPriceOnTile;return V`
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
          ${r&&t.price?V`
            <div class="row-price">$${t.price.toFixed(2)}</div>
          `:""}
        </div>

        <div class="row-right">
          <div class="list-qty-badge recent-add" style="background: ${e}">+</div>
        </div>
      </div>
    `}render(){const{mode:t,sections:e}=this.groupItems(),r=!1!==this.settings?.showRecentlyUsed,i="#9e9e9e",n=e.every(t=>0===t.items.length)&&(!r||0===this._recentItems.length);return n?V`
        <div class="empty">
          <div class="empty-emoji">🛒</div>
          <p>Your shopping list is empty</p>
          <p class="hint">Search for products to add items</p>
        </div>
      `:V`
      <div class="list-container">

        ${e.map(e=>V`
          <div class="list-section">
            ${"category"===t?V`
              <div class="category-header" style="${this.getCategoryHeaderStyle(e.category.color||"#9fa8da")}">
                <span class="cat-emoji">${this.getCategoryEmoji(e.category.id)}</span>
                <span class="cat-name" style="color: ${e.category.color||"#9fa8da"}">${e.category.name}</span>
              </div>
            `:""}
            ${e.items.map(t=>this.renderRow(t))}
          </div>
        `)}

        ${r&&this._recentItems.length>0?V`
          <div class="list-section">
            <div class="category-header" style="${this.getCategoryHeaderStyle(i)}">
              <span class="cat-emoji">⏱️</span>
              <span class="cat-name" style="color: ${i}">Recently Used</span>
            </div>
            ${this._recentItems.map(t=>this.renderRecentRow(t))}
          </div>
        `:""}

      </div>
    `}static styles=o`
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
  `}customElements.define("slm-item-list",mt);class wt extends st{static properties={api:{type:Object},categories:{type:Array},searchQuery:{type:String},searchResults:{type:Array},selectedProduct:{type:Object},quantity:{type:Number},customName:{type:String}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.selectedProduct=null,this.quantity=1,this.customName=""}async handleSearch(t){if(this.searchQuery=t.target.value,this.searchQuery.length<2)return void(this.searchResults=[]);const e=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=e.products}selectProduct(t){this.selectedProduct=t,this.quantity=t.default_quantity,this.searchQuery="",this.searchResults=[]}handleAdd(){this.selectedProduct?this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.selectedProduct.name,category_id:this.selectedProduct.category_id,product_id:this.selectedProduct.id,quantity:this.quantity,unit:this.selectedProduct.default_unit,price:this.selectedProduct.price,image_url:this.selectedProduct.image_url},bubbles:!0,composed:!0})):this.customName&&this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.customName,category_id:"other",quantity:this.quantity,unit:"units"},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return V`
      <div class="overlay" @click=${this.handleClose}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-header">
            <h3>Add Item</h3>
            <button class="close-btn" @click=${this.handleClose}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="dialog-content">
            ${this.selectedProduct?V`
              <div class="selected-product">
                ${this.selectedProduct.image_url?V`
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

                ${this.selectedProduct.price?V`
                  <div class="total-price">
                    Total: $${(this.selectedProduct.price*this.quantity).toFixed(2)}
                  </div>
                `:""}
              </div>
            `:V`
              <div class="search-section">
                <input
                  type="text"
                  placeholder="Search products..."
                  .value=${this.searchQuery}
                  @input=${this.handleSearch}
                  autofocus
                />

                ${this.searchResults.length>0?V`
                  <div class="results">
                    ${this.searchResults.map(t=>V`
                      <div class="result-item" @click=${()=>this.selectProduct(t)}>
                        ${t.image_url?V`
                          <img src="${t.image_url}" alt="${t.name}">
                        `:V`
                          <div class="no-image">
                            <ha-icon icon="mdi:food-variant"></ha-icon>
                          </div>
                        `}
                        <div class="result-info">
                          <div class="result-name">${t.name}</div>
                          ${t.price?V`
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
  `}customElements.define("slm-add-item-dialog",wt);const bt=["units","kg","g","L","mL","pack","bunch","dozen","bottle","can","bag","box","loaf","slice"];class yt extends st{static properties={api:{type:Object},item:{type:Object},categories:{type:Array},editedItem:{type:Object},imagePreview:{type:String},_customUnit:{type:Boolean,state:!0}};constructor(){super(),this.editedItem={},this.imagePreview=null,this._customUnit=!1}updated(t){if(t.has("item")&&this.item){const t=this.item.unit||"units";this._customUnit=!bt.includes(t),this.editedItem={name:this.item.name,category_id:this.item.category_id||"other",quantity:this.item.quantity,unit:t,note:this.item.note||"",image_url:this.item.image_url||"",price:null!=this.item.price?this.item.price:""},this.imagePreview=this.item.image_url||null}}handleSave(){const t={...this.editedItem};""===t.price||null===t.price?delete t.price:t.price=parseFloat(t.price)||0,this.dispatchEvent(new CustomEvent("save-item",{detail:{itemId:this.item.id,data:t},bubbles:!0,composed:!0}))}handleDelete(){confirm(`Delete ${this.item.name}?`)&&this.dispatchEvent(new CustomEvent("delete-item",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}handleQtyChange(t){const e=Math.max(1,(this.editedItem.quantity||1)+t);this.editedItem={...this.editedItem,quantity:e}}handleUnitSelect(t){const e=t.target.value;"__other__"===e?(this._customUnit=!0,this.editedItem={...this.editedItem,unit:""}):(this._customUnit=!1,this.editedItem={...this.editedItem,unit:e})}handleImageUrlInput(t){const e=t.target.value;this.editedItem={...this.editedItem,image_url:e},this.imagePreview=e||null}handleFilePick(){const t=this.shadowRoot.querySelector("#file-input");t&&t.click()}handleFileChange(t){const e=t.target.files[0];if(!e)return;const r=new FileReader;r.onload=t=>{const e=t.target.result;this.editedItem={...this.editedItem,image_url:e},this.imagePreview=e},r.readAsDataURL(e)}handleClearImage(){this.editedItem={...this.editedItem,image_url:""},this.imagePreview=null;const t=this.shadowRoot.querySelector("#file-input");t&&(t.value="");const e=this.shadowRoot.querySelector("#image-url-input");e&&(e.value="")}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}render(){if(!this.item)return V``;const t=this.categories||[],e=this.editedItem.unit||"units",r=this._customUnit?"__other__":e;return V`
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
                ${t.map(t=>V`
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
                <select .value=${r} @change=${this.handleUnitSelect}>
                  ${bt.map(t=>V`<option value="${t}" ?selected=${t===r}>${t}</option>`)}
                  <option value="__other__" ?selected=${this._customUnit}>Other…</option>
                </select>
                ${this._customUnit?V`
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
              ${this.editedItem.price&&""!==this.editedItem.price?V`
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

              ${this.imagePreview?V`
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
    `}static styles=o`
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
  `}customElements.define("slm-edit-item-dialog",yt);class _t extends st{static properties={list:{type:Object},isActive:{type:Boolean},itemCount:{type:Number},totalCost:{type:Number},currency:{type:String},emoji:{type:String},showMenu:{type:Boolean},menuX:{type:Number},menuY:{type:Number}};constructor(){super(),this.showMenu=!1,this.itemCount=0,this.totalCost=0,this.currency="NZD",this.menuX=0,this.menuY=0}getColorClass(){return`color-${parseInt(this.list.id.slice(-1),16)%6}`}dimColor(t){return`rgba(${parseInt(t.slice(1,3),16)}, ${parseInt(t.slice(3,5),16)}, ${parseInt(t.slice(5,7),16)}, 0.5)`}handleCardClick(t){t.target.closest(".menu-btn")||this.dispatchEvent(new CustomEvent("list-select",{detail:{listId:this.list.id},bubbles:!0,composed:!0}))}handleMenuClick(t){t.stopPropagation();const e=t.target.closest(".menu-btn").getBoundingClientRect();this.menuX=e.right-160,this.menuY=e.bottom+5,this.showMenu=!this.showMenu}handleAction(t,e){e.stopPropagation(),this.showMenu=!1,this.dispatchEvent(new CustomEvent("list-action",{detail:{action:t,listId:this.list.id},bubbles:!0,composed:!0}))}render(){return V`
      <div 
        class="list-card ${this.isActive?"active":"inactive"} ${this.getColorClass()}"
        @click=${this.handleCardClick}
      >

        ${this.isActive?V`
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

        ${this.showMenu?V`
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
  `}customElements.define("slm-list-card",_t);class Et extends st{static properties={api:{type:Object},lists:{type:Array},activeList:{type:Object},items:{type:Array},total:{type:Object},listTotals:{type:Object},showCreateDialog:{type:Boolean},newListName:{type:String},newListIcon:{type:String}};constructor(){super(),this.lists=[],this.showCreateDialog=!1,this.listTotals={},this.newListName="",this.newListIcon="mdi:cart"}handleCreateList(){this.showCreateDialog=!0}async loadTotals(){if(!this.api||!this.lists?.length)return;const t={};await Promise.all(this.lists.map(async e=>{try{const r=await this.api.getListTotal(e.id);t[e.id]=r}catch(t){console.error("Failed to load total for list",e.id,t)}})),this.listTotals=t}async handleSaveNewList(){this.newListName.trim()&&(await this.api.createList(this.newListName,this.newListIcon),this.showCreateDialog=!1,this.newListName="",this.newListIcon="mdi:cart",this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})))}handleListSelect(t){this.dispatchEvent(new CustomEvent("list-selected",{detail:t.detail,bubbles:!0,composed:!0}))}async handleListAction(t){const{action:e,listId:r}=t.detail;switch(e){case"rename":const t=prompt("Enter new list name:");t&&(await this.api.updateList(r,{name:t}),this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})));break;case"delete":confirm("Delete this list?")&&(await this.api.deleteList(r),this.dispatchEvent(new CustomEvent("lists-updated",{bubbles:!0,composed:!0})));break;case"share":alert("Share feature coming soon!");break;case"copy":alert("Copy feature coming soon!")}}getListEmoji(t){return{"mdi:cart":"🛒","mdi:home":"🏠","mdi:food":"🍽️","mdi:shopping":"🛍️","mdi:store":"🏪"}[t]||"🛒"}updated(t){t.has("lists")&&this.loadTotals()}render(){return V`
      <div class="lists-view">
        <div class="header">
          <h2>My Lists</h2>
          <button class="create-btn" @click=${this.handleCreateList}>
            <span class="emoji">➕</span>
            New List
          </button>
        </div>

        ${0===this.lists.length?V`
          <div class="empty">
            <div class="empty-emoji">📋</div>
            <p>No lists yet</p>
            <p class="hint">Create your first shopping list</p>
            <button class="primary-btn" @click=${this.handleCreateList}>
              <span class="emoji">➕</span>
              Create List
            </button>
          </div>
        `:V`
          <div class="lists-grid">
            ${this.lists.map(t=>V`
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

        ${this.showCreateDialog?V`
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
                  ${["mdi:cart","mdi:home","mdi:food","mdi:shopping","mdi:store"].map(t=>V`
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
  `}customElements.define("slm-lists-view",Et);var Ct="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function vt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var At={},St={},It={};Object.defineProperty(It,"__esModule",{value:!0});It.default=function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.data=e,this.text=r.text||e,this.options=r},Object.defineProperty(St,"__esModule",{value:!0}),St.CODE39=void 0;var Tt,xt=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Rt=(Tt=It)&&Tt.__esModule?Tt:{default:Tt};var Ot=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e=e.toUpperCase(),r.mod43&&(e+=function(t){return Nt[t]}(function(t){for(var e=0,r=0;r<t.length;r++)e+=Mt(t[r]);return e%=43,e}(e))),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Rt.default),xt(t,[{key:"encode",value:function(){for(var t=Pt("*"),e=0;e<this.data.length;e++)t+=Pt(this.data[e])+"0";return{data:t+=Pt("*"),text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)}}]),t}(),Nt=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],Dt=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];function Pt(t){return function(t){return Dt[t].toString(2)}(Mt(t))}function Mt(t){return Nt.indexOf(t)}St.CODE39=Ot;var kt,Bt={},Lt={},Ft={},$t={};function Ut(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}Object.defineProperty($t,"__esModule",{value:!0});var Ht=$t.SET_A=0,Vt=$t.SET_B=1,zt=$t.SET_C=2;$t.SHIFT=98;var jt=$t.START_A=103,Gt=$t.START_B=104,Xt=$t.START_C=105;$t.MODULO=103,$t.STOP=106,$t.FNC1=207,$t.SET_BY_CODE=(Ut(kt={},jt,Ht),Ut(kt,Gt,Vt),Ut(kt,Xt,zt),kt),$t.SWAP={101:Ht,100:Vt,99:zt},$t.A_START_CHAR=String.fromCharCode(208),$t.B_START_CHAR=String.fromCharCode(209),$t.C_START_CHAR=String.fromCharCode(210),$t.A_CHARS="[\0-_È-Ï]",$t.B_CHARS="[ -È-Ï]",$t.C_CHARS="(Ï*[0-9]{2}Ï*)",$t.BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011],Object.defineProperty(Ft,"__esModule",{value:!0});var Wt=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Yt=function(t){return t&&t.__esModule?t:{default:t}}(It),Zt=$t;var qt=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.substring(1),r));return i.bytes=e.split("").map(function(t){return t.charCodeAt(0)}),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Yt.default),Wt(t,[{key:"valid",value:function(){return/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function(){var e=this.bytes,r=e.shift()-105,i=Zt.SET_BY_CODE[r];if(void 0===i)throw new RangeError("The encoding does not start with a start character.");!0===this.shouldEncodeAsEan128()&&e.unshift(Zt.FNC1);var n=t.next(e,1,i);return{text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:t.getBar(r)+n.result+t.getBar((n.checksum+r)%Zt.MODULO)+t.getBar(Zt.STOP)}}},{key:"shouldEncodeAsEan128",value:function(){var t=this.options.ean128||!1;return"string"==typeof t&&(t="true"===t.toLowerCase()),t}}],[{key:"getBar",value:function(t){return Zt.BARS[t]?Zt.BARS[t].toString():""}},{key:"correctIndex",value:function(t,e){if(e===Zt.SET_A){var r=t.shift();return r<32?r+64:r-32}return e===Zt.SET_B?t.shift()-32:10*(t.shift()-48)+t.shift()-48}},{key:"next",value:function(e,r,i){if(!e.length)return{result:"",checksum:0};var n=void 0,o=void 0;if(e[0]>=200){o=e.shift()-105;var s=Zt.SWAP[o];void 0!==s?n=t.next(e,r+1,s):(i!==Zt.SET_A&&i!==Zt.SET_B||o!==Zt.SHIFT||(e[0]=i===Zt.SET_A?e[0]>95?e[0]-96:e[0]:e[0]<32?e[0]+96:e[0]),n=t.next(e,r+1,i))}else o=t.correctIndex(e,i),n=t.next(e,r+1,i);var a=o*r;return{result:t.getBar(o)+n.result,checksum:a+n.checksum}}}]),t}();Ft.default=qt;var Kt={};Object.defineProperty(Kt,"__esModule",{value:!0});var Qt=$t,Jt=function(t){return t.match(new RegExp("^"+Qt.A_CHARS+"*"))[0].length},te=function(t){return t.match(new RegExp("^"+Qt.B_CHARS+"*"))[0].length},ee=function(t){return t.match(new RegExp("^"+Qt.C_CHARS+"*"))[0]};function re(t,e){var r=e?Qt.A_CHARS:Qt.B_CHARS,i=t.match(new RegExp("^("+r+"+?)(([0-9]{2}){2,})([^0-9]|$)"));if(i)return i[1]+String.fromCharCode(204)+ie(t.substring(i[1].length));var n=t.match(new RegExp("^"+r+"+"))[0];return n.length===t.length?t:n+String.fromCharCode(e?205:206)+re(t.substring(n.length),!e)}function ie(t){var e=ee(t),r=e.length;if(r===t.length)return t;t=t.substring(r);var i=Jt(t)>=te(t);return e+String.fromCharCode(i?206:205)+re(t,i)}Kt.default=function(t){var e=void 0;if(ee(t).length>=2)e=Qt.C_START_CHAR+ie(t);else{var r=Jt(t)>te(t);e=(r?Qt.A_START_CHAR:Qt.B_START_CHAR)+re(t,r)}return e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(t,e){return String.fromCharCode(203)+e})},Object.defineProperty(Lt,"__esModule",{value:!0});var ne=se(Ft),oe=se(Kt);function se(t){return t&&t.__esModule?t:{default:t}}function ae(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var le=function(){function t(e,r){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),/^[\x00-\x7F\xC8-\xD3]+$/.test(e))var i=ae(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,(0,oe.default)(e),r));else i=ae(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));return ae(i)}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ne.default),t}();Lt.default=le;var ce={};Object.defineProperty(ce,"__esModule",{value:!0});var de=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),he=function(t){return t&&t.__esModule?t:{default:t}}(Ft),ue=$t;var pe=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,ue.A_START_CHAR+e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,he.default),de(t,[{key:"valid",value:function(){return new RegExp("^"+ue.A_CHARS+"+$").test(this.data)}}]),t}();ce.default=pe;var fe={};Object.defineProperty(fe,"__esModule",{value:!0});var ge=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),me=function(t){return t&&t.__esModule?t:{default:t}}(Ft),we=$t;var be=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,we.B_START_CHAR+e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,me.default),ge(t,[{key:"valid",value:function(){return new RegExp("^"+we.B_CHARS+"+$").test(this.data)}}]),t}();fe.default=be;var ye={};Object.defineProperty(ye,"__esModule",{value:!0});var _e=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Ee=function(t){return t&&t.__esModule?t:{default:t}}(Ft),Ce=$t;var ve=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,Ce.C_START_CHAR+e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Ee.default),_e(t,[{key:"valid",value:function(){return new RegExp("^"+Ce.C_CHARS+"+$").test(this.data)}}]),t}();ye.default=ve,Object.defineProperty(Bt,"__esModule",{value:!0}),Bt.CODE128C=Bt.CODE128B=Bt.CODE128A=Bt.CODE128=void 0;var Ae=xe(Lt),Se=xe(ce),Ie=xe(fe),Te=xe(ye);function xe(t){return t&&t.__esModule?t:{default:t}}Bt.CODE128=Ae.default,Bt.CODE128A=Se.default,Bt.CODE128B=Ie.default,Bt.CODE128C=Te.default;var Re={},Oe={},Ne={};Object.defineProperty(Ne,"__esModule",{value:!0}),Ne.SIDE_BIN="101",Ne.MIDDLE_BIN="01010",Ne.BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]},Ne.EAN2_STRUCTURE=["LL","LG","GL","GG"],Ne.EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"],Ne.EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];var De={},Pe={};Object.defineProperty(Pe,"__esModule",{value:!0});var Me=Ne;Pe.default=function(t,e,r){var i=t.split("").map(function(t,r){return Me.BINARIES[e[r]]}).map(function(e,r){return e?e[t[r]]:""});if(r){var n=t.length-1;i=i.map(function(t,e){return e<n?t+r:t})}return i.join("")},Object.defineProperty(De,"__esModule",{value:!0});var ke=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Be=Ne,Le=$e(Pe),Fe=$e(It);function $e(t){return t&&t.__esModule?t:{default:t}}var Ue=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));return i.fontSize=!r.flat&&r.fontSize>10*r.width?10*r.width:r.fontSize,i.guardHeight=r.height+i.fontSize/2+r.textMargin,i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Fe.default),ke(t,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function(t,e){return this.text.substr(t,e)}},{key:"leftEncode",value:function(t,e){return(0,Le.default)(t,e)}},{key:"rightText",value:function(t,e){return this.text.substr(t,e)}},{key:"rightEncode",value:function(t,e){return(0,Le.default)(t,e)}},{key:"encodeGuarded",value:function(){var t={fontSize:this.fontSize},e={height:this.guardHeight};return[{data:Be.SIDE_BIN,options:e},{data:this.leftEncode(),text:this.leftText(),options:t},{data:Be.MIDDLE_BIN,options:e},{data:this.rightEncode(),text:this.rightText(),options:t},{data:Be.SIDE_BIN,options:e}]}},{key:"encodeFlat",value:function(){return{data:[Be.SIDE_BIN,this.leftEncode(),Be.MIDDLE_BIN,this.rightEncode(),Be.SIDE_BIN].join(""),text:this.text}}}]),t}();De.default=Ue,Object.defineProperty(Oe,"__esModule",{value:!0});var He=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Ve=function t(e,r,i){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,r);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:t(o,r,i)}if("value"in n)return n.value;var s=n.get;return void 0!==s?s.call(i):void 0},ze=Ne,je=function(t){return t&&t.__esModule?t:{default:t}}(De);var Ge=function(t){var e=t.substr(0,12).split("").map(function(t){return+t}).reduce(function(t,e,r){return r%2?t+3*e:t+e},0);return(10-e%10)%10},Xe=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{12}$/)&&(e+=Ge(e));var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));return i.lastChar=r.lastChar,i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,je.default),He(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{13}$/)&&+this.data[12]===Ge(this.data)}},{key:"leftText",value:function(){return Ve(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function(){var e=this.data.substr(1,6),r=ze.EAN13_STRUCTURE[this.data[0]];return Ve(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftEncode",this).call(this,e,r)}},{key:"rightText",value:function(){return Ve(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function(){var e=this.data.substr(7,6);return Ve(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightEncode",this).call(this,e,"RRRRRR")}},{key:"encodeGuarded",value:function(){var e=Ve(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(e.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(e.push({data:"00"}),e.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),e}}]),t}();Oe.default=Xe;var We={};Object.defineProperty(We,"__esModule",{value:!0});var Ye=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Ze=function t(e,r,i){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,r);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:t(o,r,i)}if("value"in n)return n.value;var s=n.get;return void 0!==s?s.call(i):void 0},qe=function(t){return t&&t.__esModule?t:{default:t}}(De);var Ke=function(t){var e=t.substr(0,7).split("").map(function(t){return+t}).reduce(function(t,e,r){return r%2?t+e:t+3*e},0);return(10-e%10)%10},Qe=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{7}$/)&&(e+=Ke(e)),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,qe.default),Ye(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{8}$/)&&+this.data[7]===Ke(this.data)}},{key:"leftText",value:function(){return Ze(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function(){var e=this.data.substr(0,4);return Ze(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"leftEncode",this).call(this,e,"LLLL")}},{key:"rightText",value:function(){return Ze(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function(){var e=this.data.substr(4,4);return Ze(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"rightEncode",this).call(this,e,"RRRR")}}]),t}();We.default=Qe;var Je={};Object.defineProperty(Je,"__esModule",{value:!0});var tr=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),er=Ne,rr=nr(Pe),ir=nr(It);function nr(t){return t&&t.__esModule?t:{default:t}}var or=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ir.default),tr(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{5}$/)}},{key:"encode",value:function(){var t,e,r=er.EAN5_STRUCTURE[(t=this.data,e=t.split("").map(function(t){return+t}).reduce(function(t,e,r){return r%2?t+9*e:t+3*e},0),e%10)];return{data:"1011"+(0,rr.default)(this.data,r,"01"),text:this.text}}}]),t}();Je.default=or;var sr={};Object.defineProperty(sr,"__esModule",{value:!0});var ar=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),lr=Ne,cr=hr(Pe),dr=hr(It);function hr(t){return t&&t.__esModule?t:{default:t}}var ur=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,dr.default),ar(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{2}$/)}},{key:"encode",value:function(){var t=lr.EAN2_STRUCTURE[parseInt(this.data)%4];return{data:"1011"+(0,cr.default)(this.data,t,"01"),text:this.text}}}]),t}();sr.default=ur;var pr={};Object.defineProperty(pr,"__esModule",{value:!0});var fr=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}();pr.checksum=yr;var gr=wr(Pe),mr=wr(It);function wr(t){return t&&t.__esModule?t:{default:t}}var br=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{11}$/)&&(e+=yr(e));var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));return i.displayValue=r.displayValue,r.fontSize>10*r.width?i.fontSize=10*r.width:i.fontSize=r.fontSize,i.guardHeight=r.height+i.fontSize/2+r.textMargin,i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,mr.default),fr(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{12}$/)&&this.data[11]==yr(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=(0,gr.default)(this.data.substr(0,6),"LLLLLL"),t+="01010",t+=(0,gr.default)(this.data.substr(6,6),"RRRRRR"),{data:t+="101",text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101"+(0,gr.default)(this.data[0],"L"),options:{height:this.guardHeight}}),t.push({data:(0,gr.default)(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),t.push({data:"01010",options:{height:this.guardHeight}}),t.push({data:(0,gr.default)(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),t.push({data:(0,gr.default)(this.data[11],"R")+"101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),t}}]),t}();function yr(t){var e,r=0;for(e=1;e<11;e+=2)r+=parseInt(t[e]);for(e=0;e<11;e+=2)r+=3*parseInt(t[e]);return(10-r%10)%10}pr.default=br;var _r={};Object.defineProperty(_r,"__esModule",{value:!0});var Er=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Cr=Sr(Pe),vr=Sr(It),Ar=pr;function Sr(t){return t&&t.__esModule?t:{default:t}}function Ir(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}var Tr=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],xr=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],Rr=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var i=Ir(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));if(i.isValid=!1,-1!==e.search(/^[0-9]{6}$/))i.middleDigits=e,i.upcA=Or(e,"0"),i.text=r.text||""+i.upcA[0]+e+i.upcA[i.upcA.length-1],i.isValid=!0;else{if(-1===e.search(/^[01][0-9]{7}$/))return Ir(i);if(i.middleDigits=e.substring(1,e.length-1),i.upcA=Or(i.middleDigits,e[0]),i.upcA[i.upcA.length-1]!==e[e.length-1])return Ir(i);i.isValid=!0}return i.displayValue=r.displayValue,r.fontSize>10*r.width?i.fontSize=10*r.width:i.fontSize=r.fontSize,i.guardHeight=r.height+i.fontSize/2+r.textMargin,i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,vr.default),Er(t,[{key:"valid",value:function(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=this.encodeMiddleDigits(),{data:t+="010101",text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101",options:{height:this.guardHeight}}),t.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),t.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),t}},{key:"encodeMiddleDigits",value:function(){var t=this.upcA[0],e=this.upcA[this.upcA.length-1],r=xr[parseInt(e)][parseInt(t)];return(0,Cr.default)(this.middleDigits,r)}}]),t}();function Or(t,e){for(var r=parseInt(t[t.length-1]),i=Tr[r],n="",o=0,s=0;s<i.length;s++){var a=i[s];n+="X"===a?t[o++]:a}return""+(n=""+e+n)+(0,Ar.checksum)(n)}_r.default=Rr,Object.defineProperty(Re,"__esModule",{value:!0}),Re.UPCE=Re.UPC=Re.EAN2=Re.EAN5=Re.EAN8=Re.EAN13=void 0;var Nr=Lr(Oe),Dr=Lr(We),Pr=Lr(Je),Mr=Lr(sr),kr=Lr(pr),Br=Lr(_r);function Lr(t){return t&&t.__esModule?t:{default:t}}Re.EAN13=Nr.default,Re.EAN8=Dr.default,Re.EAN5=Pr.default,Re.EAN2=Mr.default,Re.UPC=kr.default,Re.UPCE=Br.default;var Fr={},$r={},Ur={};Object.defineProperty(Ur,"__esModule",{value:!0}),Ur.START_BIN="1010",Ur.END_BIN="11101",Ur.BINARIES=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"],Object.defineProperty($r,"__esModule",{value:!0});var Hr=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Vr=Ur,zr=function(t){return t&&t.__esModule?t:{default:t}}(It);var jr=function(){function t(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,zr.default),Hr(t,[{key:"valid",value:function(){return-1!==this.data.search(/^([0-9]{2})+$/)}},{key:"encode",value:function(){var t=this,e=this.data.match(/.{2}/g).map(function(e){return t.encodePair(e)}).join("");return{data:Vr.START_BIN+e+Vr.END_BIN,text:this.text}}},{key:"encodePair",value:function(t){var e=Vr.BINARIES[t[1]];return Vr.BINARIES[t[0]].split("").map(function(t,r){return("1"===t?"111":"1")+("1"===e[r]?"000":"0")}).join("")}}]),t}();$r.default=jr;var Gr={};Object.defineProperty(Gr,"__esModule",{value:!0});var Xr=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Wr=function(t){return t&&t.__esModule?t:{default:t}}($r);var Yr=function(t){var e=t.substr(0,13).split("").map(function(t){return parseInt(t,10)}).reduce(function(t,e,r){return t+e*(3-r%2*2)},0);return 10*Math.ceil(e/10)-e},Zr=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),-1!==e.search(/^[0-9]{13}$/)&&(e+=Yr(e)),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Wr.default),Xr(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{14}$/)&&+this.data[13]===Yr(this.data)}}]),t}();Gr.default=Zr,Object.defineProperty(Fr,"__esModule",{value:!0}),Fr.ITF14=Fr.ITF=void 0;var qr=Qr($r),Kr=Qr(Gr);function Qr(t){return t&&t.__esModule?t:{default:t}}Fr.ITF=qr.default,Fr.ITF14=Kr.default;var Jr={},ti={};Object.defineProperty(ti,"__esModule",{value:!0});var ei=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),ri=function(t){return t&&t.__esModule?t:{default:t}}(It);var ii=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ri.default),ei(t,[{key:"encode",value:function(){for(var t="110",e=0;e<this.data.length;e++){var r=parseInt(this.data[e]).toString(2);r=ni(r,4-r.length);for(var i=0;i<r.length;i++)t+="0"==r[i]?"100":"110"}return{data:t+="1001",text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]+$/)}}]),t}();function ni(t,e){for(var r=0;r<e;r++)t="0"+t;return t}ti.default=ii;var oi={},si={};Object.defineProperty(si,"__esModule",{value:!0}),si.mod10=function(t){for(var e=0,r=0;r<t.length;r++){var i=parseInt(t[r]);(r+t.length)%2==0?e+=i:e+=2*i%10+Math.floor(2*i/10)}return(10-e%10)%10},si.mod11=function(t){for(var e=0,r=[2,3,4,5,6,7],i=0;i<t.length;i++){var n=parseInt(t[t.length-1-i]);e+=r[i%r.length]*n}return(11-e%11)%11},Object.defineProperty(oi,"__esModule",{value:!0});var ai=function(t){return t&&t.__esModule?t:{default:t}}(ti),li=si;var ci=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e+(0,li.mod10)(e),r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,ai.default),t}();oi.default=ci;var di={};Object.defineProperty(di,"__esModule",{value:!0});var hi=function(t){return t&&t.__esModule?t:{default:t}}(ti),ui=si;var pi=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e+(0,ui.mod11)(e),r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,hi.default),t}();di.default=pi;var fi={};Object.defineProperty(fi,"__esModule",{value:!0});var gi=function(t){return t&&t.__esModule?t:{default:t}}(ti),mi=si;var wi=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e+=(0,mi.mod10)(e),e+=(0,mi.mod10)(e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,gi.default),t}();fi.default=wi;var bi={};Object.defineProperty(bi,"__esModule",{value:!0});var yi=function(t){return t&&t.__esModule?t:{default:t}}(ti),_i=si;var Ei=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e+=(0,_i.mod11)(e),e+=(0,_i.mod10)(e),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,yi.default),t}();bi.default=Ei,Object.defineProperty(Jr,"__esModule",{value:!0}),Jr.MSI1110=Jr.MSI1010=Jr.MSI11=Jr.MSI10=Jr.MSI=void 0;var Ci=Ti(ti),vi=Ti(oi),Ai=Ti(di),Si=Ti(fi),Ii=Ti(bi);function Ti(t){return t&&t.__esModule?t:{default:t}}Jr.MSI=Ci.default,Jr.MSI10=vi.default,Jr.MSI11=Ai.default,Jr.MSI1010=Si.default,Jr.MSI1110=Ii.default;var xi={};Object.defineProperty(xi,"__esModule",{value:!0}),xi.pharmacode=void 0;var Ri=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Oi=function(t){return t&&t.__esModule?t:{default:t}}(It);var Ni=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r));return i.number=parseInt(e,10),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Oi.default),Ri(t,[{key:"encode",value:function(){for(var t=this.number,e="";!isNaN(t)&&0!=t;)t%2==0?(e="11100"+e,t=(t-2)/2):(e="100"+e,t=(t-1)/2);return{data:e=e.slice(0,-2),text:this.text}}},{key:"valid",value:function(){return this.number>=3&&this.number<=131070}}]),t}();xi.pharmacode=Ni;var Di={};Object.defineProperty(Di,"__esModule",{value:!0}),Di.codabar=void 0;var Pi=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Mi=function(t){return t&&t.__esModule?t:{default:t}}(It);var ki=function(){function t(e,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),0===e.search(/^[0-9\-\$\:\.\+\/]+$/)&&(e="A"+e+"A");var i=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.toUpperCase(),r));return i.text=i.options.text||i.text.replace(/[A-D]/g,""),i}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Mi.default),Pi(t,[{key:"valid",value:function(){return-1!==this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)}},{key:"encode",value:function(){for(var t=[],e=this.getEncodings(),r=0;r<this.data.length;r++)t.push(e[this.data.charAt(r)]),r!==this.data.length-1&&t.push("0");return{text:this.text,data:t.join("")}}},{key:"getEncodings",value:function(){return{0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"1011011011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),t}();Di.codabar=ki;var Bi={},Li={},Fi={};Object.defineProperty(Fi,"__esModule",{value:!0}),Fi.SYMBOLS=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","($)","(%)","(/)","(+)","ÿ"],Fi.BINARIES=["100010100","101001000","101000100","101000010","100101000","100100100","100100010","101010000","100010010","100001010","110101000","110100100","110100010","110010100","110010010","110001010","101101000","101100100","101100010","100110100","100011010","101011000","101001100","101000110","100101100","100010110","110110100","110110010","110101100","110100110","110010110","110011010","101101100","101100110","100110110","100111010","100101110","111010100","111010010","111001010","101101110","101110110","110101110","100100110","111011010","111010110","100110010","101011110"],Fi.MULTI_SYMBOLS={"\0":["(%)","U"],"":["($)","A"],"":["($)","B"],"":["($)","C"],"":["($)","D"],"":["($)","E"],"":["($)","F"],"":["($)","G"],"\b":["($)","H"],"\t":["($)","I"],"\n":["($)","J"],"\v":["($)","K"],"\f":["($)","L"],"\r":["($)","M"],"":["($)","N"],"":["($)","O"],"":["($)","P"],"":["($)","Q"],"":["($)","R"],"":["($)","S"],"":["($)","T"],"":["($)","U"],"":["($)","V"],"":["($)","W"],"":["($)","X"],"":["($)","Y"],"":["($)","Z"],"":["(%)","A"],"":["(%)","B"],"":["(%)","C"],"":["(%)","D"],"":["(%)","E"],"!":["(/)","A"],'"':["(/)","B"],"#":["(/)","C"],"&":["(/)","F"],"'":["(/)","G"],"(":["(/)","H"],")":["(/)","I"],"*":["(/)","J"],",":["(/)","L"],":":["(/)","Z"],";":["(%)","F"],"<":["(%)","G"],"=":["(%)","H"],">":["(%)","I"],"?":["(%)","J"],"@":["(%)","V"],"[":["(%)","K"],"\\":["(%)","L"],"]":["(%)","M"],"^":["(%)","N"],_:["(%)","O"],"`":["(%)","W"],a:["(+)","A"],b:["(+)","B"],c:["(+)","C"],d:["(+)","D"],e:["(+)","E"],f:["(+)","F"],g:["(+)","G"],h:["(+)","H"],i:["(+)","I"],j:["(+)","J"],k:["(+)","K"],l:["(+)","L"],m:["(+)","M"],n:["(+)","N"],o:["(+)","O"],p:["(+)","P"],q:["(+)","Q"],r:["(+)","R"],s:["(+)","S"],t:["(+)","T"],u:["(+)","U"],v:["(+)","V"],w:["(+)","W"],x:["(+)","X"],y:["(+)","Y"],z:["(+)","Z"],"{":["(%)","P"],"|":["(%)","Q"],"}":["(%)","R"],"~":["(%)","S"],"":["(%)","T"]},Object.defineProperty(Li,"__esModule",{value:!0});var $i=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Ui=Fi,Hi=function(t){return t&&t.__esModule?t:{default:t}}(It);var Vi=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Hi.default),$i(t,[{key:"valid",value:function(){return/^[0-9A-Z\-. $/+%]+$/.test(this.data)}},{key:"encode",value:function(){var e=this.data.split("").flatMap(function(t){return Ui.MULTI_SYMBOLS[t]||t}),r=e.map(function(e){return t.getEncoding(e)}).join(""),i=t.checksum(e,20),n=t.checksum(e.concat(i),15);return{text:this.text,data:t.getEncoding("ÿ")+r+t.getEncoding(i)+t.getEncoding(n)+t.getEncoding("ÿ")+"1"}}}],[{key:"getEncoding",value:function(e){return Ui.BINARIES[t.symbolValue(e)]}},{key:"getSymbol",value:function(t){return Ui.SYMBOLS[t]}},{key:"symbolValue",value:function(t){return Ui.SYMBOLS.indexOf(t)}},{key:"checksum",value:function(e,r){var i=e.slice().reverse().reduce(function(e,i,n){var o=n%r+1;return e+t.symbolValue(i)*o},0);return t.getSymbol(i%47)}}]),t}();Li.default=Vi;var zi={};Object.defineProperty(zi,"__esModule",{value:!0});var ji=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Gi=function(t){return t&&t.__esModule?t:{default:t}}(Li);var Xi=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Gi.default),ji(t,[{key:"valid",value:function(){return/^[\x00-\x7f]+$/.test(this.data)}}]),t}();zi.default=Xi,Object.defineProperty(Bi,"__esModule",{value:!0}),Bi.CODE93FullASCII=Bi.CODE93=void 0;var Wi=Zi(Li),Yi=Zi(zi);function Zi(t){return t&&t.__esModule?t:{default:t}}Bi.CODE93=Wi.default,Bi.CODE93FullASCII=Yi.default;var qi={};Object.defineProperty(qi,"__esModule",{value:!0}),qi.GenericBarcode=void 0;var Ki=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),Qi=function(t){return t&&t.__esModule?t:{default:t}}(It);var Ji=function(){function t(e,r){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,r))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(t,Qi.default),Ki(t,[{key:"encode",value:function(){return{data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function(){return!0}}]),t}();qi.GenericBarcode=Ji,Object.defineProperty(At,"__esModule",{value:!0});var tn=St,en=Bt,rn=Re,nn=Fr,on=Jr,sn=xi,an=Di,ln=Bi,cn=qi;At.default={CODE39:tn.CODE39,CODE128:en.CODE128,CODE128A:en.CODE128A,CODE128B:en.CODE128B,CODE128C:en.CODE128C,EAN13:rn.EAN13,EAN8:rn.EAN8,EAN5:rn.EAN5,EAN2:rn.EAN2,UPC:rn.UPC,UPCE:rn.UPCE,ITF14:nn.ITF14,ITF:nn.ITF,MSI:on.MSI,MSI10:on.MSI10,MSI11:on.MSI11,MSI1010:on.MSI1010,MSI1110:on.MSI1110,pharmacode:sn.pharmacode,codabar:an.codabar,CODE93:ln.CODE93,CODE93FullASCII:ln.CODE93FullASCII,GenericBarcode:cn.GenericBarcode};var dn={};Object.defineProperty(dn,"__esModule",{value:!0});var hn=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t};dn.default=function(t,e){return hn({},t,e)};var un={};Object.defineProperty(un,"__esModule",{value:!0}),un.default=function(t){var e=[];return function t(r){if(Array.isArray(r))for(var i=0;i<r.length;i++)t(r[i]);else r.text=r.text||"",r.data=r.data||"",e.push(r)}(t),e};var pn={};Object.defineProperty(pn,"__esModule",{value:!0}),pn.default=function(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t};var fn={},gn={},mn={};Object.defineProperty(mn,"__esModule",{value:!0}),mn.default=function(t){var e=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var r in e)e.hasOwnProperty(r)&&"string"==typeof t[r=e[r]]&&(t[r]=parseInt(t[r],10));"string"==typeof t.displayValue&&(t.displayValue="false"!=t.displayValue);return t};var wn={};Object.defineProperty(wn,"__esModule",{value:!0});var bn={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(){}};wn.default=bn,Object.defineProperty(gn,"__esModule",{value:!0});var yn=En(mn),_n=En(wn);function En(t){return t&&t.__esModule?t:{default:t}}gn.default=function(t){var e={};for(var r in _n.default)_n.default.hasOwnProperty(r)&&(t.hasAttribute("jsbarcode-"+r.toLowerCase())&&(e[r]=t.getAttribute("jsbarcode-"+r.toLowerCase())),t.hasAttribute("data-"+r.toLowerCase())&&(e[r]=t.getAttribute("data-"+r.toLowerCase())));return e.value=t.getAttribute("jsbarcode-value")||t.getAttribute("data-value"),e=(0,yn.default)(e)};var Cn={},vn={},An={};Object.defineProperty(An,"__esModule",{value:!0}),An.getTotalWidthOfEncodings=An.calculateEncodingAttributes=An.getBarcodePadding=An.getEncodingHeight=An.getMaximumHeightOfEncodings=void 0;var Sn=function(t){return t&&t.__esModule?t:{default:t}}(dn);function In(t,e){return e.height+(e.displayValue&&t.text.length>0?e.fontSize+e.textMargin:0)+e.marginTop+e.marginBottom}function Tn(t,e,r){if(r.displayValue&&e<t){if("center"==r.textAlign)return Math.floor((t-e)/2);if("left"==r.textAlign)return 0;if("right"==r.textAlign)return Math.floor(t-e)}return 0}function xn(t,e,r){var i;if(r)i=r;else{if("undefined"==typeof document)return 0;i=document.createElement("canvas").getContext("2d")}i.font=e.fontOptions+" "+e.fontSize+"px "+e.font;var n=i.measureText(t);return n?n.width:0}An.getMaximumHeightOfEncodings=function(t){for(var e=0,r=0;r<t.length;r++)t[r].height>e&&(e=t[r].height);return e},An.getEncodingHeight=In,An.getBarcodePadding=Tn,An.calculateEncodingAttributes=function(t,e,r){for(var i=0;i<t.length;i++){var n,o=t[i],s=(0,Sn.default)(e,o.options);n=s.displayValue?xn(o.text,s,r):0;var a=o.data.length*s.width;o.width=Math.ceil(Math.max(n,a)),o.height=In(o,s),o.barcodePadding=Tn(n,a,s)}},An.getTotalWidthOfEncodings=function(t){for(var e=0,r=0;r<t.length;r++)e+=t[r].width;return e},Object.defineProperty(vn,"__esModule",{value:!0});var Rn=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),On=function(t){return t&&t.__esModule?t:{default:t}}(dn),Nn=An;var Dn=function(){function t(e,r,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.canvas=e,this.encodings=r,this.options=i}return Rn(t,[{key:"render",value:function(){if(!this.canvas.getContext)throw new Error("The browser does not support canvas.");this.prepareCanvas();for(var t=0;t<this.encodings.length;t++){var e=(0,On.default)(this.options,this.encodings[t].options);this.drawCanvasBarcode(e,this.encodings[t]),this.drawCanvasText(e,this.encodings[t]),this.moveCanvasDrawing(this.encodings[t])}this.restoreCanvas()}},{key:"prepareCanvas",value:function(){var t=this.canvas.getContext("2d");t.save(),(0,Nn.calculateEncodingAttributes)(this.encodings,this.options,t);var e=(0,Nn.getTotalWidthOfEncodings)(this.encodings),r=(0,Nn.getMaximumHeightOfEncodings)(this.encodings);this.canvas.width=e+this.options.marginLeft+this.options.marginRight,this.canvas.height=r,t.clearRect(0,0,this.canvas.width,this.canvas.height),this.options.background&&(t.fillStyle=this.options.background,t.fillRect(0,0,this.canvas.width,this.canvas.height)),t.translate(this.options.marginLeft,0)}},{key:"drawCanvasBarcode",value:function(t,e){var r,i=this.canvas.getContext("2d"),n=e.data;r="top"==t.textPosition?t.marginTop+t.fontSize+t.textMargin:t.marginTop,i.fillStyle=t.lineColor;for(var o=0;o<n.length;o++){var s=o*t.width+e.barcodePadding;"1"===n[o]?i.fillRect(s,r,t.width,t.height):n[o]&&i.fillRect(s,r,t.width,t.height*n[o])}}},{key:"drawCanvasText",value:function(t,e){var r,i,n=this.canvas.getContext("2d"),o=t.fontOptions+" "+t.fontSize+"px "+t.font;t.displayValue&&(i="top"==t.textPosition?t.marginTop+t.fontSize-t.textMargin:t.height+t.textMargin+t.marginTop+t.fontSize,n.font=o,"left"==t.textAlign||e.barcodePadding>0?(r=0,n.textAlign="left"):"right"==t.textAlign?(r=e.width-1,n.textAlign="right"):(r=e.width/2,n.textAlign="center"),n.fillText(e.text,r,i))}},{key:"moveCanvasDrawing",value:function(t){this.canvas.getContext("2d").translate(t.width,0)}},{key:"restoreCanvas",value:function(){this.canvas.getContext("2d").restore()}}]),t}();vn.default=Dn;var Pn={};Object.defineProperty(Pn,"__esModule",{value:!0});var Mn=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}(),kn=function(t){return t&&t.__esModule?t:{default:t}}(dn),Bn=An;var Ln="http://www.w3.org/2000/svg",Fn=function(){function t(e,r,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.svg=e,this.encodings=r,this.options=i,this.document=i.xmlDocument||document}return Mn(t,[{key:"render",value:function(){var t=this.options.marginLeft;this.prepareSVG();for(var e=0;e<this.encodings.length;e++){var r=this.encodings[e],i=(0,kn.default)(this.options,r.options),n=this.createGroup(t,i.marginTop,this.svg);this.setGroupOptions(n,i),this.drawSvgBarcode(n,i,r),this.drawSVGText(n,i,r),t+=r.width}}},{key:"prepareSVG",value:function(){for(;this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);(0,Bn.calculateEncodingAttributes)(this.encodings,this.options);var t=(0,Bn.getTotalWidthOfEncodings)(this.encodings),e=(0,Bn.getMaximumHeightOfEncodings)(this.encodings),r=t+this.options.marginLeft+this.options.marginRight;this.setSvgAttributes(r,e),this.options.background&&this.drawRect(0,0,r,e,this.svg).setAttribute("fill",this.options.background)}},{key:"drawSvgBarcode",value:function(t,e,r){var i,n=r.data;i="top"==e.textPosition?e.fontSize+e.textMargin:0;for(var o=0,s=0,a=0;a<n.length;a++)s=a*e.width+r.barcodePadding,"1"===n[a]?o++:o>0&&(this.drawRect(s-e.width*o,i,e.width*o,e.height,t),o=0);o>0&&this.drawRect(s-e.width*(o-1),i,e.width*o,e.height,t)}},{key:"drawSVGText",value:function(t,e,r){var i,n,o=this.document.createElementNS(Ln,"text");e.displayValue&&(o.setAttribute("font-family",e.font),o.setAttribute("font-size",e.fontSize),e.fontOptions.includes("bold")&&o.setAttribute("font-weight","bold"),e.fontOptions.includes("italic")&&o.setAttribute("font-style","italic"),n="top"==e.textPosition?e.fontSize-e.textMargin:e.height+e.textMargin+e.fontSize,"left"==e.textAlign||r.barcodePadding>0?(i=0,o.setAttribute("text-anchor","start")):"right"==e.textAlign?(i=r.width-1,o.setAttribute("text-anchor","end")):(i=r.width/2,o.setAttribute("text-anchor","middle")),o.setAttribute("x",i),o.setAttribute("y",n),o.appendChild(this.document.createTextNode(r.text)),t.appendChild(o))}},{key:"setSvgAttributes",value:function(t,e){var r=this.svg;r.setAttribute("width",t+"px"),r.setAttribute("height",e+"px"),r.setAttribute("x","0px"),r.setAttribute("y","0px"),r.setAttribute("viewBox","0 0 "+t+" "+e),r.setAttribute("xmlns",Ln),r.setAttribute("version","1.1")}},{key:"createGroup",value:function(t,e,r){var i=this.document.createElementNS(Ln,"g");return i.setAttribute("transform","translate("+t+", "+e+")"),r.appendChild(i),i}},{key:"setGroupOptions",value:function(t,e){t.setAttribute("fill",e.lineColor)}},{key:"drawRect",value:function(t,e,r,i,n){var o=this.document.createElementNS(Ln,"rect");return o.setAttribute("x",t),o.setAttribute("y",e),o.setAttribute("width",r),o.setAttribute("height",i),n.appendChild(o),o}}]),t}();Pn.default=Fn;var $n={};Object.defineProperty($n,"__esModule",{value:!0});var Un=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}();var Hn=function(){function t(e,r,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.object=e,this.encodings=r,this.options=i}return Un(t,[{key:"render",value:function(){this.object.encodings=this.encodings}}]),t}();$n.default=Hn,Object.defineProperty(Cn,"__esModule",{value:!0});var Vn=Gn(vn),zn=Gn(Pn),jn=Gn($n);function Gn(t){return t&&t.__esModule?t:{default:t}}Cn.default={CanvasRenderer:Vn.default,SVGRenderer:zn.default,ObjectRenderer:jn.default};var Xn={};function Wn(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Yn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function Zn(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(Xn,"__esModule",{value:!0});var qn=function(){function t(e,r){Wn(this,t);var i=Yn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i.name="InvalidInputException",i.symbology=e,i.input=r,i.message='"'+i.input+'" is not a valid input for '+i.symbology,i}return Zn(t,Error),t}(),Kn=function(){function t(){Wn(this,t);var e=Yn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.name="InvalidElementException",e.message="Not supported type to render on",e}return Zn(t,Error),t}(),Qn=function(){function t(){Wn(this,t);var e=Yn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.name="NoElementException",e.message="No element to render on.",e}return Zn(t,Error),t}();Xn.InvalidInputException=qn,Xn.InvalidElementException=Kn,Xn.NoElementException=Qn,Object.defineProperty(fn,"__esModule",{value:!0});var Jn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},to=io(gn),eo=io(Cn),ro=Xn;function io(t){return t&&t.__esModule?t:{default:t}}function no(t){if("string"==typeof t)return function(t){var e=document.querySelectorAll(t);if(0===e.length)return;for(var r=[],i=0;i<e.length;i++)r.push(no(e[i]));return r}(t);if(Array.isArray(t)){for(var e=[],r=0;r<t.length;r++)e.push(no(t[r]));return e}if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLImageElement)return function(t){var e=document.createElement("canvas");return{element:e,options:(0,to.default)(t),renderer:eo.default.CanvasRenderer,afterRender:function(){t.setAttribute("src",e.toDataURL())}}}(t);if(t&&t.nodeName&&"svg"===t.nodeName.toLowerCase()||"undefined"!=typeof SVGElement&&t instanceof SVGElement)return{element:t,options:(0,to.default)(t),renderer:eo.default.SVGRenderer};if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement)return{element:t,options:(0,to.default)(t),renderer:eo.default.CanvasRenderer};if(t&&t.getContext)return{element:t,renderer:eo.default.CanvasRenderer};if(t&&"object"===(void 0===t?"undefined":Jn(t))&&!t.nodeName)return{element:t,renderer:eo.default.ObjectRenderer};throw new ro.InvalidElementException}fn.default=no;var oo={};Object.defineProperty(oo,"__esModule",{value:!0});var so=function(){function t(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}}();var ao=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.api=e}return so(t,[{key:"handleCatch",value:function(t){if("InvalidInputException"!==t.name)throw t;if(this.api._options.valid===this.api._defaults.valid)throw t.message;this.api._options.valid(!1),this.api.render=function(){}}},{key:"wrapBarcodeCall",value:function(t){try{var e=t.apply(void 0,arguments);return this.api._options.valid(!0),e}catch(t){return this.handleCatch(t),this.api}}}]),t}();oo.default=ao;var lo=bo(At),co=bo(dn),ho=bo(un),uo=bo(pn),po=bo(fn),fo=bo(mn),go=bo(oo),mo=Xn,wo=bo(wn);function bo(t){return t&&t.__esModule?t:{default:t}}var yo=function(){},_o=function(t,e,r){var i=new yo;if(void 0===t)throw Error("No element to render on was provided.");return i._renderProperties=(0,po.default)(t),i._encodings=[],i._options=wo.default,i._errorHandler=new go.default(i),void 0!==e&&((r=r||{}).format||(r.format=Ao()),i.options(r)[r.format](e,r).render()),i};for(var Eo in _o.getModule=function(t){return lo.default[t]},lo.default)lo.default.hasOwnProperty(Eo)&&Co(lo.default,Eo);function Co(t,e){yo.prototype[e]=yo.prototype[e.toUpperCase()]=yo.prototype[e.toLowerCase()]=function(r,i){var n=this;return n._errorHandler.wrapBarcodeCall(function(){i.text=void 0===i.text?void 0:""+i.text;var o=(0,co.default)(n._options,i);o=(0,fo.default)(o);var s=t[e],a=vo(r,s,o);return n._encodings.push(a),n})}}function vo(t,e,r){var i=new e(t=""+t,r);if(!i.valid())throw new mo.InvalidInputException(i.constructor.name,t);var n=i.encode();n=(0,ho.default)(n);for(var o=0;o<n.length;o++)n[o].options=(0,co.default)(r,n[o].options);return n}function Ao(){return lo.default.CODE128?"CODE128":Object.keys(lo.default)[0]}function So(t,e,r){e=(0,ho.default)(e);for(var i=0;i<e.length;i++)e[i].options=(0,co.default)(r,e[i].options),(0,uo.default)(e[i].options);(0,uo.default)(r),new(0,t.renderer)(t.element,e,r).render(),t.afterRender&&t.afterRender()}yo.prototype.options=function(t){return this._options=(0,co.default)(this._options,t),this},yo.prototype.blank=function(t){var e=new Array(t+1).join("0");return this._encodings.push({data:e}),this},yo.prototype.init=function(){var t;if(this._renderProperties)for(var e in Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]),this._renderProperties){t=this._renderProperties[e];var r=(0,co.default)(this._options,t.options);"auto"==r.format&&(r.format=Ao()),this._errorHandler.wrapBarcodeCall(function(){var e=vo(r.value,lo.default[r.format.toUpperCase()],r);So(t,e,r)})}},yo.prototype.render=function(){if(!this._renderProperties)throw new mo.NoElementException;if(Array.isArray(this._renderProperties))for(var t=0;t<this._renderProperties.length;t++)So(this._renderProperties[t],this._encodings,this._options);else So(this._renderProperties,this._encodings,this._options);return this},yo.prototype._defaults=wo.default,"undefined"!=typeof window&&(window.JsBarcode=_o),"undefined"!=typeof jQuery&&(jQuery.fn.JsBarcode=function(t,e){var r=[];return jQuery(this).each(function(){r.push(this)}),_o(r,t,e)});var Io,To=vt(_o);!function(t){t[t.QR_CODE=0]="QR_CODE",t[t.AZTEC=1]="AZTEC",t[t.CODABAR=2]="CODABAR",t[t.CODE_39=3]="CODE_39",t[t.CODE_93=4]="CODE_93",t[t.CODE_128=5]="CODE_128",t[t.DATA_MATRIX=6]="DATA_MATRIX",t[t.MAXICODE=7]="MAXICODE",t[t.ITF=8]="ITF",t[t.EAN_13=9]="EAN_13",t[t.EAN_8=10]="EAN_8",t[t.PDF_417=11]="PDF_417",t[t.RSS_14=12]="RSS_14",t[t.RSS_EXPANDED=13]="RSS_EXPANDED",t[t.UPC_A=14]="UPC_A",t[t.UPC_E=15]="UPC_E",t[t.UPC_EAN_EXTENSION=16]="UPC_EAN_EXTENSION"}(Io||(Io={}));var xo,Ro,Oo=new Map([[Io.QR_CODE,"QR_CODE"],[Io.AZTEC,"AZTEC"],[Io.CODABAR,"CODABAR"],[Io.CODE_39,"CODE_39"],[Io.CODE_93,"CODE_93"],[Io.CODE_128,"CODE_128"],[Io.DATA_MATRIX,"DATA_MATRIX"],[Io.MAXICODE,"MAXICODE"],[Io.ITF,"ITF"],[Io.EAN_13,"EAN_13"],[Io.EAN_8,"EAN_8"],[Io.PDF_417,"PDF_417"],[Io.RSS_14,"RSS_14"],[Io.RSS_EXPANDED,"RSS_EXPANDED"],[Io.UPC_A,"UPC_A"],[Io.UPC_E,"UPC_E"],[Io.UPC_EAN_EXTENSION,"UPC_EAN_EXTENSION"]]);function No(t){return Object.values(Io).includes(t)}!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.URL=1]="URL"}(xo||(xo={})),function(t){t[t.SCAN_TYPE_CAMERA=0]="SCAN_TYPE_CAMERA",t[t.SCAN_TYPE_FILE=1]="SCAN_TYPE_FILE"}(Ro||(Ro={}));var Do,Po=function(){function t(){}return t.GITHUB_PROJECT_URL="https://github.com/mebjas/html5-qrcode",t.SCAN_DEFAULT_FPS=2,t.DEFAULT_DISABLE_FLIP=!1,t.DEFAULT_REMEMBER_LAST_CAMERA_USED=!0,t.DEFAULT_SUPPORTED_SCAN_TYPE=[Ro.SCAN_TYPE_CAMERA,Ro.SCAN_TYPE_FILE],t}(),Mo=function(){function t(t,e){this.format=t,this.formatName=e}return t.prototype.toString=function(){return this.formatName},t.create=function(e){if(!Oo.has(e))throw"".concat(e," not in html5QrcodeSupportedFormatsTextMap");return new t(e,Oo.get(e))},t}(),ko=function(){function t(){}return t.createFromText=function(t){return{decodedText:t,result:{text:t}}},t.createFromQrcodeResult=function(t){return{decodedText:t.text,result:t}},t}();!function(t){t[t.UNKWOWN_ERROR=0]="UNKWOWN_ERROR",t[t.IMPLEMENTATION_ERROR=1]="IMPLEMENTATION_ERROR",t[t.NO_CODE_FOUND_ERROR=2]="NO_CODE_FOUND_ERROR"}(Do||(Do={}));var Bo=function(){function t(){}return t.createFrom=function(t){return{errorMessage:t,type:Do.UNKWOWN_ERROR}},t}(),Lo=function(){function t(t){this.verbose=t}return t.prototype.log=function(t){this.verbose&&console.log(t)},t.prototype.warn=function(t){this.verbose&&console.warn(t)},t.prototype.logError=function(t,e){(this.verbose||!0===e)&&console.error(t)},t.prototype.logErrors=function(t){if(0===t.length)throw"Logger#logError called without arguments";this.verbose&&console.error(t)},t}();function Fo(t){return null==t}var $o=function(){function t(){}return t.codeParseError=function(t){return"QR code parse error, error = ".concat(t)},t.errorGettingUserMedia=function(t){return"Error getting userMedia, error = ".concat(t)},t.onlyDeviceSupportedError=function(){return"The device doesn't support navigator.mediaDevices , only supported cameraIdOrConfig in this case is deviceId parameter (string)."},t.cameraStreamingNotSupported=function(){return"Camera streaming not supported by the browser."},t.unableToQuerySupportedDevices=function(){return"Unable to query supported devices, unknown error."},t.insecureContextCameraQueryError=function(){return"Camera access is only supported in secure context like https or localhost."},t.scannerPaused=function(){return"Scanner paused"},t}(),Uo=function(){function t(){}return t.isMediaStreamConstraintsValid=function(t,e){if("object"!=typeof t){var r=typeof t;return e.logError("videoConstraints should be of type object, the "+"object passed is of type ".concat(r,"."),!0),!1}for(var i=new Set(["autoGainControl","channelCount","echoCancellation","latency","noiseSuppression","sampleRate","sampleSize","volume"]),n=0,o=Object.keys(t);n<o.length;n++){var s=o[n];if(i.has(s))return e.logError("".concat(s," is not supported videoConstaints."),!0),!1}return!0},t}(),Ho={exports:{}};!function(t){function e(t){return null==t}var r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])};function i(t,e){function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}function n(t,e){var r=Object.setPrototypeOf;r?r(t,e):t.__proto__=e}function o(t,e){void 0===e&&(e=t.constructor);var r=Error.captureStackTrace;r&&r(t,e)}var s,a=function(t){function e(e){var r=this.constructor,i=t.call(this,e)||this;return Object.defineProperty(i,"name",{value:r.name,enumerable:!1}),n(i,r.prototype),o(i),i}return i(e,t),e}(Error);class l extends a{constructor(t=void 0){super(t),this.message=t}getKind(){return this.constructor.kind}}l.kind="Exception";class c extends l{}c.kind="ArgumentException";class d extends l{}d.kind="IllegalArgumentException";class h{constructor(t){if(this.binarizer=t,null===t)throw new d("Binarizer must be non-null.")}getWidth(){return this.binarizer.getWidth()}getHeight(){return this.binarizer.getHeight()}getBlackRow(t,e){return this.binarizer.getBlackRow(t,e)}getBlackMatrix(){return null!==this.matrix&&void 0!==this.matrix||(this.matrix=this.binarizer.getBlackMatrix()),this.matrix}isCropSupported(){return this.binarizer.getLuminanceSource().isCropSupported()}crop(t,e,r,i){const n=this.binarizer.getLuminanceSource().crop(t,e,r,i);return new h(this.binarizer.createBinarizer(n))}isRotateSupported(){return this.binarizer.getLuminanceSource().isRotateSupported()}rotateCounterClockwise(){const t=this.binarizer.getLuminanceSource().rotateCounterClockwise();return new h(this.binarizer.createBinarizer(t))}rotateCounterClockwise45(){const t=this.binarizer.getLuminanceSource().rotateCounterClockwise45();return new h(this.binarizer.createBinarizer(t))}toString(){try{return this.getBlackMatrix().toString()}catch(t){return""}}}class u extends l{static getChecksumInstance(){return new u}}u.kind="ChecksumException";class p{constructor(t){this.source=t}getLuminanceSource(){return this.source}getWidth(){return this.source.getWidth()}getHeight(){return this.source.getHeight()}}class f{static arraycopy(t,e,r,i,n){for(;n--;)r[i++]=t[e++]}static currentTimeMillis(){return Date.now()}}class g extends l{}g.kind="IndexOutOfBoundsException";class m extends g{constructor(t=void 0,e=void 0){super(e),this.index=t,this.message=e}}m.kind="ArrayIndexOutOfBoundsException";class w{static fill(t,e){for(let r=0,i=t.length;r<i;r++)t[r]=e}static fillWithin(t,e,r,i){w.rangeCheck(t.length,e,r);for(let n=e;n<r;n++)t[n]=i}static rangeCheck(t,e,r){if(e>r)throw new d("fromIndex("+e+") > toIndex("+r+")");if(e<0)throw new m(e);if(r>t)throw new m(r)}static asList(...t){return t}static create(t,e,r){return Array.from({length:t}).map(t=>Array.from({length:e}).fill(r))}static createInt32Array(t,e,r){return Array.from({length:t}).map(t=>Int32Array.from({length:e}).fill(r))}static equals(t,e){if(!t)return!1;if(!e)return!1;if(!t.length)return!1;if(!e.length)return!1;if(t.length!==e.length)return!1;for(let r=0,i=t.length;r<i;r++)if(t[r]!==e[r])return!1;return!0}static hashCode(t){if(null===t)return 0;let e=1;for(const r of t)e=31*e+r;return e}static fillUint8Array(t,e){for(let r=0;r!==t.length;r++)t[r]=e}static copyOf(t,e){return t.slice(0,e)}static copyOfUint8Array(t,e){if(t.length<=e){const r=new Uint8Array(e);return r.set(t),r}return t.slice(0,e)}static copyOfRange(t,e,r){const i=r-e,n=new Int32Array(i);return f.arraycopy(t,e,n,0,i),n}static binarySearch(t,e,r){void 0===r&&(r=w.numberComparator);let i=0,n=t.length-1;for(;i<=n;){const o=n+i>>1,s=r(e,t[o]);if(s>0)i=o+1;else{if(!(s<0))return o;n=o-1}}return-i-1}static numberComparator(t,e){return t-e}}class b{static numberOfTrailingZeros(t){let e;if(0===t)return 32;let r=31;return e=t<<16,0!==e&&(r-=16,t=e),e=t<<8,0!==e&&(r-=8,t=e),e=t<<4,0!==e&&(r-=4,t=e),e=t<<2,0!==e&&(r-=2,t=e),r-(t<<1>>>31)}static numberOfLeadingZeros(t){if(0===t)return 32;let e=1;return t>>>16==0&&(e+=16,t<<=16),t>>>24==0&&(e+=8,t<<=8),t>>>28==0&&(e+=4,t<<=4),t>>>30==0&&(e+=2,t<<=2),e-=t>>>31,e}static toHexString(t){return t.toString(16)}static toBinaryString(t){return String(parseInt(String(t),2))}static bitCount(t){return t=(t=(858993459&(t-=t>>>1&1431655765))+(t>>>2&858993459))+(t>>>4)&252645135,t+=t>>>8,63&(t+=t>>>16)}static truncDivision(t,e){return Math.trunc(t/e)}static parseInt(t,e=void 0){return parseInt(t,e)}}b.MIN_VALUE_32_BITS=-2147483648,b.MAX_VALUE=Number.MAX_SAFE_INTEGER;class y{constructor(t,e){void 0===t?(this.size=0,this.bits=new Int32Array(1)):(this.size=t,this.bits=null==e?y.makeArray(t):e)}getSize(){return this.size}getSizeInBytes(){return Math.floor((this.size+7)/8)}ensureCapacity(t){if(t>32*this.bits.length){const e=y.makeArray(t);f.arraycopy(this.bits,0,e,0,this.bits.length),this.bits=e}}get(t){return!!(this.bits[Math.floor(t/32)]&1<<(31&t))}set(t){this.bits[Math.floor(t/32)]|=1<<(31&t)}flip(t){this.bits[Math.floor(t/32)]^=1<<(31&t)}getNextSet(t){const e=this.size;if(t>=e)return e;const r=this.bits;let i=Math.floor(t/32),n=r[i];n&=~((1<<(31&t))-1);const o=r.length;for(;0===n;){if(++i===o)return e;n=r[i]}const s=32*i+b.numberOfTrailingZeros(n);return s>e?e:s}getNextUnset(t){const e=this.size;if(t>=e)return e;const r=this.bits;let i=Math.floor(t/32),n=~r[i];n&=~((1<<(31&t))-1);const o=r.length;for(;0===n;){if(++i===o)return e;n=~r[i]}const s=32*i+b.numberOfTrailingZeros(n);return s>e?e:s}setBulk(t,e){this.bits[Math.floor(t/32)]=e}setRange(t,e){if(e<t||t<0||e>this.size)throw new d;if(e===t)return;e--;const r=Math.floor(t/32),i=Math.floor(e/32),n=this.bits;for(let o=r;o<=i;o++){const s=(2<<(o<i?31:31&e))-(1<<(o>r?0:31&t));n[o]|=s}}clear(){const t=this.bits.length,e=this.bits;for(let r=0;r<t;r++)e[r]=0}isRange(t,e,r){if(e<t||t<0||e>this.size)throw new d;if(e===t)return!0;e--;const i=Math.floor(t/32),n=Math.floor(e/32),o=this.bits;for(let s=i;s<=n;s++){const a=(2<<(s<n?31:31&e))-(1<<(s>i?0:31&t))&4294967295;if((o[s]&a)!==(r?a:0))return!1}return!0}appendBit(t){this.ensureCapacity(this.size+1),t&&(this.bits[Math.floor(this.size/32)]|=1<<(31&this.size)),this.size++}appendBits(t,e){if(e<0||e>32)throw new d("Num bits must be between 0 and 32");this.ensureCapacity(this.size+e);for(let r=e;r>0;r--)this.appendBit(1==(t>>r-1&1))}appendBitArray(t){const e=t.size;this.ensureCapacity(this.size+e);for(let r=0;r<e;r++)this.appendBit(t.get(r))}xor(t){if(this.size!==t.size)throw new d("Sizes don't match");const e=this.bits;for(let r=0,i=e.length;r<i;r++)e[r]^=t.bits[r]}toBytes(t,e,r,i){for(let n=0;n<i;n++){let i=0;for(let e=0;e<8;e++)this.get(t)&&(i|=1<<7-e),t++;e[r+n]=i}}getBitArray(){return this.bits}reverse(){const t=new Int32Array(this.bits.length),e=Math.floor((this.size-1)/32),r=e+1,i=this.bits;for(let n=0;n<r;n++){let r=i[n];r=r>>1&1431655765|(1431655765&r)<<1,r=r>>2&858993459|(858993459&r)<<2,r=r>>4&252645135|(252645135&r)<<4,r=r>>8&16711935|(16711935&r)<<8,r=r>>16&65535|(65535&r)<<16,t[e-n]=r}if(this.size!==32*r){const e=32*r-this.size;let i=t[0]>>>e;for(let n=1;n<r;n++){const r=t[n];i|=r<<32-e,t[n-1]=i,i=r>>>e}t[r-1]=i}this.bits=t}static makeArray(t){return new Int32Array(Math.floor((t+31)/32))}equals(t){if(!(t instanceof y))return!1;const e=t;return this.size===e.size&&w.equals(this.bits,e.bits)}hashCode(){return 31*this.size+w.hashCode(this.bits)}toString(){let t="";for(let e=0,r=this.size;e<r;e++)7&e||(t+=" "),t+=this.get(e)?"X":".";return t}clone(){return new y(this.size,this.bits.slice())}}!function(t){t[t.OTHER=0]="OTHER",t[t.PURE_BARCODE=1]="PURE_BARCODE",t[t.POSSIBLE_FORMATS=2]="POSSIBLE_FORMATS",t[t.TRY_HARDER=3]="TRY_HARDER",t[t.CHARACTER_SET=4]="CHARACTER_SET",t[t.ALLOWED_LENGTHS=5]="ALLOWED_LENGTHS",t[t.ASSUME_CODE_39_CHECK_DIGIT=6]="ASSUME_CODE_39_CHECK_DIGIT",t[t.ASSUME_GS1=7]="ASSUME_GS1",t[t.RETURN_CODABAR_START_END=8]="RETURN_CODABAR_START_END",t[t.NEED_RESULT_POINT_CALLBACK=9]="NEED_RESULT_POINT_CALLBACK",t[t.ALLOWED_EAN_EXTENSIONS=10]="ALLOWED_EAN_EXTENSIONS"}(s||(s={}));var _,E=s;class C extends l{static getFormatInstance(){return new C}}C.kind="FormatException",function(t){t[t.Cp437=0]="Cp437",t[t.ISO8859_1=1]="ISO8859_1",t[t.ISO8859_2=2]="ISO8859_2",t[t.ISO8859_3=3]="ISO8859_3",t[t.ISO8859_4=4]="ISO8859_4",t[t.ISO8859_5=5]="ISO8859_5",t[t.ISO8859_6=6]="ISO8859_6",t[t.ISO8859_7=7]="ISO8859_7",t[t.ISO8859_8=8]="ISO8859_8",t[t.ISO8859_9=9]="ISO8859_9",t[t.ISO8859_10=10]="ISO8859_10",t[t.ISO8859_11=11]="ISO8859_11",t[t.ISO8859_13=12]="ISO8859_13",t[t.ISO8859_14=13]="ISO8859_14",t[t.ISO8859_15=14]="ISO8859_15",t[t.ISO8859_16=15]="ISO8859_16",t[t.SJIS=16]="SJIS",t[t.Cp1250=17]="Cp1250",t[t.Cp1251=18]="Cp1251",t[t.Cp1252=19]="Cp1252",t[t.Cp1256=20]="Cp1256",t[t.UnicodeBigUnmarked=21]="UnicodeBigUnmarked",t[t.UTF8=22]="UTF8",t[t.ASCII=23]="ASCII",t[t.Big5=24]="Big5",t[t.GB18030=25]="GB18030",t[t.EUC_KR=26]="EUC_KR"}(_||(_={}));class v{constructor(t,e,r,...i){this.valueIdentifier=t,this.name=r,this.values="number"==typeof e?Int32Array.from([e]):e,this.otherEncodingNames=i,v.VALUE_IDENTIFIER_TO_ECI.set(t,this),v.NAME_TO_ECI.set(r,this);const n=this.values;for(let t=0,e=n.length;t!==e;t++){const e=n[t];v.VALUES_TO_ECI.set(e,this)}for(const t of i)v.NAME_TO_ECI.set(t,this)}getValueIdentifier(){return this.valueIdentifier}getName(){return this.name}getValue(){return this.values[0]}static getCharacterSetECIByValue(t){if(t<0||t>=900)throw new C("incorect value");const e=v.VALUES_TO_ECI.get(t);if(void 0===e)throw new C("incorect value");return e}static getCharacterSetECIByName(t){const e=v.NAME_TO_ECI.get(t);if(void 0===e)throw new C("incorect value");return e}equals(t){if(!(t instanceof v))return!1;const e=t;return this.getName()===e.getName()}}v.VALUE_IDENTIFIER_TO_ECI=new Map,v.VALUES_TO_ECI=new Map,v.NAME_TO_ECI=new Map,v.Cp437=new v(_.Cp437,Int32Array.from([0,2]),"Cp437"),v.ISO8859_1=new v(_.ISO8859_1,Int32Array.from([1,3]),"ISO-8859-1","ISO88591","ISO8859_1"),v.ISO8859_2=new v(_.ISO8859_2,4,"ISO-8859-2","ISO88592","ISO8859_2"),v.ISO8859_3=new v(_.ISO8859_3,5,"ISO-8859-3","ISO88593","ISO8859_3"),v.ISO8859_4=new v(_.ISO8859_4,6,"ISO-8859-4","ISO88594","ISO8859_4"),v.ISO8859_5=new v(_.ISO8859_5,7,"ISO-8859-5","ISO88595","ISO8859_5"),v.ISO8859_6=new v(_.ISO8859_6,8,"ISO-8859-6","ISO88596","ISO8859_6"),v.ISO8859_7=new v(_.ISO8859_7,9,"ISO-8859-7","ISO88597","ISO8859_7"),v.ISO8859_8=new v(_.ISO8859_8,10,"ISO-8859-8","ISO88598","ISO8859_8"),v.ISO8859_9=new v(_.ISO8859_9,11,"ISO-8859-9","ISO88599","ISO8859_9"),v.ISO8859_10=new v(_.ISO8859_10,12,"ISO-8859-10","ISO885910","ISO8859_10"),v.ISO8859_11=new v(_.ISO8859_11,13,"ISO-8859-11","ISO885911","ISO8859_11"),v.ISO8859_13=new v(_.ISO8859_13,15,"ISO-8859-13","ISO885913","ISO8859_13"),v.ISO8859_14=new v(_.ISO8859_14,16,"ISO-8859-14","ISO885914","ISO8859_14"),v.ISO8859_15=new v(_.ISO8859_15,17,"ISO-8859-15","ISO885915","ISO8859_15"),v.ISO8859_16=new v(_.ISO8859_16,18,"ISO-8859-16","ISO885916","ISO8859_16"),v.SJIS=new v(_.SJIS,20,"SJIS","Shift_JIS"),v.Cp1250=new v(_.Cp1250,21,"Cp1250","windows-1250"),v.Cp1251=new v(_.Cp1251,22,"Cp1251","windows-1251"),v.Cp1252=new v(_.Cp1252,23,"Cp1252","windows-1252"),v.Cp1256=new v(_.Cp1256,24,"Cp1256","windows-1256"),v.UnicodeBigUnmarked=new v(_.UnicodeBigUnmarked,25,"UnicodeBigUnmarked","UTF-16BE","UnicodeBig"),v.UTF8=new v(_.UTF8,26,"UTF8","UTF-8"),v.ASCII=new v(_.ASCII,Int32Array.from([27,170]),"ASCII","US-ASCII"),v.Big5=new v(_.Big5,28,"Big5"),v.GB18030=new v(_.GB18030,29,"GB18030","GB2312","EUC_CN","GBK"),v.EUC_KR=new v(_.EUC_KR,30,"EUC_KR","EUC-KR");class A extends l{}A.kind="UnsupportedOperationException";class S{static decode(t,e){const r=this.encodingName(e);return this.customDecoder?this.customDecoder(t,r):"undefined"==typeof TextDecoder||this.shouldDecodeOnFallback(r)?this.decodeFallback(t,r):new TextDecoder(r).decode(t)}static shouldDecodeOnFallback(t){return!S.isBrowser()&&"ISO-8859-1"===t}static encode(t,e){const r=this.encodingName(e);return this.customEncoder?this.customEncoder(t,r):"undefined"==typeof TextEncoder?this.encodeFallback(t):(new TextEncoder).encode(t)}static isBrowser(){return"undefined"!=typeof window&&"[object Window]"==={}.toString.call(window)}static encodingName(t){return"string"==typeof t?t:t.getName()}static encodingCharacterSet(t){return t instanceof v?t:v.getCharacterSetECIByName(t)}static decodeFallback(t,e){const r=this.encodingCharacterSet(e);if(S.isDecodeFallbackSupported(r)){let e="";for(let r=0,i=t.length;r<i;r++){let i=t[r].toString(16);i.length<2&&(i="0"+i),e+="%"+i}return decodeURIComponent(e)}if(r.equals(v.UnicodeBigUnmarked))return String.fromCharCode.apply(null,new Uint16Array(t.buffer));throw new A(`Encoding ${this.encodingName(e)} not supported by fallback.`)}static isDecodeFallbackSupported(t){return t.equals(v.UTF8)||t.equals(v.ISO8859_1)||t.equals(v.ASCII)}static encodeFallback(t){const e=btoa(unescape(encodeURIComponent(t))).split(""),r=[];for(let t=0;t<e.length;t++)r.push(e[t].charCodeAt(0));return new Uint8Array(r)}}class I{static castAsNonUtf8Char(t,e=null){const r=e?e.getName():this.ISO88591;return S.decode(new Uint8Array([t]),r)}static guessEncoding(t,e){if(null!=e&&void 0!==e.get(E.CHARACTER_SET))return e.get(E.CHARACTER_SET).toString();const r=t.length;let i=!0,n=!0,o=!0,s=0,a=0,l=0,c=0,d=0,h=0,u=0,p=0,f=0,g=0,m=0;const w=t.length>3&&239===t[0]&&187===t[1]&&191===t[2];for(let e=0;e<r&&(i||n||o);e++){const r=255&t[e];o&&(s>0?128&r?s--:o=!1:128&r&&(64&r?(s++,32&r?(s++,16&r?(s++,8&r?o=!1:c++):l++):a++):o=!1)),i&&(r>127&&r<160?i=!1:r>159&&(r<192||215===r||247===r)&&m++),n&&(d>0?r<64||127===r||r>252?n=!1:d--:128===r||160===r||r>239?n=!1:r>160&&r<224?(h++,p=0,u++,u>f&&(f=u)):r>127?(d++,u=0,p++,p>g&&(g=p)):(u=0,p=0))}return o&&s>0&&(o=!1),n&&d>0&&(n=!1),o&&(w||a+l+c>0)?I.UTF8:n&&(I.ASSUME_SHIFT_JIS||f>=3||g>=3)?I.SHIFT_JIS:i&&n?2===f&&2===h||10*m>=r?I.SHIFT_JIS:I.ISO88591:i?I.ISO88591:n?I.SHIFT_JIS:o?I.UTF8:I.PLATFORM_DEFAULT_ENCODING}static format(t,...e){let r=-1;function i(t,i,n,o,s,a){if("%%"===t)return"%";if(void 0===e[++r])return;t=o?parseInt(o.substr(1)):void 0;let l,c=s?parseInt(s.substr(1)):void 0;switch(a){case"s":l=e[r];break;case"c":l=e[r][0];break;case"f":l=parseFloat(e[r]).toFixed(t);break;case"p":l=parseFloat(e[r]).toPrecision(t);break;case"e":l=parseFloat(e[r]).toExponential(t);break;case"x":l=parseInt(e[r]).toString(c||16);break;case"d":l=parseFloat(parseInt(e[r],c||10).toPrecision(t)).toFixed(0)}l="object"==typeof l?JSON.stringify(l):(+l).toString(c);let d=parseInt(n),h=n&&n[0]+""=="0"?"0":" ";for(;l.length<d;)l=void 0!==i?l+h:h+l;return l}let n=/%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;return t.replace(n,i)}static getBytes(t,e){return S.encode(t,e)}static getCharCode(t,e=0){return t.charCodeAt(e)}static getCharAt(t){return String.fromCharCode(t)}}I.SHIFT_JIS=v.SJIS.getName(),I.GB2312="GB2312",I.ISO88591=v.ISO8859_1.getName(),I.EUC_JP="EUC_JP",I.UTF8=v.UTF8.getName(),I.PLATFORM_DEFAULT_ENCODING=I.UTF8,I.ASSUME_SHIFT_JIS=!1;class T{constructor(t=""){this.value=t}enableDecoding(t){return this.encoding=t,this}append(t){return"string"==typeof t?this.value+=t.toString():this.encoding?this.value+=I.castAsNonUtf8Char(t,this.encoding):this.value+=String.fromCharCode(t),this}appendChars(t,e,r){for(let i=e;e<e+r;i++)this.append(t[i]);return this}length(){return this.value.length}charAt(t){return this.value.charAt(t)}deleteCharAt(t){this.value=this.value.substr(0,t)+this.value.substring(t+1)}setCharAt(t,e){this.value=this.value.substr(0,t)+e+this.value.substr(t+1)}substring(t,e){return this.value.substring(t,e)}setLengthToZero(){this.value=""}toString(){return this.value}insert(t,e){this.value=this.value.substr(0,t)+e+this.value.substr(t+e.length)}}class x{constructor(t,e,r,i){if(this.width=t,this.height=e,this.rowSize=r,this.bits=i,null==e&&(e=t),this.height=e,t<1||e<1)throw new d("Both dimensions must be greater than 0");null==r&&(r=Math.floor((t+31)/32)),this.rowSize=r,null==i&&(this.bits=new Int32Array(this.rowSize*this.height))}static parseFromBooleanArray(t){const e=t.length,r=t[0].length,i=new x(r,e);for(let n=0;n<e;n++){const e=t[n];for(let t=0;t<r;t++)e[t]&&i.set(t,n)}return i}static parseFromString(t,e,r){if(null===t)throw new d("stringRepresentation cannot be null");const i=new Array(t.length);let n=0,o=0,s=-1,a=0,l=0;for(;l<t.length;)if("\n"===t.charAt(l)||"\r"===t.charAt(l)){if(n>o){if(-1===s)s=n-o;else if(n-o!==s)throw new d("row lengths do not match");o=n,a++}l++}else if(t.substring(l,l+e.length)===e)l+=e.length,i[n]=!0,n++;else{if(t.substring(l,l+r.length)!==r)throw new d("illegal character encountered: "+t.substring(l));l+=r.length,i[n]=!1,n++}if(n>o){if(-1===s)s=n-o;else if(n-o!==s)throw new d("row lengths do not match");a++}const c=new x(s,a);for(let t=0;t<n;t++)i[t]&&c.set(Math.floor(t%s),Math.floor(t/s));return c}get(t,e){const r=e*this.rowSize+Math.floor(t/32);return!!(this.bits[r]>>>(31&t)&1)}set(t,e){const r=e*this.rowSize+Math.floor(t/32);this.bits[r]|=1<<(31&t)&4294967295}unset(t,e){const r=e*this.rowSize+Math.floor(t/32);this.bits[r]&=~(1<<(31&t)&4294967295)}flip(t,e){const r=e*this.rowSize+Math.floor(t/32);this.bits[r]^=1<<(31&t)&4294967295}xor(t){if(this.width!==t.getWidth()||this.height!==t.getHeight()||this.rowSize!==t.getRowSize())throw new d("input matrix dimensions do not match");const e=new y(Math.floor(this.width/32)+1),r=this.rowSize,i=this.bits;for(let n=0,o=this.height;n<o;n++){const o=n*r,s=t.getRow(n,e).getBitArray();for(let t=0;t<r;t++)i[o+t]^=s[t]}}clear(){const t=this.bits,e=t.length;for(let r=0;r<e;r++)t[r]=0}setRegion(t,e,r,i){if(e<0||t<0)throw new d("Left and top must be nonnegative");if(i<1||r<1)throw new d("Height and width must be at least 1");const n=t+r,o=e+i;if(o>this.height||n>this.width)throw new d("The region must fit inside the matrix");const s=this.rowSize,a=this.bits;for(let r=e;r<o;r++){const e=r*s;for(let r=t;r<n;r++)a[e+Math.floor(r/32)]|=1<<(31&r)&4294967295}}getRow(t,e){null==e||e.getSize()<this.width?e=new y(this.width):e.clear();const r=this.rowSize,i=this.bits,n=t*r;for(let t=0;t<r;t++)e.setBulk(32*t,i[n+t]);return e}setRow(t,e){f.arraycopy(e.getBitArray(),0,this.bits,t*this.rowSize,this.rowSize)}rotate180(){const t=this.getWidth(),e=this.getHeight();let r=new y(t),i=new y(t);for(let t=0,n=Math.floor((e+1)/2);t<n;t++)r=this.getRow(t,r),i=this.getRow(e-1-t,i),r.reverse(),i.reverse(),this.setRow(t,i),this.setRow(e-1-t,r)}getEnclosingRectangle(){const t=this.width,e=this.height,r=this.rowSize,i=this.bits;let n=t,o=e,s=-1,a=-1;for(let t=0;t<e;t++)for(let e=0;e<r;e++){const l=i[t*r+e];if(0!==l){if(t<o&&(o=t),t>a&&(a=t),32*e<n){let t=0;for(;!(l<<31-t&4294967295);)t++;32*e+t<n&&(n=32*e+t)}if(32*e+31>s){let t=31;for(;l>>>t===0;)t--;32*e+t>s&&(s=32*e+t)}}}return s<n||a<o?null:Int32Array.from([n,o,s-n+1,a-o+1])}getTopLeftOnBit(){const t=this.rowSize,e=this.bits;let r=0;for(;r<e.length&&0===e[r];)r++;if(r===e.length)return null;const i=r/t;let n=r%t*32;const o=e[r];let s=0;for(;!(o<<31-s&4294967295);)s++;return n+=s,Int32Array.from([n,i])}getBottomRightOnBit(){const t=this.rowSize,e=this.bits;let r=e.length-1;for(;r>=0&&0===e[r];)r--;if(r<0)return null;const i=Math.floor(r/t);let n=32*Math.floor(r%t);const o=e[r];let s=31;for(;o>>>s===0;)s--;return n+=s,Int32Array.from([n,i])}getWidth(){return this.width}getHeight(){return this.height}getRowSize(){return this.rowSize}equals(t){if(!(t instanceof x))return!1;const e=t;return this.width===e.width&&this.height===e.height&&this.rowSize===e.rowSize&&w.equals(this.bits,e.bits)}hashCode(){let t=this.width;return t=31*t+this.width,t=31*t+this.height,t=31*t+this.rowSize,t=31*t+w.hashCode(this.bits),t}toString(t="X ",e="  ",r="\n"){return this.buildToString(t,e,r)}buildToString(t,e,r){let i=new T;for(let n=0,o=this.height;n<o;n++){for(let r=0,o=this.width;r<o;r++)i.append(this.get(r,n)?t:e);i.append(r)}return i.toString()}clone(){return new x(this.width,this.height,this.rowSize,this.bits.slice())}}class R extends l{static getNotFoundInstance(){return new R}}R.kind="NotFoundException";class O extends p{constructor(t){super(t),this.luminances=O.EMPTY,this.buckets=new Int32Array(O.LUMINANCE_BUCKETS)}getBlackRow(t,e){const r=this.getLuminanceSource(),i=r.getWidth();null==e||e.getSize()<i?e=new y(i):e.clear(),this.initArrays(i);const n=r.getRow(t,this.luminances),o=this.buckets;for(let t=0;t<i;t++)o[(255&n[t])>>O.LUMINANCE_SHIFT]++;const s=O.estimateBlackPoint(o);if(i<3)for(let t=0;t<i;t++)(255&n[t])<s&&e.set(t);else{let t=255&n[0],r=255&n[1];for(let o=1;o<i-1;o++){const i=255&n[o+1];(4*r-t-i)/2<s&&e.set(o),t=r,r=i}}return e}getBlackMatrix(){const t=this.getLuminanceSource(),e=t.getWidth(),r=t.getHeight(),i=new x(e,r);this.initArrays(e);const n=this.buckets;for(let i=1;i<5;i++){const o=Math.floor(r*i/5),s=t.getRow(o,this.luminances),a=Math.floor(4*e/5);for(let t=Math.floor(e/5);t<a;t++)n[(255&s[t])>>O.LUMINANCE_SHIFT]++}const o=O.estimateBlackPoint(n),s=t.getMatrix();for(let t=0;t<r;t++){const r=t*e;for(let n=0;n<e;n++)(255&s[r+n])<o&&i.set(n,t)}return i}createBinarizer(t){return new O(t)}initArrays(t){this.luminances.length<t&&(this.luminances=new Uint8ClampedArray(t));const e=this.buckets;for(let t=0;t<O.LUMINANCE_BUCKETS;t++)e[t]=0}static estimateBlackPoint(t){const e=t.length;let r=0,i=0,n=0;for(let o=0;o<e;o++)t[o]>n&&(i=o,n=t[o]),t[o]>r&&(r=t[o]);let o=0,s=0;for(let r=0;r<e;r++){const e=r-i,n=t[r]*e*e;n>s&&(o=r,s=n)}if(i>o){const t=i;i=o,o=t}if(o-i<=e/16)throw new R;let a=o-1,l=-1;for(let e=o-1;e>i;e--){const n=e-i,s=n*n*(o-e)*(r-t[e]);s>l&&(a=e,l=s)}return a<<O.LUMINANCE_SHIFT}}O.LUMINANCE_BITS=5,O.LUMINANCE_SHIFT=8-O.LUMINANCE_BITS,O.LUMINANCE_BUCKETS=1<<O.LUMINANCE_BITS,O.EMPTY=Uint8ClampedArray.from([0]);class N extends O{constructor(t){super(t),this.matrix=null}getBlackMatrix(){if(null!==this.matrix)return this.matrix;const t=this.getLuminanceSource(),e=t.getWidth(),r=t.getHeight();if(e>=N.MINIMUM_DIMENSION&&r>=N.MINIMUM_DIMENSION){const i=t.getMatrix();let n=e>>N.BLOCK_SIZE_POWER;0!==(e&N.BLOCK_SIZE_MASK)&&n++;let o=r>>N.BLOCK_SIZE_POWER;0!==(r&N.BLOCK_SIZE_MASK)&&o++;const s=N.calculateBlackPoints(i,n,o,e,r),a=new x(e,r);N.calculateThresholdForBlock(i,n,o,e,r,s,a),this.matrix=a}else this.matrix=super.getBlackMatrix();return this.matrix}createBinarizer(t){return new N(t)}static calculateThresholdForBlock(t,e,r,i,n,o,s){const a=n-N.BLOCK_SIZE,l=i-N.BLOCK_SIZE;for(let n=0;n<r;n++){let c=n<<N.BLOCK_SIZE_POWER;c>a&&(c=a);const d=N.cap(n,2,r-3);for(let r=0;r<e;r++){let n=r<<N.BLOCK_SIZE_POWER;n>l&&(n=l);const a=N.cap(r,2,e-3);let h=0;for(let t=-2;t<=2;t++){const e=o[d+t];h+=e[a-2]+e[a-1]+e[a]+e[a+1]+e[a+2]}const u=h/25;N.thresholdBlock(t,n,c,u,i,s)}}}static cap(t,e,r){return t<e?e:t>r?r:t}static thresholdBlock(t,e,r,i,n,o){for(let s=0,a=r*n+e;s<N.BLOCK_SIZE;s++,a+=n)for(let n=0;n<N.BLOCK_SIZE;n++)(255&t[a+n])<=i&&o.set(e+n,r+s)}static calculateBlackPoints(t,e,r,i,n){const o=n-N.BLOCK_SIZE,s=i-N.BLOCK_SIZE,a=new Array(r);for(let n=0;n<r;n++){a[n]=new Int32Array(e);let r=n<<N.BLOCK_SIZE_POWER;r>o&&(r=o);for(let o=0;o<e;o++){let e=o<<N.BLOCK_SIZE_POWER;e>s&&(e=s);let l=0,c=255,d=0;for(let n=0,o=r*i+e;n<N.BLOCK_SIZE;n++,o+=i){for(let e=0;e<N.BLOCK_SIZE;e++){const r=255&t[o+e];l+=r,r<c&&(c=r),r>d&&(d=r)}if(d-c>N.MIN_DYNAMIC_RANGE)for(n++,o+=i;n<N.BLOCK_SIZE;n++,o+=i)for(let e=0;e<N.BLOCK_SIZE;e++)l+=255&t[o+e]}let h=l>>2*N.BLOCK_SIZE_POWER;if(d-c<=N.MIN_DYNAMIC_RANGE&&(h=c/2,n>0&&o>0)){const t=(a[n-1][o]+2*a[n][o-1]+a[n-1][o-1])/4;c<t&&(h=t)}a[n][o]=h}}return a}}N.BLOCK_SIZE_POWER=3,N.BLOCK_SIZE=1<<N.BLOCK_SIZE_POWER,N.BLOCK_SIZE_MASK=N.BLOCK_SIZE-1,N.MINIMUM_DIMENSION=5*N.BLOCK_SIZE,N.MIN_DYNAMIC_RANGE=24;class D{constructor(t,e){this.width=t,this.height=e}getWidth(){return this.width}getHeight(){return this.height}isCropSupported(){return!1}crop(t,e,r,i){throw new A("This luminance source does not support cropping.")}isRotateSupported(){return!1}rotateCounterClockwise(){throw new A("This luminance source does not support rotation by 90 degrees.")}rotateCounterClockwise45(){throw new A("This luminance source does not support rotation by 45 degrees.")}toString(){const t=new Uint8ClampedArray(this.width);let e=new T;for(let r=0;r<this.height;r++){const i=this.getRow(r,t);for(let t=0;t<this.width;t++){const r=255&i[t];let n;n=r<64?"#":r<128?"+":r<192?".":" ",e.append(n)}e.append("\n")}return e.toString()}}class P extends D{constructor(t){super(t.getWidth(),t.getHeight()),this.delegate=t}getRow(t,e){const r=this.delegate.getRow(t,e),i=this.getWidth();for(let t=0;t<i;t++)r[t]=255-(255&r[t]);return r}getMatrix(){const t=this.delegate.getMatrix(),e=this.getWidth()*this.getHeight(),r=new Uint8ClampedArray(e);for(let i=0;i<e;i++)r[i]=255-(255&t[i]);return r}isCropSupported(){return this.delegate.isCropSupported()}crop(t,e,r,i){return new P(this.delegate.crop(t,e,r,i))}isRotateSupported(){return this.delegate.isRotateSupported()}invert(){return this.delegate}rotateCounterClockwise(){return new P(this.delegate.rotateCounterClockwise())}rotateCounterClockwise45(){return new P(this.delegate.rotateCounterClockwise45())}}class M extends D{constructor(t){super(t.width,t.height),this.canvas=t,this.tempCanvasElement=null,this.buffer=M.makeBufferFromCanvasImageData(t)}static makeBufferFromCanvasImageData(t){const e=t.getContext("2d").getImageData(0,0,t.width,t.height);return M.toGrayscaleBuffer(e.data,t.width,t.height)}static toGrayscaleBuffer(t,e,r){const i=new Uint8ClampedArray(e*r);for(let e=0,r=0,n=t.length;e<n;e+=4,r++){let n;n=0===t[e+3]?255:306*t[e]+601*t[e+1]+117*t[e+2]+512>>10,i[r]=n}return i}getRow(t,e){if(t<0||t>=this.getHeight())throw new d("Requested row is outside the image: "+t);const r=this.getWidth(),i=t*r;return null===e?e=this.buffer.slice(i,i+r):(e.length<r&&(e=new Uint8ClampedArray(r)),e.set(this.buffer.slice(i,i+r))),e}getMatrix(){return this.buffer}isCropSupported(){return!0}crop(t,e,r,i){return super.crop(t,e,r,i),this}isRotateSupported(){return!0}rotateCounterClockwise(){return this.rotate(-90),this}rotateCounterClockwise45(){return this.rotate(-45),this}getTempCanvasElement(){if(null===this.tempCanvasElement){const t=this.canvas.ownerDocument.createElement("canvas");t.width=this.canvas.width,t.height=this.canvas.height,this.tempCanvasElement=t}return this.tempCanvasElement}rotate(t){const e=this.getTempCanvasElement(),r=e.getContext("2d"),i=t*M.DEGREE_TO_RADIANS,n=this.canvas.width,o=this.canvas.height,s=Math.ceil(Math.abs(Math.cos(i))*n+Math.abs(Math.sin(i))*o),a=Math.ceil(Math.abs(Math.sin(i))*n+Math.abs(Math.cos(i))*o);return e.width=s,e.height=a,r.translate(s/2,a/2),r.rotate(i),r.drawImage(this.canvas,n/-2,o/-2),this.buffer=M.makeBufferFromCanvasImageData(e),this}invert(){return new P(this)}}M.DEGREE_TO_RADIANS=Math.PI/180;class k{constructor(t,e,r){this.deviceId=t,this.label=e,this.kind="videoinput",this.groupId=r||void 0}toJSON(){return{kind:this.kind,groupId:this.groupId,deviceId:this.deviceId,label:this.label}}}var B,L=(globalThis||Ct||self||window?(globalThis||Ct||self||window||void 0).__awaiter:void 0)||function(t,e,r,i){function n(t){return t instanceof r?t:new r(function(e){e(t)})}return new(r||(r=Promise))(function(r,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){t.done?r(t.value):n(t.value).then(s,a)}l((i=i.apply(t,e||[])).next())})};class F{constructor(t,e=500,r){this.reader=t,this.timeBetweenScansMillis=e,this._hints=r,this._stopContinuousDecode=!1,this._stopAsyncDecode=!1,this._timeBetweenDecodingAttempts=0}get hasNavigator(){return"undefined"!=typeof navigator}get isMediaDevicesSuported(){return this.hasNavigator&&!!navigator.mediaDevices}get canEnumerateDevices(){return!(!this.isMediaDevicesSuported||!navigator.mediaDevices.enumerateDevices)}get timeBetweenDecodingAttempts(){return this._timeBetweenDecodingAttempts}set timeBetweenDecodingAttempts(t){this._timeBetweenDecodingAttempts=t<0?0:t}set hints(t){this._hints=t||null}get hints(){return this._hints}listVideoInputDevices(){return L(this,void 0,void 0,function*(){if(!this.hasNavigator)throw new Error("Can't enumerate devices, navigator is not present.");if(!this.canEnumerateDevices)throw new Error("Can't enumerate devices, method not supported.");const t=yield navigator.mediaDevices.enumerateDevices(),e=[];for(const r of t){const t="video"===r.kind?"videoinput":r.kind;if("videoinput"!==t)continue;const i={deviceId:r.deviceId||r.id,label:r.label||`Video device ${e.length+1}`,kind:t,groupId:r.groupId};e.push(i)}return e})}getVideoInputDevices(){return L(this,void 0,void 0,function*(){return(yield this.listVideoInputDevices()).map(t=>new k(t.deviceId,t.label))})}findDeviceById(t){return L(this,void 0,void 0,function*(){const e=yield this.listVideoInputDevices();return e?e.find(e=>e.deviceId===t):null})}decodeFromInputVideoDevice(t,e){return L(this,void 0,void 0,function*(){return yield this.decodeOnceFromVideoDevice(t,e)})}decodeOnceFromVideoDevice(t,e){return L(this,void 0,void 0,function*(){let r;this.reset(),r=t?{deviceId:{exact:t}}:{facingMode:"environment"};const i={video:r};return yield this.decodeOnceFromConstraints(i,e)})}decodeOnceFromConstraints(t,e){return L(this,void 0,void 0,function*(){const r=yield navigator.mediaDevices.getUserMedia(t);return yield this.decodeOnceFromStream(r,e)})}decodeOnceFromStream(t,e){return L(this,void 0,void 0,function*(){this.reset();const r=yield this.attachStreamToVideo(t,e);return yield this.decodeOnce(r)})}decodeFromInputVideoDeviceContinuously(t,e,r){return L(this,void 0,void 0,function*(){return yield this.decodeFromVideoDevice(t,e,r)})}decodeFromVideoDevice(t,e,r){return L(this,void 0,void 0,function*(){let i;i=t?{deviceId:{exact:t}}:{facingMode:"environment"};const n={video:i};return yield this.decodeFromConstraints(n,e,r)})}decodeFromConstraints(t,e,r){return L(this,void 0,void 0,function*(){const i=yield navigator.mediaDevices.getUserMedia(t);return yield this.decodeFromStream(i,e,r)})}decodeFromStream(t,e,r){return L(this,void 0,void 0,function*(){this.reset();const i=yield this.attachStreamToVideo(t,e);return yield this.decodeContinuously(i,r)})}stopAsyncDecode(){this._stopAsyncDecode=!0}stopContinuousDecode(){this._stopContinuousDecode=!0}attachStreamToVideo(t,e){return L(this,void 0,void 0,function*(){const r=this.prepareVideoElement(e);return this.addVideoSource(r,t),this.videoElement=r,this.stream=t,yield this.playVideoOnLoadAsync(r),r})}playVideoOnLoadAsync(t){return new Promise((e,r)=>this.playVideoOnLoad(t,()=>e()))}playVideoOnLoad(t,e){this.videoEndedListener=()=>this.stopStreams(),this.videoCanPlayListener=()=>this.tryPlayVideo(t),t.addEventListener("ended",this.videoEndedListener),t.addEventListener("canplay",this.videoCanPlayListener),t.addEventListener("playing",e),this.tryPlayVideo(t)}isVideoPlaying(t){return t.currentTime>0&&!t.paused&&!t.ended&&t.readyState>2}tryPlayVideo(t){return L(this,void 0,void 0,function*(){if(this.isVideoPlaying(t))console.warn("Trying to play video that is already playing.");else try{yield t.play()}catch(t){console.warn("It was not possible to play the video.")}})}getMediaElement(t,e){const r=document.getElementById(t);if(!r)throw new c(`element with id '${t}' not found`);if(r.nodeName.toLowerCase()!==e.toLowerCase())throw new c(`element with id '${t}' must be an ${e} element`);return r}decodeFromImage(t,e){if(!t&&!e)throw new c("either imageElement with a src set or an url must be provided");return e&&!t?this.decodeFromImageUrl(e):this.decodeFromImageElement(t)}decodeFromVideo(t,e){if(!t&&!e)throw new c("Either an element with a src set or an URL must be provided");return e&&!t?this.decodeFromVideoUrl(e):this.decodeFromVideoElement(t)}decodeFromVideoContinuously(t,e,r){if(void 0===t&&void 0===e)throw new c("Either an element with a src set or an URL must be provided");return e&&!t?this.decodeFromVideoUrlContinuously(e,r):this.decodeFromVideoElementContinuously(t,r)}decodeFromImageElement(t){if(!t)throw new c("An image element must be provided.");this.reset();const e=this.prepareImageElement(t);let r;return this.imageElement=e,r=this.isImageLoaded(e)?this.decodeOnce(e,!1,!0):this._decodeOnLoadImage(e),r}decodeFromVideoElement(t){const e=this._decodeFromVideoElementSetup(t);return this._decodeOnLoadVideo(e)}decodeFromVideoElementContinuously(t,e){const r=this._decodeFromVideoElementSetup(t);return this._decodeOnLoadVideoContinuously(r,e)}_decodeFromVideoElementSetup(t){if(!t)throw new c("A video element must be provided.");this.reset();const e=this.prepareVideoElement(t);return this.videoElement=e,e}decodeFromImageUrl(t){if(!t)throw new c("An URL must be provided.");this.reset();const e=this.prepareImageElement();this.imageElement=e;const r=this._decodeOnLoadImage(e);return e.src=t,r}decodeFromVideoUrl(t){if(!t)throw new c("An URL must be provided.");this.reset();const e=this.prepareVideoElement(),r=this.decodeFromVideoElement(e);return e.src=t,r}decodeFromVideoUrlContinuously(t,e){if(!t)throw new c("An URL must be provided.");this.reset();const r=this.prepareVideoElement(),i=this.decodeFromVideoElementContinuously(r,e);return r.src=t,i}_decodeOnLoadImage(t){return new Promise((e,r)=>{this.imageLoadedListener=()=>this.decodeOnce(t,!1,!0).then(e,r),t.addEventListener("load",this.imageLoadedListener)})}_decodeOnLoadVideo(t){return L(this,void 0,void 0,function*(){return yield this.playVideoOnLoadAsync(t),yield this.decodeOnce(t)})}_decodeOnLoadVideoContinuously(t,e){return L(this,void 0,void 0,function*(){yield this.playVideoOnLoadAsync(t),this.decodeContinuously(t,e)})}isImageLoaded(t){return!!t.complete&&0!==t.naturalWidth}prepareImageElement(t){let e;return void 0===t&&(e=document.createElement("img"),e.width=200,e.height=200),"string"==typeof t&&(e=this.getMediaElement(t,"img")),t instanceof HTMLImageElement&&(e=t),e}prepareVideoElement(t){let e;return t||"undefined"==typeof document||(e=document.createElement("video"),e.width=200,e.height=200),"string"==typeof t&&(e=this.getMediaElement(t,"video")),t instanceof HTMLVideoElement&&(e=t),e.setAttribute("autoplay","true"),e.setAttribute("muted","true"),e.setAttribute("playsinline","true"),e}decodeOnce(t,e=!0,r=!0){this._stopAsyncDecode=!1;const i=(n,o)=>{if(this._stopAsyncDecode)return o(new R("Video stream has ended before any code could be detected.")),void(this._stopAsyncDecode=void 0);try{n(this.decode(t))}catch(t){if(e&&t instanceof R||(t instanceof u||t instanceof C)&&r)return setTimeout(i,this._timeBetweenDecodingAttempts,n,o);o(t)}};return new Promise((t,e)=>i(t,e))}decodeContinuously(t,e){this._stopContinuousDecode=!1;const r=()=>{if(this._stopContinuousDecode)this._stopContinuousDecode=void 0;else try{const i=this.decode(t);e(i,null),setTimeout(r,this.timeBetweenScansMillis)}catch(t){e(null,t),(t instanceof u||t instanceof C||t instanceof R)&&setTimeout(r,this._timeBetweenDecodingAttempts)}};r()}decode(t){const e=this.createBinaryBitmap(t);return this.decodeBitmap(e)}_isHTMLVideoElement(t){return 0!==t.videoWidth}drawFrameOnCanvas(t,e,r){e||(e={sx:0,sy:0,sWidth:t.videoWidth,sHeight:t.videoHeight,dx:0,dy:0,dWidth:t.videoWidth,dHeight:t.videoHeight}),r||(r=this.captureCanvasContext),r.drawImage(t,e.sx,e.sy,e.sWidth,e.sHeight,e.dx,e.dy,e.dWidth,e.dHeight)}drawImageOnCanvas(t,e,r=this.captureCanvasContext){e||(e={sx:0,sy:0,sWidth:t.naturalWidth,sHeight:t.naturalHeight,dx:0,dy:0,dWidth:t.naturalWidth,dHeight:t.naturalHeight}),r||(r=this.captureCanvasContext),r.drawImage(t,e.sx,e.sy,e.sWidth,e.sHeight,e.dx,e.dy,e.dWidth,e.dHeight)}createBinaryBitmap(t){this.getCaptureCanvasContext(t),this._isHTMLVideoElement(t)?this.drawFrameOnCanvas(t):this.drawImageOnCanvas(t);const e=this.getCaptureCanvas(t),r=new M(e),i=new N(r);return new h(i)}getCaptureCanvasContext(t){if(!this.captureCanvasContext){const e=this.getCaptureCanvas(t).getContext("2d");this.captureCanvasContext=e}return this.captureCanvasContext}getCaptureCanvas(t){if(!this.captureCanvas){const e=this.createCaptureCanvas(t);this.captureCanvas=e}return this.captureCanvas}decodeBitmap(t){return this.reader.decode(t,this._hints)}createCaptureCanvas(t){if("undefined"==typeof document)return this._destroyCaptureCanvas(),null;const e=document.createElement("canvas");let r,i;return void 0!==t&&(t instanceof HTMLVideoElement?(r=t.videoWidth,i=t.videoHeight):t instanceof HTMLImageElement&&(r=t.naturalWidth||t.width,i=t.naturalHeight||t.height)),e.style.width=r+"px",e.style.height=i+"px",e.width=r,e.height=i,e}stopStreams(){this.stream&&(this.stream.getVideoTracks().forEach(t=>t.stop()),this.stream=void 0),!1===this._stopAsyncDecode&&this.stopAsyncDecode(),!1===this._stopContinuousDecode&&this.stopContinuousDecode()}reset(){this.stopStreams(),this._destroyVideoElement(),this._destroyImageElement(),this._destroyCaptureCanvas()}_destroyVideoElement(){this.videoElement&&(void 0!==this.videoEndedListener&&this.videoElement.removeEventListener("ended",this.videoEndedListener),void 0!==this.videoPlayingEventListener&&this.videoElement.removeEventListener("playing",this.videoPlayingEventListener),void 0!==this.videoCanPlayListener&&this.videoElement.removeEventListener("loadedmetadata",this.videoCanPlayListener),this.cleanVideoSource(this.videoElement),this.videoElement=void 0)}_destroyImageElement(){this.imageElement&&(void 0!==this.imageLoadedListener&&this.imageElement.removeEventListener("load",this.imageLoadedListener),this.imageElement.src=void 0,this.imageElement.removeAttribute("src"),this.imageElement=void 0)}_destroyCaptureCanvas(){this.captureCanvasContext=void 0,this.captureCanvas=void 0}addVideoSource(t,e){try{t.srcObject=e}catch(r){t.src=URL.createObjectURL(e)}}cleanVideoSource(t){try{t.srcObject=null}catch(e){t.src=""}this.videoElement.removeAttribute("src")}}class ${constructor(t,e,r=(null==e?0:8*e.length),i,n,o=f.currentTimeMillis()){this.text=t,this.rawBytes=e,this.numBits=r,this.resultPoints=i,this.format=n,this.timestamp=o,this.text=t,this.rawBytes=e,this.numBits=null==r?null==e?0:8*e.length:r,this.resultPoints=i,this.format=n,this.resultMetadata=null,this.timestamp=null==o?f.currentTimeMillis():o}getText(){return this.text}getRawBytes(){return this.rawBytes}getNumBits(){return this.numBits}getResultPoints(){return this.resultPoints}getBarcodeFormat(){return this.format}getResultMetadata(){return this.resultMetadata}putMetadata(t,e){null===this.resultMetadata&&(this.resultMetadata=new Map),this.resultMetadata.set(t,e)}putAllMetadata(t){null!==t&&(null===this.resultMetadata?this.resultMetadata=t:this.resultMetadata=new Map(t))}addResultPoints(t){const e=this.resultPoints;if(null===e)this.resultPoints=t;else if(null!==t&&t.length>0){const r=new Array(e.length+t.length);f.arraycopy(e,0,r,0,e.length),f.arraycopy(t,0,r,e.length,t.length),this.resultPoints=r}}getTimestamp(){return this.timestamp}toString(){return this.text}}!function(t){t[t.AZTEC=0]="AZTEC",t[t.CODABAR=1]="CODABAR",t[t.CODE_39=2]="CODE_39",t[t.CODE_93=3]="CODE_93",t[t.CODE_128=4]="CODE_128",t[t.DATA_MATRIX=5]="DATA_MATRIX",t[t.EAN_8=6]="EAN_8",t[t.EAN_13=7]="EAN_13",t[t.ITF=8]="ITF",t[t.MAXICODE=9]="MAXICODE",t[t.PDF_417=10]="PDF_417",t[t.QR_CODE=11]="QR_CODE",t[t.RSS_14=12]="RSS_14",t[t.RSS_EXPANDED=13]="RSS_EXPANDED",t[t.UPC_A=14]="UPC_A",t[t.UPC_E=15]="UPC_E",t[t.UPC_EAN_EXTENSION=16]="UPC_EAN_EXTENSION"}(B||(B={}));var U,H=B;!function(t){t[t.OTHER=0]="OTHER",t[t.ORIENTATION=1]="ORIENTATION",t[t.BYTE_SEGMENTS=2]="BYTE_SEGMENTS",t[t.ERROR_CORRECTION_LEVEL=3]="ERROR_CORRECTION_LEVEL",t[t.ISSUE_NUMBER=4]="ISSUE_NUMBER",t[t.SUGGESTED_PRICE=5]="SUGGESTED_PRICE",t[t.POSSIBLE_COUNTRY=6]="POSSIBLE_COUNTRY",t[t.UPC_EAN_EXTENSION=7]="UPC_EAN_EXTENSION",t[t.PDF417_EXTRA_METADATA=8]="PDF417_EXTRA_METADATA",t[t.STRUCTURED_APPEND_SEQUENCE=9]="STRUCTURED_APPEND_SEQUENCE",t[t.STRUCTURED_APPEND_PARITY=10]="STRUCTURED_APPEND_PARITY"}(U||(U={}));var V,z,j,G,X,W,Y=U;class Z{constructor(t,e,r,i,n=-1,o=-1){this.rawBytes=t,this.text=e,this.byteSegments=r,this.ecLevel=i,this.structuredAppendSequenceNumber=n,this.structuredAppendParity=o,this.numBits=null==t?0:8*t.length}getRawBytes(){return this.rawBytes}getNumBits(){return this.numBits}setNumBits(t){this.numBits=t}getText(){return this.text}getByteSegments(){return this.byteSegments}getECLevel(){return this.ecLevel}getErrorsCorrected(){return this.errorsCorrected}setErrorsCorrected(t){this.errorsCorrected=t}getErasures(){return this.erasures}setErasures(t){this.erasures=t}getOther(){return this.other}setOther(t){this.other=t}hasStructuredAppend(){return this.structuredAppendParity>=0&&this.structuredAppendSequenceNumber>=0}getStructuredAppendParity(){return this.structuredAppendParity}getStructuredAppendSequenceNumber(){return this.structuredAppendSequenceNumber}}class q{exp(t){return this.expTable[t]}log(t){if(0===t)throw new d;return this.logTable[t]}static addOrSubtract(t,e){return t^e}}class K{constructor(t,e){if(0===e.length)throw new d;this.field=t;const r=e.length;if(r>1&&0===e[0]){let t=1;for(;t<r&&0===e[t];)t++;t===r?this.coefficients=Int32Array.from([0]):(this.coefficients=new Int32Array(r-t),f.arraycopy(e,t,this.coefficients,0,this.coefficients.length))}else this.coefficients=e}getCoefficients(){return this.coefficients}getDegree(){return this.coefficients.length-1}isZero(){return 0===this.coefficients[0]}getCoefficient(t){return this.coefficients[this.coefficients.length-1-t]}evaluateAt(t){if(0===t)return this.getCoefficient(0);const e=this.coefficients;let r;if(1===t){r=0;for(let t=0,i=e.length;t!==i;t++){const i=e[t];r=q.addOrSubtract(r,i)}return r}r=e[0];const i=e.length,n=this.field;for(let o=1;o<i;o++)r=q.addOrSubtract(n.multiply(t,r),e[o]);return r}addOrSubtract(t){if(!this.field.equals(t.field))throw new d("GenericGFPolys do not have same GenericGF field");if(this.isZero())return t;if(t.isZero())return this;let e=this.coefficients,r=t.coefficients;if(e.length>r.length){const t=e;e=r,r=t}let i=new Int32Array(r.length);const n=r.length-e.length;f.arraycopy(r,0,i,0,n);for(let t=n;t<r.length;t++)i[t]=q.addOrSubtract(e[t-n],r[t]);return new K(this.field,i)}multiply(t){if(!this.field.equals(t.field))throw new d("GenericGFPolys do not have same GenericGF field");if(this.isZero()||t.isZero())return this.field.getZero();const e=this.coefficients,r=e.length,i=t.coefficients,n=i.length,o=new Int32Array(r+n-1),s=this.field;for(let t=0;t<r;t++){const r=e[t];for(let e=0;e<n;e++)o[t+e]=q.addOrSubtract(o[t+e],s.multiply(r,i[e]))}return new K(s,o)}multiplyScalar(t){if(0===t)return this.field.getZero();if(1===t)return this;const e=this.coefficients.length,r=this.field,i=new Int32Array(e),n=this.coefficients;for(let o=0;o<e;o++)i[o]=r.multiply(n[o],t);return new K(r,i)}multiplyByMonomial(t,e){if(t<0)throw new d;if(0===e)return this.field.getZero();const r=this.coefficients,i=r.length,n=new Int32Array(i+t),o=this.field;for(let t=0;t<i;t++)n[t]=o.multiply(r[t],e);return new K(o,n)}divide(t){if(!this.field.equals(t.field))throw new d("GenericGFPolys do not have same GenericGF field");if(t.isZero())throw new d("Divide by 0");const e=this.field;let r=e.getZero(),i=this;const n=t.getCoefficient(t.getDegree()),o=e.inverse(n);for(;i.getDegree()>=t.getDegree()&&!i.isZero();){const n=i.getDegree()-t.getDegree(),s=e.multiply(i.getCoefficient(i.getDegree()),o),a=t.multiplyByMonomial(n,s),l=e.buildMonomial(n,s);r=r.addOrSubtract(l),i=i.addOrSubtract(a)}return[r,i]}toString(){let t="";for(let e=this.getDegree();e>=0;e--){let r=this.getCoefficient(e);if(0!==r){if(r<0?(t+=" - ",r=-r):t.length>0&&(t+=" + "),0===e||1!==r){const e=this.field.log(r);0===e?t+="1":1===e?t+="a":(t+="a^",t+=e)}0!==e&&(1===e?t+="x":(t+="x^",t+=e))}}return t}}class Q extends l{}Q.kind="ArithmeticException";class J extends q{constructor(t,e,r){super(),this.primitive=t,this.size=e,this.generatorBase=r;const i=new Int32Array(e);let n=1;for(let r=0;r<e;r++)i[r]=n,n*=2,n>=e&&(n^=t,n&=e-1);this.expTable=i;const o=new Int32Array(e);for(let t=0;t<e-1;t++)o[i[t]]=t;this.logTable=o,this.zero=new K(this,Int32Array.from([0])),this.one=new K(this,Int32Array.from([1]))}getZero(){return this.zero}getOne(){return this.one}buildMonomial(t,e){if(t<0)throw new d;if(0===e)return this.zero;const r=new Int32Array(t+1);return r[0]=e,new K(this,r)}inverse(t){if(0===t)throw new Q;return this.expTable[this.size-this.logTable[t]-1]}multiply(t,e){return 0===t||0===e?0:this.expTable[(this.logTable[t]+this.logTable[e])%(this.size-1)]}getSize(){return this.size}getGeneratorBase(){return this.generatorBase}toString(){return"GF(0x"+b.toHexString(this.primitive)+","+this.size+")"}equals(t){return t===this}}J.AZTEC_DATA_12=new J(4201,4096,1),J.AZTEC_DATA_10=new J(1033,1024,1),J.AZTEC_DATA_6=new J(67,64,1),J.AZTEC_PARAM=new J(19,16,1),J.QR_CODE_FIELD_256=new J(285,256,0),J.DATA_MATRIX_FIELD_256=new J(301,256,1),J.AZTEC_DATA_8=J.DATA_MATRIX_FIELD_256,J.MAXICODE_FIELD_64=J.AZTEC_DATA_6;class tt extends l{}tt.kind="ReedSolomonException";class et extends l{}et.kind="IllegalStateException";class rt{constructor(t){this.field=t}decode(t,e){const r=this.field,i=new K(r,t),n=new Int32Array(e);let o=!0;for(let t=0;t<e;t++){const e=i.evaluateAt(r.exp(t+r.getGeneratorBase()));n[n.length-1-t]=e,0!==e&&(o=!1)}if(o)return;const s=new K(r,n),a=this.runEuclideanAlgorithm(r.buildMonomial(e,1),s,e),l=a[0],c=a[1],d=this.findErrorLocations(l),h=this.findErrorMagnitudes(c,d);for(let e=0;e<d.length;e++){const i=t.length-1-r.log(d[e]);if(i<0)throw new tt("Bad error location");t[i]=J.addOrSubtract(t[i],h[e])}}runEuclideanAlgorithm(t,e,r){if(t.getDegree()<e.getDegree()){const r=t;t=e,e=r}const i=this.field;let n=t,o=e,s=i.getZero(),a=i.getOne();for(;o.getDegree()>=(r/2|0);){let t=n,e=s;if(n=o,s=a,n.isZero())throw new tt("r_{i-1} was zero");o=t;let r=i.getZero();const l=n.getCoefficient(n.getDegree()),c=i.inverse(l);for(;o.getDegree()>=n.getDegree()&&!o.isZero();){const t=o.getDegree()-n.getDegree(),e=i.multiply(o.getCoefficient(o.getDegree()),c);r=r.addOrSubtract(i.buildMonomial(t,e)),o=o.addOrSubtract(n.multiplyByMonomial(t,e))}if(a=r.multiply(s).addOrSubtract(e),o.getDegree()>=n.getDegree())throw new et("Division algorithm failed to reduce polynomial?")}const l=a.getCoefficient(0);if(0===l)throw new tt("sigmaTilde(0) was zero");const c=i.inverse(l);return[a.multiplyScalar(c),o.multiplyScalar(c)]}findErrorLocations(t){const e=t.getDegree();if(1===e)return Int32Array.from([t.getCoefficient(1)]);const r=new Int32Array(e);let i=0;const n=this.field;for(let o=1;o<n.getSize()&&i<e;o++)0===t.evaluateAt(o)&&(r[i]=n.inverse(o),i++);if(i!==e)throw new tt("Error locator degree does not match number of roots");return r}findErrorMagnitudes(t,e){const r=e.length,i=new Int32Array(r),n=this.field;for(let o=0;o<r;o++){const s=n.inverse(e[o]);let a=1;for(let t=0;t<r;t++)if(o!==t){const r=n.multiply(e[t],s),i=1&r?-2&r:1|r;a=n.multiply(a,i)}i[o]=n.multiply(t.evaluateAt(s),n.inverse(a)),0!==n.getGeneratorBase()&&(i[o]=n.multiply(i[o],s))}return i}}!function(t){t[t.UPPER=0]="UPPER",t[t.LOWER=1]="LOWER",t[t.MIXED=2]="MIXED",t[t.DIGIT=3]="DIGIT",t[t.PUNCT=4]="PUNCT",t[t.BINARY=5]="BINARY"}(V||(V={}));class it{decode(t){this.ddata=t;let e=t.getBits(),r=this.extractBits(e),i=this.correctBits(r),n=it.convertBoolArrayToByteArray(i),o=it.getEncodedData(i),s=new Z(n,o,null,null);return s.setNumBits(i.length),s}static highLevelDecode(t){return this.getEncodedData(t)}static getEncodedData(t){let e=t.length,r=V.UPPER,i=V.UPPER,n="",o=0;for(;o<e;)if(i===V.BINARY){if(e-o<5)break;let s=it.readCode(t,o,5);if(o+=5,0===s){if(e-o<11)break;s=it.readCode(t,o,11)+31,o+=11}for(let r=0;r<s;r++){if(e-o<8){o=e;break}const r=it.readCode(t,o,8);n+=I.castAsNonUtf8Char(r),o+=8}i=r}else{let s=i===V.DIGIT?4:5;if(e-o<s)break;let a=it.readCode(t,o,s);o+=s;let l=it.getCharacter(i,a);l.startsWith("CTRL_")?(r=i,i=it.getTable(l.charAt(5)),"L"===l.charAt(6)&&(r=i)):(n+=l,i=r)}return n}static getTable(t){switch(t){case"L":return V.LOWER;case"P":return V.PUNCT;case"M":return V.MIXED;case"D":return V.DIGIT;case"B":return V.BINARY;default:return V.UPPER}}static getCharacter(t,e){switch(t){case V.UPPER:return it.UPPER_TABLE[e];case V.LOWER:return it.LOWER_TABLE[e];case V.MIXED:return it.MIXED_TABLE[e];case V.PUNCT:return it.PUNCT_TABLE[e];case V.DIGIT:return it.DIGIT_TABLE[e];default:throw new et("Bad table")}}correctBits(t){let e,r;this.ddata.getNbLayers()<=2?(r=6,e=J.AZTEC_DATA_6):this.ddata.getNbLayers()<=8?(r=8,e=J.AZTEC_DATA_8):this.ddata.getNbLayers()<=22?(r=10,e=J.AZTEC_DATA_10):(r=12,e=J.AZTEC_DATA_12);let i=this.ddata.getNbDatablocks(),n=t.length/r;if(n<i)throw new C;let o=t.length%r,s=new Int32Array(n);for(let e=0;e<n;e++,o+=r)s[e]=it.readCode(t,o,r);try{new rt(e).decode(s,n-i)}catch(t){throw new C(t)}let a=(1<<r)-1,l=0;for(let t=0;t<i;t++){let e=s[t];if(0===e||e===a)throw new C;1!==e&&e!==a-1||l++}let c=new Array(i*r-l),d=0;for(let t=0;t<i;t++){let e=s[t];if(1===e||e===a-1)c.fill(e>1,d,d+r-1),d+=r-1;else for(let t=r-1;t>=0;--t)c[d++]=!!(e&1<<t)}return c}extractBits(t){let e=this.ddata.isCompact(),r=this.ddata.getNbLayers(),i=(e?11:14)+4*r,n=new Int32Array(i),o=new Array(this.totalBitsInLayer(r,e));if(e)for(let t=0;t<n.length;t++)n[t]=t;else{let t=i+1+2*b.truncDivision(b.truncDivision(i,2)-1,15),e=i/2,r=b.truncDivision(t,2);for(let t=0;t<e;t++){let i=t+b.truncDivision(t,15);n[e-t-1]=r-i-1,n[e+t]=r+i+1}}for(let s=0,a=0;s<r;s++){let l=4*(r-s)+(e?9:12),c=2*s,d=i-1-c;for(let e=0;e<l;e++){let r=2*e;for(let i=0;i<2;i++)o[a+r+i]=t.get(n[c+i],n[c+e]),o[a+2*l+r+i]=t.get(n[c+e],n[d-i]),o[a+4*l+r+i]=t.get(n[d-i],n[d-e]),o[a+6*l+r+i]=t.get(n[d-e],n[c+i])}a+=8*l}return o}static readCode(t,e,r){let i=0;for(let n=e;n<e+r;n++)i<<=1,t[n]&&(i|=1);return i}static readByte(t,e){let r=t.length-e;return r>=8?it.readCode(t,e,8):it.readCode(t,e,r)<<8-r}static convertBoolArrayToByteArray(t){let e=new Uint8Array((t.length+7)/8);for(let r=0;r<e.length;r++)e[r]=it.readByte(t,8*r);return e}totalBitsInLayer(t,e){return((e?88:112)+16*t)*t}}it.UPPER_TABLE=["CTRL_PS"," ","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","CTRL_LL","CTRL_ML","CTRL_DL","CTRL_BS"],it.LOWER_TABLE=["CTRL_PS"," ","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","CTRL_US","CTRL_ML","CTRL_DL","CTRL_BS"],it.MIXED_TABLE=["CTRL_PS"," ","\\1","\\2","\\3","\\4","\\5","\\6","\\7","\b","\t","\n","\\13","\f","\r","\\33","\\34","\\35","\\36","\\37","@","\\","^","_","`","|","~","\\177","CTRL_LL","CTRL_UL","CTRL_PL","CTRL_BS"],it.PUNCT_TABLE=["","\r","\r\n",". ",", ",": ","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","[","]","{","}","CTRL_UL"],it.DIGIT_TABLE=["CTRL_PS"," ","0","1","2","3","4","5","6","7","8","9",",",".","CTRL_UL","CTRL_US"];class nt{constructor(){}static round(t){return NaN===t?0:t<=Number.MIN_SAFE_INTEGER?Number.MIN_SAFE_INTEGER:t>=Number.MAX_SAFE_INTEGER?Number.MAX_SAFE_INTEGER:t+(t<0?-.5:.5)|0}static distance(t,e,r,i){const n=t-r,o=e-i;return Math.sqrt(n*n+o*o)}static sum(t){let e=0;for(let r=0,i=t.length;r!==i;r++)e+=t[r];return e}}class ot{static floatToIntBits(t){return t}}ot.MAX_VALUE=Number.MAX_SAFE_INTEGER;class st{constructor(t,e){this.x=t,this.y=e}getX(){return this.x}getY(){return this.y}equals(t){if(t instanceof st){const e=t;return this.x===e.x&&this.y===e.y}return!1}hashCode(){return 31*ot.floatToIntBits(this.x)+ot.floatToIntBits(this.y)}toString(){return"("+this.x+","+this.y+")"}static orderBestPatterns(t){const e=this.distance(t[0],t[1]),r=this.distance(t[1],t[2]),i=this.distance(t[0],t[2]);let n,o,s;if(r>=e&&r>=i?(o=t[0],n=t[1],s=t[2]):i>=r&&i>=e?(o=t[1],n=t[0],s=t[2]):(o=t[2],n=t[0],s=t[1]),this.crossProductZ(n,o,s)<0){const t=n;n=s,s=t}t[0]=n,t[1]=o,t[2]=s}static distance(t,e){return nt.distance(t.x,t.y,e.x,e.y)}static crossProductZ(t,e,r){const i=e.x,n=e.y;return(r.x-i)*(t.y-n)-(r.y-n)*(t.x-i)}}class at{constructor(t,e){this.bits=t,this.points=e}getBits(){return this.bits}getPoints(){return this.points}}class lt extends at{constructor(t,e,r,i,n){super(t,e),this.compact=r,this.nbDatablocks=i,this.nbLayers=n}getNbLayers(){return this.nbLayers}getNbDatablocks(){return this.nbDatablocks}isCompact(){return this.compact}}class ct{constructor(t,e,r,i){this.image=t,this.height=t.getHeight(),this.width=t.getWidth(),null==e&&(e=ct.INIT_SIZE),null==r&&(r=t.getWidth()/2|0),null==i&&(i=t.getHeight()/2|0);const n=e/2|0;if(this.leftInit=r-n,this.rightInit=r+n,this.upInit=i-n,this.downInit=i+n,this.upInit<0||this.leftInit<0||this.downInit>=this.height||this.rightInit>=this.width)throw new R}detect(){let t=this.leftInit,e=this.rightInit,r=this.upInit,i=this.downInit,n=!1,o=!0,s=!1,a=!1,l=!1,c=!1,d=!1;const h=this.width,u=this.height;for(;o;){o=!1;let p=!0;for(;(p||!a)&&e<h;)p=this.containsBlackPoint(r,i,e,!1),p?(e++,o=!0,a=!0):a||e++;if(e>=h){n=!0;break}let f=!0;for(;(f||!l)&&i<u;)f=this.containsBlackPoint(t,e,i,!0),f?(i++,o=!0,l=!0):l||i++;if(i>=u){n=!0;break}let g=!0;for(;(g||!c)&&t>=0;)g=this.containsBlackPoint(r,i,t,!1),g?(t--,o=!0,c=!0):c||t--;if(t<0){n=!0;break}let m=!0;for(;(m||!d)&&r>=0;)m=this.containsBlackPoint(t,e,r,!0),m?(r--,o=!0,d=!0):d||r--;if(r<0){n=!0;break}o&&(s=!0)}if(!n&&s){const n=e-t;let o=null;for(let e=1;null===o&&e<n;e++)o=this.getBlackPointOnSegment(t,i-e,t+e,i);if(null==o)throw new R;let s=null;for(let e=1;null===s&&e<n;e++)s=this.getBlackPointOnSegment(t,r+e,t+e,r);if(null==s)throw new R;let a=null;for(let t=1;null===a&&t<n;t++)a=this.getBlackPointOnSegment(e,r+t,e-t,r);if(null==a)throw new R;let l=null;for(let t=1;null===l&&t<n;t++)l=this.getBlackPointOnSegment(e,i-t,e-t,i);if(null==l)throw new R;return this.centerEdges(l,o,a,s)}throw new R}getBlackPointOnSegment(t,e,r,i){const n=nt.round(nt.distance(t,e,r,i)),o=(r-t)/n,s=(i-e)/n,a=this.image;for(let r=0;r<n;r++){const i=nt.round(t+r*o),n=nt.round(e+r*s);if(a.get(i,n))return new st(i,n)}return null}centerEdges(t,e,r,i){const n=t.getX(),o=t.getY(),s=e.getX(),a=e.getY(),l=r.getX(),c=r.getY(),d=i.getX(),h=i.getY(),u=ct.CORR;return n<this.width/2?[new st(d-u,h+u),new st(s+u,a+u),new st(l-u,c-u),new st(n+u,o-u)]:[new st(d+u,h+u),new st(s+u,a-u),new st(l-u,c+u),new st(n-u,o-u)]}containsBlackPoint(t,e,r,i){const n=this.image;if(i){for(let i=t;i<=e;i++)if(n.get(i,r))return!0}else for(let i=t;i<=e;i++)if(n.get(r,i))return!0;return!1}}ct.INIT_SIZE=10,ct.CORR=1;class dt{static checkAndNudgePoints(t,e){const r=t.getWidth(),i=t.getHeight();let n=!0;for(let t=0;t<e.length&&n;t+=2){const o=Math.floor(e[t]),s=Math.floor(e[t+1]);if(o<-1||o>r||s<-1||s>i)throw new R;n=!1,-1===o?(e[t]=0,n=!0):o===r&&(e[t]=r-1,n=!0),-1===s?(e[t+1]=0,n=!0):s===i&&(e[t+1]=i-1,n=!0)}n=!0;for(let t=e.length-2;t>=0&&n;t-=2){const o=Math.floor(e[t]),s=Math.floor(e[t+1]);if(o<-1||o>r||s<-1||s>i)throw new R;n=!1,-1===o?(e[t]=0,n=!0):o===r&&(e[t]=r-1,n=!0),-1===s?(e[t+1]=0,n=!0):s===i&&(e[t+1]=i-1,n=!0)}}}class ht{constructor(t,e,r,i,n,o,s,a,l){this.a11=t,this.a21=e,this.a31=r,this.a12=i,this.a22=n,this.a32=o,this.a13=s,this.a23=a,this.a33=l}static quadrilateralToQuadrilateral(t,e,r,i,n,o,s,a,l,c,d,h,u,p,f,g){const m=ht.quadrilateralToSquare(t,e,r,i,n,o,s,a);return ht.squareToQuadrilateral(l,c,d,h,u,p,f,g).times(m)}transformPoints(t){const e=t.length,r=this.a11,i=this.a12,n=this.a13,o=this.a21,s=this.a22,a=this.a23,l=this.a31,c=this.a32,d=this.a33;for(let h=0;h<e;h+=2){const e=t[h],u=t[h+1],p=n*e+a*u+d;t[h]=(r*e+o*u+l)/p,t[h+1]=(i*e+s*u+c)/p}}transformPointsWithValues(t,e){const r=this.a11,i=this.a12,n=this.a13,o=this.a21,s=this.a22,a=this.a23,l=this.a31,c=this.a32,d=this.a33,h=t.length;for(let u=0;u<h;u++){const h=t[u],p=e[u],f=n*h+a*p+d;t[u]=(r*h+o*p+l)/f,e[u]=(i*h+s*p+c)/f}}static squareToQuadrilateral(t,e,r,i,n,o,s,a){const l=t-r+n-s,c=e-i+o-a;if(0===l&&0===c)return new ht(r-t,n-r,t,i-e,o-i,e,0,0,1);{const d=r-n,h=s-n,u=i-o,p=a-o,f=d*p-h*u,g=(l*p-h*c)/f,m=(d*c-l*u)/f;return new ht(r-t+g*r,s-t+m*s,t,i-e+g*i,a-e+m*a,e,g,m,1)}}static quadrilateralToSquare(t,e,r,i,n,o,s,a){return ht.squareToQuadrilateral(t,e,r,i,n,o,s,a).buildAdjoint()}buildAdjoint(){return new ht(this.a22*this.a33-this.a23*this.a32,this.a23*this.a31-this.a21*this.a33,this.a21*this.a32-this.a22*this.a31,this.a13*this.a32-this.a12*this.a33,this.a11*this.a33-this.a13*this.a31,this.a12*this.a31-this.a11*this.a32,this.a12*this.a23-this.a13*this.a22,this.a13*this.a21-this.a11*this.a23,this.a11*this.a22-this.a12*this.a21)}times(t){return new ht(this.a11*t.a11+this.a21*t.a12+this.a31*t.a13,this.a11*t.a21+this.a21*t.a22+this.a31*t.a23,this.a11*t.a31+this.a21*t.a32+this.a31*t.a33,this.a12*t.a11+this.a22*t.a12+this.a32*t.a13,this.a12*t.a21+this.a22*t.a22+this.a32*t.a23,this.a12*t.a31+this.a22*t.a32+this.a32*t.a33,this.a13*t.a11+this.a23*t.a12+this.a33*t.a13,this.a13*t.a21+this.a23*t.a22+this.a33*t.a23,this.a13*t.a31+this.a23*t.a32+this.a33*t.a33)}}class ut extends dt{sampleGrid(t,e,r,i,n,o,s,a,l,c,d,h,u,p,f,g,m,w,b){const y=ht.quadrilateralToQuadrilateral(i,n,o,s,a,l,c,d,h,u,p,f,g,m,w,b);return this.sampleGridWithTransform(t,e,r,y)}sampleGridWithTransform(t,e,r,i){if(e<=0||r<=0)throw new R;const n=new x(e,r),o=new Float32Array(2*e);for(let e=0;e<r;e++){const r=o.length,s=e+.5;for(let t=0;t<r;t+=2)o[t]=t/2+.5,o[t+1]=s;i.transformPoints(o),dt.checkAndNudgePoints(t,o);try{for(let i=0;i<r;i+=2)t.get(Math.floor(o[i]),Math.floor(o[i+1]))&&n.set(i/2,e)}catch(t){throw new R}}return n}}class pt{static setGridSampler(t){pt.gridSampler=t}static getInstance(){return pt.gridSampler}}pt.gridSampler=new ut;class ft{constructor(t,e){this.x=t,this.y=e}toResultPoint(){return new st(this.getX(),this.getY())}getX(){return this.x}getY(){return this.y}}class gt{constructor(t){this.EXPECTED_CORNER_BITS=new Int32Array([3808,476,2107,1799]),this.image=t}detect(){return this.detectMirror(!1)}detectMirror(t){let e=this.getMatrixCenter(),r=this.getBullsEyeCorners(e);if(t){let t=r[0];r[0]=r[2],r[2]=t}this.extractParameters(r);let i=this.sampleGrid(this.image,r[this.shift%4],r[(this.shift+1)%4],r[(this.shift+2)%4],r[(this.shift+3)%4]),n=this.getMatrixCornerPoints(r);return new lt(i,n,this.compact,this.nbDataBlocks,this.nbLayers)}extractParameters(t){if(!(this.isValidPoint(t[0])&&this.isValidPoint(t[1])&&this.isValidPoint(t[2])&&this.isValidPoint(t[3])))throw new R;let e=2*this.nbCenterLayers,r=new Int32Array([this.sampleLine(t[0],t[1],e),this.sampleLine(t[1],t[2],e),this.sampleLine(t[2],t[3],e),this.sampleLine(t[3],t[0],e)]);this.shift=this.getRotation(r,e);let i=0;for(let t=0;t<4;t++){let e=r[(this.shift+t)%4];this.compact?(i<<=7,i+=e>>1&127):(i<<=10,i+=(e>>2&992)+(e>>1&31))}let n=this.getCorrectedParameterData(i,this.compact);this.compact?(this.nbLayers=1+(n>>6),this.nbDataBlocks=1+(63&n)):(this.nbLayers=1+(n>>11),this.nbDataBlocks=1+(2047&n))}getRotation(t,e){let r=0;t.forEach((t,i,n)=>{r=(t>>e-2<<1)+(1&t)+(r<<3)}),r=((1&r)<<11)+(r>>1);for(let t=0;t<4;t++)if(b.bitCount(r^this.EXPECTED_CORNER_BITS[t])<=2)return t;throw new R}getCorrectedParameterData(t,e){let r,i;e?(r=7,i=2):(r=10,i=4);let n=r-i,o=new Int32Array(r);for(let e=r-1;e>=0;--e)o[e]=15&t,t>>=4;try{new rt(J.AZTEC_PARAM).decode(o,n)}catch(t){throw new R}let s=0;for(let t=0;t<i;t++)s=(s<<4)+o[t];return s}getBullsEyeCorners(t){let e=t,r=t,i=t,n=t,o=!0;for(this.nbCenterLayers=1;this.nbCenterLayers<9;this.nbCenterLayers++){let t=this.getFirstDifferent(e,o,1,-1),s=this.getFirstDifferent(r,o,1,1),a=this.getFirstDifferent(i,o,-1,1),l=this.getFirstDifferent(n,o,-1,-1);if(this.nbCenterLayers>2){let r=this.distancePoint(l,t)*this.nbCenterLayers/(this.distancePoint(n,e)*(this.nbCenterLayers+2));if(r<.75||r>1.25||!this.isWhiteOrBlackRectangle(t,s,a,l))break}e=t,r=s,i=a,n=l,o=!o}if(5!==this.nbCenterLayers&&7!==this.nbCenterLayers)throw new R;this.compact=5===this.nbCenterLayers;let s=new st(e.getX()+.5,e.getY()-.5),a=new st(r.getX()+.5,r.getY()+.5),l=new st(i.getX()-.5,i.getY()+.5),c=new st(n.getX()-.5,n.getY()-.5);return this.expandSquare([s,a,l,c],2*this.nbCenterLayers-3,2*this.nbCenterLayers)}getMatrixCenter(){let t,e,r,i;try{let n=new ct(this.image).detect();t=n[0],e=n[1],r=n[2],i=n[3]}catch(n){let o=this.image.getWidth()/2,s=this.image.getHeight()/2;t=this.getFirstDifferent(new ft(o+7,s-7),!1,1,-1).toResultPoint(),e=this.getFirstDifferent(new ft(o+7,s+7),!1,1,1).toResultPoint(),r=this.getFirstDifferent(new ft(o-7,s+7),!1,-1,1).toResultPoint(),i=this.getFirstDifferent(new ft(o-7,s-7),!1,-1,-1).toResultPoint()}let n=nt.round((t.getX()+i.getX()+e.getX()+r.getX())/4),o=nt.round((t.getY()+i.getY()+e.getY()+r.getY())/4);try{let s=new ct(this.image,15,n,o).detect();t=s[0],e=s[1],r=s[2],i=s[3]}catch(s){t=this.getFirstDifferent(new ft(n+7,o-7),!1,1,-1).toResultPoint(),e=this.getFirstDifferent(new ft(n+7,o+7),!1,1,1).toResultPoint(),r=this.getFirstDifferent(new ft(n-7,o+7),!1,-1,1).toResultPoint(),i=this.getFirstDifferent(new ft(n-7,o-7),!1,-1,-1).toResultPoint()}return n=nt.round((t.getX()+i.getX()+e.getX()+r.getX())/4),o=nt.round((t.getY()+i.getY()+e.getY()+r.getY())/4),new ft(n,o)}getMatrixCornerPoints(t){return this.expandSquare(t,2*this.nbCenterLayers,this.getDimension())}sampleGrid(t,e,r,i,n){let o=pt.getInstance(),s=this.getDimension(),a=s/2-this.nbCenterLayers,l=s/2+this.nbCenterLayers;return o.sampleGrid(t,s,s,a,a,l,a,l,l,a,l,e.getX(),e.getY(),r.getX(),r.getY(),i.getX(),i.getY(),n.getX(),n.getY())}sampleLine(t,e,r){let i=0,n=this.distanceResultPoint(t,e),o=n/r,s=t.getX(),a=t.getY(),l=o*(e.getX()-t.getX())/n,c=o*(e.getY()-t.getY())/n;for(let t=0;t<r;t++)this.image.get(nt.round(s+t*l),nt.round(a+t*c))&&(i|=1<<r-t-1);return i}isWhiteOrBlackRectangle(t,e,r,i){let n=3;t=new ft(t.getX()-n,t.getY()+n),e=new ft(e.getX()-n,e.getY()-n),r=new ft(r.getX()+n,r.getY()-n),i=new ft(i.getX()+n,i.getY()+n);let o=this.getColor(i,t);if(0===o)return!1;let s=this.getColor(t,e);return s===o&&(s=this.getColor(e,r),s===o&&(s=this.getColor(r,i),s===o))}getColor(t,e){let r=this.distancePoint(t,e),i=(e.getX()-t.getX())/r,n=(e.getY()-t.getY())/r,o=0,s=t.getX(),a=t.getY(),l=this.image.get(t.getX(),t.getY()),c=Math.ceil(r);for(let t=0;t<c;t++)s+=i,a+=n,this.image.get(nt.round(s),nt.round(a))!==l&&o++;let d=o/r;return d>.1&&d<.9?0:d<=.1===l?1:-1}getFirstDifferent(t,e,r,i){let n=t.getX()+r,o=t.getY()+i;for(;this.isValid(n,o)&&this.image.get(n,o)===e;)n+=r,o+=i;for(n-=r,o-=i;this.isValid(n,o)&&this.image.get(n,o)===e;)n+=r;for(n-=r;this.isValid(n,o)&&this.image.get(n,o)===e;)o+=i;return o-=i,new ft(n,o)}expandSquare(t,e,r){let i=r/(2*e),n=t[0].getX()-t[2].getX(),o=t[0].getY()-t[2].getY(),s=(t[0].getX()+t[2].getX())/2,a=(t[0].getY()+t[2].getY())/2,l=new st(s+i*n,a+i*o),c=new st(s-i*n,a-i*o);return n=t[1].getX()-t[3].getX(),o=t[1].getY()-t[3].getY(),s=(t[1].getX()+t[3].getX())/2,a=(t[1].getY()+t[3].getY())/2,[l,new st(s+i*n,a+i*o),c,new st(s-i*n,a-i*o)]}isValid(t,e){return t>=0&&t<this.image.getWidth()&&e>0&&e<this.image.getHeight()}isValidPoint(t){let e=nt.round(t.getX()),r=nt.round(t.getY());return this.isValid(e,r)}distancePoint(t,e){return nt.distance(t.getX(),t.getY(),e.getX(),e.getY())}distanceResultPoint(t,e){return nt.distance(t.getX(),t.getY(),e.getX(),e.getY())}getDimension(){return this.compact?4*this.nbLayers+11:this.nbLayers<=4?4*this.nbLayers+15:4*this.nbLayers+2*(b.truncDivision(this.nbLayers-4,8)+1)+15}}class mt{decode(t,e=null){let r=null,i=new gt(t.getBlackMatrix()),n=null,o=null;try{let t=i.detectMirror(!1);n=t.getPoints(),this.reportFoundResultPoints(e,n),o=(new it).decode(t)}catch(t){r=t}if(null==o)try{let t=i.detectMirror(!0);n=t.getPoints(),this.reportFoundResultPoints(e,n),o=(new it).decode(t)}catch(t){if(null!=r)throw r;throw t}let s=new $(o.getText(),o.getRawBytes(),o.getNumBits(),n,H.AZTEC,f.currentTimeMillis()),a=o.getByteSegments();null!=a&&s.putMetadata(Y.BYTE_SEGMENTS,a);let l=o.getECLevel();return null!=l&&s.putMetadata(Y.ERROR_CORRECTION_LEVEL,l),s}reportFoundResultPoints(t,e){if(null!=t){let r=t.get(E.NEED_RESULT_POINT_CALLBACK);null!=r&&e.forEach((t,e,i)=>{r.foundPossibleResultPoint(t)})}}reset(){}}class wt extends F{constructor(t=500){super(new mt,t)}}class bt{decode(t,e){try{return this.doDecode(t,e)}catch(r){if(e&&!0===e.get(E.TRY_HARDER)&&t.isRotateSupported()){const r=t.rotateCounterClockwise(),i=this.doDecode(r,e),n=i.getResultMetadata();let o=270;null!==n&&!0===n.get(Y.ORIENTATION)&&(o+=n.get(Y.ORIENTATION)%360),i.putMetadata(Y.ORIENTATION,o);const s=i.getResultPoints();if(null!==s){const t=r.getHeight();for(let e=0;e<s.length;e++)s[e]=new st(t-s[e].getY()-1,s[e].getX())}return i}throw new R}}reset(){}doDecode(t,e){const r=t.getWidth(),i=t.getHeight();let n=new y(r);const o=e&&!0===e.get(E.TRY_HARDER),s=Math.max(1,i>>(o?8:5));let a;a=o?i:15;const l=Math.trunc(i/2);for(let o=0;o<a;o++){const a=Math.trunc((o+1)/2),c=l+s*(1&o?-a:a);if(c<0||c>=i)break;try{n=t.getBlackRow(c,n)}catch(t){continue}for(let t=0;t<2;t++){if(1===t&&(n.reverse(),e&&!0===e.get(E.NEED_RESULT_POINT_CALLBACK))){const t=new Map;e.forEach((e,r)=>t.set(r,e)),t.delete(E.NEED_RESULT_POINT_CALLBACK),e=t}try{const i=this.decodeRow(c,n,e);if(1===t){i.putMetadata(Y.ORIENTATION,180);const t=i.getResultPoints();null!==t&&(t[0]=new st(r-t[0].getX()-1,t[0].getY()),t[1]=new st(r-t[1].getX()-1,t[1].getY()))}return i}catch(t){}}}throw new R}static recordPattern(t,e,r){const i=r.length;for(let t=0;t<i;t++)r[t]=0;const n=t.getSize();if(e>=n)throw new R;let o=!t.get(e),s=0,a=e;for(;a<n;){if(t.get(a)!==o)r[s]++;else{if(++s===i)break;r[s]=1,o=!o}a++}if(s!==i&&(s!==i-1||a!==n))throw new R}static recordPatternInReverse(t,e,r){let i=r.length,n=t.get(e);for(;e>0&&i>=0;)t.get(--e)!==n&&(i--,n=!n);if(i>=0)throw new R;bt.recordPattern(t,e+1,r)}static patternMatchVariance(t,e,r){const i=t.length;let n=0,o=0;for(let r=0;r<i;r++)n+=t[r],o+=e[r];if(n<o)return Number.POSITIVE_INFINITY;const s=n/o;r*=s;let a=0;for(let n=0;n<i;n++){const i=t[n],o=e[n]*s,l=i>o?i-o:o-i;if(l>r)return Number.POSITIVE_INFINITY;a+=l}return a/n}}class yt extends bt{static findStartPattern(t){const e=t.getSize(),r=t.getNextSet(0);let i=0,n=Int32Array.from([0,0,0,0,0,0]),o=r,s=!1;const a=6;for(let l=r;l<e;l++)if(t.get(l)!==s)n[i]++;else{if(i===a-1){let e=yt.MAX_AVG_VARIANCE,r=-1;for(let t=yt.CODE_START_A;t<=yt.CODE_START_C;t++){const i=bt.patternMatchVariance(n,yt.CODE_PATTERNS[t],yt.MAX_INDIVIDUAL_VARIANCE);i<e&&(e=i,r=t)}if(r>=0&&t.isRange(Math.max(0,o-(l-o)/2),o,!1))return Int32Array.from([o,l,r]);o+=n[0]+n[1],n=n.slice(2,n.length-1),n[i-1]=0,n[i]=0,i--}else i++;n[i]=1,s=!s}throw new R}static decodeCode(t,e,r){bt.recordPattern(t,r,e);let i=yt.MAX_AVG_VARIANCE,n=-1;for(let t=0;t<yt.CODE_PATTERNS.length;t++){const r=yt.CODE_PATTERNS[t],o=this.patternMatchVariance(e,r,yt.MAX_INDIVIDUAL_VARIANCE);o<i&&(i=o,n=t)}if(n>=0)return n;throw new R}decodeRow(t,e,r){const i=r&&!0===r.get(E.ASSUME_GS1),n=yt.findStartPattern(e),o=n[2];let s=0;const a=new Uint8Array(20);let l;switch(a[s++]=o,o){case yt.CODE_START_A:l=yt.CODE_CODE_A;break;case yt.CODE_START_B:l=yt.CODE_CODE_B;break;case yt.CODE_START_C:l=yt.CODE_CODE_C;break;default:throw new C}let c=!1,d=!1,h="",p=n[0],f=n[1];const g=Int32Array.from([0,0,0,0,0,0]);let m=0,w=0,b=o,y=0,_=!0,v=!1,A=!1;for(;!c;){const t=d;switch(d=!1,m=w,w=yt.decodeCode(e,g,f),a[s++]=w,w!==yt.CODE_STOP&&(_=!0),w!==yt.CODE_STOP&&(y++,b+=y*w),p=f,f+=g.reduce((t,e)=>t+e,0),w){case yt.CODE_START_A:case yt.CODE_START_B:case yt.CODE_START_C:throw new C}switch(l){case yt.CODE_CODE_A:if(w<64)h+=A===v?String.fromCharCode(" ".charCodeAt(0)+w):String.fromCharCode(" ".charCodeAt(0)+w+128),A=!1;else if(w<96)h+=A===v?String.fromCharCode(w-64):String.fromCharCode(w+64),A=!1;else switch(w!==yt.CODE_STOP&&(_=!1),w){case yt.CODE_FNC_1:i&&(0===h.length?h+="]C1":h+=String.fromCharCode(29));break;case yt.CODE_FNC_2:case yt.CODE_FNC_3:break;case yt.CODE_FNC_4_A:!v&&A?(v=!0,A=!1):v&&A?(v=!1,A=!1):A=!0;break;case yt.CODE_SHIFT:d=!0,l=yt.CODE_CODE_B;break;case yt.CODE_CODE_B:l=yt.CODE_CODE_B;break;case yt.CODE_CODE_C:l=yt.CODE_CODE_C;break;case yt.CODE_STOP:c=!0}break;case yt.CODE_CODE_B:if(w<96)h+=A===v?String.fromCharCode(" ".charCodeAt(0)+w):String.fromCharCode(" ".charCodeAt(0)+w+128),A=!1;else switch(w!==yt.CODE_STOP&&(_=!1),w){case yt.CODE_FNC_1:i&&(0===h.length?h+="]C1":h+=String.fromCharCode(29));break;case yt.CODE_FNC_2:case yt.CODE_FNC_3:break;case yt.CODE_FNC_4_B:!v&&A?(v=!0,A=!1):v&&A?(v=!1,A=!1):A=!0;break;case yt.CODE_SHIFT:d=!0,l=yt.CODE_CODE_A;break;case yt.CODE_CODE_A:l=yt.CODE_CODE_A;break;case yt.CODE_CODE_C:l=yt.CODE_CODE_C;break;case yt.CODE_STOP:c=!0}break;case yt.CODE_CODE_C:if(w<100)w<10&&(h+="0"),h+=w;else switch(w!==yt.CODE_STOP&&(_=!1),w){case yt.CODE_FNC_1:i&&(0===h.length?h+="]C1":h+=String.fromCharCode(29));break;case yt.CODE_CODE_A:l=yt.CODE_CODE_A;break;case yt.CODE_CODE_B:l=yt.CODE_CODE_B;break;case yt.CODE_STOP:c=!0}}t&&(l=l===yt.CODE_CODE_A?yt.CODE_CODE_B:yt.CODE_CODE_A)}const S=f-p;if(f=e.getNextUnset(f),!e.isRange(f,Math.min(e.getSize(),f+(f-p)/2),!1))throw new R;if(b-=y*m,b%103!==m)throw new u;const I=h.length;if(0===I)throw new R;I>0&&_&&(h=l===yt.CODE_CODE_C?h.substring(0,I-2):h.substring(0,I-1));const T=(n[1]+n[0])/2,x=p+S/2,O=a.length,N=new Uint8Array(O);for(let t=0;t<O;t++)N[t]=a[t];const D=[new st(T,t),new st(x,t)];return new $(h,N,0,D,H.CODE_128,(new Date).getTime())}}yt.CODE_PATTERNS=[Int32Array.from([2,1,2,2,2,2]),Int32Array.from([2,2,2,1,2,2]),Int32Array.from([2,2,2,2,2,1]),Int32Array.from([1,2,1,2,2,3]),Int32Array.from([1,2,1,3,2,2]),Int32Array.from([1,3,1,2,2,2]),Int32Array.from([1,2,2,2,1,3]),Int32Array.from([1,2,2,3,1,2]),Int32Array.from([1,3,2,2,1,2]),Int32Array.from([2,2,1,2,1,3]),Int32Array.from([2,2,1,3,1,2]),Int32Array.from([2,3,1,2,1,2]),Int32Array.from([1,1,2,2,3,2]),Int32Array.from([1,2,2,1,3,2]),Int32Array.from([1,2,2,2,3,1]),Int32Array.from([1,1,3,2,2,2]),Int32Array.from([1,2,3,1,2,2]),Int32Array.from([1,2,3,2,2,1]),Int32Array.from([2,2,3,2,1,1]),Int32Array.from([2,2,1,1,3,2]),Int32Array.from([2,2,1,2,3,1]),Int32Array.from([2,1,3,2,1,2]),Int32Array.from([2,2,3,1,1,2]),Int32Array.from([3,1,2,1,3,1]),Int32Array.from([3,1,1,2,2,2]),Int32Array.from([3,2,1,1,2,2]),Int32Array.from([3,2,1,2,2,1]),Int32Array.from([3,1,2,2,1,2]),Int32Array.from([3,2,2,1,1,2]),Int32Array.from([3,2,2,2,1,1]),Int32Array.from([2,1,2,1,2,3]),Int32Array.from([2,1,2,3,2,1]),Int32Array.from([2,3,2,1,2,1]),Int32Array.from([1,1,1,3,2,3]),Int32Array.from([1,3,1,1,2,3]),Int32Array.from([1,3,1,3,2,1]),Int32Array.from([1,1,2,3,1,3]),Int32Array.from([1,3,2,1,1,3]),Int32Array.from([1,3,2,3,1,1]),Int32Array.from([2,1,1,3,1,3]),Int32Array.from([2,3,1,1,1,3]),Int32Array.from([2,3,1,3,1,1]),Int32Array.from([1,1,2,1,3,3]),Int32Array.from([1,1,2,3,3,1]),Int32Array.from([1,3,2,1,3,1]),Int32Array.from([1,1,3,1,2,3]),Int32Array.from([1,1,3,3,2,1]),Int32Array.from([1,3,3,1,2,1]),Int32Array.from([3,1,3,1,2,1]),Int32Array.from([2,1,1,3,3,1]),Int32Array.from([2,3,1,1,3,1]),Int32Array.from([2,1,3,1,1,3]),Int32Array.from([2,1,3,3,1,1]),Int32Array.from([2,1,3,1,3,1]),Int32Array.from([3,1,1,1,2,3]),Int32Array.from([3,1,1,3,2,1]),Int32Array.from([3,3,1,1,2,1]),Int32Array.from([3,1,2,1,1,3]),Int32Array.from([3,1,2,3,1,1]),Int32Array.from([3,3,2,1,1,1]),Int32Array.from([3,1,4,1,1,1]),Int32Array.from([2,2,1,4,1,1]),Int32Array.from([4,3,1,1,1,1]),Int32Array.from([1,1,1,2,2,4]),Int32Array.from([1,1,1,4,2,2]),Int32Array.from([1,2,1,1,2,4]),Int32Array.from([1,2,1,4,2,1]),Int32Array.from([1,4,1,1,2,2]),Int32Array.from([1,4,1,2,2,1]),Int32Array.from([1,1,2,2,1,4]),Int32Array.from([1,1,2,4,1,2]),Int32Array.from([1,2,2,1,1,4]),Int32Array.from([1,2,2,4,1,1]),Int32Array.from([1,4,2,1,1,2]),Int32Array.from([1,4,2,2,1,1]),Int32Array.from([2,4,1,2,1,1]),Int32Array.from([2,2,1,1,1,4]),Int32Array.from([4,1,3,1,1,1]),Int32Array.from([2,4,1,1,1,2]),Int32Array.from([1,3,4,1,1,1]),Int32Array.from([1,1,1,2,4,2]),Int32Array.from([1,2,1,1,4,2]),Int32Array.from([1,2,1,2,4,1]),Int32Array.from([1,1,4,2,1,2]),Int32Array.from([1,2,4,1,1,2]),Int32Array.from([1,2,4,2,1,1]),Int32Array.from([4,1,1,2,1,2]),Int32Array.from([4,2,1,1,1,2]),Int32Array.from([4,2,1,2,1,1]),Int32Array.from([2,1,2,1,4,1]),Int32Array.from([2,1,4,1,2,1]),Int32Array.from([4,1,2,1,2,1]),Int32Array.from([1,1,1,1,4,3]),Int32Array.from([1,1,1,3,4,1]),Int32Array.from([1,3,1,1,4,1]),Int32Array.from([1,1,4,1,1,3]),Int32Array.from([1,1,4,3,1,1]),Int32Array.from([4,1,1,1,1,3]),Int32Array.from([4,1,1,3,1,1]),Int32Array.from([1,1,3,1,4,1]),Int32Array.from([1,1,4,1,3,1]),Int32Array.from([3,1,1,1,4,1]),Int32Array.from([4,1,1,1,3,1]),Int32Array.from([2,1,1,4,1,2]),Int32Array.from([2,1,1,2,1,4]),Int32Array.from([2,1,1,2,3,2]),Int32Array.from([2,3,3,1,1,1,2])],yt.MAX_AVG_VARIANCE=.25,yt.MAX_INDIVIDUAL_VARIANCE=.7,yt.CODE_SHIFT=98,yt.CODE_CODE_C=99,yt.CODE_CODE_B=100,yt.CODE_CODE_A=101,yt.CODE_FNC_1=102,yt.CODE_FNC_2=97,yt.CODE_FNC_3=96,yt.CODE_FNC_4_A=101,yt.CODE_FNC_4_B=100,yt.CODE_START_A=103,yt.CODE_START_B=104,yt.CODE_START_C=105,yt.CODE_STOP=106;class _t extends bt{constructor(t=!1,e=!1){super(),this.usingCheckDigit=t,this.extendedMode=e,this.decodeRowResult="",this.counters=new Int32Array(9)}decodeRow(t,e,r){let i=this.counters;i.fill(0),this.decodeRowResult="";let n,o,s=_t.findAsteriskPattern(e,i),a=e.getNextSet(s[1]),l=e.getSize();do{_t.recordPattern(e,a,i);let t=_t.toNarrowWidePattern(i);if(t<0)throw new R;n=_t.patternToChar(t),this.decodeRowResult+=n,o=a;for(let t of i)a+=t;a=e.getNextSet(a)}while("*"!==n);this.decodeRowResult=this.decodeRowResult.substring(0,this.decodeRowResult.length-1);let c,d=0;for(let t of i)d+=t;if(a!==l&&2*(a-o-d)<d)throw new R;if(this.usingCheckDigit){let t=this.decodeRowResult.length-1,e=0;for(let r=0;r<t;r++)e+=_t.ALPHABET_STRING.indexOf(this.decodeRowResult.charAt(r));if(this.decodeRowResult.charAt(t)!==_t.ALPHABET_STRING.charAt(e%43))throw new u;this.decodeRowResult=this.decodeRowResult.substring(0,t)}if(0===this.decodeRowResult.length)throw new R;c=this.extendedMode?_t.decodeExtended(this.decodeRowResult):this.decodeRowResult;let h=(s[1]+s[0])/2,p=o+d/2;return new $(c,null,0,[new st(h,t),new st(p,t)],H.CODE_39,(new Date).getTime())}static findAsteriskPattern(t,e){let r=t.getSize(),i=t.getNextSet(0),n=0,o=i,s=!1,a=e.length;for(let l=i;l<r;l++)if(t.get(l)!==s)e[n]++;else{if(n===a-1){if(this.toNarrowWidePattern(e)===_t.ASTERISK_ENCODING&&t.isRange(Math.max(0,o-Math.floor((l-o)/2)),o,!1))return[o,l];o+=e[0]+e[1],e.copyWithin(0,2,2+n-1),e[n-1]=0,e[n]=0,n--}else n++;e[n]=1,s=!s}throw new R}static toNarrowWidePattern(t){let e,r=t.length,i=0;do{let n=2147483647;for(let e of t)e<n&&e>i&&(n=e);i=n,e=0;let o=0,s=0;for(let n=0;n<r;n++){let a=t[n];a>i&&(s|=1<<r-1-n,e++,o+=a)}if(3===e){for(let n=0;n<r&&e>0;n++){let r=t[n];if(r>i&&(e--,2*r>=o))return-1}return s}}while(e>3);return-1}static patternToChar(t){for(let e=0;e<_t.CHARACTER_ENCODINGS.length;e++)if(_t.CHARACTER_ENCODINGS[e]===t)return _t.ALPHABET_STRING.charAt(e);if(t===_t.ASTERISK_ENCODING)return"*";throw new R}static decodeExtended(t){let e=t.length,r="";for(let i=0;i<e;i++){let e=t.charAt(i);if("+"===e||"$"===e||"%"===e||"/"===e){let n=t.charAt(i+1),o="\0";switch(e){case"+":if(!(n>="A"&&n<="Z"))throw new C;o=String.fromCharCode(n.charCodeAt(0)+32);break;case"$":if(!(n>="A"&&n<="Z"))throw new C;o=String.fromCharCode(n.charCodeAt(0)-64);break;case"%":if(n>="A"&&n<="E")o=String.fromCharCode(n.charCodeAt(0)-38);else if(n>="F"&&n<="J")o=String.fromCharCode(n.charCodeAt(0)-11);else if(n>="K"&&n<="O")o=String.fromCharCode(n.charCodeAt(0)+16);else if(n>="P"&&n<="T")o=String.fromCharCode(n.charCodeAt(0)+43);else if("U"===n)o="\0";else if("V"===n)o="@";else if("W"===n)o="`";else{if("X"!==n&&"Y"!==n&&"Z"!==n)throw new C;o=""}break;case"/":if(n>="A"&&n<="O")o=String.fromCharCode(n.charCodeAt(0)-32);else{if("Z"!==n)throw new C;o=":"}}r+=o,i++}else r+=e}return r}}_t.ALPHABET_STRING="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%",_t.CHARACTER_ENCODINGS=[52,289,97,352,49,304,112,37,292,100,265,73,328,25,280,88,13,268,76,28,259,67,322,19,274,82,7,262,70,22,385,193,448,145,400,208,133,388,196,168,162,138,42],_t.ASTERISK_ENCODING=148;class Et extends bt{constructor(){super(...arguments),this.narrowLineWidth=-1}decodeRow(t,e,r){let i=this.decodeStart(e),n=this.decodeEnd(e),o=new T;Et.decodeMiddle(e,i[1],n[0],o);let s=o.toString(),a=null;null!=r&&(a=r.get(E.ALLOWED_LENGTHS)),null==a&&(a=Et.DEFAULT_ALLOWED_LENGTHS);let l=s.length,c=!1,d=0;for(let t of a){if(l===t){c=!0;break}t>d&&(d=t)}if(!c&&l>d&&(c=!0),!c)throw new C;const h=[new st(i[1],t),new st(n[0],t)];return new $(s,null,0,h,H.ITF,(new Date).getTime())}static decodeMiddle(t,e,r,i){let n=new Int32Array(10),o=new Int32Array(5),s=new Int32Array(5);for(n.fill(0),o.fill(0),s.fill(0);e<r;){bt.recordPattern(t,e,n);for(let t=0;t<5;t++){let e=2*t;o[t]=n[e],s[t]=n[e+1]}let r=Et.decodeDigit(o);i.append(r.toString()),r=this.decodeDigit(s),i.append(r.toString()),n.forEach(function(t){e+=t})}}decodeStart(t){let e=Et.skipWhiteSpace(t),r=Et.findGuardPattern(t,e,Et.START_PATTERN);return this.narrowLineWidth=(r[1]-r[0])/4,this.validateQuietZone(t,r[0]),r}validateQuietZone(t,e){let r=10*this.narrowLineWidth;r=r<e?r:e;for(let i=e-1;r>0&&i>=0&&!t.get(i);i--)r--;if(0!==r)throw new R}static skipWhiteSpace(t){const e=t.getSize(),r=t.getNextSet(0);if(r===e)throw new R;return r}decodeEnd(t){t.reverse();try{let e,r=Et.skipWhiteSpace(t);try{e=Et.findGuardPattern(t,r,Et.END_PATTERN_REVERSED[0])}catch(i){i instanceof R&&(e=Et.findGuardPattern(t,r,Et.END_PATTERN_REVERSED[1]))}this.validateQuietZone(t,e[0]);let i=e[0];return e[0]=t.getSize()-e[1],e[1]=t.getSize()-i,e}finally{t.reverse()}}static findGuardPattern(t,e,r){let i=r.length,n=new Int32Array(i),o=t.getSize(),s=!1,a=0,l=e;n.fill(0);for(let c=e;c<o;c++)if(t.get(c)!==s)n[a]++;else{if(a===i-1){if(bt.patternMatchVariance(n,r,Et.MAX_INDIVIDUAL_VARIANCE)<Et.MAX_AVG_VARIANCE)return[l,c];l+=n[0]+n[1],f.arraycopy(n,2,n,0,a-1),n[a-1]=0,n[a]=0,a--}else a++;n[a]=1,s=!s}throw new R}static decodeDigit(t){let e=Et.MAX_AVG_VARIANCE,r=-1,i=Et.PATTERNS.length;for(let n=0;n<i;n++){let i=Et.PATTERNS[n],o=bt.patternMatchVariance(t,i,Et.MAX_INDIVIDUAL_VARIANCE);o<e?(e=o,r=n):o===e&&(r=-1)}if(r>=0)return r%10;throw new R}}Et.PATTERNS=[Int32Array.from([1,1,2,2,1]),Int32Array.from([2,1,1,1,2]),Int32Array.from([1,2,1,1,2]),Int32Array.from([2,2,1,1,1]),Int32Array.from([1,1,2,1,2]),Int32Array.from([2,1,2,1,1]),Int32Array.from([1,2,2,1,1]),Int32Array.from([1,1,1,2,2]),Int32Array.from([2,1,1,2,1]),Int32Array.from([1,2,1,2,1]),Int32Array.from([1,1,3,3,1]),Int32Array.from([3,1,1,1,3]),Int32Array.from([1,3,1,1,3]),Int32Array.from([3,3,1,1,1]),Int32Array.from([1,1,3,1,3]),Int32Array.from([3,1,3,1,1]),Int32Array.from([1,3,3,1,1]),Int32Array.from([1,1,1,3,3]),Int32Array.from([3,1,1,3,1]),Int32Array.from([1,3,1,3,1])],Et.MAX_AVG_VARIANCE=.38,Et.MAX_INDIVIDUAL_VARIANCE=.5,Et.DEFAULT_ALLOWED_LENGTHS=[6,8,10,12,14],Et.START_PATTERN=Int32Array.from([1,1,1,1]),Et.END_PATTERN_REVERSED=[Int32Array.from([1,1,2]),Int32Array.from([1,1,3])];class vt extends bt{constructor(){super(...arguments),this.decodeRowStringBuffer=""}static findStartGuardPattern(t){let e,r=!1,i=0,n=Int32Array.from([0,0,0]);for(;!r;){n=Int32Array.from([0,0,0]),e=vt.findGuardPattern(t,i,!1,this.START_END_PATTERN,n);let o=e[0];i=e[1];let s=o-(i-o);s>=0&&(r=t.isRange(s,o,!1))}return e}static checkChecksum(t){return vt.checkStandardUPCEANChecksum(t)}static checkStandardUPCEANChecksum(t){let e=t.length;if(0===e)return!1;let r=parseInt(t.charAt(e-1),10);return vt.getStandardUPCEANChecksum(t.substring(0,e-1))===r}static getStandardUPCEANChecksum(t){let e=t.length,r=0;for(let i=e-1;i>=0;i-=2){let e=t.charAt(i).charCodeAt(0)-"0".charCodeAt(0);if(e<0||e>9)throw new C;r+=e}r*=3;for(let i=e-2;i>=0;i-=2){let e=t.charAt(i).charCodeAt(0)-"0".charCodeAt(0);if(e<0||e>9)throw new C;r+=e}return(1e3-r)%10}static decodeEnd(t,e){return vt.findGuardPattern(t,e,!1,vt.START_END_PATTERN,new Int32Array(vt.START_END_PATTERN.length).fill(0))}static findGuardPatternWithoutCounters(t,e,r,i){return this.findGuardPattern(t,e,r,i,new Int32Array(i.length))}static findGuardPattern(t,e,r,i,n){let o=t.getSize(),s=0,a=e=r?t.getNextUnset(e):t.getNextSet(e),l=i.length,c=r;for(let r=e;r<o;r++)if(t.get(r)!==c)n[s]++;else{if(s===l-1){if(bt.patternMatchVariance(n,i,vt.MAX_INDIVIDUAL_VARIANCE)<vt.MAX_AVG_VARIANCE)return Int32Array.from([a,r]);a+=n[0]+n[1];let t=n.slice(2,n.length-1);for(let e=0;e<s-1;e++)n[e]=t[e];n[s-1]=0,n[s]=0,s--}else s++;n[s]=1,c=!c}throw new R}static decodeDigit(t,e,r,i){this.recordPattern(t,r,e);let n=this.MAX_AVG_VARIANCE,o=-1,s=i.length;for(let t=0;t<s;t++){let r=i[t],s=bt.patternMatchVariance(e,r,vt.MAX_INDIVIDUAL_VARIANCE);s<n&&(n=s,o=t)}if(o>=0)return o;throw new R}}vt.MAX_AVG_VARIANCE=.48,vt.MAX_INDIVIDUAL_VARIANCE=.7,vt.START_END_PATTERN=Int32Array.from([1,1,1]),vt.MIDDLE_PATTERN=Int32Array.from([1,1,1,1,1]),vt.END_PATTERN=Int32Array.from([1,1,1,1,1,1]),vt.L_PATTERNS=[Int32Array.from([3,2,1,1]),Int32Array.from([2,2,2,1]),Int32Array.from([2,1,2,2]),Int32Array.from([1,4,1,1]),Int32Array.from([1,1,3,2]),Int32Array.from([1,2,3,1]),Int32Array.from([1,1,1,4]),Int32Array.from([1,3,1,2]),Int32Array.from([1,2,1,3]),Int32Array.from([3,1,1,2])];class At{constructor(){this.CHECK_DIGIT_ENCODINGS=[24,20,18,17,12,6,3,10,9,5],this.decodeMiddleCounters=Int32Array.from([0,0,0,0]),this.decodeRowStringBuffer=""}decodeRow(t,e,r){let i=this.decodeRowStringBuffer,n=this.decodeMiddle(e,r,i),o=i.toString(),s=At.parseExtensionString(o),a=[new st((r[0]+r[1])/2,t),new st(n,t)],l=new $(o,null,0,a,H.UPC_EAN_EXTENSION,(new Date).getTime());return null!=s&&l.putAllMetadata(s),l}decodeMiddle(t,e,r){let i=this.decodeMiddleCounters;i[0]=0,i[1]=0,i[2]=0,i[3]=0;let n=t.getSize(),o=e[1],s=0;for(let e=0;e<5&&o<n;e++){let n=vt.decodeDigit(t,i,o,vt.L_AND_G_PATTERNS);r+=String.fromCharCode("0".charCodeAt(0)+n%10);for(let t of i)o+=t;n>=10&&(s|=1<<4-e),4!==e&&(o=t.getNextSet(o),o=t.getNextUnset(o))}if(5!==r.length)throw new R;let a=this.determineCheckDigit(s);if(At.extensionChecksum(r.toString())!==a)throw new R;return o}static extensionChecksum(t){let e=t.length,r=0;for(let i=e-2;i>=0;i-=2)r+=t.charAt(i).charCodeAt(0)-"0".charCodeAt(0);r*=3;for(let i=e-1;i>=0;i-=2)r+=t.charAt(i).charCodeAt(0)-"0".charCodeAt(0);return r*=3,r%10}determineCheckDigit(t){for(let e=0;e<10;e++)if(t===this.CHECK_DIGIT_ENCODINGS[e])return e;throw new R}static parseExtensionString(t){if(5!==t.length)return null;let e=At.parseExtension5String(t);return null==e?null:new Map([[Y.SUGGESTED_PRICE,e]])}static parseExtension5String(t){let e;switch(t.charAt(0)){case"0":e="£";break;case"5":e="$";break;case"9":switch(t){case"90000":return null;case"99991":return"0.00";case"99990":return"Used"}e="";break;default:e=""}let r=parseInt(t.substring(1)),i=r%100;return e+(r/100).toString()+"."+(i<10?"0"+i:i.toString())}}class St{constructor(){this.decodeMiddleCounters=Int32Array.from([0,0,0,0]),this.decodeRowStringBuffer=""}decodeRow(t,e,r){let i=this.decodeRowStringBuffer,n=this.decodeMiddle(e,r,i),o=i.toString(),s=St.parseExtensionString(o),a=[new st((r[0]+r[1])/2,t),new st(n,t)],l=new $(o,null,0,a,H.UPC_EAN_EXTENSION,(new Date).getTime());return null!=s&&l.putAllMetadata(s),l}decodeMiddle(t,e,r){let i=this.decodeMiddleCounters;i[0]=0,i[1]=0,i[2]=0,i[3]=0;let n=t.getSize(),o=e[1],s=0;for(let e=0;e<2&&o<n;e++){let n=vt.decodeDigit(t,i,o,vt.L_AND_G_PATTERNS);r+=String.fromCharCode("0".charCodeAt(0)+n%10);for(let t of i)o+=t;n>=10&&(s|=1<<1-e),1!==e&&(o=t.getNextSet(o),o=t.getNextUnset(o))}if(2!==r.length)throw new R;if(parseInt(r.toString())%4!==s)throw new R;return o}static parseExtensionString(t){return 2!==t.length?null:new Map([[Y.ISSUE_NUMBER,parseInt(t)]])}}class It{static decodeRow(t,e,r){let i=vt.findGuardPattern(e,r,!1,this.EXTENSION_START_PATTERN,new Int32Array(this.EXTENSION_START_PATTERN.length).fill(0));try{return(new At).decodeRow(t,e,i)}catch(r){return(new St).decodeRow(t,e,i)}}}It.EXTENSION_START_PATTERN=Int32Array.from([1,1,2]);class Tt extends vt{constructor(){super(),this.decodeRowStringBuffer="",Tt.L_AND_G_PATTERNS=Tt.L_PATTERNS.map(t=>Int32Array.from(t));for(let t=10;t<20;t++){let e=Tt.L_PATTERNS[t-10],r=new Int32Array(e.length);for(let t=0;t<e.length;t++)r[t]=e[e.length-t-1];Tt.L_AND_G_PATTERNS[t]=r}}decodeRow(t,e,r){let i=Tt.findStartGuardPattern(e),n=null==r?null:r.get(E.NEED_RESULT_POINT_CALLBACK);if(null!=n){const e=new st((i[0]+i[1])/2,t);n.foundPossibleResultPoint(e)}let o=this.decodeMiddle(e,i,this.decodeRowStringBuffer),s=o.rowOffset,a=o.resultString;if(null!=n){const e=new st(s,t);n.foundPossibleResultPoint(e)}let l=this.decodeEnd(e,s);if(null!=n){const e=new st((l[0]+l[1])/2,t);n.foundPossibleResultPoint(e)}let c=l[1],d=c+(c-l[0]);if(d>=e.getSize()||!e.isRange(c,d,!1))throw new R;let h=a.toString();if(h.length<8)throw new C;if(!Tt.checkChecksum(h))throw new u;let p=(i[1]+i[0])/2,f=(l[1]+l[0])/2,g=this.getBarcodeFormat(),m=[new st(p,t),new st(f,t)],w=new $(h,null,0,m,g,(new Date).getTime()),b=0;try{let r=It.decodeRow(t,e,l[1]);w.putMetadata(Y.UPC_EAN_EXTENSION,r.getText()),w.putAllMetadata(r.getResultMetadata()),w.addResultPoints(r.getResultPoints()),b=r.getText().length}catch(t){}let y=null==r?null:r.get(E.ALLOWED_EAN_EXTENSIONS);if(null!=y){let t=!1;for(let e in y)if(b.toString()===e){t=!0;break}if(!t)throw new R}return w}decodeEnd(t,e){return Tt.findGuardPattern(t,e,!1,Tt.START_END_PATTERN,new Int32Array(Tt.START_END_PATTERN.length).fill(0))}static checkChecksum(t){return Tt.checkStandardUPCEANChecksum(t)}static checkStandardUPCEANChecksum(t){let e=t.length;if(0===e)return!1;let r=parseInt(t.charAt(e-1),10);return Tt.getStandardUPCEANChecksum(t.substring(0,e-1))===r}static getStandardUPCEANChecksum(t){let e=t.length,r=0;for(let i=e-1;i>=0;i-=2){let e=t.charAt(i).charCodeAt(0)-"0".charCodeAt(0);if(e<0||e>9)throw new C;r+=e}r*=3;for(let i=e-2;i>=0;i-=2){let e=t.charAt(i).charCodeAt(0)-"0".charCodeAt(0);if(e<0||e>9)throw new C;r+=e}return(1e3-r)%10}}class xt extends Tt{constructor(){super(),this.decodeMiddleCounters=Int32Array.from([0,0,0,0])}decodeMiddle(t,e,r){let i=this.decodeMiddleCounters;i[0]=0,i[1]=0,i[2]=0,i[3]=0;let n=t.getSize(),o=e[1],s=0;for(let e=0;e<6&&o<n;e++){let n=Tt.decodeDigit(t,i,o,Tt.L_AND_G_PATTERNS);r+=String.fromCharCode("0".charCodeAt(0)+n%10);for(let t of i)o+=t;n>=10&&(s|=1<<5-e)}r=xt.determineFirstDigit(r,s),o=Tt.findGuardPattern(t,o,!0,Tt.MIDDLE_PATTERN,new Int32Array(Tt.MIDDLE_PATTERN.length).fill(0))[1];for(let e=0;e<6&&o<n;e++){let e=Tt.decodeDigit(t,i,o,Tt.L_PATTERNS);r+=String.fromCharCode("0".charCodeAt(0)+e);for(let t of i)o+=t}return{rowOffset:o,resultString:r}}getBarcodeFormat(){return H.EAN_13}static determineFirstDigit(t,e){for(let r=0;r<10;r++)if(e===this.FIRST_DIGIT_ENCODINGS[r])return t=String.fromCharCode("0".charCodeAt(0)+r)+t;throw new R}}xt.FIRST_DIGIT_ENCODINGS=[0,11,13,14,19,25,28,21,22,26];class Rt extends Tt{constructor(){super(),this.decodeMiddleCounters=Int32Array.from([0,0,0,0])}decodeMiddle(t,e,r){const i=this.decodeMiddleCounters;i[0]=0,i[1]=0,i[2]=0,i[3]=0;let n=t.getSize(),o=e[1];for(let e=0;e<4&&o<n;e++){let e=Tt.decodeDigit(t,i,o,Tt.L_PATTERNS);r+=String.fromCharCode("0".charCodeAt(0)+e);for(let t of i)o+=t}o=Tt.findGuardPattern(t,o,!0,Tt.MIDDLE_PATTERN,new Int32Array(Tt.MIDDLE_PATTERN.length).fill(0))[1];for(let e=0;e<4&&o<n;e++){let e=Tt.decodeDigit(t,i,o,Tt.L_PATTERNS);r+=String.fromCharCode("0".charCodeAt(0)+e);for(let t of i)o+=t}return{rowOffset:o,resultString:r}}getBarcodeFormat(){return H.EAN_8}}class Ot extends Tt{constructor(){super(...arguments),this.ean13Reader=new xt}getBarcodeFormat(){return H.UPC_A}decode(t,e){return this.maybeReturnResult(this.ean13Reader.decode(t))}decodeRow(t,e,r){return this.maybeReturnResult(this.ean13Reader.decodeRow(t,e,r))}decodeMiddle(t,e,r){return this.ean13Reader.decodeMiddle(t,e,r)}maybeReturnResult(t){let e=t.getText();if("0"===e.charAt(0)){let r=new $(e.substring(1),null,null,t.getResultPoints(),H.UPC_A);return null!=t.getResultMetadata()&&r.putAllMetadata(t.getResultMetadata()),r}throw new R}reset(){this.ean13Reader.reset()}}class Nt extends Tt{constructor(){super(),this.decodeMiddleCounters=new Int32Array(4)}decodeMiddle(t,e,r){const i=this.decodeMiddleCounters.map(t=>t);i[0]=0,i[1]=0,i[2]=0,i[3]=0;const n=t.getSize();let o=e[1],s=0;for(let e=0;e<6&&o<n;e++){const n=Nt.decodeDigit(t,i,o,Nt.L_AND_G_PATTERNS);r+=String.fromCharCode("0".charCodeAt(0)+n%10);for(let t of i)o+=t;n>=10&&(s|=1<<5-e)}return{rowOffset:o,resultString:Nt.determineNumSysAndCheckDigit(r,s)}}decodeEnd(t,e){return Nt.findGuardPatternWithoutCounters(t,e,!0,Nt.MIDDLE_END_PATTERN)}checkChecksum(t){return Tt.checkChecksum(Nt.convertUPCEtoUPCA(t))}static determineNumSysAndCheckDigit(t,e){for(let r=0;r<=1;r++)for(let i=0;i<10;i++)if(e===this.NUMSYS_AND_CHECK_DIGIT_PATTERNS[r][i])return String.fromCharCode("0".charCodeAt(0)+r)+t+String.fromCharCode("0".charCodeAt(0)+i);throw R.getNotFoundInstance()}getBarcodeFormat(){return H.UPC_E}static convertUPCEtoUPCA(t){const e=t.slice(1,7).split("").map(t=>t.charCodeAt(0)),r=new T;r.append(t.charAt(0));let i=e[5];switch(i){case 0:case 1:case 2:r.appendChars(e,0,2),r.append(i),r.append("0000"),r.appendChars(e,2,3);break;case 3:r.appendChars(e,0,3),r.append("00000"),r.appendChars(e,3,2);break;case 4:r.appendChars(e,0,4),r.append("00000"),r.append(e[4]);break;default:r.appendChars(e,0,5),r.append("0000"),r.append(i)}return t.length>=8&&r.append(t.charAt(7)),r.toString()}}Nt.MIDDLE_END_PATTERN=Int32Array.from([1,1,1,1,1,1]),Nt.NUMSYS_AND_CHECK_DIGIT_PATTERNS=[Int32Array.from([56,52,50,49,44,38,35,42,41,37]),Int32Array.from([7,11,13,14,19,25,28,21,22,26])];class Dt extends bt{constructor(t){super();let r=null==t?null:t.get(E.POSSIBLE_FORMATS),i=[];e(r)?(i.push(new xt),i.push(new Ot),i.push(new Rt),i.push(new Nt)):(r.indexOf(H.EAN_13)>-1&&i.push(new xt),r.indexOf(H.UPC_A)>-1&&i.push(new Ot),r.indexOf(H.EAN_8)>-1&&i.push(new Rt),r.indexOf(H.UPC_E)>-1&&i.push(new Nt)),this.readers=i}decodeRow(t,e,r){for(let i of this.readers)try{const n=i.decodeRow(t,e,r),o=n.getBarcodeFormat()===H.EAN_13&&"0"===n.getText().charAt(0),s=null==r?null:r.get(E.POSSIBLE_FORMATS),a=null==s||s.includes(H.UPC_A);if(o&&a){const t=n.getRawBytes(),e=new $(n.getText().substring(1),t,t?t.length:null,n.getResultPoints(),H.UPC_A);return e.putAllMetadata(n.getResultMetadata()),e}return n}catch(t){}throw new R}reset(){for(let t of this.readers)t.reset()}}class Pt extends bt{constructor(){super(),this.decodeFinderCounters=new Int32Array(4),this.dataCharacterCounters=new Int32Array(8),this.oddRoundingErrors=new Array(4),this.evenRoundingErrors=new Array(4),this.oddCounts=new Array(this.dataCharacterCounters.length/2),this.evenCounts=new Array(this.dataCharacterCounters.length/2)}getDecodeFinderCounters(){return this.decodeFinderCounters}getDataCharacterCounters(){return this.dataCharacterCounters}getOddRoundingErrors(){return this.oddRoundingErrors}getEvenRoundingErrors(){return this.evenRoundingErrors}getOddCounts(){return this.oddCounts}getEvenCounts(){return this.evenCounts}parseFinderValue(t,e){for(let r=0;r<e.length;r++)if(bt.patternMatchVariance(t,e[r],Pt.MAX_INDIVIDUAL_VARIANCE)<Pt.MAX_AVG_VARIANCE)return r;throw new R}static count(t){return nt.sum(new Int32Array(t))}static increment(t,e){let r=0,i=e[0];for(let n=1;n<t.length;n++)e[n]>i&&(i=e[n],r=n);t[r]++}static decrement(t,e){let r=0,i=e[0];for(let n=1;n<t.length;n++)e[n]<i&&(i=e[n],r=n);t[r]--}static isFinderPattern(t){let e=t[0]+t[1],r=e/(e+t[2]+t[3]);if(r>=Pt.MIN_FINDER_PATTERN_RATIO&&r<=Pt.MAX_FINDER_PATTERN_RATIO){let e=Number.MAX_SAFE_INTEGER,r=Number.MIN_SAFE_INTEGER;for(let i of t)i>r&&(r=i),i<e&&(e=i);return r<10*e}return!1}}Pt.MAX_AVG_VARIANCE=.2,Pt.MAX_INDIVIDUAL_VARIANCE=.45,Pt.MIN_FINDER_PATTERN_RATIO=9.5/12,Pt.MAX_FINDER_PATTERN_RATIO=12.5/14;class Mt{constructor(t,e){this.value=t,this.checksumPortion=e}getValue(){return this.value}getChecksumPortion(){return this.checksumPortion}toString(){return this.value+"("+this.checksumPortion+")"}equals(t){if(!(t instanceof Mt))return!1;const e=t;return this.value===e.value&&this.checksumPortion===e.checksumPortion}hashCode(){return this.value^this.checksumPortion}}class kt{constructor(t,e,r,i,n){this.value=t,this.startEnd=e,this.value=t,this.startEnd=e,this.resultPoints=new Array,this.resultPoints.push(new st(r,n)),this.resultPoints.push(new st(i,n))}getValue(){return this.value}getStartEnd(){return this.startEnd}getResultPoints(){return this.resultPoints}equals(t){if(!(t instanceof kt))return!1;const e=t;return this.value===e.value}hashCode(){return this.value}}class Bt{constructor(){}static getRSSvalue(t,e,r){let i=0;for(let e of t)i+=e;let n=0,o=0,s=t.length;for(let a=0;a<s-1;a++){let l;for(l=1,o|=1<<a;l<t[a];l++,o&=~(1<<a)){let t=Bt.combins(i-l-1,s-a-2);if(r&&0===o&&i-l-(s-a-1)>=s-a-1&&(t-=Bt.combins(i-l-(s-a),s-a-2)),s-a-1>1){let r=0;for(let t=i-l-(s-a-2);t>e;t--)r+=Bt.combins(i-l-t-1,s-a-3);t-=r*(s-1-a)}else i-l>e&&t--;n+=t}i-=l}return n}static combins(t,e){let r,i;t-e>e?(i=e,r=t-e):(i=t-e,r=e);let n=1,o=1;for(let e=t;e>r;e--)n*=e,o<=i&&(n/=o,o++);for(;o<=i;)n/=o,o++;return n}}class Lt{static buildBitArray(t){let e=2*t.length-1;null==t[t.length-1].getRightChar()&&(e-=1);let r=new y(12*e),i=0,n=t[0].getRightChar().getValue();for(let t=11;t>=0;--t)n&1<<t&&r.set(i),i++;for(let e=1;e<t.length;++e){let n=t[e],o=n.getLeftChar().getValue();for(let t=11;t>=0;--t)o&1<<t&&r.set(i),i++;if(null!=n.getRightChar()){let t=n.getRightChar().getValue();for(let e=11;e>=0;--e)t&1<<e&&r.set(i),i++}}return r}}class Ft{constructor(t,e){e?this.decodedInformation=null:(this.finished=t,this.decodedInformation=e)}getDecodedInformation(){return this.decodedInformation}isFinished(){return this.finished}}class $t{constructor(t){this.newPosition=t}getNewPosition(){return this.newPosition}}class Ut extends $t{constructor(t,e){super(t),this.value=e}getValue(){return this.value}isFNC1(){return this.value===Ut.FNC1}}Ut.FNC1="$";class Ht extends $t{constructor(t,e,r){super(t),r?(this.remaining=!0,this.remainingValue=this.remainingValue):(this.remaining=!1,this.remainingValue=0),this.newString=e}getNewString(){return this.newString}isRemaining(){return this.remaining}getRemainingValue(){return this.remainingValue}}class Vt extends $t{constructor(t,e,r){if(super(t),e<0||e>10||r<0||r>10)throw new C;this.firstDigit=e,this.secondDigit=r}getFirstDigit(){return this.firstDigit}getSecondDigit(){return this.secondDigit}getValue(){return 10*this.firstDigit+this.secondDigit}isFirstDigitFNC1(){return this.firstDigit===Vt.FNC1}isSecondDigitFNC1(){return this.secondDigit===Vt.FNC1}isAnyFNC1(){return this.firstDigit===Vt.FNC1||this.secondDigit===Vt.FNC1}}Vt.FNC1=10;class zt{constructor(){}static parseFieldsInGeneralPurpose(t){if(!t)return null;if(t.length<2)throw new R;let e=t.substring(0,2);for(let r of zt.TWO_DIGIT_DATA_LENGTH)if(r[0]===e)return r[1]===zt.VARIABLE_LENGTH?zt.processVariableAI(2,r[2],t):zt.processFixedAI(2,r[1],t);if(t.length<3)throw new R;let r=t.substring(0,3);for(let e of zt.THREE_DIGIT_DATA_LENGTH)if(e[0]===r)return e[1]===zt.VARIABLE_LENGTH?zt.processVariableAI(3,e[2],t):zt.processFixedAI(3,e[1],t);for(let e of zt.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH)if(e[0]===r)return e[1]===zt.VARIABLE_LENGTH?zt.processVariableAI(4,e[2],t):zt.processFixedAI(4,e[1],t);if(t.length<4)throw new R;let i=t.substring(0,4);for(let e of zt.FOUR_DIGIT_DATA_LENGTH)if(e[0]===i)return e[1]===zt.VARIABLE_LENGTH?zt.processVariableAI(4,e[2],t):zt.processFixedAI(4,e[1],t);throw new R}static processFixedAI(t,e,r){if(r.length<t)throw new R;let i=r.substring(0,t);if(r.length<t+e)throw new R;let n=r.substring(t,t+e),o=r.substring(t+e),s="("+i+")"+n,a=zt.parseFieldsInGeneralPurpose(o);return null==a?s:s+a}static processVariableAI(t,e,r){let i,n=r.substring(0,t);i=r.length<t+e?r.length:t+e;let o=r.substring(t,i),s=r.substring(i),a="("+n+")"+o,l=zt.parseFieldsInGeneralPurpose(s);return null==l?a:a+l}}zt.VARIABLE_LENGTH=[],zt.TWO_DIGIT_DATA_LENGTH=[["00",18],["01",14],["02",14],["10",zt.VARIABLE_LENGTH,20],["11",6],["12",6],["13",6],["15",6],["17",6],["20",2],["21",zt.VARIABLE_LENGTH,20],["22",zt.VARIABLE_LENGTH,29],["30",zt.VARIABLE_LENGTH,8],["37",zt.VARIABLE_LENGTH,8],["90",zt.VARIABLE_LENGTH,30],["91",zt.VARIABLE_LENGTH,30],["92",zt.VARIABLE_LENGTH,30],["93",zt.VARIABLE_LENGTH,30],["94",zt.VARIABLE_LENGTH,30],["95",zt.VARIABLE_LENGTH,30],["96",zt.VARIABLE_LENGTH,30],["97",zt.VARIABLE_LENGTH,3],["98",zt.VARIABLE_LENGTH,30],["99",zt.VARIABLE_LENGTH,30]],zt.THREE_DIGIT_DATA_LENGTH=[["240",zt.VARIABLE_LENGTH,30],["241",zt.VARIABLE_LENGTH,30],["242",zt.VARIABLE_LENGTH,6],["250",zt.VARIABLE_LENGTH,30],["251",zt.VARIABLE_LENGTH,30],["253",zt.VARIABLE_LENGTH,17],["254",zt.VARIABLE_LENGTH,20],["400",zt.VARIABLE_LENGTH,30],["401",zt.VARIABLE_LENGTH,30],["402",17],["403",zt.VARIABLE_LENGTH,30],["410",13],["411",13],["412",13],["413",13],["414",13],["420",zt.VARIABLE_LENGTH,20],["421",zt.VARIABLE_LENGTH,15],["422",3],["423",zt.VARIABLE_LENGTH,15],["424",3],["425",3],["426",3]],zt.THREE_DIGIT_PLUS_DIGIT_DATA_LENGTH=[["310",6],["311",6],["312",6],["313",6],["314",6],["315",6],["316",6],["320",6],["321",6],["322",6],["323",6],["324",6],["325",6],["326",6],["327",6],["328",6],["329",6],["330",6],["331",6],["332",6],["333",6],["334",6],["335",6],["336",6],["340",6],["341",6],["342",6],["343",6],["344",6],["345",6],["346",6],["347",6],["348",6],["349",6],["350",6],["351",6],["352",6],["353",6],["354",6],["355",6],["356",6],["357",6],["360",6],["361",6],["362",6],["363",6],["364",6],["365",6],["366",6],["367",6],["368",6],["369",6],["390",zt.VARIABLE_LENGTH,15],["391",zt.VARIABLE_LENGTH,18],["392",zt.VARIABLE_LENGTH,15],["393",zt.VARIABLE_LENGTH,18],["703",zt.VARIABLE_LENGTH,30]],zt.FOUR_DIGIT_DATA_LENGTH=[["7001",13],["7002",zt.VARIABLE_LENGTH,30],["7003",10],["8001",14],["8002",zt.VARIABLE_LENGTH,20],["8003",zt.VARIABLE_LENGTH,30],["8004",zt.VARIABLE_LENGTH,30],["8005",6],["8006",18],["8007",zt.VARIABLE_LENGTH,30],["8008",zt.VARIABLE_LENGTH,12],["8018",18],["8020",zt.VARIABLE_LENGTH,25],["8100",6],["8101",10],["8102",2],["8110",zt.VARIABLE_LENGTH,70],["8200",zt.VARIABLE_LENGTH,70]];class jt{constructor(t){this.buffer=new T,this.information=t}decodeAllCodes(t,e){let r=e,i=null;for(;;){let e=this.decodeGeneralPurposeField(r,i),n=zt.parseFieldsInGeneralPurpose(e.getNewString());if(null!=n&&t.append(n),i=e.isRemaining()?""+e.getRemainingValue():null,r===e.getNewPosition())break;r=e.getNewPosition()}return t.toString()}isStillNumeric(t){if(t+7>this.information.getSize())return t+4<=this.information.getSize();for(let e=t;e<t+3;++e)if(this.information.get(e))return!0;return this.information.get(t+3)}decodeNumeric(t){if(t+7>this.information.getSize()){let e=this.extractNumericValueFromBitArray(t,4);return new Vt(this.information.getSize(),0===e?Vt.FNC1:e-1,Vt.FNC1)}let e=this.extractNumericValueFromBitArray(t,7);return new Vt(t+7,(e-8)/11,(e-8)%11)}extractNumericValueFromBitArray(t,e){return jt.extractNumericValueFromBitArray(this.information,t,e)}static extractNumericValueFromBitArray(t,e,r){let i=0;for(let n=0;n<r;++n)t.get(e+n)&&(i|=1<<r-n-1);return i}decodeGeneralPurposeField(t,e){this.buffer.setLengthToZero(),null!=e&&this.buffer.append(e),this.current.setPosition(t);let r=this.parseBlocks();return null!=r&&r.isRemaining()?new Ht(this.current.getPosition(),this.buffer.toString(),r.getRemainingValue()):new Ht(this.current.getPosition(),this.buffer.toString())}parseBlocks(){let t,e;do{let r=this.current.getPosition();if(this.current.isAlpha()?(e=this.parseAlphaBlock(),t=e.isFinished()):this.current.isIsoIec646()?(e=this.parseIsoIec646Block(),t=e.isFinished()):(e=this.parseNumericBlock(),t=e.isFinished()),r===this.current.getPosition()&&!t)break}while(!t);return e.getDecodedInformation()}parseNumericBlock(){for(;this.isStillNumeric(this.current.getPosition());){let t=this.decodeNumeric(this.current.getPosition());if(this.current.setPosition(t.getNewPosition()),t.isFirstDigitFNC1()){let e;return e=t.isSecondDigitFNC1()?new Ht(this.current.getPosition(),this.buffer.toString()):new Ht(this.current.getPosition(),this.buffer.toString(),t.getSecondDigit()),new Ft(!0,e)}if(this.buffer.append(t.getFirstDigit()),t.isSecondDigitFNC1()){let t=new Ht(this.current.getPosition(),this.buffer.toString());return new Ft(!0,t)}this.buffer.append(t.getSecondDigit())}return this.isNumericToAlphaNumericLatch(this.current.getPosition())&&(this.current.setAlpha(),this.current.incrementPosition(4)),new Ft(!1)}parseIsoIec646Block(){for(;this.isStillIsoIec646(this.current.getPosition());){let t=this.decodeIsoIec646(this.current.getPosition());if(this.current.setPosition(t.getNewPosition()),t.isFNC1()){let t=new Ht(this.current.getPosition(),this.buffer.toString());return new Ft(!0,t)}this.buffer.append(t.getValue())}return this.isAlphaOr646ToNumericLatch(this.current.getPosition())?(this.current.incrementPosition(3),this.current.setNumeric()):this.isAlphaTo646ToAlphaLatch(this.current.getPosition())&&(this.current.getPosition()+5<this.information.getSize()?this.current.incrementPosition(5):this.current.setPosition(this.information.getSize()),this.current.setAlpha()),new Ft(!1)}parseAlphaBlock(){for(;this.isStillAlpha(this.current.getPosition());){let t=this.decodeAlphanumeric(this.current.getPosition());if(this.current.setPosition(t.getNewPosition()),t.isFNC1()){let t=new Ht(this.current.getPosition(),this.buffer.toString());return new Ft(!0,t)}this.buffer.append(t.getValue())}return this.isAlphaOr646ToNumericLatch(this.current.getPosition())?(this.current.incrementPosition(3),this.current.setNumeric()):this.isAlphaTo646ToAlphaLatch(this.current.getPosition())&&(this.current.getPosition()+5<this.information.getSize()?this.current.incrementPosition(5):this.current.setPosition(this.information.getSize()),this.current.setIsoIec646()),new Ft(!1)}isStillIsoIec646(t){if(t+5>this.information.getSize())return!1;let e=this.extractNumericValueFromBitArray(t,5);if(e>=5&&e<16)return!0;if(t+7>this.information.getSize())return!1;let r=this.extractNumericValueFromBitArray(t,7);if(r>=64&&r<116)return!0;if(t+8>this.information.getSize())return!1;let i=this.extractNumericValueFromBitArray(t,8);return i>=232&&i<253}decodeIsoIec646(t){let e=this.extractNumericValueFromBitArray(t,5);if(15===e)return new Ut(t+5,Ut.FNC1);if(e>=5&&e<15)return new Ut(t+5,"0"+(e-5));let r,i=this.extractNumericValueFromBitArray(t,7);if(i>=64&&i<90)return new Ut(t+7,""+(i+1));if(i>=90&&i<116)return new Ut(t+7,""+(i+7));switch(this.extractNumericValueFromBitArray(t,8)){case 232:r="!";break;case 233:r='"';break;case 234:r="%";break;case 235:r="&";break;case 236:r="'";break;case 237:r="(";break;case 238:r=")";break;case 239:r="*";break;case 240:r="+";break;case 241:r=",";break;case 242:r="-";break;case 243:r=".";break;case 244:r="/";break;case 245:r=":";break;case 246:r=";";break;case 247:r="<";break;case 248:r="=";break;case 249:r=">";break;case 250:r="?";break;case 251:r="_";break;case 252:r=" ";break;default:throw new C}return new Ut(t+8,r)}isStillAlpha(t){if(t+5>this.information.getSize())return!1;let e=this.extractNumericValueFromBitArray(t,5);if(e>=5&&e<16)return!0;if(t+6>this.information.getSize())return!1;let r=this.extractNumericValueFromBitArray(t,6);return r>=16&&r<63}decodeAlphanumeric(t){let e=this.extractNumericValueFromBitArray(t,5);if(15===e)return new Ut(t+5,Ut.FNC1);if(e>=5&&e<15)return new Ut(t+5,"0"+(e-5));let r,i=this.extractNumericValueFromBitArray(t,6);if(i>=32&&i<58)return new Ut(t+6,""+(i+33));switch(i){case 58:r="*";break;case 59:r=",";break;case 60:r="-";break;case 61:r=".";break;case 62:r="/";break;default:throw new et("Decoding invalid alphanumeric value: "+i)}return new Ut(t+6,r)}isAlphaTo646ToAlphaLatch(t){if(t+1>this.information.getSize())return!1;for(let e=0;e<5&&e+t<this.information.getSize();++e)if(2===e){if(!this.information.get(t+2))return!1}else if(this.information.get(t+e))return!1;return!0}isAlphaOr646ToNumericLatch(t){if(t+3>this.information.getSize())return!1;for(let e=t;e<t+3;++e)if(this.information.get(e))return!1;return!0}isNumericToAlphaNumericLatch(t){if(t+1>this.information.getSize())return!1;for(let e=0;e<4&&e+t<this.information.getSize();++e)if(this.information.get(t+e))return!1;return!0}}class Gt{constructor(t){this.information=t,this.generalDecoder=new jt(t)}getInformation(){return this.information}getGeneralDecoder(){return this.generalDecoder}}class Xt extends Gt{constructor(t){super(t)}encodeCompressedGtin(t,e){t.append("(01)");let r=t.length();t.append("9"),this.encodeCompressedGtinWithoutAI(t,e,r)}encodeCompressedGtinWithoutAI(t,e,r){for(let r=0;r<4;++r){let i=this.getGeneralDecoder().extractNumericValueFromBitArray(e+10*r,10);i/100==0&&t.append("0"),i/10==0&&t.append("0"),t.append(i)}Xt.appendCheckDigit(t,r)}static appendCheckDigit(t,e){let r=0;for(let i=0;i<13;i++){let n=t.charAt(i+e).charCodeAt(0)-"0".charCodeAt(0);r+=1&i?n:3*n}r=10-r%10,10===r&&(r=0),t.append(r)}}Xt.GTIN_SIZE=40;class Wt extends Xt{constructor(t){super(t)}parseInformation(){let t=new T;t.append("(01)");let e=t.length(),r=this.getGeneralDecoder().extractNumericValueFromBitArray(Wt.HEADER_SIZE,4);return t.append(r),this.encodeCompressedGtinWithoutAI(t,Wt.HEADER_SIZE+4,e),this.getGeneralDecoder().decodeAllCodes(t,Wt.HEADER_SIZE+44)}}Wt.HEADER_SIZE=4;class Yt extends Gt{constructor(t){super(t)}parseInformation(){let t=new T;return this.getGeneralDecoder().decodeAllCodes(t,Yt.HEADER_SIZE)}}Yt.HEADER_SIZE=5;class Zt extends Xt{constructor(t){super(t)}encodeCompressedWeight(t,e,r){let i=this.getGeneralDecoder().extractNumericValueFromBitArray(e,r);this.addWeightCode(t,i);let n=this.checkWeight(i),o=1e5;for(let e=0;e<5;++e)n/o===0&&t.append("0"),o/=10;t.append(n)}}class qt extends Zt{constructor(t){super(t)}parseInformation(){if(this.getInformation().getSize()!=qt.HEADER_SIZE+Zt.GTIN_SIZE+qt.WEIGHT_SIZE)throw new R;let t=new T;return this.encodeCompressedGtin(t,qt.HEADER_SIZE),this.encodeCompressedWeight(t,qt.HEADER_SIZE+Zt.GTIN_SIZE,qt.WEIGHT_SIZE),t.toString()}}qt.HEADER_SIZE=5,qt.WEIGHT_SIZE=15;class Kt extends qt{constructor(t){super(t)}addWeightCode(t,e){t.append("(3103)")}checkWeight(t){return t}}class Qt extends qt{constructor(t){super(t)}addWeightCode(t,e){e<1e4?t.append("(3202)"):t.append("(3203)")}checkWeight(t){return t<1e4?t:t-1e4}}class Jt extends Xt{constructor(t){super(t)}parseInformation(){if(this.getInformation().getSize()<Jt.HEADER_SIZE+Xt.GTIN_SIZE)throw new R;let t=new T;this.encodeCompressedGtin(t,Jt.HEADER_SIZE);let e=this.getGeneralDecoder().extractNumericValueFromBitArray(Jt.HEADER_SIZE+Xt.GTIN_SIZE,Jt.LAST_DIGIT_SIZE);t.append("(392"),t.append(e),t.append(")");let r=this.getGeneralDecoder().decodeGeneralPurposeField(Jt.HEADER_SIZE+Xt.GTIN_SIZE+Jt.LAST_DIGIT_SIZE,null);return t.append(r.getNewString()),t.toString()}}Jt.HEADER_SIZE=8,Jt.LAST_DIGIT_SIZE=2;class te extends Xt{constructor(t){super(t)}parseInformation(){if(this.getInformation().getSize()<te.HEADER_SIZE+Xt.GTIN_SIZE)throw new R;let t=new T;this.encodeCompressedGtin(t,te.HEADER_SIZE);let e=this.getGeneralDecoder().extractNumericValueFromBitArray(te.HEADER_SIZE+Xt.GTIN_SIZE,te.LAST_DIGIT_SIZE);t.append("(393"),t.append(e),t.append(")");let r=this.getGeneralDecoder().extractNumericValueFromBitArray(te.HEADER_SIZE+Xt.GTIN_SIZE+te.LAST_DIGIT_SIZE,te.FIRST_THREE_DIGITS_SIZE);r/100==0&&t.append("0"),r/10==0&&t.append("0"),t.append(r);let i=this.getGeneralDecoder().decodeGeneralPurposeField(te.HEADER_SIZE+Xt.GTIN_SIZE+te.LAST_DIGIT_SIZE+te.FIRST_THREE_DIGITS_SIZE,null);return t.append(i.getNewString()),t.toString()}}te.HEADER_SIZE=8,te.LAST_DIGIT_SIZE=2,te.FIRST_THREE_DIGITS_SIZE=10;class ee extends Zt{constructor(t,e,r){super(t),this.dateCode=r,this.firstAIdigits=e}parseInformation(){if(this.getInformation().getSize()!=ee.HEADER_SIZE+ee.GTIN_SIZE+ee.WEIGHT_SIZE+ee.DATE_SIZE)throw new R;let t=new T;return this.encodeCompressedGtin(t,ee.HEADER_SIZE),this.encodeCompressedWeight(t,ee.HEADER_SIZE+ee.GTIN_SIZE,ee.WEIGHT_SIZE),this.encodeCompressedDate(t,ee.HEADER_SIZE+ee.GTIN_SIZE+ee.WEIGHT_SIZE),t.toString()}encodeCompressedDate(t,e){let r=this.getGeneralDecoder().extractNumericValueFromBitArray(e,ee.DATE_SIZE);if(38400==r)return;t.append("("),t.append(this.dateCode),t.append(")");let i=r%32;r/=32;let n=r%12+1;r/=12;let o=r;o/10==0&&t.append("0"),t.append(o),n/10==0&&t.append("0"),t.append(n),i/10==0&&t.append("0"),t.append(i)}addWeightCode(t,e){t.append("("),t.append(this.firstAIdigits),t.append(e/1e5),t.append(")")}checkWeight(t){return t%1e5}}function re(t){try{if(t.get(1))return new Wt(t);if(!t.get(2))return new Yt(t);switch(jt.extractNumericValueFromBitArray(t,1,4)){case 4:return new Kt(t);case 5:return new Qt(t)}switch(jt.extractNumericValueFromBitArray(t,1,5)){case 12:return new Jt(t);case 13:return new te(t)}switch(jt.extractNumericValueFromBitArray(t,1,7)){case 56:return new ee(t,"310","11");case 57:return new ee(t,"320","11");case 58:return new ee(t,"310","13");case 59:return new ee(t,"320","13");case 60:return new ee(t,"310","15");case 61:return new ee(t,"320","15");case 62:return new ee(t,"310","17");case 63:return new ee(t,"320","17")}}catch(e){throw console.log(e),new et("unknown decoder: "+t)}}ee.HEADER_SIZE=8,ee.WEIGHT_SIZE=20,ee.DATE_SIZE=16;class ie{constructor(t,e,r,i){this.leftchar=t,this.rightchar=e,this.finderpattern=r,this.maybeLast=i}mayBeLast(){return this.maybeLast}getLeftChar(){return this.leftchar}getRightChar(){return this.rightchar}getFinderPattern(){return this.finderpattern}mustBeLast(){return null==this.rightchar}toString(){return"[ "+this.leftchar+", "+this.rightchar+" : "+(null==this.finderpattern?"null":this.finderpattern.getValue())+" ]"}static equals(t,e){return t instanceof ie&&ie.equalsOrNull(t.leftchar,e.leftchar)&&ie.equalsOrNull(t.rightchar,e.rightchar)&&ie.equalsOrNull(t.finderpattern,e.finderpattern)}static equalsOrNull(t,e){return null===t?null===e:ie.equals(t,e)}hashCode(){return this.leftchar.getValue()^this.rightchar.getValue()^this.finderpattern.getValue()}}class ne{constructor(t,e,r){this.pairs=t,this.rowNumber=e,this.wasReversed=r}getPairs(){return this.pairs}getRowNumber(){return this.rowNumber}isReversed(){return this.wasReversed}isEquivalent(t){return this.checkEqualitity(this,t)}toString(){return"{ "+this.pairs+" }"}equals(t,e){return t instanceof ne&&this.checkEqualitity(t,e)&&t.wasReversed===e.wasReversed}checkEqualitity(t,e){if(!t||!e)return;let r;return t.forEach((t,i)=>{e.forEach(e=>{t.getLeftChar().getValue()===e.getLeftChar().getValue()&&t.getRightChar().getValue()===e.getRightChar().getValue()&&t.getFinderPatter().getValue()===e.getFinderPatter().getValue()&&(r=!0)})}),r}}class oe extends Pt{constructor(t){super(...arguments),this.pairs=new Array(oe.MAX_PAIRS),this.rows=new Array,this.startEnd=[2],this.verbose=!0===t}decodeRow(t,e,r){this.pairs.length=0,this.startFromEven=!1;try{return oe.constructResult(this.decodeRow2pairs(t,e))}catch(t){this.verbose&&console.log(t)}return this.pairs.length=0,this.startFromEven=!0,oe.constructResult(this.decodeRow2pairs(t,e))}reset(){this.pairs.length=0,this.rows.length=0}decodeRow2pairs(t,e){let r,i=!1;for(;!i;)try{this.pairs.push(this.retrieveNextPair(e,this.pairs,t))}catch(t){if(t instanceof R){if(!this.pairs.length)throw new R;i=!0}}if(this.checkChecksum())return this.pairs;if(r=!!this.rows.length,this.storeRow(t,!1),r){let t=this.checkRowsBoolean(!1);if(null!=t)return t;if(t=this.checkRowsBoolean(!0),null!=t)return t}throw new R}checkRowsBoolean(t){if(this.rows.length>25)return this.rows.length=0,null;this.pairs.length=0,t&&(this.rows=this.rows.reverse());let e=null;try{e=this.checkRows(new Array,0)}catch(t){this.verbose&&console.log(t)}return t&&(this.rows=this.rows.reverse()),e}checkRows(t,e){for(let r=e;r<this.rows.length;r++){let e=this.rows[r];this.pairs.length=0;for(let e of t)this.pairs.push(e.getPairs());if(this.pairs.push(e.getPairs()),!oe.isValidSequence(this.pairs))continue;if(this.checkChecksum())return this.pairs;let i=new Array(t);i.push(e);try{return this.checkRows(i,r+1)}catch(t){this.verbose&&console.log(t)}}throw new R}static isValidSequence(t){for(let e of oe.FINDER_PATTERN_SEQUENCES){if(t.length>e.length)continue;let r=!0;for(let i=0;i<t.length;i++)if(t[i].getFinderPattern().getValue()!=e[i]){r=!1;break}if(r)return!0}return!1}storeRow(t,e){let r=0,i=!1,n=!1;for(;r<this.rows.length;){let e=this.rows[r];if(e.getRowNumber()>t){n=e.isEquivalent(this.pairs);break}i=e.isEquivalent(this.pairs),r++}n||i||oe.isPartialRow(this.pairs,this.rows)||(this.rows.push(r,new ne(this.pairs,t,e)),this.removePartialRows(this.pairs,this.rows))}removePartialRows(t,e){for(let r of e)if(r.getPairs().length!==t.length)for(let e of r.getPairs())for(let r of t)if(ie.equals(e,r))break}static isPartialRow(t,e){for(let r of e){let e=!0;for(let i of t){let t=!1;for(let e of r.getPairs())if(i.equals(e)){t=!0;break}if(!t){e=!1;break}}if(e)return!0}return!1}getRows(){return this.rows}static constructResult(t){let e=re(Lt.buildBitArray(t)).parseInformation(),r=t[0].getFinderPattern().getResultPoints(),i=t[t.length-1].getFinderPattern().getResultPoints(),n=[r[0],r[1],i[0],i[1]];return new $(e,null,null,n,H.RSS_EXPANDED,null)}checkChecksum(){let t=this.pairs.get(0),e=t.getLeftChar(),r=t.getRightChar();if(null==r)return!1;let i=r.getChecksumPortion(),n=2;for(let t=1;t<this.pairs.size();++t){let e=this.pairs.get(t);i+=e.getLeftChar().getChecksumPortion(),n++;let r=e.getRightChar();null!=r&&(i+=r.getChecksumPortion(),n++)}return i%=211,211*(n-4)+i==e.getValue()}static getNextSecondBar(t,e){let r;return t.get(e)?(r=t.getNextUnset(e),r=t.getNextSet(r)):(r=t.getNextSet(e),r=t.getNextUnset(r)),r}retrieveNextPair(t,e,r){let i,n=e.length%2==0;this.startFromEven&&(n=!n);let o=!0,s=-1;do{this.findNextPair(t,e,s),i=this.parseFoundFinderPattern(t,r,n),null==i?s=oe.getNextSecondBar(t,this.startEnd[0]):o=!1}while(o);let a,l=this.decodeDataCharacter(t,i,n,!0);if(!this.isEmptyPair(e)&&e[e.length-1].mustBeLast())throw new R;try{a=this.decodeDataCharacter(t,i,n,!1)}catch(t){a=null,this.verbose&&console.log(t)}return new ie(l,a,i,!0)}isEmptyPair(t){return 0===t.length}findNextPair(t,e,r){let i=this.getDecodeFinderCounters();i[0]=0,i[1]=0,i[2]=0,i[3]=0;let n,o=t.getSize();n=r>=0?r:this.isEmptyPair(e)?0:e[e.length-1].getFinderPattern().getStartEnd()[1];let s=e.length%2!=0;this.startFromEven&&(s=!s);let a=!1;for(;n<o&&(a=!t.get(n),a);)n++;let l=0,c=n;for(let e=n;e<o;e++)if(t.get(e)!=a)i[l]++;else{if(3==l){if(s&&oe.reverseCounters(i),oe.isFinderPattern(i))return this.startEnd[0]=c,void(this.startEnd[1]=e);s&&oe.reverseCounters(i),c+=i[0]+i[1],i[0]=i[2],i[1]=i[3],i[2]=0,i[3]=0,l--}else l++;i[l]=1,a=!a}throw new R}static reverseCounters(t){let e=t.length;for(let r=0;r<e/2;++r){let i=t[r];t[r]=t[e-r-1],t[e-r-1]=i}}parseFoundFinderPattern(t,e,r){let i,n,o;if(r){let e=this.startEnd[0]-1;for(;e>=0&&!t.get(e);)e--;e++,i=this.startEnd[0]-e,n=e,o=this.startEnd[1]}else n=this.startEnd[0],o=t.getNextUnset(this.startEnd[1]+1),i=o-this.startEnd[1];let s,a=this.getDecodeFinderCounters();f.arraycopy(a,0,a,1,a.length-1),a[0]=i;try{s=this.parseFinderValue(a,oe.FINDER_PATTERNS)}catch(t){return null}return new kt(s,[n,o],n,o,e)}decodeDataCharacter(t,e,r,i){let n=this.getDataCharacterCounters();for(let t=0;t<n.length;t++)n[t]=0;if(i)oe.recordPatternInReverse(t,e.getStartEnd()[0],n);else{oe.recordPattern(t,e.getStartEnd()[1],n);for(let t=0,e=n.length-1;t<e;t++,e--){let r=n[t];n[t]=n[e],n[e]=r}}let o=17,s=nt.sum(new Int32Array(n))/o,a=(e.getStartEnd()[1]-e.getStartEnd()[0])/15;if(Math.abs(s-a)/a>.3)throw new R;let l=this.getOddCounts(),c=this.getEvenCounts(),d=this.getOddRoundingErrors(),h=this.getEvenRoundingErrors();for(let t=0;t<n.length;t++){let e=1*n[t]/s,r=e+.5;if(r<1){if(e<.3)throw new R;r=1}else if(r>8){if(e>8.7)throw new R;r=8}let i=t/2;1&t?(c[i]=r,h[i]=e-r):(l[i]=r,d[i]=e-r)}this.adjustOddEvenCounts(o);let u=4*e.getValue()+(r?0:2)+(i?0:1)-1,p=0,f=0;for(let t=l.length-1;t>=0;t--){if(oe.isNotA1left(e,r,i)){let e=oe.WEIGHTS[u][2*t];f+=l[t]*e}p+=l[t]}let g=0;for(let t=c.length-1;t>=0;t--)if(oe.isNotA1left(e,r,i)){let e=oe.WEIGHTS[u][2*t+1];g+=c[t]*e}let m=f+g;if(1&p||p>13||p<4)throw new R;let w=(13-p)/2,b=oe.SYMBOL_WIDEST[w],y=9-b,_=Bt.getRSSvalue(l,b,!0),E=Bt.getRSSvalue(c,y,!1),C=oe.EVEN_TOTAL_SUBSET[w],v=oe.GSUM[w];return new Mt(_*C+E+v,m)}static isNotA1left(t,e,r){return!(0==t.getValue()&&e&&r)}adjustOddEvenCounts(t){let e=nt.sum(new Int32Array(this.getOddCounts())),r=nt.sum(new Int32Array(this.getEvenCounts())),i=!1,n=!1;e>13?n=!0:e<4&&(i=!0);let o=!1,s=!1;r>13?s=!0:r<4&&(o=!0);let a=e+r-t,l=!(1&~e),c=!(1&r);if(1==a)if(l){if(c)throw new R;n=!0}else{if(!c)throw new R;s=!0}else if(-1==a)if(l){if(c)throw new R;i=!0}else{if(!c)throw new R;o=!0}else{if(0!=a)throw new R;if(l){if(!c)throw new R;e<r?(i=!0,s=!0):(n=!0,o=!0)}else if(c)throw new R}if(i){if(n)throw new R;oe.increment(this.getOddCounts(),this.getOddRoundingErrors())}if(n&&oe.decrement(this.getOddCounts(),this.getOddRoundingErrors()),o){if(s)throw new R;oe.increment(this.getEvenCounts(),this.getOddRoundingErrors())}s&&oe.decrement(this.getEvenCounts(),this.getEvenRoundingErrors())}}oe.SYMBOL_WIDEST=[7,5,4,3,1],oe.EVEN_TOTAL_SUBSET=[4,20,52,104,204],oe.GSUM=[0,348,1388,2948,3988],oe.FINDER_PATTERNS=[Int32Array.from([1,8,4,1]),Int32Array.from([3,6,4,1]),Int32Array.from([3,4,6,1]),Int32Array.from([3,2,8,1]),Int32Array.from([2,6,5,1]),Int32Array.from([2,2,9,1])],oe.WEIGHTS=[[1,3,9,27,81,32,96,77],[20,60,180,118,143,7,21,63],[189,145,13,39,117,140,209,205],[193,157,49,147,19,57,171,91],[62,186,136,197,169,85,44,132],[185,133,188,142,4,12,36,108],[113,128,173,97,80,29,87,50],[150,28,84,41,123,158,52,156],[46,138,203,187,139,206,196,166],[76,17,51,153,37,111,122,155],[43,129,176,106,107,110,119,146],[16,48,144,10,30,90,59,177],[109,116,137,200,178,112,125,164],[70,210,208,202,184,130,179,115],[134,191,151,31,93,68,204,190],[148,22,66,198,172,94,71,2],[6,18,54,162,64,192,154,40],[120,149,25,75,14,42,126,167],[79,26,78,23,69,207,199,175],[103,98,83,38,114,131,182,124],[161,61,183,127,170,88,53,159],[55,165,73,8,24,72,5,15],[45,135,194,160,58,174,100,89]],oe.FINDER_PAT_A=0,oe.FINDER_PAT_B=1,oe.FINDER_PAT_C=2,oe.FINDER_PAT_D=3,oe.FINDER_PAT_E=4,oe.FINDER_PAT_F=5,oe.FINDER_PATTERN_SEQUENCES=[[oe.FINDER_PAT_A,oe.FINDER_PAT_A],[oe.FINDER_PAT_A,oe.FINDER_PAT_B,oe.FINDER_PAT_B],[oe.FINDER_PAT_A,oe.FINDER_PAT_C,oe.FINDER_PAT_B,oe.FINDER_PAT_D],[oe.FINDER_PAT_A,oe.FINDER_PAT_E,oe.FINDER_PAT_B,oe.FINDER_PAT_D,oe.FINDER_PAT_C],[oe.FINDER_PAT_A,oe.FINDER_PAT_E,oe.FINDER_PAT_B,oe.FINDER_PAT_D,oe.FINDER_PAT_D,oe.FINDER_PAT_F],[oe.FINDER_PAT_A,oe.FINDER_PAT_E,oe.FINDER_PAT_B,oe.FINDER_PAT_D,oe.FINDER_PAT_E,oe.FINDER_PAT_F,oe.FINDER_PAT_F],[oe.FINDER_PAT_A,oe.FINDER_PAT_A,oe.FINDER_PAT_B,oe.FINDER_PAT_B,oe.FINDER_PAT_C,oe.FINDER_PAT_C,oe.FINDER_PAT_D,oe.FINDER_PAT_D],[oe.FINDER_PAT_A,oe.FINDER_PAT_A,oe.FINDER_PAT_B,oe.FINDER_PAT_B,oe.FINDER_PAT_C,oe.FINDER_PAT_C,oe.FINDER_PAT_D,oe.FINDER_PAT_E,oe.FINDER_PAT_E],[oe.FINDER_PAT_A,oe.FINDER_PAT_A,oe.FINDER_PAT_B,oe.FINDER_PAT_B,oe.FINDER_PAT_C,oe.FINDER_PAT_C,oe.FINDER_PAT_D,oe.FINDER_PAT_E,oe.FINDER_PAT_F,oe.FINDER_PAT_F],[oe.FINDER_PAT_A,oe.FINDER_PAT_A,oe.FINDER_PAT_B,oe.FINDER_PAT_B,oe.FINDER_PAT_C,oe.FINDER_PAT_D,oe.FINDER_PAT_D,oe.FINDER_PAT_E,oe.FINDER_PAT_E,oe.FINDER_PAT_F,oe.FINDER_PAT_F]],oe.MAX_PAIRS=11;class se extends Mt{constructor(t,e,r){super(t,e),this.count=0,this.finderPattern=r}getFinderPattern(){return this.finderPattern}getCount(){return this.count}incrementCount(){this.count++}}class ae extends Pt{constructor(){super(...arguments),this.possibleLeftPairs=[],this.possibleRightPairs=[]}decodeRow(t,e,r){const i=this.decodePair(e,!1,t,r);ae.addOrTally(this.possibleLeftPairs,i),e.reverse();let n=this.decodePair(e,!0,t,r);ae.addOrTally(this.possibleRightPairs,n),e.reverse();for(let t of this.possibleLeftPairs)if(t.getCount()>1)for(let e of this.possibleRightPairs)if(e.getCount()>1&&ae.checkChecksum(t,e))return ae.constructResult(t,e);throw new R}static addOrTally(t,e){if(null==e)return;let r=!1;for(let i of t)if(i.getValue()===e.getValue()){i.incrementCount(),r=!0;break}r||t.push(e)}reset(){this.possibleLeftPairs.length=0,this.possibleRightPairs.length=0}static constructResult(t,e){let r=4537077*t.getValue()+e.getValue(),i=new String(r).toString(),n=new T;for(let t=13-i.length;t>0;t--)n.append("0");n.append(i);let o=0;for(let t=0;t<13;t++){let e=n.charAt(t).charCodeAt(0)-"0".charCodeAt(0);o+=1&t?e:3*e}o=10-o%10,10===o&&(o=0),n.append(o.toString());let s=t.getFinderPattern().getResultPoints(),a=e.getFinderPattern().getResultPoints();return new $(n.toString(),null,0,[s[0],s[1],a[0],a[1]],H.RSS_14,(new Date).getTime())}static checkChecksum(t,e){let r=(t.getChecksumPortion()+16*e.getChecksumPortion())%79,i=9*t.getFinderPattern().getValue()+e.getFinderPattern().getValue();return i>72&&i--,i>8&&i--,r===i}decodePair(t,e,r,i){try{let n=this.findFinderPattern(t,e),o=this.parseFoundFinderPattern(t,r,e,n),s=null==i?null:i.get(E.NEED_RESULT_POINT_CALLBACK);if(null!=s){let i=(n[0]+n[1])/2;e&&(i=t.getSize()-1-i),s.foundPossibleResultPoint(new st(i,r))}let a=this.decodeDataCharacter(t,o,!0),l=this.decodeDataCharacter(t,o,!1);return new se(1597*a.getValue()+l.getValue(),a.getChecksumPortion()+4*l.getChecksumPortion(),o)}catch(t){return null}}decodeDataCharacter(t,e,r){let i=this.getDataCharacterCounters();for(let t=0;t<i.length;t++)i[t]=0;if(r)bt.recordPatternInReverse(t,e.getStartEnd()[0],i);else{bt.recordPattern(t,e.getStartEnd()[1]+1,i);for(let t=0,e=i.length-1;t<e;t++,e--){let r=i[t];i[t]=i[e],i[e]=r}}let n=r?16:15,o=nt.sum(new Int32Array(i))/n,s=this.getOddCounts(),a=this.getEvenCounts(),l=this.getOddRoundingErrors(),c=this.getEvenRoundingErrors();for(let t=0;t<i.length;t++){let e=i[t]/o,r=Math.floor(e+.5);r<1?r=1:r>8&&(r=8);let n=Math.floor(t/2);1&t?(a[n]=r,c[n]=e-r):(s[n]=r,l[n]=e-r)}this.adjustOddEvenCounts(r,n);let d=0,h=0;for(let t=s.length-1;t>=0;t--)h*=9,h+=s[t],d+=s[t];let u=0,p=0;for(let t=a.length-1;t>=0;t--)u*=9,u+=a[t],p+=a[t];let f=h+3*u;if(r){if(1&d||d>12||d<4)throw new R;let t=(12-d)/2,e=ae.OUTSIDE_ODD_WIDEST[t],r=9-e,i=Bt.getRSSvalue(s,e,!1),n=Bt.getRSSvalue(a,r,!0),o=ae.OUTSIDE_EVEN_TOTAL_SUBSET[t],l=ae.OUTSIDE_GSUM[t];return new Mt(i*o+n+l,f)}{if(1&p||p>10||p<4)throw new R;let t=(10-p)/2,e=ae.INSIDE_ODD_WIDEST[t],r=9-e,i=Bt.getRSSvalue(s,e,!0),n=Bt.getRSSvalue(a,r,!1),o=ae.INSIDE_ODD_TOTAL_SUBSET[t],l=ae.INSIDE_GSUM[t];return new Mt(n*o+i+l,f)}}findFinderPattern(t,e){let r=this.getDecodeFinderCounters();r[0]=0,r[1]=0,r[2]=0,r[3]=0;let i=t.getSize(),n=!1,o=0;for(;o<i&&(n=!t.get(o),e!==n);)o++;let s=0,a=o;for(let e=o;e<i;e++)if(t.get(e)!==n)r[s]++;else{if(3===s){if(Pt.isFinderPattern(r))return[a,e];a+=r[0]+r[1],r[0]=r[2],r[1]=r[3],r[2]=0,r[3]=0,s--}else s++;r[s]=1,n=!n}throw new R}parseFoundFinderPattern(t,e,r,i){let n=t.get(i[0]),o=i[0]-1;for(;o>=0&&n!==t.get(o);)o--;o++;const s=i[0]-o,a=this.getDecodeFinderCounters(),l=new Int32Array(a.length);f.arraycopy(a,0,l,1,a.length-1),l[0]=s;const c=this.parseFinderValue(l,ae.FINDER_PATTERNS);let d=o,h=i[1];return r&&(d=t.getSize()-1-d,h=t.getSize()-1-h),new kt(c,[o,i[1]],d,h,e)}adjustOddEvenCounts(t,e){let r=nt.sum(new Int32Array(this.getOddCounts())),i=nt.sum(new Int32Array(this.getEvenCounts())),n=!1,o=!1,s=!1,a=!1;t?(r>12?o=!0:r<4&&(n=!0),i>12?a=!0:i<4&&(s=!0)):(r>11?o=!0:r<5&&(n=!0),i>10?a=!0:i<4&&(s=!0));let l=r+i-e,c=(1&r)==(t?1:0),d=!(1&~i);if(1===l)if(c){if(d)throw new R;o=!0}else{if(!d)throw new R;a=!0}else if(-1===l)if(c){if(d)throw new R;n=!0}else{if(!d)throw new R;s=!0}else{if(0!==l)throw new R;if(c){if(!d)throw new R;r<i?(n=!0,a=!0):(o=!0,s=!0)}else if(d)throw new R}if(n){if(o)throw new R;Pt.increment(this.getOddCounts(),this.getOddRoundingErrors())}if(o&&Pt.decrement(this.getOddCounts(),this.getOddRoundingErrors()),s){if(a)throw new R;Pt.increment(this.getEvenCounts(),this.getOddRoundingErrors())}a&&Pt.decrement(this.getEvenCounts(),this.getEvenRoundingErrors())}}ae.OUTSIDE_EVEN_TOTAL_SUBSET=[1,10,34,70,126],ae.INSIDE_ODD_TOTAL_SUBSET=[4,20,48,81],ae.OUTSIDE_GSUM=[0,161,961,2015,2715],ae.INSIDE_GSUM=[0,336,1036,1516],ae.OUTSIDE_ODD_WIDEST=[8,6,4,3,1],ae.INSIDE_ODD_WIDEST=[2,4,6,8],ae.FINDER_PATTERNS=[Int32Array.from([3,8,2,1]),Int32Array.from([3,5,5,1]),Int32Array.from([3,3,7,1]),Int32Array.from([3,1,9,1]),Int32Array.from([2,7,4,1]),Int32Array.from([2,5,6,1]),Int32Array.from([2,3,8,1]),Int32Array.from([1,5,7,1]),Int32Array.from([1,3,9,1])];class le extends bt{constructor(t,e){super(),this.readers=[],this.verbose=!0===e;const r=t?t.get(E.POSSIBLE_FORMATS):null,i=t&&void 0!==t.get(E.ASSUME_CODE_39_CHECK_DIGIT);r?((r.includes(H.EAN_13)||r.includes(H.UPC_A)||r.includes(H.EAN_8)||r.includes(H.UPC_E))&&this.readers.push(new Dt(t)),r.includes(H.CODE_39)&&this.readers.push(new _t(i)),r.includes(H.CODE_128)&&this.readers.push(new yt),r.includes(H.ITF)&&this.readers.push(new Et),r.includes(H.RSS_14)&&this.readers.push(new ae),r.includes(H.RSS_EXPANDED)&&this.readers.push(new oe(this.verbose))):(this.readers.push(new Dt(t)),this.readers.push(new _t),this.readers.push(new Dt(t)),this.readers.push(new yt),this.readers.push(new Et),this.readers.push(new ae),this.readers.push(new oe(this.verbose)))}decodeRow(t,e,r){for(let i=0;i<this.readers.length;i++)try{return this.readers[i].decodeRow(t,e,r)}catch(t){}throw new R}reset(){this.readers.forEach(t=>t.reset())}}class ce extends F{constructor(t=500,e){super(new le(e),t,e)}}class de{constructor(t,e,r){this.ecCodewords=t,this.ecBlocks=[e],r&&this.ecBlocks.push(r)}getECCodewords(){return this.ecCodewords}getECBlocks(){return this.ecBlocks}}class he{constructor(t,e){this.count=t,this.dataCodewords=e}getCount(){return this.count}getDataCodewords(){return this.dataCodewords}}class ue{constructor(t,e,r,i,n,o){this.versionNumber=t,this.symbolSizeRows=e,this.symbolSizeColumns=r,this.dataRegionSizeRows=i,this.dataRegionSizeColumns=n,this.ecBlocks=o;let s=0;const a=o.getECCodewords(),l=o.getECBlocks();for(let t of l)s+=t.getCount()*(t.getDataCodewords()+a);this.totalCodewords=s}getVersionNumber(){return this.versionNumber}getSymbolSizeRows(){return this.symbolSizeRows}getSymbolSizeColumns(){return this.symbolSizeColumns}getDataRegionSizeRows(){return this.dataRegionSizeRows}getDataRegionSizeColumns(){return this.dataRegionSizeColumns}getTotalCodewords(){return this.totalCodewords}getECBlocks(){return this.ecBlocks}static getVersionForDimensions(t,e){if(1&t||1&e)throw new C;for(let r of ue.VERSIONS)if(r.symbolSizeRows===t&&r.symbolSizeColumns===e)return r;throw new C}toString(){return""+this.versionNumber}static buildVersions(){return[new ue(1,10,10,8,8,new de(5,new he(1,3))),new ue(2,12,12,10,10,new de(7,new he(1,5))),new ue(3,14,14,12,12,new de(10,new he(1,8))),new ue(4,16,16,14,14,new de(12,new he(1,12))),new ue(5,18,18,16,16,new de(14,new he(1,18))),new ue(6,20,20,18,18,new de(18,new he(1,22))),new ue(7,22,22,20,20,new de(20,new he(1,30))),new ue(8,24,24,22,22,new de(24,new he(1,36))),new ue(9,26,26,24,24,new de(28,new he(1,44))),new ue(10,32,32,14,14,new de(36,new he(1,62))),new ue(11,36,36,16,16,new de(42,new he(1,86))),new ue(12,40,40,18,18,new de(48,new he(1,114))),new ue(13,44,44,20,20,new de(56,new he(1,144))),new ue(14,48,48,22,22,new de(68,new he(1,174))),new ue(15,52,52,24,24,new de(42,new he(2,102))),new ue(16,64,64,14,14,new de(56,new he(2,140))),new ue(17,72,72,16,16,new de(36,new he(4,92))),new ue(18,80,80,18,18,new de(48,new he(4,114))),new ue(19,88,88,20,20,new de(56,new he(4,144))),new ue(20,96,96,22,22,new de(68,new he(4,174))),new ue(21,104,104,24,24,new de(56,new he(6,136))),new ue(22,120,120,18,18,new de(68,new he(6,175))),new ue(23,132,132,20,20,new de(62,new he(8,163))),new ue(24,144,144,22,22,new de(62,new he(8,156),new he(2,155))),new ue(25,8,18,6,16,new de(7,new he(1,5))),new ue(26,8,32,6,14,new de(11,new he(1,10))),new ue(27,12,26,10,24,new de(14,new he(1,16))),new ue(28,12,36,10,16,new de(18,new he(1,22))),new ue(29,16,36,14,16,new de(24,new he(1,32))),new ue(30,16,48,14,22,new de(28,new he(1,49)))]}}ue.VERSIONS=ue.buildVersions();class pe{constructor(t){const e=t.getHeight();if(e<8||e>144||1&e)throw new C;this.version=pe.readVersion(t),this.mappingBitMatrix=this.extractDataRegion(t),this.readMappingMatrix=new x(this.mappingBitMatrix.getWidth(),this.mappingBitMatrix.getHeight())}getVersion(){return this.version}static readVersion(t){const e=t.getHeight(),r=t.getWidth();return ue.getVersionForDimensions(e,r)}readCodewords(){const t=new Int8Array(this.version.getTotalCodewords());let e=0,r=4,i=0;const n=this.mappingBitMatrix.getHeight(),o=this.mappingBitMatrix.getWidth();let s=!1,a=!1,l=!1,c=!1;do{if(r!==n||0!==i||s)if(r===n-2&&0===i&&3&o&&!a)t[e++]=255&this.readCorner2(n,o),r-=2,i+=2,a=!0;else if(r!==n+4||2!==i||7&o||l)if(r!==n-2||0!==i||4!=(7&o)||c){do{r<n&&i>=0&&!this.readMappingMatrix.get(i,r)&&(t[e++]=255&this.readUtah(r,i,n,o)),r-=2,i+=2}while(r>=0&&i<o);r+=1,i+=3;do{r>=0&&i<o&&!this.readMappingMatrix.get(i,r)&&(t[e++]=255&this.readUtah(r,i,n,o)),r+=2,i-=2}while(r<n&&i>=0);r+=3,i+=1}else t[e++]=255&this.readCorner4(n,o),r-=2,i+=2,c=!0;else t[e++]=255&this.readCorner3(n,o),r-=2,i+=2,l=!0;else t[e++]=255&this.readCorner1(n,o),r-=2,i+=2,s=!0}while(r<n||i<o);if(e!==this.version.getTotalCodewords())throw new C;return t}readModule(t,e,r,i){return t<0&&(t+=r,e+=4-(r+4&7)),e<0&&(e+=i,t+=4-(i+4&7)),this.readMappingMatrix.set(e,t),this.mappingBitMatrix.get(e,t)}readUtah(t,e,r,i){let n=0;return this.readModule(t-2,e-2,r,i)&&(n|=1),n<<=1,this.readModule(t-2,e-1,r,i)&&(n|=1),n<<=1,this.readModule(t-1,e-2,r,i)&&(n|=1),n<<=1,this.readModule(t-1,e-1,r,i)&&(n|=1),n<<=1,this.readModule(t-1,e,r,i)&&(n|=1),n<<=1,this.readModule(t,e-2,r,i)&&(n|=1),n<<=1,this.readModule(t,e-1,r,i)&&(n|=1),n<<=1,this.readModule(t,e,r,i)&&(n|=1),n}readCorner1(t,e){let r=0;return this.readModule(t-1,0,t,e)&&(r|=1),r<<=1,this.readModule(t-1,1,t,e)&&(r|=1),r<<=1,this.readModule(t-1,2,t,e)&&(r|=1),r<<=1,this.readModule(0,e-2,t,e)&&(r|=1),r<<=1,this.readModule(0,e-1,t,e)&&(r|=1),r<<=1,this.readModule(1,e-1,t,e)&&(r|=1),r<<=1,this.readModule(2,e-1,t,e)&&(r|=1),r<<=1,this.readModule(3,e-1,t,e)&&(r|=1),r}readCorner2(t,e){let r=0;return this.readModule(t-3,0,t,e)&&(r|=1),r<<=1,this.readModule(t-2,0,t,e)&&(r|=1),r<<=1,this.readModule(t-1,0,t,e)&&(r|=1),r<<=1,this.readModule(0,e-4,t,e)&&(r|=1),r<<=1,this.readModule(0,e-3,t,e)&&(r|=1),r<<=1,this.readModule(0,e-2,t,e)&&(r|=1),r<<=1,this.readModule(0,e-1,t,e)&&(r|=1),r<<=1,this.readModule(1,e-1,t,e)&&(r|=1),r}readCorner3(t,e){let r=0;return this.readModule(t-1,0,t,e)&&(r|=1),r<<=1,this.readModule(t-1,e-1,t,e)&&(r|=1),r<<=1,this.readModule(0,e-3,t,e)&&(r|=1),r<<=1,this.readModule(0,e-2,t,e)&&(r|=1),r<<=1,this.readModule(0,e-1,t,e)&&(r|=1),r<<=1,this.readModule(1,e-3,t,e)&&(r|=1),r<<=1,this.readModule(1,e-2,t,e)&&(r|=1),r<<=1,this.readModule(1,e-1,t,e)&&(r|=1),r}readCorner4(t,e){let r=0;return this.readModule(t-3,0,t,e)&&(r|=1),r<<=1,this.readModule(t-2,0,t,e)&&(r|=1),r<<=1,this.readModule(t-1,0,t,e)&&(r|=1),r<<=1,this.readModule(0,e-2,t,e)&&(r|=1),r<<=1,this.readModule(0,e-1,t,e)&&(r|=1),r<<=1,this.readModule(1,e-1,t,e)&&(r|=1),r<<=1,this.readModule(2,e-1,t,e)&&(r|=1),r<<=1,this.readModule(3,e-1,t,e)&&(r|=1),r}extractDataRegion(t){const e=this.version.getSymbolSizeRows(),r=this.version.getSymbolSizeColumns();if(t.getHeight()!==e)throw new d("Dimension of bitMatrix must match the version size");const i=this.version.getDataRegionSizeRows(),n=this.version.getDataRegionSizeColumns(),o=e/i|0,s=r/n|0,a=new x(s*n,o*i);for(let e=0;e<o;++e){const r=e*i;for(let o=0;o<s;++o){const s=o*n;for(let l=0;l<i;++l){const c=e*(i+2)+1+l,d=r+l;for(let e=0;e<n;++e){const r=o*(n+2)+1+e;if(t.get(r,c)){const t=s+e;a.set(t,d)}}}}}return a}}class fe{constructor(t,e){this.numDataCodewords=t,this.codewords=e}static getDataBlocks(t,e){const r=e.getECBlocks();let i=0;const n=r.getECBlocks();for(let t of n)i+=t.getCount();const o=new Array(i);let s=0;for(let t of n)for(let e=0;e<t.getCount();e++){const e=t.getDataCodewords(),i=r.getECCodewords()+e;o[s++]=new fe(e,new Uint8Array(i))}const a=o[0].codewords.length-r.getECCodewords(),l=a-1;let c=0;for(let e=0;e<l;e++)for(let r=0;r<s;r++)o[r].codewords[e]=t[c++];const h=24===e.getVersionNumber(),u=h?8:s;for(let e=0;e<u;e++)o[e].codewords[a-1]=t[c++];const p=o[0].codewords.length;for(let e=a;e<p;e++)for(let r=0;r<s;r++){const i=h?(r+8)%s:r,n=h&&i>7?e-1:e;o[i].codewords[n]=t[c++]}if(c!==t.length)throw new d;return o}getNumDataCodewords(){return this.numDataCodewords}getCodewords(){return this.codewords}}class ge{constructor(t){this.bytes=t,this.byteOffset=0,this.bitOffset=0}getBitOffset(){return this.bitOffset}getByteOffset(){return this.byteOffset}readBits(t){if(t<1||t>32||t>this.available())throw new d(""+t);let e=0,r=this.bitOffset,i=this.byteOffset;const n=this.bytes;if(r>0){const o=8-r,s=t<o?t:o,a=o-s,l=255>>8-s<<a;e=(n[i]&l)>>a,t-=s,r+=s,8===r&&(r=0,i++)}if(t>0){for(;t>=8;)e=e<<8|255&n[i],i++,t-=8;if(t>0){const o=8-t,s=255>>o<<o;e=e<<t|(n[i]&s)>>o,r+=t}}return this.bitOffset=r,this.byteOffset=i,e}available(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset}}!function(t){t[t.PAD_ENCODE=0]="PAD_ENCODE",t[t.ASCII_ENCODE=1]="ASCII_ENCODE",t[t.C40_ENCODE=2]="C40_ENCODE",t[t.TEXT_ENCODE=3]="TEXT_ENCODE",t[t.ANSIX12_ENCODE=4]="ANSIX12_ENCODE",t[t.EDIFACT_ENCODE=5]="EDIFACT_ENCODE",t[t.BASE256_ENCODE=6]="BASE256_ENCODE"}(z||(z={}));class me{static decode(t){const e=new ge(t),r=new T,i=new T,n=new Array;let o=z.ASCII_ENCODE;do{if(o===z.ASCII_ENCODE)o=this.decodeAsciiSegment(e,r,i);else{switch(o){case z.C40_ENCODE:this.decodeC40Segment(e,r);break;case z.TEXT_ENCODE:this.decodeTextSegment(e,r);break;case z.ANSIX12_ENCODE:this.decodeAnsiX12Segment(e,r);break;case z.EDIFACT_ENCODE:this.decodeEdifactSegment(e,r);break;case z.BASE256_ENCODE:this.decodeBase256Segment(e,r,n);break;default:throw new C}o=z.ASCII_ENCODE}}while(o!==z.PAD_ENCODE&&e.available()>0);return i.length()>0&&r.append(i.toString()),new Z(t,r.toString(),0===n.length?null:n,null)}static decodeAsciiSegment(t,e,r){let i=!1;do{let n=t.readBits(8);if(0===n)throw new C;if(n<=128)return i&&(n+=128),e.append(String.fromCharCode(n-1)),z.ASCII_ENCODE;if(129===n)return z.PAD_ENCODE;if(n<=229){const t=n-130;t<10&&e.append("0"),e.append(""+t)}else switch(n){case 230:return z.C40_ENCODE;case 231:return z.BASE256_ENCODE;case 232:e.append(String.fromCharCode(29));break;case 233:case 234:case 241:break;case 235:i=!0;break;case 236:e.append("[)>05"),r.insert(0,"");break;case 237:e.append("[)>06"),r.insert(0,"");break;case 238:return z.ANSIX12_ENCODE;case 239:return z.TEXT_ENCODE;case 240:return z.EDIFACT_ENCODE;default:if(254!==n||0!==t.available())throw new C}}while(t.available()>0);return z.ASCII_ENCODE}static decodeC40Segment(t,e){let r=!1;const i=[];let n=0;do{if(8===t.available())return;const o=t.readBits(8);if(254===o)return;this.parseTwoBytes(o,t.readBits(8),i);for(let t=0;t<3;t++){const o=i[t];switch(n){case 0:if(o<3)n=o+1;else{if(!(o<this.C40_BASIC_SET_CHARS.length))throw new C;{const t=this.C40_BASIC_SET_CHARS[o];r?(e.append(String.fromCharCode(t.charCodeAt(0)+128)),r=!1):e.append(t)}}break;case 1:r?(e.append(String.fromCharCode(o+128)),r=!1):e.append(String.fromCharCode(o)),n=0;break;case 2:if(o<this.C40_SHIFT2_SET_CHARS.length){const t=this.C40_SHIFT2_SET_CHARS[o];r?(e.append(String.fromCharCode(t.charCodeAt(0)+128)),r=!1):e.append(t)}else switch(o){case 27:e.append(String.fromCharCode(29));break;case 30:r=!0;break;default:throw new C}n=0;break;case 3:r?(e.append(String.fromCharCode(o+224)),r=!1):e.append(String.fromCharCode(o+96)),n=0;break;default:throw new C}}}while(t.available()>0)}static decodeTextSegment(t,e){let r=!1,i=[],n=0;do{if(8===t.available())return;const o=t.readBits(8);if(254===o)return;this.parseTwoBytes(o,t.readBits(8),i);for(let t=0;t<3;t++){const o=i[t];switch(n){case 0:if(o<3)n=o+1;else{if(!(o<this.TEXT_BASIC_SET_CHARS.length))throw new C;{const t=this.TEXT_BASIC_SET_CHARS[o];r?(e.append(String.fromCharCode(t.charCodeAt(0)+128)),r=!1):e.append(t)}}break;case 1:r?(e.append(String.fromCharCode(o+128)),r=!1):e.append(String.fromCharCode(o)),n=0;break;case 2:if(o<this.TEXT_SHIFT2_SET_CHARS.length){const t=this.TEXT_SHIFT2_SET_CHARS[o];r?(e.append(String.fromCharCode(t.charCodeAt(0)+128)),r=!1):e.append(t)}else switch(o){case 27:e.append(String.fromCharCode(29));break;case 30:r=!0;break;default:throw new C}n=0;break;case 3:if(!(o<this.TEXT_SHIFT3_SET_CHARS.length))throw new C;{const t=this.TEXT_SHIFT3_SET_CHARS[o];r?(e.append(String.fromCharCode(t.charCodeAt(0)+128)),r=!1):e.append(t),n=0}break;default:throw new C}}}while(t.available()>0)}static decodeAnsiX12Segment(t,e){const r=[];do{if(8===t.available())return;const i=t.readBits(8);if(254===i)return;this.parseTwoBytes(i,t.readBits(8),r);for(let t=0;t<3;t++){const i=r[t];switch(i){case 0:e.append("\r");break;case 1:e.append("*");break;case 2:e.append(">");break;case 3:e.append(" ");break;default:if(i<14)e.append(String.fromCharCode(i+44));else{if(!(i<40))throw new C;e.append(String.fromCharCode(i+51))}}}}while(t.available()>0)}static parseTwoBytes(t,e,r){let i=(t<<8)+e-1,n=Math.floor(i/1600);r[0]=n,i-=1600*n,n=Math.floor(i/40),r[1]=n,r[2]=i-40*n}static decodeEdifactSegment(t,e){do{if(t.available()<=16)return;for(let r=0;r<4;r++){let r=t.readBits(6);if(31===r){const e=8-t.getBitOffset();return void(8!==e&&t.readBits(e))}32&r||(r|=64),e.append(String.fromCharCode(r))}}while(t.available()>0)}static decodeBase256Segment(t,e,r){let i=1+t.getByteOffset();const n=this.unrandomize255State(t.readBits(8),i++);let o;if(o=0===n?t.available()/8|0:n<250?n:250*(n-249)+this.unrandomize255State(t.readBits(8),i++),o<0)throw new C;const s=new Uint8Array(o);for(let e=0;e<o;e++){if(t.available()<8)throw new C;s[e]=this.unrandomize255State(t.readBits(8),i++)}r.push(s);try{e.append(S.decode(s,I.ISO88591))}catch(t){throw new et("Platform does not support required encoding: "+t.message)}}static unrandomize255State(t,e){const r=t-(149*e%255+1);return r>=0?r:r+256}}me.C40_BASIC_SET_CHARS=["*","*","*"," ","0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],me.C40_SHIFT2_SET_CHARS=["!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_"],me.TEXT_BASIC_SET_CHARS=["*","*","*"," ","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],me.TEXT_SHIFT2_SET_CHARS=me.C40_SHIFT2_SET_CHARS,me.TEXT_SHIFT3_SET_CHARS=["`","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","{","|","}","~",String.fromCharCode(127)];class we{constructor(){this.rsDecoder=new rt(J.DATA_MATRIX_FIELD_256)}decode(t){const e=new pe(t),r=e.getVersion(),i=e.readCodewords(),n=fe.getDataBlocks(i,r);let o=0;for(let t of n)o+=t.getNumDataCodewords();const s=new Uint8Array(o),a=n.length;for(let t=0;t<a;t++){const e=n[t],r=e.getCodewords(),i=e.getNumDataCodewords();this.correctErrors(r,i);for(let e=0;e<i;e++)s[e*a+t]=r[e]}return me.decode(s)}correctErrors(t,e){const r=new Int32Array(t);try{this.rsDecoder.decode(r,t.length-e)}catch(t){throw new u}for(let i=0;i<e;i++)t[i]=r[i]}}class be{constructor(t){this.image=t,this.rectangleDetector=new ct(this.image)}detect(){const t=this.rectangleDetector.detect();let e=this.detectSolid1(t);if(e=this.detectSolid2(e),e[3]=this.correctTopRight(e),!e[3])throw new R;e=this.shiftToModuleCenter(e);const r=e[0],i=e[1],n=e[2],o=e[3];let s=this.transitionsBetween(r,o)+1,a=this.transitionsBetween(n,o)+1;1&~s||(s+=1),1&~a||(a+=1),4*s<7*a&&4*a<7*s&&(s=a=Math.max(s,a));let l=be.sampleGrid(this.image,r,i,n,o,s,a);return new at(l,[r,i,n,o])}static shiftPoint(t,e,r){let i=(e.getX()-t.getX())/(r+1),n=(e.getY()-t.getY())/(r+1);return new st(t.getX()+i,t.getY()+n)}static moveAway(t,e,r){let i=t.getX(),n=t.getY();return i<e?i-=1:i+=1,n<r?n-=1:n+=1,new st(i,n)}detectSolid1(t){let e=t[0],r=t[1],i=t[3],n=t[2],o=this.transitionsBetween(e,r),s=this.transitionsBetween(r,i),a=this.transitionsBetween(i,n),l=this.transitionsBetween(n,e),c=o,d=[n,e,r,i];return c>s&&(c=s,d[0]=e,d[1]=r,d[2]=i,d[3]=n),c>a&&(c=a,d[0]=r,d[1]=i,d[2]=n,d[3]=e),c>l&&(d[0]=i,d[1]=n,d[2]=e,d[3]=r),d}detectSolid2(t){let e=t[0],r=t[1],i=t[2],n=t[3],o=this.transitionsBetween(e,n),s=be.shiftPoint(r,i,4*(o+1)),a=be.shiftPoint(i,r,4*(o+1));return this.transitionsBetween(s,e)<this.transitionsBetween(a,n)?(t[0]=e,t[1]=r,t[2]=i,t[3]=n):(t[0]=r,t[1]=i,t[2]=n,t[3]=e),t}correctTopRight(t){let e=t[0],r=t[1],i=t[2],n=t[3],o=this.transitionsBetween(e,n),s=this.transitionsBetween(r,n),a=be.shiftPoint(e,r,4*(s+1)),l=be.shiftPoint(i,r,4*(o+1));o=this.transitionsBetween(a,n),s=this.transitionsBetween(l,n);let c=new st(n.getX()+(i.getX()-r.getX())/(o+1),n.getY()+(i.getY()-r.getY())/(o+1)),d=new st(n.getX()+(e.getX()-r.getX())/(s+1),n.getY()+(e.getY()-r.getY())/(s+1));return this.isValid(c)?this.isValid(d)?this.transitionsBetween(a,c)+this.transitionsBetween(l,c)>this.transitionsBetween(a,d)+this.transitionsBetween(l,d)?c:d:c:this.isValid(d)?d:null}shiftToModuleCenter(t){let e=t[0],r=t[1],i=t[2],n=t[3],o=this.transitionsBetween(e,n)+1,s=this.transitionsBetween(i,n)+1,a=be.shiftPoint(e,r,4*s),l=be.shiftPoint(i,r,4*o);o=this.transitionsBetween(a,n)+1,s=this.transitionsBetween(l,n)+1,1&~o||(o+=1),1&~s||(s+=1);let c,d,h=(e.getX()+r.getX()+i.getX()+n.getX())/4,u=(e.getY()+r.getY()+i.getY()+n.getY())/4;return e=be.moveAway(e,h,u),r=be.moveAway(r,h,u),i=be.moveAway(i,h,u),n=be.moveAway(n,h,u),a=be.shiftPoint(e,r,4*s),a=be.shiftPoint(a,n,4*o),c=be.shiftPoint(r,e,4*s),c=be.shiftPoint(c,i,4*o),l=be.shiftPoint(i,n,4*s),l=be.shiftPoint(l,r,4*o),d=be.shiftPoint(n,i,4*s),d=be.shiftPoint(d,e,4*o),[a,c,l,d]}isValid(t){return t.getX()>=0&&t.getX()<this.image.getWidth()&&t.getY()>0&&t.getY()<this.image.getHeight()}static sampleGrid(t,e,r,i,n,o,s){return pt.getInstance().sampleGrid(t,o,s,.5,.5,o-.5,.5,o-.5,s-.5,.5,s-.5,e.getX(),e.getY(),n.getX(),n.getY(),i.getX(),i.getY(),r.getX(),r.getY())}transitionsBetween(t,e){let r=Math.trunc(t.getX()),i=Math.trunc(t.getY()),n=Math.trunc(e.getX()),o=Math.trunc(e.getY()),s=Math.abs(o-i)>Math.abs(n-r);if(s){let t=r;r=i,i=t,t=n,n=o,o=t}let a=Math.abs(n-r),l=Math.abs(o-i),c=-a/2,d=i<o?1:-1,h=r<n?1:-1,u=0,p=this.image.get(s?i:r,s?r:i);for(let t=r,e=i;t!==n;t+=h){let r=this.image.get(s?e:t,s?t:e);if(r!==p&&(u++,p=r),c+=l,c>0){if(e===o)break;e+=d,c-=a}}return u}}class ye{constructor(){this.decoder=new we}decode(t,e=null){let r,i;if(null!=e&&e.has(E.PURE_BARCODE)){const e=ye.extractPureBits(t.getBlackMatrix());r=this.decoder.decode(e),i=ye.NO_POINTS}else{const e=new be(t.getBlackMatrix()).detect();r=this.decoder.decode(e.getBits()),i=e.getPoints()}const n=r.getRawBytes(),o=new $(r.getText(),n,8*n.length,i,H.DATA_MATRIX,f.currentTimeMillis()),s=r.getByteSegments();null!=s&&o.putMetadata(Y.BYTE_SEGMENTS,s);const a=r.getECLevel();return null!=a&&o.putMetadata(Y.ERROR_CORRECTION_LEVEL,a),o}reset(){}static extractPureBits(t){const e=t.getTopLeftOnBit(),r=t.getBottomRightOnBit();if(null==e||null==r)throw new R;const i=this.moduleSize(e,t);let n=e[1];const o=r[1];let s=e[0];const a=(r[0]-s+1)/i,l=(o-n+1)/i;if(a<=0||l<=0)throw new R;const c=i/2;n+=c,s+=c;const d=new x(a,l);for(let e=0;e<l;e++){const r=n+e*i;for(let n=0;n<a;n++)t.get(s+n*i,r)&&d.set(n,e)}return d}static moduleSize(t,e){const r=e.getWidth();let i=t[0];const n=t[1];for(;i<r&&e.get(i,n);)i++;if(i===r)throw new R;const o=i-t[0];if(0===o)throw new R;return o}}ye.NO_POINTS=[];class _e extends F{constructor(t=500){super(new ye,t)}}!function(t){t[t.L=0]="L",t[t.M=1]="M",t[t.Q=2]="Q",t[t.H=3]="H"}(j||(j={}));class Ee{constructor(t,e,r){this.value=t,this.stringValue=e,this.bits=r,Ee.FOR_BITS.set(r,this),Ee.FOR_VALUE.set(t,this)}getValue(){return this.value}getBits(){return this.bits}static fromString(t){switch(t){case"L":return Ee.L;case"M":return Ee.M;case"Q":return Ee.Q;case"H":return Ee.H;default:throw new c(t+"not available")}}toString(){return this.stringValue}equals(t){if(!(t instanceof Ee))return!1;const e=t;return this.value===e.value}static forBits(t){if(t<0||t>=Ee.FOR_BITS.size)throw new d;return Ee.FOR_BITS.get(t)}}Ee.FOR_BITS=new Map,Ee.FOR_VALUE=new Map,Ee.L=new Ee(j.L,"L",1),Ee.M=new Ee(j.M,"M",0),Ee.Q=new Ee(j.Q,"Q",3),Ee.H=new Ee(j.H,"H",2);class Ce{constructor(t){this.errorCorrectionLevel=Ee.forBits(t>>3&3),this.dataMask=7&t}static numBitsDiffering(t,e){return b.bitCount(t^e)}static decodeFormatInformation(t,e){const r=Ce.doDecodeFormatInformation(t,e);return null!==r?r:Ce.doDecodeFormatInformation(t^Ce.FORMAT_INFO_MASK_QR,e^Ce.FORMAT_INFO_MASK_QR)}static doDecodeFormatInformation(t,e){let r=Number.MAX_SAFE_INTEGER,i=0;for(const n of Ce.FORMAT_INFO_DECODE_LOOKUP){const o=n[0];if(o===t||o===e)return new Ce(n[1]);let s=Ce.numBitsDiffering(t,o);s<r&&(i=n[1],r=s),t!==e&&(s=Ce.numBitsDiffering(e,o),s<r&&(i=n[1],r=s))}return r<=3?new Ce(i):null}getErrorCorrectionLevel(){return this.errorCorrectionLevel}getDataMask(){return this.dataMask}hashCode(){return this.errorCorrectionLevel.getBits()<<3|this.dataMask}equals(t){if(!(t instanceof Ce))return!1;const e=t;return this.errorCorrectionLevel===e.errorCorrectionLevel&&this.dataMask===e.dataMask}}Ce.FORMAT_INFO_MASK_QR=21522,Ce.FORMAT_INFO_DECODE_LOOKUP=[Int32Array.from([21522,0]),Int32Array.from([20773,1]),Int32Array.from([24188,2]),Int32Array.from([23371,3]),Int32Array.from([17913,4]),Int32Array.from([16590,5]),Int32Array.from([20375,6]),Int32Array.from([19104,7]),Int32Array.from([30660,8]),Int32Array.from([29427,9]),Int32Array.from([32170,10]),Int32Array.from([30877,11]),Int32Array.from([26159,12]),Int32Array.from([25368,13]),Int32Array.from([27713,14]),Int32Array.from([26998,15]),Int32Array.from([5769,16]),Int32Array.from([5054,17]),Int32Array.from([7399,18]),Int32Array.from([6608,19]),Int32Array.from([1890,20]),Int32Array.from([597,21]),Int32Array.from([3340,22]),Int32Array.from([2107,23]),Int32Array.from([13663,24]),Int32Array.from([12392,25]),Int32Array.from([16177,26]),Int32Array.from([14854,27]),Int32Array.from([9396,28]),Int32Array.from([8579,29]),Int32Array.from([11994,30]),Int32Array.from([11245,31])];class ve{constructor(t,...e){this.ecCodewordsPerBlock=t,this.ecBlocks=e}getECCodewordsPerBlock(){return this.ecCodewordsPerBlock}getNumBlocks(){let t=0;const e=this.ecBlocks;for(const r of e)t+=r.getCount();return t}getTotalECCodewords(){return this.ecCodewordsPerBlock*this.getNumBlocks()}getECBlocks(){return this.ecBlocks}}class Ae{constructor(t,e){this.count=t,this.dataCodewords=e}getCount(){return this.count}getDataCodewords(){return this.dataCodewords}}class Se{constructor(t,e,...r){this.versionNumber=t,this.alignmentPatternCenters=e,this.ecBlocks=r;let i=0;const n=r[0].getECCodewordsPerBlock(),o=r[0].getECBlocks();for(const t of o)i+=t.getCount()*(t.getDataCodewords()+n);this.totalCodewords=i}getVersionNumber(){return this.versionNumber}getAlignmentPatternCenters(){return this.alignmentPatternCenters}getTotalCodewords(){return this.totalCodewords}getDimensionForVersion(){return 17+4*this.versionNumber}getECBlocksForLevel(t){return this.ecBlocks[t.getValue()]}static getProvisionalVersionForDimension(t){if(t%4!=1)throw new C;try{return this.getVersionForNumber((t-17)/4)}catch(t){throw new C}}static getVersionForNumber(t){if(t<1||t>40)throw new d;return Se.VERSIONS[t-1]}static decodeVersionInformation(t){let e=Number.MAX_SAFE_INTEGER,r=0;for(let i=0;i<Se.VERSION_DECODE_INFO.length;i++){const n=Se.VERSION_DECODE_INFO[i];if(n===t)return Se.getVersionForNumber(i+7);const o=Ce.numBitsDiffering(t,n);o<e&&(r=i+7,e=o)}return e<=3?Se.getVersionForNumber(r):null}buildFunctionPattern(){const t=this.getDimensionForVersion(),e=new x(t);e.setRegion(0,0,9,9),e.setRegion(t-8,0,8,9),e.setRegion(0,t-8,9,8);const r=this.alignmentPatternCenters.length;for(let t=0;t<r;t++){const i=this.alignmentPatternCenters[t]-2;for(let n=0;n<r;n++)0===t&&(0===n||n===r-1)||t===r-1&&0===n||e.setRegion(this.alignmentPatternCenters[n]-2,i,5,5)}return e.setRegion(6,9,1,t-17),e.setRegion(9,6,t-17,1),this.versionNumber>6&&(e.setRegion(t-11,0,3,6),e.setRegion(0,t-11,6,3)),e}toString(){return""+this.versionNumber}}Se.VERSION_DECODE_INFO=Int32Array.from([31892,34236,39577,42195,48118,51042,55367,58893,63784,68472,70749,76311,79154,84390,87683,92361,96236,102084,102881,110507,110734,117786,119615,126325,127568,133589,136944,141498,145311,150283,152622,158308,161089,167017]),Se.VERSIONS=[new Se(1,new Int32Array(0),new ve(7,new Ae(1,19)),new ve(10,new Ae(1,16)),new ve(13,new Ae(1,13)),new ve(17,new Ae(1,9))),new Se(2,Int32Array.from([6,18]),new ve(10,new Ae(1,34)),new ve(16,new Ae(1,28)),new ve(22,new Ae(1,22)),new ve(28,new Ae(1,16))),new Se(3,Int32Array.from([6,22]),new ve(15,new Ae(1,55)),new ve(26,new Ae(1,44)),new ve(18,new Ae(2,17)),new ve(22,new Ae(2,13))),new Se(4,Int32Array.from([6,26]),new ve(20,new Ae(1,80)),new ve(18,new Ae(2,32)),new ve(26,new Ae(2,24)),new ve(16,new Ae(4,9))),new Se(5,Int32Array.from([6,30]),new ve(26,new Ae(1,108)),new ve(24,new Ae(2,43)),new ve(18,new Ae(2,15),new Ae(2,16)),new ve(22,new Ae(2,11),new Ae(2,12))),new Se(6,Int32Array.from([6,34]),new ve(18,new Ae(2,68)),new ve(16,new Ae(4,27)),new ve(24,new Ae(4,19)),new ve(28,new Ae(4,15))),new Se(7,Int32Array.from([6,22,38]),new ve(20,new Ae(2,78)),new ve(18,new Ae(4,31)),new ve(18,new Ae(2,14),new Ae(4,15)),new ve(26,new Ae(4,13),new Ae(1,14))),new Se(8,Int32Array.from([6,24,42]),new ve(24,new Ae(2,97)),new ve(22,new Ae(2,38),new Ae(2,39)),new ve(22,new Ae(4,18),new Ae(2,19)),new ve(26,new Ae(4,14),new Ae(2,15))),new Se(9,Int32Array.from([6,26,46]),new ve(30,new Ae(2,116)),new ve(22,new Ae(3,36),new Ae(2,37)),new ve(20,new Ae(4,16),new Ae(4,17)),new ve(24,new Ae(4,12),new Ae(4,13))),new Se(10,Int32Array.from([6,28,50]),new ve(18,new Ae(2,68),new Ae(2,69)),new ve(26,new Ae(4,43),new Ae(1,44)),new ve(24,new Ae(6,19),new Ae(2,20)),new ve(28,new Ae(6,15),new Ae(2,16))),new Se(11,Int32Array.from([6,30,54]),new ve(20,new Ae(4,81)),new ve(30,new Ae(1,50),new Ae(4,51)),new ve(28,new Ae(4,22),new Ae(4,23)),new ve(24,new Ae(3,12),new Ae(8,13))),new Se(12,Int32Array.from([6,32,58]),new ve(24,new Ae(2,92),new Ae(2,93)),new ve(22,new Ae(6,36),new Ae(2,37)),new ve(26,new Ae(4,20),new Ae(6,21)),new ve(28,new Ae(7,14),new Ae(4,15))),new Se(13,Int32Array.from([6,34,62]),new ve(26,new Ae(4,107)),new ve(22,new Ae(8,37),new Ae(1,38)),new ve(24,new Ae(8,20),new Ae(4,21)),new ve(22,new Ae(12,11),new Ae(4,12))),new Se(14,Int32Array.from([6,26,46,66]),new ve(30,new Ae(3,115),new Ae(1,116)),new ve(24,new Ae(4,40),new Ae(5,41)),new ve(20,new Ae(11,16),new Ae(5,17)),new ve(24,new Ae(11,12),new Ae(5,13))),new Se(15,Int32Array.from([6,26,48,70]),new ve(22,new Ae(5,87),new Ae(1,88)),new ve(24,new Ae(5,41),new Ae(5,42)),new ve(30,new Ae(5,24),new Ae(7,25)),new ve(24,new Ae(11,12),new Ae(7,13))),new Se(16,Int32Array.from([6,26,50,74]),new ve(24,new Ae(5,98),new Ae(1,99)),new ve(28,new Ae(7,45),new Ae(3,46)),new ve(24,new Ae(15,19),new Ae(2,20)),new ve(30,new Ae(3,15),new Ae(13,16))),new Se(17,Int32Array.from([6,30,54,78]),new ve(28,new Ae(1,107),new Ae(5,108)),new ve(28,new Ae(10,46),new Ae(1,47)),new ve(28,new Ae(1,22),new Ae(15,23)),new ve(28,new Ae(2,14),new Ae(17,15))),new Se(18,Int32Array.from([6,30,56,82]),new ve(30,new Ae(5,120),new Ae(1,121)),new ve(26,new Ae(9,43),new Ae(4,44)),new ve(28,new Ae(17,22),new Ae(1,23)),new ve(28,new Ae(2,14),new Ae(19,15))),new Se(19,Int32Array.from([6,30,58,86]),new ve(28,new Ae(3,113),new Ae(4,114)),new ve(26,new Ae(3,44),new Ae(11,45)),new ve(26,new Ae(17,21),new Ae(4,22)),new ve(26,new Ae(9,13),new Ae(16,14))),new Se(20,Int32Array.from([6,34,62,90]),new ve(28,new Ae(3,107),new Ae(5,108)),new ve(26,new Ae(3,41),new Ae(13,42)),new ve(30,new Ae(15,24),new Ae(5,25)),new ve(28,new Ae(15,15),new Ae(10,16))),new Se(21,Int32Array.from([6,28,50,72,94]),new ve(28,new Ae(4,116),new Ae(4,117)),new ve(26,new Ae(17,42)),new ve(28,new Ae(17,22),new Ae(6,23)),new ve(30,new Ae(19,16),new Ae(6,17))),new Se(22,Int32Array.from([6,26,50,74,98]),new ve(28,new Ae(2,111),new Ae(7,112)),new ve(28,new Ae(17,46)),new ve(30,new Ae(7,24),new Ae(16,25)),new ve(24,new Ae(34,13))),new Se(23,Int32Array.from([6,30,54,78,102]),new ve(30,new Ae(4,121),new Ae(5,122)),new ve(28,new Ae(4,47),new Ae(14,48)),new ve(30,new Ae(11,24),new Ae(14,25)),new ve(30,new Ae(16,15),new Ae(14,16))),new Se(24,Int32Array.from([6,28,54,80,106]),new ve(30,new Ae(6,117),new Ae(4,118)),new ve(28,new Ae(6,45),new Ae(14,46)),new ve(30,new Ae(11,24),new Ae(16,25)),new ve(30,new Ae(30,16),new Ae(2,17))),new Se(25,Int32Array.from([6,32,58,84,110]),new ve(26,new Ae(8,106),new Ae(4,107)),new ve(28,new Ae(8,47),new Ae(13,48)),new ve(30,new Ae(7,24),new Ae(22,25)),new ve(30,new Ae(22,15),new Ae(13,16))),new Se(26,Int32Array.from([6,30,58,86,114]),new ve(28,new Ae(10,114),new Ae(2,115)),new ve(28,new Ae(19,46),new Ae(4,47)),new ve(28,new Ae(28,22),new Ae(6,23)),new ve(30,new Ae(33,16),new Ae(4,17))),new Se(27,Int32Array.from([6,34,62,90,118]),new ve(30,new Ae(8,122),new Ae(4,123)),new ve(28,new Ae(22,45),new Ae(3,46)),new ve(30,new Ae(8,23),new Ae(26,24)),new ve(30,new Ae(12,15),new Ae(28,16))),new Se(28,Int32Array.from([6,26,50,74,98,122]),new ve(30,new Ae(3,117),new Ae(10,118)),new ve(28,new Ae(3,45),new Ae(23,46)),new ve(30,new Ae(4,24),new Ae(31,25)),new ve(30,new Ae(11,15),new Ae(31,16))),new Se(29,Int32Array.from([6,30,54,78,102,126]),new ve(30,new Ae(7,116),new Ae(7,117)),new ve(28,new Ae(21,45),new Ae(7,46)),new ve(30,new Ae(1,23),new Ae(37,24)),new ve(30,new Ae(19,15),new Ae(26,16))),new Se(30,Int32Array.from([6,26,52,78,104,130]),new ve(30,new Ae(5,115),new Ae(10,116)),new ve(28,new Ae(19,47),new Ae(10,48)),new ve(30,new Ae(15,24),new Ae(25,25)),new ve(30,new Ae(23,15),new Ae(25,16))),new Se(31,Int32Array.from([6,30,56,82,108,134]),new ve(30,new Ae(13,115),new Ae(3,116)),new ve(28,new Ae(2,46),new Ae(29,47)),new ve(30,new Ae(42,24),new Ae(1,25)),new ve(30,new Ae(23,15),new Ae(28,16))),new Se(32,Int32Array.from([6,34,60,86,112,138]),new ve(30,new Ae(17,115)),new ve(28,new Ae(10,46),new Ae(23,47)),new ve(30,new Ae(10,24),new Ae(35,25)),new ve(30,new Ae(19,15),new Ae(35,16))),new Se(33,Int32Array.from([6,30,58,86,114,142]),new ve(30,new Ae(17,115),new Ae(1,116)),new ve(28,new Ae(14,46),new Ae(21,47)),new ve(30,new Ae(29,24),new Ae(19,25)),new ve(30,new Ae(11,15),new Ae(46,16))),new Se(34,Int32Array.from([6,34,62,90,118,146]),new ve(30,new Ae(13,115),new Ae(6,116)),new ve(28,new Ae(14,46),new Ae(23,47)),new ve(30,new Ae(44,24),new Ae(7,25)),new ve(30,new Ae(59,16),new Ae(1,17))),new Se(35,Int32Array.from([6,30,54,78,102,126,150]),new ve(30,new Ae(12,121),new Ae(7,122)),new ve(28,new Ae(12,47),new Ae(26,48)),new ve(30,new Ae(39,24),new Ae(14,25)),new ve(30,new Ae(22,15),new Ae(41,16))),new Se(36,Int32Array.from([6,24,50,76,102,128,154]),new ve(30,new Ae(6,121),new Ae(14,122)),new ve(28,new Ae(6,47),new Ae(34,48)),new ve(30,new Ae(46,24),new Ae(10,25)),new ve(30,new Ae(2,15),new Ae(64,16))),new Se(37,Int32Array.from([6,28,54,80,106,132,158]),new ve(30,new Ae(17,122),new Ae(4,123)),new ve(28,new Ae(29,46),new Ae(14,47)),new ve(30,new Ae(49,24),new Ae(10,25)),new ve(30,new Ae(24,15),new Ae(46,16))),new Se(38,Int32Array.from([6,32,58,84,110,136,162]),new ve(30,new Ae(4,122),new Ae(18,123)),new ve(28,new Ae(13,46),new Ae(32,47)),new ve(30,new Ae(48,24),new Ae(14,25)),new ve(30,new Ae(42,15),new Ae(32,16))),new Se(39,Int32Array.from([6,26,54,82,110,138,166]),new ve(30,new Ae(20,117),new Ae(4,118)),new ve(28,new Ae(40,47),new Ae(7,48)),new ve(30,new Ae(43,24),new Ae(22,25)),new ve(30,new Ae(10,15),new Ae(67,16))),new Se(40,Int32Array.from([6,30,58,86,114,142,170]),new ve(30,new Ae(19,118),new Ae(6,119)),new ve(28,new Ae(18,47),new Ae(31,48)),new ve(30,new Ae(34,24),new Ae(34,25)),new ve(30,new Ae(20,15),new Ae(61,16)))],function(t){t[t.DATA_MASK_000=0]="DATA_MASK_000",t[t.DATA_MASK_001=1]="DATA_MASK_001",t[t.DATA_MASK_010=2]="DATA_MASK_010",t[t.DATA_MASK_011=3]="DATA_MASK_011",t[t.DATA_MASK_100=4]="DATA_MASK_100",t[t.DATA_MASK_101=5]="DATA_MASK_101",t[t.DATA_MASK_110=6]="DATA_MASK_110",t[t.DATA_MASK_111=7]="DATA_MASK_111"}(G||(G={}));class Ie{constructor(t,e){this.value=t,this.isMasked=e}unmaskBitMatrix(t,e){for(let r=0;r<e;r++)for(let i=0;i<e;i++)this.isMasked(r,i)&&t.flip(i,r)}}Ie.values=new Map([[G.DATA_MASK_000,new Ie(G.DATA_MASK_000,(t,e)=>!(t+e&1))],[G.DATA_MASK_001,new Ie(G.DATA_MASK_001,(t,e)=>!(1&t))],[G.DATA_MASK_010,new Ie(G.DATA_MASK_010,(t,e)=>e%3==0)],[G.DATA_MASK_011,new Ie(G.DATA_MASK_011,(t,e)=>(t+e)%3==0)],[G.DATA_MASK_100,new Ie(G.DATA_MASK_100,(t,e)=>!(Math.floor(t/2)+Math.floor(e/3)&1))],[G.DATA_MASK_101,new Ie(G.DATA_MASK_101,(t,e)=>t*e%6==0)],[G.DATA_MASK_110,new Ie(G.DATA_MASK_110,(t,e)=>t*e%6<3)],[G.DATA_MASK_111,new Ie(G.DATA_MASK_111,(t,e)=>!(t+e+t*e%3&1))]]);class Te{constructor(t){const e=t.getHeight();if(e<21||1!=(3&e))throw new C;this.bitMatrix=t}readFormatInformation(){if(null!==this.parsedFormatInfo&&void 0!==this.parsedFormatInfo)return this.parsedFormatInfo;let t=0;for(let e=0;e<6;e++)t=this.copyBit(e,8,t);t=this.copyBit(7,8,t),t=this.copyBit(8,8,t),t=this.copyBit(8,7,t);for(let e=5;e>=0;e--)t=this.copyBit(8,e,t);const e=this.bitMatrix.getHeight();let r=0;const i=e-7;for(let t=e-1;t>=i;t--)r=this.copyBit(8,t,r);for(let t=e-8;t<e;t++)r=this.copyBit(t,8,r);if(this.parsedFormatInfo=Ce.decodeFormatInformation(t,r),null!==this.parsedFormatInfo)return this.parsedFormatInfo;throw new C}readVersion(){if(null!==this.parsedVersion&&void 0!==this.parsedVersion)return this.parsedVersion;const t=this.bitMatrix.getHeight(),e=Math.floor((t-17)/4);if(e<=6)return Se.getVersionForNumber(e);let r=0;const i=t-11;for(let e=5;e>=0;e--)for(let n=t-9;n>=i;n--)r=this.copyBit(n,e,r);let n=Se.decodeVersionInformation(r);if(null!==n&&n.getDimensionForVersion()===t)return this.parsedVersion=n,n;r=0;for(let e=5;e>=0;e--)for(let n=t-9;n>=i;n--)r=this.copyBit(e,n,r);if(n=Se.decodeVersionInformation(r),null!==n&&n.getDimensionForVersion()===t)return this.parsedVersion=n,n;throw new C}copyBit(t,e,r){return(this.isMirror?this.bitMatrix.get(e,t):this.bitMatrix.get(t,e))?r<<1|1:r<<1}readCodewords(){const t=this.readFormatInformation(),e=this.readVersion(),r=Ie.values.get(t.getDataMask()),i=this.bitMatrix.getHeight();r.unmaskBitMatrix(this.bitMatrix,i);const n=e.buildFunctionPattern();let o=!0;const s=new Uint8Array(e.getTotalCodewords());let a=0,l=0,c=0;for(let t=i-1;t>0;t-=2){6===t&&t--;for(let e=0;e<i;e++){const r=o?i-1-e:e;for(let e=0;e<2;e++)n.get(t-e,r)||(c++,l<<=1,this.bitMatrix.get(t-e,r)&&(l|=1),8===c&&(s[a++]=l,c=0,l=0))}o=!o}if(a!==e.getTotalCodewords())throw new C;return s}remask(){if(null===this.parsedFormatInfo)return;const t=Ie.values[this.parsedFormatInfo.getDataMask()],e=this.bitMatrix.getHeight();t.unmaskBitMatrix(this.bitMatrix,e)}setMirror(t){this.parsedVersion=null,this.parsedFormatInfo=null,this.isMirror=t}mirror(){const t=this.bitMatrix;for(let e=0,r=t.getWidth();e<r;e++)for(let r=e+1,i=t.getHeight();r<i;r++)t.get(e,r)!==t.get(r,e)&&(t.flip(r,e),t.flip(e,r))}}class xe{constructor(t,e){this.numDataCodewords=t,this.codewords=e}static getDataBlocks(t,e,r){if(t.length!==e.getTotalCodewords())throw new d;const i=e.getECBlocksForLevel(r);let n=0;const o=i.getECBlocks();for(const t of o)n+=t.getCount();const s=new Array(n);let a=0;for(const t of o)for(let e=0;e<t.getCount();e++){const e=t.getDataCodewords(),r=i.getECCodewordsPerBlock()+e;s[a++]=new xe(e,new Uint8Array(r))}const l=s[0].codewords.length;let c=s.length-1;for(;c>=0&&s[c].codewords.length!==l;)c--;c++;const h=l-i.getECCodewordsPerBlock();let u=0;for(let e=0;e<h;e++)for(let r=0;r<a;r++)s[r].codewords[e]=t[u++];for(let e=c;e<a;e++)s[e].codewords[h]=t[u++];const p=s[0].codewords.length;for(let e=h;e<p;e++)for(let r=0;r<a;r++){const i=r<c?e:e+1;s[r].codewords[i]=t[u++]}return s}getNumDataCodewords(){return this.numDataCodewords}getCodewords(){return this.codewords}}!function(t){t[t.TERMINATOR=0]="TERMINATOR",t[t.NUMERIC=1]="NUMERIC",t[t.ALPHANUMERIC=2]="ALPHANUMERIC",t[t.STRUCTURED_APPEND=3]="STRUCTURED_APPEND",t[t.BYTE=4]="BYTE",t[t.ECI=5]="ECI",t[t.KANJI=6]="KANJI",t[t.FNC1_FIRST_POSITION=7]="FNC1_FIRST_POSITION",t[t.FNC1_SECOND_POSITION=8]="FNC1_SECOND_POSITION",t[t.HANZI=9]="HANZI"}(X||(X={}));class Re{constructor(t,e,r,i){this.value=t,this.stringValue=e,this.characterCountBitsForVersions=r,this.bits=i,Re.FOR_BITS.set(i,this),Re.FOR_VALUE.set(t,this)}static forBits(t){const e=Re.FOR_BITS.get(t);if(void 0===e)throw new d;return e}getCharacterCountBits(t){const e=t.getVersionNumber();let r;return r=e<=9?0:e<=26?1:2,this.characterCountBitsForVersions[r]}getValue(){return this.value}getBits(){return this.bits}equals(t){if(!(t instanceof Re))return!1;const e=t;return this.value===e.value}toString(){return this.stringValue}}Re.FOR_BITS=new Map,Re.FOR_VALUE=new Map,Re.TERMINATOR=new Re(X.TERMINATOR,"TERMINATOR",Int32Array.from([0,0,0]),0),Re.NUMERIC=new Re(X.NUMERIC,"NUMERIC",Int32Array.from([10,12,14]),1),Re.ALPHANUMERIC=new Re(X.ALPHANUMERIC,"ALPHANUMERIC",Int32Array.from([9,11,13]),2),Re.STRUCTURED_APPEND=new Re(X.STRUCTURED_APPEND,"STRUCTURED_APPEND",Int32Array.from([0,0,0]),3),Re.BYTE=new Re(X.BYTE,"BYTE",Int32Array.from([8,16,16]),4),Re.ECI=new Re(X.ECI,"ECI",Int32Array.from([0,0,0]),7),Re.KANJI=new Re(X.KANJI,"KANJI",Int32Array.from([8,10,12]),8),Re.FNC1_FIRST_POSITION=new Re(X.FNC1_FIRST_POSITION,"FNC1_FIRST_POSITION",Int32Array.from([0,0,0]),5),Re.FNC1_SECOND_POSITION=new Re(X.FNC1_SECOND_POSITION,"FNC1_SECOND_POSITION",Int32Array.from([0,0,0]),9),Re.HANZI=new Re(X.HANZI,"HANZI",Int32Array.from([8,10,12]),13);class Oe{static decode(t,e,r,i){const n=new ge(t);let o=new T;const s=new Array;let a=-1,l=-1;try{let t,r=null,c=!1;do{if(n.available()<4)t=Re.TERMINATOR;else{const e=n.readBits(4);t=Re.forBits(e)}switch(t){case Re.TERMINATOR:break;case Re.FNC1_FIRST_POSITION:case Re.FNC1_SECOND_POSITION:c=!0;break;case Re.STRUCTURED_APPEND:if(n.available()<16)throw new C;a=n.readBits(8),l=n.readBits(8);break;case Re.ECI:const d=Oe.parseECIValue(n);if(r=v.getCharacterSetECIByValue(d),null===r)throw new C;break;case Re.HANZI:const h=n.readBits(4),u=n.readBits(t.getCharacterCountBits(e));h===Oe.GB2312_SUBSET&&Oe.decodeHanziSegment(n,o,u);break;default:const p=n.readBits(t.getCharacterCountBits(e));switch(t){case Re.NUMERIC:Oe.decodeNumericSegment(n,o,p);break;case Re.ALPHANUMERIC:Oe.decodeAlphanumericSegment(n,o,p,c);break;case Re.BYTE:Oe.decodeByteSegment(n,o,p,r,s,i);break;case Re.KANJI:Oe.decodeKanjiSegment(n,o,p);break;default:throw new C}}}while(t!==Re.TERMINATOR)}catch(t){throw new C}return new Z(t,o.toString(),0===s.length?null:s,null===r?null:r.toString(),a,l)}static decodeHanziSegment(t,e,r){if(13*r>t.available())throw new C;const i=new Uint8Array(2*r);let n=0;for(;r>0;){const e=t.readBits(13);let o=e/96<<8&4294967295|e%96;o+=o<959?41377:42657,i[n]=o>>8&255,i[n+1]=255&o,n+=2,r--}try{e.append(S.decode(i,I.GB2312))}catch(t){throw new C(t)}}static decodeKanjiSegment(t,e,r){if(13*r>t.available())throw new C;const i=new Uint8Array(2*r);let n=0;for(;r>0;){const e=t.readBits(13);let o=e/192<<8&4294967295|e%192;o+=o<7936?33088:49472,i[n]=o>>8,i[n+1]=o,n+=2,r--}try{e.append(S.decode(i,I.SHIFT_JIS))}catch(t){throw new C(t)}}static decodeByteSegment(t,e,r,i,n,o){if(8*r>t.available())throw new C;const s=new Uint8Array(r);for(let e=0;e<r;e++)s[e]=t.readBits(8);let a;a=null===i?I.guessEncoding(s,o):i.getName();try{e.append(S.decode(s,a))}catch(t){throw new C(t)}n.push(s)}static toAlphaNumericChar(t){if(t>=Oe.ALPHANUMERIC_CHARS.length)throw new C;return Oe.ALPHANUMERIC_CHARS[t]}static decodeAlphanumericSegment(t,e,r,i){const n=e.length();for(;r>1;){if(t.available()<11)throw new C;const i=t.readBits(11);e.append(Oe.toAlphaNumericChar(Math.floor(i/45))),e.append(Oe.toAlphaNumericChar(i%45)),r-=2}if(1===r){if(t.available()<6)throw new C;e.append(Oe.toAlphaNumericChar(t.readBits(6)))}if(i)for(let t=n;t<e.length();t++)"%"===e.charAt(t)&&(t<e.length()-1&&"%"===e.charAt(t+1)?e.deleteCharAt(t+1):e.setCharAt(t,String.fromCharCode(29)))}static decodeNumericSegment(t,e,r){for(;r>=3;){if(t.available()<10)throw new C;const i=t.readBits(10);if(i>=1e3)throw new C;e.append(Oe.toAlphaNumericChar(Math.floor(i/100))),e.append(Oe.toAlphaNumericChar(Math.floor(i/10)%10)),e.append(Oe.toAlphaNumericChar(i%10)),r-=3}if(2===r){if(t.available()<7)throw new C;const r=t.readBits(7);if(r>=100)throw new C;e.append(Oe.toAlphaNumericChar(Math.floor(r/10))),e.append(Oe.toAlphaNumericChar(r%10))}else if(1===r){if(t.available()<4)throw new C;const r=t.readBits(4);if(r>=10)throw new C;e.append(Oe.toAlphaNumericChar(r))}}static parseECIValue(t){const e=t.readBits(8);if(!(128&e))return 127&e;if(128==(192&e))return(63&e)<<8&4294967295|t.readBits(8);if(192==(224&e))return(31&e)<<16&4294967295|t.readBits(16);throw new C}}Oe.ALPHANUMERIC_CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",Oe.GB2312_SUBSET=1;class Ne{constructor(t){this.mirrored=t}isMirrored(){return this.mirrored}applyMirroredCorrection(t){if(!this.mirrored||null===t||t.length<3)return;const e=t[0];t[0]=t[2],t[2]=e}}class De{constructor(){this.rsDecoder=new rt(J.QR_CODE_FIELD_256)}decodeBooleanArray(t,e){return this.decodeBitMatrix(x.parseFromBooleanArray(t),e)}decodeBitMatrix(t,e){const r=new Te(t);let i=null;try{return this.decodeBitMatrixParser(r,e)}catch(t){i=t}try{r.remask(),r.setMirror(!0),r.readVersion(),r.readFormatInformation(),r.mirror();const t=this.decodeBitMatrixParser(r,e);return t.setOther(new Ne(!0)),t}catch(t){if(null!==i)throw i;throw t}}decodeBitMatrixParser(t,e){const r=t.readVersion(),i=t.readFormatInformation().getErrorCorrectionLevel(),n=t.readCodewords(),o=xe.getDataBlocks(n,r,i);let s=0;for(const t of o)s+=t.getNumDataCodewords();const a=new Uint8Array(s);let l=0;for(const t of o){const e=t.getCodewords(),r=t.getNumDataCodewords();this.correctErrors(e,r);for(let t=0;t<r;t++)a[l++]=e[t]}return Oe.decode(a,r,i,e)}correctErrors(t,e){const r=new Int32Array(t);try{this.rsDecoder.decode(r,t.length-e)}catch(t){throw new u}for(let i=0;i<e;i++)t[i]=r[i]}}class Pe extends st{constructor(t,e,r){super(t,e),this.estimatedModuleSize=r}aboutEquals(t,e,r){if(Math.abs(e-this.getY())<=t&&Math.abs(r-this.getX())<=t){const e=Math.abs(t-this.estimatedModuleSize);return e<=1||e<=this.estimatedModuleSize}return!1}combineEstimate(t,e,r){const i=(this.getX()+e)/2,n=(this.getY()+t)/2,o=(this.estimatedModuleSize+r)/2;return new Pe(i,n,o)}}class Me{constructor(t,e,r,i,n,o,s){this.image=t,this.startX=e,this.startY=r,this.width=i,this.height=n,this.moduleSize=o,this.resultPointCallback=s,this.possibleCenters=[],this.crossCheckStateCount=new Int32Array(3)}find(){const t=this.startX,e=this.height,r=t+this.width,i=this.startY+e/2,n=new Int32Array(3),o=this.image;for(let s=0;s<e;s++){const e=i+(1&s?-Math.floor((s+1)/2):Math.floor((s+1)/2));n[0]=0,n[1]=0,n[2]=0;let a=t;for(;a<r&&!o.get(a,e);)a++;let l=0;for(;a<r;){if(o.get(a,e))if(1===l)n[1]++;else if(2===l){if(this.foundPatternCross(n)){const t=this.handlePossibleCenter(n,e,a);if(null!==t)return t}n[0]=n[2],n[1]=1,n[2]=0,l=1}else n[++l]++;else 1===l&&l++,n[l]++;a++}if(this.foundPatternCross(n)){const t=this.handlePossibleCenter(n,e,r);if(null!==t)return t}}if(0!==this.possibleCenters.length)return this.possibleCenters[0];throw new R}static centerFromEnd(t,e){return e-t[2]-t[1]/2}foundPatternCross(t){const e=this.moduleSize,r=e/2;for(let i=0;i<3;i++)if(Math.abs(e-t[i])>=r)return!1;return!0}crossCheckVertical(t,e,r,i){const n=this.image,o=n.getHeight(),s=this.crossCheckStateCount;s[0]=0,s[1]=0,s[2]=0;let a=t;for(;a>=0&&n.get(e,a)&&s[1]<=r;)s[1]++,a--;if(a<0||s[1]>r)return NaN;for(;a>=0&&!n.get(e,a)&&s[0]<=r;)s[0]++,a--;if(s[0]>r)return NaN;for(a=t+1;a<o&&n.get(e,a)&&s[1]<=r;)s[1]++,a++;if(a===o||s[1]>r)return NaN;for(;a<o&&!n.get(e,a)&&s[2]<=r;)s[2]++,a++;if(s[2]>r)return NaN;const l=s[0]+s[1]+s[2];return 5*Math.abs(l-i)>=2*i?NaN:this.foundPatternCross(s)?Me.centerFromEnd(s,a):NaN}handlePossibleCenter(t,e,r){const i=t[0]+t[1]+t[2],n=Me.centerFromEnd(t,r),o=this.crossCheckVertical(e,n,2*t[1],i);if(!isNaN(o)){const e=(t[0]+t[1]+t[2])/3;for(const t of this.possibleCenters)if(t.aboutEquals(e,o,n))return t.combineEstimate(o,n,e);const r=new Pe(n,o,e);this.possibleCenters.push(r),null!==this.resultPointCallback&&void 0!==this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(r)}return null}}class ke extends st{constructor(t,e,r,i){super(t,e),this.estimatedModuleSize=r,this.count=i,void 0===i&&(this.count=1)}getEstimatedModuleSize(){return this.estimatedModuleSize}getCount(){return this.count}aboutEquals(t,e,r){if(Math.abs(e-this.getY())<=t&&Math.abs(r-this.getX())<=t){const e=Math.abs(t-this.estimatedModuleSize);return e<=1||e<=this.estimatedModuleSize}return!1}combineEstimate(t,e,r){const i=this.count+1,n=(this.count*this.getX()+e)/i,o=(this.count*this.getY()+t)/i,s=(this.count*this.estimatedModuleSize+r)/i;return new ke(n,o,s,i)}}class Be{constructor(t){this.bottomLeft=t[0],this.topLeft=t[1],this.topRight=t[2]}getBottomLeft(){return this.bottomLeft}getTopLeft(){return this.topLeft}getTopRight(){return this.topRight}}class Le{constructor(t,e){this.image=t,this.resultPointCallback=e,this.possibleCenters=[],this.crossCheckStateCount=new Int32Array(5),this.resultPointCallback=e}getImage(){return this.image}getPossibleCenters(){return this.possibleCenters}find(t){const e=null!=t&&void 0!==t.get(E.TRY_HARDER),r=null!=t&&void 0!==t.get(E.PURE_BARCODE),i=this.image,n=i.getHeight(),o=i.getWidth();let s=Math.floor(3*n/(4*Le.MAX_MODULES));(s<Le.MIN_SKIP||e)&&(s=Le.MIN_SKIP);let a=!1;const l=new Int32Array(5);for(let t=s-1;t<n&&!a;t+=s){l[0]=0,l[1]=0,l[2]=0,l[3]=0,l[4]=0;let e=0;for(let n=0;n<o;n++)if(i.get(n,t))1&~e||e++,l[e]++;else if(1&e)l[e]++;else if(4===e)if(Le.foundPatternCross(l)){if(!0!==this.handlePossibleCenter(l,t,n,r)){l[0]=l[2],l[1]=l[3],l[2]=l[4],l[3]=1,l[4]=0,e=3;continue}if(s=2,!0===this.hasSkipped)a=this.haveMultiplyConfirmedCenters();else{const e=this.findRowSkip();e>l[2]&&(t+=e-l[2]-s,n=o-1)}e=0,l[0]=0,l[1]=0,l[2]=0,l[3]=0,l[4]=0}else l[0]=l[2],l[1]=l[3],l[2]=l[4],l[3]=1,l[4]=0,e=3;else l[++e]++;Le.foundPatternCross(l)&&!0===this.handlePossibleCenter(l,t,o,r)&&(s=l[0],this.hasSkipped&&(a=this.haveMultiplyConfirmedCenters()))}const c=this.selectBestPatterns();return st.orderBestPatterns(c),new Be(c)}static centerFromEnd(t,e){return e-t[4]-t[3]-t[2]/2}static foundPatternCross(t){let e=0;for(let r=0;r<5;r++){const i=t[r];if(0===i)return!1;e+=i}if(e<7)return!1;const r=e/7,i=r/2;return Math.abs(r-t[0])<i&&Math.abs(r-t[1])<i&&Math.abs(3*r-t[2])<3*i&&Math.abs(r-t[3])<i&&Math.abs(r-t[4])<i}getCrossCheckStateCount(){const t=this.crossCheckStateCount;return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t}crossCheckDiagonal(t,e,r,i){const n=this.getCrossCheckStateCount();let o=0;const s=this.image;for(;t>=o&&e>=o&&s.get(e-o,t-o);)n[2]++,o++;if(t<o||e<o)return!1;for(;t>=o&&e>=o&&!s.get(e-o,t-o)&&n[1]<=r;)n[1]++,o++;if(t<o||e<o||n[1]>r)return!1;for(;t>=o&&e>=o&&s.get(e-o,t-o)&&n[0]<=r;)n[0]++,o++;if(n[0]>r)return!1;const a=s.getHeight(),l=s.getWidth();for(o=1;t+o<a&&e+o<l&&s.get(e+o,t+o);)n[2]++,o++;if(t+o>=a||e+o>=l)return!1;for(;t+o<a&&e+o<l&&!s.get(e+o,t+o)&&n[3]<r;)n[3]++,o++;if(t+o>=a||e+o>=l||n[3]>=r)return!1;for(;t+o<a&&e+o<l&&s.get(e+o,t+o)&&n[4]<r;)n[4]++,o++;if(n[4]>=r)return!1;const c=n[0]+n[1]+n[2]+n[3]+n[4];return Math.abs(c-i)<2*i&&Le.foundPatternCross(n)}crossCheckVertical(t,e,r,i){const n=this.image,o=n.getHeight(),s=this.getCrossCheckStateCount();let a=t;for(;a>=0&&n.get(e,a);)s[2]++,a--;if(a<0)return NaN;for(;a>=0&&!n.get(e,a)&&s[1]<=r;)s[1]++,a--;if(a<0||s[1]>r)return NaN;for(;a>=0&&n.get(e,a)&&s[0]<=r;)s[0]++,a--;if(s[0]>r)return NaN;for(a=t+1;a<o&&n.get(e,a);)s[2]++,a++;if(a===o)return NaN;for(;a<o&&!n.get(e,a)&&s[3]<r;)s[3]++,a++;if(a===o||s[3]>=r)return NaN;for(;a<o&&n.get(e,a)&&s[4]<r;)s[4]++,a++;if(s[4]>=r)return NaN;const l=s[0]+s[1]+s[2]+s[3]+s[4];return 5*Math.abs(l-i)>=2*i?NaN:Le.foundPatternCross(s)?Le.centerFromEnd(s,a):NaN}crossCheckHorizontal(t,e,r,i){const n=this.image,o=n.getWidth(),s=this.getCrossCheckStateCount();let a=t;for(;a>=0&&n.get(a,e);)s[2]++,a--;if(a<0)return NaN;for(;a>=0&&!n.get(a,e)&&s[1]<=r;)s[1]++,a--;if(a<0||s[1]>r)return NaN;for(;a>=0&&n.get(a,e)&&s[0]<=r;)s[0]++,a--;if(s[0]>r)return NaN;for(a=t+1;a<o&&n.get(a,e);)s[2]++,a++;if(a===o)return NaN;for(;a<o&&!n.get(a,e)&&s[3]<r;)s[3]++,a++;if(a===o||s[3]>=r)return NaN;for(;a<o&&n.get(a,e)&&s[4]<r;)s[4]++,a++;if(s[4]>=r)return NaN;const l=s[0]+s[1]+s[2]+s[3]+s[4];return 5*Math.abs(l-i)>=i?NaN:Le.foundPatternCross(s)?Le.centerFromEnd(s,a):NaN}handlePossibleCenter(t,e,r,i){const n=t[0]+t[1]+t[2]+t[3]+t[4];let o=Le.centerFromEnd(t,r),s=this.crossCheckVertical(e,Math.floor(o),t[2],n);if(!isNaN(s)&&(o=this.crossCheckHorizontal(Math.floor(o),Math.floor(s),t[2],n),!isNaN(o)&&(!i||this.crossCheckDiagonal(Math.floor(s),Math.floor(o),t[2],n)))){const t=n/7;let e=!1;const r=this.possibleCenters;for(let i=0,n=r.length;i<n;i++){const n=r[i];if(n.aboutEquals(t,s,o)){r[i]=n.combineEstimate(s,o,t),e=!0;break}}if(!e){const e=new ke(o,s,t);r.push(e),null!==this.resultPointCallback&&void 0!==this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(e)}return!0}return!1}findRowSkip(){if(this.possibleCenters.length<=1)return 0;let t=null;for(const e of this.possibleCenters)if(e.getCount()>=Le.CENTER_QUORUM){if(null!=t)return this.hasSkipped=!0,Math.floor((Math.abs(t.getX()-e.getX())-Math.abs(t.getY()-e.getY()))/2);t=e}return 0}haveMultiplyConfirmedCenters(){let t=0,e=0;const r=this.possibleCenters.length;for(const r of this.possibleCenters)r.getCount()>=Le.CENTER_QUORUM&&(t++,e+=r.getEstimatedModuleSize());if(t<3)return!1;const i=e/r;let n=0;for(const t of this.possibleCenters)n+=Math.abs(t.getEstimatedModuleSize()-i);return n<=.05*e}selectBestPatterns(){const t=this.possibleCenters.length;if(t<3)throw new R;const e=this.possibleCenters;let r;if(t>3){let i=0,n=0;for(const t of this.possibleCenters){const e=t.getEstimatedModuleSize();i+=e,n+=e*e}r=i/t;let o=Math.sqrt(n/t-r*r);e.sort((t,e)=>{const i=Math.abs(e.getEstimatedModuleSize()-r),n=Math.abs(t.getEstimatedModuleSize()-r);return i<n?-1:i>n?1:0});const s=Math.max(.2*r,o);for(let t=0;t<e.length&&e.length>3;t++){const i=e[t];Math.abs(i.getEstimatedModuleSize()-r)>s&&(e.splice(t,1),t--)}}if(e.length>3){let t=0;for(const r of e)t+=r.getEstimatedModuleSize();r=t/e.length,e.sort((t,e)=>{if(e.getCount()===t.getCount()){const i=Math.abs(e.getEstimatedModuleSize()-r),n=Math.abs(t.getEstimatedModuleSize()-r);return i<n?1:i>n?-1:0}return e.getCount()-t.getCount()}),e.splice(3)}return[e[0],e[1],e[2]]}}Le.CENTER_QUORUM=2,Le.MIN_SKIP=3,Le.MAX_MODULES=57;class Fe{constructor(t){this.image=t}getImage(){return this.image}getResultPointCallback(){return this.resultPointCallback}detect(t){this.resultPointCallback=null==t?null:t.get(E.NEED_RESULT_POINT_CALLBACK);const e=new Le(this.image,this.resultPointCallback).find(t);return this.processFinderPatternInfo(e)}processFinderPatternInfo(t){const e=t.getTopLeft(),r=t.getTopRight(),i=t.getBottomLeft(),n=this.calculateModuleSize(e,r,i);if(n<1)throw new R("No pattern found in proccess finder.");const o=Fe.computeDimension(e,r,i,n),s=Se.getProvisionalVersionForDimension(o),a=s.getDimensionForVersion()-7;let l=null;if(s.getAlignmentPatternCenters().length>0){const t=r.getX()-e.getX()+i.getX(),o=r.getY()-e.getY()+i.getY(),s=1-3/a,c=Math.floor(e.getX()+s*(t-e.getX())),d=Math.floor(e.getY()+s*(o-e.getY()));for(let t=4;t<=16;t<<=1)try{l=this.findAlignmentInRegion(n,c,d,t);break}catch(t){if(!(t instanceof R))throw t}}const c=Fe.createTransform(e,r,i,l,o),d=Fe.sampleGrid(this.image,c,o);let h;return h=null===l?[i,e,r]:[i,e,r,l],new at(d,h)}static createTransform(t,e,r,i,n){const o=n-3.5;let s,a,l,c;return null!==i?(s=i.getX(),a=i.getY(),l=o-3,c=l):(s=e.getX()-t.getX()+r.getX(),a=e.getY()-t.getY()+r.getY(),l=o,c=o),ht.quadrilateralToQuadrilateral(3.5,3.5,o,3.5,l,c,3.5,o,t.getX(),t.getY(),e.getX(),e.getY(),s,a,r.getX(),r.getY())}static sampleGrid(t,e,r){return pt.getInstance().sampleGridWithTransform(t,r,r,e)}static computeDimension(t,e,r,i){const n=nt.round(st.distance(t,e)/i),o=nt.round(st.distance(t,r)/i);let s=Math.floor((n+o)/2)+7;switch(3&s){case 0:s++;break;case 2:s--;break;case 3:throw new R("Dimensions could be not found.")}return s}calculateModuleSize(t,e,r){return(this.calculateModuleSizeOneWay(t,e)+this.calculateModuleSizeOneWay(t,r))/2}calculateModuleSizeOneWay(t,e){const r=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(t.getX()),Math.floor(t.getY()),Math.floor(e.getX()),Math.floor(e.getY())),i=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(e.getX()),Math.floor(e.getY()),Math.floor(t.getX()),Math.floor(t.getY()));return isNaN(r)?i/7:isNaN(i)?r/7:(r+i)/14}sizeOfBlackWhiteBlackRunBothWays(t,e,r,i){let n=this.sizeOfBlackWhiteBlackRun(t,e,r,i),o=1,s=t-(r-t);s<0?(o=t/(t-s),s=0):s>=this.image.getWidth()&&(o=(this.image.getWidth()-1-t)/(s-t),s=this.image.getWidth()-1);let a=Math.floor(e-(i-e)*o);return o=1,a<0?(o=e/(e-a),a=0):a>=this.image.getHeight()&&(o=(this.image.getHeight()-1-e)/(a-e),a=this.image.getHeight()-1),s=Math.floor(t+(s-t)*o),n+=this.sizeOfBlackWhiteBlackRun(t,e,s,a),n-1}sizeOfBlackWhiteBlackRun(t,e,r,i){const n=Math.abs(i-e)>Math.abs(r-t);if(n){let n=t;t=e,e=n,n=r,r=i,i=n}const o=Math.abs(r-t),s=Math.abs(i-e);let a=-o/2;const l=t<r?1:-1,c=e<i?1:-1;let d=0;const h=r+l;for(let r=t,u=e;r!==h;r+=l){const l=n?u:r,h=n?r:u;if(1===d===this.image.get(l,h)){if(2===d)return nt.distance(r,u,t,e);d++}if(a+=s,a>0){if(u===i)break;u+=c,a-=o}}return 2===d?nt.distance(r+l,i,t,e):NaN}findAlignmentInRegion(t,e,r,i){const n=Math.floor(i*t),o=Math.max(0,e-n),s=Math.min(this.image.getWidth()-1,e+n);if(s-o<3*t)throw new R("Alignment top exceeds estimated module size.");const a=Math.max(0,r-n),l=Math.min(this.image.getHeight()-1,r+n);if(l-a<3*t)throw new R("Alignment bottom exceeds estimated module size.");return new Me(this.image,o,a,s-o,l-a,t,this.resultPointCallback).find()}}class $e{constructor(){this.decoder=new De}getDecoder(){return this.decoder}decode(t,e){let r,i;if(null!=e&&void 0!==e.get(E.PURE_BARCODE)){const n=$e.extractPureBits(t.getBlackMatrix());r=this.decoder.decodeBitMatrix(n,e),i=$e.NO_POINTS}else{const n=new Fe(t.getBlackMatrix()).detect(e);r=this.decoder.decodeBitMatrix(n.getBits(),e),i=n.getPoints()}r.getOther()instanceof Ne&&r.getOther().applyMirroredCorrection(i);const n=new $(r.getText(),r.getRawBytes(),void 0,i,H.QR_CODE,void 0),o=r.getByteSegments();null!==o&&n.putMetadata(Y.BYTE_SEGMENTS,o);const s=r.getECLevel();return null!==s&&n.putMetadata(Y.ERROR_CORRECTION_LEVEL,s),r.hasStructuredAppend()&&(n.putMetadata(Y.STRUCTURED_APPEND_SEQUENCE,r.getStructuredAppendSequenceNumber()),n.putMetadata(Y.STRUCTURED_APPEND_PARITY,r.getStructuredAppendParity())),n}reset(){}static extractPureBits(t){const e=t.getTopLeftOnBit(),r=t.getBottomRightOnBit();if(null===e||null===r)throw new R;const i=this.moduleSize(e,t);let n=e[1],o=r[1],s=e[0],a=r[0];if(s>=a||n>=o)throw new R;if(o-n!==a-s&&(a=s+(o-n),a>=t.getWidth()))throw new R;const l=Math.round((a-s+1)/i),c=Math.round((o-n+1)/i);if(l<=0||c<=0)throw new R;if(c!==l)throw new R;const d=Math.floor(i/2);n+=d,s+=d;const h=s+Math.floor((l-1)*i)-a;if(h>0){if(h>d)throw new R;s-=h}const u=n+Math.floor((c-1)*i)-o;if(u>0){if(u>d)throw new R;n-=u}const p=new x(l,c);for(let e=0;e<c;e++){const r=n+Math.floor(e*i);for(let n=0;n<l;n++)t.get(s+Math.floor(n*i),r)&&p.set(n,e)}return p}static moduleSize(t,e){const r=e.getHeight(),i=e.getWidth();let n=t[0],o=t[1],s=!0,a=0;for(;n<i&&o<r;){if(s!==e.get(n,o)){if(5===++a)break;s=!s}n++,o++}if(n===i||o===r)throw new R;return(n-t[0])/7}}$e.NO_POINTS=new Array;class Ue{PDF417Common(){}static getBitCountSum(t){return nt.sum(t)}static toIntArray(t){if(null==t||!t.length)return Ue.EMPTY_INT_ARRAY;const e=new Int32Array(t.length);let r=0;for(const i of t)e[r++]=i;return e}static getCodeword(t){const e=w.binarySearch(Ue.SYMBOL_TABLE,262143&t);return e<0?-1:(Ue.CODEWORD_TABLE[e]-1)%Ue.NUMBER_OF_CODEWORDS}}Ue.NUMBER_OF_CODEWORDS=929,Ue.MAX_CODEWORDS_IN_BARCODE=Ue.NUMBER_OF_CODEWORDS-1,Ue.MIN_ROWS_IN_BARCODE=3,Ue.MAX_ROWS_IN_BARCODE=90,Ue.MODULES_IN_CODEWORD=17,Ue.MODULES_IN_STOP_PATTERN=18,Ue.BARS_IN_MODULE=8,Ue.EMPTY_INT_ARRAY=new Int32Array([]),Ue.SYMBOL_TABLE=Int32Array.from([66142,66170,66206,66236,66290,66292,66350,66382,66396,66454,66470,66476,66594,66600,66614,66626,66628,66632,66640,66654,66662,66668,66682,66690,66718,66720,66748,66758,66776,66798,66802,66804,66820,66824,66832,66846,66848,66876,66880,66936,66950,66956,66968,66992,67006,67022,67036,67042,67044,67048,67062,67118,67150,67164,67214,67228,67256,67294,67322,67350,67366,67372,67398,67404,67416,67438,67474,67476,67490,67492,67496,67510,67618,67624,67650,67656,67664,67678,67686,67692,67706,67714,67716,67728,67742,67744,67772,67782,67788,67800,67822,67826,67828,67842,67848,67870,67872,67900,67904,67960,67974,67992,68016,68030,68046,68060,68066,68068,68072,68086,68104,68112,68126,68128,68156,68160,68216,68336,68358,68364,68376,68400,68414,68448,68476,68494,68508,68536,68546,68548,68552,68560,68574,68582,68588,68654,68686,68700,68706,68708,68712,68726,68750,68764,68792,68802,68804,68808,68816,68830,68838,68844,68858,68878,68892,68920,68976,68990,68994,68996,69e3,69008,69022,69024,69052,69062,69068,69080,69102,69106,69108,69142,69158,69164,69190,69208,69230,69254,69260,69272,69296,69310,69326,69340,69386,69394,69396,69410,69416,69430,69442,69444,69448,69456,69470,69478,69484,69554,69556,69666,69672,69698,69704,69712,69726,69754,69762,69764,69776,69790,69792,69820,69830,69836,69848,69870,69874,69876,69890,69918,69920,69948,69952,70008,70022,70040,70064,70078,70094,70108,70114,70116,70120,70134,70152,70174,70176,70264,70384,70412,70448,70462,70496,70524,70542,70556,70584,70594,70600,70608,70622,70630,70636,70664,70672,70686,70688,70716,70720,70776,70896,71136,71180,71192,71216,71230,71264,71292,71360,71416,71452,71480,71536,71550,71554,71556,71560,71568,71582,71584,71612,71622,71628,71640,71662,71726,71732,71758,71772,71778,71780,71784,71798,71822,71836,71864,71874,71880,71888,71902,71910,71916,71930,71950,71964,71992,72048,72062,72066,72068,72080,72094,72096,72124,72134,72140,72152,72174,72178,72180,72206,72220,72248,72304,72318,72416,72444,72456,72464,72478,72480,72508,72512,72568,72588,72600,72624,72638,72654,72668,72674,72676,72680,72694,72726,72742,72748,72774,72780,72792,72814,72838,72856,72880,72894,72910,72924,72930,72932,72936,72950,72966,72972,72984,73008,73022,73056,73084,73102,73116,73144,73156,73160,73168,73182,73190,73196,73210,73226,73234,73236,73250,73252,73256,73270,73282,73284,73296,73310,73318,73324,73346,73348,73352,73360,73374,73376,73404,73414,73420,73432,73454,73498,73518,73522,73524,73550,73564,73570,73572,73576,73590,73800,73822,73858,73860,73872,73886,73888,73916,73944,73970,73972,73992,74014,74016,74044,74048,74104,74118,74136,74160,74174,74210,74212,74216,74230,74244,74256,74270,74272,74360,74480,74502,74508,74544,74558,74592,74620,74638,74652,74680,74690,74696,74704,74726,74732,74782,74784,74812,74992,75232,75288,75326,75360,75388,75456,75512,75576,75632,75646,75650,75652,75664,75678,75680,75708,75718,75724,75736,75758,75808,75836,75840,75896,76016,76256,76736,76824,76848,76862,76896,76924,76992,77048,77296,77340,77368,77424,77438,77536,77564,77572,77576,77584,77600,77628,77632,77688,77702,77708,77720,77744,77758,77774,77788,77870,77902,77916,77922,77928,77966,77980,78008,78018,78024,78032,78046,78060,78074,78094,78136,78192,78206,78210,78212,78224,78238,78240,78268,78278,78284,78296,78322,78324,78350,78364,78448,78462,78560,78588,78600,78622,78624,78652,78656,78712,78726,78744,78768,78782,78798,78812,78818,78820,78824,78838,78862,78876,78904,78960,78974,79072,79100,79296,79352,79368,79376,79390,79392,79420,79424,79480,79600,79628,79640,79664,79678,79712,79740,79772,79800,79810,79812,79816,79824,79838,79846,79852,79894,79910,79916,79942,79948,79960,79982,79988,80006,80024,80048,80062,80078,80092,80098,80100,80104,80134,80140,80176,80190,80224,80252,80270,80284,80312,80328,80336,80350,80358,80364,80378,80390,80396,80408,80432,80446,80480,80508,80576,80632,80654,80668,80696,80752,80766,80776,80784,80798,80800,80828,80844,80856,80878,80882,80884,80914,80916,80930,80932,80936,80950,80962,80968,80976,80990,80998,81004,81026,81028,81040,81054,81056,81084,81094,81100,81112,81134,81154,81156,81160,81168,81182,81184,81212,81216,81272,81286,81292,81304,81328,81342,81358,81372,81380,81384,81398,81434,81454,81458,81460,81486,81500,81506,81508,81512,81526,81550,81564,81592,81602,81604,81608,81616,81630,81638,81644,81702,81708,81722,81734,81740,81752,81774,81778,81780,82050,82078,82080,82108,82180,82184,82192,82206,82208,82236,82240,82296,82316,82328,82352,82366,82402,82404,82408,82440,82448,82462,82464,82492,82496,82552,82672,82694,82700,82712,82736,82750,82784,82812,82830,82882,82884,82888,82896,82918,82924,82952,82960,82974,82976,83004,83008,83064,83184,83424,83468,83480,83504,83518,83552,83580,83648,83704,83740,83768,83824,83838,83842,83844,83848,83856,83872,83900,83910,83916,83928,83950,83984,84e3,84028,84032,84088,84208,84448,84928,85040,85054,85088,85116,85184,85240,85488,85560,85616,85630,85728,85756,85764,85768,85776,85790,85792,85820,85824,85880,85894,85900,85912,85936,85966,85980,86048,86080,86136,86256,86496,86976,88160,88188,88256,88312,88560,89056,89200,89214,89312,89340,89536,89592,89608,89616,89632,89664,89720,89840,89868,89880,89904,89952,89980,89998,90012,90040,90190,90204,90254,90268,90296,90306,90308,90312,90334,90382,90396,90424,90480,90494,90500,90504,90512,90526,90528,90556,90566,90572,90584,90610,90612,90638,90652,90680,90736,90750,90848,90876,90884,90888,90896,90910,90912,90940,90944,91e3,91014,91020,91032,91056,91070,91086,91100,91106,91108,91112,91126,91150,91164,91192,91248,91262,91360,91388,91584,91640,91664,91678,91680,91708,91712,91768,91888,91928,91952,91966,92e3,92028,92046,92060,92088,92098,92100,92104,92112,92126,92134,92140,92188,92216,92272,92384,92412,92608,92664,93168,93200,93214,93216,93244,93248,93304,93424,93664,93720,93744,93758,93792,93820,93888,93944,93980,94008,94064,94078,94084,94088,94096,94110,94112,94140,94150,94156,94168,94246,94252,94278,94284,94296,94318,94342,94348,94360,94384,94398,94414,94428,94440,94470,94476,94488,94512,94526,94560,94588,94606,94620,94648,94658,94660,94664,94672,94686,94694,94700,94714,94726,94732,94744,94768,94782,94816,94844,94912,94968,94990,95004,95032,95088,95102,95112,95120,95134,95136,95164,95180,95192,95214,95218,95220,95244,95256,95280,95294,95328,95356,95424,95480,95728,95758,95772,95800,95856,95870,95968,95996,96008,96016,96030,96032,96060,96064,96120,96152,96176,96190,96220,96226,96228,96232,96290,96292,96296,96310,96322,96324,96328,96336,96350,96358,96364,96386,96388,96392,96400,96414,96416,96444,96454,96460,96472,96494,96498,96500,96514,96516,96520,96528,96542,96544,96572,96576,96632,96646,96652,96664,96688,96702,96718,96732,96738,96740,96744,96758,96772,96776,96784,96798,96800,96828,96832,96888,97008,97030,97036,97048,97072,97086,97120,97148,97166,97180,97208,97220,97224,97232,97246,97254,97260,97326,97330,97332,97358,97372,97378,97380,97384,97398,97422,97436,97464,97474,97476,97480,97488,97502,97510,97516,97550,97564,97592,97648,97666,97668,97672,97680,97694,97696,97724,97734,97740,97752,97774,97830,97836,97850,97862,97868,97880,97902,97906,97908,97926,97932,97944,97968,97998,98012,98018,98020,98024,98038,98618,98674,98676,98838,98854,98874,98892,98904,98926,98930,98932,98968,99006,99042,99044,99048,99062,99166,99194,99246,99286,99350,99366,99372,99386,99398,99416,99438,99442,99444,99462,99504,99518,99534,99548,99554,99556,99560,99574,99590,99596,99608,99632,99646,99680,99708,99726,99740,99768,99778,99780,99784,99792,99806,99814,99820,99834,99858,99860,99874,99880,99894,99906,99920,99934,99962,99970,99972,99976,99984,99998,1e5,100028,100038,100044,100056,100078,100082,100084,100142,100174,100188,100246,100262,100268,100306,100308,100390,100396,100410,100422,100428,100440,100462,100466,100468,100486,100504,100528,100542,100558,100572,100578,100580,100584,100598,100620,100656,100670,100704,100732,100750,100792,100802,100808,100816,100830,100838,100844,100858,100888,100912,100926,100960,100988,101056,101112,101148,101176,101232,101246,101250,101252,101256,101264,101278,101280,101308,101318,101324,101336,101358,101362,101364,101410,101412,101416,101430,101442,101448,101456,101470,101478,101498,101506,101508,101520,101534,101536,101564,101580,101618,101620,101636,101640,101648,101662,101664,101692,101696,101752,101766,101784,101838,101858,101860,101864,101934,101938,101940,101966,101980,101986,101988,101992,102030,102044,102072,102082,102084,102088,102096,102138,102166,102182,102188,102214,102220,102232,102254,102282,102290,102292,102306,102308,102312,102326,102444,102458,102470,102476,102488,102514,102516,102534,102552,102576,102590,102606,102620,102626,102632,102646,102662,102668,102704,102718,102752,102780,102798,102812,102840,102850,102856,102864,102878,102886,102892,102906,102936,102974,103008,103036,103104,103160,103224,103280,103294,103298,103300,103312,103326,103328,103356,103366,103372,103384,103406,103410,103412,103472,103486,103520,103548,103616,103672,103920,103992,104048,104062,104160,104188,104194,104196,104200,104208,104224,104252,104256,104312,104326,104332,104344,104368,104382,104398,104412,104418,104420,104424,104482,104484,104514,104520,104528,104542,104550,104570,104578,104580,104592,104606,104608,104636,104652,104690,104692,104706,104712,104734,104736,104764,104768,104824,104838,104856,104910,104930,104932,104936,104968,104976,104990,104992,105020,105024,105080,105200,105240,105278,105312,105372,105410,105412,105416,105424,105446,105518,105524,105550,105564,105570,105572,105576,105614,105628,105656,105666,105672,105680,105702,105722,105742,105756,105784,105840,105854,105858,105860,105864,105872,105888,105932,105970,105972,106006,106022,106028,106054,106060,106072,106100,106118,106124,106136,106160,106174,106190,106210,106212,106216,106250,106258,106260,106274,106276,106280,106306,106308,106312,106320,106334,106348,106394,106414,106418,106420,106566,106572,106610,106612,106630,106636,106648,106672,106686,106722,106724,106728,106742,106758,106764,106776,106800,106814,106848,106876,106894,106908,106936,106946,106948,106952,106960,106974,106982,106988,107032,107056,107070,107104,107132,107200,107256,107292,107320,107376,107390,107394,107396,107400,107408,107422,107424,107452,107462,107468,107480,107502,107506,107508,107544,107568,107582,107616,107644,107712,107768,108016,108060,108088,108144,108158,108256,108284,108290,108292,108296,108304,108318,108320,108348,108352,108408,108422,108428,108440,108464,108478,108494,108508,108514,108516,108520,108592,108640,108668,108736,108792,109040,109536,109680,109694,109792,109820,110016,110072,110084,110088,110096,110112,110140,110144,110200,110320,110342,110348,110360,110384,110398,110432,110460,110478,110492,110520,110532,110536,110544,110558,110658,110686,110714,110722,110724,110728,110736,110750,110752,110780,110796,110834,110836,110850,110852,110856,110864,110878,110880,110908,110912,110968,110982,111e3,111054,111074,111076,111080,111108,111112,111120,111134,111136,111164,111168,111224,111344,111372,111422,111456,111516,111554,111556,111560,111568,111590,111632,111646,111648,111676,111680,111736,111856,112096,112152,112224,112252,112320,112440,112514,112516,112520,112528,112542,112544,112588,112686,112718,112732,112782,112796,112824,112834,112836,112840,112848,112870,112890,112910,112924,112952,113008,113022,113026,113028,113032,113040,113054,113056,113100,113138,113140,113166,113180,113208,113264,113278,113376,113404,113416,113424,113440,113468,113472,113560,113614,113634,113636,113640,113686,113702,113708,113734,113740,113752,113778,113780,113798,113804,113816,113840,113854,113870,113890,113892,113896,113926,113932,113944,113968,113982,114016,114044,114076,114114,114116,114120,114128,114150,114170,114194,114196,114210,114212,114216,114242,114244,114248,114256,114270,114278,114306,114308,114312,114320,114334,114336,114364,114380,114420,114458,114478,114482,114484,114510,114524,114530,114532,114536,114842,114866,114868,114970,114994,114996,115042,115044,115048,115062,115130,115226,115250,115252,115278,115292,115298,115300,115304,115318,115342,115394,115396,115400,115408,115422,115430,115436,115450,115478,115494,115514,115526,115532,115570,115572,115738,115758,115762,115764,115790,115804,115810,115812,115816,115830,115854,115868,115896,115906,115912,115920,115934,115942,115948,115962,115996,116024,116080,116094,116098,116100,116104,116112,116126,116128,116156,116166,116172,116184,116206,116210,116212,116246,116262,116268,116282,116294,116300,116312,116334,116338,116340,116358,116364,116376,116400,116414,116430,116444,116450,116452,116456,116498,116500,116514,116520,116534,116546,116548,116552,116560,116574,116582,116588,116602,116654,116694,116714,116762,116782,116786,116788,116814,116828,116834,116836,116840,116854,116878,116892,116920,116930,116936,116944,116958,116966,116972,116986,117006,117048,117104,117118,117122,117124,117136,117150,117152,117180,117190,117196,117208,117230,117234,117236,117304,117360,117374,117472,117500,117506,117508,117512,117520,117536,117564,117568,117624,117638,117644,117656,117680,117694,117710,117724,117730,117732,117736,117750,117782,117798,117804,117818,117830,117848,117874,117876,117894,117936,117950,117966,117986,117988,117992,118022,118028,118040,118064,118078,118112,118140,118172,118210,118212,118216,118224,118238,118246,118266,118306,118312,118338,118352,118366,118374,118394,118402,118404,118408,118416,118430,118432,118460,118476,118514,118516,118574,118578,118580,118606,118620,118626,118628,118632,118678,118694,118700,118730,118738,118740,118830,118834,118836,118862,118876,118882,118884,118888,118902,118926,118940,118968,118978,118980,118984,118992,119006,119014,119020,119034,119068,119096,119152,119166,119170,119172,119176,119184,119198,119200,119228,119238,119244,119256,119278,119282,119284,119324,119352,119408,119422,119520,119548,119554,119556,119560,119568,119582,119584,119612,119616,119672,119686,119692,119704,119728,119742,119758,119772,119778,119780,119784,119798,119920,119934,120032,120060,120256,120312,120324,120328,120336,120352,120384,120440,120560,120582,120588,120600,120624,120638,120672,120700,120718,120732,120760,120770,120772,120776,120784,120798,120806,120812,120870,120876,120890,120902,120908,120920,120946,120948,120966,120972,120984,121008,121022,121038,121058,121060,121064,121078,121100,121112,121136,121150,121184,121212,121244,121282,121284,121288,121296,121318,121338,121356,121368,121392,121406,121440,121468,121536,121592,121656,121730,121732,121736,121744,121758,121760,121804,121842,121844,121890,121922,121924,121928,121936,121950,121958,121978,121986,121988,121992,122e3,122014,122016,122044,122060,122098,122100,122116,122120,122128,122142,122144,122172,122176,122232,122246,122264,122318,122338,122340,122344,122414,122418,122420,122446,122460,122466,122468,122472,122510,122524,122552,122562,122564,122568,122576,122598,122618,122646,122662,122668,122694,122700,122712,122738,122740,122762,122770,122772,122786,122788,122792,123018,123026,123028,123042,123044,123048,123062,123098,123146,123154,123156,123170,123172,123176,123190,123202,123204,123208,123216,123238,123244,123258,123290,123314,123316,123402,123410,123412,123426,123428,123432,123446,123458,123464,123472,123486,123494,123500,123514,123522,123524,123528,123536,123552,123580,123590,123596,123608,123630,123634,123636,123674,123698,123700,123740,123746,123748,123752,123834,123914,123922,123924,123938,123944,123958,123970,123976,123984,123998,124006,124012,124026,124034,124036,124048,124062,124064,124092,124102,124108,124120,124142,124146,124148,124162,124164,124168,124176,124190,124192,124220,124224,124280,124294,124300,124312,124336,124350,124366,124380,124386,124388,124392,124406,124442,124462,124466,124468,124494,124508,124514,124520,124558,124572,124600,124610,124612,124616,124624,124646,124666,124694,124710,124716,124730,124742,124748,124760,124786,124788,124818,124820,124834,124836,124840,124854,124946,124948,124962,124964,124968,124982,124994,124996,125e3,125008,125022,125030,125036,125050,125058,125060,125064,125072,125086,125088,125116,125126,125132,125144,125166,125170,125172,125186,125188,125192,125200,125216,125244,125248,125304,125318,125324,125336,125360,125374,125390,125404,125410,125412,125416,125430,125444,125448,125456,125472,125504,125560,125680,125702,125708,125720,125744,125758,125792,125820,125838,125852,125880,125890,125892,125896,125904,125918,125926,125932,125978,125998,126002,126004,126030,126044,126050,126052,126056,126094,126108,126136,126146,126148,126152,126160,126182,126202,126222,126236,126264,126320,126334,126338,126340,126344,126352,126366,126368,126412,126450,126452,126486,126502,126508,126522,126534,126540,126552,126574,126578,126580,126598,126604,126616,126640,126654,126670,126684,126690,126692,126696,126738,126754,126756,126760,126774,126786,126788,126792,126800,126814,126822,126828,126842,126894,126898,126900,126934,127126,127142,127148,127162,127178,127186,127188,127254,127270,127276,127290,127302,127308,127320,127342,127346,127348,127370,127378,127380,127394,127396,127400,127450,127510,127526,127532,127546,127558,127576,127598,127602,127604,127622,127628,127640,127664,127678,127694,127708,127714,127716,127720,127734,127754,127762,127764,127778,127784,127810,127812,127816,127824,127838,127846,127866,127898,127918,127922,127924,128022,128038,128044,128058,128070,128076,128088,128110,128114,128116,128134,128140,128152,128176,128190,128206,128220,128226,128228,128232,128246,128262,128268,128280,128304,128318,128352,128380,128398,128412,128440,128450,128452,128456,128464,128478,128486,128492,128506,128522,128530,128532,128546,128548,128552,128566,128578,128580,128584,128592,128606,128614,128634,128642,128644,128648,128656,128670,128672,128700,128716,128754,128756,128794,128814,128818,128820,128846,128860,128866,128868,128872,128886,128918,128934,128940,128954,128978,128980,129178,129198,129202,129204,129238,129258,129306,129326,129330,129332,129358,129372,129378,129380,129384,129398,129430,129446,129452,129466,129482,129490,129492,129562,129582,129586,129588,129614,129628,129634,129636,129640,129654,129678,129692,129720,129730,129732,129736,129744,129758,129766,129772,129814,129830,129836,129850,129862,129868,129880,129902,129906,129908,129930,129938,129940,129954,129956,129960,129974,130010]),Ue.CODEWORD_TABLE=Int32Array.from([2627,1819,2622,2621,1813,1812,2729,2724,2723,2779,2774,2773,902,896,908,868,865,861,859,2511,873,871,1780,835,2493,825,2491,842,837,844,1764,1762,811,810,809,2483,807,2482,806,2480,815,814,813,812,2484,817,816,1745,1744,1742,1746,2655,2637,2635,2626,2625,2623,2628,1820,2752,2739,2737,2728,2727,2725,2730,2785,2783,2778,2777,2775,2780,787,781,747,739,736,2413,754,752,1719,692,689,681,2371,678,2369,700,697,694,703,1688,1686,642,638,2343,631,2341,627,2338,651,646,643,2345,654,652,1652,1650,1647,1654,601,599,2322,596,2321,594,2319,2317,611,610,608,606,2324,603,2323,615,614,612,1617,1616,1614,1612,616,1619,1618,2575,2538,2536,905,901,898,909,2509,2507,2504,870,867,864,860,2512,875,872,1781,2490,2489,2487,2485,1748,836,834,832,830,2494,827,2492,843,841,839,845,1765,1763,2701,2676,2674,2653,2648,2656,2634,2633,2631,2629,1821,2638,2636,2770,2763,2761,2750,2745,2753,2736,2735,2733,2731,1848,2740,2738,2786,2784,591,588,576,569,566,2296,1590,537,534,526,2276,522,2274,545,542,539,548,1572,1570,481,2245,466,2242,462,2239,492,485,482,2249,496,494,1534,1531,1528,1538,413,2196,406,2191,2188,425,419,2202,415,2199,432,430,427,1472,1467,1464,433,1476,1474,368,367,2160,365,2159,362,2157,2155,2152,378,377,375,2166,372,2165,369,2162,383,381,379,2168,1419,1418,1416,1414,385,1411,384,1423,1422,1420,1424,2461,802,2441,2439,790,786,783,794,2409,2406,2403,750,742,738,2414,756,753,1720,2367,2365,2362,2359,1663,693,691,684,2373,680,2370,702,699,696,704,1690,1687,2337,2336,2334,2332,1624,2329,1622,640,637,2344,634,2342,630,2340,650,648,645,2346,655,653,1653,1651,1649,1655,2612,2597,2595,2571,2568,2565,2576,2534,2529,2526,1787,2540,2537,907,904,900,910,2503,2502,2500,2498,1768,2495,1767,2510,2508,2506,869,866,863,2513,876,874,1782,2720,2713,2711,2697,2694,2691,2702,2672,2670,2664,1828,2678,2675,2647,2646,2644,2642,1823,2639,1822,2654,2652,2650,2657,2771,1855,2765,2762,1850,1849,2751,2749,2747,2754,353,2148,344,342,336,2142,332,2140,345,1375,1373,306,2130,299,2128,295,2125,319,314,311,2132,1354,1352,1349,1356,262,257,2101,253,2096,2093,274,273,267,2107,263,2104,280,278,275,1316,1311,1308,1320,1318,2052,202,2050,2044,2040,219,2063,212,2060,208,2055,224,221,2066,1260,1258,1252,231,1248,229,1266,1264,1261,1268,155,1998,153,1996,1994,1991,1988,165,164,2007,162,2006,159,2003,2e3,172,171,169,2012,166,2010,1186,1184,1182,1179,175,1176,173,1192,1191,1189,1187,176,1194,1193,2313,2307,2305,592,589,2294,2292,2289,578,572,568,2297,580,1591,2272,2267,2264,1547,538,536,529,2278,525,2275,547,544,541,1574,1571,2237,2235,2229,1493,2225,1489,478,2247,470,2244,465,2241,493,488,484,2250,498,495,1536,1533,1530,1539,2187,2186,2184,2182,1432,2179,1430,2176,1427,414,412,2197,409,2195,405,2193,2190,426,424,421,2203,418,2201,431,429,1473,1471,1469,1466,434,1477,1475,2478,2472,2470,2459,2457,2454,2462,803,2437,2432,2429,1726,2443,2440,792,789,785,2401,2399,2393,1702,2389,1699,2411,2408,2405,745,741,2415,758,755,1721,2358,2357,2355,2353,1661,2350,1660,2347,1657,2368,2366,2364,2361,1666,690,687,2374,683,2372,701,698,705,1691,1689,2619,2617,2610,2608,2605,2613,2593,2588,2585,1803,2599,2596,2563,2561,2555,1797,2551,1795,2573,2570,2567,2577,2525,2524,2522,2520,1786,2517,1785,2514,1783,2535,2533,2531,2528,1788,2541,2539,906,903,911,2721,1844,2715,2712,1838,1836,2699,2696,2693,2703,1827,1826,1824,2673,2671,2669,2666,1829,2679,2677,1858,1857,2772,1854,1853,1851,1856,2766,2764,143,1987,139,1986,135,133,131,1984,128,1983,125,1981,138,137,136,1985,1133,1132,1130,112,110,1974,107,1973,104,1971,1969,122,121,119,117,1977,114,1976,124,1115,1114,1112,1110,1117,1116,84,83,1953,81,1952,78,1950,1948,1945,94,93,91,1959,88,1958,85,1955,99,97,95,1961,1086,1085,1083,1081,1078,100,1090,1089,1087,1091,49,47,1917,44,1915,1913,1910,1907,59,1926,56,1925,53,1922,1919,66,64,1931,61,1929,1042,1040,1038,71,1035,70,1032,68,1048,1047,1045,1043,1050,1049,12,10,1869,1867,1864,1861,21,1880,19,1877,1874,1871,28,1888,25,1886,22,1883,982,980,977,974,32,30,991,989,987,984,34,995,994,992,2151,2150,2147,2146,2144,356,355,354,2149,2139,2138,2136,2134,1359,343,341,338,2143,335,2141,348,347,346,1376,1374,2124,2123,2121,2119,1326,2116,1324,310,308,305,2131,302,2129,298,2127,320,318,316,313,2133,322,321,1355,1353,1351,1357,2092,2091,2089,2087,1276,2084,1274,2081,1271,259,2102,256,2100,252,2098,2095,272,269,2108,266,2106,281,279,277,1317,1315,1313,1310,282,1321,1319,2039,2037,2035,2032,1203,2029,1200,1197,207,2053,205,2051,201,2049,2046,2043,220,218,2064,215,2062,211,2059,228,226,223,2069,1259,1257,1254,232,1251,230,1267,1265,1263,2316,2315,2312,2311,2309,2314,2304,2303,2301,2299,1593,2308,2306,590,2288,2287,2285,2283,1578,2280,1577,2295,2293,2291,579,577,574,571,2298,582,581,1592,2263,2262,2260,2258,1545,2255,1544,2252,1541,2273,2271,2269,2266,1550,535,532,2279,528,2277,546,543,549,1575,1573,2224,2222,2220,1486,2217,1485,2214,1482,1479,2238,2236,2234,2231,1496,2228,1492,480,477,2248,473,2246,469,2243,490,487,2251,497,1537,1535,1532,2477,2476,2474,2479,2469,2468,2466,2464,1730,2473,2471,2453,2452,2450,2448,1729,2445,1728,2460,2458,2456,2463,805,804,2428,2427,2425,2423,1725,2420,1724,2417,1722,2438,2436,2434,2431,1727,2444,2442,793,791,788,795,2388,2386,2384,1697,2381,1696,2378,1694,1692,2402,2400,2398,2395,1703,2392,1701,2412,2410,2407,751,748,744,2416,759,757,1807,2620,2618,1806,1805,2611,2609,2607,2614,1802,1801,1799,2594,2592,2590,2587,1804,2600,2598,1794,1793,1791,1789,2564,2562,2560,2557,1798,2554,1796,2574,2572,2569,2578,1847,1846,2722,1843,1842,1840,1845,2716,2714,1835,1834,1832,1830,1839,1837,2700,2698,2695,2704,1817,1811,1810,897,862,1777,829,826,838,1760,1758,808,2481,1741,1740,1738,1743,2624,1818,2726,2776,782,740,737,1715,686,679,695,1682,1680,639,628,2339,647,644,1645,1643,1640,1648,602,600,597,595,2320,593,2318,609,607,604,1611,1610,1608,1606,613,1615,1613,2328,926,924,892,886,899,857,850,2505,1778,824,823,821,819,2488,818,2486,833,831,828,840,1761,1759,2649,2632,2630,2746,2734,2732,2782,2781,570,567,1587,531,527,523,540,1566,1564,476,467,463,2240,486,483,1524,1521,1518,1529,411,403,2192,399,2189,423,416,1462,1457,1454,428,1468,1465,2210,366,363,2158,360,2156,357,2153,376,373,370,2163,1410,1409,1407,1405,382,1402,380,1417,1415,1412,1421,2175,2174,777,774,771,784,732,725,722,2404,743,1716,676,674,668,2363,665,2360,685,1684,1681,626,624,622,2335,620,2333,617,2330,641,635,649,1646,1644,1642,2566,928,925,2530,2527,894,891,888,2501,2499,2496,858,856,854,851,1779,2692,2668,2665,2645,2643,2640,2651,2768,2759,2757,2744,2743,2741,2748,352,1382,340,337,333,1371,1369,307,300,296,2126,315,312,1347,1342,1350,261,258,250,2097,246,2094,271,268,264,1306,1301,1298,276,1312,1309,2115,203,2048,195,2045,191,2041,213,209,2056,1246,1244,1238,225,1234,222,1256,1253,1249,1262,2080,2079,154,1997,150,1995,147,1992,1989,163,160,2004,156,2001,1175,1174,1172,1170,1167,170,1164,167,1185,1183,1180,1177,174,1190,1188,2025,2024,2022,587,586,564,559,556,2290,573,1588,520,518,512,2268,508,2265,530,1568,1565,461,457,2233,450,2230,446,2226,479,471,489,1526,1523,1520,397,395,2185,392,2183,389,2180,2177,410,2194,402,422,1463,1461,1459,1456,1470,2455,799,2433,2430,779,776,773,2397,2394,2390,734,728,724,746,1717,2356,2354,2351,2348,1658,677,675,673,670,667,688,1685,1683,2606,2589,2586,2559,2556,2552,927,2523,2521,2518,2515,1784,2532,895,893,890,2718,2709,2707,2689,2687,2684,2663,2662,2660,2658,1825,2667,2769,1852,2760,2758,142,141,1139,1138,134,132,129,126,1982,1129,1128,1126,1131,113,111,108,105,1972,101,1970,120,118,115,1109,1108,1106,1104,123,1113,1111,82,79,1951,75,1949,72,1946,92,89,86,1956,1077,1076,1074,1072,98,1069,96,1084,1082,1079,1088,1968,1967,48,45,1916,42,1914,39,1911,1908,60,57,54,1923,50,1920,1031,1030,1028,1026,67,1023,65,1020,62,1041,1039,1036,1033,69,1046,1044,1944,1943,1941,11,9,1868,7,1865,1862,1859,20,1878,16,1875,13,1872,970,968,966,963,29,960,26,23,983,981,978,975,33,971,31,990,988,985,1906,1904,1902,993,351,2145,1383,331,330,328,326,2137,323,2135,339,1372,1370,294,293,291,289,2122,286,2120,283,2117,309,303,317,1348,1346,1344,245,244,242,2090,239,2088,236,2085,2082,260,2099,249,270,1307,1305,1303,1300,1314,189,2038,186,2036,183,2033,2030,2026,206,198,2047,194,216,1247,1245,1243,1240,227,1237,1255,2310,2302,2300,2286,2284,2281,565,563,561,558,575,1589,2261,2259,2256,2253,1542,521,519,517,514,2270,511,533,1569,1567,2223,2221,2218,2215,1483,2211,1480,459,456,453,2232,449,474,491,1527,1525,1522,2475,2467,2465,2451,2449,2446,801,800,2426,2424,2421,2418,1723,2435,780,778,775,2387,2385,2382,2379,1695,2375,1693,2396,735,733,730,727,749,1718,2616,2615,2604,2603,2601,2584,2583,2581,2579,1800,2591,2550,2549,2547,2545,1792,2542,1790,2558,929,2719,1841,2710,2708,1833,1831,2690,2688,2686,1815,1809,1808,1774,1756,1754,1737,1736,1734,1739,1816,1711,1676,1674,633,629,1638,1636,1633,1641,598,1605,1604,1602,1600,605,1609,1607,2327,887,853,1775,822,820,1757,1755,1584,524,1560,1558,468,464,1514,1511,1508,1519,408,404,400,1452,1447,1444,417,1458,1455,2208,364,361,358,2154,1401,1400,1398,1396,374,1393,371,1408,1406,1403,1413,2173,2172,772,726,723,1712,672,669,666,682,1678,1675,625,623,621,618,2331,636,632,1639,1637,1635,920,918,884,880,889,849,848,847,846,2497,855,852,1776,2641,2742,2787,1380,334,1367,1365,301,297,1340,1338,1335,1343,255,251,247,1296,1291,1288,265,1302,1299,2113,204,196,192,2042,1232,1230,1224,214,1220,210,1242,1239,1235,1250,2077,2075,151,148,1993,144,1990,1163,1162,1160,1158,1155,161,1152,157,1173,1171,1168,1165,168,1181,1178,2021,2020,2018,2023,585,560,557,1585,516,509,1562,1559,458,447,2227,472,1516,1513,1510,398,396,393,390,2181,386,2178,407,1453,1451,1449,1446,420,1460,2209,769,764,720,712,2391,729,1713,664,663,661,659,2352,656,2349,671,1679,1677,2553,922,919,2519,2516,885,883,881,2685,2661,2659,2767,2756,2755,140,1137,1136,130,127,1125,1124,1122,1127,109,106,102,1103,1102,1100,1098,116,1107,1105,1980,80,76,73,1947,1068,1067,1065,1063,90,1060,87,1075,1073,1070,1080,1966,1965,46,43,40,1912,36,1909,1019,1018,1016,1014,58,1011,55,1008,51,1029,1027,1024,1021,63,1037,1034,1940,1939,1937,1942,8,1866,4,1863,1,1860,956,954,952,949,946,17,14,969,967,964,961,27,957,24,979,976,972,1901,1900,1898,1896,986,1905,1903,350,349,1381,329,327,324,1368,1366,292,290,287,284,2118,304,1341,1339,1337,1345,243,240,237,2086,233,2083,254,1297,1295,1293,1290,1304,2114,190,187,184,2034,180,2031,177,2027,199,1233,1231,1229,1226,217,1223,1241,2078,2076,584,555,554,552,550,2282,562,1586,507,506,504,502,2257,499,2254,515,1563,1561,445,443,441,2219,438,2216,435,2212,460,454,475,1517,1515,1512,2447,798,797,2422,2419,770,768,766,2383,2380,2376,721,719,717,714,731,1714,2602,2582,2580,2548,2546,2543,923,921,2717,2706,2705,2683,2682,2680,1771,1752,1750,1733,1732,1731,1735,1814,1707,1670,1668,1631,1629,1626,1634,1599,1598,1596,1594,1603,1601,2326,1772,1753,1751,1581,1554,1552,1504,1501,1498,1509,1442,1437,1434,401,1448,1445,2206,1392,1391,1389,1387,1384,359,1399,1397,1394,1404,2171,2170,1708,1672,1669,619,1632,1630,1628,1773,1378,1363,1361,1333,1328,1336,1286,1281,1278,248,1292,1289,2111,1218,1216,1210,197,1206,193,1228,1225,1221,1236,2073,2071,1151,1150,1148,1146,152,1143,149,1140,145,1161,1159,1156,1153,158,1169,1166,2017,2016,2014,2019,1582,510,1556,1553,452,448,1506,1500,394,391,387,1443,1441,1439,1436,1450,2207,765,716,713,1709,662,660,657,1673,1671,916,914,879,878,877,882,1135,1134,1121,1120,1118,1123,1097,1096,1094,1092,103,1101,1099,1979,1059,1058,1056,1054,77,1051,74,1066,1064,1061,1071,1964,1963,1007,1006,1004,1002,999,41,996,37,1017,1015,1012,1009,52,1025,1022,1936,1935,1933,1938,942,940,938,935,932,5,2,955,953,950,947,18,943,15,965,962,958,1895,1894,1892,1890,973,1899,1897,1379,325,1364,1362,288,285,1334,1332,1330,241,238,234,1287,1285,1283,1280,1294,2112,188,185,181,178,2028,1219,1217,1215,1212,200,1209,1227,2074,2072,583,553,551,1583,505,503,500,513,1557,1555,444,442,439,436,2213,455,451,1507,1505,1502,796,763,762,760,767,711,710,708,706,2377,718,715,1710,2544,917,915,2681,1627,1597,1595,2325,1769,1749,1747,1499,1438,1435,2204,1390,1388,1385,1395,2169,2167,1704,1665,1662,1625,1623,1620,1770,1329,1282,1279,2109,1214,1207,1222,2068,2065,1149,1147,1144,1141,146,1157,1154,2013,2011,2008,2015,1579,1549,1546,1495,1487,1433,1431,1428,1425,388,1440,2205,1705,658,1667,1664,1119,1095,1093,1978,1057,1055,1052,1062,1962,1960,1005,1003,1e3,997,38,1013,1010,1932,1930,1927,1934,941,939,936,933,6,930,3,951,948,944,1889,1887,1884,1881,959,1893,1891,35,1377,1360,1358,1327,1325,1322,1331,1277,1275,1272,1269,235,1284,2110,1205,1204,1201,1198,182,1195,179,1213,2070,2067,1580,501,1551,1548,440,437,1497,1494,1490,1503,761,709,707,1706,913,912,2198,1386,2164,2161,1621,1766,2103,1208,2058,2054,1145,1142,2005,2002,1999,2009,1488,1429,1426,2200,1698,1659,1656,1975,1053,1957,1954,1001,998,1924,1921,1918,1928,937,934,931,1879,1876,1873,1870,945,1885,1882,1323,1273,1270,2105,1202,1199,1196,1211,2061,2057,1576,1543,1540,1484,1481,1478,1491,1700]);class He{constructor(t,e){this.bits=t,this.points=e}getBits(){return this.bits}getPoints(){return this.points}}class Ve{static detectMultiple(t,e,r){let i=t.getBlackMatrix(),n=Ve.detect(r,i);return n.length||(i=i.clone(),i.rotate180(),n=Ve.detect(r,i)),new He(i,n)}static detect(t,e){const r=new Array;let i=0,n=0,o=!1;for(;i<e.getHeight();){const s=Ve.findVertices(e,i,n);if(null!=s[0]||null!=s[3]){if(o=!0,r.push(s),!t)break;null!=s[2]?(n=Math.trunc(s[2].getX()),i=Math.trunc(s[2].getY())):(n=Math.trunc(s[4].getX()),i=Math.trunc(s[4].getY()))}else{if(!o)break;o=!1,n=0;for(const t of r)null!=t[1]&&(i=Math.trunc(Math.max(i,t[1].getY()))),null!=t[3]&&(i=Math.max(i,Math.trunc(t[3].getY())));i+=Ve.ROW_STEP}}return r}static findVertices(t,e,r){const i=t.getHeight(),n=t.getWidth(),o=new Array(8);return Ve.copyToResult(o,Ve.findRowsWithPattern(t,i,n,e,r,Ve.START_PATTERN),Ve.INDEXES_START_PATTERN),null!=o[4]&&(r=Math.trunc(o[4].getX()),e=Math.trunc(o[4].getY())),Ve.copyToResult(o,Ve.findRowsWithPattern(t,i,n,e,r,Ve.STOP_PATTERN),Ve.INDEXES_STOP_PATTERN),o}static copyToResult(t,e,r){for(let i=0;i<r.length;i++)t[r[i]]=e[i]}static findRowsWithPattern(t,e,r,i,n,o){const s=new Array(4);let a=!1;const l=new Int32Array(o.length);for(;i<e;i+=Ve.ROW_STEP){let e=Ve.findGuardPattern(t,n,i,r,!1,o,l);if(null!=e){for(;i>0;){const s=Ve.findGuardPattern(t,n,--i,r,!1,o,l);if(null==s){i++;break}e=s}s[0]=new st(e[0],i),s[1]=new st(e[1],i),a=!0;break}}let c=i+1;if(a){let i=0,n=Int32Array.from([Math.trunc(s[0].getX()),Math.trunc(s[1].getX())]);for(;c<e;c++){const e=Ve.findGuardPattern(t,n[0],c,r,!1,o,l);if(null!=e&&Math.abs(n[0]-e[0])<Ve.MAX_PATTERN_DRIFT&&Math.abs(n[1]-e[1])<Ve.MAX_PATTERN_DRIFT)n=e,i=0;else{if(i>Ve.SKIPPED_ROW_COUNT_MAX)break;i++}}c-=i+1,s[2]=new st(n[0],c),s[3]=new st(n[1],c)}return c-i<Ve.BARCODE_MIN_HEIGHT&&w.fill(s,null),s}static findGuardPattern(t,e,r,i,n,o,s){w.fillWithin(s,0,s.length,0);let a=e,l=0;for(;t.get(a,r)&&a>0&&l++<Ve.MAX_PIXEL_DRIFT;)a--;let c=a,d=0,h=o.length;for(let e=n;c<i;c++)if(t.get(c,r)!==e)s[d]++;else{if(d===h-1){if(Ve.patternMatchVariance(s,o,Ve.MAX_INDIVIDUAL_VARIANCE)<Ve.MAX_AVG_VARIANCE)return new Int32Array([a,c]);a+=s[0]+s[1],f.arraycopy(s,2,s,0,d-1),s[d-1]=0,s[d]=0,d--}else d++;s[d]=1,e=!e}return d===h-1&&Ve.patternMatchVariance(s,o,Ve.MAX_INDIVIDUAL_VARIANCE)<Ve.MAX_AVG_VARIANCE?new Int32Array([a,c-1]):null}static patternMatchVariance(t,e,r){let i=t.length,n=0,o=0;for(let r=0;r<i;r++)n+=t[r],o+=e[r];if(n<o)return 1/0;let s=n/o;r*=s;let a=0;for(let n=0;n<i;n++){let i=t[n],o=e[n]*s,l=i>o?i-o:o-i;if(l>r)return 1/0;a+=l}return a/n}}Ve.INDEXES_START_PATTERN=Int32Array.from([0,4,1,5]),Ve.INDEXES_STOP_PATTERN=Int32Array.from([6,2,7,3]),Ve.MAX_AVG_VARIANCE=.42,Ve.MAX_INDIVIDUAL_VARIANCE=.8,Ve.START_PATTERN=Int32Array.from([8,1,1,1,1,1,1,3]),Ve.STOP_PATTERN=Int32Array.from([7,1,1,3,1,1,1,2,1]),Ve.MAX_PIXEL_DRIFT=3,Ve.MAX_PATTERN_DRIFT=5,Ve.SKIPPED_ROW_COUNT_MAX=25,Ve.ROW_STEP=5,Ve.BARCODE_MIN_HEIGHT=10;class ze{constructor(t,e){if(0===e.length)throw new d;this.field=t;let r=e.length;if(r>1&&0===e[0]){let t=1;for(;t<r&&0===e[t];)t++;t===r?this.coefficients=new Int32Array([0]):(this.coefficients=new Int32Array(r-t),f.arraycopy(e,t,this.coefficients,0,this.coefficients.length))}else this.coefficients=e}getCoefficients(){return this.coefficients}getDegree(){return this.coefficients.length-1}isZero(){return 0===this.coefficients[0]}getCoefficient(t){return this.coefficients[this.coefficients.length-1-t]}evaluateAt(t){if(0===t)return this.getCoefficient(0);if(1===t){let t=0;for(let e of this.coefficients)t=this.field.add(t,e);return t}let e=this.coefficients[0],r=this.coefficients.length;for(let i=1;i<r;i++)e=this.field.add(this.field.multiply(t,e),this.coefficients[i]);return e}add(t){if(!this.field.equals(t.field))throw new d("ModulusPolys do not have same ModulusGF field");if(this.isZero())return t;if(t.isZero())return this;let e=this.coefficients,r=t.coefficients;if(e.length>r.length){let t=e;e=r,r=t}let i=new Int32Array(r.length),n=r.length-e.length;f.arraycopy(r,0,i,0,n);for(let t=n;t<r.length;t++)i[t]=this.field.add(e[t-n],r[t]);return new ze(this.field,i)}subtract(t){if(!this.field.equals(t.field))throw new d("ModulusPolys do not have same ModulusGF field");return t.isZero()?this:this.add(t.negative())}multiply(t){return t instanceof ze?this.multiplyOther(t):this.multiplyScalar(t)}multiplyOther(t){if(!this.field.equals(t.field))throw new d("ModulusPolys do not have same ModulusGF field");if(this.isZero()||t.isZero())return new ze(this.field,new Int32Array([0]));let e=this.coefficients,r=e.length,i=t.coefficients,n=i.length,o=new Int32Array(r+n-1);for(let t=0;t<r;t++){let r=e[t];for(let e=0;e<n;e++)o[t+e]=this.field.add(o[t+e],this.field.multiply(r,i[e]))}return new ze(this.field,o)}negative(){let t=this.coefficients.length,e=new Int32Array(t);for(let r=0;r<t;r++)e[r]=this.field.subtract(0,this.coefficients[r]);return new ze(this.field,e)}multiplyScalar(t){if(0===t)return new ze(this.field,new Int32Array([0]));if(1===t)return this;let e=this.coefficients.length,r=new Int32Array(e);for(let i=0;i<e;i++)r[i]=this.field.multiply(this.coefficients[i],t);return new ze(this.field,r)}multiplyByMonomial(t,e){if(t<0)throw new d;if(0===e)return new ze(this.field,new Int32Array([0]));let r=this.coefficients.length,i=new Int32Array(r+t);for(let t=0;t<r;t++)i[t]=this.field.multiply(this.coefficients[t],e);return new ze(this.field,i)}toString(){let t=new T;for(let e=this.getDegree();e>=0;e--){let r=this.getCoefficient(e);0!==r&&(r<0?(t.append(" - "),r=-r):t.length()>0&&t.append(" + "),0!==e&&1===r||t.append(r),0!==e&&(1===e?t.append("x"):(t.append("x^"),t.append(e))))}return t.toString()}}class je{add(t,e){return(t+e)%this.modulus}subtract(t,e){return(this.modulus+t-e)%this.modulus}exp(t){return this.expTable[t]}log(t){if(0===t)throw new d;return this.logTable[t]}inverse(t){if(0===t)throw new Q;return this.expTable[this.modulus-this.logTable[t]-1]}multiply(t,e){return 0===t||0===e?0:this.expTable[(this.logTable[t]+this.logTable[e])%(this.modulus-1)]}getSize(){return this.modulus}equals(t){return t===this}}class Ge extends je{constructor(t,e){super(),this.modulus=t,this.expTable=new Int32Array(t),this.logTable=new Int32Array(t);let r=1;for(let i=0;i<t;i++)this.expTable[i]=r,r=r*e%t;for(let e=0;e<t-1;e++)this.logTable[this.expTable[e]]=e;this.zero=new ze(this,new Int32Array([0])),this.one=new ze(this,new Int32Array([1]))}getZero(){return this.zero}getOne(){return this.one}buildMonomial(t,e){if(t<0)throw new d;if(0===e)return this.zero;let r=new Int32Array(t+1);return r[0]=e,new ze(this,r)}}Ge.PDF417_GF=new Ge(Ue.NUMBER_OF_CODEWORDS,3);class Xe{constructor(){this.field=Ge.PDF417_GF}decode(t,e,r){let i=new ze(this.field,t),n=new Int32Array(e),o=!1;for(let t=e;t>0;t--){let r=i.evaluateAt(this.field.exp(t));n[e-t]=r,0!==r&&(o=!0)}if(!o)return 0;let s=this.field.getOne();if(null!=r)for(const e of r){let r=this.field.exp(t.length-1-e),i=new ze(this.field,new Int32Array([this.field.subtract(0,r),1]));s=s.multiply(i)}let a=new ze(this.field,n),l=this.runEuclideanAlgorithm(this.field.buildMonomial(e,1),a,e),c=l[0],d=l[1],h=this.findErrorLocations(c),p=this.findErrorMagnitudes(d,c,h);for(let e=0;e<h.length;e++){let r=t.length-1-this.field.log(h[e]);if(r<0)throw u.getChecksumInstance();t[r]=this.field.subtract(t[r],p[e])}return h.length}runEuclideanAlgorithm(t,e,r){if(t.getDegree()<e.getDegree()){let r=t;t=e,e=r}let i=t,n=e,o=this.field.getZero(),s=this.field.getOne();for(;n.getDegree()>=Math.round(r/2);){let t=i,e=o;if(i=n,o=s,i.isZero())throw u.getChecksumInstance();n=t;let r=this.field.getZero(),a=i.getCoefficient(i.getDegree()),l=this.field.inverse(a);for(;n.getDegree()>=i.getDegree()&&!n.isZero();){let t=n.getDegree()-i.getDegree(),e=this.field.multiply(n.getCoefficient(n.getDegree()),l);r=r.add(this.field.buildMonomial(t,e)),n=n.subtract(i.multiplyByMonomial(t,e))}s=r.multiply(o).subtract(e).negative()}let a=s.getCoefficient(0);if(0===a)throw u.getChecksumInstance();let l=this.field.inverse(a);return[s.multiply(l),n.multiply(l)]}findErrorLocations(t){let e=t.getDegree(),r=new Int32Array(e),i=0;for(let n=1;n<this.field.getSize()&&i<e;n++)0===t.evaluateAt(n)&&(r[i]=this.field.inverse(n),i++);if(i!==e)throw u.getChecksumInstance();return r}findErrorMagnitudes(t,e,r){let i=e.getDegree(),n=new Int32Array(i);for(let t=1;t<=i;t++)n[i-t]=this.field.multiply(t,e.getCoefficient(t));let o=new ze(this.field,n),s=r.length,a=new Int32Array(s);for(let e=0;e<s;e++){let i=this.field.inverse(r[e]),n=this.field.subtract(0,t.evaluateAt(i)),s=this.field.inverse(o.evaluateAt(i));a[e]=this.field.multiply(n,s)}return a}}class We{constructor(t,e,r,i,n){t instanceof We?this.constructor_2(t):this.constructor_1(t,e,r,i,n)}constructor_1(t,e,r,i,n){const o=null==e||null==r,s=null==i||null==n;if(o&&s)throw new R;o?(e=new st(0,i.getY()),r=new st(0,n.getY())):s&&(i=new st(t.getWidth()-1,e.getY()),n=new st(t.getWidth()-1,r.getY())),this.image=t,this.topLeft=e,this.bottomLeft=r,this.topRight=i,this.bottomRight=n,this.minX=Math.trunc(Math.min(e.getX(),r.getX())),this.maxX=Math.trunc(Math.max(i.getX(),n.getX())),this.minY=Math.trunc(Math.min(e.getY(),i.getY())),this.maxY=Math.trunc(Math.max(r.getY(),n.getY()))}constructor_2(t){this.image=t.image,this.topLeft=t.getTopLeft(),this.bottomLeft=t.getBottomLeft(),this.topRight=t.getTopRight(),this.bottomRight=t.getBottomRight(),this.minX=t.getMinX(),this.maxX=t.getMaxX(),this.minY=t.getMinY(),this.maxY=t.getMaxY()}static merge(t,e){return null==t?e:null==e?t:new We(t.image,t.topLeft,t.bottomLeft,e.topRight,e.bottomRight)}addMissingRows(t,e,r){let i=this.topLeft,n=this.bottomLeft,o=this.topRight,s=this.bottomRight;if(t>0){let e=r?this.topLeft:this.topRight,n=Math.trunc(e.getY()-t);n<0&&(n=0);let s=new st(e.getX(),n);r?i=s:o=s}if(e>0){let t=r?this.bottomLeft:this.bottomRight,i=Math.trunc(t.getY()+e);i>=this.image.getHeight()&&(i=this.image.getHeight()-1);let o=new st(t.getX(),i);r?n=o:s=o}return new We(this.image,i,n,o,s)}getMinX(){return this.minX}getMaxX(){return this.maxX}getMinY(){return this.minY}getMaxY(){return this.maxY}getTopLeft(){return this.topLeft}getTopRight(){return this.topRight}getBottomLeft(){return this.bottomLeft}getBottomRight(){return this.bottomRight}}class Ye{constructor(t,e,r,i){this.columnCount=t,this.errorCorrectionLevel=i,this.rowCountUpperPart=e,this.rowCountLowerPart=r,this.rowCount=e+r}getColumnCount(){return this.columnCount}getErrorCorrectionLevel(){return this.errorCorrectionLevel}getRowCount(){return this.rowCount}getRowCountUpperPart(){return this.rowCountUpperPart}getRowCountLowerPart(){return this.rowCountLowerPart}}class Ze{constructor(){this.buffer=""}static form(t,e){let r=-1;function i(t,i,n,o,s,a){if("%%"===t)return"%";if(void 0===e[++r])return;t=o?parseInt(o.substr(1)):void 0;let l,c=s?parseInt(s.substr(1)):void 0;switch(a){case"s":l=e[r];break;case"c":l=e[r][0];break;case"f":l=parseFloat(e[r]).toFixed(t);break;case"p":l=parseFloat(e[r]).toPrecision(t);break;case"e":l=parseFloat(e[r]).toExponential(t);break;case"x":l=parseInt(e[r]).toString(c||16);break;case"d":l=parseFloat(parseInt(e[r],c||10).toPrecision(t)).toFixed(0)}l="object"==typeof l?JSON.stringify(l):(+l).toString(c);let d=parseInt(n),h=n&&n[0]+""=="0"?"0":" ";for(;l.length<d;)l=void 0!==i?l+h:h+l;return l}let n=/%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;return t.replace(n,i)}format(t,...e){this.buffer+=Ze.form(t,e)}toString(){return this.buffer}}class qe{constructor(t){this.boundingBox=new We(t),this.codewords=new Array(t.getMaxY()-t.getMinY()+1)}getCodewordNearby(t){let e=this.getCodeword(t);if(null!=e)return e;for(let r=1;r<qe.MAX_NEARBY_DISTANCE;r++){let i=this.imageRowToCodewordIndex(t)-r;if(i>=0&&(e=this.codewords[i],null!=e))return e;if(i=this.imageRowToCodewordIndex(t)+r,i<this.codewords.length&&(e=this.codewords[i],null!=e))return e}return null}imageRowToCodewordIndex(t){return t-this.boundingBox.getMinY()}setCodeword(t,e){this.codewords[this.imageRowToCodewordIndex(t)]=e}getCodeword(t){return this.codewords[this.imageRowToCodewordIndex(t)]}getBoundingBox(){return this.boundingBox}getCodewords(){return this.codewords}toString(){const t=new Ze;let e=0;for(const r of this.codewords)null!=r?t.format("%3d: %3d|%3d%n",e++,r.getRowNumber(),r.getValue()):t.format("%3d:    |   %n",e++);return t.toString()}}qe.MAX_NEARBY_DISTANCE=5;class Ke{constructor(){this.values=new Map}setValue(t){t=Math.trunc(t);let e=this.values.get(t);null==e&&(e=0),e++,this.values.set(t,e)}getValue(){let t=-1,e=new Array;for(const[r,i]of this.values.entries()){const n={getKey:()=>r,getValue:()=>i};n.getValue()>t?(t=n.getValue(),e=[],e.push(n.getKey())):n.getValue()===t&&e.push(n.getKey())}return Ue.toIntArray(e)}getConfidence(t){return this.values.get(t)}}class Qe extends qe{constructor(t,e){super(t),this._isLeft=e}setRowNumbers(){for(let t of this.getCodewords())null!=t&&t.setRowNumberAsRowIndicatorColumn()}adjustCompleteIndicatorColumnRowNumbers(t){let e=this.getCodewords();this.setRowNumbers(),this.removeIncorrectCodewords(e,t);let r=this.getBoundingBox(),i=this._isLeft?r.getTopLeft():r.getTopRight(),n=this._isLeft?r.getBottomLeft():r.getBottomRight(),o=this.imageRowToCodewordIndex(Math.trunc(i.getY())),s=this.imageRowToCodewordIndex(Math.trunc(n.getY())),a=-1,l=1,c=0;for(let r=o;r<s;r++){if(null==e[r])continue;let i=e[r],n=i.getRowNumber()-a;if(0===n)c++;else if(1===n)l=Math.max(l,c),c=1,a=i.getRowNumber();else if(n<0||i.getRowNumber()>=t.getRowCount()||n>r)e[r]=null;else{let t;t=l>2?(l-2)*n:n;let o=t>=r;for(let i=1;i<=t&&!o;i++)o=null!=e[r-i];o?e[r]=null:(a=i.getRowNumber(),c=1)}}}getRowHeights(){let t=this.getBarcodeMetadata();if(null==t)return null;this.adjustIncompleteIndicatorColumnRowNumbers(t);let e=new Int32Array(t.getRowCount());for(let t of this.getCodewords())if(null!=t){let r=t.getRowNumber();if(r>=e.length)continue;e[r]++}return e}adjustIncompleteIndicatorColumnRowNumbers(t){let e=this.getBoundingBox(),r=this._isLeft?e.getTopLeft():e.getTopRight(),i=this._isLeft?e.getBottomLeft():e.getBottomRight(),n=this.imageRowToCodewordIndex(Math.trunc(r.getY())),o=this.imageRowToCodewordIndex(Math.trunc(i.getY())),s=this.getCodewords(),a=-1;for(let e=n;e<o;e++){if(null==s[e])continue;let r=s[e];r.setRowNumberAsRowIndicatorColumn();let i=r.getRowNumber()-a;0===i||(1===i?a=r.getRowNumber():r.getRowNumber()>=t.getRowCount()?s[e]=null:a=r.getRowNumber())}}getBarcodeMetadata(){let t=this.getCodewords(),e=new Ke,r=new Ke,i=new Ke,n=new Ke;for(let o of t){if(null==o)continue;o.setRowNumberAsRowIndicatorColumn();let t=o.getValue()%30,s=o.getRowNumber();switch(this._isLeft||(s+=2),s%3){case 0:r.setValue(3*t+1);break;case 1:n.setValue(t/3),i.setValue(t%3);break;case 2:e.setValue(t+1)}}if(0===e.getValue().length||0===r.getValue().length||0===i.getValue().length||0===n.getValue().length||e.getValue()[0]<1||r.getValue()[0]+i.getValue()[0]<Ue.MIN_ROWS_IN_BARCODE||r.getValue()[0]+i.getValue()[0]>Ue.MAX_ROWS_IN_BARCODE)return null;let o=new Ye(e.getValue()[0],r.getValue()[0],i.getValue()[0],n.getValue()[0]);return this.removeIncorrectCodewords(t,o),o}removeIncorrectCodewords(t,e){for(let r=0;r<t.length;r++){let i=t[r];if(null==t[r])continue;let n=i.getValue()%30,o=i.getRowNumber();if(o>e.getRowCount())t[r]=null;else switch(this._isLeft||(o+=2),o%3){case 0:3*n+1!==e.getRowCountUpperPart()&&(t[r]=null);break;case 1:Math.trunc(n/3)===e.getErrorCorrectionLevel()&&n%3===e.getRowCountLowerPart()||(t[r]=null);break;case 2:n+1!==e.getColumnCount()&&(t[r]=null)}}}isLeft(){return this._isLeft}toString(){return"IsLeft: "+this._isLeft+"\n"+super.toString()}}class Je{constructor(t,e){this.ADJUST_ROW_NUMBER_SKIP=2,this.barcodeMetadata=t,this.barcodeColumnCount=t.getColumnCount(),this.boundingBox=e,this.detectionResultColumns=new Array(this.barcodeColumnCount+2)}getDetectionResultColumns(){this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[0]),this.adjustIndicatorColumnRowNumbers(this.detectionResultColumns[this.barcodeColumnCount+1]);let t,e=Ue.MAX_CODEWORDS_IN_BARCODE;do{t=e,e=this.adjustRowNumbersAndGetCount()}while(e>0&&e<t);return this.detectionResultColumns}adjustIndicatorColumnRowNumbers(t){null!=t&&t.adjustCompleteIndicatorColumnRowNumbers(this.barcodeMetadata)}adjustRowNumbersAndGetCount(){let t=this.adjustRowNumbersByRow();if(0===t)return 0;for(let t=1;t<this.barcodeColumnCount+1;t++){let e=this.detectionResultColumns[t].getCodewords();for(let r=0;r<e.length;r++)null!=e[r]&&(e[r].hasValidRowNumber()||this.adjustRowNumbers(t,r,e))}return t}adjustRowNumbersByRow(){return this.adjustRowNumbersFromBothRI(),this.adjustRowNumbersFromLRI()+this.adjustRowNumbersFromRRI()}adjustRowNumbersFromBothRI(){if(null==this.detectionResultColumns[0]||null==this.detectionResultColumns[this.barcodeColumnCount+1])return;let t=this.detectionResultColumns[0].getCodewords(),e=this.detectionResultColumns[this.barcodeColumnCount+1].getCodewords();for(let r=0;r<t.length;r++)if(null!=t[r]&&null!=e[r]&&t[r].getRowNumber()===e[r].getRowNumber())for(let e=1;e<=this.barcodeColumnCount;e++){let i=this.detectionResultColumns[e].getCodewords()[r];null!=i&&(i.setRowNumber(t[r].getRowNumber()),i.hasValidRowNumber()||(this.detectionResultColumns[e].getCodewords()[r]=null))}}adjustRowNumbersFromRRI(){if(null==this.detectionResultColumns[this.barcodeColumnCount+1])return 0;let t=0,e=this.detectionResultColumns[this.barcodeColumnCount+1].getCodewords();for(let r=0;r<e.length;r++){if(null==e[r])continue;let i=e[r].getRowNumber(),n=0;for(let e=this.barcodeColumnCount+1;e>0&&n<this.ADJUST_ROW_NUMBER_SKIP;e--){let o=this.detectionResultColumns[e].getCodewords()[r];null!=o&&(n=Je.adjustRowNumberIfValid(i,n,o),o.hasValidRowNumber()||t++)}}return t}adjustRowNumbersFromLRI(){if(null==this.detectionResultColumns[0])return 0;let t=0,e=this.detectionResultColumns[0].getCodewords();for(let r=0;r<e.length;r++){if(null==e[r])continue;let i=e[r].getRowNumber(),n=0;for(let e=1;e<this.barcodeColumnCount+1&&n<this.ADJUST_ROW_NUMBER_SKIP;e++){let o=this.detectionResultColumns[e].getCodewords()[r];null!=o&&(n=Je.adjustRowNumberIfValid(i,n,o),o.hasValidRowNumber()||t++)}}return t}static adjustRowNumberIfValid(t,e,r){return null==r||r.hasValidRowNumber()||(r.isValidRowNumber(t)?(r.setRowNumber(t),e=0):++e),e}adjustRowNumbers(t,e,r){if(!this.detectionResultColumns[t-1])return;let i=r[e],n=this.detectionResultColumns[t-1].getCodewords(),o=n;null!=this.detectionResultColumns[t+1]&&(o=this.detectionResultColumns[t+1].getCodewords());let s=new Array(14);s[2]=n[e],s[3]=o[e],e>0&&(s[0]=r[e-1],s[4]=n[e-1],s[5]=o[e-1]),e>1&&(s[8]=r[e-2],s[10]=n[e-2],s[11]=o[e-2]),e<r.length-1&&(s[1]=r[e+1],s[6]=n[e+1],s[7]=o[e+1]),e<r.length-2&&(s[9]=r[e+2],s[12]=n[e+2],s[13]=o[e+2]);for(let t of s)if(Je.adjustRowNumber(i,t))return}static adjustRowNumber(t,e){return!(null==e||!e.hasValidRowNumber()||e.getBucket()!==t.getBucket()||(t.setRowNumber(e.getRowNumber()),0))}getBarcodeColumnCount(){return this.barcodeColumnCount}getBarcodeRowCount(){return this.barcodeMetadata.getRowCount()}getBarcodeECLevel(){return this.barcodeMetadata.getErrorCorrectionLevel()}setBoundingBox(t){this.boundingBox=t}getBoundingBox(){return this.boundingBox}setDetectionResultColumn(t,e){this.detectionResultColumns[t]=e}getDetectionResultColumn(t){return this.detectionResultColumns[t]}toString(){let t=this.detectionResultColumns[0];null==t&&(t=this.detectionResultColumns[this.barcodeColumnCount+1]);let e=new Ze;for(let r=0;r<t.getCodewords().length;r++){e.format("CW %3d:",r);for(let t=0;t<this.barcodeColumnCount+2;t++){if(null==this.detectionResultColumns[t]){e.format("    |   ");continue}let i=this.detectionResultColumns[t].getCodewords()[r];null!=i?e.format(" %3d|%3d",i.getRowNumber(),i.getValue()):e.format("    |   ")}e.format("%n")}return e.toString()}}class tr{constructor(t,e,r,i){this.rowNumber=tr.BARCODE_ROW_UNKNOWN,this.startX=Math.trunc(t),this.endX=Math.trunc(e),this.bucket=Math.trunc(r),this.value=Math.trunc(i)}hasValidRowNumber(){return this.isValidRowNumber(this.rowNumber)}isValidRowNumber(t){return t!==tr.BARCODE_ROW_UNKNOWN&&this.bucket===t%3*3}setRowNumberAsRowIndicatorColumn(){this.rowNumber=Math.trunc(3*Math.trunc(this.value/30)+Math.trunc(this.bucket/3))}getWidth(){return this.endX-this.startX}getStartX(){return this.startX}getEndX(){return this.endX}getBucket(){return this.bucket}getValue(){return this.value}getRowNumber(){return this.rowNumber}setRowNumber(t){this.rowNumber=t}toString(){return this.rowNumber+"|"+this.value}}tr.BARCODE_ROW_UNKNOWN=-1;class er{static initialize(){for(let t=0;t<Ue.SYMBOL_TABLE.length;t++){let e=Ue.SYMBOL_TABLE[t],r=1&e;for(let i=0;i<Ue.BARS_IN_MODULE;i++){let n=0;for(;(1&e)===r;)n+=1,e>>=1;r=1&e,er.RATIOS_TABLE[t]||(er.RATIOS_TABLE[t]=new Array(Ue.BARS_IN_MODULE)),er.RATIOS_TABLE[t][Ue.BARS_IN_MODULE-i-1]=Math.fround(n/Ue.MODULES_IN_CODEWORD)}}this.bSymbolTableReady=!0}static getDecodedValue(t){let e=er.getDecodedCodewordValue(er.sampleBitCounts(t));return-1!==e?e:er.getClosestDecodedValue(t)}static sampleBitCounts(t){let e=nt.sum(t),r=new Int32Array(Ue.BARS_IN_MODULE),i=0,n=0;for(let o=0;o<Ue.MODULES_IN_CODEWORD;o++){let s=e/(2*Ue.MODULES_IN_CODEWORD)+o*e/Ue.MODULES_IN_CODEWORD;n+t[i]<=s&&(n+=t[i],i++),r[i]++}return r}static getDecodedCodewordValue(t){let e=er.getBitValue(t);return-1===Ue.getCodeword(e)?-1:e}static getBitValue(t){let e=0;for(let r=0;r<t.length;r++)for(let i=0;i<t[r];i++)e=e<<1|(r%2==0?1:0);return Math.trunc(e)}static getClosestDecodedValue(t){let e=nt.sum(t),r=new Array(Ue.BARS_IN_MODULE);if(e>1)for(let i=0;i<r.length;i++)r[i]=Math.fround(t[i]/e);let i=ot.MAX_VALUE,n=-1;this.bSymbolTableReady||er.initialize();for(let t=0;t<er.RATIOS_TABLE.length;t++){let e=0,o=er.RATIOS_TABLE[t];for(let t=0;t<Ue.BARS_IN_MODULE;t++){let n=Math.fround(o[t]-r[t]);if(e+=Math.fround(n*n),e>=i)break}e<i&&(i=e,n=Ue.SYMBOL_TABLE[t])}return n}}er.bSymbolTableReady=!1,er.RATIOS_TABLE=new Array(Ue.SYMBOL_TABLE.length).map(t=>new Array(Ue.BARS_IN_MODULE));class rr{constructor(){this.segmentCount=-1,this.fileSize=-1,this.timestamp=-1,this.checksum=-1}getSegmentIndex(){return this.segmentIndex}setSegmentIndex(t){this.segmentIndex=t}getFileId(){return this.fileId}setFileId(t){this.fileId=t}getOptionalData(){return this.optionalData}setOptionalData(t){this.optionalData=t}isLastSegment(){return this.lastSegment}setLastSegment(t){this.lastSegment=t}getSegmentCount(){return this.segmentCount}setSegmentCount(t){this.segmentCount=t}getSender(){return this.sender||null}setSender(t){this.sender=t}getAddressee(){return this.addressee||null}setAddressee(t){this.addressee=t}getFileName(){return this.fileName}setFileName(t){this.fileName=t}getFileSize(){return this.fileSize}setFileSize(t){this.fileSize=t}getChecksum(){return this.checksum}setChecksum(t){this.checksum=t}getTimestamp(){return this.timestamp}setTimestamp(t){this.timestamp=t}}class ir{static parseLong(t,e=void 0){return parseInt(t,e)}}class nr extends l{}nr.kind="NullPointerException";class or{writeBytes(t){this.writeBytesOffset(t,0,t.length)}writeBytesOffset(t,e,r){if(null==t)throw new nr;if(e<0||e>t.length||r<0||e+r>t.length||e+r<0)throw new g;if(0!==r)for(let i=0;i<r;i++)this.write(t[e+i])}flush(){}close(){}}class sr extends l{}class ar extends or{constructor(t=32){if(super(),this.count=0,t<0)throw new d("Negative initial size: "+t);this.buf=new Uint8Array(t)}ensureCapacity(t){t-this.buf.length>0&&this.grow(t)}grow(t){let e=this.buf.length<<1;if(e-t<0&&(e=t),e<0){if(t<0)throw new sr;e=b.MAX_VALUE}this.buf=w.copyOfUint8Array(this.buf,e)}write(t){this.ensureCapacity(this.count+1),this.buf[this.count]=t,this.count+=1}writeBytesOffset(t,e,r){if(e<0||e>t.length||r<0||e+r-t.length>0)throw new g;this.ensureCapacity(this.count+r),f.arraycopy(t,e,this.buf,this.count,r),this.count+=r}writeTo(t){t.writeBytesOffset(this.buf,0,this.count)}reset(){this.count=0}toByteArray(){return w.copyOfUint8Array(this.buf,this.count)}size(){return this.count}toString(t){return t?"string"==typeof t?this.toString_string(t):this.toString_number(t):this.toString_void()}toString_void(){return new String(this.buf).toString()}toString_string(t){return new String(this.buf).toString()}toString_number(t){return new String(this.buf).toString()}close(){}}function lr(){if("undefined"!=typeof window)return window.BigInt||null;if(void 0!==Ct)return Ct.BigInt||null;if("undefined"!=typeof self)return self.BigInt||null;throw new Error("Can't search globals for BigInt!")}let cr;function dr(t){if(void 0===cr&&(cr=lr()),null===cr)throw new Error("BigInt is not supported!");return cr(t)}function hr(){let t=[];t[0]=dr(1);let e=dr(900);t[1]=e;for(let r=2;r<16;r++)t[r]=t[r-1]*e;return t}!function(t){t[t.ALPHA=0]="ALPHA",t[t.LOWER=1]="LOWER",t[t.MIXED=2]="MIXED",t[t.PUNCT=3]="PUNCT",t[t.ALPHA_SHIFT=4]="ALPHA_SHIFT",t[t.PUNCT_SHIFT=5]="PUNCT_SHIFT"}(W||(W={}));class ur{static decode(t,e){let r=new T(""),i=v.ISO8859_1;r.enableDecoding(i);let n=1,o=t[n++],s=new rr;for(;n<t[0];){switch(o){case ur.TEXT_COMPACTION_MODE_LATCH:n=ur.textCompaction(t,n,r);break;case ur.BYTE_COMPACTION_MODE_LATCH:case ur.BYTE_COMPACTION_MODE_LATCH_6:n=ur.byteCompaction(o,t,i,n,r);break;case ur.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:r.append(t[n++]);break;case ur.NUMERIC_COMPACTION_MODE_LATCH:n=ur.numericCompaction(t,n,r);break;case ur.ECI_CHARSET:v.getCharacterSetECIByValue(t[n++]);break;case ur.ECI_GENERAL_PURPOSE:n+=2;break;case ur.ECI_USER_DEFINED:n++;break;case ur.BEGIN_MACRO_PDF417_CONTROL_BLOCK:n=ur.decodeMacroBlock(t,n,s);break;case ur.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case ur.MACRO_PDF417_TERMINATOR:throw new C;default:n--,n=ur.textCompaction(t,n,r)}if(!(n<t.length))throw C.getFormatInstance();o=t[n++]}if(0===r.length())throw C.getFormatInstance();let a=new Z(null,r.toString(),null,e);return a.setOther(s),a}static decodeMacroBlock(t,e,r){if(e+ur.NUMBER_OF_SEQUENCE_CODEWORDS>t[0])throw C.getFormatInstance();let i=new Int32Array(ur.NUMBER_OF_SEQUENCE_CODEWORDS);for(let r=0;r<ur.NUMBER_OF_SEQUENCE_CODEWORDS;r++,e++)i[r]=t[e];r.setSegmentIndex(b.parseInt(ur.decodeBase900toBase10(i,ur.NUMBER_OF_SEQUENCE_CODEWORDS)));let n=new T;e=ur.textCompaction(t,e,n),r.setFileId(n.toString());let o=-1;for(t[e]===ur.BEGIN_MACRO_PDF417_OPTIONAL_FIELD&&(o=e+1);e<t[0];)switch(t[e]){case ur.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:switch(t[++e]){case ur.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME:let i=new T;e=ur.textCompaction(t,e+1,i),r.setFileName(i.toString());break;case ur.MACRO_PDF417_OPTIONAL_FIELD_SENDER:let n=new T;e=ur.textCompaction(t,e+1,n),r.setSender(n.toString());break;case ur.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE:let o=new T;e=ur.textCompaction(t,e+1,o),r.setAddressee(o.toString());break;case ur.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT:let s=new T;e=ur.numericCompaction(t,e+1,s),r.setSegmentCount(b.parseInt(s.toString()));break;case ur.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP:let a=new T;e=ur.numericCompaction(t,e+1,a),r.setTimestamp(ir.parseLong(a.toString()));break;case ur.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM:let l=new T;e=ur.numericCompaction(t,e+1,l),r.setChecksum(b.parseInt(l.toString()));break;case ur.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE:let c=new T;e=ur.numericCompaction(t,e+1,c),r.setFileSize(ir.parseLong(c.toString()));break;default:throw C.getFormatInstance()}break;case ur.MACRO_PDF417_TERMINATOR:e++,r.setLastSegment(!0);break;default:throw C.getFormatInstance()}if(-1!==o){let i=e-o;r.isLastSegment()&&i--,r.setOptionalData(w.copyOfRange(t,o,o+i))}return e}static textCompaction(t,e,r){let i=new Int32Array(2*(t[0]-e)),n=new Int32Array(2*(t[0]-e)),o=0,s=!1;for(;e<t[0]&&!s;){let r=t[e++];if(r<ur.TEXT_COMPACTION_MODE_LATCH)i[o]=r/30,i[o+1]=r%30,o+=2;else switch(r){case ur.TEXT_COMPACTION_MODE_LATCH:i[o++]=ur.TEXT_COMPACTION_MODE_LATCH;break;case ur.BYTE_COMPACTION_MODE_LATCH:case ur.BYTE_COMPACTION_MODE_LATCH_6:case ur.NUMERIC_COMPACTION_MODE_LATCH:case ur.BEGIN_MACRO_PDF417_CONTROL_BLOCK:case ur.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case ur.MACRO_PDF417_TERMINATOR:e--,s=!0;break;case ur.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:i[o]=ur.MODE_SHIFT_TO_BYTE_COMPACTION_MODE,r=t[e++],n[o]=r,o++}}return ur.decodeTextCompaction(i,n,o,r),e}static decodeTextCompaction(t,e,r,i){let n=W.ALPHA,o=W.ALPHA,s=0;for(;s<r;){let r=t[s],a="";switch(n){case W.ALPHA:if(r<26)a=String.fromCharCode(65+r);else switch(r){case 26:a=" ";break;case ur.LL:n=W.LOWER;break;case ur.ML:n=W.MIXED;break;case ur.PS:o=n,n=W.PUNCT_SHIFT;break;case ur.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:i.append(e[s]);break;case ur.TEXT_COMPACTION_MODE_LATCH:n=W.ALPHA}break;case W.LOWER:if(r<26)a=String.fromCharCode(97+r);else switch(r){case 26:a=" ";break;case ur.AS:o=n,n=W.ALPHA_SHIFT;break;case ur.ML:n=W.MIXED;break;case ur.PS:o=n,n=W.PUNCT_SHIFT;break;case ur.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:i.append(e[s]);break;case ur.TEXT_COMPACTION_MODE_LATCH:n=W.ALPHA}break;case W.MIXED:if(r<ur.PL)a=ur.MIXED_CHARS[r];else switch(r){case ur.PL:n=W.PUNCT;break;case 26:a=" ";break;case ur.LL:n=W.LOWER;break;case ur.AL:n=W.ALPHA;break;case ur.PS:o=n,n=W.PUNCT_SHIFT;break;case ur.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:i.append(e[s]);break;case ur.TEXT_COMPACTION_MODE_LATCH:n=W.ALPHA}break;case W.PUNCT:if(r<ur.PAL)a=ur.PUNCT_CHARS[r];else switch(r){case ur.PAL:n=W.ALPHA;break;case ur.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:i.append(e[s]);break;case ur.TEXT_COMPACTION_MODE_LATCH:n=W.ALPHA}break;case W.ALPHA_SHIFT:if(n=o,r<26)a=String.fromCharCode(65+r);else switch(r){case 26:a=" ";break;case ur.TEXT_COMPACTION_MODE_LATCH:n=W.ALPHA}break;case W.PUNCT_SHIFT:if(n=o,r<ur.PAL)a=ur.PUNCT_CHARS[r];else switch(r){case ur.PAL:n=W.ALPHA;break;case ur.MODE_SHIFT_TO_BYTE_COMPACTION_MODE:i.append(e[s]);break;case ur.TEXT_COMPACTION_MODE_LATCH:n=W.ALPHA}}""!==a&&i.append(a),s++}}static byteCompaction(t,e,r,i,n){let o=new ar,s=0,a=0,l=!1;switch(t){case ur.BYTE_COMPACTION_MODE_LATCH:let t=new Int32Array(6),r=e[i++];for(;i<e[0]&&!l;)switch(t[s++]=r,a=900*a+r,r=e[i++],r){case ur.TEXT_COMPACTION_MODE_LATCH:case ur.BYTE_COMPACTION_MODE_LATCH:case ur.NUMERIC_COMPACTION_MODE_LATCH:case ur.BYTE_COMPACTION_MODE_LATCH_6:case ur.BEGIN_MACRO_PDF417_CONTROL_BLOCK:case ur.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case ur.MACRO_PDF417_TERMINATOR:i--,l=!0;break;default:if(s%5==0&&s>0){for(let t=0;t<6;++t)o.write(Number(dr(a)>>dr(8*(5-t))));a=0,s=0}}i===e[0]&&r<ur.TEXT_COMPACTION_MODE_LATCH&&(t[s++]=r);for(let e=0;e<s;e++)o.write(t[e]);break;case ur.BYTE_COMPACTION_MODE_LATCH_6:for(;i<e[0]&&!l;){let t=e[i++];if(t<ur.TEXT_COMPACTION_MODE_LATCH)s++,a=900*a+t;else switch(t){case ur.TEXT_COMPACTION_MODE_LATCH:case ur.BYTE_COMPACTION_MODE_LATCH:case ur.NUMERIC_COMPACTION_MODE_LATCH:case ur.BYTE_COMPACTION_MODE_LATCH_6:case ur.BEGIN_MACRO_PDF417_CONTROL_BLOCK:case ur.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case ur.MACRO_PDF417_TERMINATOR:i--,l=!0}if(s%5==0&&s>0){for(let t=0;t<6;++t)o.write(Number(dr(a)>>dr(8*(5-t))));a=0,s=0}}}return n.append(S.decode(o.toByteArray(),r)),i}static numericCompaction(t,e,r){let i=0,n=!1,o=new Int32Array(ur.MAX_NUMERIC_CODEWORDS);for(;e<t[0]&&!n;){let s=t[e++];if(e===t[0]&&(n=!0),s<ur.TEXT_COMPACTION_MODE_LATCH)o[i]=s,i++;else switch(s){case ur.TEXT_COMPACTION_MODE_LATCH:case ur.BYTE_COMPACTION_MODE_LATCH:case ur.BYTE_COMPACTION_MODE_LATCH_6:case ur.BEGIN_MACRO_PDF417_CONTROL_BLOCK:case ur.BEGIN_MACRO_PDF417_OPTIONAL_FIELD:case ur.MACRO_PDF417_TERMINATOR:e--,n=!0}(i%ur.MAX_NUMERIC_CODEWORDS===0||s===ur.NUMERIC_COMPACTION_MODE_LATCH||n)&&i>0&&(r.append(ur.decodeBase900toBase10(o,i)),i=0)}return e}static decodeBase900toBase10(t,e){let r=dr(0);for(let i=0;i<e;i++)r+=ur.EXP900[e-i-1]*dr(t[i]);let i=r.toString();if("1"!==i.charAt(0))throw new C;return i.substring(1)}}ur.TEXT_COMPACTION_MODE_LATCH=900,ur.BYTE_COMPACTION_MODE_LATCH=901,ur.NUMERIC_COMPACTION_MODE_LATCH=902,ur.BYTE_COMPACTION_MODE_LATCH_6=924,ur.ECI_USER_DEFINED=925,ur.ECI_GENERAL_PURPOSE=926,ur.ECI_CHARSET=927,ur.BEGIN_MACRO_PDF417_CONTROL_BLOCK=928,ur.BEGIN_MACRO_PDF417_OPTIONAL_FIELD=923,ur.MACRO_PDF417_TERMINATOR=922,ur.MODE_SHIFT_TO_BYTE_COMPACTION_MODE=913,ur.MAX_NUMERIC_CODEWORDS=15,ur.MACRO_PDF417_OPTIONAL_FIELD_FILE_NAME=0,ur.MACRO_PDF417_OPTIONAL_FIELD_SEGMENT_COUNT=1,ur.MACRO_PDF417_OPTIONAL_FIELD_TIME_STAMP=2,ur.MACRO_PDF417_OPTIONAL_FIELD_SENDER=3,ur.MACRO_PDF417_OPTIONAL_FIELD_ADDRESSEE=4,ur.MACRO_PDF417_OPTIONAL_FIELD_FILE_SIZE=5,ur.MACRO_PDF417_OPTIONAL_FIELD_CHECKSUM=6,ur.PL=25,ur.LL=27,ur.AS=27,ur.ML=28,ur.AL=28,ur.PS=29,ur.PAL=29,ur.PUNCT_CHARS=";<>@[\\]_`~!\r\t,:\n-.$/\"|*()?{}'",ur.MIXED_CHARS="0123456789&\r\t,:#-.$/+%*=^",ur.EXP900=lr()?hr():[],ur.NUMBER_OF_SEQUENCE_CODEWORDS=2;class pr{constructor(){}static decode(t,e,r,i,n,o,s){let a,l=new We(t,e,r,i,n),c=null,d=null;for(let r=!0;;r=!1){if(null!=e&&(c=pr.getRowIndicatorColumn(t,l,e,!0,o,s)),null!=i&&(d=pr.getRowIndicatorColumn(t,l,i,!1,o,s)),a=pr.merge(c,d),null==a)throw R.getNotFoundInstance();let n=a.getBoundingBox();if(!r||null==n||!(n.getMinY()<l.getMinY()||n.getMaxY()>l.getMaxY()))break;l=n}a.setBoundingBox(l);let h=a.getBarcodeColumnCount()+1;a.setDetectionResultColumn(0,c),a.setDetectionResultColumn(h,d);let u=null!=c;for(let e=1;e<=h;e++){let r,i=u?e:h-e;if(void 0!==a.getDetectionResultColumn(i))continue;r=0===i||i===h?new Qe(l,0===i):new qe(l),a.setDetectionResultColumn(i,r);let n=-1,c=n;for(let e=l.getMinY();e<=l.getMaxY();e++){if(n=pr.getStartColumn(a,i,e,u),n<0||n>l.getMaxX()){if(-1===c)continue;n=c}let d=pr.detectCodeword(t,l.getMinX(),l.getMaxX(),u,n,e,o,s);null!=d&&(r.setCodeword(e,d),c=n,o=Math.min(o,d.getWidth()),s=Math.max(s,d.getWidth()))}}return pr.createDecoderResult(a)}static merge(t,e){if(null==t&&null==e)return null;let r=pr.getBarcodeMetadata(t,e);if(null==r)return null;let i=We.merge(pr.adjustBoundingBox(t),pr.adjustBoundingBox(e));return new Je(r,i)}static adjustBoundingBox(t){if(null==t)return null;let e=t.getRowHeights();if(null==e)return null;let r=pr.getMax(e),i=0;for(let t of e)if(i+=r-t,t>0)break;let n=t.getCodewords();for(let t=0;i>0&&null==n[t];t++)i--;let o=0;for(let t=e.length-1;t>=0&&(o+=r-e[t],!(e[t]>0));t--);for(let t=n.length-1;o>0&&null==n[t];t--)o--;return t.getBoundingBox().addMissingRows(i,o,t.isLeft())}static getMax(t){let e=-1;for(let r of t)e=Math.max(e,r);return e}static getBarcodeMetadata(t,e){let r,i;return null==t||null==(r=t.getBarcodeMetadata())?null==e?null:e.getBarcodeMetadata():null==e||null==(i=e.getBarcodeMetadata())?r:r.getColumnCount()!==i.getColumnCount()&&r.getErrorCorrectionLevel()!==i.getErrorCorrectionLevel()&&r.getRowCount()!==i.getRowCount()?null:r}static getRowIndicatorColumn(t,e,r,i,n,o){let s=new Qe(e,i);for(let a=0;a<2;a++){let l=0===a?1:-1,c=Math.trunc(Math.trunc(r.getX()));for(let a=Math.trunc(Math.trunc(r.getY()));a<=e.getMaxY()&&a>=e.getMinY();a+=l){let e=pr.detectCodeword(t,0,t.getWidth(),i,c,a,n,o);null!=e&&(s.setCodeword(a,e),c=i?e.getStartX():e.getEndX())}}return s}static adjustCodewordCount(t,e){let r=e[0][1],i=r.getValue(),n=t.getBarcodeColumnCount()*t.getBarcodeRowCount()-pr.getNumberOfECCodeWords(t.getBarcodeECLevel());if(0===i.length){if(n<1||n>Ue.MAX_CODEWORDS_IN_BARCODE)throw R.getNotFoundInstance();r.setValue(n)}else i[0]!==n&&r.setValue(n)}static createDecoderResult(t){let e=pr.createBarcodeMatrix(t);pr.adjustCodewordCount(t,e);let r=new Array,i=new Int32Array(t.getBarcodeRowCount()*t.getBarcodeColumnCount()),n=[],o=new Array;for(let s=0;s<t.getBarcodeRowCount();s++)for(let a=0;a<t.getBarcodeColumnCount();a++){let l=e[s][a+1].getValue(),c=s*t.getBarcodeColumnCount()+a;0===l.length?r.push(c):1===l.length?i[c]=l[0]:(o.push(c),n.push(l))}let s=new Array(n.length);for(let t=0;t<s.length;t++)s[t]=n[t];return pr.createDecoderResultFromAmbiguousValues(t.getBarcodeECLevel(),i,Ue.toIntArray(r),Ue.toIntArray(o),s)}static createDecoderResultFromAmbiguousValues(t,e,r,i,n){let o=new Int32Array(i.length),s=100;for(;s-- >0;){for(let t=0;t<o.length;t++)e[i[t]]=n[t][o[t]];try{return pr.decodeCodewords(e,t,r)}catch(t){if(!(t instanceof u))throw t}if(0===o.length)throw u.getChecksumInstance();for(let t=0;t<o.length;t++){if(o[t]<n[t].length-1){o[t]++;break}if(o[t]=0,t===o.length-1)throw u.getChecksumInstance()}}throw u.getChecksumInstance()}static createBarcodeMatrix(t){let e=Array.from({length:t.getBarcodeRowCount()},()=>new Array(t.getBarcodeColumnCount()+2));for(let t=0;t<e.length;t++)for(let r=0;r<e[t].length;r++)e[t][r]=new Ke;let r=0;for(let i of t.getDetectionResultColumns()){if(null!=i)for(let t of i.getCodewords())if(null!=t){let i=t.getRowNumber();if(i>=0){if(i>=e.length)continue;e[i][r].setValue(t.getValue())}}r++}return e}static isValidBarcodeColumn(t,e){return e>=0&&e<=t.getBarcodeColumnCount()+1}static getStartColumn(t,e,r,i){let n=i?1:-1,o=null;if(pr.isValidBarcodeColumn(t,e-n)&&(o=t.getDetectionResultColumn(e-n).getCodeword(r)),null!=o)return i?o.getEndX():o.getStartX();if(o=t.getDetectionResultColumn(e).getCodewordNearby(r),null!=o)return i?o.getStartX():o.getEndX();if(pr.isValidBarcodeColumn(t,e-n)&&(o=t.getDetectionResultColumn(e-n).getCodewordNearby(r)),null!=o)return i?o.getEndX():o.getStartX();let s=0;for(;pr.isValidBarcodeColumn(t,e-n);){e-=n;for(let r of t.getDetectionResultColumn(e).getCodewords())if(null!=r)return(i?r.getEndX():r.getStartX())+n*s*(r.getEndX()-r.getStartX());s++}return i?t.getBoundingBox().getMinX():t.getBoundingBox().getMaxX()}static detectCodeword(t,e,r,i,n,o,s,a){n=pr.adjustCodewordStartColumn(t,e,r,i,n,o);let l,c=pr.getModuleBitCount(t,e,r,i,n,o);if(null==c)return null;let d=nt.sum(c);if(i)l=n+d;else{for(let t=0;t<c.length/2;t++){let e=c[t];c[t]=c[c.length-1-t],c[c.length-1-t]=e}l=n,n=l-d}if(!pr.checkCodewordSkew(d,s,a))return null;let h=er.getDecodedValue(c),u=Ue.getCodeword(h);return-1===u?null:new tr(n,l,pr.getCodewordBucketNumber(h),u)}static getModuleBitCount(t,e,r,i,n,o){let s=n,a=new Int32Array(8),l=0,c=i?1:-1,d=i;for(;(i?s<r:s>=e)&&l<a.length;)t.get(s,o)===d?(a[l]++,s+=c):(l++,d=!d);return l===a.length||s===(i?r:e)&&l===a.length-1?a:null}static getNumberOfECCodeWords(t){return 2<<t}static adjustCodewordStartColumn(t,e,r,i,n,o){let s=n,a=i?-1:1;for(let l=0;l<2;l++){for(;(i?s>=e:s<r)&&i===t.get(s,o);){if(Math.abs(n-s)>pr.CODEWORD_SKEW_SIZE)return n;s+=a}a=-a,i=!i}return s}static checkCodewordSkew(t,e,r){return e-pr.CODEWORD_SKEW_SIZE<=t&&t<=r+pr.CODEWORD_SKEW_SIZE}static decodeCodewords(t,e,r){if(0===t.length)throw C.getFormatInstance();let i=1<<e+1,n=pr.correctErrors(t,r,i);pr.verifyCodewordCount(t,i);let o=ur.decode(t,""+e);return o.setErrorsCorrected(n),o.setErasures(r.length),o}static correctErrors(t,e,r){if(null!=e&&e.length>r/2+pr.MAX_ERRORS||r<0||r>pr.MAX_EC_CODEWORDS)throw u.getChecksumInstance();return pr.errorCorrection.decode(t,r,e)}static verifyCodewordCount(t,e){if(t.length<4)throw C.getFormatInstance();let r=t[0];if(r>t.length)throw C.getFormatInstance();if(0===r){if(!(e<t.length))throw C.getFormatInstance();t[0]=t.length-e}}static getBitCountForCodeword(t){let e=new Int32Array(8),r=0,i=e.length-1;for(;!((1&t)!==r&&(r=1&t,i--,i<0));)e[i]++,t>>=1;return e}static getCodewordBucketNumber(t){return t instanceof Int32Array?this.getCodewordBucketNumber_Int32Array(t):this.getCodewordBucketNumber_number(t)}static getCodewordBucketNumber_number(t){return pr.getCodewordBucketNumber(pr.getBitCountForCodeword(t))}static getCodewordBucketNumber_Int32Array(t){return(t[0]-t[2]+t[4]-t[6]+9)%9}static toString(t){let e=new Ze;for(let r=0;r<t.length;r++){e.format("Row %2d: ",r);for(let i=0;i<t[r].length;i++){let n=t[r][i];0===n.getValue().length?e.format("        ",null):e.format("%4d(%2d)",n.getValue()[0],n.getConfidence(n.getValue()[0]))}e.format("%n")}return e.toString()}}pr.CODEWORD_SKEW_SIZE=2,pr.MAX_ERRORS=3,pr.MAX_EC_CODEWORDS=512,pr.errorCorrection=new Xe;class fr{decode(t,e=null){let r=fr.decode(t,e,!1);if(null==r||0===r.length||null==r[0])throw R.getNotFoundInstance();return r[0]}decodeMultiple(t,e=null){try{return fr.decode(t,e,!0)}catch(t){if(t instanceof C||t instanceof u)throw R.getNotFoundInstance();throw t}}static decode(t,e,r){const i=new Array,n=Ve.detectMultiple(t,e,r);for(const t of n.getPoints()){const e=pr.decode(n.getBits(),t[4],t[5],t[6],t[7],fr.getMinCodewordWidth(t),fr.getMaxCodewordWidth(t)),r=new $(e.getText(),e.getRawBytes(),void 0,t,H.PDF_417);r.putMetadata(Y.ERROR_CORRECTION_LEVEL,e.getECLevel());const o=e.getOther();null!=o&&r.putMetadata(Y.PDF417_EXTRA_METADATA,o),i.push(r)}return i.map(t=>t)}static getMaxWidth(t,e){return null==t||null==e?0:Math.trunc(Math.abs(t.getX()-e.getX()))}static getMinWidth(t,e){return null==t||null==e?b.MAX_VALUE:Math.trunc(Math.abs(t.getX()-e.getX()))}static getMaxCodewordWidth(t){return Math.floor(Math.max(Math.max(fr.getMaxWidth(t[0],t[4]),fr.getMaxWidth(t[6],t[2])*Ue.MODULES_IN_CODEWORD/Ue.MODULES_IN_STOP_PATTERN),Math.max(fr.getMaxWidth(t[1],t[5]),fr.getMaxWidth(t[7],t[3])*Ue.MODULES_IN_CODEWORD/Ue.MODULES_IN_STOP_PATTERN)))}static getMinCodewordWidth(t){return Math.floor(Math.min(Math.min(fr.getMinWidth(t[0],t[4]),fr.getMinWidth(t[6],t[2])*Ue.MODULES_IN_CODEWORD/Ue.MODULES_IN_STOP_PATTERN),Math.min(fr.getMinWidth(t[1],t[5]),fr.getMinWidth(t[7],t[3])*Ue.MODULES_IN_CODEWORD/Ue.MODULES_IN_STOP_PATTERN)))}reset(){}}class gr extends l{}gr.kind="ReaderException";class mr{constructor(t,e){this.verbose=!0===t,e&&this.setHints(e)}decode(t,e){return e&&this.setHints(e),this.decodeInternal(t)}decodeWithState(t){return null!==this.readers&&void 0!==this.readers||this.setHints(null),this.decodeInternal(t)}setHints(t){this.hints=t;const r=!e(t)&&!0===t.get(E.TRY_HARDER),i=e(t)?null:t.get(E.POSSIBLE_FORMATS),n=new Array;if(!e(i)){const e=i.some(t=>t===H.UPC_A||t===H.UPC_E||t===H.EAN_13||t===H.EAN_8||t===H.CODABAR||t===H.CODE_39||t===H.CODE_93||t===H.CODE_128||t===H.ITF||t===H.RSS_14||t===H.RSS_EXPANDED);e&&!r&&n.push(new le(t,this.verbose)),i.includes(H.QR_CODE)&&n.push(new $e),i.includes(H.DATA_MATRIX)&&n.push(new ye),i.includes(H.AZTEC)&&n.push(new mt),i.includes(H.PDF_417)&&n.push(new fr),e&&r&&n.push(new le(t,this.verbose))}0===n.length&&(r||n.push(new le(t,this.verbose)),n.push(new $e),n.push(new ye),n.push(new mt),n.push(new fr),r&&n.push(new le(t,this.verbose))),this.readers=n}reset(){if(null!==this.readers)for(const t of this.readers)t.reset()}decodeInternal(t){if(null===this.readers)throw new gr("No readers where selected, nothing can be read.");for(const e of this.readers)try{return e.decode(t,this.hints)}catch(t){if(t instanceof gr)continue}throw new R("No MultiFormat Readers were able to detect the code.")}}class wr extends F{constructor(t=null,e=500){const r=new mr;r.setHints(t),super(r,e)}decodeBitmap(t){return this.reader.decodeWithState(t)}}class br extends F{constructor(t=500){super(new fr,t)}}class yr extends F{constructor(t=500){super(new $e,t)}}var _r;!function(t){t[t.ERROR_CORRECTION=0]="ERROR_CORRECTION",t[t.CHARACTER_SET=1]="CHARACTER_SET",t[t.DATA_MATRIX_SHAPE=2]="DATA_MATRIX_SHAPE",t[t.MIN_SIZE=3]="MIN_SIZE",t[t.MAX_SIZE=4]="MAX_SIZE",t[t.MARGIN=5]="MARGIN",t[t.PDF417_COMPACT=6]="PDF417_COMPACT",t[t.PDF417_COMPACTION=7]="PDF417_COMPACTION",t[t.PDF417_DIMENSIONS=8]="PDF417_DIMENSIONS",t[t.AZTEC_LAYERS=9]="AZTEC_LAYERS",t[t.QR_VERSION=10]="QR_VERSION"}(_r||(_r={}));var Er=_r;class Cr{constructor(t){this.field=t,this.cachedGenerators=[],this.cachedGenerators.push(new K(t,Int32Array.from([1])))}buildGenerator(t){const e=this.cachedGenerators;if(t>=e.length){let r=e[e.length-1];const i=this.field;for(let n=e.length;n<=t;n++){const t=r.multiply(new K(i,Int32Array.from([1,i.exp(n-1+i.getGeneratorBase())])));e.push(t),r=t}}return e[t]}encode(t,e){if(0===e)throw new d("No error correction bytes");const r=t.length-e;if(r<=0)throw new d("No data bytes provided");const i=this.buildGenerator(e),n=new Int32Array(r);f.arraycopy(t,0,n,0,r);let o=new K(this.field,n);o=o.multiplyByMonomial(e,1);const s=o.divide(i)[1].getCoefficients(),a=e-s.length;for(let e=0;e<a;e++)t[r+e]=0;f.arraycopy(s,0,t,r+a,s.length)}}class vr{constructor(){}static applyMaskPenaltyRule1(t){return vr.applyMaskPenaltyRule1Internal(t,!0)+vr.applyMaskPenaltyRule1Internal(t,!1)}static applyMaskPenaltyRule2(t){let e=0;const r=t.getArray(),i=t.getWidth(),n=t.getHeight();for(let t=0;t<n-1;t++){const n=r[t];for(let o=0;o<i-1;o++){const i=n[o];i===n[o+1]&&i===r[t+1][o]&&i===r[t+1][o+1]&&e++}}return vr.N2*e}static applyMaskPenaltyRule3(t){let e=0;const r=t.getArray(),i=t.getWidth(),n=t.getHeight();for(let t=0;t<n;t++)for(let o=0;o<i;o++){const s=r[t];o+6<i&&1===s[o]&&0===s[o+1]&&1===s[o+2]&&1===s[o+3]&&1===s[o+4]&&0===s[o+5]&&1===s[o+6]&&(vr.isWhiteHorizontal(s,o-4,o)||vr.isWhiteHorizontal(s,o+7,o+11))&&e++,t+6<n&&1===r[t][o]&&0===r[t+1][o]&&1===r[t+2][o]&&1===r[t+3][o]&&1===r[t+4][o]&&0===r[t+5][o]&&1===r[t+6][o]&&(vr.isWhiteVertical(r,o,t-4,t)||vr.isWhiteVertical(r,o,t+7,t+11))&&e++}return e*vr.N3}static isWhiteHorizontal(t,e,r){e=Math.max(e,0),r=Math.min(r,t.length);for(let i=e;i<r;i++)if(1===t[i])return!1;return!0}static isWhiteVertical(t,e,r,i){r=Math.max(r,0),i=Math.min(i,t.length);for(let n=r;n<i;n++)if(1===t[n][e])return!1;return!0}static applyMaskPenaltyRule4(t){let e=0;const r=t.getArray(),i=t.getWidth(),n=t.getHeight();for(let t=0;t<n;t++){const n=r[t];for(let t=0;t<i;t++)1===n[t]&&e++}const o=t.getHeight()*t.getWidth();return Math.floor(10*Math.abs(2*e-o)/o)*vr.N4}static getDataMaskBit(t,e,r){let i,n;switch(t){case 0:i=r+e&1;break;case 1:i=1&r;break;case 2:i=e%3;break;case 3:i=(r+e)%3;break;case 4:i=Math.floor(r/2)+Math.floor(e/3)&1;break;case 5:n=r*e,i=(1&n)+n%3;break;case 6:n=r*e,i=(1&n)+n%3&1;break;case 7:n=r*e,i=n%3+(r+e&1)&1;break;default:throw new d("Invalid mask pattern: "+t)}return 0===i}static applyMaskPenaltyRule1Internal(t,e){let r=0;const i=e?t.getHeight():t.getWidth(),n=e?t.getWidth():t.getHeight(),o=t.getArray();for(let t=0;t<i;t++){let i=0,s=-1;for(let a=0;a<n;a++){const n=e?o[t][a]:o[a][t];n===s?i++:(i>=5&&(r+=vr.N1+(i-5)),i=1,s=n)}i>=5&&(r+=vr.N1+(i-5))}return r}}vr.N1=3,vr.N2=3,vr.N3=40,vr.N4=10;class Ar{constructor(t,e){this.width=t,this.height=e;const r=new Array(e);for(let i=0;i!==e;i++)r[i]=new Uint8Array(t);this.bytes=r}getHeight(){return this.height}getWidth(){return this.width}get(t,e){return this.bytes[e][t]}getArray(){return this.bytes}setNumber(t,e,r){this.bytes[e][t]=r}setBoolean(t,e,r){this.bytes[e][t]=r?1:0}clear(t){for(const e of this.bytes)w.fill(e,t)}equals(t){if(!(t instanceof Ar))return!1;const e=t;if(this.width!==e.width)return!1;if(this.height!==e.height)return!1;for(let t=0,r=this.height;t<r;++t){const r=this.bytes[t],i=e.bytes[t];for(let t=0,e=this.width;t<e;++t)if(r[t]!==i[t])return!1}return!0}toString(){const t=new T;for(let e=0,r=this.height;e<r;++e){const r=this.bytes[e];for(let e=0,i=this.width;e<i;++e)switch(r[e]){case 0:t.append(" 0");break;case 1:t.append(" 1");break;default:t.append("  ")}t.append("\n")}return t.toString()}}class Sr{constructor(){this.maskPattern=-1}getMode(){return this.mode}getECLevel(){return this.ecLevel}getVersion(){return this.version}getMaskPattern(){return this.maskPattern}getMatrix(){return this.matrix}toString(){const t=new T;return t.append("<<\n"),t.append(" mode: "),t.append(this.mode?this.mode.toString():"null"),t.append("\n ecLevel: "),t.append(this.ecLevel?this.ecLevel.toString():"null"),t.append("\n version: "),t.append(this.version?this.version.toString():"null"),t.append("\n maskPattern: "),t.append(this.maskPattern.toString()),this.matrix?(t.append("\n matrix:\n"),t.append(this.matrix.toString())):t.append("\n matrix: null\n"),t.append(">>\n"),t.toString()}setMode(t){this.mode=t}setECLevel(t){this.ecLevel=t}setVersion(t){this.version=t}setMaskPattern(t){this.maskPattern=t}setMatrix(t){this.matrix=t}static isValidMaskPattern(t){return t>=0&&t<Sr.NUM_MASK_PATTERNS}}Sr.NUM_MASK_PATTERNS=8;class Ir extends l{}Ir.kind="WriterException";class Tr{constructor(){}static clearMatrix(t){t.clear(255)}static buildMatrix(t,e,r,i,n){Tr.clearMatrix(n),Tr.embedBasicPatterns(r,n),Tr.embedTypeInfo(e,i,n),Tr.maybeEmbedVersionInfo(r,n),Tr.embedDataBits(t,i,n)}static embedBasicPatterns(t,e){Tr.embedPositionDetectionPatternsAndSeparators(e),Tr.embedDarkDotAtLeftBottomCorner(e),Tr.maybeEmbedPositionAdjustmentPatterns(t,e),Tr.embedTimingPatterns(e)}static embedTypeInfo(t,e,r){const i=new y;Tr.makeTypeInfoBits(t,e,i);for(let t=0,e=i.getSize();t<e;++t){const e=i.get(i.getSize()-1-t),n=Tr.TYPE_INFO_COORDINATES[t],o=n[0],s=n[1];if(r.setBoolean(o,s,e),t<8){const i=r.getWidth()-t-1,n=8;r.setBoolean(i,n,e)}else{const i=8,n=r.getHeight()-7+(t-8);r.setBoolean(i,n,e)}}}static maybeEmbedVersionInfo(t,e){if(t.getVersionNumber()<7)return;const r=new y;Tr.makeVersionInfoBits(t,r);let i=17;for(let t=0;t<6;++t)for(let n=0;n<3;++n){const o=r.get(i);i--,e.setBoolean(t,e.getHeight()-11+n,o),e.setBoolean(e.getHeight()-11+n,t,o)}}static embedDataBits(t,e,r){let i=0,n=-1,o=r.getWidth()-1,s=r.getHeight()-1;for(;o>0;){for(6===o&&(o-=1);s>=0&&s<r.getHeight();){for(let n=0;n<2;++n){const a=o-n;if(!Tr.isEmpty(r.get(a,s)))continue;let l;i<t.getSize()?(l=t.get(i),++i):l=!1,255!==e&&vr.getDataMaskBit(e,a,s)&&(l=!l),r.setBoolean(a,s,l)}s+=n}n=-n,s+=n,o-=2}if(i!==t.getSize())throw new Ir("Not all bits consumed: "+i+"/"+t.getSize())}static findMSBSet(t){return 32-b.numberOfLeadingZeros(t)}static calculateBCHCode(t,e){if(0===e)throw new d("0 polynomial");const r=Tr.findMSBSet(e);for(t<<=r-1;Tr.findMSBSet(t)>=r;)t^=e<<Tr.findMSBSet(t)-r;return t}static makeTypeInfoBits(t,e,r){if(!Sr.isValidMaskPattern(e))throw new Ir("Invalid mask pattern");const i=t.getBits()<<3|e;r.appendBits(i,5);const n=Tr.calculateBCHCode(i,Tr.TYPE_INFO_POLY);r.appendBits(n,10);const o=new y;if(o.appendBits(Tr.TYPE_INFO_MASK_PATTERN,15),r.xor(o),15!==r.getSize())throw new Ir("should not happen but we got: "+r.getSize())}static makeVersionInfoBits(t,e){e.appendBits(t.getVersionNumber(),6);const r=Tr.calculateBCHCode(t.getVersionNumber(),Tr.VERSION_INFO_POLY);if(e.appendBits(r,12),18!==e.getSize())throw new Ir("should not happen but we got: "+e.getSize())}static isEmpty(t){return 255===t}static embedTimingPatterns(t){for(let e=8;e<t.getWidth()-8;++e){const r=(e+1)%2;Tr.isEmpty(t.get(e,6))&&t.setNumber(e,6,r),Tr.isEmpty(t.get(6,e))&&t.setNumber(6,e,r)}}static embedDarkDotAtLeftBottomCorner(t){if(0===t.get(8,t.getHeight()-8))throw new Ir;t.setNumber(8,t.getHeight()-8,1)}static embedHorizontalSeparationPattern(t,e,r){for(let i=0;i<8;++i){if(!Tr.isEmpty(r.get(t+i,e)))throw new Ir;r.setNumber(t+i,e,0)}}static embedVerticalSeparationPattern(t,e,r){for(let i=0;i<7;++i){if(!Tr.isEmpty(r.get(t,e+i)))throw new Ir;r.setNumber(t,e+i,0)}}static embedPositionAdjustmentPattern(t,e,r){for(let i=0;i<5;++i){const n=Tr.POSITION_ADJUSTMENT_PATTERN[i];for(let o=0;o<5;++o)r.setNumber(t+o,e+i,n[o])}}static embedPositionDetectionPattern(t,e,r){for(let i=0;i<7;++i){const n=Tr.POSITION_DETECTION_PATTERN[i];for(let o=0;o<7;++o)r.setNumber(t+o,e+i,n[o])}}static embedPositionDetectionPatternsAndSeparators(t){const e=Tr.POSITION_DETECTION_PATTERN[0].length;Tr.embedPositionDetectionPattern(0,0,t),Tr.embedPositionDetectionPattern(t.getWidth()-e,0,t),Tr.embedPositionDetectionPattern(0,t.getWidth()-e,t);const r=8;Tr.embedHorizontalSeparationPattern(0,r-1,t),Tr.embedHorizontalSeparationPattern(t.getWidth()-r,r-1,t),Tr.embedHorizontalSeparationPattern(0,t.getWidth()-r,t);const i=7;Tr.embedVerticalSeparationPattern(i,0,t),Tr.embedVerticalSeparationPattern(t.getHeight()-i-1,0,t),Tr.embedVerticalSeparationPattern(i,t.getHeight()-i,t)}static maybeEmbedPositionAdjustmentPatterns(t,e){if(t.getVersionNumber()<2)return;const r=t.getVersionNumber()-1,i=Tr.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE[r];for(let t=0,r=i.length;t!==r;t++){const n=i[t];if(n>=0)for(let t=0;t!==r;t++){const r=i[t];r>=0&&Tr.isEmpty(e.get(r,n))&&Tr.embedPositionAdjustmentPattern(r-2,n-2,e)}}}}Tr.POSITION_DETECTION_PATTERN=Array.from([Int32Array.from([1,1,1,1,1,1,1]),Int32Array.from([1,0,0,0,0,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,1,1,1,0,1]),Int32Array.from([1,0,0,0,0,0,1]),Int32Array.from([1,1,1,1,1,1,1])]),Tr.POSITION_ADJUSTMENT_PATTERN=Array.from([Int32Array.from([1,1,1,1,1]),Int32Array.from([1,0,0,0,1]),Int32Array.from([1,0,1,0,1]),Int32Array.from([1,0,0,0,1]),Int32Array.from([1,1,1,1,1])]),Tr.POSITION_ADJUSTMENT_PATTERN_COORDINATE_TABLE=Array.from([Int32Array.from([-1,-1,-1,-1,-1,-1,-1]),Int32Array.from([6,18,-1,-1,-1,-1,-1]),Int32Array.from([6,22,-1,-1,-1,-1,-1]),Int32Array.from([6,26,-1,-1,-1,-1,-1]),Int32Array.from([6,30,-1,-1,-1,-1,-1]),Int32Array.from([6,34,-1,-1,-1,-1,-1]),Int32Array.from([6,22,38,-1,-1,-1,-1]),Int32Array.from([6,24,42,-1,-1,-1,-1]),Int32Array.from([6,26,46,-1,-1,-1,-1]),Int32Array.from([6,28,50,-1,-1,-1,-1]),Int32Array.from([6,30,54,-1,-1,-1,-1]),Int32Array.from([6,32,58,-1,-1,-1,-1]),Int32Array.from([6,34,62,-1,-1,-1,-1]),Int32Array.from([6,26,46,66,-1,-1,-1]),Int32Array.from([6,26,48,70,-1,-1,-1]),Int32Array.from([6,26,50,74,-1,-1,-1]),Int32Array.from([6,30,54,78,-1,-1,-1]),Int32Array.from([6,30,56,82,-1,-1,-1]),Int32Array.from([6,30,58,86,-1,-1,-1]),Int32Array.from([6,34,62,90,-1,-1,-1]),Int32Array.from([6,28,50,72,94,-1,-1]),Int32Array.from([6,26,50,74,98,-1,-1]),Int32Array.from([6,30,54,78,102,-1,-1]),Int32Array.from([6,28,54,80,106,-1,-1]),Int32Array.from([6,32,58,84,110,-1,-1]),Int32Array.from([6,30,58,86,114,-1,-1]),Int32Array.from([6,34,62,90,118,-1,-1]),Int32Array.from([6,26,50,74,98,122,-1]),Int32Array.from([6,30,54,78,102,126,-1]),Int32Array.from([6,26,52,78,104,130,-1]),Int32Array.from([6,30,56,82,108,134,-1]),Int32Array.from([6,34,60,86,112,138,-1]),Int32Array.from([6,30,58,86,114,142,-1]),Int32Array.from([6,34,62,90,118,146,-1]),Int32Array.from([6,30,54,78,102,126,150]),Int32Array.from([6,24,50,76,102,128,154]),Int32Array.from([6,28,54,80,106,132,158]),Int32Array.from([6,32,58,84,110,136,162]),Int32Array.from([6,26,54,82,110,138,166]),Int32Array.from([6,30,58,86,114,142,170])]),Tr.TYPE_INFO_COORDINATES=Array.from([Int32Array.from([8,0]),Int32Array.from([8,1]),Int32Array.from([8,2]),Int32Array.from([8,3]),Int32Array.from([8,4]),Int32Array.from([8,5]),Int32Array.from([8,7]),Int32Array.from([8,8]),Int32Array.from([7,8]),Int32Array.from([5,8]),Int32Array.from([4,8]),Int32Array.from([3,8]),Int32Array.from([2,8]),Int32Array.from([1,8]),Int32Array.from([0,8])]),Tr.VERSION_INFO_POLY=7973,Tr.TYPE_INFO_POLY=1335,Tr.TYPE_INFO_MASK_PATTERN=21522;class xr{constructor(t,e){this.dataBytes=t,this.errorCorrectionBytes=e}getDataBytes(){return this.dataBytes}getErrorCorrectionBytes(){return this.errorCorrectionBytes}}class Rr{constructor(){}static calculateMaskPenalty(t){return vr.applyMaskPenaltyRule1(t)+vr.applyMaskPenaltyRule2(t)+vr.applyMaskPenaltyRule3(t)+vr.applyMaskPenaltyRule4(t)}static encode(t,e,r=null){let i=Rr.DEFAULT_BYTE_MODE_ENCODING;const n=null!==r&&void 0!==r.get(Er.CHARACTER_SET);n&&(i=r.get(Er.CHARACTER_SET).toString());const o=this.chooseMode(t,i),s=new y;if(o===Re.BYTE&&(n||Rr.DEFAULT_BYTE_MODE_ENCODING!==i)){const t=v.getCharacterSetECIByName(i);void 0!==t&&this.appendECI(t,s)}this.appendModeInfo(o,s);const a=new y;let l;if(this.appendBytes(t,o,a,i),null!==r&&void 0!==r.get(Er.QR_VERSION)){const t=Number.parseInt(r.get(Er.QR_VERSION).toString(),10);l=Se.getVersionForNumber(t);const i=this.calculateBitsNeeded(o,s,a,l);if(!this.willFit(i,l,e))throw new Ir("Data too big for requested version")}else l=this.recommendVersion(e,o,s,a);const c=new y;c.appendBitArray(s);const d=o===Re.BYTE?a.getSizeInBytes():t.length;this.appendLengthInfo(d,l,o,c),c.appendBitArray(a);const h=l.getECBlocksForLevel(e),u=l.getTotalCodewords()-h.getTotalECCodewords();this.terminateBits(u,c);const p=this.interleaveWithECBytes(c,l.getTotalCodewords(),u,h.getNumBlocks()),f=new Sr;f.setECLevel(e),f.setMode(o),f.setVersion(l);const g=l.getDimensionForVersion(),m=new Ar(g,g),w=this.chooseMaskPattern(p,e,l,m);return f.setMaskPattern(w),Tr.buildMatrix(p,e,l,w,m),f.setMatrix(m),f}static recommendVersion(t,e,r,i){const n=this.calculateBitsNeeded(e,r,i,Se.getVersionForNumber(1)),o=this.chooseVersion(n,t),s=this.calculateBitsNeeded(e,r,i,o);return this.chooseVersion(s,t)}static calculateBitsNeeded(t,e,r,i){return e.getSize()+t.getCharacterCountBits(i)+r.getSize()}static getAlphanumericCode(t){return t<Rr.ALPHANUMERIC_TABLE.length?Rr.ALPHANUMERIC_TABLE[t]:-1}static chooseMode(t,e=null){if(v.SJIS.getName()===e&&this.isOnlyDoubleByteKanji(t))return Re.KANJI;let r=!1,i=!1;for(let e=0,n=t.length;e<n;++e){const n=t.charAt(e);if(Rr.isDigit(n))r=!0;else{if(-1===this.getAlphanumericCode(n.charCodeAt(0)))return Re.BYTE;i=!0}}return i?Re.ALPHANUMERIC:r?Re.NUMERIC:Re.BYTE}static isOnlyDoubleByteKanji(t){let e;try{e=S.encode(t,v.SJIS)}catch(t){return!1}const r=e.length;if(r%2!=0)return!1;for(let t=0;t<r;t+=2){const r=255&e[t];if((r<129||r>159)&&(r<224||r>235))return!1}return!0}static chooseMaskPattern(t,e,r,i){let n=Number.MAX_SAFE_INTEGER,o=-1;for(let s=0;s<Sr.NUM_MASK_PATTERNS;s++){Tr.buildMatrix(t,e,r,s,i);let a=this.calculateMaskPenalty(i);a<n&&(n=a,o=s)}return o}static chooseVersion(t,e){for(let r=1;r<=40;r++){const i=Se.getVersionForNumber(r);if(Rr.willFit(t,i,e))return i}throw new Ir("Data too big")}static willFit(t,e,r){return e.getTotalCodewords()-e.getECBlocksForLevel(r).getTotalECCodewords()>=(t+7)/8}static terminateBits(t,e){const r=8*t;if(e.getSize()>r)throw new Ir("data bits cannot fit in the QR Code"+e.getSize()+" > "+r);for(let t=0;t<4&&e.getSize()<r;++t)e.appendBit(!1);const i=7&e.getSize();if(i>0)for(let t=i;t<8;t++)e.appendBit(!1);const n=t-e.getSizeInBytes();for(let t=0;t<n;++t)e.appendBits(1&t?17:236,8);if(e.getSize()!==r)throw new Ir("Bits size does not equal capacity")}static getNumDataBytesAndNumECBytesForBlockID(t,e,r,i,n,o){if(i>=r)throw new Ir("Block ID too large");const s=t%r,a=r-s,l=Math.floor(t/r),c=l+1,d=Math.floor(e/r),h=d+1,u=l-d,p=c-h;if(u!==p)throw new Ir("EC bytes mismatch");if(r!==a+s)throw new Ir("RS blocks mismatch");if(t!==(d+u)*a+(h+p)*s)throw new Ir("Total bytes mismatch");i<a?(n[0]=d,o[0]=u):(n[0]=h,o[0]=p)}static interleaveWithECBytes(t,e,r,i){if(t.getSizeInBytes()!==r)throw new Ir("Number of bits and data bytes does not match");let n=0,o=0,s=0;const a=new Array;for(let l=0;l<i;++l){const c=new Int32Array(1),d=new Int32Array(1);Rr.getNumDataBytesAndNumECBytesForBlockID(e,r,i,l,c,d);const h=c[0],u=new Uint8Array(h);t.toBytes(8*n,u,0,h);const p=Rr.generateECBytes(u,d[0]);a.push(new xr(u,p)),o=Math.max(o,h),s=Math.max(s,p.length),n+=c[0]}if(r!==n)throw new Ir("Data bytes does not match offset");const l=new y;for(let t=0;t<o;++t)for(const e of a){const r=e.getDataBytes();t<r.length&&l.appendBits(r[t],8)}for(let t=0;t<s;++t)for(const e of a){const r=e.getErrorCorrectionBytes();t<r.length&&l.appendBits(r[t],8)}if(e!==l.getSizeInBytes())throw new Ir("Interleaving error: "+e+" and "+l.getSizeInBytes()+" differ.");return l}static generateECBytes(t,e){const r=t.length,i=new Int32Array(r+e);for(let e=0;e<r;e++)i[e]=255&t[e];new Cr(J.QR_CODE_FIELD_256).encode(i,e);const n=new Uint8Array(e);for(let t=0;t<e;t++)n[t]=i[r+t];return n}static appendModeInfo(t,e){e.appendBits(t.getBits(),4)}static appendLengthInfo(t,e,r,i){const n=r.getCharacterCountBits(e);if(t>=1<<n)throw new Ir(t+" is bigger than "+((1<<n)-1));i.appendBits(t,n)}static appendBytes(t,e,r,i){switch(e){case Re.NUMERIC:Rr.appendNumericBytes(t,r);break;case Re.ALPHANUMERIC:Rr.appendAlphanumericBytes(t,r);break;case Re.BYTE:Rr.append8BitBytes(t,r,i);break;case Re.KANJI:Rr.appendKanjiBytes(t,r);break;default:throw new Ir("Invalid mode: "+e)}}static getDigit(t){return t.charCodeAt(0)-48}static isDigit(t){const e=Rr.getDigit(t);return e>=0&&e<=9}static appendNumericBytes(t,e){const r=t.length;let i=0;for(;i<r;){const n=Rr.getDigit(t.charAt(i));if(i+2<r){const r=Rr.getDigit(t.charAt(i+1)),o=Rr.getDigit(t.charAt(i+2));e.appendBits(100*n+10*r+o,10),i+=3}else if(i+1<r){const r=Rr.getDigit(t.charAt(i+1));e.appendBits(10*n+r,7),i+=2}else e.appendBits(n,4),i++}}static appendAlphanumericBytes(t,e){const r=t.length;let i=0;for(;i<r;){const n=Rr.getAlphanumericCode(t.charCodeAt(i));if(-1===n)throw new Ir;if(i+1<r){const r=Rr.getAlphanumericCode(t.charCodeAt(i+1));if(-1===r)throw new Ir;e.appendBits(45*n+r,11),i+=2}else e.appendBits(n,6),i++}}static append8BitBytes(t,e,r){let i;try{i=S.encode(t,r)}catch(t){throw new Ir(t)}for(let t=0,r=i.length;t!==r;t++){const r=i[t];e.appendBits(r,8)}}static appendKanjiBytes(t,e){let r;try{r=S.encode(t,v.SJIS)}catch(t){throw new Ir(t)}const i=r.length;for(let t=0;t<i;t+=2){const i=(255&r[t])<<8&4294967295|255&r[t+1];let n=-1;if(i>=33088&&i<=40956?n=i-33088:i>=57408&&i<=60351&&(n=i-49472),-1===n)throw new Ir("Invalid byte sequence");const o=192*(n>>8)+(255&n);e.appendBits(o,13)}}static appendECI(t,e){e.appendBits(Re.ECI.getBits(),4),e.appendBits(t.getValue(),8)}}Rr.ALPHANUMERIC_TABLE=Int32Array.from([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,36,-1,-1,-1,37,38,-1,-1,-1,-1,39,40,-1,41,42,43,0,1,2,3,4,5,6,7,8,9,44,-1,-1,-1,-1,-1,-1,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,-1,-1,-1,-1,-1]),Rr.DEFAULT_BYTE_MODE_ENCODING=v.UTF8.getName();class Or{write(t,e,r,i=null){if(0===t.length)throw new d("Found empty contents");if(e<0||r<0)throw new d("Requested dimensions are too small: "+e+"x"+r);let n=Ee.L,o=Or.QUIET_ZONE_SIZE;null!==i&&(void 0!==i.get(Er.ERROR_CORRECTION)&&(n=Ee.fromString(i.get(Er.ERROR_CORRECTION).toString())),void 0!==i.get(Er.MARGIN)&&(o=Number.parseInt(i.get(Er.MARGIN).toString(),10)));const s=Rr.encode(t,n,i);return this.renderResult(s,e,r,o)}writeToDom(t,e,r,i,n=null){"string"==typeof t&&(t=document.querySelector(t));const o=this.write(e,r,i,n);t&&t.appendChild(o)}renderResult(t,e,r,i){const n=t.getMatrix();if(null===n)throw new et;const o=n.getWidth(),s=n.getHeight(),a=o+2*i,l=s+2*i,c=Math.max(e,a),d=Math.max(r,l),h=Math.min(Math.floor(c/a),Math.floor(d/l)),u=Math.floor((c-o*h)/2),p=Math.floor((d-s*h)/2),f=this.createSVGElement(c,d);for(let t=0,e=p;t<s;t++,e+=h)for(let r=0,i=u;r<o;r++,i+=h)if(1===n.get(r,t)){const t=this.createSvgRectElement(i,e,h,h);f.appendChild(t)}return f}createSVGElement(t,e){const r=document.createElementNS(Or.SVG_NS,"svg");return r.setAttributeNS(null,"height",t.toString()),r.setAttributeNS(null,"width",e.toString()),r}createSvgRectElement(t,e,r,i){const n=document.createElementNS(Or.SVG_NS,"rect");return n.setAttributeNS(null,"x",t.toString()),n.setAttributeNS(null,"y",e.toString()),n.setAttributeNS(null,"height",r.toString()),n.setAttributeNS(null,"width",i.toString()),n.setAttributeNS(null,"fill","#000000"),n}}Or.QUIET_ZONE_SIZE=4,Or.SVG_NS="http://www.w3.org/2000/svg";class Nr{encode(t,e,r,i,n){if(0===t.length)throw new d("Found empty contents");if(e!==H.QR_CODE)throw new d("Can only encode QR_CODE, but got "+e);if(r<0||i<0)throw new d(`Requested dimensions are too small: ${r}x${i}`);let o=Ee.L,s=Nr.QUIET_ZONE_SIZE;null!==n&&(void 0!==n.get(Er.ERROR_CORRECTION)&&(o=Ee.fromString(n.get(Er.ERROR_CORRECTION).toString())),void 0!==n.get(Er.MARGIN)&&(s=Number.parseInt(n.get(Er.MARGIN).toString(),10)));const a=Rr.encode(t,o,n);return Nr.renderResult(a,r,i,s)}static renderResult(t,e,r,i){const n=t.getMatrix();if(null===n)throw new et;const o=n.getWidth(),s=n.getHeight(),a=o+2*i,l=s+2*i,c=Math.max(e,a),d=Math.max(r,l),h=Math.min(Math.floor(c/a),Math.floor(d/l)),u=Math.floor((c-o*h)/2),p=Math.floor((d-s*h)/2),f=new x(c,d);for(let t=0,e=p;t<s;t++,e+=h)for(let r=0,i=u;r<o;r++,i+=h)1===n.get(r,t)&&f.setRegion(i,e,h,h);return f}}Nr.QUIET_ZONE_SIZE=4;class Dr{encode(t,e,r,i,n){let o;if(e!==H.QR_CODE)throw new d("No encoder available for format "+e);return o=new Nr,o.encode(t,e,r,i,n)}}class Pr extends D{constructor(t,e,r,i,n,o,s,a){if(super(o,s),this.yuvData=t,this.dataWidth=e,this.dataHeight=r,this.left=i,this.top=n,i+o>e||n+s>r)throw new d("Crop rectangle does not fit within image data.");a&&this.reverseHorizontal(o,s)}getRow(t,e){if(t<0||t>=this.getHeight())throw new d("Requested row is outside the image: "+t);const r=this.getWidth();(null==e||e.length<r)&&(e=new Uint8ClampedArray(r));const i=(t+this.top)*this.dataWidth+this.left;return f.arraycopy(this.yuvData,i,e,0,r),e}getMatrix(){const t=this.getWidth(),e=this.getHeight();if(t===this.dataWidth&&e===this.dataHeight)return this.yuvData;const r=t*e,i=new Uint8ClampedArray(r);let n=this.top*this.dataWidth+this.left;if(t===this.dataWidth)return f.arraycopy(this.yuvData,n,i,0,r),i;for(let r=0;r<e;r++){const e=r*t;f.arraycopy(this.yuvData,n,i,e,t),n+=this.dataWidth}return i}isCropSupported(){return!0}crop(t,e,r,i){return new Pr(this.yuvData,this.dataWidth,this.dataHeight,this.left+t,this.top+e,r,i,!1)}renderThumbnail(){const t=this.getWidth()/Pr.THUMBNAIL_SCALE_FACTOR,e=this.getHeight()/Pr.THUMBNAIL_SCALE_FACTOR,r=new Int32Array(t*e),i=this.yuvData;let n=this.top*this.dataWidth+this.left;for(let o=0;o<e;o++){const e=o*t;for(let o=0;o<t;o++){const t=255&i[n+o*Pr.THUMBNAIL_SCALE_FACTOR];r[e+o]=4278190080|65793*t}n+=this.dataWidth*Pr.THUMBNAIL_SCALE_FACTOR}return r}getThumbnailWidth(){return this.getWidth()/Pr.THUMBNAIL_SCALE_FACTOR}getThumbnailHeight(){return this.getHeight()/Pr.THUMBNAIL_SCALE_FACTOR}reverseHorizontal(t,e){const r=this.yuvData;for(let i=0,n=this.top*this.dataWidth+this.left;i<e;i++,n+=this.dataWidth){const e=n+t/2;for(let i=n,o=n+t-1;i<e;i++,o--){const t=r[i];r[i]=r[o],r[o]=t}}}invert(){return new P(this)}}Pr.THUMBNAIL_SCALE_FACTOR=2;class Mr extends D{constructor(t,e,r,i,n,o,s){if(super(e,r),this.dataWidth=i,this.dataHeight=n,this.left=o,this.top=s,4===t.BYTES_PER_ELEMENT){const i=e*r,n=new Uint8ClampedArray(i);for(let e=0;e<i;e++){const r=t[e],i=r>>16&255,o=r>>7&510,s=255&r;n[e]=(i+o+s)/4&255}this.luminances=n}else this.luminances=t;if(void 0===i&&(this.dataWidth=e),void 0===n&&(this.dataHeight=r),void 0===o&&(this.left=0),void 0===s&&(this.top=0),this.left+e>this.dataWidth||this.top+r>this.dataHeight)throw new d("Crop rectangle does not fit within image data.")}getRow(t,e){if(t<0||t>=this.getHeight())throw new d("Requested row is outside the image: "+t);const r=this.getWidth();(null==e||e.length<r)&&(e=new Uint8ClampedArray(r));const i=(t+this.top)*this.dataWidth+this.left;return f.arraycopy(this.luminances,i,e,0,r),e}getMatrix(){const t=this.getWidth(),e=this.getHeight();if(t===this.dataWidth&&e===this.dataHeight)return this.luminances;const r=t*e,i=new Uint8ClampedArray(r);let n=this.top*this.dataWidth+this.left;if(t===this.dataWidth)return f.arraycopy(this.luminances,n,i,0,r),i;for(let r=0;r<e;r++){const e=r*t;f.arraycopy(this.luminances,n,i,e,t),n+=this.dataWidth}return i}isCropSupported(){return!0}crop(t,e,r,i){return new Mr(this.luminances,r,i,this.dataWidth,this.dataHeight,this.left+t,this.top+e)}invert(){return new P(this)}}class kr extends v{static forName(t){return this.getCharacterSetECIByName(t)}}class Br{}Br.ISO_8859_1=v.ISO8859_1;class Lr{isCompact(){return this.compact}setCompact(t){this.compact=t}getSize(){return this.size}setSize(t){this.size=t}getLayers(){return this.layers}setLayers(t){this.layers=t}getCodeWords(){return this.codeWords}setCodeWords(t){this.codeWords=t}getMatrix(){return this.matrix}setMatrix(t){this.matrix=t}}class Fr{static singletonList(t){return[t]}static min(t,e){return t.sort(e)[0]}}class $r{constructor(t){this.previous=t}getPrevious(){return this.previous}}class Ur extends $r{constructor(t,e,r){super(t),this.value=e,this.bitCount=r}appendTo(t,e){t.appendBits(this.value,this.bitCount)}add(t,e){return new Ur(this,t,e)}addBinaryShift(t,e){return console.warn("addBinaryShift on SimpleToken, this simply returns a copy of this token"),new Ur(this,t,e)}toString(){let t=this.value&(1<<this.bitCount)-1;return t|=1<<this.bitCount,"<"+b.toBinaryString(t|1<<this.bitCount).substring(1)+">"}}class Hr extends Ur{constructor(t,e,r){super(t,0,0),this.binaryShiftStart=e,this.binaryShiftByteCount=r}appendTo(t,e){for(let r=0;r<this.binaryShiftByteCount;r++)(0===r||31===r&&this.binaryShiftByteCount<=62)&&(t.appendBits(31,5),this.binaryShiftByteCount>62?t.appendBits(this.binaryShiftByteCount-31,16):0===r?t.appendBits(Math.min(this.binaryShiftByteCount,31),5):t.appendBits(this.binaryShiftByteCount-31,5)),t.appendBits(e[this.binaryShiftStart+r],8)}addBinaryShift(t,e){return new Hr(this,t,e)}toString(){return"<"+this.binaryShiftStart+"::"+(this.binaryShiftStart+this.binaryShiftByteCount-1)+">"}}function Vr(t,e,r){return new Hr(t,e,r)}function zr(t,e,r){return new Ur(t,e,r)}const jr=["UPPER","LOWER","DIGIT","MIXED","PUNCT"],Gr=0,Xr=1,Wr=2,Yr=3,Zr=4,qr=new Ur(null,0,0),Kr=[Int32Array.from([0,327708,327710,327709,656318]),Int32Array.from([590318,0,327710,327709,656318]),Int32Array.from([262158,590300,0,590301,932798]),Int32Array.from([327709,327708,656318,0,327710]),Int32Array.from([327711,656380,656382,656381,0])];function Qr(t){for(let e of t)w.fill(e,-1);return t[Gr][Zr]=0,t[Xr][Zr]=0,t[Xr][Gr]=28,t[Yr][Zr]=0,t[Wr][Zr]=0,t[Wr][Gr]=15,t}const Jr=Qr(w.createInt32Array(6,6));class ti{constructor(t,e,r,i){this.token=t,this.mode=e,this.binaryShiftByteCount=r,this.bitCount=i}getMode(){return this.mode}getToken(){return this.token}getBinaryShiftByteCount(){return this.binaryShiftByteCount}getBitCount(){return this.bitCount}latchAndAppend(t,e){let r=this.bitCount,i=this.token;if(t!==this.mode){let e=Kr[this.mode][t];i=zr(i,65535&e,e>>16),r+=e>>16}let n=t===Wr?4:5;return i=zr(i,e,n),new ti(i,t,0,r+n)}shiftAndAppend(t,e){let r=this.token,i=this.mode===Wr?4:5;return r=zr(r,Jr[this.mode][t],i),r=zr(r,e,5),new ti(r,this.mode,0,this.bitCount+i+5)}addBinaryShiftChar(t){let e=this.token,r=this.mode,i=this.bitCount;if(this.mode===Zr||this.mode===Wr){let t=Kr[r][Gr];e=zr(e,65535&t,t>>16),i+=t>>16,r=Gr}let n=0===this.binaryShiftByteCount||31===this.binaryShiftByteCount?18:62===this.binaryShiftByteCount?9:8,o=new ti(e,r,this.binaryShiftByteCount+1,i+n);return 2078===o.binaryShiftByteCount&&(o=o.endBinaryShift(t+1)),o}endBinaryShift(t){if(0===this.binaryShiftByteCount)return this;let e=this.token;return e=Vr(e,t-this.binaryShiftByteCount,this.binaryShiftByteCount),new ti(e,this.mode,0,this.bitCount)}isBetterThanOrEqualTo(t){let e=this.bitCount+(Kr[this.mode][t.mode]>>16);return this.binaryShiftByteCount<t.binaryShiftByteCount?e+=ti.calculateBinaryShiftCost(t)-ti.calculateBinaryShiftCost(this):this.binaryShiftByteCount>t.binaryShiftByteCount&&t.binaryShiftByteCount>0&&(e+=10),e<=t.bitCount}toBitArray(t){let e=[];for(let r=this.endBinaryShift(t.length).token;null!==r;r=r.getPrevious())e.unshift(r);let r=new y;for(const i of e)i.appendTo(r,t);return r}toString(){return I.format("%s bits=%d bytes=%d",jr[this.mode],this.bitCount,this.binaryShiftByteCount)}static calculateBinaryShiftCost(t){return t.binaryShiftByteCount>62?21:t.binaryShiftByteCount>31?20:t.binaryShiftByteCount>0?10:0}}function ei(t){const e=I.getCharCode(" "),r=I.getCharCode("."),i=I.getCharCode(",");t[Gr][e]=1;const n=I.getCharCode("Z"),o=I.getCharCode("A");for(let e=o;e<=n;e++)t[Gr][e]=e-o+2;t[Xr][e]=1;const s=I.getCharCode("z"),a=I.getCharCode("a");for(let e=a;e<=s;e++)t[Xr][e]=e-a+2;t[Wr][e]=1;const l=I.getCharCode("9"),c=I.getCharCode("0");for(let e=c;e<=l;e++)t[Wr][e]=e-c+2;t[Wr][i]=12,t[Wr][r]=13;const d=["\0"," ","","","","","","","","\b","\t","\n","\v","\f","\r","","","","","","@","\\","^","_","`","|","~",""];for(let e=0;e<d.length;e++)t[Yr][I.getCharCode(d[e])]=e;const h=["\0","\r","\0","\0","\0","\0","!","'","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","[","]","{","}"];for(let e=0;e<h.length;e++)I.getCharCode(h[e])>0&&(t[Zr][I.getCharCode(h[e])]=e);return t}ti.INITIAL_STATE=new ti(qr,Gr,0,0);const ri=ei(w.createInt32Array(5,256));class ii{constructor(t){this.text=t}encode(){const t=I.getCharCode(" "),e=I.getCharCode("\n");let r=Fr.singletonList(ti.INITIAL_STATE);for(let i=0;i<this.text.length;i++){let n,o=i+1<this.text.length?this.text[i+1]:0;switch(this.text[i]){case I.getCharCode("\r"):n=o===e?2:0;break;case I.getCharCode("."):n=o===t?3:0;break;case I.getCharCode(","):n=o===t?4:0;break;case I.getCharCode(":"):n=o===t?5:0;break;default:n=0}n>0?(r=ii.updateStateListForPair(r,i,n),i++):r=this.updateStateListForChar(r,i)}const i=Fr.min(r,(t,e)=>t.getBitCount()-e.getBitCount());return i.toBitArray(this.text)}updateStateListForChar(t,e){const r=[];for(let i of t)this.updateStateForChar(i,e,r);return ii.simplifyStates(r)}updateStateForChar(t,e,r){let i=255&this.text[e],n=ri[t.getMode()][i]>0,o=null;for(let s=0;s<=Zr;s++){let a=ri[s][i];if(a>0){if(null==o&&(o=t.endBinaryShift(e)),!n||s===t.getMode()||s===Wr){const t=o.latchAndAppend(s,a);r.push(t)}if(!n&&Jr[t.getMode()][s]>=0){const t=o.shiftAndAppend(s,a);r.push(t)}}}if(t.getBinaryShiftByteCount()>0||0===ri[t.getMode()][i]){let i=t.addBinaryShiftChar(e);r.push(i)}}static updateStateListForPair(t,e,r){const i=[];for(let n of t)this.updateStateForPair(n,e,r,i);return this.simplifyStates(i)}static updateStateForPair(t,e,r,i){let n=t.endBinaryShift(e);if(i.push(n.latchAndAppend(Zr,r)),t.getMode()!==Zr&&i.push(n.shiftAndAppend(Zr,r)),3===r||4===r){let t=n.latchAndAppend(Wr,16-r).latchAndAppend(Wr,1);i.push(t)}if(t.getBinaryShiftByteCount()>0){let r=t.addBinaryShiftChar(e).addBinaryShiftChar(e+1);i.push(r)}}static simplifyStates(t){let e=[];for(const r of t){let t=!0;for(const i of e){if(i.isBetterThanOrEqualTo(r)){t=!1;break}r.isBetterThanOrEqualTo(i)&&(e=e.filter(t=>t!==i))}t&&e.push(r)}return e}}class ni{constructor(){}static encodeBytes(t){return ni.encode(t,ni.DEFAULT_EC_PERCENT,ni.DEFAULT_AZTEC_LAYERS)}static encode(t,e,r){let i,n,o,s,a,l=new ii(t).encode(),c=b.truncDivision(l.getSize()*e,100)+11,h=l.getSize()+c;if(r!==ni.DEFAULT_AZTEC_LAYERS){if(i=r<0,n=Math.abs(r),n>(i?ni.MAX_NB_BITS_COMPACT:ni.MAX_NB_BITS))throw new d(I.format("Illegal value %s for layers",r));o=ni.totalBitsInLayer(n,i),s=ni.WORD_SIZE[n];let t=o-o%s;if(a=ni.stuffBits(l,s),a.getSize()+c>t)throw new d("Data to large for user specified layer");if(i&&a.getSize()>64*s)throw new d("Data to large for user specified layer")}else{s=0,a=null;for(let t=0;;t++){if(t>ni.MAX_NB_BITS)throw new d("Data too large for an Aztec code");if(i=t<=3,n=i?t+1:t,o=ni.totalBitsInLayer(n,i),h>o)continue;null!=a&&s===ni.WORD_SIZE[n]||(s=ni.WORD_SIZE[n],a=ni.stuffBits(l,s));let e=o-o%s;if(!(i&&a.getSize()>64*s)&&a.getSize()+c<=e)break}}let u,p=ni.generateCheckWords(a,o,s),f=a.getSize()/s,g=ni.generateModeMessage(i,n,f),m=(i?11:14)+4*n,w=new Int32Array(m);if(i){u=m;for(let t=0;t<w.length;t++)w[t]=t}else{u=m+1+2*b.truncDivision(b.truncDivision(m,2)-1,15);let t=b.truncDivision(m,2),e=b.truncDivision(u,2);for(let r=0;r<t;r++){let i=r+b.truncDivision(r,15);w[t-r-1]=e-i-1,w[t+r]=e+i+1}}let y=new x(u);for(let t=0,e=0;t<n;t++){let r=4*(n-t)+(i?9:12);for(let i=0;i<r;i++){let n=2*i;for(let o=0;o<2;o++)p.get(e+n+o)&&y.set(w[2*t+o],w[2*t+i]),p.get(e+2*r+n+o)&&y.set(w[2*t+i],w[m-1-2*t-o]),p.get(e+4*r+n+o)&&y.set(w[m-1-2*t-o],w[m-1-2*t-i]),p.get(e+6*r+n+o)&&y.set(w[m-1-2*t-i],w[2*t+o])}e+=8*r}if(ni.drawModeMessage(y,i,u,g),i)ni.drawBullsEye(y,b.truncDivision(u,2),5);else{ni.drawBullsEye(y,b.truncDivision(u,2),7);for(let t=0,e=0;t<b.truncDivision(m,2)-1;t+=15,e+=16)for(let t=1&b.truncDivision(u,2);t<u;t+=2)y.set(b.truncDivision(u,2)-e,t),y.set(b.truncDivision(u,2)+e,t),y.set(t,b.truncDivision(u,2)-e),y.set(t,b.truncDivision(u,2)+e)}let _=new Lr;return _.setCompact(i),_.setSize(u),_.setLayers(n),_.setCodeWords(f),_.setMatrix(y),_}static drawBullsEye(t,e,r){for(let i=0;i<r;i+=2)for(let r=e-i;r<=e+i;r++)t.set(r,e-i),t.set(r,e+i),t.set(e-i,r),t.set(e+i,r);t.set(e-r,e-r),t.set(e-r+1,e-r),t.set(e-r,e-r+1),t.set(e+r,e-r),t.set(e+r,e-r+1),t.set(e+r,e+r-1)}static generateModeMessage(t,e,r){let i=new y;return t?(i.appendBits(e-1,2),i.appendBits(r-1,6),i=ni.generateCheckWords(i,28,4)):(i.appendBits(e-1,5),i.appendBits(r-1,11),i=ni.generateCheckWords(i,40,4)),i}static drawModeMessage(t,e,r,i){let n=b.truncDivision(r,2);if(e)for(let e=0;e<7;e++){let r=n-3+e;i.get(e)&&t.set(r,n-5),i.get(e+7)&&t.set(n+5,r),i.get(20-e)&&t.set(r,n+5),i.get(27-e)&&t.set(n-5,r)}else for(let e=0;e<10;e++){let r=n-5+e+b.truncDivision(e,5);i.get(e)&&t.set(r,n-7),i.get(e+10)&&t.set(n+7,r),i.get(29-e)&&t.set(r,n+7),i.get(39-e)&&t.set(n-7,r)}}static generateCheckWords(t,e,r){let i=t.getSize()/r,n=new Cr(ni.getGF(r)),o=b.truncDivision(e,r),s=ni.bitsToWords(t,r,o);n.encode(s,o-i);let a=e%r,l=new y;l.appendBits(0,a);for(const t of Array.from(s))l.appendBits(t,r);return l}static bitsToWords(t,e,r){let i,n,o=new Int32Array(r);for(i=0,n=t.getSize()/e;i<n;i++){let r=0;for(let n=0;n<e;n++)r|=t.get(i*e+n)?1<<e-n-1:0;o[i]=r}return o}static getGF(t){switch(t){case 4:return J.AZTEC_PARAM;case 6:return J.AZTEC_DATA_6;case 8:return J.AZTEC_DATA_8;case 10:return J.AZTEC_DATA_10;case 12:return J.AZTEC_DATA_12;default:throw new d("Unsupported word size "+t)}}static stuffBits(t,e){let r=new y,i=t.getSize(),n=(1<<e)-2;for(let o=0;o<i;o+=e){let s=0;for(let r=0;r<e;r++)(o+r>=i||t.get(o+r))&&(s|=1<<e-1-r);(s&n)===n?(r.appendBits(s&n,e),o--):0===(s&n)?(r.appendBits(1|s,e),o--):r.appendBits(s,e)}return r}static totalBitsInLayer(t,e){return((e?88:112)+16*t)*t}}ni.DEFAULT_EC_PERCENT=33,ni.DEFAULT_AZTEC_LAYERS=0,ni.MAX_NB_BITS=32,ni.MAX_NB_BITS_COMPACT=4,ni.WORD_SIZE=Int32Array.from([4,6,6,8,8,8,8,8,8,10,10,10,10,10,10,10,10,10,10,10,10,10,10,12,12,12,12,12,12,12,12,12,12]);class oi{encode(t,e,r,i){return this.encodeWithHints(t,e,r,i,null)}encodeWithHints(t,e,r,i,n){let o=Br.ISO_8859_1,s=ni.DEFAULT_EC_PERCENT,a=ni.DEFAULT_AZTEC_LAYERS;return null!=n&&(n.has(Er.CHARACTER_SET)&&(o=kr.forName(n.get(Er.CHARACTER_SET).toString())),n.has(Er.ERROR_CORRECTION)&&(s=b.parseInt(n.get(Er.ERROR_CORRECTION).toString())),n.has(Er.AZTEC_LAYERS)&&(a=b.parseInt(n.get(Er.AZTEC_LAYERS).toString()))),oi.encodeLayers(t,e,r,i,o,s,a)}static encodeLayers(t,e,r,i,n,o,s){if(e!==H.AZTEC)throw new d("Can only encode AZTEC, but got "+e);let a=ni.encode(I.getBytes(t,n),o,s);return oi.renderResult(a,r,i)}static renderResult(t,e,r){let i=t.getMatrix();if(null==i)throw new et;let n=i.getWidth(),o=i.getHeight(),s=Math.max(e,n),a=Math.max(r,o),l=Math.min(s/n,a/o),c=(s-n*l)/2,d=(a-o*l)/2,h=new x(s,a);for(let t=0,e=d;t<o;t++,e+=l)for(let r=0,o=c;r<n;r++,o+=l)i.get(r,t)&&h.setRegion(o,e,l,l);return h}}t.AbstractExpandedDecoder=Gt,t.ArgumentException=c,t.ArithmeticException=Q,t.AztecCode=Lr,t.AztecCodeReader=mt,t.AztecCodeWriter=oi,t.AztecDecoder=it,t.AztecDetector=gt,t.AztecDetectorResult=lt,t.AztecEncoder=ni,t.AztecHighLevelEncoder=ii,t.AztecPoint=ft,t.BarcodeFormat=H,t.Binarizer=p,t.BinaryBitmap=h,t.BitArray=y,t.BitMatrix=x,t.BitSource=ge,t.BrowserAztecCodeReader=wt,t.BrowserBarcodeReader=ce,t.BrowserCodeReader=F,t.BrowserDatamatrixCodeReader=_e,t.BrowserMultiFormatReader=wr,t.BrowserPDF417Reader=br,t.BrowserQRCodeReader=yr,t.BrowserQRCodeSvgWriter=Or,t.CharacterSetECI=v,t.ChecksumException=u,t.Code128Reader=yt,t.Code39Reader=_t,t.DataMatrixDecodedBitStreamParser=me,t.DataMatrixReader=ye,t.DecodeHintType=E,t.DecoderResult=Z,t.DefaultGridSampler=ut,t.DetectorResult=at,t.EAN13Reader=xt,t.EncodeHintType=Er,t.Exception=l,t.FormatException=C,t.GenericGF=J,t.GenericGFPoly=K,t.GlobalHistogramBinarizer=O,t.GridSampler=dt,t.GridSamplerInstance=pt,t.HTMLCanvasElementLuminanceSource=M,t.HybridBinarizer=N,t.ITFReader=Et,t.IllegalArgumentException=d,t.IllegalStateException=et,t.InvertedLuminanceSource=P,t.LuminanceSource=D,t.MathUtils=nt,t.MultiFormatOneDReader=le,t.MultiFormatReader=mr,t.MultiFormatWriter=Dr,t.NotFoundException=R,t.OneDReader=bt,t.PDF417DecodedBitStreamParser=ur,t.PDF417DecoderErrorCorrection=Xe,t.PDF417Reader=fr,t.PDF417ResultMetadata=rr,t.PerspectiveTransform=ht,t.PlanarYUVLuminanceSource=Pr,t.QRCodeByteMatrix=Ar,t.QRCodeDataMask=Ie,t.QRCodeDecodedBitStreamParser=Oe,t.QRCodeDecoderErrorCorrectionLevel=Ee,t.QRCodeDecoderFormatInformation=Ce,t.QRCodeEncoder=Rr,t.QRCodeEncoderQRCode=Sr,t.QRCodeMaskUtil=vr,t.QRCodeMatrixUtil=Tr,t.QRCodeMode=Re,t.QRCodeReader=$e,t.QRCodeVersion=Se,t.QRCodeWriter=Nr,t.RGBLuminanceSource=Mr,t.RSS14Reader=ae,t.RSSExpandedReader=oe,t.ReaderException=gr,t.ReedSolomonDecoder=rt,t.ReedSolomonEncoder=Cr,t.ReedSolomonException=tt,t.Result=$,t.ResultMetadataType=Y,t.ResultPoint=st,t.StringUtils=I,t.UnsupportedOperationException=A,t.VideoInputDevice=k,t.WhiteRectangleDetector=ct,t.WriterException=Ir,t.ZXingArrays=w,t.ZXingCharset=kr,t.ZXingInteger=b,t.ZXingStandardCharsets=Br,t.ZXingStringBuilder=T,t.ZXingStringEncoding=S,t.ZXingSystem=f,t.createAbstractExpandedDecoder=re,Object.defineProperty(t,"__esModule",{value:!0})}(Ho.exports);var Vo,zo,jo=Ho.exports,Go=Object.freeze({__proto__:null}),Xo=function(){function t(t,e,r){if(this.formatMap=new Map([[Io.QR_CODE,jo.BarcodeFormat.QR_CODE],[Io.AZTEC,jo.BarcodeFormat.AZTEC],[Io.CODABAR,jo.BarcodeFormat.CODABAR],[Io.CODE_39,jo.BarcodeFormat.CODE_39],[Io.CODE_93,jo.BarcodeFormat.CODE_93],[Io.CODE_128,jo.BarcodeFormat.CODE_128],[Io.DATA_MATRIX,jo.BarcodeFormat.DATA_MATRIX],[Io.MAXICODE,jo.BarcodeFormat.MAXICODE],[Io.ITF,jo.BarcodeFormat.ITF],[Io.EAN_13,jo.BarcodeFormat.EAN_13],[Io.EAN_8,jo.BarcodeFormat.EAN_8],[Io.PDF_417,jo.BarcodeFormat.PDF_417],[Io.RSS_14,jo.BarcodeFormat.RSS_14],[Io.RSS_EXPANDED,jo.BarcodeFormat.RSS_EXPANDED],[Io.UPC_A,jo.BarcodeFormat.UPC_A],[Io.UPC_E,jo.BarcodeFormat.UPC_E],[Io.UPC_EAN_EXTENSION,jo.BarcodeFormat.UPC_EAN_EXTENSION]]),this.reverseFormatMap=this.createReverseFormatMap(),!Go)throw"Use html5qrcode.min.js without edit, ZXing not found.";this.verbose=e,this.logger=r;var i=this.createZXingFormats(t),n=new Map;n.set(jo.DecodeHintType.POSSIBLE_FORMATS,i),n.set(jo.DecodeHintType.TRY_HARDER,!1),this.hints=n}return t.prototype.decodeAsync=function(t){var e=this;return new Promise(function(r,i){try{r(e.decode(t))}catch(t){i(t)}})},t.prototype.decode=function(t){var e=new jo.MultiFormatReader(this.verbose,this.hints),r=new jo.HTMLCanvasElementLuminanceSource(t),i=new jo.BinaryBitmap(new jo.HybridBinarizer(r)),n=e.decode(i);return{text:n.text,format:Mo.create(this.toHtml5QrcodeSupportedFormats(n.format)),debugData:this.createDebugData()}},t.prototype.createReverseFormatMap=function(){var t=new Map;return this.formatMap.forEach(function(e,r,i){t.set(e,r)}),t},t.prototype.toHtml5QrcodeSupportedFormats=function(t){if(!this.reverseFormatMap.has(t))throw"reverseFormatMap doesn't have ".concat(t);return this.reverseFormatMap.get(t)},t.prototype.createZXingFormats=function(t){for(var e=[],r=0,i=t;r<i.length;r++){var n=i[r];this.formatMap.has(n)?e.push(this.formatMap.get(n)):this.logger.logError("".concat(n," is not supported by")+"ZXingHtml5QrcodeShim")}return e},t.prototype.createDebugData=function(){return{decoderName:"zxing-js"}},t}(),Wo=function(t,e,r,i){return new(r||(r=Promise))(function(n,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r(function(t){t(e)})).then(s,a)}l((i=i.apply(t,e||[])).next())})},Yo=function(t,e){var r,i,n,o,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(l){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(r=1,i&&(n=2&a[0]?i.return:a[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,a[1])).done)return n;switch(i=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,i=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(n=s.trys,(n=n.length>0&&n[n.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){s.label=a[1];break}if(6===a[0]&&s.label<n[1]){s.label=n[1],n=a;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(a);break}n[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],i=0}finally{r=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}},Zo=function(){function t(e,r,i){if(this.formatMap=new Map([[Io.QR_CODE,"qr_code"],[Io.AZTEC,"aztec"],[Io.CODABAR,"codabar"],[Io.CODE_39,"code_39"],[Io.CODE_93,"code_93"],[Io.CODE_128,"code_128"],[Io.DATA_MATRIX,"data_matrix"],[Io.ITF,"itf"],[Io.EAN_13,"ean_13"],[Io.EAN_8,"ean_8"],[Io.PDF_417,"pdf417"],[Io.UPC_A,"upc_a"],[Io.UPC_E,"upc_e"]]),this.reverseFormatMap=this.createReverseFormatMap(),!t.isSupported())throw"Use html5qrcode.min.js without edit, Use BarcodeDetectorDelegate only if it isSupported();";this.verbose=r,this.logger=i;var n=this.createBarcodeDetectorFormats(e);if(this.detector=new BarcodeDetector(n),!this.detector)throw"BarcodeDetector detector not supported"}return t.isSupported=function(){return"BarcodeDetector"in window&&void 0!==new BarcodeDetector({formats:["qr_code"]})},t.prototype.decodeAsync=function(t){return Wo(this,void 0,void 0,function(){var e,r;return Yo(this,function(i){switch(i.label){case 0:return[4,this.detector.detect(t)];case 1:if(!(e=i.sent())||0===e.length)throw"No barcode or QR code detected.";return[2,{text:(r=this.selectLargestBarcode(e)).rawValue,format:Mo.create(this.toHtml5QrcodeSupportedFormats(r.format)),debugData:this.createDebugData()}]}})})},t.prototype.selectLargestBarcode=function(t){for(var e=null,r=0,i=0,n=t;i<n.length;i++){var o=n[i],s=o.boundingBox.width*o.boundingBox.height;s>r&&(r=s,e=o)}if(!e)throw"No largest barcode found";return e},t.prototype.createBarcodeDetectorFormats=function(t){for(var e=[],r=0,i=t;r<i.length;r++){var n=i[r];this.formatMap.has(n)?e.push(this.formatMap.get(n)):this.logger.warn("".concat(n," is not supported by")+"BarcodeDetectorDelegate")}return{formats:e}},t.prototype.toHtml5QrcodeSupportedFormats=function(t){if(!this.reverseFormatMap.has(t))throw"reverseFormatMap doesn't have ".concat(t);return this.reverseFormatMap.get(t)},t.prototype.createReverseFormatMap=function(){var t=new Map;return this.formatMap.forEach(function(e,r,i){t.set(e,r)}),t},t.prototype.createDebugData=function(){return{decoderName:"BarcodeDetector"}},t}(),qo=function(t,e,r,i){return new(r||(r=Promise))(function(n,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r(function(t){t(e)})).then(s,a)}l((i=i.apply(t,e||[])).next())})},Ko=function(t,e){var r,i,n,o,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(l){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(r=1,i&&(n=2&a[0]?i.return:a[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,a[1])).done)return n;switch(i=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,i=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(n=s.trys,(n=n.length>0&&n[n.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){s.label=a[1];break}if(6===a[0]&&s.label<n[1]){s.label=n[1],n=a;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(a);break}n[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],i=0}finally{r=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}},Qo=function(){function t(t,e,r,i){this.EXECUTIONS_TO_REPORT_PERFORMANCE=100,this.executions=0,this.executionResults=[],this.wasPrimaryDecoderUsedInLastDecode=!1,this.verbose=r,e&&Zo.isSupported()?(this.primaryDecoder=new Zo(t,r,i),this.secondaryDecoder=new Xo(t,r,i)):this.primaryDecoder=new Xo(t,r,i)}return t.prototype.decodeAsync=function(t){return qo(this,void 0,void 0,function(){var e;return Ko(this,function(r){switch(r.label){case 0:e=performance.now(),r.label=1;case 1:return r.trys.push([1,,3,4]),[4,this.getDecoder().decodeAsync(t)];case 2:return[2,r.sent()];case 3:return this.possiblyLogPerformance(e),[7];case 4:return[2]}})})},t.prototype.decodeRobustlyAsync=function(t){return qo(this,void 0,void 0,function(){var e,r;return Ko(this,function(i){switch(i.label){case 0:e=performance.now(),i.label=1;case 1:return i.trys.push([1,3,4,5]),[4,this.primaryDecoder.decodeAsync(t)];case 2:return[2,i.sent()];case 3:if(r=i.sent(),this.secondaryDecoder)return[2,this.secondaryDecoder.decodeAsync(t)];throw r;case 4:return this.possiblyLogPerformance(e),[7];case 5:return[2]}})})},t.prototype.getDecoder=function(){return this.secondaryDecoder?!1===this.wasPrimaryDecoderUsedInLastDecode?(this.wasPrimaryDecoderUsedInLastDecode=!0,this.primaryDecoder):(this.wasPrimaryDecoderUsedInLastDecode=!1,this.secondaryDecoder):this.primaryDecoder},t.prototype.possiblyLogPerformance=function(t){if(this.verbose){var e=performance.now()-t;this.executionResults.push(e),this.executions++,this.possiblyFlushPerformanceReport()}},t.prototype.possiblyFlushPerformanceReport=function(){if(!(this.executions<this.EXECUTIONS_TO_REPORT_PERFORMANCE)){for(var t=0,e=0,r=this.executionResults;e<r.length;e++){t+=r[e]}var i=t/this.executionResults.length;console.log("".concat(i," ms for ").concat(this.executionResults.length," last runs.")),this.executions=0,this.executionResults=[]}},t}(),Jo=(Vo=function(t,e){return Vo=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},Vo(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}Vo(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),ts=function(t,e,r,i){return new(r||(r=Promise))(function(n,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r(function(t){t(e)})).then(s,a)}l((i=i.apply(t,e||[])).next())})},es=function(t,e){var r,i,n,o,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(l){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(r=1,i&&(n=2&a[0]?i.return:a[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,a[1])).done)return n;switch(i=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,i=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(n=s.trys,(n=n.length>0&&n[n.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){s.label=a[1];break}if(6===a[0]&&s.label<n[1]){s.label=n[1],n=a;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(a);break}n[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],i=0}finally{r=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}},rs=function(){function t(t,e){this.name=t,this.track=e}return t.prototype.isSupported=function(){return!!this.track.getCapabilities&&this.name in this.track.getCapabilities()},t.prototype.apply=function(t){var e={};e[this.name]=t;var r={advanced:[e]};return this.track.applyConstraints(r)},t.prototype.value=function(){var t=this.track.getSettings();return this.name in t?t[this.name]:null},t}(),is=function(t){function e(e,r){return t.call(this,e,r)||this}return Jo(e,t),e.prototype.min=function(){return this.getCapabilities().min},e.prototype.max=function(){return this.getCapabilities().max},e.prototype.step=function(){return this.getCapabilities().step},e.prototype.apply=function(t){var e={};e[this.name]=t;var r={advanced:[e]};return this.track.applyConstraints(r)},e.prototype.getCapabilities=function(){this.failIfNotSupported();var t=this.track.getCapabilities()[this.name];return{min:t.min,max:t.max,step:t.step}},e.prototype.failIfNotSupported=function(){if(!this.isSupported())throw new Error("".concat(this.name," capability not supported"))},e}(rs),ns=function(t){function e(e){return t.call(this,"zoom",e)||this}return Jo(e,t),e}(is),os=function(t){function e(e){return t.call(this,"torch",e)||this}return Jo(e,t),e}(rs),ss=function(){function t(t){this.track=t}return t.prototype.zoomFeature=function(){return new ns(this.track)},t.prototype.torchFeature=function(){return new os(this.track)},t}(),as=function(){function t(t,e,r){this.isClosed=!1,this.parentElement=t,this.mediaStream=e,this.callbacks=r,this.surface=this.createVideoElement(this.parentElement.clientWidth),t.append(this.surface)}return t.prototype.createVideoElement=function(t){var e=document.createElement("video");return e.style.width="".concat(t,"px"),e.style.display="block",e.muted=!0,e.setAttribute("muted","true"),e.playsInline=!0,e},t.prototype.setupSurface=function(){var t=this;this.surface.onabort=function(){throw"RenderedCameraImpl video surface onabort() called"},this.surface.onerror=function(){throw"RenderedCameraImpl video surface onerror() called"};var e=function(){var r=t.surface.clientWidth,i=t.surface.clientHeight;t.callbacks.onRenderSurfaceReady(r,i),t.surface.removeEventListener("playing",e)};this.surface.addEventListener("playing",e),this.surface.srcObject=this.mediaStream,this.surface.play()},t.create=function(e,r,i,n){return ts(this,void 0,void 0,function(){var o,s;return es(this,function(a){switch(a.label){case 0:return o=new t(e,r,n),i.aspectRatio?(s={aspectRatio:i.aspectRatio},[4,o.getFirstTrackOrFail().applyConstraints(s)]):[3,2];case 1:a.sent(),a.label=2;case 2:return o.setupSurface(),[2,o]}})})},t.prototype.failIfClosed=function(){if(this.isClosed)throw"The RenderedCamera has already been closed."},t.prototype.getFirstTrackOrFail=function(){if(this.failIfClosed(),0===this.mediaStream.getVideoTracks().length)throw"No video tracks found";return this.mediaStream.getVideoTracks()[0]},t.prototype.pause=function(){this.failIfClosed(),this.surface.pause()},t.prototype.resume=function(t){this.failIfClosed();var e=this,r=function(){setTimeout(t,200),e.surface.removeEventListener("playing",r)};this.surface.addEventListener("playing",r),this.surface.play()},t.prototype.isPaused=function(){return this.failIfClosed(),this.surface.paused},t.prototype.getSurface=function(){return this.failIfClosed(),this.surface},t.prototype.getRunningTrackCapabilities=function(){return this.getFirstTrackOrFail().getCapabilities()},t.prototype.getRunningTrackSettings=function(){return this.getFirstTrackOrFail().getSettings()},t.prototype.applyVideoConstraints=function(t){return ts(this,void 0,void 0,function(){return es(this,function(e){if("aspectRatio"in t)throw"Changing 'aspectRatio' in run-time is not yet supported.";return[2,this.getFirstTrackOrFail().applyConstraints(t)]})})},t.prototype.close=function(){if(this.isClosed)return Promise.resolve();var t=this;return new Promise(function(e,r){var i=t.mediaStream.getVideoTracks().length,n=0;t.mediaStream.getVideoTracks().forEach(function(r){t.mediaStream.removeTrack(r),r.stop(),++n>=i&&(t.isClosed=!0,t.parentElement.removeChild(t.surface),e())})})},t.prototype.getCapabilities=function(){return new ss(this.getFirstTrackOrFail())},t}(),ls=function(){function t(t){this.mediaStream=t}return t.prototype.render=function(t,e,r){return ts(this,void 0,void 0,function(){return es(this,function(i){return[2,as.create(t,this.mediaStream,e,r)]})})},t.create=function(e){return ts(this,void 0,void 0,function(){var r;return es(this,function(i){switch(i.label){case 0:if(!navigator.mediaDevices)throw"navigator.mediaDevices not supported";return r={audio:!1,video:e},[4,navigator.mediaDevices.getUserMedia(r)];case 1:return[2,new t(i.sent())]}})})},t}(),cs=function(t,e,r,i){return new(r||(r=Promise))(function(n,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r(function(t){t(e)})).then(s,a)}l((i=i.apply(t,e||[])).next())})},ds=function(t,e){var r,i,n,o,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(l){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(r=1,i&&(n=2&a[0]?i.return:a[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,a[1])).done)return n;switch(i=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,i=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(n=s.trys,(n=n.length>0&&n[n.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){s.label=a[1];break}if(6===a[0]&&s.label<n[1]){s.label=n[1],n=a;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(a);break}n[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],i=0}finally{r=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}},hs=function(){function t(){}return t.failIfNotSupported=function(){return cs(this,void 0,void 0,function(){return ds(this,function(e){if(!navigator.mediaDevices)throw"navigator.mediaDevices not supported";return[2,new t]})})},t.prototype.create=function(t){return cs(this,void 0,void 0,function(){return ds(this,function(e){return[2,ls.create(t)]})})},t}(),us=function(t,e,r,i){return new(r||(r=Promise))(function(n,o){function s(t){try{l(i.next(t))}catch(t){o(t)}}function a(t){try{l(i.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r(function(t){t(e)})).then(s,a)}l((i=i.apply(t,e||[])).next())})},ps=function(t,e){var r,i,n,o,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(l){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(r=1,i&&(n=2&a[0]?i.return:a[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,a[1])).done)return n;switch(i=0,n&&(a=[2&a[0],n.value]),a[0]){case 0:case 1:n=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,i=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(n=s.trys,(n=n.length>0&&n[n.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!n||a[1]>n[0]&&a[1]<n[3])){s.label=a[1];break}if(6===a[0]&&s.label<n[1]){s.label=n[1],n=a;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(a);break}n[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],i=0}finally{r=n=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}},fs=function(){function t(){}return t.retrieve=function(){if(navigator.mediaDevices)return t.getCamerasFromMediaDevices();var e=MediaStreamTrack;return MediaStreamTrack&&e.getSources?t.getCamerasFromMediaStreamTrack():t.rejectWithError()},t.rejectWithError=function(){var e=$o.unableToQuerySupportedDevices();return t.isHttpsOrLocalhost()||(e=$o.insecureContextCameraQueryError()),Promise.reject(e)},t.isHttpsOrLocalhost=function(){if("https:"===location.protocol)return!0;var t=location.host.split(":")[0];return"127.0.0.1"===t||"localhost"===t},t.getCamerasFromMediaDevices=function(){return us(this,void 0,void 0,function(){var t,e,r,i,n,o,s;return ps(this,function(a){switch(a.label){case 0:return t=function(t){for(var e=0,r=t.getVideoTracks();e<r.length;e++){var i=r[e];i.enabled=!1,i.stop(),t.removeTrack(i)}},[4,navigator.mediaDevices.getUserMedia({audio:!1,video:!0})];case 1:return e=a.sent(),[4,navigator.mediaDevices.enumerateDevices()];case 2:for(r=a.sent(),i=[],n=0,o=r;n<o.length;n++)"videoinput"===(s=o[n]).kind&&i.push({id:s.deviceId,label:s.label});return t(e),[2,i]}})})},t.getCamerasFromMediaStreamTrack=function(){return new Promise(function(t,e){MediaStreamTrack.getSources(function(e){for(var r=[],i=0,n=e;i<n.length;i++){var o=n[i];"video"===o.kind&&r.push({id:o.id,label:o.label})}t(r)})})},t}();!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.NOT_STARTED=1]="NOT_STARTED",t[t.SCANNING=2]="SCANNING",t[t.PAUSED=3]="PAUSED"}(zo||(zo={}));var gs,ms=function(){function t(){this.state=zo.NOT_STARTED,this.onGoingTransactionNewState=zo.UNKNOWN}return t.prototype.directTransition=function(t){this.failIfTransitionOngoing(),this.validateTransition(t),this.state=t},t.prototype.startTransition=function(t){return this.failIfTransitionOngoing(),this.validateTransition(t),this.onGoingTransactionNewState=t,this},t.prototype.execute=function(){if(this.onGoingTransactionNewState===zo.UNKNOWN)throw"Transaction is already cancelled, cannot execute().";var t=this.onGoingTransactionNewState;this.onGoingTransactionNewState=zo.UNKNOWN,this.directTransition(t)},t.prototype.cancel=function(){if(this.onGoingTransactionNewState===zo.UNKNOWN)throw"Transaction is already cancelled, cannot cancel().";this.onGoingTransactionNewState=zo.UNKNOWN},t.prototype.getState=function(){return this.state},t.prototype.failIfTransitionOngoing=function(){if(this.onGoingTransactionNewState!==zo.UNKNOWN)throw"Cannot transition to a new state, already under transition"},t.prototype.validateTransition=function(t){switch(this.state){case zo.UNKNOWN:throw"Transition from unknown is not allowed";case zo.NOT_STARTED:this.failIfNewStateIs(t,[zo.PAUSED]);case zo.SCANNING:case zo.PAUSED:}},t.prototype.failIfNewStateIs=function(t,e){for(var r=0,i=e;r<i.length;r++){if(t===i[r])throw"Cannot transition from ".concat(this.state," to ").concat(t)}},t}(),ws=function(){function t(t){this.stateManager=t}return t.prototype.startTransition=function(t){return this.stateManager.startTransition(t)},t.prototype.directTransition=function(t){this.stateManager.directTransition(t)},t.prototype.getState=function(){return this.stateManager.getState()},t.prototype.canScanFile=function(){return this.stateManager.getState()===zo.NOT_STARTED},t.prototype.isScanning=function(){return this.stateManager.getState()!==zo.NOT_STARTED},t.prototype.isStrictlyScanning=function(){return this.stateManager.getState()===zo.SCANNING},t.prototype.isPaused=function(){return this.stateManager.getState()===zo.PAUSED},t}(),bs=function(){function t(){}return t.create=function(){return new ws(new ms)},t}(),ys=function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},t(e,r)};return function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),_s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return ys(e,t),e.DEFAULT_WIDTH=300,e.DEFAULT_WIDTH_OFFSET=2,e.FILE_SCAN_MIN_HEIGHT=300,e.FILE_SCAN_HIDDEN_CANVAS_PADDING=100,e.MIN_QR_BOX_SIZE=50,e.SHADED_LEFT=1,e.SHADED_RIGHT=2,e.SHADED_TOP=3,e.SHADED_BOTTOM=4,e.SHADED_REGION_ELEMENT_ID="qr-shaded-region",e.VERBOSE=!1,e.BORDER_SHADER_DEFAULT_COLOR="#ffffff",e.BORDER_SHADER_MATCH_COLOR="rgb(90, 193, 56)",e}(Po),Es=function(){function t(t,e){this.logger=e,this.fps=_s.SCAN_DEFAULT_FPS,t?(t.fps&&(this.fps=t.fps),this.disableFlip=!0===t.disableFlip,this.qrbox=t.qrbox,this.aspectRatio=t.aspectRatio,this.videoConstraints=t.videoConstraints):this.disableFlip=_s.DEFAULT_DISABLE_FLIP}return t.prototype.isMediaStreamConstraintsValid=function(){return this.videoConstraints?Uo.isMediaStreamConstraintsValid(this.videoConstraints,this.logger):(this.logger.logError("Empty videoConstraints",!0),!1)},t.prototype.isShadedBoxEnabled=function(){return!Fo(this.qrbox)},t.create=function(e,r){return new t(e,r)},t}(),Cs=function(){function t(t,e){if(this.element=null,this.canvasElement=null,this.scannerPausedUiElement=null,this.hasBorderShaders=null,this.borderShaders=null,this.qrMatch=null,this.renderedCamera=null,this.qrRegion=null,this.context=null,this.lastScanImageFile=null,this.isScanning=!1,!document.getElementById(t))throw"HTML Element with id=".concat(t," not found");var r;this.elementId=t,this.verbose=!1,"boolean"==typeof e?this.verbose=!0===e:e&&(r=e,this.verbose=!0===r.verbose,r.experimentalFeatures),this.logger=new Lo(this.verbose),this.qrcode=new Qo(this.getSupportedFormats(e),this.getUseBarCodeDetectorIfSupported(r),this.verbose,this.logger),this.foreverScanTimeout,this.shouldScan=!0,this.stateManagerProxy=bs.create()}return t.prototype.start=function(t,e,r,i){var n,o=this;if(!t)throw"cameraIdOrConfig is required";if(!r||"function"!=typeof r)throw"qrCodeSuccessCallback is required and should be a function.";n=i||(this.verbose?this.logger.log:function(){});var s=Es.create(e,this.logger);this.clearElement();var a=!1;s.videoConstraints&&(s.isMediaStreamConstraintsValid()?a=!0:this.logger.logError("'videoConstraints' is not valid 'MediaStreamConstraints, it will be ignored.'",!0));var l=a,c=document.getElementById(this.elementId);c.clientWidth?c.clientWidth:_s.DEFAULT_WIDTH,c.style.position="relative",this.shouldScan=!0,this.element=c;var d=this,h=this.stateManagerProxy.startTransition(zo.SCANNING);return new Promise(function(e,i){var a=l?s.videoConstraints:d.createVideoConstraints(t);if(!a)return h.cancel(),void i("videoConstraints should be defined");var c={};l&&!s.aspectRatio||(c.aspectRatio=s.aspectRatio);var u={onRenderSurfaceReady:function(t,e){d.setupUi(t,e,s),d.isScanning=!0,d.foreverScan(s,r,n)}};hs.failIfNotSupported().then(function(t){t.create(a).then(function(t){return t.render(o.element,c,u).then(function(t){d.renderedCamera=t,h.execute(),e(null)}).catch(function(t){h.cancel(),i(t)})}).catch(function(t){h.cancel(),i($o.errorGettingUserMedia(t))})}).catch(function(t){h.cancel(),i($o.cameraStreamingNotSupported())})})},t.prototype.pause=function(t){if(!this.stateManagerProxy.isStrictlyScanning())throw"Cannot pause, scanner is not scanning.";this.stateManagerProxy.directTransition(zo.PAUSED),this.showPausedState(),(Fo(t)||!0!==t)&&(t=!1),t&&this.renderedCamera&&this.renderedCamera.pause()},t.prototype.resume=function(){if(!this.stateManagerProxy.isPaused())throw"Cannot result, scanner is not paused.";if(!this.renderedCamera)throw"renderedCamera doesn't exist while trying resume()";var t=this,e=function(){t.stateManagerProxy.directTransition(zo.SCANNING),t.hidePausedState()};this.renderedCamera.isPaused()?this.renderedCamera.resume(function(){e()}):e()},t.prototype.getState=function(){return this.stateManagerProxy.getState()},t.prototype.stop=function(){var t=this;if(!this.stateManagerProxy.isScanning())throw"Cannot stop, scanner is not running or paused.";var e=this.stateManagerProxy.startTransition(zo.NOT_STARTED);this.shouldScan=!1,this.foreverScanTimeout&&clearTimeout(this.foreverScanTimeout);var r=this;return this.renderedCamera.close().then(function(){return r.renderedCamera=null,r.element&&(r.element.removeChild(r.canvasElement),r.canvasElement=null),function(){if(t.element){var e=document.getElementById(_s.SHADED_REGION_ELEMENT_ID);e&&t.element.removeChild(e)}}(),r.qrRegion&&(r.qrRegion=null),r.context&&(r.context=null),e.execute(),r.hidePausedState(),r.isScanning=!1,Promise.resolve()})},t.prototype.scanFile=function(t,e){return this.scanFileV2(t,e).then(function(t){return t.decodedText})},t.prototype.scanFileV2=function(t,e){var r=this;if(!(t&&t instanceof File))throw"imageFile argument is mandatory and should be instance of File. Use 'event.target.files[0]'.";if(Fo(e)&&(e=!0),!this.stateManagerProxy.canScanFile())throw"Cannot start file scan - ongoing camera scan";return new Promise(function(i,n){r.possiblyCloseLastScanImageFile(),r.clearElement(),r.lastScanImageFile=URL.createObjectURL(t);var o=new Image;o.onload=function(){var t=o.width,s=o.height,a=document.getElementById(r.elementId),l=a.clientWidth?a.clientWidth:_s.DEFAULT_WIDTH,c=Math.max(a.clientHeight?a.clientHeight:s,_s.FILE_SCAN_MIN_HEIGHT),d=r.computeCanvasDrawConfig(t,s,l,c);if(e){var h=r.createCanvasElement(l,c,"qr-canvas-visible");h.style.display="inline-block",a.appendChild(h);var u=h.getContext("2d");if(!u)throw"Unable to get 2d context from canvas";u.canvas.width=l,u.canvas.height=c,u.drawImage(o,0,0,t,s,d.x,d.y,d.width,d.height)}var p=_s.FILE_SCAN_HIDDEN_CANVAS_PADDING,f=Math.max(o.width,d.width),g=Math.max(o.height,d.height),m=f+2*p,w=g+2*p,b=r.createCanvasElement(m,w);a.appendChild(b);var y=b.getContext("2d");if(!y)throw"Unable to get 2d context from canvas";y.canvas.width=m,y.canvas.height=w,y.drawImage(o,0,0,t,s,p,p,f,g);try{r.qrcode.decodeRobustlyAsync(b).then(function(t){i(ko.createFromQrcodeResult(t))}).catch(n)}catch(t){n("QR code parse error, error = ".concat(t))}},o.onerror=n,o.onabort=n,o.onstalled=n,o.onsuspend=n,o.src=URL.createObjectURL(t)})},t.prototype.clear=function(){this.clearElement()},t.getCameras=function(){return fs.retrieve()},t.prototype.getRunningTrackCapabilities=function(){return this.getRenderedCameraOrFail().getRunningTrackCapabilities()},t.prototype.getRunningTrackSettings=function(){return this.getRenderedCameraOrFail().getRunningTrackSettings()},t.prototype.getRunningTrackCameraCapabilities=function(){return this.getRenderedCameraOrFail().getCapabilities()},t.prototype.applyVideoConstraints=function(t){if(!t)throw"videoConstaints is required argument.";if(!Uo.isMediaStreamConstraintsValid(t,this.logger))throw"invalid videoConstaints passed, check logs for more details";return this.getRenderedCameraOrFail().applyVideoConstraints(t)},t.prototype.getRenderedCameraOrFail=function(){if(null==this.renderedCamera)throw"Scanning is not in running state, call this API only when QR code scanning using camera is in running state.";return this.renderedCamera},t.prototype.getSupportedFormats=function(t){var e=[Io.QR_CODE,Io.AZTEC,Io.CODABAR,Io.CODE_39,Io.CODE_93,Io.CODE_128,Io.DATA_MATRIX,Io.MAXICODE,Io.ITF,Io.EAN_13,Io.EAN_8,Io.PDF_417,Io.RSS_14,Io.RSS_EXPANDED,Io.UPC_A,Io.UPC_E,Io.UPC_EAN_EXTENSION];if(!t||"boolean"==typeof t)return e;if(!t.formatsToSupport)return e;if(!Array.isArray(t.formatsToSupport))throw"configOrVerbosityFlag.formatsToSupport should be undefined or an array.";if(0===t.formatsToSupport.length)throw"Atleast 1 formatsToSupport is needed.";for(var r=[],i=0,n=t.formatsToSupport;i<n.length;i++){var o=n[i];No(o)?r.push(o):this.logger.warn("Invalid format: ".concat(o," passed in config, ignoring."))}if(0===r.length)throw"None of formatsToSupport match supported values.";return r},t.prototype.getUseBarCodeDetectorIfSupported=function(t){if(Fo(t))return!0;if(!Fo(t.useBarCodeDetectorIfSupported))return!1!==t.useBarCodeDetectorIfSupported;if(Fo(t.experimentalFeatures))return!0;var e=t.experimentalFeatures;return!!Fo(e.useBarCodeDetectorIfSupported)||!1!==e.useBarCodeDetectorIfSupported},t.prototype.validateQrboxSize=function(t,e,r){var i=this,n=r.qrbox;this.validateQrboxConfig(n);var o,s=this.toQrdimensions(t,e,n),a=function(t){if(t<_s.MIN_QR_BOX_SIZE)throw"minimum size of 'config.qrbox' dimension value is"+" ".concat(_s.MIN_QR_BOX_SIZE,"px.")};a(s.width),a(s.height),s.width=((o=s.width)>t&&(i.logger.warn("`qrbox.width` or `qrbox` is larger than the width of the root element. The width will be truncated to the width of root element."),o=t),o)},t.prototype.validateQrboxConfig=function(t){if("number"!=typeof t&&"function"!=typeof t&&(void 0===t.width||void 0===t.height))throw"Invalid instance of QrDimensions passed for 'config.qrbox'. Both 'width' and 'height' should be set."},t.prototype.toQrdimensions=function(t,e,r){if("number"==typeof r)return{width:r,height:r};if("function"==typeof r)try{return r(t,e)}catch(t){throw new Error("qrbox config was passed as a function but it failed with unknown error"+t)}return r},t.prototype.setupUi=function(t,e,r){r.isShadedBoxEnabled()&&this.validateQrboxSize(t,e,r);var i=Fo(r.qrbox)?{width:t,height:e}:r.qrbox;this.validateQrboxConfig(i);var n=this.toQrdimensions(t,e,i);n.height>e&&this.logger.warn("[Html5Qrcode] config.qrbox has height that isgreater than the height of the video stream. Shading will be ignored");var o=r.isShadedBoxEnabled()&&n.height<=e,s={x:0,y:0,width:t,height:e},a=o?this.getShadedRegionBounds(t,e,n):s,l=this.createCanvasElement(a.width,a.height),c=l.getContext("2d",{willReadFrequently:!0});c.canvas.width=a.width,c.canvas.height=a.height,this.element.append(l),o&&this.possiblyInsertShadingElement(this.element,t,e,n),this.createScannerPausedUiElement(this.element),this.qrRegion=a,this.context=c,this.canvasElement=l},t.prototype.createScannerPausedUiElement=function(t){var e=document.createElement("div");e.innerText=$o.scannerPaused(),e.style.display="none",e.style.position="absolute",e.style.top="0px",e.style.zIndex="1",e.style.background="rgba(9, 9, 9, 0.46)",e.style.color="#FFECEC",e.style.textAlign="center",e.style.width="100%",t.appendChild(e),this.scannerPausedUiElement=e},t.prototype.scanContext=function(t,e){var r=this;return this.stateManagerProxy.isPaused()?Promise.resolve(!1):this.qrcode.decodeAsync(this.canvasElement).then(function(e){return t(e.text,ko.createFromQrcodeResult(e)),r.possiblyUpdateShaders(!0),!0}).catch(function(t){r.possiblyUpdateShaders(!1);var i=$o.codeParseError(t);return e(i,Bo.createFrom(i)),!1})},t.prototype.foreverScan=function(t,e,r){var i=this;if(this.shouldScan&&this.renderedCamera){var n=this.renderedCamera.getSurface(),o=n.videoWidth/n.clientWidth,s=n.videoHeight/n.clientHeight;if(!this.qrRegion)throw"qrRegion undefined when localMediaStream is ready.";var a=this.qrRegion.width*o,l=this.qrRegion.height*s,c=this.qrRegion.x*o,d=this.qrRegion.y*s;this.context.drawImage(n,c,d,a,l,0,0,this.qrRegion.width,this.qrRegion.height);var h=function(){i.foreverScanTimeout=setTimeout(function(){i.foreverScan(t,e,r)},i.getTimeoutFps(t.fps))};this.scanContext(e,r).then(function(n){n||!0===t.disableFlip?h():(i.context.translate(i.context.canvas.width,0),i.context.scale(-1,1),i.scanContext(e,r).finally(function(){h()}))}).catch(function(t){i.logger.logError("Error happend while scanning context",t),h()})}},t.prototype.createVideoConstraints=function(t){if("string"==typeof t)return{deviceId:{exact:t}};if("object"==typeof t){var e="facingMode",r="deviceId",i={user:!0,environment:!0},n="exact",o=function(t){if(t in i)return!0;throw"config has invalid 'facingMode' value = "+"'".concat(t,"'")},s=Object.keys(t);if(1!==s.length)throw"'cameraIdOrConfig' object should have exactly 1 key,"+" if passed as an object, found ".concat(s.length," keys");var a=Object.keys(t)[0];if(a!==e&&a!==r)throw"Only '".concat(e,"' and '").concat(r,"' ")+" are supported for 'cameraIdOrConfig'";if(a!==e){var l=t.deviceId;if("string"==typeof l)return{deviceId:l};if("object"==typeof l){if(n in l)return{deviceId:{exact:l["".concat(n)]}};throw"'deviceId' should be string or object with"+" ".concat(n," as key.")}throw"Invalid type of 'deviceId' = ".concat(typeof l)}var c=t.facingMode;if("string"==typeof c){if(o(c))return{facingMode:c}}else{if("object"!=typeof c)throw"Invalid type of 'facingMode' = ".concat(typeof c);if(!(n in c))throw"'facingMode' should be string or object with"+" ".concat(n," as key.");if(o(c["".concat(n)]))return{facingMode:{exact:c["".concat(n)]}}}}throw"Invalid type of 'cameraIdOrConfig' = ".concat(typeof t)},t.prototype.computeCanvasDrawConfig=function(t,e,r,i){if(t<=r&&e<=i)return{x:(r-t)/2,y:(i-e)/2,width:t,height:e};var n=t,o=e;return t>r&&(e*=r/t,t=r),e>i&&(t*=i/e,e=i),this.logger.log("Image downsampled from "+"".concat(n,"X").concat(o)+" to ".concat(t,"X").concat(e,".")),this.computeCanvasDrawConfig(t,e,r,i)},t.prototype.clearElement=function(){if(this.stateManagerProxy.isScanning())throw"Cannot clear while scan is ongoing, close it first.";var t=document.getElementById(this.elementId);t&&(t.innerHTML="")},t.prototype.possiblyUpdateShaders=function(t){this.qrMatch!==t&&(this.hasBorderShaders&&this.borderShaders&&this.borderShaders.length&&this.borderShaders.forEach(function(e){e.style.backgroundColor=t?_s.BORDER_SHADER_MATCH_COLOR:_s.BORDER_SHADER_DEFAULT_COLOR}),this.qrMatch=t)},t.prototype.possiblyCloseLastScanImageFile=function(){this.lastScanImageFile&&(URL.revokeObjectURL(this.lastScanImageFile),this.lastScanImageFile=null)},t.prototype.createCanvasElement=function(t,e,r){var i=t,n=e,o=document.createElement("canvas");return o.style.width="".concat(i,"px"),o.style.height="".concat(n,"px"),o.style.display="none",o.id=Fo(r)?"qr-canvas":r,o},t.prototype.getShadedRegionBounds=function(t,e,r){if(r.width>t||r.height>e)throw"'config.qrbox' dimensions should not be greater than the dimensions of the root HTML element.";return{x:(t-r.width)/2,y:(e-r.height)/2,width:r.width,height:r.height}},t.prototype.possiblyInsertShadingElement=function(t,e,r,i){if(!(e-i.width<1||r-i.height<1)){var n=document.createElement("div");n.style.position="absolute";var o=(e-i.width)/2,s=(r-i.height)/2;if(n.style.borderLeft="".concat(o,"px solid rgba(0, 0, 0, 0.48)"),n.style.borderRight="".concat(o,"px solid rgba(0, 0, 0, 0.48)"),n.style.borderTop="".concat(s,"px solid rgba(0, 0, 0, 0.48)"),n.style.borderBottom="".concat(s,"px solid rgba(0, 0, 0, 0.48)"),n.style.boxSizing="border-box",n.style.top="0px",n.style.bottom="0px",n.style.left="0px",n.style.right="0px",n.id="".concat(_s.SHADED_REGION_ELEMENT_ID),e-i.width<11||r-i.height<11)this.hasBorderShaders=!1;else{var a=40;this.insertShaderBorders(n,a,5,-5,null,0,!0),this.insertShaderBorders(n,a,5,-5,null,0,!1),this.insertShaderBorders(n,a,5,null,-5,0,!0),this.insertShaderBorders(n,a,5,null,-5,0,!1),this.insertShaderBorders(n,5,45,-5,null,-5,!0),this.insertShaderBorders(n,5,45,null,-5,-5,!0),this.insertShaderBorders(n,5,45,-5,null,-5,!1),this.insertShaderBorders(n,5,45,null,-5,-5,!1),this.hasBorderShaders=!0}t.append(n)}},t.prototype.insertShaderBorders=function(t,e,r,i,n,o,s){var a=document.createElement("div");a.style.position="absolute",a.style.backgroundColor=_s.BORDER_SHADER_DEFAULT_COLOR,a.style.width="".concat(e,"px"),a.style.height="".concat(r,"px"),null!==i&&(a.style.top="".concat(i,"px")),null!==n&&(a.style.bottom="".concat(n,"px")),s?a.style.left="".concat(o,"px"):a.style.right="".concat(o,"px"),this.borderShaders||(this.borderShaders=[]),this.borderShaders.push(a),t.appendChild(a)},t.prototype.showPausedState=function(){if(!this.scannerPausedUiElement)throw"[internal error] scanner paused UI element not found";this.scannerPausedUiElement.style.display="block"},t.prototype.hidePausedState=function(){if(!this.scannerPausedUiElement)throw"[internal error] scanner paused UI element not found";this.scannerPausedUiElement.style.display="none"},t.prototype.getTimeoutFps=function(t){return 1e3/t},t}();!function(t){t[t.STATUS_DEFAULT=0]="STATUS_DEFAULT",t[t.STATUS_SUCCESS=1]="STATUS_SUCCESS",t[t.STATUS_WARNING=2]="STATUS_WARNING",t[t.STATUS_REQUESTING_PERMISSION=3]="STATUS_REQUESTING_PERMISSION"}(gs||(gs={}));class vs extends st{static properties={api:{type:Object},cards:{type:Array},showAddDialog:{type:Boolean},showEditDialog:{type:Boolean},showFullscreenCard:{type:Boolean},editingCard:{type:Object},fullscreenCard:{type:Object},newCard:{type:Object}};constructor(){super(),this.cards=[],this.showAddDialog=!1,this.showEditDialog=!1,this.showFullscreenCard=!1,this.editingCard=null,this.fullscreenCard=null,this.newCard={name:"",number:"",barcode:"",logo:"",notes:"",color:"#9fa8da"},this._scannerInstance=null,this.loadCards()}disconnectedCallback(){super.disconnectedCallback(),this.stopBarcodeScanner()}startBarcodeScanner(t){const e=document.createElement("div");e.id="slm-barcode-scanner-host",Object.assign(e.style,{position:"fixed",top:"0",left:"0",right:"0",bottom:"0",zIndex:"99999",background:"#000",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"});const r=document.createElement("p");r.textContent="Point camera at barcode",Object.assign(r.style,{color:"#fff",fontSize:"16px",margin:"0 0 12px 0"});const i=document.createElement("div");i.id="slm-scanner-region",Object.assign(i.style,{width:"100%",maxWidth:"400px"});const n=document.createElement("button");n.textContent="✕ Cancel",Object.assign(n.style,{marginTop:"20px",padding:"10px 28px",fontSize:"16px",fontWeight:"600",background:"#fff",color:"#333",border:"none",borderRadius:"10px",cursor:"pointer"}),n.onclick=()=>this.stopBarcodeScanner(),e.append(r,i,n),document.body.appendChild(e),this._scannerInstance=new Cs("slm-scanner-region"),this._scannerInstance.start({facingMode:"environment"},{fps:10,qrbox:{width:280,height:120}},e=>{t?this.editingCard={...this.editingCard,number:e,barcode:e}:this.newCard={...this.newCard,number:e,barcode:e},this.stopBarcodeScanner()},()=>{}).catch(t=>{console.warn("Scanner failed to start:",t),this.stopBarcodeScanner()})}stopBarcodeScanner(){this._scannerInstance&&(this._scannerInstance.stop().catch(()=>{}),this._scannerInstance=null),document.getElementById("slm-barcode-scanner-host")?.remove()}loadCards(){const t=localStorage.getItem("slm_loyalty_cards");this.cards=t?JSON.parse(t):[]}saveCards(){localStorage.setItem("slm_loyalty_cards",JSON.stringify(this.cards))}handleAddCard(){this.newCard={name:"",number:"",barcode:"",logo:"",notes:"",color:"#9fa8da"},this.showAddDialog=!0}handleSaveNewCard(t){t.preventDefault();const e=new FormData(t.target),r={id:Date.now().toString(),name:e.get("name"),number:e.get("number"),barcode:e.get("barcode")||this.generateBarcode(e.get("number")),logo:e.get("logo")||"",notes:e.get("notes")||"",color:e.get("color")||"#9fa8da"};this.cards=[...this.cards,r],this.saveCards(),this.showAddDialog=!1}handleEditCard(t){this.editingCard={...t},this.showEditDialog=!0}handleSaveEditCard(t){t.preventDefault();const e=new FormData(t.target),r={...this.editingCard,name:e.get("name"),number:e.get("number"),barcode:e.get("barcode")||this.generateBarcode(e.get("number")),logo:e.get("logo")||"",notes:e.get("notes")||"",color:e.get("color")};this.cards=this.cards.map(t=>t.id===r.id?r:t),this.saveCards(),this.showEditDialog=!1,this.editingCard=null}handleDeleteCard(t){confirm("Delete this loyalty card?")&&(this.cards=this.cards.filter(e=>e.id!==t),this.saveCards(),this.showEditDialog=!1,this.editingCard=null)}handleDuplicateCard(t){const e={...t,id:Date.now().toString(),name:`${t.name} (Copy)`};this.cards=[...this.cards,e],this.saveCards()}handleCardClick(t){this.fullscreenCard=t,this.showFullscreenCard=!0}updated(t){if(super.updated(t),this.showFullscreenCard&&this.fullscreenCard?.barcode){const t=this.shadowRoot.getElementById("barcode-svg");if(t)try{To(t,this.fullscreenCard.barcode,{format:"CODE128",width:2,height:80,displayValue:!0,fontSize:20,background:"#ffffff",lineColor:"#000000"})}catch(t){console.warn("Barcode generation failed:",t)}}}generateBarcode(t){return t.replace(/\D/g,"")}render(){return V`
      <div class="loyalty-view">
        <div class="header">
          <h2>Loyalty Cards</h2>
          <button class="add-btn" @click=${this.handleAddCard}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>

        ${0===this.cards.length?V`
          <div class="empty">
            <div class="empty-emoji">💳</div>
            <p>No loyalty cards yet</p>
            <p class="hint">Add your store loyalty cards for quick access</p>
          </div>
        `:V`
          <div class="cards-grid">
            ${this.cards.map(t=>V`
              <div class="loyalty-card" style="background: ${t.color}" @click=${()=>this.handleCardClick(t)}>
                <button class="menu-btn" @click=${e=>{e.stopPropagation(),this.handleEditCard(t)}}>
                  <ha-icon icon="mdi:dots-vertical"></ha-icon>
                </button>
                
                <div class="card-body">
                  ${t.logo?V`
                    <img src="${t.logo}" alt="${t.name}" class="card-logo">
                  `:""}
                  <h3>${t.name}</h3>
                  <div class="card-number">${t.number}</div>
                  ${t.barcode?V`
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
    `}renderDialog(t){const e=t?this.editingCard:this.newCard;return V`
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
              <div class="scan-row">
                <input type="text" name="number" placeholder="Card/Member number" .value=${e.number} required />
                <button type="button" class="scan-btn" title="Scan barcode" @click=${()=>this.startBarcodeScanner(t)}>📷</button>
              </div>
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
            ${t?V`
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
    `}renderFullscreen(){const t=this.fullscreenCard;return V`
      <div class="fullscreen-overlay" @click=${()=>this.showFullscreenCard=!1}>
        <div class="fullscreen-card">
          <h2>${t.name}</h2>
          <div class="fullscreen-number">${t.number}</div>
          ${t.barcode?V`
            <div class="fullscreen-barcode">
              <div class="barcode-display">
                <svg id="barcode-svg"></svg>
              </div>
            </div>
          `:""}
          <p class="tap-hint">Tap anywhere to close</p>
        </div>
      </div>
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
    .scan-row {
      display: flex;
      gap: 8px;
      align-items: stretch;
      margin-top: 6px;
    }
    .scan-row input {
      flex: 1;
      margin-top: 0;
    }
    .scan-btn {
      flex-shrink: 0;
      padding: 0 14px;
      font-size: 20px;
      background: var(--slm-bg-main, #fafbfc);
      border: 2px solid var(--slm-border-subtle);
      border-radius: 8px;
      cursor: pointer;
      line-height: 1;
      -webkit-tap-highlight-color: transparent;
    }
    .scan-btn:active {
      background: var(--slm-border-subtle);
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
  `}customElements.define("slm-loyalty-cards-view",vs);class As extends st{static properties={hass:{type:Object}};render(){return V`
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
  `}customElements.define("slm-profile-settings",As);class Ss extends st{static properties={currentMode:{type:String}};handleSelect(t){this.dispatchEvent(new CustomEvent("mode-selected",{detail:{mode:t},bubbles:!0,composed:!0}))}render(){return V`
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
              ${"on"===this.currentMode?V`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              `:""}
            </button>

            <button 
              class="mode-option ${"off"===this.currentMode?"selected":""}"
              @click=${()=>this.handleSelect("off")}
            >
              <ha-icon icon="mdi:weather-sunny"></ha-icon>
              <span>Off</span>
              ${"off"===this.currentMode?V`
                <ha-icon class="check" icon="mdi:check"></ha-icon>
              `:""}
            </button>

            <button 
              class="mode-option ${"system"===this.currentMode?"selected":""}"
              @click=${()=>this.handleSelect("system")}
            >
              <ha-icon icon="mdi:cellphone"></ha-icon>
              <span>As on Device</span>
              ${"system"===this.currentMode?V`
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
  `}customElements.define("slm-dark-mode-popup",Ss);class Is extends st{static properties={currentFont:{type:String}};fonts=[{name:"System Default",value:"system"},{name:"Roboto",value:"Roboto, sans-serif"},{name:"Open Sans",value:'"Open Sans", sans-serif'},{name:"Lato",value:"Lato, sans-serif"},{name:"Montserrat",value:"Montserrat, sans-serif"},{name:"Inter",value:"Inter, sans-serif"}];handleSelect(t){this.dispatchEvent(new CustomEvent("font-selected",{detail:{font:t},bubbles:!0,composed:!0}))}render(){return V`
      <div class="overlay" @click=${()=>this.dispatchEvent(new Event("close"))}>
        <div class="popup" @click=${t=>t.stopPropagation()}>
          <div class="popup-header">
            <h3>Font Family</h3>
          </div>

          <div class="popup-content">
            ${this.fonts.map(t=>V`
              <button 
                class="font-option ${this.currentFont===t.value?"selected":""}"
                style="font-family: ${t.value}"
                @click=${()=>this.handleSelect(t.value)}
              >
                <span>${t.name}</span>
                ${this.currentFont===t.value?V`
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
  `}customElements.define("font-settings",Is);class Ts extends st{static properties={settings:{type:Object},showDarkModePopup:{type:Boolean},showFontSettings:{type:Boolean}};constructor(){super(),this.showDarkModePopup=!1,this.showFontSettings=!1}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}render(){return V`
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
                ${[2,3,4,5].map(t=>V`
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

          ${this.settings.useSystemTextSize?"":V`
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

        ${this.showDarkModePopup?V`
          <slm-dark-mode-popup
            .currentMode=${this.settings.darkMode}
            @mode-selected=${t=>{this.handleSettingChange("darkMode",t.detail.mode),this.showDarkModePopup=!1}}
            @close=${()=>this.showDarkModePopup=!1}
          ></slm-dark-mode-popup>
        `:""}

        ${this.showFontSettings?V`
          <slm-font-settings
            .currentFont=${this.settings.fontFamily}
            @font-selected=${t=>{this.handleSettingChange("fontFamily",t.detail.font),this.showFontSettings=!1}}
            @close=${()=>this.showFontSettings=!1}
          ></slm-font-settings>
        `:""}
      </div>
    `}getDarkModeLabel(){switch(this.settings.darkMode){case"on":return"On";case"off":return"Off";default:return"As on Device"}}static styles=o`
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
  `}customElements.define("slm-appearance-settings",Ts);class xs extends st{static properties={settings:{type:Object}};handleSettingChange(t,e){const r={...this.settings.notifications,[t]:e};this.dispatchEvent(new CustomEvent("settings-changed",{detail:{notifications:r},bubbles:!0,composed:!0}))}render(){return V`
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
  `}customElements.define("slm-notification-settings",xs);class Rs extends st{static properties={api:{type:Object},categories:{type:Array},showAddDialog:{type:Boolean},newCategory:{type:Object}};constructor(){super(),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"}}handleAddCategory(){this.showAddDialog=!0}async handleSaveCategory(){this.newCategory.name.trim()&&(alert("Category management coming soon!"),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"})}render(){return V`
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
          ${this.categories.map(t=>V`
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

        ${this.showAddDialog?V`
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
  `}customElements.define("slm-category-settings",Rs);class Os extends st{render(){return V`
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
  `}customElements.define("slm-support-settings",Os);class Ns extends st{static properties={hass:{type:Object},api:{type:Object},settings:{type:Object},categories:{type:Array},currentSection:{type:String}};constructor(){super(),this.currentSection="main"}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}handleNavigation(t){this.currentSection=t}renderMainSettings(){return V`
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
    `}render(){switch(this.currentSection){case"profile":return V`
          <slm-profile-settings
            .hass=${this.hass}
            @back=${()=>this.currentSection="main"}
          ></slm-profile-settings>
        `;case"appearance":return V`
          <slm-appearance-settings
            .settings=${this.settings}
            @settings-changed=${t=>this.dispatchEvent(t)}
            @back=${()=>this.currentSection="main"}
          ></slm-appearance-settings>
        `;case"notifications":return V`
          <slm-notification-settings
            .settings=${this.settings}
            @settings-changed=${t=>this.dispatchEvent(t)}
            @back=${()=>this.currentSection="main"}
          ></slm-notification-settings>
        `;case"categories":return V`
          <slm-category-settings
            .api=${this.api}
            .categories=${this.categories}
            @back=${()=>this.currentSection="main"}
          ></slm-category-settings>
        `;case"support":return V`
          <slm-support-settings
            @back=${()=>this.currentSection="main"}
          ></slm-support-settings>
        `;default:return this.renderMainSettings()}}static styles=o`
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
  `}customElements.define("slm-settings-view",Ns);class Ds extends st{static properties={hass:{type:Object},config:{type:Object},currentView:{type:String},lists:{type:Array},activeList:{type:Object},items:{type:Array},categories:{type:Array},total:{type:Object},loading:{type:Boolean},showAddDialog:{type:Boolean},showEditDialog:{type:Boolean},editingItem:{type:Object},settings:{type:Object},cardId:{type:String}};set hass(t){this._hass=t,this.api&&(this.api.hass=t),t?.config?.currency&&!this.total.currency&&(this.total={...this.total,currency:t.config.currency}),!this._subscribed&&t?.connection&&(this._subscribed=!0,this.subscribeToUpdates())}get hass(){return this._hass}constructor(){super(),this.currentView="shopping",this.lists=[],this.activeList=null,this.recentItems=[],this.items=[],this.categories=[],this.total={total:0,currency:"",item_count:0},this.loading=!0,this.showAddDialog=!1,this.showEditDialog=!1,this.editingItem=null,this.cardId=this.generateCardId(),this.settings=this.loadSettings(),this._subscribed=!1}generateCardId(){return`card_${Date.now()}_${Math.random().toString(36).substring(2,9)}`}loadSettings(){const t={theme:"auto",darkMode:"system",fontSize:16,fontFamily:"system",useSystemTextSize:!0,openLastUsedList:!0,keepScreenOn:!1,notifications:{listSharing:!0,emails:!0},recentProductsCount:8,tilesPerRow:3,useEmojis:!0,colorScheme:"pastel",viewMode:"tile",sortMode:"category",showRecentlyUsed:!0,showPriceOnTile:!0,localImagePath:""},e=`slm_settings_${this.cardId}`,r=localStorage.getItem(e);return r?{...t,...JSON.parse(r)}:t}saveSettings(){const t=`slm_settings_${this.cardId}`;localStorage.setItem(t,JSON.stringify(this.settings))}async firstUpdated(){this.api=new lt(this.hass),await this.loadData(),this.applyColorScheme()}applyColorScheme(){const t=this.settings.darkMode;"on"===t?this.setAttribute("data-theme","dark"):"off"===t?this.setAttribute("data-theme","light"):this.removeAttribute("data-theme")}async loadData(){try{this.loading=!0;const t=await this.api.getLists();this.lists=t.lists||[];const e=`slm_last_list_${this.cardId}`;if(this.settings.openLastUsedList){const t=localStorage.getItem(e);this.activeList=this.lists.find(e=>e.id===t)||this.lists.find(t=>t.active)||this.lists[0]}else this.activeList=this.lists.find(t=>t.active)||this.lists[0];const r=await this.api.getCategories();this.categories=r.categories,this.activeList&&await this.loadActiveListData()}catch(t){console.error("Failed to load data:",t)}finally{this.loading=!1}}async loadActiveListData(){if(!this.activeList)return;const t=await this.api.getItems(this.activeList.id);this.items=t.items;const e=await this.api.getListTotal(this.activeList.id);this.total=e;const r=`slm_last_list_${this.cardId}`;localStorage.setItem(r,this.activeList.id)}async handleListChange(t){const e=t.detail.listId;await this.api.setActiveList(e),this.activeList=this.lists.find(t=>t.id===e),await this.loadActiveListData(),this.currentView="shopping"}async handleItemClick(t){console.log("HANDLE ITEM CLICK",t.detail);const{itemId:e}=t.detail,r=this.items.find(t=>t.id===e);r&&!r.checked&&(await this.api.incrementItem(e,1),this.loadActiveListData())}async handleItemDecrease(t){const{itemId:e}=t.detail,r=this.items.find(t=>t.id===e);r&&(r.quantity>1?await this.api.incrementItem(e,-1):await this.api.deleteItem(e),this.loadActiveListData())}async handleItemCheck(t){const{itemId:e,checked:r}=t.detail;await this.api.checkItem(e,r),await this.loadActiveListData()}async handleItemLongPress(t){this.editingItem=t.detail.item,this.showEditDialog=!0}async handleItemSwipeDelete(t){const{itemId:e}=t.detail;await this.api.deleteItem(e),await this.loadActiveListData()}async handleAddItem(t){const e=t.detail,r=this.items.find(t=>t.product_id&&t.product_id===e.product_id&&!t.checked);if(e.fromRecentlyUsed)if(r)await this.api.updateItem(r.id,{quantity:1});else{const{fromRecentlyUsed:t,...r}=e,i={quantity:1};for(const[t,e]of Object.entries(r))null!=e&&(i[t]=e);await this.api.addItem(this.activeList.id,i)}else r?await this.api.updateItem(r.id,{quantity:r.quantity+1}):await this.api.addItem(this.activeList.id,e);this.trackRecentlyUsed(e.product_id),await this.loadActiveListData(),this.showAddDialog=!1}trackRecentlyUsed(t){if(!t)return;const e="slm_recent_products",r=localStorage.getItem(e),i=(r?JSON.parse(r):[]).filter(e=>e!==t);i.unshift(t);const n=i.slice(0,50);localStorage.setItem(e,JSON.stringify(n))}async handleEditItem(t){const{itemId:e,data:r}=t.detail;await this.api.updateItem(e,r),await this.loadActiveListData(),this.showEditDialog=!1,this.editingItem=null}handleNavChange(t){this.currentView=t.detail.view}handleSettingsChange(t){this.settings={...this.settings,...t.detail},this.saveSettings(),this.applyColorScheme(),this.requestUpdate()}handleMenuSettingChange(t){const{key:e,value:r}=t.detail;this.settings={...this.settings,[e]:r},this.saveSettings(),this.requestUpdate()}async handleCreateAndAddProduct(t){const{name:e,category_id:r,price:i}=t.detail;try{const t={name:e,category_id:r,custom:!0};i&&(t.price=parseFloat(i));const n=await this.api.addProduct(t),o=n.product||n,s={name:e,category_id:r,product_id:o.id,quantity:1,unit:"units"};i&&(s.price=parseFloat(i)),await this.api.addItem(this.activeList.id,s),o.id&&this.trackRecentlyUsed(o.id),await this.loadActiveListData()}catch(t){console.error("Failed to create product:",t)}}handleBackToLists(){this.currentView="lists"}async handleShareList(){const t=this.activeList?.name||"Shopping List",e=this.items.filter(t=>!t.checked).map(t=>`${t.quantity} ${t.unit} ${t.name}`).join("\n"),r=`${t}\n\n${e}`;if(navigator.share)try{await navigator.share({title:t,text:r})}catch(t){"AbortError"!==t.name&&console.error("Share failed:",t)}else navigator.clipboard.writeText(r),alert("List copied to clipboard!")}async subscribeToUpdates(){if(this.hass?.connection)try{const t=await this.hass.connection.subscribeMessage(t=>{console.log("[SLM] ✅ Received update:",t.event_type),this.loadActiveListData()},{type:"shopping_list_manager/subscribe"});this._unsubscribers=[t],console.log("[SLM] ✅ Subscribed to shopping list updates")}catch(t){console.error("[SLM] ❌ Failed to subscribe:",t)}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribers&&(console.log("[SLM] Cleaning up event subscriptions"),this._unsubscribers.forEach(t=>{try{t()}catch(t){console.error("[SLM] Error unsubscribing:",t)}}),this._unsubscribers=[])}renderCurrentView(){switch(this.currentView){case"shopping":return V`
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

            ${"list"===this.settings.viewMode?V`
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
            `:V`
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
        `;case"lists":return V`
          <slm-lists-view
            .api=${this.api}
            .lists=${this.lists}
            .activeList=${this.activeList}
            .items=${this.items}
            .total=${this.total}
            @list-selected=${this.handleListChange}
            @lists-updated=${()=>this.loadData()}
          ></slm-lists-view>
        `;case"loyalty":return V`
          <slm-loyalty-cards-view
            .api=${this.api}
          ></slm-loyalty-cards-view>
        `;case"settings":return V`
          <slm-settings-view
            .hass=${this.hass}
            .api=${this.api}
            .settings=${this.settings}
            .categories=${this.categories}
            @settings-changed=${this.handleSettingsChange}
          ></slm-settings-view>
        `;default:return V`<div>Unknown view</div>`}}render(){return this.loading?V`
        <ha-card>
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading...</p>
          </div>
        </ha-card>
      `:V`
      <ha-card>
        <div class="card-container">
          ${this.renderCurrentView()}
        </div>

        <slm-bottom-nav
          .currentView=${this.currentView}
          @nav-changed=${this.handleNavChange}
        ></slm-bottom-nav>

        ${this.showEditDialog?V`
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

  `;setConfig(t){this.config=t}getCardSize(){return 12}}customElements.define("shopping-list-manager-card",Ds);
