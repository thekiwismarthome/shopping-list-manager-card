/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:r,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:l,getOwnPropertySymbols:p,getPrototypeOf:h}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",v=u.reactiveElementPolyfillSupport,b=(t,e)=>t,x={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!r(t,e),f={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);o?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??f}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=h(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...l(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:x;this._$Em=s;const a=o.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const a=this.constructor;if(!1===s&&(o=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==o||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[b("elementProperties")]=new Map,$[b("finalized")]=new Map,v?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,k=t=>t,_=w.trustedTypes,S=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,z=`<${E}>`,P=document,j=()=>P.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,D="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,U=/>/g,M=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,T=/"/g,q=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),W=new WeakMap,V=P.createTreeWalker(P,129);function Q(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let o,a=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<i;e++){const i=t[e];let r,c,d=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===N?"!--"===c[1]?n=O:void 0!==c[1]?n=U:void 0!==c[2]?(q.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=M):void 0!==c[3]&&(n=M):n===M?">"===c[0]?(n=o??N,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,r=c[1],n=void 0===c[3]?M:'"'===c[3]?T:R):n===T||n===R?n=M:n===O||n===U?n=N:(n=M,o=void 0);const p=n===M&&t[e+1].startsWith("/>")?" ":"";a+=n===N?i+z:d>=0?(s.push(r),i.slice(0,d)+A+i.slice(d)+C+p):i+C+(-2===d?e:p)}return[Q(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,a=0;const n=t.length-1,r=this.parts,[c,d]=X(t,e);if(this.el=Y.createElement(c,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&r.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(A)){const e=d[a++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:K}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],j()),V.nextNode(),r.push({type:2,index:++o});s.append(t[e],j())}}}else if(8===s.nodeType)if(s.data===E)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===H)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const a=L(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=J(t,o._$AS(t,e.values),o,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);V.currentNode=s;let o=V.nextNode(),a=0,n=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new Z(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new st(o,this,t)),this._$AV.push(e),r=i[++n]}a!==r?.index&&(o=V.nextNode(),a++)}return V.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),L(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>I(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Y(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Z(this.O(j()),this.O(j()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class K{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const o=this.strings;let a=!1;if(void 0===o)t=J(this,t,e,0),a=!L(t)||t!==this._$AH&&t!==H,a&&(this._$AH=t);else{const s=t;let n,r;for(t=o[0],n=0;n<o.length-1;n++)r=J(this,s[i+n],e,n),r===H&&(r=this._$AH[n]),a||=!L(r)||r!==this._$AH[n],r===B?t=B:t!==B&&(t+=(r??"")+o[n+1]),this._$AH[n]=r}a&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends K{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends K{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??B)===H)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Y,Z),(w.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Z(e.insertBefore(j(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return H}}nt._$litElement$=!0,nt.finalized=!0,at.litElementHydrateSupport?.({LitElement:nt});const rt=at.litElementPolyfillSupport;rt?.({LitElement:nt}),(at.litElementVersions??=[]).push("4.2.2");class ct{constructor(t){this.hass=t}async getLists(){return await this.hass.callWS({type:"shopping_list_manager/lists/get_all"})}async createList(t,e="mdi:cart"){return await this.hass.callWS({type:"shopping_list_manager/lists/create",name:t,icon:e})}async updateList(t,e){return await this.hass.callWS({type:"shopping_list_manager/lists/update",list_id:t,...e})}async deleteList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/delete",list_id:t})}async setActiveList(t){return await this.hass.callWS({type:"shopping_list_manager/lists/set_active",list_id:t})}async getItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/get",list_id:t})}async addItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/add",list_id:t,...e})}async updateItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/update",item_id:t,...e})}async checkItem(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/check",item_id:t,checked:e})}async deleteItem(t){return await this.hass.callWS({type:"shopping_list_manager/items/delete",item_id:t})}async bulkCheckItems(t,e){return await this.hass.callWS({type:"shopping_list_manager/items/bulk_check",item_ids:t,checked:e})}async clearCheckedItems(t){return await this.hass.callWS({type:"shopping_list_manager/items/clear_checked",list_id:t})}async getListTotal(t){return await this.hass.callWS({type:"shopping_list_manager/items/get_total",list_id:t})}async searchProducts(t,e={}){return await this.hass.callWS({type:"shopping_list_manager/products/search",query:t,limit:e.limit||20,exclude_allergens:e.excludeAllergens,include_tags:e.includeTags,substitution_group:e.substitutionGroup})}async getProductSuggestions(t=20){return await this.hass.callWS({type:"shopping_list_manager/products/suggestions",limit:t})}async getProductSubstitutes(t,e=5){return await this.hass.callWS({type:"shopping_list_manager/products/substitutes",product_id:t,limit:e})}async addProduct(t){return await this.hass.callWS({type:"shopping_list_manager/products/add",...t})}async updateProduct(t,e){return await this.hass.callWS({type:"shopping_list_manager/products/update",product_id:t,...e})}async getCategories(){return await this.hass.callWS({type:"shopping_list_manager/categories/get_all"})}}class dt extends nt{static properties={currentView:{type:String}};handleNavClick(t){this.dispatchEvent(new CustomEvent("nav-changed",{detail:{view:t},bubbles:!0,composed:!0}))}render(){return F`
      <nav class="bottom-nav">
        <button
          class="nav-item ${"shopping"===this.currentView?"active":""}"
          @click=${()=>this.handleNavClick("shopping")}
        >
          <span class="emoji">🛒</span>
          <span>Shopping</span>
        </button>

        <button
          class="nav-item ${"lists"===this.currentView?"active":""}"
          @click=${()=>this.handleNavClick("lists")}
        >
          <span class="emoji">📋</span>
          <span>Lists</span>
        </button>

        <button
          class="nav-item ${"loyalty"===this.currentView?"active":""}"
          @click=${()=>this.handleNavClick("loyalty")}
        >
          <span class="emoji">💳</span>
          <span>Loyalty</span>
        </button>

        <button
          class="nav-item ${"settings"===this.currentView?"active":""}"
          @click=${()=>this.handleNavClick("settings")}
        >
          <span class="emoji">⚙️</span>
          <span>Settings</span>
        </button>
      </nav>
    `}static styles=a`
    .bottom-nav {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      background: var(--card-background-color);
      border-top: 1px solid #e8eaf6;
      padding: 8px 0;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.08);
      z-index: 100;
    }
    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px;
      border: none;
      background: transparent;
      color: #9e9e9e;
      cursor: pointer;
      transition: all 0.2s;
      border-radius: 12px;
    }
    .nav-item:hover {
      background: #f5f7fa;
    }
    .nav-item.active {
      color: #667eea;
    }
    .emoji {
      font-size: 24px;
    }
    .nav-item span:last-child {
      font-size: 12px;
      font-weight: 500;
    }
  `}customElements.define("bottom-nav",dt);class lt extends nt{static properties={activeList:{type:Object},itemCount:{type:Number}};getListEmoji(t){return{"mdi:cart":"🛒","mdi:home":"🏠","mdi:food":"🍽️","mdi:shopping":"🛍️","mdi:store":"🏪"}[t]||"🛒"}render(){return F`
      <div class="header">
        <div class="list-info">
          <span class="emoji">${this.getListEmoji(this.activeList?.icon)}</span>
          <h2>${this.activeList?.name||"Shopping List"}</h2>
        </div>
      </div>
    `}static styles=a`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);
      border-bottom: 1px solid #e8eaf6;
    }
    .list-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .emoji {
      font-size: 28px;
    }
    .list-info h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #5f6368;
    }
  `}customElements.define("list-header",lt);class pt extends nt{static properties={api:{type:Object},settings:{type:Object},searchQuery:{type:String},searchResults:{type:Array},suggestions:{type:Array},showResults:{type:Boolean},showSuggestions:{type:Boolean}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.suggestions=[],this.showResults=!1,this.showSuggestions=!1}async firstUpdated(){await this.loadSuggestions()}async loadSuggestions(){const t=this.settings?.recentProductsCount||10,e=await this.api.getProductSuggestions(t);this.suggestions=e.products}async handleSearch(t){if(this.searchQuery=t.target.value,this.searchQuery.length<2)return this.showResults=!1,void(this.showSuggestions=!1);const e=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=e.products,this.showResults=!0,this.showSuggestions=!1}handleFocus(){this.searchQuery||(this.showSuggestions=!0)}handleProductSelect(t){this.dispatchEvent(new CustomEvent("add-item",{detail:{name:t.name,category_id:t.category_id,product_id:t.id,quantity:t.default_quantity,unit:t.default_unit,price:t.price,image_url:t.image_url},bubbles:!0,composed:!0})),this.searchQuery="",this.showResults=!1,this.showSuggestions=!1}render(){return F`
      <div class="search-container">
        <div class="search-box">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            placeholder="Search products..."
            .value=${this.searchQuery}
            @input=${this.handleSearch}
            @focus=${this.handleFocus}
            @blur=${()=>setTimeout(()=>{this.showSuggestions=!1,this.showResults=!1},200)}
          />
          ${this.searchQuery?F`
            <button class="clear-btn" @click=${()=>{this.searchQuery="",this.showResults=!1}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          `:""}
        </div>

        ${this.showSuggestions&&this.suggestions.length>0?F`
          <div class="suggestions">
            <div class="suggestions-header">Frequently Used</div>
            ${this.suggestions.map(t=>F`
              <div class="suggestion-item" @click=${()=>this.handleProductSelect(t)}>
                ${t.image_url?F`
                  <img src="${t.image_url}" alt="${t.name}">
                `:F`
                  <div class="no-image">
                    <ha-icon icon="mdi:food-variant"></ha-icon>
                  </div>
                `}
                <div class="suggestion-info">
                  <div class="suggestion-name">${t.name}</div>
                  ${t.price?F`
                    <div class="suggestion-price">$${t.price.toFixed(2)}</div>
                  `:""}
                </div>
                <ha-icon icon="mdi:plus-circle"></ha-icon>
              </div>
            `)}
          </div>
        `:""}

        ${this.showResults?F`
          <div class="search-results">
            ${this.searchResults.length>0?F`
              ${this.searchResults.map(t=>F`
                <div class="result-item" @click=${()=>this.handleProductSelect(t)}>
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
                  <ha-icon icon="mdi:plus-circle"></ha-icon>
                </div>
              `)}
            `:F`
              <div class="no-results">
                <ha-icon icon="mdi:magnify-close"></ha-icon>
                <p>No products found</p>
              </div>
            `}
          </div>
        `:""}
      </div>
    `}static styles=a`
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
      transition: border-color 0.2s;
    }
    .search-box:focus-within {
      border-color: var(--primary-color);
    }
    .search-box ha-icon {
      color: var(--secondary-text-color);
    }
    input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 16px;
      color: var(--primary-text-color);
    }
    .clear-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .suggestions,
    .search-results {
      position: absolute;
      top: 100%;
      left: 16px;
      right: 16px;
      background: var(--card-background-color);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 400px;
      overflow-y: auto;
      z-index: 10;
      margin-top: 8px;
    }
    .suggestions-header {
      padding: 12px 16px;
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      border-bottom: 1px solid var(--divider-color);
    }
    .suggestion-item,
    .result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
      transition: background 0.2s;
    }
    .suggestion-item:hover,
    .result-item:hover {
      background: var(--primary-color);
      color: white;
    }
    .suggestion-item img,
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
    .suggestion-info,
    .result-info {
      flex: 1;
    }
    .suggestion-name,
    .result-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    .suggestion-price,
    .result-price {
      font-size: 13px;
      color: var(--primary-color);
      font-weight: 600;
    }
    .no-results {
      text-align: center;
      padding: 48px 24px;
      color: var(--secondary-text-color);
    }
    .no-results ha-icon {
      font-size: 48px;
      opacity: 0.3;
    }
  `}customElements.define("search-bar",pt);class ht extends nt{static properties={item:{type:Object},categoryColor:{type:String},isRecentlyUsed:{type:Boolean},touchStartX:{type:Number},touchStartY:{type:Number},touchStartTime:{type:Number},longPressTimer:{type:Number}};constructor(){super(),this.isRecentlyUsed=!1,this.touchStartX=0,this.touchStartY=0,this.touchStartTime=0,this.longPressTimer=null}handleTileClick(t){t.target.closest(".decrease-btn")||t.target.closest(".checkbox")||this.dispatchEvent(new CustomEvent("item-check",{detail:{itemId:this.item.id,checked:!this.item.checked},bubbles:!0,composed:!0}))}handleDecrease(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-decrease",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleQuantityClick(t){t.stopPropagation(),this.dispatchEvent(new CustomEvent("item-click",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleTouchStart(t){this.touchStartX=t.touches[0].clientX,this.touchStartY=t.touches[0].clientY,this.touchStartTime=Date.now(),this.longPressTimer=setTimeout(()=>{this.dispatchEvent(new CustomEvent("item-long-press",{detail:{item:this.item},bubbles:!0,composed:!0}))},500)}handleTouchMove(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null);const e=t.touches[0].clientX-this.touchStartX;Math.abs(e)>100&&e<0&&(this.style.transform=`translateX(${e}px)`)}handleTouchEnd(t){this.longPressTimer&&(clearTimeout(this.longPressTimer),this.longPressTimer=null);t.changedTouches[0].clientX-this.touchStartX<-150&&this.dispatchEvent(new CustomEvent("item-swipe-delete",{detail:{itemId:this.item.id},bubbles:!0,composed:!0})),this.style.transform=""}firstUpdated(){const t=this.shadowRoot.querySelector(".tile");t&&(t.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!0}),t.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!0}),t.addEventListener("touchend",this.handleTouchEnd.bind(this),{passive:!0}))}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}render(){const t=this.isRecentlyUsed?`${this.categoryColor}30`:this.categoryColor;return F`
      <div 
        class="tile ${this.item.checked?"checked":""} ${this.isRecentlyUsed?"recently-used":""}"
        @click=${this.handleTileClick}
      >
        ${this.item.checked?"":F`
          <button class="decrease-btn" @click=${this.handleDecrease}>
            <span>−</span>
          </button>
        `}

        ${this.item.quantity>1&&!this.item.checked?F`
          <div 
            class="quantity-badge" 
            style="background: ${this.categoryColor}"
            @click=${this.handleQuantityClick}
          >
            ${this.item.quantity}
          </div>
        `:""}

        ${this.item.image_url?F`
          <img src="${this.item.image_url}" alt="${this.item.name}">
        `:F`
          <div class="no-image" style="background: ${t}">
            <div class="emoji">${this.getCategoryEmoji(this.item.category_id)}</div>
          </div>
        `}

        <div class="info">
          <div class="name">${this.item.name}</div>
          <div class="meta">
            <span class="unit">${this.item.quantity} ${this.item.unit}</span>
            ${this.item.price?F`
              <span class="price">$${(this.item.price*this.item.quantity).toFixed(2)}</span>
            `:""}
          </div>
        </div>

        ${this.item.checked?F`
          <div class="checked-overlay">
            <span class="check-icon">✓</span>
          </div>
        `:""}
      </div>
    `}static styles=a`
    .tile {
      position: relative;
      background: var(--card-background-color);
      border-radius: 16px;
      border: 2px solid #e8eaf6;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }
    .tile:active {
      transform: scale(0.97);
    }
    .tile.recently-used {
      opacity: 0.7;
      border-style: dashed;
    }
    .tile.checked {
      opacity: 0.4;
    }
    .tile.checked .name {
      text-decoration: line-through;
    }
    .decrease-btn {
      position: absolute;
      top: 8px;
      left: 8px;
      background: #ff7675;
      color: white;
      border: none;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      z-index: 2;
      padding: 0;
      font-size: 20px;
      font-weight: 300;
    }
    .quantity-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      z-index: 2;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      cursor: pointer;
    }
    .quantity-badge:hover {
      transform: scale(1.1);
    }
    img, .no-image {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 12px;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .emoji {
      font-size: 56px;
    }
    .info {
      flex: 1;
    }
    .name {
      font-weight: 600;
      font-size: 14px;
      line-height: 1.3;
      margin-bottom: 6px;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }
    .unit {
      color: var(--secondary-text-color);
    }
    .price {
      color: #667eea;
      font-weight: 700;
    }
    .checked-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(102, 126, 234, 0.9);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .check-icon {
      font-size: 48px;
      color: white;
    }
  `}customElements.define("item-tile",ht);class ut extends nt{static properties={items:{type:Array},categories:{type:Array},settings:{type:Object}};groupItemsByCategory(){const t={};return this.categories.forEach(e=>{t[e.id]={category:e,items:this.items.filter(t=>t.category_id===e.id&&!t.checked)}}),Object.values(t).filter(t=>t.items.length>0)}getRecentlyUsedItems(){const t=localStorage.getItem("recently_used_products"),e=t?JSON.parse(t):[],i=this.settings?.recentProductsCount||8;this.settings;const s=this.items.map(t=>t.product_id),o=e.filter(t=>!s.includes(t)).slice(0,i),a={};o.forEach(t=>{const e={id:t,name:"Recent Product",category_id:"other",quantity:1,unit:"units",checked:!1};a[e.category_id]||(a[e.category_id]=[]),a[e.category_id].push(e)});const n=[];return Object.values(a).forEach(t=>{n.push(...t)}),n}handleItemClick(t){this.dispatchEvent(new CustomEvent("item-click",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemDecrease(t){this.dispatchEvent(new CustomEvent("item-decrease",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemCheck(t){this.dispatchEvent(new CustomEvent("item-check",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemLongPress(t){this.dispatchEvent(new CustomEvent("item-long-press",{detail:t.detail,bubbles:!0,composed:!0}))}handleItemSwipeDelete(t){this.dispatchEvent(new CustomEvent("item-swipe-delete",{detail:t.detail,bubbles:!0,composed:!0}))}render(){const t=this.groupItemsByCategory(),e=this.getRecentlyUsedItems(),i=this.settings?.tilesPerRow||3;return F`
      <style>
        .items-grid {
          grid-template-columns: repeat(${i}, 1fr);
        }
      </style>

      <div class="grid-container">
        ${e.length>0?F`
          <div class="category-section">
            <div class="category-header" style="border-color: #b0bec5">
              <div class="emoji">⏱️</div>
              <span>Recently Used</span>
              <span class="count">${e.length}</span>
            </div>
            <div class="items-grid">
              ${e.map(t=>F`
                <item-tile
                  .item=${t}
                  .categoryColor=${"#b0bec5"}
                  .isRecentlyUsed=${!0}
                  @item-click=${this.handleItemClick}
                  @item-decrease=${this.handleItemDecrease}
                  @item-check=${this.handleItemCheck}
                  @item-long-press=${this.handleItemLongPress}
                  @item-swipe-delete=${this.handleItemSwipeDelete}
                ></item-tile>
              `)}
            </div>
          </div>
        `:""}

        ${0===t.length&&0===e.length?F`
          <div class="empty">
            <div class="empty-emoji">🛒</div>
            <p>Your shopping list is empty</p>
            <p class="hint">Tap the + button to add items</p>
          </div>
        `:""}

        ${t.map(t=>F`
          <div class="category-section">
            <div class="category-header" style="border-color: ${t.category.color}">
              <div class="emoji">${this.getCategoryEmoji(t.category.id)}</div>
              <span>${t.category.name}</span>
              <span class="count">${t.items.length}</span>
            </div>
            <div class="items-grid">
              ${t.items.map(e=>F`
                <item-tile
                  .item=${e}
                  .categoryColor=${t.category.color}
                  @item-click=${this.handleItemClick}
                  @item-decrease=${this.handleItemDecrease}
                  @item-check=${this.handleItemCheck}
                  @item-long-press=${this.handleItemLongPress}
                  @item-swipe-delete=${this.handleItemSwipeDelete}
                ></item-tile>
              `)}
            </div>
          </div>
        `)}
      </div>
    `}getCategoryEmoji(t){return{produce:"🥬",dairy:"🥛",meat:"🥩",bakery:"🍞",pantry:"🥫",frozen:"🧊",beverages:"🥤",snacks:"🍿",household:"🧹",health:"💊",pet:"🐾",baby:"👶",other:"📦"}[t]||"📦"}static styles=a`
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
      font-size: 16px;
      border-bottom: 3px solid;
      margin-bottom: 12px;
    }
    .emoji {
      font-size: 24px;
    }
    .count {
      margin-left: auto;
      background: linear-gradient(135deg, #a8b5ff 0%, #c5b8e8 100%);
      color: white;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 13px;
    }
    .items-grid {
      display: grid;
      gap: 12px;
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
    }
  `}customElements.define("item-grid",ut);class gt extends nt{render(){return F`
      <button class="fab">
        <span class="fab-icon">+</span>
      </button>
    `}static styles=a`
    .fab {
      position: sticky;
      bottom: 76px;
      left: calc(100% - 76px);
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      z-index: 95;
      margin-right: 20px;
    }
    .fab:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
    }
    .fab:active {
      transform: scale(0.95);
    }
    .fab-icon {
      font-size: 32px;
      font-weight: 300;
      line-height: 1;
    }
  `}customElements.define("floating-add-button",gt);class mt extends nt{static properties={api:{type:Object},categories:{type:Array},searchQuery:{type:String},searchResults:{type:Array},selectedProduct:{type:Object},quantity:{type:Number},customName:{type:String}};constructor(){super(),this.searchQuery="",this.searchResults=[],this.selectedProduct=null,this.quantity=1,this.customName=""}async handleSearch(t){if(this.searchQuery=t.target.value,this.searchQuery.length<2)return void(this.searchResults=[]);const e=await this.api.searchProducts(this.searchQuery,{limit:20});this.searchResults=e.products}selectProduct(t){this.selectedProduct=t,this.quantity=t.default_quantity,this.searchQuery="",this.searchResults=[]}handleAdd(){this.selectedProduct?this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.selectedProduct.name,category_id:this.selectedProduct.category_id,product_id:this.selectedProduct.id,quantity:this.quantity,unit:this.selectedProduct.default_unit,price:this.selectedProduct.price,image_url:this.selectedProduct.image_url},bubbles:!0,composed:!0})):this.customName&&this.dispatchEvent(new CustomEvent("add-item",{detail:{name:this.customName,category_id:"other",quantity:this.quantity,unit:"units"},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return F`
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
    `}static styles=a`
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
  `}customElements.define("add-item-dialog",mt);class vt extends nt{static properties={api:{type:Object},item:{type:Object},categories:{type:Array},quantity:{type:Number},notes:{type:String},showSubstitutes:{type:Boolean},substitutes:{type:Array}};constructor(){super(),this.quantity=1,this.notes="",this.showSubstitutes=!1,this.substitutes=[]}updated(t){t.has("item")&&this.item&&(this.quantity=this.item.quantity,this.notes=this.item.notes||"",this.item.product_id&&this.loadSubstitutes())}async loadSubstitutes(){const t=await this.api.getProductSubstitutes(this.item.product_id,5);this.substitutes=t.substitutes}handleSave(){this.dispatchEvent(new CustomEvent("save-item",{detail:{itemId:this.item.id,data:{quantity:this.quantity,notes:this.notes}},bubbles:!0,composed:!0}))}handleDelete(){confirm(`Delete ${this.item.name}?`)&&this.dispatchEvent(new CustomEvent("delete-item",{detail:{itemId:this.item.id},bubbles:!0,composed:!0}))}handleSubstituteSelect(t){this.dispatchEvent(new CustomEvent("save-item",{detail:{itemId:this.item.id,data:{product_id:t.id,name:t.name,price:t.price,image_url:t.image_url,quantity:this.quantity}},bubbles:!0,composed:!0}))}handleClose(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){return this.item?F`
      <div class="overlay" @click=${this.handleClose}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-header">
            <h3>Edit Item</h3>
            <button class="close-btn" @click=${this.handleClose}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="dialog-content">
            <div class="item-preview">
              ${this.item.image_url?F`
                <img src="${this.item.image_url}" alt="${this.item.name}">
              `:F`
                <div class="no-image">
                  <ha-icon icon="mdi:food-variant"></ha-icon>
                </div>
              `}
              <h4>${this.item.name}</h4>
            </div>

            <div class="quantity-section">
              <label>Quantity</label>
              <div class="quantity-control">
                <button @click=${()=>this.quantity=Math.max(1,this.quantity-1)}>
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <input 
                  type="number" 
                  .value=${this.quantity}
                  @input=${t=>this.quantity=parseInt(t.target.value)||1}
                  min="1"
                />
                <span class="unit">${this.item.unit}</span>
                <button @click=${()=>this.quantity++}>
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            </div>

            ${this.item.price?F`
              <div class="price-info">
                <span>Unit Price:</span>
                <span>$${this.item.price.toFixed(2)}</span>
              </div>
              <div class="price-info total">
                <span>Total:</span>
                <span>$${(this.item.price*this.quantity).toFixed(2)}</span>
              </div>
            `:""}

            <div class="notes-section">
              <label>Notes</label>
              <textarea
                placeholder="Add notes (optional)..."
                .value=${this.notes}
                @input=${t=>this.notes=t.target.value}
                rows="3"
              ></textarea>
            </div>

            ${this.substitutes.length>0?F`
              <div class="substitutes-section">
                <button 
                  class="toggle-substitutes"
                  @click=${()=>this.showSubstitutes=!this.showSubstitutes}
                >
                  <ha-icon icon="mdi:swap-horizontal"></ha-icon>
                  <span>Show Substitutes (${this.substitutes.length})</span>
                  <ha-icon icon="${this.showSubstitutes?"mdi:chevron-up":"mdi:chevron-down"}"></ha-icon>
                </button>

                ${this.showSubstitutes?F`
                  <div class="substitutes-list">
                    ${this.substitutes.map(t=>F`
                      <div class="substitute-item" @click=${()=>this.handleSubstituteSelect(t)}>
                        ${t.image_url?F`
                          <img src="${t.image_url}" alt="${t.name}">
                        `:F`
                          <div class="no-image-small">
                            <ha-icon icon="mdi:food-variant"></ha-icon>
                          </div>
                        `}
                        <div class="substitute-info">
                          <div class="substitute-name">${t.name}</div>
                          ${t.price?F`
                            <div class="substitute-price">$${t.price.toFixed(2)}</div>
                          `:""}
                        </div>
                        <ha-icon icon="mdi:arrow-right"></ha-icon>
                      </div>
                    `)}
                  </div>
                `:""}
              </div>
            `:""}
          </div>

          <div class="dialog-footer">
            <button class="delete-btn" @click=${this.handleDelete}>
              <ha-icon icon="mdi:delete"></ha-icon>
              Delete
            </button>
            <button class="save-btn" @click=${this.handleSave}>
              <ha-icon icon="mdi:check"></ha-icon>
              Save
            </button>
          </div>
        </div>
      </div>
    `:F``}static styles=a`
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
      width: 100%;
      max-height: 85vh;
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
    }
    .dialog-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
    .item-preview {
      text-align: center;
      margin-bottom: 24px;
    }
    .item-preview img,
    .no-image {
      width: 100px;
      height: 100px;
      border-radius: 16px;
      margin: 0 auto 12px;
      object-fit: cover;
    }
    .no-image {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--disabled-color);
    }
    .no-image ha-icon {
      --mdc-icon-size: 48px;
      opacity: 0.5;
    }
    .item-preview h4 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    .quantity-section {
      margin-bottom: 20px;
    }
    .quantity-section label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .quantity-control {
      display: flex;
      align-items: center;
      gap: 12px;
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
    .quantity-control input {
      flex: 1;
      padding: 10px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .quantity-control .unit {
      color: var(--secondary-text-color);
      font-weight: 500;
    }
    .price-info {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 15px;
    }
    .price-info.total {
      font-size: 18px;
      font-weight: 700;
      color: var(--primary-color);
      border-top: 2px solid var(--divider-color);
      margin-top: 8px;
      padding-top: 12px;
    }
    .notes-section {
      margin: 20px 0;
    }
    .notes-section label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .notes-section textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      font-size: 14px;
      resize: vertical;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      font-family: inherit;
    }
    .substitutes-section {
      margin-top: 20px;
    }
    .toggle-substitutes {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      border: 2px solid var(--divider-color);
      border-radius: 8px;
      background: var(--primary-background-color);
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;
    }
    .toggle-substitutes span {
      flex: 1;
      text-align: left;
    }
    .substitutes-list {
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .substitute-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .substitute-item:hover {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    .substitute-item img,
    .no-image-small {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      object-fit: cover;
    }
    .no-image-small {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--disabled-color);
    }
    .substitute-info {
      flex: 1;
    }
    .substitute-name {
      font-weight: 500;
      margin-bottom: 4px;
    }
    .substitute-price {
      font-size: 13px;
      color: var(--primary-color);
      font-weight: 600;
    }
    .dialog-footer {
      display: flex;
      gap: 12px;
      padding: 16px 20px;
      border-top: 1px solid var(--divider-color);
    }
    .delete-btn,
    .save-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      border: none;
    }
    .delete-btn {
      background: var(--error-color);
      color: white;
    }
    .save-btn {
      background: var(--primary-color);
      color: white;
    }
  `}customElements.define("edit-item-dialog",vt);class bt extends nt{static properties={list:{type:Object},isActive:{type:Boolean},itemCount:{type:Number},totalCost:{type:Number},currency:{type:String},emoji:{type:String},showMenu:{type:Boolean}};constructor(){super(),this.showMenu=!1,this.itemCount=0,this.totalCost=0,this.currency="NZD"}handleCardClick(){this.dispatchEvent(new CustomEvent("list-select",{detail:{listId:this.list.id},bubbles:!0,composed:!0}))}handleMenuClick(t){t.stopPropagation(),this.showMenu=!this.showMenu}handleAction(t,e){e.stopPropagation(),this.showMenu=!1,this.dispatchEvent(new CustomEvent("list-action",{detail:{action:t,listId:this.list.id},bubbles:!0,composed:!0}))}render(){return F`
      <div class="slm-list-card ${this.isActive?"active":""}" @click=${this.handleCardClick}>
        <div class="card-header">
          <span class="emoji">${this.emoji}</span>
          <button class="menu-btn" @click=${this.handleMenuClick}>
            <span class="dots">⋮</span>
          </button>
        </div>

        <h3>${this.list.name}</h3>
        
        ${this.isActive?F`
          <div class="card-stats">
            <div class="stat">
              <span class="stat-value">${this.itemCount}</span>
              <span class="stat-label">items</span>
            </div>
            <div class="stat">
              <span class="stat-value">${this.currency} $${this.totalCost.toFixed(2)}</span>
              <span class="stat-label">total</span>
            </div>
          </div>
          <div class="active-badge">Active</div>
        `:""}

        ${this.showMenu?F`
          <div class="menu-overlay" @click=${t=>{t.stopPropagation(),this.showMenu=!1}}>
            <div class="menu-popup">
              <button @click=${t=>this.handleAction("rename",t)}>
                <span class="emoji">✏️</span>
                Rename
              </button>
              <button @click=${t=>this.handleAction("share",t)}>
                <span class="emoji">📤</span>
                Share
              </button>
              <button @click=${t=>this.handleAction("copy",t)}>
                <span class="emoji">📋</span>
                Copy
              </button>
              <button class="danger" @click=${t=>this.handleAction("delete",t)}>
                <span class="emoji">🗑️</span>
                Delete
              </button>
            </div>
          </div>
        `:""}
      </div>
    `}static styles=a`
    .slm-list-card {
      position: relative;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);
      border: 2px solid #e8eaf6;
      border-radius: 16px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .slm-list-card:hover {
      border-color: #a8b5ff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(168, 181, 255, 0.2);
    }
    .slm-list-card.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: #667eea;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .emoji {
      font-size: 32px;
    }
    .menu-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      opacity: 0.6;
      font-size: 24px;
      color: inherit;
    }
    .menu-btn:hover {
      opacity: 1;
    }
    .slm-list-card h3 {
      margin: 0 0 12px 0;
      font-size: 18px;
      font-weight: 600;
    }
    .card-stats {
      display: flex;
      gap: 16px;
      margin-top: 12px;
    }
    .stat {
      display: flex;
      flex-direction: column;
    }
    .stat-value {
      font-size: 16px;
      font-weight: 700;
    }
    .stat-label {
      font-size: 12px;
      opacity: 0.8;
    }
    .active-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255,255,255,0.3);
      color: white;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 11px;
      font-weight: 700;
    }
    .menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
    }
    .menu-popup {
      position: absolute;
      top: 40px;
      right: 0;
      background: var(--card-background-color);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      overflow: hidden;
      min-width: 160px;
      z-index: 101;
    }
    .menu-popup button {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border: none;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      font-size: 14px;
      text-align: left;
    }
    .menu-popup button:hover {
      background: #f5f7fa;
    }
    .menu-popup button.danger {
      color: #ff7675;
    }
    .menu-popup button.danger:hover {
      background: #ff7675;
      color: white;
    }
  `}customElements.define("slm-list-card",bt);class xt extends nt{static properties={api:{type:Object},lists:{type:Array},activeList:{type:Object},items:{type:Array},total:{type:Object},showCreateDialog:{type:Boolean},newListName:{type:String},newListIcon:{type:String}};constructor(){super(),this.showCreateDialog=!1,this.newListName="",this.newListIcon="mdi:cart"}handleCreateList(){this.showCreateDialog=!0}async handleSaveNewList(){if(this.newListName.trim()){await this.api.createList(this.newListName,this.newListIcon),this.showCreateDialog=!1,this.newListName="",this.newListIcon="mdi:cart";const t=await this.api.getLists();this.lists=t.lists,this.requestUpdate()}}handleListSelect(t){this.dispatchEvent(new CustomEvent("list-selected",{detail:t.detail,bubbles:!0,composed:!0}))}async handleListAction(t){const{action:e,listId:i}=t.detail;switch(e){case"rename":const t=prompt("Enter new list name:");if(t){await this.api.updateList(i,{name:t});const e=await this.api.getLists();this.lists=e.lists,this.requestUpdate()}break;case"delete":if(confirm("Delete this list?")){await this.api.deleteList(i);const t=await this.api.getLists();this.lists=t.lists,this.requestUpdate()}break;case"share":alert("Share feature coming soon!");break;case"copy":alert("Copy feature coming soon!")}}getListEmoji(t){return{"mdi:cart":"🛒","mdi:home":"🏠","mdi:food":"🍽️","mdi:shopping":"🛍️","mdi:store":"🏪"}[t]||"🛒"}render(){return F`
      <div class="lists-view">
        <div class="header">
          <h2>My Lists</h2>
          <button class="create-btn" @click=${this.handleCreateList}>
            <span class="emoji">➕</span>
            New List
          </button>
        </div>

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
    `}static styles=a`
    .lists-view {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #5f6368;
    }
    .create-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }
    .emoji {
      font-size: 18px;
    }
    .lists-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
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
      padding: 0;
    }
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #e8eaf6;
    }
    .dialog-header h3 {
      margin: 0;
      font-size: 20px;
      color: #5f6368;
    }
    .dialog-header button {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      font-size: 20px;
    }
    .dialog-content {
      padding: 20px;
    }
    .dialog-content label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #5f6368;
    }
    .dialog-content input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e8eaf6;
      border-radius: 8px;
      font-size: 16px;
      margin-bottom: 20px;
      background: var(--primary-background-color);
      color: var(--primary-text-color);
    }
    .icon-picker {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }
    .icon-option {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      border: 2px solid #e8eaf6;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.2s;
    }
    .icon-option:hover {
      border-color: #667eea;
      transform: scale(1.05);
    }
    .icon-option.selected {
      border-color: #667eea;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .dialog-footer {
      display: flex;
      gap: 12px;
      padding: 20px;
      border-top: 1px solid #e8eaf6;
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
      background: #f5f7fa;
      color: #5f6368;
    }
    .save-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
  `}customElements.define("lists-view",xt);Boolean,a`
    .slm-loyalty-view {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .add-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
    }
    .empty {
      text-align: center;
      padding: 80px 32px;
      color: var(--secondary-text-color);
    }
    .empty ha-icon {
      font-size: 80px;
      opacity: 0.2;
    }
    .hint {
      font-size: 14px;
      opacity: 0.7;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    .loyalty-card {
      position: relative;
      padding: 24px;
      border-radius: 16px;
      color: white;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .delete-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255,255,255,0.3);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .loyalty-card:hover .delete-btn {
      opacity: 1;
    }
    .loyalty-card h3 {
      margin: 0 0 16px 0;
      font-size: 20px;
      font-weight: 700;
    }
    .card-number {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 2px;
      margin-bottom: 12px;
    }
    .barcode {
      display: flex;
      align-items: center;
      gap: 8px;
      opacity: 0.9;
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
      color: var(--secondary-text-color);
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
  `;customElements.define("loyalty-cards-view",LoyaltyCardsView);class yt extends nt{static properties={hass:{type:Object}};render(){return F`
      <div class="profile-settings">
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
    `}static styles=a`
    .profile-settings {
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
  `}customElements.define("profile-settings",yt);class ft extends nt{static properties={currentMode:{type:String}};handleSelect(t){this.dispatchEvent(new CustomEvent("mode-selected",{detail:{mode:t},bubbles:!0,composed:!0}))}render(){return F`
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
    `}static styles=a`
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
  `}customElements.define("dark-mode-popup",ft);class $t extends nt{static properties={currentFont:{type:String}};fonts=[{name:"System Default",value:"system"},{name:"Roboto",value:"Roboto, sans-serif"},{name:"Open Sans",value:'"Open Sans", sans-serif'},{name:"Lato",value:"Lato, sans-serif"},{name:"Montserrat",value:"Montserrat, sans-serif"},{name:"Inter",value:"Inter, sans-serif"}];handleSelect(t){this.dispatchEvent(new CustomEvent("font-selected",{detail:{font:t},bubbles:!0,composed:!0}))}render(){return F`
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
    `}static styles=a`
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
  `}customElements.define("font-settings",$t);class wt extends nt{static properties={settings:{type:Object},showDarkModePopup:{type:Boolean},showFontSettings:{type:Boolean}};constructor(){super(),this.showDarkModePopup=!1,this.showFontSettings=!1}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}render(){return F`
      <div class="appearance-settings">
        <div class="header">
          <button class="back-btn" @click=${()=>this.dispatchEvent(new Event("back"))}>
            <span class="emoji">◀️</span>
          </button>
          <h2>Appearance</h2>
        </div>

        <div class="settings-list">
          <button class="settings-item" @click=${()=>this.showDarkModePopup=!0}>
            <div class="item-content">
              <div class="item-title">Dark Mode</div>
              <div class="item-subtitle">${this.getDarkModeLabel()}</div>
            </div>
            <span class="emoji">▶️</span>
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
            <span class="emoji">▶️</span>
          </button>
        </div>

        ${this.showDarkModePopup?F`
          <dark-mode-popup
            .currentMode=${this.settings.darkMode}
            @mode-selected=${t=>{this.handleSettingChange("darkMode",t.detail.mode),this.showDarkModePopup=!1}}
            @close=${()=>this.showDarkModePopup=!1}
          ></dark-mode-popup>
        `:""}

        ${this.showFontSettings?F`
          <font-settings
            .currentFont=${this.settings.fontFamily}
            @font-selected=${t=>{this.handleSettingChange("fontFamily",t.detail.font),this.showFontSettings=!1}}
            @close=${()=>this.showFontSettings=!1}
          ></font-settings>
        `:""}
      </div>
    `}getDarkModeLabel(){switch(this.settings.darkMode){case"on":return"On";case"off":return"Off";default:return"As on Device"}}static styles=a`
    .appearance-settings {
      padding-bottom: 80px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      border-bottom: 1px solid #e8eaf6;
    }
    .back-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      font-size: 20px;
    }
    .back-btn:hover {
      background: #f5f7fa;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #5f6368;
    }
    .section-header {
      padding: 16px 20px 8px;
      font-size: 13px;
      font-weight: 700;
      color: #9e9e9e;
      text-transform: uppercase;
    }
    .settings-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-bottom: 1px solid #e8eaf6;
    }
    .settings-item:hover {
      background: #f5f7fa;
    }
    .item-content {
      flex: 1;
    }
    .item-content.full-width {
      width: 100%;
    }
    .item-title {
      font-weight: 600;
      margin-bottom: 4px;
      color: #5f6368;
    }
    .item-subtitle {
      font-size: 14px;
      color: #9e9e9e;
    }
    .tile-options {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    .tile-option {
      flex: 1;
      padding: 10px;
      border: 2px solid #e8eaf6;
      border-radius: 8px;
      background: transparent;
      cursor: pointer;
      font-weight: 600;
      color: #5f6368;
    }
    .tile-option:hover {
      border-color: #a8b5ff;
    }
    .tile-option.selected {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: #667eea;
    }
    .size-slider {
      width: 100%;
      margin: 12px 0;
    }
    .size-value {
      text-align: center;
      font-weight: 600;
      color: #667eea;
    }
    .emoji {
      font-size: 18px;
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `}customElements.define("appearance-settings",wt);class kt extends nt{static properties={settings:{type:Object}};handleSettingChange(t,e){const i={...this.settings.notifications,[t]:e};this.dispatchEvent(new CustomEvent("settings-changed",{detail:{notifications:i},bubbles:!0,composed:!0}))}render(){return F`
      <div class="notification-settings">
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
    `}static styles=a`
    .notification-settings {
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
  `}customElements.define("notification-settings",kt);class _t extends nt{static properties={api:{type:Object},categories:{type:Array},showAddDialog:{type:Boolean},newCategory:{type:Object}};constructor(){super(),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"}}handleAddCategory(){this.showAddDialog=!0}async handleSaveCategory(){this.newCategory.name.trim()&&(alert("Category management coming soon!"),this.showAddDialog=!1,this.newCategory={name:"",icon:"mdi:shape",color:"#4CAF50"})}render(){return F`
      <div class="category-settings">
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
    `}static styles=a`
    .category-settings {
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
  `}customElements.define("category-settings",_t);class St extends nt{render(){return F`
      <div class="support-settings">
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
    `}static styles=a`
    .support-settings {
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
  `}customElements.define("support-settings",St);class At extends nt{static properties={hass:{type:Object},api:{type:Object},settings:{type:Object},categories:{type:Array},currentSection:{type:String}};constructor(){super(),this.currentSection="main"}handleSettingChange(t,e){this.dispatchEvent(new CustomEvent("settings-changed",{detail:{[t]:e},bubbles:!0,composed:!0}))}handleNavigation(t){this.currentSection=t}renderMainSettings(){return F`
      <div class="settings-main">
        <div class="settings-header">
          <h2>Settings</h2>
        </div>

        <div class="settings-list">
          <!-- Profile Section -->
          <button class="settings-item" @click=${()=>this.handleNavigation("profile")}>
            <div class="item-icon">
              <ha-icon icon="mdi:account"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Profile</div>
              <div class="item-subtitle">${this.hass.user?.name||"User"}</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Appearance Section -->
          <button class="settings-item" @click=${()=>this.handleNavigation("appearance")}>
            <div class="item-icon">
              <ha-icon icon="mdi:palette"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Appearance</div>
              <div class="item-subtitle">Theme, dark mode, fonts</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Language -->
          <button class="settings-item">
            <div class="item-icon">
              <ha-icon icon="mdi:translate"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Language</div>
              <div class="item-subtitle">English (EN)</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Notifications -->
          <button class="settings-item" @click=${()=>this.handleNavigation("notifications")}>
            <div class="item-icon">
              <ha-icon icon="mdi:bell"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Notifications</div>
              <div class="item-subtitle">List sharing, emails</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Toggles -->
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

          <!-- Lists Section -->
          <div class="section-header">Lists</div>

          <button class="settings-item" @click=${()=>this.handleNavigation("categories")}>
            <div class="item-icon">
              <ha-icon icon="mdi:shape"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Manage Categories</div>
              <div class="item-subtitle">${this.categories.length} categories</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <!-- Support Section -->
          <div class="section-header">Support</div>

          <button class="settings-item" @click=${()=>this.handleNavigation("support")}>
            <div class="item-icon">
              <ha-icon icon="mdi:help-circle"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">FAQ & Support</div>
            </div>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <button class="settings-item" @click=${()=>window.location.reload()}>
            <div class="item-icon">
              <ha-icon icon="mdi:refresh"></ha-icon>
            </div>
            <div class="item-content">
              <div class="item-title">Refresh</div>
            </div>
          </button>

          <!-- App Info -->
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
          <profile-settings
            .hass=${this.hass}
            @back=${()=>this.currentSection="main"}
          ></profile-settings>
        `;case"appearance":return F`
          <appearance-settings
            .settings=${this.settings}
            @settings-changed=${t=>this.dispatchEvent(t)}
            @back=${()=>this.currentSection="main"}
          ></appearance-settings>
        `;case"notifications":return F`
          <notification-settings
            .settings=${this.settings}
            @settings-changed=${t=>this.dispatchEvent(t)}
            @back=${()=>this.currentSection="main"}
          ></notification-settings>
        `;case"categories":return F`
          <category-settings
            .api=${this.api}
            .categories=${this.categories}
            @back=${()=>this.currentSection="main"}
          ></category-settings>
        `;case"support":return F`
          <support-settings
            @back=${()=>this.currentSection="main"}
          ></support-settings>
        `;default:return this.renderMainSettings()}}static styles=a`
    .settings-main {
      padding-bottom: 80px;
    }
    .settings-header {
      padding: 20px;
      border-bottom: 1px solid var(--divider-color);
    }
    .settings-header h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .settings-list {
      padding: 0;
    }
    .section-header {
      padding: 16px 20px 8px;
      font-size: 13px;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .settings-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-bottom: 1px solid var(--divider-color);
      transition: background 0.2s;
    }
    .settings-item:hover {
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
      background-color: var(--primary-color);
    }
    input:checked + .slider:before {
      transform: translateX(22px);
    }
  `}customElements.define("settings-view",At);class Ct extends nt{static properties={hass:{type:Object},config:{type:Object},currentView:{type:String},lists:{type:Array},activeList:{type:Object},items:{type:Array},categories:{type:Array},total:{type:Object},loading:{type:Boolean},showAddDialog:{type:Boolean},showEditDialog:{type:Boolean},editingItem:{type:Object},settings:{type:Object},cardId:{type:String}};constructor(){super(),this.currentView="shopping",this.lists=[],this.activeList=null,this.items=[],this.categories=[],this.total={total:0,currency:"NZD",item_count:0},this.loading=!0,this.showAddDialog=!1,this.showEditDialog=!1,this.editingItem=null,this.cardId=this.generateCardId(),this.settings=this.loadSettings()}generateCardId(){return`card_${Date.now()}_${Math.random().toString(36).substring(2,9)}`}loadSettings(){const t={theme:"system",darkMode:"system",fontSize:16,fontFamily:"system",useSystemTextSize:!0,openLastUsedList:!0,keepScreenOn:!1,notifications:{listSharing:!0,emails:!0},recentProductsCount:8,tilesPerRow:3,useEmojis:!0},e=`shopping_list_settings_${this.cardId}`,i=localStorage.getItem("shopping_list_settings"),s=localStorage.getItem(e);return s?{...t,...JSON.parse(s)}:i?{...t,...JSON.parse(i)}:t}saveSettings(){const t=`shopping_list_settings_${this.cardId}`;localStorage.setItem(t,JSON.stringify(this.settings))}async firstUpdated(){this.api=new ct(this.hass),await this.loadData(),this.subscribeToUpdates()}async loadData(){try{this.loading=!0;const t=await this.api.getLists();this.lists=t.lists;const e=`last_used_list_${this.cardId}`;if(this.settings.openLastUsedList){const t=localStorage.getItem(e);this.activeList=this.lists.find(e=>e.id===t)||this.lists.find(t=>t.active)||this.lists[0]}else this.activeList=this.lists.find(t=>t.active)||this.lists[0];const i=await this.api.getCategories();this.categories=i.categories,this.activeList&&await this.loadActiveListData()}catch(t){console.error("Failed to load data:",t)}finally{this.loading=!1}}async loadActiveListData(){const t=await this.api.getItems(this.activeList.id);this.items=t.items;const e=await this.api.getListTotal(this.activeList.id);this.total=e;const i=`last_used_list_${this.cardId}`;localStorage.setItem(i,this.activeList.id)}async handleListChange(t){const e=t.detail.listId;await this.api.setActiveList(e),this.activeList=this.lists.find(t=>t.id===e),await this.loadActiveListData(),this.currentView="shopping"}async handleItemClick(t){const{itemId:e}=t.detail,i=this.items.find(t=>t.id===e);i&&!i.checked&&(await this.api.updateItem(e,{quantity:i.quantity+1}),await this.loadActiveListData())}async handleItemDecrease(t){const{itemId:e}=t.detail,i=this.items.find(t=>t.id===e);i&&(i.quantity>1?await this.api.updateItem(e,{quantity:i.quantity-1}):await this.api.deleteItem(e),await this.loadActiveListData())}async handleItemCheck(t){const{itemId:e,checked:i}=t.detail;await this.api.checkItem(e,i),await this.loadActiveListData()}async handleItemLongPress(t){this.editingItem=t.detail.item,this.showEditDialog=!0}async handleItemSwipeDelete(t){const{itemId:e}=t.detail;await this.api.deleteItem(e),await this.loadActiveListData()}handleAddButtonClick(){this.showAddDialog=!0}async handleAddItem(t){const e=t.detail,i=this.items.find(t=>t.product_id===e.product_id&&!t.checked);i?await this.api.updateItem(i.id,{quantity:i.quantity+e.quantity}):await this.api.addItem(this.activeList.id,e),await this.loadActiveListData(),this.showAddDialog=!1}async handleEditItem(t){const{itemId:e,data:i}=t.detail;await this.api.updateItem(e,i),await this.loadActiveListData(),this.showEditDialog=!1,this.editingItem=null}handleNavChange(t){this.currentView=t.detail.view}handleSettingsChange(t){this.settings={...this.settings,...t.detail},this.saveSettings(),this.requestUpdate()}subscribeToUpdates(){["shopping_list_manager_item_added","shopping_list_manager_item_updated","shopping_list_manager_item_checked","shopping_list_manager_item_deleted"].forEach(t=>{this.hass.connection.subscribeEvents(()=>{this.loadActiveListData()},t)})}renderCurrentView(){switch(this.currentView){case"shopping":return F`
          <list-header
            .activeList=${this.activeList}
            .itemCount=${this.items.filter(t=>!t.checked).length}
          ></list-header>

          <search-bar
            .api=${this.api}
            .settings=${this.settings}
            .categories=${this.categories}
            @add-item=${this.handleAddItem}
          ></search-bar>

          <item-grid
            .items=${this.items}
            .categories=${this.categories}
            .settings=${this.settings}
            @item-click=${this.handleItemClick}
            @item-decrease=${this.handleItemDecrease}
            @item-check=${this.handleItemCheck}
            @item-long-press=${this.handleItemLongPress}
            @item-swipe-delete=${this.handleItemSwipeDelete}
          ></item-grid>

          <div class="total-bar">
            <div class="total-amount">
              ${this.total.currency} $${this.total.total.toFixed(2)}
            </div>
            <div class="total-count">${this.total.item_count} items</div>
          </div>

          <floating-add-button
            @click=${this.handleAddButtonClick}
          ></floating-add-button>
        `;case"lists":return F`
          <lists-view
            .api=${this.api}
            .lists=${this.lists}
            .activeList=${this.activeList}
            .items=${this.items}
            .total=${this.total}
            @list-selected=${this.handleListChange}
          ></lists-view>
        `;case"loyalty":return F`
          <loyalty-cards-view
            .api=${this.api}
          ></loyalty-cards-view>
        `;case"settings":return F`
          <settings-view
            .hass=${this.hass}
            .api=${this.api}
            .settings=${this.settings}
            .categories=${this.categories}
            @settings-changed=${this.handleSettingsChange}
          ></settings-view>
        `;default:return F`<div>Unknown view</div>`}}render(){return this.loading?F`
        <ha-card>
          <div class="loading">
            <ha-circular-progress active></ha-circular-progress>
            <p>Loading...</p>
          </div>
        </ha-card>
      `:F`
      <ha-card>
        <div class="card-content">
          ${this.renderCurrentView()}
        </div>

        <bottom-nav
          .currentView=${this.currentView}
          @nav-changed=${this.handleNavChange}
        ></bottom-nav>

        ${this.showAddDialog?F`
          <add-item-dialog
            .api=${this.api}
            .categories=${this.categories}
            .settings=${this.settings}
            @add-item=${this.handleAddItem}
            @close=${()=>this.showAddDialog=!1}
          ></add-item-dialog>
        `:""}

        ${this.showEditDialog?F`
          <edit-item-dialog
            .api=${this.api}
            .item=${this.editingItem}
            .categories=${this.categories}
            @save-item=${this.handleEditItem}
            @delete-item=${this.handleItemSwipeDelete}
            @close=${()=>{this.showEditDialog=!1,this.editingItem=null}}
          ></edit-item-dialog>
        `:""}
      </ha-card>
    `}static styles=a`
    :host {
      display: block;
      height: 100vh;
    }
    ha-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: hidden;
      position: relative;
    }
    .card-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 140px;
      position: relative;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 32px;
      gap: 16px;
      color: var(--secondary-text-color);
    }
    .total-bar {
      position: sticky;
      bottom: 60px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 -2px 8px rgba(0,0,0,0.15);
      z-index: 90;
    }
    .total-amount {
      font-size: 22px;
      font-weight: 700;
    }
    .total-count {
      font-size: 14px;
      opacity: 0.9;
    }
  `;setConfig(t){this.config=t}getCardSize(){return 12}}customElements.define("shopping-list-manager-card",Ct);
