{
  const keyOfToken =  '4b555f031acea73af4b5c63e98fc51b5bf72a369';

  let uuid_avatar = "";
  let uuid_item = "";
  
  let uuid_tryon = "";

  let items = new Array();
  let avatars = new Array();

  //********************************************
  // ログインします。
  //********************************************
  function LogIn(){
    // 送信先URL 
    const requestUrl = "https://social.isabq.com/api/v1/auth/login/" ;
    //Ajax通信用のオブジェクトを作成
    const xhr =new XMLHttpRequest();
    // 送信パラメータ
    let myJson = 
      {
        "username" : "ipahkg"
        ,
        "password" : "ipahkg123"
      };
    //JSONにエンコード
    var json_text = JSON.stringify(myJson);
    
    //通信方式とURLを設定   
    xhr.open("POST", requestUrl);

    // 必要なHTTPヘッダを追加します。
    // * ここでno-cache入れるとダメ* 
    // xhr.setRequestHeader( 'Cache-Control', 'no-cache' );
    xhr.setRequestHeader( 'Content-Type', 'application/json' );
    //通信を実行する
    xhr.send(json_text);

    //通信ステータスが変わったら実行される関数
    xhr.onreadystatechange = function(){

      console.log('');
        //通信が完了
        if(xhr.readyState == 4){
          getJson_login(xhr.responseText);
        }
    }
  }
  //--------------------------------------------
  // ログインJsonの解釈
  //--------------------------------------------
  function getJson_login(response){
    //------------------------------------------
    // 取得できるJSON
    //------------------------------------------
    // avatar_selected: false
    // email: "ipahkg@gmail.com"
    // first_name: ""
    // is_content_account: false
    // is_creator: false
    // key: "4b555f031acea73af4b5c63e98fc51b5bf72a369"
    // last_name: ""
    // username: "ipahkg"
    // uuid: "303ed735-55ec-422d-ba77-3f2de5b1c0d5"
    //------------------------------------------
    let obj = JSON.parse(response);

    let key = obj.key;
    let username = obj.username;
    let uuid = obj.uuid;

    document.getElementById('key').textContent = key;
    document.getElementById('username').textContent = username;
    document.getElementById('uuid').textContent = uuid;

    console.log("key      : " + key);
    console.log("username : " + username);
    console.log("uuid     : " + uuid);
  }
  
  //********************************************
  // アバターリストの取得
  //********************************************
  function GetTheListOfAvaters() {
    // 送信先URL 
    const requestUrl = "https://social.isabq.com/api/v1/avatars/?page=1&page_size=100" ;
    //Ajax通信用のオブジェクトを作成
    const xhr =new XMLHttpRequest();
    
    //通信方式とURLを設定   
    xhr.open("GET", requestUrl);

    // 必要なHTTPヘッダを追加します。
    xhr.setRequestHeader( 'accept', 'application/json' );
    xhr.setRequestHeader( 'Authorization', 'Token ' + '4b555f031acea73af4b5c63e98fc51b5bf72a369' );
    //通信を実行する
    xhr.send();

    //通信ステータスが変わったら実行される関数
    xhr.onreadystatechange = function(){

      console.log('');
        //通信が完了
        if(xhr.readyState == 4){
          getJson_get_the_list_of_avatars(xhr.responseText);
        }
    }
  }
  //--------------------------------------------
  // アバターリストJsonの解釈
  //--------------------------------------------
  function getJson_get_the_list_of_avatars(response){
    //------------------------------------------
    // 取得できるJSON
    //------------------------------------------
    // count: 9
    // next: null
    // previous: null
    // results: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // *********
    // resultsの内容
    // *********
    // media: {main: "https://s3-us-west-2.amazonaws.com/formatech-mobile-avatars/fd0faaa4-b59d-452f-97f7-23d27c86924a", ratio: 1.0873}
    // ratio: 1.0873
    // status: "processing_failed"
    // uuid: "fd0faaa4-b59d-452f-97f7-23d27c86924a"
    //------------------------------------------
    document.getElementById("list_of_avatars_result").textContent = response;
    let obj = JSON.parse(response);

    let count = obj.count;
    let results = obj.results;

    // 結果を一覧にして表示
    results.forEach((result, index) => {
      const img = document.createElement('img');
      const media = result.media;
      
      // アバターに追加
      avatars.push(result.uuid);
      img.src = media.main;
      img.alt = result.uuid;
      const li = document.createElement('li');

      // クリックされた時の処理
      li.addEventListener('click',() => {
          document.getElementById('select_avatar').textContent =  img.alt;
          uuid_avatar = img.alt;
      });

      li.appendChild(img);
      document.getElementById('list_of_avaters').appendChild(li);
    });
  }
  
  //********************************************
  // アイテムリストの取得
  //********************************************
  function GetTheListOfItems() {
    // 送信先URL 
    const requestUrl = "https://social.isabq.com/api/v1/items/?page=1&page_size=100" ;
    //Ajax通信用のオブジェクトを作成
    const xhr =new XMLHttpRequest();
    
    //通信方式とURLを設定   
    xhr.open("GET", requestUrl);

    // 必要なHTTPヘッダを追加します。
    xhr.setRequestHeader( 'accept', 'application/json' );
    xhr.setRequestHeader( 'Authorization', 'Token ' + keyOfToken);
    //通信を実行する
    xhr.send();

    //通信ステータスが変わったら実行される関数
    xhr.onreadystatechange = function(){

      console.log('');
        //通信が完了
        if(xhr.readyState == 4){
          getJson_get_the_list_of_itemss(xhr.responseText);
        }
    }
  }
  //--------------------------------------------
  // アイテムリストJsonの解釈
  //--------------------------------------------
  function getJson_get_the_list_of_itemss(response){
    //------------------------------------------
    // 取得できるJSON
    //------------------------------------------
    // count: 9
    // next: null
    // previous: null
    // results: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // *********
    // resultsの内容
    // *********
    // author: {uuid: "303ed735-55ec-422d-ba77-3f2de5b1c0d5", username: "ipahkg"}
    // created: "1613530067.731813"
    // deployed: "1613530067.731892"
    // handle: null
    // hashtags: []
    // is_polished: false
    // is_public: true
    // labels: []
    // like_count: 0
    // liked: false
    // link: null
    // media: {main: "https://s3-us-west-2.amazonaws.com/formatech-mobile-items/27893013-53f1-4e26-a5be-88879d4710f8", cover: null, source: "https://s3-us-west-2.amazonaws.com/formatech-mobile-items/27893013-53f1-4e26-a5be-88879d4710f8", small: "https://thumbnails.isforma.com/w300/formatech-mobile-items/27893013-53f1-4e26-a5be-88879d4710f8"}
    // product_id: null
    // ratio: 1.52
    // status: "live"
    // status_code: 1101
    // status_message: "Unable to process image."
    // title: ""
    // tryon_count: 9
    // uuid: "2614f111-e297-4006-8766-e118127969b8"
    //------------------------------------------

    document.getElementById("list_of_items_result").textContent = response;
    let obj = JSON.parse(response);

    let count = obj.count;
    let results = obj.results;

    // 結果を一覧にして表示
    results.forEach((result, index) => {

      const img = document.createElement('img');

      const media = result.media;

      img.src = media.small;
      img.alt = result.uuid;

      // アバターに追加
      items.push(result.uuid);
      const li = document.createElement('li');
      // クリックされた時の処理
      li.addEventListener('click',() => {
          document.getElementById('select_item').textContent =  img.alt;
          uuid_item = img.alt;
      });
      li.appendChild(img);
      document.getElementById('list_of_items').appendChild(li);
    });
  }
  
  //********************************************
  // TryOnの取得
  //********************************************
  function TryOn() {

    // 入力チェック
    if(("" === uuid_avatar) || ("" === uuid_item))
    {
      document.getElementById("canTryOn").textContent = "Avater / Item を選択してください";

      return;
    }
    // 送信先URL 
    const requestUrl = "https://social.isabq.com/api/v1/tryons/async/" ;
    //Ajax通信用のオブジェクトを作成
    const xhr =new XMLHttpRequest();
    // 送信パラメータ
    let myJson =
      {
        "avatars" : [{"uuid" : `${uuid_avatar}`}],
        "items" : [{"uuid" : `${uuid_item}`}]
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
    uuid_tryon = obj.uuid;
    document.getElementById("tryon_uuid").textContent = uuid_tryon; 
  }
  
  //********************************************
  // TryOnPingの取得
  //********************************************
  function TryOnPing() {
    // 入力チェック
    if ("" === uuid_tryon)
    {
      document.getElementById("tryonping_result").textContent = "TryOnのUUIDがありません";
      return;
    }
    // 送信先URL 
    const requestUrl = "https://social.isabq.com/api/v1/tryons/"+ uuid_tryon + "/async_status/" ;
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