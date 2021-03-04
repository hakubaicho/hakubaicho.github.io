{
  //********************************************
  //
  // TryOn処理
  //
  //********************************************
  //
  // TryOnを開始から終了まで行います。
  // 
  function TryOnProc() {
    //----------------------------------------
    // AvatarとItemを指定してTryOnに送信する
    //----------------------------------------
}
//********************************************
// TryOnの取得
//********************************************
function TryOn() {

  // トークンのチェック
  if(true !== check_token())
  {
    return;
  }

  // 入力チェック
  if(("" === uuid_tryon_avatar) || ("" === uuid_tryon_item))
  {
    const msg = "Avater / Item を選択してください";
    document.getElementById("canTryOn").textContent = msg;
    alert(msg);
    return false;
  }
  // 送信先URL 
  const requestUrl = "https://social.isabq.com/api/v1/tryons/async/" ;
  //Ajax通信用のオブジェクトを作成
  const xhr =new XMLHttpRequest();
  // 送信パラメータ
  let myJson =
    {
      "avatars" : [{"uuid" : `${uuid_tryon_avatar}`}],
      "items" : [{"uuid" : `${uuid_tryon_item}`}]
    };
  //JSONにエンコード
  var json_text = JSON.stringify(myJson);
  //通信方式とURLを設定   
  xhr.open("POST", requestUrl);

  // 必要なHTTPヘッダを追加します。
  // * ここでno-cache入れるとダメ* 
  // xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
  xhr.setRequestHeader( 'Content-Type', 'application/json' );
  xhr.setRequestHeader( 'Authorization', 'Token ' + keyOfToken);
  //通信を実行する
  xhr.send(json_text);

  //通信ステータスが変わったら実行される関数
  xhr.onreadystatechange = function(){
    console.log('');
      //通信が完了
      if(xhr.readyState == 4){
        getJson_tryon(xhr.responseText);
      }
  }
  return true;
}
//--------------------------------------------
// TryOnのJsonの解釈
//--------------------------------------------
function getJson_tryon(response){
  //------------------------------------------
  // 取得できるJSON
  //------------------------------------------
  // {
  //  "uuid":"8bab9cc3-6559-4321-b439-b19dd5f7edb7",
  //  "media":null,
  //  "ratio":1.52,
  //  "avatar":
  //  {
  //    "uuid":"d4d876b6-6c68-4aee-9d78-7de100988c08",
  //    "media":
  //    {
  //      "main":"https://cdn.isforma.com/mobile_default_avatars/c49e60a8-6546-4973-b255-252686714f8a.jpg",
  //      "ratio":1.52
  //    },
  //    "ratio":1.52,
  //    "status":"processed"
  //  },
  //  "items":
  //  [
  //  {
  //    "uuid":"dbf2fccc-a96f-4173-9ae5-bc25a38fd2a3",
  //    "media":
  //    {
  //      "main":"https://s3-us-west-2.amazonaws.com/formatech-mobile-items/a7dc29dc-adf5-44ea-8309-71dd53518d23",
  //      "cover":null,
  //      "source":"https://s3-us-west-2.amazonaws.com/formatech-mobile-items/a7dc29dc-adf5-44ea-8309-71dd53518d23",
  //      "small":"https://thumbnails.isforma.com/w300/formatech-mobile-items/a7dc29dc-adf5-44ea-8309-71dd53518d23"
  //    },
  //    "ratio":1.52,
  //    "title":"",
  //    "link":null,
  //    "liked":false,
  //    "like_count":0,
  //    "status":"processed",
  //    "hashtags":
  //    [
  //    ],
  //    "author":
  //    {
  //      "uuid":"303ed735-55ec-422d-ba77-3f2de5b1c0d5",
  //      "username":"ipahkg"
  //    },
  //    "created":"1612406803.207532",
  //    "deployed":"1612406803.207613",
  //    "tryon_count":7
  //  }
  //  ]
  //  ,"status":"created",
  //  "caption":"",
  //  "is_public":false,
  //  "author":{"uuid":"303ed735-55ec-422d-ba77-3f2de5b1c0d5","username":"ipahkg","profile_picture":null,"is_creator":false},"created":"1613984390.615021","modified":"1613984390.615325","hashtags":[],"liked":false,"like_count":0}
  //------------------------------------------
  document.getElementById("tryon_result").textContent = response;
  let obj = JSON.parse(response);

  // TryOn中のUUIDを更新
  let count = obj.count;
  let results = obj.results;
  uuid_tryon_result = obj.uuid;
  document.getElementById("tryon_uuid").textContent = uuid_tryon_result; 
}

//********************************************
// TryOnPingの取得
//********************************************
function TryOnPing() {
  // トークンのチェック
  if(true !== check_token())
  {
    return;
  }
  // 入力チェック
  if ("" === uuid_tryon_result)
  {
    document.getElementById("tryonping_result").textContent = "TryOnのUUIDがありません";
    return;
  }
  // 送信先URL 
  const requestUrl = "https://social.isabq.com/api/v1/tryons/"+ uuid_tryon_result + "/async_status/" ;
  //Ajax通信用のオブジェクトを作成
  const xhr =new XMLHttpRequest();
  //通信方式とURLを設定   
  xhr.open("GET", requestUrl);

  // 必要なHTTPヘッダを追加します。
  // * ここでno-cache入れるとダメ* 
  // xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
  xhr.setRequestHeader( 'Content-Type', 'application/json' );
  xhr.setRequestHeader( 'Authorization', 'Token ' + keyOfToken);
  //通信を実行する
  xhr.send();

  //通信ステータスが変わったら実行される関数
  xhr.onreadystatechange = function(){

    console.log('');
      //通信が完了
      if(xhr.readyState == 4){
        getJson_tryonping(xhr.responseText);
      }
  }
}
//--------------------------------------------
// TryOnPingのJsonの解釈
//--------------------------------------------
function getJson_tryonping(response){
  //------------------------------------------
  // 取得できるJSON
  //------------------------------------------
  // {
  // "uuid":"3b1c5004-a4dd-4454-ac4a-5d8906176d8c",
  // "media":
  //    {
  //      "main":"https://s3-us-west-2.amazonaws.com/formatech-public/b503edc8-1f9e-47db-ac36-264e8847a78e.jpg",
  //      "ratio":1.52
  //    },
  // "status":"processed",
  // "status_message":""
  // }
  //------------------------------------------
  // {
  // "uuid":"b8965ea5-cda3-4777-befb-81e036bdaf3d",
  // "media":null,
  // "status":"processing_failed",
  // "status_message":"Nobody is in the photo."
  // }
  //------------------------------------------

  document.getElementById("tryonping_result").textContent = response;
  let obj = JSON.parse(response);

  let status = obj.status;
  if(status === "processed")
  {
    const media = obj.media;
    document.getElementById("tryOnResult").src = media.main;
  }
}
}