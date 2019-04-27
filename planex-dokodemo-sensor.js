var request = require('request');

module.exports = function(RED) {
    function PlanexDokodemoSensorAPI(config) {
        
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            
            var _currentDate = new Date();

            var _token = this.credentials.sensor_token;
            var _mac = this.credentials.sensor_mac_address;
            var _type = config.sensor_type;

            var _from = msg.payload.from || config.sensor_datetime_from;
            var _to = msg.payload.to || config.sensor_datetime_to;

            var _data = {
                type:'"' + _type + '"',
                mac:'"' + _mac + '"',
                from:'"' + _from + '"',
                to:'"' + _to + '"',
                token:'"' + _token + '"'
            };

            var headers = {}

            var options = {
                uri: 'https://svcipp.planex.co.jp/api/get_data.php',
                headers: headers,
                qs: _data
            }

            request.get(options, function (error, response, body) {
                msg.payload = JSON.parse(body);
                msg.response = response;
                node.send(msg);
            })

            
        });
    }
    RED.nodes.registerType("planex-dokodemo-sensor",PlanexDokodemoSensorAPI,{
        credentials: {
            sensor_token: {type:"text"},
            sensor_mac_address: {type:"text"}
        }
    });
}