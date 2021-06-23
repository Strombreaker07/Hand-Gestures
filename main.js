prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
   });

   Camera = document.getElementById("camera");
   Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="snapped" src="'+data_uri+'">';
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/sRhqwQoST/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "the prediction is " + prediction_1;
    speak_data_2 = "the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + prediction_2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("snapped");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emoji_1").innerHTML = results[0].label;
        document.getElementById("result_emoji_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        
        speak();
        if(results[0].label == "Best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }

        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }

        //2nd prediction

        if(results[1].label == "Best")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }

        if(results[1].label == "Victory")
        {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }

        if(results[1].label == "Amazing")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
    }
}