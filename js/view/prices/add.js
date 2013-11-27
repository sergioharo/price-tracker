define(["parse", "underscore", "model/price"], function (Parse, _, Price) {
	return Parse.View.extend({
		template: _.template($("#add-price-template").html()),

		el: ".content",

		events: {
			"click button": "save"
		},

		initialize: function () {

		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		validate: function(price, location)
		{
			if (isNaN(price))
				return false;
			if (!location)
				return false;
			return true;
		},

		save: function () {
			var self = this;
			var price = Number(this.$("#price-input").val());
			var location = this.$("#location-input").val();

			if (this.validate(price, location)) {
				var model = new Price.model;
				model.save({
					price: price,
					location: location,
					item: this.model
				}, {
					success: function () {
						window.location.hash = "/";
					}
				});
			}
		}
	});
});