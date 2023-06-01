sound = "";
sound2 = "";
leftWristY  = 0;
leftWristX  = 0;
rightWristY = 0;
rightWristX = 0;
leftWristScore = 0;
scoreRightWrist =0;

function preload(){
sound = loadSound("music.mp3");
sound2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotResults);
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
 if(scoreRightWrist > 0.2){
 circle(rightWristX,rightWristY,20);
       sound.play();
       sound2.stop();
    }

    if(leftWristScore > 0.2){
        circle(leftWristX,leftWristY,20);
              sound2.play();
              sound.stop();
           }
}

function modelLoaded(){
    console.log("Model Loaded!");
}


function gotResults(results){
if(results.length > 0){
console.log(results);
leftWristY =  results[0].pose.leftWrist.y;
rightWristY = results[0].pose.rightWrist.y;
leftWristX=  results[0].pose.leftWrist.x;
rightWristX = results[0].pose.rightWrist.x;
leftWristScore = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;
}
}