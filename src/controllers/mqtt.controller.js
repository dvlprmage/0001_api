const mqtt = require('mqtt');

class MqttController{
    constructor(host='mqtt://localhost:1883',options = {
        username: 'system',
        password: '123123',
    }){
        this.client = mqtt.connect(host,options);
    }

    async publish(channel, message){
        return this.client.publish(channel, message);
    }
}

module.exports = MqttController;