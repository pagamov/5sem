function draw_based_points(point) {
    var curve_x = point.x - (mouseX - point.x);
    var curve_y = point.y - (mouseY - point.y);

    point.curve_point_front = {x: mouseX, y: mouseY};
    point.curve_point_back = {x: curve_x, y: curve_y};

    strokeWeight(1);
    stroke(0, 0, 250);
    line(point.x, point.y, mouseX, mouseY);
    line(point.x, point.y, curve_x, curve_y);

    strokeWeight(1);
    stroke(10);
    fill(0, 0, 250);
    ellipse(mouseX, mouseY, 6);
    ellipse(curve_x, curve_y, 6);

    strokeWeight(2);
    stroke(0, 0, 250);
    noFill();
    rect(mouseX - 6, mouseY - 6, 12, 12);
    rect(curve_x - 6, curve_y - 6, 12, 12);
}

function draw_control_points() {
    strokeWeight(1);
    stroke(10);
    if (control_points.length == 1) {
        return;
    }
    for (var i = 0; i < control_points.length; i++) {
        noFill();
        ellipse(control_points[i].x, control_points[i].y, 12);
        fill(0, 0, 250);
        ellipse(control_points[i].x, control_points[i].y, 4);

        if (control_points[i].curve_point_back && control_points[i].curve_point_front) {
            stroke(0, 0, 250);
            line(
                control_points[i].curve_point_back.x,
                control_points[i].curve_point_back.y,
                control_points[i].x,
                control_points[i].y
            );
            line(
                control_points[i].curve_point_front.x,
                control_points[i].curve_point_front.y,
                control_points[i].x,
                control_points[i].y
            );

            stroke(10);
            fill(0, 0, 250);
            ellipse(control_points[i].curve_point_front.x, control_points[i].curve_point_front.y, 6);
            ellipse(control_points[i].curve_point_back.x, control_points[i].curve_point_back.y, 6);
        }
    }
}

function draw_cardinal_spline() {
    strokeWeight(4);
    stroke(0, 230, 10);
    for (var i = 0; i < res_dots.length - 1; i++) {
        line(res_dots[i].x, res_dots[i].y, res_dots[i].z, res_dots[i + 1].x, res_dots[i + 1].y, res_dots[i + 1].z);
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

function draw_kinematic_plane(percent) {
    for (var i = 0; i < res_dots.length - 1; i++) {
        // res_dots.length -

        // stroke(0,69,200);
        // strokeWeight(2);
        // line(0,0,0,res_dots[i+1].x - res_dots[i].x,res_dots[i+1].y - res_dots[i].y,res_dots[i+1].z - res_dots[i].z);

        push();
        stroke(255,69,5);
        strokeWeight(2);

        var piv = createVector(res_dots[i+1].x - res_dots[i].x,res_dots[i+1].y - res_dots[i].y,res_dots[i+1].z - res_dots[i].z);
        // var dx = piv.angleBetween(createVector(1,0,0));
        // var dy = piv.angleBetween(createVector(0,1,0));
        // var dz = piv.angleBetween(createVector(0,0,1));



        // translate(p5.Vector.div(p5.Vector.add(res_dots[i], res_dots[i+1]), 2));

        // rotateX(dx);
        // rotateY(dy);
        // rotateZ(dz);

        var a = res_dots[i];
        var b = res_dots[i+1];
        var step = 30;
        for (var fi = 0; fi <= 360; fi += step) {
            var x_1 = cos(fi / 360 * 2 * PI) * document.getElementById('a').value;
            var z_1 = sin(fi / 360 * 2 * PI) * document.getElementById('b').value;
            var x_2 = cos((fi + step) / 360 * 2 * PI) * document.getElementById('a').value;
            var z_2 = sin((fi + step) / 360 * 2 * PI) * document.getElementById('b').value;
            beginShape();
            vertex(x_1 + a.x, a.y, z_1 + a.z);
            vertex(x_2 + a.x, a.y, z_2 + a.z);
            vertex(x_2 + a.x + piv.x, a.y + piv.y, z_2 + a.z + piv.z);
            vertex(x_1 + a.x + piv.x, a.y + piv.y, z_1 + a.z + piv.z);
            endShape(CLOSE);
        }
        beginShape();
        for (var fi = 0; fi <= 360; fi += step) {
            var x_1 = cos(fi / 360 * 2 * PI) * document.getElementById('a').value;
            var z_1 = sin(fi / 360 * 2 * PI) * document.getElementById('b').value;
            vertex(x_1 + a.x, a.y, z_1 + a.z);
        }
        endShape(CLOSE);

        beginShape();
        for (var fi = 0; fi <= 360; fi += step) {
            var x_1 = cos(fi / 360 * 2 * PI) * document.getElementById('a').value;
            var z_1 = sin(fi / 360 * 2 * PI) * document.getElementById('b').value;
            vertex(x_1 + a.x + piv.x, a.y + piv.y, z_1 + a.z + piv.z);
        }
        endShape(CLOSE);
        pop();
    }
}
