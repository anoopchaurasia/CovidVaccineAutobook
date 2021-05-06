function(t, e, n) {
    var r, i, s, o, a, l, c, u, d, h, f, p, m, g, _, y, b, v, w;
    t.exports = (r = n("Ib8C"),
    n("K3mO"),
    void (r.lib.Cipher || (i = r,
    s = i.lib,
    o = s.Base,
    a = s.WordArray,
    l = s.BufferedBlockAlgorithm,
    c = i.enc,
    u = c.Base64,
    d = i.algo.EvpKDF,
    h = s.Cipher = l.extend({
        cfg: o.extend(),
        createEncryptor: function(t, e) {
            return this.create(this._ENC_XFORM_MODE, t, e)
        },
        createDecryptor: function(t, e) {
            return this.create(this._DEC_XFORM_MODE, t, e)
        },
        init: function(t, e, n) {
            this.cfg = this.cfg.extend(n),
            this._xformMode = t,
            this._key = e,
            this.reset()
        },
        reset: function() {
            l.reset.call(this),
            this._doReset()
        },
        process: function(t) {
            return this._append(t),
            this._process()
        },
        finalize: function(t) {
            return t && this._append(t),
            this._doFinalize()
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function() {
            function t(t) {
                return "string" == typeof t ? w : b
            }
            return function(e) {
                return {
                    encrypt: function(n, r, i) {
                        return t(r).encrypt(e, n, r, i)
                    },
                    decrypt: function(n, r, i) {
                        return t(r).decrypt(e, n, r, i)
                    }
                }
            }
        }()
    }),
    s.StreamCipher = h.extend({
        _doFinalize: function() {
            return this._process(!0)
        },
        blockSize: 1
    }),
    f = i.mode = {},
    p = s.BlockCipherMode = o.extend({
        createEncryptor: function(t, e) {
            return this.Encryptor.create(t, e)
        },
        createDecryptor: function(t, e) {
            return this.Decryptor.create(t, e)
        },
        init: function(t, e) {
            this._cipher = t,
            this._iv = e
        }
    }),
    m = f.CBC = function() {
        var t = p.extend();
        function e(t, e, n) {
            var r, i = this._iv;
            i ? (r = i,
            this._iv = void 0) : r = this._prevBlock;
            for (var s = 0; s < n; s++)
                t[e + s] ^= r[s]
        }
        return t.Encryptor = t.extend({
            processBlock: function(t, n) {
                var r = this._cipher
                  , i = r.blockSize;
                e.call(this, t, n, i),
                r.encryptBlock(t, n),
                this._prevBlock = t.slice(n, n + i)
            }
        }),
        t.Decryptor = t.extend({
            processBlock: function(t, n) {
                var r = this._cipher
                  , i = r.blockSize
                  , s = t.slice(n, n + i);
                r.decryptBlock(t, n),
                e.call(this, t, n, i),
                this._prevBlock = s
            }
        }),
        t
    }(),
    g = (i.pad = {}).Pkcs7 = {
        pad: function(t, e) {
            for (var n = 4 * e, r = n - t.sigBytes % n, i = r << 24 | r << 16 | r << 8 | r, s = [], o = 0; o < r; o += 4)
                s.push(i);
            var l = a.create(s, r);
            t.concat(l)
        },
        unpad: function(t) {
            t.sigBytes -= 255 & t.words[t.sigBytes - 1 >>> 2]
        }
    },
    s.BlockCipher = h.extend({
        cfg: h.cfg.extend({
            mode: m,
            padding: g
        }),
        reset: function() {
            var t;
            h.reset.call(this);
            var e = this.cfg
              , n = e.iv
              , r = e.mode;
            this._xformMode == this._ENC_XFORM_MODE ? t = r.createEncryptor : (t = r.createDecryptor,
            this._minBufferSize = 1),
            this._mode && this._mode.__creator == t ? this._mode.init(this, n && n.words) : (this._mode = t.call(r, this, n && n.words),
            this._mode.__creator = t)
        },
        _doProcessBlock: function(t, e) {
            this._mode.processBlock(t, e)
        },
        _doFinalize: function() {
            var t, e = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (e.pad(this._data, this.blockSize),
            t = this._process(!0)) : (t = this._process(!0),
            e.unpad(t)),
            t
        },
        blockSize: 4
    }),
    _ = s.CipherParams = o.extend({
        init: function(t) {
            this.mixIn(t)
        },
        toString: function(t) {
            return (t || this.formatter).stringify(this)
        }
    }),
    y = (i.format = {}).OpenSSL = {
        stringify: function(t) {
            var e = t.ciphertext
              , n = t.salt;
            return (n ? a.create([1398893684, 1701076831]).concat(n).concat(e) : e).toString(u)
        },
        parse: function(t) {
            var e, n = u.parse(t), r = n.words;
            return 1398893684 == r[0] && 1701076831 == r[1] && (e = a.create(r.slice(2, 4)),
            r.splice(0, 4),
            n.sigBytes -= 16),
            _.create({
                ciphertext: n,
                salt: e
            })
        }
    },
    b = s.SerializableCipher = o.extend({
        cfg: o.extend({
            format: y
        }),
        encrypt: function(t, e, n, r) {
            r = this.cfg.extend(r);
            var i = t.createEncryptor(n, r)
              , s = i.finalize(e)
              , o = i.cfg;
            return _.create({
                ciphertext: s,
                key: n,
                iv: o.iv,
                algorithm: t,
                mode: o.mode,
                padding: o.padding,
                blockSize: t.blockSize,
                formatter: r.format
            })
        },
        decrypt: function(t, e, n, r) {
            return r = this.cfg.extend(r),
            e = this._parse(e, r.format),
            t.createDecryptor(n, r).finalize(e.ciphertext)
        },
        _parse: function(t, e) {
            return "string" == typeof t ? e.parse(t, this) : t
        }
    }),
    v = (i.kdf = {}).OpenSSL = {
        execute: function(t, e, n, r) {
            r || (r = a.random(8));
            var i = d.create({
                keySize: e + n
            }).compute(t, r)
              , s = a.create(i.words.slice(e), 4 * n);
            return i.sigBytes = 4 * e,
            _.create({
                key: i,
                iv: s,
                salt: r
            })
        }
    },
    w = s.PasswordBasedCipher = b.extend({
        cfg: b.cfg.extend({
            kdf: v
        }),
        encrypt: function(t, e, n, r) {
            var i = (r = this.cfg.extend(r)).kdf.execute(n, t.keySize, t.ivSize);
            r.iv = i.iv;
            var s = b.encrypt.call(this, t, e, i.key, r);
            return s.mixIn(i),
            s
        },
        decrypt: function(t, e, n, r) {
            r = this.cfg.extend(r),
            e = this._parse(e, r.format);
            var i = r.kdf.execute(n, t.keySize, t.ivSize, e.salt);
            return r.iv = i.iv,
            b.decrypt.call(this, t, e, i.key, r)
        }
    }))))
}