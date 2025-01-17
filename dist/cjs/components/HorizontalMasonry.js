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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const utils_1 = require("../utils");
const clsx_1 = __importDefault(require("clsx"));
const HorizontalMasonry = ({ children, extendClassName, gap = 0, dynamic = true, }) => {
    const containerRef = (0, react_1.useRef)(null);
    const [orderedChildren, setOrderedChildren] = (0, react_1.useState)(children);
    const combinedClassName = (0, clsx_1.default)("flex flex-wrap", gap === 1 && "gap-1", gap === 2 && "gap-2", gap === 3 && "gap-3", gap === 4 && "gap-4", gap === 5 && "gap-5", gap === 6 && "gap-6", gap === 7 && "gap-7", gap === 8 && "gap-8", gap === 9 && "gap-9", gap === 10 && "gap-10", extendClassName);
    const reorder = () => {
        const current = containerRef.current;
        if (current) {
            const rect = current.getBoundingClientRect();
            const widths = Array.from(current.children, (item) => item.getBoundingClientRect().width);
            const indices = (0, utils_1.calculateHorizontalMasonry)(widths, rect.width, gap * 4);
            setOrderedChildren(indices.map((index) => children[index]));
        }
    };
    (0, react_1.useEffect)(() => {
        dynamic && reorder();
    }, [children, gap]);
    return (react_1.default.createElement("div", { ref: containerRef, className: combinedClassName }, orderedChildren));
};
exports.default = HorizontalMasonry;
//# sourceMappingURL=HorizontalMasonry.js.map