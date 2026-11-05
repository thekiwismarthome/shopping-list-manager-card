// Startup reads should answer in well under a second; fail loudly instead of spinning forever.
const STARTUP_TIMEOUT_MS = 20000;

export class ShoppingListAPI {
  constructor(hass) {
    this.hass = hass;
  }

  // Wrapper around hass.callWS with an optional timeout.
  // Without a timeout a WS call that never answers leaves the UI spinning forever.
  _ws(msg, { timeout = 0 } = {}) {
    const label = msg.type.replace('shopping_list_manager/', '');
    let timer;
    const call = this.hass.callWS(msg);
    const guarded = timeout
      ? Promise.race([
          call,
          new Promise((_, reject) => {
            timer = setTimeout(
              () => reject(new Error(`timed out after ${timeout / 1000}s: ${label}`)),
              timeout
            );
          }),
        ])
      : call;
    return guarded.then(
      (res) => {
        clearTimeout(timer);
        return res;
      },
      (err) => {
        clearTimeout(timer);
        throw err;
      }
    );
  }

  // Subscribe to events for real-time updates
  subscribeToUpdates(callback) {
    const events = [
      'shopping_list_manager_item_added',
      'shopping_list_manager_item_updated',
      'shopping_list_manager_item_checked',
      'shopping_list_manager_item_deleted',
      'shopping_list_manager_list_updated'
    ];

    const unsubscribers = events.map(event => 
      this.hass.connection.subscribeEvents(callback, event)
    );

    // Return function to unsubscribe from all
    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }

  // Lists
  async getLists() {
    return await this._ws({ type: 'shopping_list_manager/lists/get_all' }, { timeout: STARTUP_TIMEOUT_MS });
  }

  async createList(name, icon = 'mdi:cart', isPrivate = true) {
    return await this._ws({
      type: 'shopping_list_manager/lists/create',
      name,
      icon,
      private: isPrivate
    });
  }

  async updateList(listId, data) {
    return await this._ws({
      type: 'shopping_list_manager/lists/update',
      list_id: listId,
      ...data
    });
  }

  async deleteList(listId) {
    return await this._ws({
      type: 'shopping_list_manager/lists/delete',
      list_id: listId
    });
  }

  async setActiveList(listId) {
    return await this._ws({
      type: 'shopping_list_manager/lists/set_active',
      list_id: listId
    });
  }

  // Items
  async incrementItem(itemId, amount) {
    return await this._ws({
      type: "shopping_list_manager/items/increment",
      item_id: itemId,
      amount: amount
    });
  }

  async getItems(listId) {
    return await this._ws({
      type: 'shopping_list_manager/items/get',
      list_id: listId
    }, { timeout: STARTUP_TIMEOUT_MS });
  }

  async addItem(listId, data) {
    return await this._ws({
      type: 'shopping_list_manager/items/add',
      list_id: listId,
      ...data
    });
  }

  async updateItem(itemId, data) {
    return await this._ws({
      type: 'shopping_list_manager/items/update',
      item_id: itemId,
      ...data
    });
  }

  async checkItem(itemId, checked) {
    return await this._ws({
      type: 'shopping_list_manager/items/check',
      item_id: itemId,
      checked
    });
  }

  async deleteItem(itemId) {
    return await this._ws({
      type: 'shopping_list_manager/items/delete',
      item_id: itemId
    });
  }

  async bulkCheckItems(itemIds, checked) {
    return await this._ws({
      type: 'shopping_list_manager/items/bulk_check',
      item_ids: itemIds,
      checked
    });
  }

  async clearCheckedItems(listId) {
    return await this._ws({
      type: 'shopping_list_manager/items/clear_checked',
      list_id: listId
    });
  }

  async getListTotal(listId) {
    return await this._ws({
      type: 'shopping_list_manager/items/get_total',
      list_id: listId
    }, { timeout: STARTUP_TIMEOUT_MS });
  }

  // Products
  async searchProductByBarcode(barcode) {
    return await this._ws({
      type: 'shopping_list_manager/products/search_by_barcode',
      barcode
    });
  }

  async searchOpenFoodFacts(query, pageSize = 5) {
    return await this._ws({
      type: 'shopping_list_manager/openfoodfacts/fetch',
      query,
      page_size: pageSize,
    });
  }

