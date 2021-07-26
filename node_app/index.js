var mqtt = require("mqtt");
var Deque = require("denque");

const express = require("express");
const app = express();
const port = 3000;
const max_deque_size = 200;

var client = mqtt.connect("mqtt://13.236.90.194");

client.on("connect", function () {
    client.subscribe("motion/#", function (err) {
        if (err) {
            console.log("MQTT Connection Error");
        }
    });
});

var deque = new Deque();

app.get("/", (req, res) => {
    res.send("Hello there! Go to /motion");
});

app.get("/motion", (req, res) => {
    resdata = "<div>";
    deque.toArray().forEach((element) => {
        resdata += element.toString();
        resdata += "</br>";
    });
    resdata += "</div>";
    res.send(resdata);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

client.on("message", function (topic, message) {
    // message is Buffer
	if(deque.toArray().length >= max_deque_size){
		var array_to_save = deque.splice(100, max_deque_size)
	}

    deque.push(
        "topic: " + topic.toString() + ", message: " + message.toString()
    );
});
