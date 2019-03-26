class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(startPoint, endPoint) {
        this.start = startPoint;
        this.end = endPoint;
    }
}

class Shape {
    constructor(point) {
        this.id = id++;
        this.x = point.x;
        this.y = point.y;
        this.deltaX = null;
        this.deltaY = null;
        this.crossed = false;
    }

    get currentPoints() { }

    get lines() {
        let lines = [];
        let points = this.currentPoints;
        for (let i = 0; i < points.length; i++) {
            lines.push(new Line(points[i], points[(i + 1) % points.length]))
        }
        return lines;
    }

    contains() { }

    draw() {
        if (this.crossed) {
            context.fill();
        }
    }
}

class Rectangle extends Shape {
    constructor(point, width, height) {
        super(point);
        this.width = width;
        this.height = height;
    }

    get currentPoints() {
        return [
            new Point(this.x, this.y),
            new Point(this.x + this.width, this.y),
            new Point(this.x + this.width, this.y + this.height),
            new Point(this.x, this.y + this.height)
        ];
    }

    contains(x, y) {
        return isPointAtLine(x, this.x, this.x + this.width)
            && isPointAtLine(y, this.y, this.y + this.height)
    }

    draw() {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.closePath();
        context.stroke();
        super.draw();
    }
}

function getDrawPoints(x, y, points) {
    let drawPoints = points.map(function (point) {
        return new Point(point.x - x, point.y - y);
    });
    return drawPoints;
}

class Polygon extends Shape {
    constructor(points) {
        super(points[0]);
        this.points = points;
        this.drawPoints = getDrawPoints(this.x, this.y, points);
    }

    get currentPoints() {
        let x = this.x;
        let y = this.y;
        let points = this.drawPoints.map(function (drawPoint) {
            return new Point(drawPoint.x + x, drawPoint.y + y);
        });
        return points;
    }

    contains(x, y) {
        return inPolygon(x, y, this.currentPoints)
    }

    draw() {
        let points = this.currentPoints;
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        points.forEach(function (point) {
            context.lineTo(point.x, point.y)
        })
        context.lineTo(points[0].x, points[0].y);
        context.closePath();
        context.stroke();
        super.draw();
    }
}