const MqttController = require('./src/controllers/mqtt.controller');
let mqttController = new MqttController('mqtt://localhost:1883');
setTimeout(() => {
    console.log(mqttController.client.connected);
    mqttController.publish("inTopic", '0');
    setTimeout(() => {
        process.exit();
    },1000);
},2000);