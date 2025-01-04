import React, { useRef, useEffect, useState } from "react";
import { calculateHorizontalMasonry } from "../utils";
import clsx from "clsx";

interface Props {
  children: React.ReactNode[];
  className?: string;
  gap?: 0 | 1 | 2 | 3 | 4 | 5;
}

const HorizontalMasonry = ({
  children,
  className,
  gap = 0,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [orderedChildren, setOrderedChildren] = useState(children);
  const defaultClassName = clsx(
      "flex",
      "flex-wrap",
      gap === 1 && "gap-1",
      gap === 2 && "gap-2",
      gap === 3 && "gap-3",
      gap === 4 && "gap-4",
      gap === 5 && "gap-5",
  )
  className = className ? className : ` flex flex-wrap gap-${gap} `;

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
    <div
      ref={containerRef}
      className={className}
    >
      {orderedChildren}
    </div>
  );
};
export default HorizontalMasonry;
