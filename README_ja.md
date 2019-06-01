# node-red-contrib-planex-dokodemo-sensor-api

このノードは、PLANEXどこでもセンサーのAPIからデータを取得するノードです。

[https://www.planex.co.jp/products/ws-usb/](https://www.planex.co.jp/products/ws-usb/)


## インストール

Node-REDのフォルダに移動します。 ~/.node-red

以下のコマンドを打ちます。

Mac

```
sudo npm i --unsafe-perm node-red-contrib-planex-dokodemo-sensor-api
```

Windows

```
npm i --unsafe-perm node-red-contrib-planex-dokodemo-sensor-api
```

## 使い方

あなたのPLANEXどこでもセンサー管理画面に移動します。

メニュー > デバイス設定 に移動します。

![image.png (60.2 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/04/29/8131/c3c754ab-c3b9-473d-9743-efcfdca0250f.png)

以下のセンサーの設定をメモしておきます。

* デバイス
* MAC
* TOKEN

取得したい期間も考えておきましょう。

### Node-RED flow

以下はシンプルなデータ取得するためのフローです。

![image.png (8.2 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/04/29/8131/642f87df-fda9-427e-8300-0ac6ce5de5a4.png)

```
[{"id":"1f929a8d.552fd5","type":"planex-dokodemo-sensor","z":"d3d7f120.bc949","sensor_type":"WS-USB01-THP","sensor_mac_address":"24:72:60:40:21:A6","sensor_datetime_from":"2019-05-31 11:33:44","sensor_datetime_to":"2019-05-31 22:33:44","x":560,"y":700,"wires":[["f0973053.e7ab7"]]},{"id":"c6e9e704.8e1128","type":"inject","z":"d3d7f120.bc949","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":700,"wires":[["1f929a8d.552fd5"]]},{"id":"f0973053.e7ab7","type":"debug","z":"d3d7f120.bc949","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":770,"y":700,"wires":[]}]
```

インポートしてみましょう。

![image.png (24.9 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/04/29/8131/8120531a-4449-410d-bdc1-a499a59107b7.png)

このノードの設定です。

* Token は、さきほどの管理画面の "TOKEN".
* Device は、さきほどの管理画面の "デバイス".
* MAC Address は、さきほどの管理画面の "MAC".

From と To には、UTCに準拠した日付フォーマットを記述します。

inject ノードをクリックしてデータを取得してみましょう！

![image.png (12.4 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/04/29/8131/61062c0d-4ebd-47cf-9e2d-a3ebb80f5d39.png)

設定が正しければ、デバックタブに情報が表示されます！

特に、以下の設定には気をつけましょう。

* Token, Device, MACがどこでもセンサー管理画面の情報と合っているでしょうか？
* 取得したい日付の期間が正しく設定されていますでしょうか？
* UTCに準拠した日付フォーマットで From と To が記述されていますでしょうか？

## ライセンス

MIT License