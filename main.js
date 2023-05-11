song="";
leftWristx =0;
leftWristy= 0;
rightWristx=0;
rightWristy=0;
ScoreLeftWrist=0;
ScoreRightWrist=0;
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet =ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('Posenet is initialized');
}
function gotPoses(results){
if (results.length> 0)
{
    console.log(results);
    ScoreRightWrist= results[0].pose.keypoints[10].score;
    ScoreLeftWrist= results[0].pose.keypoints[9].score;
    console.log('ScoreRightWrist='+ScoreRightWrist);
    console.log('ScoreLeftWrist='+ScoreLeftWrist);
    leftWristx= results[0].pose.leftWrist.x;
    leftWristy= results[0].pose.leftWrist.y;
    console.log('leftWristx='+leftWristx);
    console.log('leftWristy='+leftWristy);
    rightWristx= results[0].pose.rightWrist.x;
    rightWristy= results[0].pose.rightWrist.y;
    console.log('rightWristx='+rightWristx);
    console.log('rightWristy='+rightWristy);
}
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    
    if(ScoreRightWrist>0.2){
    circle(rightWristx,rigthtWristy,20);

    if(rightWristy>0 && rightWristy<=100){
        document.getElementById("speed").innerHTML = "Speed= 0.5x";
        song.rate(0.5);
    }
    else if(rightWristy>100 && rightWristy<=200){
        document.getElementById("speed").innerHTML = "Speed= 1x";
        song.rate(1);
    }
    else if(rightWristy>200 && rightWristy<=300){
        document.getElementById("speed").innerHTML = "Speed= 1.5x";
        song.rate(1.5);
    }
    else if(rightWristy>300 && rightWristy<=400){
        document.getElementById("speed").innerHTML = "Speed= 2x";
        song.rate(2);
    }
    else if(rightWristy>400 && rightWristy<=500){
        document.getElementById("speed").innerHTML = "Speed= 2.5x";
        song.rate(2.5);
    }
}
    if(ScoreLeftWrist>0.2)
    {
    circle(leftWristx,leftWristy,20);
    InNumberleftWristy=Number(leftWristy);
    remove_decimals=floor(InNumberleftWristy);
    volume=remove_decimals/500;
    document.getElementById('volume').innerHTML= "Volume="+volume;
    song.setVolume(volume);
    }
}
function preload(){
    song= loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
