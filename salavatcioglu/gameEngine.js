class GameEngine {
    meshes = [];
    near = .1;
    far = 1000;
    fov = 90;

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d"); 
        this.screenHeight = this.canvas.height;
        this.screenWidth = this.canvas.width;
    }

    setFov(near, far, fov) {
        this.near = near;
        this.far = far;
        this.fov = fov;
    }

    createProjectionMatrix() {
        let aspectRatio = this.screenHeight / this.screenWidth;
        let fovRad = 1.0 / Math.tan(this.fov * 0.5 / 180.0 * 3.14159);


        let projectionMat = new Matrix4x4();
        projectionMat.m[0][0] = aspectRatio * fovRad;
        projectionMat.m[1][1] = fovRad;
        projectionMat.m[2][2] = this.far / (this.far - this.near);
        projectionMat.m[3][2] = ((-1*this.far) * this.near) / (this.far - this.near);
        projectionMat.m[2][3] = 1.0;
        projectionMat.m[3][3] = 0;

        return projectionMat;
    }

    //i = Vertex3d, m = Matrix4x4
    multiplyMatrixVector(i, m) {
        let o = new Vertex3d();
        o.x = i.x * m.m[0][0] + i.y * m.m[1][0] + i.z * m.m[2][0] + m.m[3][0];
        o.y = i.x * m.m[0][1] + i.y * m.m[1][1] + i.z * m.m[2][1] + m.m[3][1];
        o.z = i.x * m.m[0][2] + i.y * m.m[1][2] + i.z * m.m[2][2] + m.m[3][2];

        let w = i.x * m.m[0][3] + i.y * m.m[1][3] + i.z * m.m[2][3] + m.m[3][3];

        if(w != 0.0) {
            o.x = o.x / w;
            o.y = o.y / w;
            o.z = o.z / w;
        }

        return o;
    }

    drawTriangle(tri, color) {
        this.drawLine(tri.verticies[0].x, tri.verticies[0].y, tri.verticies[1].x, tri.verticies[1].y, color);
        this.drawLine(tri.verticies[1].x, tri.verticies[1].y, tri.verticies[2].x, tri.verticies[2].y, color);
        this.drawLine(tri.verticies[2].x, tri.verticies[2].y, tri.verticies[0].x, tri.verticies[0].y, color);
    }

    red = 255;
    redSpeed = .3;
    green = 0;
    greenSpeed = .2;
    blue = 0;
    blueSpeed = .1;

    updateColors(elapsedTime) {
        this.red += (this.redSpeed * elapsedTime / 3000);
        this.green += (this.greenSpeed * elapsedTime / 3000);
        this.blue += (this.blueSpeed * elapsedTime / 3000);

        if(this.red > 255) {
            this.red = 255;
            this.redSpeed *= -1
        }
        if(this.green > 255) {
            this.green = 255;
            this.greenSpeed *= -1
        }
        if(this.blue > 255) {
            this.blue = 255;
            this.blueSpeed *= -1
        }
        
        if(this.red < 0) {
            this.red = 0;
            this.redSpeed *= -1
        }
        if(this.green < 0) {
            this.green = 0;
            this.greenSpeed *= -1
        }
        if(this.blue < 0) {
            this.blue = 0;
            this.blueSpeed *= -1
        }
    }

    drawLine(x1, y1, x2, y2, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = color;//"#ffffff";
        this.ctx.stroke();
    }

    start() {
        this.drawLoop();
    }
    
    lastRenderTime = Date.now();
    
    addMesh(mesh) {
        this.meshes.push(mesh);
    }

    sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    drawLoop() {
        requestAnimationFrame(this.drawLoop.bind(this));
        
        var now = Date.now();
        var elapsedTime = now-this.lastRenderTime;

        //clear the screen 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let renderTris = [];
        let projMatrix = this.createProjectionMatrix();

        for(let mesh of this.meshes) {
            
            for(let tri of mesh.tris) {

                //rotate
                let theta = .001 * elapsedTime;

                let matrixRotateZ = new Matrix4x4();
                matrixRotateZ.m[0][0] = Math.cos(theta);
                matrixRotateZ.m[0][1] = Math.sin(theta);
                matrixRotateZ.m[1][0] = Math.sin(theta) * -1;
                matrixRotateZ.m[1][1] = Math.cos(theta);
                matrixRotateZ.m[2][2] = 1;
                matrixRotateZ.m[3][3] = 1;

                let matrixRotateX = new Matrix4x4();
                matrixRotateX.m[0][0] = 1;
                matrixRotateX.m[1][1] = Math.cos(theta * .45);
                matrixRotateX.m[1][2] = Math.sin(theta * .45);
                matrixRotateX.m[2][1] = Math.sin(theta * .45) * -1;
                matrixRotateX.m[2][2] = Math.cos(theta * .45);
                matrixRotateX.m[3][3] = 1;

                let rotatedTri = new Triangle(); 
                rotatedTri.verticies[0] = this.multiplyMatrixVector(tri.verticies[0], matrixRotateZ);
                rotatedTri.verticies[1] = this.multiplyMatrixVector(tri.verticies[1], matrixRotateZ);
                rotatedTri.verticies[2] = this.multiplyMatrixVector(tri.verticies[2], matrixRotateZ);

                rotatedTri.verticies[0] = this.multiplyMatrixVector(rotatedTri.verticies[0], matrixRotateX);
                rotatedTri.verticies[1] = this.multiplyMatrixVector(rotatedTri.verticies[1], matrixRotateX);
                rotatedTri.verticies[2] = this.multiplyMatrixVector(rotatedTri.verticies[2], matrixRotateX);

                //translate
                let translatedTri = new Triangle();
                translatedTri.copy(rotatedTri);

                translatedTri.verticies[0].z += 3;
                translatedTri.verticies[1].z += 3;
                translatedTri.verticies[2].z += 3;

                //Perspective projection 
                let projTri = new Triangle(); 
                projTri.verticies[0] = this.multiplyMatrixVector(translatedTri.verticies[0], projMatrix);
                projTri.verticies[1] = this.multiplyMatrixVector(translatedTri.verticies[1], projMatrix);
                projTri.verticies[2] = this.multiplyMatrixVector(translatedTri.verticies[2], projMatrix);

                //scale to screen coordinates
                projTri.verticies[0].x += 1; projTri.verticies[0].y += 1;
                projTri.verticies[1].x += 1; projTri.verticies[1].y += 1;
                projTri.verticies[2].x += 1; projTri.verticies[2].y += 1;

                projTri.verticies[0].x *= .5 * this.screenWidth; projTri.verticies[0].y *= .5 * this.screenHeight;
                projTri.verticies[1].x *= .5 * this.screenWidth; projTri.verticies[1].y *= .5 * this.screenHeight;
                projTri.verticies[2].x *= .5 * this.screenWidth; projTri.verticies[2].y *= .5 * this.screenHeight;
                
                renderTris.push(projTri);
            }
        }

        for(let tri of renderTris) {
            this.drawTriangle(tri, "rgb(" + this.red + "," + this.green + "," + this.blue + ")");
        }
        
        this.updateColors(elapsedTime);
    }

}

