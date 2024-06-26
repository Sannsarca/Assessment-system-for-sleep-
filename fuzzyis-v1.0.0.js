var fuzzyis = (function(n) {
    function t(r) {
      if (e[r]) return e[r].exports;
      var i = e[r] = { exports: {}, id: r, loaded: !1 };
      return n[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
    }
    var e = {};
    return t.m = n, t.c = e, t.p = "", t(0);
  })([
    function(n, t, e) {
      "use strict";
      n.exports = { FIS: e(1), LinguisticVariable: e(5), Term: e(6), Rule: e(8) };
    },
    function(n, t, e) {
      "use strict";
      function r(n, t) {
        if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
      }
      function i(n, t) {
        for (var e = [], r = t.inputs.length, i = 0; i < t.rules.length; i++) {
          e.push([]);
          for (var o = 0; o < r; o++)
            if (t.rules[i].conditions[o]) {
              var u = t.inputs[o].findTerm(t.rules[i].conditions[o]);
              e[i].push(u.valueAt(n[o]));
            } else e[i].push(null);
        }
        return e;
      }
      function o(n, t, e) {
        for (var r = (t[1] - t[0]) / (e || 100), i = 0, o = t[0]; o < t[1]; )
          o += r, i += r * n.valueAt(o);
        o = t[0];
        for (var u = 0, a = i / 2; u < a; ) o += r, u += r * n.valueAt(o);
        return o;
      }
      var u = function() {
        function n(n, t) {
          for (var e = 0; e < t.length; e++) {
            var r = t[e];
            r.enumerable = r.enumerable || !1,
              r.configurable = !0,
              "value" in r && (r.writable = !0),
              Object.defineProperty(n, r.key, r);
          }
        }
        return function(t, e, r) {
          return e && n(t.prototype, e), r && n(t, r), t;
        };
      }(),
        a = e(2),
        s = e(3),
        l = e(4),
        f = function() {
          function n() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "Unnamed system",
              e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
              i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
              o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
            r(this, n), this.name = t, this.inputs = e, this.outputs = i, this.rules = o;
          }
          return u(n, [{
            key: "addInput",
            value: function(n) {
              this.inputs.push(n);
            }
          },
          {
            key: "addOutput",
            value: function(n) {
              this.outputs.push(n);
            }
          },
          {
            key: "addRule",
            value: function(n) {
              this.rules.push(n);
            }
          },
          {
            key: "getPreciseOutput",
            value: function(n) {
              var t = i(n, this), e = [], r = void 0;
              for (r = 0; r < this.rules.length; r++) {
                var u = this.rules[r];
                u.beliefDegree = "and" === u.connection ? l.getMin(t[r]) : getMax(t[r]),
                  u.beliefDegree *= u.weight, e.push([]);
                for (var f = 0; f < u.conclusions.length; f++) {
                  var c = this.outputs[f].findTerm(u.conclusions[f]);
                  e[r].push(new a(c, u.beliefDegree));
                }
              }
              var h = [];
              for (r = 0; r < this.outputs.length; r++) {
                for (var p = [], v = 0; v < e.length; v++) p.push(e[v][r]);
                h.push(new s(p));
              }
              var g = [];
              for (r = 0; r < this.outputs.length; r++) {
                var d = o(h[r], this.outputs[r].range, 100);
                g.push(d);
              }
              return g;
            }
          }]), n;
        }();
      n.exports = f;
    },
    function(n, t) {
      "use strict";
      function e(n, t) {
        if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
      }
      var r = function() {
        function n(n, t) {
          for (var e = 0; e < t.length; e++) {
            var r = t[e];
            r.enumerable = r.enumerable || !1,
              r.configurable = !0,
              "value" in r && (r.writable = !0),
              Object.defineProperty(n, r.key, r);
          }
        }
        return function(t, e, r) {
          return e && n(t.prototype, e), r && n(t, r), t;
        };
      }(),
        i = function() {
          function n(t, r) {
            if (e(this, n), "undefined" == typeof t || "undefined" == typeof r)
              throw new Error("Corrected term: no params for constructor");
            this.term = t, this.beliefDegree = r;
          }
          return r(n, [{
            key: "valueAt",
            value: function(n) {
              if (!this.term || 0 === this.beliefDegree) return 0;
              var t = this.term.valueAt(n), e = this.beliefDegree;
              return Math.min(e, t);
            }
          }]), n;
        }();
      n.exports = i;
    },
    function(n, t) {
      "use strict";
      function e(n, t) {
        if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
      }
      var r = function() {
        function n(n, t) {
          for (var e = 0; e < t.length; e++) {
            var r = t[e];
            r.enumerable = r.enumerable || !1,
              r.configurable = !0,
              "value" in r && (r.writable = !0),
              Object.defineProperty(n, r.key, r);
          }
        }
        return function(t, e, r) {
          return e && n(t.prototype, e), r && n(t, r), t;
        };
      }(),
        i = function() {
          function n(t) {
            e(this, n), this.arrayOfTerms = t;
          }
          return r(n, [{
            key: "valueAt",
            value: function(n) {
              if (!this.arrayOfTerms[0]) throw new Error("UnionOfTerms.valueAt: No terms in Union");
              var t = this.arrayOfTerms[0].valueAt(n);
              return this.arrayOfTerms.forEach(function(e) {
                e && (t = Math.max(t, e.valueAt(n)));
              }), t;
            }
          }]), n;
        }();
      n.exports = i;
    },
    function(n, t) {
      "use strict";
      function e(n, t, e) {
        for (var r = 0; r < n.length; r += 1) if (n[r][t] === e) return r;
        return -1;
      }
      function r(n) {
        if (!n.length) return null;
        for (var t = null, e = 0; e < n.length; e++) null !== n[e] && (null === t || n[e] < t) && (t = n[e]);
        return t;
      }
      function i(n) {
        if (!n.length) return null;
        for (var t = null, e = 0; e < n.length; e++) null !== n[e] && (null === t || n[e] > t) && (t = n[e]);
        return t;
      }
      function o(n, t, e) {
        return a(n, t, e, !0);
      }
      function u(n, t, e) {
        return a(n, t, e, !1);
      }
      function a(n, t, e, r) {
        var i = null, o = null;
        return "function" == typeof n ? i = n(e) : null !== n && (i = n),
          "function" == typeof t ? o = t(e) : null !== t && (o = t),
          "function" != typeof n && "function" != typeof t ? null :
            null !== i && null !== o ? r ? i < o ? i : o : i > o ? i : o :
              null === i ? o : i;
      }
      function s(n, t) {
        var e = 0;
        return n.forEach(function(n) {
          if (n) {
            var r = n(t);
            r > e && (e = r);
          }
        }), e;
      }
      function l(n) {
        if (n) for (var t in n) n.hasOwnProperty(t) && delete n[t];
      }
      n.exports = {
        indexOfObjByAttr: e,
        getMin: r,
        getMax: i,
        minOfTwoFunctions: o,
        maxOfTwoFunctions: u,
        getMinOrMaxOfTwoFunction: a,
        getMaxFromFunctions: s,
        objClear: l
      };
    },
    function(n, t, e) {
      "use strict";
      function r(n, t) {
        if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
      }
      var i = function() {
        function n(n, t) {
          for (var e = 0; e < t.length; e++) {
            var r = t[e];
            r.enumerable = r.enumerable || !1,
              r.configurable = !0,
              "value" in r && (r.writable = !0),
              Object.defineProperty(n, r.key, r);
          }
        }
        return function(t, e, r) {
          return e && n(t.prototype, e), r && n(t, r), t;
        };
      }(),
        o = e(4).indexOfObjByAttr,
        u = e(6),
        a = function() {
          function n(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [0, 1],
              i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            if (r(this, n), !t) throw new Error("Linguistic Variable must be named");
            this.name = t, this.range = e, this.terms = i;
          }
          return i(n, [{
            key: "addTerm",
            value: function(n) {
              if (!(n instanceof u)) throw new Error("addTerm: " + n + " is not an instance of Term.");
              this.terms.push(n);
            }
          },
          {
            key: "findTerm",
            value: function(n) {
              var t = o(this.terms, "name", n);
              return t > -1 ? this.terms[t] : null;
            }
          },
          {
            key: "removeTerm",
            value: function(n) {
              var t = o(this.terms, "name", n);
              return t > -1 && (this.terms.splice(o, 1), !0);
            }
          }]), n;
        }();
      n.exports = a;
    },
    function(n, t, e) {
      "use strict";
      function r(n, t) {
        if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
      }
      function i(n) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [0, 1], e = [];
        switch (t = t[1] - t[0], n) {
          case "triangle":
            e = [parseFloat((.1 * t).toFixed(4)), parseFloat((.5 * t).toFixed(4)), parseFloat((.9 * t).toFixed(4))];
            break;
          case "trapeze":
            e = [parseFloat((.1 * t).toFixed(4)), parseFloat((.4 * t).toFixed(4)), parseFloat((.6 * t).toFixed(4)), parseFloat((.9 * t).toFixed(4))];
            break;
          case "gauss":
            e = [parseFloat((.17 * t).toFixed(4)), parseFloat((.5 * t).toFixed(4))];
            break;
          case "sigma":
            e = [parseFloat((18 / t).toFixed(4)), parseFloat((.5 * t).toFixed(4))];
            break;
          case "singleton":
            e = [parseFloat((.5 * t).toFixed(4))];
            break;
          default:
            throw new Error("getDefaultParams: unrecognized mfType " + n);
        }
        return e;
      }
      var o = function() {
        function n(n, t) {
          for (var e = 0; e < t.length; e++) {
            var r = t[e];
            r.enumerable = r.enumerable || !1,
              r.configurable = !0,
              "value" in r && (r.writable = !0),
              Object.defineProperty(n, r.key, r);
          }
        }
        return function(t, e, r) {
          return e && n(t.prototype, e), r && n(t, r), t;
        };
      }(),
        u = e(7),
        a = function() {
          function n(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "triangle",
              o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i(e);
            r(this, n), this.name = t, u[e] || (e = "triangle"), this.mfType = e, this.mf = u[e], this.mfParams = o;
          }
          return o(n, [{
            key: "valueAt",
            value: function(n) {
              var t = this.mfParams.slice();
              return t.splice(0, 0, n), this.mf.apply(this, t);
            }
          }]), n;
        }();
      n.exports = a;
    },
    function(n, t) {
      "use strict";
      function e(n, t, e, r) {
        return n < t || n > r ? 0 : t <= n && n <= e ? (n - t) / (e - t) : (r - n) / (r - e);
      }
      function r(n, t, e, r, i) {
        return n < t || n > i ? 0 : t <= n && n <= e ? (n - t) / (e - t) : e <= n && n <= r ? 1 : (i - n) / (i - r);
      }
      function i(n, t, e) {
        return n === e ? 1 : Math.exp(-1 * ((n - e) * (n - e)) / (2 * t * t));
      }
      function o(n, t, e) {
        return n === e ? .5 : 1 / (1 + Math.exp(-1 * t * (n - e)));
      }
      function u(n, t) {
        return n === t ? 1 : 0;
      }
      n.exports = {
        triangle: e,
        trapeze: r,
        gauss: i,
        sigma: o,
        singleton: u
      };
    },
    function(n, t) {
      "use strict";
      function e(n, t) {
        if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
      }
      var r = function n(t, r) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "and",
          o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
        if (e(this, n), !(t && r && t.length && r.length))
          throw new Error("Rule: check input params");
        if (this.conditions = t.map(function(n) { return "null" === n ? null : n; }),
          this.conclusions = r.map(function(n) { return "null" === n ? null : n; }),
          "string" != typeof i)
          throw new Error("Rule: unrecognized connection " + i);
        "or" === i.toLowerCase() ? this.connection = "or" : this.connection = "and", this.weight = o;
      };
      n.exports = r;
    }
  ]);
  
  // Usage Example:
  const { FIS, LinguisticVariable, Term, Rule } = fuzzyis;
  
  // Define membership functions
  const termLow = new Term('Low', 'triangle', [0, 0, 50]);
  const termMedium = new Term('Medium', 'triangle', [0, 50, 100]);
  const termHigh = new Term('High', 'triangle', [50, 100, 100]);
  
  // Define linguistic variables
  const temperature = new LinguisticVariable('Temperature', [0, 100], [termLow, termMedium, termHigh]);
  const fanSpeed = new LinguisticVariable('FanSpeed', [0, 100], [termLow, termMedium, termHigh]);
  
  // Define rules
  const rule1 = new Rule(['Low'], ['Low']);
  const rule2 = new Rule(['Medium'], ['Medium']);
  const rule3 = new Rule(['High'], ['High']);
  
  // Create FIS and add variables and rules
  const fis = new FIS('Fan Speed Controller', [temperature], [fanSpeed], [rule1, rule2, rule3]);
  
  // Get output for a given input
  const output = fis.getPreciseOutput([75]); // Example input: temperature = 75
  console.log(output); // Output fan speed based on the fuzzy rules
  
