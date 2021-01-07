var control_points = [];
var res_dots = [];

function setup_curve() {
    //set point for curve

    // //heart
    // control_points = [
    //     {x:0,y:400,z:-300},
    //     {x:-400,y:0,z:-200},
    //     {x:-200,y:-400,z:-100},
    //     {x:0,y:-200,z:0},
    //     {x:200,y:-400,z:100},
    //     {x:400,y:0,z:200},
    //     {x:0,y:400,z:300}
    // ];

    //tube
    // control_points = [
    //     {x:-200,y:400,z:-300},
    //     {x:-200,y:-200,z:-200},
    //     {x:0,y:-400,z:-100},
    //     {x:200,y:-200,z:0},
    //     {x:400,y:0,z:100},
    //     {x:600,y:0,z:200}
    // ];

    // demo
    control_points = [
        {x:-400,y:400,z:0},
        {x:-200,y:-400,z:0},
        {x:200,y:100,z:0},
        {x:400,y:-200,z:0}
    ];
}

function update_curve() {
    //update pivet front and rear point for curve
    if (control_points.length == 1) {
        return;
    }
    res_dots = [];
    var t = 0.3;
    var b = -0.3;
    var c = 0.7;
    for (var i = 0; i < control_points.length; i++) {
        var curr = control_points[i];
        // curr = current node
        // next = next node
        // prev = prev node
        if (i == 0) {
            var next = control_points[i + 1];
            var p = createVector(curr.x, curr.y, curr.z);
            var pn = createVector(next.x, next.y, next.z);
            pn.sub(p);
            control_points[i].d = p5.Vector.mult(pn, (1-t)*(1-b)*(1+c)/2);
        } else if (i == control_points.length - 1) {
            var prev = control_points[i - 1];
            var p = createVector(curr.x, curr.y, curr.z);
            var pp = createVector(prev.x, prev.y, prev.z);
            p.sub(pp);
            control_points[i].d = p5.Vector.mult(pn, (1-t)*(1+b)*(1+c)/2);
        } else {
            var next = control_points[i + 1];
            var prev = control_points[i - 1];
            var p = createVector(curr.x, curr.y, curr.z);
            var pn = createVector(next.x, next.y, next.z);
            var pp = createVector(prev.x, prev.y, prev.z);
            pn.sub(p);
            p.sub(pp);
            pn.mult((1-t)*(1-b)*(1+c)/2);
            p.mult((1-t)*(1+b)*(1+c)/2);
            control_points[i].d = p5.Vector.add(p,pn);
            // control_points[i].d = p5.Vector.mult(p5.Vector.sub(p, pp), (1-t)*(1+b)*(1+c)/2) + p5.Vector.mult(p5.Vector.sub(pn, p), (1-t)*(1-b)*(1+c)/2);
        }
    }

    for (var i = 0; i < control_points.length - 1; i++) {
        var a = control_points[i];
        var b = control_points[i + 1];
        for (var t = 0; t <= 1; t += 0.05) {
            var p = createVector(a.x,a.y,a.z);
            var pn = createVector(b.x,b.y,b.z);
            var m = createVector(a.d.x,a.d.y,a.d.z);
            var mn = createVector(b.d.x,b.d.y,b.d.z);

            p.mult(2*pow(t,3) - 3*pow(t,2) + 1);
            m.mult(pow(t,3) - 2 * pow(t,2) + t);
            pn.mult(-2 * pow(t,3) + 3 * pow(t,2));
            mn.mult(pow(t,3) - pow(t,2));

            res_dots.push(p5.Vector.add(p5.Vector.add(p,m),p5.Vector.add(pn,mn)));
        }
    }
}


function setup() {
	createCanvas(800, 800, WEBGL);
	background(200);
    setup_curve();
    update_curve();
    ambientLight(100);
    ambientMaterial(255,69,0);
}

function draw() {
	background(200);
    orbitControl();
    draw_cardinal_spline();
    draw_kinematic_plane(100);
}
