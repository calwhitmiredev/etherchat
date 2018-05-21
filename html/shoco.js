function e(a) {
    throw a;
}
var i = void 0
  , j = !0
  , l = null
  , m = !1;
function n() {
    return function() {}
}
var p = {
    preRun: function() {
        var a = p.cwrap("shoco_compress", "number", ["string", "number", "number", "number"])
          , b = p.cwrap("shoco_decompress", "number", ["number", "number", "number", "number"])
          , c = {
            compress: function(b) {
                var c = p._malloc(8 * b.length)
                  , c = new Uint8Array(p.HEAPU8.buffer,c,8 * b.length)
                  , b = a(b, 0, c.byteOffset, c.byteLength)
                  , b = new Uint8Array(c.subarray(0, b));
                p._free(c.byteOffset);
                return b
            },
            decompress: function(a) {
                var c = p._malloc(8 * a.length)
                  , c = new Uint8Array(p.HEAPU8.buffer,c,8 * a.length)
                  , g = p._malloc(a.length)
                  , g = new Uint8Array(p.HEAPU8.buffer,g,a.length);
                g.set(new Uint8Array(a.buffer));
                a = b(g.byteOffset, a.length, c.byteOffset, c.byteLength);
                a = decodeURIComponent(escape(String.fromCharCode.apply(l, c.subarray(0, a))));
                p._free(g.byteOffset);
                p._free(c.byteOffset);
                return a
            }
        };
        "undefined" !== typeof module ? module.Wd = c : window.shoco = c
    }
}, aa = {}, q;
for (q in p)
    p.hasOwnProperty(q) && (aa[q] = p[q]);
var ba = "object" === typeof process && "function" === typeof require
  , ca = "object" === typeof window
  , da = "function" === typeof importScripts
  , fa = !ca && !ba && !da;
if (ba) {
    p.print || (p.print = function(a) {
        process.stdout.write(a + "\n")
    }
    );
    p.printErr || (p.printErr = function(a) {
        process.stderr.write(a + "\n")
    }
    );
    var ga = require("fs")
      , ha = require("path");
    p.read = function(a, b) {
        var a = ha.normalize(a)
          , c = ga.readFileSync(a);
        !c && a != ha.resolve(a) && (a = path.join(__dirname, "..", "src", a),
        c = ga.readFileSync(a));
        c && !b && (c = c.toString());
        return c
    }
    ;
    p.readBinary = function(a) {
        return p.read(a, j)
    }
    ;
    p.load = function(a) {
        ia(read(a))
    }
    ;
    p.arguments = process.argv.slice(2);
    module.exports = p
} else
    fa ? (p.print || (p.print = print),
    "undefined" != typeof printErr && (p.printErr = printErr),
    p.read = "undefined" != typeof read ? read : function() {
        e("no read() available (jsc?)")
    }
    ,
    p.readBinary = function(a) {
        return read(a, "binary")
    }
    ,
    "undefined" != typeof scriptArgs ? p.arguments = scriptArgs : "undefined" != typeof arguments && (p.arguments = arguments),
    this.Module = p,
    eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined")) : ca || da ? (p.read = function(a) {
        var b = new XMLHttpRequest;
        b.open("GET", a, m);
        b.send(l);
        return b.responseText
    }
    ,
    "undefined" != typeof arguments && (p.arguments = arguments),
    "undefined" !== typeof console ? (p.print || (p.print = function(a) {
        console.log(a)
    }
    ),
    p.printErr || (p.printErr = function(a) {
        console.log(a)
    }
    )) : p.print || (p.print = n()),
    ca ? window.Module = p : p.load = importScripts) : e("Unknown runtime environment. Where are we?");
function ia(a) {
    eval.call(l, a)
}
"undefined" == !p.load && p.read && (p.load = function(a) {
    ia(p.read(a))
}
);
p.print || (p.print = n());
p.printErr || (p.printErr = p.print);
p.arguments || (p.arguments = []);
p.print = p.print;
p.I = p.printErr;
p.preRun = [];
p.postRun = [];
for (q in aa)
    aa.hasOwnProperty(q) && (p[q] = aa[q]);
var v = {
    Xa: function() {
        return r
    },
    Wa: function(a) {
        r = a
    },
    Xd: function(a, b) {
        b = b || 4;
        return 1 == b ? a : isNumber(a) && isNumber(b) ? Math.ceil(a / b) * b : isNumber(b) && isPowerOfTwo(b) ? "(((" + a + ")+" + (b - 1) + ")&" + -b + ")" : "Math.ceil((" + a + ")/" + b + ")*" + b
    },
    vb: function(a) {
        return a in v.ib || a in v.gb
    },
    wb: function(a) {
        return "*" == a[a.length - 1]
    },
    xb: function(a) {
        return isPointerType(a) ? m : isArrayType(a) || /<?\{ ?[^}]* ?\}>?/.test(a) ? j : "%" == a[0]
    },
    ib: {
        i1: 0,
        i8: 0,
        i16: 0,
        i32: 0,
        i64: 0
    },
    gb: {
        "float": 0,
        "double": 0
    },
    ne: function(a, b) {
        return (a | 0 | b | 0) + 4294967296 * (Math.round(a / 4294967296) | Math.round(b / 4294967296))
    },
    Od: function(a, b) {
        return ((a | 0) & (b | 0)) + 4294967296 * (Math.round(a / 4294967296) & Math.round(b / 4294967296))
    },
    te: function(a, b) {
        return ((a | 0) ^ (b | 0)) + 4294967296 * (Math.round(a / 4294967296) ^ Math.round(b / 4294967296))
    },
    pa: function(a) {
        switch (a) {
        case "i1":
        case "i8":
            return 1;
        case "i16":
            return 2;
        case "i32":
            return 4;
        case "i64":
            return 8;
        case "float":
            return 4;
        case "double":
            return 8;
        default:
            return "*" === a[a.length - 1] ? v.D : "i" === a[0] ? (a = parseInt(a.substr(1)),
            w(0 === a % 8),
            a / 8) : 0
        }
    },
    qb: function(a) {
        return Math.max(v.pa(a), v.D)
    },
    ob: function(a, b) {
        var c = {};
        return b ? a.filter(function(a) {
            return c[a[b]] ? m : c[a[b]] = j
        }) : a.filter(function(a) {
            return c[a] ? m : c[a] = j
        })
    },
    set: function() {
        for (var a = "object" === typeof arguments[0] ? arguments[0] : arguments, b = {}, c = 0; c < a.length; c++)
            b[a[c]] = 0;
        return b
    },
    Ed: 8,
    oa: function(a, b, c) {
        return !c && ("i64" == a || "double" == a) ? 8 : !a ? Math.min(b, 8) : Math.min(b || (a ? v.qb(a) : 0), v.D)
    },
    mb: function(a) {
        a.u = 0;
        a.N = 0;
        var b = []
          , c = -1
          , d = 0;
        a.Ma = a.la.map(function(f) {
            d++;
            var g, h;
            v.vb(f) || v.wb(f) ? (g = v.pa(f),
            h = v.oa(f, g)) : v.xb(f) ? "0" === f[1] ? (g = 0,
            h = Types.types[f] ? v.oa(l, Types.types[f].N) : a.N || QUANTUM_SIZE) : (g = Types.types[f].u,
            h = v.oa(l, Types.types[f].N)) : "b" == f[0] ? (g = f.substr(1) | 0,
            h = 1) : "<" === f[0] ? g = h = Types.types[f].u : "i" === f[0] ? (g = h = parseInt(f.substr(1)) / 8,
            w(0 === g % 1, "cannot handle non-byte-size field " + f)) : w(m, "invalid type for calculateStructAlignment");
            a.oe && (h = 1);
            a.N = Math.max(a.N, h);
            f = v.M(a.u, h);
            a.u = f + g;
            0 <= c && b.push(f - c);
            return c = f
        });
        a.Sa && "[" === a.Sa[0] && (a.u = parseInt(a.Sa.substr(1)) * a.u / 2);
        a.u = v.M(a.u, a.N);
        0 == b.length ? a.La = a.u : 1 == v.ob(b).length && (a.La = b[0]);
        a.je = 1 != a.La;
        return a.Ma
    },
    pb: function(a, b, c) {
        var d, f;
        if (b) {
            c = c || 0;
            d = ("undefined" === typeof Types ? v.se : Types.types)[b];
            if (!d)
                return l;
            if (d.la.length != a.length)
                return printErr("Number of named fields must match the type for " + b + ": possibly duplicate struct names. Cannot return structInfo"),
                l;
            f = d.Ma
        } else
            d = {
                la: a.map(function(a) {
                    return a[0]
                })
            },
            f = v.mb(d);
        var g = {
            Gd: d.u
        };
        b ? a.forEach(function(a, b) {
            if ("string" === typeof a)
                g[a] = f[b] + c;
            else {
                var s, u;
                for (u in a)
                    s = u;
                g[s] = v.pb(a[s], d.la[b], f[b])
            }
        }) : a.forEach(function(a, b) {
            g[a[1]] = f[b]
        });
        return g
    },
    ja: function(a, b, c) {
        return c && c.length ? (c.splice || (c = Array.prototype.slice.call(c)),
        c.splice(0, 0, b),
        p["dynCall_" + a].apply(l, c)) : p["dynCall_" + a].call(l, b)
    },
    W: [],
    Hd: function(a) {
        for (var b = 0; b < v.W.length; b++)
            if (!v.W[b])
                return v.W[b] = a,
                2 * (1 + b);
        e("Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.")
    },
    qe: function(a) {
        v.W[(a - 2) / 2] = l
    },
    Yd: function(a, b) {
        v.ia || (v.ia = {});
        var c = v.ia[a];
        if (c)
            return c;
        for (var c = [], d = 0; d < b; d++)
            c.push(String.fromCharCode(36) + d);
        d = ja(a);
        '"' === d[0] && (d.indexOf('"', 1) === d.length - 1 ? d = d.substr(1, d.length - 2) : z("invalid EM_ASM input |" + d + "|. Please use EM_ASM(..code..) (no quotes) or EM_ASM({ ..code($0).. }, input) (to input values)"));
        try {
            var f = eval("(function(" + c.join(",") + "){ " + d + " })")
        } catch (g) {
            p.I("error in executing inline EM_ASM code: " + g + " on: \n\n" + d + "\n\nwith args |" + c + "| (make sure to use the right one out of EM_ASM, EM_ASM_ARGS, etc.)"),
            e(g)
        }
        return v.ia[a] = f
    },
    S: function(a) {
        v.S.va || (v.S.va = {});
        v.S.va[a] || (v.S.va[a] = 1,
        p.I(a))
    },
    na: {},
    $d: function(a, b) {
        w(b);
        v.na[a] || (v.na[a] = function() {
            return v.ja(b, a, arguments)
        }
        );
        return v.na[a]
    },
    ga: function() {
        var a = []
          , b = 0;
        this.sa = function(c) {
            c &= 255;
            if (0 == a.length) {
                if (0 == (c & 128))
                    return String.fromCharCode(c);
                a.push(c);
                b = 192 == (c & 224) ? 1 : 224 == (c & 240) ? 2 : 3;
                return ""
            }
            if (b && (a.push(c),
            b--,
            0 < b))
                return "";
            var c = a[0]
              , d = a[1]
              , f = a[2]
              , g = a[3];
            2 == a.length ? c = String.fromCharCode((c & 31) << 6 | d & 63) : 3 == a.length ? c = String.fromCharCode((c & 15) << 12 | (d & 63) << 6 | f & 63) : (c = (c & 7) << 18 | (d & 63) << 12 | (f & 63) << 6 | g & 63,
            c = String.fromCharCode(Math.floor((c - 65536) / 1024) + 55296, (c - 65536) % 1024 + 56320));
            a.length = 0;
            return c
        }
        ;
        this.Bb = function(a) {
            for (var a = unescape(encodeURIComponent(a)), b = [], f = 0; f < a.length; f++)
                b.push(a.charCodeAt(f));
            return b
        }
    },
    Zd: function() {
        e("You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work")
    },
    wa: function(a) {
        var b = r;
        r = r + a | 0;
        r = r + 7 & -8;
        return b
    },
    Ya: function(a) {
        var b = B;
        B = B + a | 0;
        B = B + 7 & -8;
        return b
    },
    Ja: function(a) {
        var b = C;
        C = C + a | 0;
        C = C + 7 & -8;
        C >= D && z("Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value " + D + ", (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.");
        return b
    },
    M: function(a, b) {
        return Math.ceil(a / (b ? b : 8)) * (b ? b : 8)
    },
    he: function(a, b, c) {
        return c ? +(a >>> 0) + 4294967296 * +(b >>> 0) : +(a >>> 0) + 4294967296 * +(b | 0)
    },
    hb: 8,
    D: 4,
    Fd: 0
};
p.Runtime = v;
var ka = m, F, la;
function w(a, b) {
    a || z("Assertion failed: " + b)
}
p.ccall = function(a, b, c, d) {
    return ma(na(a), b, c, d)
}
;
function na(a) {
    try {
        var b = p["_" + a];
        b || (b = eval("_" + a))
    } catch (c) {}
    w(b, "Cannot call unknown function " + a + " (perhaps LLVM optimizations or closure removed it?)");
    return b
}
function ma(a, b, c, d) {
    function f(a, b) {
        if ("string" == b) {
            if (a === l || a === i || 0 === a)
                return 0;
            a = G(a);
            b = "array"
        }
        if ("array" == b) {
            g || (g = v.Xa());
            var c = v.wa(a.length);
            oa(a, c);
            return c
        }
        return a
    }
    var g = 0
      , h = 0
      , d = d ? d.map(function(a) {
        return f(a, c[h++])
    }) : [];
    a = a.apply(l, d);
    "string" == b ? b = ja(a) : (w("array" != b),
    b = a);
    g && v.Wa(g);
    return b
}
p.cwrap = function(a, b, c) {
    var d = na(a);
    return function() {
        return ma(d, b, c, Array.prototype.slice.call(arguments))
    }
}
;
function pa(a, b, c) {
    c = c || "i8";
    "*" === c.charAt(c.length - 1) && (c = "i32");
    switch (c) {
    case "i1":
        H[a] = b;
        break;
    case "i8":
        H[a] = b;
        break;
    case "i16":
        I[a >> 1] = b;
        break;
    case "i32":
        J[a >> 2] = b;
        break;
    case "i64":
        la = [b >>> 0, (F = b,
        1 <= +qa(F) ? 0 < F ? (ra(+sa(F / 4294967296), 4294967295) | 0) >>> 0 : ~~+ta((F - +(~~F >>> 0)) / 4294967296) >>> 0 : 0)];
        J[a >> 2] = la[0];
        J[a + 4 >> 2] = la[1];
        break;
    case "float":
        ua[a >> 2] = b;
        break;
    case "double":
        va[a >> 3] = b;
        break;
    default:
        z("invalid type for setValue: " + c)
    }
}
p.setValue = pa;
p.getValue = function(a, b) {
    b = b || "i8";
    "*" === b.charAt(b.length - 1) && (b = "i32");
    switch (b) {
    case "i1":
        return H[a];
    case "i8":
        return H[a];
    case "i16":
        return I[a >> 1];
    case "i32":
        return J[a >> 2];
    case "i64":
        return J[a >> 2];
    case "float":
        return ua[a >> 2];
    case "double":
        return va[a >> 3];
    default:
        z("invalid type for setValue: " + b)
    }
    return l
}
;
var L = 2
  , wa = 4;
