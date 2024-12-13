"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHorizontalMasonry = void 0;
const findNextFittingWidth = (widths, ignoreIndices, maxWidth) => {
    for (let i = 0; i < widths.length; i++)
        if (!ignoreIndices.has(i) && widths[i] < maxWidth)
            return { index: i, width: widths[i] };
};
const calculateHorizontalMasonry = (widths, maxWidth, gap = 0) => {
    const length = widths.length;
    const sortedWidths = widths.toSorted((w1, w2) => w2 - w1);
    const resultWidths = [];
    const ignoreIndices = new Set();
    let row = [];
    let rowWidth = 0;
    while (ignoreIndices.size != length) {
        const next = findNextFittingWidth(sortedWidths, ignoreIndices, maxWidth - rowWidth);
        if (!next) {
            resultWidths.push(...row);
            row = [];
            rowWidth = 0;
        }
        else {
            const { index, width } = next;
            row.push(width);
            ignoreIndices.add(index);
            rowWidth += width + gap;
        }
    }
    resultWidths.push(...row);
    return resultWidths.map((width) => widths.indexOf(width));
};
exports.calculateHorizontalMasonry = calculateHorizontalMasonry;
//# sourceMappingURL=masonry.js.map