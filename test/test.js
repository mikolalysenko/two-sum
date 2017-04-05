"use strict"

var twoSum = require("../two-sum.js")
var testOverlap = require("test-float-overlap")
var db = require("double-bits")
var BN = require("bn.js")


var DBL_EPSILON = Math.pow(2, -53)

require("tape")(function(t) {

	t.same(twoSum(1e64, 1), [1, 1e64])
	t.same(twoSum(1, 1), [0, 2])
	t.same(twoSum(0,-1415), [0, -1415])
	t.same(twoSum(1e-64, 1e64), [1e-64, 1e64])
	t.same(twoSum(0, 0), [0, 0])
	t.same(twoSum(9e15+1, 9e15), [1, 18000000000000000])
  t.same(twoSum(DBL_EPSILON, 1.0), [DBL_EPSILON, 1.0])

  function floatToBigNum(a) {
    var fa = db.fraction(a)
    var ea = db.exponent(a)
    var na = BN(fa[0]&((1<<24)-1))
    na = na.add(BN(fa[0]>>>24).ishln(24))
    na = na.add(BN(fa[1]).ishln(32))
    na.ishln(ea+1024)
    if(a < 0) {
      return na.neg()
    }
    return na
  }

  function verifyTwoSum(a, b, s) {
    var na = floatToBigNum(a)
    var nb = floatToBigNum(b)

    var n0 = floatToBigNum(s[0])
    var n1 = floatToBigNum(s[1])

    t.ok(!testOverlap(s[0], s[1]), "test non-overlap")
    t.ok(Math.abs(s[1]) >= Math.abs(s[0]), "test increasing")
    t.equals(s[1], a+b, "test higher order bit")

    var nab = na.add(nb)
    var ns = n0.add(n1)
    t.equals(nab.toString(16), ns.toString(16), "test exact")
  }

  for(var i=0; i<100; ++i) {
    var a = (Math.random() - 0.5)
    var b = (Math.random() - 0.5)
    var s = twoSum(a, b)
    verifyTwoSum(a, b, s)
    t.same(twoSum(b, a), s, "commutativity")
  }

  for(var i=0; i<100; ++i) {
    var a = 1.0 + Math.random()
    var b = DBL_EPSILON
    var s = twoSum(a, b)
    t.equals(s[0], DBL_EPSILON, "EPSILON")
    t.equals(s[1], a, "EPSILON")
  }

  var specialValues = [
    0,
    Math.pow(2, -53),
    Math.pow(2, -52),
    1 - Math.pow(2, -52),
    1,
    1 + Math.pow(2, -52),
    2,
    0.1,
    0.3,
    Math.random()
  ]
  for(var i=0; i<10; ++i) {
    specialValues.push(Math.random() * Math.pow(2, (Math.random()-0.5) * 1000))
  }
  for(var i=specialValues.length-1; i>0; --i) {
    specialValues.push(-specialValues[i])
  }

  for(var i=0; i<specialValues.length; ++i) {
    for(var j=0; j<specialValues.length; ++j) {
      var a = specialValues[i]
      var b = specialValues[j]
      var s = twoSum(a, b)
      verifyTwoSum(a, b, s)
      t.same(twoSum(b, a), s, "commutativity")
    }
  }

  t.end()
})
