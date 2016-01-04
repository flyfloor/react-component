"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Data = {
    get: function get(dom, attr) {
        if (dom && attr) {
            try {
                return dom.dataset[attr];
            } catch (error) {
                return dom.getAttribute("data-" + attr);
            }
        }
        return undefined;
    },
    set: function set(dom, attr, value) {
        if (dom) {
            try {
                dom.dataset[attr] = value;
            } catch (error) {
                return dom.setAttribute("data-" + attr, value);
            }
        };
    }
};

exports.default = Data;