export class ShoppingListAPI {
  constructor(hass) {
    this.hass = hass;
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
    return await this.hass.callWS({ type: 'shopping_list_manager/lists/get_all' });
  }

  async createList(name, icon = 'mdi:cart', isPrivate = true) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/lists/create',
      name,
      icon,
      private: isPrivate
    });
  }

  async updateList(listId, data) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/lists/update',
      list_id: listId,
      ...data
    });
  }

  async deleteList(listId) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/lists/delete',
      list_id: listId
    });
  }

  async setActiveList(listId) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/lists/set_active',
      list_id: listId
    });
  }

  // Items
  async incrementItem(itemId, amount) {
    return await this.hass.callWS({
      type: "shopping_list_manager/items/increment",
      item_id: itemId,
      amount: amount
    });
  }

  async getItems(listId) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/items/get',
      list_id: listId
    });
  }

  async addItem(listId, data) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/items/add',
      list_id: listId,
      ...data
    });
  }

  async updateItem(itemId, data) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/items/update',
      item_id: itemId,
      ...data
    });
  }

  async checkItem(itemId, checked) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/items/check',
      item_id: itemId,
      checked
    });
  }

  async deleteItem(itemId) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/items/delete',
      item_id: itemId
    });
  }

  async bulkCheckItems(itemIds, checked) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/items/bulk_check',
      item_ids: itemIds,
      checked
    });
  }

  async clearCheckedItems(listId) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/items/clear_checked',
      list_id: listId
    });
  }

  async getListTotal(listId) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/items/get_total',
      list_id: listId
    });
  }

  // Products
  async searchProducts(query, filters = {}) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/products/search',
      query,
      limit: filters.limit || 20,
      exclude_allergens: filters.excludeAllergens,
      include_tags: filters.includeTags,
      substitution_group: filters.substitutionGroup
    });
  }

  async getProductSuggestions(limit = 20) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/products/suggestions',
      limit
    });
  }

  async getProductSubstitutes(productId, limit = 5) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/products/substitutes',
      product_id: productId,
      limit
    });
  }

  async addProduct(data) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/products/add',
      ...data
    });
  }

  async updateProduct(productId, data) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/products/update',
      product_id: productId,
      ...data
    });
  }

  async getProductsByIds(productIds) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/products/get_by_ids',
      product_ids: productIds
    });
  }

  // Categories
  async getCategories() {
    return await this.hass.callWS({
      type: 'shopping_list_manager/categories/get_all'
    });
  }

  // Integration settings
  async getIntegrationSettings() {
    return await this.hass.callWS({
      type: 'shopping_list_manager/get_integration_settings'
    });
  }

  async setCountry(country) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/set_country',
      country
    });
  }

  async updateListMembers(listId, allowedUsers) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/lists/update_members',
      list_id: listId,
      allowed_users: allowedUsers
    });
  }

  async getHAUsers() {
    return await this.hass.callWS({
      type: 'shopping_list_manager/users/get_all'
    });
  }

  async exportData() {
    return await this.hass.callWS({
      type: 'shopping_list_manager/export_data'
    });
  }

  async importData(data) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/import_data',
      data
    });
  }
}