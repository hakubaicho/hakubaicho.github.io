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
    // location     : 配置場所(ItemListの置き場所index)
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
    new ClothItem('img/0001.png','img/s0001.png','せなけいこ','どうぶつ','ねこ'),
    new ClothItem('img/0002.png','img/s0002.png','せなけいこ','どうぶつ','ねこ'),
    new ClothItem('img/0003.png','img/s0003.png','せなけいこ','おばけ',''),
    new ClothItem('img/0004.png','img/s0004.png','せなけいこ','どうぶつ','ねこ'),
    new ClothItem('img/0005.png','img/s0005.png','せなけいこ','どうぶつ','いぬ'),
    new ClothItem('img/0006.png','img/s0006.png','せなけいこ','どうぶつ','とり'),
    new ClothItem('img/0007.png','img/s0007.png','せなけいこ','どうぶつ','ねこ'),
    new ClothItem('img/0008.png','img/s0008.png','せなけいこ','どうぶつ','ねずみ'),
    new ClothItem('img/0009.png','img/s0009.png','せなけいこ','おばけ',''),
    new ClothItem('img/0010.png','img/s0010.png','せなけいこ','おばけ',''),

    new ClothItem('img/0011.png','img/s0011.png','せなけいこ','もの','たいよう'),
    new ClothItem('img/0012.png','img/s0012.png','せなけいこ','もの','くつ'),
    new ClothItem('img/0013.png','img/s0013.png','せなけいこ','どうぶつ','くま'),
    new ClothItem('img/0014.png','img/s0014.png','せなけいこ','どうぶつ','いぬ'),
    new ClothItem('img/0015.png','img/s0015.png','せなけいこ','ひと','ひと'),
    new ClothItem('img/0016.png','img/s0016.png','せなけいこ','ひと','ひと'),
    new ClothItem('img/0017.png','img/s0017.png','せなけいこ','どうぶつ','うま'),
    new ClothItem('img/0018.png','img/s0018.png','せなけいこ','どうぶつ','きりん'),
    new ClothItem('img/0019.png','img/s0019.png','せなけいこ','どうぶつ','さる'),
    new ClothItem('img/0020.png','img/s0020.png','せなけいこ','どうぶつ','ぶた'),
    
    new ClothItem('img/0021.png','img/s0021.png','せなけいこ','どうぶつ','かば'),
    new ClothItem('img/0022.png','img/s0022.png','せなけいこ','どうぶつ','うさぎ'),
    new ClothItem('img/0023.png','img/s0023.png','せなけいこ','ひと','おとこのこ'),
    new ClothItem('img/0024.png','img/s0024.png','せなけいこ','ひと','こども'),
    new ClothItem('img/0025.png','img/s0025.png','せなけいこ','ひと','おとこのこ'),
    new ClothItem('img/0026.png','img/s0026.png','せなけいこ','ひと','おとこのこ'),
    new ClothItem('img/0027.png','img/s0027.png','せなけいこ','ひと','おんなのこ'),
    new ClothItem('img/0028.png','img/s0028.png','せなけいこ','どうぶつ','うさぎ'),
    new ClothItem('img/0029.png','img/s0029.png','せなけいこ','どうぶつ','いぬ'),
    new ClothItem('img/0030.png','img/s0030.png','せなけいこ','どうぶつ','ねこ'),

    new ClothItem('img/0031.png','img/s0031.png','せなけいこ','どうぶつ','ぞう'),
  ];

  // 現在選択中の画像
  let currentIndex = -1;

  // タグ要素の取得メイン画像の設定
  const imgDesign = document.getElementById('thumbnail_selected');
  const imgWeared = document.getElementById('thumbnail_selected_tryon');
  
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
  //--------------------------------------------
  // アイテムが選択された時の処理
  //--------------------------------------------
  function click_item(index, location) {
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
    const tags = [];      // すべてのタグリスト
    const tags1 = [];     // 大分類のタグリスト
    const tags2 = [];     // 中分類のタグリスト
    const tags3 = [];     // 小分類のタグリスト

    //-----
    // カテゴリーボタンの要素をクリア
    //-----
    const categories = document.getElementById("categories");
    while( categories.firstChild ){
      categories.removeChild( categories.firstChild );
    }
    //-----
    // 画像のタグから、タグリストを生成する
    // 配列に含まれていなければ追加
    //-----
    items.forEach((item) => {
      //-----
      // すべてのタグ
      //-----
      // アイテムのタグエリアを取得する
      const item_tags =[item.tag1, item.tag2, item.tag3];
      item_tags.forEach((item_tag) => {
        if(item_tag != '')
        {
          if(!tags.includes(item_tag))
          {
            tags.push(item_tag);
          }
        }  
      });
      //-----
      // 大分類
      //-----
      if(item.tag1 != '')
      {
        if(!tags1.includes(item.tag1))
        {
          tags1.push(item.tag1);
        }
      }
      //-----
      // 中分類
      //-----
      if(item.tag2 != '')
      {
        if(!tags2.includes(item.tag2))
        {
          tags2.push(item.tag2);
        }
      }
      //-----
      // 小分類
      //-----
      if(item.tag3 != '')
      {
        if(!tags3.includes(item.tag3))
        {
        tags3.push(item.tag3);
        }
      }
    });

    //-----
    // タグリストから要素を生成する。
    // ! イベントの追加の注意 !
    // ×）これやると即時実行になります。
    // button.addEventListener("click", setItemList(tag), false);
    // 〇）この書き方 https://qiita.com/rukiadia/items/03aaa8955c0f6576a5e7
    // button.addEventListener("click", setItemList, false);
    // button.eventParam = tag;
    //-----

    //--------------------------------------
    // すべての分類
    //--------------------------------------
    // tags.forEach((tag) => {
    //   const li = document.createElement('li');
    //   // ボタン要素を追加する
    //   const button = document.createElement('button');
    //   button.textContent = `${tag}`;
    //   // イベントの追加
    //   // ×）これやると即時実行になります。
    //   // button.addEventListener("click", setItemList(tag), false);
    //   // 〇） https://qiita.com/rukiadia/items/03aaa8955c0f6576a5e7
    //   button.addEventListener("click", setItemList, false);
    //   button.eventParam = tag;

    //   li.appendChild(button);
    //   // 配置
    //   categorys.appendChild(li);
    // });
    
    const item_tags =[tags1, tags2, tags3];
    //--------------------------------------
    // 大分類
    //--------------------------------------
    tags1.forEach((tag) => {
      // 要素の生成
      const li = document.createElement('li');            // li を生成
      const button = document.createElement('button');    // button を生成(タグをテキストにしたボタン要素を追加する)
      button.textContent = `${tag}`;
      button.classList.add('button_tag1');
      // イベントの追加
      button.addEventListener("click", setItemList, false); 
      button.eventParam = tag;
      // 配置
      li.appendChild(button);         // button の配置
      categories.appendChild(li);   // li の配置
    });
    //--------------------------------------
    // 中分類
    //--------------------------------------
    tags2.forEach((tag) => {
      // 要素の生成
      const li = document.createElement('li');            // li を生成
      const button = document.createElement('button');    // button を生成(タグをテキストにしたボタン要素を追加する)
      button.textContent = `${tag}`;
      button.classList.add('button_tag2');
      // イベントの追加
      button.addEventListener("click", setItemList, false); 
      button.eventParam = tag;
      // 配置
      li.appendChild(button);         // button の配置
      categories.appendChild(li);   // li の配置
    });
    //--------------------------------------
    // 小分類
    //--------------------------------------
    tags3.forEach((tag) => {
     // 要素の生成
     const li = document.createElement('li');            // li を生成
     const button = document.createElement('button');    // button を生成(タグをテキストにしたボタン要素を追加する)
     button.textContent = `${tag}`;
     button.classList.add('button_tag3');
     // イベントの追加
     button.addEventListener("click", setItemList, false); 
     button.eventParam = tag;
     // 配置
     li.appendChild(button);         // button の配置
     categories.appendChild(li);   // li の配置
    });
  }

  // 画面構成を作る
  setItemList('');
  setCategoryList();
  
}