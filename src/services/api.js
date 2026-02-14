export class ShoppingListAPI {
  constructor(hass) {
    this.hass = hass;
  }

  // Lists
  async getLists() {
    return await this.hass.callWS({ type: 'shopping_list_manager/lists/get_all' });
  }

  async createList(name, icon = 'mdi:cart') {
    return await this.hass.callWS({ 
      type: 'shopping_list_manager/lists/create',
      name,
      icon
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

  // Categories
  async getCategories() {
    return await this.hass.callWS({
      type: 'shopping_list_manager/categories/get_all'
    });
  }
}