define(["parse", "underscore"], function (Parse, _) {
	return Parse.View.extend({
		template: _.template($("#prices-result-template").html()),

		tagName: "li",

		className: "price-result",

		events: {

		},

		initialize: function () {

		},

		render: function () {
			this.$el.data("model", this.model);
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
});