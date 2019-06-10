# node-red-contrib-planex-dokodemo-sensor-api

このノードは、PLANEXどこでもセンサーのAPIからデータを取得するノードです。

[https://www.planex.co.jp/products/ws-usb/](https://www.planex.co.jp/products/ws-usb/)

## インストール

### パレットマネージャーからのインストール

ほとんどの場合、[Palette Manager](https://nodered.org/docs/user-guide/editor/palette/manager) からインストールが成功します。


### 手動インストール

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

### シンプルなデータ取得するためのフロー (planex-dokodemo-sensor)

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

このデータは、APIから取得した、そのままの無加工データです。

## トラブルシューティング

特に、以下の設定には気をつけましょう。

* Token, Device, MACがどこでもセンサー管理画面の情報と合っているでしょうか？
* 取得したい日付の期間が正しく設定されていますでしょうか？
* UTCに準拠した日付フォーマットで From と To が記述されていますでしょうか？

## 最新のデータをひとつだけ取得できるフロー (planex-dokodemo-sensor-latest)

最新のデータをひとつだけ取得できるフローです。

### 最新取得ノード planex-dokodemo-sensor-latest の注意点

このノードは、Planexどこでもセンサー 環境センサー（WS-USB01-THP）が継続して起動しデータ蓄積を行っていることを想定してます。

もし、過去に何かの理由でセンサーの電源をシャットダウンしている場合は、planex-dokodemo-sensorでUTCの時間指定をして取得しましょう。

正直なところ、私は、自動的に最新のデータを取得できる機能がAPIに加わることを願っています。それまでは、現在のユースケースの想定でUTCの時間指定の仕様で開発します :)

### フロー

![image.png (19.6 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/06/10/8131/c5787063-4985-41f6-80a6-02c1742568dd.png)

```js
[{"id":"889efdb0.7805","type":"planex-dokodemo-sensor-latest","z":"d3d7f120.bc949","sensor_type":"WS-USB01-THP","sensor_mac_address":"24:72:60:40:21:A6","name":"","x":840,"y":860,"wires":[["4cb1f556.003e1c"]]},{"id":"cc6f4181.f4e32","type":"inject","z":"d3d7f120.bc949","name":"","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":650,"y":860,"wires":[["889efdb0.7805"]]},{"id":"cb82c664.98a138","type":"debug","z":"d3d7f120.bc949","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":1190,"y":940,"wires":[]},{"id":"4cb1f556.003e1c","type":"change","z":"d3d7f120.bc949","name":"renamed data","rules":[{"t":"set","p":"payload","pt":"msg","to":"{\t  \"datetime\":payload[0],\t  \"temperature\":payload[1],\t  \"humidity\":payload[2],\t  \"pressure\":payload[3]\t}","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":980,"y":940,"wires":[["cb82c664.98a138"]]},{"id":"80f7311d.2d62f","type":"comment","z":"d3d7f120.bc949","name":"WS-USB01-THP latest data sample","info":"","x":720,"y":820,"wires":[]}]
```

インポートしてみましょう。

![image.png (20.0 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/06/10/8131/68674c4e-cf98-4051-a752-82abcfec200f.png)

このノードの設定です。

* Token は、さきほどの管理画面の "TOKEN".
* Device は、さきほどの管理画面の "デバイス".
* MAC Address は、さきほどの管理画面の "MAC".

inject ノードをクリックしてデータを取得してみましょう！

![image.png (11.0 kB)](https://img.esa.io/uploads/production/attachments/3062/2019/06/10/8131/48c508b4-0bb7-473a-b977-fce6f3f6111f.png)

設定が正しければ、デバックタブに情報が表示されます！

このデータは、APIから取得した、そのままの無加工データです。

### 内部的な時間について

最新データを取得するために、以下のように期間をしています。

*  [Moment](https://momentjs.com/) モジュールを使って、サーバーの現在の時間を取得します。
* その時間をもとに1分間の時間指定を行います。
    * Planexどこでもセンサー 環境センサー（WS-USB01-THP）は、約20秒の間隔でセンシングとデータ蓄積を行います. ですので、1分間の期間指定で2～3のデータを確実に取得できます。そこから、最新の1データを出力しています。
* 1分間の時間指定を使ってAPIへリクエストしてデータを取得します。

## ライセンス

MIT License