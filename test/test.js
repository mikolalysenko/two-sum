"use strict"

var twoSum = require("../two-sum.js")

require("tape")(function(t) {

	t.same(twoSum(1e64, 1), [1e64,1])
	t.same(twoSum(1, 1), [2, 0])
	t.same(twoSum(0,-1415), [-1415, 0])
	t.same(twoSum(1e-64, 1e64), [1e64, 1e-64])
	t.same(twoSum(0, 0), [0, 0])
	t.same(twoSum(9e15+1, 9e15), [18000000000000000, 1])
	
	
	t.end()
})