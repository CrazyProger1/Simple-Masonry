import React, { useRef, useEffect, useState } from "react";
import { calculateHorizontalMasonry } from "../utils";
import clsx from "clsx";

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Props {
  children: React.ReactNode[];
  extendClassName?: string;
  gap?: Gap;
}

const HorizontalMasonry = ({ children, extendClassName, gap = 0 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [orderedChildren, setOrderedChildren] = useState(children);

  const combinedClassName = clsx(
    "flex flex-wrap",
    gap === 1 && "gap-1",
    gap === 2 && "gap-2",
    gap === 3 && "gap-3",
    gap === 4 && "gap-4",
    gap === 5 && "gap-5",
    gap === 6 && "gap-6",
    gap === 7 && "gap-7",
    gap === 8 && "gap-8",
    gap === 9 && "gap-9",
    gap === 10 && "gap-10",
    extendClassName,
  );

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      const childrenWithWidths = Array.from(containerRef.current.children).map(
        (item, index) => ({
          width: (item as HTMLElement).getBoundingClientRect().width,
          index,
        }),
      );

      const sortedChildren = childrenWithWidths.sort(
        (a, b) => b.width - a.width,
      );

      const sortedIndices = sortedChildren.map((child) => child.index);

      const orderedIndices = calculateHorizontalMasonry(
        sortedChildren.map((child) => child.width),
        rect.width,
        gap * 4,
      );

      setOrderedChildren(
        orderedIndices.map((index) => children[sortedIndices[index]]),
      );
    }
  }, [children, gap]);

  return (
    <div ref={containerRef} className={combinedClassName}>
      {orderedChildren}
    </div>
  );
};
export default HorizontalMasonry;