if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
            window.setTimeout( callback, 1000 / 60 );
        };
    })();
}

class Vertex3d {
    x;
    y;
    z;

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Triangle {
    verticies = [];
    
    constructor(vertex1, vertex2, vertex3) {
        this.verticies[0] = vertex1;
        this.verticies[1] = vertex2;
        this.verticies[2] = vertex3;
    }

    copy(tri) {
        let vert1 = new Vertex3d();
        let vert2 = new Vertex3d();
        let vert3 = new Vertex3d();

        vert1.x = tri.verticies[0].x;
        vert2.x = tri.verticies[1].x;
        vert3.x = tri.verticies[2].x;
        
        vert1.y = tri.verticies[0].y;
        vert2.y = tri.verticies[1].y;
        vert3.y = tri.verticies[2].y;
        
        vert1.z = tri.verticies[0].z;
        vert2.z = tri.verticies[1].z;
        vert3.z = tri.verticies[2].z;

        this.verticies[0] = vert1;
        this.verticies[1] = vert2;
        this.verticies[2] = vert3;
    }
}

class Mesh {
    tris = [];

    constructor(tris) {
        this.tris = tris;
    }

    loadFromObj(objdata, invertY) {
        let lines = objdata.split("\n");
        
        let verticies = [];

        let tris = [];

        for(let line of lines) {
            let lineSplit = line.split(" ");

            if(lineSplit[0] == "v") {
                let vertex = new Vertex3d();
                vertex.x = lineSplit[1];
                vertex.y = lineSplit[2];
                vertex.z = lineSplit[3];
                if(invertY) { vertex.y = vertex.y * -1; }
                verticies.push(vertex);
            }

            if(lineSplit[0] == "f") {
                let tri = new Triangle();
                tri.verticies[0] = verticies[lineSplit[1]-1];
                tri.verticies[1] = verticies[lineSplit[2]-1];
                tri.verticies[2] = verticies[lineSplit[3]-1];
                tris.push(tri);
            }
        }

        this.tris = tris;
    }
}

class Matrix4x4 {
    m = [];

    constructor() {
        for(let i=0; i<4; i++) {
            let col = [];
            for(let j=0; j<4; j++) {
                col[j] = 0;
            }
            this.m[i] = col;
        }
    }
}

export  { GameEngine, Vertex3d, Triangle, Mesh, Matrix4x4 };