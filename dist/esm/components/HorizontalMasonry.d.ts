import React from "react";
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
interface Props {
    children: React.ReactNode[];
    extendClassName?: string;
    gap?: Gap;
    dynamic?: boolean;
}
declare const HorizontalMasonry: ({ children, extendClassName, gap, dynamic, }: Props) => React.JSX.Element;
export default HorizontalMasonry;
//# sourceMappingURL=HorizontalMasonry.d.ts.map