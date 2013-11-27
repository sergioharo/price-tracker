define(["parse"], function (Parse) {
	var item = Parse.Object.extend({
		className: "Item"
	});

	var itemCollection = Parse.Collection.extend({
		model: item
	});

	return {
		model: item,
		collection: itemCollection
	};
});