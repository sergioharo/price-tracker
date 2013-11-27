define(["parse", "underscore", "view/prices/item", "model/price"], function (Parse, _, ItemView, Price) {
	return Parse.View.extend({
		template: _.template($("#prices-template").html()),

		el: ".content",

		events: {
			"click button": "onButtonClick"
		},

		initialize: function () {
			_.bindAll(this, "addPrice", "addPrices", "render");

			this.collection = new Price.collection;
			this.collection.comparator = function(object) { return object.get("price")};
			this.collection.bind("add", this.addPrice);
			this.collection.bind("reset", this.addPrices);
			this.collection.query = new Parse.Query(Price.model).equalTo("item", this.model);
			this.collection.fetch();
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		addPrice: function (result) {
			var view = new ItemView({model: result});
			this.$("#prices-results").append(view.render().el)
		},

		addPrices: function (results) {
			this.$("#prices-results").empty();
			this.collection.each(this.addPrice);
		},

		onButtonClick: function() {
			window.location.hash = "/price/" + this.model.id
		}
	});
});