{
  // ログイン
  let keyOfToken =  '';
  let username = '';
  let password = '';              
  let isLogIn = false;            // ログイン状態(T:ログイン中/F:未ログイン)

  // 現在選択中の画像
  let currentIndex_Avatar = 0;
  let currentIndex_Item = 0;

  //----------------------------------
  // TryOnの値
  //----------------------------------
  let uuid_tryon_avatar = "";     // TryOnのAvatar
  let uuid_tryon_item = "";       // TryOnのItem
  let uuid_tryon_result = "";     // TryOnの結果

  //----------------------------------
  // Avatar登録
  //----------------------------------
  let register_avatar_url = "";
  let register_avatar_uuid = "" ;
  let register_avatar_awsAccessKeyId = "";
  let register_avatar_policy = "";
  let register_avatar_signature = "";

  //----------------------------------
  // Item登録
  //----------------------------------
  let register_item_url = "";
  let register_item_root_uuid = "" ;
  let register_item_awsAccessKeyId = "";
  let register_item_policy = "";
  let register_item_signature = "";
  let register_item_source_uuid = "";
  

  
  //--------------------------------------------
  // ログイン状態か確認します。
  //--------------------------------------------
  function check_token()
  {
    if(isLogIn === true)
    {
      return true;
    }
    const msg = "ログインしてください";
    alert(msg);
    return false;
  }

  //********************************************
  // ログインします。
  //********************************************
  function LogIn(){

    // 入力値の取得
    const textbox_user = document.getElementById("username");
    const textbox_password = document.getElementById("password");
    username = textbox_user.value
    password = textbox_password.value
    // 入力チェック
    if(("" === username) || ("" === password))
    {
      const msg = "UserName/PassWord を入れてください";
      alert(msg);
      return;
    }

    // 送信先URL 
    const requestUrl = "https://social.isabq.com/api/v1/auth/login/" ;
    //Ajax通信用のオブジェクトを作成
    const xhr =new XMLHttpRequest();
    // 送信パラメータ
    let myJson = 
      {
        "username" : username
        ,
        "password" : password
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
        //通信が完了
        if(xhr.readyState == 4){
          document.getElementById("login_result").textContent = xhr.responseText;
          if(xhr.status == 200)
          {
            getJson_login(xhr.responseText);
          }
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
    // email: "hogehoge@hogehoge.com"
    // first_name: ""
    // is_content_account: false
    // is_creator: false
    // key: "alphabet and numeric"
    // last_name: ""
    // username: "hogehoge"
    // uuid: "alphabet and numeric and -"
    //------------------------------------------
    try{
      let obj = JSON.parse(response);
  
      let _key = obj.key;
      let _username = obj.username;
      let _uuid = obj.uuid;
  
      document.getElementById('result-login-key').textContent = _key;
      document.getElementById('result-login-username').textContent = _username;
      document.getElementById('result-login-uuid').textContent = _uuid;
  
      console.log("key      : " + _key);
      console.log("username : " + _username);
      console.log("uuid     : " + _uuid);
  
      // トークンの取得
      keyOfToken = obj.key;
      isLogIn = true;
      // 正常ログインとして各コマンドエリアを表示する
      area_display_after_login();
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  
  //********************************************
  // アバターリストの取得
  //********************************************
  function GetTheListOfAvaters() {
    // トークンのチェック
    if(true !== check_token())
    {
      return;
    }

    // 送信先URL 
    const requestUrl = "https://social.isabq.com/api/v1/avatars/?page=1&page_size=100" ;
    //Ajax通信用のオブジェクトを作成
    const xhr =new XMLHttpRequest();
    
    //通信方式とURLを設定   
    xhr.open("GET", requestUrl);

    // 必要なHTTPヘッダを追加します。
    xhr.setRequestHeader( 'accept', 'application/json' );
    xhr.setRequestHeader( 'Authorization', 'Token ' + keyOfToken );
    //通信を実行する
    xhr.send();

    //通信ステータスが変わったら実行される関数
    xhr.onreadystatechange = function(){
        //通信が完了
        if(xhr.readyState == 4){
          document.getElementById("list_of_avatars_result").textContent = xhr.responseText;
          if(xhr.status == 200)
          {
            getJson_get_the_list_of_avatars(xhr.responseText);
          }
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
    // 現在の状況をクリア
    clear_avatar_list();
    // 再構成
    try{

      let obj = JSON.parse(response);
      
      let count = obj.count;
      let results = obj.results;
      
      currentIndex_Avatar = 0;
      // 結果を一覧にして表示
      results.forEach((result, index) => {
        // 分解
        const img = document.createElement('img');
        const media = result.media;
        
        // 画像のプロパティにアバターデータを追加
        img.src = media.main;
        img.alt = result.uuid;
        const li = document.createElement('li');
        
        // 画像登録処理結果が'processed'のみ表示
        // ・created            完了していない
        // ・processing_failed  失敗
        // ・processed          成功
        // ・live               失敗(詳細は)
        //      status_code: 1101
        //      status_message: "Unable to process image."
        if(result.status !== 'processed'){
          // 非表示
          li.style.display = 'none';
        }
        
        // 現在の選択中
        if(index === currentIndex_Avatar)
        {
          li.classList.add('current');
        }
        // クリックされた時の処理
        li.addEventListener('click',() => {
          document.getElementById('select_avatar').textContent =  img.alt;
          uuid_tryon_avatar = img.alt;
          // thumbnailsのすべての要素を取得
          const thumbnails = document.querySelectorAll('#list_of_avaters > li');
          // 現在の付加されているcurrentを外す
          thumbnails[currentIndex_Avatar].classList.remove('current');
          // currentの更新
          currentIndex_Avatar = index;
          thumbnails[currentIndex_Avatar].classList.add('current');
        });
        
        li.appendChild(img);
        document.getElementById('list_of_avaters').appendChild(li);
        
      });
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  //
  // アバターリストをクリアします。
  // 
  function clear_avatar_list() {
    document.getElementById('list_of_avaters').innerHTML="";
  }
  
  //********************************************
  // アイテムリストの取得
  //********************************************
  function GetTheListOfItems() {
    // トークンのチェック
    if(true !== check_token())
    {
      return;
    }

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
        //通信が完了
        if(xhr.readyState == 4){
          document.getElementById("list_of_items_result").textContent = xhr.responseText;
          if(xhr.status == 200)
          {
            getJson_get_the_list_of_itemss(xhr.responseText);
          }
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
    // 現在の状況をクリア
    clear_item_list();
    // 再構成
    try {

      let obj = JSON.parse(response);
      
      let count = obj.count;
      let results = obj.results;
      
      currentIndex_Item = 0;
      
      // 結果を一覧にして表示
      results.forEach((result, index) => {
        // 分解
        const img = document.createElement('img');
        const media = result.media;
        // 画像のプロパティにアイテムデータを追加
        img.src = media.small;
        img.alt = result.uuid;
        const li = document.createElement('li');
        
        // 画像登録処理結果が'processed'のみ表示
        // ・created            完了していない
        // ・processing_failed  失敗
        // ・processed          成功
        //      status_code: 1101
        //      status_message: "Unable to process image."
        if(result.status !== 'processed'){
          // 非表示
          li.style.display = 'none';
        }
        // 現在の選択中
        if(index === currentIndex_Item)
        {
          li.classList.add('current');
        }
        
        // クリックされた時の処理
        li.addEventListener('click',() => {
          document.getElementById('select_item').textContent =  img.alt;
          uuid_tryon_item = img.alt;
          
          // thumbnailsのすべての要素を取得
          const thumbnails = document.querySelectorAll('#list_of_items > li');
          // 現在の付加されているcurrentを外す
          thumbnails[currentIndex_Item].classList.remove('current');
          // currentの更新
          currentIndex_Item = index;
          thumbnails[currentIndex_Item].classList.add('current');
        });
        li.appendChild(img);
        document.getElementById('list_of_items').appendChild(li);
      });
    }
    catch(e) {
      console.log(e.message);
    }
  }
  //
  // アイテムリストをクリアします。
  // 
  function clear_item_list() {
    document.getElementById('list_of_items').innerHTML="";
  }

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


  //********************************************
  //
  // Avatarの登録
  //
  //********************************************

  //********************************************
  // AWS[Avatar]へのログイン情報の取得
  //********************************************
  function register_Avatar_PreSign() {
    // トークンのチェック
    if(true !== check_token())
    {
      return;
    }
    // 確認画面
    var res = confirm("Avatar登録しますか？");
    if( res === true ) {
        // OKならなにもしない
    }
    else {
        // キャンセルならアラートボックスを表示
        alert("中止します。");
        return;
    }
    // 送信先URL 
    const requestUrl = "https://social.isabq.com/api/v1/aws/avatar_signed_url/" ;
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
          getJson_register_Avatar_PreSign(xhr.responseText);
        }
    }
  }
  //--------------------------------------------
  // AWS[Avatar]へのログイン情報のJsonの解釈
  //--------------------------------------------
  function getJson_register_Avatar_PreSign(response){
    //------------------------------------------
    // 取得できるJSON
    //------------------------------------------
    // {
    //  "url":"https://formatech-mobile-avatars.s3.amazonaws.com/",
    //  "fields":
    //  {
    //    "key":"788dbc9c-f80c-4fc9-b5c0-a23ca470fd80",
    //    "AWSAccessKeyId":"AKIASXHIMETGAXPX22P6",
    //    "policy":"eyJleHBpcmF0aW9uIjogIjIwMjEtMDItMjVUMDU6NTA6NDFaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiZm9ybWF0ZWNoLW1vYmlsZS1hdmF0YXJzIn0sIHsia2V5IjogIjc4OGRiYzljLWY4MGMtNGZjOS1iNWMwLWEyM2NhNDcwZmQ4MCJ9XX0=",
    //    "signature":"aO8mOkwHCmKE8Ozdo3ycaBIOEg4="
    //  },
    //  "uuid":"788dbc9c-f80c-4fc9-b5c0-a23ca470fd80"
    // }
    //------------------------------------------
    document.getElementById("result_register_Avatar_PreSign").textContent = response;
    //------------------------------
    // 分解
    //------------------------------
    let obj = JSON.parse(response);
    const fields = obj.fields;
    //------------------------------
    //------------------------------
   // 保存するべき情報
   //------------------------------
   register_avatar_url =obj.url;
   register_avatar_uuid = fields.key;
   register_avatar_awsAccessKeyId = fields.AWSAccessKeyId;
   register_avatar_policy = fields.policy;
   register_avatar_signature = fields.signature;

   //------------------------------
   // デバッグ画面表示
   //------------------------------
    document.getElementById("aws-avatar-url").textContent = register_avatar_url;
    document.getElementById("aws-avatar-key").textContent = register_avatar_uuid;
    document.getElementById("aws-avatar-AWSkey").textContent = register_avatar_awsAccessKeyId;
    document.getElementById("aws-avatar-policy").textContent = register_avatar_policy;
    document.getElementById("aws-avatar-signature").textContent = register_avatar_signature;
    document.getElementById("aws-avatar-uuid").textContent = obj.uuid;

  }
  //********************************************
  // AWS[Avatar]への画像登録処理
  //********************************************
  function register_Avatar()
  {
    register_Avatar_Data();
  }
  async function register_Avatar_Data() {
    // トークンのチェック
    if(true !== check_token())
    {
      return;
    }
    try{
      // 送信先URL
      const requestUrl = "https://formatech-mobile-avatars.s3.amazonaws.com/";
      
      // CanvasをBlobの値に変換する
      const canvas = document.getElementById("canvas-capture");
      let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));


      // 送信パラメータに変換する
      let formData = new FormData();
      formData.append("key",              register_avatar_uuid);
      formData.append("AWSAccessKeyId",   register_avatar_awsAccessKeyId);
      formData.append("policy",           register_avatar_policy);
      formData.append("signature",        register_avatar_signature);
      formData.append("file",             imageBlob, "avatar.jpeg");

      
      var xhr = new XMLHttpRequest();
      xhr.open("POST", requestUrl);
      xhr.send(formData);
      //通信ステータスが変わったら実行される関数
      xhr.onreadystatechange = function(){

        console.log('');
          //通信が完了
          if(xhr.readyState == 4){
            getJson_register_Avatar_Data(xhr.responseText);
          }
      }
  
    }
    catch(e)
    {
      console.log(e.message);
      // document.getElementById("proc-result").textContent = e.message;
    }
  }
  //--------------------------------------------
  // AWS[Avatar]への画像登録処理のJsonの解釈
  //--------------------------------------------
  function getJson_register_Avatar_Data(response){
    //------------------------------------------
    // 取得できるJSON
    //------------------------------------------
    // {
    //  "url":"https://formatech-mobile-avatars.s3.amazonaws.com/",
    //  "fields":
    //  {
    //    "key":"788dbc9c-f80c-4fc9-b5c0-a23ca470fd80",
    //    "AWSAccessKeyId":"AKIASXHIMETGAXPX22P6",
    //    "policy":"eyJleHBpcmF0aW9uIjogIjIwMjEtMDItMjVUMDU6NTA6NDFaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiZm9ybWF0ZWNoLW1vYmlsZS1hdmF0YXJzIn0sIHsia2V5IjogIjc4OGRiYzljLWY4MGMtNGZjOS1iNWMwLWEyM2NhNDcwZmQ4MCJ9XX0=",
    //    "signature":"aO8mOkwHCmKE8Ozdo3ycaBIOEg4="
    //  },
    //  "uuid":"788dbc9c-f80c-4fc9-b5c0-a23ca470fd80"
    // }
    //------------------------------------------

    document.getElementById("result_register_Avatar_Data").textContent = response;
  }
  
  // //********************************************
  // // AWS[Avatar]への画像登録処理
  // //********************************************
  
  //********************************************
  // AWS[Avatar]の登録後のPing
  //********************************************
  function register_Avatar_Ping() {

    // トークンのチェック
    if(true !== check_token())
    {
      return;
    }

    // 送信先URL
    const requestUrl = "https://social.isabq.com/api/v1/avatars/"+ register_avatar_uuid + "/status/" ;
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
          getJson_register_Avatar_Ping(xhr.responseText);
        }
    }
  }
  //--------------------------------------------
  // AWS[Avatar]の登録後のPingのJsonの解釈
  //--------------------------------------------
  function getJson_register_Avatar_Ping(response){
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

    document.getElementById("result_register_Avatar_Ping").textContent = response;
    let obj = JSON.parse(response);
    let status = obj.status;
  }

  //********************************************
  //
  // Itemの登録
  //
  //********************************************

  //********************************************
  // AWS[Item]へのログイン情報の取得
  //********************************************
  function register_Item_PreSign() {
    // トークンのチェック
    if(true !== check_token())
    {
      return;
    }
    // 確認画面
    var res = confirm("Item登録しますか？");
    if( res === true ) {
        // OKならなにもしない
    }
    else {
        // キャンセルならアラートボックスを表示
        alert("中止します。");
        return;
    }
    // 送信先URL 
    const requestUrl = "https://social.isabq.com/api/v1/aws/item_signed_url/" ;

    // 送信パラメータ
    let myJson =
    {
      "image_keys" : ["source"]
    };
   //JSONにエンコード
   var json_text = JSON.stringify(myJson);

    //Ajax通信用のオブジェクトを作成
    const xhr =new XMLHttpRequest();
    //通信方式とURLを設定   
    xhr.open("POST", requestUrl);

    // 必要なHTTPヘッダを追加します。
    xhr.setRequestHeader( 'accept', 'application/json' );
    xhr.setRequestHeader( 'Content-Type', 'application/json' );
    xhr.setRequestHeader( 'Authorization', 'Token ' + keyOfToken);
    //通信を実行する
    xhr.send(json_text);

    //通信ステータスが変わったら実行される関数
    xhr.onreadystatechange = function(){

      console.log('');
        //通信が完了
        if(xhr.readyState == 4){
          getJson_register_Item_PreSign(xhr.responseText);
        }
    }
  }
  //--------------------------------------------
  // AWS[Avatar]へのログイン情報のJsonの解釈
  //--------------------------------------------
  function getJson_register_Item_PreSign(response){
    //------------------------------------------
    // 取得できるJSON
    //------------------------------------------
    // {
    //    "uuid":"1b866b9f-c167-4350-b2c7-ed8c24d15b38",
	  //    "signed_urls":
	  //    {
		//      "source":
		//      {
		// 	      "url":"https://formatech-mobile-items.s3.amazonaws.com/",
		// 	      "fields":
		// 	      {
		// 		      "key":"ced5c1f4-bda1-4ae3-8b9b-681a2cacaecf",
		// 		      "AWSAccessKeyId":"AKIASXHIMETGAXPX22P6",
		// 		      "policy":"eyJleHBpcmF0aW9uIjogIjIwMjEtMDMtMDFUMDM6NTk6MTdaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiZm9ybWF0ZWNoLW1vYmlsZS1pdGVtcyJ9LCB7ImtleSI6ICJjZWQ1YzFmNC1iZGExLTRhZTMtOGI5Yi02ODFhMmNhY2FlY2YifV19",
		// 		      "signature":"c5ewXxPgOaeNyaEiuQABcCFc4hQ="
		// 	      },
		// 	      "uuid":"ced5c1f4-bda1-4ae3-8b9b-681a2cacaecf"
		//      }
    // 	  }
    // }
    //------------------------------------------
    document.getElementById("result_register_Item_PreSign").textContent = response;
    let obj = JSON.parse(response);
    //------------------------------
    // 分解
    //------------------------------
    const signed_urls = obj.signed_urls;
    const source = signed_urls.source;
    const fields = source.fields;
    //------------------------------
    // 保存するべき情報
    //------------------------------
    register_item_root_uuid = obj.uuid;
    register_item_url = source.url;
    register_item_source_uuid = fields.key;
    register_item_awsAccessKeyId = fields.AWSAccessKeyId;
    register_item_policy = fields.policy;
    register_item_signature = fields.signature;
    //------------------------------
    // デバッグ画面表示
    //------------------------------
    document.getElementById("aws-item-root-uuid").textContent = register_item_root_uuid;
    document.getElementById("aws-item-url").textContent = register_item_url;
    document.getElementById("aws-item-key").textContent = register_item_source_uuid;
    document.getElementById("aws-item-AWSkey").textContent = register_item_awsAccessKeyId;
    document.getElementById("aws-item-policy").textContent = register_item_policy;
    document.getElementById("aws-item-signature").textContent = register_item_policy;
    document.getElementById("aws-item-uuid").textContent = source.uuid;

  }

  function register_Item()
  {
    register_Item_Data();
  }
  //********************************************
  // AWS[Avatar]への画像登録処理
  //********************************************
  async function register_Item_Data() {
    // トークンのチェック
    if(true !== check_token())
    {
      return;
    }

    try{
      // 送信先URL
      const requestUrl = "https://formatech-mobile-items.s3.amazonaws.com/";
      
      // CanvasをBlobの値に変換する
      const canvas = document.getElementById("canvas-capture");
      let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
      // 送信パラメータに変換する
      let formData = new FormData();
      formData.append("key",              register_item_source_uuid);
      formData.append("AWSAccessKeyId",   register_item_awsAccessKeyId);   
      formData.append("policy",           register_item_policy);
      formData.append("signature",        register_item_signature);
      formData.append("file",             imageBlob, "item.jpeg");

      
      var xhr = new XMLHttpRequest();
      xhr.open("POST", requestUrl);
      xhr.send(formData);
      //通信ステータスが変わったら実行される関数
      xhr.onreadystatechange = function(){

        console.log('');
          //通信が完了
          if(xhr.readyState == 4){
            getJson_register_Item_Data(xhr.responseText);
          }
      }
  
    }
    catch(e)
    {
      console.log(e.message);
      // document.getElementById("proc-result").textContent = e.message;
    }
  }
  //--------------------------------------------
  // AWS[Avatar]へのへの画像登録処理のJsonの解釈
  //--------------------------------------------
  function getJson_register_Item_Data(response){
    //------------------------------------------
    // 取得できるJSON
    //------------------------------------------
    // {
    //  "url":"https://formatech-mobile-avatars.s3.amazonaws.com/",
    //  "fields":
    //  {
    //    "key":"788dbc9c-f80c-4fc9-b5c0-a23ca470fd80",
    //    "AWSAccessKeyId":"AKIASXHIMETGAXPX22P6",
    //    "policy":"eyJleHBpcmF0aW9uIjogIjIwMjEtMDItMjVUMDU6NTA6NDFaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiZm9ybWF0ZWNoLW1vYmlsZS1hdmF0YXJzIn0sIHsia2V5IjogIjc4OGRiYzljLWY4MGMtNGZjOS1iNWMwLWEyM2NhNDcwZmQ4MCJ9XX0=",
    //    "signature":"aO8mOkwHCmKE8Ozdo3ycaBIOEg4="
    //  },
    //  "uuid":"788dbc9c-f80c-4fc9-b5c0-a23ca470fd80"
    // }
    //------------------------------------------

    document.getElementById("result_register_Item_Data").textContent = response;
  }
  
  //********************************************
  // AWS[Item]の登録後のPing
  //********************************************
  function register_Item_Ping() {
    // トークンのチェック
    if(true !== check_token())
    {
      return;
    }

    // 送信先URL
    const requestUrl = "https://social.isabq.com/api/v1/items/"+ register_item_root_uuid + "/status/" ;
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
          getJson_register_Item_Ping(xhr.responseText);
        }
    }
  }
  //--------------------------------------------
  // AWS[Item]の登録後のPingのJsonの解釈
  //--------------------------------------------
  function getJson_register_Item_Ping(response){
    //------------------------------------------
    // 取得できるJSON
    //------------------------------------------
    // {
    //   "uuid":"1b866b9f-c167-4350-b2c7-ed8c24d15b38",
    //   "status":"processed",
    //   "status_code":1000,
    //   "status_message":""
    // }
    //------------------------------------------

    document.getElementById("result_register_Item_Ping").textContent = response;
    let obj = JSON.parse(response);
    let status = obj.status;
  }

  /*
   * デバッグのため過去の値を代入する
   */
  function debugDefaultValue()
  {
    //----------------------------------
    // Avatar登録
    //----------------------------------
    register_avatar_url = "https://formatech-mobile-avatars.s3.amazonaws.com/";
    register_avatar_uuid = "e17a13ac-fe77-472c-be89-79a2d2d976fc" ;
    register_avatar_awsAccessKeyId = "AKIASXHIMETGAXPX22P6";
    register_avatar_policy = "eyJleHBpcmF0aW9uIjogIjIwMjEtMDMtMDFUMDI6NTM6MDZaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiZm9ybWF0ZWNoLW1vYmlsZS1hdmF0YXJzIn0sIHsia2V5IjogImUxN2ExM2FjLWZlNzctNDcyYy1iZTg5LTc5YTJkMmQ5NzZmYyJ9XX0=";
    register_avatar_signature = "HMWql/1oK02cdgCtDsWoXgGsvYc=";

    register_avatar_url = "https://formatech-mobile-avatars.s3.amazonaws.com/";
    register_avatar_uuid = "a23dfc9c-1c00-4fac-abb4-22abf1be5fb6" ;
    register_avatar_awsAccessKeyId = "AKIASXHIMETGAXPX22P6";
    register_avatar_policy = "eyJleHBpcmF0aW9uIjogIjIwMjEtMDMtMDFUMDc6MTA6NDBaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiZm9ybWF0ZWNoLW1vYmlsZS1hdmF0YXJzIn0sIHsia2V5IjogImEyM2RmYzljLTFjMDAtNGZhYy1hYmI0LTIyYWJmMWJlNWZiNiJ9XX0=";
    register_avatar_signature = "YiLz4NDdh3830ftkc2nTnWH9/4Q=";

    //----------------------------------
    // Item登録
    //----------------------------------
    register_item_url = "https://formatech-mobile-items.s3.amazonaws.com/";
    register_item_root_uuid = "1b866b9f-c167-4350-b2c7-ed8c24d15b38" ;
    register_item_awsAccessKeyId = "AKIASXHIMETGAXPX22P6";
    register_item_policy = "eyJleHBpcmF0aW9uIjogIjIwMjEtMDMtMDFUMDM6NTk6MTdaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAiZm9ybWF0ZWNoLW1vYmlsZS1pdGVtcyJ9LCB7ImtleSI6ICJjZWQ1YzFmNC1iZGExLTRhZTMtOGI5Yi02ODFhMmNhY2FlY2YifV19";
    register_item_signature = "c5ewXxPgOaeNyaEiuQABcCFc4hQ=";
    register_item_source_uuid = "ced5c1f4-bda1-4ae3-8b9b-681a2cacaecf";
    start();
  }

  //======================================================================
  // 待ち時間処理を作ろう
  //======================================================================
  //
  // 待ち時間処理
  //
  function sleep(msec) {
    return new Promise(function(resolve) {
      setTimeout(function() {resolve()}, msec);
    })
  }
  //
  // 待ち時間開始
  //
  async function start() {
    console.log("待ってます.....");
    await sleep(5000);
    console.log("5秒経過しました！");
  }
  //
  // pingの待ち時間処理
  //
  async function ping_wait()
  {
    const waitms = 700;
    console.log('待ってます.....');
    await sleep(waitms);
    console.log(`${waitms}経過しました。`);
  }
  //======================================================================
}