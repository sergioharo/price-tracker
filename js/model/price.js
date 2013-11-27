define(["parse"], function (Parse) {
	var item = Parse.Object.extend({
		className: "Price"
	});

	var itemCollection = Parse.Collection.extend({
		model: item
	});

	return {
		model: item,
		collection: itemCollection
	};
});