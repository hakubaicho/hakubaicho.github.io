// 'use strict';

{
  // *********************************************
  // クラス定義
  // *********************************************
  // 洋服クラス
  class ClothItem {
    //----------------------------------
    // コンストラクタ
    //----------------------------------
    // design       : デザイン
    // wearedImage  : 着衣イメージ
    // tag1         : 大分類
    // tag2         : 中分類
    // tag3         : 小分類
    constructor(design, wearedImage, tag1,tag2, tag3)
    {
      this.design = design;
      this.wearedImage = wearedImage;
      this.tag1 = tag1;
      this.tag2 = tag2;
      this.tag3 = tag3;
      this.location = 0;
    }
    //----------------------------------
    // メソッド
    //----------------------------------
    // 配置インデックスをもらう
    setLocation(location) {
      this.location = location;
    }
  }
  // *********************************************
  // インスタンスの作成
  // *********************************************
  // ClothItemのインスタンスを生成。
  const items = [
    new ClothItem('img/0001.png','img/s0001.png','ねこ','どうぶつ',''),
    new ClothItem('img/0002.png','img/s0002.png','ねこ','どうぶつ',''),
    new ClothItem('img/0003.png','img/s0003.png','おばけ','',''),
    new ClothItem('img/0004.png','img/s0004.png','ねこ','どうぶつ',''),
    new ClothItem('img/0005.png','img/s0005.png','いぬ','どうぶつ',''),
    new ClothItem('img/0006.png','img/s0006.png','とり','どうぶつ',''),
    new ClothItem('img/0007.png','img/s0007.png','ねこ','どうぶつ',''),
    new ClothItem('img/0008.png','img/s0008.png','ねずみ','どうぶつ',''),
    new ClothItem('img/0009.png','img/s0009.png','おばけ','',''),
    new ClothItem('img/0010.png','img/s0010.png','おばけ','',''),

    new ClothItem('img/0011.png','img/s0011.png','たいよう','',''),
    new ClothItem('img/0012.png','img/s0012.png','くつ','',''),
    new ClothItem('img/0013.png','img/s0013.png','くま','どうぶつ',''),
    new ClothItem('img/0014.png','img/s0014.png','いぬ','どうぶつ',''),
    new ClothItem('img/0015.png','img/s0015.png','おんなのこ','ひと',''),
    new ClothItem('img/0016.png','img/s0016.png','おんなのこ','ひと',''),
    new ClothItem('img/0017.png','img/s0017.png','うま','どうぶつ',''),
    new ClothItem('img/0018.png','img/s0018.png','きりん','どうぶつ',''),
    new ClothItem('img/0019.png','img/s0019.png','さる','どうぶつ',''),
    new ClothItem('img/0020.png','img/s0020.png','ぶた','どうぶつ',''),
    
    new ClothItem('img/0021.png','img/s0021.png','かば','どうぶつ',''),
    new ClothItem('img/0022.png','img/s0022.png','うさぎ','どうぶつ',''),
    new ClothItem('img/0023.png','img/s0023.png','おとこのこ','ひと',''),
    new ClothItem('img/0024.png','img/s0024.png','こども','ひと',''),
    new ClothItem('img/0025.png','img/s0025.png','おとこのこ','ひと',''),
    new ClothItem('img/0026.png','img/s0026.png','おとこのこ','ひと',''),
    new ClothItem('img/0027.png','img/s0027.png','おんなのこ','ひと',''),
    new ClothItem('img/0028.png','img/s0028.png','うさぎ','どうぶつ',''),
    new ClothItem('img/0029.png','img/s0029.png','いぬ','どうぶつ',''),
    new ClothItem('img/0030.png','img/s0030.png','ねこ','どうぶつ',''),

    new ClothItem('img/0031.png','img/s0031.png','ぞう','どうぶつ',''),
  ];

  // 現在選択中の画像
  let currentIndex = -1;

  // タグ要素の取得メイン画像の設定
  const imgDesign = document.getElementById('thumbnail_selected');
  const imgWeared = document.getElementById('thumbnail_selected_tryon');
  // imgDesign.src = items[currentIndex].design;
  // imgWeared.src = items[currentIndex].wearedImage;
  
  //--------------------------------------------
  // アイテムリストを生成します。
  //--------------------------------------------
  function setItemList(select_tag) {
    console.log('setItemListTag');
    //--------------------------------
    // アイテム要素をクリア
    //--------------------------------
    const  targetTag = document.querySelector('.thumbnails');
    while( targetTag.firstChild ){
      targetTag.removeChild( targetTag.firstChild );
    }
    //--------------------------------
    // キーワードを取得
    //--------------------------------
    let keyWord = '';
    if('string' == typeof(select_tag))
    {
      keyWord = select_tag;
    }
    else
    {
      // https://qiita.com/rukiadia/items/03aaa8955c0f6576a5e7
      // addEventHandlerで定義した場合
      if('target' in select_tag) {
        target = select_tag.target;
        if('eventParam' in target){
          keyWord = select_tag.target.eventParam;
        }
      }
    }
    //------------------------------------
    // thumbnailsの処理
    //------------------------------------
    currentIndex = -1;
    let location = 0;
    items.forEach((item, index) => {
      // タグが一致するか確認
      let isHit = false;
      // アイテムのタグエリアを取得する
      const item_tags =[item.tag1, item.tag2, item.tag3];
      // 配列に含まれていなければ追加
      item_tags.forEach((item_tag) => {
        if(item_tag != '')
        {
          if(keyWord == item_tag)
          {
            isHit = true;
          }
          else
          {
            if(keyWord == '')
            {
              isHit = true;
            }
          }
        }  
      });
      // 不一致で処理中止
      if(!isHit) {
        return;
      }
      //----------------------------------
      // 画像の表示
      //----------------------------------
      // imgタグを生成し、イメージを割り当て
      const img = document.createElement('img');
      img.src = item.design;
      // li要素の生成
      const li = document.createElement('li');
      // クリックされた時の処理
      // li.addEventListener("click", click_item, false);
      // li.eventParam = index;
      li.addEventListener("click", function(){click_item(index)}, false);
      item.setLocation(location);
      li.appendChild(img);
      targetTag.appendChild(li);
      location++;
    });
  }
  function click_item(index, location)
  {
    // 画像の切り替え
    imgDesign.src = items[index].design;
    imgWeared.src = items[index].wearedImage;

    // thumbnailsのすべての要素を取得
    const thumbnails = document.querySelectorAll('.thumbnails > li');
    // 現在の付加されているcurrentを外す
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('current');
    });
    // currentの更新
    currentIndex = items[index].location;
    thumbnails[currentIndex].classList.add('current');
  }
  //--------------------------------------------
  // カテゴリーリストを生成します。
  //--------------------------------------------
  function setCategoryList() {
    const CATE_MAX = 20;
    const categorys = document.getElementById("categorys");
    
    // 要素を作る
    for(let i = 0; i < CATE_MAX; i++)
    {
      const li = document.createElement('li');

      // ボタン要素を追加する
      const button = document.createElement('button');
      button.textContent = `カテゴリー ${i}`;
      li.appendChild(button);

      categorys.appendChild(li);
    }
  }
  //--------------------------------------------
  // カテゴリーリストを生成します。
  //--------------------------------------------
  function setCategoryListByItemTag() {
    const tags= [];
    //-----
    // アイテムごとにタグを取得する
    //-----
    items.forEach((item) => {

      // アイテムのタグエリアを取得する
      const item_tags =[item.tag1, item.tag2, item.tag3];
      // 配列に含まれていなければ追加
      item_tags.forEach((item_tag) => {
        if(item_tag != '')
        {
          if(!tags.includes(item_tag))
          {
            tags.push(item_tag);
          }
        }  
      });
    });
    // console.log(tags);

    //-----
    // カテゴリーボタンを生成
    //-----
    const categorys = document.getElementById("categorys");
    while( categorys.firstChild ){
      categorys.removeChild( categorys.firstChild );
    }

    // 要素を作る
    tags.forEach((tag) => {
      const li = document.createElement('li');
      // ボタン要素を追加する
      const button = document.createElement('button');
      button.textContent = `${tag}`;
      // イベントの追加
      // ×）これやると即時実行になります。
      // button.addEventListener("click", setItemList(tag), false);
      // 〇） https://qiita.com/rukiadia/items/03aaa8955c0f6576a5e7
      button.addEventListener("click", setItemList, false);
      button.eventParam = tag;

      li.appendChild(button);
      // 配置
      categorys.appendChild(li);
    });
  }

  // 画面構成を作る
  setItemList('');
  setCategoryList();
  setCategoryListByItemTag();
}