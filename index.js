// require("index.js");


function cutStock(rectangles, stockSize) {
    // Sort rectangles by area in decreasing order
    rectangles.sort((a, b) => b.width * b.height - a.width * a.height);
  
    // Initialize an empty bin to hold cut pieces
    const bins = [{ x: 0, y: 0, width: stockSize.width, height: stockSize.height }];
  
    // Iterate over each rectangle and cut it into pieces
    for (const rectangle of rectangles) {
      // Find the best bin to place the rectangle
      let bestBin = null;
      let bestScore = Infinity;
      for (const bin of bins) {
        // Check if the rectangle fits in the bin
        if (rectangle.width <= bin.width && rectangle.height <= bin.height) {
          // Calculate the score of placing the rectangle in the bin
          const score1 = bin.width - rectangle.width;
          const score2 = bin.height - rectangle.height;
          const score = Math.min(score1, score2);
  
          // Update the best bin if the score is lower than the current best
          if (score < bestScore) {
            bestBin = bin;
            bestScore = score;
          }
        }
      }
  
      // If no bin is found, create a new one
      if (!bestBin) {
        bins.push({ x: 0, y: 0, width: stockSize.width, height: stockSize.height });
        bestBin = bins[bins.length - 1];
      }
  
      // Cut the rectangle into pieces and update the bin
      const piece1 = { x: bestBin.x, y: bestBin.y, width: rectangle.width, height: rectangle.height };
      const piece2 = { x: bestBin.x + rectangle.width, y: bestBin.y, width: bestBin.width - rectangle.width, height: rectangle.height };
      const piece3 = { x: bestBin.x, y: bestBin.y + rectangle.height, width: rectangle.width, height: bestBin.height - rectangle.height };
      const piece4 = { x: bestBin.x + rectangle.width, y: bestBin.y + rectangle.height, width: bestBin.width - rectangle.width, height: bestBin.height - rectangle.height };
      bins.splice(bins.indexOf(bestBin), piece1, piece2, piece3, piece4);
      bestBin.width = rectangle.width;
      bestBin.height -= rectangle.height;
    }
  
    return bins;
  }
  
  function cutWood2(rectangles, stockSize, grainDirection) {
      // Sort rectangles in decreasing order of area
      const sortedRectangles = rectangles.sort((a, b) => (b.width * b.height) - (a.width * a.height));
      
      // Initialize bins array with first bin
      const bins = [{ x: 0, y: 0, width: sortedRectangles[0].width, height: sortedRectangles[0].height }];
    
      // Iterate over remaining rectangles
      for (let i = 1; i < sortedRectangles.length; i++) {
        const rectangle = sortedRectangles[i];
        let added = false;
    
        // Try to fit rectangle into existing bins
        for (const bin of bins) {
          if (bin.width >= rectangle.width && bin.height >= rectangle.height) {
            // Rectangle fits into bin
            const remainingWidth = bin.width - rectangle.width;
            const remainingHeight = bin.height - rectangle.height;
    
            // Split bin into two new bins along one axis
            if (grainDirection === 'horizontal' && remainingHeight > 0 && remainingWidth <= 0) {
              bins.push({
                x: bin.x,
                y: bin.y + rectangle.height,
                width: bin.width,
                height: remainingHeight,
              });
            } else if (grainDirection === 'vertical' && remainingWidth > 0 && remainingHeight <= 0) {
              bins.push({
                x: bin.x + rectangle.width,
                y: bin.y,
                width: remainingWidth,
                height: bin.height,
              });
            }
            // Choose the axis with the least leftover space to minimize waste
            else if (remainingWidth <= remainingHeight) {
              bins.push({
                x: bin.x + rectangle.width,
                y: bin.y,
                width: remainingWidth,
                height: bin.height,
              });
              bins.push({
                x: bin.x,
                y: bin.y + rectangle.height,
                width: bin.width,
                height: remainingHeight,
              });
            } else {
              bins.push({
                x: bin.x,
                y: bin.y + rectangle.height,
                width: bin.width,
                height: remainingHeight,
              });
              bins.push({
                x: bin.x + rectangle.width,
                y: bin.y,
                width: remainingWidth,
                height: bin.height,
              });
            }
    
            // Remove original bin from list and mark rectangle as added
            bins.splice(bins.indexOf(bin), 1);
            added = true;
            break;
          }
        }
    
        // If rectangle was not added, create new bin for it
        if (!added) {
          bins.push({ x: 0, y: 0, width: rectangle.width, height: rectangle.height });
        }
      }
  
      return bins;
  }
  
  function example() {
      const rectangles = [
          { width: 500, height: 100},
          { width: 200, height: 300},
          { width: 200, height: 300},
          { width: 200, height: 300},
          { width: 50, height: 100},
          { width: 20, height: 10},
      ];
        
      const stockSize = {width: 1000, height: 1000};
      const grainDirection = 'horizontal';
  
      result = cutWood2(rectangles, stockSize, grainDirection);
      console.log(result);
      
      for(const i in result){
  
      }
  
  
    //   document.getElementById("result").innerHTML = result[0].x;
  }

example();
  
//   document.getElementById("btn").onclick = function() {example()};