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

      const widths = Array.from(
        containerRef.current.children,
        (item) => item.getBoundingClientRect().width,
      );

      const indices = calculateHorizontalMasonry(widths, rect.width, gap * 4);

      setOrderedChildren(indices.map((index) => children[index]));
    }
  }, [children, gap]);

  return (
    <div ref={containerRef} className={combinedClassName}>
      {orderedChildren}
    </div>
  );
};
export default HorizontalMasonry;
