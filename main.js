song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("posenet is initialized");
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if (leftWristScore >= 0.2) {
        circle(leftWristX, leftWristY, 20);

        numberleftWristYwithdecimals = Number(leftWristY);
        numberleftWristY = floor(numberleftWristYwithdecimals);
        volume = numberleftWristY / 500;
        console.log(volume + " = volume");
        document.getElementById("volume").innerHTML = "volume = " + volume;
    }

    if (rightWristScore > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "Speed = 1x";
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
        }
        else if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("speed").innerHTML = "Speed = 2x";
        }
        else if (rightWristY > 400 && rightWristY <= 500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
        }

    }
}
function preload() {
    song = loadSound("music.mp3");
}
function play_sound() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop_sound() {
    song.pause();
}
function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;


        console.log(" leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
        console.log(" rightWristX = " + rightWristX + " rightWristY = " + rightWristY);


        leftWristScore = result[0].pose.keypoints[9].score;
        console.log("leftWristScore = " + leftWristScore);


        rightWristScore = result[0].pose.keypoints[10].score;
        console.log("rightWristScore = " + rightWristScore);
    }
}