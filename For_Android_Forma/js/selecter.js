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
    // uuid             : FormaのItem登録uuid
    // itemName         : itemの名称
    // designId         : デザインID
    // designsrc        : デザイン
    // wearedImageSrc   : 着衣イメージ
    // tag1             : 大分類
    // tag2             : 中分類
    // tag3             : 小分類
    // location         : 配置場所(ItemListの置き場所index)
    constructor(uuid, itemName, designID, designsrc, wearedImageSrc, tag1,tag2, tag3)
    {
      this.uuid           = uuid;
      this.itemName       = itemName;
      this.designID       = designID;
      this.designsrc      = designsrc;
      this.wearedImageSrc = wearedImageSrc;
      this.tag1           = tag1;
      this.tag2           = tag2;
      this.tag3           = tag3;
      this.location       = 0;
    }
    //----------------------------------
    // メソッド
    //----------------------------------
    // 配置インデックスを更新する。
    setLocation(location) {
      this.location = location;
    }
    // タグが一致するか確認
    // 空白はOKとします。
    // タグは3種類とする
    check_tag(taglist) {
      let check_ok = true;
      
      if(typeof(taglist) == 'object')
      {
        if(taglist.length == 3)
        {
          const param_tag1 = taglist[0];
          const param_tag2 = taglist[1];
          const param_tag3 = taglist[2];
          
          console.log('-------------------------------')
          console.log(param_tag1, param_tag2, param_tag3);
          console.log(this.tag1,  this.tag2,  this.tag3);
          console.log('-------------------------------')
          // タグ１の一致
          if(param_tag1 !== '')
          {
            if(this.tag1 !== param_tag1)
            {
              check_ok = false;
            }
          }
          // タグ２の一致
          if(param_tag2 !== '')
          {
            if(this.tag2 !== param_tag2)
            {
              check_ok = false;
            }
          }
          // タグ３の一致
          if(param_tag3 !== '')
          {
            if(this.tag3 !== param_tag3)
            {
              check_ok = false;
            }
          }
        }
      }
      return check_ok;
    }
  }
  // カテゴリーをツリーで管理したい
  // https://qiita.com/es-row/items/4d654d4272564f8c5528
  class TagsTree {
    //----------------------------------
    // コンストラクタ
    //----------------------------------
    // nodeName       : 名称
    constructor(nodeName) {
      this.name = nodeName
      this.parent = null;
      this.childrenArray = [];
    }

    //----------------------------------
    // ノードの追加
    //----------------------------------
     addChild(childNode) {
      this.childrenArray.push(childNode);
      childNode.parent = this;
    }

  }
  // *********************************************
  // インスタンスの作成
  // *********************************************
  // ClothItemのインスタンスを生成。
  const items = [
    // せなけいこ-ふうせんねこ
    new ClothItem('', '', 'S-001', 'img/book1-1.png','img/s0001.png','商品選択', 'せなけいこ','ふうせんねこ'),
    new ClothItem('', '', 'S-002', 'img/book1-2.png','img/s0002.png','商品選択', 'せなけいこ','ふうせんねこ'),

    // せなけいこ-ねないこだれだ
    new ClothItem('', '', 'S-003', 'img/book3-1.png','img/s0006.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', '', 'S-004', 'img/book3-2.png','img/s0007.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', '', 'S-005', 'img/book3-3.png','img/s0008.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', '', 'S-006', 'img/book3-4.png','img/s0009.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', '', 'S-007', 'img/book3-5.png','img/s0010.png','商品選択', 'せなけいこ','ねないこだれだ'),

      // せなけいこ-きれいなはこ
    new ClothItem('', '', 'S-008', 'img/book2-1.png','img/s0003.png','商品選択', 'せなけいこ','きれいなはこ'),
    new ClothItem('', '', 'S-009', 'img/book2-2.png','img/s0004.png','商品選択', 'せなけいこ','きれいなはこ'),
    new ClothItem('', '', 'S-010', 'img/book2-3.png','img/s0005.png','商品選択', 'せなけいこ','きれいなはこ'),

    // せなけいこ-いやだいやだ
    new ClothItem('', '', 'S-011', 'img/book4-1.png','img/s0011.png','商品選択', 'せなけいこ','いやだいやだ'),
    new ClothItem('', '', 'S-012', 'img/book4-2.png','img/s0012.png','商品選択', 'せなけいこ','いやだいやだ'),
    new ClothItem('', '', 'S-013', 'img/book4-3.png','img/s0013.png','商品選択', 'せなけいこ','いやだいやだ'),

    // せなけいこ-もじゃもじゃ
    new ClothItem('', '', 'S-014', 'img/book5-1.png','img/s0014.png','商品選択', 'せなけいこ','もじゃもじゃ'),
    new ClothItem('', '', 'S-015', 'img/book5-2.png','img/s0015.png','商品選択', 'せなけいこ','もじゃもじゃ'),
    new ClothItem('', '', 'S-016', 'img/book5-3.png','img/s0016.png','商品選択', 'せなけいこ','もじゃもじゃ'),

    // せなけいこ-にんじん
    new ClothItem('', '', 'S-017', 'img/book6-1.png','img/s0017.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', '', 'S-018', 'img/book6-2.png','img/s0018.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', '', 'S-019', 'img/book6-3.png','img/s0019.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', '', 'S-020', 'img/book6-4.png','img/s0020.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', '', 'S-021', 'img/book6-5.png','img/s0021.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', '', 'S-022', 'img/book6-6.png','img/s0022.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', '', 'S-023', 'img/book6-7.png','img/s0023.png','商品選択', 'せなけいこ','にんじん'),
    
    // せなけいこ-あーんあん
    new ClothItem('', '', 'S-024', 'img/book7-1.png','img/s0024.png','商品選択', 'せなけいこ','あーんあん'),
    new ClothItem('', '', 'S-025', 'img/book7-2.png','img/s0025.png','商品選択', 'せなけいこ','あーんあん'),
    new ClothItem('', '', 'S-026', 'img/book7-3.png','img/s0026.png','商品選択', 'せなけいこ','あーんあん'),
    
    // せなけいこ-ルルちゃんのくつした
    new ClothItem('', '', 'S-027', 'img/book8-1.png','img/s0027.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', '', 'S-028', 'img/book8-2.png','img/s0028.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', '', 'S-029', 'img/book8-3.png','img/s0029.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', '', 'S-030', 'img/book8-4.png','img/s0030.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', '', 'S-031', 'img/book8-5.png','img/s0031.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),

    // せなけいこ-にゃんにゃん
    new ClothItem('', '', 'S-032', 'img/b1.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', '', 'S-033', 'img/b2.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', '', 'S-034', 'img/b3.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', '', 'S-035', 'img/b4.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', '', 'S-036', 'img/b5.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    // ハトソン探偵団
    new ClothItem('', '', 'H-001', 'img/ht1.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', '', 'H-002', 'img/ht5.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', '', 'H-003', 'img/ht9.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', '', 'H-004', 'img/ht13.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', '', 'H-005', 'img/ht17.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),

    new ClothItem('', '', 'H-006', 'img/ht2.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', '', 'H-007', 'img/ht6.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', '', 'H-008', 'img/ht10.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', '', 'H-009', 'img/ht14.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', '', 'H-010', 'img/ht18.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),

    new ClothItem('', '', 'H-011', 'img/ht3.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', '', 'H-012', 'img/ht7.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', '', 'H-013', 'img/ht11.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', '', 'H-014', 'img/ht15.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', '', 'H-015', 'img/ht19.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),

    new ClothItem('', '', 'H-016', 'img/ht4.png','','商品選択', 'ハトソン探偵団','オットセール'),
    new ClothItem('', '', 'H-017', 'img/ht8.png','','商品選択', 'ハトソン探偵団','オットセール'),
    new ClothItem('', '', 'H-018', 'img/ht12.png','','商品選択', 'ハトソン探偵団','オットセール'),
    new ClothItem('', '', 'H-019', 'img/ht16.png','','商品選択', 'ハトソン探偵団','オットセール'),
    new ClothItem('', '', 'H-020', 'img/ht20.png','','商品選択', 'ハトソン探偵団','オットセール'),

    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_01.png','商品選択', 'Tシャツ画像',''),
    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_02.png','商品選択', 'Tシャツ画像',''),
    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_01.png','商品選択', 'Tシャツ画像',''),
    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_02.png','商品選択', 'Tシャツ画像',''),
    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_01.png','商品選択', 'Tシャツ画像',''),
    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_02.png','商品選択', 'Tシャツ画像',''),
    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_01.png','商品選択', 'Tシャツ画像',''),
    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_02.png','商品選択', 'Tシャツ画像',''),
    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_01.png','商品選択', 'Tシャツ画像',''),
    new ClothItem('', '', '', 'img/SW_TDesign_01.png','img/SW_TDesign_02.png','商品選択', 'Tシャツ画像',''),

    // [TryOn] せなけいこ
    new ClothItem('4eb4eadc-54ed-44ce-a825-b00e14f13bf7', '', 'S-001', 'img/e1.png','img/s0001.png','TryOn', '',''),
    new ClothItem('5659faca-7d0a-44e6-97ee-831927bdf9c0', '', 'S-002', 'img/e2.png','img/s0002.png','TryOn', '',''),
    new ClothItem('772bf012-6554-4d0f-baae-569b7a25f915', '', 'S-003', 'img/e3.png','img/s0006.png','TryOn', '',''),
    new ClothItem('1c1afadd-ba61-4eb9-937d-a4002aad6714', '', 'S-004', 'img/e4.png','img/s0007.png','TryOn', '',''),
    // [TryOn] スーツ

    // [TryOn] 浴衣

  ];

  // 現在選択中の画像
  let currentIndex = -1;

  // タグ要素の取得メイン画像の設定
  const imgDesign = document.getElementById('thumbnail_selected');
  const imgWeared = document.getElementById('thumbnail_selected_tryon');
  
  //--------------------------------------------
  // アイテムリストを生成します。
  // セレクトタグで該当するものを
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
      img.src = item.designsrc;
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
  // [Tree]アイテムリストを生成します。
  //--------------------------------------------
  function setItemListTree(select_tag) {
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
    document.getElementById('button_category_tag1').classList.add('item-hide');
    document.getElementById('button_category_tag2').classList.add('item-hide');
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
          if(keyWord.length==3)
          {
            if(keyWord[0]=='')
            {
              document.getElementById('button_category_tag1').classList.add('item-hide');
            }
            else
            {
              document.getElementById('button_category_tag1').classList.remove('item-hide');
              document.getElementById('button_category_tag1').classList.add('item-show');
            }
            if(keyWord[1]=='')
            {
              document.getElementById('button_category_tag2').classList.add('item-hide');
            }
            else
            {
              document.getElementById('button_category_tag2').classList.remove('item-hide');
              document.getElementById('button_category_tag2').classList.add('item-show');
            }
            document.getElementById('category_tag1').textContent=keyWord[0];
            document.getElementById('category_tag2').textContent=keyWord[1];
          }
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
      // 不一致で処理中止
      if(!item.check_tag(keyWord)) {
        return;
      }
      //----------------------------------
      // 画像の表示
      //----------------------------------
      // imgタグを生成し、イメージを割り当て
      const img = document.createElement('img');
      img.src = item.designsrc;
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
    imgDesign.src = items[index].designsrc;
    imgWeared.src = items[index].wearedImageSrc;

    // androidに選択したデータを送る
    fromHTML_call_Set_Item(
                            items[index].uuid,
                            items[index].itemName,
                            items[index].designID,
                            items[index].designsrc,
                            items[index].wearedImageSrc,
                            items[index].tag1,
                            items[index].tag2,
                            items[index].tag3
                              );

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
    const tagsTree = new TagsTree('root');   // タグのTree

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
    // タグのツリー作成
    //-----
    // 大分類
    tags1.forEach((tag1) => {
      tagsTree.addChild(new TagsTree(tag1));
    });
    // 中分類
    for(let i = 0; i < tagsTree.childrenArray.length; i++) {
      items.forEach((item) => {
        if(tagsTree.childrenArray[i].name === item.tag1) {
          let hit = false;
          for(let j = 0; j < tagsTree.childrenArray[i].childrenArray.length; j++)
          {
              if(item.tag2 === tagsTree.childrenArray[i].childrenArray[j].name)
              {
                hit = true;
              }
          }
          if(!hit)
          {
            tagsTree.childrenArray[i].addChild(new TagsTree(item.tag2));
          }
        }
      });
    }
    // 小分類
    for(let i = 0; i < tagsTree.childrenArray.length; i++) {
      items.forEach((item) => {
        if(tagsTree.childrenArray[i].name === item.tag1) 
        {
          for(let j = 0; j < tagsTree.childrenArray[i].childrenArray.length; j++)
          {
            if(item.tag2 === tagsTree.childrenArray[i].childrenArray[j].name)
            {
              let hit = false;
              for(let k = 0; k < tagsTree.childrenArray[i].childrenArray[j].childrenArray.length; k++)
              {
                  if(item.tag3 === tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name)
                  {
                    hit = true;
                  }
              }
              if(!hit)
              {
                tagsTree.childrenArray[i].childrenArray[j].addChild(new TagsTree(item.tag3));
              }
            }
          }
        }
      });
    }
    // 確認出力
    for(let i=0; i<tagsTree.childrenArray.length; i++)
    {
      console.log(tagsTree.childrenArray[i].name);
      for(let j=0; j<tagsTree.childrenArray[i].childrenArray.length; j++)
      {
        console.log('\t' + tagsTree.childrenArray[i].childrenArray[j].name);
        for(let k=0;k<tagsTree.childrenArray[i].childrenArray[j].childrenArray.length; k++)
        {
          console.log('\t\t' + tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name);
        }
      }
    }

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

  //--------------------------------------------
  // [Tree]カテゴリーリストを生成します。
  //--------------------------------------------
  function setCategoryListTree() {
    const tagsTree = new TagsTree('root');   // タグのTree

    //-----
    // カテゴリーボタンの要素をクリア
    //-----
    const categories = document.getElementById("categories");
    while( categories.firstChild ){
      categories.removeChild( categories.firstChild );
    }
    //-----
    // タグのツリー作成
    //-----
    // 大分類
    items.forEach((item) => {
      let hit = false;
      for(let i = 0; i < tagsTree.childrenArray.length; i++)
      {
          if(item.tag1 === tagsTree.childrenArray[i].name)
          {
            hit = true;
          }
      }
      if(!hit)
      {
        if(item.tag1 != '')
        {
          tagsTree.addChild(new TagsTree(item.tag1));
        }
      }
    });
      
    // 中分類
    for(let i = 0; i < tagsTree.childrenArray.length; i++) {
      items.forEach((item) => {
        if(tagsTree.childrenArray[i].name === item.tag1) {
          let hit = false;
          for(let j = 0; j < tagsTree.childrenArray[i].childrenArray.length; j++)
          {
              if(item.tag2 === tagsTree.childrenArray[i].childrenArray[j].name)
              {
                hit = true;
              }
          }
          if(!hit)
          {
            if(item.tag2 != '')
            {
              tagsTree.childrenArray[i].addChild(new TagsTree(item.tag2));
            }
          }
        }
      });
    }
    // 小分類
    for(let i = 0; i < tagsTree.childrenArray.length; i++) {
      items.forEach((item) => {
        if(tagsTree.childrenArray[i].name === item.tag1) 
        {
          for(let j = 0; j < tagsTree.childrenArray[i].childrenArray.length; j++)
          {
            if(item.tag2 === tagsTree.childrenArray[i].childrenArray[j].name)
            {
              let hit = false;
              for(let k = 0; k < tagsTree.childrenArray[i].childrenArray[j].childrenArray.length; k++)
              {
                  if(item.tag3 === tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name)
                  {
                    hit = true;
                  }
              }
              if(!hit)
              {
                if(item.tag3 != '')
                {
                  tagsTree.childrenArray[i].childrenArray[j].addChild(new TagsTree(item.tag3));
                }
              }
            }
          }
        }
      });
    }
    // 確認出力
    for(let i=0; i<tagsTree.childrenArray.length; i++)
    {
      console.log(tagsTree.childrenArray[i].name);
      for(let j=0; j<tagsTree.childrenArray[i].childrenArray.length; j++)
      {
        console.log('\t' + tagsTree.childrenArray[i].childrenArray[j].name);
        for(let k=0;k<tagsTree.childrenArray[i].childrenArray[j].childrenArray.length; k++)
        {
          console.log('\t\t' + tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name);
        }
      }
    }

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
    //--------------------------------------
    // カテゴリすべてボタンの生成
    //--------------------------------------
    const li = document.createElement('li');            // li を生成
    const button = document.createElement('button');    // button を生成(タグをテキストにしたボタン要素を追加する)
    button.textContent = `すべて`;
    button.classList.add('button_tag_all');
    // イベントの追加
    button.addEventListener("click", setItemListTree, false);
    button.eventParam = [
                          '',
                          '',
                          '',
                        ];
    // 配置
    li.appendChild(button);         // button の配置
    categories.appendChild(li);   // li の配置
    //--------------------------------------
    // カテゴリボタンの生成
    //--------------------------------------
    for(let i=0; i<tagsTree.childrenArray.length; i++)
    {
      console.log(tagsTree.childrenArray[i].name);
      // =====
      // [大分類]
      // =====
      // 要素の生成
      const li = document.createElement('li');            // li を生成
      const button = document.createElement('button');    // button を生成(タグをテキストにしたボタン要素を追加する)
      button.textContent = `${tagsTree.childrenArray[i].name}`;
      button.classList.add('button_tag1');
      // イベントの追加
      button.addEventListener("click", setItemListTree, false);
      button.eventParam = [
                            tagsTree.childrenArray[i].name,
                            '',
                            '',
                          ];
      // 配置
      li.appendChild(button);         // button の配置
      categories.appendChild(li);   // li の配置
      // =====
      for(let j=0; j<tagsTree.childrenArray[i].childrenArray.length; j++)
      {
        console.log('\t' + tagsTree.childrenArray[i].childrenArray[j].name);
        // =====
        // [中分類]
        // =====
        // 要素の生成
        const li = document.createElement('li');            // li を生成
        const button = document.createElement('button');    // button を生成(タグをテキストにしたボタン要素を追加する)
        button.textContent = `${tagsTree.childrenArray[i].childrenArray[j].name}`;
        button.classList.add('button_tag2');
        // イベントの追加
        button.addEventListener("click", setItemListTree, false);
        button.eventParam = [
                              tagsTree.childrenArray[i].name,
                              tagsTree.childrenArray[i].childrenArray[j].name,
                              '',
                            ];

        // 配置
        li.appendChild(button);         // button の配置
        categories.appendChild(li);   // li の配置
        // =====
        for(let k=0;k<tagsTree.childrenArray[i].childrenArray[j].childrenArray.length; k++)
        {
          console.log('\t\t' + tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name);
          // =====
          // [小分類]
          // =====
          // 要素の生成
          const li = document.createElement('li');            // li を生成
          const button = document.createElement('button');    // button を生成(タグをテキストにしたボタン要素を追加する)
          button.textContent = `${tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name}`;
          button.classList.add('button_tag3');
          // イベントの追加
          button.addEventListener("click", setItemListTree, false); 
          button.eventParam = [
                                tagsTree.childrenArray[i].name,
                                tagsTree.childrenArray[i].childrenArray[j].name,
                                tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name,
                              ];
          // 配置
          li.appendChild(button);         // button の配置
          categories.appendChild(li);   // li の配置
          // =====
        }
      }
    }
  }

  


  function IsSelectItem() {
    if(currentIndex < 0)
    {
      alert("えらんでください");
      return false;
    }
    return true;
  }
  function gotoCamera() {
    if(!IsSelectItem())return;
    location.href='camera.html'
  }
  function gotoOrder() {
    if(!IsSelectItem())return;
    location.href='order.html'
  }

  // 画面構成を作る
  // setItemList('');
  // setCategoryList();
  setCategoryListTree();
  setItemListTree(['','','']);
}