p.ALLOC_NORMAL = 0;
p.ALLOC_STACK = 1;
p.ALLOC_STATIC = L;
p.ALLOC_DYNAMIC = 3;
p.ALLOC_NONE = wa;
function M(a, b, c, d) {
    var f, g;
    "number" === typeof a ? (f = j,
    g = a) : (f = m,
    g = a.length);
    var h = "string" === typeof b ? b : l
      , c = c == wa ? d : [xa, v.wa, v.Ya, v.Ja][c === i ? L : c](Math.max(g, h ? 1 : b.length));
    if (f) {
        d = c;
        w(0 == (c & 3));
        for (a = c + (g & -4); d < a; d += 4)
            J[d >> 2] = 0;
        for (a = c + g; d < a; )
            H[d++ | 0] = 0;
        return c
    }
    if ("i8" === h)
        return a.subarray || a.slice ? N.set(a, c) : N.set(new Uint8Array(a), c),
        c;
    for (var d = 0, x, s; d < g; ) {
        var u = a[d];
        "function" === typeof u && (u = v.ae(u));
        f = h || b[d];
        0 === f ? d++ : ("i64" == f && (f = "i32"),
        pa(c + d, u, f),
        s !== f && (x = v.pa(f),
        s = f),
        d += x)
    }
    return c
}
p.allocate = M;
function ja(a, b) {
    for (var c = m, d, f = 0; ; ) {
        d = N[a + f | 0];
        if (128 <= d)
            c = j;
        else if (0 == d && !b)
            break;
        f++;
        if (b && f == b)
            break
    }
    b || (b = f);
    var g = "";
    if (!c) {
        for (; 0 < b; )
            d = String.fromCharCode.apply(String, N.subarray(a, a + Math.min(b, 1024))),
            g = g ? g + d : d,
            a += 1024,
            b -= 1024;
        return g
    }
    c = new v.ga;
    for (f = 0; f < b; f++)
        d = N[a + f | 0],
        g += c.sa(d);
    return g
}
p.Pointer_stringify = ja;
p.UTF16ToString = function(a) {
    for (var b = 0, c = ""; ; ) {
        var d = I[a + 2 * b >> 1];
        if (0 == d)
            return c;
        ++b;
        c += String.fromCharCode(d)
    }
}
;
p.stringToUTF16 = function(a, b) {
    for (var c = 0; c < a.length; ++c)
        I[b + 2 * c >> 1] = a.charCodeAt(c);
    I[b + 2 * a.length >> 1] = 0
}
;
p.UTF32ToString = function(a) {
    for (var b = 0, c = ""; ; ) {
        var d = J[a + 4 * b >> 2];
        if (0 == d)
            return c;
        ++b;
        65536 <= d ? (d -= 65536,
        c += String.fromCharCode(55296 | d >> 10, 56320 | d & 1023)) : c += String.fromCharCode(d)
    }
}
;
p.stringToUTF32 = function(a, b) {
    for (var c = 0, d = 0; d < a.length; ++d) {
        var f = a.charCodeAt(d);
        if (55296 <= f && 57343 >= f)
            var g = a.charCodeAt(++d)
              , f = 65536 + ((f & 1023) << 10) | g & 1023;
        J[b + 4 * c >> 2] = f;
        ++c
    }
    J[b + 4 * c >> 2] = 0
}
;
function ya(a) {
    function b(h, s, u) {
        var s = s || Infinity, t = "", A = [], k;
        if ("N" === a[c]) {
            c++;
            "K" === a[c] && c++;
            for (k = []; "E" !== a[c]; )
                if ("S" === a[c]) {
                    c++;
                    var y = a.indexOf("_", c);
                    k.push(f[a.substring(c, y) || 0] || "?");
                    c = y + 1
                } else if ("C" === a[c])
                    k.push(k[k.length - 1]),
                    c += 2;
                else {
                    var y = parseInt(a.substr(c))
                      , E = y.toString().length;
                    if (!y || !E) {
                        c--;
                        break
                    }
                    var ea = a.substr(c + E, y);
                    k.push(ea);
                    f.push(ea);
                    c += E + y
                }
            c++;
            k = k.join("::");
            s--;
            if (0 === s)
                return h ? [k] : k
        } else if (("K" === a[c] || g && "L" === a[c]) && c++,
        y = parseInt(a.substr(c)))
            E = y.toString().length,
            k = a.substr(c + E, y),
            c += E + y;
        g = m;
        "I" === a[c] ? (c++,
        y = b(j),
        E = b(j, 1, j),
        t += E[0] + " " + k + "<" + y.join(", ") + ">") : t = k;
        a: for (; c < a.length && 0 < s--; )
            if (k = a[c++],
            k in d)
                A.push(d[k]);
            else
                switch (k) {
                case "P":
                    A.push(b(j, 1, j)[0] + "*");
                    break;
                case "R":
                    A.push(b(j, 1, j)[0] + "&");
                    break;
                case "L":
                    c++;
                    y = a.indexOf("E", c) - c;
                    A.push(a.substr(c, y));
                    c += y + 2;
                    break;
                case "A":
                    y = parseInt(a.substr(c));
                    c += y.toString().length;
                    "_" !== a[c] && e("?");
                    c++;
                    A.push(b(j, 1, j)[0] + " [" + y + "]");
                    break;
                case "E":
                    break a;
                default:
                    t += "?" + k;
                    break a
                }
        !u && (1 === A.length && "void" === A[0]) && (A = []);
        return h ? (t && A.push(t + "?"),
        A) : t + ("(" + A.join(", ") + ")")
    }
    var c = 3
      , d = {
        v: "void",
        b: "bool",
        c: "char",
        s: "short",
        i: "int",
        l: "long",
        f: "float",
        d: "double",
        w: "wchar_t",
        a: "signed char",
        h: "unsigned char",
        t: "unsigned short",
        j: "unsigned int",
        m: "unsigned long",
        x: "long long",
        y: "unsigned long long",
        z: "..."
    }
      , f = []
      , g = j;
    try {
        if ("Object._main" == a || "_main" == a)
            return "main()";
        "number" === typeof a && (a = ja(a));
        if ("_" !== a[0] || "_" !== a[1] || "Z" !== a[2])
            return a;
        switch (a[3]) {
        case "n":
            return "operator new()";
        case "d":
            return "operator delete()"
        }
        return b()
    } catch (h) {
        return a
    }
}
function za() {
    var a = Error().stack;
    return a ? a.replace(/__Z[\w\d_]+/g, function(a) {
        var c = ya(a);
        return a === c ? a : a + " [" + c + "]"
    }) : "(no stack trace available)"
}
for (var H, N, I, Aa, J, Ba, ua, va, Ca = 0, B = 0, Da = 0, r = 0, Ea = 0, Fa = 0, C = 0, Ga = p.TOTAL_STACK || 5242880, D = p.TOTAL_MEMORY || 16777216, O = 4096; O < D || O < 2 * Ga; )
    O = 16777216 > O ? 2 * O : O + 16777216;
O !== D && (p.I("increasing TOTAL_MEMORY to " + O + " to be more reasonable"),
D = O);
w("undefined" !== typeof Int32Array && "undefined" !== typeof Float64Array && !!(new Int32Array(1)).subarray && !!(new Int32Array(1)).set, "JS engine does not provide full typed array support");
var P = new ArrayBuffer(D);
H = new Int8Array(P);
I = new Int16Array(P);
J = new Int32Array(P);
N = new Uint8Array(P);
Aa = new Uint16Array(P);
Ba = new Uint32Array(P);
ua = new Float32Array(P);
va = new Float64Array(P);
J[0] = 255;
w(255 === N[0] && 0 === N[3], "Typed arrays 2 must be run on a little-endian system");
p.HEAP = i;
p.HEAP8 = H;
p.HEAP16 = I;
p.HEAP32 = J;
p.HEAPU8 = N;
p.HEAPU16 = Aa;
p.HEAPU32 = Ba;
p.HEAPF32 = ua;
p.HEAPF64 = va;
function Q(a) {
    for (; 0 < a.length; ) {
        var b = a.shift();
        if ("function" == typeof b)
            b();
        else {
            var c = b.Q;
            "number" === typeof c ? b.ha === i ? v.ja("v", c) : v.ja("vi", c, [b.ha]) : c(b.ha === i ? l : b.ha)
        }
    }
}
var Ha = []
  , Ia = []
  , Ja = []
  , Ka = []
  , La = []
  , Ma = m;
function Na(a) {
    Ha.unshift(a)
}
p.addOnPreRun = p.Md = Na;
p.addOnInit = p.Jd = function(a) {
    Ia.unshift(a)
}
;
p.addOnPreMain = p.Ld = function(a) {
    Ja.unshift(a)
}
;
p.addOnExit = p.Id = function(a) {
    Ka.unshift(a)
}
;
function Pa(a) {
    La.unshift(a)
}
p.addOnPostRun = p.Kd = Pa;
function G(a, b, c) {
    a = (new v.ga).Bb(a);
    c && (a.length = c);
    b || a.push(0);
    return a
}
p.intArrayFromString = G;
p.intArrayToString = function(a) {
    for (var b = [], c = 0; c < a.length; c++) {
        var d = a[c];
        255 < d && (d &= 255);
        b.push(String.fromCharCode(d))
    }
    return b.join("")
}
;
p.writeStringToMemory = function(a, b, c) {
    a = G(a, c);
    for (c = 0; c < a.length; )
        H[b + c | 0] = a[c],
        c += 1
}
;
function oa(a, b) {
    for (var c = 0; c < a.length; c++)
        H[b + c | 0] = a[c]
}
p.writeArrayToMemory = oa;
p.writeAsciiToMemory = function(a, b, c) {
    for (var d = 0; d < a.length; d++)
        H[b + d | 0] = a.charCodeAt(d);
    c || (H[b + a.length | 0] = 0)
}
;
if (!Math.imul || -5 !== Math.imul(4294967295, 5))
    Math.imul = function(a, b) {
        var c = a & 65535
          , d = b & 65535;
        return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16) | 0
    }
    ;
