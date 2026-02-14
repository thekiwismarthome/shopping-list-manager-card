export class ShoppingListAPI {
  constructor(hass) {
    this.hass = hass;
  }

  async getLists() {
    return await this.hass.callWS({ type: 'shopping_list_manager/lists/get_all' });
  }

  async setActiveList(listId) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/lists/set_active',
      list_id: listId
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

  async getListTotal(listId) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/items/get_total',
      list_id: listId
    });
  }

  async searchProducts(query, filters = {}) {
    return await this.hass.callWS({
      type: 'shopping_list_manager/products/search',
      query,
      limit: filters.limit || 10,
      exclude_allergens: filters.excludeAllergens,
      include_tags: filters.includeTags,
      substitution_group: filters.substitutionGroup
    });
  }

  async getCategories() {
    return await this.hass.callWS({
      type: 'shopping_list_manager/categories/get_all'
    });
  }
}
