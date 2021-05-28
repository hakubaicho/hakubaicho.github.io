// 'use strict';
{
  //------------------------------------------
  // 定数定義
  //------------------------------------------
  const VIDEO_WIDTH = 1024;          // ビデオ画像の幅
  const VIDEO_HEIGHT = 576;         // ビデオ画像の高さ

  const ICON_WIDTH = 300;           // 切り出し画像の幅
  const ICON_HEIGHT = 300;          // 切り出し画像の高さ

  const ICON_LOC_X = 333;           // アイコン貼り付け位置X
  const ICON_LOC_Y = 300;           // アイコン貼り付け位置Y
  //------------------------------------------
  // 定数領域にidで指定した要素を代入する
  //------------------------------------------
  const $divListCameraDevices = document.getElementById("list-camera-devices");   // カメラデバイス列挙エリア
  const $label_h =document.getElementById("resolution-height");
  const $label_w =document.getElementById("resolution-width");
  const cameraList = document.getElementById("camera_list");

  //------------------------------------------
  // 定数領域にidで指定した要素を代入する
  // Avatar作成
  //------------------------------------------
  const $canvas_Photo =document.getElementById("canvas-photo");
  const video = document.querySelector("#camera");
  //------------------------------------------
  // 定数領域にidで指定した要素を代入する
  // Item作成
  //------------------------------------------
  const $canvasCapture =document.getElementById("canvas-capture");
  const video_item = document.querySelector("#camera-itemcreate");


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
      width: 1024,
      height: 576,
      //--------------------------
      // スマホでやるときの設定
      //--------------------------
      // min    :最小値
      // max    :最大値
      // ideal  :理想的な値
      width: { min: 320, ideal: 1024, max: 1024 },
      height: { min: 180, ideal: 576, max:576},
      // ここはコメントにする
      // aspectRatio: 1.777777778,
      frameRate: { max: 30 },
      
      facingMode: null,  // どのカメラを利用するか
      // facingModeには最終的に以下のいずれかの値を入れる
      //   facingMode: "user"                    // フロントカメラを利用する
      //   facingMode: { exact: "environment" }  // リアカメラを利用する
      deviceId: null
    }
  };
  let camera_device_ids = new Array();
  // 現在のStream
  let curSTREAM = null;

  
  //---------------------------------------------
  // プロパティ
  //---------------------------------------------
  let isTakePicture = false;      // 撮影済みか(T:済み/F:未撮影)
  function get_isTakePicture()
  {
    return isTakePicture;
  }
  function clear_isTakePicture()
  {
    isTakePicture = false;
  }
  let isTakeItemPicture = false;      // 撮影済みか(T:済み/F:未撮影)
  function get_isTakeItemPicture()
  {
    return isTakeItemPicture;
  }
  function clear_isTakeItemPicture()
  {
    isTakeItemPicture = false;
  }

  // ===============================================================
  //
  // カメラの処理
  //
  // ===============================================================
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
    // 前後カメラの設定
    CONSTRAINTS.video.facingMode = (useFront)?  "user":{ exact: "environment" };
    
    // // 既にカメラ開始なら処理しない。
    // if( curSTREAM !== null ){
    //     return;
    // }
    // すでにカメラと接続していたら停止
    // stopCamera();

    // videoタグの表示
    video.classList.remove("item-hide");
    video.classList.add("item-show");
    // canvasタグの非表示
    $canvas_Photo.classList.remove("item-show");
    $canvas_Photo.classList.add("item-hide");
    
    // カメラと接続する
    navigator.mediaDevices.getUserMedia(CONSTRAINTS)
      .then( (stream) => {
        curSTREAM = stream;   // 前後の切り替え用に保持

        // <video>とStremaを接続
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {
          
          video.play();
          // 解像度を画面表示
          $label_h.innerText =`${video.videoHeight}`;
          $label_w.innerText =`${video.videoWidth}`;
        };
        // アイテム用の<video>とStreamを接続
        video_item.srcObject = stream;
        video_item.onloadedmetadata = (e) => {
          
          video_item.play();
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
      try
      {
        curSTREAM.getVideoTracks().forEach( (camera) => {
          camera.stop();
        });
      }
      catch(e)
      {
        
      }
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

  // 写真の撮影
  // videoタグの中身をcanvasに書き込む
  function take_Photo()
  {
    $canvas_Photo.width  = video.videoWidth;
    $canvas_Photo.height = video.videoHeight;

    // canvasのサイズを変更
    // $canvas_Photo.setAttribute("width", video.videoWidth);
    // $canvas_Photo.setAttribute("height", video.videoHeight);
    //ここで反転しないとね
    // http://honttoni.blog74.fc2.com/blog-entry-197.html
    const ctx = $canvas_Photo.getContext("2d");
    // 背面カメラでの撮影の場合にはいらない。
    // ctx.transform(-1,0,0,1,video.videoWidth,0);
    // canvasに『「静止画取得」ボタン』押下時点の画像を描画
    $canvas_Photo.getContext('2d').drawImage(video, 0, 0);

    // videoタグの非表示
    video.classList.remove("item-show");
    video.classList.add("item-hide");
    // canvasタグの表示
    $canvas_Photo.classList.remove("item-hide");
    $canvas_Photo.classList.add("item-show");

    // 撮影済みにする
    isTakePicture = true;
  }
  //--------------------------------------------
  // メディアデバイスを取得する
  // https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/enumerateDevices
  // https://qiita.com/massie_g/items/b9863e4366cfed339528
  // https://mganeko.github.io/webrtcexpjp/tool/devicelist.html
  //--------------------------------------------
  function getCameraDevices() 
  {
    // カメラデバイスに対応しているか画面表示
    $divListCameraDevices.innerHTML="";
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
      return;
    }
    // カメラリストのクリア
    while(cameraList.lastChild) {
      cameraList.removeChild(cameraList.lastChild);
    }

    // 非同期の完了まで待つ
    return new Promise(function(resolve, reject) {
      navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        // デバイス情報 MediaDeviceInfo の内容
        //   // deviceId       ：（デバイスID)
        //   // kind           ：（種類：　audioinput, videoinput, audiooutput ）
        //   //                  ※ audiooutput は Chromeのみ
        //   // label （名称） ：取得できる場合と、できない場合がある
        //   // groupId        ：同一ハード機器内のデバイスでは同じになる仕様（けど、まだ？）
          devices.forEach((device,index) => {
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
              // 指定要素にデバイス情報を要素で追加
              const p = document.createElement('p');
              p.innerHTML = `*** [${index}] ***` 
                            + "<br>"
                            + `Kind: ${device.kind}` 
                            + "<br>" 
                            + `Label: ${device.label}`
                            + "<br>" 
                            + `Device Id: ${device.deviceId}`
                            + "<br>" 
                            + `Group Id: ${device.groupId}`
              $divListCameraDevices.appendChild(p);
              // カメラデバイスを取得する
              camera_device_ids.pop[device.deviceId];
            }
          });
          resolve('OK');
      })
      .catch(function(err) {
        reject(err.message);
      });
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

  // ===============================================================
  //
  // 音声再生
  //
  // ===============================================================
  // 音声の再生
  const musicCountDown = document.getElementById('sound-countdown');
  const musicShutter = document.getElementById('sound-shutter');
  const textSoundStatus = document.getElementById('soundStatus');

  // カウントダウン音声
  function play_countdown() {
    // ライトOn
    fromHTML_Light_On();

    // 次の操作をわかりやすくする。
    document.getElementById('btn_image_shutter').classList.remove('fluffy_slime');
    document.getElementById('btn_image_save').classList.remove('fluffy_slime');
    
    // videoタグの表示
    video.classList.remove("item-hide");
    video.classList.add("item-show");
    // canvasタグの非表示
    $canvas_Photo.classList.remove("item-show");
    $canvas_Photo.classList.add("item-hide");

    textSoundStatus.textContent="nowPlaying";
    // 先頭から再生
    musicCountDown.currentTime = 0;
    musicCountDown.play();  // 再生
  };

  // シャッター音声
  function play_shutter() {
    textSoundStatus.textContent="nowPlaying";
    // 先頭から再生
    musicShutter.currentTime = 0;
    musicShutter.play();  // 再生
  };

  // カウントダウン音声完了時
  musicCountDown.addEventListener("ended", function () {
    textSoundStatus.textContent="ended";
    // 次回開始のため
    musicCountDown.pause();
    musicCountDown.currentTime = 0;

    // -----------------------------------
    // 必要な処理を行う
    // -----------------------------------
    // シャッター音を鳴らす。
    // play_shutter();
    // 撮影処理を行う。
    take_Photo();
    // -----------------------------------
    // 次の操作をわかりやすくする。
    document.getElementById('btn_image_shutter').classList.remove('fluffy_slime');
    document.getElementById('btn_image_save').classList.add('fluffy_slime');
   }, false);

  // シャッター音声完了時
   musicShutter.addEventListener("ended", function () {
    textSoundStatus.textContent="ended";
     // 次回開始のため
     musicShutter.pause();
     musicShutter.currentTime = 0;
   }, false);

  // ===============================================================
  //
  // コマンドボタンの処理
  //
  // ===============================================================

  // [戻る]ボタン
  function btnimg_click_back() {
    // goBack();
    location.href='index.html';
  }
  // [シャッター]ボタン
  function btnimg_click_shutter() {
    // **********
    // タイムアウト
    countReset();
    // **********
    play_countdown();
  }
  // [保存ボタン]
  function btnimg_click_save() {
    // **********
    // タイムアウト
    countReset();
    // **********

    // 未撮影時は終わる
    if(!isTakePicture)
    {
      alert(
        "[撮影]ボタンをおしてください。"
        );
      return;
    }
    // 次の操作をわかりやすくする。
    document.getElementById('btn_image_shutter').classList.remove('fluffy_slime');
    document.getElementById('btn_image_save').classList.remove('fluffy_slime');

    // TryOn処理
    // Avatar_TryOnProc();
    Item_Avatar_TryOn_Proc();
  }

  // ===============================================================
  //
  // モーダルウィンドウ
  // dotinstallを参照
  // 
  // ===============================================================
  // 要素の定数か
  const cancel = document.getElementById('cancel');
  const accept = document.getElementById('accept');
  const reuseAvatar = document.getElementById('reuseAvatar');
  
  const mask = document.getElementById("mask");
  const modal = document.getElementById("modal");

  // [もどる]
  function cancel_click() {
    goBack();
  }
  // [すすむ]
  function accept_click() {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
    // カメラの開始
    syncCamera(video);
  }

  // // アバターの再利用
  // reuseAvatar.addEventListener('click', () => {
  //   modal.classList.add('hidden');
  //   mask.classList.add('hidden');
  //   // すぐにTryOn
  //   Reuse_Avatar_TryOnProc();
  // });
 
  // ===============================================================
  //
  // 起動時処理
  //
  // ===============================================================
  function jsCameraStart() {
    init_camera();
    //--------------------------------------------------
    // カメラの開始は、ユーザーの行動でしなければならない
    // そのため開始はしない。
    // OK後が遅いから即
    // カメラの開始
    //--------------------------------------------------
    //syncCamera(video);
    init_items();
  }
  async function init_camera() {
    // カメラデバイス情報の取得
    document.getElementById('camera-status').textContent='v 検索中...';
    try
    {
      await getCameraDevices()
      .then(
        function( response  ) {
          // 正常結果
          console.log(`[OK]init_camera : ${response}`);
        },
        function( error ) {
          //エラー処理を記述する
          console.log(`[NG]init_camera : ${error}`);
        }
      )
      document.getElementById('camera-status').textContent='v 検索完了';
    }
    catch(e)
    {
      document.getElementById('camera-status').textContent='v 検索失敗';
    }

    // カメラ接続
    let mode_SmartPhone = false;
    if(mode_SmartPhone)
    {
      // *******************************************
      // スマホ版
      // 背面カメラを使う
      // *******************************************
      useFront = false;
      CONSTRAINTS.video.facingMode = (useFront)?  "user":{ exact: "environment" };
    }
    else
    {
    // *******************************************
    // いつも2番目で開始する。
    // このやり方が正しいかわかりません。
    // でも、DeviceID, GroupIDが毎回違うため
    // どうしたらいいか？？？？？？？
    // *******************************************
      CONSTRAINTS.video.facingMode = null;
      if(camera_device_ids.length == 2)
      {
        CONSTRAINTS.video.deviceId = camera_device_ids[1];
      }
    }
    // モーダルの「もどる」「すすむ」を表示
    // cancel.classList.remove('hidden');
    //accept.classList.remove('hidden');
    
    // 表示・非表示
    video.classList.add("item-show");
    // canvasタグの表示
    $canvas_Photo.classList.add("item-hide");
    return;
  };

  // アイテム用の初期画像
  function init_items() {
    // 初期画像の表示
    drawImageBase();				// #image1に画像を描画
    drawImageIcon();				// #image2にテキストを描画
  }

  // ===============================================================
  //
  // 終了時処理
  //
  // ===============================================================
  //
  // 終了する。(前のページに戻る)
  // 
  function goBack() {
    stopCamera();
    history.back();
  }



  // ===============================================================
  //
  // アイテム画像の要素処理
  //
  // ===============================================================
  /**
    * [onload] Tシャツの画像を描画
    */
  function drawImageBase(){
    const tshirts = new Image();
    tshirts.src = "img/t-org-small.jpg";
    tshirts.onload = () =>{
      const canvas = document.querySelector("#image-base");
      canvas.height = tshirts.height;
      canvas.width = tshirts.width;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(tshirts, 0, 0, canvas.width, canvas.height);

      const image_item = document.querySelector("#resultItemPict");
      image_item.height= tshirts.height;
      image_item.width = tshirts.width;
    }
  }

  /**
  * [onload] アイコンの画像を描画
  */
  function drawImageIcon(){
    const Unaju = new Image();
    Unaju.src = "img/OSUSUME.webp";
    Unaju.onload = () =>{
      const canvas = document.querySelector("#image-icon");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(Unaju, 0, 0, canvas.width, canvas.height);
    }
    // const canvas = document.querySelector("#image2");
    // const ctx = canvas.getContext("2d");
    // ctx.font = "32px serif";
    // ctx.fillStyle = "Red";
    // ctx.fillText("うな重", 45, 150);
  }

  /**
  * Canvasをすべて削除する
  *
  * @param {string} target 対象canvasのid
  * @return {void}
  */
  function eraseCanvas(target){
    const canvas = document.querySelector(target);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
  * Canvasを画像として取得
  *
  * @param {string} id  対象canvasのid
  * @return {object}
  */
  function getImagefromCanvas(id){
    return new Promise((resolve, reject) => {
      const image = new Image();
      const ctx = document.querySelector(id).getContext("2d");
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
      image.src = ctx.canvas.toDataURL();
    });
  }
  // ===============================================================
  //
  // アイテム画像の作成処理
  //
  // ===============================================================
  // [Tシャツのロゴを作成]キャプチャー処理
  function itemIconCreate()
  {
    debugConsole_proc('itemIconCreate button');
    $canvasCapture.width  = video_item.videoWidth;
    $canvasCapture.height = video_item.videoHeight;
    $canvasCapture.getContext('2d').drawImage(video_item, 0, 0);  // canvasに『「静止画取得」ボタン』押下時点の画像を描画
    // アイコンの切り出し
    cutIcon(video_item);
    // Tシャツとアイコンの合成
    concatCanvas("#resultItemPict", ["#image-base", "#image-icon"]);
    // 後処理
    itemPict_Result();

    isTakeItemPicture = true;
  }
  // そのままをアイテム
  function itemNormalPicutreCreate() {
    debugConsole_proc('itemIconCreate button');
    $canvasCapture.width  = video_item.videoWidth;
    $canvasCapture.height = video_item.videoHeight;
    $canvasCapture.getContext('2d').drawImage(video_item, 0, 0);  // canvasに『「静止画取得」ボタン』押下時点の画像を描画
    // 画像を表示
    pictCanvas("#resultItemPict", ["#canvas-capture"]);
    // 後処理
    itemPict_Result();

    isTakeItemPicture = true;
  }
  // アイコンエリアを切り出して表示
  function cutIcon(asset){
    const canvas = document.querySelector("#image-icon");
    const ctx = canvas.getContext("2d");

    // 元画像はそのまま表示する。
    // ctx.drawImage(asset, 0, 0, canvas.width, canvas.height);
    // 画像を切り出して表示
    ctx.drawImage(
                    asset,
                    //------------------------
                    // 切り出しエリア
                    // 中央部を切り出すため
                    //------------------------
                    (video_item.videoWidth - ICON_WIDTH) / 2,   // x
                    (video_item.videoHeight - ICON_HEIGHT) / 2, // y
                    ICON_WIDTH,                       // width
                    ICON_HEIGHT,                      // height
                    //------------------------
                    // 貼り付け位置
                    //------------------------
                    0, 0, ICON_WIDTH, ICON_HEIGHT     // 貼り付け位置(x, y, width, height)
                  );
  }
  /**
  * Canvas合成
  *
  * @param {string} base 合成結果を描画するcanvas(id)
  * @param {array} asset 合成する素材canvas(id)
  * @return {void}
  */
  async function concatCanvas(base, asset){
    const canvas = document.querySelector(base);
    const ctx = canvas.getContext("2d");

    // 画面のサイズを変更
    canvas.height= document.querySelector("#image-base").height;
    canvas.width = document.querySelector("#image-base").width;
    
    for(let i=0; i<asset.length; i++){
      const image1 = await getImagefromCanvas(asset[i]);
      if(i == 0)
      {
        // 元画像はそのまま表示する。
        ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
      }
      else
      {
        // 上に合成する画像は、表示位置の始点を指定する。
        // 位置を指定して画像を出力
        ctx.drawImage(image1, ICON_LOC_X, ICON_LOC_Y, ICON_WIDTH, ICON_HEIGHT);
      }
    }
    // プレビュー画像の貼り付け
    const result = document.getElementById("resultItemPict");
    const preview = document.getElementById("resultItemPreview");
    const area = document.getElementById('video-container-item-create');
    // サイズをビデオのエリアサイズと同じに
    // https://blanktar.jp/blog/2015/04/html-canvas-copy
    preview.width  = area.clientWidth;
    preview.height = area.clientHeight;
    let image = result.getContext('2d').getImageData(0, 0, result.width, result.height);
    // 左上が起点で描画
    // preview.getContext('2d').putImageData(image, 0, 0);  // canvasに『「静止画取得」ボタン』押下時点の画像を描画
    // 中央に表示
    let top = 0;
    let left = 0;
    if((0 < (result.height - preview.height)) || (0 < (result.width - preview.width)))
    {
      top = (result.height - preview.height) / 2;
      left = (result.width - preview.width) / 2;
      top = top * -1;
      left = left * -1;      
    }
    preview.getContext('2d').putImageData(image, left, top);  // canvasに『「静止画取得」ボタン』押下時点の画像を描画
  }
  /**
  * Canvas合成
  *
  * @param {string} base 合成結果を描画するcanvas(id)
  * @param {array} asset 合成する素材canvas(id)
  * @return {void}
  */
   async function pictCanvas(base, asset){
    const canvas = document.querySelector(base);
    const ctx = canvas.getContext("2d");

    // 画面のサイズを変更
    canvas.height= document.querySelector(asset[0]).height;
    canvas.width = document.querySelector(asset[0]).width;
    
    for(let i=0; i<asset.length; i++){
      const image1 = await getImagefromCanvas(asset[i]);
      if(i == 0)
      {
        // 元画像はそのまま表示する。
        ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
      }
      else
      {
        // 上に合成する画像は、表示位置の始点を指定する。
        // 位置を指定して画像を出力
        ctx.drawImage(image1, ICON_LOC_X, ICON_LOC_Y, ICON_WIDTH, ICON_HEIGHT);
      }
    }
    // プレビュー画像の貼り付け
    const result = document.getElementById("resultItemPict");
    const preview = document.getElementById("resultItemPreview");
    const area = document.getElementById('video-container-item-create');
    // サイズをビデオのエリアサイズと同じに
    // https://blanktar.jp/blog/2015/04/html-canvas-copy
    preview.width  = area.clientWidth;
    preview.height = area.clientHeight;
    let image = result.getContext('2d').getImageData(0, 0, result.width, result.height);
    // 左上が起点で描画
    // preview.getContext('2d').putImageData(image, 0, 0);  // canvasに『「静止画取得」ボタン』押下時点の画像を描画
    // 中央に表示
    let top = 0;
    let left = 0;
    if((0 < (result.height - preview.height)) || (0 < (result.width - preview.width)))
    {
      top = (result.height - preview.height) / 2;
      left = (result.width - preview.width) / 2;
      top = top * -1;
      left = left * -1;      
    }
    preview.getContext('2d').putImageData(image, left, top);  // canvasに『「静止画取得」ボタン』押下時点の画像を描画
  }


}