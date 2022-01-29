"use strict";

const RealContentHashPlugin = require("../lib/optimize/RealContentHashPlugin");

describe("RealContentHashPlugin", () => {
	const hashToAssets = new Map();
	hashToAssets.set("123", []);
	hashToAssets.set("234", []);

	it("hash", () => {
		expect(
			"123:function(){i(234)}".match(
				RealContentHashPlugin.hashRegExp(hashToAssets.keys())
			)
		).toEqual(["123", "234"]);
	});

	it("replacement", () => {
		const hashToNewHash = new Map();
		hashToNewHash.set("123", "abc");
		hashToNewHash.set("234", "bcd");

		expect(
			"{123:function(){i(234)}}".replace(
				RealContentHashPlugin.hashReplacer(hashToAssets.keys()),
				RealContentHashPlugin.hashReplacement(hashToNewHash)()
			)
		).toBe("{abc:function(){i('bcd')}}");
	});
});
