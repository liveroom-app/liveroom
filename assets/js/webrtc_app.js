// Taken from https://github.com/membraneframework/membrane_demo/tree/master/webrtc_videoroom

(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) =>
    key in obj
      ? __defProp(obj, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value,
        })
      : (obj[key] = value);
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __markAsModule = (target) =>
    __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) =>
    function __init() {
      return fn && (res = (0, fn[Object.keys(fn)[0]])((fn = 0))), res;
    };
  var __commonJS = (cb, mod) =>
    function __require() {
      return (
        mod ||
          (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod),
        mod.exports
      );
    };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (
      (module && typeof module === "object") ||
      typeof module === "function"
    ) {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {
            get: () => module[key],
            enumerable:
              !(desc = __getOwnPropDesc(module, key)) || desc.enumerable,
          });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(
      __markAsModule(
        __defProp(
          module != null ? __create(__getProtoOf(module)) : {},
          "default",
          module && module.__esModule && "default" in module
            ? { get: () => module.default, enumerable: true }
            : { value: module, enumerable: true }
        )
      ),
      module
    );
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) =>
        x.done
          ? resolve(x.value)
          : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/@membraneframework/membrane-webrtc-js/dist/mediaEvent.js
  var require_mediaEvent = __commonJS({
    "node_modules/@membraneframework/membrane-webrtc-js/dist/mediaEvent.js"(
      exports
    ) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.generateCustomEvent =
        exports.generateMediaEvent =
        exports.deserializeMediaEvent =
        exports.serializeMediaEvent =
          void 0;
      function serializeMediaEvent(mediaEvent) {
        return JSON.stringify(mediaEvent);
      }
      exports.serializeMediaEvent = serializeMediaEvent;
      function deserializeMediaEvent(serializedMediaEvent) {
        return JSON.parse(serializedMediaEvent);
      }
      exports.deserializeMediaEvent = deserializeMediaEvent;
      function generateMediaEvent(type, data) {
        var event = { type };
        if (data) {
          event = __spreadProps(__spreadValues({}, event), { data });
        }
        return event;
      }
      exports.generateMediaEvent = generateMediaEvent;
      function generateCustomEvent(data) {
        return generateMediaEvent("custom", data);
      }
      exports.generateCustomEvent = generateCustomEvent;
    },
  });

  // node_modules/uuid/dist/esm-browser/rng.js
  function rng() {
    if (!getRandomValues) {
      getRandomValues =
        (typeof crypto !== "undefined" &&
          crypto.getRandomValues &&
          crypto.getRandomValues.bind(crypto)) ||
        (typeof msCrypto !== "undefined" &&
          typeof msCrypto.getRandomValues === "function" &&
          msCrypto.getRandomValues.bind(msCrypto));
      if (!getRandomValues) {
        throw new Error(
          "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
        );
      }
    }
    return getRandomValues(rnds8);
  }
  var getRandomValues, rnds8;
  var init_rng = __esm({
    "node_modules/uuid/dist/esm-browser/rng.js"() {
      rnds8 = new Uint8Array(16);
    },
  });

  // node_modules/uuid/dist/esm-browser/regex.js
  var regex_default;
  var init_regex = __esm({
    "node_modules/uuid/dist/esm-browser/regex.js"() {
      regex_default =
        /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    },
  });

  // node_modules/uuid/dist/esm-browser/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default;
  var init_validate = __esm({
    "node_modules/uuid/dist/esm-browser/validate.js"() {
      init_regex();
      validate_default = validate;
    },
  });

  // node_modules/uuid/dist/esm-browser/stringify.js
  function stringify(arr) {
    var offset =
      arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = (
      byteToHex[arr[offset + 0]] +
      byteToHex[arr[offset + 1]] +
      byteToHex[arr[offset + 2]] +
      byteToHex[arr[offset + 3]] +
      "-" +
      byteToHex[arr[offset + 4]] +
      byteToHex[arr[offset + 5]] +
      "-" +
      byteToHex[arr[offset + 6]] +
      byteToHex[arr[offset + 7]] +
      "-" +
      byteToHex[arr[offset + 8]] +
      byteToHex[arr[offset + 9]] +
      "-" +
      byteToHex[arr[offset + 10]] +
      byteToHex[arr[offset + 11]] +
      byteToHex[arr[offset + 12]] +
      byteToHex[arr[offset + 13]] +
      byteToHex[arr[offset + 14]] +
      byteToHex[arr[offset + 15]]
    ).toLowerCase();
    if (!validate_default(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  var byteToHex, stringify_default;
  var init_stringify = __esm({
    "node_modules/uuid/dist/esm-browser/stringify.js"() {
      init_validate();
      byteToHex = [];
      for (var i = 0; i < 256; ++i) {
        byteToHex.push((i + 256).toString(16).substr(1));
      }
      stringify_default = stringify;
    },
  });

  // node_modules/uuid/dist/esm-browser/v1.js
  function v1(options, buf, offset) {
    var i = (buf && offset) || 0;
    var b = buf || new Array(16);
    options = options || {};
    var node = options.node || _nodeId;
    var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
    if (node == null || clockseq == null) {
      var seedBytes = options.random || (options.rng || rng)();
      if (node == null) {
        node = _nodeId = [
          seedBytes[0] | 1,
          seedBytes[1],
          seedBytes[2],
          seedBytes[3],
          seedBytes[4],
          seedBytes[5],
        ];
      }
      if (clockseq == null) {
        clockseq = _clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 16383;
      }
    }
    var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
    var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
    if (dt < 0 && options.clockseq === void 0) {
      clockseq = (clockseq + 1) & 16383;
    }
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
      nsecs = 0;
    }
    if (nsecs >= 1e4) {
      throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    msecs += 122192928e5;
    var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
    b[i++] = (tl >>> 24) & 255;
    b[i++] = (tl >>> 16) & 255;
    b[i++] = (tl >>> 8) & 255;
    b[i++] = tl & 255;
    var tmh = ((msecs / 4294967296) * 1e4) & 268435455;
    b[i++] = (tmh >>> 8) & 255;
    b[i++] = tmh & 255;
    b[i++] = ((tmh >>> 24) & 15) | 16;
    b[i++] = (tmh >>> 16) & 255;
    b[i++] = (clockseq >>> 8) | 128;
    b[i++] = clockseq & 255;
    for (var n = 0; n < 6; ++n) {
      b[i + n] = node[n];
    }
    return buf || stringify_default(b);
  }
  var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
  var init_v1 = __esm({
    "node_modules/uuid/dist/esm-browser/v1.js"() {
      init_rng();
      init_stringify();
      _lastMSecs = 0;
      _lastNSecs = 0;
      v1_default = v1;
    },
  });

  // node_modules/uuid/dist/esm-browser/parse.js
  function parse(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    var v;
    var arr = new Uint8Array(16);
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = (v >>> 16) & 255;
    arr[2] = (v >>> 8) & 255;
    arr[3] = v & 255;
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 255;
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 255;
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 255;
    arr[10] = ((v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776) & 255;
    arr[11] = (v / 4294967296) & 255;
    arr[12] = (v >>> 24) & 255;
    arr[13] = (v >>> 16) & 255;
    arr[14] = (v >>> 8) & 255;
    arr[15] = v & 255;
    return arr;
  }
  var parse_default;
  var init_parse = __esm({
    "node_modules/uuid/dist/esm-browser/parse.js"() {
      init_validate();
      parse_default = parse;
    },
  });

  // node_modules/uuid/dist/esm-browser/v35.js
  function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
      bytes.push(str.charCodeAt(i));
    }
    return bytes;
  }
  function v35_default(name, version2, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
      if (typeof value === "string") {
        value = stringToBytes(value);
      }
      if (typeof namespace === "string") {
        namespace = parse_default(namespace);
      }
      if (namespace.length !== 16) {
        throw TypeError(
          "Namespace must be array-like (16 iterable integer values, 0-255)"
        );
      }
      var bytes = new Uint8Array(16 + value.length);
      bytes.set(namespace);
      bytes.set(value, namespace.length);
      bytes = hashfunc(bytes);
      bytes[6] = (bytes[6] & 15) | version2;
      bytes[8] = (bytes[8] & 63) | 128;
      if (buf) {
        offset = offset || 0;
        for (var i = 0; i < 16; ++i) {
          buf[offset + i] = bytes[i];
        }
        return buf;
      }
      return stringify_default(bytes);
    }
    try {
      generateUUID.name = name;
    } catch (err) {}
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
  }
  var DNS, URL;
  var init_v35 = __esm({
    "node_modules/uuid/dist/esm-browser/v35.js"() {
      init_stringify();
      init_parse();
      DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    },
  });

  // node_modules/uuid/dist/esm-browser/md5.js
  function md5(bytes) {
    if (typeof bytes === "string") {
      var msg = unescape(encodeURIComponent(bytes));
      bytes = new Uint8Array(msg.length);
      for (var i = 0; i < msg.length; ++i) {
        bytes[i] = msg.charCodeAt(i);
      }
    }
    return md5ToHexEncodedArray(
      wordsToMd5(bytesToWords(bytes), bytes.length * 8)
    );
  }
  function md5ToHexEncodedArray(input) {
    var output = [];
    var length32 = input.length * 32;
    var hexTab = "0123456789abcdef";
    for (var i = 0; i < length32; i += 8) {
      var x = (input[i >> 5] >>> i % 32) & 255;
      var hex = parseInt(
        hexTab.charAt((x >>> 4) & 15) + hexTab.charAt(x & 15),
        16
      );
      output.push(hex);
    }
    return output;
  }
  function getOutputLength(inputLength8) {
    return (((inputLength8 + 64) >>> 9) << 4) + 14 + 1;
  }
  function wordsToMd5(x, len) {
    x[len >> 5] |= 128 << len % 32;
    x[getOutputLength(len) - 1] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }
  function bytesToWords(input) {
    if (input.length === 0) {
      return [];
    }
    var length8 = input.length * 8;
    var output = new Uint32Array(getOutputLength(length8));
    for (var i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input[i / 8] & 255) << i % 32;
    }
    return output;
  }
  function safeAdd(x, y) {
    var lsw = (x & 65535) + (y & 65535);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 65535);
  }
  function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  var md5_default;
  var init_md5 = __esm({
    "node_modules/uuid/dist/esm-browser/md5.js"() {
      md5_default = md5;
    },
  });

  // node_modules/uuid/dist/esm-browser/v3.js
  var v3, v3_default;
  var init_v3 = __esm({
    "node_modules/uuid/dist/esm-browser/v3.js"() {
      init_v35();
      init_md5();
      v3 = v35_default("v3", 48, md5_default);
      v3_default = v3;
    },
  });

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)();
    rnds[6] = (rnds[6] & 15) | 64;
    rnds[8] = (rnds[8] & 63) | 128;
    if (buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return stringify_default(rnds);
  }
  var v4_default;
  var init_v4 = __esm({
    "node_modules/uuid/dist/esm-browser/v4.js"() {
      init_rng();
      init_stringify();
      v4_default = v4;
    },
  });

  // node_modules/uuid/dist/esm-browser/sha1.js
  function f(s, x, y, z) {
    switch (s) {
      case 0:
        return (x & y) ^ (~x & z);
      case 1:
        return x ^ y ^ z;
      case 2:
        return (x & y) ^ (x & z) ^ (y & z);
      case 3:
        return x ^ y ^ z;
    }
  }
  function ROTL(x, n) {
    return (x << n) | (x >>> (32 - n));
  }
  function sha1(bytes) {
    var K = [1518500249, 1859775393, 2400959708, 3395469782];
    var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    if (typeof bytes === "string") {
      var msg = unescape(encodeURIComponent(bytes));
      bytes = [];
      for (var i = 0; i < msg.length; ++i) {
        bytes.push(msg.charCodeAt(i));
      }
    } else if (!Array.isArray(bytes)) {
      bytes = Array.prototype.slice.call(bytes);
    }
    bytes.push(128);
    var l = bytes.length / 4 + 2;
    var N = Math.ceil(l / 16);
    var M = new Array(N);
    for (var _i = 0; _i < N; ++_i) {
      var arr = new Uint32Array(16);
      for (var j = 0; j < 16; ++j) {
        arr[j] =
          (bytes[_i * 64 + j * 4] << 24) |
          (bytes[_i * 64 + j * 4 + 1] << 16) |
          (bytes[_i * 64 + j * 4 + 2] << 8) |
          bytes[_i * 64 + j * 4 + 3];
      }
      M[_i] = arr;
    }
    M[N - 1][14] = ((bytes.length - 1) * 8) / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = ((bytes.length - 1) * 8) & 4294967295;
    for (var _i2 = 0; _i2 < N; ++_i2) {
      var W = new Uint32Array(80);
      for (var t = 0; t < 16; ++t) {
        W[t] = M[_i2][t];
      }
      for (var _t = 16; _t < 80; ++_t) {
        W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
      }
      var a = H[0];
      var b = H[1];
      var c = H[2];
      var d = H[3];
      var e = H[4];
      for (var _t2 = 0; _t2 < 80; ++_t2) {
        var s = Math.floor(_t2 / 20);
        var T = (ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2]) >>> 0;
        e = d;
        d = c;
        c = ROTL(b, 30) >>> 0;
        b = a;
        a = T;
      }
      H[0] = (H[0] + a) >>> 0;
      H[1] = (H[1] + b) >>> 0;
      H[2] = (H[2] + c) >>> 0;
      H[3] = (H[3] + d) >>> 0;
      H[4] = (H[4] + e) >>> 0;
    }
    return [
      (H[0] >> 24) & 255,
      (H[0] >> 16) & 255,
      (H[0] >> 8) & 255,
      H[0] & 255,
      (H[1] >> 24) & 255,
      (H[1] >> 16) & 255,
      (H[1] >> 8) & 255,
      H[1] & 255,
      (H[2] >> 24) & 255,
      (H[2] >> 16) & 255,
      (H[2] >> 8) & 255,
      H[2] & 255,
      (H[3] >> 24) & 255,
      (H[3] >> 16) & 255,
      (H[3] >> 8) & 255,
      H[3] & 255,
      (H[4] >> 24) & 255,
      (H[4] >> 16) & 255,
      (H[4] >> 8) & 255,
      H[4] & 255,
    ];
  }
  var sha1_default;
  var init_sha1 = __esm({
    "node_modules/uuid/dist/esm-browser/sha1.js"() {
      sha1_default = sha1;
    },
  });

  // node_modules/uuid/dist/esm-browser/v5.js
  var v5, v5_default;
  var init_v5 = __esm({
    "node_modules/uuid/dist/esm-browser/v5.js"() {
      init_v35();
      init_sha1();
      v5 = v35_default("v5", 80, sha1_default);
      v5_default = v5;
    },
  });

  // node_modules/uuid/dist/esm-browser/nil.js
  var nil_default;
  var init_nil = __esm({
    "node_modules/uuid/dist/esm-browser/nil.js"() {
      nil_default = "00000000-0000-0000-0000-000000000000";
    },
  });

  // node_modules/uuid/dist/esm-browser/version.js
  function version(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    return parseInt(uuid.substr(14, 1), 16);
  }
  var version_default;
  var init_version = __esm({
    "node_modules/uuid/dist/esm-browser/version.js"() {
      init_validate();
      version_default = version;
    },
  });

  // node_modules/uuid/dist/esm-browser/index.js
  var esm_browser_exports = {};
  __export(esm_browser_exports, {
    NIL: () => nil_default,
    parse: () => parse_default,
    stringify: () => stringify_default,
    v1: () => v1_default,
    v3: () => v3_default,
    v4: () => v4_default,
    v5: () => v5_default,
    validate: () => validate_default,
    version: () => version_default,
  });
  var init_esm_browser = __esm({
    "node_modules/uuid/dist/esm-browser/index.js"() {
      init_v1();
      init_v3();
      init_v4();
      init_v5();
      init_nil();
      init_version();
      init_validate();
      init_stringify();
      init_parse();
    },
  });

  // node_modules/@membraneframework/membrane-webrtc-js/dist/const.js
  var require_const = __commonJS({
    "node_modules/@membraneframework/membrane-webrtc-js/dist/const.js"(
      exports
    ) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.simulcastTransceiverConfig = void 0;
      exports.simulcastTransceiverConfig = {
        direction: "sendonly",
        sendEncodings: [
          {
            rid: "l",
            active: false,
            scaleResolutionDownBy: 4,
          },
          {
            rid: "m",
            active: false,
            scaleResolutionDownBy: 2,
          },
          {
            rid: "h",
            active: false,
          },
        ],
      };
    },
  });

  // node_modules/@membraneframework/membrane-webrtc-js/dist/membraneWebRTC.js
  var require_membraneWebRTC = __commonJS({
    "node_modules/@membraneframework/membrane-webrtc-js/dist/membraneWebRTC.js"(
      exports
    ) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MembraneWebRTC = void 0;
      var mediaEvent_1 = require_mediaEvent();
      var uuid_1 = (init_esm_browser(), esm_browser_exports);
      var const_1 = require_const();
      var MembraneWebRTC2 = class {
        constructor(config) {
          this.localTracksWithStreams = [];
          this.trackIdToTrack = new Map();
          this.idToPeer = new Map();
          this.localPeer = {
            id: "",
            metadata: {},
            trackIdToMetadata: new Map(),
          };
          this.localTrackIdToTrack = new Map();
          this.midToTrackId = new Map();
          this.disabledTrackEncodings = new Map();
          this.rtcConfig = {
            iceServers: [],
            iceTransportPolicy: "relay",
          };
          this.join = (peerMetadata) => {
            var _a, _b;
            try {
              this.localPeer.metadata = peerMetadata;
              let mediaEvent = mediaEvent_1.generateMediaEvent("join", {
                metadata: peerMetadata,
              });
              this.sendMediaEvent(mediaEvent);
            } catch (e) {
              (_b = (_a = this.callbacks).onConnectionError) === null ||
              _b === void 0
                ? void 0
                : _b.call(_a, e);
              this.leave();
            }
          };
          this.receiveMediaEvent = (mediaEvent) => {
            var _a, _b, _c, _d;
            const deserializedMediaEvent =
              mediaEvent_1.deserializeMediaEvent(mediaEvent);
            switch (deserializedMediaEvent.type) {
              case "peerAccepted":
                this.localPeer.id = deserializedMediaEvent.data.id;
                (_b = (_a = this.callbacks).onJoinSuccess) === null ||
                _b === void 0
                  ? void 0
                  : _b.call(
                      _a,
                      deserializedMediaEvent.data.id,
                      deserializedMediaEvent.data.peersInRoom
                    );
                let peers = deserializedMediaEvent.data.peersInRoom;
                peers.forEach((peer) => {
                  this.addPeer(peer);
                });
                break;
              case "peerDenied":
                (_d = (_c = this.callbacks).onJoinError) === null ||
                _d === void 0
                  ? void 0
                  : _d.call(_c, deserializedMediaEvent.data);
                break;
              default:
                if (this.localPeer.id != null)
                  this.handleMediaEvent(deserializedMediaEvent);
            }
          };
          this.handleMediaEvent = (deserializedMediaEvent) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            let peer;
            let data;
            switch (deserializedMediaEvent.type) {
              case "offerData":
                const turnServers =
                  deserializedMediaEvent.data.integratedTurnServers;
                this.setTurns(turnServers);
                const offerData = new Map(
                  Object.entries(deserializedMediaEvent.data.tracksTypes)
                );
                this.onOfferData(offerData);
                break;
              case "tracksAdded":
                data = deserializedMediaEvent.data;
                if (this.getPeerId() === data.peerId) return;
                data.trackIdToMetadata = new Map(
                  Object.entries(data.trackIdToMetadata)
                );
                peer = this.idToPeer.get(data.peerId);
                const oldTrackIdToMetadata = peer.trackIdToMetadata;
                peer.trackIdToMetadata = new Map([
                  ...peer.trackIdToMetadata,
                  ...data.trackIdToMetadata,
                ]);
                this.idToPeer.set(peer.id, peer);
                Array.from(peer.trackIdToMetadata.entries()).forEach(
                  ([trackId2, metadata]) => {
                    var _a2, _b2;
                    if (!oldTrackIdToMetadata.has(trackId2)) {
                      const ctx = {
                        stream: null,
                        track: null,
                        trackId: trackId2,
                        simulcastConfig: {
                          enabled: false,
                          active_encodings: [],
                        },
                        metadata,
                        peer,
                        maxBandwidth: 0,
                      };
                      this.trackIdToTrack.set(trackId2, ctx);
                      (_b2 = (_a2 = this.callbacks).onTrackAdded) === null ||
                      _b2 === void 0
                        ? void 0
                        : _b2.call(_a2, ctx);
                    }
                  }
                );
                break;
              case "tracksRemoved":
                data = deserializedMediaEvent.data;
                const peerId = data.peerId;
                if (this.getPeerId() === data.peerId) return;
                const trackIds = data.trackIds;
                trackIds.forEach((trackId2) => {
                  var _a2, _b2;
                  const trackContext2 = this.trackIdToTrack.get(trackId2);
                  (_b2 = (_a2 = this.callbacks).onTrackRemoved) === null ||
                  _b2 === void 0
                    ? void 0
                    : _b2.call(_a2, trackContext2);
                  this.eraseTrack(trackId2, peerId);
                });
                break;
              case "sdpAnswer":
                this.midToTrackId = new Map(
                  Object.entries(deserializedMediaEvent.data.midToTrackId)
                );
                this.onAnswer(deserializedMediaEvent.data);
                break;
              case "candidate":
                this.onRemoteCandidate(deserializedMediaEvent.data);
                break;
              case "peerJoined":
                peer = deserializedMediaEvent.data.peer;
                if (peer.id === this.getPeerId()) return;
                this.addPeer(peer);
                (_b = (_a = this.callbacks).onPeerJoined) === null ||
                _b === void 0
                  ? void 0
                  : _b.call(_a, peer);
                break;
              case "peerLeft":
                peer = this.idToPeer.get(deserializedMediaEvent.data.peerId);
                if (peer === void 0) return;
                Array.from(peer.trackIdToMetadata.keys()).forEach(
                  (trackId2) => {
                    var _a2, _b2;
                    return (_b2 = (_a2 = this.callbacks).onTrackRemoved) ===
                      null || _b2 === void 0
                      ? void 0
                      : _b2.call(_a2, this.trackIdToTrack.get(trackId2));
                  }
                );
                this.erasePeer(peer);
                (_d = (_c = this.callbacks).onPeerLeft) === null ||
                _d === void 0
                  ? void 0
                  : _d.call(_c, peer);
                break;
              case "peerUpdated":
                if (this.getPeerId() === deserializedMediaEvent.data.peerId)
                  return;
                peer = this.idToPeer.get(deserializedMediaEvent.data.peerId);
                peer.metadata = deserializedMediaEvent.data.metadata;
                this.addPeer(peer);
                (_f = (_e = this.callbacks).onPeerUpdated) === null ||
                _f === void 0
                  ? void 0
                  : _f.call(_e, peer);
                break;
              case "peerRemoved":
                if (this.getPeerId() !== deserializedMediaEvent.data.peerId) {
                  console.error(
                    "Received onRemoved media event, but it does not refer to the local peer"
                  );
                  return;
                }
                (_h = (_g = this.callbacks).onRemoved) === null || _h === void 0
                  ? void 0
                  : _h.call(_g, deserializedMediaEvent.data.reason);
                break;
              case "trackUpdated":
                if (this.getPeerId() === deserializedMediaEvent.data.peerId)
                  return;
                peer = this.idToPeer.get(deserializedMediaEvent.data.peerId);
                if (peer == null)
                  throw `Peer with id: ${deserializedMediaEvent.data.peerId} doesn't exist`;
                const trackId = deserializedMediaEvent.data.trackId;
                const trackMetadata = deserializedMediaEvent.data.metadata;
                peer.trackIdToMetadata.set(trackId, trackMetadata);
                const trackContext = this.trackIdToTrack.get(trackId);
                trackContext.metadata = trackMetadata;
                (_k = (_j = this.callbacks).onTrackUpdated) === null ||
                _k === void 0
                  ? void 0
                  : _k.call(_j, trackContext);
                break;
              case "tracksPriority":
                const enabledTracks = deserializedMediaEvent.data.tracks.map(
                  (trackId2) => this.trackIdToTrack.get(trackId2)
                );
                const disabledTracks = Array.from(
                  this.trackIdToTrack.values()
                ).filter((track) => !enabledTracks.includes(track));
                (_m = (_l = this.callbacks).onTracksPriorityChanged) === null ||
                _m === void 0
                  ? void 0
                  : _m.call(_l, enabledTracks, disabledTracks);
              case "encodingSwitched":
                (_p = (_o = this.callbacks).onTrackEncodingChanged) === null ||
                _p === void 0
                  ? void 0
                  : _p.call(
                      _o,
                      deserializedMediaEvent.data.peerId,
                      deserializedMediaEvent.data.trackId,
                      deserializedMediaEvent.data.encoding
                    );
                break;
              case "custom":
                this.handleMediaEvent(deserializedMediaEvent.data);
                break;
              case "error":
                (_r = (_q = this.callbacks).onConnectionError) === null ||
                _r === void 0
                  ? void 0
                  : _r.call(_q, deserializedMediaEvent.data.message);
                this.leave();
                break;
              default:
                console.warn(
                  "Received unknown media event: ",
                  deserializedMediaEvent.type
                );
                break;
            }
          };
          this.addTrackToConnection = (trackContext) => {
            let transceiverConfig = this.createTransceiverConfig(trackContext);
            const track = trackContext.track;
            this.connection.addTransceiver(track, transceiverConfig);
          };
          this.updatePeerMetadata = (peerMetadata) => {
            let mediaEvent = mediaEvent_1.generateMediaEvent(
              "updatePeerMetadata",
              {
                metadata: peerMetadata,
              }
            );
            this.sendMediaEvent(mediaEvent);
          };
          this.updateTrackMetadata = (trackId, trackMetadata) => {
            const trackContext = this.localTrackIdToTrack.get(trackId);
            trackContext.metadata = trackMetadata;
            this.localTrackIdToTrack.set(trackId, trackContext);
            this.localPeer.trackIdToMetadata.set(trackId, trackMetadata);
            let mediaEvent = mediaEvent_1.generateMediaEvent(
              "updateTrackMetadata",
              {
                trackId,
                trackMetadata,
              }
            );
            this.sendMediaEvent(mediaEvent);
          };
          this.getMidToTrackId = () => {
            const localTrackMidToTrackId = {};
            if (!this.connection) return null;
            this.connection.getTransceivers().forEach((transceiver) => {
              var _a;
              const localTrackId =
                (_a = transceiver.sender.track) === null || _a === void 0
                  ? void 0
                  : _a.id;
              const mid = transceiver.mid;
              const trackIds = this.localPeer.trackIdToMetadata.keys();
              const tracks = Array.from(trackIds).map((track) =>
                this.localTrackIdToTrack.get(track)
              );
              if (localTrackId && mid) {
                const trackContext = tracks.find(
                  (trackContext2) => trackContext2.track.id === localTrackId
                );
                localTrackMidToTrackId[mid] = trackContext.trackId;
              }
            });
            return localTrackMidToTrackId;
          };
          this.leave = () => {
            let mediaEvent = mediaEvent_1.generateMediaEvent("leave");
            this.sendMediaEvent(mediaEvent);
            this.cleanUp();
          };
          this.cleanUp = () => {
            if (this.connection) {
              this.connection.onicecandidate = null;
              this.connection.ontrack = null;
            }
            this.localTracksWithStreams.forEach(({ track }) => track.stop());
            this.localTracksWithStreams = [];
            this.connection = void 0;
          };
          this.sendMediaEvent = (mediaEvent) => {
            this.callbacks.onSendMediaEvent(
              mediaEvent_1.serializeMediaEvent(mediaEvent)
            );
          };
          this.onAnswer = (answer) =>
            __async(this, null, function* () {
              this.connection.ontrack = this.onTrack();
              try {
                yield this.connection.setRemoteDescription(answer);
                this.disabledTrackEncodings.forEach((encodings, trackId) => {
                  encodings.forEach((encoding) =>
                    this.disableTrackEncoding(trackId, encoding)
                  );
                });
              } catch (err) {
                console.log(err);
              }
            });
          this.addTransceiversIfNeeded = (serverTracks) => {
            var _a;
            const recvTransceivers = this.connection
              .getTransceivers()
              .filter((elem) => elem.direction === "recvonly");
            let toAdd = [];
            const getNeededTransceiversTypes = (type) => {
              let typeNumber = serverTracks.get(type);
              typeNumber = typeNumber !== void 0 ? typeNumber : 0;
              const typeTransceiversNumber = recvTransceivers.filter(
                (elem) => elem.receiver.track.kind === type
              ).length;
              return Array(typeNumber - typeTransceiversNumber).fill(type);
            };
            const audio = getNeededTransceiversTypes("audio");
            const video = getNeededTransceiversTypes("video");
            toAdd = toAdd.concat(audio);
            toAdd = toAdd.concat(video);
            for (let kind of toAdd)
              (_a = this.connection) === null || _a === void 0
                ? void 0
                : _a.addTransceiver(kind, { direction: "recvonly" });
          };
          this.getTrackIdToMetadata = () => {
            const trackIdToMetadata = {};
            Array.from(this.localPeer.trackIdToMetadata.entries()).forEach(
              ([trackId, metadata]) => {
                trackIdToMetadata[trackId] = metadata;
              }
            );
            return trackIdToMetadata;
          };
          this.checkIfTrackBelongToPeer = (trackId, peer) =>
            Array.from(peer.trackIdToMetadata.keys()).some((track) =>
              trackId.startsWith(track)
            );
          this.onOfferData = (offerData) =>
            __async(this, null, function* () {
              if (!this.connection) {
                this.connection = new RTCPeerConnection(this.rtcConfig);
                this.connection.onicecandidate = this.onLocalCandidate();
                Array.from(this.localTrackIdToTrack.values()).forEach(
                  (trackContext) => this.addTrackToConnection(trackContext)
                );
                this.connection
                  .getTransceivers()
                  .forEach(
                    (transceiver) => (transceiver.direction = "sendonly")
                  );
              } else {
                yield this.connection.restartIce();
              }
              this.addTransceiversIfNeeded(offerData);
              yield this.createAndSendOffer();
            });
          this.onRemoteCandidate = (candidate) => {
            try {
              const iceCandidate = new RTCIceCandidate(candidate);
              if (!this.connection) {
                throw new Error(
                  "Received new remote candidate but RTCConnection is undefined"
                );
              }
              this.connection.addIceCandidate(iceCandidate);
            } catch (error) {
              console.error(error);
            }
          };
          this.onLocalCandidate = () => {
            return (event) => {
              if (event.candidate) {
                let mediaEvent = mediaEvent_1.generateCustomEvent({
                  type: "candidate",
                  data: {
                    candidate: event.candidate.candidate,
                    sdpMLineIndex: event.candidate.sdpMLineIndex,
                  },
                });
                this.sendMediaEvent(mediaEvent);
              }
            };
          };
          this.onTrack = () => {
            return (event) => {
              var _a, _b;
              const [stream] = event.streams;
              const mid = event.transceiver.mid;
              const trackId = this.midToTrackId.get(mid);
              if (this.checkIfTrackBelongToPeer(trackId, this.localPeer))
                return;
              const peer = Array.from(this.idToPeer.values()).filter((peer2) =>
                this.checkIfTrackBelongToPeer(trackId, peer2)
              )[0];
              const metadata = peer.trackIdToMetadata.get(trackId);
              const trackContext = {
                stream,
                track: event.track,
                peer,
                trackId,
                metadata,
                simulcastConfig: { enabled: false, active_encodings: [] },
              };
              this.trackIdToTrack.set(trackId, trackContext);
              (_b = (_a = this.callbacks).onTrackReady) === null ||
              _b === void 0
                ? void 0
                : _b.call(_a, trackContext);
            };
          };
          this.setTurns = (turnServers) => {
            turnServers.forEach((turnServer) => {
              var transport, uri;
              if (turnServer.transport == "tls") {
                transport = "tcp";
                uri = "turns";
              } else {
                transport = turnServer.transport;
                uri = "turn";
              }
              const rtcIceServer = {
                credential: turnServer.password,
                credentialType: "password",
                urls: uri.concat(
                  ":",
                  turnServer.serverAddr,
                  ":",
                  turnServer.serverPort,
                  "?transport=",
                  transport
                ),
                username: turnServer.username,
              };
              this.rtcConfig.iceServers.push(rtcIceServer);
            });
          };
          this.addPeer = (peer) => {
            if (peer.hasOwnProperty("trackIdToMetadata"))
              peer.trackIdToMetadata = new Map(
                Object.entries(peer.trackIdToMetadata)
              );
            else peer.trackIdToMetadata = new Map();
            this.idToPeer.set(peer.id, peer);
          };
          this.erasePeer = (peer) => {
            const tracksId = Array.from(peer.trackIdToMetadata.keys());
            tracksId.forEach((trackId) => this.trackIdToTrack.delete(trackId));
            Array.from(this.midToTrackId.entries()).forEach(
              ([mid, trackId]) => {
                if (tracksId.includes(trackId)) this.midToTrackId.delete(mid);
              }
            );
            this.idToPeer.delete(peer.id);
          };
          this.eraseTrack = (trackId, peerId) => {
            this.trackIdToTrack.delete(trackId);
            const midToTrackId = Array.from(this.midToTrackId.entries());
            const [mid, _trackId] = midToTrackId.find(
              ([mid2, mapTrackId]) => mapTrackId === trackId
            );
            this.midToTrackId.delete(mid);
            this.idToPeer.get(peerId).trackIdToMetadata.delete(trackId);
            this.disabledTrackEncodings.delete(trackId);
          };
          this.getPeerId = () => this.localPeer.id;
          const { callbacks } = config;
          this.callbacks = callbacks;
        }
        addTrack(
          track,
          stream,
          trackMetadata = new Map(),
          simulcastConfig = { enabled: false, active_encodings: [] },
          maxBandwidth = 0
        ) {
          if (this.getPeerId() === "")
            throw "Cannot add tracks before being accepted by the server";
          const trackId = this.getTrackId(uuid_1.v4());
          this.localTracksWithStreams.push({ track, stream });
          this.localPeer.trackIdToMetadata.set(trackId, trackMetadata);
          const trackContext = {
            track,
            stream,
            trackId,
            peer: this.localPeer,
            metadata: trackMetadata,
            simulcastConfig,
            maxBandwidth,
          };
          this.localTrackIdToTrack.set(trackId, trackContext);
          if (this.connection) {
            this.addTrackToConnection(trackContext);
            this.connection
              .getTransceivers()
              .forEach(
                (transceiver) =>
                  (transceiver.direction =
                    transceiver.direction === "sendrecv"
                      ? "sendonly"
                      : transceiver.direction)
              );
          }
          let mediaEvent = mediaEvent_1.generateCustomEvent({
            type: "renegotiateTracks",
          });
          this.sendMediaEvent(mediaEvent);
          return trackId;
        }
        createTransceiverConfig(trackContext) {
          let transceiverConfig;
          if (trackContext.track.kind === "audio") {
            transceiverConfig = this.createAudioTransceiverConfig(trackContext);
          } else {
            transceiverConfig = this.createVideoTransceiverConfig(trackContext);
          }
          return transceiverConfig;
        }
        createAudioTransceiverConfig(_trackContext) {
          return { direction: "sendonly" };
        }
        createVideoTransceiverConfig(trackContext) {
          var _a;
          let transceiverConfig;
          if (trackContext.simulcastConfig.enabled) {
            transceiverConfig = const_1.simulcastTransceiverConfig;
            let trackActiveEncodings =
              trackContext.simulcastConfig.active_encodings;
            let disabledTrackEncodings = [];
            (_a = transceiverConfig.sendEncodings) === null || _a === void 0
              ? void 0
              : _a.forEach((encoding) => {
                  if (trackActiveEncodings.includes(encoding.rid)) {
                    encoding.active = true;
                  } else {
                    disabledTrackEncodings.push(encoding.rid);
                  }
                });
            this.disabledTrackEncodings.set(
              trackContext.trackId,
              disabledTrackEncodings
            );
          } else {
            transceiverConfig = {
              direction: "sendonly",
              sendEncodings: [
                {
                  active: true,
                },
              ],
            };
          }
          if (trackContext.maxBandwidth && transceiverConfig.sendEncodings)
            this.applyBandwidthLimitation(
              transceiverConfig.sendEncodings,
              trackContext.maxBandwidth
            );
          return transceiverConfig;
        }
        applyBandwidthLimitation(encodings, max_bandwidth) {
          if (typeof max_bandwidth === "number") {
            this.splitBandwidth(encodings, max_bandwidth * 1024);
          } else {
            encodings
              .filter((encoding) => encoding.rid)
              .forEach((encoding) => {
                const limit = max_bandwidth.get(encoding.rid) || 0;
                if (limit > 0) encoding.maxBitrate = limit * 1024;
                else delete encoding.maxBitrate;
              });
          }
        }
        splitBandwidth(encodings, bandwidth) {
          if (bandwidth === 0) {
            encodings.forEach((encoding) => delete encoding.maxBitrate);
            return;
          }
          if (encodings.length == 0) {
            console.error(
              "Attempted to limit bandwidth of the track that doesn't have any encodings"
            );
            return;
          }
          const firstScaleDownBy = encodings[0].scaleResolutionDownBy || 1;
          const bitrate_parts = encodings.reduce(
            (acc, value) =>
              acc +
              (firstScaleDownBy / (value.scaleResolutionDownBy || 1)) ** 2,
            0
          );
          const x = bandwidth / bitrate_parts;
          encodings.forEach(
            (value) =>
              (value.maxBitrate =
                x *
                (firstScaleDownBy / (value.scaleResolutionDownBy || 1)) ** 2)
          );
        }
        replaceTrack(trackId, newTrack, newTrackMetadata) {
          return __async(this, null, function* () {
            const trackContext = this.localTrackIdToTrack.get(trackId);
            const sender = this.findSender(trackContext.track.id);
            if (sender) {
              return sender
                .replaceTrack(newTrack)
                .then(() => {
                  const trackMetadata =
                    newTrackMetadata ||
                    this.localTrackIdToTrack.get(trackId).metadata;
                  trackContext.track = newTrack;
                  this.updateTrackMetadata(trackId, trackMetadata);
                  return true;
                })
                .catch(() => false);
            }
            return false;
          });
        }
        setTrackBandwidth(trackId, bandwidth) {
          const trackContext = this.localTrackIdToTrack.get(trackId);
          if (!trackContext) {
            return Promise.reject(`Track '${trackId}' doesn't exist`);
          }
          const sender = this.findSender(trackContext.track.id);
          const parameters = sender.getParameters();
          if (parameters.encodings.length === 0) {
            parameters.encodings = [{}];
          } else {
            this.applyBandwidthLimitation(parameters.encodings, bandwidth);
          }
          return sender
            .setParameters(parameters)
            .then(() => true)
            .catch(() => false);
        }
        setEncodingBandwidth(trackId, rid, bandwidth) {
          const trackContext = this.localTrackIdToTrack.get(trackId);
          if (!trackContext) {
            return Promise.reject(`Track '${trackId}' doesn't exist`);
          }
          const sender = this.findSender(trackContext.track.id);
          const parameters = sender.getParameters();
          const encoding = parameters.encodings.find(
            (encoding2) => encoding2.rid === rid
          );
          if (!encoding) {
            return Promise.reject(`Encoding with rid '${rid}' doesn't exist`);
          } else if (bandwidth === 0) {
            delete encoding.maxBitrate;
          } else {
            encoding.maxBitrate = bandwidth * 1024;
          }
          return sender
            .setParameters(parameters)
            .then(() => true)
            .catch((_error) => false);
        }
        removeTrack(trackId) {
          const trackContext = this.localTrackIdToTrack.get(trackId);
          const sender = this.findSender(trackContext.track.id);
          this.connection.removeTrack(sender);
          let mediaEvent = mediaEvent_1.generateCustomEvent({
            type: "renegotiateTracks",
          });
          this.sendMediaEvent(mediaEvent);
        }
        prioritizeTrack(trackId) {
          let mediaEvent = mediaEvent_1.generateCustomEvent({
            type: "prioritizeTrack",
            data: { trackId },
          });
          this.sendMediaEvent(mediaEvent);
        }
        unprioritizeTrack(trackId) {
          let mediaEvent = mediaEvent_1.generateCustomEvent({
            type: "unprioritizeTrack",
            data: { trackId },
          });
          this.sendMediaEvent(mediaEvent);
        }
        setPreferedVideoSizes(
          bigScreens,
          smallScreens,
          mediumScreens = 0,
          allSameSize = false
        ) {
          let mediaEvent = mediaEvent_1.generateCustomEvent({
            type: "preferedVideoSizes",
            data: { bigScreens, mediumScreens, smallScreens, allSameSize },
          });
          this.sendMediaEvent(mediaEvent);
        }
        setTargetTrackEncoding(trackId, encoding) {
          let mediaEvent = mediaEvent_1.generateCustomEvent({
            type: "setTargetTrackVariant",
            data: {
              trackId,
              variant: encoding,
            },
          });
          this.sendMediaEvent(mediaEvent);
        }
        enableTrackEncoding(trackId, encoding) {
          var _a, _b, _c;
          let track =
            (_a = this.localTrackIdToTrack.get(trackId)) === null ||
            _a === void 0
              ? void 0
              : _a.track;
          let newDisabledTrackEncodings =
            (_b = this.disabledTrackEncodings.get(trackId)) === null ||
            _b === void 0
              ? void 0
              : _b.filter((en) => en !== encoding);
          this.disabledTrackEncodings.set(trackId, newDisabledTrackEncodings);
          let sender =
            (_c = this.connection) === null || _c === void 0
              ? void 0
              : _c.getSenders().filter((sender2) => sender2.track === track)[0];
          let params =
            sender === null || sender === void 0
              ? void 0
              : sender.getParameters();
          params.encodings.filter((en) => en.rid == encoding)[0].active = true;
          sender === null || sender === void 0
            ? void 0
            : sender.setParameters(params);
        }
        disableTrackEncoding(trackId, encoding) {
          var _a, _b;
          let track =
            (_a = this.localTrackIdToTrack.get(trackId)) === null ||
            _a === void 0
              ? void 0
              : _a.track;
          this.disabledTrackEncodings.get(trackId).push(encoding);
          let sender =
            (_b = this.connection) === null || _b === void 0
              ? void 0
              : _b.getSenders().filter((sender2) => sender2.track === track)[0];
          let params =
            sender === null || sender === void 0
              ? void 0
              : sender.getParameters();
          params.encodings.filter((en) => en.rid == encoding)[0].active = false;
          sender === null || sender === void 0
            ? void 0
            : sender.setParameters(params);
        }
        findSender(trackId) {
          return this.connection
            .getSenders()
            .find((sender) => sender.track && sender.track.id === trackId);
        }
        getTrackId(uuid) {
          return `${this.getPeerId()}:${uuid}`;
        }
        createAndSendOffer() {
          return __async(this, null, function* () {
            if (!this.connection) return;
            try {
              const offer = yield this.connection.createOffer();
              yield this.connection.setLocalDescription(offer);
              let mediaEvent = mediaEvent_1.generateCustomEvent({
                type: "sdpOffer",
                data: {
                  sdpOffer: offer,
                  trackIdToTrackMetadata: this.getTrackIdToMetadata(),
                  midToTrackId: this.getMidToTrackId(),
                },
              });
              this.sendMediaEvent(mediaEvent);
            } catch (error) {
              console.error(error);
            }
          });
        }
      };
      exports.MembraneWebRTC = MembraneWebRTC2;
    },
  });

  // node_modules/@membraneframework/membrane-webrtc-js/dist/index.js
  var require_dist = __commonJS({
    "node_modules/@membraneframework/membrane-webrtc-js/dist/index.js"(
      exports
    ) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MembraneWebRTC = void 0;
      var membraneWebRTC_1 = require_membraneWebRTC();
      Object.defineProperty(exports, "MembraneWebRTC", {
        enumerable: true,
        get: function () {
          return membraneWebRTC_1.MembraneWebRTC;
        },
      });
    },
  });

  // node_modules/strict-uri-encode/index.js
  var require_strict_uri_encode = __commonJS({
    "node_modules/strict-uri-encode/index.js"(exports, module) {
      "use strict";
      module.exports = (str) =>
        encodeURIComponent(str).replace(
          /[!'()*]/g,
          (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`
        );
    },
  });

  // node_modules/decode-uri-component/index.js
  var require_decode_uri_component = __commonJS({
    "node_modules/decode-uri-component/index.js"(exports, module) {
      "use strict";
      var token = "%[a-f0-9]{2}";
      var singleMatcher = new RegExp(token, "gi");
      var multiMatcher = new RegExp("(" + token + ")+", "gi");
      function decodeComponents(components, split) {
        try {
          return decodeURIComponent(components.join(""));
        } catch (err) {}
        if (components.length === 1) {
          return components;
        }
        split = split || 1;
        var left = components.slice(0, split);
        var right = components.slice(split);
        return Array.prototype.concat.call(
          [],
          decodeComponents(left),
          decodeComponents(right)
        );
      }
      function decode(input) {
        try {
          return decodeURIComponent(input);
        } catch (err) {
          var tokens = input.match(singleMatcher);
          for (var i = 1; i < tokens.length; i++) {
            input = decodeComponents(tokens, i).join("");
            tokens = input.match(singleMatcher);
          }
          return input;
        }
      }
      function customDecodeURIComponent(input) {
        var replaceMap = {
          "%FE%FF": "\uFFFD\uFFFD",
          "%FF%FE": "\uFFFD\uFFFD",
        };
        var match = multiMatcher.exec(input);
        while (match) {
          try {
            replaceMap[match[0]] = decodeURIComponent(match[0]);
          } catch (err) {
            var result = decode(match[0]);
            if (result !== match[0]) {
              replaceMap[match[0]] = result;
            }
          }
          match = multiMatcher.exec(input);
        }
        replaceMap["%C2"] = "\uFFFD";
        var entries = Object.keys(replaceMap);
        for (var i = 0; i < entries.length; i++) {
          var key = entries[i];
          input = input.replace(new RegExp(key, "g"), replaceMap[key]);
        }
        return input;
      }
      module.exports = function (encodedURI) {
        if (typeof encodedURI !== "string") {
          throw new TypeError(
            "Expected `encodedURI` to be of type `string`, got `" +
              typeof encodedURI +
              "`"
          );
        }
        try {
          encodedURI = encodedURI.replace(/\+/g, " ");
          return decodeURIComponent(encodedURI);
        } catch (err) {
          return customDecodeURIComponent(encodedURI);
        }
      };
    },
  });

  // node_modules/split-on-first/index.js
  var require_split_on_first = __commonJS({
    "node_modules/split-on-first/index.js"(exports, module) {
      "use strict";
      module.exports = (string, separator) => {
        if (!(typeof string === "string" && typeof separator === "string")) {
          throw new TypeError("Expected the arguments to be of type `string`");
        }
        if (separator === "") {
          return [string];
        }
        const separatorIndex = string.indexOf(separator);
        if (separatorIndex === -1) {
          return [string];
        }
        return [
          string.slice(0, separatorIndex),
          string.slice(separatorIndex + separator.length),
        ];
      };
    },
  });

  // node_modules/filter-obj/index.js
  var require_filter_obj = __commonJS({
    "node_modules/filter-obj/index.js"(exports, module) {
      "use strict";
      module.exports = function (obj, predicate) {
        var ret = {};
        var keys = Object.keys(obj);
        var isArr = Array.isArray(predicate);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var val = obj[key];
          if (
            isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)
          ) {
            ret[key] = val;
          }
        }
        return ret;
      };
    },
  });

  // node_modules/query-string/index.js
  var require_query_string = __commonJS({
    "node_modules/query-string/index.js"(exports) {
      "use strict";
      var strictUriEncode = require_strict_uri_encode();
      var decodeComponent = require_decode_uri_component();
      var splitOnFirst = require_split_on_first();
      var filterObject = require_filter_obj();
      var isNullOrUndefined = (value) => value === null || value === void 0;
      var encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
      function encoderForArrayFormat(options) {
        switch (options.arrayFormat) {
          case "index":
            return (key) => (result, value) => {
              const index = result.length;
              if (
                value === void 0 ||
                (options.skipNull && value === null) ||
                (options.skipEmptyString && value === "")
              ) {
                return result;
              }
              if (value === null) {
                return [
                  ...result,
                  [encode(key, options), "[", index, "]"].join(""),
                ];
              }
              return [
                ...result,
                [
                  encode(key, options),
                  "[",
                  encode(index, options),
                  "]=",
                  encode(value, options),
                ].join(""),
              ];
            };
          case "bracket":
            return (key) => (result, value) => {
              if (
                value === void 0 ||
                (options.skipNull && value === null) ||
                (options.skipEmptyString && value === "")
              ) {
                return result;
              }
              if (value === null) {
                return [...result, [encode(key, options), "[]"].join("")];
              }
              return [
                ...result,
                [encode(key, options), "[]=", encode(value, options)].join(""),
              ];
            };
          case "colon-list-separator":
            return (key) => (result, value) => {
              if (
                value === void 0 ||
                (options.skipNull && value === null) ||
                (options.skipEmptyString && value === "")
              ) {
                return result;
              }
              if (value === null) {
                return [...result, [encode(key, options), ":list="].join("")];
              }
              return [
                ...result,
                [encode(key, options), ":list=", encode(value, options)].join(
                  ""
                ),
              ];
            };
          case "comma":
          case "separator":
          case "bracket-separator": {
            const keyValueSep =
              options.arrayFormat === "bracket-separator" ? "[]=" : "=";
            return (key) => (result, value) => {
              if (
                value === void 0 ||
                (options.skipNull && value === null) ||
                (options.skipEmptyString && value === "")
              ) {
                return result;
              }
              value = value === null ? "" : value;
              if (result.length === 0) {
                return [
                  [
                    encode(key, options),
                    keyValueSep,
                    encode(value, options),
                  ].join(""),
                ];
              }
              return [
                [result, encode(value, options)].join(
                  options.arrayFormatSeparator
                ),
              ];
            };
          }
          default:
            return (key) => (result, value) => {
              if (
                value === void 0 ||
                (options.skipNull && value === null) ||
                (options.skipEmptyString && value === "")
              ) {
                return result;
              }
              if (value === null) {
                return [...result, encode(key, options)];
              }
              return [
                ...result,
                [encode(key, options), "=", encode(value, options)].join(""),
              ];
            };
        }
      }
      function parserForArrayFormat(options) {
        let result;
        switch (options.arrayFormat) {
          case "index":
            return (key, value, accumulator) => {
              result = /\[(\d*)\]$/.exec(key);
              key = key.replace(/\[\d*\]$/, "");
              if (!result) {
                accumulator[key] = value;
                return;
              }
              if (accumulator[key] === void 0) {
                accumulator[key] = {};
              }
              accumulator[key][result[1]] = value;
            };
          case "bracket":
            return (key, value, accumulator) => {
              result = /(\[\])$/.exec(key);
              key = key.replace(/\[\]$/, "");
              if (!result) {
                accumulator[key] = value;
                return;
              }
              if (accumulator[key] === void 0) {
                accumulator[key] = [value];
                return;
              }
              accumulator[key] = [].concat(accumulator[key], value);
            };
          case "colon-list-separator":
            return (key, value, accumulator) => {
              result = /(:list)$/.exec(key);
              key = key.replace(/:list$/, "");
              if (!result) {
                accumulator[key] = value;
                return;
              }
              if (accumulator[key] === void 0) {
                accumulator[key] = [value];
                return;
              }
              accumulator[key] = [].concat(accumulator[key], value);
            };
          case "comma":
          case "separator":
            return (key, value, accumulator) => {
              const isArray =
                typeof value === "string" &&
                value.includes(options.arrayFormatSeparator);
              const isEncodedArray =
                typeof value === "string" &&
                !isArray &&
                decode(value, options).includes(options.arrayFormatSeparator);
              value = isEncodedArray ? decode(value, options) : value;
              const newValue =
                isArray || isEncodedArray
                  ? value
                      .split(options.arrayFormatSeparator)
                      .map((item) => decode(item, options))
                  : value === null
                  ? value
                  : decode(value, options);
              accumulator[key] = newValue;
            };
          case "bracket-separator":
            return (key, value, accumulator) => {
              const isArray = /(\[\])$/.test(key);
              key = key.replace(/\[\]$/, "");
              if (!isArray) {
                accumulator[key] = value ? decode(value, options) : value;
                return;
              }
              const arrayValue =
                value === null
                  ? []
                  : value
                      .split(options.arrayFormatSeparator)
                      .map((item) => decode(item, options));
              if (accumulator[key] === void 0) {
                accumulator[key] = arrayValue;
                return;
              }
              accumulator[key] = [].concat(accumulator[key], arrayValue);
            };
          default:
            return (key, value, accumulator) => {
              if (accumulator[key] === void 0) {
                accumulator[key] = value;
                return;
              }
              accumulator[key] = [].concat(accumulator[key], value);
            };
        }
      }
      function validateArrayFormatSeparator(value) {
        if (typeof value !== "string" || value.length !== 1) {
          throw new TypeError(
            "arrayFormatSeparator must be single character string"
          );
        }
      }
      function encode(value, options) {
        if (options.encode) {
          return options.strict
            ? strictUriEncode(value)
            : encodeURIComponent(value);
        }
        return value;
      }
      function decode(value, options) {
        if (options.decode) {
          return decodeComponent(value);
        }
        return value;
      }
      function keysSorter(input) {
        if (Array.isArray(input)) {
          return input.sort();
        }
        if (typeof input === "object") {
          return keysSorter(Object.keys(input))
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => input[key]);
        }
        return input;
      }
      function removeHash(input) {
        const hashStart = input.indexOf("#");
        if (hashStart !== -1) {
          input = input.slice(0, hashStart);
        }
        return input;
      }
      function getHash(url) {
        let hash = "";
        const hashStart = url.indexOf("#");
        if (hashStart !== -1) {
          hash = url.slice(hashStart);
        }
        return hash;
      }
      function extract(input) {
        input = removeHash(input);
        const queryStart = input.indexOf("?");
        if (queryStart === -1) {
          return "";
        }
        return input.slice(queryStart + 1);
      }
      function parseValue(value, options) {
        if (
          options.parseNumbers &&
          !Number.isNaN(Number(value)) &&
          typeof value === "string" &&
          value.trim() !== ""
        ) {
          value = Number(value);
        } else if (
          options.parseBooleans &&
          value !== null &&
          (value.toLowerCase() === "true" || value.toLowerCase() === "false")
        ) {
          value = value.toLowerCase() === "true";
        }
        return value;
      }
      function parse3(query, options) {
        options = Object.assign(
          {
            decode: true,
            sort: true,
            arrayFormat: "none",
            arrayFormatSeparator: ",",
            parseNumbers: false,
            parseBooleans: false,
          },
          options
        );
        validateArrayFormatSeparator(options.arrayFormatSeparator);
        const formatter = parserForArrayFormat(options);
        const ret = Object.create(null);
        if (typeof query !== "string") {
          return ret;
        }
        query = query.trim().replace(/^[?#&]/, "");
        if (!query) {
          return ret;
        }
        for (const param of query.split("&")) {
          if (param === "") {
            continue;
          }
          let [key, value] = splitOnFirst(
            options.decode ? param.replace(/\+/g, " ") : param,
            "="
          );
          value =
            value === void 0
              ? null
              : ["comma", "separator", "bracket-separator"].includes(
                  options.arrayFormat
                )
              ? value
              : decode(value, options);
          formatter(decode(key, options), value, ret);
        }
        for (const key of Object.keys(ret)) {
          const value = ret[key];
          if (typeof value === "object" && value !== null) {
            for (const k of Object.keys(value)) {
              value[k] = parseValue(value[k], options);
            }
          } else {
            ret[key] = parseValue(value, options);
          }
        }
        if (options.sort === false) {
          return ret;
        }
        return (
          options.sort === true
            ? Object.keys(ret).sort()
            : Object.keys(ret).sort(options.sort)
        ).reduce((result, key) => {
          const value = ret[key];
          if (
            Boolean(value) &&
            typeof value === "object" &&
            !Array.isArray(value)
          ) {
            result[key] = keysSorter(value);
          } else {
            result[key] = value;
          }
          return result;
        }, Object.create(null));
      }
      exports.extract = extract;
      exports.parse = parse3;
      exports.stringify = (object, options) => {
        if (!object) {
          return "";
        }
        options = Object.assign(
          {
            encode: true,
            strict: true,
            arrayFormat: "none",
            arrayFormatSeparator: ",",
          },
          options
        );
        validateArrayFormatSeparator(options.arrayFormatSeparator);
        const shouldFilter = (key) =>
          (options.skipNull && isNullOrUndefined(object[key])) ||
          (options.skipEmptyString && object[key] === "");
        const formatter = encoderForArrayFormat(options);
        const objectCopy = {};
        for (const key of Object.keys(object)) {
          if (!shouldFilter(key)) {
            objectCopy[key] = object[key];
          }
        }
        const keys = Object.keys(objectCopy);
        if (options.sort !== false) {
          keys.sort(options.sort);
        }
        return keys
          .map((key) => {
            const value = object[key];
            if (value === void 0) {
              return "";
            }
            if (value === null) {
              return encode(key, options);
            }
            if (Array.isArray(value)) {
              if (
                value.length === 0 &&
                options.arrayFormat === "bracket-separator"
              ) {
                return encode(key, options) + "[]";
              }
              return value.reduce(formatter(key), []).join("&");
            }
            return encode(key, options) + "=" + encode(value, options);
          })
          .filter((x) => x.length > 0)
          .join("&");
      };
      exports.parseUrl = (url, options) => {
        options = Object.assign(
          {
            decode: true,
          },
          options
        );
        const [url_, hash] = splitOnFirst(url, "#");
        return Object.assign(
          {
            url: url_.split("?")[0] || "",
            query: parse3(extract(url), options),
          },
          options && options.parseFragmentIdentifier && hash
            ? { fragmentIdentifier: decode(hash, options) }
            : {}
        );
      };
      exports.stringifyUrl = (object, options) => {
        options = Object.assign(
          {
            encode: true,
            strict: true,
            [encodeFragmentIdentifier]: true,
          },
          options
        );
        const url = removeHash(object.url).split("?")[0] || "";
        const queryFromUrl = exports.extract(object.url);
        const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
        const query = Object.assign(parsedQueryFromUrl, object.query);
        let queryString = exports.stringify(query, options);
        if (queryString) {
          queryString = `?${queryString}`;
        }
        let hash = getHash(object.url);
        if (object.fragmentIdentifier) {
          hash = `#${
            options[encodeFragmentIdentifier]
              ? encode(object.fragmentIdentifier, options)
              : object.fragmentIdentifier
          }`;
        }
        return `${url}${queryString}${hash}`;
      };
      exports.pick = (input, filter, options) => {
        options = Object.assign(
          {
            parseFragmentIdentifier: true,
            [encodeFragmentIdentifier]: false,
          },
          options
        );
        const { url, query, fragmentIdentifier } = exports.parseUrl(
          input,
          options
        );
        return exports.stringifyUrl(
          {
            url,
            query: filterObject(query, filter),
            fragmentIdentifier,
          },
          options
        );
      };
      exports.exclude = (input, filter, options) => {
        const exclusionFilter = Array.isArray(filter)
          ? (key) => !filter.includes(key)
          : (key, value) => !filter(key, value);
        return exports.pick(input, exclusionFilter, options);
      };
    },
  });

  // src/consts.ts
  var MEDIA_CONSTRAINTS = {
    audio: true,
    video: { width: 640, height: 360, frameRate: 24 },
  };
  var LOCAL_PEER_ID = "local-peer";

  // src/room_ui.ts
  function getRoomId() {
    return document.getElementById("room").dataset.roomId;
  }
  function setupDisconnectButton(fun) {
    const disconnectButton = document.getElementById("disconnect");
    disconnectButton.onclick = fun;
  }
  function elementId(peerId, type) {
    return `${type}-${peerId}`;
  }
  function attachStream(stream, peerId) {
    const videoId = elementId(peerId, "video");
    const audioId = elementId(peerId, "audio");
    let video = document.getElementById(videoId);
    let audio = document.getElementById(audioId);
    video.srcObject = stream;
    audio.srcObject = stream;
  }
  function addVideoElement(peerId, label, isLocalVideo) {
    const videoId = elementId(peerId, "video");
    const audioId = elementId(peerId, "audio");
    let video = document.getElementById(videoId);
    let audio = document.getElementById(audioId);
    if (!video && !audio) {
      const values = setupVideoFeed(peerId, label, isLocalVideo);
      video = values.video;
      audio = values.audio;
    }
    video.id = videoId;
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    audio.id = audioId;
    audio.autoplay = true;
    if (isLocalVideo) {
      audio.muted = true;
    }
  }
  function setParticipantsList(participants) {
    const participantsNamesEl = document.getElementById("participants-list");
    participantsNamesEl.innerHTML =
      "<b>Participants</b>: " + participants.join(", ");
  }
  function resizeVideosGrid() {
    const grid = document.getElementById("videos-grid");
    const videos = grid.children.length;
    let videosPerRow;
    if (videos < 2) {
      videosPerRow = 1;
    } else if (videos < 5) {
      videosPerRow = 2;
    } else if (videos < 7) {
      videosPerRow = 3;
    } else {
      videosPerRow = 4;
    }
    let classesToRemove = [];
    for (const [index, value] of grid.classList.entries()) {
      if (value.includes("grid-cols")) {
        classesToRemove.push(value);
      }
    }
    classesToRemove.forEach((className) => grid.classList.remove(className));
    grid.classList.add("grid-cols-1");
    grid.classList.add(`md:grid-cols-${videosPerRow}`);
  }
  function setupVideoFeed(peerId, label, isLocalVideo) {
    const copy = document
      .querySelector("#video-feed-template")
      .content.cloneNode(true);
    const feed = copy.querySelector("div[name='video-feed']");
    const audio = feed.querySelector("audio");
    const video = feed.querySelector("video");
    const videoLabel = feed.querySelector("div[name='video-label']");
    feed.id = elementId(peerId, "feed");
    videoLabel.innerText = label;
    if (isLocalVideo) {
      video.classList.add("flip-horizontally");
    }
    const grid = document.querySelector("#videos-grid");
    grid.appendChild(feed);
    resizeVideosGrid();
    return { audio, video };
  }
  function removeVideoElement(peerId) {
    var _a;
    (_a = document.getElementById(elementId(peerId, "feed"))) == null
      ? void 0
      : _a.remove();
    resizeVideosGrid();
  }
  function setErrorMessage(
    message = "Cannot connect to server, refresh the page and try again"
  ) {
    const errorContainer = document.getElementById("videochat-error");
    if (errorContainer) {
      errorContainer.innerHTML = message;
      errorContainer.style.display = "block";
    }
  }

  // src/room.ts
  var import_membrane_webrtc_js = __toModule(require_dist());

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure2 = function () {
        return value;
      };
      return closure2;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || global;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving",
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave",
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket",
  };
  var XHR_STATES = {
    complete: 4,
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload =
        payload ||
        function () {
          return {};
        };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef(),
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks
        .filter((h) => h.status === status)
        .forEach((h) => h.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(
        this,
        CHANNEL_EVENTS.join,
        this.params,
        this.timeout
      );
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(
        this.socket.onError(() => this.rejoinTimer.reset())
      );
      this.stateChangeRefs.push(
        this.socket.onOpen(() => {
          this.rejoinTimer.reset();
          if (this.isErrored()) {
            this.rejoin();
          }
        })
      );
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log(
            "channel",
            `timeout ${this.topic} (${this.joinRef()})`,
            this.joinPush.timeout
          );
        let leavePush = new Push(
          this,
          CHANNEL_EVENTS.leave,
          closure({}),
          this.timeout
        );
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error(
          "tried to join multiple times. 'join' can only be called a single time per channel instance"
        );
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(
          bind.event === event &&
          (typeof ref === "undefined" || ref === bind.ref)
        );
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(
          `tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`
        );
      }
      let pushEvent = new Push(
        this,
        event,
        function () {
          return payload;
        },
        timeout
      );
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(
        this,
        CHANNEL_EVENTS.leave,
        closure({}),
        timeout
      );
      leavePush
        .receive("ok", () => onClose())
        .receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", {
            topic,
            event,
            payload,
            joinRef,
          });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error(
          "channel onMessage callbacks must return the payload, modified or unmodified"
        );
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(
      method,
      endPoint,
      accept,
      body,
      timeout,
      ontimeout,
      callback
    ) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        return this.xdomainRequest(
          req,
          method,
          endPoint,
          body,
          timeout,
          ontimeout,
          callback
        );
      } else {
        let req = new global.XMLHttpRequest();
        return this.xhrRequest(
          req,
          method,
          endPoint,
          accept,
          body,
          timeout,
          ontimeout,
          callback
        );
      }
    }
    static xdomainRequest(
      req,
      method,
      endPoint,
      body,
      timeout,
      ontimeout,
      callback
    ) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {};
      req.send(body);
      return req;
    }
    static xhrRequest(
      req,
      method,
      endPoint,
      accept,
      body,
      timeout,
      ontimeout,
      callback
    ) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(
            encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal)
          );
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.onopen = function () {};
      this.onerror = function () {};
      this.onmessage = function () {};
      this.onclose = function () {};
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      this.poll();
    }
    normalizeEndpoint(endPoint) {
      return endPoint
        .replace("ws://", "http://")
        .replace("wss://", "https://")
        .replace(
          new RegExp("(.*)/" + TRANSPORTS.websocket),
          "$1/" + TRANSPORTS.longpoll
        );
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return (
        this.readyState === SOCKET_STATES.open ||
        this.readyState === SOCKET_STATES.connecting
      );
    }
    poll() {
      this.ajax(
        "GET",
        null,
        () => this.ontimeout(),
        (resp) => {
          if (resp) {
            var { status, token, messages } = resp;
            this.token = token;
          } else {
            status = 0;
          }
          switch (status) {
            case 200:
              messages.forEach((msg) => {
                setTimeout(() => this.onmessage({ data: msg }), 0);
              });
              this.poll();
              break;
            case 204:
              this.poll();
              break;
            case 410:
              this.readyState = SOCKET_STATES.open;
              this.onopen({});
              this.poll();
              break;
            case 403:
              this.onerror(403);
              this.close(1008, "forbidden", false);
              break;
            case 0:
            case 500:
              this.onerror(500);
              this.closeAndRetry(1011, "internal server error", 500);
              break;
            default:
              throw new Error(`unhandled poll status ${status}`);
          }
        }
      );
    }
    send(body) {
      this.ajax(
        "POST",
        body,
        () => this.onerror("timeout"),
        (resp) => {
          if (!resp || resp.status !== 200) {
            this.onerror(resp && resp.status);
            this.closeAndRetry(1011, "internal server error", false);
          }
        }
      );
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign(
        { code: 1e3, reason: void 0, wasClean: true },
        { code, reason, wasClean }
      );
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(
        method,
        this.endpointURL(),
        "application/json",
        body,
        this.timeout,
        ontimeout,
        (resp) => {
          this.reqs.delete(req);
          if (this.isActive()) {
            callback(resp);
          }
        }
      );
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [
          msg.join_ref,
          msg.ref,
          msg.topic,
          msg.event,
          msg.payload,
        ];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength =
        this.META_LENGTH +
        join_ref.length +
        ref.length +
        topic.length +
        event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) =>
        view.setUint8(offset++, char.charCodeAt(0))
      );
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return {
        join_ref: joinRef,
        ref,
        topic,
        event: CHANNEL_EVENTS.reply,
        payload,
      };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    },
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: [],
      };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.sendBuffer = [];
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(
        Ajax.appendParams(this.endPoint, this.params()),
        { vsn: this.vsn }
      );
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      if (params) {
        console &&
          console.log(
            "passing params to connect is deprecated. Instead pass :params to the Socket constructor"
          );
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log(
            "transport",
            "heartbeat timeout. Attempting to re-establish connection"
          );
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(
          () => this.reconnectTimer.scheduleTimeout(),
          WS_CLOSE_NORMAL,
          "heartbeat timeout"
        );
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(
        () => this.sendHeartbeat(),
        this.heartbeatIntervalMs
      );
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onopen = function () {};
            this.conn.onerror = function () {};
            this.conn.onmessage = function () {};
            this.conn.onclose = function () {};
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (
        tries === 5 ||
        !this.conn ||
        this.conn.readyState === SOCKET_STATES.closed
      ) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger()) this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) =>
        callback(event)
      );
    }
    onConnError(error) {
      if (this.hasLogger()) this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (
          !(channel.isErrored() || channel.isLeaving() || channel.isClosed())
        ) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter(
        (c) => c.joinRef() !== channel.joinRef()
      );
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(
          ([ref]) => {
            return refs.indexOf(ref) === -1;
          }
        );
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() =>
          this.encode(data, (result) => this.conn.send(result))
        );
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: this.pendingHeartbeatRef,
      });
      this.heartbeatTimeoutTimer = setTimeout(
        () => this.heartbeatTimeout(),
        this.heartbeatIntervalMs
      );
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(
            () => this.sendHeartbeat(),
            this.heartbeatIntervalMs
          );
        }
        if (this.hasLogger())
          this.log(
            "receive",
            `${payload.status || ""} ${topic} ${event} ${
              (ref && "(" + ref + ")") || ""
            }`,
            payload
          );
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find(
        (c) => c.topic === topic && (c.isJoined() || c.isJoining())
      );
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // src/room.ts
  var import_query_string = __toModule(require_query_string());
  var Room = class {
    constructor() {
      this.peers = [];
      this.webrtcSocketRefs = [];
      this.join = () =>
        __async(this, null, function* () {
          try {
            yield this.init();
            setupDisconnectButton(() => {
              this.leave();
              window.location.replace("");
            });
            this.webrtc.join({ displayName: this.displayName });
          } catch (error) {
            console.error("Error while joining to the room:", error);
          }
        });
      this.init = () =>
        __async(this, null, function* () {
          try {
            // this.localStream = yield navigator.mediaDevices.getUserMedia(
            this.localStream = yield navigator.mediaDevices.getDisplayMedia(
              MEDIA_CONSTRAINTS
            );
          } catch (error) {
            console.error(error);
            setErrorMessage(
              "Failed to setup video room, make sure to grant camera and microphone permissions"
            );
            throw "error";
          }
          addVideoElement(LOCAL_PEER_ID, "Me", true);
          attachStream(this.localStream, LOCAL_PEER_ID);
          yield this.phoenixChannelPushResult(this.webrtcChannel.join());
        });
      this.leave = () => {
        this.webrtc.leave();
        this.webrtcChannel.leave();
        this.socketOff();
      };
      this.socketOff = () => {
        this.socket.off(this.webrtcSocketRefs);
        while (this.webrtcSocketRefs.length > 0) {
          this.webrtcSocketRefs.pop();
        }
      };
      this.parseUrl = () => {
        const { display_name: displayName } = (0, import_query_string.parse)(
          document.location.search
        );
        window.history.replaceState(null, "", window.location.pathname);
        return displayName;
      };
      this.updateParticipantsList = () => {
        const participantsNames = this.peers.map((p) => p.metadata.displayName);
        if (this.displayName) {
          participantsNames.push(this.displayName);
        }
        setParticipantsList(participantsNames);
      };
      this.phoenixChannelPushResult = (push) =>
        __async(this, null, function* () {
          return new Promise((resolve, reject) => {
            push
              .receive("ok", (response) => resolve(response))
              .receive("error", (response) => reject(response));
          });
        });
      this.socket = new Socket("ws://localhost:4001/socket");
      // this.socket = new Socket("/socket");
      this.socket.connect();
      this.displayName = this.parseUrl();
      this.webrtcChannel = this.socket.channel(`room:${getRoomId()}`);
      this.webrtcChannel.onError(() => {
        this.socketOff();
        window.location.reload();
      });
      this.webrtcChannel.onClose(() => {
        this.socketOff();
        window.location.reload();
      });
      this.webrtcSocketRefs.push(this.socket.onError(this.leave));
      this.webrtcSocketRefs.push(this.socket.onClose(this.leave));
      this.webrtc = new import_membrane_webrtc_js.MembraneWebRTC({
        callbacks: {
          onSendMediaEvent: (mediaEvent) => {
            this.webrtcChannel.push("mediaEvent", { data: mediaEvent });
          },
          onConnectionError: setErrorMessage,
          onJoinSuccess: (peerId, peersInRoom) => {
            this.localStream
              .getTracks()
              .forEach((track) =>
                this.webrtc.addTrack(track, this.localStream, {})
              );
            this.peers = peersInRoom;
            this.peers.forEach((peer) => {
              addVideoElement(peer.id, peer.metadata.displayName, false);
            });
            this.updateParticipantsList();
          },
          onJoinError: (metadata) => {
            throw `Peer denied.`;
          },
          onTrackReady: ({ stream, peer, metadata }) => {
            attachStream(stream, peer.id);
          },
          onTrackAdded: (ctx) => {},
          onTrackRemoved: (ctx) => {},
          onPeerJoined: (peer) => {
            this.peers.push(peer);
            this.updateParticipantsList();
            addVideoElement(peer.id, peer.metadata.displayName, false);
          },
          onPeerLeft: (peer) => {
            this.peers = this.peers.filter((p) => p.id !== peer.id);
            removeVideoElement(peer.id);
            this.updateParticipantsList();
          },
          onPeerUpdated: (ctx) => {},
        },
      });
      this.webrtcChannel.on("mediaEvent", (event) =>
        this.webrtc.receiveMediaEvent(event.data)
      );
    }
  };

  // src/index.ts
  var room = new Room();
  room.join();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9AbWVtYnJhbmVmcmFtZXdvcmsvbWVtYnJhbmUtd2VicnRjLWpzL2Rpc3QvbWVkaWFFdmVudC5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwgIi4uLy4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3YxLmpzIiwgIi4uLy4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3BhcnNlLmpzIiwgIi4uLy4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3YzNS5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9tZDUuanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjMuanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc2hhMS5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NS5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uaWwuanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmVyc2lvbi5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0BtZW1icmFuZWZyYW1ld29yay9tZW1icmFuZS13ZWJydGMtanMvZGlzdC9jb25zdC5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0BtZW1icmFuZWZyYW1ld29yay9tZW1icmFuZS13ZWJydGMtanMvZGlzdC9tZW1icmFuZVdlYlJUQy5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL0BtZW1icmFuZWZyYW1ld29yay9tZW1icmFuZS13ZWJydGMtanMvZGlzdC9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3N0cmljdC11cmktZW5jb2RlL2luZGV4LmpzIiwgIi4uLy4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvZGVjb2RlLXVyaS1jb21wb25lbnQvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9zcGxpdC1vbi1maXJzdC9pbmRleC5qcyIsICIuLi8uLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL2ZpbHRlci1vYmovaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL3NyYy9jb25zdHMudHMiLCAiLi4vLi4vLi4vLi4vYXNzZXRzL3NyYy9yb29tX3VpLnRzIiwgIi4uLy4uLy4uLy4uL2Fzc2V0cy9zcmMvcm9vbS50cyIsICIuLi8uLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvdXRpbHMuanMiLCAiLi4vLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L2NvbnN0YW50cy5qcyIsICIuLi8uLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvcHVzaC5qcyIsICIuLi8uLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvdGltZXIuanMiLCAiLi4vLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L2NoYW5uZWwuanMiLCAiLi4vLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L2FqYXguanMiLCAiLi4vLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L2xvbmdwb2xsLmpzIiwgIi4uLy4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wcmVzZW5jZS5qcyIsICIuLi8uLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvc2VyaWFsaXplci5qcyIsICIuLi8uLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvc29ja2V0LmpzIiwgIi4uLy4uLy4uLy4uL2Fzc2V0cy9zcmMvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZW5lcmF0ZUN1c3RvbUV2ZW50ID0gZXhwb3J0cy5nZW5lcmF0ZU1lZGlhRXZlbnQgPSBleHBvcnRzLmRlc2VyaWFsaXplTWVkaWFFdmVudCA9IGV4cG9ydHMuc2VyaWFsaXplTWVkaWFFdmVudCA9IHZvaWQgMDtcbmZ1bmN0aW9uIHNlcmlhbGl6ZU1lZGlhRXZlbnQobWVkaWFFdmVudCkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtZWRpYUV2ZW50KTtcbn1cbmV4cG9ydHMuc2VyaWFsaXplTWVkaWFFdmVudCA9IHNlcmlhbGl6ZU1lZGlhRXZlbnQ7XG5mdW5jdGlvbiBkZXNlcmlhbGl6ZU1lZGlhRXZlbnQoc2VyaWFsaXplZE1lZGlhRXZlbnQpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShzZXJpYWxpemVkTWVkaWFFdmVudCk7XG59XG5leHBvcnRzLmRlc2VyaWFsaXplTWVkaWFFdmVudCA9IGRlc2VyaWFsaXplTWVkaWFFdmVudDtcbmZ1bmN0aW9uIGdlbmVyYXRlTWVkaWFFdmVudCh0eXBlLCBkYXRhKSB7XG4gICAgdmFyIGV2ZW50ID0geyB0eXBlIH07XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgICAgZXZlbnQgPSB7IC4uLmV2ZW50LCBkYXRhIH07XG4gICAgfVxuICAgIHJldHVybiBldmVudDtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVNZWRpYUV2ZW50ID0gZ2VuZXJhdGVNZWRpYUV2ZW50O1xuZnVuY3Rpb24gZ2VuZXJhdGVDdXN0b21FdmVudChkYXRhKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlTWVkaWFFdmVudChcImN1c3RvbVwiLCBkYXRhKTtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVDdXN0b21FdmVudCA9IGdlbmVyYXRlQ3VzdG9tRXZlbnQ7XG4iLCAiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG52YXIgZ2V0UmFuZG9tVmFsdWVzO1xudmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uIEFsc28sXG4gICAgLy8gZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIChtc0NyeXB0bykgb24gSUUxMS5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pIHx8IHR5cGVvZiBtc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsICJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwgImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsICJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSkpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICB2YXIgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCAiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJzsgLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG52YXIgX25vZGVJZDtcblxudmFyIF9jbG9ja3NlcTsgLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG5cblxudmFyIF9sYXN0TVNlY3MgPSAwO1xudmFyIF9sYXN0TlNlY3MgPSAwOyAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkIGZvciBBUEkgZGV0YWlsc1xuXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgbmV3IEFycmF5KDE2KTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7IC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuXG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtzZWVkQnl0ZXNbMF0gfCAweDAxLCBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XV07XG4gICAgfVxuXG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9IC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuXG5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IERhdGUubm93KCk7IC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcblxuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7IC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcblxuICB2YXIgZHQgPSBtc2VjcyAtIF9sYXN0TVNlY3MgKyAobnNlY3MgLSBfbGFzdE5TZWNzKSAvIDEwMDAwOyAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG5cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfSAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG5cblxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfSAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG5cblxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1dWlkLnYxKCk6IENhbid0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlY1wiKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTsgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG5cbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7IC8vIGB0aW1lX2xvd2BcblxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmOyAvLyBgdGltZV9taWRgXG5cbiAgdmFyIHRtaCA9IG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjsgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcblxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG5cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7IC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDsgLy8gYGNsb2NrX3NlcV9sb3dgXG5cbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmOyAvLyBgbm9kZWBcblxuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgfHwgc3RyaW5naWZ5KGIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2MTsiLCAiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuXG5mdW5jdGlvbiBwYXJzZSh1dWlkKSB7XG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgdmFyIHY7XG4gIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxNik7IC8vIFBhcnNlICMjIyMjIyMjLS4uLi4tLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFyclswXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgwLCA4KSwgMTYpKSA+Pj4gMjQ7XG4gIGFyclsxXSA9IHYgPj4+IDE2ICYgMHhmZjtcbiAgYXJyWzJdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclszXSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0jIyMjLS4uLi4tLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoOSwgMTMpLCAxNikpID4+PiA4O1xuICBhcnJbNV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0jIyMjLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzZdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxOCksIDE2KSkgPj4+IDg7XG4gIGFycls3XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLS4uLi4tIyMjIy0uLi4uLi4uLi4uLi5cblxuICBhcnJbOF0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTksIDIzKSwgMTYpKSA+Pj4gODtcbiAgYXJyWzldID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0uLi4uLSMjIyMjIyMjIyMjI1xuICAvLyAoVXNlIFwiL1wiIHRvIGF2b2lkIDMyLWJpdCB0cnVuY2F0aW9uIHdoZW4gYml0LXNoaWZ0aW5nIGhpZ2gtb3JkZXIgYnl0ZXMpXG5cbiAgYXJyWzEwXSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgyNCwgMzYpLCAxNikpIC8gMHgxMDAwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMV0gPSB2IC8gMHgxMDAwMDAwMDAgJiAweGZmO1xuICBhcnJbMTJdID0gdiA+Pj4gMjQgJiAweGZmO1xuICBhcnJbMTNdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMTRdID0gdiA+Pj4gOCAmIDB4ZmY7XG4gIGFyclsxNV0gPSB2ICYgMHhmZjtcbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2U7IiwgImltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UuanMnO1xuXG5mdW5jdGlvbiBzdHJpbmdUb0J5dGVzKHN0cikge1xuICBzdHIgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSk7IC8vIFVURjggZXNjYXBlXG5cbiAgdmFyIGJ5dGVzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlcztcbn1cblxuZXhwb3J0IHZhciBETlMgPSAnNmJhN2I4MTAtOWRhZC0xMWQxLTgwYjQtMDBjMDRmZDQzMGM4JztcbmV4cG9ydCB2YXIgVVJMID0gJzZiYTdiODExLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobmFtZSwgdmVyc2lvbiwgaGFzaGZ1bmMpIHtcbiAgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKHZhbHVlLCBuYW1lc3BhY2UsIGJ1Ziwgb2Zmc2V0KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gc3RyaW5nVG9CeXRlcyh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuYW1lc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lc3BhY2UgPSBwYXJzZShuYW1lc3BhY2UpO1xuICAgIH1cblxuICAgIGlmIChuYW1lc3BhY2UubGVuZ3RoICE9PSAxNikge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdOYW1lc3BhY2UgbXVzdCBiZSBhcnJheS1saWtlICgxNiBpdGVyYWJsZSBpbnRlZ2VyIHZhbHVlcywgMC0yNTUpJyk7XG4gICAgfSAvLyBDb21wdXRlIGhhc2ggb2YgbmFtZXNwYWNlIGFuZCB2YWx1ZSwgUGVyIDQuM1xuICAgIC8vIEZ1dHVyZTogVXNlIHNwcmVhZCBzeW50YXggd2hlbiBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3JtcywgZS5nLiBgYnl0ZXMgPVxuICAgIC8vIGhhc2hmdW5jKFsuLi5uYW1lc3BhY2UsIC4uLiB2YWx1ZV0pYFxuXG5cbiAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNiArIHZhbHVlLmxlbmd0aCk7XG4gICAgYnl0ZXMuc2V0KG5hbWVzcGFjZSk7XG4gICAgYnl0ZXMuc2V0KHZhbHVlLCBuYW1lc3BhY2UubGVuZ3RoKTtcbiAgICBieXRlcyA9IGhhc2hmdW5jKGJ5dGVzKTtcbiAgICBieXRlc1s2XSA9IGJ5dGVzWzZdICYgMHgwZiB8IHZlcnNpb247XG4gICAgYnl0ZXNbOF0gPSBieXRlc1s4XSAmIDB4M2YgfCAweDgwO1xuXG4gICAgaWYgKGJ1Zikge1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlc1tpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaW5naWZ5KGJ5dGVzKTtcbiAgfSAvLyBGdW5jdGlvbiNuYW1lIGlzIG5vdCBzZXR0YWJsZSBvbiBzb21lIHBsYXRmb3JtcyAoIzI3MClcblxuXG4gIHRyeSB7XG4gICAgZ2VuZXJhdGVVVUlELm5hbWUgPSBuYW1lOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHlcbiAgfSBjYXRjaCAoZXJyKSB7fSAvLyBGb3IgQ29tbW9uSlMgZGVmYXVsdCBleHBvcnQgc3VwcG9ydFxuXG5cbiAgZ2VuZXJhdGVVVUlELkROUyA9IEROUztcbiAgZ2VuZXJhdGVVVUlELlVSTCA9IFVSTDtcbiAgcmV0dXJuIGdlbmVyYXRlVVVJRDtcbn0iLCAiLypcbiAqIEJyb3dzZXItY29tcGF0aWJsZSBKYXZhU2NyaXB0IE1ENVxuICpcbiAqIE1vZGlmaWNhdGlvbiBvZiBKYXZhU2NyaXB0IE1ENVxuICogaHR0cHM6Ly9naXRodWIuY29tL2JsdWVpbXAvSmF2YVNjcmlwdC1NRDVcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMSwgU2ViYXN0aWFuIFRzY2hhblxuICogaHR0cHM6Ly9ibHVlaW1wLm5ldFxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKlxuICogQmFzZWQgb25cbiAqIEEgSmF2YVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUlNBIERhdGEgU2VjdXJpdHksIEluYy4gTUQ1IE1lc3NhZ2VcbiAqIERpZ2VzdCBBbGdvcml0aG0sIGFzIGRlZmluZWQgaW4gUkZDIDEzMjEuXG4gKiBWZXJzaW9uIDIuMiBDb3B5cmlnaHQgKEMpIFBhdWwgSm9obnN0b24gMTk5OSAtIDIwMDlcbiAqIE90aGVyIGNvbnRyaWJ1dG9yczogR3JlZyBIb2x0LCBBbmRyZXcgS2VwZXJ0LCBZZG5hciwgTG9zdGluZXRcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgTGljZW5zZVxuICogU2VlIGh0dHA6Ly9wYWpob21lLm9yZy51ay9jcnlwdC9tZDUgZm9yIG1vcmUgaW5mby5cbiAqL1xuZnVuY3Rpb24gbWQ1KGJ5dGVzKSB7XG4gIGlmICh0eXBlb2YgYnl0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShtc2cubGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlc1tpXSA9IG1zZy5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZDVUb0hleEVuY29kZWRBcnJheSh3b3Jkc1RvTWQ1KGJ5dGVzVG9Xb3JkcyhieXRlcyksIGJ5dGVzLmxlbmd0aCAqIDgpKTtcbn1cbi8qXG4gKiBDb252ZXJ0IGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMgdG8gYW4gYXJyYXkgb2YgYnl0ZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIG1kNVRvSGV4RW5jb2RlZEFycmF5KGlucHV0KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIGxlbmd0aDMyID0gaW5wdXQubGVuZ3RoICogMzI7XG4gIHZhciBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGgzMjsgaSArPSA4KSB7XG4gICAgdmFyIHggPSBpbnB1dFtpID4+IDVdID4+PiBpICUgMzIgJiAweGZmO1xuICAgIHZhciBoZXggPSBwYXJzZUludChoZXhUYWIuY2hhckF0KHggPj4+IDQgJiAweDBmKSArIGhleFRhYi5jaGFyQXQoeCAmIDB4MGYpLCAxNik7XG4gICAgb3V0cHV0LnB1c2goaGV4KTtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQ7XG59XG4vKipcbiAqIENhbGN1bGF0ZSBvdXRwdXQgbGVuZ3RoIHdpdGggcGFkZGluZyBhbmQgYml0IGxlbmd0aFxuICovXG5cblxuZnVuY3Rpb24gZ2V0T3V0cHV0TGVuZ3RoKGlucHV0TGVuZ3RoOCkge1xuICByZXR1cm4gKGlucHV0TGVuZ3RoOCArIDY0ID4+PiA5IDw8IDQpICsgMTQgKyAxO1xufVxuLypcbiAqIENhbGN1bGF0ZSB0aGUgTUQ1IG9mIGFuIGFycmF5IG9mIGxpdHRsZS1lbmRpYW4gd29yZHMsIGFuZCBhIGJpdCBsZW5ndGguXG4gKi9cblxuXG5mdW5jdGlvbiB3b3Jkc1RvTWQ1KHgsIGxlbikge1xuICAvKiBhcHBlbmQgcGFkZGluZyAqL1xuICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IGxlbiAlIDMyO1xuICB4W2dldE91dHB1dExlbmd0aChsZW4pIC0gMV0gPSBsZW47XG4gIHZhciBhID0gMTczMjU4NDE5MztcbiAgdmFyIGIgPSAtMjcxNzMzODc5O1xuICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xuICB2YXIgZCA9IDI3MTczMzg3ODtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgdmFyIG9sZGEgPSBhO1xuICAgIHZhciBvbGRiID0gYjtcbiAgICB2YXIgb2xkYyA9IGM7XG4gICAgdmFyIG9sZGQgPSBkO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2ldLCA3LCAtNjgwODc2OTM2KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgMV0sIDEyLCAtMzg5NTY0NTg2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMl0sIDE3LCA2MDYxMDU4MTkpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgNF0sIDcsIC0xNzY0MTg4OTcpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA1XSwgMTIsIDEyMDAwODA0MjYpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTcsIC0xNDczMjMxMzQxKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgN10sIDIyLCAtNDU3MDU5ODMpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNywgMTc3MDAzNTQxNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE3LCAtNDIwNjMpO1xuICAgIGIgPSBtZDVmZihiLCBjLCBkLCBhLCB4W2kgKyAxMV0sIDIyLCAtMTk5MDQwNDE2Mik7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNywgMTgwNDYwMzY4Mik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDEzXSwgMTIsIC00MDM0MTEwMSk7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTVdLCAyMiwgMTIzNjUzNTMyOSk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA1LCAtMTY1Nzk2NTEwKTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgNl0sIDksIC0xMDY5NTAxNjMyKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNCwgNjQzNzE3NzEzKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpXSwgMjAsIC0zNzM4OTczMDIpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA1XSwgNSwgLTcwMTU1ODY5MSk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDEwXSwgOSwgMzgwMTYwODMpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE0LCAtNjYwNDc4MzM1KTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgOV0sIDUsIDU2ODQ0NjQzOCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDE0XSwgOSwgLTEwMTk4MDM2OTApO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTQsIC0xODczNjM5NjEpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA4XSwgMjAsIDExNjM1MzE1MDEpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxM10sIDUsIC0xNDQ0NjgxNDY3KTtcbiAgICBkID0gbWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMl0sIDksIC01MTQwMzc4NCk7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNCwgMTczNTMyODQ3Myk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgNV0sIDQsIC0zNzg1NTgpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2Mik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MCk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNiwgLTE1NTQ5NzYzMik7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCA0LCA2ODEyNzkxNzQpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2ldLCAxMSwgLTM1ODUzNzIyMik7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSk7XG4gICAgYiA9IG1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNCwgLTY0MDM2NDQ4Nyk7XG4gICAgZCA9IG1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2ldLCA2LCAtMTk4NjMwODQ0KTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgN10sIDEwLCAxMTI2ODkxNDE1KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyA1XSwgMjEsIC01NzQzNDA1NSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDEyXSwgNiwgMTcwMDQ4NTU3MSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAxMF0sIDE1LCAtMTA1MTUyMyk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyA4XSwgNiwgMTg3MzMxMzM1OSk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDE1XSwgMTAsIC0zMDYxMTc0NCk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDZdLCAxNSwgLTE1NjAxOTgzODApO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxM10sIDIxLCAxMzA5MTUxNjQ5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgNF0sIDYsIC0xNDU1MjMwNzApO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNSwgNzE4Nzg3MjU5KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgOV0sIDIxLCAtMzQzNDg1NTUxKTtcbiAgICBhID0gc2FmZUFkZChhLCBvbGRhKTtcbiAgICBiID0gc2FmZUFkZChiLCBvbGRiKTtcbiAgICBjID0gc2FmZUFkZChjLCBvbGRjKTtcbiAgICBkID0gc2FmZUFkZChkLCBvbGRkKTtcbiAgfVxuXG4gIHJldHVybiBbYSwgYiwgYywgZF07XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBieXRlcyB0byBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzXG4gKiBDaGFyYWN0ZXJzID4yNTUgaGF2ZSB0aGVpciBoaWdoLWJ5dGUgc2lsZW50bHkgaWdub3JlZC5cbiAqL1xuXG5cbmZ1bmN0aW9uIGJ5dGVzVG9Xb3JkcyhpbnB1dCkge1xuICBpZiAoaW5wdXQubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIGxlbmd0aDggPSBpbnB1dC5sZW5ndGggKiA4O1xuICB2YXIgb3V0cHV0ID0gbmV3IFVpbnQzMkFycmF5KGdldE91dHB1dExlbmd0aChsZW5ndGg4KSk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg4OyBpICs9IDgpIHtcbiAgICBvdXRwdXRbaSA+PiA1XSB8PSAoaW5wdXRbaSAvIDhdICYgMHhmZikgPDwgaSAlIDMyO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qXG4gKiBBZGQgaW50ZWdlcnMsIHdyYXBwaW5nIGF0IDJeMzIuIFRoaXMgdXNlcyAxNi1iaXQgb3BlcmF0aW9ucyBpbnRlcm5hbGx5XG4gKiB0byB3b3JrIGFyb3VuZCBidWdzIGluIHNvbWUgSlMgaW50ZXJwcmV0ZXJzLlxuICovXG5cblxuZnVuY3Rpb24gc2FmZUFkZCh4LCB5KSB7XG4gIHZhciBsc3cgPSAoeCAmIDB4ZmZmZikgKyAoeSAmIDB4ZmZmZik7XG4gIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIG1zdyA8PCAxNiB8IGxzdyAmIDB4ZmZmZjtcbn1cbi8qXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gKi9cblxuXG5mdW5jdGlvbiBiaXRSb3RhdGVMZWZ0KG51bSwgY250KSB7XG4gIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbn1cbi8qXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICovXG5cblxuZnVuY3Rpb24gbWQ1Y21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIHNhZmVBZGQoYml0Um90YXRlTGVmdChzYWZlQWRkKHNhZmVBZGQoYSwgcSksIHNhZmVBZGQoeCwgdCkpLCBzKSwgYik7XG59XG5cbmZ1bmN0aW9uIG1kNWZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgYyB8IH5iICYgZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgZCB8IGMgJiB+ZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWhoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVpaShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYyBeIChiIHwgfmQpLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWQ1OyIsICJpbXBvcnQgdjM1IGZyb20gJy4vdjM1LmpzJztcbmltcG9ydCBtZDUgZnJvbSAnLi9tZDUuanMnO1xudmFyIHYzID0gdjM1KCd2MycsIDB4MzAsIG1kNSk7XG5leHBvcnQgZGVmYXVsdCB2MzsiLCAiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwgIi8vIEFkYXB0ZWQgZnJvbSBDaHJpcyBWZW5lc3MnIFNIQTEgY29kZSBhdFxuLy8gaHR0cDovL3d3dy5tb3ZhYmxlLXR5cGUuY28udWsvc2NyaXB0cy9zaGExLmh0bWxcbmZ1bmN0aW9uIGYocywgeCwgeSwgeikge1xuICBzd2l0Y2ggKHMpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4geCAmIHkgXiB+eCAmIHo7XG5cbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuXG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHggJiB5IF4geCAmIHogXiB5ICYgejtcblxuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiB4IF4geSBeIHo7XG4gIH1cbn1cblxuZnVuY3Rpb24gUk9UTCh4LCBuKSB7XG4gIHJldHVybiB4IDw8IG4gfCB4ID4+PiAzMiAtIG47XG59XG5cbmZ1bmN0aW9uIHNoYTEoYnl0ZXMpIHtcbiAgdmFyIEsgPSBbMHg1YTgyNzk5OSwgMHg2ZWQ5ZWJhMSwgMHg4ZjFiYmNkYywgMHhjYTYyYzFkNl07XG4gIHZhciBIID0gWzB4Njc0NTIzMDEsIDB4ZWZjZGFiODksIDB4OThiYWRjZmUsIDB4MTAzMjU0NzYsIDB4YzNkMmUxZjBdO1xuXG4gIGlmICh0eXBlb2YgYnl0ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFyIG1zZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChieXRlcykpOyAvLyBVVEY4IGVzY2FwZVxuXG4gICAgYnl0ZXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgKytpKSB7XG4gICAgICBieXRlcy5wdXNoKG1zZy5jaGFyQ29kZUF0KGkpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoYnl0ZXMpKSB7XG4gICAgLy8gQ29udmVydCBBcnJheS1saWtlIHRvIEFycmF5XG4gICAgYnl0ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChieXRlcyk7XG4gIH1cblxuICBieXRlcy5wdXNoKDB4ODApO1xuICB2YXIgbCA9IGJ5dGVzLmxlbmd0aCAvIDQgKyAyO1xuICB2YXIgTiA9IE1hdGguY2VpbChsIC8gMTYpO1xuICB2YXIgTSA9IG5ldyBBcnJheShOKTtcblxuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgTjsgKytfaSkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDMyQXJyYXkoMTYpO1xuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tfaSAqIDY0ICsgaiAqIDRdIDw8IDI0IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgMV0gPDwgMTYgfCBieXRlc1tfaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbX2kgKiA2NCArIGogKiA0ICsgM107XG4gICAgfVxuXG4gICAgTVtfaV0gPSBhcnI7XG4gIH1cblxuICBNW04gLSAxXVsxNF0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4IC8gTWF0aC5wb3coMiwgMzIpO1xuICBNW04gLSAxXVsxNF0gPSBNYXRoLmZsb29yKE1bTiAtIDFdWzE0XSk7XG4gIE1bTiAtIDFdWzE1XSA9IChieXRlcy5sZW5ndGggLSAxKSAqIDggJiAweGZmZmZmZmZmO1xuXG4gIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IE47ICsrX2kyKSB7XG4gICAgdmFyIFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuXG4gICAgZm9yICh2YXIgdCA9IDA7IHQgPCAxNjsgKyt0KSB7XG4gICAgICBXW3RdID0gTVtfaTJdW3RdO1xuICAgIH1cblxuICAgIGZvciAodmFyIF90ID0gMTY7IF90IDwgODA7ICsrX3QpIHtcbiAgICAgIFdbX3RdID0gUk9UTChXW190IC0gM10gXiBXW190IC0gOF0gXiBXW190IC0gMTRdIF4gV1tfdCAtIDE2XSwgMSk7XG4gICAgfVxuXG4gICAgdmFyIGEgPSBIWzBdO1xuICAgIHZhciBiID0gSFsxXTtcbiAgICB2YXIgYyA9IEhbMl07XG4gICAgdmFyIGQgPSBIWzNdO1xuICAgIHZhciBlID0gSFs0XTtcblxuICAgIGZvciAodmFyIF90MiA9IDA7IF90MiA8IDgwOyArK190Mikge1xuICAgICAgdmFyIHMgPSBNYXRoLmZsb29yKF90MiAvIDIwKTtcbiAgICAgIHZhciBUID0gUk9UTChhLCA1KSArIGYocywgYiwgYywgZCkgKyBlICsgS1tzXSArIFdbX3QyXSA+Pj4gMDtcbiAgICAgIGUgPSBkO1xuICAgICAgZCA9IGM7XG4gICAgICBjID0gUk9UTChiLCAzMCkgPj4+IDA7XG4gICAgICBiID0gYTtcbiAgICAgIGEgPSBUO1xuICAgIH1cblxuICAgIEhbMF0gPSBIWzBdICsgYSA+Pj4gMDtcbiAgICBIWzFdID0gSFsxXSArIGIgPj4+IDA7XG4gICAgSFsyXSA9IEhbMl0gKyBjID4+PiAwO1xuICAgIEhbM10gPSBIWzNdICsgZCA+Pj4gMDtcbiAgICBIWzRdID0gSFs0XSArIGUgPj4+IDA7XG4gIH1cblxuICByZXR1cm4gW0hbMF0gPj4gMjQgJiAweGZmLCBIWzBdID4+IDE2ICYgMHhmZiwgSFswXSA+PiA4ICYgMHhmZiwgSFswXSAmIDB4ZmYsIEhbMV0gPj4gMjQgJiAweGZmLCBIWzFdID4+IDE2ICYgMHhmZiwgSFsxXSA+PiA4ICYgMHhmZiwgSFsxXSAmIDB4ZmYsIEhbMl0gPj4gMjQgJiAweGZmLCBIWzJdID4+IDE2ICYgMHhmZiwgSFsyXSA+PiA4ICYgMHhmZiwgSFsyXSAmIDB4ZmYsIEhbM10gPj4gMjQgJiAweGZmLCBIWzNdID4+IDE2ICYgMHhmZiwgSFszXSA+PiA4ICYgMHhmZiwgSFszXSAmIDB4ZmYsIEhbNF0gPj4gMjQgJiAweGZmLCBIWzRdID4+IDE2ICYgMHhmZiwgSFs0XSA+PiA4ICYgMHhmZiwgSFs0XSAmIDB4ZmZdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaGExOyIsICJpbXBvcnQgdjM1IGZyb20gJy4vdjM1LmpzJztcbmltcG9ydCBzaGExIGZyb20gJy4vc2hhMS5qcyc7XG52YXIgdjUgPSB2MzUoJ3Y1JywgMHg1MCwgc2hhMSk7XG5leHBvcnQgZGVmYXVsdCB2NTsiLCAiZXhwb3J0IGRlZmF1bHQgJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7IiwgImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcblxuZnVuY3Rpb24gdmVyc2lvbih1dWlkKSB7XG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlSW50KHV1aWQuc3Vic3RyKDE0LCAxKSwgMTYpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2ZXJzaW9uOyIsICJleHBvcnQgeyBkZWZhdWx0IGFzIHYxIH0gZnJvbSAnLi92MS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHYzIH0gZnJvbSAnLi92My5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHY0IH0gZnJvbSAnLi92NC5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHY1IH0gZnJvbSAnLi92NS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE5JTCB9IGZyb20gJy4vbmlsLmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdmVyc2lvbiB9IGZyb20gJy4vdmVyc2lvbi5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHZhbGlkYXRlIH0gZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2UgfSBmcm9tICcuL3BhcnNlLmpzJzsiLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBjb25zdCBURU1QT1JBTF9MQVlFUlNfQ09VTlQgPSAyO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaW11bGNhc3RUcmFuc2NlaXZlckNvbmZpZyA9IHZvaWQgMDtcbmV4cG9ydHMuc2ltdWxjYXN0VHJhbnNjZWl2ZXJDb25maWcgPSB7XG4gICAgZGlyZWN0aW9uOiBcInNlbmRvbmx5XCIsXG4gICAgLy8ga2VlcCB0aGlzIGFycmF5IGZyb20gbG93IHJlc29sdXRpb24gdG8gaGlnaCByZXNvbHV0aW9uXG4gICAgLy8gaW4gb3RoZXIgY2FzZSBsb3dlciByZXNvbHV0aW9uIGVuY29kaW5nIGNhbiBnZXRcbiAgICAvLyBoaWdoZXIgbWF4X2JpdHJhdGVcbiAgICBzZW5kRW5jb2RpbmdzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJpZDogXCJsXCIsXG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgLy8gbWF4Qml0cmF0ZTogNF8wMDBfMDAwLFxuICAgICAgICAgICAgc2NhbGVSZXNvbHV0aW9uRG93bkJ5OiA0LjAsXG4gICAgICAgICAgICAvLyAgIHNjYWxhYmlsaXR5TW9kZTogXCJMMVRcIiArIFRFTVBPUkFMX0xBWUVSU19DT1VOVCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmlkOiBcIm1cIixcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBzY2FsZVJlc29sdXRpb25Eb3duQnk6IDIuMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmlkOiBcImhcIixcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICAvLyBtYXhCaXRyYXRlOiA0XzAwMF8wMDAsXG4gICAgICAgICAgICAvLyBzY2FsYWJpbGl0eU1vZGU6IFwiTDFUXCIgKyBURU1QT1JBTF9MQVlFUlNfQ09VTlQsXG4gICAgICAgIH0sXG4gICAgXSxcbn07XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1lbWJyYW5lV2ViUlRDID0gdm9pZCAwO1xuY29uc3QgbWVkaWFFdmVudF8xID0gcmVxdWlyZShcIi4vbWVkaWFFdmVudFwiKTtcbmNvbnN0IHV1aWRfMSA9IHJlcXVpcmUoXCJ1dWlkXCIpO1xuY29uc3QgY29uc3RfMSA9IHJlcXVpcmUoXCIuL2NvbnN0XCIpO1xuLyoqXG4gKiBNYWluIGNsYXNzIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIGNvbm5lY3RpbmcgdG8gdGhlIFJUQyBFbmdpbmUsIHNlbmRpbmcgYW5kIHJlY2VpdmluZyBtZWRpYS5cbiAqL1xuY2xhc3MgTWVtYnJhbmVXZWJSVEMge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLmxvY2FsVHJhY2tzV2l0aFN0cmVhbXMgPSBbXTtcbiAgICAgICAgdGhpcy50cmFja0lkVG9UcmFjayA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5pZFRvUGVlciA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5sb2NhbFBlZXIgPSB7IGlkOiBcIlwiLCBtZXRhZGF0YToge30sIHRyYWNrSWRUb01ldGFkYXRhOiBuZXcgTWFwKCkgfTtcbiAgICAgICAgdGhpcy5sb2NhbFRyYWNrSWRUb1RyYWNrID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1pZFRvVHJhY2tJZCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZFRyYWNrRW5jb2RpbmdzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnJ0Y0NvbmZpZyA9IHtcbiAgICAgICAgICAgIGljZVNlcnZlcnM6IFtdLFxuICAgICAgICAgICAgaWNlVHJhbnNwb3J0UG9saWN5OiBcInJlbGF5XCIsXG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmllcyB0byBqb2luIHRvIHRoZSBSVEMgRW5naW5lLiBJZiB1c2VyIGlzIGFjY2VwdGVkIHRoZW4ge0BsaW5rIG9uSm9pblN1Y2Nlc3N9XG4gICAgICAgICAqIHdpbGwgYmUgY2FsbGVkLiBJbiBvdGhlciBjYXNlIHtAbGluayBvbkpvaW5FcnJvcn0gaXMgaW52b2tlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHBlZXJNZXRhZGF0YSAtIEFueSBpbmZvcm1hdGlvbiB0aGF0IG90aGVyIHBlZXJzIHdpbGwgcmVjZWl2ZSBpbiB7QGxpbmsgb25QZWVySm9pbmVkfVxuICAgICAgICAgKiBhZnRlciBhY2NlcHRpbmcgdGhpcyBwZWVyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGBgYHRzXG4gICAgICAgICAqIGxldCB3ZWJydGMgPSBuZXcgTWVtYnJhbmVXZWJSVEMoLi4uKVxuICAgICAgICAgKiB3ZWJydGMuam9pbih7ZGlzcGxheU5hbWU6IFwiQm9iXCJ9KVxuICAgICAgICAgKiBgYGBcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuam9pbiA9IChwZWVyTWV0YWRhdGEpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxQZWVyLm1ldGFkYXRhID0gcGVlck1ldGFkYXRhO1xuICAgICAgICAgICAgICAgIGxldCBtZWRpYUV2ZW50ID0gbWVkaWFFdmVudF8xLmdlbmVyYXRlTWVkaWFFdmVudChcImpvaW5cIiwge1xuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YTogcGVlck1ldGFkYXRhLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lZGlhRXZlbnQobWVkaWFFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIChfYiA9IChfYSA9IHRoaXMuY2FsbGJhY2tzKS5vbkNvbm5lY3Rpb25FcnJvcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubGVhdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZlZWRzIG1lZGlhIGV2ZW50IHJlY2VpdmVkIGZyb20gUlRDIEVuZ2luZSB0byB7QGxpbmsgTWVtYnJhbmVXZWJSVEN9LlxuICAgICAgICAgKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgc29tZSBtZWRpYSBldmVudCBmcm9tIFJUQyBFbmdpbmVcbiAgICAgICAgICogd2FzIHJlY2VpdmVkIGFuZCBjYW4gcmVzdWx0IGluIHtAbGluayBNZW1icmFuZVdlYlJUQ30gZ2VuZXJhdGluZyBzb21lIG90aGVyXG4gICAgICAgICAqIG1lZGlhIGV2ZW50cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG1lZGlhRXZlbnQgLSBTdHJpbmcgZGF0YSByZWNlaXZlZCBvdmVyIGN1c3RvbSBzaWduYWxsaW5nIGxheWVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBUaGlzIGV4YW1wbGUgYXNzdW1lcyBwaGVvbml4IGNoYW5uZWxzIGFzIHNpZ25hbGxpbmcgbGF5ZXIuXG4gICAgICAgICAqIEFzIHBob2VuaXggY2hhbm5lbHMgcmVxdWlyZSBvYmplY3RzLCBSVEMgRW5naW5lIGVuY2Fwc3VsYXRlcyBiaW5hcnkgZGF0YSBpbnRvXG4gICAgICAgICAqIG1hcCB3aXRoIG9uZSBmaWVsZCB0aGF0IGlzIGNvbnZlcnRlZCB0byBvYmplY3Qgd2l0aCBvbmUgZmllbGQgb24gdGhlIFRTIHNpZGUuXG4gICAgICAgICAqIGBgYHRzXG4gICAgICAgICAqIHdlYnJ0Y0NoYW5uZWwub24oXCJtZWRpYUV2ZW50XCIsIChldmVudCkgPT4gd2VicnRjLnJlY2VpdmVNZWRpYUV2ZW50KGV2ZW50LmRhdGEpKTtcbiAgICAgICAgICogYGBgXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlY2VpdmVNZWRpYUV2ZW50ID0gKG1lZGlhRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgICAgIGNvbnN0IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQgPSBtZWRpYUV2ZW50XzEuZGVzZXJpYWxpemVNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgICAgICAgICAgc3dpdGNoIChkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicGVlckFjY2VwdGVkXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxQZWVyLmlkID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLmlkO1xuICAgICAgICAgICAgICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmNhbGxiYWNrcykub25Kb2luU3VjY2VzcykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5pZCwgZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnBlZXJzSW5Sb29tKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJzID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnBlZXJzSW5Sb29tO1xuICAgICAgICAgICAgICAgICAgICBwZWVycy5mb3JFYWNoKChwZWVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGVlckRlbmllZFwiOlxuICAgICAgICAgICAgICAgICAgICAoX2QgPSAoX2MgPSB0aGlzLmNhbGxiYWNrcykub25Kb2luRXJyb3IpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5jYWxsKF9jLCBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2NhbFBlZXIuaWQgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTWVkaWFFdmVudChkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5oYW5kbGVNZWRpYUV2ZW50ID0gKGRlc2VyaWFsaXplZE1lZGlhRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3AsIF9xLCBfcjtcbiAgICAgICAgICAgIGxldCBwZWVyO1xuICAgICAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgICAgICBzd2l0Y2ggKGRlc2VyaWFsaXplZE1lZGlhRXZlbnQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvZmZlckRhdGFcIjpcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHVyblNlcnZlcnMgPSBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEuaW50ZWdyYXRlZFR1cm5TZXJ2ZXJzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFR1cm5zKHR1cm5TZXJ2ZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2ZmZXJEYXRhID0gbmV3IE1hcChPYmplY3QuZW50cmllcyhkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEudHJhY2tzVHlwZXMpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk9mZmVyRGF0YShvZmZlckRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidHJhY2tzQWRkZWRcIjpcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UGVlcklkKCkgPT09IGRhdGEucGVlcklkKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnRyYWNrSWRUb01ldGFkYXRhID0gbmV3IE1hcChPYmplY3QuZW50cmllcyhkYXRhLnRyYWNrSWRUb01ldGFkYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIHBlZXIgPSB0aGlzLmlkVG9QZWVyLmdldChkYXRhLnBlZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFRyYWNrSWRUb01ldGFkYXRhID0gcGVlci50cmFja0lkVG9NZXRhZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgcGVlci50cmFja0lkVG9NZXRhZGF0YSA9IG5ldyBNYXAoWy4uLnBlZXIudHJhY2tJZFRvTWV0YWRhdGEsIC4uLmRhdGEudHJhY2tJZFRvTWV0YWRhdGFdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZFRvUGVlci5zZXQocGVlci5pZCwgcGVlcik7XG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20ocGVlci50cmFja0lkVG9NZXRhZGF0YS5lbnRyaWVzKCkpLmZvckVhY2goKFt0cmFja0lkLCBtZXRhZGF0YV0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9sZFRyYWNrSWRUb01ldGFkYXRhLmhhcyh0cmFja0lkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFjazogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2ltdWxjYXN0Q29uZmlnOiB7IGVuYWJsZWQ6IGZhbHNlLCBhY3RpdmVfZW5jb2RpbmdzOiBbXSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4QmFuZHdpZHRoOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja0lkVG9UcmFjay5zZXQodHJhY2tJZCwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoX2IgPSAoX2EgPSB0aGlzLmNhbGxiYWNrcykub25UcmFja0FkZGVkKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFja3NSZW1vdmVkXCI6XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBlZXJJZCA9IGRhdGEucGVlcklkO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRQZWVySWQoKSA9PT0gZGF0YS5wZWVySWQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrSWRzID0gZGF0YS50cmFja0lkcztcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tJZHMuZm9yRWFjaCgodHJhY2tJZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHRoaXMudHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgKF9iID0gKF9hID0gdGhpcy5jYWxsYmFja3MpLm9uVHJhY2tSZW1vdmVkKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgdHJhY2tDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXJhc2VUcmFjayh0cmFja0lkLCBwZWVySWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNkcEFuc3dlclwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pZFRvVHJhY2tJZCA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXMoZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLm1pZFRvVHJhY2tJZCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQW5zd2VyKGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjYW5kaWRhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlbW90ZUNhbmRpZGF0ZShkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGVlckpvaW5lZFwiOlxuICAgICAgICAgICAgICAgICAgICBwZWVyID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnBlZXI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZWVyLmlkID09PSB0aGlzLmdldFBlZXJJZCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIChfYiA9IChfYSA9IHRoaXMuY2FsbGJhY2tzKS5vblBlZXJKb2luZWQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCBwZWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBlZXJMZWZ0XCI6XG4gICAgICAgICAgICAgICAgICAgIHBlZXIgPSB0aGlzLmlkVG9QZWVyLmdldChkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEucGVlcklkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlZXIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgQXJyYXkuZnJvbShwZWVyLnRyYWNrSWRUb01ldGFkYXRhLmtleXMoKSkuZm9yRWFjaCgodHJhY2tJZCkgPT4geyB2YXIgX2EsIF9iOyByZXR1cm4gKF9iID0gKF9hID0gdGhpcy5jYWxsYmFja3MpLm9uVHJhY2tSZW1vdmVkKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY2FsbChfYSwgdGhpcy50cmFja0lkVG9UcmFjay5nZXQodHJhY2tJZCkpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lcmFzZVBlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIChfZCA9IChfYyA9IHRoaXMuY2FsbGJhY2tzKS5vblBlZXJMZWZ0KSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuY2FsbChfYywgcGVlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwZWVyVXBkYXRlZFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRQZWVySWQoKSA9PT0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnBlZXJJZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcGVlciA9IHRoaXMuaWRUb1BlZXIuZ2V0KGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5wZWVySWQpO1xuICAgICAgICAgICAgICAgICAgICBwZWVyLm1ldGFkYXRhID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLm1ldGFkYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIChfZiA9IChfZSA9IHRoaXMuY2FsbGJhY2tzKS5vblBlZXJVcGRhdGVkKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YuY2FsbChfZSwgcGVlcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwZWVyUmVtb3ZlZFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRQZWVySWQoKSAhPT0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnBlZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlY2VpdmVkIG9uUmVtb3ZlZCBtZWRpYSBldmVudCwgYnV0IGl0IGRvZXMgbm90IHJlZmVyIHRvIHRoZSBsb2NhbCBwZWVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIChfaCA9IChfZyA9IHRoaXMuY2FsbGJhY2tzKS5vblJlbW92ZWQpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5jYWxsKF9nLCBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEucmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInRyYWNrVXBkYXRlZFwiOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRQZWVySWQoKSA9PT0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnBlZXJJZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcGVlciA9IHRoaXMuaWRUb1BlZXIuZ2V0KGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5wZWVySWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVlciA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgYFBlZXIgd2l0aCBpZDogJHtkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEucGVlcklkfSBkb2Vzbid0IGV4aXN0YDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhY2tJZCA9IGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS50cmFja0lkO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFja01ldGFkYXRhID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLm1ldGFkYXRhO1xuICAgICAgICAgICAgICAgICAgICBwZWVyLnRyYWNrSWRUb01ldGFkYXRhLnNldCh0cmFja0lkLCB0cmFja01ldGFkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhY2tDb250ZXh0ID0gdGhpcy50cmFja0lkVG9UcmFjay5nZXQodHJhY2tJZCk7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrQ29udGV4dC5tZXRhZGF0YSA9IHRyYWNrTWV0YWRhdGE7XG4gICAgICAgICAgICAgICAgICAgIChfayA9IChfaiA9IHRoaXMuY2FsbGJhY2tzKS5vblRyYWNrVXBkYXRlZCkgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLmNhbGwoX2osIHRyYWNrQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFja3NQcmlvcml0eVwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmFibGVkVHJhY2tzID0gZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLnRyYWNrcy5tYXAoKHRyYWNrSWQpID0+IHRoaXMudHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzYWJsZWRUcmFja3MgPSBBcnJheS5mcm9tKHRoaXMudHJhY2tJZFRvVHJhY2sudmFsdWVzKCkpLmZpbHRlcigodHJhY2spID0+ICFlbmFibGVkVHJhY2tzLmluY2x1ZGVzKHRyYWNrKSk7XG4gICAgICAgICAgICAgICAgICAgIChfbSA9IChfbCA9IHRoaXMuY2FsbGJhY2tzKS5vblRyYWNrc1ByaW9yaXR5Q2hhbmdlZCkgPT09IG51bGwgfHwgX20gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9tLmNhbGwoX2wsIGVuYWJsZWRUcmFja3MsIGRpc2FibGVkVHJhY2tzKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZW5jb2RpbmdTd2l0Y2hlZFwiOlxuICAgICAgICAgICAgICAgICAgICAoX3AgPSAoX28gPSB0aGlzLmNhbGxiYWNrcykub25UcmFja0VuY29kaW5nQ2hhbmdlZCkgPT09IG51bGwgfHwgX3AgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9wLmNhbGwoX28sIGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS5wZWVySWQsIGRlc2VyaWFsaXplZE1lZGlhRXZlbnQuZGF0YS50cmFja0lkLCBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEuZW5jb2RpbmcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY3VzdG9tXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTWVkaWFFdmVudChkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZXJyb3JcIjpcbiAgICAgICAgICAgICAgICAgICAgKF9yID0gKF9xID0gdGhpcy5jYWxsYmFja3MpLm9uQ29ubmVjdGlvbkVycm9yKSA9PT0gbnVsbCB8fCBfciA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3IuY2FsbChfcSwgZGVzZXJpYWxpemVkTWVkaWFFdmVudC5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlJlY2VpdmVkIHVua25vd24gbWVkaWEgZXZlbnQ6IFwiLCBkZXNlcmlhbGl6ZWRNZWRpYUV2ZW50LnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRUcmFja1RvQ29ubmVjdGlvbiA9ICh0cmFja0NvbnRleHQpID0+IHtcbiAgICAgICAgICAgIGxldCB0cmFuc2NlaXZlckNvbmZpZyA9IHRoaXMuY3JlYXRlVHJhbnNjZWl2ZXJDb25maWcodHJhY2tDb250ZXh0KTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrID0gdHJhY2tDb250ZXh0LnRyYWNrO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLmFkZFRyYW5zY2VpdmVyKHRyYWNrLCB0cmFuc2NlaXZlckNvbmZpZyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGVzIHRoZSBtZXRhZGF0YSBmb3IgdGhlIGN1cnJlbnQgcGVlci5cbiAgICAgICAgICogQHBhcmFtIHBlZXJNZXRhZGF0YSAtIERhdGEgYWJvdXQgdGhpcyBwZWVyIHRoYXQgb3RoZXIgcGVlcnMgd2lsbCByZWNlaXZlIHVwb24gam9pbmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhlIG1ldGFkYXRhIGlzIGRpZmZlcmVudCBmcm9tIHdoYXQgaXMgYWxyZWFkeSB0cmFja2VkIGluIHRoZSByb29tLCB0aGUgb3B0aW9uYWxcbiAgICAgICAgICogY2FsbGJhY2sgYG9uUGVlclVwZGF0ZWRgIHdpbGwgYmUgdHJpZ2dlcmVkIGZvciBvdGhlciBwZWVycyBpbiB0aGUgcm9vbS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudXBkYXRlUGVlck1ldGFkYXRhID0gKHBlZXJNZXRhZGF0YSkgPT4ge1xuICAgICAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVNZWRpYUV2ZW50KFwidXBkYXRlUGVlck1ldGFkYXRhXCIsIHtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogcGVlck1ldGFkYXRhLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlcyB0aGUgbWV0YWRhdGEgZm9yIGEgc3BlY2lmaWMgdHJhY2suXG4gICAgICAgICAqIEBwYXJhbSB0cmFja0lkIC0gdHJhY2tJZCAoZ2VuZXJhdGVkIGluIGFkZFRyYWNrKSBvZiBhdWRpbyBvciB2aWRlbyB0cmFjay5cbiAgICAgICAgICogQHBhcmFtIHRyYWNrTWV0YWRhdGEgLSBEYXRhIGFib3V0IHRoaXMgdHJhY2sgdGhhdCBvdGhlciBwZWVycyB3aWxsIHJlY2VpdmUgdXBvbiBqb2luaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiB0aGUgbWV0YWRhdGEgaXMgZGlmZmVyZW50IGZyb20gd2hhdCBpcyBhbHJlYWR5IHRyYWNrZWQgaW4gdGhlIHJvb20sIHRoZSBvcHRpb25hbFxuICAgICAgICAgKiBjYWxsYmFjayBgb25UcmFja1VwZGF0ZWRgIHdpbGwgYmUgdHJpZ2dlcmVkIGZvciBvdGhlciBwZWVycyBpbiB0aGUgcm9vbS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudXBkYXRlVHJhY2tNZXRhZGF0YSA9ICh0cmFja0lkLCB0cmFja01ldGFkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFja0NvbnRleHQgPSB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpO1xuICAgICAgICAgICAgdHJhY2tDb250ZXh0Lm1ldGFkYXRhID0gdHJhY2tNZXRhZGF0YTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxUcmFja0lkVG9UcmFjay5zZXQodHJhY2tJZCwgdHJhY2tDb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxQZWVyLnRyYWNrSWRUb01ldGFkYXRhLnNldCh0cmFja0lkLCB0cmFja01ldGFkYXRhKTtcbiAgICAgICAgICAgIGxldCBtZWRpYUV2ZW50ID0gbWVkaWFFdmVudF8xLmdlbmVyYXRlTWVkaWFFdmVudChcInVwZGF0ZVRyYWNrTWV0YWRhdGFcIiwge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQsXG4gICAgICAgICAgICAgICAgdHJhY2tNZXRhZGF0YSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudChtZWRpYUV2ZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRNaWRUb1RyYWNrSWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFRyYWNrTWlkVG9UcmFja0lkID0ge307XG4gICAgICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbilcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5nZXRUcmFuc2NlaXZlcnMoKS5mb3JFYWNoKCh0cmFuc2NlaXZlcikgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFRyYWNrSWQgPSAoX2EgPSB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2spID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZDtcbiAgICAgICAgICAgICAgICBjb25zdCBtaWQgPSB0cmFuc2NlaXZlci5taWQ7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2tJZHMgPSB0aGlzLmxvY2FsUGVlci50cmFja0lkVG9NZXRhZGF0YS5rZXlzKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2tzID0gQXJyYXkuZnJvbSh0cmFja0lkcykubWFwKCh0cmFjaykgPT4gdGhpcy5sb2NhbFRyYWNrSWRUb1RyYWNrLmdldCh0cmFjaykpO1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbFRyYWNrSWQgJiYgbWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHRyYWNrcy5maW5kKCh0cmFja0NvbnRleHQpID0+IHRyYWNrQ29udGV4dC50cmFjay5pZCA9PT0gbG9jYWxUcmFja0lkKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxUcmFja01pZFRvVHJhY2tJZFttaWRdID0gdHJhY2tDb250ZXh0LnRyYWNrSWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxUcmFja01pZFRvVHJhY2tJZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIExlYXZlcyB0aGUgcm9vbS4gVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIHdoZW4gdXNlciBsZWF2ZXMgdGhlIHJvb21cbiAgICAgICAgICogaW4gYSBjbGVhbiB3YXkgZS5nLiBieSBjbGlja2luZyBhIGRlZGljYXRlZCwgY3VzdG9tIGJ1dHRvbiBgZGlzY29ubmVjdGAuXG4gICAgICAgICAqIEFzIGEgcmVzdWx0IHRoZXJlIHdpbGwgYmUgZ2VuZXJhdGVkIG9uZSBtb3JlIG1lZGlhIGV2ZW50IHRoYXQgc2hvdWxkIGJlXG4gICAgICAgICAqIHNlbnQgdG8gdGhlIFJUQyBFbmdpbmUuIFRoYW5rcyB0byBpdCBlYWNoIG90aGVyIHBlZXIgd2lsbCBiZSBub3RpZmllZFxuICAgICAgICAgKiB0aGF0IHBlZXIgbGVmdCBpbiB7QGxpbmsgb25QZWVyTGVmdH0sXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxlYXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVNZWRpYUV2ZW50KFwibGVhdmVcIik7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5jbGVhblVwKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhbnMgdXAge0BsaW5rIE1lbWJyYW5lV2ViUlRDfSBpbnN0YW5jZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xlYW5VcCA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbnRyYWNrID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9jYWxUcmFja3NXaXRoU3RyZWFtcy5mb3JFYWNoKCh7IHRyYWNrIH0pID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICAgICAgICB0aGlzLmxvY2FsVHJhY2tzV2l0aFN0cmVhbXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudCA9IChtZWRpYUV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5vblNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnRfMS5zZXJpYWxpemVNZWRpYUV2ZW50KG1lZGlhRXZlbnQpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbkFuc3dlciA9IGFzeW5jIChhbnN3ZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbnRyYWNrID0gdGhpcy5vblRyYWNrKCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuY29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihhbnN3ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRUcmFja0VuY29kaW5ncy5mb3JFYWNoKChlbmNvZGluZ3MsIHRyYWNrSWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZW5jb2RpbmdzLmZvckVhY2goKGVuY29kaW5nKSA9PiB0aGlzLmRpc2FibGVUcmFja0VuY29kaW5nKHRyYWNrSWQsIGVuY29kaW5nKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRUcmFuc2NlaXZlcnNJZk5lZWRlZCA9IChzZXJ2ZXJUcmFja3MpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGNvbnN0IHJlY3ZUcmFuc2NlaXZlcnMgPSB0aGlzLmNvbm5lY3Rpb24uZ2V0VHJhbnNjZWl2ZXJzKCkuZmlsdGVyKChlbGVtKSA9PiBlbGVtLmRpcmVjdGlvbiA9PT0gXCJyZWN2b25seVwiKTtcbiAgICAgICAgICAgIGxldCB0b0FkZCA9IFtdO1xuICAgICAgICAgICAgY29uc3QgZ2V0TmVlZGVkVHJhbnNjZWl2ZXJzVHlwZXMgPSAodHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlTnVtYmVyID0gc2VydmVyVHJhY2tzLmdldCh0eXBlKTtcbiAgICAgICAgICAgICAgICB0eXBlTnVtYmVyID0gdHlwZU51bWJlciAhPT0gdW5kZWZpbmVkID8gdHlwZU51bWJlciA6IDA7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZVRyYW5zY2VpdmVyc051bWJlciA9IHJlY3ZUcmFuc2NlaXZlcnMuZmlsdGVyKChlbGVtKSA9PiBlbGVtLnJlY2VpdmVyLnRyYWNrLmtpbmQgPT09IHR5cGUpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkodHlwZU51bWJlciAtIHR5cGVUcmFuc2NlaXZlcnNOdW1iZXIpLmZpbGwodHlwZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgYXVkaW8gPSBnZXROZWVkZWRUcmFuc2NlaXZlcnNUeXBlcyhcImF1ZGlvXCIpO1xuICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBnZXROZWVkZWRUcmFuc2NlaXZlcnNUeXBlcyhcInZpZGVvXCIpO1xuICAgICAgICAgICAgdG9BZGQgPSB0b0FkZC5jb25jYXQoYXVkaW8pO1xuICAgICAgICAgICAgdG9BZGQgPSB0b0FkZC5jb25jYXQodmlkZW8pO1xuICAgICAgICAgICAgZm9yIChsZXQga2luZCBvZiB0b0FkZClcbiAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLmNvbm5lY3Rpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRUcmFuc2NlaXZlcihraW5kLCB7IGRpcmVjdGlvbjogXCJyZWN2b25seVwiIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldFRyYWNrSWRUb01ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdHJhY2tJZFRvTWV0YWRhdGEgPSB7fTtcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5sb2NhbFBlZXIudHJhY2tJZFRvTWV0YWRhdGEuZW50cmllcygpKS5mb3JFYWNoKChbdHJhY2tJZCwgbWV0YWRhdGFdKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJhY2tJZFRvTWV0YWRhdGFbdHJhY2tJZF0gPSBtZXRhZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrSWRUb01ldGFkYXRhO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNoZWNrSWZUcmFja0JlbG9uZ1RvUGVlciA9ICh0cmFja0lkLCBwZWVyKSA9PiBBcnJheS5mcm9tKHBlZXIudHJhY2tJZFRvTWV0YWRhdGEua2V5cygpKS5zb21lKCh0cmFjaykgPT4gdHJhY2tJZC5zdGFydHNXaXRoKHRyYWNrKSk7XG4gICAgICAgIHRoaXMub25PZmZlckRhdGEgPSBhc3luYyAob2ZmZXJEYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbih0aGlzLnJ0Y0NvbmZpZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gdGhpcy5vbkxvY2FsQ2FuZGlkYXRlKCk7XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2sudmFsdWVzKCkpLmZvckVhY2goKHRyYWNrQ29udGV4dCkgPT4gdGhpcy5hZGRUcmFja1RvQ29ubmVjdGlvbih0cmFja0NvbnRleHQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLmdldFRyYW5zY2VpdmVycygpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKCh0cmFuc2NlaXZlcikgPT4gKHRyYW5zY2VpdmVyLmRpcmVjdGlvbiA9IFwic2VuZG9ubHlcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jb25uZWN0aW9uLnJlc3RhcnRJY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWRkVHJhbnNjZWl2ZXJzSWZOZWVkZWQob2ZmZXJEYXRhKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQW5kU2VuZE9mZmVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25SZW1vdGVDYW5kaWRhdGUgPSAoY2FuZGlkYXRlKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGljZUNhbmRpZGF0ZSA9IG5ldyBSVENJY2VDYW5kaWRhdGUoY2FuZGlkYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWNlaXZlZCBuZXcgcmVtb3RlIGNhbmRpZGF0ZSBidXQgUlRDQ29ubmVjdGlvbiBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uTG9jYWxDYW5kaWRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVkaWFFdmVudCA9IG1lZGlhRXZlbnRfMS5nZW5lcmF0ZUN1c3RvbUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiY2FuZGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lZGlhRXZlbnQobWVkaWFFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vblRyYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgY29uc3QgW3N0cmVhbV0gPSBldmVudC5zdHJlYW1zO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pZCA9IGV2ZW50LnRyYW5zY2VpdmVyLm1pZDtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFja0lkID0gdGhpcy5taWRUb1RyYWNrSWQuZ2V0KG1pZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tJZlRyYWNrQmVsb25nVG9QZWVyKHRyYWNrSWQsIHRoaXMubG9jYWxQZWVyKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlZXIgPSBBcnJheS5mcm9tKHRoaXMuaWRUb1BlZXIudmFsdWVzKCkpLmZpbHRlcigocGVlcikgPT4gdGhpcy5jaGVja0lmVHJhY2tCZWxvbmdUb1BlZXIodHJhY2tJZCwgcGVlcikpWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldGFkYXRhID0gcGVlci50cmFja0lkVG9NZXRhZGF0YS5nZXQodHJhY2tJZCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2tDb250ZXh0ID0ge1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrOiBldmVudC50cmFjayxcbiAgICAgICAgICAgICAgICAgICAgcGVlcjogcGVlcixcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tJZCxcbiAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHNpbXVsY2FzdENvbmZpZzogeyBlbmFibGVkOiBmYWxzZSwgYWN0aXZlX2VuY29kaW5nczogW10gfSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMudHJhY2tJZFRvVHJhY2suc2V0KHRyYWNrSWQsIHRyYWNrQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgKF9iID0gKF9hID0gdGhpcy5jYWxsYmFja3MpLm9uVHJhY2tSZWFkeSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoX2EsIHRyYWNrQ29udGV4dCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldFR1cm5zID0gKHR1cm5TZXJ2ZXJzKSA9PiB7XG4gICAgICAgICAgICB0dXJuU2VydmVycy5mb3JFYWNoKCh0dXJuU2VydmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zcG9ydCwgdXJpO1xuICAgICAgICAgICAgICAgIGlmICh0dXJuU2VydmVyLnRyYW5zcG9ydCA9PSBcInRsc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IFwidGNwXCI7XG4gICAgICAgICAgICAgICAgICAgIHVyaSA9IFwidHVybnNcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IHR1cm5TZXJ2ZXIudHJhbnNwb3J0O1xuICAgICAgICAgICAgICAgICAgICB1cmkgPSBcInR1cm5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcnRjSWNlU2VydmVyID0ge1xuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsOiB0dXJuU2VydmVyLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsVHlwZTogXCJwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICB1cmxzOiB1cmkuY29uY2F0KFwiOlwiLCB0dXJuU2VydmVyLnNlcnZlckFkZHIsIFwiOlwiLCB0dXJuU2VydmVyLnNlcnZlclBvcnQsIFwiP3RyYW5zcG9ydD1cIiwgdHJhbnNwb3J0KSxcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHR1cm5TZXJ2ZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnJ0Y0NvbmZpZy5pY2VTZXJ2ZXJzLnB1c2gocnRjSWNlU2VydmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZFBlZXIgPSAocGVlcikgPT4ge1xuICAgICAgICAgICAgLy8gI1RPRE8gcmVtb3ZlIHRoaXMgbGluZSBhZnRlciBmaXhpbmcgZGVzZXJpYWxpemF0aW9uXG4gICAgICAgICAgICBpZiAocGVlci5oYXNPd25Qcm9wZXJ0eShcInRyYWNrSWRUb01ldGFkYXRhXCIpKVxuICAgICAgICAgICAgICAgIHBlZXIudHJhY2tJZFRvTWV0YWRhdGEgPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHBlZXIudHJhY2tJZFRvTWV0YWRhdGEpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBwZWVyLnRyYWNrSWRUb01ldGFkYXRhID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5pZFRvUGVlci5zZXQocGVlci5pZCwgcGVlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZXJhc2VQZWVyID0gKHBlZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNrc0lkID0gQXJyYXkuZnJvbShwZWVyLnRyYWNrSWRUb01ldGFkYXRhLmtleXMoKSk7XG4gICAgICAgICAgICB0cmFja3NJZC5mb3JFYWNoKCh0cmFja0lkKSA9PiB0aGlzLnRyYWNrSWRUb1RyYWNrLmRlbGV0ZSh0cmFja0lkKSk7XG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMubWlkVG9UcmFja0lkLmVudHJpZXMoKSkuZm9yRWFjaCgoW21pZCwgdHJhY2tJZF0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHJhY2tzSWQuaW5jbHVkZXModHJhY2tJZCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlkVG9UcmFja0lkLmRlbGV0ZShtaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmlkVG9QZWVyLmRlbGV0ZShwZWVyLmlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5lcmFzZVRyYWNrID0gKHRyYWNrSWQsIHBlZXJJZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50cmFja0lkVG9UcmFjay5kZWxldGUodHJhY2tJZCk7XG4gICAgICAgICAgICBjb25zdCBtaWRUb1RyYWNrSWQgPSBBcnJheS5mcm9tKHRoaXMubWlkVG9UcmFja0lkLmVudHJpZXMoKSk7XG4gICAgICAgICAgICBjb25zdCBbbWlkLCBfdHJhY2tJZF0gPSBtaWRUb1RyYWNrSWQuZmluZCgoW21pZCwgbWFwVHJhY2tJZF0pID0+IG1hcFRyYWNrSWQgPT09IHRyYWNrSWQpO1xuICAgICAgICAgICAgdGhpcy5taWRUb1RyYWNrSWQuZGVsZXRlKG1pZCk7XG4gICAgICAgICAgICB0aGlzLmlkVG9QZWVyLmdldChwZWVySWQpLnRyYWNrSWRUb01ldGFkYXRhLmRlbGV0ZSh0cmFja0lkKTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRUcmFja0VuY29kaW5ncy5kZWxldGUodHJhY2tJZCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0UGVlcklkID0gKCkgPT4gdGhpcy5sb2NhbFBlZXIuaWQ7XG4gICAgICAgIGNvbnN0IHsgY2FsbGJhY2tzIH0gPSBjb25maWc7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gY2FsbGJhY2tzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIHRyYWNrIHRoYXQgd2lsbCBiZSBzZW50IHRvIHRoZSBSVEMgRW5naW5lLlxuICAgICAqIEBwYXJhbSB0cmFjayAtIEF1ZGlvIG9yIHZpZGVvIHRyYWNrIGUuZy4gZnJvbSB5b3VyIG1pY3JvcGhvbmUgb3IgY2FtZXJhLlxuICAgICAqIEBwYXJhbSBzdHJlYW0gIC0gU3RyZWFtIHRoYXQgdGhpcyB0cmFjayBiZWxvbmdzIHRvLlxuICAgICAqIEBwYXJhbSB0cmFja01ldGFkYXRhIC0gQW55IGluZm9ybWF0aW9uIGFib3V0IHRoaXMgdHJhY2sgdGhhdCBvdGhlciBwZWVycyB3aWxsXG4gICAgICogcmVjZWl2ZSBpbiB7QGxpbmsgb25QZWVySm9pbmVkfS4gRS5nLiB0aGlzIGNhbiBzb3VyY2Ugb2YgdGhlIHRyYWNrIC0gd2hlYXRoZXIgaXQnc1xuICAgICAqIHNjcmVlbnNoYXJpbmcsIHdlYmNhbSBvciBzb21lIG90aGVyIG1lZGlhIGRldmljZS5cbiAgICAgKiBAcGFyYW0gc2ltdWxjYXN0Q29uZmlnIC0gU2ltdWxjYXN0IGNvbmZpZ3VyYXRpb24uIEJ5IGRlZmF1bHQgc2ltdWxjYXN0IGlzIGRpc2FibGVkLlxuICAgICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHJlZmVyIHRvIHtAbGluayBTaW11bGNhc3RDb25maWd9LlxuICAgICAqIEBwYXJhbSBtYXhCYW5kd2lkdGggLSBtYXhpbWFsIGJhbmR3aWR0aCB0aGlzIHRyYWNrIGNhbiB1c2UuXG4gICAgICogRGVmYXVsdHMgdG8gMCB3aGljaCBpcyB1bmxpbWl0ZWQuXG4gICAgICogVGhpcyBvcHRpb24gaGFzIG5vIGVmZmVjdCBmb3Igc2ltdWxjYXN0IGFuZCBhdWRpbyB0cmFja3MuXG4gICAgICogRm9yIHNpbXVsY2FzdCB0cmFja3MgdXNlIGB7QGxpbmsgc2V0VHJhY2tCYW5kd2lkdGh9LlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgaWQgb2YgYWRkZWQgdHJhY2tcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYHRzXG4gICAgICogbGV0IGxvY2FsU3RyZWFtOiBNZWRpYVN0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbSgpO1xuICAgICAqIHRyeSB7XG4gICAgICogICBsb2NhbEF1ZGlvU3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoXG4gICAgICogICAgIEFVRElPX0NPTlNUUkFJTlRTXG4gICAgICogICApO1xuICAgICAqICAgbG9jYWxBdWRpb1N0cmVhbVxuICAgICAqICAgICAuZ2V0VHJhY2tzKClcbiAgICAgKiAgICAgLmZvckVhY2goKHRyYWNrKSA9PiBsb2NhbFN0cmVhbS5hZGRUcmFjayh0cmFjaykpO1xuICAgICAqIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICogICBjb25zb2xlLmVycm9yKFwiQ291bGRuJ3QgZ2V0IG1pY3JvcGhvbmUgcGVybWlzc2lvbjpcIiwgZXJyb3IpO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIHRyeSB7XG4gICAgICogICBsb2NhbFZpZGVvU3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoXG4gICAgICogICAgIFZJREVPX0NPTlNUUkFJTlRTXG4gICAgICogICApO1xuICAgICAqICAgbG9jYWxWaWRlb1N0cmVhbVxuICAgICAqICAgICAuZ2V0VHJhY2tzKClcbiAgICAgKiAgICAgLmZvckVhY2goKHRyYWNrKSA9PiBsb2NhbFN0cmVhbS5hZGRUcmFjayh0cmFjaykpO1xuICAgICAqIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICogIGNvbnNvbGUuZXJyb3IoXCJDb3VsZG4ndCBnZXQgY2FtZXJhIHBlcm1pc3Npb246XCIsIGVycm9yKTtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBsb2NhbFN0cmVhbVxuICAgICAqICAuZ2V0VHJhY2tzKClcbiAgICAgKiAgLmZvckVhY2goKHRyYWNrKSA9PiB3ZWJydGMuYWRkVHJhY2sodHJhY2ssIGxvY2FsU3RyZWFtKSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYWRkVHJhY2sodHJhY2ssIHN0cmVhbSwgdHJhY2tNZXRhZGF0YSA9IG5ldyBNYXAoKSwgc2ltdWxjYXN0Q29uZmlnID0geyBlbmFibGVkOiBmYWxzZSwgYWN0aXZlX2VuY29kaW5nczogW10gfSwgbWF4QmFuZHdpZHRoID0gMCAvLyB1bmxpbWl0ZWQgYmFuZHdpZHRoXG4gICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFBlZXJJZCgpID09PSBcIlwiKVxuICAgICAgICAgICAgdGhyb3cgXCJDYW5ub3QgYWRkIHRyYWNrcyBiZWZvcmUgYmVpbmcgYWNjZXB0ZWQgYnkgdGhlIHNlcnZlclwiO1xuICAgICAgICBjb25zdCB0cmFja0lkID0gdGhpcy5nZXRUcmFja0lkKHV1aWRfMS52NCgpKTtcbiAgICAgICAgdGhpcy5sb2NhbFRyYWNrc1dpdGhTdHJlYW1zLnB1c2goeyB0cmFjaywgc3RyZWFtIH0pO1xuICAgICAgICB0aGlzLmxvY2FsUGVlci50cmFja0lkVG9NZXRhZGF0YS5zZXQodHJhY2tJZCwgdHJhY2tNZXRhZGF0YSk7XG4gICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHtcbiAgICAgICAgICAgIHRyYWNrLFxuICAgICAgICAgICAgc3RyZWFtLFxuICAgICAgICAgICAgdHJhY2tJZCxcbiAgICAgICAgICAgIHBlZXI6IHRoaXMubG9jYWxQZWVyLFxuICAgICAgICAgICAgbWV0YWRhdGE6IHRyYWNrTWV0YWRhdGEsXG4gICAgICAgICAgICBzaW11bGNhc3RDb25maWcsXG4gICAgICAgICAgICBtYXhCYW5kd2lkdGgsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubG9jYWxUcmFja0lkVG9UcmFjay5zZXQodHJhY2tJZCwgdHJhY2tDb250ZXh0KTtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hZGRUcmFja1RvQ29ubmVjdGlvbih0cmFja0NvbnRleHQpO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uXG4gICAgICAgICAgICAgICAgLmdldFRyYW5zY2VpdmVycygpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKHRyYW5zY2VpdmVyKSA9PiAodHJhbnNjZWl2ZXIuZGlyZWN0aW9uID1cbiAgICAgICAgICAgICAgICB0cmFuc2NlaXZlci5kaXJlY3Rpb24gPT09IFwic2VuZHJlY3ZcIiA/IFwic2VuZG9ubHlcIiA6IHRyYW5zY2VpdmVyLmRpcmVjdGlvbikpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtZWRpYUV2ZW50ID0gbWVkaWFFdmVudF8xLmdlbmVyYXRlQ3VzdG9tRXZlbnQoeyB0eXBlOiBcInJlbmVnb3RpYXRlVHJhY2tzXCIgfSk7XG4gICAgICAgIHRoaXMuc2VuZE1lZGlhRXZlbnQobWVkaWFFdmVudCk7XG4gICAgICAgIHJldHVybiB0cmFja0lkO1xuICAgIH1cbiAgICBjcmVhdGVUcmFuc2NlaXZlckNvbmZpZyh0cmFja0NvbnRleHQpIHtcbiAgICAgICAgbGV0IHRyYW5zY2VpdmVyQ29uZmlnO1xuICAgICAgICBpZiAodHJhY2tDb250ZXh0LnRyYWNrLmtpbmQgPT09IFwiYXVkaW9cIikge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXJDb25maWcgPSB0aGlzLmNyZWF0ZUF1ZGlvVHJhbnNjZWl2ZXJDb25maWcodHJhY2tDb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyQ29uZmlnID0gdGhpcy5jcmVhdGVWaWRlb1RyYW5zY2VpdmVyQ29uZmlnKHRyYWNrQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyQ29uZmlnO1xuICAgIH1cbiAgICBjcmVhdGVBdWRpb1RyYW5zY2VpdmVyQ29uZmlnKF90cmFja0NvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHsgZGlyZWN0aW9uOiBcInNlbmRvbmx5XCIgfTtcbiAgICB9XG4gICAgY3JlYXRlVmlkZW9UcmFuc2NlaXZlckNvbmZpZyh0cmFja0NvbnRleHQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBsZXQgdHJhbnNjZWl2ZXJDb25maWc7XG4gICAgICAgIGlmICh0cmFja0NvbnRleHQuc2ltdWxjYXN0Q29uZmlnLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyQ29uZmlnID0gY29uc3RfMS5zaW11bGNhc3RUcmFuc2NlaXZlckNvbmZpZztcbiAgICAgICAgICAgIGxldCB0cmFja0FjdGl2ZUVuY29kaW5ncyA9IHRyYWNrQ29udGV4dC5zaW11bGNhc3RDb25maWcuYWN0aXZlX2VuY29kaW5ncztcbiAgICAgICAgICAgIGxldCBkaXNhYmxlZFRyYWNrRW5jb2RpbmdzID0gW107XG4gICAgICAgICAgICAoX2EgPSB0cmFuc2NlaXZlckNvbmZpZy5zZW5kRW5jb2RpbmdzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaCgoZW5jb2RpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHJhY2tBY3RpdmVFbmNvZGluZ3MuaW5jbHVkZXMoZW5jb2RpbmcucmlkKSkge1xuICAgICAgICAgICAgICAgICAgICBlbmNvZGluZy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRUcmFja0VuY29kaW5ncy5wdXNoKGVuY29kaW5nLnJpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkVHJhY2tFbmNvZGluZ3Muc2V0KHRyYWNrQ29udGV4dC50cmFja0lkLCBkaXNhYmxlZFRyYWNrRW5jb2RpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyQ29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogXCJzZW5kb25seVwiLFxuICAgICAgICAgICAgICAgIHNlbmRFbmNvZGluZ3M6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFja0NvbnRleHQubWF4QmFuZHdpZHRoICYmIHRyYW5zY2VpdmVyQ29uZmlnLnNlbmRFbmNvZGluZ3MpXG4gICAgICAgICAgICB0aGlzLmFwcGx5QmFuZHdpZHRoTGltaXRhdGlvbih0cmFuc2NlaXZlckNvbmZpZy5zZW5kRW5jb2RpbmdzLCB0cmFja0NvbnRleHQubWF4QmFuZHdpZHRoKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyQ29uZmlnO1xuICAgIH1cbiAgICBhcHBseUJhbmR3aWR0aExpbWl0YXRpb24oZW5jb2RpbmdzLCBtYXhfYmFuZHdpZHRoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWF4X2JhbmR3aWR0aCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgLy8gbm9uLXNpbXVsY2FzdCBsaW1pdGF0aW9uXG4gICAgICAgICAgICB0aGlzLnNwbGl0QmFuZHdpZHRoKGVuY29kaW5ncywgbWF4X2JhbmR3aWR0aCAqIDEwMjQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gc2ltdWxjYXN0IGJhbmR3aWR0aCBsaW1pdFxuICAgICAgICAgICAgZW5jb2RpbmdzLmZpbHRlcihlbmNvZGluZyA9PiBlbmNvZGluZy5yaWQpLmZvckVhY2goZW5jb2RpbmcgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbWl0ID0gbWF4X2JhbmR3aWR0aC5nZXQoZW5jb2RpbmcucmlkKSB8fCAwO1xuICAgICAgICAgICAgICAgIGlmIChsaW1pdCA+IDApXG4gICAgICAgICAgICAgICAgICAgIGVuY29kaW5nLm1heEJpdHJhdGUgPSBsaW1pdCAqIDEwMjQ7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZW5jb2RpbmcubWF4Qml0cmF0ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNwbGl0QmFuZHdpZHRoKGVuY29kaW5ncywgYmFuZHdpZHRoKSB7XG4gICAgICAgIGlmIChiYW5kd2lkdGggPT09IDApIHtcbiAgICAgICAgICAgIGVuY29kaW5ncy5mb3JFYWNoKGVuY29kaW5nID0+IGRlbGV0ZSBlbmNvZGluZy5tYXhCaXRyYXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5jb2RpbmdzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAvLyBUaGlzIG1vc3QgbGlrZWx5IGlzIGEgcmFjZSBjb25kaXRpb24uIExvZyBhbiBlcnJvciBhbmQgcHJldmVudCBjYXRhc3Ryb3BoaWMgZmFpbHVyZVxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkF0dGVtcHRlZCB0byBsaW1pdCBiYW5kd2lkdGggb2YgdGhlIHRyYWNrIHRoYXQgZG9lc24ndCBoYXZlIGFueSBlbmNvZGluZ3NcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2UgYXJlIHNvbHZpbmcgdGhlIGZvbGxvd2luZyBlcXVhdGlvbjpcbiAgICAgICAgLy8geCArIChrMC9rMSleMiAqIHggKyAoazAvazIpXjIgKiB4ICsgLi4uICsgKGswL2tuKV4yICogeCA9IGJhbmR3aWR0aFxuICAgICAgICAvLyB3aGVyZSB4IGlzIHRoZSBiaXRyYXRlIGZvciB0aGUgZmlyc3QgZW5jb2RpbmcsIGtuIGFyZSBzY2FsZVJlc29sdXRpb25Eb3duQnkgZmFjdG9yc1xuICAgICAgICAvLyBzcXVhcmUgaXMgZGljdGF0ZWQgYnkgdGhlIGZhY3QgdGhhdCBrMC9rbiBpcyBhIHNjYWxlIGZhY3RvciwgYnV0IHdlIGFyZSBpbnRlcmVzdGVkIGluIHRoZSB0b3RhbCBudW1iZXIgb2YgcGl4ZWxzIGluIHRoZSBpbWFnZVxuICAgICAgICBjb25zdCBmaXJzdFNjYWxlRG93bkJ5ID0gZW5jb2RpbmdzWzBdLnNjYWxlUmVzb2x1dGlvbkRvd25CeSB8fCAxO1xuICAgICAgICBjb25zdCBiaXRyYXRlX3BhcnRzID0gZW5jb2RpbmdzLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4gYWNjICsgKGZpcnN0U2NhbGVEb3duQnkgLyAodmFsdWUuc2NhbGVSZXNvbHV0aW9uRG93bkJ5IHx8IDEpKSAqKiAyLCAwKTtcbiAgICAgICAgY29uc3QgeCA9IGJhbmR3aWR0aCAvIGJpdHJhdGVfcGFydHM7XG4gICAgICAgIGVuY29kaW5ncy5mb3JFYWNoKCh2YWx1ZSkgPT4gKHZhbHVlLm1heEJpdHJhdGUgPSB4ICogKGZpcnN0U2NhbGVEb3duQnkgLyAodmFsdWUuc2NhbGVSZXNvbHV0aW9uRG93bkJ5IHx8IDEpKSAqKiAyKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIGEgdHJhY2sgdGhhdCBpcyBiZWluZyBzZW50IHRvIHRoZSBSVEMgRW5naW5lLlxuICAgICAqIEBwYXJhbSB0cmFjayAtIEF1ZGlvIG9yIHZpZGVvIHRyYWNrLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja0lkIC0gSWQgb2YgYXVkaW8gb3IgdmlkZW8gdHJhY2sgdG8gcmVwbGFjZS5cbiAgICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtVHJhY2t9IG5ld1RyYWNrXG4gICAgICogQHBhcmFtIHthbnl9IFtuZXdNZXRhZGF0YV0gLSBPcHRpb25hbCB0cmFjayBtZXRhZGF0YSB0byBhcHBseSB0byB0aGUgbmV3IHRyYWNrLiBJZiBub1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2sgbWV0YWRhdGEgaXMgcGFzc2VkLCB0aGUgb2xkIHRyYWNrIG1ldGFkYXRhIGlzIHJldGFpbmVkLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSBzdWNjZXNzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGB0c1xuICAgICAqIC8vIHNldHVwIGNhbWVyYVxuICAgICAqIGxldCBsb2NhbFN0cmVhbTogTWVkaWFTdHJlYW0gPSBuZXcgTWVkaWFTdHJlYW0oKTtcbiAgICAgKiB0cnkge1xuICAgICAqICAgbG9jYWxWaWRlb1N0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKFxuICAgICAqICAgICBWSURFT19DT05TVFJBSU5UU1xuICAgICAqICAgKTtcbiAgICAgKiAgIGxvY2FsVmlkZW9TdHJlYW1cbiAgICAgKiAgICAgLmdldFRyYWNrcygpXG4gICAgICogICAgIC5mb3JFYWNoKCh0cmFjaykgPT4gbG9jYWxTdHJlYW0uYWRkVHJhY2sodHJhY2spKTtcbiAgICAgKiB9IGNhdGNoIChlcnJvcikge1xuICAgICAqICAgY29uc29sZS5lcnJvcihcIkNvdWxkbid0IGdldCBjYW1lcmEgcGVybWlzc2lvbjpcIiwgZXJyb3IpO1xuICAgICAqIH1cbiAgICAgKiBsZXQgb2xkVHJhY2tJZDtcbiAgICAgKiBsb2NhbFN0cmVhbVxuICAgICAqICAuZ2V0VHJhY2tzKClcbiAgICAgKiAgLmZvckVhY2goKHRyYWNrKSA9PiB0cmFja0lkID0gd2VicnRjLmFkZFRyYWNrKHRyYWNrLCBsb2NhbFN0cmVhbSkpO1xuICAgICAqXG4gICAgICogLy8gY2hhbmdlIGNhbWVyYVxuICAgICAqIGNvbnN0IG9sZFRyYWNrID0gbG9jYWxTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICAgKiBsZXQgdmlkZW9EZXZpY2VJZCA9IFwiYWJjZC0xMjM0XCI7XG4gICAgICogbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAqICAgICAgdmlkZW86IHtcbiAgICAgKiAgICAgICAgLi4uKFZJREVPX0NPTlNUUkFJTlRTIGFzIHt9KSxcbiAgICAgKiAgICAgICAgZGV2aWNlSWQ6IHtcbiAgICAgKiAgICAgICAgICBleGFjdDogdmlkZW9EZXZpY2VJZCxcbiAgICAgKiAgICAgICAgfSxcbiAgICAgKiAgICAgIH1cbiAgICAgKiAgIH0pXG4gICAgICogICAudGhlbigoc3RyZWFtKSA9PiB7XG4gICAgICogICAgIGxldCB2aWRlb1RyYWNrID0gc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XG4gICAgICogICAgIHdlYnJ0Yy5yZXBsYWNlVHJhY2sob2xkVHJhY2tJZCwgdmlkZW9UcmFjayk7XG4gICAgICogICB9KVxuICAgICAqICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAqICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzd2l0Y2hpbmcgY2FtZXJhJywgZXJyb3IpO1xuICAgICAqICAgfSlcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhc3luYyByZXBsYWNlVHJhY2sodHJhY2tJZCwgbmV3VHJhY2ssIG5ld1RyYWNrTWV0YWRhdGEpIHtcbiAgICAgICAgY29uc3QgdHJhY2tDb250ZXh0ID0gdGhpcy5sb2NhbFRyYWNrSWRUb1RyYWNrLmdldCh0cmFja0lkKTtcbiAgICAgICAgY29uc3Qgc2VuZGVyID0gdGhpcy5maW5kU2VuZGVyKHRyYWNrQ29udGV4dC50cmFjay5pZCk7XG4gICAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBzZW5kZXJcbiAgICAgICAgICAgICAgICAucmVwbGFjZVRyYWNrKG5ld1RyYWNrKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFja01ldGFkYXRhID0gbmV3VHJhY2tNZXRhZGF0YSB8fCB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpLm1ldGFkYXRhO1xuICAgICAgICAgICAgICAgIHRyYWNrQ29udGV4dC50cmFjayA9IG5ld1RyYWNrO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVHJhY2tNZXRhZGF0YSh0cmFja0lkLCB0cmFja01ldGFkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgbWF4aW11bSBiYW5kd2lkdGggZm9yIHRoZSB0cmFjayBpZGVudGlmaWVkIGJ5IHRyYWNrSWQuXG4gICAgICogVGhpcyB2YWx1ZSBkaXJlY3RseSB0cmFuc2xhdGVzIHRvIHF1YWxpdHkgb2YgdGhlIHN0cmVhbSBhbmQsIGluIGNhc2Ugb2YgdmlkZW8sIHRvIHRoZSBhbW91bnQgb2YgUlRQIHBhY2tldHMgYmVpbmcgc2VudC5cbiAgICAgKiBJbiBjYXNlIHRyYWNrSWQgcG9pbnRzIGF0IHRoZSBzaW11bGNhc3QgdHJhY2sgYmFuZHdpZHRoIGlzIHNwbGl0IGJldHdlZW4gYWxsIG9mIHRoZSB2YXJpYW50IHN0cmVhbXMgcHJvcG9ydGlvbmFsbHkgdG8gdGhlaXIgcmVzb2x1dGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja0lkXG4gICAgICogQHBhcmFtIHtCYW5kd2lkdGhMaW1pdH0gYmFuZHdpZHRoIGluIGticHNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn0gc3VjY2Vzc1xuICAgICAqL1xuICAgIHNldFRyYWNrQmFuZHdpZHRoKHRyYWNrSWQsIGJhbmR3aWR0aCkge1xuICAgICAgICBjb25zdCB0cmFja0NvbnRleHQgPSB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpO1xuICAgICAgICBpZiAoIXRyYWNrQ29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBUcmFjayAnJHt0cmFja0lkfScgZG9lc24ndCBleGlzdGApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuZmluZFNlbmRlcih0cmFja0NvbnRleHQudHJhY2suaWQpO1xuICAgICAgICBjb25zdCBwYXJhbWV0ZXJzID0gc2VuZGVyLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuZW5jb2RpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcGFyYW1ldGVycy5lbmNvZGluZ3MgPSBbe31dO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHBseUJhbmR3aWR0aExpbWl0YXRpb24ocGFyYW1ldGVycy5lbmNvZGluZ3MsIGJhbmR3aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbmRlclxuICAgICAgICAgICAgLnNldFBhcmFtZXRlcnMocGFyYW1ldGVycylcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRydWUpXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIG1heGltdW0gYmFuZHdpZHRoIGZvciB0aGUgZ2l2ZW4gc2ltdWxjYXN0IGVuY29kaW5nIG9mIHRoZSBnaXZlbiB0cmFjay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja0lkIC0gaWQgb2YgdGhlIHRyYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJpZCAtIHJpZCBvZiB0aGUgZW5jb2RpbmdcbiAgICAgKiBAcGFyYW0ge0JhbmR3aWR0aExpbWl0fSBiYW5kd2lkdGggLSBkZXNpcmVkIG1heCBiYW5kd2lkdGggdXNlZCBieSB0aGUgZW5jb2RpbmcgKGluIGticHMpXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBzZXRFbmNvZGluZ0JhbmR3aWR0aCh0cmFja0lkLCByaWQsIGJhbmR3aWR0aCkge1xuICAgICAgICBjb25zdCB0cmFja0NvbnRleHQgPSB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpO1xuICAgICAgICBpZiAoIXRyYWNrQ29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBUcmFjayAnJHt0cmFja0lkfScgZG9lc24ndCBleGlzdGApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuZmluZFNlbmRlcih0cmFja0NvbnRleHQudHJhY2suaWQpO1xuICAgICAgICBjb25zdCBwYXJhbWV0ZXJzID0gc2VuZGVyLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgY29uc3QgZW5jb2RpbmcgPSBwYXJhbWV0ZXJzLmVuY29kaW5ncy5maW5kKGVuY29kaW5nID0+IGVuY29kaW5nLnJpZCA9PT0gcmlkKTtcbiAgICAgICAgaWYgKCFlbmNvZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGBFbmNvZGluZyB3aXRoIHJpZCAnJHtyaWR9JyBkb2Vzbid0IGV4aXN0YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYmFuZHdpZHRoID09PSAwKSB7XG4gICAgICAgICAgICBkZWxldGUgZW5jb2RpbmcubWF4Qml0cmF0ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVuY29kaW5nLm1heEJpdHJhdGUgPSBiYW5kd2lkdGggKiAxMDI0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZW5kZXJcbiAgICAgICAgICAgIC5zZXRQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB0cnVlKVxuICAgICAgICAgICAgLmNhdGNoKChfZXJyb3IpID0+IGZhbHNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIHRyYWNrIGZyb20gY29ubmVjdGlvbiB0aGF0IHdhcyBiZWluZyBzZW50IHRvIHRoZSBSVEMgRW5naW5lLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja0lkIC0gSWQgb2YgYXVkaW8gb3IgdmlkZW8gdHJhY2sgdG8gcmVtb3ZlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgdHNcbiAgICAgKiAvLyBzZXR1cCBjYW1lcmFcbiAgICAgKiBsZXQgbG9jYWxTdHJlYW06IE1lZGlhU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKCk7XG4gICAgICogdHJ5IHtcbiAgICAgKiAgIGxvY2FsVmlkZW9TdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShcbiAgICAgKiAgICAgVklERU9fQ09OU1RSQUlOVFNcbiAgICAgKiAgICk7XG4gICAgICogICBsb2NhbFZpZGVvU3RyZWFtXG4gICAgICogICAgIC5nZXRUcmFja3MoKVxuICAgICAqICAgICAuZm9yRWFjaCgodHJhY2spID0+IGxvY2FsU3RyZWFtLmFkZFRyYWNrKHRyYWNrKSk7XG4gICAgICogfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgKiAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZG4ndCBnZXQgY2FtZXJhIHBlcm1pc3Npb246XCIsIGVycm9yKTtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBsZXQgdHJhY2tJZFxuICAgICAqIGxvY2FsU3RyZWFtXG4gICAgICogIC5nZXRUcmFja3MoKVxuICAgICAqICAuZm9yRWFjaCgodHJhY2spID0+IHRyYWNrSWQgPSB3ZWJydGMuYWRkVHJhY2sodHJhY2ssIGxvY2FsU3RyZWFtKSk7XG4gICAgICpcbiAgICAgKiAvLyByZW1vdmUgdHJhY2tcbiAgICAgKiB3ZWJydGMucmVtb3ZlVHJhY2sodHJhY2tJZClcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICByZW1vdmVUcmFjayh0cmFja0lkKSB7XG4gICAgICAgIGNvbnN0IHRyYWNrQ29udGV4dCA9IHRoaXMubG9jYWxUcmFja0lkVG9UcmFjay5nZXQodHJhY2tJZCk7XG4gICAgICAgIGNvbnN0IHNlbmRlciA9IHRoaXMuZmluZFNlbmRlcih0cmFja0NvbnRleHQudHJhY2suaWQpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVDdXN0b21FdmVudCh7IHR5cGU6IFwicmVuZWdvdGlhdGVUcmFja3NcIiB9KTtcbiAgICAgICAgdGhpcy5zZW5kTWVkaWFFdmVudChtZWRpYUV2ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3VycmVudGx5LCB0aGlzIGZ1bmN0aW9uIG9ubHkgd29ya3Mgd2hlbiBEaXNwbGF5TWFuYWdlciBpbiBSVEMgRW5naW5lIGlzXG4gICAgICogZW5hYmxlZCBhbmQgc2ltdWxjYXN0IGlzIGRpc2FibGVkLlxuICAgICAqXG4gICAgICogUHJpb3JpdGl6ZXMgYSB0cmFjayBpbiBjb25uZWN0aW9uIHRvIGJlIGFsd2F5cyBzZW50IHRvIGJyb3dzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2tJZCAtIElkIG9mIHZpZGVvIHRyYWNrIHRvIHByaW9yaXRpemUuXG4gICAgICovXG4gICAgcHJpb3JpdGl6ZVRyYWNrKHRyYWNrSWQpIHtcbiAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVDdXN0b21FdmVudCh7IHR5cGU6IFwicHJpb3JpdGl6ZVRyYWNrXCIsIGRhdGE6IHsgdHJhY2tJZCB9IH0pO1xuICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDdXJyZW50bHksIHRoaXMgZnVuY3Rpb24gb25seSB3b3JrcyB3aGVuIERpc3BsYXlNYW5hZ2VyIGluIFJUQyBFbmdpbmUgaXNcbiAgICAgKiBlbmFibGVkIGFuZCBzaW11bGNhc3QgaXMgZGlzYWJsZWQuXG4gICAgICpcbiAgICAgKiBVbnByaW9yaXRpemVzIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHJhY2tJZCAtIElkIG9mIHZpZGVvIHRyYWNrIHRvIHVucHJpb3JpdGl6ZS5cbiAgICAgKi9cbiAgICB1bnByaW9yaXRpemVUcmFjayh0cmFja0lkKSB7XG4gICAgICAgIGxldCBtZWRpYUV2ZW50ID0gbWVkaWFFdmVudF8xLmdlbmVyYXRlQ3VzdG9tRXZlbnQoeyB0eXBlOiBcInVucHJpb3JpdGl6ZVRyYWNrXCIsIGRhdGE6IHsgdHJhY2tJZCB9IH0pO1xuICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDdXJyZW50bHkgdGhpcyBmdW5jdGlvbiBoYXMgbm8gZWZmZWN0LlxuICAgICAqXG4gICAgICogVGhpcyBmdW5jdGlvbiBhbGxvd3MgdG8gYWRqdXN0IHJlc29sdXRpb24gYW5kIG51bWJlciBvZiB2aWRlbyB0cmFja3Mgc2VudCBieSBhbiBTRlUgdG8gYSBjbGllbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYmlnU2NyZWVucyAtIG51bWJlciBvZiBzY3JlZW5zIHdpdGggYmlnIHNpemVcbiAgICAgKiAoaWYgc2ltdWxjYXN0IGlzIHVzZWQgdGhpcyB3aWxsIGxpbWl0IG51bWJlciBvZiB0cmFja3Mgc2VudCB3aXRoIGhpZ2hlc3QgcXVhbGl0eSkuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNtYWxsU2NyZWVucyAtIG51bWJlciBvZiBzY3JlZW5zIHdpdGggc21hbGwgc2l6ZVxuICAgICAqIChpZiBzaW11bGNhc3QgaXMgdXNlZCB0aGlzIHdpbGwgbGltaXQgbnVtYmVyIG9mIHRyYWNrcyBzZW50IHdpdGggbG93ZXN0IHF1YWxpdHkpLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtZWRpdW1TY3JlZW5zIC0gbnVtYmVyIG9mIHNjcmVlbnMgd2l0aCBtZWRpdW0gc2l6ZVxuICAgICAqIChpZiBzaW11bGNhc3QgaXMgdXNlZCB0aGlzIHdpbGwgbGltaXQgbnVtYmVyIG9mIHRyYWNrcyBzZW50IHdpdGggbWVkaXVtIHF1YWxpdHkpLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWxsU2FtZVNpemUgLSBmbGFnIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgYWxsIHNjcmVlbnMgc2hvdWxkIHVzZSB0aGUgc2FtZSBxdWFsaXR5XG4gICAgICovXG4gICAgc2V0UHJlZmVyZWRWaWRlb1NpemVzKGJpZ1NjcmVlbnMsIHNtYWxsU2NyZWVucywgbWVkaXVtU2NyZWVucyA9IDAsIGFsbFNhbWVTaXplID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVDdXN0b21FdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBcInByZWZlcmVkVmlkZW9TaXplc1wiLFxuICAgICAgICAgICAgZGF0YTogeyBiaWdTY3JlZW5zLCBtZWRpdW1TY3JlZW5zLCBzbWFsbFNjcmVlbnMsIGFsbFNhbWVTaXplIH0sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRyYWNrIGVuY29kaW5nIHRoYXQgc2VydmVyIHNob3VsZCBzZW5kIHRvIHRoZSBjbGllbnQgbGlicmFyeS5cbiAgICAgKlxuICAgICAqIFRoZSBlbmNvZGluZyB3aWxsIGJlIHNlbnQgd2hlbmV2ZXIgaXQgaXMgYXZhaWxhYmxlLlxuICAgICAqIElmIGNob29zZW4gZW5jb2RpbmcgaXMgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGUsIHNvbWUgb3RoZXIgZW5jb2RpbmdcbiAgICAgKiB3aWxsIGJlIHNlbnQgdW50aWwgY2hvb3NlbiBlbmNvZGluZyBiZWNvbWVzIGFjdGl2ZSBhZ2Fpbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0cmFja0lkIC0gaWQgb2YgdHJhY2tcbiAgICAgKiBAcGFyYW0ge1RyYWNrRW5jb2Rpbmd9IGVuY29kaW5nIC0gZW5jb2RpbmcgdG8gcmVjZWl2ZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgdHNcbiAgICAgKiB3ZWJydGMuc2V0VGFyZ2V0VHJhY2tFbmNvZGluZyhpbmNvbWluZ1RyYWNrQ3R4LnRyYWNrSWQsIFwibFwiKVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHNldFRhcmdldFRyYWNrRW5jb2RpbmcodHJhY2tJZCwgZW5jb2RpbmcpIHtcbiAgICAgICAgbGV0IG1lZGlhRXZlbnQgPSBtZWRpYUV2ZW50XzEuZ2VuZXJhdGVDdXN0b21FdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBcInNldFRhcmdldFRyYWNrVmFyaWFudFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQ6IHRyYWNrSWQsXG4gICAgICAgICAgICAgICAgdmFyaWFudDogZW5jb2RpbmcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbmRNZWRpYUV2ZW50KG1lZGlhRXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHRyYWNrIGVuY29kaW5nIHNvIHRoYXQgaXQgd2lsbCBiZSBzZW50IHRvIHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNrSWQgLSBpZCBvZiB0cmFja1xuICAgICAqIEBwYXJhbSB7VHJhY2tFbmNvZGluZ30gZW5jb2RpbmcgLSBlbmNvZGluZyB0aGF0IHdpbGwgYmUgZW5hYmxlZFxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgdHNcbiAgICAgKiBjb25zdCB0cmFja0lkID0gd2VicnRjLmFkZFRyYWNrKHRyYWNrLCBzdHJlYW0sIHt9LCB7ZW5hYmxlZDogdHJ1ZSwgYWN0aXZlX2VuY29kaW5nczogW1wibFwiLCBcIm1cIiwgXCJoXCJdfSk7XG4gICAgICogd2VicnRjLmRpc2FibGVUcmFja0VuY29kaW5nKHRyYWNrSWQsIFwibFwiKTtcbiAgICAgKiAvLyB3YWl0IHNvbWUgdGltZVxuICAgICAqIHdlYnJ0Yy5lbmFibGVUcmFja0VuY29kaW5nKHRyYWNrSWQsIFwibFwiKTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBlbmFibGVUcmFja0VuY29kaW5nKHRyYWNrSWQsIGVuY29kaW5nKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBsZXQgdHJhY2sgPSAoX2EgPSB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudHJhY2s7XG4gICAgICAgIGxldCBuZXdEaXNhYmxlZFRyYWNrRW5jb2RpbmdzID0gKF9iID0gdGhpcy5kaXNhYmxlZFRyYWNrRW5jb2RpbmdzXG4gICAgICAgICAgICAuZ2V0KHRyYWNrSWQpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZmlsdGVyKChlbikgPT4gZW4gIT09IGVuY29kaW5nKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZFRyYWNrRW5jb2RpbmdzLnNldCh0cmFja0lkLCBuZXdEaXNhYmxlZFRyYWNrRW5jb2RpbmdzKTtcbiAgICAgICAgbGV0IHNlbmRlciA9IChfYyA9IHRoaXMuY29ubmVjdGlvbikgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmdldFNlbmRlcnMoKS5maWx0ZXIoKHNlbmRlcikgPT4gc2VuZGVyLnRyYWNrID09PSB0cmFjaylbMF07XG4gICAgICAgIGxldCBwYXJhbXMgPSBzZW5kZXIgPT09IG51bGwgfHwgc2VuZGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZW5kZXIuZ2V0UGFyYW1ldGVycygpO1xuICAgICAgICBwYXJhbXMuZW5jb2RpbmdzLmZpbHRlcigoZW4pID0+IGVuLnJpZCA9PSBlbmNvZGluZylbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc2VuZGVyID09PSBudWxsIHx8IHNlbmRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VuZGVyLnNldFBhcmFtZXRlcnMocGFyYW1zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgdHJhY2sgZW5jb2Rpbmcgc28gdGhhdCBpdCB3aWxsIGJlIG5vIGxvbmdlciBzZW50IHRvIHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYWNrSWQgLSBpZCBvZiB0cmFja1xuICAgICAqIEBwYXJhbSB7cmFja0VuY29kaW5nfSBlbmNvZGluZyAtIGVuY29kaW5nIHRoYXQgd2lsbCBiZSBkaXNhYmxlZFxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgdHNcbiAgICAgKiBjb25zdCB0cmFja0lkID0gd2VicnRjLmFkZFRyYWNrKHRyYWNrLCBzdHJlYW0sIHt9LCB7ZW5hYmxlZDogdHJ1ZSwgYWN0aXZlX2VuY29kaW5nczogW1wibFwiLCBcIm1cIiwgXCJoXCJdfSk7XG4gICAgICogd2VicnRjLmRpc2FibGVUcmFja0VuY29kaW5nKHRyYWNrSWQsIFwibFwiKTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBkaXNhYmxlVHJhY2tFbmNvZGluZyh0cmFja0lkLCBlbmNvZGluZykge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBsZXQgdHJhY2sgPSAoX2EgPSB0aGlzLmxvY2FsVHJhY2tJZFRvVHJhY2suZ2V0KHRyYWNrSWQpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudHJhY2s7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRUcmFja0VuY29kaW5ncy5nZXQodHJhY2tJZCkucHVzaChlbmNvZGluZyk7XG4gICAgICAgIGxldCBzZW5kZXIgPSAoX2IgPSB0aGlzLmNvbm5lY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5nZXRTZW5kZXJzKCkuZmlsdGVyKChzZW5kZXIpID0+IHNlbmRlci50cmFjayA9PT0gdHJhY2spWzBdO1xuICAgICAgICBsZXQgcGFyYW1zID0gc2VuZGVyID09PSBudWxsIHx8IHNlbmRlciA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VuZGVyLmdldFBhcmFtZXRlcnMoKTtcbiAgICAgICAgcGFyYW1zLmVuY29kaW5ncy5maWx0ZXIoKGVuKSA9PiBlbi5yaWQgPT0gZW5jb2RpbmcpWzBdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzZW5kZXIgPT09IG51bGwgfHwgc2VuZGVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZW5kZXIuc2V0UGFyYW1ldGVycyhwYXJhbXMpO1xuICAgIH1cbiAgICBmaW5kU2VuZGVyKHRyYWNrSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5nZXRTZW5kZXJzKCkuZmluZCgoc2VuZGVyKSA9PiBzZW5kZXIudHJhY2sgJiYgc2VuZGVyLnRyYWNrLmlkID09PSB0cmFja0lkKTtcbiAgICB9XG4gICAgZ2V0VHJhY2tJZCh1dWlkKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldFBlZXJJZCgpfToke3V1aWR9YDtcbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlQW5kU2VuZE9mZmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZmVyID0gYXdhaXQgdGhpcy5jb25uZWN0aW9uLmNyZWF0ZU9mZmVyKCk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlcik7XG4gICAgICAgICAgICBsZXQgbWVkaWFFdmVudCA9IG1lZGlhRXZlbnRfMS5nZW5lcmF0ZUN1c3RvbUV2ZW50KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNkcE9mZmVyXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBzZHBPZmZlcjogb2ZmZXIsXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrSWRUb1RyYWNrTWV0YWRhdGE6IHRoaXMuZ2V0VHJhY2tJZFRvTWV0YWRhdGEoKSxcbiAgICAgICAgICAgICAgICAgICAgbWlkVG9UcmFja0lkOiB0aGlzLmdldE1pZFRvVHJhY2tJZCgpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2VuZE1lZGlhRXZlbnQobWVkaWFFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuTWVtYnJhbmVXZWJSVEMgPSBNZW1icmFuZVdlYlJUQztcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTWVtYnJhbmVXZWJSVEMgPSB2b2lkIDA7XG52YXIgbWVtYnJhbmVXZWJSVENfMSA9IHJlcXVpcmUoXCIuL21lbWJyYW5lV2ViUlRDXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTWVtYnJhbmVXZWJSVENcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lbWJyYW5lV2ViUlRDXzEuTWVtYnJhbmVXZWJSVEM7IH0gfSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBzdHIgPT4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCkqXS9nLCB4ID0+IGAlJHt4LmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9YCk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xudmFyIHRva2VuID0gJyVbYS1mMC05XXsyfSc7XG52YXIgc2luZ2xlTWF0Y2hlciA9IG5ldyBSZWdFeHAodG9rZW4sICdnaScpO1xudmFyIG11bHRpTWF0Y2hlciA9IG5ldyBSZWdFeHAoJygnICsgdG9rZW4gKyAnKSsnLCAnZ2knKTtcblxuZnVuY3Rpb24gZGVjb2RlQ29tcG9uZW50cyhjb21wb25lbnRzLCBzcGxpdCkge1xuXHR0cnkge1xuXHRcdC8vIFRyeSB0byBkZWNvZGUgdGhlIGVudGlyZSBzdHJpbmcgZmlyc3Rcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGNvbXBvbmVudHMuam9pbignJykpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBEbyBub3RoaW5nXG5cdH1cblxuXHRpZiAoY29tcG9uZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50cztcblx0fVxuXG5cdHNwbGl0ID0gc3BsaXQgfHwgMTtcblxuXHQvLyBTcGxpdCB0aGUgYXJyYXkgaW4gMiBwYXJ0c1xuXHR2YXIgbGVmdCA9IGNvbXBvbmVudHMuc2xpY2UoMCwgc3BsaXQpO1xuXHR2YXIgcmlnaHQgPSBjb21wb25lbnRzLnNsaWNlKHNwbGl0KTtcblxuXHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5jYWxsKFtdLCBkZWNvZGVDb21wb25lbnRzKGxlZnQpLCBkZWNvZGVDb21wb25lbnRzKHJpZ2h0KSk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoaW5wdXQpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHR2YXIgdG9rZW5zID0gaW5wdXQubWF0Y2goc2luZ2xlTWF0Y2hlcik7XG5cblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aW5wdXQgPSBkZWNvZGVDb21wb25lbnRzKHRva2VucywgaSkuam9pbignJyk7XG5cblx0XHRcdHRva2VucyA9IGlucHV0Lm1hdGNoKHNpbmdsZU1hdGNoZXIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBpbnB1dDtcblx0fVxufVxuXG5mdW5jdGlvbiBjdXN0b21EZWNvZGVVUklDb21wb25lbnQoaW5wdXQpIHtcblx0Ly8gS2VlcCB0cmFjayBvZiBhbGwgdGhlIHJlcGxhY2VtZW50cyBhbmQgcHJlZmlsbCB0aGUgbWFwIHdpdGggdGhlIGBCT01gXG5cdHZhciByZXBsYWNlTWFwID0ge1xuXHRcdCclRkUlRkYnOiAnXFx1RkZGRFxcdUZGRkQnLFxuXHRcdCclRkYlRkUnOiAnXFx1RkZGRFxcdUZGRkQnXG5cdH07XG5cblx0dmFyIG1hdGNoID0gbXVsdGlNYXRjaGVyLmV4ZWMoaW5wdXQpO1xuXHR3aGlsZSAobWF0Y2gpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gRGVjb2RlIGFzIGJpZyBjaHVua3MgYXMgcG9zc2libGVcblx0XHRcdHJlcGxhY2VNYXBbbWF0Y2hbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzBdKTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHZhciByZXN1bHQgPSBkZWNvZGUobWF0Y2hbMF0pO1xuXG5cdFx0XHRpZiAocmVzdWx0ICE9PSBtYXRjaFswXSkge1xuXHRcdFx0XHRyZXBsYWNlTWFwW21hdGNoWzBdXSA9IHJlc3VsdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRtYXRjaCA9IG11bHRpTWF0Y2hlci5leGVjKGlucHV0KTtcblx0fVxuXG5cdC8vIEFkZCBgJUMyYCBhdCB0aGUgZW5kIG9mIHRoZSBtYXAgdG8gbWFrZSBzdXJlIGl0IGRvZXMgbm90IHJlcGxhY2UgdGhlIGNvbWJpbmF0b3IgYmVmb3JlIGV2ZXJ5dGhpbmcgZWxzZVxuXHRyZXBsYWNlTWFwWyclQzInXSA9ICdcXHVGRkZEJztcblxuXHR2YXIgZW50cmllcyA9IE9iamVjdC5rZXlzKHJlcGxhY2VNYXApO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdC8vIFJlcGxhY2UgYWxsIGRlY29kZWQgY29tcG9uZW50c1xuXHRcdHZhciBrZXkgPSBlbnRyaWVzW2ldO1xuXHRcdGlucHV0ID0gaW5wdXQucmVwbGFjZShuZXcgUmVnRXhwKGtleSwgJ2cnKSwgcmVwbGFjZU1hcFtrZXldKTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZW5jb2RlZFVSSSkge1xuXHRpZiAodHlwZW9mIGVuY29kZWRVUkkgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYGVuY29kZWRVUklgIHRvIGJlIG9mIHR5cGUgYHN0cmluZ2AsIGdvdCBgJyArIHR5cGVvZiBlbmNvZGVkVVJJICsgJ2AnKTtcblx0fVxuXG5cdHRyeSB7XG5cdFx0ZW5jb2RlZFVSSSA9IGVuY29kZWRVUkkucmVwbGFjZSgvXFwrL2csICcgJyk7XG5cblx0XHQvLyBUcnkgdGhlIGJ1aWx0IGluIGRlY29kZXIgZmlyc3Rcblx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZWRVUkkpO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBGYWxsYmFjayB0byBhIG1vcmUgYWR2YW5jZWQgZGVjb2RlclxuXHRcdHJldHVybiBjdXN0b21EZWNvZGVVUklDb21wb25lbnQoZW5jb2RlZFVSSSk7XG5cdH1cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChzdHJpbmcsIHNlcGFyYXRvcikgPT4ge1xuXHRpZiAoISh0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJyAmJiB0eXBlb2Ygc2VwYXJhdG9yID09PSAnc3RyaW5nJykpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgYXJndW1lbnRzIHRvIGJlIG9mIHR5cGUgYHN0cmluZ2AnKTtcblx0fVxuXG5cdGlmIChzZXBhcmF0b3IgPT09ICcnKSB7XG5cdFx0cmV0dXJuIFtzdHJpbmddO1xuXHR9XG5cblx0Y29uc3Qgc2VwYXJhdG9ySW5kZXggPSBzdHJpbmcuaW5kZXhPZihzZXBhcmF0b3IpO1xuXG5cdGlmIChzZXBhcmF0b3JJbmRleCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gW3N0cmluZ107XG5cdH1cblxuXHRyZXR1cm4gW1xuXHRcdHN0cmluZy5zbGljZSgwLCBzZXBhcmF0b3JJbmRleCksXG5cdFx0c3RyaW5nLnNsaWNlKHNlcGFyYXRvckluZGV4ICsgc2VwYXJhdG9yLmxlbmd0aClcblx0XTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBwcmVkaWNhdGUpIHtcblx0dmFyIHJldCA9IHt9O1xuXHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cdHZhciBpc0FyciA9IEFycmF5LmlzQXJyYXkocHJlZGljYXRlKTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIga2V5ID0ga2V5c1tpXTtcblx0XHR2YXIgdmFsID0gb2JqW2tleV07XG5cblx0XHRpZiAoaXNBcnIgPyBwcmVkaWNhdGUuaW5kZXhPZihrZXkpICE9PSAtMSA6IHByZWRpY2F0ZShrZXksIHZhbCwgb2JqKSkge1xuXHRcdFx0cmV0W2tleV0gPSB2YWw7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJldDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgc3RyaWN0VXJpRW5jb2RlID0gcmVxdWlyZSgnc3RyaWN0LXVyaS1lbmNvZGUnKTtcbmNvbnN0IGRlY29kZUNvbXBvbmVudCA9IHJlcXVpcmUoJ2RlY29kZS11cmktY29tcG9uZW50Jyk7XG5jb25zdCBzcGxpdE9uRmlyc3QgPSByZXF1aXJlKCdzcGxpdC1vbi1maXJzdCcpO1xuY29uc3QgZmlsdGVyT2JqZWN0ID0gcmVxdWlyZSgnZmlsdGVyLW9iaicpO1xuXG5jb25zdCBpc051bGxPclVuZGVmaW5lZCA9IHZhbHVlID0+IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQ7XG5cbmNvbnN0IGVuY29kZUZyYWdtZW50SWRlbnRpZmllciA9IFN5bWJvbCgnZW5jb2RlRnJhZ21lbnRJZGVudGlmaWVyJyk7XG5cbmZ1bmN0aW9uIGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKSB7XG5cdHN3aXRjaCAob3B0aW9ucy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0Y29uc3QgaW5kZXggPSByZXN1bHQubGVuZ3RoO1xuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbJywgaW5kZXgsICddJ10uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0XHQuLi5yZXN1bHQsXG5cdFx0XHRcdFx0W2VuY29kZShrZXksIG9wdGlvbnMpLCAnWycsIGVuY29kZShpbmRleCwgb3B0aW9ucyksICddPScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXG5cdFx0XHRcdF07XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbXSddLmpvaW4oJycpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICdbXT0nLCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKCcnKV07XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnY29sb24tbGlzdC1zZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIGtleSA9PiAocmVzdWx0LCB2YWx1ZSkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0dmFsdWUgPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBOdWxsICYmIHZhbHVlID09PSBudWxsKSB8fFxuXHRcdFx0XHRcdChvcHRpb25zLnNraXBFbXB0eVN0cmluZyAmJiB2YWx1ZSA9PT0gJycpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gWy4uLnJlc3VsdCwgW2VuY29kZShrZXksIG9wdGlvbnMpLCAnOmxpc3Q9J10uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIFtlbmNvZGUoa2V5LCBvcHRpb25zKSwgJzpsaXN0PScsIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyldLmpvaW4oJycpXTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdjb21tYSc6XG5cdFx0Y2FzZSAnc2VwYXJhdG9yJzpcblx0XHRjYXNlICdicmFja2V0LXNlcGFyYXRvcic6IHtcblx0XHRcdGNvbnN0IGtleVZhbHVlU2VwID0gb3B0aW9ucy5hcnJheUZvcm1hdCA9PT0gJ2JyYWNrZXQtc2VwYXJhdG9yJyA/XG5cdFx0XHRcdCdbXT0nIDpcblx0XHRcdFx0Jz0nO1xuXG5cdFx0XHRyZXR1cm4ga2V5ID0+IChyZXN1bHQsIHZhbHVlKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcE51bGwgJiYgdmFsdWUgPT09IG51bGwpIHx8XG5cdFx0XHRcdFx0KG9wdGlvbnMuc2tpcEVtcHR5U3RyaW5nICYmIHZhbHVlID09PSAnJylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFRyYW5zbGF0ZSBudWxsIHRvIGFuIGVtcHR5IHN0cmluZyBzbyB0aGF0IGl0IGRvZXNuJ3Qgc2VyaWFsaXplIGFzICdudWxsJ1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlID09PSBudWxsID8gJycgOiB2YWx1ZTtcblxuXHRcdFx0XHRpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHJldHVybiBbW2VuY29kZShrZXksIG9wdGlvbnMpLCBrZXlWYWx1ZVNlcCwgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFtbcmVzdWx0LCBlbmNvZGUodmFsdWUsIG9wdGlvbnMpXS5qb2luKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpXTtcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBrZXkgPT4gKHJlc3VsdCwgdmFsdWUpID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHZhbHVlID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwTnVsbCAmJiB2YWx1ZSA9PT0gbnVsbCkgfHxcblx0XHRcdFx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgdmFsdWUgPT09ICcnKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFsuLi5yZXN1bHQsIGVuY29kZShrZXksIG9wdGlvbnMpXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBbLi4ucmVzdWx0LCBbZW5jb2RlKGtleSwgb3B0aW9ucyksICc9JywgZW5jb2RlKHZhbHVlLCBvcHRpb25zKV0uam9pbignJyldO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKSB7XG5cdGxldCByZXN1bHQ7XG5cblx0c3dpdGNoIChvcHRpb25zLmFycmF5Rm9ybWF0KSB7XG5cdFx0Y2FzZSAnaW5kZXgnOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRyZXN1bHQgPSAvXFxbKFxcZCopXFxdJC8uZXhlYyhrZXkpO1xuXG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXGQqXFxdJC8sICcnKTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XVtyZXN1bHRbMV1dID0gdmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSA9PiB7XG5cdFx0XHRcdHJlc3VsdCA9IC8oXFxbXFxdKSQvLmV4ZWMoa2V5KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1xcW1xcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbdmFsdWVdO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2NvbG9uLWxpc3Qtc2VwYXJhdG9yJzpcblx0XHRcdHJldHVybiAoa2V5LCB2YWx1ZSwgYWNjdW11bGF0b3IpID0+IHtcblx0XHRcdFx0cmVzdWx0ID0gLyg6bGlzdCkkLy5leGVjKGtleSk7XG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC86bGlzdCQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbdmFsdWVdO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblxuXHRcdGNhc2UgJ2NvbW1hJzpcblx0XHRjYXNlICdzZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRjb25zdCBpc0FycmF5ID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiB2YWx1ZS5pbmNsdWRlcyhvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKTtcblx0XHRcdFx0Y29uc3QgaXNFbmNvZGVkQXJyYXkgPSAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAhaXNBcnJheSAmJiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpLmluY2x1ZGVzKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpKTtcblx0XHRcdFx0dmFsdWUgPSBpc0VuY29kZWRBcnJheSA/IGRlY29kZSh2YWx1ZSwgb3B0aW9ucykgOiB2YWx1ZTtcblx0XHRcdFx0Y29uc3QgbmV3VmFsdWUgPSBpc0FycmF5IHx8IGlzRW5jb2RlZEFycmF5ID8gdmFsdWUuc3BsaXQob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikubWFwKGl0ZW0gPT4gZGVjb2RlKGl0ZW0sIG9wdGlvbnMpKSA6IHZhbHVlID09PSBudWxsID8gdmFsdWUgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gbmV3VmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldC1zZXBhcmF0b3InOlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRjb25zdCBpc0FycmF5ID0gLyhcXFtcXF0pJC8udGVzdChrZXkpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvXFxbXFxdJC8sICcnKTtcblxuXHRcdFx0XHRpZiAoIWlzQXJyYXkpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWUgPyBkZWNvZGUodmFsdWUsIG9wdGlvbnMpIDogdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgYXJyYXlWYWx1ZSA9IHZhbHVlID09PSBudWxsID9cblx0XHRcdFx0XHRbXSA6XG5cdFx0XHRcdFx0dmFsdWUuc3BsaXQob3B0aW9ucy5hcnJheUZvcm1hdFNlcGFyYXRvcikubWFwKGl0ZW0gPT4gZGVjb2RlKGl0ZW0sIG9wdGlvbnMpKTtcblxuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IGFycmF5VmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IFtdLmNvbmNhdChhY2N1bXVsYXRvcltrZXldLCBhcnJheVZhbHVlKTtcblx0XHRcdH07XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikgPT4ge1xuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHZhbHVlO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IHZhbHVlLmxlbmd0aCAhPT0gMSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2FycmF5Rm9ybWF0U2VwYXJhdG9yIG11c3QgYmUgc2luZ2xlIGNoYXJhY3RlciBzdHJpbmcnKTtcblx0fVxufVxuXG5mdW5jdGlvbiBlbmNvZGUodmFsdWUsIG9wdGlvbnMpIHtcblx0aWYgKG9wdGlvbnMuZW5jb2RlKSB7XG5cdFx0cmV0dXJuIG9wdGlvbnMuc3RyaWN0ID8gc3RyaWN0VXJpRW5jb2RlKHZhbHVlKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGRlY29kZSh2YWx1ZSwgb3B0aW9ucykge1xuXHRpZiAob3B0aW9ucy5kZWNvZGUpIHtcblx0XHRyZXR1cm4gZGVjb2RlQ29tcG9uZW50KHZhbHVlKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24ga2V5c1NvcnRlcihpbnB1dCkge1xuXHRpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcblx0XHRyZXR1cm4gaW5wdXQuc29ydCgpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4ga2V5c1NvcnRlcihPYmplY3Qua2V5cyhpbnB1dCkpXG5cdFx0XHQuc29ydCgoYSwgYikgPT4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpKVxuXHRcdFx0Lm1hcChrZXkgPT4gaW5wdXRba2V5XSk7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhc2goaW5wdXQpIHtcblx0Y29uc3QgaGFzaFN0YXJ0ID0gaW5wdXQuaW5kZXhPZignIycpO1xuXHRpZiAoaGFzaFN0YXJ0ICE9PSAtMSkge1xuXHRcdGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgaGFzaFN0YXJ0KTtcblx0fVxuXG5cdHJldHVybiBpbnB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0SGFzaCh1cmwpIHtcblx0bGV0IGhhc2ggPSAnJztcblx0Y29uc3QgaGFzaFN0YXJ0ID0gdXJsLmluZGV4T2YoJyMnKTtcblx0aWYgKGhhc2hTdGFydCAhPT0gLTEpIHtcblx0XHRoYXNoID0gdXJsLnNsaWNlKGhhc2hTdGFydCk7XG5cdH1cblxuXHRyZXR1cm4gaGFzaDtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdChpbnB1dCkge1xuXHRpbnB1dCA9IHJlbW92ZUhhc2goaW5wdXQpO1xuXHRjb25zdCBxdWVyeVN0YXJ0ID0gaW5wdXQuaW5kZXhPZignPycpO1xuXHRpZiAocXVlcnlTdGFydCA9PT0gLTEpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRyZXR1cm4gaW5wdXQuc2xpY2UocXVlcnlTdGFydCArIDEpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVZhbHVlKHZhbHVlLCBvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zLnBhcnNlTnVtYmVycyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZSkpICYmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLnRyaW0oKSAhPT0gJycpKSB7XG5cdFx0dmFsdWUgPSBOdW1iZXIodmFsdWUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMucGFyc2VCb29sZWFucyAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAodmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnIHx8IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09ICdmYWxzZScpKSB7XG5cdFx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSAndHJ1ZSc7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHBhcnNlKHF1ZXJ5LCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcblx0XHRkZWNvZGU6IHRydWUsXG5cdFx0c29ydDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnLFxuXHRcdGFycmF5Rm9ybWF0U2VwYXJhdG9yOiAnLCcsXG5cdFx0cGFyc2VOdW1iZXJzOiBmYWxzZSxcblx0XHRwYXJzZUJvb2xlYW5zOiBmYWxzZVxuXHR9LCBvcHRpb25zKTtcblxuXHR2YWxpZGF0ZUFycmF5Rm9ybWF0U2VwYXJhdG9yKG9wdGlvbnMuYXJyYXlGb3JtYXRTZXBhcmF0b3IpO1xuXG5cdGNvbnN0IGZvcm1hdHRlciA9IHBhcnNlckZvckFycmF5Rm9ybWF0KG9wdGlvbnMpO1xuXG5cdC8vIENyZWF0ZSBhbiBvYmplY3Qgd2l0aCBubyBwcm90b3R5cGVcblx0Y29uc3QgcmV0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuXHRpZiAodHlwZW9mIHF1ZXJ5ICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRxdWVyeSA9IHF1ZXJ5LnRyaW0oKS5yZXBsYWNlKC9eWz8jJl0vLCAnJyk7XG5cblx0aWYgKCFxdWVyeSkge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRmb3IgKGNvbnN0IHBhcmFtIG9mIHF1ZXJ5LnNwbGl0KCcmJykpIHtcblx0XHRpZiAocGFyYW0gPT09ICcnKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRsZXQgW2tleSwgdmFsdWVdID0gc3BsaXRPbkZpcnN0KG9wdGlvbnMuZGVjb2RlID8gcGFyYW0ucmVwbGFjZSgvXFwrL2csICcgJykgOiBwYXJhbSwgJz0nKTtcblxuXHRcdC8vIE1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG5cdFx0Ly8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuXHRcdHZhbHVlID0gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBbJ2NvbW1hJywgJ3NlcGFyYXRvcicsICdicmFja2V0LXNlcGFyYXRvciddLmluY2x1ZGVzKG9wdGlvbnMuYXJyYXlGb3JtYXQpID8gdmFsdWUgOiBkZWNvZGUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdGZvcm1hdHRlcihkZWNvZGUoa2V5LCBvcHRpb25zKSwgdmFsdWUsIHJldCk7XG5cdH1cblxuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZXQpKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSByZXRba2V5XTtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuXHRcdFx0Zm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuXHRcdFx0XHR2YWx1ZVtrXSA9IHBhcnNlVmFsdWUodmFsdWVba10sIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXRba2V5XSA9IHBhcnNlVmFsdWUodmFsdWUsIG9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNvcnQgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHJldHVybiAob3B0aW9ucy5zb3J0ID09PSB0cnVlID8gT2JqZWN0LmtleXMocmV0KS5zb3J0KCkgOiBPYmplY3Qua2V5cyhyZXQpLnNvcnQob3B0aW9ucy5zb3J0KSkucmVkdWNlKChyZXN1bHQsIGtleSkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gcmV0W2tleV07XG5cdFx0aWYgKEJvb2xlYW4odmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHQvLyBTb3J0IG9iamVjdCBrZXlzLCBub3QgdmFsdWVzXG5cdFx0XHRyZXN1bHRba2V5XSA9IGtleXNTb3J0ZXIodmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHRba2V5XSA9IHZhbHVlO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufVxuXG5leHBvcnRzLmV4dHJhY3QgPSBleHRyYWN0O1xuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXG5leHBvcnRzLnN0cmluZ2lmeSA9IChvYmplY3QsIG9wdGlvbnMpID0+IHtcblx0aWYgKCFvYmplY3QpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0ZW5jb2RlOiB0cnVlLFxuXHRcdHN0cmljdDogdHJ1ZSxcblx0XHRhcnJheUZvcm1hdDogJ25vbmUnLFxuXHRcdGFycmF5Rm9ybWF0U2VwYXJhdG9yOiAnLCdcblx0fSwgb3B0aW9ucyk7XG5cblx0dmFsaWRhdGVBcnJheUZvcm1hdFNlcGFyYXRvcihvcHRpb25zLmFycmF5Rm9ybWF0U2VwYXJhdG9yKTtcblxuXHRjb25zdCBzaG91bGRGaWx0ZXIgPSBrZXkgPT4gKFxuXHRcdChvcHRpb25zLnNraXBOdWxsICYmIGlzTnVsbE9yVW5kZWZpbmVkKG9iamVjdFtrZXldKSkgfHxcblx0XHQob3B0aW9ucy5za2lwRW1wdHlTdHJpbmcgJiYgb2JqZWN0W2tleV0gPT09ICcnKVxuXHQpO1xuXG5cdGNvbnN0IGZvcm1hdHRlciA9IGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRpb25zKTtcblxuXHRjb25zdCBvYmplY3RDb3B5ID0ge307XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob2JqZWN0KSkge1xuXHRcdGlmICghc2hvdWxkRmlsdGVyKGtleSkpIHtcblx0XHRcdG9iamVjdENvcHlba2V5XSA9IG9iamVjdFtrZXldO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3RDb3B5KTtcblxuXHRpZiAob3B0aW9ucy5zb3J0ICE9PSBmYWxzZSkge1xuXHRcdGtleXMuc29ydChvcHRpb25zLnNvcnQpO1xuXHR9XG5cblx0cmV0dXJuIGtleXMubWFwKGtleSA9PiB7XG5cdFx0Y29uc3QgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuXHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXG5cdFx0aWYgKHZhbHVlID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRpZiAodmFsdWUubGVuZ3RoID09PSAwICYmIG9wdGlvbnMuYXJyYXlGb3JtYXQgPT09ICdicmFja2V0LXNlcGFyYXRvcicpIHtcblx0XHRcdFx0cmV0dXJuIGVuY29kZShrZXksIG9wdGlvbnMpICsgJ1tdJztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0XHRcdC5yZWR1Y2UoZm9ybWF0dGVyKGtleSksIFtdKVxuXHRcdFx0XHQuam9pbignJicpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRpb25zKSArICc9JyArIGVuY29kZSh2YWx1ZSwgb3B0aW9ucyk7XG5cdH0pLmZpbHRlcih4ID0+IHgubGVuZ3RoID4gMCkuam9pbignJicpO1xufTtcblxuZXhwb3J0cy5wYXJzZVVybCA9ICh1cmwsIG9wdGlvbnMpID0+IHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGRlY29kZTogdHJ1ZVxuXHR9LCBvcHRpb25zKTtcblxuXHRjb25zdCBbdXJsXywgaGFzaF0gPSBzcGxpdE9uRmlyc3QodXJsLCAnIycpO1xuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdHtcblx0XHRcdHVybDogdXJsXy5zcGxpdCgnPycpWzBdIHx8ICcnLFxuXHRcdFx0cXVlcnk6IHBhcnNlKGV4dHJhY3QodXJsKSwgb3B0aW9ucylcblx0XHR9LFxuXHRcdG9wdGlvbnMgJiYgb3B0aW9ucy5wYXJzZUZyYWdtZW50SWRlbnRpZmllciAmJiBoYXNoID8ge2ZyYWdtZW50SWRlbnRpZmllcjogZGVjb2RlKGhhc2gsIG9wdGlvbnMpfSA6IHt9XG5cdCk7XG59O1xuXG5leHBvcnRzLnN0cmluZ2lmeVVybCA9IChvYmplY3QsIG9wdGlvbnMpID0+IHtcblx0b3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuXHRcdGVuY29kZTogdHJ1ZSxcblx0XHRzdHJpY3Q6IHRydWUsXG5cdFx0W2VuY29kZUZyYWdtZW50SWRlbnRpZmllcl06IHRydWVcblx0fSwgb3B0aW9ucyk7XG5cblx0Y29uc3QgdXJsID0gcmVtb3ZlSGFzaChvYmplY3QudXJsKS5zcGxpdCgnPycpWzBdIHx8ICcnO1xuXHRjb25zdCBxdWVyeUZyb21VcmwgPSBleHBvcnRzLmV4dHJhY3Qob2JqZWN0LnVybCk7XG5cdGNvbnN0IHBhcnNlZFF1ZXJ5RnJvbVVybCA9IGV4cG9ydHMucGFyc2UocXVlcnlGcm9tVXJsLCB7c29ydDogZmFsc2V9KTtcblxuXHRjb25zdCBxdWVyeSA9IE9iamVjdC5hc3NpZ24ocGFyc2VkUXVlcnlGcm9tVXJsLCBvYmplY3QucXVlcnkpO1xuXHRsZXQgcXVlcnlTdHJpbmcgPSBleHBvcnRzLnN0cmluZ2lmeShxdWVyeSwgb3B0aW9ucyk7XG5cdGlmIChxdWVyeVN0cmluZykge1xuXHRcdHF1ZXJ5U3RyaW5nID0gYD8ke3F1ZXJ5U3RyaW5nfWA7XG5cdH1cblxuXHRsZXQgaGFzaCA9IGdldEhhc2gob2JqZWN0LnVybCk7XG5cdGlmIChvYmplY3QuZnJhZ21lbnRJZGVudGlmaWVyKSB7XG5cdFx0aGFzaCA9IGAjJHtvcHRpb25zW2VuY29kZUZyYWdtZW50SWRlbnRpZmllcl0gPyBlbmNvZGUob2JqZWN0LmZyYWdtZW50SWRlbnRpZmllciwgb3B0aW9ucykgOiBvYmplY3QuZnJhZ21lbnRJZGVudGlmaWVyfWA7XG5cdH1cblxuXHRyZXR1cm4gYCR7dXJsfSR7cXVlcnlTdHJpbmd9JHtoYXNofWA7XG59O1xuXG5leHBvcnRzLnBpY2sgPSAoaW5wdXQsIGZpbHRlciwgb3B0aW9ucykgPT4ge1xuXHRvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG5cdFx0cGFyc2VGcmFnbWVudElkZW50aWZpZXI6IHRydWUsXG5cdFx0W2VuY29kZUZyYWdtZW50SWRlbnRpZmllcl06IGZhbHNlXG5cdH0sIG9wdGlvbnMpO1xuXG5cdGNvbnN0IHt1cmwsIHF1ZXJ5LCBmcmFnbWVudElkZW50aWZpZXJ9ID0gZXhwb3J0cy5wYXJzZVVybChpbnB1dCwgb3B0aW9ucyk7XG5cdHJldHVybiBleHBvcnRzLnN0cmluZ2lmeVVybCh7XG5cdFx0dXJsLFxuXHRcdHF1ZXJ5OiBmaWx0ZXJPYmplY3QocXVlcnksIGZpbHRlciksXG5cdFx0ZnJhZ21lbnRJZGVudGlmaWVyXG5cdH0sIG9wdGlvbnMpO1xufTtcblxuZXhwb3J0cy5leGNsdWRlID0gKGlucHV0LCBmaWx0ZXIsIG9wdGlvbnMpID0+IHtcblx0Y29uc3QgZXhjbHVzaW9uRmlsdGVyID0gQXJyYXkuaXNBcnJheShmaWx0ZXIpID8ga2V5ID0+ICFmaWx0ZXIuaW5jbHVkZXMoa2V5KSA6IChrZXksIHZhbHVlKSA9PiAhZmlsdGVyKGtleSwgdmFsdWUpO1xuXG5cdHJldHVybiBleHBvcnRzLnBpY2soaW5wdXQsIGV4Y2x1c2lvbkZpbHRlciwgb3B0aW9ucyk7XG59O1xuIiwgImV4cG9ydCBjb25zdCBNRURJQV9DT05TVFJBSU5UUzogTWVkaWFTdHJlYW1Db25zdHJhaW50cyA9IHtcbiAgYXVkaW86IHRydWUsXG4gIHZpZGVvOiB7IHdpZHRoOiA2NDAsIGhlaWdodDogMzYwLCBmcmFtZVJhdGU6IDI0IH0sXG59O1xuXG5leHBvcnQgY29uc3QgTE9DQUxfUEVFUl9JRCA9IFwibG9jYWwtcGVlclwiO1xuIiwgImV4cG9ydCBmdW5jdGlvbiBnZXRSb29tSWQoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vbVwiKSEuZGF0YXNldC5yb29tSWQhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBEaXNjb25uZWN0QnV0dG9uKGZ1bjogYW55KSB7XG4gIGNvbnN0IGRpc2Nvbm5lY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcImRpc2Nvbm5lY3RcIlxuICApISBhcyBIVE1MQnV0dG9uRWxlbWVudDtcbiAgZGlzY29ubmVjdEJ1dHRvbi5vbmNsaWNrID0gZnVuO1xufVxuXG5mdW5jdGlvbiBlbGVtZW50SWQocGVlcklkOiBzdHJpbmcsIHR5cGU6IFwidmlkZW9cIiB8IFwiYXVkaW9cIiB8IFwiZmVlZFwiKSB7XG4gIHJldHVybiBgJHt0eXBlfS0ke3BlZXJJZH1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXR0YWNoU3RyZWFtKHN0cmVhbTogTWVkaWFTdHJlYW0sIHBlZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gIGNvbnN0IHZpZGVvSWQgPSBlbGVtZW50SWQocGVlcklkLCBcInZpZGVvXCIpO1xuICBjb25zdCBhdWRpb0lkID0gZWxlbWVudElkKHBlZXJJZCwgXCJhdWRpb1wiKTtcblxuICBsZXQgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWRlb0lkKSBhcyBIVE1MVmlkZW9FbGVtZW50O1xuICBsZXQgYXVkaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhdWRpb0lkKSBhcyBIVE1MQXVkaW9FbGVtZW50O1xuXG4gIHZpZGVvLnNyY09iamVjdCA9IHN0cmVhbTtcbiAgYXVkaW8uc3JjT2JqZWN0ID0gc3RyZWFtO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkVmlkZW9FbGVtZW50KFxuICBwZWVySWQ6IHN0cmluZyxcbiAgbGFiZWw6IHN0cmluZyxcbiAgaXNMb2NhbFZpZGVvOiBib29sZWFuXG4pOiB2b2lkIHtcbiAgY29uc3QgdmlkZW9JZCA9IGVsZW1lbnRJZChwZWVySWQsIFwidmlkZW9cIik7XG4gIGNvbnN0IGF1ZGlvSWQgPSBlbGVtZW50SWQocGVlcklkLCBcImF1ZGlvXCIpO1xuXG4gIGxldCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZGVvSWQpIGFzIEhUTUxWaWRlb0VsZW1lbnQ7XG4gIGxldCBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGF1ZGlvSWQpIGFzIEhUTUxBdWRpb0VsZW1lbnQ7XG5cbiAgaWYgKCF2aWRlbyAmJiAhYXVkaW8pIHtcbiAgICBjb25zdCB2YWx1ZXMgPSBzZXR1cFZpZGVvRmVlZChwZWVySWQsIGxhYmVsLCBpc0xvY2FsVmlkZW8pO1xuICAgIHZpZGVvID0gdmFsdWVzLnZpZGVvO1xuICAgIGF1ZGlvID0gdmFsdWVzLmF1ZGlvO1xuICB9XG5cbiAgdmlkZW8uaWQgPSB2aWRlb0lkO1xuICB2aWRlby5hdXRvcGxheSA9IHRydWU7XG4gIHZpZGVvLnBsYXlzSW5saW5lID0gdHJ1ZTtcbiAgdmlkZW8ubXV0ZWQgPSB0cnVlO1xuXG4gIGF1ZGlvLmlkID0gYXVkaW9JZDtcbiAgYXVkaW8uYXV0b3BsYXkgPSB0cnVlO1xuICBpZiAoaXNMb2NhbFZpZGVvKSB7XG4gICAgYXVkaW8ubXV0ZWQgPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRQYXJ0aWNpcGFudHNMaXN0KHBhcnRpY2lwYW50czogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICBjb25zdCBwYXJ0aWNpcGFudHNOYW1lc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgXCJwYXJ0aWNpcGFudHMtbGlzdFwiXG4gICkgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIHBhcnRpY2lwYW50c05hbWVzRWwuaW5uZXJIVE1MID1cbiAgICBcIjxiPlBhcnRpY2lwYW50czwvYj46IFwiICsgcGFydGljaXBhbnRzLmpvaW4oXCIsIFwiKTtcbn1cblxuZnVuY3Rpb24gcmVzaXplVmlkZW9zR3JpZCgpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW9zLWdyaWRcIikhO1xuXG4gIGNvbnN0IHZpZGVvcyA9IGdyaWQuY2hpbGRyZW4ubGVuZ3RoO1xuXG4gIGxldCB2aWRlb3NQZXJSb3c7XG5cbiAgLy8gYnJlYWsgcG9pbnRzIGZvciBncmlkIGxheW91dFxuICBpZiAodmlkZW9zIDwgMikge1xuICAgIHZpZGVvc1BlclJvdyA9IDE7XG4gIH0gZWxzZSBpZiAodmlkZW9zIDwgNSkge1xuICAgIHZpZGVvc1BlclJvdyA9IDI7XG4gIH0gZWxzZSBpZiAodmlkZW9zIDwgNykge1xuICAgIHZpZGVvc1BlclJvdyA9IDM7XG4gIH0gZWxzZSB7XG4gICAgdmlkZW9zUGVyUm93ID0gNDtcbiAgfVxuXG4gIGxldCBjbGFzc2VzVG9SZW1vdmU6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3QgW2luZGV4LCB2YWx1ZV0gb2YgZ3JpZC5jbGFzc0xpc3QuZW50cmllcygpKSB7XG4gICAgaWYgKHZhbHVlLmluY2x1ZGVzKFwiZ3JpZC1jb2xzXCIpKSB7XG4gICAgICBjbGFzc2VzVG9SZW1vdmUucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgY2xhc3Nlc1RvUmVtb3ZlLmZvckVhY2goKGNsYXNzTmFtZSkgPT4gZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSkpO1xuXG4gIC8vIGFkZCB0aGUgY2xhc3MgdG8gYmUgYSBkZWZhdWx0IGZvciBtb2JpbGVzXG4gIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWQtY29scy0xXCIpO1xuICBncmlkLmNsYXNzTGlzdC5hZGQoYG1kOmdyaWQtY29scy0ke3ZpZGVvc1BlclJvd31gKTtcbn1cblxuZnVuY3Rpb24gc2V0dXBWaWRlb0ZlZWQocGVlcklkOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGlzTG9jYWxWaWRlbzogYm9vbGVhbikge1xuICBjb25zdCBjb3B5ID0gKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdmlkZW8tZmVlZC10ZW1wbGF0ZVwiKSBhcyBIVE1MVGVtcGxhdGVFbGVtZW50XG4gICkuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkgYXMgRWxlbWVudDtcbiAgY29uc3QgZmVlZCA9IGNvcHkucXVlcnlTZWxlY3RvcihcImRpdltuYW1lPSd2aWRlby1mZWVkJ11cIikgYXMgSFRNTERpdkVsZW1lbnQ7XG4gIGNvbnN0IGF1ZGlvID0gZmVlZC5xdWVyeVNlbGVjdG9yKFwiYXVkaW9cIikgYXMgSFRNTEF1ZGlvRWxlbWVudDtcbiAgY29uc3QgdmlkZW8gPSBmZWVkLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKSBhcyBIVE1MVmlkZW9FbGVtZW50O1xuICBjb25zdCB2aWRlb0xhYmVsID0gZmVlZC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiZGl2W25hbWU9J3ZpZGVvLWxhYmVsJ11cIlxuICApIGFzIEhUTUxEaXZFbGVtZW50O1xuXG4gIGZlZWQuaWQgPSBlbGVtZW50SWQocGVlcklkLCBcImZlZWRcIik7XG4gIHZpZGVvTGFiZWwuaW5uZXJUZXh0ID0gbGFiZWw7XG5cbiAgaWYgKGlzTG9jYWxWaWRlbykge1xuICAgIHZpZGVvLmNsYXNzTGlzdC5hZGQoXCJmbGlwLWhvcml6b250YWxseVwiKTtcbiAgfVxuXG4gIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ZpZGVvcy1ncmlkXCIpITtcbiAgZ3JpZC5hcHBlbmRDaGlsZChmZWVkKTtcbiAgcmVzaXplVmlkZW9zR3JpZCgpO1xuXG4gIHJldHVybiB7IGF1ZGlvLCB2aWRlbyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVmlkZW9FbGVtZW50KHBlZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZChwZWVySWQsIFwiZmVlZFwiKSk/LnJlbW92ZSgpO1xuICByZXNpemVWaWRlb3NHcmlkKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRFcnJvck1lc3NhZ2UoXG4gIG1lc3NhZ2U6IHN0cmluZyA9IFwiQ2Fubm90IGNvbm5lY3QgdG8gc2VydmVyLCByZWZyZXNoIHRoZSBwYWdlIGFuZCB0cnkgYWdhaW5cIlxuKTogdm9pZCB7XG4gIGNvbnN0IGVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWRlb2NoYXQtZXJyb3JcIik7XG4gIGlmIChlcnJvckNvbnRhaW5lcikge1xuICAgIGVycm9yQ29udGFpbmVyLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgZXJyb3JDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgfVxufVxuIiwgImltcG9ydCB7IE1FRElBX0NPTlNUUkFJTlRTLCBMT0NBTF9QRUVSX0lEIH0gZnJvbSBcIi4vY29uc3RzXCI7XG5pbXBvcnQge1xuICBhZGRWaWRlb0VsZW1lbnQsXG4gIGdldFJvb21JZCxcbiAgcmVtb3ZlVmlkZW9FbGVtZW50LFxuICBzZXRFcnJvck1lc3NhZ2UsXG4gIHNldFBhcnRpY2lwYW50c0xpc3QsXG4gIGF0dGFjaFN0cmVhbSxcbiAgc2V0dXBEaXNjb25uZWN0QnV0dG9uLFxufSBmcm9tIFwiLi9yb29tX3VpXCI7XG5pbXBvcnQge1xuICBNZW1icmFuZVdlYlJUQyxcbiAgUGVlcixcbiAgU2VyaWFsaXplZE1lZGlhRXZlbnQsXG59IGZyb20gXCJAbWVtYnJhbmVmcmFtZXdvcmsvbWVtYnJhbmUtd2VicnRjLWpzXCI7XG5pbXBvcnQgeyBQdXNoLCBTb2NrZXQgfSBmcm9tIFwicGhvZW5peFwiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwicXVlcnktc3RyaW5nXCI7XG5cbmV4cG9ydCBjbGFzcyBSb29tIHtcbiAgcHJpdmF0ZSBwZWVyczogUGVlcltdID0gW107XG4gIHByaXZhdGUgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBsb2NhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgd2VicnRjOiBNZW1icmFuZVdlYlJUQztcblxuICBwcml2YXRlIHNvY2tldDtcbiAgcHJpdmF0ZSB3ZWJydGNTb2NrZXRSZWZzOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIHdlYnJ0Y0NoYW5uZWw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgU29ja2V0KFwiL3NvY2tldFwiKTtcbiAgICB0aGlzLnNvY2tldC5jb25uZWN0KCk7XG4gICAgdGhpcy5kaXNwbGF5TmFtZSA9IHRoaXMucGFyc2VVcmwoKTtcbiAgICB0aGlzLndlYnJ0Y0NoYW5uZWwgPSB0aGlzLnNvY2tldC5jaGFubmVsKGByb29tOiR7Z2V0Um9vbUlkKCl9YCk7XG5cbiAgICB0aGlzLndlYnJ0Y0NoYW5uZWwub25FcnJvcigoKSA9PiB7XG4gICAgICB0aGlzLnNvY2tldE9mZigpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuICAgIHRoaXMud2VicnRjQ2hhbm5lbC5vbkNsb3NlKCgpID0+IHtcbiAgICAgIHRoaXMuc29ja2V0T2ZmKCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLndlYnJ0Y1NvY2tldFJlZnMucHVzaCh0aGlzLnNvY2tldC5vbkVycm9yKHRoaXMubGVhdmUpKTtcbiAgICB0aGlzLndlYnJ0Y1NvY2tldFJlZnMucHVzaCh0aGlzLnNvY2tldC5vbkNsb3NlKHRoaXMubGVhdmUpKTtcblxuICAgIHRoaXMud2VicnRjID0gbmV3IE1lbWJyYW5lV2ViUlRDKHtcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICBvblNlbmRNZWRpYUV2ZW50OiAobWVkaWFFdmVudDogU2VyaWFsaXplZE1lZGlhRXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLndlYnJ0Y0NoYW5uZWwucHVzaChcIm1lZGlhRXZlbnRcIiwgeyBkYXRhOiBtZWRpYUV2ZW50IH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkNvbm5lY3Rpb25FcnJvcjogc2V0RXJyb3JNZXNzYWdlLFxuICAgICAgICBvbkpvaW5TdWNjZXNzOiAocGVlcklkLCBwZWVyc0luUm9vbSkgPT4ge1xuICAgICAgICAgIHRoaXMubG9jYWxTdHJlYW0hLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PlxuICAgICAgICAgICAgdGhpcy53ZWJydGMuYWRkVHJhY2sodHJhY2ssIHRoaXMubG9jYWxTdHJlYW0hLCB7fSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgdGhpcy5wZWVycyA9IHBlZXJzSW5Sb29tO1xuICAgICAgICAgIHRoaXMucGVlcnMuZm9yRWFjaCgocGVlcikgPT4ge1xuICAgICAgICAgICAgYWRkVmlkZW9FbGVtZW50KHBlZXIuaWQsIHBlZXIubWV0YWRhdGEuZGlzcGxheU5hbWUsIGZhbHNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50c0xpc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Kb2luRXJyb3I6IChtZXRhZGF0YSkgPT4ge1xuICAgICAgICAgIHRocm93IGBQZWVyIGRlbmllZC5gO1xuICAgICAgICB9LFxuICAgICAgICBvblRyYWNrUmVhZHk6ICh7IHN0cmVhbSwgcGVlciwgbWV0YWRhdGEgfSkgPT4ge1xuICAgICAgICAgIGF0dGFjaFN0cmVhbShzdHJlYW0hLCBwZWVyLmlkKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25UcmFja0FkZGVkOiAoY3R4KSA9PiB7fSxcbiAgICAgICAgb25UcmFja1JlbW92ZWQ6IChjdHgpID0+IHt9LFxuICAgICAgICBvblBlZXJKb2luZWQ6IChwZWVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5wZWVycy5wdXNoKHBlZXIpO1xuICAgICAgICAgIHRoaXMudXBkYXRlUGFydGljaXBhbnRzTGlzdCgpO1xuICAgICAgICAgIGFkZFZpZGVvRWxlbWVudChwZWVyLmlkLCBwZWVyLm1ldGFkYXRhLmRpc3BsYXlOYW1lLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUGVlckxlZnQ6IChwZWVyKSA9PiB7XG4gICAgICAgICAgdGhpcy5wZWVycyA9IHRoaXMucGVlcnMuZmlsdGVyKChwKSA9PiBwLmlkICE9PSBwZWVyLmlkKTtcbiAgICAgICAgICByZW1vdmVWaWRlb0VsZW1lbnQocGVlci5pZCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJ0aWNpcGFudHNMaXN0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUGVlclVwZGF0ZWQ6IChjdHgpID0+IHt9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMud2VicnRjQ2hhbm5lbC5vbihcIm1lZGlhRXZlbnRcIiwgKGV2ZW50OiBhbnkpID0+XG4gICAgICB0aGlzLndlYnJ0Yy5yZWNlaXZlTWVkaWFFdmVudChldmVudC5kYXRhKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgam9pbiA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5pbml0KCk7XG4gICAgICBzZXR1cERpc2Nvbm5lY3RCdXR0b24oKCkgPT4ge1xuICAgICAgICB0aGlzLmxlYXZlKCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFwiXCIpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLndlYnJ0Yy5qb2luKHsgZGlzcGxheU5hbWU6IHRoaXMuZGlzcGxheU5hbWUgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB3aGlsZSBqb2luaW5nIHRvIHRoZSByb29tOlwiLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgaW5pdCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gdGhpcy5sb2NhbFN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0RGlzcGxheU1lZGlhKFxuICAgICAgdGhpcy5sb2NhbFN0cmVhbSA9IGF3YWl0IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKFxuICAgICAgICBNRURJQV9DT05TVFJBSU5UU1xuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXG4gICAgICAgIFwiRmFpbGVkIHRvIHNldHVwIHZpZGVvIHJvb20sIG1ha2Ugc3VyZSB0byBncmFudCBjYW1lcmEgYW5kIG1pY3JvcGhvbmUgcGVybWlzc2lvbnNcIlxuICAgICAgKTtcbiAgICAgIHRocm93IFwiZXJyb3JcIjtcbiAgICB9XG5cbiAgICBhZGRWaWRlb0VsZW1lbnQoTE9DQUxfUEVFUl9JRCwgXCJNZVwiLCB0cnVlKTtcbiAgICBhdHRhY2hTdHJlYW0odGhpcy5sb2NhbFN0cmVhbSEsIExPQ0FMX1BFRVJfSUQpO1xuXG4gICAgYXdhaXQgdGhpcy5waG9lbml4Q2hhbm5lbFB1c2hSZXN1bHQodGhpcy53ZWJydGNDaGFubmVsLmpvaW4oKSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBsZWF2ZSA9ICgpID0+IHtcbiAgICB0aGlzLndlYnJ0Yy5sZWF2ZSgpO1xuICAgIHRoaXMud2VicnRjQ2hhbm5lbC5sZWF2ZSgpO1xuICAgIHRoaXMuc29ja2V0T2ZmKCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBzb2NrZXRPZmYgPSAoKSA9PiB7XG4gICAgdGhpcy5zb2NrZXQub2ZmKHRoaXMud2VicnRjU29ja2V0UmVmcyk7XG4gICAgd2hpbGUgKHRoaXMud2VicnRjU29ja2V0UmVmcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLndlYnJ0Y1NvY2tldFJlZnMucG9wKCk7XG4gICAgfVxuICB9O1xuXG4gIHByaXZhdGUgcGFyc2VVcmwgPSAoKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB7IGRpc3BsYXlfbmFtZTogZGlzcGxheU5hbWUgfSA9IHBhcnNlKGRvY3VtZW50LmxvY2F0aW9uLnNlYXJjaCk7XG5cbiAgICAvLyByZW1vdmUgcXVlcnkgcGFyYW1zIHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBwYWdlXG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgICByZXR1cm4gZGlzcGxheU5hbWUgYXMgc3RyaW5nO1xuICB9O1xuXG4gIHByaXZhdGUgdXBkYXRlUGFydGljaXBhbnRzTGlzdCA9ICgpOiB2b2lkID0+IHtcbiAgICBjb25zdCBwYXJ0aWNpcGFudHNOYW1lcyA9IHRoaXMucGVlcnMubWFwKChwKSA9PiBwLm1ldGFkYXRhLmRpc3BsYXlOYW1lKTtcblxuICAgIGlmICh0aGlzLmRpc3BsYXlOYW1lKSB7XG4gICAgICBwYXJ0aWNpcGFudHNOYW1lcy5wdXNoKHRoaXMuZGlzcGxheU5hbWUpO1xuICAgIH1cblxuICAgIHNldFBhcnRpY2lwYW50c0xpc3QocGFydGljaXBhbnRzTmFtZXMpO1xuICB9O1xuXG4gIHByaXZhdGUgcGhvZW5peENoYW5uZWxQdXNoUmVzdWx0ID0gYXN5bmMgKHB1c2g6IFB1c2gpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBwdXNoXG4gICAgICAgIC5yZWNlaXZlKFwib2tcIiwgKHJlc3BvbnNlOiBhbnkpID0+IHJlc29sdmUocmVzcG9uc2UpKVxuICAgICAgICAucmVjZWl2ZShcImVycm9yXCIsIChyZXNwb25zZTogYW55KSA9PiByZWplY3QocmVzcG9uc2UpKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICIvLyB3cmFwcyB2YWx1ZSBpbiBjbG9zdXJlIG9yIHJldHVybnMgY2xvc3VyZVxuZXhwb3J0IGxldCBjbG9zdXJlID0gKHZhbHVlKSA9PiB7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICByZXR1cm4gdmFsdWVcbiAgfSBlbHNlIHtcbiAgICBsZXQgY2xvc3VyZSA9IGZ1bmN0aW9uICgpeyByZXR1cm4gdmFsdWUgfVxuICAgIHJldHVybiBjbG9zdXJlXG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgZ2xvYmFsU2VsZiA9IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IG51bGxcbmV4cG9ydCBjb25zdCBwaHhXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogbnVsbFxuZXhwb3J0IGNvbnN0IGdsb2JhbCA9IGdsb2JhbFNlbGYgfHwgcGh4V2luZG93IHx8IGdsb2JhbFxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVlNOID0gXCIyLjAuMFwiXG5leHBvcnQgY29uc3QgU09DS0VUX1NUQVRFUyA9IHtjb25uZWN0aW5nOiAwLCBvcGVuOiAxLCBjbG9zaW5nOiAyLCBjbG9zZWQ6IDN9XG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FT1VUID0gMTAwMDBcbmV4cG9ydCBjb25zdCBXU19DTE9TRV9OT1JNQUwgPSAxMDAwXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9TVEFURVMgPSB7XG4gIGNsb3NlZDogXCJjbG9zZWRcIixcbiAgZXJyb3JlZDogXCJlcnJvcmVkXCIsXG4gIGpvaW5lZDogXCJqb2luZWRcIixcbiAgam9pbmluZzogXCJqb2luaW5nXCIsXG4gIGxlYXZpbmc6IFwibGVhdmluZ1wiLFxufVxuZXhwb3J0IGNvbnN0IENIQU5ORUxfRVZFTlRTID0ge1xuICBjbG9zZTogXCJwaHhfY2xvc2VcIixcbiAgZXJyb3I6IFwicGh4X2Vycm9yXCIsXG4gIGpvaW46IFwicGh4X2pvaW5cIixcbiAgcmVwbHk6IFwicGh4X3JlcGx5XCIsXG4gIGxlYXZlOiBcInBoeF9sZWF2ZVwiXG59XG5cbmV4cG9ydCBjb25zdCBUUkFOU1BPUlRTID0ge1xuICBsb25ncG9sbDogXCJsb25ncG9sbFwiLFxuICB3ZWJzb2NrZXQ6IFwid2Vic29ja2V0XCJcbn1cbmV4cG9ydCBjb25zdCBYSFJfU1RBVEVTID0ge1xuICBjb21wbGV0ZTogNFxufVxuIiwgIi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIFB1c2hcbiAqIEBwYXJhbSB7Q2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBDaGFubmVsXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgLSBUaGUgZXZlbnQsIGZvciBleGFtcGxlIGBcInBoeF9qb2luXCJgXG4gKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZCAtIFRoZSBwYXlsb2FkLCBmb3IgZXhhbXBsZSBge3VzZXJfaWQ6IDEyM31gXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZW91dCAtIFRoZSBwdXNoIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1c2gge1xuICBjb25zdHJ1Y3RvcihjaGFubmVsLCBldmVudCwgcGF5bG9hZCwgdGltZW91dCl7XG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbFxuICAgIHRoaXMuZXZlbnQgPSBldmVudFxuICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQgfHwgZnVuY3Rpb24gKCl7IHJldHVybiB7fSB9XG4gICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBudWxsXG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgIHRoaXMudGltZW91dFRpbWVyID0gbnVsbFxuICAgIHRoaXMucmVjSG9va3MgPSBbXVxuICAgIHRoaXMuc2VudCA9IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXRcbiAgICovXG4gIHJlc2VuZCh0aW1lb3V0KXtcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy5yZXNldCgpXG4gICAgdGhpcy5zZW5kKClcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc2VuZCgpe1xuICAgIGlmKHRoaXMuaGFzUmVjZWl2ZWQoXCJ0aW1lb3V0XCIpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnN0YXJ0VGltZW91dCgpXG4gICAgdGhpcy5zZW50ID0gdHJ1ZVxuICAgIHRoaXMuY2hhbm5lbC5zb2NrZXQucHVzaCh7XG4gICAgICB0b3BpYzogdGhpcy5jaGFubmVsLnRvcGljLFxuICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICBwYXlsb2FkOiB0aGlzLnBheWxvYWQoKSxcbiAgICAgIHJlZjogdGhpcy5yZWYsXG4gICAgICBqb2luX3JlZjogdGhpcy5jaGFubmVsLmpvaW5SZWYoKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBzdGF0dXNcbiAgICogQHBhcmFtIHsqfSBjYWxsYmFja1xuICAgKi9cbiAgcmVjZWl2ZShzdGF0dXMsIGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmhhc1JlY2VpdmVkKHN0YXR1cykpe1xuICAgICAgY2FsbGJhY2sodGhpcy5yZWNlaXZlZFJlc3AucmVzcG9uc2UpXG4gICAgfVxuXG4gICAgdGhpcy5yZWNIb29rcy5wdXNoKHtzdGF0dXMsIGNhbGxiYWNrfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZXNldCgpe1xuICAgIHRoaXMuY2FuY2VsUmVmRXZlbnQoKVxuICAgIHRoaXMucmVmID0gbnVsbFxuICAgIHRoaXMucmVmRXZlbnQgPSBudWxsXG4gICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBudWxsXG4gICAgdGhpcy5zZW50ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbWF0Y2hSZWNlaXZlKHtzdGF0dXMsIHJlc3BvbnNlLCBfcmVmfSl7XG4gICAgdGhpcy5yZWNIb29rcy5maWx0ZXIoaCA9PiBoLnN0YXR1cyA9PT0gc3RhdHVzKVxuICAgICAgLmZvckVhY2goaCA9PiBoLmNhbGxiYWNrKHJlc3BvbnNlKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuY2VsUmVmRXZlbnQoKXtcbiAgICBpZighdGhpcy5yZWZFdmVudCl7IHJldHVybiB9XG4gICAgdGhpcy5jaGFubmVsLm9mZih0aGlzLnJlZkV2ZW50KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5jZWxUaW1lb3V0KCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dFRpbWVyKVxuICAgIHRoaXMudGltZW91dFRpbWVyID0gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGFydFRpbWVvdXQoKXtcbiAgICBpZih0aGlzLnRpbWVvdXRUaW1lcil7IHRoaXMuY2FuY2VsVGltZW91dCgpIH1cbiAgICB0aGlzLnJlZiA9IHRoaXMuY2hhbm5lbC5zb2NrZXQubWFrZVJlZigpXG4gICAgdGhpcy5yZWZFdmVudCA9IHRoaXMuY2hhbm5lbC5yZXBseUV2ZW50TmFtZSh0aGlzLnJlZilcblxuICAgIHRoaXMuY2hhbm5lbC5vbih0aGlzLnJlZkV2ZW50LCBwYXlsb2FkID0+IHtcbiAgICAgIHRoaXMuY2FuY2VsUmVmRXZlbnQoKVxuICAgICAgdGhpcy5jYW5jZWxUaW1lb3V0KClcbiAgICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gcGF5bG9hZFxuICAgICAgdGhpcy5tYXRjaFJlY2VpdmUocGF5bG9hZClcbiAgICB9KVxuXG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcihcInRpbWVvdXRcIiwge30pXG4gICAgfSwgdGhpcy50aW1lb3V0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYXNSZWNlaXZlZChzdGF0dXMpe1xuICAgIHJldHVybiB0aGlzLnJlY2VpdmVkUmVzcCAmJiB0aGlzLnJlY2VpdmVkUmVzcC5zdGF0dXMgPT09IHN0YXR1c1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyKHN0YXR1cywgcmVzcG9uc2Upe1xuICAgIHRoaXMuY2hhbm5lbC50cmlnZ2VyKHRoaXMucmVmRXZlbnQsIHtzdGF0dXMsIHJlc3BvbnNlfSlcbiAgfVxufVxuIiwgIi8qKlxuICpcbiAqIENyZWF0ZXMgYSB0aW1lciB0aGF0IGFjY2VwdHMgYSBgdGltZXJDYWxjYCBmdW5jdGlvbiB0byBwZXJmb3JtXG4gKiBjYWxjdWxhdGVkIHRpbWVvdXQgcmV0cmllcywgc3VjaCBhcyBleHBvbmVudGlhbCBiYWNrb2ZmLlxuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgcmVjb25uZWN0VGltZXIgPSBuZXcgVGltZXIoKCkgPT4gdGhpcy5jb25uZWN0KCksIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMDAwLCA1MDAwLCAxMDAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICogfSlcbiAqIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDEwMDBcbiAqIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDUwMDBcbiAqIHJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAqIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDEwMDBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtGdW5jdGlvbn0gdGltZXJDYWxjXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2ssIHRpbWVyQ2FsYyl7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgdGhpcy50aW1lckNhbGMgPSB0aW1lckNhbGNcbiAgICB0aGlzLnRpbWVyID0gbnVsbFxuICAgIHRoaXMudHJpZXMgPSAwXG4gIH1cblxuICByZXNldCgpe1xuICAgIHRoaXMudHJpZXMgPSAwXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyBhbnkgcHJldmlvdXMgc2NoZWR1bGVUaW1lb3V0IGFuZCBzY2hlZHVsZXMgY2FsbGJhY2tcbiAgICovXG4gIHNjaGVkdWxlVGltZW91dCgpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxuXG4gICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmllcyA9IHRoaXMudHJpZXMgKyAxXG4gICAgICB0aGlzLmNhbGxiYWNrKClcbiAgICB9LCB0aGlzLnRpbWVyQ2FsYyh0aGlzLnRyaWVzICsgMSkpXG4gIH1cbn1cbiIsICJpbXBvcnQge2Nsb3N1cmV9IGZyb20gXCIuL3V0aWxzXCJcbmltcG9ydCB7XG4gIENIQU5ORUxfRVZFTlRTLFxuICBDSEFOTkVMX1NUQVRFUyxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IFB1c2ggZnJvbSBcIi4vcHVzaFwiXG5pbXBvcnQgVGltZXIgZnJvbSBcIi4vdGltZXJcIlxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9waWNcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbil9IHBhcmFtc1xuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFubmVsIHtcbiAgY29uc3RydWN0b3IodG9waWMsIHBhcmFtcywgc29ja2V0KXtcbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgdGhpcy50b3BpYyA9IHRvcGljXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKHBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldFxuICAgIHRoaXMuYmluZGluZ3MgPSBbXVxuICAgIHRoaXMuYmluZGluZ1JlZiA9IDBcbiAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLnNvY2tldC50aW1lb3V0XG4gICAgdGhpcy5qb2luZWRPbmNlID0gZmFsc2VcbiAgICB0aGlzLmpvaW5QdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMuam9pbiwgdGhpcy5wYXJhbXMsIHRoaXMudGltZW91dClcbiAgICB0aGlzLnB1c2hCdWZmZXIgPSBbXVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VSZWZzID0gW11cblxuICAgIHRoaXMucmVqb2luVGltZXIgPSBuZXcgVGltZXIoKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luKCkgfVxuICAgIH0sIHRoaXMuc29ja2V0LnJlam9pbkFmdGVyTXMpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMucHVzaCh0aGlzLnNvY2tldC5vbkVycm9yKCgpID0+IHRoaXMucmVqb2luVGltZXIucmVzZXQoKSkpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMucHVzaCh0aGlzLnNvY2tldC5vbk9wZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLmlzRXJyb3JlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSlcbiAgICApXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwib2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5lZFxuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIuZm9yRWFjaChwdXNoRXZlbnQgPT4gcHVzaEV2ZW50LnNlbmQoKSlcbiAgICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJlcnJvclwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5vbkNsb3NlKCgpID0+IHtcbiAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGNsb3NlICR7dGhpcy50b3BpY30gJHt0aGlzLmpvaW5SZWYoKX1gKVxuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZFxuICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlKHRoaXMpXG4gICAgfSlcbiAgICB0aGlzLm9uRXJyb3IocmVhc29uID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBlcnJvciAke3RoaXMudG9waWN9YCwgcmVhc29uKVxuICAgICAgaWYodGhpcy5pc0pvaW5pbmcoKSl7IHRoaXMuam9pblB1c2gucmVzZXQoKSB9XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgdGltZW91dCAke3RoaXMudG9waWN9ICgke3RoaXMuam9pblJlZigpfSlgLCB0aGlzLmpvaW5QdXNoLnRpbWVvdXQpXG4gICAgICBsZXQgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIGNsb3N1cmUoe30pLCB0aGlzLnRpbWVvdXQpXG4gICAgICBsZWF2ZVB1c2guc2VuZCgpXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgdGhpcy5qb2luUHVzaC5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uKENIQU5ORUxfRVZFTlRTLnJlcGx5LCAocGF5bG9hZCwgcmVmKSA9PiB7XG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5yZXBseUV2ZW50TmFtZShyZWYpLCBwYXlsb2FkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogSm9pbiB0aGUgY2hhbm5lbFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHRpbWVvdXRcbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuam9pbmVkT25jZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cmllZCB0byBqb2luIG11bHRpcGxlIHRpbWVzLiAnam9pbicgY2FuIG9ubHkgYmUgY2FsbGVkIGEgc2luZ2xlIHRpbWUgcGVyIGNoYW5uZWwgaW5zdGFuY2VcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgICAgdGhpcy5qb2luZWRPbmNlID0gdHJ1ZVxuICAgICAgdGhpcy5yZWpvaW4oKVxuICAgICAgcmV0dXJuIHRoaXMuam9pblB1c2hcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgY2xvc2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMuY2xvc2UsIGNhbGxiYWNrKVxuICB9XG5cbiAgLyoqXG4gICAqIEhvb2sgaW50byBjaGFubmVsIGVycm9yc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMuZXJyb3IsIHJlYXNvbiA9PiBjYWxsYmFjayhyZWFzb24pKVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgb24gY2hhbm5lbCBldmVudHNcbiAgICpcbiAgICogU3Vic2NyaXB0aW9uIHJldHVybnMgYSByZWYgY291bnRlciwgd2hpY2ggY2FuIGJlIHVzZWQgbGF0ZXIgdG9cbiAgICogdW5zdWJzY3JpYmUgdGhlIGV4YWN0IGV2ZW50IGxpc3RlbmVyXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJlZjEgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fc3R1ZmYpXG4gICAqIGNvbnN0IHJlZjIgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fb3RoZXJfc3R1ZmYpXG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIiwgcmVmMSlcbiAgICogLy8gU2luY2UgdW5zdWJzY3JpcHRpb24sIGRvX3N0dWZmIHdvbid0IGZpcmUsXG4gICAqIC8vIHdoaWxlIGRvX290aGVyX3N0dWZmIHdpbGwga2VlcCBmaXJpbmcgb24gdGhlIFwiZXZlbnRcIlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5iaW5kaW5nUmVmKytcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2goe2V2ZW50LCByZWYsIGNhbGxiYWNrfSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmVzIG9mZiBvZiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBVc2UgdGhlIHJlZiByZXR1cm5lZCBmcm9tIGEgY2hhbm5lbC5vbigpIHRvIHVuc3Vic2NyaWJlIG9uZVxuICAgKiBoYW5kbGVyLCBvciBwYXNzIG5vdGhpbmcgZm9yIHRoZSByZWYgdG8gdW5zdWJzY3JpYmUgYWxsXG4gICAqIGhhbmRsZXJzIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIFVuc3Vic2NyaWJlIHRoZSBkb19zdHVmZiBoYW5kbGVyXG4gICAqIGNvbnN0IHJlZjEgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fc3R1ZmYpXG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIiwgcmVmMSlcbiAgICpcbiAgICogLy8gVW5zdWJzY3JpYmUgYWxsIGhhbmRsZXJzIGZyb20gZXZlbnRcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiKVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSByZWZcbiAgICovXG4gIG9mZihldmVudCwgcmVmKXtcbiAgICB0aGlzLmJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5maWx0ZXIoKGJpbmQpID0+IHtcbiAgICAgIHJldHVybiAhKGJpbmQuZXZlbnQgPT09IGV2ZW50ICYmICh0eXBlb2YgcmVmID09PSBcInVuZGVmaW5lZFwiIHx8IHJlZiA9PT0gYmluZC5yZWYpKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhblB1c2goKXsgcmV0dXJuIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkgJiYgdGhpcy5pc0pvaW5lZCgpIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIGBldmVudGAgdG8gcGhvZW5peCB3aXRoIHRoZSBwYXlsb2FkIGBwYXlsb2FkYC5cbiAgICogUGhvZW5peCByZWNlaXZlcyB0aGlzIGluIHRoZSBgaGFuZGxlX2luKGV2ZW50LCBwYXlsb2FkLCBzb2NrZXQpYFxuICAgKiBmdW5jdGlvbi4gaWYgcGhvZW5peCByZXBsaWVzIG9yIGl0IHRpbWVzIG91dCAoZGVmYXVsdCAxMDAwMG1zKSxcbiAgICogdGhlbiBvcHRpb25hbGx5IHRoZSByZXBseSBjYW4gYmUgcmVjZWl2ZWQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwucHVzaChcImV2ZW50XCIpXG4gICAqICAgLnJlY2VpdmUoXCJva1wiLCBwYXlsb2FkID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCByZXBsaWVkOlwiLCBwYXlsb2FkKSlcbiAgICogICAucmVjZWl2ZShcImVycm9yXCIsIGVyciA9PiBjb25zb2xlLmxvZyhcInBob2VuaXggZXJyb3JlZFwiLCBlcnIpKVxuICAgKiAgIC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiBjb25zb2xlLmxvZyhcInRpbWVkIG91dCBwdXNoaW5nXCIpKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lb3V0XVxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIHB1c2goZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHBheWxvYWQgPSBwYXlsb2FkIHx8IHt9XG4gICAgaWYoIXRoaXMuam9pbmVkT25jZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRyaWVkIHRvIHB1c2ggJyR7ZXZlbnR9JyB0byAnJHt0aGlzLnRvcGljfScgYmVmb3JlIGpvaW5pbmcuIFVzZSBjaGFubmVsLmpvaW4oKSBiZWZvcmUgcHVzaGluZyBldmVudHNgKVxuICAgIH1cbiAgICBsZXQgcHVzaEV2ZW50ID0gbmV3IFB1c2godGhpcywgZXZlbnQsIGZ1bmN0aW9uICgpeyByZXR1cm4gcGF5bG9hZCB9LCB0aW1lb3V0KVxuICAgIGlmKHRoaXMuY2FuUHVzaCgpKXtcbiAgICAgIHB1c2hFdmVudC5zZW5kKClcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaEV2ZW50LnN0YXJ0VGltZW91dCgpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIucHVzaChwdXNoRXZlbnQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHB1c2hFdmVudFxuICB9XG5cbiAgLyoqIExlYXZlcyB0aGUgY2hhbm5lbFxuICAgKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSBzZXJ2ZXIgZXZlbnRzLCBhbmRcbiAgICogaW5zdHJ1Y3RzIGNoYW5uZWwgdG8gdGVybWluYXRlIG9uIHNlcnZlclxuICAgKlxuICAgKiBUcmlnZ2VycyBvbkNsb3NlKCkgaG9va3NcbiAgICpcbiAgICogVG8gcmVjZWl2ZSBsZWF2ZSBhY2tub3dsZWRnZW1lbnRzLCB1c2UgdGhlIGByZWNlaXZlYFxuICAgKiBob29rIHRvIGJpbmQgdG8gdGhlIHNlcnZlciBhY2ssIGllOlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjaGFubmVsLmxlYXZlKCkucmVjZWl2ZShcIm9rXCIsICgpID0+IGFsZXJ0KFwibGVmdCFcIikgKVxuICAgKlxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHRpbWVvdXRcbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBsZWF2ZSh0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICB0aGlzLmpvaW5QdXNoLmNhbmNlbFRpbWVvdXQoKVxuXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmxlYXZpbmdcbiAgICBsZXQgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBsZWF2ZSAke3RoaXMudG9waWN9YClcbiAgICAgIHRoaXMudHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgXCJsZWF2ZVwiKVxuICAgIH1cbiAgICBsZXQgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIGNsb3N1cmUoe30pLCB0aW1lb3V0KVxuICAgIGxlYXZlUHVzaC5yZWNlaXZlKFwib2tcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IG9uQ2xvc2UoKSlcbiAgICBsZWF2ZVB1c2guc2VuZCgpXG4gICAgaWYoIXRoaXMuY2FuUHVzaCgpKXsgbGVhdmVQdXNoLnRyaWdnZXIoXCJva1wiLCB7fSkgfVxuXG4gICAgcmV0dXJuIGxlYXZlUHVzaFxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRhYmxlIG1lc3NhZ2UgaG9va1xuICAgKlxuICAgKiBSZWNlaXZlcyBhbGwgZXZlbnRzIGZvciBzcGVjaWFsaXplZCBtZXNzYWdlIGhhbmRsaW5nXG4gICAqIGJlZm9yZSBkaXNwYXRjaGluZyB0byB0aGUgY2hhbm5lbCBjYWxsYmFja3MuXG4gICAqXG4gICAqIE11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgb25NZXNzYWdlKF9ldmVudCwgcGF5bG9hZCwgX3JlZil7IHJldHVybiBwYXlsb2FkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzTWVtYmVyKHRvcGljLCBldmVudCwgcGF5bG9hZCwgam9pblJlZil7XG4gICAgaWYodGhpcy50b3BpYyAhPT0gdG9waWMpeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgaWYoam9pblJlZiAmJiBqb2luUmVmICE9PSB0aGlzLmpvaW5SZWYoKSl7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBcImRyb3BwaW5nIG91dGRhdGVkIG1lc3NhZ2VcIiwge3RvcGljLCBldmVudCwgcGF5bG9hZCwgam9pblJlZn0pXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGpvaW5SZWYoKXsgcmV0dXJuIHRoaXMuam9pblB1c2gucmVmIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlam9pbih0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICBpZih0aGlzLmlzTGVhdmluZygpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnNvY2tldC5sZWF2ZU9wZW5Ub3BpYyh0aGlzLnRvcGljKVxuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5qb2luaW5nXG4gICAgdGhpcy5qb2luUHVzaC5yZXNlbmQodGltZW91dClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlcihldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luUmVmKXtcbiAgICBsZXQgaGFuZGxlZFBheWxvYWQgPSB0aGlzLm9uTWVzc2FnZShldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luUmVmKVxuICAgIGlmKHBheWxvYWQgJiYgIWhhbmRsZWRQYXlsb2FkKXsgdGhyb3cgbmV3IEVycm9yKFwiY2hhbm5lbCBvbk1lc3NhZ2UgY2FsbGJhY2tzIG11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkXCIpIH1cblxuICAgIGxldCBldmVudEJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5maWx0ZXIoYmluZCA9PiBiaW5kLmV2ZW50ID09PSBldmVudClcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBldmVudEJpbmRpbmdzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBiaW5kID0gZXZlbnRCaW5kaW5nc1tpXVxuICAgICAgYmluZC5jYWxsYmFjayhoYW5kbGVkUGF5bG9hZCwgcmVmLCBqb2luUmVmIHx8IHRoaXMuam9pblJlZigpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVwbHlFdmVudE5hbWUocmVmKXsgcmV0dXJuIGBjaGFuX3JlcGx5XyR7cmVmfWAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNDbG9zZWQoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmNsb3NlZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Vycm9yZWQoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmVycm9yZWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNKb2luZWQoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmpvaW5lZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0pvaW5pbmcoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmpvaW5pbmcgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNMZWF2aW5nKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5sZWF2aW5nIH1cbn1cbiIsICJpbXBvcnQge1xuICBnbG9iYWwsXG4gIFhIUl9TVEFURVNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheCB7XG5cbiAgc3RhdGljIHJlcXVlc3QobWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICBpZihnbG9iYWwuWERvbWFpblJlcXVlc3Qpe1xuICAgICAgbGV0IHJlcSA9IG5ldyBnbG9iYWwuWERvbWFpblJlcXVlc3QoKSAvLyBJRTgsIElFOVxuICAgICAgcmV0dXJuIHRoaXMueGRvbWFpblJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVxID0gbmV3IGdsb2JhbC5YTUxIdHRwUmVxdWVzdCgpIC8vIElFNyssIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIFNhZmFyaVxuICAgICAgcmV0dXJuIHRoaXMueGhyUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGFjY2VwdCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjaylcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgeGRvbWFpblJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICByZXEudGltZW91dCA9IHRpbWVvdXRcbiAgICByZXEub3BlbihtZXRob2QsIGVuZFBvaW50KVxuICAgIHJlcS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgfVxuICAgIGlmKG9udGltZW91dCl7IHJlcS5vbnRpbWVvdXQgPSBvbnRpbWVvdXQgfVxuXG4gICAgLy8gV29yayBhcm91bmQgYnVnIGluIElFOSB0aGF0IHJlcXVpcmVzIGFuIGF0dGFjaGVkIG9ucHJvZ3Jlc3MgaGFuZGxlclxuICAgIHJlcS5vbnByb2dyZXNzID0gKCkgPT4geyB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICAgIHJldHVybiByZXFcbiAgfVxuXG4gIHN0YXRpYyB4aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICByZXEub3BlbihtZXRob2QsIGVuZFBvaW50LCB0cnVlKVxuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIGFjY2VwdClcbiAgICByZXEub25lcnJvciA9ICgpID0+IGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwpXG4gICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgIGlmKHJlcS5yZWFkeVN0YXRlID09PSBYSFJfU1RBVEVTLmNvbXBsZXRlICYmIGNhbGxiYWNrKXtcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5wYXJzZUpTT04ocmVxLnJlc3BvbnNlVGV4dClcbiAgICAgICAgY2FsbGJhY2socmVzcG9uc2UpXG4gICAgICB9XG4gICAgfVxuICAgIGlmKG9udGltZW91dCl7IHJlcS5vbnRpbWVvdXQgPSBvbnRpbWVvdXQgfVxuXG4gICAgcmVxLnNlbmQoYm9keSlcbiAgICByZXR1cm4gcmVxXG4gIH1cblxuICBzdGF0aWMgcGFyc2VKU09OKHJlc3Ape1xuICAgIGlmKCFyZXNwIHx8IHJlc3AgPT09IFwiXCIpeyByZXR1cm4gbnVsbCB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcClcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgIGNvbnNvbGUgJiYgY29uc29sZS5sb2coXCJmYWlsZWQgdG8gcGFyc2UgSlNPTiByZXNwb25zZVwiLCByZXNwKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgc2VyaWFsaXplKG9iaiwgcGFyZW50S2V5KXtcbiAgICBsZXQgcXVlcnlTdHIgPSBbXVxuICAgIGZvcih2YXIga2V5IGluIG9iail7XG4gICAgICBpZighT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSl7IGNvbnRpbnVlIH1cbiAgICAgIGxldCBwYXJhbUtleSA9IHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWAgOiBrZXlcbiAgICAgIGxldCBwYXJhbVZhbCA9IG9ialtrZXldXG4gICAgICBpZih0eXBlb2YgcGFyYW1WYWwgPT09IFwib2JqZWN0XCIpe1xuICAgICAgICBxdWVyeVN0ci5wdXNoKHRoaXMuc2VyaWFsaXplKHBhcmFtVmFsLCBwYXJhbUtleSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeVN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwYXJhbUtleSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbVZhbCkpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWVyeVN0ci5qb2luKFwiJlwiKVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZFBhcmFtcyh1cmwsIHBhcmFtcyl7XG4gICAgaWYoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggPT09IDApeyByZXR1cm4gdXJsIH1cblxuICAgIGxldCBwcmVmaXggPSB1cmwubWF0Y2goL1xcPy8pID8gXCImXCIgOiBcIj9cIlxuICAgIHJldHVybiBgJHt1cmx9JHtwcmVmaXh9JHt0aGlzLnNlcmlhbGl6ZShwYXJhbXMpfWBcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFNPQ0tFVF9TVEFURVMsXG4gIFRSQU5TUE9SVFNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IEFqYXggZnJvbSBcIi4vYWpheFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvbmdQb2xsIHtcblxuICBjb25zdHJ1Y3RvcihlbmRQb2ludCl7XG4gICAgdGhpcy5lbmRQb2ludCA9IG51bGxcbiAgICB0aGlzLnRva2VuID0gbnVsbFxuICAgIHRoaXMuc2tpcEhlYXJ0YmVhdCA9IHRydWVcbiAgICB0aGlzLnJlcXMgPSBuZXcgU2V0KClcbiAgICB0aGlzLm9ub3BlbiA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9uZXJyb3IgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5vbmNsb3NlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMucG9sbEVuZHBvaW50ID0gdGhpcy5ub3JtYWxpemVFbmRwb2ludChlbmRQb2ludClcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmdcbiAgICB0aGlzLnBvbGwoKVxuICB9XG5cbiAgbm9ybWFsaXplRW5kcG9pbnQoZW5kUG9pbnQpe1xuICAgIHJldHVybiAoZW5kUG9pbnRcbiAgICAgIC5yZXBsYWNlKFwid3M6Ly9cIiwgXCJodHRwOi8vXCIpXG4gICAgICAucmVwbGFjZShcIndzczovL1wiLCBcImh0dHBzOi8vXCIpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKFwiKC4qKVxcL1wiICsgVFJBTlNQT1JUUy53ZWJzb2NrZXQpLCBcIiQxL1wiICsgVFJBTlNQT1JUUy5sb25ncG9sbCkpXG4gIH1cblxuICBlbmRwb2ludFVSTCgpe1xuICAgIHJldHVybiBBamF4LmFwcGVuZFBhcmFtcyh0aGlzLnBvbGxFbmRwb2ludCwge3Rva2VuOiB0aGlzLnRva2VufSlcbiAgfVxuXG4gIGNsb3NlQW5kUmV0cnkoY29kZSwgcmVhc29uLCB3YXNDbGVhbil7XG4gICAgdGhpcy5jbG9zZShjb2RlLCByZWFzb24sIHdhc0NsZWFuKVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZ1xuICB9XG5cbiAgb250aW1lb3V0KCl7XG4gICAgdGhpcy5vbmVycm9yKFwidGltZW91dFwiKVxuICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDA1LCBcInRpbWVvdXRcIiwgZmFsc2UpXG4gIH1cblxuICBpc0FjdGl2ZSgpeyByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLm9wZW4gfHwgdGhpcy5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmcgfVxuXG4gIHBvbGwoKXtcbiAgICB0aGlzLmFqYXgoXCJHRVRcIiwgbnVsbCwgKCkgPT4gdGhpcy5vbnRpbWVvdXQoKSwgcmVzcCA9PiB7XG4gICAgICBpZihyZXNwKXtcbiAgICAgICAgdmFyIHtzdGF0dXMsIHRva2VuLCBtZXNzYWdlc30gPSByZXNwXG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzID0gMFxuICAgICAgfVxuXG4gICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAyMDA6XG4gICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xuICAgICAgICAgICAgLy8gVGFza3MgYXJlIHdoYXQgdGhpbmdzIGxpa2UgZXZlbnQgaGFuZGxlcnMsIHNldFRpbWVvdXQgY2FsbGJhY2tzLFxuICAgICAgICAgICAgLy8gcHJvbWlzZSByZXNvbHZlcyBhbmQgbW9yZSBhcmUgcnVuIHdpdGhpbi5cbiAgICAgICAgICAgIC8vIEluIG1vZGVybiBicm93c2VycywgdGhlcmUgYXJlIHR3byBkaWZmZXJlbnQga2luZHMgb2YgdGFza3MsXG4gICAgICAgICAgICAvLyBtaWNyb3Rhc2tzIGFuZCBtYWNyb3Rhc2tzLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhcmUgbWFpbmx5IHVzZWQgZm9yIFByb21pc2VzLCB3aGlsZSBtYWNyb3Rhc2tzIGFyZVxuICAgICAgICAgICAgLy8gdXNlZCBmb3IgZXZlcnl0aGluZyBlbHNlLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhbHdheXMgaGF2ZSBwcmlvcml0eSBvdmVyIG1hY3JvdGFza3MuIElmIHRoZSBKUyBlbmdpbmVcbiAgICAgICAgICAgIC8vIGlzIGxvb2tpbmcgZm9yIGEgdGFzayB0byBydW4sIGl0IHdpbGwgYWx3YXlzIHRyeSB0byBlbXB0eSB0aGVcbiAgICAgICAgICAgIC8vIG1pY3JvdGFzayBxdWV1ZSBiZWZvcmUgYXR0ZW1wdGluZyB0byBydW4gYW55dGhpbmcgZnJvbSB0aGVcbiAgICAgICAgICAgIC8vIG1hY3JvdGFzayBxdWV1ZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBGb3IgdGhlIFdlYlNvY2tldCB0cmFuc3BvcnQsIG1lc3NhZ2VzIGFsd2F5cyBhcnJpdmUgaW4gdGhlaXIgb3duXG4gICAgICAgICAgICAvLyBldmVudC4gVGhpcyBtZWFucyB0aGF0IGlmIGFueSBwcm9taXNlcyBhcmUgcmVzb2x2ZWQgZnJvbSB3aXRoaW4sXG4gICAgICAgICAgICAvLyB0aGVpciBjYWxsYmFja3Mgd2lsbCBhbHdheXMgZmluaXNoIGV4ZWN1dGlvbiBieSB0aGUgdGltZSB0aGVcbiAgICAgICAgICAgIC8vIG5leHQgbWVzc2FnZSBldmVudCBoYW5kbGVyIGlzIHJ1bi5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBlbXVsYXRlIHRoaXMgYmVoYXZpb3VyLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBlYWNoXG4gICAgICAgICAgICAvLyBvbm1lc3NhZ2UgaGFuZGxlciBpcyBydW4gd2l0aGluIGl0J3Mgb3duIG1hY3JvdGFzay5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vbm1lc3NhZ2Uoe2RhdGE6IG1zZ30pLCAwKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDIwNDpcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDEwOlxuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMub3BlblxuICAgICAgICAgIHRoaXMub25vcGVuKHt9KVxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgdGhpcy5vbmVycm9yKDQwMylcbiAgICAgICAgICB0aGlzLmNsb3NlKDEwMDgsIFwiZm9yYmlkZGVuXCIsIGZhbHNlKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgY2FzZSA1MDA6XG4gICAgICAgICAgdGhpcy5vbmVycm9yKDUwMClcbiAgICAgICAgICB0aGlzLmNsb3NlQW5kUmV0cnkoMTAxMSwgXCJpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgNTAwKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihgdW5oYW5kbGVkIHBvbGwgc3RhdHVzICR7c3RhdHVzfWApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNlbmQoYm9keSl7XG4gICAgdGhpcy5hamF4KFwiUE9TVFwiLCBib2R5LCAoKSA9PiB0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpLCByZXNwID0+IHtcbiAgICAgIGlmKCFyZXNwIHx8IHJlc3Auc3RhdHVzICE9PSAyMDApe1xuICAgICAgICB0aGlzLm9uZXJyb3IocmVzcCAmJiByZXNwLnN0YXR1cylcbiAgICAgICAgdGhpcy5jbG9zZUFuZFJldHJ5KDEwMTEsIFwiaW50ZXJuYWwgc2VydmVyIGVycm9yXCIsIGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjbG9zZShjb2RlLCByZWFzb24sIHdhc0NsZWFuKXtcbiAgICBmb3IobGV0IHJlcSBvZiB0aGlzLnJlcXMpeyByZXEuYWJvcnQoKSB9XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jbG9zZWRcbiAgICBsZXQgb3B0cyA9IE9iamVjdC5hc3NpZ24oe2NvZGU6IDEwMDAsIHJlYXNvbjogdW5kZWZpbmVkLCB3YXNDbGVhbjogdHJ1ZX0sIHtjb2RlLCByZWFzb24sIHdhc0NsZWFufSlcbiAgICBpZih0eXBlb2YoQ2xvc2VFdmVudCkgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgdGhpcy5vbmNsb3NlKG5ldyBDbG9zZUV2ZW50KFwiY2xvc2VcIiwgb3B0cykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25jbG9zZShvcHRzKVxuICAgIH1cbiAgfVxuXG4gIGFqYXgobWV0aG9kLCBib2R5LCBvbkNhbGxlclRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICBsZXQgcmVxXG4gICAgbGV0IG9udGltZW91dCA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVxcy5kZWxldGUocmVxKVxuICAgICAgb25DYWxsZXJUaW1lb3V0KClcbiAgICB9XG4gICAgcmVxID0gQWpheC5yZXF1ZXN0KG1ldGhvZCwgdGhpcy5lbmRwb2ludFVSTCgpLCBcImFwcGxpY2F0aW9uL2pzb25cIiwgYm9keSwgdGhpcy50aW1lb3V0LCBvbnRpbWVvdXQsIHJlc3AgPT4ge1xuICAgICAgdGhpcy5yZXFzLmRlbGV0ZShyZXEpXG4gICAgICBpZih0aGlzLmlzQWN0aXZlKCkpeyBjYWxsYmFjayhyZXNwKSB9XG4gICAgfSlcbiAgICB0aGlzLnJlcXMuYWRkKHJlcSlcbiAgfVxufVxuIiwgIi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIFByZXNlbmNlXG4gKiBAcGFyYW0ge0NoYW5uZWx9IGNoYW5uZWwgLSBUaGUgQ2hhbm5lbFxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBUaGUgb3B0aW9ucyxcbiAqICAgICAgICBmb3IgZXhhbXBsZSBge2V2ZW50czoge3N0YXRlOiBcInN0YXRlXCIsIGRpZmY6IFwiZGlmZlwifX1gXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXNlbmNlIHtcblxuICBjb25zdHJ1Y3RvcihjaGFubmVsLCBvcHRzID0ge30pe1xuICAgIGxldCBldmVudHMgPSBvcHRzLmV2ZW50cyB8fCB7c3RhdGU6IFwicHJlc2VuY2Vfc3RhdGVcIiwgZGlmZjogXCJwcmVzZW5jZV9kaWZmXCJ9XG4gICAgdGhpcy5zdGF0ZSA9IHt9XG4gICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXVxuICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWxcbiAgICB0aGlzLmpvaW5SZWYgPSBudWxsXG4gICAgdGhpcy5jYWxsZXIgPSB7XG4gICAgICBvbkpvaW46IGZ1bmN0aW9uICgpeyB9LFxuICAgICAgb25MZWF2ZTogZnVuY3Rpb24gKCl7IH0sXG4gICAgICBvblN5bmM6IGZ1bmN0aW9uICgpeyB9XG4gICAgfVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKGV2ZW50cy5zdGF0ZSwgbmV3U3RhdGUgPT4ge1xuICAgICAgbGV0IHtvbkpvaW4sIG9uTGVhdmUsIG9uU3luY30gPSB0aGlzLmNhbGxlclxuXG4gICAgICB0aGlzLmpvaW5SZWYgPSB0aGlzLmNoYW5uZWwuam9pblJlZigpXG4gICAgICB0aGlzLnN0YXRlID0gUHJlc2VuY2Uuc3luY1N0YXRlKHRoaXMuc3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpXG5cbiAgICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goZGlmZiA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jRGlmZih0aGlzLnN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpXG4gICAgICB9KVxuICAgICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXVxuICAgICAgb25TeW5jKClcbiAgICB9KVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKGV2ZW50cy5kaWZmLCBkaWZmID0+IHtcbiAgICAgIGxldCB7b25Kb2luLCBvbkxlYXZlLCBvblN5bmN9ID0gdGhpcy5jYWxsZXJcblxuICAgICAgaWYodGhpcy5pblBlbmRpbmdTeW5jU3RhdGUoKSl7XG4gICAgICAgIHRoaXMucGVuZGluZ0RpZmZzLnB1c2goZGlmZilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jRGlmZih0aGlzLnN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpXG4gICAgICAgIG9uU3luYygpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbihjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uSm9pbiA9IGNhbGxiYWNrIH1cblxuICBvbkxlYXZlKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25MZWF2ZSA9IGNhbGxiYWNrIH1cblxuICBvblN5bmMoY2FsbGJhY2speyB0aGlzLmNhbGxlci5vblN5bmMgPSBjYWxsYmFjayB9XG5cbiAgbGlzdChieSl7IHJldHVybiBQcmVzZW5jZS5saXN0KHRoaXMuc3RhdGUsIGJ5KSB9XG5cbiAgaW5QZW5kaW5nU3luY1N0YXRlKCl7XG4gICAgcmV0dXJuICF0aGlzLmpvaW5SZWYgfHwgKHRoaXMuam9pblJlZiAhPT0gdGhpcy5jaGFubmVsLmpvaW5SZWYoKSlcbiAgfVxuXG4gIC8vIGxvd2VyLWxldmVsIHB1YmxpYyBzdGF0aWMgQVBJXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gc3luYyB0aGUgbGlzdCBvZiBwcmVzZW5jZXMgb24gdGhlIHNlcnZlclxuICAgKiB3aXRoIHRoZSBjbGllbnQncyBzdGF0ZS4gQW4gb3B0aW9uYWwgYG9uSm9pbmAgYW5kIGBvbkxlYXZlYCBjYWxsYmFjayBjYW5cbiAgICogYmUgcHJvdmlkZWQgdG8gcmVhY3QgdG8gY2hhbmdlcyBpbiB0aGUgY2xpZW50J3MgbG9jYWwgcHJlc2VuY2VzIGFjcm9zc1xuICAgKiBkaXNjb25uZWN0cyBhbmQgcmVjb25uZWN0cyB3aXRoIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBzeW5jU3RhdGUoY3VycmVudFN0YXRlLCBuZXdTdGF0ZSwgb25Kb2luLCBvbkxlYXZlKXtcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmNsb25lKGN1cnJlbnRTdGF0ZSlcbiAgICBsZXQgam9pbnMgPSB7fVxuICAgIGxldCBsZWF2ZXMgPSB7fVxuXG4gICAgdGhpcy5tYXAoc3RhdGUsIChrZXksIHByZXNlbmNlKSA9PiB7XG4gICAgICBpZighbmV3U3RhdGVba2V5XSl7XG4gICAgICAgIGxlYXZlc1trZXldID0gcHJlc2VuY2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMubWFwKG5ld1N0YXRlLCAoa2V5LCBuZXdQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZSl7XG4gICAgICAgIGxldCBuZXdSZWZzID0gbmV3UHJlc2VuY2UubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgICBsZXQgY3VyUmVmcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBqb2luZWRNZXRhcyA9IG5ld1ByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IGN1clJlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgbGV0IGxlZnRNZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBuZXdSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIGlmKGpvaW5lZE1ldGFzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIGpvaW5zW2tleV0gPSBuZXdQcmVzZW5jZVxuICAgICAgICAgIGpvaW5zW2tleV0ubWV0YXMgPSBqb2luZWRNZXRhc1xuICAgICAgICB9XG4gICAgICAgIGlmKGxlZnRNZXRhcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICBsZWF2ZXNba2V5XSA9IHRoaXMuY2xvbmUoY3VycmVudFByZXNlbmNlKVxuICAgICAgICAgIGxlYXZlc1trZXldLm1ldGFzID0gbGVmdE1ldGFzXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpvaW5zW2tleV0gPSBuZXdQcmVzZW5jZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuc3luY0RpZmYoc3RhdGUsIHtqb2luczogam9pbnMsIGxlYXZlczogbGVhdmVzfSwgb25Kb2luLCBvbkxlYXZlKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFVzZWQgdG8gc3luYyBhIGRpZmYgb2YgcHJlc2VuY2Ugam9pbiBhbmQgbGVhdmVcbiAgICogZXZlbnRzIGZyb20gdGhlIHNlcnZlciwgYXMgdGhleSBoYXBwZW4uIExpa2UgYHN5bmNTdGF0ZWAsIGBzeW5jRGlmZmBcbiAgICogYWNjZXB0cyBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrcyB0byByZWFjdCB0byBhIHVzZXJcbiAgICogam9pbmluZyBvciBsZWF2aW5nIGZyb20gYSBkZXZpY2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBzeW5jRGlmZihzdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKXtcbiAgICBsZXQge2pvaW5zLCBsZWF2ZXN9ID0gdGhpcy5jbG9uZShkaWZmKVxuICAgIGlmKCFvbkpvaW4peyBvbkpvaW4gPSBmdW5jdGlvbiAoKXsgfSB9XG4gICAgaWYoIW9uTGVhdmUpeyBvbkxlYXZlID0gZnVuY3Rpb24gKCl7IH0gfVxuXG4gICAgdGhpcy5tYXAoam9pbnMsIChrZXksIG5ld1ByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgc3RhdGVba2V5XSA9IHRoaXMuY2xvbmUobmV3UHJlc2VuY2UpXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2Upe1xuICAgICAgICBsZXQgam9pbmVkUmVmcyA9IHN0YXRlW2tleV0ubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgICBsZXQgY3VyTWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gam9pbmVkUmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBzdGF0ZVtrZXldLm1ldGFzLnVuc2hpZnQoLi4uY3VyTWV0YXMpXG4gICAgICB9XG4gICAgICBvbkpvaW4oa2V5LCBjdXJyZW50UHJlc2VuY2UsIG5ld1ByZXNlbmNlKVxuICAgIH0pXG4gICAgdGhpcy5tYXAobGVhdmVzLCAoa2V5LCBsZWZ0UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBpZighY3VycmVudFByZXNlbmNlKXsgcmV0dXJuIH1cbiAgICAgIGxldCByZWZzVG9SZW1vdmUgPSBsZWZ0UHJlc2VuY2UubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgY3VycmVudFByZXNlbmNlLm1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihwID0+IHtcbiAgICAgICAgcmV0dXJuIHJlZnNUb1JlbW92ZS5pbmRleE9mKHAucGh4X3JlZikgPCAwXG4gICAgICB9KVxuICAgICAgb25MZWF2ZShrZXksIGN1cnJlbnRQcmVzZW5jZSwgbGVmdFByZXNlbmNlKVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlLm1ldGFzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGRlbGV0ZSBzdGF0ZVtrZXldXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gc3RhdGVcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcmVzZW5jZXMsIHdpdGggc2VsZWN0ZWQgbWV0YWRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcmVzZW5jZXNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2hvb3NlclxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJlc2VuY2V9XG4gICAqL1xuICBzdGF0aWMgbGlzdChwcmVzZW5jZXMsIGNob29zZXIpe1xuICAgIGlmKCFjaG9vc2VyKXsgY2hvb3NlciA9IGZ1bmN0aW9uIChrZXksIHByZXMpeyByZXR1cm4gcHJlcyB9IH1cblxuICAgIHJldHVybiB0aGlzLm1hcChwcmVzZW5jZXMsIChrZXksIHByZXNlbmNlKSA9PiB7XG4gICAgICByZXR1cm4gY2hvb3NlcihrZXksIHByZXNlbmNlKVxuICAgIH0pXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgc3RhdGljIG1hcChvYmosIGZ1bmMpe1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLm1hcChrZXkgPT4gZnVuYyhrZXksIG9ialtrZXldKSlcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShvYmopeyByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKSB9XG59XG4iLCAiLyogVGhlIGRlZmF1bHQgc2VyaWFsaXplciBmb3IgZW5jb2RpbmcgYW5kIGRlY29kaW5nIG1lc3NhZ2VzICovXG5pbXBvcnQge1xuICBDSEFOTkVMX0VWRU5UU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEhFQURFUl9MRU5HVEg6IDEsXG4gIE1FVEFfTEVOR1RIOiA0LFxuICBLSU5EUzoge3B1c2g6IDAsIHJlcGx5OiAxLCBicm9hZGNhc3Q6IDJ9LFxuXG4gIGVuY29kZShtc2csIGNhbGxiYWNrKXtcbiAgICBpZihtc2cucGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuYmluYXJ5RW5jb2RlKG1zZykpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwYXlsb2FkID0gW21zZy5qb2luX3JlZiwgbXNnLnJlZiwgbXNnLnRvcGljLCBtc2cuZXZlbnQsIG1zZy5wYXlsb2FkXVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKVxuICAgIH1cbiAgfSxcblxuICBkZWNvZGUocmF3UGF5bG9hZCwgY2FsbGJhY2spe1xuICAgIGlmKHJhd1BheWxvYWQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLmJpbmFyeURlY29kZShyYXdQYXlsb2FkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IFtqb2luX3JlZiwgcmVmLCB0b3BpYywgZXZlbnQsIHBheWxvYWRdID0gSlNPTi5wYXJzZShyYXdQYXlsb2FkKVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKHtqb2luX3JlZiwgcmVmLCB0b3BpYywgZXZlbnQsIHBheWxvYWR9KVxuICAgIH1cbiAgfSxcblxuICAvLyBwcml2YXRlXG5cbiAgYmluYXJ5RW5jb2RlKG1lc3NhZ2Upe1xuICAgIGxldCB7am9pbl9yZWYsIHJlZiwgZXZlbnQsIHRvcGljLCBwYXlsb2FkfSA9IG1lc3NhZ2VcbiAgICBsZXQgbWV0YUxlbmd0aCA9IHRoaXMuTUVUQV9MRU5HVEggKyBqb2luX3JlZi5sZW5ndGggKyByZWYubGVuZ3RoICsgdG9waWMubGVuZ3RoICsgZXZlbnQubGVuZ3RoXG4gICAgbGV0IGhlYWRlciA9IG5ldyBBcnJheUJ1ZmZlcih0aGlzLkhFQURFUl9MRU5HVEggKyBtZXRhTGVuZ3RoKVxuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGhlYWRlcilcbiAgICBsZXQgb2Zmc2V0ID0gMFxuXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgdGhpcy5LSU5EUy5wdXNoKSAvLyBraW5kXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgam9pbl9yZWYubGVuZ3RoKVxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIHJlZi5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgdG9waWMubGVuZ3RoKVxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGV2ZW50Lmxlbmd0aClcbiAgICBBcnJheS5mcm9tKGpvaW5fcmVmLCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG4gICAgQXJyYXkuZnJvbShyZWYsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKHRvcGljLCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG4gICAgQXJyYXkuZnJvbShldmVudCwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuXG4gICAgdmFyIGNvbWJpbmVkID0gbmV3IFVpbnQ4QXJyYXkoaGVhZGVyLmJ5dGVMZW5ndGggKyBwYXlsb2FkLmJ5dGVMZW5ndGgpXG4gICAgY29tYmluZWQuc2V0KG5ldyBVaW50OEFycmF5KGhlYWRlciksIDApXG4gICAgY29tYmluZWQuc2V0KG5ldyBVaW50OEFycmF5KHBheWxvYWQpLCBoZWFkZXIuYnl0ZUxlbmd0aClcblxuICAgIHJldHVybiBjb21iaW5lZC5idWZmZXJcbiAgfSxcblxuICBiaW5hcnlEZWNvZGUoYnVmZmVyKXtcbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpXG4gICAgbGV0IGtpbmQgPSB2aWV3LmdldFVpbnQ4KDApXG4gICAgbGV0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKVxuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgdGhpcy5LSU5EUy5wdXNoOiByZXR1cm4gdGhpcy5kZWNvZGVQdXNoKGJ1ZmZlciwgdmlldywgZGVjb2RlcilcbiAgICAgIGNhc2UgdGhpcy5LSU5EUy5yZXBseTogcmV0dXJuIHRoaXMuZGVjb2RlUmVwbHkoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgICAgY2FzZSB0aGlzLktJTkRTLmJyb2FkY2FzdDogcmV0dXJuIHRoaXMuZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2RlcilcbiAgICB9XG4gIH0sXG5cbiAgZGVjb2RlUHVzaChidWZmZXIsIHZpZXcsIGRlY29kZXIpe1xuICAgIGxldCBqb2luUmVmU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDMpXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIHRoaXMuTUVUQV9MRU5HVEggLSAxIC8vIHB1c2hlcyBoYXZlIG5vIHJlZlxuICAgIGxldCBqb2luUmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgam9pblJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGpvaW5SZWZTaXplXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgcmV0dXJuIHtqb2luX3JlZjogam9pblJlZiwgcmVmOiBudWxsLCB0b3BpYzogdG9waWMsIGV2ZW50OiBldmVudCwgcGF5bG9hZDogZGF0YX1cbiAgfSxcblxuICBkZWNvZGVSZXBseShidWZmZXIsIHZpZXcsIGRlY29kZXIpe1xuICAgIGxldCBqb2luUmVmU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgcmVmU2l6ZSA9IHZpZXcuZ2V0VWludDgoMilcbiAgICBsZXQgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgzKVxuICAgIGxldCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDQpXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIHRoaXMuTUVUQV9MRU5HVEhcbiAgICBsZXQgam9pblJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGpvaW5SZWZTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBqb2luUmVmU2l6ZVxuICAgIGxldCByZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyByZWZTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyByZWZTaXplXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgbGV0IHBheWxvYWQgPSB7c3RhdHVzOiBldmVudCwgcmVzcG9uc2U6IGRhdGF9XG4gICAgcmV0dXJuIHtqb2luX3JlZjogam9pblJlZiwgcmVmOiByZWYsIHRvcGljOiB0b3BpYywgZXZlbnQ6IENIQU5ORUxfRVZFTlRTLnJlcGx5LCBwYXlsb2FkOiBwYXlsb2FkfVxuICB9LFxuXG4gIGRlY29kZUJyb2FkY2FzdChidWZmZXIsIHZpZXcsIGRlY29kZXIpe1xuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDEpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMilcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgMlxuICAgIGxldCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplXG4gICAgbGV0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemVcbiAgICBsZXQgZGF0YSA9IGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKVxuXG4gICAgcmV0dXJuIHtqb2luX3JlZjogbnVsbCwgcmVmOiBudWxsLCB0b3BpYzogdG9waWMsIGV2ZW50OiBldmVudCwgcGF5bG9hZDogZGF0YX1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIGdsb2JhbCxcbiAgcGh4V2luZG93LFxuICBDSEFOTkVMX0VWRU5UUyxcbiAgREVGQVVMVF9USU1FT1VULFxuICBERUZBVUxUX1ZTTixcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUUyxcbiAgV1NfQ0xPU0VfTk9STUFMXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNsb3N1cmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcbmltcG9ydCBDaGFubmVsIGZyb20gXCIuL2NoYW5uZWxcIlxuaW1wb3J0IExvbmdQb2xsIGZyb20gXCIuL2xvbmdwb2xsXCJcbmltcG9ydCBTZXJpYWxpemVyIGZyb20gXCIuL3NlcmlhbGl6ZXJcIlxuaW1wb3J0IFRpbWVyIGZyb20gXCIuL3RpbWVyXCJcblxuLyoqIEluaXRpYWxpemVzIHRoZSBTb2NrZXQgKlxuICpcbiAqIEZvciBJRTggc3VwcG9ydCB1c2UgYW4gRVM1LXNoaW0gKGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZW5kUG9pbnQgLSBUaGUgc3RyaW5nIFdlYlNvY2tldCBlbmRwb2ludCwgaWUsIGBcIndzOi8vZXhhbXBsZS5jb20vc29ja2V0XCJgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIndzczovL2V4YW1wbGUuY29tXCJgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwiL3NvY2tldFwiYCAoaW5oZXJpdGVkIGhvc3QgJiBwcm90b2NvbClcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c10gLSBPcHRpb25hbCBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy50cmFuc3BvcnRdIC0gVGhlIFdlYnNvY2tldCBUcmFuc3BvcnQsIGZvciBleGFtcGxlIFdlYlNvY2tldCBvciBQaG9lbml4LkxvbmdQb2xsLlxuICpcbiAqIERlZmF1bHRzIHRvIFdlYlNvY2tldCB3aXRoIGF1dG9tYXRpYyBMb25nUG9sbCBmYWxsYmFjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmVuY29kZV0gLSBUaGUgZnVuY3Rpb24gdG8gZW5jb2RlIG91dGdvaW5nIG1lc3NhZ2VzLlxuICpcbiAqIERlZmF1bHRzIHRvIEpTT04gZW5jb2Rlci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5kZWNvZGVdIC0gVGhlIGZ1bmN0aW9uIHRvIGRlY29kZSBpbmNvbWluZyBtZXNzYWdlcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBKU09OOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIChwYXlsb2FkLCBjYWxsYmFjaykgPT4gY2FsbGJhY2soSlNPTi5wYXJzZShwYXlsb2FkKSlcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy50aW1lb3V0XSAtIFRoZSBkZWZhdWx0IHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIHRyaWdnZXIgcHVzaCB0aW1lb3V0cy5cbiAqXG4gKiBEZWZhdWx0cyBgREVGQVVMVF9USU1FT1VUYFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLmhlYXJ0YmVhdEludGVydmFsTXNdIC0gVGhlIG1pbGxpc2VjIGludGVydmFsIHRvIHNlbmQgYSBoZWFydGJlYXQgbWVzc2FnZVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnJlY29ubmVjdEFmdGVyTXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbGlzZWNcbiAqIHNvY2tldCByZWNvbm5lY3QgaW50ZXJ2YWwuXG4gKlxuICogRGVmYXVsdHMgdG8gc3RlcHBlZCBiYWNrb2ZmIG9mOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMCwgNTAsIDEwMCwgMTUwLCAyMDAsIDI1MCwgNTAwLCAxMDAwLCAyMDAwXVt0cmllcyAtIDFdIHx8IDUwMDBcbiAqIH1cbiAqIGBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMucmVqb2luQWZ0ZXJNc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtaWxsaXNlY1xuICogcmVqb2luIGludGVydmFsIGZvciBpbmRpdmlkdWFsIGNoYW5uZWxzLlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMDAwLCAyMDAwLCA1MDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9XG4gKiBgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMubG9nZ2VyXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiBmb3Igc3BlY2lhbGl6ZWQgbG9nZ2luZywgaWU6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24oa2luZCwgbXNnLCBkYXRhKSB7XG4gKiAgIGNvbnNvbGUubG9nKGAke2tpbmR9OiAke21zZ31gLCBkYXRhKVxuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLmxvbmdwb2xsZXJUaW1lb3V0XSAtIFRoZSBtYXhpbXVtIHRpbWVvdXQgb2YgYSBsb25nIHBvbGwgQUpBWCByZXF1ZXN0LlxuICpcbiAqIERlZmF1bHRzIHRvIDIwcyAoZG91YmxlIHRoZSBzZXJ2ZXIgbG9uZyBwb2xsIHRpbWVyKS5cbiAqXG4gKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24pfSBbb3B0cy5wYXJhbXNdIC0gVGhlIG9wdGlvbmFsIHBhcmFtcyB0byBwYXNzIHdoZW4gY29ubmVjdGluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmJpbmFyeVR5cGVdIC0gVGhlIGJpbmFyeSB0eXBlIHRvIHVzZSBmb3IgYmluYXJ5IFdlYlNvY2tldCBmcmFtZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gXCJhcnJheWJ1ZmZlclwiXG4gKlxuICogQHBhcmFtIHt2c259IFtvcHRzLnZzbl0gLSBUaGUgc2VyaWFsaXplcidzIHByb3RvY29sIHZlcnNpb24gdG8gc2VuZCBvbiBjb25uZWN0LlxuICpcbiAqIERlZmF1bHRzIHRvIERFRkFVTFRfVlNOLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKGVuZFBvaW50LCBvcHRzID0ge30pe1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MgPSB7b3BlbjogW10sIGNsb3NlOiBbXSwgZXJyb3I6IFtdLCBtZXNzYWdlOiBbXX1cbiAgICB0aGlzLmNoYW5uZWxzID0gW11cbiAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXVxuICAgIHRoaXMucmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IG9wdHMudGltZW91dCB8fCBERUZBVUxUX1RJTUVPVVRcbiAgICB0aGlzLnRyYW5zcG9ydCA9IG9wdHMudHJhbnNwb3J0IHx8IGdsb2JhbC5XZWJTb2NrZXQgfHwgTG9uZ1BvbGxcbiAgICB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnMgPSAwXG4gICAgdGhpcy5kZWZhdWx0RW5jb2RlciA9IFNlcmlhbGl6ZXIuZW5jb2RlLmJpbmQoU2VyaWFsaXplcilcbiAgICB0aGlzLmRlZmF1bHREZWNvZGVyID0gU2VyaWFsaXplci5kZWNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5iaW5hcnlUeXBlID0gb3B0cy5iaW5hcnlUeXBlIHx8IFwiYXJyYXlidWZmZXJcIlxuICAgIHRoaXMuY29ubmVjdENsb2NrID0gMVxuICAgIGlmKHRoaXMudHJhbnNwb3J0ICE9PSBMb25nUG9sbCl7XG4gICAgICB0aGlzLmVuY29kZSA9IG9wdHMuZW5jb2RlIHx8IHRoaXMuZGVmYXVsdEVuY29kZXJcbiAgICAgIHRoaXMuZGVjb2RlID0gb3B0cy5kZWNvZGUgfHwgdGhpcy5kZWZhdWx0RGVjb2RlclxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuY29kZSA9IHRoaXMuZGVmYXVsdEVuY29kZXJcbiAgICAgIHRoaXMuZGVjb2RlID0gdGhpcy5kZWZhdWx0RGVjb2RlclxuICAgIH1cbiAgICBsZXQgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IG51bGxcbiAgICBpZihwaHhXaW5kb3cgJiYgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIpe1xuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBfZSA9PiB7XG4gICAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gdGhpcy5jb25uZWN0Q2xvY2tcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHBoeFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwgX2UgPT4ge1xuICAgICAgICBpZihhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID09PSB0aGlzLmNvbm5lY3RDbG9jayl7XG4gICAgICAgICAgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IG51bGxcbiAgICAgICAgICB0aGlzLmNvbm5lY3QoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMgPSBvcHRzLmhlYXJ0YmVhdEludGVydmFsTXMgfHwgMzAwMDBcbiAgICB0aGlzLnJlam9pbkFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVqb2luQWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlam9pbkFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZWNvbm5lY3RBZnRlck1zID0gKHRyaWVzKSA9PiB7XG4gICAgICBpZihvcHRzLnJlY29ubmVjdEFmdGVyTXMpe1xuICAgICAgICByZXR1cm4gb3B0cy5yZWNvbm5lY3RBZnRlck1zKHRyaWVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsxMCwgNTAsIDEwMCwgMTUwLCAyMDAsIDI1MCwgNTAwLCAxMDAwLCAyMDAwXVt0cmllcyAtIDFdIHx8IDUwMDBcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sb2dnZXIgPSBvcHRzLmxvZ2dlciB8fCBudWxsXG4gICAgdGhpcy5sb25ncG9sbGVyVGltZW91dCA9IG9wdHMubG9uZ3BvbGxlclRpbWVvdXQgfHwgMjAwMDBcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUob3B0cy5wYXJhbXMgfHwge30pXG4gICAgdGhpcy5lbmRQb2ludCA9IGAke2VuZFBvaW50fS8ke1RSQU5TUE9SVFMud2Vic29ja2V0fWBcbiAgICB0aGlzLnZzbiA9IG9wdHMudnNuIHx8IERFRkFVTFRfVlNOXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIgPSBudWxsXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICB0aGlzLnRlYXJkb3duKCgpID0+IHRoaXMuY29ubmVjdCgpKVxuICAgIH0sIHRoaXMucmVjb25uZWN0QWZ0ZXJNcylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBMb25nUG9sbCB0cmFuc3BvcnQgcmVmZXJlbmNlXG4gICAqL1xuICBnZXRMb25nUG9sbFRyYW5zcG9ydCgpeyByZXR1cm4gTG9uZ1BvbGwgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyBhbmQgcmVwbGFjZXMgdGhlIGFjdGl2ZSB0cmFuc3BvcnRcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3VHJhbnNwb3J0IC0gVGhlIG5ldyB0cmFuc3BvcnQgY2xhc3MgdG8gaW5zdGFudGlhdGVcbiAgICpcbiAgICovXG4gIHJlcGxhY2VUcmFuc3BvcnQobmV3VHJhbnNwb3J0KXtcbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gdHJ1ZVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdXG4gICAgaWYodGhpcy5jb25uKXtcbiAgICAgIHRoaXMuY29ubi5jbG9zZSgpXG4gICAgICB0aGlzLmNvbm4gPSBudWxsXG4gICAgfVxuICAgIHRoaXMudHJhbnNwb3J0ID0gbmV3VHJhbnNwb3J0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc29ja2V0IHByb3RvY29sXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwcm90b2NvbCgpeyByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wubWF0Y2goL15odHRwcy8pID8gXCJ3c3NcIiA6IFwid3NcIiB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdWxseSBxdWFsaWZpZWQgc29ja2V0IHVybFxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZW5kUG9pbnRVUkwoKXtcbiAgICBsZXQgdXJpID0gQWpheC5hcHBlbmRQYXJhbXMoXG4gICAgICBBamF4LmFwcGVuZFBhcmFtcyh0aGlzLmVuZFBvaW50LCB0aGlzLnBhcmFtcygpKSwge3ZzbjogdGhpcy52c259KVxuICAgIGlmKHVyaS5jaGFyQXQoMCkgIT09IFwiL1wiKXsgcmV0dXJuIHVyaSB9XG4gICAgaWYodXJpLmNoYXJBdCgxKSA9PT0gXCIvXCIpeyByZXR1cm4gYCR7dGhpcy5wcm90b2NvbCgpfToke3VyaX1gIH1cblxuICAgIHJldHVybiBgJHt0aGlzLnByb3RvY29sKCl9Oi8vJHtsb2NhdGlvbi5ob3N0fSR7dXJpfWBcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0XG4gICAqXG4gICAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2xvc2VFdmVudCNTdGF0dXNfY29kZXMgZm9yIHZhbGlkIHN0YXR1cyBjb2Rlcy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgc29ja2V0IGlzIGRpc2Nvbm5lY3RlZC5cbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBjb2RlIC0gQSBzdGF0dXMgY29kZSBmb3IgZGlzY29ubmVjdGlvbiAoT3B0aW9uYWwpLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVhc29uIC0gQSB0ZXh0dWFsIGRlc2NyaXB0aW9uIG9mIHRoZSByZWFzb24gdG8gZGlzY29ubmVjdC4gKE9wdGlvbmFsKVxuICAgKi9cbiAgZGlzY29ubmVjdChjYWxsYmFjaywgY29kZSwgcmVhc29uKXtcbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gdHJ1ZVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMudGVhcmRvd24oY2FsbGJhY2ssIGNvZGUsIHJlYXNvbilcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gVGhlIHBhcmFtcyB0byBzZW5kIHdoZW4gY29ubmVjdGluZywgZm9yIGV4YW1wbGUgYHt1c2VyX2lkOiB1c2VyVG9rZW59YFxuICAgKlxuICAgKiBQYXNzaW5nIHBhcmFtcyB0byBjb25uZWN0IGlzIGRlcHJlY2F0ZWQ7IHBhc3MgdGhlbSBpbiB0aGUgU29ja2V0IGNvbnN0cnVjdG9yIGluc3RlYWQ6XG4gICAqIGBuZXcgU29ja2V0KFwiL3NvY2tldFwiLCB7cGFyYW1zOiB7dXNlcl9pZDogdXNlclRva2VufX0pYC5cbiAgICovXG4gIGNvbm5lY3QocGFyYW1zKXtcbiAgICBpZihwYXJhbXMpe1xuICAgICAgY29uc29sZSAmJiBjb25zb2xlLmxvZyhcInBhc3NpbmcgcGFyYW1zIHRvIGNvbm5lY3QgaXMgZGVwcmVjYXRlZC4gSW5zdGVhZCBwYXNzIDpwYXJhbXMgdG8gdGhlIFNvY2tldCBjb25zdHJ1Y3RvclwiKVxuICAgICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKHBhcmFtcylcbiAgICB9XG4gICAgaWYodGhpcy5jb25uKXsgcmV0dXJuIH1cblxuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuY29ubiA9IG5ldyB0aGlzLnRyYW5zcG9ydCh0aGlzLmVuZFBvaW50VVJMKCkpXG4gICAgdGhpcy5jb25uLmJpbmFyeVR5cGUgPSB0aGlzLmJpbmFyeVR5cGVcbiAgICB0aGlzLmNvbm4udGltZW91dCA9IHRoaXMubG9uZ3BvbGxlclRpbWVvdXRcbiAgICB0aGlzLmNvbm4ub25vcGVuID0gKCkgPT4gdGhpcy5vbkNvbm5PcGVuKClcbiAgICB0aGlzLmNvbm4ub25lcnJvciA9IGVycm9yID0+IHRoaXMub25Db25uRXJyb3IoZXJyb3IpXG4gICAgdGhpcy5jb25uLm9ubWVzc2FnZSA9IGV2ZW50ID0+IHRoaXMub25Db25uTWVzc2FnZShldmVudClcbiAgICB0aGlzLmNvbm4ub25jbG9zZSA9IGV2ZW50ID0+IHRoaXMub25Db25uQ2xvc2UoZXZlbnQpXG4gIH1cblxuICAvKipcbiAgICogTG9ncyB0aGUgbWVzc2FnZS4gT3ZlcnJpZGUgYHRoaXMubG9nZ2VyYCBmb3Igc3BlY2lhbGl6ZWQgbG9nZ2luZy4gbm9vcHMgYnkgZGVmYXVsdFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2luZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbXNnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqL1xuICBsb2coa2luZCwgbXNnLCBkYXRhKXsgdGhpcy5sb2dnZXIoa2luZCwgbXNnLCBkYXRhKSB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBhIGxvZ2dlciBoYXMgYmVlbiBzZXQgb24gdGhpcyBzb2NrZXQuXG4gICAqL1xuICBoYXNMb2dnZXIoKXsgcmV0dXJuIHRoaXMubG9nZ2VyICE9PSBudWxsIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBvcGVuIGV2ZW50c1xuICAgKlxuICAgKiBAZXhhbXBsZSBzb2NrZXQub25PcGVuKGZ1bmN0aW9uKCl7IGNvbnNvbGUuaW5mbyhcInRoZSBzb2NrZXQgd2FzIG9wZW5lZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25PcGVuKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm9wZW4ucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gY2xvc2UgZXZlbnRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkNsb3NlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmNsb3NlLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIGVycm9yIGV2ZW50c1xuICAgKlxuICAgKiBAZXhhbXBsZSBzb2NrZXQub25FcnJvcihmdW5jdGlvbihlcnJvcil7IGFsZXJ0KFwiQW4gZXJyb3Igb2NjdXJyZWRcIikgfSlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uRXJyb3IoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gbWVzc2FnZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uTWVzc2FnZShjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBQaW5ncyB0aGUgc2VydmVyIGFuZCBpbnZva2VzIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBSVFQgaW4gbWlsbGlzZWNvbmRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGluZyB3YXMgcHVzaGVkIG9yIGZhbHNlIGlmIHVuYWJsZSB0byBiZSBwdXNoZWQuXG4gICAqL1xuICBwaW5nKGNhbGxiYWNrKXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICBsZXQgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuICAgIHRoaXMucHVzaCh7dG9waWM6IFwicGhvZW5peFwiLCBldmVudDogXCJoZWFydGJlYXRcIiwgcGF5bG9hZDoge30sIHJlZjogcmVmfSlcbiAgICBsZXQgb25Nc2dSZWYgPSB0aGlzLm9uTWVzc2FnZShtc2cgPT4ge1xuICAgICAgaWYobXNnLnJlZiA9PT0gcmVmKXtcbiAgICAgICAgdGhpcy5vZmYoW29uTXNnUmVmXSlcbiAgICAgICAgY2FsbGJhY2soRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgY2xlYXJIZWFydGJlYXRzKCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZXIpXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyKVxuICB9XG5cbiAgb25Db25uT3Blbigpe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGBjb25uZWN0ZWQgdG8gJHt0aGlzLmVuZFBvaW50VVJMKCl9YClcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucysrXG4gICAgdGhpcy5mbHVzaFNlbmRCdWZmZXIoKVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMucmVzZXRIZWFydGJlYXQoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgaGVhcnRiZWF0VGltZW91dCgpe1xuICAgIGlmKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZil7XG4gICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKXsgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJoZWFydGJlYXQgdGltZW91dC4gQXR0ZW1wdGluZyB0byByZS1lc3RhYmxpc2ggY29ubmVjdGlvblwiKSB9XG4gICAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICAgIHRoaXMudGVhcmRvd24oKCkgPT4gdGhpcy5yZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSwgV1NfQ0xPU0VfTk9STUFMLCBcImhlYXJ0YmVhdCB0aW1lb3V0XCIpXG4gICAgfVxuICB9XG5cbiAgcmVzZXRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLmNvbm4gJiYgdGhpcy5jb25uLnNraXBIZWFydGJlYXQpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICB0aGlzLmNsZWFySGVhcnRiZWF0cygpXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZW5kSGVhcnRiZWF0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIHRlYXJkb3duKGNhbGxiYWNrLCBjb2RlLCByZWFzb24pe1xuICAgIGlmKCF0aGlzLmNvbm4pe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICB0aGlzLndhaXRGb3JCdWZmZXJEb25lKCgpID0+IHtcbiAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgIGlmKGNvZGUpeyB0aGlzLmNvbm4uY2xvc2UoY29kZSwgcmVhc29uIHx8IFwiXCIpIH0gZWxzZSB7IHRoaXMuY29ubi5jbG9zZSgpIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy53YWl0Rm9yU29ja2V0Q2xvc2VkKCgpID0+IHtcbiAgICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgICB0aGlzLmNvbm4ub25vcGVuID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubi5vbmVycm9yID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgd2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCAhdGhpcy5jb25uLmJ1ZmZlcmVkQW1vdW50KXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZShjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgd2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgPSAxKXtcbiAgICBpZih0cmllcyA9PT0gNSB8fCAhdGhpcy5jb25uIHx8IHRoaXMuY29ubi5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNsb3NlZCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgb25Db25uQ2xvc2UoZXZlbnQpe1xuICAgIGxldCBjbG9zZUNvZGUgPSBldmVudCAmJiBldmVudC5jb2RlXG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJjbG9zZVwiLCBldmVudClcbiAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIHRoaXMuY2xlYXJIZWFydGJlYXRzKClcbiAgICBpZighdGhpcy5jbG9zZVdhc0NsZWFuICYmIGNsb3NlQ29kZSAhPT0gMTAwMCl7XG4gICAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpXG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiBjYWxsYmFjayhldmVudCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG9uQ29ubkVycm9yKGVycm9yKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBlcnJvcilcbiAgICBsZXQgdHJhbnNwb3J0QmVmb3JlID0gdGhpcy50cmFuc3BvcnRcbiAgICBsZXQgZXN0YWJsaXNoZWRCZWZvcmUgPSB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnNcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmVycm9yLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4ge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHRyYW5zcG9ydEJlZm9yZSwgZXN0YWJsaXNoZWRCZWZvcmUpXG4gICAgfSlcbiAgICBpZih0cmFuc3BvcnRCZWZvcmUgPT09IHRoaXMudHJhbnNwb3J0IHx8IGVzdGFibGlzaGVkQmVmb3JlID4gMCl7XG4gICAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlckNoYW5FcnJvcigpe1xuICAgIHRoaXMuY2hhbm5lbHMuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgIGlmKCEoY2hhbm5lbC5pc0Vycm9yZWQoKSB8fCBjaGFubmVsLmlzTGVhdmluZygpIHx8IGNoYW5uZWwuaXNDbG9zZWQoKSkpe1xuICAgICAgICBjaGFubmVsLnRyaWdnZXIoQ0hBTk5FTF9FVkVOVFMuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgY29ubmVjdGlvblN0YXRlKCl7XG4gICAgc3dpdGNoKHRoaXMuY29ubiAmJiB0aGlzLmNvbm4ucmVhZHlTdGF0ZSl7XG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZzogcmV0dXJuIFwiY29ubmVjdGluZ1wiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMub3BlbjogcmV0dXJuIFwib3BlblwiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY2xvc2luZzogcmV0dXJuIFwiY2xvc2luZ1wiXG4gICAgICBkZWZhdWx0OiByZXR1cm4gXCJjbG9zZWRcIlxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNvbm5lY3Rpb25TdGF0ZSgpID09PSBcIm9wZW5cIiB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7Q2hhbm5lbH1cbiAgICovXG4gIHJlbW92ZShjaGFubmVsKXtcbiAgICB0aGlzLm9mZihjaGFubmVsLnN0YXRlQ2hhbmdlUmVmcylcbiAgICB0aGlzLmNoYW5uZWxzID0gdGhpcy5jaGFubmVscy5maWx0ZXIoYyA9PiBjLmpvaW5SZWYoKSAhPT0gY2hhbm5lbC5qb2luUmVmKCkpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBgb25PcGVuYCwgYG9uQ2xvc2VgLCBgb25FcnJvcixgIGFuZCBgb25NZXNzYWdlYCByZWdpc3RyYXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge3JlZnN9IC0gbGlzdCBvZiByZWZzIHJldHVybmVkIGJ5IGNhbGxzIHRvXG4gICAqICAgICAgICAgICAgICAgICBgb25PcGVuYCwgYG9uQ2xvc2VgLCBgb25FcnJvcixgIGFuZCBgb25NZXNzYWdlYFxuICAgKi9cbiAgb2ZmKHJlZnMpe1xuICAgIGZvcihsZXQga2V5IGluIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mpe1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrc1trZXldID0gdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrc1trZXldLmZpbHRlcigoW3JlZl0pID0+IHtcbiAgICAgICAgcmV0dXJuIHJlZnMuaW5kZXhPZihyZWYpID09PSAtMVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIGEgbmV3IGNoYW5uZWwgZm9yIHRoZSBnaXZlbiB0b3BpY1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9waWNcbiAgICogQHBhcmFtIHtPYmplY3R9IGNoYW5QYXJhbXMgLSBQYXJhbWV0ZXJzIGZvciB0aGUgY2hhbm5lbFxuICAgKiBAcmV0dXJucyB7Q2hhbm5lbH1cbiAgICovXG4gIGNoYW5uZWwodG9waWMsIGNoYW5QYXJhbXMgPSB7fSl7XG4gICAgbGV0IGNoYW4gPSBuZXcgQ2hhbm5lbCh0b3BpYywgY2hhblBhcmFtcywgdGhpcylcbiAgICB0aGlzLmNoYW5uZWxzLnB1c2goY2hhbilcbiAgICByZXR1cm4gY2hhblxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqL1xuICBwdXNoKGRhdGEpe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpe1xuICAgICAgbGV0IHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pbl9yZWZ9ID0gZGF0YVxuICAgICAgdGhpcy5sb2coXCJwdXNoXCIsIGAke3RvcGljfSAke2V2ZW50fSAoJHtqb2luX3JlZn0sICR7cmVmfSlgLCBwYXlsb2FkKVxuICAgIH1cblxuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSl7XG4gICAgICB0aGlzLmVuY29kZShkYXRhLCByZXN1bHQgPT4gdGhpcy5jb25uLnNlbmQocmVzdWx0KSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2goKCkgPT4gdGhpcy5lbmNvZGUoZGF0YSwgcmVzdWx0ID0+IHRoaXMuY29ubi5zZW5kKHJlc3VsdCkpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIG5leHQgbWVzc2FnZSByZWYsIGFjY291bnRpbmcgZm9yIG92ZXJmbG93c1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgbWFrZVJlZigpe1xuICAgIGxldCBuZXdSZWYgPSB0aGlzLnJlZiArIDFcbiAgICBpZihuZXdSZWYgPT09IHRoaXMucmVmKXsgdGhpcy5yZWYgPSAwIH0gZWxzZSB7IHRoaXMucmVmID0gbmV3UmVmIH1cblxuICAgIHJldHVybiB0aGlzLnJlZi50b1N0cmluZygpXG4gIH1cblxuICBzZW5kSGVhcnRiZWF0KCl7XG4gICAgaWYodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmICYmICF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5wdXNoKHt0b3BpYzogXCJwaG9lbml4XCIsIGV2ZW50OiBcImhlYXJ0YmVhdFwiLCBwYXlsb2FkOiB7fSwgcmVmOiB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWZ9KVxuICAgIHRoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmhlYXJ0YmVhdFRpbWVvdXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICB9XG5cbiAgZmx1c2hTZW5kQnVmZmVyKCl7XG4gICAgaWYodGhpcy5pc0Nvbm5lY3RlZCgpICYmIHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGggPiAwKXtcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlci5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpXG4gICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXVxuICAgIH1cbiAgfVxuXG4gIG9uQ29ubk1lc3NhZ2UocmF3TWVzc2FnZSl7XG4gICAgdGhpcy5kZWNvZGUocmF3TWVzc2FnZS5kYXRhLCBtc2cgPT4ge1xuICAgICAgbGV0IHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pbl9yZWZ9ID0gbXNnXG4gICAgICBpZihyZWYgJiYgcmVmID09PSB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYpe1xuICAgICAgICB0aGlzLmNsZWFySGVhcnRiZWF0cygpXG4gICAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICAgICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZW5kSGVhcnRiZWF0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJyZWNlaXZlXCIsIGAke3BheWxvYWQuc3RhdHVzIHx8IFwiXCJ9ICR7dG9waWN9ICR7ZXZlbnR9ICR7cmVmICYmIFwiKFwiICsgcmVmICsgXCIpXCIgfHwgXCJcIn1gLCBwYXlsb2FkKVxuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGFubmVscy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSB0aGlzLmNoYW5uZWxzW2ldXG4gICAgICAgIGlmKCFjaGFubmVsLmlzTWVtYmVyKHRvcGljLCBldmVudCwgcGF5bG9hZCwgam9pbl9yZWYpKXsgY29udGludWUgfVxuICAgICAgICBjaGFubmVsLnRyaWdnZXIoZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pbl9yZWYpXG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2UubGVuZ3RoOyBpKyspe1xuICAgICAgICBsZXQgWywgY2FsbGJhY2tdID0gdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlW2ldXG4gICAgICAgIGNhbGxiYWNrKG1zZylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgbGVhdmVPcGVuVG9waWModG9waWMpe1xuICAgIGxldCBkdXBDaGFubmVsID0gdGhpcy5jaGFubmVscy5maW5kKGMgPT4gYy50b3BpYyA9PT0gdG9waWMgJiYgKGMuaXNKb2luZWQoKSB8fCBjLmlzSm9pbmluZygpKSlcbiAgICBpZihkdXBDaGFubmVsKXtcbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGBsZWF2aW5nIGR1cGxpY2F0ZSB0b3BpYyBcIiR7dG9waWN9XCJgKVxuICAgICAgZHVwQ2hhbm5lbC5sZWF2ZSgpXG4gICAgfVxuICB9XG59IiwgImltcG9ydCB7IFJvb20gfSBmcm9tIFwiLi9yb29tXCI7XG5cbmNvbnN0IHJvb20gPSBuZXcgUm9vbSgpO1xucm9vbS5qb2luKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxhQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTztBQUN0RCxjQUFRLHNCQUFzQixRQUFRLHFCQUFxQixRQUFRLHdCQUF3QixRQUFRLHNCQUFzQjtBQUN6SCxtQ0FBNkIsWUFBWTtBQUNyQyxlQUFPLEtBQUssVUFBVTtBQUFBO0FBRTFCLGNBQVEsc0JBQXNCO0FBQzlCLHFDQUErQixzQkFBc0I7QUFDakQsZUFBTyxLQUFLLE1BQU07QUFBQTtBQUV0QixjQUFRLHdCQUF3QjtBQUNoQyxrQ0FBNEIsTUFBTSxNQUFNO0FBQ3BD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QUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUk7QUFDckMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUk7QUFDckMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDbkMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRztBQUNuQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJO0FBQ2hDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDbkMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRztBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRztBQUNuQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSTtBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDbkMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSTtBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUc7QUFDbkMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSTtBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUk7QUFDckMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRztBQUNuQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJO0FBQ2hDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSTtBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHO0FBQ25DLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUk7QUFDckMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxHQUFHO0FBQy9CLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSTtBQUNyQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJO0FBQ3BDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLEdBQUc7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSTtBQUNwQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJO0FBQ3JDLFVBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUk7QUFDcEMsVUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRztBQUNuQyxVQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJ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
