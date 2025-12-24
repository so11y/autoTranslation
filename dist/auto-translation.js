import { babelParse as Bt, MagicString as zt } from "@vue/compiler-sfc";
import { createFilter as Ke } from "vite";
import Ct from "fs";
import Kt from "stream";
import Gt from "util";
import Yt from "assert";
import W from "path";
import { resolve as Vt, basename as Ht, extname as Qt } from "node:path";
import { pathToFileURL as Xt } from "node:url";
import Zt from "axios";
import { traverse as er, template as Ge } from "@babel/core";
import { generate as tr } from "@babel/generator";
var oe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rr(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var n = e.default;
  if (typeof n == "function") {
    var i = function c() {
      return this instanceof c ? Reflect.construct(n, arguments, this.constructor) : n.apply(this, arguments);
    };
    i.prototype = n.prototype;
  } else i = {};
  return Object.defineProperty(i, "__esModule", { value: !0 }), Object.keys(e).forEach(function(c) {
    var a = Object.getOwnPropertyDescriptor(e, c);
    Object.defineProperty(i, c, a.get ? a : {
      enumerable: !0,
      get: function() {
        return e[c];
      }
    });
  }), i;
}
var ae = {}, H = {}, Ye;
function L() {
  return Ye || (Ye = 1, H.fromCallback = function(e) {
    return Object.defineProperty(function(...n) {
      if (typeof n[n.length - 1] == "function") e.apply(this, n);
      else
        return new Promise((i, c) => {
          n.push((a, u) => a != null ? c(a) : i(u)), e.apply(this, n);
        });
    }, "name", { value: e.name });
  }, H.fromPromise = function(e) {
    return Object.defineProperty(function(...n) {
      const i = n[n.length - 1];
      if (typeof i != "function") return e.apply(this, n);
      n.pop(), e.apply(this, n).then((c) => i(null, c), i);
    }, "name", { value: e.name });
  }), H;
}
const nr = {}, ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nr
}, Symbol.toStringTag, { value: "Module" })), or = /* @__PURE__ */ rr(ir);
var ce, Ve;
function ar() {
  if (Ve) return ce;
  Ve = 1;
  var e = or, n = process.cwd, i = null, c = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return i || (i = n.call(process)), i;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var a = process.chdir;
    process.chdir = function(t) {
      i = null, a.call(process, t);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, a);
  }
  ce = u;
  function u(t) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && p(t), t.lutimes || S(t), t.chown = y(t.chown), t.fchown = y(t.fchown), t.lchown = y(t.lchown), t.chmod = f(t.chmod), t.fchmod = f(t.fchmod), t.lchmod = f(t.lchmod), t.chownSync = l(t.chownSync), t.fchownSync = l(t.fchownSync), t.lchownSync = l(t.lchownSync), t.chmodSync = g(t.chmodSync), t.fchmodSync = g(t.fchmodSync), t.lchmodSync = g(t.lchmodSync), t.stat = m(t.stat), t.fstat = m(t.fstat), t.lstat = m(t.lstat), t.statSync = b(t.statSync), t.fstatSync = b(t.fstatSync), t.lstatSync = b(t.lstatSync), t.chmod && !t.lchmod && (t.lchmod = function(r, o, s) {
      s && process.nextTick(s);
    }, t.lchmodSync = function() {
    }), t.chown && !t.lchown && (t.lchown = function(r, o, s, w) {
      w && process.nextTick(w);
    }, t.lchownSync = function() {
    }), c === "win32" && (t.rename = typeof t.rename != "function" ? t.rename : (function(r) {
      function o(s, w, k) {
        var h = Date.now(), d = 0;
        r(s, w, function v(E) {
          if (E && (E.code === "EACCES" || E.code === "EPERM" || E.code === "EBUSY") && Date.now() - h < 6e4) {
            setTimeout(function() {
              t.stat(w, function(O, _) {
                O && O.code === "ENOENT" ? r(s, w, v) : k(E);
              });
            }, d), d < 100 && (d += 10);
            return;
          }
          k && k(E);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(o, r), o;
    })(t.rename)), t.read = typeof t.read != "function" ? t.read : (function(r) {
      function o(s, w, k, h, d, v) {
        var E;
        if (v && typeof v == "function") {
          var O = 0;
          E = function(_, z, te) {
            if (_ && _.code === "EAGAIN" && O < 10)
              return O++, r.call(t, s, w, k, h, d, E);
            v.apply(this, arguments);
          };
        }
        return r.call(t, s, w, k, h, d, E);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(o, r), o;
    })(t.read), t.readSync = typeof t.readSync != "function" ? t.readSync : /* @__PURE__ */ (function(r) {
      return function(o, s, w, k, h) {
        for (var d = 0; ; )
          try {
            return r.call(t, o, s, w, k, h);
          } catch (v) {
            if (v.code === "EAGAIN" && d < 10) {
              d++;
              continue;
            }
            throw v;
          }
      };
    })(t.readSync);
    function p(r) {
      r.lchmod = function(o, s, w) {
        r.open(
          o,
          e.O_WRONLY | e.O_SYMLINK,
          s,
          function(k, h) {
            if (k) {
              w && w(k);
              return;
            }
            r.fchmod(h, s, function(d) {
              r.close(h, function(v) {
                w && w(d || v);
              });
            });
          }
        );
      }, r.lchmodSync = function(o, s) {
        var w = r.openSync(o, e.O_WRONLY | e.O_SYMLINK, s), k = !0, h;
        try {
          h = r.fchmodSync(w, s), k = !1;
        } finally {
          if (k)
            try {
              r.closeSync(w);
            } catch {
            }
          else
            r.closeSync(w);
        }
        return h;
      };
    }
    function S(r) {
      e.hasOwnProperty("O_SYMLINK") && r.futimes ? (r.lutimes = function(o, s, w, k) {
        r.open(o, e.O_SYMLINK, function(h, d) {
          if (h) {
            k && k(h);
            return;
          }
          r.futimes(d, s, w, function(v) {
            r.close(d, function(E) {
              k && k(v || E);
            });
          });
        });
      }, r.lutimesSync = function(o, s, w) {
        var k = r.openSync(o, e.O_SYMLINK), h, d = !0;
        try {
          h = r.futimesSync(k, s, w), d = !1;
        } finally {
          if (d)
            try {
              r.closeSync(k);
            } catch {
            }
          else
            r.closeSync(k);
        }
        return h;
      }) : r.futimes && (r.lutimes = function(o, s, w, k) {
        k && process.nextTick(k);
      }, r.lutimesSync = function() {
      });
    }
    function f(r) {
      return r && function(o, s, w) {
        return r.call(t, o, s, function(k) {
          F(k) && (k = null), w && w.apply(this, arguments);
        });
      };
    }
    function g(r) {
      return r && function(o, s) {
        try {
          return r.call(t, o, s);
        } catch (w) {
          if (!F(w)) throw w;
        }
      };
    }
    function y(r) {
      return r && function(o, s, w, k) {
        return r.call(t, o, s, w, function(h) {
          F(h) && (h = null), k && k.apply(this, arguments);
        });
      };
    }
    function l(r) {
      return r && function(o, s, w) {
        try {
          return r.call(t, o, s, w);
        } catch (k) {
          if (!F(k)) throw k;
        }
      };
    }
    function m(r) {
      return r && function(o, s, w) {
        typeof s == "function" && (w = s, s = null);
        function k(h, d) {
          d && (d.uid < 0 && (d.uid += 4294967296), d.gid < 0 && (d.gid += 4294967296)), w && w.apply(this, arguments);
        }
        return s ? r.call(t, o, s, k) : r.call(t, o, k);
      };
    }
    function b(r) {
      return r && function(o, s) {
        var w = s ? r.call(t, o, s) : r.call(t, o);
        return w && (w.uid < 0 && (w.uid += 4294967296), w.gid < 0 && (w.gid += 4294967296)), w;
      };
    }
    function F(r) {
      if (!r || r.code === "ENOSYS")
        return !0;
      var o = !process.getuid || process.getuid() !== 0;
      return !!(o && (r.code === "EINVAL" || r.code === "EPERM"));
    }
  }
  return ce;
}
var se, He;
function cr() {
  if (He) return se;
  He = 1;
  var e = Kt.Stream;
  se = n;
  function n(i) {
    return {
      ReadStream: c,
      WriteStream: a
    };
    function c(u, t) {
      if (!(this instanceof c)) return new c(u, t);
      e.call(this);
      var p = this;
      this.path = u, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, t = t || {};
      for (var S = Object.keys(t), f = 0, g = S.length; f < g; f++) {
        var y = S[f];
        this[y] = t[y];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          p._read();
        });
        return;
      }
      i.open(this.path, this.flags, this.mode, function(l, m) {
        if (l) {
          p.emit("error", l), p.readable = !1;
          return;
        }
        p.fd = m, p.emit("open", m), p._read();
      });
    }
    function a(u, t) {
      if (!(this instanceof a)) return new a(u, t);
      e.call(this), this.path = u, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, t = t || {};
      for (var p = Object.keys(t), S = 0, f = p.length; S < f; S++) {
        var g = p[S];
        this[g] = t[g];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = i.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return se;
}
var ue, Qe;
function sr() {
  if (Qe) return ue;
  Qe = 1, ue = n;
  var e = Object.getPrototypeOf || function(i) {
    return i.__proto__;
  };
  function n(i) {
    if (i === null || typeof i != "object")
      return i;
    if (i instanceof Object)
      var c = { __proto__: e(i) };
    else
      var c = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(i).forEach(function(a) {
      Object.defineProperty(c, a, Object.getOwnPropertyDescriptor(i, a));
    }), c;
  }
  return ue;
}
var Q, Xe;
function V() {
  if (Xe) return Q;
  Xe = 1;
  var e = Ct, n = ar(), i = cr(), c = sr(), a = Gt, u, t;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (u = Symbol.for("graceful-fs.queue"), t = Symbol.for("graceful-fs.previous")) : (u = "___graceful-fs.queue", t = "___graceful-fs.previous");
  function p() {
  }
  function S(r, o) {
    Object.defineProperty(r, u, {
      get: function() {
        return o;
      }
    });
  }
  var f = p;
  if (a.debuglog ? f = a.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (f = function() {
    var r = a.format.apply(a, arguments);
    r = "GFS4: " + r.split(/\n/).join(`
GFS4: `), console.error(r);
  }), !e[u]) {
    var g = oe[u] || [];
    S(e, g), e.close = (function(r) {
      function o(s, w) {
        return r.call(e, s, function(k) {
          k || b(), typeof w == "function" && w.apply(this, arguments);
        });
      }
      return Object.defineProperty(o, t, {
        value: r
      }), o;
    })(e.close), e.closeSync = (function(r) {
      function o(s) {
        r.apply(e, arguments), b();
      }
      return Object.defineProperty(o, t, {
        value: r
      }), o;
    })(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      f(e[u]), Yt.equal(e[u].length, 0);
    });
  }
  oe[u] || S(oe, e[u]), Q = y(c(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (Q = y(e), e.__patched = !0);
  function y(r) {
    n(r), r.gracefulify = y, r.createReadStream = Jt, r.createWriteStream = At;
    var o = r.readFile;
    r.readFile = s;
    function s(P, x, T) {
      return typeof x == "function" && (T = x, x = null), R(P, x, T);
      function R(N, D, q, C) {
        return o(N, D, function($) {
          $ && ($.code === "EMFILE" || $.code === "ENFILE") ? l([R, [N, D, q], $, C || Date.now(), Date.now()]) : typeof q == "function" && q.apply(this, arguments);
        });
      }
    }
    var w = r.writeFile;
    r.writeFile = k;
    function k(P, x, T, R) {
      return typeof T == "function" && (R = T, T = null), N(P, x, T, R);
      function N(D, q, C, $, I) {
        return w(D, q, C, function(j) {
          j && (j.code === "EMFILE" || j.code === "ENFILE") ? l([N, [D, q, C, $], j, I || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
        });
      }
    }
    var h = r.appendFile;
    h && (r.appendFile = d);
    function d(P, x, T, R) {
      return typeof T == "function" && (R = T, T = null), N(P, x, T, R);
      function N(D, q, C, $, I) {
        return h(D, q, C, function(j) {
          j && (j.code === "EMFILE" || j.code === "ENFILE") ? l([N, [D, q, C, $], j, I || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
        });
      }
    }
    var v = r.copyFile;
    v && (r.copyFile = E);
    function E(P, x, T, R) {
      return typeof T == "function" && (R = T, T = 0), N(P, x, T, R);
      function N(D, q, C, $, I) {
        return v(D, q, C, function(j) {
          j && (j.code === "EMFILE" || j.code === "ENFILE") ? l([N, [D, q, C, $], j, I || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
        });
      }
    }
    var O = r.readdir;
    r.readdir = z;
    var _ = /^v[0-5]\./;
    function z(P, x, T) {
      typeof x == "function" && (T = x, x = null);
      var R = _.test(process.version) ? function(q, C, $, I) {
        return O(q, N(
          q,
          C,
          $,
          I
        ));
      } : function(q, C, $, I) {
        return O(q, C, N(
          q,
          C,
          $,
          I
        ));
      };
      return R(P, x, T);
      function N(D, q, C, $) {
        return function(I, j) {
          I && (I.code === "EMFILE" || I.code === "ENFILE") ? l([
            R,
            [D, q, C],
            I,
            $ || Date.now(),
            Date.now()
          ]) : (j && j.sort && j.sort(), typeof C == "function" && C.call(this, I, j));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var te = i(r);
      U = te.ReadStream, B = te.WriteStream;
    }
    var re = r.ReadStream;
    re && (U.prototype = Object.create(re.prototype), U.prototype.open = Mt);
    var ne = r.WriteStream;
    ne && (B.prototype = Object.create(ne.prototype), B.prototype.open = Wt), Object.defineProperty(r, "ReadStream", {
      get: function() {
        return U;
      },
      set: function(P) {
        U = P;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r, "WriteStream", {
      get: function() {
        return B;
      },
      set: function(P) {
        B = P;
      },
      enumerable: !0,
      configurable: !0
    });
    var Be = U;
    Object.defineProperty(r, "FileReadStream", {
      get: function() {
        return Be;
      },
      set: function(P) {
        Be = P;
      },
      enumerable: !0,
      configurable: !0
    });
    var ze = B;
    Object.defineProperty(r, "FileWriteStream", {
      get: function() {
        return ze;
      },
      set: function(P) {
        ze = P;
      },
      enumerable: !0,
      configurable: !0
    });
    function U(P, x) {
      return this instanceof U ? (re.apply(this, arguments), this) : U.apply(Object.create(U.prototype), arguments);
    }
    function Mt() {
      var P = this;
      ie(P.path, P.flags, P.mode, function(x, T) {
        x ? (P.autoClose && P.destroy(), P.emit("error", x)) : (P.fd = T, P.emit("open", T), P.read());
      });
    }
    function B(P, x) {
      return this instanceof B ? (ne.apply(this, arguments), this) : B.apply(Object.create(B.prototype), arguments);
    }
    function Wt() {
      var P = this;
      ie(P.path, P.flags, P.mode, function(x, T) {
        x ? (P.destroy(), P.emit("error", x)) : (P.fd = T, P.emit("open", T));
      });
    }
    function Jt(P, x) {
      return new r.ReadStream(P, x);
    }
    function At(P, x) {
      return new r.WriteStream(P, x);
    }
    var Ut = r.open;
    r.open = ie;
    function ie(P, x, T, R) {
      return typeof T == "function" && (R = T, T = null), N(P, x, T, R);
      function N(D, q, C, $, I) {
        return Ut(D, q, C, function(j, on) {
          j && (j.code === "EMFILE" || j.code === "ENFILE") ? l([N, [D, q, C, $], j, I || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
        });
      }
    }
    return r;
  }
  function l(r) {
    f("ENQUEUE", r[0].name, r[1]), e[u].push(r), F();
  }
  var m;
  function b() {
    for (var r = Date.now(), o = 0; o < e[u].length; ++o)
      e[u][o].length > 2 && (e[u][o][3] = r, e[u][o][4] = r);
    F();
  }
  function F() {
    if (clearTimeout(m), m = void 0, e[u].length !== 0) {
      var r = e[u].shift(), o = r[0], s = r[1], w = r[2], k = r[3], h = r[4];
      if (k === void 0)
        f("RETRY", o.name, s), o.apply(null, s);
      else if (Date.now() - k >= 6e4) {
        f("TIMEOUT", o.name, s);
        var d = s.pop();
        typeof d == "function" && d.call(null, w);
      } else {
        var v = Date.now() - h, E = Math.max(h - k, 1), O = Math.min(E * 1.2, 100);
        v >= O ? (f("RETRY", o.name, s), o.apply(null, s.concat([k]))) : e[u].push(r);
      }
      m === void 0 && (m = setTimeout(F, 0));
    }
  }
  return Q;
}
var Ze;
function M() {
  return Ze || (Ze = 1, (function(e) {
    const n = L().fromCallback, i = V(), c = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "cp",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "glob",
      "lchmod",
      "lchown",
      "lutimes",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "statfs",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((a) => typeof i[a] == "function");
    Object.assign(e, i), c.forEach((a) => {
      e[a] = n(i[a]);
    }), e.exists = function(a, u) {
      return typeof u == "function" ? i.exists(a, u) : new Promise((t) => i.exists(a, t));
    }, e.read = function(a, u, t, p, S, f) {
      return typeof f == "function" ? i.read(a, u, t, p, S, f) : new Promise((g, y) => {
        i.read(a, u, t, p, S, (l, m, b) => {
          if (l) return y(l);
          g({ bytesRead: m, buffer: b });
        });
      });
    }, e.write = function(a, u, ...t) {
      return typeof t[t.length - 1] == "function" ? i.write(a, u, ...t) : new Promise((p, S) => {
        i.write(a, u, ...t, (f, g, y) => {
          if (f) return S(f);
          p({ bytesWritten: g, buffer: y });
        });
      });
    }, e.readv = function(a, u, ...t) {
      return typeof t[t.length - 1] == "function" ? i.readv(a, u, ...t) : new Promise((p, S) => {
        i.readv(a, u, ...t, (f, g, y) => {
          if (f) return S(f);
          p({ bytesRead: g, buffers: y });
        });
      });
    }, e.writev = function(a, u, ...t) {
      return typeof t[t.length - 1] == "function" ? i.writev(a, u, ...t) : new Promise((p, S) => {
        i.writev(a, u, ...t, (f, g, y) => {
          if (f) return S(f);
          p({ bytesWritten: g, buffers: y });
        });
      });
    }, typeof i.realpath.native == "function" ? e.realpath.native = n(i.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  })(ae)), ae;
}
var X = {}, fe = {}, et;
function ur() {
  if (et) return fe;
  et = 1;
  const e = W;
  return fe.checkPath = function(i) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(i.replace(e.parse(i).root, ""))) {
      const a = new Error(`Path contains invalid characters: ${i}`);
      throw a.code = "EINVAL", a;
    }
  }, fe;
}
var tt;
function fr() {
  if (tt) return X;
  tt = 1;
  const e = /* @__PURE__ */ M(), { checkPath: n } = /* @__PURE__ */ ur(), i = (c) => {
    const a = { mode: 511 };
    return typeof c == "number" ? c : { ...a, ...c }.mode;
  };
  return X.makeDir = async (c, a) => (n(c), e.mkdir(c, {
    mode: i(a),
    recursive: !0
  })), X.makeDirSync = (c, a) => (n(c), e.mkdirSync(c, {
    mode: i(a),
    recursive: !0
  })), X;
}
var le, rt;
function A() {
  if (rt) return le;
  rt = 1;
  const e = L().fromPromise, { makeDir: n, makeDirSync: i } = /* @__PURE__ */ fr(), c = e(n);
  return le = {
    mkdirs: c,
    mkdirsSync: i,
    // alias
    mkdirp: c,
    mkdirpSync: i,
    ensureDir: c,
    ensureDirSync: i
  }, le;
}
var ye, nt;
function K() {
  if (nt) return ye;
  nt = 1;
  const e = L().fromPromise, n = /* @__PURE__ */ M();
  function i(c) {
    return n.access(c).then(() => !0).catch(() => !1);
  }
  return ye = {
    pathExists: e(i),
    pathExistsSync: n.existsSync
  }, ye;
}
var me, it;
function Dt() {
  if (it) return me;
  it = 1;
  const e = /* @__PURE__ */ M(), n = L().fromPromise;
  async function i(a, u, t) {
    const p = await e.open(a, "r+");
    let S = null;
    try {
      await e.futimes(p, u, t);
    } finally {
      try {
        await e.close(p);
      } catch (f) {
        S = f;
      }
    }
    if (S)
      throw S;
  }
  function c(a, u, t) {
    const p = e.openSync(a, "r+");
    return e.futimesSync(p, u, t), e.closeSync(p);
  }
  return me = {
    utimesMillis: n(i),
    utimesMillisSync: c
  }, me;
}
var de, ot;
function G() {
  if (ot) return de;
  ot = 1;
  const e = /* @__PURE__ */ M(), n = W, i = L().fromPromise;
  function c(l, m, b) {
    const F = b.dereference ? (r) => e.stat(r, { bigint: !0 }) : (r) => e.lstat(r, { bigint: !0 });
    return Promise.all([
      F(l),
      F(m).catch((r) => {
        if (r.code === "ENOENT") return null;
        throw r;
      })
    ]).then(([r, o]) => ({ srcStat: r, destStat: o }));
  }
  function a(l, m, b) {
    let F;
    const r = b.dereference ? (s) => e.statSync(s, { bigint: !0 }) : (s) => e.lstatSync(s, { bigint: !0 }), o = r(l);
    try {
      F = r(m);
    } catch (s) {
      if (s.code === "ENOENT") return { srcStat: o, destStat: null };
      throw s;
    }
    return { srcStat: o, destStat: F };
  }
  async function u(l, m, b, F) {
    const { srcStat: r, destStat: o } = await c(l, m, F);
    if (o) {
      if (f(r, o)) {
        const s = n.basename(l), w = n.basename(m);
        if (b === "move" && s !== w && s.toLowerCase() === w.toLowerCase())
          return { srcStat: r, destStat: o, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (r.isDirectory() && !o.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${m}' with directory '${l}'.`);
      if (!r.isDirectory() && o.isDirectory())
        throw new Error(`Cannot overwrite directory '${m}' with non-directory '${l}'.`);
    }
    if (r.isDirectory() && g(l, m))
      throw new Error(y(l, m, b));
    return { srcStat: r, destStat: o };
  }
  function t(l, m, b, F) {
    const { srcStat: r, destStat: o } = a(l, m, F);
    if (o) {
      if (f(r, o)) {
        const s = n.basename(l), w = n.basename(m);
        if (b === "move" && s !== w && s.toLowerCase() === w.toLowerCase())
          return { srcStat: r, destStat: o, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (r.isDirectory() && !o.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${m}' with directory '${l}'.`);
      if (!r.isDirectory() && o.isDirectory())
        throw new Error(`Cannot overwrite directory '${m}' with non-directory '${l}'.`);
    }
    if (r.isDirectory() && g(l, m))
      throw new Error(y(l, m, b));
    return { srcStat: r, destStat: o };
  }
  async function p(l, m, b, F) {
    const r = n.resolve(n.dirname(l)), o = n.resolve(n.dirname(b));
    if (o === r || o === n.parse(o).root) return;
    let s;
    try {
      s = await e.stat(o, { bigint: !0 });
    } catch (w) {
      if (w.code === "ENOENT") return;
      throw w;
    }
    if (f(m, s))
      throw new Error(y(l, b, F));
    return p(l, m, o, F);
  }
  function S(l, m, b, F) {
    const r = n.resolve(n.dirname(l)), o = n.resolve(n.dirname(b));
    if (o === r || o === n.parse(o).root) return;
    let s;
    try {
      s = e.statSync(o, { bigint: !0 });
    } catch (w) {
      if (w.code === "ENOENT") return;
      throw w;
    }
    if (f(m, s))
      throw new Error(y(l, b, F));
    return S(l, m, o, F);
  }
  function f(l, m) {
    return m.ino !== void 0 && m.dev !== void 0 && m.ino === l.ino && m.dev === l.dev;
  }
  function g(l, m) {
    const b = n.resolve(l).split(n.sep).filter((r) => r), F = n.resolve(m).split(n.sep).filter((r) => r);
    return b.every((r, o) => F[o] === r);
  }
  function y(l, m, b) {
    return `Cannot ${b} '${l}' to a subdirectory of itself, '${m}'.`;
  }
  return de = {
    // checkPaths
    checkPaths: i(u),
    checkPathsSync: t,
    // checkParent
    checkParentPaths: i(p),
    checkParentPathsSync: S,
    // Misc
    isSrcSubdir: g,
    areIdentical: f
  }, de;
}
var he, at;
function lr() {
  if (at) return he;
  at = 1;
  async function e(n, i) {
    const c = [];
    for await (const a of n)
      c.push(
        i(a).then(
          () => null,
          (u) => u ?? new Error("unknown error")
        )
      );
    await Promise.all(
      c.map(
        (a) => a.then((u) => {
          if (u !== null) throw u;
        })
      )
    );
  }
  return he = {
    asyncIteratorConcurrentProcess: e
  }, he;
}
var pe, ct;
function yr() {
  if (ct) return pe;
  ct = 1;
  const e = /* @__PURE__ */ M(), n = W, { mkdirs: i } = /* @__PURE__ */ A(), { pathExists: c } = /* @__PURE__ */ K(), { utimesMillis: a } = /* @__PURE__ */ Dt(), u = /* @__PURE__ */ G(), { asyncIteratorConcurrentProcess: t } = /* @__PURE__ */ lr();
  async function p(r, o, s = {}) {
    typeof s == "function" && (s = { filter: s }), s.clobber = "clobber" in s ? !!s.clobber : !0, s.overwrite = "overwrite" in s ? !!s.overwrite : s.clobber, s.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    );
    const { srcStat: w, destStat: k } = await u.checkPaths(r, o, "copy", s);
    if (await u.checkParentPaths(r, w, o, "copy"), !await S(r, o, s)) return;
    const d = n.dirname(o);
    await c(d) || await i(d), await f(k, r, o, s);
  }
  async function S(r, o, s) {
    return s.filter ? s.filter(r, o) : !0;
  }
  async function f(r, o, s, w) {
    const h = await (w.dereference ? e.stat : e.lstat)(o);
    if (h.isDirectory()) return b(h, r, o, s, w);
    if (h.isFile() || h.isCharacterDevice() || h.isBlockDevice()) return g(h, r, o, s, w);
    if (h.isSymbolicLink()) return F(r, o, s, w);
    throw h.isSocket() ? new Error(`Cannot copy a socket file: ${o}`) : h.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${o}`) : new Error(`Unknown file: ${o}`);
  }
  async function g(r, o, s, w, k) {
    if (!o) return y(r, s, w, k);
    if (k.overwrite)
      return await e.unlink(w), y(r, s, w, k);
    if (k.errorOnExist)
      throw new Error(`'${w}' already exists`);
  }
  async function y(r, o, s, w) {
    if (await e.copyFile(o, s), w.preserveTimestamps) {
      l(r.mode) && await m(s, r.mode);
      const k = await e.stat(o);
      await a(s, k.atime, k.mtime);
    }
    return e.chmod(s, r.mode);
  }
  function l(r) {
    return (r & 128) === 0;
  }
  function m(r, o) {
    return e.chmod(r, o | 128);
  }
  async function b(r, o, s, w, k) {
    o || await e.mkdir(w), await t(await e.opendir(s), async (h) => {
      const d = n.join(s, h.name), v = n.join(w, h.name);
      if (await S(d, v, k)) {
        const { destStat: O } = await u.checkPaths(d, v, "copy", k);
        await f(O, d, v, k);
      }
    }), o || await e.chmod(w, r.mode);
  }
  async function F(r, o, s, w) {
    let k = await e.readlink(o);
    if (w.dereference && (k = n.resolve(process.cwd(), k)), !r)
      return e.symlink(k, s);
    let h = null;
    try {
      h = await e.readlink(s);
    } catch (d) {
      if (d.code === "EINVAL" || d.code === "UNKNOWN") return e.symlink(k, s);
      throw d;
    }
    if (w.dereference && (h = n.resolve(process.cwd(), h)), k !== h) {
      if (u.isSrcSubdir(k, h))
        throw new Error(`Cannot copy '${k}' to a subdirectory of itself, '${h}'.`);
      if (u.isSrcSubdir(h, k))
        throw new Error(`Cannot overwrite '${h}' with '${k}'.`);
    }
    return await e.unlink(s), e.symlink(k, s);
  }
  return pe = p, pe;
}
var we, st;
function mr() {
  if (st) return we;
  st = 1;
  const e = V(), n = W, i = A().mkdirsSync, c = Dt().utimesMillisSync, a = /* @__PURE__ */ G();
  function u(h, d, v) {
    typeof v == "function" && (v = { filter: v }), v = v || {}, v.clobber = "clobber" in v ? !!v.clobber : !0, v.overwrite = "overwrite" in v ? !!v.overwrite : v.clobber, v.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: E, destStat: O } = a.checkPathsSync(h, d, "copy", v);
    if (a.checkParentPathsSync(h, E, d, "copy"), v.filter && !v.filter(h, d)) return;
    const _ = n.dirname(d);
    return e.existsSync(_) || i(_), t(O, h, d, v);
  }
  function t(h, d, v, E) {
    const _ = (E.dereference ? e.statSync : e.lstatSync)(d);
    if (_.isDirectory()) return F(_, h, d, v, E);
    if (_.isFile() || _.isCharacterDevice() || _.isBlockDevice()) return p(_, h, d, v, E);
    if (_.isSymbolicLink()) return w(h, d, v, E);
    throw _.isSocket() ? new Error(`Cannot copy a socket file: ${d}`) : _.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${d}`) : new Error(`Unknown file: ${d}`);
  }
  function p(h, d, v, E, O) {
    return d ? S(h, v, E, O) : f(h, v, E, O);
  }
  function S(h, d, v, E) {
    if (E.overwrite)
      return e.unlinkSync(v), f(h, d, v, E);
    if (E.errorOnExist)
      throw new Error(`'${v}' already exists`);
  }
  function f(h, d, v, E) {
    return e.copyFileSync(d, v), E.preserveTimestamps && g(h.mode, d, v), m(v, h.mode);
  }
  function g(h, d, v) {
    return y(h) && l(v, h), b(d, v);
  }
  function y(h) {
    return (h & 128) === 0;
  }
  function l(h, d) {
    return m(h, d | 128);
  }
  function m(h, d) {
    return e.chmodSync(h, d);
  }
  function b(h, d) {
    const v = e.statSync(h);
    return c(d, v.atime, v.mtime);
  }
  function F(h, d, v, E, O) {
    return d ? o(v, E, O) : r(h.mode, v, E, O);
  }
  function r(h, d, v, E) {
    return e.mkdirSync(v), o(d, v, E), m(v, h);
  }
  function o(h, d, v) {
    const E = e.opendirSync(h);
    try {
      let O;
      for (; (O = E.readSync()) !== null; )
        s(O.name, h, d, v);
    } finally {
      E.closeSync();
    }
  }
  function s(h, d, v, E) {
    const O = n.join(d, h), _ = n.join(v, h);
    if (E.filter && !E.filter(O, _)) return;
    const { destStat: z } = a.checkPathsSync(O, _, "copy", E);
    return t(z, O, _, E);
  }
  function w(h, d, v, E) {
    let O = e.readlinkSync(d);
    if (E.dereference && (O = n.resolve(process.cwd(), O)), h) {
      let _;
      try {
        _ = e.readlinkSync(v);
      } catch (z) {
        if (z.code === "EINVAL" || z.code === "UNKNOWN") return e.symlinkSync(O, v);
        throw z;
      }
      if (E.dereference && (_ = n.resolve(process.cwd(), _)), O !== _) {
        if (a.isSrcSubdir(O, _))
          throw new Error(`Cannot copy '${O}' to a subdirectory of itself, '${_}'.`);
        if (a.isSrcSubdir(_, O))
          throw new Error(`Cannot overwrite '${_}' with '${O}'.`);
      }
      return k(O, v);
    } else
      return e.symlinkSync(O, v);
  }
  function k(h, d) {
    return e.unlinkSync(d), e.symlinkSync(h, d);
  }
  return we = u, we;
}
var Se, ut;
function Je() {
  if (ut) return Se;
  ut = 1;
  const e = L().fromPromise;
  return Se = {
    copy: e(/* @__PURE__ */ yr()),
    copySync: /* @__PURE__ */ mr()
  }, Se;
}
var ve, ft;
function ee() {
  if (ft) return ve;
  ft = 1;
  const e = V(), n = L().fromCallback;
  function i(a, u) {
    e.rm(a, { recursive: !0, force: !0 }, u);
  }
  function c(a) {
    e.rmSync(a, { recursive: !0, force: !0 });
  }
  return ve = {
    remove: n(i),
    removeSync: c
  }, ve;
}
var ge, lt;
function dr() {
  if (lt) return ge;
  lt = 1;
  const e = L().fromPromise, n = /* @__PURE__ */ M(), i = W, c = /* @__PURE__ */ A(), a = /* @__PURE__ */ ee(), u = e(async function(S) {
    let f;
    try {
      f = await n.readdir(S);
    } catch {
      return c.mkdirs(S);
    }
    return Promise.all(f.map((g) => a.remove(i.join(S, g))));
  });
  function t(p) {
    let S;
    try {
      S = n.readdirSync(p);
    } catch {
      return c.mkdirsSync(p);
    }
    S.forEach((f) => {
      f = i.join(p, f), a.removeSync(f);
    });
  }
  return ge = {
    emptyDirSync: t,
    emptydirSync: t,
    emptyDir: u,
    emptydir: u
  }, ge;
}
var ke, yt;
function hr() {
  if (yt) return ke;
  yt = 1;
  const e = L().fromPromise, n = W, i = /* @__PURE__ */ M(), c = /* @__PURE__ */ A();
  async function a(t) {
    let p;
    try {
      p = await i.stat(t);
    } catch {
    }
    if (p && p.isFile()) return;
    const S = n.dirname(t);
    let f = null;
    try {
      f = await i.stat(S);
    } catch (g) {
      if (g.code === "ENOENT") {
        await c.mkdirs(S), await i.writeFile(t, "");
        return;
      } else
        throw g;
    }
    f.isDirectory() ? await i.writeFile(t, "") : await i.readdir(S);
  }
  function u(t) {
    let p;
    try {
      p = i.statSync(t);
    } catch {
    }
    if (p && p.isFile()) return;
    const S = n.dirname(t);
    try {
      i.statSync(S).isDirectory() || i.readdirSync(S);
    } catch (f) {
      if (f && f.code === "ENOENT") c.mkdirsSync(S);
      else throw f;
    }
    i.writeFileSync(t, "");
  }
  return ke = {
    createFile: e(a),
    createFileSync: u
  }, ke;
}
var be, mt;
function pr() {
  if (mt) return be;
  mt = 1;
  const e = L().fromPromise, n = W, i = /* @__PURE__ */ M(), c = /* @__PURE__ */ A(), { pathExists: a } = /* @__PURE__ */ K(), { areIdentical: u } = /* @__PURE__ */ G();
  async function t(S, f) {
    let g;
    try {
      g = await i.lstat(f);
    } catch {
    }
    let y;
    try {
      y = await i.lstat(S);
    } catch (b) {
      throw b.message = b.message.replace("lstat", "ensureLink"), b;
    }
    if (g && u(y, g)) return;
    const l = n.dirname(f);
    await a(l) || await c.mkdirs(l), await i.link(S, f);
  }
  function p(S, f) {
    let g;
    try {
      g = i.lstatSync(f);
    } catch {
    }
    try {
      const m = i.lstatSync(S);
      if (g && u(m, g)) return;
    } catch (m) {
      throw m.message = m.message.replace("lstat", "ensureLink"), m;
    }
    const y = n.dirname(f);
    return i.existsSync(y) || c.mkdirsSync(y), i.linkSync(S, f);
  }
  return be = {
    createLink: e(t),
    createLinkSync: p
  }, be;
}
var Ee, dt;
function wr() {
  if (dt) return Ee;
  dt = 1;
  const e = W, n = /* @__PURE__ */ M(), { pathExists: i } = /* @__PURE__ */ K(), c = L().fromPromise;
  async function a(t, p) {
    if (e.isAbsolute(t)) {
      try {
        await n.lstat(t);
      } catch (y) {
        throw y.message = y.message.replace("lstat", "ensureSymlink"), y;
      }
      return {
        toCwd: t,
        toDst: t
      };
    }
    const S = e.dirname(p), f = e.join(S, t);
    if (await i(f))
      return {
        toCwd: f,
        toDst: t
      };
    try {
      await n.lstat(t);
    } catch (y) {
      throw y.message = y.message.replace("lstat", "ensureSymlink"), y;
    }
    return {
      toCwd: t,
      toDst: e.relative(S, t)
    };
  }
  function u(t, p) {
    if (e.isAbsolute(t)) {
      if (!n.existsSync(t)) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: t,
        toDst: t
      };
    }
    const S = e.dirname(p), f = e.join(S, t);
    if (n.existsSync(f))
      return {
        toCwd: f,
        toDst: t
      };
    if (!n.existsSync(t)) throw new Error("relative srcpath does not exist");
    return {
      toCwd: t,
      toDst: e.relative(S, t)
    };
  }
  return Ee = {
    symlinkPaths: c(a),
    symlinkPathsSync: u
  }, Ee;
}
var Fe, ht;
function Sr() {
  if (ht) return Fe;
  ht = 1;
  const e = /* @__PURE__ */ M(), n = L().fromPromise;
  async function i(a, u) {
    if (u) return u;
    let t;
    try {
      t = await e.lstat(a);
    } catch {
      return "file";
    }
    return t && t.isDirectory() ? "dir" : "file";
  }
  function c(a, u) {
    if (u) return u;
    let t;
    try {
      t = e.lstatSync(a);
    } catch {
      return "file";
    }
    return t && t.isDirectory() ? "dir" : "file";
  }
  return Fe = {
    symlinkType: n(i),
    symlinkTypeSync: c
  }, Fe;
}
var Pe, pt;
function vr() {
  if (pt) return Pe;
  pt = 1;
  const e = L().fromPromise, n = W, i = /* @__PURE__ */ M(), { mkdirs: c, mkdirsSync: a } = /* @__PURE__ */ A(), { symlinkPaths: u, symlinkPathsSync: t } = /* @__PURE__ */ wr(), { symlinkType: p, symlinkTypeSync: S } = /* @__PURE__ */ Sr(), { pathExists: f } = /* @__PURE__ */ K(), { areIdentical: g } = /* @__PURE__ */ G();
  async function y(m, b, F) {
    let r;
    try {
      r = await i.lstat(b);
    } catch {
    }
    if (r && r.isSymbolicLink()) {
      const [k, h] = await Promise.all([
        i.stat(m),
        i.stat(b)
      ]);
      if (g(k, h)) return;
    }
    const o = await u(m, b);
    m = o.toDst;
    const s = await p(o.toCwd, F), w = n.dirname(b);
    return await f(w) || await c(w), i.symlink(m, b, s);
  }
  function l(m, b, F) {
    let r;
    try {
      r = i.lstatSync(b);
    } catch {
    }
    if (r && r.isSymbolicLink()) {
      const k = i.statSync(m), h = i.statSync(b);
      if (g(k, h)) return;
    }
    const o = t(m, b);
    m = o.toDst, F = S(o.toCwd, F);
    const s = n.dirname(b);
    return i.existsSync(s) || a(s), i.symlinkSync(m, b, F);
  }
  return Pe = {
    createSymlink: e(y),
    createSymlinkSync: l
  }, Pe;
}
var Oe, wt;
function gr() {
  if (wt) return Oe;
  wt = 1;
  const { createFile: e, createFileSync: n } = /* @__PURE__ */ hr(), { createLink: i, createLinkSync: c } = /* @__PURE__ */ pr(), { createSymlink: a, createSymlinkSync: u } = /* @__PURE__ */ vr();
  return Oe = {
    // file
    createFile: e,
    createFileSync: n,
    ensureFile: e,
    ensureFileSync: n,
    // link
    createLink: i,
    createLinkSync: c,
    ensureLink: i,
    ensureLinkSync: c,
    // symlink
    createSymlink: a,
    createSymlinkSync: u,
    ensureSymlink: a,
    ensureSymlinkSync: u
  }, Oe;
}
var _e, St;
function Ae() {
  if (St) return _e;
  St = 1;
  function e(i, { EOL: c = `
`, finalEOL: a = !0, replacer: u = null, spaces: t } = {}) {
    const p = a ? c : "";
    return JSON.stringify(i, u, t).replace(/\n/g, c) + p;
  }
  function n(i) {
    return Buffer.isBuffer(i) && (i = i.toString("utf8")), i.replace(/^\uFEFF/, "");
  }
  return _e = { stringify: e, stripBom: n }, _e;
}
var Te, vt;
function kr() {
  if (vt) return Te;
  vt = 1;
  let e;
  try {
    e = V();
  } catch {
    e = Ct;
  }
  const n = L(), { stringify: i, stripBom: c } = Ae();
  async function a(g, y = {}) {
    typeof y == "string" && (y = { encoding: y });
    const l = y.fs || e, m = "throws" in y ? y.throws : !0;
    let b = await n.fromCallback(l.readFile)(g, y);
    b = c(b);
    let F;
    try {
      F = JSON.parse(b, y ? y.reviver : null);
    } catch (r) {
      if (m)
        throw r.message = `${g}: ${r.message}`, r;
      return null;
    }
    return F;
  }
  const u = n.fromPromise(a);
  function t(g, y = {}) {
    typeof y == "string" && (y = { encoding: y });
    const l = y.fs || e, m = "throws" in y ? y.throws : !0;
    try {
      let b = l.readFileSync(g, y);
      return b = c(b), JSON.parse(b, y.reviver);
    } catch (b) {
      if (m)
        throw b.message = `${g}: ${b.message}`, b;
      return null;
    }
  }
  async function p(g, y, l = {}) {
    const m = l.fs || e, b = i(y, l);
    await n.fromCallback(m.writeFile)(g, b, l);
  }
  const S = n.fromPromise(p);
  function f(g, y, l = {}) {
    const m = l.fs || e, b = i(y, l);
    return m.writeFileSync(g, b, l);
  }
  return Te = {
    readFile: u,
    readFileSync: t,
    writeFile: S,
    writeFileSync: f
  }, Te;
}
var xe, gt;
function br() {
  if (gt) return xe;
  gt = 1;
  const e = kr();
  return xe = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, xe;
}
var $e, kt;
function Ue() {
  if (kt) return $e;
  kt = 1;
  const e = L().fromPromise, n = /* @__PURE__ */ M(), i = W, c = /* @__PURE__ */ A(), a = K().pathExists;
  async function u(p, S, f = "utf-8") {
    const g = i.dirname(p);
    return await a(g) || await c.mkdirs(g), n.writeFile(p, S, f);
  }
  function t(p, ...S) {
    const f = i.dirname(p);
    n.existsSync(f) || c.mkdirsSync(f), n.writeFileSync(p, ...S);
  }
  return $e = {
    outputFile: e(u),
    outputFileSync: t
  }, $e;
}
var je, bt;
function Er() {
  if (bt) return je;
  bt = 1;
  const { stringify: e } = Ae(), { outputFile: n } = /* @__PURE__ */ Ue();
  async function i(c, a, u = {}) {
    const t = e(a, u);
    await n(c, t, u);
  }
  return je = i, je;
}
var qe, Et;
function Fr() {
  if (Et) return qe;
  Et = 1;
  const { stringify: e } = Ae(), { outputFileSync: n } = /* @__PURE__ */ Ue();
  function i(c, a, u) {
    const t = e(a, u);
    n(c, t, u);
  }
  return qe = i, qe;
}
var Ce, Ft;
function Pr() {
  if (Ft) return Ce;
  Ft = 1;
  const e = L().fromPromise, n = /* @__PURE__ */ br();
  return n.outputJson = e(/* @__PURE__ */ Er()), n.outputJsonSync = /* @__PURE__ */ Fr(), n.outputJSON = n.outputJson, n.outputJSONSync = n.outputJsonSync, n.writeJSON = n.writeJson, n.writeJSONSync = n.writeJsonSync, n.readJSON = n.readJson, n.readJSONSync = n.readJsonSync, Ce = n, Ce;
}
var De, Pt;
function Or() {
  if (Pt) return De;
  Pt = 1;
  const e = /* @__PURE__ */ M(), n = W, { copy: i } = /* @__PURE__ */ Je(), { remove: c } = /* @__PURE__ */ ee(), { mkdirp: a } = /* @__PURE__ */ A(), { pathExists: u } = /* @__PURE__ */ K(), t = /* @__PURE__ */ G();
  async function p(g, y, l = {}) {
    const m = l.overwrite || l.clobber || !1, { srcStat: b, isChangingCase: F = !1 } = await t.checkPaths(g, y, "move", l);
    await t.checkParentPaths(g, b, y, "move");
    const r = n.dirname(y);
    return n.parse(r).root !== r && await a(r), S(g, y, m, F);
  }
  async function S(g, y, l, m) {
    if (!m) {
      if (l)
        await c(y);
      else if (await u(y))
        throw new Error("dest already exists.");
    }
    try {
      await e.rename(g, y);
    } catch (b) {
      if (b.code !== "EXDEV")
        throw b;
      await f(g, y, l);
    }
  }
  async function f(g, y, l) {
    return await i(g, y, {
      overwrite: l,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), c(g);
  }
  return De = p, De;
}
var Re, Ot;
function _r() {
  if (Ot) return Re;
  Ot = 1;
  const e = V(), n = W, i = Je().copySync, c = ee().removeSync, a = A().mkdirpSync, u = /* @__PURE__ */ G();
  function t(y, l, m) {
    m = m || {};
    const b = m.overwrite || m.clobber || !1, { srcStat: F, isChangingCase: r = !1 } = u.checkPathsSync(y, l, "move", m);
    return u.checkParentPathsSync(y, F, l, "move"), p(l) || a(n.dirname(l)), S(y, l, b, r);
  }
  function p(y) {
    const l = n.dirname(y);
    return n.parse(l).root === l;
  }
  function S(y, l, m, b) {
    if (b) return f(y, l, m);
    if (m)
      return c(l), f(y, l, m);
    if (e.existsSync(l)) throw new Error("dest already exists.");
    return f(y, l, m);
  }
  function f(y, l, m) {
    try {
      e.renameSync(y, l);
    } catch (b) {
      if (b.code !== "EXDEV") throw b;
      return g(y, l, m);
    }
  }
  function g(y, l, m) {
    return i(y, l, {
      overwrite: m,
      errorOnExist: !0,
      preserveTimestamps: !0
    }), c(y);
  }
  return Re = t, Re;
}
var Ne, _t;
function Tr() {
  if (_t) return Ne;
  _t = 1;
  const e = L().fromPromise;
  return Ne = {
    move: e(/* @__PURE__ */ Or()),
    moveSync: /* @__PURE__ */ _r()
  }, Ne;
}
var Ie, Tt;
function xr() {
  return Tt || (Tt = 1, Ie = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ M(),
    // Export extra methods:
    .../* @__PURE__ */ Je(),
    .../* @__PURE__ */ dr(),
    .../* @__PURE__ */ gr(),
    .../* @__PURE__ */ Pr(),
    .../* @__PURE__ */ A(),
    .../* @__PURE__ */ Tr(),
    .../* @__PURE__ */ Ue(),
    .../* @__PURE__ */ K(),
    .../* @__PURE__ */ ee()
  }), Ie;
}
var Le = /* @__PURE__ */ xr(), $r = typeof global == "object" && global && global.Object === Object && global, jr = typeof self == "object" && self && self.Object === Object && self, Rt = $r || jr || Function("return this")(), Z = Rt.Symbol, Nt = Object.prototype, qr = Nt.hasOwnProperty, Cr = Nt.toString, Y = Z ? Z.toStringTag : void 0;
function Dr(e) {
  var n = qr.call(e, Y), i = e[Y];
  try {
    e[Y] = void 0;
    var c = !0;
  } catch {
  }
  var a = Cr.call(e);
  return c && (n ? e[Y] = i : delete e[Y]), a;
}
var Rr = Object.prototype, Nr = Rr.toString;
function Ir(e) {
  return Nr.call(e);
}
var Lr = "[object Null]", Mr = "[object Undefined]", xt = Z ? Z.toStringTag : void 0;
function Wr(e) {
  return e == null ? e === void 0 ? Mr : Lr : xt && xt in Object(e) ? Dr(e) : Ir(e);
}
function Jr(e) {
  return e != null && typeof e == "object";
}
var Ar = "[object Symbol]";
function Ur(e) {
  return typeof e == "symbol" || Jr(e) && Wr(e) == Ar;
}
var Br = /\s/;
function zr(e) {
  for (var n = e.length; n-- && Br.test(e.charAt(n)); )
    ;
  return n;
}
var Kr = /^\s+/;
function Gr(e) {
  return e && e.slice(0, zr(e) + 1).replace(Kr, "");
}
function We(e) {
  var n = typeof e;
  return e != null && (n == "object" || n == "function");
}
var $t = NaN, Yr = /^[-+]0x[0-9a-f]+$/i, Vr = /^0b[01]+$/i, Hr = /^0o[0-7]+$/i, Qr = parseInt;
function jt(e) {
  if (typeof e == "number")
    return e;
  if (Ur(e))
    return $t;
  if (We(e)) {
    var n = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = We(n) ? n + "" : n;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Gr(e);
  var i = Vr.test(e);
  return i || Hr.test(e) ? Qr(e.slice(2), i ? 2 : 8) : Yr.test(e) ? $t : +e;
}
var Me = function() {
  return Rt.Date.now();
}, Xr = "Expected a function", Zr = Math.max, en = Math.min;
function It(e, n, i) {
  var c, a, u, t, p, S, f = 0, g = !1, y = !1, l = !0;
  if (typeof e != "function")
    throw new TypeError(Xr);
  n = jt(n) || 0, We(i) && (g = !!i.leading, y = "maxWait" in i, u = y ? Zr(jt(i.maxWait) || 0, n) : u, l = "trailing" in i ? !!i.trailing : l);
  function m(d) {
    var v = c, E = a;
    return c = a = void 0, f = d, t = e.apply(E, v), t;
  }
  function b(d) {
    return f = d, p = setTimeout(o, n), g ? m(d) : t;
  }
  function F(d) {
    var v = d - S, E = d - f, O = n - v;
    return y ? en(O, u - E) : O;
  }
  function r(d) {
    var v = d - S, E = d - f;
    return S === void 0 || v >= n || v < 0 || y && E >= u;
  }
  function o() {
    var d = Me();
    if (r(d))
      return s(d);
    p = setTimeout(o, F(d));
  }
  function s(d) {
    return p = void 0, l && c ? m(d) : (c = a = void 0, t);
  }
  function w() {
    p !== void 0 && clearTimeout(p), f = 0, c = S = a = p = void 0;
  }
  function k() {
    return p === void 0 ? t : s(Me());
  }
  function h() {
    var d = Me(), v = r(d);
    if (c = arguments, a = this, S = d, v) {
      if (p === void 0)
        return b(S);
      if (y)
        return clearTimeout(p), p = setTimeout(o, n), m(S);
    }
    return p === void 0 && (p = setTimeout(o, n)), t;
  }
  return h.cancel = w, h.flush = k, h;
}
async function tn(e) {
  try {
    return (await Zt.post(J.agent.url, {
      model: J.agent.mode,
      prompt: `请将以下中文翻译成英文，只返回英文翻译结果，不要任何其他内容或标点符号：${e}`,
      stream: !1,
      options: {
        temperature: 0.3
        // 降低随机性以获得更确定性的结果
      }
    })).data.response.replace(/[^\w\s]/g, "").trim();
  } catch (n) {
    throw console.error("翻译请求失败:", n.message), new Error("翻译服务暂不可用");
  }
}
function rn() {
  let e, n;
  return { promise: new Promise((c, a) => {
    e = c, n = a;
  }), resolve: e, reject: n };
}
function Lt(e) {
  return /[\u4e00-\u9fa5]+/g.test(e);
}
function qt(e, n = "", i = !0) {
  const c = /[\u4e00-\u9fa5]+/g;
  let a = e.replace(c, (p) => "${" + n + "$t('" + J.getByContent(p) + "')}");
  if (i)
    return a;
  const u = [
    /"([^"]*?\$\{[^}]*?\$t\([^)]+\)[^}]*?\}[^"]*)"/g,
    /'([^']*?\$\{[^}]*?\$t\([^)]+\)[^}]*?\}[^']*)'/g
  ];
  let t;
  do
    t = !1, u.forEach((p) => {
      a = a.replace(p, (S, f) => (t = !0, "`" + f + "`"));
    });
  while (t);
  return a;
}
const J = {
  awaitTranslate: Promise.resolve(),
  files: {},
  hasUseKey: {},
  ignore: {},
  zh: {},
  en: {},
  agent: null,
  async ready(e, n) {
    if (Lt(n)) {
      const i = rn();
      return J.awaitTranslate = J.awaitTranslate.then(
        async () => i.promise
      ), this.files[e] = {
        id: e,
        ready: i
      }, {
        hasChinese: !0,
        drop: async (c) => (await this.outputFile(), this.files[e].ready.resolve(), c)
      };
    }
    return {
      hasChinese: !1
    };
  },
  getByContent(e) {
    return this.ignore[e] || (this.hasUseKey[e] = {
      hasTranslate: !1,
      translate: async () => {
        var i;
        if (!((i = this.hasUseKey[e]) != null && i.hasTranslate))
          try {
            this.zh[e] || (this.zh[e] = e), this.en[e] || (this.en[e] = await tn(e));
          } catch (c) {
            console.error(`[${e}]：翻译失败`, c);
          } finally {
            this.hasUseKey[e].hasTranslate = !0;
          }
      }
    }), e;
  },
  coverToFile() {
    const e = Object.keys(this.hasUseKey), n = Object.fromEntries(e.map((c) => [c, this.zh[c]])), i = Object.fromEntries(e.map((c) => [c, this.en[c]]));
    return {
      zh: `export default ${JSON.stringify(n, null, 4)}`,
      en: `export default ${JSON.stringify(i, null, 4)}`
    };
  },
  outputFile: It(async function() {
    await Promise.allSettled(
      Object.values(this.hasUseKey).map((i) => i.translate())
    );
    const { zh: e, en: n } = this.coverToFile();
    await Promise.allSettled([
      Le.outputFile("./_i18_81i_/zh.js", e),
      Le.outputFile("./_i18_81i_/en.js", n)
    ]), Le.outputFile(
      "./_i18_81i_/__cache__.mjs",
      `export default ${JSON.stringify(
        {
          zh: this.zh,
          en: this.en,
          ignore: this.ignore
        },
        null,
        4
      )}`
    );
  }, 300),
  async initCache(e) {
    this.agent = e.agent;
    const n = await import(Xt(Vt(process.cwd(), "./_i18_81i_/__cache__.mjs")).href);
    this.zh = n.default.zh || {}, this.en = n.default.en || {}, this.ignore = n.default.ignore || {};
  }
};
function nn(e, n = "") {
  const i = {
    type: "File",
    program: e
  };
  return er(i, {
    TemplateLiteral(c) {
      const a = Ge.ast(
        qt(c.toString(), n, !1)
      );
      c.replaceWith(a.expression), c.skip();
    },
    StringLiteral(c) {
      if (Lt(c.node.value)) {
        const a = Ge.ast(
          "`" + qt(c.node.value, n) + "`"
        );
        c.replaceWith(a.expression), c.skip();
      }
    }
  }), tr(i).code;
}
function Sn(e) {
  const n = Ke(/\.(js|ts|tsx|vue)$/, /node_modules|_i18_81i_/), i = Ke(
    /\/_i18_81i_\/([^/]*)(\.js)?$/,
    /node_modules/
  );
  let c;
  const a = {}, u = It(
    async () => await J.outputFile(),
    500
  );
  return [
    {
      name: "vite-auto-translation-i18",
      transform: {
        order: "post",
        async handler(t, p) {
          if (!n(p))
            return;
          const { hasChinese: S, drop: f } = await J.ready(p, t);
          if (!S)
            return;
          const g = Bt(t, {
            sourceType: "module"
          });
          if (g)
            return f(nn(g, "window."));
        }
      }
    },
    // {
    //   name: "vite-transform-vueI18",
    //   transform: {
    //     order: "pre",
    //     async handler(code, id) {
    //       if (!vueFilter(id)) {
    //         return;
    //       }
    //       const { hasChinese, drop } = await CacheContext.ready(id, code);
    //       if (!hasChinese) {
    //         return;
    //       }
    //       const { descriptor } = vueParse(code);
    //       if (!descriptor) {
    //         return;
    //       }
    //       return drop(transformVue(descriptor.template.ast, code));
    //     }
    //   }
    // },
    {
      name: "vite-auto-translation-build",
      configResolved(t) {
        c = t;
      },
      config() {
        return {
          esbuild: {
            charset: "utf8"
          }
        };
      },
      async buildStart() {
        await J.initCache(e);
      },
      resolveId: {
        order: "pre",
        async handler(t) {
          if (i(t) && c.mode === "production") {
            const p = Ht(t), S = `${p}.js`, f = this.emitFile({
              type: "asset",
              name: `${p}.js`
            }), g = `${f}_${S}`;
            return a[`/${g}`] = {
              referenceId: f,
              exportName: p.replace(Qt(p), "")
            }, {
              id: `/${g}`,
              external: "absolute"
            };
          }
        }
      },
      async renderStart() {
        await J.awaitTranslate, u();
        const t = J.coverToFile();
        Object.keys(a).forEach((p) => {
          const { exportName: S, referenceId: f } = a[p];
          this.setAssetSource(f, t[S]);
        });
      },
      renderChunk(t, p) {
        const S = p.imports.filter((f) => a[f]);
        if (S.length) {
          const f = new zt(t);
          return S.forEach((g) => {
            const y = this.getFileName(a[g].referenceId);
            f.replace(g, `/${y}`);
          }), f.toString();
        }
      }
    }
  ];
}
export {
  Sn as default
};
