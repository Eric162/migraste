"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NAME: function() {
        return NAME;
    },
    ORIGINAL_NAME: function() {
        return ORIGINAL_NAME;
    },
    SOURCE: function() {
        return SOURCE;
    },
    getCounterRule: function() {
        return getCounterRule;
    }
});
var _napi = require("@ast-grep/napi");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
var SOURCE = "SOURCE";
var ORIGINAL_NAME = "ORIGINAL_NAME";
var NAME = "NAME";
var Utils = /*#__PURE__*/ function(Utils) {
    Utils["aliasImport"] = "aliasImport";
    Utils["namedImport"] = "namedImport";
    Utils["defaultImport"] = "defaultImport";
    Utils["shortHandDestructure"] = "shortHandDestructure";
    return Utils;
}(Utils || {});
var _obj;
var utils = (_obj = {}, _define_property(_obj, "aliasImport", {
    all: [
        {
            has: {
                kind: "identifier",
                pattern: "$".concat(NAME),
                field: "alias"
            }
        },
        {
            has: {
                kind: "identifier",
                pattern: "$".concat(ORIGINAL_NAME),
                field: "name"
            }
        }
    ]
}), _define_property(_obj, "namedImport", {
    has: {
        kind: "identifier",
        pattern: "$".concat(NAME),
        field: "name"
    }
}), _define_property(_obj, "defaultImport", {
    has: {
        kind: "import_clause",
        has: {
            kind: "identifier",
            pattern: "$".concat(NAME)
        }
    }
}), _define_property(_obj, "shortHandDestructure", {
    has: {
        kind: "shorthand_property_identifier_pattern",
        stopBy: "end",
        pattern: "$".concat(NAME),
        inside: {
            kind: "variable_declarator",
            stopBy: {
                kind: "object_pattern"
            }
        }
    }
}), _obj);
function getCounterRule() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, importOriginalNameRegex = _ref.importOriginalNameRegex, importSourceRustRegex = _ref.importSourceRustRegex;
    return {
        utils: utils,
        rule: {
            kind: "identifier",
            pattern: "$".concat(NAME),
            regex: importOriginalNameRegex,
            inside: {
                any: [
                    {
                        kind: "jsx_opening_element"
                    },
                    {
                        kind: "jsx_self_closing_element"
                    }
                ],
                inside: {
                    kind: "program",
                    stopBy: "end",
                    has: {
                        kind: "import_statement",
                        all: [
                            {
                                regex: importSourceRustRegex,
                                has: {
                                    kind: "string",
                                    stopBy: "end",
                                    has: {
                                        kind: "string_fragment",
                                        pattern: "$".concat(SOURCE)
                                    }
                                }
                            },
                            {
                                any: [
                                    {
                                        matches: "defaultImport"
                                    },
                                    {
                                        has: {
                                            kind: "import_specifier",
                                            stopBy: "end",
                                            any: [
                                                {
                                                    matches: "namedImport"
                                                },
                                                {
                                                    matches: "aliasImport"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        has: {
                                            kind: "namespace_import",
                                            stopBy: "end",
                                            has: {
                                                kind: "identifier"
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        language: _napi.Lang.Tsx
    };
}
