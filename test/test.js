"use strict"

var twoSum = require("../two-sum.js")
var testOverlap = require("test-float-overlap")

var DBL_EPSILON = Math.pow(2, -53)

require("tape")(function(t) {

	t.same(twoSum(1e64, 1), [1, 1e64])
	t.same(twoSum(1, 1), [0, 2])
	t.same(twoSum(0,-1415), [0, -1415])
	t.same(twoSum(1e-64, 1e64), [1e-64, 1e64])
	t.same(twoSum(0, 0), [0, 0])
	t.same(twoSum(9e15+1, 9e15), [1, 18000000000000000])

  t.same(twoSum(DBL_EPSILON, 1.0), [DBL_EPSILON, 1.0])

  for(var i=0; i<100; ++i) {
    var a = Math.random()
    var b = Math.random()

    var s = twoSum(a, b)
    t.ok(!testOverlap(s[0], s[1]))
    t.equals(s[1], a + b)
  }

  for(var i=0; i<100; ++i) {
    var a = 1.0 + Math.random()
    var b = DBL_EPSILON
    var s = twoSum(a, b)
    t.equals(s[0], DBL_EPSILON)
    t.equals(s[1], a)
  }

  t.end()
})