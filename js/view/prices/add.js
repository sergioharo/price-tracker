define(["parse", "underscore", "model/price"], function (Parse, _, Price) {
	return Parse.View.extend({
		template: _.template($("#add-price-template").html()),

		el: ".content",

		events: {
			"click button": "save",
			"keydown #price-input": "onPriceChanged"
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

		onPriceChanged: function (e) {
	        var amnt = this.$('#price-input').val();
	        var val = NaN;

	        if (e.keyCode == 8) // backspace
	        {
	        	amnt = amnt.slice(0, -1);
	            val = parseFloat(amnt) / 10.0;
	        }
	        else if (e.keyCode >= 48 && e.keyCode <= 57)
	        {
	            amnt += String.fromCharCode(e.keyCode);
	            val = parseFloat(amnt) * 10.0;
	        }
	        else if (e.keyCode == 9)
	        {
	        	return;
	        }
	        else
	        {
	        	return false;
	        }

	        if (isNaN(val)) {
	        	val = "0.00";
	        } else {
	        	val = val.toFixed(2);
	        }

	        this.$('#price-input').val(val);
	        return false;
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