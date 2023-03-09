function cutWood(rectangles, stockSize, grainDirection) {
    const bins = [{ x: 0, y: 0, width: stockSize.width, height: stockSize.height }];
    const nodePool = [{ index: 0, x: 0, y: 0, width: stockSize.width, height: stockSize.height }];
    let insertedRectangles = 0;
  
    while (insertedRectangles < rectangles.length && nodePool.length > 0) {
      const { index, x, y, width, height } = nodePool.shift();
      const rectangle = rectangles[insertedRectangles];
      const rotated = (grainDirection === 'horizontal' && rectangle.width > rectangle.height) ||
                      (grainDirection === 'vertical' && rectangle.height > rectangle.width);
      const rectWidth = rotated ? rectangle.height : rectangle.width;
      const rectHeight = rotated ? rectangle.width : rectangle.height;
  
      if (width >= rectWidth && height >= rectHeight) {
        const bin = bins[index];
        const remainingWidth = width - rectWidth;
        const remainingHeight = height - rectHeight;
  
        bin.used = true;
        bin.rectangle = { x, y, width: rectWidth, height: rectHeight };
        bins.push({ x: x + rectWidth, y, width: remainingWidth, height: rectHeight });
        bins.push({ x, y: y + rectHeight, width, height: remainingHeight });
  
        const rightIndex = bins.length - 2;
        const bottomIndex = bins.length - 1;
        const rightNode = { index: rightIndex, x: x + rectWidth, y, width: remainingWidth, height: rectHeight };
        const bottomNode = { index: bottomIndex, x, y: y + rectHeight, width, height: remainingHeight };
  
        nodePool.push(rightNode);
        nodePool.push(bottomNode);
  
        insertedRectangles++;
      }
    }
  
    return bins.filter(bin => bin.used).map(bin => bin.rectangle);
}

const rectangles = [
    { width: 200, height: 300 },
    { width: 30, height: 50 },
    { width: 40, height: 60 },
    { width: 15, height: 25 },
    { width: 25, height: 35 },
    { width: 35, height: 55 },
];
const stockSize = {width: 400, height: 300};
const grainDirection = 'horizontal';

const bins = cutWood(rectangles, stockSize, grainDirection);
console.log(bins)

const svg = d3.select("svg");
svg.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height);

