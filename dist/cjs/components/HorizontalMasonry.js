"use strict";
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const utils_1 = require("../utils");
const HorizontalMasonry = ({ children, className, gap }) => {
    const containerRef = (0, react_1.useRef)(null);
    const [orderedChildren, setOrderedChildren] = (0, react_1.useState)(children);
    (0, react_1.useEffect)(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const widths = Array.from(containerRef.current.children, (item) => item.getBoundingClientRect().width);
            const indices = (0, utils_1.calculateHorizontalMasonry)(widths, rect.width, gap);
            setOrderedChildren(indices.map((index) => children[index]));
        }
    }, [children, gap]);
    return (react_1.default.createElement("div", { ref: containerRef, className: className ? className : "flex flex-wrap" }, orderedChildren));
};
exports.default = HorizontalMasonry;
//# sourceMappingURL=HorizontalMasonry.js.map