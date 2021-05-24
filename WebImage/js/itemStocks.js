// *********************************************
// 定数定義
// *********************************************
class STATUS_DESCRIPTION {
  // 期間前
  static STATUS_BEFORE = 'BEFORE';
  // 期間中
  static STATUS_BETWEEN = 'BETWEEN';
  // 期間後
  static STATUS_AFTER = 'AFTER';
}
// *********************************************
// クラス定義
// *********************************************
// 在庫クラス
class ItemStock {
  //----------------------------------
  // コンストラクタ
  //----------------------------------
  // Jancode          : JanCode
  // ColorCode        : ColorCode
  // Threshold        : 閾値
  // Count            : 現在の在庫数
  constructor(itemcode, jancode, colorCode, threshold, count)
  {
    this.ItemCode       = itemcode;
    this.Jancode        = jancode;
    this.ColorCode      = colorCode;
    this.Threshold      = threshold;
    this.Count          = count;
  }
  //----------------------------------
  // メソッド
  //----------------------------------
}
// 発売日クラス
class ItemPublish {
  //----------------------------------
  // コンストラクタ
  //----------------------------------
  // itemcode         : L9999, M9999
  // Jancode          : JanCode
  // colorcode        : ColorCode
  // publishdate      : 販売開始日付
  constructor(itemcode, jancode, colorcode, publishdate, publishdateend, pictname)
  {
    this.ItemCode       = itemcode;
    this.Jancode        = jancode;
    this.ColorCode      = colorcode;
    
    this.PublishDate    = publishdate;
    this.publishDateEnd = publishdateend;
    this.PictName       = pictname;
  }
  //----------------------------------
  // メソッド
  //----------------------------------
}
// 価格改定
class ItemPriceChange {
  //----------------------------------
  // コンストラクタ
  //----------------------------------
  // itemcode         : L9999, M9999
  // Jancode          : JanCode
  // colorcode        : ColorCode
  // nowprice         : 現在の価格
  // newprice         : 改定後価格
  // publishdate      : 価格改定日
  // publishdateend   : 価格改定ではなくなる日（pictを外す日）
  // pictname         : 「新価格」などのピクトファイル番号
  constructor(itemcode, jancode, colorcode, nowprice, newprice, publishdate, publishdateend, pictname)
  {
    this.ItemCode       = itemcode;
    this.Jancode        = jancode;
    this.ColorCode      = colorcode;

    this.NowPrice       = nowprice;
    this.NewPrice       = newprice;
    this.PublishDate    = publishdate;
    this.publishDateEnd = publishdateend;
    this.PictName       = pictname;
  }
}

// *********************************************
// インスタンスの作成
// *********************************************
const item_stock = [
  new ItemStock('L0011','60587633','DK青','4','1'),
  new ItemStock('L0021','60587641','DK青','4','1'),
  new ItemStock('L0024','62485002','黒','4','1'),
  new ItemStock('L0025','62485002','LT灰','4','1'),
]
const item_publish = [
  new ItemPublish('L0026','62485002','LG橙',  '2021/05/01','2021/06/07','1'),
  new ItemPublish('L0027','62485002','DP青緑','2021/06/01','2021/06/07','1'),
  new ItemPublish('L0028','62485002','LT青',  '2021/06/01','2021/06/07','1'),
  new ItemPublish('L0029','62485002','DK茶',  '2021/06/01','2021/06/07','1'),
]
const item_newprice = [
  new ItemPriceChange('L0071','60587633','LG灰',  '1419','3000','2021/05/01','2021/06/07','1'),
  new ItemPriceChange('L0072','60587633','LG赤',  '1419','3100','2021/06/01','2021/06/07','1'),
  new ItemPriceChange('L0073','60587633','LT青',  '1419','3200','2021/06/01','2021/06/07','1'),
  new ItemPriceChange('L0089','60587641','白',    '1419','3300','2021/06/01','2021/06/07','1'),
]
//
// 在庫数を返却します。
//
// code:  品番
// color: 色名
//
// false : codeとcolorが一致し、現在の在庫数が閾値未満の場合
// true  : それ以外
//
function checkItemStocks(code, color)
{
  ret = true;
  item_stock.forEach((item) => {
    if((item.Jancode == code) && (item.ColorCode == color))
    {
      if(item.Threshold > item.Count)
      {
        ret = false; 
      }
      return ret;
    }
  });
  // console.log("no hit item");
  return ret;
}
//
// 発売日に達しているかを返却します。
//
// code:  品番
// color: 色名
//
// false : codeとcolorが一致し、発売日前
// true  : 発売日後
//
function checkItemPublish(code, color)
{
  ret = STATUS_DESCRIPTION.STATUS_AFTER;
  item_publish.forEach((item) => {
    if((item.Jancode == code) && (item.ColorCode == color))
    {
      // 値 < 本日
      if(checkDateBeforeToday(item.PublishDate))
      {
        // 公開終了 < 本日
        if(!checkDateBeforeToday(item.publishDateEnd))
        {
          ret = STATUS_DESCRIPTION.STATUS_BETWEEN;
        }
        else
        {
          ret = STATUS_DESCRIPTION.STATUS_AFTER;
        }
      }
      else
      {
        ret = STATUS_DESCRIPTION.STATUS_BEFORE;
      }
      return ret;
    }
  });
  return ret;
}
//
// 価格改定対象かチェック
//
// code:  品番
// color: 色名
//
// false : codeとcolorが一致し、価格改定
// true  : 価格改定なし
//
function checkItemNewPrice(code, color)
{
  ret = STATUS_DESCRIPTION.STATUS_AFTER;
  item_newprice.forEach((item) => {
    if((item.Jancode == code) && (item.ColorCode == color))
    {
      // 値 < 本日
      if(checkDateBeforeToday(item.PublishDate))
      {
        // 公開終了 < 本日
        if(!checkDateBeforeToday(item.publishDateEnd))
        {
          ret = STATUS_DESCRIPTION.STATUS_BETWEEN;
        }
        else
        {
          ret = STATUS_DESCRIPTION.STATUS_AFTER;
        }
      }
      else
      {
        ret = STATUS_DESCRIPTION.STATUS_BEFORE;
      }
      return ret;
    }
  });
  // console.log("no hit item");
  return ret;
}
//
// 日付をYYYY-MM-DDの書式で返すメソッド
// T:本日以前の日付/F:本日よりも後
//
function checkDateBeforeToday(stringDate) {

  let checkOK = true;
  // 本日の日付作成
  dt = new Date();
  const today_y = dt.getFullYear();
  const today_m = ('00' + (dt.getMonth()+1)).slice(-2);
  const today_d = ('00' + dt.getDate()).slice(-2);

  // パラメータ日付
  const params = stringDate.split('/');
  if(params.length == 3)
  {
    let paramY = 0;
    let paramM = 0;
    let paramD = 0;
    try {
      paramY = Number(params[0]);
      paramM = Number(params[1]);
      paramD = Number(params[2]);
      // 日付が有効なら
      checkOK = false;
      if(today_y >= paramY){
        if(today_m >= paramM){
          if(today_d >= paramD){
            checkOK = true;
          }
        }
      }
    }
    catch {
    }
  }
  return checkOK;
}