let control_points = [];
let make_new_point = false;
let active_point = null;
let cameraMode = null;
let active_mode = null;

function keyTyped() {
    if (key === 'd') {
        active_mode = 'draw';
    } else if (key === 'r') {
        active_mode = 'remove';
    } else if (key === 'm') {
        active_mode = 'move';
    }

    if (key === 'x') {
        cameraMode = 'x';
    } else if (key === 'y') {
        cameraMode = 'y';
    } else if (key === 'z') {
        cameraMode = 'z';
    } else if (key === 'n') {
        cameraMode = null;
        active_mode = null;
    }
}

function mousePressed() {
    for (var i = 0; i < control_points.length; i++) {
        let distance = p5.Vector.dist(
            createVector(mouseX, mouseY), createVector(control_points[i].x, control_points[i].y)
        );
        if (distance < 12) {
            if (active_mode == 'draw') {
                make_new_point = true;
                active_point = control_points[i];
                return 0;
            } else if (active_mode == 'remove') {
                control_points.splice(i, 1);
                return 0;
            } else if (active_mode == 'move') {
                active_point = control_points[i];
                return 0;
            }
        }
    }
    if (active_mode == 'draw') {
        control_points.push({x: mouseX, y: mouseY, curve_point_back: null, curve_point_front: null});
    }
}

function mouseReleased() {
    if (make_new_point) {
        make_new_point = false;
        active_point = null;
    }
    if (active_mode == 'move') {
        let v = createVector(mouseX - active_point.x, mouseY - active_point.y);
        active_point.x = mouseX;
        active_point.y = mouseY;
        if (active_point.curve_point_back && active_point.curve_point_front) {
            active_point.curve_point_back.x += v.x;
            active_point.curve_point_back.y += v.y;
            active_point.curve_point_front.x += v.x;
            active_point.curve_point_front.y += v.y;
        }
        active_point = null;
    }
}

function drawOval(x, y, z) {
    stroke(210,120,10);
    for (var i = 0; i < 360; i++) {
        var x_1 = x + cos(i / 360 * 2 * PI) * document.getElementById('a').value;
        var y_1 = y + sin(i / 360 * 2 * PI) * document.getElementById('b').value;

        var x_2 = x + cos((i + 1) / 360 * 2 * PI) * document.getElementById('a').value;
        var y_2 = y + sin((i + 1) / 360 * 2 * PI) * document.getElementById('b').value;

        line(x_1, y_1, z, x_2, y_2, z);
    }
}

function drawCoords() {
    var x = -width / 2;
    var y = -height / 2;
    stroke(200,0,0);
    line(-x,0,0,100,0,0);

    stroke(0,200,0);
    line(-x,0,0,0,100,0);

    stroke(0,0,200);
    line(-x,0,0,0,0,100);
}


function setup() {
	createCanvas(600, 600, WEBGL);
	background(204);
}

function draw() {
	background(204);
    if (cameraMode == 'x') {
        camera(400, 0, 0, 0, 0, 0, 0, 1, 0);
    } else if (cameraMode == 'y') {
        camera(0, 100, 0, 0, 0, 0, 0, 1, 0);
    } else if (cameraMode == 'z') {
        camera(0, 0, 100, 0, 0, 0, 0, 1, 0);
    } else {
        orbitControl();
    }
    // if (active_mode == null) {
    //     orbitControl();
    // }

    draw_control_points();
    //
    // drawOval(0,0,0);

    // draw_text();
    if (mouseIsPressed && make_new_point) {
        draw_based_points(active_point);
    }
    draw_bezier_curve();
    drawCoords();
}
