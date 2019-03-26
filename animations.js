function clear() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
    clear();
    context.fillStyle = "#FF0000";
    (new Rectangle(new Point(0, 0), WIDTH, HEIGHT)).draw();

    STATE.shapes.forEach(function (shape) {
        shape.draw();
    });
}

function requestDraw() {
    requestAnimationFrame(draw);
}

const mousePosition = new Point(0, 0);

function isClicked(e, shape) {
    return shape.contains(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
}

function move(e) {
    mousePosition.update(e.pageX, e.pageY);
}

let requestRedrawId = null;

function redraw() {
    if (STATE.clickedShape) {
        STATE.clickedShape.x = mousePosition.x - canvas.offsetLeft - STATE.clickedShape.deltaX;
        STATE.clickedShape.y = mousePosition.y - canvas.offsetTop - STATE.clickedShape.deltaY;
        requestDraw();
        requestRedrawId = requestAnimationFrame(redraw);
    }
}

function down(e) {
    STATE.shapes.forEach(function (shape) {
        if (isClicked(e, shape)) {
            STATE.clickedShape = shape;
            return;
        }
    });

    if (STATE.clickedShape) {
        STATE.clickedShape.deltaX = (e.pageX - canvas.offsetLeft) - STATE.clickedShape.x;
        STATE.clickedShape.deltaY = (e.pageY - canvas.offsetTop) - STATE.clickedShape.y;

        requestDraw();
        canvas.onmousemove = move;
        mousePosition.update(e.pageX, e.pageY);
        redraw();
    }
}

function isCrossed(currentShapeId, linesCurrentShape) {
    return STATE.shapes.some(function (shape) {
        if (shape.id != currentShapeId) {
            let linesShape = shape.lines;
            return linesCurrentShape.some(function (lineCurrentShape) {
                return linesShape.some(function (line) {
                    return isLineCrossed(lineCurrentShape, line);
                });
            });
        }
    });
}

function checkForIntersection() {
    STATE.shapes.forEach(function (shape) {
        shape.crossed = isCrossed(shape.id, shape.lines);
    });
}

function up() {
    canvas.onmousemove = null;

    if (STATE.clickedShape) {
        STATE.clickedShape.points = STATE.clickedShape.currentPoints;
    }

    STATE.clickedShape = null;
    checkForIntersection();
    if (requestRedrawId) {
        cancelAnimationFrame(requestRedrawId);
    }
    requestDraw();
}