#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _napi = require("@ast-grep/napi");
var _rule = require("./rule");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
(function() {
    return _async_to_generator(function() {
        var rule, dir;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    rule = (0, _rule.getCounterRule)({
                        importSourceRustRegex: "@mui/material|@prep/design-system"
                    });
                    // get dir from args
                    dir = process.argv[2] || ".";
                    return [
                        4,
                        (0, _napi.findInFiles)(_napi.Lang.Tsx, {
                            paths: [
                                dir
                            ],
                            matcher: rule
                        }, function(err, results) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            var fileName = results[0].getRoot().filename();
                            console.table(results.map(function(result) {
                                var _result_getMatch, _result_getMatch1, _result_getMatch2, _result_getMatch3;
                                var source = (_result_getMatch = result.getMatch(_rule.SOURCE)) === null || _result_getMatch === void 0 ? void 0 : _result_getMatch.text();
                                var originalName = (_result_getMatch1 = result.getMatch(_rule.ORIGINAL_NAME)) === null || _result_getMatch1 === void 0 ? void 0 : _result_getMatch1.text();
                                var nameOrAlias = (_result_getMatch2 = result.getMatch(_rule.NAME)) === null || _result_getMatch2 === void 0 ? void 0 : _result_getMatch2.text();
                                var propertyName = (_result_getMatch3 = result.getMatch(_rule.PROPERTY_NAME)) === null || _result_getMatch3 === void 0 ? void 0 : _result_getMatch3.text();
                                var name = originalName !== null && originalName !== void 0 ? originalName : nameOrAlias;
                                var alias = originalName ? nameOrAlias : undefined;
                                return {
                                    fileName: fileName,
                                    source: source,
                                    name: name,
                                    alias: alias,
                                    propertyName: propertyName
                                };
                            }));
                        // for (const result of results) {
                        //     const source = result.getMatch("SOURCE")?.text();
                        //     const originalName = result.getMatch("ORIGINAL_NAME")?.text();
                        //     const name = result.getMatch("NAME")?.text();
                        //     const alias = result.getMatch("ALIAS")?.text();
                        //     console.log("ORIGINAL_NAME", originalName)
                        //     console.log("NAME", name)
                        //     console.log("ALIAS", alias)
                        //     console.log("SOURCE", source)
                        // }
                        })
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    })();
})();
