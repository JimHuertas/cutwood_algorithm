function cutWood2(rectangles, stockSize, grainDirection, cutSize) {
    const bins = [{ x: 0, y: 0, width: stockSize.width, height: stockSize.height}];
    const nodePool = [{ index: 0, x: 0, y: 0, width: stockSize.width, height: stockSize.height }];

    // console.log('Primer Bin: ', bins);
    // console.log('Primer nodePool: ', nodePool);


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
        // const remainingHeightCutted = remainingHeight +
        bin.used = true;
        bin.rectangle = { x, y, width: rectWidth, height: rectHeight };
        bins.push({ x: x + rectWidth, y, width: remainingWidth, height: rectHeight});
        bins.push({ x, y: y + rectHeight, width, height: remainingHeight});
        
        const rightIndex = bins.length - 2;
        const bottomIndex = bins.length - 1;

        const rightNode = { index: rightIndex, x: x + rectWidth+ cutSize, y: y==0 ? 0 : cutSize, width: remainingWidth, height: rectHeight };
        const bottomNode = { index: bottomIndex, x, y: y + rectHeight + cutSize, width, height: remainingHeight };
        
        nodePool.push(rightNode);
        nodePool.push(bottomNode);

        insertedRectangles++;
        }
    }

    return bins.filter(bin => bin.used).map(bin => bin.rectangle);
}

module.exports = { cutWood2 };