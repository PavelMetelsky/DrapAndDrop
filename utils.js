function isPointAtLine(point, startLine, endLine) {
    return startLine <= point && point < endLine;
}

function yBetweenShapePointsY(pointI, pointJ, y) {
    return isPointAtLine(y, pointI.y, pointJ.y) || isPointAtLine(y, pointJ.y, pointI.y);
}

function beamCrossedShape(pointI, pointJ, x, y) {
    return x > (pointJ.x - pointI.x) * (y - pointI.y) / (pointJ.y - pointI.y) + pointI.x;
}

function vectorMulti(ax, ay, bx, by) {
    return ax * by - bx * ay;
}

function realLess(a, b) {
    return b - a > 0.01;
}

function isLineCrossed(lineA, lineB) {
    let v1 = vectorMulti(
        lineB.end.x - lineB.start.x, lineB.end.y - lineB.start.y, lineA.start.x - lineB.start.x, lineA.start.y - lineB.start.y);
    let v2 = vectorMulti(
        lineB.end.x - lineB.start.x, lineB.end.y - lineB.start.y, lineA.end.x - lineB.start.x, lineA.end.y - lineB.start.y);
    let v3 = vectorMulti(
        lineA.end.x - lineA.start.x, lineA.end.y - lineA.start.y, lineB.start.x - lineA.start.x, lineB.start.y - lineA.start.y);
    let v4 = vectorMulti(
        lineA.end.x - lineA.start.x, lineA.end.y - lineA.start.y, lineB.end.x - lineA.start.x, lineB.end.y - lineA.start.y);

    return realLess(v1 * v2, 0) && realLess(v3 * v4, 0)
}

function inPolygon(x, y, points) {
    pointsTotal = points.length;
    j = pointsTotal - 1;
    let belongPolygon = false;
    for (i = 0; i < pointsTotal; i++) {
        if (yBetweenShapePointsY(points[j], points[i], y) && beamCrossedShape(points[j], points[i], x, y)) {
            belongPolygon = !belongPolygon
        }
        j = i;
    }
    return belongPolygon;
}

function minPointsX(shape) {
    let points = shape.currentPoints;
    let minX = points[0].x;
    points.forEach(function (point) {
        minX = minX < point.x ? minX : point.x;
    })
    return minX;
}

function minPointsY(shape) {
    let points = shape.currentPoints;
    let minY = points[0].y;
    points.forEach(function (point) {
        minY = minY < point.y ? minY : point.y;
    })

    return minY;
}

function maxPointsY(shape) {
    let points = shape.currentPoints;
    let maxY = points[0].y;
    points.forEach(function (point) {
        maxY = maxY > point.y ? maxY : point.y;
    })

    return maxY;
}