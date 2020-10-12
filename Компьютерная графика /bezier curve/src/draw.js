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

function draw_bezier_curve() {
    const N = 100; // step
    var res_dots = [];
    for (var i = 0; i < control_points.length - 1; i++) {
        var a = control_points[i];
        var b = control_points[i + 1];

        if (a.curve_point_front == null && b.curve_point_back == null) {
            // no dots
            res_dots.push({x: a.x, y: a.y})
            res_dots.push({x: b.x, y: b.y})

        } else if (a.curve_point_front == null && b.curve_point_back != null) {
            // only 3 dots
            var b_b = b.curve_point_back;

            for (var j = 0; j <= N; j++) {
                var a_v = createVector(a.x, a.y);
                var b_v = createVector(b_b.x, b_b.y);
                var v1 = createVector(b_b.x - a.x, b_b.y - a.y);
                var v2 = createVector(b.x - b_b.x, b.y - b_b.y);

                v1.mult(j / N);
                a_v.add(v1);

                v2.mult(j / N);
                b_v.add(v2);

                var r_v = createVector(a_v.x, a_v.y);
                var v3 = createVector(b_v.x - a_v.x, b_v.y - a_v.y);

                v3.mult(j / N);
                r_v.add(v3);

                res_dots.push({x: r_v.x, y: r_v.y});
            }
        } else if (a.curve_point_front != null && b.curve_point_back == null) {
            // only 3 dots
            var b_b = a.curve_point_front;

            for (var j = 0; j <= N; j++) {
                var a_v = createVector(a.x, a.y);
                var b_v = createVector(b_b.x, b_b.y);
                var v1 = createVector(b_b.x - a.x, b_b.y - a.y);
                var v2 = createVector(b.x - b_b.x, b.y - b_b.y);

                v1.mult(j / N);
                a_v.add(v1);

                v2.mult(j / N);
                b_v.add(v2);

                var r_v = createVector(a_v.x, a_v.y);
                var v3 = createVector(b_v.x - a_v.x, b_v.y - a_v.y);

                v3.mult(j / N);
                r_v.add(v3);

                res_dots.push({x: r_v.x, y: r_v.y});
            }
        } else {
            // we have 4 dots
            var a_f = a.curve_point_front;
            var b_b = b.curve_point_back;

            for (var j = 0; j <= N; j++) {
                var a_v = createVector(a.x, a.y);
                var a_f_v = createVector(a_f.x, a_f.y);
                var b_b_v = createVector(b_b.x, b_b.y);

                var v1 = createVector(a_f_v.x - a_v.x, a_f_v.y - a_v.y);
                var v2 = createVector(b_b_v.x - a_f_v.x, b_b_v.y - a_f_v.y);
                var v3 = createVector(b.x - b_b_v.x, b.y - b_b_v.y);

                v1.mult(j / N);
                a_v.add(v1);

                v2.mult(j / N);
                a_f_v.add(v2);

                v3.mult(j / N);
                b_b_v.add(v3);


                var v4 = createVector(a_f_v.x - a_v.x, a_f_v.y - a_v.y);
                var v5 = createVector(b_b_v.x - a_f_v.x, b_b_v.y - a_f_v.y);

                v4.mult(j / N);
                a_v.add(v4);

                v5.mult(j / N);
                a_f_v.add(v5);

                var v6 = createVector(a_f_v.x - a_v.x, a_f_v.y - a_v.y);

                v6.mult(j / N);
                a_v.add(v6);

                res_dots.push({x: a_v.x, y: a_v.y});
            }
        }
    }
    strokeWeight(4);
    stroke(0, 230, 10);
    for (var i = 0; i < res_dots.length - 1; i++) {
        line(res_dots[i].x, res_dots[i].y, res_dots[i + 1].x, res_dots[i + 1].y)
    }
}

function draw_text() {
    textSize(25);
    stroke(10);
    fill(10);
    text(active_mode, 10, 25);
}