  async fetchOpenFoodFactsByBarcode(barcode) {
    return await this._ws({
      type: 'shopping_list_manager/openfoodfacts/fetch',
      barcode,
    });
  }

  async downloadProductImage(imageUrl, productName) {
    return await this._ws({
      type: 'shopping_list_manager/products/download_image',
      image_url: imageUrl,
      product_name: productName
    });
  }

  async searchProducts(query, filters = {}) {
    return await this._ws({
      type: 'shopping_list_manager/products/search',
      query,
      limit: filters.limit || 20,
      exclude_allergens: filters.excludeAllergens,
      include_tags: filters.includeTags,
      substitution_group: filters.substitutionGroup
    });
  }

  async getProductSuggestions(limit = 20) {
    return await this._ws({
      type: 'shopping_list_manager/products/suggestions',
      limit
    });
  }

  async getProductSubstitutes(productId, limit = 5) {
    return await this._ws({
      type: 'shopping_list_manager/products/substitutes',
      product_id: productId,
      limit
    });
  }

  async addProduct(data) {
    return await this._ws({
      type: 'shopping_list_manager/products/add',
      ...data
    });
  }

  async updateProduct(productId, data) {
    return await this._ws({
      type: 'shopping_list_manager/products/update',
      product_id: productId,
      ...data
    });
  }

  async getProductsByIds(productIds) {
    return await this._ws({
      type: 'shopping_list_manager/products/get_by_ids',
      product_ids: productIds
    });
  }

  // Categories
  async getCategories() {
    return await this._ws({
      type: 'shopping_list_manager/categories/get_all'
    }, { timeout: STARTUP_TIMEOUT_MS });
  }

  // Per-user card settings, synced across the user's devices
  async getUserSettings() {
    return await this._ws({
      type: 'shopping_list_manager/user_settings/get'
    }, { timeout: STARTUP_TIMEOUT_MS });
  }

  async setUserSettings(settings) {
    return await this._ws({
      type: 'shopping_list_manager/user_settings/set',
      settings
    });
  }

  // Integration settings
  async getIntegrationSettings() {
    return await this._ws({
      type: 'shopping_list_manager/get_integration_settings'
    }, { timeout: STARTUP_TIMEOUT_MS });
  }

  async setCountry(country) {
    return await this._ws({
      type: 'shopping_list_manager/set_country',
      country
    });
  }

  async createCustomRegion(code, name, currencySymbol = null, language = null) {
    return await this._ws({
      type: 'shopping_list_manager/regions/create',
      code,
      name,
      ...(currencySymbol ? { currency_symbol: currencySymbol } : {}),
      ...(language ? { language } : {}),
    });
  }

  async deleteCustomRegion(code) {
    return await this._ws({
      type: 'shopping_list_manager/regions/delete',
      code
    });
  }

  async updateListMembers(listId, allowedUsers) {
    return await this._ws({
      type: 'shopping_list_manager/lists/update_members',
      list_id: listId,
      allowed_users: allowedUsers
    });
  }

  async getHAUsers() {
    return await this._ws({
      type: 'shopping_list_manager/users/get_all'
    });
  }

  async exportData() {
    return await this._ws({
      type: 'shopping_list_manager/export_data'
    });
  }

  async importData(data) {
    return await this._ws({
      type: 'shopping_list_manager/import_data',
      data
    });
  }

  // Loyalty cards
  async getLoyaltyCards() {
    return await this._ws({
      type: 'shopping_list_manager/loyalty/get_all'
    });
  }

  async addLoyaltyCard(cardData) {
    return await this._ws({
      type: 'shopping_list_manager/loyalty/add',
      ...cardData
    });
  }

  async updateLoyaltyCard(cardId, cardData) {
    return await this._ws({
      type: 'shopping_list_manager/loyalty/update',
      card_id: cardId,
      ...cardData
    });
  }

  async deleteLoyaltyCard(cardId) {
    return await this._ws({
      type: 'shopping_list_manager/loyalty/delete',
      card_id: cardId
    });
  }

  async updateLoyaltyCardMembers(cardId, allowedUsers) {
    return await this._ws({
      type: 'shopping_list_manager/loyalty/update_members',
      card_id: cardId,
      allowed_users: allowedUsers
    });
  }
}