Math.ce = Math.imul;
var qa = Math.abs
  , ta = Math.ceil
  , sa = Math.floor
  , ra = Math.min
  , R = 0
  , Qa = l
  , Ra = l;
function Sa() {
    R++;
    p.monitorRunDependencies && p.monitorRunDependencies(R)
}
p.addRunDependency = Sa;
function Ta() {
    R--;
    p.monitorRunDependencies && p.monitorRunDependencies(R);
    if (0 == R && (Qa !== l && (clearInterval(Qa),
    Qa = l),
    Ra)) {
        var a = Ra;
        Ra = l;
        a()
    }
}
p.removeRunDependency = Ta;
p.preloadedImages = {};
p.preloadedAudios = {};
Ca = 8;
B = Ca + v.M(2883);
Ia.push();
M([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 26, 255, 255, 255, 255, 255, 22, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 27, 255, 255, 255, 255, 255, 23, 29, 255, 255, 31, 24, 255, 255, 255, 255, 255, 255, 25, 255, 255, 30, 255, 255, 255, 255, 255, 255, 255, 255, 255, 1, 15, 11, 14, 0, 17, 18, 5, 2, 255, 21, 9, 13, 6, 3, 16, 255, 7, 8, 4, 10, 19, 12, 28, 20, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 7, 4, 12, 255, 6, 255, 1, 0, 3, 5, 255, 9, 255, 8, 2, 255, 15, 14, 255, 10, 11, 255, 255, 255, 255, 255, 255, 255, 13, 255, 255, 255, 255, 255, 6, 255, 1, 255, 0, 3, 2, 4, 15, 11, 255, 9, 5, 10, 13, 255, 12, 8, 7, 14, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 9, 11, 255, 4, 2, 255, 0, 8, 1, 5, 255, 6, 255, 3, 7, 15, 255, 12, 10, 13, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 14, 7, 5, 255, 1, 2, 8, 9, 0, 15, 6, 4, 11, 255, 12, 3, 255, 10, 255, 13, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 2, 4, 3, 1, 5, 0, 255, 6, 10, 9, 7, 12, 11, 255, 255, 255, 255, 13, 255, 255, 8, 255, 15, 255, 255, 255, 14, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 255, 255, 5, 9, 10, 6, 255, 255, 8, 15, 11, 255, 14, 255, 255, 7, 255, 13, 255, 255, 255, 12, 255, 255, 255, 255, 255, 2, 8, 7, 4, 3, 255, 9, 255, 6, 11, 255, 5, 255, 255, 0, 255, 255, 14, 1, 15, 10, 12, 255, 255, 255, 255, 13, 255, 255, 255, 255, 255, 0, 3, 1, 2, 6, 255, 9, 8, 4, 12, 13, 10, 255, 11, 7, 255, 255, 15, 14, 255, 5, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 6, 3, 4, 1, 2, 255, 255, 5, 10, 7, 9, 11, 12, 255, 255, 8, 14, 255, 255, 15, 13, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 6, 2, 5, 9, 255, 255, 255, 10, 1, 8, 255, 12, 14, 4, 255, 15, 7, 255, 13, 3, 11, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 8, 10, 9, 15, 1, 255, 4, 0, 3, 2, 255, 6, 255, 12, 11, 13, 7, 14, 5, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 1, 3, 6, 0, 4, 2, 255, 7, 13, 8, 9, 11, 255, 255, 15, 255, 255, 255, 255, 255, 10, 5, 14, 255, 255, 255, 255, 255, 255, 255, 255, 255, 3, 0, 1, 4, 255, 2, 5, 6, 7, 8, 255, 14, 255, 255, 9, 15, 255, 12, 255, 255, 255, 10, 11, 255, 255, 255, 13, 255, 255, 255, 255, 255, 0, 1, 3, 2, 15, 255, 12, 255, 7, 14, 4, 255, 255, 9, 255, 8, 5, 10, 255, 255, 6, 255, 13, 255, 255, 255, 11, 255, 255, 255, 255, 255, 0, 3, 1, 2, 255, 255, 12, 6, 4, 9, 7, 255, 255, 14, 8, 255, 255, 15, 11, 13, 5, 255, 10, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 5, 7, 2, 10, 13, 255, 6, 8, 1, 3, 255, 255, 14, 15, 11, 255, 255, 255, 12, 4, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 2, 6, 3, 7, 10, 255, 1, 9, 4, 8, 255, 255, 15, 255, 12, 5, 255, 255, 255, 11, 255, 13, 255, 255, 255, 14, 255, 255, 255, 255, 255, 1, 3, 4, 0, 7, 255, 12, 2, 11, 8, 6, 13, 255, 255, 255, 255, 255, 5, 255, 255, 10, 15, 9, 255, 255, 255, 14, 255, 255, 255, 255, 255, 1, 3, 5, 2, 13, 0, 9, 4, 7, 6, 8, 255, 255, 15, 255, 11, 255, 255, 10, 255, 14, 255, 12, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 2, 1, 3, 255, 255, 255, 6, 255, 255, 5, 255, 255, 255, 255, 255, 255, 255, 255, 255, 4, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 1, 11, 4, 0, 3, 255, 13, 12, 2, 7, 255, 255, 15, 10, 5, 8, 14, 255, 255, 255, 255, 255, 9, 255, 255, 255, 6, 255, 255, 255, 255, 255, 0, 9, 2, 14, 15, 4, 1, 13, 3, 5, 255, 255, 10, 255, 255, 255, 255, 6, 12, 255, 7, 255, 8, 255, 255, 255, 11, 255, 255, 255, 255, 255, 255, 2, 14, 255, 1, 5, 8, 7, 4, 12, 255, 6, 9, 11, 13, 3, 10, 15, 255, 255, 255, 255, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 1, 3, 2, 255, 255, 255, 255, 255, 255, 4, 255, 255, 255, 255, 255, 255, 255, 255, 255, 6, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 4, 3, 1, 5, 255, 255, 255, 0, 255, 255, 6, 255, 255, 255, 255, 255, 255, 255, 255, 255, 2, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 2, 8, 4, 1, 255, 0, 255, 6, 255, 255, 5, 255, 7, 255, 255, 255, 255, 255, 255, 255, 10, 255, 255, 9, 255, 255, 255, 255, 255, 255, 255, 255, 12, 5, 255, 255, 1, 255, 255, 7, 0, 3, 255, 2, 255, 4, 6, 255, 255, 255, 255, 8, 255, 255, 15, 255, 13, 9, 255, 255, 255, 255, 255, 11, 1, 3, 2, 4, 255, 255, 255, 5, 255, 7, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 6, 255, 255, 255, 255, 255, 255, 255, 255, 8, 255, 255, 5, 3, 4, 12, 1, 6, 255, 255, 255, 255, 8, 2, 255, 255, 255, 255, 0, 9, 255, 255, 11, 255, 10, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 255, 1, 12, 3, 255, 255, 255, 255, 5, 255, 255, 255, 2, 255, 255, 255, 255, 255, 255, 255, 255, 4, 255, 255, 6, 255, 10, 2, 3, 1, 4, 255, 0, 255, 5, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 7, 255, 255, 255, 255, 255, 255, 255, 255, 6, 255, 255, 5, 1, 3, 0, 255, 255, 255, 255, 255, 255, 4, 255, 255, 255, 255, 255, 255, 255, 255, 255, 2, 255, 255, 255, 255, 255, 9, 255, 255, 6, 255, 7, 0, 0, 0, 128, 1, 0, 0, 0, 2, 0, 0, 0, 26, 0, 0, 0, 24, 0, 0, 0, 24, 0, 0, 0, 24, 0, 0, 0, 24, 0, 0, 0, 24, 0, 0, 0, 24, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 15, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 2, 0, 0, 0, 4, 0, 0, 0, 25, 0, 0, 0, 22, 0, 0, 0, 19, 0, 0, 0, 16, 0, 0, 0, 16, 0, 0, 0, 16, 0, 0, 0, 16, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 15, 0, 7, 0, 7, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 224, 192, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 224, 4, 0, 0, 0, 8, 0, 0, 0, 23, 0, 0, 0, 19, 0, 0, 0, 15, 0, 0, 0, 11, 0, 0, 0, 8, 0, 0, 0, 5, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 15, 0, 15, 0, 15, 0, 7, 0, 7, 0, 7, 0, 3, 0, 240, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 97, 105, 111, 116, 104, 110, 114, 115, 108, 117, 99, 119, 109, 100, 98, 112, 102, 103, 118, 121, 107, 45, 72, 77, 84, 39, 66, 120, 73, 87, 76, 115, 116, 99, 108, 109, 97, 100, 114, 118, 84, 65, 76, 101, 77, 89, 45, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 116, 97, 98, 115, 104, 99, 114, 110, 119, 112, 109, 108, 100, 105, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 117, 101, 105, 97, 111, 114, 121, 108, 73, 69, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 97, 111, 105, 117, 65, 121, 69, 0, 0, 0, 0, 0, 0, 0, 0, 116, 110, 102, 115, 39, 109, 73, 78, 65, 69, 76, 90, 114, 86, 82, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 111, 97, 121, 105, 117, 101, 73, 76, 68, 39, 69, 89, 0, 0, 0, 0, 114, 105, 121, 97, 101, 111, 117, 89, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 111, 101, 69, 105, 117, 114, 119, 97, 72, 121, 82, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 105, 101, 97, 111, 114, 73, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 116, 115, 114, 108, 100, 105, 121, 118, 109, 98, 99, 103, 112, 107, 117, 101, 108, 111, 117, 121, 97, 114, 105, 115, 106, 116, 98, 118, 104, 109, 100, 111, 101, 104, 97, 116, 107, 105, 114, 108, 117, 121, 99, 113, 115, 45, 100, 101, 105, 111, 97, 115, 121, 114, 117, 100, 108, 45, 103, 110, 118, 109, 102, 114, 110, 100, 115, 97, 108, 116, 101, 109, 99, 118, 121, 105, 120, 102, 112, 111, 101, 114, 97, 105, 102, 117, 116, 108, 45, 121, 115, 110, 99, 39, 107, 104, 101, 111, 97, 114, 105, 108, 115, 117, 110, 103, 98, 45, 116, 121, 109, 101, 97, 105, 111, 116, 114, 117, 121, 109, 115, 108, 98, 39, 45, 102, 100, 110, 115, 116, 109, 111, 108, 99, 100, 114, 101, 103, 97, 102, 118, 122, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 110, 105, 115, 104, 108, 102, 121, 45, 97, 119, 39, 103, 114, 111, 116, 101, 108, 105, 121, 100, 111, 97, 102, 117, 116, 115, 107, 119, 118, 109, 112, 101, 97, 111, 105, 117, 112, 121, 115, 98, 109, 102, 39, 110, 45, 108, 116, 100, 103, 101, 116, 111, 99, 115, 105, 97, 110, 121, 108, 107, 39, 102, 118, 117, 110, 114, 102, 109, 116, 119, 111, 115, 108, 118, 100, 112, 107, 105, 99, 101, 114, 97, 111, 108, 112, 105, 116, 117, 115, 104, 121, 98, 45, 39, 109, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 105, 111, 97, 115, 121, 116, 100, 114, 110, 99, 109, 108, 117, 103, 102, 101, 116, 104, 105, 111, 115, 97, 117, 112, 99, 108, 119, 109, 107, 102, 121, 104, 111, 101, 105, 97, 116, 114, 117, 121, 108, 115, 119, 99, 102, 39, 45, 114, 116, 108, 115, 110, 103, 99, 112, 101, 105, 97, 100, 109, 98, 102, 111, 101, 105, 97, 111, 121, 117, 114, 0, 0, 0, 0, 0, 0, 0, 0, 0, 97, 105, 104, 101, 111, 110, 114, 115, 108, 100, 107, 45, 102, 39, 99, 98, 112, 116, 99, 97, 105, 101, 104, 113, 117, 102, 45, 121, 111, 0, 0, 0, 111, 101, 115, 116, 105, 100, 39, 108, 98, 45, 109, 97, 114, 110, 112, 119], "i8", wa, v.hb);
var Ua = v.M(M(12, "i8", L), 8);
w(0 == Ua % 8);
function xa(a) {
    return v.Ja(a + 8) + 8 & 4294967288
}
p._malloc = xa;
var S = {
    O: 1,
    T: 2,
    rd: 3,
    mc: 4,
    C: 5,
    Ea: 6,
    Gb: 7,
    Kc: 8,
    bb: 9,
    Ub: 10,
    za: 11,
    Bd: 11,
    eb: 12,
    ab: 13,
    fc: 14,
    Wc: 15,
    Aa: 16,
    Ba: 17,
    Cd: 18,
    Ca: 19,
    fb: 20,
    da: 21,
    L: 22,
    Fc: 23,
    cb: 24,
    ad: 25,
    yd: 26,
    gc: 27,
    Sc: 28,
    fa: 29,
    od: 30,
    yc: 31,
    gd: 32,
    cc: 33,
    ld: 34,
    Oc: 42,
    jc: 43,
    Vb: 44,
    pc: 45,
    qc: 46,
    rc: 47,
    xc: 48,
    zd: 49,
    Ic: 50,
    oc: 51,
    $b: 35,
    Lc: 37,
    Mb: 52,
    Pb: 53,
    Dd: 54,
    Gc: 55,
    Qb: 56,
    Rb: 57,
    ac: 35,
    Sb: 59,
    Uc: 60,
    Jc: 61,
    vd: 62,
    Tc: 63,
    Pc: 64,
    Qc: 65,
    nd: 66,
    Mc: 67,
    Jb: 68,
    sd: 69,
    Wb: 70,
    hd: 71,
    Ac: 72,
    dc: 73,
    Ob: 74,
    bd: 76,
    Nb: 77,
    md: 78,
    sc: 79,
    tc: 80,
    wc: 81,
    vc: 82,
    uc: 83,
    Vc: 38,
    Da: 39,
    Bc: 36,
    ea: 40,
    cd: 95,
    fd: 96,
    Zb: 104,
    Hc: 105,
    Kb: 97,
    kd: 91,
    Zc: 88,
    Rc: 92,
    pd: 108,
    Yb: 111,
    Hb: 98,
    Xb: 103,
    Ec: 101,
    Cc: 100,
    wd: 110,
    hc: 112,
    ic: 113,
    lc: 115,
    Lb: 114,
    bc: 89,
    zc: 90,
    jd: 93,
    qd: 94,
    Ib: 99,
    Dc: 102,
    nc: 106,
    Xc: 107,
    xd: 109,
    Ad: 87,
    ec: 122,
    td: 116,
    $c: 95,
    Nc: 123,
    kc: 84,
    dd: 75,
    Tb: 125,
    Yc: 131,
    ed: 130,
    ud: 86
}
  , Va = {
    "0": "Success",
    1: "Not super-user",
    2: "No such file or directory",
    3: "No such process",
    4: "Interrupted system call",
    5: "I/O error",
    6: "No such device or address",
    7: "Arg list too long",
    8: "Exec format error",
    9: "Bad file number",
    10: "No children",
    11: "No more processes",
    12: "Not enough core",
    13: "Permission denied",
    14: "Bad address",
    15: "Block device required",
    16: "Mount device busy",
    17: "File exists",
    18: "Cross-device link",
    19: "No such device",
    20: "Not a directory",
    21: "Is a directory",
    22: "Invalid argument",
    23: "Too many open files in system",
    24: "Too many open files",
    25: "Not a typewriter",
    26: "Text file busy",
    27: "File too large",
    28: "No space left on device",
    29: "Illegal seek",
    30: "Read only file system",
    31: "Too many links",
    32: "Broken pipe",
    33: "Math arg out of domain of func",
    34: "Math result not representable",
    35: "File locking deadlock error",
    36: "File or path name too long",
    37: "No record locks available",
    38: "Function not implemented",
    39: "Directory not empty",
    40: "Too many symbolic links",
    42: "No message of desired type",
    43: "Identifier removed",
    44: "Channel number out of range",
    45: "Level 2 not synchronized",
    46: "Level 3 halted",
    47: "Level 3 reset",
    48: "Link number out of range",
    49: "Protocol driver not attached",
    50: "No CSI structure available",
    51: "Level 2 halted",
    52: "Invalid exchange",
    53: "Invalid request descriptor",
    54: "Exchange full",
    55: "No anode",
    56: "Invalid request code",
    57: "Invalid slot",
    59: "Bad font file fmt",
    60: "Device not a stream",
    61: "No data (for no delay io)",
    62: "Timer expired",
    63: "Out of streams resources",
    64: "Machine is not on the network",
    65: "Package not installed",
    66: "The object is remote",
    67: "The link has been severed",
    68: "Advertise error",
    69: "Srmount error",
    70: "Communication error on send",
    71: "Protocol error",
    72: "Multihop attempted",
    73: "Cross mount point (not really error)",
    74: "Trying to read unreadable message",
    75: "Value too large for defined data type",
    76: "Given log. name not unique",
    77: "f.d. invalid for this operation",
    78: "Remote address changed",
    79: "Can   access a needed shared lib",
    80: "Accessing a corrupted shared lib",
    81: ".lib section in a.out corrupted",
    82: "Attempting to link in too many libs",
    83: "Attempting to exec a shared library",
    84: "Illegal byte sequence",
    86: "Streams pipe error",
    87: "Too many users",
    88: "Socket operation on non-socket",
    89: "Destination address required",
    90: "Message too long",
    91: "Protocol wrong type for socket",
    92: "Protocol not available",
    93: "Unknown protocol",
    94: "Socket type not supported",
    95: "Not supported",
    96: "Protocol family not supported",
    97: "Address family not supported by protocol family",
    98: "Address already in use",
    99: "Address not available",
    100: "Network interface is not configured",
    101: "Network is unreachable",
    102: "Connection reset by network",
    103: "Connection aborted",
    104: "Connection reset by peer",
    105: "No buffer space available",
    106: "Socket is already connected",
    107: "Socket is not connected",
    108: "Can't send after socket shutdown",
    109: "Too many references",
    110: "Connection timed out",
    111: "Connection refused",
    112: "Host is down",
    113: "Host is unreachable",
    114: "Socket already connected",
    115: "Connection already in progress",
    116: "Stale file handle",
    122: "Quota exceeded",
    123: "No medium (in tape drive)",
    125: "Operation canceled",
    130: "Previous owner died",
    131: "State not recoverable"
}
  , Wa = 0;
