# node-red-contrib-planex-dokodemo-sensor-api

The Node node-red-contrib-planex-dokodemo-sensor-api connects datas using PLANEX Dokodemo sensor API.

This is simple node for PLANEX Dokodemo sensor.

[https://www.planex.co.jp/products/ws-usb/](https://www.planex.co.jp/products/ws-usb/)

## Japanease Readme

Let look when you need this japanease Readme!

[https://github.com/1ft-seabass/node-red-contrib-planex-dokodemo-sensor-api/blob/master/README_ja.md](https://github.com/1ft-seabass/node-red-contrib-planex-dokodemo-sensor-api/blob/master/README_ja.md)

## Install from Palette Manager

This node almost will success installing from [Palette Manager](https://nodered.org/docs/user-guide/editor/palette/manager).

## Install manually

Move your Node-RED user directory ~/.node-red

Mac

```
sudo npm i --unsafe-perm node-red-contrib-planex-dokodemo-sensor-api
```

Windows

```
npm i --unsafe-perm node-red-contrib-planex-dokodemo-sensor-api
```

## Usage

Check your Dokodemo sensor admin page.

Move Menu > Device setting.

![image.png (60.2 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/04/29/8131/c3c754ab-c3b9-473d-9743-efcfdca0250f.png)

Note your trying sensor setting.

* デバイス
* MAC
* TOKEN

and let think your getting datetime term.

### simple Node-RED flow (planex-dokodemo-sensor)

This is simple getting data Node-RED flow.

![image.png (8.2 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/04/29/8131/642f87df-fda9-427e-8300-0ac6ce5de5a4.png)

```
[{"id":"1f929a8d.552fd5","type":"planex-dokodemo-sensor","z":"d3d7f120.bc949","sensor_type":"WS-USB01-THP","sensor_mac_address":"24:72:60:40:21:A6","sensor_datetime_from":"2019-05-31 11:33:44","sensor_datetime_to":"2019-05-31 22:33:44","x":560,"y":700,"wires":[["f0973053.e7ab7"]]},{"id":"c6e9e704.8e1128","type":"inject","z":"d3d7f120.bc949","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":700,"wires":[["1f929a8d.552fd5"]]},{"id":"f0973053.e7ab7","type":"debug","z":"d3d7f120.bc949","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":770,"y":700,"wires":[]}]
```

Let import it  your Node-RED.

![image.png (24.9 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/04/29/8131/8120531a-4449-410d-bdc1-a499a59107b7.png)

this node setting.

* Token is admin page as "TOKEN".
* Device is admin page as "デバイス".
* MAC Address page as "MAC".

Enter From and To input area with the UTC datetime format you need to get.

Click inject node button!

![image.png (12.4 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/04/29/8131/61062c0d-4ebd-47cf-9e2d-a3ebb80f5d39.png)

The debug tab will display Dokodemo sensor datas if your settings is correct.

It is the payload of get raw responced API datas. 

### Trouble Shooting

Especially be careful with the following settings.

* Is the device information of Dokodemo sensor admin page correctly input to Token, Device, MAC input area?
* Are the date ranges in the From and To input areas correct?
* Are UTC format in the From and To input areas correct?

## Getting one latest data Node-RED flow (planex-dokodemo-sensor-latest)

This is getting one latest data Node-RED flow.

### Important note for planex-dokodemo-sensor-latest

This node is supporting this usecase that the planex dokodemo environment sensor ( WS-USB01-THP ) continue to measure and store data constantly.

If you need measuring datas when its sensor shutdown for some reason in the past. Could you please select UTC time period using planex-dokodemo-sensor node.

Honesty I hope that the "true" function getting automatically latest data is added to the API. ;) Until then, I will develop the current usecase by UTC time period specification.

### Getting one latest data flow

![image.png (8.9 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/06/10/8131/c35cbdd2-07b7-4866-9414-d7fa7a59299f.png)

```js
[{"id":"889efdb0.7805","type":"planex-dokodemo-sensor-latest","z":"d3d7f120.bc949","sensor_type":"WS-USB01-THP","sensor_mac_address":"24:72:60:40:21:A6","name":"","x":920,"y":860,"wires":[["cb82c664.98a138"]]},{"id":"cc6f4181.f4e32","type":"inject","z":"d3d7f120.bc949","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":730,"y":860,"wires":[["889efdb0.7805"]]},{"id":"cb82c664.98a138","type":"debug","z":"d3d7f120.bc949","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":1130,"y":860,"wires":[]}]
```

Let import it your Node-RED.

![image.png (20.0 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/06/10/8131/68674c4e-cf98-4051-a752-82abcfec200f.png)

this node setting.

* Token is admin page as "TOKEN".
* Device is admin page as "デバイス".
* MAC Address page as "MAC".

Click inject node button!

![image.png (11.0 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/06/10/8131/48c508b4-0bb7-473a-b977-fce6f3f6111f.png)

The debug tab will display Dokodemo sensor datas if your settings is correct.

It is the payload of renamed Easy-to-understand data after getting sensor data. ex) datetime , temperature , humidity , pressure.


### About internal time period setting rule

This node has setting time period processes.

* It checks current server time using [Moment](https://momentjs.com/) module.
* It makes a time period for 1 minute from the current time.
    * A planex dokodemo environment sensor ( WS-USB01-THP ) continue to measure and store data every about 20 sec. So its node can get between 2 to 3 datas certainly when it use 1 minute period. And it outputs selected a latest data.
* It requests to the API using the period.

## History

* ver 0.0.5
    * Readme Enhancement Timing!
        * Wrote about planex-dokodemo-sensor-latest node detail.
        * Wrote about installing from Palette Manager and installing manually.
* ver 0.0.4
    * Setting input node UTC datetime parameters fitting Node-RED popular parameter rules. Replaced msg.payload.to to to msg.to. Replaced msg.payload.from to to msg.from.
    * Added getting latest a sensor data node!
    * fixed a bit Readme.
    

## License

MIT License