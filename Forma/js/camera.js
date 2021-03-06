{
  'use strict';
    //------------------------------------------
    // 定数領域にidで指定した要素を代入する
    //------------------------------------------
    const $divListCameraDevices = document.getElementById("list-camera-devices");   // カメラデバイス列挙エリア
    const $label_h =document.getElementById("resolution-height");
    const $label_w =document.getElementById("resolution-width");
    const $canvasCapture =document.getElementById("canvas-capture");
    const video = document.querySelector("#camera");
    const cameraList = document.getElementById("camera_list");
    //------------------------------------------
    // 変数領域
    //------------------------------------------
    let useFront = true;                        // フロントカメラ:true, バックカメラ:false
    //------------------------------------------
    // グローバル変数
    //------------------------------------------
    // カメラのデフォルト設定
    const CONSTRAINTS = {
      audio: false,
      video: {
        
        //--------------------------
        // PCでやるときの設定
        //--------------------------
        width: 640,
        height: 480,
        //--------------------------
        // スマホでやるときの設定
        //--------------------------
        // min    :最小値
        // max    :最大値
        // ideal  :理想的な値
        // width: { min: 320, ideal: 1920, max: 1920 },
        // height: { min: 180, ideal: 1080, max:1080},
        aspectRatio: 1.777777778,
        frameRate: { max: 30 },
        
        facingMode: null,  // どのカメラを利用するか
        // facingModeには最終的に以下のいずれかの値を入れる
        //   facingMode: "user"                    // フロントカメラを利用する
        //   facingMode: { exact: "environment" }  // リアカメラを利用する
        deviceId: null
      }
    };
    // 現在のStream
    let curSTREAM = null;

    let isTakePicture = false;
    //---------------------------------------------
    // プロパティ
    //---------------------------------------------
    function get_isTakePicture()
    {
      return isTakePicture;
    }
    function clear_isTakePicture()
    {
      isTakePicture = false;
    }
    //---------------------------------------------
    // [event] ページ読み込み完了
    //---------------------------------------------
    window.onload = () => {
      // カメラデバイス情報の取得
      getCameraDevices();
      // カメラ接続
      // 前後カメラの設定
      CONSTRAINTS.video.facingMode = (useFront)?  "user":{ exact: "environment" };
      syncCamera(video);
      useFront = !useFront;         // boolean値を反転
    };
    // カメラ解像度の変更
    function videoSize(height, width) {
      CONSTRAINTS.video.height = height;
      CONSTRAINTS.video.width = width;
      syncCamera(video);
    }
    // カメラデバイスの変更
    function startSelectedVideo() {
      var deviceId = getSelectedVideo();
      console.log('selected video device id=' + deviceId);
      CONSTRAINTS.video.facingMode = null;
      CONSTRAINTS.video.deviceId = deviceId;
      syncCamera(video);
    }
    function getSelectedVideo() {
      var id = cameraList.options[cameraList.selectedIndex].value;
      return id;
    }
    //
    // カメラを<video>と同期
    //
    // @param {object} video
    // @param {boolean} [is_front=true]
    //
    function syncCamera(video){
      // // 前後カメラの設定
      // CONSTRAINTS.video.facingMode = (is_front)?  "user":{ exact: "environment" };
      
      // すでにカメラと接続していたら停止
      stopCamera();
      // カメラと接続する
      navigator.mediaDevices.getUserMedia(CONSTRAINTS)
        .then( (stream) => {
          curSTREAM = stream;   // 前後の切り替え用に保持

          // <video>とStremaを接続
          video.srcObject = stream;
          video.onloadedmetadata = (e) => {
            
            video.play();
            // 解像度を画面表示
            $label_h.innerText =`H:${video.videoHeight}`;
            $label_w.innerText =`W:${video.videoWidth}`;
          };
        })
        .catch( (err) => {
          console.log(`${err.name}: ${err.message}`);
          alert(
            "カメラとの接続時にエラーが発生しました" + "\n"
            + err.name + "\n"
            + err.message
            );
        });
    }

    function stopCamera()
    {
      // すでにカメラと接続していたら停止
      if( curSTREAM !== null ){
        curSTREAM.getVideoTracks().forEach( (camera) => {
          camera.stop();
        });
      }
    }
    // 前後カメラの切り替え
    function cameraPositionChange()
    {
      CONSTRAINTS.video.deviceId = null;
      CONSTRAINTS.video.facingMode = (useFront)?  "user":{ exact: "environment" };
      syncCamera(video);
      useFront = !useFront;      // boolean値を反転
    };
    
    // キャプチャー処理
    function videocapture()
    {
      $canvasCapture.width  = video.videoWidth;
      $canvasCapture.height = video.videoHeight;
      $canvasCapture.getContext('2d').drawImage(video, 0, 0);  // canvasに『「静止画取得」ボタン』押下時点の画像を描画
    }
    //--------------------------------------------
    // メディアデバイスを取得する
    // https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/enumerateDevices
    // https://qiita.com/massie_g/items/b9863e4366cfed339528
    // https://mganeko.github.io/webrtcexpjp/tool/devicelist.html
    //--------------------------------------------
    function getCameraDevices() 
    {
      $divListCameraDevices.innerHTML="";
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
        return;
      }
      // カメラリストのクリア
      while(cameraList.lastChild) {
        cameraList.removeChild(cameraList.lastChild);
      }
      
      // List cameras and microphones.
      // kindは   "videoinput"
      //          "audioinput"
      //          "audiooutput"
      navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        // デバイス情報 MediaDeviceInfo の内容
        // deviceId       ：（デバイスID)
        // kind           ：（種類：　audioinput, videoinput, audiooutput ）
        //                  ※ audiooutput は Chromeのみ
        // label （名称） ：取得できる場合と、できない場合がある
        // groupId        ：同一ハード機器内のデバイスでは同じになる仕様（けど、まだ？）
        // 成功時
        devices.forEach(function(device, index) {
          console.log(device.kind + ": " + device.label +
                      " id = " + device.deviceId);
          if(device.kind === 'videoinput')
          {
            // セレクトボックスの追加
            var id = device.deviceId;
            var label = device.label || 'camera'; // label is available for https 
            const option = document.createElement('option');
            option.setAttribute('value', id);
            option.innerHTML = label + '(' + id + ')';
            cameraList.appendChild(option);
          }
          // 指定要素にデバイス情報を要素で追加
          const p = document.createElement('p');
          p.innerHTML = `*** [${index}] ***` 
                        + "<br>"
                        + `Kind: ${device.kind}` 
                        + "<br>" 
                        + `Label: ${device.label}`
                        + "<br>" 
                        + `Id: ${device.deviceId}`
          $divListCameraDevices.appendChild(p);
        });
      })
      // エラー発生時
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
    }
    // // 写真を保存する 
    function savePhoto() {

      // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toBlob
      var canvas = document.getElementById("canvas-capture");

      canvas.toBlob(blobCallback("kaminari"),'image/jpeg');
      
      submit();
      // const canvas = document.getElementById('canvas-capture');
      // // 画像のフォーマットを変更
      // const base64 = canvas.toDataURL("image/jpeg",0.75);
      
      // // Base64からバイナリへ変換
      // var bin = atob(base64.replace(/^.*,/, ''));
      // var buffer = new Uint8Array(bin.length);
      // for (var i = 0; i < bin.length; i++) {
      //     buffer[i] = bin.charCodeAt(i);
      // }

      // // Blobを作成
      // var blob = new Blob([buffer.buffer], {
      //     type: 'image/jpeg'
      // });
      // // document.getElementById("dlImg").href = window.URL.createObjectURL(blob);
      // document.getElementById("newImg").src = window.URL.createObjectURL(blob);
    }
    function blobCallback(filename)
    {
      return function(b) {
        const a = document.createElement("a");
        a.textContent="download";
        document.getElementById("blobArea").appendChild(a);
        a.download=filename + ".jpg";
        a.href=window.URL.createObjectURL(b);
      }
    }
    async function submit() {
      // キャンバスの画像を取得
      const canvas = document.getElementById("canvas-capture");

      // 例１
      let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.jpeg");

      document.getElementById("newImg").src = window.URL.createObjectURL(imageBlob);
    }
}