function Xa(a) {
    return J[Wa >> 2] = a
}
var Ya = [];
function Za(a, b) {
    Ya[a] = {
        input: [],
        H: [],
        R: b
    };
    $a[a] = {
        k: ab
    }
}
var ab = {
    open: function(a) {
        var b = Ya[a.e.$];
        b || e(new T(S.Ca));
        a.p = b;
        a.seekable = m
    },
    close: function(a) {
        a.p.H.length && a.p.R.Z(a.p, 10)
    },
    J: function(a, b, c, d) {
        (!a.p || !a.p.R.Pa) && e(new T(S.Ea));
        for (var f = 0, g = 0; g < d; g++) {
            var h;
            try {
                h = a.p.R.Pa(a.p)
            } catch (x) {
                e(new T(S.C))
            }
            h === i && 0 === f && e(new T(S.za));
            if (h === l || h === i)
                break;
            f++;
            b[c + g] = h
        }
        f && (a.e.timestamp = Date.now());
        return f
    },
    write: function(a, b, c, d) {
        (!a.p || !a.p.R.Z) && e(new T(S.Ea));
        for (var f = 0; f < d; f++)
            try {
                a.p.R.Z(a.p, b[c + f])
            } catch (g) {
                e(new T(S.C))
            }
        d && (a.e.timestamp = Date.now());
        return f
    }
}
  , U = {
    A: l,
    $a: 1,
    ca: 2,
    ya: 3,
    G: function() {
        return U.createNode(l, "/", 16895, 0)
    },
    createNode: function(a, b, c, d) {
        (24576 === (c & 61440) || 4096 === (c & 61440)) && e(new T(S.O));
        U.A || (U.A = {
            dir: {
                e: {
                    B: U.g.B,
                    o: U.g.o,
                    ra: U.g.ra,
                    X: U.g.X,
                    rename: U.g.rename,
                    Za: U.g.Za,
                    Va: U.g.Va,
                    Ua: U.g.Ua,
                    ba: U.g.ba
                },
                K: {
                    F: U.k.F
                }
            },
            file: {
                e: {
                    B: U.g.B,
                    o: U.g.o
                },
                K: {
                    F: U.k.F,
                    J: U.k.J,
                    write: U.k.write,
                    Fa: U.k.Fa,
                    Ra: U.k.Ra
                }
            },
            link: {
                e: {
                    B: U.g.B,
                    o: U.g.o,
                    aa: U.g.aa
                },
                K: {}
            },
            Ia: {
                e: {
                    B: U.g.B,
                    o: U.g.o
                },
                K: bb
            }
        });
        cb || (cb = function(a, b, c, d) {
            a || (a = this);
            this.parent = a;
            this.G = a.G;
            this.Y = l;
            this.id = db++;
            this.name = b;
            this.mode = c;
            this.g = {};
            this.k = {};
            this.$ = d
        }
        ,
        cb.prototype = {},
        Object.defineProperties(cb.prototype, {
            J: {
                get: function() {
                    return 365 === (this.mode & 365)
                },
                set: function(a) {
                    a ? this.mode |= 365 : this.mode &= -366
                }
            },
            write: {
                get: function() {
                    return 146 === (this.mode & 146)
                },
                set: function(a) {
                    a ? this.mode |= 146 : this.mode &= -147
                }
            },
            ub: {
                get: function() {
                    return 16384 === (this.mode & 61440)
                }
            },
            tb: {
                get: function() {
                    return 8192 === (this.mode & 61440)
                }
            }
        }));
        c = new cb(a,b,c,d);
        d = eb(c.parent.id, c.name);
        c.Ab = fb[d];
        fb[d] = c;
        16384 === (c.mode & 61440) ? (c.g = U.A.dir.e,
        c.k = U.A.dir.K,
        c.n = {}) : 32768 === (c.mode & 61440) ? (c.g = U.A.file.e,
        c.k = U.A.file.K,
        c.n = [],
        c.V = U.ca) : 40960 === (c.mode & 61440) ? (c.g = U.A.link.e,
        c.k = U.A.link.K) : 8192 === (c.mode & 61440) && (c.g = U.A.Ia.e,
        c.k = U.A.Ia.K);
        c.timestamp = Date.now();
        a && (a.n[b] = c);
        return c
    },
    ka: function(a) {
        a.V !== U.ca && (a.n = Array.prototype.slice.call(a.n),
        a.V = U.ca)
    },
    g: {
        B: function(a) {
            var b = {};
            b.Td = 8192 === (a.mode & 61440) ? a.id : 1;
            b.de = a.id;
            b.mode = a.mode;
            b.ke = 1;
            b.uid = 0;
            b.be = 0;
            b.$ = a.$;
            b.size = 16384 === (a.mode & 61440) ? 4096 : 32768 === (a.mode & 61440) ? a.n.length : 40960 === (a.mode & 61440) ? a.link.length : 0;
            b.Pd = new Date(a.timestamp);
            b.ie = new Date(a.timestamp);
            b.Sd = new Date(a.timestamp);
            b.lb = 4096;
            b.Qd = Math.ceil(b.size / b.lb);
            return b
        },
        o: function(a, b) {
            b.mode !== i && (a.mode = b.mode);
            b.timestamp !== i && (a.timestamp = b.timestamp);
            if (b.size !== i) {
                U.ka(a);
                var c = a.n;
                if (b.size < c.length)
                    c.length = b.size;
                else
                    for (; b.size > c.length; )
                        c.push(0)
            }
        },
        ra: function() {
            e(gb[S.T])
        },
        X: function(a, b, c, d) {
            return U.createNode(a, b, c, d)
        },
        rename: function(a, b, c) {
            if (16384 === (a.mode & 61440)) {
                var d;
                try {
                    d = hb(b, c)
                } catch (f) {}
                if (d)
                    for (var g in d.n)
                        e(new T(S.Da))
            }
            delete a.parent.n[a.name];
            a.name = c;
            b.n[c] = a;
            a.parent = b
        },
        Za: function(a, b) {
            delete a.n[b]
        },
        Va: function(a, b) {
            var c = hb(a, b), d;
            for (d in c.n)
                e(new T(S.Da));
            delete a.n[b]
        },
        Ua: function(a) {
            var b = [".", ".."], c;
            for (c in a.n)
                a.n.hasOwnProperty(c) && b.push(c);
            return b
        },
        ba: function(a, b, c) {
            a = U.createNode(a, b, 41471, 0);
            a.link = c;
            return a
        },
        aa: function(a) {
            40960 !== (a.mode & 61440) && e(new T(S.L));
            return a.link
        }
    },
    k: {
        J: function(a, b, c, d, f) {
            a = a.e.n;
            if (f >= a.length)
                return 0;
            d = Math.min(a.length - f, d);
            w(0 <= d);
            if (8 < d && a.subarray)
                b.set(a.subarray(f, f + d), c);
            else
                for (var g = 0; g < d; g++)
                    b[c + g] = a[f + g];
            return d
        },
        write: function(a, b, c, d, f, g) {
            var h = a.e;
            h.timestamp = Date.now();
            a = h.n;
            if (d && 0 === a.length && 0 === f && b.subarray)
                return g && 0 === c ? (h.n = b,
                h.V = b.buffer === H.buffer ? U.$a : U.ya) : (h.n = new Uint8Array(b.subarray(c, c + d)),
                h.V = U.ya),
                d;
            U.ka(h);
            for (a = h.n; a.length < f; )
                a.push(0);
            for (g = 0; g < d; g++)
                a[f + g] = b[c + g];
            return d
        },
        F: function(a, b, c) {
            1 === c ? b += a.position : 2 === c && 32768 === (a.e.mode & 61440) && (b += a.e.n.length);
            0 > b && e(new T(S.L));
            a.Eb = [];
            return a.position = b
        },
        Fa: function(a, b, c) {
            U.ka(a.e);
            a = a.e.n;
            for (b += c; b > a.length; )
                a.push(0)
        },
        Ra: function(a, b, c, d, f, g, h) {
            32768 !== (a.e.mode & 61440) && e(new T(S.Ca));
            a = a.e.n;
            if (!(h & 2) && (a.buffer === b || a.buffer === b.buffer))
                f = m,
                d = a.byteOffset;
            else {
                if (0 < f || f + d < a.length)
                    a = a.subarray ? a.subarray(f, f + d) : Array.prototype.slice.call(a, f, f + d);
                f = j;
                (d = xa(d)) || e(new T(S.eb));
                b.set(a, d)
            }
            return {
                pe: d,
                Nd: f
            }
        }
    }
}
  , ib = M(1, "i32*", L)
  , jb = M(1, "i32*", L)
  , kb = M(1, "i32*", L)
  , lb = l
  , $a = [l]
  , mb = []
  , db = 1
  , fb = l
  , nb = j
  , T = l
  , gb = {};
