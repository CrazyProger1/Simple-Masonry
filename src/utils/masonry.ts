const findNextFittingWidth = (
  widths: number[],
  ignoreIndices: Set<number>,
  maxWidth: number,
): { index: number; width: number } | undefined => {
  for (let i = 0; i < widths.length; i++)
    if (!ignoreIndices.has(i) && widths[i] < maxWidth)
      return { index: i, width: widths[i] };
};

export const calculateHorizontalMasonry = (
  widths: number[],
  maxWidth: number,
  gap: number = 0,
): number[] => {
  const length = widths.length;
  const sortedWidths = widths.toSorted((w1, w2) => w2 - w1);

  const resultWidths: number[] = [];
  const ignoreIndices = new Set<number>();
  let row = [];
  let rowWidth = 0;

  while (ignoreIndices.size != length) {
    const next = findNextFittingWidth(
      sortedWidths,
      ignoreIndices,
      maxWidth - rowWidth,
    );

    if (!next) {
      resultWidths.push(...row);
      row = [];
      rowWidth = 0;
    } else {
      const { index, width } = next;
      row.push(width);
      ignoreIndices.add(index);
      rowWidth += width + gap;
    }
  }
  resultWidths.push(...row);

  return resultWidths.map((width) => widths.indexOf(width));
};
