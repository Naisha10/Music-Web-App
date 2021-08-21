song1 = "";
song2 = "";
song1Status = "";
song2Status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function preload() {
    song1 = loadSound("BadriKiDulhania.mp3");
    song2 = loadSound("MuqablaStreetDancer.mp3");
}

function setup() {
    canvas = createCanvas(600, 480);
    video = createCapture(VIDEO);
    video.hide();
    //canvas.center();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet Is Initialized");
}

function draw() {
    image(video, 0, 0, 600, 480);
    fill("#FF0000");
    stroke("#FF0000");
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2Status == false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "PLAYING MUQABLA STREET DANCER";
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1Status == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "PLAYING BADRI KI DHULANIA";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}