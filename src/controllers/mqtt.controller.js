const mqtt = require('mqtt');

class MqttController{
    constructor(){
        this.client = mqtt.connect('mqtt://localhost:1883',{
            username: 'system',
            password: '123123',
        });
    }

    async publish(channel, message){
        this.client.publish(channel, message);
    }
}

module.exports = MqttController;