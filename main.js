noseX = 0;
noseY = 0;

r_wrist = 0;
l_wrist = 0;

difference = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(550,500);
    canvas.position(620,120);

    poseNet1 = ml5.poseNet(video, modelLoaded);
    poseNet1.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("model is loaded");
}

function gotPoses(results, err)
{
    if(err)
    {
        console.error(err);
    }else{
        if(results.length > 0){
            console.log(results);

            noseX = results[0].pose.nose.x;
            noseY = results[0].pose.nose.y;

            r_wrist = results[0].pose.rightWrist.x;
            l_Wrist = results[0].pose.leftWrist.x;

            difference = floor(l_wrist - r_wrist) * -1;
        }
    }
}

function draw()
{
    background("grey");
    document.getElementById("ss").innerHTML = "The width and height of the Text is: " + difference + "px";

    fill("red");
    stroke("black");

    text("Raihaan", noseX, noseY);
    textSize(difference)
}