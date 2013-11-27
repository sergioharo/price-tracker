define(["parse", "model/item", "view/search/list", "view/prices/list", "view/prices/add"], function(Parse, Item, SearchView, PricesView, AddPriceView) {
	return Parse.Router.extend({
		routes: {
			"": "home",
			"item/:itemID": "item",
			"price/:itemID": "price",
		},

		home: function () {
			var view = new SearchView();
  			view.render();
		},

		item: function (itemID) {
			new Parse.Query(Item.model).get(itemID, {
				success: function (item) {
					var view = new PricesView({
						model: item
					});
					view.render();
				}
			});
		},

		price: function (itemID) {
			new Parse.Query(Item.model).get(itemID, {
				success: function (item) {
					var view = new AddPriceView({
						model: item
					});
					view.render();
				}
			});
		}
	});
});