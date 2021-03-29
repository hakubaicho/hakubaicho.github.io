// 'use strict';
{
  // ===================================================
  // 
  // htmlから上位システムを呼び出す
  // Andoridに対応するメソッドを記載してください。
  // 
  // ===================================================

  //----------------------------------------------------
  // 前のページに戻る
  //----------------------------------------------------
  function html_backpagge() {
    history.back();
  }
  //----------------------------------------------------
  // 終了させます。
  //----------------------------------------------------
  function call_exit()
  {
    try
    {
      android.fromHTML_call_exit();
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  function call_print()
  {
    try
    {
      android.fromHTML_call_print();
    }
    catch(e)
    {
      console.log(e.message);
    }
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
    catch
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