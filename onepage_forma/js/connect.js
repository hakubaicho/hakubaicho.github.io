// 'use strict';
{
  // ===================================================
  // 
  // htmlから上位システムを呼び出す
  // Andoridに対応するメソッドを記載してください。
  // 
  // ===================================================

  //----------------------------------------------------
  // 終了させます。
  //----------------------------------------------------
  function call_exit()
  {
    try
    {
      // androidにも送信する。
      android.fromHTML_call_exit();
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  //----------------------------------------------------
  // 印刷します。
  //----------------------------------------------------
  function call_print(paramSize)
  {
    try
    {
      android.fromHTML_call_print(paramSize);
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  function fromHTML_call_Loaded(pagecode)
  {
    try
    {
      android.fromHTML_call_Loaded(pagecode);
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  //
  // index.htmlのLoad時にデータを取得する。
  //
  function fromHTML_call_Loaded_pageindex(){
    let ret;
    try
    {
      ret = android.fromHTML_call_Loaded_pageindex();
      ret = ret.split(',');
    }
    catch(e)
    {
      console.log(e.message);
      ret = e.message;
      ret= ['パラメータ１', 'パラメータ２'];
    }
    return ret;
  }
  //
  // camera.htmlのLoad時に、Username, passwordを取得する
  //
  function fromHTML_call_Loaded_pagecamera(){
    let ret;
    try
    {
      ret = android.fromHTML_call_Loaded_pagecamera();
      ret = ret.split(',');
    }
    catch(e)
    {
      console.log(e.message);
      ret = e.message;
      ret= ['ipahkg', 'ipahkg123'];
    }
    return ret;
  }
  //
  // order.htmlのLoad時に、アイテム詳細を取得する。
  //
  function fromHTML_call_Loaded_pageorder(){
    let ret;
    try
    {
      ret = android.fromHTML_call_Loaded_pageorder();
      ret = ret.split(',');
    }
    catch(e)
    {
      console.log(e.message);
      ret = e.message;
      ret= ['ipahkg', 'ipahkg123'];
    }
    return ret;
  }
  //
  // 選択されているカテゴリをAndoridに送信します。
  // 
  function fromHTML_call_Set_Category(tag1,tag2,tag3) {
    try
    {
      android.fromHTML_call_Set_Category(
                                          tag1,
                                          tag2,
                                          tag3
                                            );
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  //
  // 選択されているカテゴリを取得します。
  //
  function fromHTML_call_Get_Category() {
    let ret;
    try
    {
      ret = android.fromHTML_call_Get_Category();
      ret = ret.split(',');
    }
    catch(e)
    {
      console.log(e.message);
      ret = e.message;
      ret = ['','',''];
    }
    return ret;
  }
  //
  // 選択中のアイテムを送る
  //
  function fromHTML_call_Set_Item(uuid, itemname, designID, designsrc, wearedImageSrc,tag1,tag2,tag3) {
    try
    {
      android.fromHTML_call_Set_Item(
                                          uuid,
                                          itemname,
                                          designID,
                                          designsrc,
                                          wearedImageSrc,
                                          tag1,
                                          tag2,
                                          tag3
                                            );
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  //
  // 選択中のアイテムを送る
  //
  function fromHTML_call_Set_ItemFullData(
                                          tag1, tag2, tag3, 
                                          kind, 
                                          remark01, remark02, remark03, remark04, remark05, remark06, remark07,remark08,remark09,remark10,
                                          designsrc, wearedImageSrc, formaSrc,
                                          uuid) 
  {
    try
    {
      android.fromHTML_call_Set_ItemFullData(
                                          tag1, tag2, tag3,
                                          kind, 
                                          remark01, remark02, remark03, remark04, remark05, remark06, remark07,remark08,remark09,remark10,
                                          designsrc, wearedImageSrc, formaSrc,
                                          uuid
                                            );
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  //
  // 商品の金額を取得します。
  //
  function fromHTML_call_Get_ItemPrice() {
    let ret;
    try
    {
      ret = android.fromHTML_call_Get_ItemPrice();
    }
    catch(e)
    {
      console.log(e.message);
      ret = e.message;
      ret= '9,999';
    }
    return ret;
  }
  //
  // アバターUUIDをセットします。
  // 
  function fromHTML_call_Set_AvatarUUID(uuid){
    try
    {
      android.fromHTML_call_Set_AvatarUUID(uuid);
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  //
  // アバターUUIDを取得します。
  // 
  function fromHTML_call_Get_AvatarUUID(uuid){
    let ret = '';
    try
    {
      ret = android.fromHTML_call_Get_AvatarUUID();
    }
    catch(e)
    {
      console.log(e.message);
    }
    return ret;
  }
  //
  // アバターUUIDを取得します。
  // 
  function fromHTML_call_Get_ItemUUID(uuid){
    let ret;
    try
    {
      ret = android.fromHTML_call_Get_ItemUUID();
    }
    catch(e)
    {
      console.log(e.message);
      ret = e.message;
      ret= '';
    }
    return ret;
  }
  //----------------------------------------------------
  // KEYTOKENを取得します。
  //----------------------------------------------------
  function request_Token()
  {
    try
    {
      android.fromHTML_request_Token();
    }
    catch(e)
    {
      console.log(e.message);
    }
  }


  // ===================================================
  // 
  // 上位システムからhtmlを呼び出す
  // Andoridに対応するメソッドを記載してください。
  // 
  // ===================================================
  // アンドロイドが呼び出す処理
  function toHTML_Token(message)
  {
    document.getElementById("from-android-token").textContent = message;
  }
}