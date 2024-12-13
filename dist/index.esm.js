import React, { useRef, useState, useEffect } from 'react';

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

const HorizontalMasonry = ({ children, className, gap }) => {
    const containerRef = useRef(null);
    const [orderedChildren, setOrderedChildren] = useState(children);
    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const widths = Array.from(containerRef.current.children, (item) => item.getBoundingClientRect().width);
            const indices = calculateHorizontalMasonry(widths, rect.width, gap);
            setOrderedChildren(indices.map((index) => children[index]));
        }
    }, [children]);
    return (React.createElement("div", { ref: containerRef, className: className ? className : "flex flex-wrap" }, orderedChildren));
};

export { HorizontalMasonry };
//# sourceMappingURL=index.esm.js.map