function V(a, b) {
    var a = ob("/", a), b = b || {}, c = {
        Na: j,
        ta: 0
    }, d;
    for (d in c)
        b[d] === i && (b[d] = c[d]);
    8 < b.ta && e(new T(S.ea));
    var c = pb(a.split("/").filter(function(a) {
        return !!a
    }), m)
      , f = lb
      , g = "/";
    for (d = 0; d < c.length; d++) {
        var h = d === c.length - 1;
        if (h && b.parent)
            break;
        f = hb(f, c[d]);
        g = W(g + "/" + c[d]);
        if (f.Y && (!h || h && b.Na))
            f = f.Y.root;
        if (!h || b.ma)
            for (h = 0; 40960 === (f.mode & 61440); ) {
                f = V(g).e;
                f.g.aa || e(new T(S.L));
                var f = f.g.aa(f)
                  , x = ob;
                var s = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(g).slice(1)
                  , g = s[0]
                  , s = s[1];
                !g && !s ? g = "." : (s && (s = s.substr(0, s.length - 1)),
                g += s);
                g = x(g, f);
                f = V(g, {
                    ta: b.ta
                }).e;
                40 < h++ && e(new T(S.ea))
            }
    }
    return {
        path: g,
        e: f
    }
}
function X(a) {
    for (var b; ; ) {
        if (a === a.parent)
            return a = a.G.yb,
            !b ? a : "/" !== a[a.length - 1] ? a + "/" + b : a + b;
        b = b ? a.name + "/" + b : a.name;
        a = a.parent
    }
}
function eb(a, b) {
    for (var c = 0, d = 0; d < b.length; d++)
        c = (c << 5) - c + b.charCodeAt(d) | 0;
    return (a + c >>> 0) % fb.length
}
function hb(a, b) {
    var c = qb(a, "x");
    c && e(new T(c));
    for (c = fb[eb(a.id, b)]; c; c = c.Ab) {
        var d = c.name;
        if (c.parent.id === a.id && d === b)
            return c
    }
    return a.g.ra(a, b)
}
var rb = {
    r: 0,
    rs: 1052672,
    "r+": 2,
    w: 577,
    wx: 705,
    xw: 705,
    "w+": 578,
    "wx+": 706,
    "xw+": 706,
    a: 1089,
    ax: 1217,
    xa: 1217,
    "a+": 1090,
    "ax+": 1218,
    "xa+": 1218
};
function qb(a, b) {
    return nb ? 0 : -1 !== b.indexOf("r") && !(a.mode & 292) || -1 !== b.indexOf("w") && !(a.mode & 146) || -1 !== b.indexOf("x") && !(a.mode & 73) ? S.ab : 0
}
function sb(a, b) {
    try {
        return hb(a, b),
        S.Ba
    } catch (c) {}
    return qb(a, "wx")
}
var bb = {
    open: function(a) {
        a.k = $a[a.e.$].k;
        a.k.open && a.k.open(a)
    },
    F: function() {
        e(new T(S.fa))
    }
};
function tb(a, b, c) {
    var d = V(a, {
        parent: j
    }).e
      , a = ub(a)
      , f = sb(d, a);
    f && e(new T(f));
    d.g.X || e(new T(S.O));
    return d.g.X(d, a, b, c)
}
function vb(a, b) {
    b = (b !== i ? b : 438) & 4095;
    b |= 32768;
    return tb(a, b, 0)
}
function wb(a, b) {
    b = (b !== i ? b : 511) & 1023;
    b |= 16384;
    return tb(a, b, 0)
}
function xb(a, b, c) {
    "undefined" === typeof c && (c = b,
    b = 438);
    return tb(a, b | 8192, c)
}
function yb(a, b) {
    var c = V(b, {
        parent: j
    }).e
      , d = ub(b)
      , f = sb(c, d);
    f && e(new T(f));
    c.g.ba || e(new T(S.O));
    return c.g.ba(c, d, a)
}
function zb(a, b) {
    var c;
    c = "string" === typeof a ? V(a, {
        ma: j
    }).e : a;
    c.g.o || e(new T(S.O));
    c.g.o(c, {
        mode: b & 4095 | c.mode & -4096,
        timestamp: Date.now()
    })
}
function Ab(a, b) {
    var c, d;
    "string" === typeof b ? (d = rb[b],
    "undefined" === typeof d && e(Error("Unknown file open mode: " + b))) : d = b;
    b = d;
    c = b & 64 ? ("undefined" === typeof c ? 438 : c) & 4095 | 32768 : 0;
    var f;
    if ("object" === typeof a)
        f = a;
    else {
        a = W(a);
        try {
            f = V(a, {
                ma: !(b & 131072)
            }).e
        } catch (g) {}
    }
    b & 64 && (f ? b & 128 && e(new T(S.Ba)) : f = tb(a, c, 0));
    f || e(new T(S.T));
    8192 === (f.mode & 61440) && (b &= -513);
    f ? 40960 === (f.mode & 61440) ? c = S.ea : 16384 === (f.mode & 61440) && (0 !== (b & 2097155) || b & 512) ? c = S.da : (c = ["r", "w", "rw"][b & 2097155],
    b & 512 && (c += "w"),
    c = qb(f, c)) : c = S.T;
    c && e(new T(c));
    b & 512 && (c = f,
    c = "string" === typeof c ? V(c, {
        ma: j
    }).e : c,
    c.g.o || e(new T(S.O)),
    16384 === (c.mode & 61440) && e(new T(S.da)),
    32768 !== (c.mode & 61440) && e(new T(S.L)),
    (d = qb(c, "w")) && e(new T(d)),
    c.g.o(c, {
        size: 0,
        timestamp: Date.now()
    }));
    var b = b & -641, h;
    f = {
        e: f,
        path: X(f),
        P: b,
        seekable: j,
        position: 0,
        k: f.k,
        Eb: [],
        error: m
    };
    Bb || (Bb = n(),
    Bb.prototype = {},
    Object.defineProperties(Bb.prototype, {
        object: {
            get: function() {
                return this.e
            },
            set: function(a) {
                this.e = a
            }
        },
        fe: {
            get: function() {
                return 1 !== (this.P & 2097155)
            }
        },
        ge: {
            get: function() {
                return 0 !== (this.P & 2097155)
            }
        },
        ee: {
            get: function() {
                return this.P & 1024
            }
        }
    }));
    c = new Bb;
    for (var x in f)
        c[x] = f[x];
    f = c;
    a: {
        x = i || 4096;
        for (c = i || 0; c <= x; c++)
            if (!mb[c]) {
                h = c;
                break a
            }
        e(new T(S.cb))
    }
    f.q = h;
    h = mb[h] = f;
    h.k.open && h.k.open(h);
    p.logReadFiles && !(b & 1) && (Cb || (Cb = {}),
    a in Cb || (Cb[a] = 1,
    p.printErr("read file: " + a)));
    return h
}
function Db(a) {
    try {
        a.k.close && a.k.close(a)
    } catch (b) {
        e(b)
    } finally {
        mb[a.q] = l
    }
}
function Eb() {
    T || (T = function(a) {
        this.Ud = a;
        for (var b in S)
            if (S[b] === a) {
                this.code = b;
                break
            }
        this.message = Va[a]
    }
    ,
    T.prototype = Error(),
    [S.T].forEach(function(a) {
        gb[a] = new T(a);
        gb[a].stack = "<generic error, no stack>"
    }))
}
var Fb;
function Gb(a, b) {
    var c = 0;
    a && (c |= 365);
    b && (c |= 146);
    return c
}
function Hb(a, b, c, d, f, g) {
    a = b ? W(("string" === typeof a ? a : X(a)) + "/" + b) : a;
    d = Gb(d, f);
    f = vb(a, d);
    if (c) {
        if ("string" === typeof c) {
            for (var a = Array(c.length), b = 0, h = c.length; b < h; ++b)
                a[b] = c.charCodeAt(b);
            c = a
        }
        zb(f, d | 146);
        var a = Ab(f, "w")
          , b = c
          , h = c.length
          , x = 0;
        (0 > h || 0 > x) && e(new T(S.L));
        0 === (a.P & 2097155) && e(new T(S.bb));
        16384 === (a.e.mode & 61440) && e(new T(S.da));
        a.k.write || e(new T(S.L));
        c = j;
        "undefined" === typeof x ? (x = a.position,
        c = m) : a.seekable || e(new T(S.fa));
        a.P & 1024 && ((!a.seekable || !a.k.F) && e(new T(S.fa)),
        a.k.F(a, 0, 2));
        g = a.k.write(a, b, 0, h, x, g);
        c || (a.position += g);
        Db(a);
        zb(f, d)
    }
    return f
}
function Y(a, b, c, d) {
    a = W(("string" === typeof a ? a : X(a)) + "/" + b);
    b = Gb(!!c, !!d);
    Y.Qa || (Y.Qa = 64);
    var f;
    f = Y.Qa++ << 8 | 0;
    $a[f] = {
        k: {
            open: function(a) {
                a.seekable = m
            },
            close: function() {
                d && (d.buffer && d.buffer.length) && d(10)
            },
            J: function(a, b, d, f) {
                for (var u = 0, t = 0; t < f; t++) {
                    var A;
                    try {
                        A = c()
                    } catch (k) {
                        e(new T(S.C))
                    }
                    A === i && 0 === u && e(new T(S.za));
                    if (A === l || A === i)
                        break;
                    u++;
                    b[d + t] = A
                }
                u && (a.e.timestamp = Date.now());
                return u
            },
            write: function(a, b, c, f) {
                for (var u = 0; u < f; u++)
                    try {
                        d(b[c + u])
                    } catch (t) {
                        e(new T(S.C))
                    }
                f && (a.e.timestamp = Date.now());
                return u
            }
        }
    };
    return xb(a, b, f)
}
function Ib(a) {
    if (a.tb || a.ub || a.link || a.n)
        return j;
    var b = j;
    "undefined" !== typeof XMLHttpRequest && e(Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."));
    if (p.read)
        try {
            a.n = G(p.read(a.url), j)
        } catch (c) {
            b = m
        }
    else
        e(Error("Cannot load without read() or XMLHttpRequest."));
    b || Xa(S.C);
    return b
}
var cb, Bb, Cb;
function pb(a, b) {
    for (var c = 0, d = a.length - 1; 0 <= d; d--) {
        var f = a[d];
        "." === f ? a.splice(d, 1) : ".." === f ? (a.splice(d, 1),
        c++) : c && (a.splice(d, 1),
        c--)
    }
    if (b)
        for (; c--; c)
            a.unshift("..");
    return a
}
function W(a) {
    var b = "/" === a.charAt(0)
      , c = "/" === a.substr(-1)
      , a = pb(a.split("/").filter(function(a) {
        return !!a
    }), !b).join("/");
    !a && !b && (a = ".");
    a && c && (a += "/");
    return (b ? "/" : "") + a
}
function ub(a) {
    if ("/" === a)
        return "/";
    var b = a.lastIndexOf("/");
    return -1 === b ? a : a.substr(b + 1)
}
function ob() {
    for (var a = "", b = m, c = arguments.length - 1; -1 <= c && !b; c--) {
        var d = 0 <= c ? arguments[c] : "/";
        "string" !== typeof d && e(new TypeError("Arguments to path.resolve must be strings"));
        d && (a = d + "/" + a,
        b = "/" === d.charAt(0))
    }
    a = pb(a.split("/").filter(function(a) {
        return !!a
    }), !b).join("/");
    return (b ? "/" : "") + a || "."
}
var Jb = m
  , Kb = m
  , Lb = m
  , Mb = m
  , Nb = i
  , Ob = i;
function Pb(a) {
    return {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        bmp: "image/bmp",
        ogg: "audio/ogg",
        wav: "audio/wav",
        mp3: "audio/mpeg"
    }[a.substr(a.lastIndexOf(".") + 1)]
}
var Qb = [];
function Rb() {
    var a = p.canvas;
    Qb.forEach(function(b) {
        b(a.width, a.height)
    })
}
function Sb(a, b, c) {
    b && c ? (a.Fb = b,
    a.sb = c) : (b = a.Fb,
    c = a.sb);
    var d = b
      , f = c;
    p.forcedAspectRatio && 0 < p.forcedAspectRatio && (d / f < p.forcedAspectRatio ? d = Math.round(f * p.forcedAspectRatio) : f = Math.round(d / p.forcedAspectRatio));
    if ((document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === a.parentNode && "undefined" != typeof screen)
        var g = Math.min(screen.width / d, screen.height / f)
          , d = Math.round(d * g)
          , f = Math.round(f * g);
    Ob ? (a.width != d && (a.width = d),
    a.height != f && (a.height = f),
    "undefined" != typeof a.style && (a.style.removeProperty("width"),
    a.style.removeProperty("height"))) : (a.width != b && (a.width = b),
    a.height != c && (a.height = c),
    "undefined" != typeof a.style && (d != b || f != c ? (a.style.setProperty("width", d + "px", "important"),
    a.style.setProperty("height", f + "px", "important")) : (a.style.removeProperty("width"),
    a.style.removeProperty("height"))))
}
var Tb, Ub, Vb, Wb;
p._memset = Xb;
p._strlen = Yb;
p._memcpy = Zb;
function $b() {}
p._free = $b;
p.requestFullScreen = function(a, b) {
    function c() {
        Kb = m;
        var a = d.parentNode;
        (document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === a ? (d.Ha = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen || document.exitFullscreen || n(),
        d.Ha = d.Ha.bind(document),
        Nb && d.ua(),
        Kb = j,
        Ob && ("undefined" != typeof SDL && (a = Ba[SDL.screen + 0 * v.D >> 2],
        J[SDL.screen + 0 * v.D >> 2] = a | 8388608),
        Rb())) : (a.parentNode.insertBefore(d, a),
        a.parentNode.removeChild(a),
        Ob && ("undefined" != typeof SDL && (a = Ba[SDL.screen + 0 * v.D >> 2],
        J[SDL.screen + 0 * v.D >> 2] = a & -8388609),
        Rb()));
        if (p.onFullScreen)
            p.onFullScreen(Kb);
        Sb(d)
    }
    Nb = a;
    Ob = b;
    "undefined" === typeof Nb && (Nb = j);
    "undefined" === typeof Ob && (Ob = m);
    var d = p.canvas;
    Mb || (Mb = j,
    document.addEventListener("fullscreenchange", c, m),
    document.addEventListener("mozfullscreenchange", c, m),
    document.addEventListener("webkitfullscreenchange", c, m),
    document.addEventListener("MSFullscreenChange", c, m));
    var f = document.createElement("div");
    d.parentNode.insertBefore(f, d);
    f.appendChild(d);
    f.Cb = f.requestFullScreen || f.mozRequestFullScreen || f.msRequestFullscreen || (f.webkitRequestFullScreen ? function() {
        f.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    }
    : l);
    f.Cb()
}
;
p.requestAnimationFrame = function(a) {
    "undefined" === typeof window ? setTimeout(a, 1E3 / 60) : (window.requestAnimationFrame || (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || window.setTimeout),
    window.requestAnimationFrame(a))
}
;
p.setCanvasSize = function(a, b, c) {
    Sb(p.canvas, a, b);
    c || Rb()
}
;
p.pauseMainLoop = n();
p.resumeMainLoop = function() {
    Jb && (Jb = m,
    l())
}
;
p.getUserMedia = function() {
    window.Oa || (window.Oa = navigator.getUserMedia || navigator.mozGetUserMedia);
    window.Oa(i)
}
;
Eb();
var fb = Array(4096), ac = U, bc = "/", cc = "/" === bc, dc = !bc, Z;
cc && lb && e(new T(S.Aa));
if (!cc && !dc) {
    var ec = V(bc, {
        Na: m
    })
      , bc = ec.path;
    Z = ec.e;
    Z.Y && e(new T(S.Aa));
    16384 !== (Z.mode & 61440) && e(new T(S.fb))
}
var fc = {
    type: ac,
    me: {},
    yb: bc,
    zb: []
}
  , gc = ac.G(fc);
gc.G = fc;
fc.root = gc;
cc ? lb = gc : Z && (Z.Y = fc,
Z.G && Z.G.zb.push(fc));
wb("/tmp");
wb("/dev");
$a[259] = {
    k: {
        J: function() {
            return 0
        },
        write: function() {
            return 0
        }
    }
};
xb("/dev/null", 259);
Za(1280, {
    Pa: function(a) {
        if (!a.input.length) {
            var b = l;
            if (ba) {
                if (b = process.stdin.read(),
                !b) {
                    if (process.stdin._readableState && process.stdin._readableState.ended)
                        return l;
                    return
                }
            } else
                "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "),
                b !== l && (b += "\n")) : "function" == typeof readline && (b = readline(),
                b !== l && (b += "\n"));
            if (!b)
                return l;
            a.input = G(b, j)
        }
        return a.input.shift()
    },
    Z: function(a, b) {
        b === l || 10 === b ? (p.print(a.H.join("")),
        a.H = []) : a.H.push(hc.sa(b))
    }
});
Za(1536, {
    Z: function(a, b) {
        b === l || 10 === b ? (p.printErr(a.H.join("")),
        a.H = []) : a.H.push(hc.sa(b))
    }
});
xb("/dev/tty", 1280);
xb("/dev/tty1", 1536);
wb("/dev/shm");
wb("/dev/shm/tmp");
Ia.unshift({
    Q: function() {
        if (!p.noFSInit && !Fb) {
            w(!Fb, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
            Fb = j;
            Eb();
            p.stdin = p.stdin;
            p.stdout = p.stdout;
            p.stderr = p.stderr;
            p.stdin ? Y("/dev", "stdin", p.stdin) : yb("/dev/tty", "/dev/stdin");
            p.stdout ? Y("/dev", "stdout", l, p.stdout) : yb("/dev/tty", "/dev/stdout");
            p.stderr ? Y("/dev", "stderr", l, p.stderr) : yb("/dev/tty1", "/dev/stderr");
            var a = Ab("/dev/stdin", "r");
            J[ib >> 2] = a ? a.q + 1 : 0;
            w(0 === a.q, "invalid handle for stdin (" + a.q + ")");
            a = Ab("/dev/stdout", "w");
            J[jb >> 2] = a ? a.q + 1 : 0;
            w(1 === a.q, "invalid handle for stdout (" + a.q + ")");
            a = Ab("/dev/stderr", "w");
            J[kb >> 2] = a ? a.q + 1 : 0;
            w(2 === a.q, "invalid handle for stderr (" + a.q + ")")
        }
    }
});
Ja.push({
    Q: function() {
        nb = m
    }
});
Ka.push({
    Q: function() {
        Fb = m;
        for (var a = 0; a < mb.length; a++) {
            var b = mb[a];
            b && Db(b)
        }
    }
});
p.FS_createFolder = function(a, b, c, d) {
    a = W(("string" === typeof a ? a : X(a)) + "/" + b);
    return wb(a, Gb(c, d))
}
;
p.FS_createPath = function(a, b) {
    for (var a = "string" === typeof a ? a : X(a), c = b.split("/").reverse(); c.length; ) {
        var d = c.pop();
        if (d) {
            var f = W(a + "/" + d);
            try {
                wb(f)
            } catch (g) {}
            a = f
        }
    }
    return f
}
;
p.FS_createDataFile = Hb;
p.FS_createPreloadedFile = function(a, b, c, d, f, g, h, x, s) {
    function u() {
        Lb = document.pointerLockElement === k || document.mozPointerLockElement === k || document.webkitPointerLockElement === k || document.msPointerLockElement === k
    }
    function t(c) {
        function t(c) {
            x || Hb(a, b, c, d, f, s);
            g && g();
            Ta()
        }
        var k = m;
        p.preloadPlugins.forEach(function(a) {
            !k && a.canHandle(y) && (a.handle(c, y, t, function() {
                h && h();
                Ta()
            }),
            k = j)
        });
        k || t(c)
    }
    p.preloadPlugins || (p.preloadPlugins = []);
    if (!Tb && !da) {
        Tb = j;
        try {
            new Blob,
            Ub = j
        } catch (A) {
            Ub = m,
            console.log("warning: no blob constructor, cannot create blobs with mimetypes")
        }
        Vb = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : !Ub ? console.log("warning: no BlobBuilder") : l;
        Wb = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : i;
        !p.Ta && "undefined" === typeof Wb && (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."),
        p.Ta = j);
        p.preloadPlugins.push({
            canHandle: function(a) {
                return !p.Ta && /\.(jpg|jpeg|png|bmp)$/i.test(a)
            },
            handle: function(a, b, c, d) {
                var f = l;
                if (Ub)
                    try {
                        f = new Blob([a],{
                            type: Pb(b)
                        }),
                        f.size !== a.length && (f = new Blob([(new Uint8Array(a)).buffer],{
                            type: Pb(b)
                        }))
                    } catch (g) {
                        v.S("Blob constructor present but fails: " + g + "; falling back to blob builder")
                    }
                f || (f = new Vb,
                f.append((new Uint8Array(a)).buffer),
                f = f.getBlob());
                var h = Wb.createObjectURL(f)
                  , t = new Image;
                t.onload = function() {
                    w(t.complete, "Image " + b + " could not be decoded");
                    var d = document.createElement("canvas");
                    d.width = t.width;
                    d.height = t.height;
                    d.getContext("2d").drawImage(t, 0, 0);
                    p.preloadedImages[b] = d;
                    Wb.revokeObjectURL(h);
                    c && c(a)
                }
                ;
                t.onerror = function() {
                    console.log("Image " + h + " could not be decoded");
                    d && d()
                }
                ;
                t.src = h
            }
        });
        p.preloadPlugins.push({
            canHandle: function(a) {
                return !p.le && a.substr(-4)in {
                    ".ogg": 1,
                    ".wav": 1,
                    ".mp3": 1
                }
            },
            handle: function(a, b, c, d) {
                function f(d) {
                    h || (h = j,
                    p.preloadedAudios[b] = d,
                    c && c(a))
                }
                function g() {
                    h || (h = j,
                    p.preloadedAudios[b] = new Audio,
                    d && d())
                }
                var h = m;
                if (Ub) {
                    try {
                        var t = new Blob([a],{
                            type: Pb(b)
                        })
                    } catch (k) {
                        return g()
                    }
                    var t = Wb.createObjectURL(t)
                      , s = new Audio;
                    s.addEventListener("canplaythrough", function() {
                        f(s)
                    }, m);
                    s.onerror = function() {
                        if (!h) {
                            console.log("warning: browser could not fully decode audio " + b + ", trying slower base64 approach");
                            for (var c = "", d = 0, g = 0, t = 0; t < a.length; t++) {
                                d = d << 8 | a[t];
                                for (g += 8; 6 <= g; )
                                    var k = d >> g - 6 & 63
                                      , g = g - 6
                                      , c = c + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k]
                            }
                            2 == g ? (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(d & 3) << 4],
                            c += "==") : 4 == g && (c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(d & 15) << 2],
                            c += "=");
                            s.src = "data:audio/x-" + b.substr(-3) + ";base64," + c;
                            f(s)
                        }
                    }
                    ;
                    s.src = t;
                    setTimeout(function() {
                        ka || f(s)
                    }, 1E4)
                } else
                    return g()
            }
        });
        var k = p.canvas;
        k.ua = k.requestPointerLock || k.mozRequestPointerLock || k.webkitRequestPointerLock || k.msRequestPointerLock || n();
        k.Ka = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || n();
        k.Ka = k.Ka.bind(document);
        document.addEventListener("pointerlockchange", u, m);
        document.addEventListener("mozpointerlockchange", u, m);
        document.addEventListener("webkitpointerlockchange", u, m);
        document.addEventListener("mspointerlockchange", u, m);
        p.elementPointerLock && k.addEventListener("click", function(a) {
            !Lb && k.ua && (k.ua(),
            a.preventDefault())
        }, m)
    }
    var y = b ? ob(W(a + "/" + b)) : a;
    Sa();
    if ("string" == typeof c) {
        var E = h
          , ea = function() {
            E ? E() : e('Loading data file "' + c + '" failed.')
        }
          , K = new XMLHttpRequest;
        K.open("GET", c, j);
        K.responseType = "arraybuffer";
        K.onload = function() {
            if (200 == K.status || 0 == K.status && K.response) {
                var a = K.response;
                w(a, 'Loading data file "' + c + '" failed (no arrayBuffer).');
                a = new Uint8Array(a);
                t(a);
                Ta()
            } else
                ea()
        }
        ;
        K.onerror = ea;
        K.send(l);
        Sa()
    } else
        t(c)
}
;
p.FS_createLazyFile = function(a, b, c, d, f) {
    var g, h;
    function x() {
        this.qa = m;
        this.U = []
    }
    x.prototype.get = function(a) {
        if (!(a > this.length - 1 || 0 > a)) {
            var b = a % this.nb;
            return this.rb(Math.floor(a / this.nb))[b]
        }
    }
    ;
    x.prototype.Db = function(a) {
        this.rb = a
    }
    ;
    x.prototype.Ga = function() {
        var a = new XMLHttpRequest;
        a.open("HEAD", c, m);
        a.send(l);
        200 <= a.status && 300 > a.status || 304 === a.status || e(Error("Couldn't load " + c + ". Status: " + a.status));
        var b = Number(a.getResponseHeader("Content-length")), d, f = 1048576;
        if (!((d = a.getResponseHeader("Accept-Ranges")) && "bytes" === d))
            f = b;
        var g = this;
        g.Db(function(a) {
            var d = a * f
              , h = (a + 1) * f - 1
              , h = Math.min(h, b - 1);
            if ("undefined" === typeof g.U[a]) {
                var t = g.U;
                d > h && e(Error("invalid range (" + d + ", " + h + ") or no bytes requested!"));
                h > b - 1 && e(Error("only " + b + " bytes available! programmer error!"));
                var k = new XMLHttpRequest;
                k.open("GET", c, m);
                b !== f && k.setRequestHeader("Range", "bytes=" + d + "-" + h);
                "undefined" != typeof Uint8Array && (k.responseType = "arraybuffer");
                k.overrideMimeType && k.overrideMimeType("text/plain; charset=x-user-defined");
                k.send(l);
                200 <= k.status && 300 > k.status || 304 === k.status || e(Error("Couldn't load " + c + ". Status: " + k.status));
                d = k.response !== i ? new Uint8Array(k.response || []) : G(k.responseText || "", j);
                t[a] = d
            }
            "undefined" === typeof g.U[a] && e(Error("doXHR failed!"));
            return g.U[a]
        });
        this.kb = b;
        this.jb = f;
        this.qa = j
    }
    ;
    "undefined" !== typeof XMLHttpRequest ? (da || e("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc"),
    g = new x,
    Object.defineProperty(g, "length", {
        get: function() {
            this.qa || this.Ga();
            return this.kb
        }
    }),
    Object.defineProperty(g, "chunkSize", {
        get: function() {
            this.qa || this.Ga();
            return this.jb
        }
    }),
    h = i) : (h = c,
    g = i);
    var s, a = W(("string" === typeof a ? a : X(a)) + "/" + b);
    s = vb(a, Gb(d, f));
    g ? s.n = g : h && (s.n = l,
    s.url = h);
    var u = {};
    Object.keys(s.k).forEach(function(a) {
        var b = s.k[a];
        u[a] = function() {
            Ib(s) || e(new T(S.C));
            return b.apply(l, arguments)
        }
    });
    u.J = function(a, b, c, d, f) {
        Ib(s) || e(new T(S.C));
        a = a.e.n;
        if (f >= a.length)
            return 0;
        d = Math.min(a.length - f, d);
        w(0 <= d);
        if (a.slice)
            for (var g = 0; g < d; g++)
                b[c + g] = a[f + g];
        else
            for (g = 0; g < d; g++)
                b[c + g] = a.get(f + g);
        return d
    }
    ;
    s.k = u;
    return s
}
;
p.FS_createLink = function(a, b, c) {
    a = W(("string" === typeof a ? a : X(a)) + "/" + b);
    return yb(c, a)
}
;
p.FS_createDevice = Y;
Wa = v.Ya(4);
J[Wa >> 2] = 0;
Ia.unshift({
    Q: n()
});
Ka.push({
    Q: n()
});
var hc = new v.ga;
ba && (require("fs"),
process.platform.match(/^win/));
Da = r = v.M(B);
Ea = Da + 5242880;
Fa = C = v.M(Ea);
w(Fa < D, "TOTAL_MEMORY not big enough for stack");
ra = Math.min;
var $ = (function(global, env, buffer) {
    // EMSCRIPTEN_START_ASM
    "use asm";
    var a = new global.Int8Array(buffer);
    var b = new global.Int16Array(buffer);
    var c = new global.Int32Array(buffer);
    var d = new global.Uint8Array(buffer);
    var e = new global.Uint16Array(buffer);
    var f = new global.Uint32Array(buffer);
    var g = new global.Float32Array(buffer);
    var h = new global.Float64Array(buffer);
    var i = env.STACKTOP | 0;
    var j = env.STACK_MAX | 0;
    var k = env.tempDoublePtr | 0;
    var l = env.ABORT | 0;
    var m = 0;
    var n = 0;
    var o = 0;
    var p = 0;
    var q = +env.NaN
      , r = +env.Infinity;
    var s = 0
      , t = 0
      , u = 0
      , v = 0
      , w = 0.0
      , x = 0
      , y = 0
      , z = 0
      , A = 0.0;
    var B = 0;
    var C = 0;
    var D = 0;
    var E = 0;
    var F = 0;
    var G = 0;
    var H = 0;
    var I = 0;
    var J = 0;
    var K = 0;
    var L = global.Math.floor;
    var M = global.Math.abs;
    var N = global.Math.sqrt;
    var O = global.Math.pow;
    var P = global.Math.cos;
    var Q = global.Math.sin;
    var R = global.Math.tan;
    var S = global.Math.acos;
    var T = global.Math.asin;
    var U = global.Math.atan;
    var V = global.Math.atan2;
    var W = global.Math.exp;
    var X = global.Math.log;
    var Y = global.Math.ceil;
    var Z = global.Math.imul;
    var _ = env.abort;
    var $ = env.assert;
    var aa = env.asmPrintInt;
    var ba = env.asmPrintFloat;
    var ca = env.min;
    var da = env._fflush;
    var ea = env.___setErrNo;
    var fa = env._malloc;
    var ga = env._emscripten_memcpy_big;
    var ha = env._free;
    var ia = env._llvm_bswap_i32;
    var ja = 0.0;
    // EMSCRIPTEN_START_FUNCS
    function ka(a) {
        a = a | 0;
        var b = 0;
        b = i;
        i = i + a | 0;
        i = i + 7 & -8;
        return b | 0
    }
    function la() {
        return i | 0
    }
    function ma(a) {
        a = a | 0;
        i = a
    }
    function na(a, b) {
        a = a | 0;
        b = b | 0;
        if ((m | 0) == 0) {
            m = a;
            n = b
        }
    }
    function oa(b) {
        b = b | 0;
        a[k] = a[b];
        a[k + 1 | 0] = a[b + 1 | 0];
        a[k + 2 | 0] = a[b + 2 | 0];
        a[k + 3 | 0] = a[b + 3 | 0]
    }
    function pa(b) {
        b = b | 0;
        a[k] = a[b];
        a[k + 1 | 0] = a[b + 1 | 0];
        a[k + 2 | 0] = a[b + 2 | 0];
        a[k + 3 | 0] = a[b + 3 | 0];
        a[k + 4 | 0] = a[b + 4 | 0];
        a[k + 5 | 0] = a[b + 5 | 0];
        a[k + 6 | 0] = a[b + 6 | 0];
        a[k + 7 | 0] = a[b + 7 | 0]
    }
    function qa(a) {
        a = a | 0;
        B = a
    }
    function ra(a) {
        a = a | 0;
        C = a
    }
    function sa(a) {
        a = a | 0;
        D = a
    }
    function ta(a) {
        a = a | 0;
        E = a
    }
    function ua(a) {
        a = a | 0;
        F = a
    }
    function va(a) {
        a = a | 0;
        G = a
    }
    function wa(a) {
        a = a | 0;
        H = a
    }
    function xa(a) {
        a = a | 0;
        I = a
    }
    function ya(a) {
        a = a | 0;
        J = a
    }
    function za(a) {
        a = a | 0;
        K = a
    }
    function Aa(e, f, g, h) {
        e = e | 0;
        f = f | 0;
        g = g | 0;
        h = h | 0;
        var j = 0
          , k = 0
          , l = 0
          , m = 0
          , n = 0
          , o = 0
          , p = 0
          , q = 0
          , r = 0
          , s = 0
          , t = 0
          , u = 0
          , v = 0
          , w = 0;
        j = i;
        i = i + 32 | 0;
        o = j;
        l = j + 16 | 0;
        n = g + h | 0;
        c[o + 0 >> 2] = 0;
        c[o + 4 >> 2] = 0;
        c[o + 8 >> 2] = 0;
        c[o + 12 >> 2] = 0;
        m = e + f | 0;
        r = a[e] | 0;
        a: do {
            if (!(r << 24 >> 24 == 0)) {
                p = (f | 0) != 0;
                f = m;
                q = g;
                b: while (1) {
                    if (p & e >>> 0 > m >>> 0) {
                        break a
                    }
                    r = a[8 + (r & 255) | 0] | 0;
                    b[o >> 1] = r << 24 >> 24;
                    c: do {
                        if (!(r << 24 >> 24 < 0)) {
                            t = r << 24 >> 24;
                            r = f - e | 0;
                            d: do {
                                if (p) {
                                    u = 1;
                                    while (1) {
                                        if ((u | 0) > (r | 0)) {
                                            k = 13;
                                            break d
                                        }
                                        w = a[8 + (d[e + u | 0] | 0) | 0] | 0;
                                        s = w << 24 >> 24;
                                        if (w << 24 >> 24 < 0) {
                                            k = 13;
                                            break d
                                        }
                                        t = a[264 + (t << 5) + s | 0] | 0;
                                        if (t << 24 >> 24 < 0) {
                                            k = 13;
                                            break d
                                        }
                                        b[o + (u << 1) >> 1] = t << 24 >> 24;
                                        u = u + 1 | 0;
                                        if ((u | 0) < 8) {
                                            t = s
                                        } else {
                                            break
                                        }
                                    }
                                } else {
                                    u = 1;
                                    while (1) {
                                        w = a[8 + (d[e + u | 0] | 0) | 0] | 0;
                                        r = w << 24 >> 24;
                                        if (w << 24 >> 24 < 0) {
                                            k = 13;
                                            break d
                                        }
                                        s = a[264 + (t << 5) + r | 0] | 0;
                                        if (s << 24 >> 24 < 0) {
                                            k = 13;
                                            break d
                                        }
                                        b[o + (u << 1) >> 1] = s << 24 >> 24;
                                        u = u + 1 | 0;
                                        if ((u | 0) < 8) {
                                            t = r
                                        } else {
                                            break
                                        }
                                    }
                                }
                            } while (0);if ((k | 0) == 13) {
                                k = 0;
                                if ((u | 0) < 2) {
                                    k = 27;
                                    break
                                }
                            }
                            s = 2;
                            e: while (1) {
                                r = c[1296 + (s * 80 | 0) >> 2] | 0;
                                f: do {
                                    if (!(r >>> 0 > u >>> 0)) {
                                        t = 0;
                                        while (1) {
                                            v = t + 1 | 0;
                                            if ((b[o + (t << 1) >> 1] | 0) > (b[1288 + (s * 80 | 0) + (t << 1) + 48 >> 1] | 0)) {
                                                break f
                                            }
                                            if (v >>> 0 < r >>> 0) {
                                                t = v
                                            } else {
                                                break e
                                            }
                                        }
                                    }
                                } while (0);if ((s | 0) > 0) {
                                    s = s + -1 | 0
                                } else {
                                    k = 27;
                                    break c
                                }
                            }
                            if ((s | 0) > -1) {
                                u = c[1292 + (s * 80 | 0) >> 2] | 0;
                                t = q + u | 0;
                                if (t >>> 0 > n >>> 0) {
                                    k = 21;
                                    break b
                                }
                                w = c[1288 + (s * 80 | 0) >> 2] | 0;
                                c[l >> 2] = w;
                                v = 0;
                                do {
                                    w = w | b[o + (v << 1) >> 1] << c[1288 + (s * 80 | 0) + (v << 2) + 12 >> 2];
                                    v = v + 1 | 0
                                } while (v >>> 0 < r >>> 0);c[l >> 2] = ia(w | 0) | 0;
                                s = 0;
                                do {
                                    a[q + s | 0] = a[l + s | 0] | 0;
                                    s = s + 1 | 0
                                } while (s >>> 0 < u >>> 0);e = e + r | 0;
                                q = t
                            } else {
                                k = 27
                            }
                        } else {
                            k = 27
                        }
                    } while (0);if ((k | 0) == 27) {
                        k = 0;
                        r = a[e] | 0;
                        if (!(r << 24 >> 24 < 0)) {
                            if ((q + 1 | 0) >>> 0 > n >>> 0) {
                                k = 32;
                                break
                            }
                        } else {
                            if ((q + 2 | 0) >>> 0 > n >>> 0) {
                                k = 29;
                                break
                            }
                            a[q] = 0;
                            r = a[e] | 0;
                            q = q + 1 | 0
                        }
                        a[q] = r;
                        e = e + 1 | 0;
                        q = q + 1 | 0
                    }
                    r = a[e] | 0;
                    if (r << 24 >> 24 == 0) {
                        break a
                    }
                }
                if ((k | 0) == 21) {
                    w = h + 1 | 0;
                    i = j;
                    return w | 0
                } else if ((k | 0) == 29) {
                    w = h + 1 | 0;
                    i = j;
                    return w | 0
                } else if ((k | 0) == 32) {
                    w = h + 1 | 0;
                    i = j;
                    return w | 0
                }
            } else {
                q = g
            }
        } while (0);w = q - g | 0;
        i = j;
        return w | 0
    }
    function Ba(d, e, f, g) {
        d = d | 0;
        e = e | 0;
        f = f | 0;
        g = g | 0;
        var h = 0
          , j = 0
          , k = 0
          , l = 0
          , m = 0
          , n = 0
          , o = 0
          , p = 0
          , q = 0
          , r = 0
          , s = 0
          , t = 0;
        k = i;
        i = i + 16 | 0;
        l = k;
        j = f + g | 0;
        m = d + e | 0;
        a: do {
            if ((e | 0) > 0) {
                e = f;
                while (1) {
                    s = a[d] | 0;
                    if (s << 24 >> 24 < 0) {
                        n = s;
                        o = -1;
                        do {
                            n = (n & 255) << 1 & 255;
                            o = o + 1 | 0
                        } while (n << 24 >> 24 < 0);if ((o | 0) >= 0) {
                            p = c[1296 + (o * 80 | 0) >> 2] | 0;
                            n = e + p | 0;
                            if (n >>> 0 > j >>> 0) {
                                h = 11;
                                break
                            }
                            q = 1292 + (o * 80 | 0) | 0;
                            r = c[q >> 2] | 0;
                            t = 0;
                            while (1) {
                                a[l + t | 0] = s;
                                t = t + 1 | 0;
                                if (!(t >>> 0 < r >>> 0)) {
                                    break
                                }
                                s = a[d + t | 0] | 0
                            }
                            r = ia(c[l >> 2] | 0) | 0;
                            c[l >> 2] = r;
                            r = a[1528 + (b[1336 + (o * 80 | 0) >> 1] & r >>> (c[1300 + (o * 80 | 0) >> 2] | 0)) | 0] | 0;
                            a[e] = r;
                            s = 1;
                            do {
                                r = a[((c[l >> 2] | 0) >>> (c[1288 + (o * 80 | 0) + (s << 2) + 12 >> 2] | 0) & b[1288 + (o * 80 | 0) + (s << 1) + 48 >> 1]) + (1560 + ((r & 255) + -39 << 4)) | 0] | 0;
                                a[e + s | 0] = r;
                                s = s + 1 | 0
                            } while (s >>> 0 < p >>> 0);d = d + (c[q >> 2] | 0) | 0;
                            e = n
                        } else {
                            h = 6
                        }
                    } else {
                        h = 6
                    }
                    if ((h | 0) == 6) {
                        h = 0;
                        if (!(e >>> 0 < j >>> 0)) {
                            h = 7;
                            break
                        }
                        d = s << 24 >> 24 == 0 ? d + 1 | 0 : d;
                        a[e] = a[d] | 0;
                        d = d + 1 | 0;
                        e = e + 1 | 0
                    }
                    if (!(d >>> 0 < m >>> 0)) {
                        break a
                    }
                }
                if ((h | 0) == 7) {
                    t = g + 1 | 0;
                    i = k;
                    return t | 0
                } else if ((h | 0) == 11) {
                    t = g + 1 | 0;
                    i = k;
                    return t | 0
                }
            } else {
                e = f
            }
        } while (0);if (e >>> 0 < j >>> 0) {
            a[e] = 0
        }
        t = e - f | 0;
        i = k;
        return t | 0
    }
    function Ca() {}
    function Da(b, d, e) {
        b = b | 0;
        d = d | 0;
        e = e | 0;
        var f = 0
          , g = 0
          , h = 0
          , i = 0;
        f = b + e | 0;
        if ((e | 0) >= 20) {
            d = d & 255;
            i = b & 3;
            h = d | d << 8 | d << 16 | d << 24;
            g = f & ~3;
            if (i) {
                i = b + 4 - i | 0;
                while ((b | 0) < (i | 0)) {
                    a[b] = d;
                    b = b + 1 | 0
                }
            }
            while ((b | 0) < (g | 0)) {
                c[b >> 2] = h;
                b = b + 4 | 0
            }
        }
        while ((b | 0) < (f | 0)) {
            a[b] = d;
            b = b + 1 | 0
        }
        return b - e | 0
    }
    function Ea(b) {
        b = b | 0;
        var c = 0;
        c = b;
        while (a[c] | 0) {
            c = c + 1 | 0
        }
        return c - b | 0
    }
    function Fa(b, d, e) {
        b = b | 0;
        d = d | 0;
        e = e | 0;
        var f = 0;
        if ((e | 0) >= 4096)
            return ga(b | 0, d | 0, e | 0) | 0;
        f = b | 0;
        if ((b & 3) == (d & 3)) {
            while (b & 3) {
                if ((e | 0) == 0)
                    return f | 0;
                a[b] = a[d] | 0;
                b = b + 1 | 0;
                d = d + 1 | 0;
                e = e - 1 | 0
            }
            while ((e | 0) >= 4) {
                c[b >> 2] = c[d >> 2];
                b = b + 4 | 0;
                d = d + 4 | 0;
                e = e - 4 | 0
            }
        }
        while ((e | 0) > 0) {
            a[b] = a[d] | 0;
            b = b + 1 | 0;
            d = d + 1 | 0;
            e = e - 1 | 0
        }
        return f | 0
    }

    // EMSCRIPTEN_END_FUNCS
    return {
        _shoco_decompress: Ba,
        _memcpy: Fa,
        _strlen: Ea,
        _shoco_compress: Aa,
        _memset: Da,
        runPostSets: Ca,
        stackAlloc: ka,
        stackSave: la,
        stackRestore: ma,
        setThrew: na,
        setTempRet0: qa,
        setTempRet1: ra,
        setTempRet2: sa,
        setTempRet3: ta,
        setTempRet4: ua,
        setTempRet5: va,
        setTempRet6: wa,
        setTempRet7: xa,
        setTempRet8: ya,
        setTempRet9: za
    }
    // EMSCRIPTEN_END_ASM

}
)({
    Math: Math,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array
}, {
    abort: z,
    assert: w,
    asmPrintInt: function(a, b) {
        p.print("int " + a + "," + b)
    },
    asmPrintFloat: function(a, b) {
        p.print("float " + a + "," + b)
    },
    min: ra,
    _fflush: n(),
    ___setErrNo: Xa,
    _malloc: xa,
    _emscripten_memcpy_big: function(a, b, c) {
        N.set(N.subarray(b, b + c), a);
        return a
    },
    _free: $b,
    _llvm_bswap_i32: function(a) {
        return (a & 255) << 24 | (a >> 8 & 255) << 16 | (a >> 16 & 255) << 8 | a >>> 24
    },
    STACKTOP: r,
    STACK_MAX: Ea,
    tempDoublePtr: Ua,
    ABORT: ka,
    NaN: NaN,
    Infinity: Infinity
}, P);
p._shoco_decompress = $._shoco_decompress;
var Zb = p._memcpy = $._memcpy
  , Yb = p._strlen = $._strlen;
