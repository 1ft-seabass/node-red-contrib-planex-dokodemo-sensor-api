var request = require('request');
var moment = require('moment');


module.exports = function(RED) {
    function PlanexDokodemoSensorAPI(config) {
        
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            
            var _currentDate = new Date();

            var _token = this.credentials.sensor_token;
            var _mac = this.credentials.sensor_mac_address;
            var _type = config.sensor_type;

            var _from = msg.from || config.sensor_datetime_from;
            var _to = msg.to || config.sensor_datetime_to;

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

    function PlanexDokodemoSensorLatestDataAPI(config) {
        
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            
            var _currentDate = new Date();

            var _token = this.credentials.sensor_token;
            var _mac = this.credentials.sensor_mac_address;
            var _type = config.sensor_type;
            var _from = moment().utcOffset(0).add(-1,"minutes").format("YYYY-MM-DD HH:mm:ss");
            var _to = moment().utcOffset(0).format("YYYY-MM-DD HH:mm:ss");

            // console.log(_from);
            // console.log(_to);

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
                var datas = JSON.parse(body);
                if(datas.length > 0){
                    var _data = datas.pop();
                    msg.payload = {
                      "datetime":_data[0],
                      "temperature":_data[1],
                      "humidity":_data[2],
                      "pressure":_data[3]
                    };
                } else {
                    msg.payload = [];
                }
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

    RED.nodes.registerType("planex-dokodemo-sensor-latest",PlanexDokodemoSensorLatestDataAPI,{
        credentials: {
            sensor_token: {type:"text"},
            sensor_mac_address: {type:"text"}
        }
    });
}