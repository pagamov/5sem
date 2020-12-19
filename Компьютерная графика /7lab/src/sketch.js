let control_points = [];
let make_new_point = false;
let active_point = null;
let active_mode = 'draw'

function keyTyped() {
    if (key === 'd') {
        active_mode = 'draw';
    } else if (key === 'r') {
        active_mode = 'remove';
    } else if (key === 'm') {
        active_mode = 'move';
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

function setup() {
	createCanvas(1000, 600);
	background(200);
}

// var bbb = [31, 90,16,97,80,28,61,66,60,15,88,41,79];

function draw() {
	background(200);
    draw_control_points();
    draw_text();
    if (mouseIsPressed && make_new_point) {
        draw_based_points(active_point);
    }
    draw_bezier_curve();
}
