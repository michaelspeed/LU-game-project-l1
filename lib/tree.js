function drawTree(x) {
  fill(175, 75, 0);
  rect(x + 30, 332, 20, 100);
  fill(0, 155, 0);
  ellipse(x + 20,338,60,40);
  ellipse(x + 60,338,60,40);
  ellipse(x + 20,370,60,40);
  ellipse(x + 60,370,60,40);
  ellipse(x,350,60,40);
  ellipse(x + 80,350,60,40);
  ellipse(x + 40,320,40,20);
}

function generateTrees(numberOfTrees) {
  const trees = []
  for (let i = 0; i < numberOfTrees; i++) {
    const x = random(-6000, 6000)
    trees.push(x)
  }
  return trees
}
