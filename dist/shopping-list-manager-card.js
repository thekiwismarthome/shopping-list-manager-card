/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:n,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,g=m?m.emptyScript:"",$=u.reactiveElementPolyfillSupport,y=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!n(t,e),f={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??f}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[y("elementProperties")]=new Map,b[y("finalized")]=new Map,$?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,x=t=>t,w=A.trustedTypes,E=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+C,P=`<${k}>`,L=document,O=()=>L.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,I="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,M=/>/g,N=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,j=/"/g,z=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Q=new WeakMap,V=L.createTreeWalker(L,129);function F(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=T;for(let e=0;e<i;e++){const i=t[e];let n,c,h=-1,l=0;for(;l<i.length&&(a.lastIndex=l,c=a.exec(i),null!==c);)l=a.lastIndex,a===T?"!--"===c[1]?a=H:void 0!==c[1]?a=M:void 0!==c[2]?(z.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=N):void 0!==c[3]&&(a=N):a===N?">"===c[0]?(a=r??T,h=-1):void 0===c[1]?h=-2:(h=a.lastIndex-c[2].length,n=c[1],a=void 0===c[3]?N:'"'===c[3]?j:D):a===j||a===D?a=N:a===H||a===M?a=T:(a=N,r=void 0);const d=a===N&&t[e+1].startsWith("/>")?" ":"";o+=a===T?i+P:h>=0?(s.push(n),i.slice(0,h)+S+i.slice(h)+C+d):i+C+(-2===h?e:d)}return[F(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,n=this.parts,[c,h]=Z(t,e);if(this.el=J.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=h[o++],i=s.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(z.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),V.nextNode(),n.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===k)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)n.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=L.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){if(e===B)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=K(t,r._$AS(t,e.values),r,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);V.currentNode=s;let r=V.nextNode(),o=0,a=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Y(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new st(r,this,t)),this._$AV.push(e),n=i[++a]}o!==n?.index&&(r=V.nextNode(),o++)}return V.currentNode=L,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),U(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new J(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Y(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=K(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=K(this,s[i+a],e,a),n===B&&(n=this._$AH[a]),o||=!U(n)||n!==this._$AH[a],n===q?t=q:t!==q&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=K(this,t,e,0)??q)===B)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(J,Y),(A.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Y(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const nt=ot.litElementPolyfillSupport;nt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");class ct{constructor(t){this.hass=t}async getLists(){return await this.hass.callWS({type:"shopping_list_manager/lists/get_all"})}async setActiveList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/set_active",list_id:t})}async getItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/get",list_id:t})}async addItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/add",list_id:t,...e})}async checkItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/check",item_id:t,checked:e})}async deleteItem(t){return await this.hass.callWS({type:"shopping_list_manager/items/delete",item_id:t})}async getListTotal(t){return await this.hass.callWS({type:"shopping_list_manager/items/get_total",list_id:t})}async searchProducts(t,e={}){return await this.hass.callWS({type:"shopping_list_manager/products/search",query:t,limit:e.limit||10,exclude_allergens:e.excludeAllergens,include_tags:e.includeTags,substitution_group:e.substitutionGroup})}async getCategories(){return await this.hass.callWS({type:"shopping_list_manager/categories/get_all"})}}class ht extends at{static properties={lists:{type:Array},activeList:{type:Object}};handleListClick(t){this.dispatchEvent(new CustomEvent("list-changed",{detail:{listId:t.id},bubbles:!0,composed:!0}))}render(){return W`
      <div class="list-tabs">
        ${this.lists.map(t=>W`
          <button
            class="list-tab ${t.id===this.activeList?.id?"active":""}"
            @click=${()=>this.handleListClick(t)}
          >
            <ha-icon icon="${t.icon}"></ha-icon>
            <span>${t.name}</span>
          </button>
        `)}
      </div>
    `}static styles=o`
    .list-tabs {
      display: flex;
      overflow-x: auto;
      border-bottom: 2px solid var(--divider-color);
      background: var(--card-background-color);
    }
    .list-tab {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border: none;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
    }
    .list-tab:hover {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }
    .list-tab.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
      font-weight: 500;
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
  `}customElements.define("list-selector",ht);class lt extends at{static properties={api:{type:Object},activeListId:{type:String},searchQuery:{type:String},searchResults:{type:Array},showResults:{type:Boolean}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.showResults=!1}async handleSearch(t){if(this.searchQuery=t.target.value,this.searchQuery.length<2)return void(this.showResults=!1);const e=await this.api.searchProducts(this.searchQuery,{limit:10});this.searchResults=e.products,this.showResults=!0}handleProductSelect(t){this.dispatchEvent(new CustomEvent("add-item",{detail:{name:t.name,category_id:t.category_id,product_id:t.id,quantity:t.default_quantity,unit:t.default_unit,price:t.price,image_url:t.image_url},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1}render(){return W`
      <div class="search-container">
        <div class="search-box">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            placeholder="Search products..."
            .value=${this.searchQuery}
            @input=${this.handleSearch}
          />
        </div>

        ${this.showResults?W`
          <div class="search-results">
            ${this.searchResults.map(t=>W`
              <div class="result-item" @click=${()=>this.handleProductSelect(t)}>
                <div class="result-name">${t.name}</div>
                <ha-icon icon="mdi:plus"></ha-icon>
              </div>
            `)}
          </div>
        `:""}
      </div>
    `}static styles=o`
    .search-container {
      padding: 16px;
      position: relative;
    }
    .search-box {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--primary-background-color);
      border-radius: 24px;
      border: 2px solid var(--divider-color);
    }
    input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 16px;
      color: var(--primary-text-color);
    }
    .search-results {
      position: absolute;
      top: 100%;
      left: 16px;
      right: 16px;
      background: var(--card-background-color);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 300px;
      overflow-y: auto;
      z-index: 10;
      margin-top: 8px;
    }
    .result-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
    }
    .result-item:hover {
      background: var(--primary-color);
      color: white;
    }
  `}customElements.define("search-bar",lt);class dt extends at{static properties={item:{type:Object}};handleCheck(){this.dispatchEvent(new CustomEvent("item-check",{detail:{itemId:this.item.id,checked:!this.item.checked},bubbles:!0,composed:!0}))}handleDelete(){this.dispatchEvent(new CustomEvent("item-delete",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}render(){return W`
      <div class="tile ${this.item.checked?"checked":""}">
        <button class="checkbox" @click=${this.handleCheck}>
          <ha-icon icon="${this.item.checked?"mdi:checkbox-marked":"mdi:checkbox-blank-outline"}"></ha-icon>
        </button>

        <div class="info">
          <div class="name">${this.item.name}</div>
          <div class="quantity">${this.item.quantity} ${this.item.unit}</div>
        </div>

        <button class="delete" @click=${this.handleDelete}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
      </div>
    `}static styles=o`
    .tile {
      background: var(--card-background-color);
      border-radius: 12px;
      border: 2px solid var(--divider-color);
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tile.checked {
      opacity: 0.6;
    }
    .tile.checked .name {
      text-decoration: line-through;
    }
    .checkbox {
      background: white;
      border: none;
      border-radius: 50%;
      padding: 4px;
      cursor: pointer;
    }
    .delete {
      background: var(--error-color);
      color: white;
      border: none;
      border-radius: 50%;
      padding: 4px;
      cursor: pointer;
    }
    .info {
      flex: 1;
    }
    .name {
      font-weight: 500;
      font-size: 14px;
    }
    .quantity {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
  `}customElements.define("item-tile",dt);class pt extends at{static properties={items:{type:Array},categories:{type:Array}};groupItemsByCategory(){const t={};return this.categories.forEach(e=>{t[e.id]={category:e,items:this.items.filter(t=>t.category_id===e.id&&!t.checked)}}),Object.values(t).filter(t=>t.items.length>0)}render(){const t=this.groupItemsByCategory();return 0===t.length?W`
        <div class="empty">
          <ha-icon icon="mdi:cart-outline"></ha-icon>
          <p>Your shopping list is empty</p>
        </div>
      `:W`
      <div class="grid-container">
        ${t.map(t=>W`
          <div class="category-section">
            <div class="category-header">
              <ha-icon icon="${t.category.icon}"></ha-icon>
              <span>${t.category.name}</span>
            </div>
            <div class="items-grid">
              ${t.items.map(t=>W`
                <item-tile
                  .item=${t}
                  @item-check=${this.handleCheck}
                  @item-delete=${this.handleDelete}
                ></item-tile>
              `)}
            </div>
          </div>
        `)}
      </div>
    `}handleCheck(t){this.dispatchEvent(new CustomEvent("item-check",{detail:t.detail,bubbles:!0,composed:!0}))}handleDelete(t){this.dispatchEvent(new CustomEvent("item-delete",{detail:t.detail,bubbles:!0,composed:!0}))}static styles=o`
    .grid-container {
      padding: 16px;
    }
    .category-section {
      margin-bottom: 24px;
    }
    .category-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 0;
      font-weight: 600;
      border-bottom: 2px solid var(--divider-color);
      margin-bottom: 12px;
    }
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
    }
    .empty {
      text-align: center;
      padding: 64px 32px;
      color: var(--secondary-text-color);
    }
    .empty ha-icon {
      font-size: 64px;
      opacity: 0.3;
    }
  `}customElements.define("item-grid",pt);class ut extends at{static properties={hass:{type:Object},config:{type:Object},lists:{type:Array},activeList:{type:Object},items:{type:Array},categories:{type:Array},total:{type:Object},loading:{type:Boolean}};constructor(){super(),this.lists=[],this.activeList=null,this.items=[],this.categories=[],this.total={total:0,currency:"NZD",item_count:0},this.loading=!0}async firstUpdated(){this.api=new ct(this.hass),await this.loadData()}async loadData(){try{this.loading=!0;const t=await this.api.getLists();this.lists=t.lists,this.activeList=this.lists.find(t=>t.active)||this.lists[0];const e=await this.api.getCategories();this.categories=e.categories,this.activeList&&await this.loadActiveListData()}catch(t){console.error("Failed to load data:",t)}finally{this.loading=!1}}async loadActiveListData(){const t=await this.api.getItems(this.activeList.id);this.items=t.items;const e=await this.api.getListTotal(this.activeList.id);this.total=e}async handleListChange(t){const e=t.detail.listId;await this.api.setActiveList(e),this.activeList=this.lists.find(t=>t.id===e),await this.loadActiveListData()}async handleItemCheck(t){const{itemId:e,checked:i}=t.detail;await this.api.checkItem(e,i),await this.loadActiveListData()}async handleItemDelete(t){const{itemId:e}=t.detail;await this.api.deleteItem(e),await this.loadActiveListData()}async handleAddItem(t){const e=t.detail;await this.api.addItem(this.activeList.id,e),await this.loadActiveListData()}render(){return this.loading?W`<div class="loading">Loading...</div>`:W`
      <ha-card>
        <list-selector
          .lists=${this.lists}
          .activeList=${this.activeList}
          @list-changed=${this.handleListChange}
        ></list-selector>

        <search-bar
          .api=${this.api}
          .activeListId=${this.activeList?.id}
          @add-item=${this.handleAddItem}
        ></search-bar>

        <item-grid
          .items=${this.items}
          .categories=${this.categories}
          @item-check=${this.handleItemCheck}
          @item-delete=${this.handleItemDelete}
        ></item-grid>

        <div class="footer">
          <div class="total">
            ${this.total.currency} $${this.total.total.toFixed(2)}
            <span>(${this.total.item_count} items)</span>
          </div>
        </div>
      </ha-card>
    `}static styles=o`
    ha-card {
      padding: 0;
    }
    .loading {
      padding: 32px;
      text-align: center;
    }
    .footer {
      padding: 16px;
      border-top: 1px solid var(--divider-color);
    }
    .total {
      font-size: 18px;
      font-weight: 500;
    }
  `;setConfig(t){this.config=t}getCardSize(){return 6}}customElements.define("shopping-list-manager-card",ut);
