# node-red-contrib-planex-dokodemo-sensor-api

The Node node-red-contrib-planex-dokodemo-sensor-api connects datas using PLANEX Dokodemo sensor API.

This is simple node for PLANEX Dokodemo sensor.

[https://www.planex.co.jp/products/ws-usb/](https://www.planex.co.jp/products/ws-usb/)

## Japanease Readme

Let look when you need this japanease Readme!

[https://github.com/1ft-seabass/node-red-contrib-planex-dokodemo-sensor-api/blob/master/README_ja.md](https://github.com/1ft-seabass/node-red-contrib-planex-dokodemo-sensor-api/blob/master/README_ja.md)

## Install

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

### Node-RED flow

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

Especially be careful with the following settings.

* Is the device information of Dokodemo sensor admin page correctly input to Token, Device, MAC input area?
* Are the date ranges in the From and To input areas correct?
* Are UTC format in the From and To input areas correct?

## History

* ver 0.0.4
    * Setting input node UTC datetime parameters fitting Node-RED popular parameter rules. Replaced msg.payload.to to to msg.to. Replaced msg.payload.from to to msg.from.
    * Added getting latest a sensor data node!
    * fixed a bit Readme.
    

## License

MIT License