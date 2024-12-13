import React, { useRef, useEffect, useState } from "react";
import { calculateHorizontalMasonry } from "../utils";

interface Props {
  children: React.ReactNode[];
  className?: string;
  gap?: number;
}

const HorizontalMasonry = ({ children, className, gap = 1 }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [orderedChildren, setOrderedChildren] = useState(children);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      const widths = Array.from(
        containerRef.current.children,
        (item) => item.getBoundingClientRect().width,
      );

      const indices = calculateHorizontalMasonry(widths, rect.width, gap);

      setOrderedChildren(indices.map((index) => children[index]));
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      className={className ? className : "flex flex-wrap"}
    >
      {orderedChildren}
    </div>
  );
};
export default HorizontalMasonry;