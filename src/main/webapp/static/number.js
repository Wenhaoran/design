(function () {
    var y = function () {
        function h() {
            this.form = this.digits = 0;
            this.lostDigits = !1;
            this.roundingMode = 0;
            var v = this.DEFAULT_FORM, r = this.DEFAULT_LOSTDIGITS, f = this.DEFAULT_ROUNDINGMODE;
            if (4 == h.arguments.length)v = h.arguments[1], r = h.arguments[2], f = h.arguments[3]; else if (3 == h.arguments.length)v = h.arguments[1], r = h.arguments[2]; else if (2 == h.arguments.length)v = h.arguments[1]; else if (1 != h.arguments.length)throw"MathContext(): " + h.arguments.length + " arguments given; expected 1 to 4";
            var t = h.arguments[0];
            if (t !=
                this.DEFAULT_DIGITS) {
                if (t < this.MIN_DIGITS)throw"MathContext(): Digits too small: " + t;
                if (t > this.MAX_DIGITS)throw"MathContext(): Digits too large: " + t;
            }
            if (v != this.SCIENTIFIC && v != this.ENGINEERING && v != this.PLAIN)throw"MathContext() Bad form value: " + v;
            if (!this.isValidRound(f))throw"MathContext(): Bad roundingMode value: " + f;
            this.digits = t;
            this.form = v;
            this.lostDigits = r;
            this.roundingMode = f
        }

        h.prototype.getDigits = function () {
            return this.digits
        };
        h.prototype.getForm = function () {
            return this.form
        };
        h.prototype.getLostDigits =
            function () {
                return this.lostDigits
            };
        h.prototype.getRoundingMode = function () {
            return this.roundingMode
        };
        h.prototype.toString = function () {
            var h = null, r = 0, f = null, h = this.form == this.SCIENTIFIC ? "SCIENTIFIC" : this.form == this.ENGINEERING ? "ENGINEERING" : "PLAIN", t = this.ROUNDS.length, r = 0;
            a:for (; 0 < t; t--, r++)if (this.roundingMode == this.ROUNDS[r]) {
                f = this.ROUNDWORDS[r];
                break a
            }
            return "digits=" + this.digits + " form=" + h + " lostDigits=" + (this.lostDigits ? "1" : "0") + " roundingMode=" + f
        };
        h.prototype.isValidRound = function (h) {
            var r = 0,
                f = this.ROUNDS.length, r = 0;
            for (; 0 < f; f--, r++)if (h == this.ROUNDS[r])return !0;
            return !1
        };
        h.PLAIN = h.prototype.PLAIN = 0;
        h.SCIENTIFIC = h.prototype.SCIENTIFIC = 1;
        h.ENGINEERING = h.prototype.ENGINEERING = 2;
        h.ROUND_CEILING = h.prototype.ROUND_CEILING = 2;
        h.ROUND_DOWN = h.prototype.ROUND_DOWN = 1;
        h.ROUND_FLOOR = h.prototype.ROUND_FLOOR = 3;
        h.ROUND_HALF_DOWN = h.prototype.ROUND_HALF_DOWN = 5;
        h.ROUND_HALF_EVEN = h.prototype.ROUND_HALF_EVEN = 6;
        h.ROUND_HALF_UP = h.prototype.ROUND_HALF_UP = 4;
        h.ROUND_UNNECESSARY = h.prototype.ROUND_UNNECESSARY = 7;
        h.ROUND_UP = h.prototype.ROUND_UP = 0;
        h.prototype.DEFAULT_FORM = h.prototype.SCIENTIFIC;
        h.prototype.DEFAULT_DIGITS = 9;
        h.prototype.DEFAULT_LOSTDIGITS = !1;
        h.prototype.DEFAULT_ROUNDINGMODE = h.prototype.ROUND_HALF_UP;
        h.prototype.MIN_DIGITS = 0;
        h.prototype.MAX_DIGITS = 999999999;
        h.prototype.ROUNDS = [h.prototype.ROUND_HALF_UP, h.prototype.ROUND_UNNECESSARY, h.prototype.ROUND_CEILING, h.prototype.ROUND_DOWN, h.prototype.ROUND_FLOOR, h.prototype.ROUND_HALF_DOWN, h.prototype.ROUND_HALF_EVEN, h.prototype.ROUND_UP];
        h.prototype.ROUNDWORDS =
            "ROUND_HALF_UP ROUND_UNNECESSARY ROUND_CEILING ROUND_DOWN ROUND_FLOOR ROUND_HALF_DOWN ROUND_HALF_EVEN ROUND_UP".split(" ");
        h.prototype.DEFAULT = new h(h.prototype.DEFAULT_DIGITS, h.prototype.DEFAULT_FORM, h.prototype.DEFAULT_LOSTDIGITS, h.prototype.DEFAULT_ROUNDINGMODE);
        return h
    }(), L = function (h) {
        function v(a, b) {
            return (a - a % b) / b
        }

        function r(a) {
            var b = Array(a), c;
            for (c = 0; c < a; ++c)b[c] = 0;
            return b
        }

        function f() {
            this.ind = 0;
            this.form = h.prototype.PLAIN;
            this.mant = null;
            this.exp = 0;
            if (0 != f.arguments.length) {
                var a, b, c;
                1 == f.arguments.length ? (a = f.arguments[0], b = 0, c = a.length) : (a = f.arguments[0], b = f.arguments[1], c = f.arguments[2]);
                "string" == typeof a && (a = a.split(""));
                var d, e, n, g, k, l = 0, m = 0;
                e = !1;
                var q = m = m = l = 0, p = 0;
                g = 0;
                0 >= c && this.bad("BigDecimal(): ", a);
                this.ind = this.ispos;
                "-" == a[0] ? (c--, 0 == c && this.bad("BigDecimal(): ", a), this.ind = this.isneg, b++) : "+" == a[0] && (c--, 0 == c && this.bad("BigDecimal(): ", a), b++);
                e = d = !1;
                n = 0;
                k = g = -1;
                q = c;
                l = b;
                a:for (; 0 < q; q--, l++) {
                    m = a[l];
                    if ("0" <= m && "9" >= m) {
                        k = l;
                        n++;
                        continue a
                    }
                    if ("." == m) {
                        0 <= g && this.bad("BigDecimal(): ",
                            a);
                        g = l - b;
                        continue a
                    }
                    if ("e" != m && "E" != m) {
                        ("0" > m || "9" < m) && this.bad("BigDecimal(): ", a);
                        d = !0;
                        k = l;
                        n++;
                        continue a
                    }
                    l - b > c - 2 && this.bad("BigDecimal(): ", a);
                    e = !1;
                    "-" == a[l + 1] ? (e = !0, l += 2) : l = "+" == a[l + 1] ? l + 2 : l + 1;
                    m = c - (l - b);
                    (0 == m || 9 < m) && this.bad("BigDecimal(): ", a);
                    c = m;
                    m = l;
                    for (; 0 < c; c--, m++)q = a[m], "0" > q && this.bad("BigDecimal(): ", a), "9" < q ? this.bad("BigDecimal(): ", a) : p = q - 0, this.exp = 10 * this.exp + p;
                    e && (this.exp = -this.exp);
                    e = !0;
                    break a
                }
                0 == n && this.bad("BigDecimal(): ", a);
                0 <= g && (this.exp = this.exp + g - n);
                p = k - 1;
                l = b;
                a:for (; l <=
                         p; l++)if (m = a[l], "0" == m)b++, g--, n--; else if ("." == m)b++, g--; else break a;
                this.mant = Array(n);
                m = b;
                if (d)for (b = n, l = 0; 0 < b; b--, l++)l == g && m++, q = a[m], "9" >= q ? this.mant[l] = q - 0 : this.bad("BigDecimal(): ", a), m++; else for (b = n, l = 0; 0 < b; b--, l++)l == g && m++, this.mant[l] = a[m] - 0, m++;
                0 == this.mant[0] ? (this.ind = this.iszero, 0 < this.exp && (this.exp = 0), e && (this.mant = this.ZERO.mant, this.exp = 0)) : e && (this.form = h.prototype.SCIENTIFIC, g = this.exp + this.mant.length - 1, (g < this.MinExp || g > this.MaxExp) && this.bad("BigDecimal(): ", a))
            }
        }

        function t() {
            var a;
            if (1 == t.arguments.length)a = t.arguments[0]; else if (0 == t.arguments.length)a = this.plainMC; else throw"abs(): " + t.arguments.length + " arguments given; expected 0 or 1";
            return this.ind == this.isneg ? this.negate(a) : this.plus(a)
        }

        function z() {
            var a;
            if (2 == z.arguments.length)a = z.arguments[1]; else if (1 == z.arguments.length)a = this.plainMC; else throw"add(): " + z.arguments.length + " arguments given; expected 1 or 2";
            var b = z.arguments[0], c, d, e, n, g, k, l, m = 0;
            d = m = 0;
            var m = null, q = m = 0, p = 0, r = 0, t = 0, s = 0;
            a.lostDigits && this.checkdigits(b,
                a.digits);
            c = this;
            if (0 == c.ind && a.form != h.prototype.PLAIN)return b.plus(a);
            if (0 == b.ind && a.form != h.prototype.PLAIN)return c.plus(a);
            d = a.digits;
            0 < d && (c.mant.length > d && (c = this.clone(c).round(a)), b.mant.length > d && (b = this.clone(b).round(a)));
            e = new f;
            n = c.mant;
            g = c.mant.length;
            k = b.mant;
            l = b.mant.length;
            if (c.exp == b.exp)e.exp = c.exp; else if (c.exp > b.exp) {
                m = g + c.exp - b.exp;
                if (m >= l + d + 1 && 0 < d)return e.mant = n, e.exp = c.exp, e.ind = c.ind, g < d && (e.mant = this.extend(c.mant, d), e.exp -= d - g), e.finish(a, !1);
                e.exp = b.exp;
                m > d + 1 && 0 < d &&
                (m = m - d - 1, l -= m, e.exp += m, m = d + 1);
                m > g && (g = m)
            } else {
                m = l + b.exp - c.exp;
                if (m >= g + d + 1 && 0 < d)return e.mant = k, e.exp = b.exp, e.ind = b.ind, l < d && (e.mant = this.extend(b.mant, d), e.exp -= d - l), e.finish(a, !1);
                e.exp = c.exp;
                m > d + 1 && 0 < d && (m = m - d - 1, g -= m, e.exp += m, m = d + 1);
                m > l && (l = m)
            }
            e.ind = c.ind == this.iszero ? this.ispos : c.ind;
            if ((c.ind == this.isneg ? 1 : 0) == (b.ind == this.isneg ? 1 : 0))d = 1; else {
                do {
                    d = -1;
                    do if (b.ind != this.iszero)if (g < l || c.ind == this.iszero)m = n, n = k, k = m, m = g, g = l, l = m, e.ind = -e.ind; else if (!(g > l))c:for (q = m = 0, p = n.length - 1, r = k.length - 1; ;) {
                        if (m <=
                            p)t = n[m]; else {
                            if (q > r) {
                                if (a.form != h.prototype.PLAIN)return this.ZERO;
                                break c
                            }
                            t = 0
                        }
                        s = q <= r ? k[q] : 0;
                        if (t != s) {
                            t < s && (m = n, n = k, k = m, m = g, g = l, l = m, e.ind = -e.ind);
                            break c
                        }
                        m++;
                        q++
                    } while (0)
                } while (0)
            }
            e.mant = this.byteaddsub(n, g, k, l, d, !1);
            return e.finish(a, !1)
        }

        function A() {
            var a;
            if (2 == A.arguments.length)a = A.arguments[1]; else if (1 == A.arguments.length)a = this.plainMC; else throw"compareTo(): " + A.arguments.length + " arguments given; expected 1 or 2";
            var b = A.arguments[0], c = 0, c = 0;
            a.lostDigits && this.checkdigits(b, a.digits);
            if (this.ind ==
                b.ind && this.exp == b.exp) {
                c = this.mant.length;
                if (c < b.mant.length)return -this.ind;
                if (c > b.mant.length)return this.ind;
                if (c <= a.digits || 0 == a.digits) {
                    a = c;
                    c = 0;
                    for (; 0 < a; a--, c++) {
                        if (this.mant[c] < b.mant[c])return -this.ind;
                        if (this.mant[c] > b.mant[c])return this.ind
                    }
                    return 0
                }
            } else {
                if (this.ind < b.ind)return -1;
                if (this.ind > b.ind)return 1
            }
            b = this.clone(b);
            b.ind = -b.ind;
            return this.add(b, a).ind
        }

        function u() {
            var a, b = -1;
            if (2 == u.arguments.length)a = "number" == typeof u.arguments[1] ? new h(0, h.prototype.PLAIN, !1, u.arguments[1]) :
                u.arguments[1]; else if (3 == u.arguments.length) {
                b = u.arguments[1];
                if (0 > b)throw"divide(): Negative scale: " + b;
                a = new h(0, h.prototype.PLAIN, !1, u.arguments[2])
            } else if (1 == u.arguments.length)a = this.plainMC; else throw"divide(): " + u.arguments.length + " arguments given; expected between 1 and 3";
            return this.dodivide("D", u.arguments[0], a, b)
        }

        function B() {
            var a;
            if (2 == B.arguments.length)a = B.arguments[1]; else if (1 == B.arguments.length)a = this.plainMC; else throw"divideInteger(): " + B.arguments.length + " arguments given; expected 1 or 2";
            return this.dodivide("I", B.arguments[0], a, 0)
        }

        function C() {
            var a;
            if (2 == C.arguments.length)a = C.arguments[1]; else if (1 == C.arguments.length)a = this.plainMC; else throw"max(): " + C.arguments.length + " arguments given; expected 1 or 2";
            var b = C.arguments[0];
            return 0 <= this.compareTo(b, a) ? this.plus(a) : b.plus(a)
        }

        function D() {
            var a;
            if (2 == D.arguments.length)a = D.arguments[1]; else if (1 == D.arguments.length)a = this.plainMC; else throw"min(): " + D.arguments.length + " arguments given; expected 1 or 2";
            var b = D.arguments[0];
            return 0 >= this.compareTo(b, a) ? this.plus(a) : b.plus(a)
        }

        function E() {
            var a;
            if (2 == E.arguments.length)a = E.arguments[1]; else if (1 == E.arguments.length)a = this.plainMC; else throw"multiply(): " + E.arguments.length + " arguments given; expected 1 or 2";
            var b = E.arguments[0], c, d, e, h = e = null, g, k = 0, l, m = 0, q = 0;
            a.lostDigits && this.checkdigits(b, a.digits);
            c = this;
            d = 0;
            e = a.digits;
            0 < e ? (c.mant.length > e && (c = this.clone(c).round(a)), b.mant.length > e && (b = this.clone(b).round(a))) : (0 < c.exp && (d += c.exp), 0 < b.exp && (d += b.exp));
            c.mant.length <
            b.mant.length ? (e = c.mant, h = b.mant) : (e = b.mant, h = c.mant);
            g = e.length + h.length - 1;
            k = 9 < e[0] * h[0] ? g + 1 : g;
            l = new f;
            var k = this.createArrayWithZeros(k), p = e.length, m = 0;
            for (; 0 < p; p--, m++)q = e[m], 0 != q && (k = this.byteaddsub(k, k.length, h, g, q, !0)), g--;
            l.ind = c.ind * b.ind;
            l.exp = c.exp + b.exp - d;
            l.mant = 0 == d ? k : this.extend(k, k.length + d);
            return l.finish(a, !1)
        }

        function J() {
            var a;
            if (1 == J.arguments.length)a = J.arguments[0]; else if (0 == J.arguments.length)a = this.plainMC; else throw"negate(): " + J.arguments.length + " arguments given; expected 0 or 1";
            var b;
            a.lostDigits && this.checkdigits(null, a.digits);
            b = this.clone(this);
            b.ind = -b.ind;
            return b.finish(a, !1)
        }

        function K() {
            var a;
            if (1 == K.arguments.length)a = K.arguments[0]; else if (0 == K.arguments.length)a = this.plainMC; else throw"plus(): " + K.arguments.length + " arguments given; expected 0 or 1";
            a.lostDigits && this.checkdigits(null, a.digits);
            return a.form == h.prototype.PLAIN && this.form == h.prototype.PLAIN && (this.mant.length <= a.digits || 0 == a.digits) ? this : this.clone(this).finish(a, !1)
        }

        function F() {
            var a;
            if (2 == F.arguments.length)a =
                F.arguments[1]; else if (1 == F.arguments.length)a = this.plainMC; else throw"pow(): " + F.arguments.length + " arguments given; expected 1 or 2";
            var b = F.arguments[0], c, d, e, f = e = 0, g, k = 0;
            a.lostDigits && this.checkdigits(b, a.digits);
            c = b.intcheck(this.MinArg, this.MaxArg);
            d = this;
            e = a.digits;
            if (0 == e) {
                if (b.ind == this.isneg)throw"pow(): Negative power: " + b.toString();
                e = 0
            } else {
                if (b.mant.length + b.exp > e)throw"pow(): Too many digits: " + b.toString();
                d.mant.length > e && (d = this.clone(d).round(a));
                f = b.mant.length + b.exp;
                e = e + f + 1
            }
            e =
                new h(e, a.form, !1, a.roundingMode);
            f = this.ONE;
            if (0 == c)return f;
            0 > c && (c = -c);
            g = !1;
            k = 1;
            a:for (; ; k++) {
                c <<= 1;
                0 > c && (g = !0, f = f.multiply(d, e));
                if (31 == k)break a;
                if (!g)continue a;
                f = f.multiply(f, e)
            }
            0 > b.ind && (f = this.ONE.divide(f, e));
            return f.finish(a, !0)
        }

        function G() {
            var a;
            if (2 == G.arguments.length)a = G.arguments[1]; else if (1 == G.arguments.length)a = this.plainMC; else throw"remainder(): " + G.arguments.length + " arguments given; expected 1 or 2";
            return this.dodivide("R", G.arguments[0], a, -1)
        }

        function H() {
            var a;
            if (2 == H.arguments.length)a =
                H.arguments[1]; else if (1 == H.arguments.length)a = this.plainMC; else throw"subtract(): " + H.arguments.length + " arguments given; expected 1 or 2";
            var b = H.arguments[0];
            a.lostDigits && this.checkdigits(b, a.digits);
            b = this.clone(b);
            b.ind = -b.ind;
            return this.add(b, a)
        }

        function w() {
            var a, b, c, d;
            if (6 == w.arguments.length)a = w.arguments[2], b = w.arguments[3], c = w.arguments[4], d = w.arguments[5]; else if (2 == w.arguments.length)b = a = -1, c = h.prototype.SCIENTIFIC, d = this.ROUND_HALF_UP; else throw"format(): " + w.arguments.length + " arguments given; expected 2 or 6";
            var e = w.arguments[0], f = w.arguments[1], g, k = 0, k = k = 0, l = null, m = l = k = 0;
            g = 0;
            k = null;
            m = l = 0;
            (-1 > e || 0 == e) && this.badarg("format", 1, e);
            -1 > f && this.badarg("format", 2, f);
            (-1 > a || 0 == a) && this.badarg("format", 3, a);
            -1 > b && this.badarg("format", 4, b);
            c != h.prototype.SCIENTIFIC && c != h.prototype.ENGINEERING && (-1 == c ? c = h.prototype.SCIENTIFIC : this.badarg("format", 5, c));
            if (d != this.ROUND_HALF_UP)try {
                -1 == d ? d = this.ROUND_HALF_UP : new h(9, h.prototype.SCIENTIFIC, !1, d)
            } catch (q) {
                this.badarg("format", 6, d)
            }
            g = this.clone(this);
            -1 == b ? g.form = h.prototype.PLAIN :
                g.ind == this.iszero ? g.form = h.prototype.PLAIN : (k = g.exp + g.mant.length, g.form = k > b ? c : -5 > k ? c : h.prototype.PLAIN);
            if (0 <= f)a:for (; ;) {
                g.form == h.prototype.PLAIN ? k = -g.exp : g.form == h.prototype.SCIENTIFIC ? k = g.mant.length - 1 : (k = (g.exp + g.mant.length - 1) % 3, 0 > k && (k = 3 + k), k++, k = k >= g.mant.length ? 0 : g.mant.length - k);
                if (k == f)break a;
                if (k < f) {
                    l = this.extend(g.mant, g.mant.length + f - k);
                    g.mant = l;
                    g.exp -= f - k;
                    if (g.exp < this.MinExp)throw"format(): Exponent Overflow: " + g.exp;
                    break a
                }
                k -= f;
                if (k > g.mant.length) {
                    g.mant = this.ZERO.mant;
                    g.ind =
                        this.iszero;
                    g.exp = 0;
                    continue a
                }
                l = g.mant.length - k;
                m = g.exp;
                g.round(l, d);
                if (g.exp - m == k)break a
            }
            b = g.layout();
            if (0 < e) {
                c = b.length;
                g = 0;
                a:for (; 0 < c; c--, g++) {
                    if ("." == b[g])break a;
                    if ("E" == b[g])break a
                }
                g > e && this.badarg("format", 1, e);
                if (g < e) {
                    k = Array(b.length + e - g);
                    e -= g;
                    l = 0;
                    for (; 0 < e; e--, l++)k[l] = " ";
                    this.arraycopy(b, 0, k, l, b.length);
                    b = k
                }
            }
            if (0 < a) {
                e = b.length - 1;
                g = b.length - 1;
                a:for (; 0 < e; e--, g--)if ("E" == b[g])break a;
                if (0 == g) {
                    k = Array(b.length + a + 2);
                    this.arraycopy(b, 0, k, 0, b.length);
                    a += 2;
                    l = b.length;
                    for (; 0 < a; a--, l++)k[l] = " ";
                    b = k
                } else if (m = b.length - g - 2, m > a && this.badarg("format", 3, a), m < a) {
                    k = Array(b.length + a - m);
                    this.arraycopy(b, 0, k, 0, g + 2);
                    a -= m;
                    l = g + 2;
                    for (; 0 < a; a--, l++)k[l] = "0";
                    this.arraycopy(b, g + 2, k, l, m);
                    b = k
                }
            }
            return b.join("")
        }

        function I() {
            var a;
            if (2 == I.arguments.length)a = I.arguments[1]; else if (1 == I.arguments.length)a = this.ROUND_UNNECESSARY; else throw"setScale(): " + I.arguments.length + " given; expected 1 or 2";
            var b = I.arguments[0], c, d;
            c = c = 0;
            c = this.scale();
            if (c == b && this.form == h.prototype.PLAIN)return this;
            d = this.clone(this);
            if (c <= b)c = 0 == c ? d.exp + b : b - c, d.mant = this.extend(d.mant, d.mant.length + c), d.exp = -b; else {
                if (0 > b)throw"setScale(): Negative scale: " + b;
                c = d.mant.length - (c - b);
                d = d.round(c, a);
                d.exp != -b && (d.mant = this.extend(d.mant, d.mant.length + 1), d.exp -= 1)
            }
            d.form = h.prototype.PLAIN;
            return d
        }

        function y() {
            var a, b = 0, c = 0;
            a = Array(190);
            b = 0;
            a:for (; 189 >= b; b++) {
                c = b - 90;
                if (0 <= c) {
                    a[b] = c % 10;
                    f.prototype.bytecar[b] = v(c, 10);
                    continue a
                }
                c += 100;
                a[b] = c % 10;
                f.prototype.bytecar[b] = v(c, 10) - 10
            }
            return a
        }

        function x() {
            var a, b;
            if (2 == x.arguments.length)a =
                x.arguments[0], b = x.arguments[1]; else if (1 == x.arguments.length)b = x.arguments[0], a = b.digits, b = b.roundingMode; else throw"round(): " + x.arguments.length + " arguments given; expected 1 or 2";
            var c, d, e = !1, f = 0, g;
            c = null;
            c = this.mant.length - a;
            if (0 >= c)return this;
            this.exp += c;
            c = this.ind;
            d = this.mant;
            0 < a ? (this.mant = Array(a), this.arraycopy(d, 0, this.mant, 0, a), e = !0, f = d[a]) : (this.mant = this.ZERO.mant, this.ind = this.iszero, e = !1, f = 0 == a ? d[0] : 0);
            g = 0;
            if (b == this.ROUND_HALF_UP)5 <= f && (g = c); else if (b == this.ROUND_UNNECESSARY) {
                if (!this.allzero(d,
                        a))throw"round(): Rounding necessary";
            } else if (b == this.ROUND_HALF_DOWN)5 < f ? g = c : 5 == f && (this.allzero(d, a + 1) || (g = c)); else if (b == this.ROUND_HALF_EVEN)5 < f ? g = c : 5 == f && (this.allzero(d, a + 1) ? 1 == this.mant[this.mant.length - 1] % 2 && (g = c) : g = c); else if (b != this.ROUND_DOWN)if (b == this.ROUND_UP)this.allzero(d, a) || (g = c); else if (b == this.ROUND_CEILING)0 < c && (this.allzero(d, a) || (g = c)); else if (b == this.ROUND_FLOOR)0 > c && (this.allzero(d, a) || (g = c)); else throw"round(): Bad round value: " + b;
            0 != g && (this.ind == this.iszero ? (this.mant =
                this.ONE.mant, this.ind = g) : (this.ind == this.isneg && (g = -g), c = this.byteaddsub(this.mant, this.mant.length, this.ONE.mant, 1, g, e), c.length > this.mant.length ? (this.exp++, this.arraycopy(c, 0, this.mant, 0, this.mant.length)) : this.mant = c));
            if (this.exp > this.MaxExp)throw"round(): Exponent Overflow: " + this.exp;
            return this
        }

        f.prototype.div = v;
        f.prototype.arraycopy = function (a, b, c, d, e) {
            var f;
            if (d > b)for (f = e - 1; 0 <= f; --f)c[f + d] = a[f + b]; else for (f = 0; f < e; ++f)c[f + d] = a[f + b]
        };
        f.prototype.createArrayWithZeros = r;
        f.prototype.abs = t;
        f.prototype.add =
            z;
        f.prototype.compareTo = A;
        f.prototype.divide = u;
        f.prototype.divideInteger = B;
        f.prototype.max = C;
        f.prototype.min = D;
        f.prototype.multiply = E;
        f.prototype.negate = J;
        f.prototype.plus = K;
        f.prototype.pow = F;
        f.prototype.remainder = G;
        f.prototype.subtract = H;
        f.prototype.equals = function (a) {
            var b = 0, c = null, d = null;
            if (null == a || !(a instanceof f) || this.ind != a.ind)return !1;
            if (this.mant.length == a.mant.length && this.exp == a.exp && this.form == a.form)for (c = this.mant.length, b = 0; 0 < c; c--, b++) {
                if (this.mant[b] != a.mant[b])return !1
            } else {
                c =
                    this.layout();
                d = a.layout();
                if (c.length != d.length)return !1;
                a = c.length;
                b = 0;
                for (; 0 < a; a--, b++)if (c[b] != d[b])return !1
            }
            return !0
        };
        f.prototype.format = w;
        f.prototype.intValueExact = function () {
            var a, b = 0, c, d = 0;
            a = 0;
            if (this.ind == this.iszero)return 0;
            a = this.mant.length - 1;
            if (0 > this.exp) {
                a += this.exp;
                if (!this.allzero(this.mant, a + 1))throw"intValueExact(): Decimal part non-zero: " + this.toString();
                if (0 > a)return 0;
                b = 0
            } else {
                if (9 < this.exp + a)throw"intValueExact(): Conversion overflow: " + this.toString();
                b = this.exp
            }
            c = 0;
            var e =
                a + b, d = 0;
            for (; d <= e; d++)c *= 10, d <= a && (c += this.mant[d]);
            if (9 == a + b && (a = v(c, 1E9), a != this.mant[0])) {
                if (-2147483648 == c && this.ind == this.isneg && 2 == this.mant[0])return c;
                throw"intValueExact(): Conversion overflow: " + this.toString();
            }
            return this.ind == this.ispos ? c : -c
        };
        f.prototype.movePointLeft = function (a) {
            var b;
            b = this.clone(this);
            b.exp -= a;
            return b.finish(this.plainMC, !1)
        };
        f.prototype.movePointRight = function (a) {
            var b;
            b = this.clone(this);
            b.exp += a;
            return b.finish(this.plainMC, !1)
        };
        f.prototype.scale = function () {
            return 0 <=
            this.exp ? 0 : -this.exp
        };
        f.prototype.setScale = I;
        f.prototype.signum = function () {
            return this.ind
        };
        f.prototype.toString = function () {
            return this.layout().join("")
        };
        f.prototype.layout = function () {
            var a, b = 0, b = null, c = 0, d = 0;
            a = 0;
            var d = null, e, b = 0;
            a = Array(this.mant.length);
            c = this.mant.length;
            b = 0;
            for (; 0 < c; c--, b++)a[b] = this.mant[b] + "";
            if (this.form != h.prototype.PLAIN) {
                b = "";
                this.ind == this.isneg && (b += "-");
                c = this.exp + a.length - 1;
                if (this.form == h.prototype.SCIENTIFIC)b += a[0], 1 < a.length && (b += "."), b += a.slice(1).join(""); else if (d =
                        c % 3, 0 > d && (d = 3 + d), c -= d, d++, d >= a.length)for (b += a.join(""), a = d - a.length; 0 < a; a--)b += "0"; else b += a.slice(0, d).join(""), b = b + "." + a.slice(d).join("");
                0 != c && (0 > c ? (a = "-", c = -c) : a = "+", b += "E", b += a, b += c);
                return b.split("")
            }
            if (0 == this.exp) {
                if (0 <= this.ind)return a;
                d = Array(a.length + 1);
                d[0] = "-";
                this.arraycopy(a, 0, d, 1, a.length);
                return d
            }
            c = this.ind == this.isneg ? 1 : 0;
            e = this.exp + a.length;
            if (1 > e) {
                b = c + 2 - this.exp;
                d = Array(b);
                0 != c && (d[0] = "-");
                d[c] = "0";
                d[c + 1] = ".";
                var f = -e, b = c + 2;
                for (; 0 < f; f--, b++)d[b] = "0";
                this.arraycopy(a, 0, d, c +
                2 - e, a.length);
                return d
            }
            if (e > a.length) {
                d = Array(c + e);
                0 != c && (d[0] = "-");
                this.arraycopy(a, 0, d, c, a.length);
                e -= a.length;
                b = c + a.length;
                for (; 0 < e; e--, b++)d[b] = "0";
                return d
            }
            b = c + 1 + a.length;
            d = Array(b);
            0 != c && (d[0] = "-");
            this.arraycopy(a, 0, d, c, e);
            d[c + e] = ".";
            this.arraycopy(a, e, d, c + e + 1, a.length - e);
            return d
        };
        f.prototype.intcheck = function (a, b) {
            var c;
            c = this.intValueExact();
            if (c < a || c > b)throw"intcheck(): Conversion overflow: " + c;
            return c
        };
        f.prototype.dodivide = function (a, b, c, d) {
            var e, n, g, k, l, m, q, p, t, r = 0, s = 0, u = 0;
            n = n = s = s = s =
                0;
            e = null;
            e = e = 0;
            e = null;
            c.lostDigits && this.checkdigits(b, c.digits);
            e = this;
            if (0 == b.ind)throw"dodivide(): Divide by 0";
            if (0 == e.ind)return c.form != h.prototype.PLAIN ? this.ZERO : -1 == d ? e : e.setScale(d);
            n = c.digits;
            0 < n ? (e.mant.length > n && (e = this.clone(e).round(c)), b.mant.length > n && (b = this.clone(b).round(c))) : (-1 == d && (d = e.scale()), n = e.mant.length, d != -e.exp && (n = n + d + e.exp), n = n - (b.mant.length - 1) - b.exp, n < e.mant.length && (n = e.mant.length), n < b.mant.length && (n = b.mant.length));
            g = e.exp - b.exp + e.mant.length - b.mant.length;
            if (0 > g && "D" != a)return "I" == a ? this.ZERO : this.clone(e).finish(c, !1);
            k = new f;
            k.ind = e.ind * b.ind;
            k.exp = g;
            k.mant = this.createArrayWithZeros(n + 1);
            l = n + n + 1;
            g = this.extend(e.mant, l);
            m = l;
            q = b.mant;
            p = l;
            t = 10 * q[0] + 1;
            1 < q.length && (t += q[1]);
            l = 0;
            a:for (; ;) {
                r = 0;
                b:for (; ;) {
                    if (m < p)break b;
                    if (m == p) {
                        c:do {
                            var w = m, s = 0;
                            for (; 0 < w; w--, s++) {
                                u = s < q.length ? q[s] : 0;
                                if (g[s] < u)break b;
                                if (g[s] > u)break c
                            }
                            r++;
                            k.mant[l] = r;
                            l++;
                            g[0] = 0;
                            break a
                        } while (0);
                        s = g[0]
                    } else s = 10 * g[0], 1 < m && (s += g[1]);
                    s = v(10 * s, t);
                    0 == s && (s = 1);
                    r += s;
                    g = this.byteaddsub(g, m, q, p, -s,
                        !0);
                    if (0 != g[0])continue b;
                    u = m - 2;
                    s = 0;
                    c:for (; s <= u; s++) {
                        if (0 != g[s])break c;
                        m--
                    }
                    if (0 == s)continue b;
                    this.arraycopy(g, s, g, 0, m)
                }
                if (0 != l || 0 != r) {
                    k.mant[l] = r;
                    l++;
                    if (l == n + 1)break a;
                    if (0 == g[0])break a
                }
                if (0 <= d && -k.exp > d)break a;
                if ("D" != a && 0 >= k.exp)break a;
                k.exp -= 1;
                p--
            }
            0 == l && (l = 1);
            if ("I" == a || "R" == a) {
                if (l + k.exp > n)throw"dodivide(): Integer overflow";
                if ("R" == a) {
                    do {
                        if (0 == k.mant[0])return this.clone(e).finish(c, !1);
                        if (0 == g[0])return this.ZERO;
                        k.ind = e.ind;
                        n = n + n + 1 - e.mant.length;
                        k.exp = k.exp - n + e.exp;
                        n = m;
                        s = n - 1;
                        b:for (; 1 <=
                                 s && k.exp < e.exp && k.exp < b.exp; s--) {
                            if (0 != g[s])break b;
                            n--;
                            k.exp += 1
                        }
                        n < g.length && (e = Array(n), this.arraycopy(g, 0, e, 0, n), g = e);
                        k.mant = g;
                        return k.finish(c, !1)
                    } while (0)
                }
            } else 0 != g[0] && (e = k.mant[l - 1], 0 == e % 5 && (k.mant[l - 1] = e + 1));
            if (0 <= d)return l != k.mant.length && (k.exp -= k.mant.length - l), e = k.mant.length - (-k.exp - d), k.round(e, c.roundingMode), k.exp != -d && (k.mant = this.extend(k.mant, k.mant.length + 1), k.exp -= 1), k.finish(c, !0);
            if (l == k.mant.length)k.round(c); else {
                if (0 == k.mant[0])return this.ZERO;
                e = Array(l);
                this.arraycopy(k.mant,
                    0, e, 0, l);
                k.mant = e
            }
            return k.finish(c, !0)
        };
        f.prototype.bad = function (a, b) {
            throw a + "Not a number: " + b;
        };
        f.prototype.badarg = function (a, b, c) {
            throw"Bad argument " + b + " to " + a + ": " + c;
        };
        f.prototype.extend = function (a, b) {
            var c;
            if (a.length == b)return a;
            c = r(b);
            this.arraycopy(a, 0, c, 0, a.length);
            return c
        };
        f.prototype.byteaddsub = function (a, b, c, d, e, f) {
            var g, h, l, m, q, p, r = 0;
            g = p = 0;
            g = a.length;
            h = c.length;
            b -= 1;
            m = l = d - 1;
            m < b && (m = b);
            d = null;
            f && m + 1 == g && (d = a);
            null == d && (d = this.createArrayWithZeros(m + 1));
            q = !1;
            1 == e ? q = !0 : -1 == e && (q = !0);
            p = 0;
            r = m;
            a:for (; 0 <= r; r--) {
                0 <= b && (b < g && (p += a[b]), b--);
                0 <= l && (l < h && (p = q ? 0 < e ? p + c[l] : p - c[l] : p + c[l] * e), l--);
                if (10 > p && 0 <= p) {
                    do {
                        d[r] = p;
                        p = 0;
                        continue a
                    } while (0)
                }
                p += 90;
                d[r] = this.bytedig[p];
                p = this.bytecar[p]
            }
            if (0 == p)return d;
            c = null;
            f && m + 2 == a.length && (c = a);
            null == c && (c = Array(m + 2));
            c[0] = p;
            a = m + 1;
            g = 0;
            for (; 0 < a; a--, g++)c[g + 1] = d[g];
            return c
        };
        f.prototype.diginit = y;
        f.prototype.clone = function (a) {
            var b;
            b = new f;
            b.ind = a.ind;
            b.exp = a.exp;
            b.form = a.form;
            b.mant = a.mant;
            return b
        };
        f.prototype.checkdigits = function (a, b) {
            if (0 != b) {
                if (this.mant.length >
                    b && !this.allzero(this.mant, b))throw"Too many digits: " + this.toString();
                if (null != a && a.mant.length > b && !this.allzero(a.mant, b))throw"Too many digits: " + a.toString();
            }
        };
        f.prototype.round = x;
        f.prototype.allzero = function (a, b) {
            var c = 0;
            0 > b && (b = 0);
            var d = a.length - 1, c = b;
            for (; c <= d; c++)if (0 != a[c])return !1;
            return !0
        };
        f.prototype.finish = function (a, b) {
            var c = 0, d = 0, e = null, c = d = 0;
            0 != a.digits && this.mant.length > a.digits && this.round(a);
            if (b && a.form != h.prototype.PLAIN) {
                c = this.mant.length;
                d = c - 1;
                a:for (; 1 <= d; d--) {
                    if (0 != this.mant[d])break a;
                    c--;
                    this.exp++
                }
                c < this.mant.length && (e = Array(c), this.arraycopy(this.mant, 0, e, 0, c), this.mant = e)
            }
            this.form = h.prototype.PLAIN;
            c = this.mant.length;
            d = 0;
            for (; 0 < c; c--, d++)if (0 != this.mant[d]) {
                0 < d && (e = Array(this.mant.length - d), this.arraycopy(this.mant, d, e, 0, this.mant.length - d), this.mant = e);
                d = this.exp + this.mant.length;
                if (0 < d) {
                    if (d > a.digits && 0 != a.digits && (this.form = a.form), d - 1 <= this.MaxExp)return this
                } else-5 > d && (this.form = a.form);
                d--;
                if (d < this.MinExp || d > this.MaxExp) {
                    b:do {
                        if (this.form == h.prototype.ENGINEERING &&
                            (c = d % 3, 0 > c && (c = 3 + c), d -= c, d >= this.MinExp && d <= this.MaxExp))break b;
                        throw"finish(): Exponent Overflow: " + d;
                    } while (0)
                }
                return this
            }
            this.ind = this.iszero;
            if (a.form != h.prototype.PLAIN)this.exp = 0; else if (0 < this.exp)this.exp = 0; else if (this.exp < this.MinExp)throw"finish(): Exponent Overflow: " + this.exp;
            this.mant = this.ZERO.mant;
            return this
        };
        f.prototype.isGreaterThan = function (a) {
            return 0 < this.compareTo(a)
        };
        f.prototype.isLessThan = function (a) {
            return 0 > this.compareTo(a)
        };
        f.prototype.isGreaterThanOrEqualTo = function (a) {
            return 0 <=
                this.compareTo(a)
        };
        f.prototype.isLessThanOrEqualTo = function (a) {
            return 0 >= this.compareTo(a)
        };
        f.prototype.isPositive = function () {
            return 0 < this.compareTo(f.prototype.ZERO)
        };
        f.prototype.isNegative = function () {
            return 0 > this.compareTo(f.prototype.ZERO)
        };
        f.prototype.isZero = function () {
            return 0 === this.compareTo(f.prototype.ZERO)
        };
        f.ROUND_CEILING = f.prototype.ROUND_CEILING = h.prototype.ROUND_CEILING;
        f.ROUND_DOWN = f.prototype.ROUND_DOWN = h.prototype.ROUND_DOWN;
        f.ROUND_FLOOR = f.prototype.ROUND_FLOOR = h.prototype.ROUND_FLOOR;
        f.ROUND_HALF_DOWN = f.prototype.ROUND_HALF_DOWN = h.prototype.ROUND_HALF_DOWN;
        f.ROUND_HALF_EVEN = f.prototype.ROUND_HALF_EVEN = h.prototype.ROUND_HALF_EVEN;
        f.ROUND_HALF_UP = f.prototype.ROUND_HALF_UP = h.prototype.ROUND_HALF_UP;
        f.ROUND_UNNECESSARY = f.prototype.ROUND_UNNECESSARY = h.prototype.ROUND_UNNECESSARY;
        f.ROUND_UP = f.prototype.ROUND_UP = h.prototype.ROUND_UP;
        f.prototype.ispos = 1;
        f.prototype.iszero = 0;
        f.prototype.isneg = -1;
        f.prototype.MinExp = -999999999;
        f.prototype.MaxExp = 999999999;
        f.prototype.MinArg = -999999999;
        f.prototype.MaxArg =
            999999999;
        f.prototype.plainMC = new h(0, h.prototype.PLAIN);
        f.prototype.bytecar = Array(190);
        f.prototype.bytedig = y();
        f.ZERO = f.prototype.ZERO = new f("0");
        f.ONE = f.prototype.ONE = new f("1");
        f.TEN = f.prototype.TEN = new f("10");
        return f
    }(y);
    "function" === typeof define && null != define.amd ? define({
        BigDecimal: L,
        MathContext: y
    }) : "object" === typeof this && (this.BigDecimal = L, this.MathContext = y)
}).call(this);
Number.DEF_SCALE = 4;
Number.setScale = function (scale) {
    Number.DEF_SCALE = scale;
};
Number.add2 = function (number1, number2, round) {
    var r = new Number(new BigDecimal(number1.toString()).add(new BigDecimal(number2.toString())));
    if (round != null) {
        r = Number.round(r, round);
    }
    return r;
};
Number.subtract2 = function (number1, number2, round) {
    var r = new Number(new BigDecimal(number1.toString()).subtract(new BigDecimal(number2.toString())));
    if (round != null) {
        r = Number.round(r, round);
    }
    return r;
};
Number.multiply2 = function (number1, number2, round) {
    var r = new Number(new BigDecimal(number1.toString()).multiply(new BigDecimal(number2.toString())));
    if (round != null) {
        r = Number.round(r, round);
    }
    return r;
};
Number.divide2 = function (number1, number2, round) {
    var r = new Number(new BigDecimal(number1.toString()).divide(new BigDecimal(number2.toString()), 16, BigDecimal.ROUND_HALF_UP));
    if (round != null) {
        r = Number.round(r, round);
    }
    return r;
};
Number.add = function (number1, number2, round) {
    if (round == null) {
        round = Number.DEF_SCALE;
    }
    return Number.add2(number1, number2, round);
};
Number.subtract = function (number1, number2, round) {
    if (round == null) {
        round = Number.DEF_SCALE;
    }
    return Number.subtract2(number1, number2, round);
};
Number.multiply = function (number1, number2, round) {
    if (round == null) {
        round = Number.DEF_SCALE;
    }
    return Number.multiply2(number1, number2, round);
};
Number.divide = function (number1, number2, round) {
    if (round == null) {
        round = Number.DEF_SCALE;
    }
    return Number.divide2(number1, number2, round);
};
Number.compareTo = function (number1, number2) {
    return new BigDecimal(number1.toString()).compareTo(new BigDecimal(number2.toString()));
};
Number.gt = function (number1, number2) {
    return Number.compareTo(number1, number2) > 0;
};
Number.lt = function (number1, number2) {
    return Number.compareTo(number1, number2) < 0;
};
Number.ge = function (number1, number2) {
    return Number.compareTo(number1, number2) >= 0;
};
Number.le = function (number1, number2) {
    return Number.compareTo(number1, number2) <= 0;
};
Number.eq = function (number1, number2) {
    return Number.compareTo(number1, number2) == 0;
};
Number.ne = function (number1, number2) {
    return Number.compareTo(number1, number2) != 0;
};
Number.negate = function (number) {
    return new Number(new BigDecimal(number.toString()).negate());
};
Number.scale = function (number) {
    return new BigDecimal(number.toString()).scale();
};
Number.round = function (number, scale) {
    if (scale == null) {
        scale = Number.DEF_SCALE;
    }
    return new Number(new BigDecimal(number.toString()).setScale(scale, BigDecimal.ROUND_HALF_UP));
};
Number.format = function (number, scale) {
    if (scale == null) {
        scale = Number.DEF_SCALE;
    }
    return new BigDecimal(number.toString()).setScale(scale, BigDecimal.ROUND_HALF_UP);
};
Number.isPositive = function (number) {
    try {
        return new BigDecimal(number.toString()).isPositive();
    } catch (e) {
        return false;
    }
};
Number.isPositiveOrZero = function (number) {
    try {
        var n = new BigDecimal(number.toString());
        if (n.isPositive() || n.isZero()) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};
Number.isPositiveInteger = function (number) {
    try {
        var n = new BigDecimal(number.toString());
        if (n.isPositive() && n.scale() == 0) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};
Number.isPositiveIntegerOrZero = function (number) {
    try {
        var n = new BigDecimal(number.toString());
        if ((n.isPositive() && n.scale() == 0) || n.isZero()) {
            return true;
        }
        return false;
    } catch (e) {
        return false;
    }
};
Number.isNumber = function (number) {
    try {
        new BigDecimal(number.toString());
        return true;
    } catch (e) {
        return false;
    }
};
Number.isZero = function (number) {
    try {
        return new BigDecimal(number.toString()).isZero();
    } catch (e) {
        return false;
    }
};
Number.isNegative = function (number) {
    try {
        return new BigDecimal(number.toString()).isNegative();
    } catch (e) {
        return false;
    }
};
Number.parse = function (number) {
    if (Number.isNumber(number)) {
        return new Number(new BigDecimal(number.toString()));
    }
    return 0;
};
Number.split = function (number) {
    var num = Number.parse(number);
    var inum = parseInt(num);
    var dnum = num - inum;
    return {integer: inum, decimal: dnum};
};

Number.abs = function(number) {
	if (number == null) {
		return 0;
	} else {
		return Number.parse(number.toString().replace(/\,/g, ""));
	}
};

//金额的小写转大写方法
function amountlowToUp (num) {  
	  var strOutput = "";  
	  var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';  
	  num += "00";  
	  var intPos = num.indexOf('.');  
	  if (intPos >= 0)  
	    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);  
	  strUnit = strUnit.substr(strUnit.length - num.length);  
	  for (var i=0; i < num.length; i++)  
	    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);  
	    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");  
	};