import React, { useRef, useEffect, useState } from "react";
import { calculateHorizontalMasonry } from "../utils";
const HorizontalMasonry = ({ children, className, extendClassName = "", gap = 0, }) => {
    const containerRef = useRef(null);
    const [orderedChildren, setOrderedChildren] = useState(children);
    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const widths = Array.from(containerRef.current.children, (item) => item.getBoundingClientRect().width);
            const indices = calculateHorizontalMasonry(widths, rect.width, gap * 4);
            setOrderedChildren(indices.map((index) => children[index]));
        }
    }, [children, gap]);
    return (React.createElement("div", { ref: containerRef, className: (className ? className : `flex flex-wrap gap-${gap}`) + extendClassName }, orderedChildren));
};
export default HorizontalMasonry;
//# sourceMappingURL=HorizontalMasonry.js.map