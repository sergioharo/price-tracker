define(["parse", "underscore", "view/search/item", "model/item"], function (Parse, _, ItemView, Item) {
	return Parse.View.extend({
		template: _.template($("#search-template").html()),

		el: ".content",

		events: {
			"keyup #search-box": "onSearchInput",
			"click .result": "onSearchResultClick"
		},

		initialize: function () {
			_.bindAll(this, "addSearchResult", "addSearchResults", "render", "onNewItem");

			this.collection = new Item.collection();
			this.collection.bind("add", this.addSearchResult);
			this.collection.bind("reset", this.addSearchResults);
			this.addNewSearchResult = new Item.model({
				name: "Create new item..."
			});
		},

		render: function () {
			this.$el.html(this.template({}));
			return this;
		},

		addSearchResult: function (result) {
			var view = new ItemView({model: result});
			this.$("#search-results").append(view.render().el)
		},

		addSearchResults: function (results) {
			this.$("#search-results").empty();
			this.collection.each(this.addSearchResult);
			this.addSearchResult(this.addNewSearchResult);
		},

		searchText: function () {
			return this.$("#search-box").val();
		},

		search: function (searchText) {
			console.log(searchText);
			this.collection.query = new Parse.Query(Item.model).startsWith("name", searchText);
			this.collection.fetch();
		},

		navigateToItem: function(item) {
			window.location.hash = "/item/" + item.id;
		},

		createNewItem: function (successCallback, errorCallback) {
			var item = new Item.model;
			item.save({
				name: this.searchText()
			}, {
				success: successCallback,
				error: errorCallback
			})
		},

		onNewItem: function(item) {
			this.navigateToItem(item);
		},

		onSearchInput: function (evt) {
			this.search(this.searchText());
		},

		onSearchResultClick: function (evt) {
			var target = evt.currentTarget;
			var model = $(target).data("model");
			if (model == this.addNewSearchResult) {
				this.createNewItem(this.onNewItem);
			} 
			else {
				this.navigateToItem(model);
			}
		}
	});
});