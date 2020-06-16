class GameEngine {
    meshes = [];
    near = .1;
    far = 1000;
    fov = 90;

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d"); 
        this.ctx.imageSmoothingEnabled = false;
        this.screenHeight = this.canvas.height;
        this.screenWidth = this.canvas.width;
        this.camera = new Vec3(0,0,0);
        this.lightDir = new Vec3(1,-1,-1);

        this.testMatrixMult();
    }

    testMatrixMult() {
        let m1 = new Matrix4x4();
        let m2 = new Matrix4x4();

        m1.m = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];

        m2.m = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];

        console.log(m1);
        console.log(m2);
        console.log(this.multiply4x4Matricies(m1, m2));
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

    //i = Vec3, m = Matrix4x4
    multiplyMatrixAndVector(i, m) {
        let o = new Vec3();
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

    multiplyMatrixAndVector4x4(m, v) {
        let o = new Vec4();
        o.x = v.x * m.m[0][0] + v.y * m.m[0][1] + v.z * m.m[0][2] + v.w * m.m[0][3];
        o.y = v.x * m.m[1][0] + v.y * m.m[1][1] + v.z * m.m[1][2] + v.w * m.m[1][3];
        o.z = v.x * m.m[2][0] + v.y * m.m[2][1] + v.z * m.m[2][2] + v.w * m.m[2][3];
        o.w = v.x * m.m[3][0] + v.y * m.m[3][1] + v.z * m.m[3][2] + v.w * m.m[3][3];
        //console.log(m);
        //console.log(v);
        //console.log(o);
        return o;
    }

    multiply4x4Matricies(m1, m2) {
        let row0 = new Vec4(m2.m[0][0], m2.m[1][0], m2.m[2][0], m2.m[3][0]);
        let row1 = new Vec4(m2.m[0][1], m2.m[1][1], m2.m[2][1], m2.m[3][1]);
        let row2 = new Vec4(m2.m[0][2], m2.m[1][2], m2.m[2][2], m2.m[3][2]);
        let row3 = new Vec4(m2.m[0][3], m2.m[1][3], m2.m[2][3], m2.m[3][3]);

        let result0 = this.multiplyMatrixAndVector4x4(m1, row0);
        let result1 = this.multiplyMatrixAndVector4x4(m1, row1);
        let result2 = this.multiplyMatrixAndVector4x4(m1, row2);
        let result3 = this.multiplyMatrixAndVector4x4(m1, row3);

        let returnVal = new Matrix4x4();
        returnVal.m = [
            [result0.x, result1.x, result2.x, result3.x],
            [result0.y, result1.y, result2.y, result3.y],
            [result0.z, result1.z, result2.z, result3.z],
            [result0.w, result1.w, result2.w, result3.w]
        ];
        return returnVal;
    }

    crossProduct(vec1, vec2) {
        let returnVec = new Vec3();
        returnVec.x = vec1.y * vec2.z - vec1.z * vec2.y;
        returnVec.y = vec1.z * vec2.x - vec1.x * vec2.z;
        returnVec.z = vec1.x * vec2.y - vec1.y * vec2.x;
        return returnVec;
    }

    dotProduct(vec1, vec2) {
        return vec1.x*vec2.x + vec1.y*vec2.y + vec1.z*vec2.z;
    }

    drawTriangle(tri) {
        this.drawLine(tri.verticies[0].x, tri.verticies[0].y, tri.verticies[1].x, tri.verticies[1].y, tri.color);
        this.drawLine(tri.verticies[1].x, tri.verticies[1].y, tri.verticies[2].x, tri.verticies[2].y, tri.color);
        this.drawLine(tri.verticies[2].x, tri.verticies[2].y, tri.verticies[0].x, tri.verticies[0].y, tri.color);
    }

    fillTriangle(tri) {
        let x1 = tri.verticies[0].x;
        let y1 = tri.verticies[0].y;
        let x2 = tri.verticies[1].x;
        let y2 = tri.verticies[1].y;
        let x3 = tri.verticies[2].x;
        let y3 = tri.verticies[2].y;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.closePath();
        this.ctx.strokeStyle = tri.color;
        this.ctx.fillStyle = tri.color;
        this.ctx.fill();
    }

    drawLine(x1, y1, x2, y2, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = color;
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

    rotateXMatrix(theta) {
        let matrixRotateX = new Matrix4x4();
        matrixRotateX.m[0][0] = 1;
        matrixRotateX.m[1][1] = Math.cos(theta);
        matrixRotateX.m[1][2] = Math.sin(theta);
        matrixRotateX.m[2][1] = Math.sin(theta) * -1;
        matrixRotateX.m[2][2] = Math.cos(theta);
        matrixRotateX.m[3][3] = 1;
        return matrixRotateX;
    }

    rotateYMatrix(theta) {
        let matrixRotateY = new Matrix4x4();
        matrixRotateY.m[0][0] = Math.sin(theta) * -1;
        matrixRotateY.m[1][0] = Math.cos(theta);
        matrixRotateY.m[0][2] = Math.cos(theta);
        matrixRotateY.m[2][2] = Math.cos(theta);
        matrixRotateY.m[3][3] = 1;
        matrixRotateY.m[2][1] = 1;
        return matrixRotateY;
    }

    rotateZMatrix(theta) {
        let matrixRotateZ = new Matrix4x4();
        matrixRotateZ.m[0][0] = Math.cos(theta);
        matrixRotateZ.m[0][1] = Math.sin(theta);
        matrixRotateZ.m[1][0] = Math.sin(theta) * -1;
        matrixRotateZ.m[1][1] = Math.cos(theta);
        matrixRotateZ.m[2][2] = 1;
        matrixRotateZ.m[3][3] = 1;
        return matrixRotateZ;
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
            
            let theta = .001 * elapsedTime;

            let matrixRotateZ = this.rotateZMatrix(theta);
            // matrixRotateZ.m = [
            //     [1,0,0,0],
            //     [0,1,0,0],
            //     [0,0,1,0],
            //     [0,0,0,1]
            // ];
            let matrixRotateX = this.rotateXMatrix(theta * .4);
            // matrixRotateX.m = [
            //     [1,0,0,0],
            //     [0,1,0,0],
            //     [0,0,1,0],
            //     [0,0,0,1]
            // ];
            let matrixRotateY = this.rotateYMatrix(theta * .6);
            matrixRotateY.m = [
                [1,0,0,0],
                [0,1,0,0],
                [0,0,1,0],
                [0,0,0,1]
            ];
            

            let matrixRotate = this.multiply4x4Matricies(matrixRotateZ, matrixRotateX);
            matrixRotate = this.multiply4x4Matricies(matrixRotate, matrixRotateY);
            //let matrixRotate = matrixRotateX;

            for(let tri of mesh.tris) {

                //rotate
                let rotatedTri = new Triangle(); 
                rotatedTri.verticies[0] = this.multiplyMatrixAndVector(tri.verticies[0], matrixRotate);
                rotatedTri.verticies[1] = this.multiplyMatrixAndVector(tri.verticies[1], matrixRotate);
                rotatedTri.verticies[2] = this.multiplyMatrixAndVector(tri.verticies[2], matrixRotate);

                //translate
                let translatedTri = new Triangle();
                translatedTri.copy(rotatedTri);

                translatedTri.verticies[0].z += 3;
                translatedTri.verticies[1].z += 3;
                translatedTri.verticies[2].z += 3;

                //create normal
                let line1 = new Vec3();
                let line2 = new Vec3();
                
                line1.x = translatedTri.verticies[1].x - translatedTri.verticies[0].x;
                line1.y = translatedTri.verticies[1].y - translatedTri.verticies[0].y;
                line1.z = translatedTri.verticies[1].z - translatedTri.verticies[0].z;

                line2.x = translatedTri.verticies[2].x - translatedTri.verticies[0].x;
                line2.y = translatedTri.verticies[2].y - translatedTri.verticies[0].y;
                line2.z = translatedTri.verticies[2].z - translatedTri.verticies[0].z;

                let normal = this.crossProduct(line1, line2);

                let l = Math.sqrt(normal.x*normal.x + normal.y*normal.y + normal.z*normal.z);

                normal.x = normal.x/l; 
                normal.y = normal.y/l; 
                normal.z = normal.z/l;

                if(normal.x * (translatedTri.verticies[0].x - this.camera.x) +
                    normal.y * (translatedTri.verticies[0].y - this.camera.y) +
                    normal.z * (translatedTri.verticies[0].z - this.camera.z) < 0) {
                    
                    //figure out shading
                    let color=this.getColor(mesh.color, this.getShading(normal));

                    //Perspective projection 
                    let projTri = new Triangle(
                        this.multiplyMatrixAndVector(translatedTri.verticies[0], projMatrix),
                        this.multiplyMatrixAndVector(translatedTri.verticies[1], projMatrix),
                        this.multiplyMatrixAndVector(translatedTri.verticies[2], projMatrix),
                        color
                    );

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
        }

        renderTris.sort((a,b) => {
            let aZ = (a.verticies[0].z + a.verticies[1].z + a.verticies[2].z) / 3.0;
            let bZ = (b.verticies[0].z + b.verticies[1].z + b.verticies[2].z) / 3.0;
            return bZ-aZ;
        });

        for(let tri of renderTris) {
            this.fillTriangle(tri);
            
            //draw wireframe
            //tri.color = "#000000";
            //this.drawTriangle(tri);
        }
        
        //this.fixAntialiasing()
    }

    getShading(normal) {
        let l = Math.sqrt(this.lightDir.x*this.lightDir.x + this.lightDir.y*this.lightDir.y + this.lightDir.z*this.lightDir.z);
        let lightNormalized = new Vec3();
        lightNormalized.x = this.lightDir.x / l;
        lightNormalized.y = this.lightDir.y / l;
        lightNormalized.z = this.lightDir.z / l;
        let dp = this.dotProduct(lightNormalized, normal);
        
        return dp; 
    }

    getColor(fullColor, lum) {
        let minPercent = .3;
        let red = (fullColor.r - (fullColor.r * minPercent)) * lum + (fullColor.r * minPercent);
        let green = (fullColor.g - (fullColor.g * minPercent)) * lum + (fullColor.g * minPercent);
        let blue = (fullColor.b - (fullColor.b * minPercent)) * lum + (fullColor.b * minPercent);

        return "rgb(" + red + "," + green + "," + blue + ")";
    }

    fixAntialiasing() {
        let imageData = this.ctx.getImageData (0, 0, this.screenWidth, this.screenHeight);
        for (let i = 0; i != imageData.data.length; i ++) {
            if (imageData.data[i] != 0x00)
                imageData.data[i] = 0xFF;
        }
        this.ctx.putImageData(imageData, 0, 0);
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

class Vec3 {
    x;
    y;
    z;

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Vec4 {
    x;
    y;
    z;
    w;

    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    
    static createFromVec3(input) {
        let ret = new Vec4();
        
        ret.x = input.x;
        ret.y = input.y;
        ret.z = input.z;
        ret.w = 1;
    
        return ret;
    }
}


class Triangle {
    verticies = [];
    color = "#ffffff";

    constructor(vertex1, vertex2, vertex3, color) {
        this.verticies[0] = vertex1;
        this.verticies[1] = vertex2;
        this.verticies[2] = vertex3;
        this.color = color;
    }

    copy(tri) {
        let vert1 = new Vec3();
        let vert2 = new Vec3();
        let vert3 = new Vec3();

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
        this.color = tri.color;
    }
}

class Mesh {
    tris = [];
    color = "#ffffff";

    constructor(tris, color) {
        this.tris = tris;
        this.color = color;
    }

    loadFromObj(objdata, invertY) {
        let lines = objdata.split("\n");
        
        let verticies = [];

        let tris = [];

        for(let line of lines) {
            let lineSplit = line.split(" ");

            if(lineSplit[0] == "v") {
                let vertex = new Vec3();
                vertex.x = lineSplit[1];
                vertex.y = lineSplit[2];
                vertex.z = lineSplit[3];
                //if(invertY) { vertex.y = vertex.y * -1 }
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

export  { GameEngine, Vec3, Triangle, Mesh, Matrix4x4 };