"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var plugins_1 = __importDefault(require("suneditor/src/plugins"));
var suneditor_1 = __importDefault(require("suneditor"));
var getLanguage_1 = __importDefault(require("../lang/getLanguage"));
var events_1 = require("../data/events");
var SunEditor = function (props) {
    var name = props.name, lang = props.lang, _a = props.setOptions, setOptions = _a === void 0 ? {} : _a, placeholder = props.placeholder, _b = props.width, width = _b === void 0 ? "100%" : _b, height = props.height, defaultValue = props.defaultValue, setContents = props.setContents, setDefaultStyle = props.setDefaultStyle, getSunEditorInstance = props.getSunEditorInstance, appendContents = props.appendContents, _c = props.setAllPlugins, setAllPlugins = _c === void 0 ? true : _c, _d = props.disable, disable = _d === void 0 ? false : _d, _e = props.readOnly, readOnly = _e === void 0 ? false : _e, _f = props.hide, hide = _f === void 0 ? false : _f, _g = props.hideToolbar, hideToolbar = _g === void 0 ? false : _g, _h = props.disableToolbar, disableToolbar = _h === void 0 ? false : _h, onChange = props.onChange, autoFocus = props.autoFocus, onBlur = props.onBlur, onLoad = props.onLoad;
    var txtArea = (0, react_1.useRef)(null);
    var editor = (0, react_1.useRef)(null);
    var initialEffect = (0, react_1.useRef)(true);
    (0, react_1.useEffect)(function () {
        var _a;
        var options = __assign(__assign({}, setOptions), { lang: lang ? (0, getLanguage_1.default)(lang) : setOptions.lang, width: width !== null && width !== void 0 ? width : setOptions.width, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : setOptions.placeholder, plugins: (_a = setOptions.plugins) !== null && _a !== void 0 ? _a : (setAllPlugins ? plugins_1.default : undefined), height: height !== null && height !== void 0 ? height : setOptions.height, value: defaultValue !== null && defaultValue !== void 0 ? defaultValue : setOptions.value, defaultStyle: setDefaultStyle !== null && setDefaultStyle !== void 0 ? setDefaultStyle : setOptions.defaultStyle });
        if (name && options.value)
            txtArea.current.value = options.value;
        editor.current = suneditor_1.default.create(txtArea.current, options);
        if (getSunEditorInstance)
            getSunEditorInstance(editor.current);
        editor.current.onload = function (_, reload) {
            if (reload)
                return onLoad === null || onLoad === void 0 ? void 0 : onLoad(reload);
            if (setContents) {
                editor.current.setContents(setContents);
                editor.current.core.focusEdge(null);
            }
            if (appendContents)
                editor.current.appendContents(appendContents);
            if (editor.current.util.isIE)
                editor.current.core._createDefaultRange();
            if (disable)
                editor.current.disable();
            if (readOnly)
                editor.current.readOnly(true);
            if (hide)
                editor.current.hide();
            if (hideToolbar)
                editor.current.toolbar.hide();
            if (disableToolbar)
                editor.current.toolbar.disable();
            if (autoFocus === false)
                editor.current.core.context.element.wysiwyg.blur();
            else if (autoFocus)
                editor.current.core.context.element.wysiwyg.focus();
            return onLoad === null || onLoad === void 0 ? void 0 : onLoad(reload);
        };
        editor.current.onChange = function (content) {
            if (name && txtArea.current)
                txtArea.current.value = content;
            if (onChange)
                onChange(content);
        };
        if (onBlur) {
            editor.current.onBlur = function (e) {
                return onBlur(e, editor.current.getContents(true));
            };
        }
        events_1.uploadBeforeEvents.forEach(function (event) {
            var value = props[event];
            if (editor.current && value)
                editor.current[event] = function (files, info, _, uploadHandler) { return value(files, info, uploadHandler); };
        });
        events_1.events.forEach(function (event) {
            var value = props[event];
            if (value && editor.current) {
                editor.current[event] = value;
            }
        });
        return function () {
            if (editor.current)
                editor.current.destroy();
            editor.current = null;
        };
    }, []);
    (0, react_1.useEffect)(function () {
        var _a;
        if (initialEffect.current)
            return;
        (_a = editor.current) === null || _a === void 0 ? void 0 : _a.setOptions({
            lang: (0, getLanguage_1.default)(lang),
        });
    }, [lang]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (initialEffect.current)
            return;
        (_a = editor.current) === null || _a === void 0 ? void 0 : _a.setOptions({
            placeholder: placeholder,
            height: height,
            width: width,
        });
    }, [placeholder, height, width]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (setDefaultStyle && !initialEffect.current)
            (_a = editor.current) === null || _a === void 0 ? void 0 : _a.setDefaultStyle(setDefaultStyle);
    }, [setDefaultStyle]);
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (!initialEffect.current &&
            setContents !== undefined &&
            !((_a = editor.current) === null || _a === void 0 ? void 0 : _a.core.hasFocus)) {
            (_b = editor.current) === null || _b === void 0 ? void 0 : _b.setContents(setContents);
        }
    }, [setContents]);
    (0, react_1.useEffect)(function () {
        var _a, _b, _c;
        if (!initialEffect.current &&
            appendContents !== undefined &&
            !((_a = editor.current) === null || _a === void 0 ? void 0 : _a.core.hasFocus)) {
            (_b = editor.current) === null || _b === void 0 ? void 0 : _b.appendContents(appendContents);
            (_c = editor.current) === null || _c === void 0 ? void 0 : _c.core.focusEdge(null);
        }
    }, [appendContents]);
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (initialEffect.current)
            return;
        (_a = editor.current) === null || _a === void 0 ? void 0 : _a.readOnly(readOnly);
        if (hideToolbar)
            (_b = editor.current) === null || _b === void 0 ? void 0 : _b.toolbar.hide();
        else
            (_c = editor.current) === null || _c === void 0 ? void 0 : _c.toolbar.show();
        if (disableToolbar)
            (_d = editor.current) === null || _d === void 0 ? void 0 : _d.toolbar.disable();
        else
            (_e = editor.current) === null || _e === void 0 ? void 0 : _e.toolbar.enable();
        if (disable)
            (_f = editor.current) === null || _f === void 0 ? void 0 : _f.disable();
        else
            (_g = editor.current) === null || _g === void 0 ? void 0 : _g.enable();
        if (hide)
            (_h = editor.current) === null || _h === void 0 ? void 0 : _h.hide();
        else
            (_j = editor.current) === null || _j === void 0 ? void 0 : _j.show();
    }, [disable, hideToolbar, disableToolbar, hide, readOnly]);
    (0, react_1.useEffect)(function () {
        initialEffect.current = false;
    }, []);
    return (react_1.default.createElement("textarea", { style: { visibility: "hidden" }, ref: txtArea, name: name }));
};
exports.default = SunEditor;