p._shoco_compress = $._shoco_compress;
var Xb = p._memset = $._memset;
p.runPostSets = $.runPostSets;
v.wa = function(a) {
    return $.stackAlloc(a)
}
;
v.Xa = function() {
    return $.stackSave()
}
;
v.Wa = function(a) {
    $.stackRestore(a)
}
;
function ic(a) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + a + ")";
    this.status = a
}
ic.prototype = Error();
var jc, kc = l, Ra = function lc() {
    !p.calledRun && mc && nc();
    p.calledRun || (Ra = lc)
};
p.callMain = p.Rd = function(a) {
    function b() {
        for (var a = 0; 3 > a; a++)
            d.push(0)
    }
    w(0 == R, "cannot call main when async dependencies remain! (listen on __ATMAIN__)");
    w(0 == Ha.length, "cannot call main when preRun functions remain to be called");
    a = a || [];
    Ma || (Ma = j,
    Q(Ia));
    var c = a.length + 1
      , d = [M(G("/bin/this.program"), "i8", 0)];
    b();
    for (var f = 0; f < c - 1; f += 1)
        d.push(M(G(a[f]), "i8", 0)),
        b();
    d.push(0);
    d = M(d, "i32", 0);
    jc = r;
    try {
        var g = p._main(c, d, 0);
        p.noExitRuntime || oc(g)
    } catch (h) {
        h instanceof ic || ("SimulateInfiniteLoop" == h ? p.noExitRuntime = j : (h && ("object" === typeof h && h.stack) && p.I("exception thrown: " + [h, h.stack]),
        e(h)))
    } finally {}
}
;
function nc(a) {
    function b() {
        if (!p.calledRun) {
            p.calledRun = j;
            Ma || (Ma = j,
            Q(Ia));
            Q(Ja);
            ca && kc !== l && p.I("pre-main prep time: " + (Date.now() - kc) + " ms");
            p._main && mc && p.callMain(a);
            if (p.postRun)
                for ("function" == typeof p.postRun && (p.postRun = [p.postRun]); p.postRun.length; )
                    Pa(p.postRun.shift());
            Q(La)
        }
    }
    a = a || p.arguments;
    kc === l && (kc = Date.now());
    if (0 < R)
        p.I("run() called, but dependencies remain, so not running");
    else {
        if (p.preRun)
            for ("function" == typeof p.preRun && (p.preRun = [p.preRun]); p.preRun.length; )
                Na(p.preRun.shift());
        Q(Ha);
        !(0 < R) && !p.calledRun && (p.setStatus ? (p.setStatus("Running..."),
        setTimeout(function() {
            setTimeout(function() {
                p.setStatus("")
            }, 1);
            ka || b()
        }, 1)) : b())
    }
}
p.run = p.re = nc;
function oc(a) {
    ka = j;
    r = jc;
    Q(Ka);
    e(new ic(a))
}
p.exit = p.Vd = oc;
function z(a) {
    a && (p.print(a),
    p.I(a));
    ka = j;
    e("abort() at " + za() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.")
}
p.abort = p.abort = z;
if (p.preInit)
    for ("function" == typeof p.preInit && (p.preInit = [p.preInit]); 0 < p.preInit.length; )
        p.preInit.pop()();
var mc = j;
p.noInitialRun && (mc = m);
nc();
