function makePositionShapesFreely() {
    STATE.shapes[0].x = STATE.distanceBetweenShapes;
    STATE.shapes[0].y = STATE.distanceBetweenShapes;
    for (i = 1; i < STATE.shapes.length; i++) {
        STATE.shapes[i].x -= minPointsX(STATE.shapes[i]) - STATE.distanceBetweenShapes;
        STATE.shapes[i].y += maxPointsY(STATE.shapes[i - 1]) - minPointsY(STATE.shapes[i]) + STATE.distanceBetweenShapes;
    }
}

function init() {
    STATE.shapes.push(new Rectangle(new Point(70, 70), 30, 50));
    STATE.shapes.push(new Rectangle(new Point(10, 10), 40, 50));
    STATE.shapes.push(new Rectangle(new Point(10, 10), 20, 30));
    STATE.shapes.push(new Polygon([new Point(10, 10), new Point(40, 30), new Point(50, 20), new Point(70, 80)]));
    STATE.shapes.push(new Polygon([new Point(10, 10), new Point(10, 40), new Point(70, 70), new Point(80, 20)]));
    STATE.shapes.push(new Polygon([new Point(70, 30), new Point(80, 5), new Point(15, 10), new Point(20, 40)]));
    makePositionShapesFreely();
    requestDraw();
}

init();
canvas.onmousedown = down;
canvas.onmouseup = up;