'use strict';
{
  // ===================================================
  // 
  // htmlから上位システムを呼び出す
  // Andoridに対応するメソッドを記載してください。
  // 
  // ===================================================


  // 終了させます。
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
}