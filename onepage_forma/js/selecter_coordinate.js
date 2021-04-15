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
    // tag1             : 大分類
    // tag2             : 中分類
    // tag3             : 小分類
    // kind             : 種別
    // remark01         : デザインID    [designId]
    // remark02         : 名称          [itemName]
    // remark03         : 価格          [price]
    // remark04         : 品番          [JanCode]
    // remark05         : 色名          [ColorCode]
    // remark06         : 未使用
    // remark07         : 未使用        
    // remark08         : 未使用
    // remark09         : 未使用
    // remark10         : 未使用
    // designsrc        : デザイン
    // wearedImageSrc   : 着衣イメージ
    // formaSrc         : フォルマへの登録画像
    // uuid             : FormaのItem登録uuid
    // location         : 配置場所(ItemListの置き場所index)
    constructor(tag1, tag2, tag3, 
                kind, 
                remark01, remark02, remark03, remark04, remark05, remark06, remark07,remark08,remark09,remark10,
                designsrc, wearedImageSrc, formaSrc,
                uuid)
    {
      this.tag1           = tag1;
      this.tag2           = tag2;
      this.tag3           = tag3;

      this.kind           = kind;

      this.designID       = remark01;
      this.itemName       = remark02;
      this.price          = remark03;
      this.janCode        = remark04;
      this.colorCode      = remark05;
      this.remark06       = remark06;
      this.remark07       = remark07;
      this.remark08       = remark08;
      this.remark09       = remark09;
      this.remark10       = remark10;

      if(designsrc != '')
      {
      this.designsrc      = 'img/' + designsrc;
      }
      else
      {
      this.designsrc      = '';
      }
      if(wearedImageSrc != '')
      {
      this.wearedImageSrc = 'img/' + wearedImageSrc;
      }
      else
      {
      this.wearedImageSrc = '';
      }

      this.uuid           = uuid;

      this.location       = 0;
    }
    //----------------------------------
    // メソッド
    //----------------------------------
    // 画像のパスをクリアします。
    clear_img_src() {
      this.designsrc      = '';
      this.wearedImageSrc = '';
    }
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
          
          // console.log('-------------------------------')
          // console.log(param_tag1, param_tag2, param_tag3);
          // console.log(this.tag1,  this.tag2,  this.tag3);
          // console.log('-------------------------------')
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
    //----------------------------------
    // ノードがいるか
    //----------------------------------
    haveChild() {
      if(0 < this.childNode.length)
      {
        return true;
      }
      return false;
    }
  }
  // *********************************************
  // インスタンスの作成
  // *********************************************
  // ClothItemのインスタンスを生成。
  //********************************** */
  // ファイルから作成する。
  //********************************** */
  const items = [
    // [TryOn] スーツ
    new ClothItem('TryOn', 'スーツ','','C',      'SUT001', 'ＩＹ３Ｄオーガニック７分袖Ｔ','1089','6058-7624','DK黒','','','','','','SUT001.png','','','6c3cd363-fb3a-4312-9c48-7f62cbbfa614'),
    new ClothItem('TryOn', 'スーツ','','C',      'SUT001', 'スーツ1','20000','','','','','','','','SUT002.png','','','1617ff56-6575-42eb-9c64-f111b542683b'),
    // [TryOn] カジュアル
    new ClothItem('TryOn', 'カジュアル','','C',  'CAS001', 'カジュアル1','30000','','','','','','','','CAS001.png','','','5fc20c2b-4198-489a-83fd-d45a5fb95254'),
    // [TryOn] 浴衣
    new ClothItem('TryOn', 'ゆかた','','C',      'YKT001','[NG]ゆかた1','100000','','','','','','','','YKT101.png','','','65481657-7d5c-4a20-9524-cda6d0286ec2'),
    new ClothItem('TryOn', 'ゆかた','','C',      'YKT002','[NG]ゆかた2','110000','','','','','','','','YKT100.png','','','53fffeef-91c7-4d0b-8d01-edc30075054b'),
    new ClothItem('TryOn', 'ゆかた','','C',      'YKT003','[OK]ゆかた3','120000','','','','','','','','YKT003.png','','','fa036677-d583-418c-9c7e-31db4f830b73'),
    new ClothItem('TryOn', 'ゆかた','','C',      'YKT004','[OK]ゆかた4','130000','','','','','','','','YKT009.png','','','a7ce30ad-048c-41b0-8161-e61092390b0d'),
  ];

  // 現在選択中の画像
  let currentIndex = -1;
  // 現在選択中のアイテム
  let selectedItem = new ClothItem();
  // タグ要素の取得メイン画像の設定
  const imgDesign = document.getElementById('thumbnail_selected');
  const imgWeared = document.getElementById('thumbnail_selected_tryon');
  
  //--------------------------------------------
  // プロパティ
  //--------------------------------------------
  // 選択中のアイテムを返却します。
  function GetSelected_Item() {
    return selectedItem;
  }
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
    // 画像選択エリアのスクロール位置を上端に戻します。
    // https://www.ipentec.com/document/javascript-scroll-element-on-screen#:~:text=JavaScript%E3%81%A7%E6%8C%87%E5%AE%9A%E3%81%97%E3%81%9F%E4%BD%8D%E7%BD%AE,%E3%81%A6%E3%80%81%E3%81%9D%E3%81%AE%E5%80%A4%E3%82%92%20document.
    //--------------------------------
    var divElement = document.getElementsByClassName('item_list_container') ;
    let targetTop = document.getElementById('topPos');
    let rect = targetTop.getBoundingClientRect();
    var elemtop = rect.top + divElement.pageYOffset;
    divElement.scrollTop = elemtop;    
    //--------------------------------
    // キーワードを取得
    //--------------------------------
    let keyWord = '';
    document.getElementById('button_category_tag1').classList.add('item-hide');
    document.getElementById('button_category_tag2').classList.add('item-hide');
    document.getElementById('button_category_tag3').classList.add('item-hide');
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
            if(keyWord[2]=='')
            {
              document.getElementById('button_category_tag3').classList.add('item-hide');
            }
            else
            {
              document.getElementById('button_category_tag3').classList.remove('item-hide');
              document.getElementById('button_category_tag3').classList.add('item-show');
            }
            document.getElementById('category_tag1').textContent=keyWord[0];
            document.getElementById('category_tag2').textContent=keyWord[1];
            document.getElementById('category_tag3').textContent=keyWord[2];

            // fromHTML_call_Set_Category(keyWord[0], keyWord[1], keyWord[2]);
          }
        }
      }
      else
      {
        // androidからの取得の場合
        keyWord = select_tag;
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
          if(keyWord[2]=='')
          {
            document.getElementById('button_category_tag3').classList.add('item-hide');
          }
          else
          {
            document.getElementById('button_category_tag3').classList.remove('item-hide');
            document.getElementById('button_category_tag3').classList.add('item-show');
          }
          document.getElementById('category_tag1').textContent=keyWord[0];
          document.getElementById('category_tag2').textContent=keyWord[1];
          document.getElementById('category_tag3').textContent=keyWord[2];
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
    fromHTML_call_Set_ItemFullData(
                            items[index].tag1, items[index].tag2, items[index].tag3,
                            items[index].kind, 
                            items[index].designID, items[index].itemName, items[index].price, items[index].janCode, items[index].colorCode, 
                            items[index].remark06, items[index].remark07, items[index].remark08, items[index].remark09, items[index].remark10,
                            items[index].designsrc, items[index].wearedImageSrc, items[index].formaSrc,
                            items[index].uuid
                            );

    // onepage用
    selectedItem = new ClothItem(
      '', '', '', 
      '', 
      '', '', '', '', '', '', '','','','',
      '', '','',
      ''
    );
    selectedItem.tag1           = items[index].tag1;
    selectedItem.tag2           = items[index].tag2;
    selectedItem.tag3           = items[index].tag3;
     
    selectedItem.designID       = items[index].designID;
    selectedItem.itemName       = items[index].itemName;
    selectedItem.price          = items[index].price;
    selectedItem.janCode        = items[index].janCode;
    selectedItem.colorCode      = items[index].colorCode;
    selectedItem.remark06       = items[index].remark06;
    selectedItem.remark07       = items[index].remark07;
    selectedItem.remark08       = items[index].remark08;
    selectedItem.remark09       = items[index].remark09;
    selectedItem.remark10       = items[index].remark10;


    selectedItem.designsrc      = items[index].designsrc;
    selectedItem.wearedImageSrc = items[index].wearedImageSrc;
     
    selectedItem.uuid           = items[index].uuid;

    document.getElementById('detail-box').classList.remove('item-hide');
    document.getElementById('detail-box').classList.add('item-show');
    document.getElementById('item_detail_tag1').textContent = items[index].tag1;
    document.getElementById('item_detail_tag2').textContent = items[index].tag2;
    document.getElementById('item_detail_tag3').textContent = items[index].tag3;
    document.getElementById('item_detail_name').textContent = items[index].itemName;
    document.getElementById('item_detail_designID').textContent = items[index].designID;

    // 下はコーディネート固有
    document.getElementById('item_detail_jancode').textContent = items[index].janCode;
    document.getElementById('item_detail_color').textContent = items[index].colorCode;

    let num = 0;
    try {
      num = Number(items[index].price);
    }
    catch {

    }
    document.getElementById('item_detail_price').textContent = num.toLocaleString();

    // thumbnailsのすべての要素を取得
    const thumbnails = document.querySelectorAll('.thumbnails > li');
    // 現在の付加されているcurrentを外す
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('current');
    });
    // currentの更新
    currentIndex = items[index].location;
    thumbnails[currentIndex].classList.add('current');

    // カメラの開始
    const video = document.querySelector("#camera");
    syncCamera(video);
  }
  //--------------------------------------------
  // 選択中のアイテムをクリアする。
  //--------------------------------------------
  function clear_selectitem() {
    
    // androidに選択したデータを送る
    selectedItem = new ClothItem(
      '', '', '', 
      '', 
      '', '', '', '', '', '', '','','','',
      '', '','',
      ''
    );
    // 画像をクリアする。
    selectedItem.clear_img_src();
    fromHTML_call_Set_Item(
                            selectedItem.uuid,
                            selectedItem.itemName,
                            selectedItem.designID,
                            selectedItem.designsrc,
                            selectedItem.wearedImageSrc,
                            selectedItem.tag1,
                            selectedItem.tag2,
                            selectedItem.tag3
                              );

                              // 画像の切り替え
    imgDesign.src = selectedItem.designsrc;
    imgWeared.src = selectedItem.wearedImageSrc;
    document.getElementById('detail-box').classList.add('item-hide');
    document.getElementById('item_detail_tag1').textContent = selectedItem.tag1;
    document.getElementById('item_detail_tag2').textContent = selectedItem.tag2;
    document.getElementById('item_detail_tag3').textContent = selectedItem.tag3;
    document.getElementById('item_detail_name').textContent = selectedItem.itemName;
    document.getElementById('item_detail_designID').textContent = selectedItem.designID;
    // 下はコーディネート固有
    document.getElementById('item_detail_jancode').textContent = selectedItem.janCode;
    document.getElementById('item_detail_color').textContent = selectedItem.colorCode;

    // thumbnailsのすべての要素を取得
    const thumbnails = document.querySelectorAll('.thumbnails > li');
    // 現在の付加されているcurrentを外す
    thumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove('current');
    });
    // currentの更新
    currentIndex = -1;
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
    // // 確認出力
    // for(let i=0; i<tagsTree.childrenArray.length; i++)
    // {
    //   console.log(tagsTree.childrenArray[i].name);
    //   for(let j=0; j<tagsTree.childrenArray[i].childrenArray.length; j++)
    //   {
    //     console.log('\t' + tagsTree.childrenArray[i].childrenArray[j].name);
    //     for(let k=0;k<tagsTree.childrenArray[i].childrenArray[j].childrenArray.length; k++)
    //     {
    //       console.log('\t\t' + tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name);
    //     }
    //   }
    // }

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

  //--------------------------------------------
  // [Tree]カテゴリーリストを生成します。
  // チェックボックス型
  //--------------------------------------------
  function setCategoryListTree_checkbox() {
    const tagsTree = new TagsTree('root');   // タグのTree

    //-----
    // カテゴリーボタンの要素をクリア
    //-----
    const categories = document.getElementById("accordionbox");
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
    // for(let i=0; i<tagsTree.childrenArray.length; i++)
    // {
    //   console.log(tagsTree.childrenArray[i].name);
    //   for(let j=0; j<tagsTree.childrenArray[i].childrenArray.length; j++)
    //   {
    //     console.log('\t' + tagsTree.childrenArray[i].childrenArray[j].name);
    //     for(let k=0;k<tagsTree.childrenArray[i].childrenArray[j].childrenArray.length; k++)
    //     {
    //       console.log('\t\t' + tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name);
    //     }
    //   }
    // }

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
    const div = document.createElement('div');
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
    div.appendChild(button);         // button の配置
    categories.append(div);

    // アコーディオンの大元
    const div_accordion =document.createElement('div');
    div_accordion.classList.add('accordion');
    categories.append(div_accordion);
    
    let haveChild = false;
    // **********
    // 大分類
    // **********
    for(let i=0; i<tagsTree.childrenArray.length; i++)
    {
      // <input type="checkbox" id="check1" class="accordion-hidden"></input>
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = 'check' + String(i);
      input.classList.add('accordion-hidden');       
      div_accordion.append(input);
      
      // <label for="check1" class="accordion-open">Question1</label>
      const label_open = document.createElement('label');

 

      label_open.htmlFor = input.id;
      label_open.classList.add('accordion-open');
      label_open.classList.add('button_tag1');
      label_open.textContent = `${tagsTree.childrenArray[i].name}`;
      // イベントの追加
      label_open.addEventListener("click", setItemListTree, false);
      label_open.eventParam = [
                            tagsTree.childrenArray[i].name,
                            '',
                            '',
                          ];
      label_open.style.overflow = 'hidden';
      div_accordion.append(label_open);

      // アイコンを追加する。
      const img_categorytag1 = document.createElement('img');
      // 対象画像を検索
      for(let detect = 0; detect < items.length; detect++) {
        if(items[detect].check_tag([tagsTree.childrenArray[i].name,'','']))
        {
          img_categorytag1.src = items[detect].designsrc;
          // img_category.src ="img/logos/c4_character_stop.png";
          break;
        }
      }
      
      // img_category.htmlFor = input.id;
      img_categorytag1.style.height = '100px';
      // img_category.style.width = '100px';
      img_categorytag1.style.textAlign = 'center';
      img_categorytag1.style.verticalAlign = 'center';
      img_categorytag1.style. display = 'inline-block';
      img_categorytag1.style.float =  'left';
      img_categorytag1.style.borderRadius = '5%';
      img_categorytag1.style.border = '2px solid silver';
      img_categorytag1.eventParam = [
        tagsTree.childrenArray[i].name,
        '',
        '',
      ];
      label_open.append(img_categorytag1);


    

      // <label for="check1" class="accordion-close"></label>
      const label_close = document.createElement('label');
      label_close.htmlFor = input.id;
      label_close.classList.add('accordion-close');
      div_accordion.append(label_close);

      // **********
      // 中分類
      // **********
      const div_tag2 = document.createElement('div');
      div_tag2.classList.add('tag-container');
      label_close.append(div_tag2);
      
      for(let j=0; j<tagsTree.childrenArray[i].childrenArray.length; j++)
      {
        if(0 < tagsTree.childrenArray[i].childrenArray[j].childrenArray.length)
      {
        haveChild = true;
      }
      else
      {
        haveChild = false;
      }
        // <input type="checkbox" id="check1" class="accordion-hidden"></input>
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'check' + String(i) + '_' + String(j);
        input.classList.add('accordion-hidden');
        div_tag2.append(input);

        // <label for="check1" class="accordion-open">Question1</label>
        const label_open = document.createElement('label');
        label_open.htmlFor = input.id;
        if(haveChild)
        {
          label_open.classList.add('accordion-open');
        }
        else
        {
          label_open.classList.add('accordion-open-none');
        }
        label_open.classList.add('button_tag2');
        label_open.textContent = `${tagsTree.childrenArray[i].childrenArray[j].name}`;

        // イベントの追加
        label_open.addEventListener("click", setItemListTree, false);
        label_open.eventParam = [
                                  tagsTree.childrenArray[i].name,
                                  tagsTree.childrenArray[i].childrenArray[j].name,
                                  '',
                            ];
        div_tag2.append(label_open);

        // アイコンを追加する。
        const img_categorytag2 = document.createElement('img');
        // 対象画像を検索
        for(let detect = 0; detect < items.length; detect++) {
          if(items[detect].check_tag([tagsTree.childrenArray[i].name,tagsTree.childrenArray[i].childrenArray[j].name,'']))
          {
            img_categorytag2.src = items[detect].designsrc;
            // img_category.src ="img/logos/c4_character_stop.png";
            break;
          }
        }
        
        // img_category.htmlFor = input.id;
        img_categorytag2.style.height = '50px';
        // img_category.style.width = '100px';
        img_categorytag2.style.textAlign = 'center';
        img_categorytag2.style.verticalAlign = 'center';
        img_categorytag2.style. display = 'inline-block';
        img_categorytag2.style.float =  'left';
        img_categorytag2.style.borderRadius = '5%';
        img_categorytag2.style.border = '2px solid silver';
        img_categorytag2.eventParam = [
          tagsTree.childrenArray[i].name,
          tagsTree.childrenArray[i].childrenArray[j].name,
          '',
        ];
        label_open.append(img_categorytag2);

        // <label for="check1" class="accordion-close"></label>
        const label_close = document.createElement('label');
        label_close.htmlFor = input.id;
        if(haveChild)
          {
            label_close.classList.add('accordion-close');
          }
          else
          {
            label_close.classList.add('accordion-close-none');
          }
        div_tag2.append(label_close);
        
        // **********
        // 小分類
        // **********

          haveChild = false;

        const div_tag3 = document.createElement('div');
        div_tag3.classList.add('tag-container');
        label_close.append(div_tag3);
        for(let k=0; k<tagsTree.childrenArray[i].childrenArray[j].childrenArray.length; k++)
        {
          // <input type="checkbox" id="check1" class="accordion-hidden"></input>
          const input = document.createElement('input');
          input.type = 'checkbox';
          input.id = 'check' + String(i) + '_' + String(j) + '_' + String(k);
          input.classList.add('accordion-hidden')
          div_tag3.append(input);

          // <label for="check1" class="accordion-open">Question1</label>
          const label_open = document.createElement('label');
          label_open.htmlFor = input.id;
          if(haveChild)
          {
            label_open.classList.add('accordion-open');
          }
          else
          {
            label_open.classList.add('accordion-open-none');
          }
          label_open.classList.add('button_tag3');
          label_open.textContent = `${tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name}`;
          // イベントの追加
          label_open.addEventListener("click", setItemListTree, false);
          label_open.eventParam = [
                                    tagsTree.childrenArray[i].name,
                                    tagsTree.childrenArray[i].childrenArray[j].name,
                                    tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name,
                              ];
          div_tag3.append(label_open);

          // <label for="check1" class="accordion-close"></label>
          const label_close = document.createElement('label');
          label_close.htmlFor = input.id;
          if(haveChild)
          {
            label_close.classList.add('accordion-close');
          }
          else
          {
            label_close.classList.add('accordion-close-none');
          }
          div_tag3.append(label_close);
        }
      }
    }
  }
  //--------------------------------------------
  // [Tree]カテゴリーリストを生成します。
  // ラジオボタン型(3階層)
  //--------------------------------------------
  function setCategoryListTree_radiobutton() {
    const tagsTree = new TagsTree('root');   // タグのTree

    //-----
    // カテゴリーボタンの要素をクリア
    //-----
    const categories = document.getElementById("accordionbox");
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

    //--------------------------------------
    // カテゴリすべてボタンの生成
    //--------------------------------------
    const div_tab = document.createElement('div');
    div_tab.classList.add('accordion-tab');
    div_tab.classList.add('button_tag_all');

    // input
    const input_tag = document.createElement('input');
    input_tag.type = 'radio';
    input_tag.name = 'tag_root';
    input_tag.id = 'radio_tag_root_all';
    input_tag.classList.add('accordion-input');
    div_tab.append(input_tag);
    // label
    const label_tag = document.createElement('label');
    label_tag.htmlFor = input_tag.id;
    label_tag.classList.add('accordion-label');
    // イベントの追加
    label_tag.addEventListener("click", setItemListTree, false);
    label_tag.eventParam = [
                          '',
                          '',
                          '',
                        ];
    div_tab.append(label_tag);

    // content
    const div_content = document.createElement('div');
    div_content.classList.add('accordion-content');
    div_tab.append(div_content);
    // info
    const div_info = document.createElement('div');
    div_info.classList.add('accordion-info');
    div_content.append(div_info);
    // span
    const span = document.createElement('span');
    span.classList.add('platform-name');
    span.textContent='すべて';
    div_info.append(span);

    categories.append(div_tab);

    
    // **********
    // 大分類
    // **********
    for(let i=0; i<tagsTree.childrenArray.length; i++)
    {
      const div_tab1 = document.createElement('div');
      div_tab1.classList.add('accordion-tab');
      div_tab1.classList.add('button_tag1');

      // input
      const input_tag1 = document.createElement('input');
      input_tag1.type = 'radio';
      input_tag1.name = 'tag_root';
      input_tag1.id = 'radio_tag_root_' + String(i);
      input_tag1.classList.add('accordion-input');
      div_tab1.append(input_tag1);
      // label
      const label_tag1 = document.createElement('label');
      label_tag1.htmlFor = input_tag1.id;
      label_tag1.classList.add('accordion-label');
      // イベントの追加
      label_tag1.addEventListener("click", setItemListTree, false);
      label_tag1.eventParam = [
                            tagsTree.childrenArray[i].name,
                            '',
                            '',
                          ];
      div_tab1.append(label_tag1);

      // content
      const div_content1 = document.createElement('div');
      div_content1.classList.add('accordion-content');
      div_tab1.append(div_content1);
      // info
      const div_info1 = document.createElement('div');
      div_info1.classList.add('accordion-info');
      div_content1.append(div_info1);
        // img
        const img_tag2 = document.createElement('img');
        img_tag2.classList.add('imgcategory');
        img_tag2.src = "img/hts001.webp";
        div_info1.append(img_tag2);
      // span
      const span1 = document.createElement('span');
      span1.classList.add('platform-name');
      span1.classList.add('button_tag1');
      span1.textContent = `${tagsTree.childrenArray[i].name}`;
      div_info1.append(span1);

      categories.append(div_tab1);

      
      // **********
      // 中分類
      // **********
      // 子要素を包む
      const div_tab_content1 = document.createElement('div');
      div_tab_content1.classList.add('accordion-tab-content');
      div_tab1.append(div_tab_content1);

      const div_wapper1 = document.createElement('div');
      div_wapper1.classList.add('wrapper');
      div_tab_content1.append(div_wapper1);
      for(let j=0; j<tagsTree.childrenArray[i].childrenArray.length; j++)
      {
        const div_tab2 = document.createElement('div');
        div_tab2.classList.add('accordion-tab');
        div_tab2.classList.add('button_tag2');

        // input
        const input_tag2 = document.createElement('input');
        input_tag2.type = 'radio';
        input_tag2.name = 'tag_root_' + String(i);
        input_tag2.id = 'radio_tag_root_' + String(i) + '_' + String(j);
        input_tag2.classList.add('accordion-input');
        div_tab2.append(input_tag2);

       
        // label
        const label_tag2 = document.createElement('label');
        label_tag2.htmlFor = input_tag2.id;
        label_tag2.classList.add('accordion-label');
        // イベントの追加
        label_tag2.addEventListener("click", setItemListTree, false);
        label_tag2.eventParam = [
                              tagsTree.childrenArray[i].name,
                              tagsTree.childrenArray[i].childrenArray[j].name,
                              '',
                            ];
      
      
        div_tab2.append(label_tag2);
      
        // content
        const div_content2 = document.createElement('div');
        div_content2.classList.add('accordion-content');
        div_tab2.append(div_content2);
        // info
        const div_info2 = document.createElement('div');
        div_info2.classList.add('accordion-info');
        div_content2.append(div_info2);
      
        // span
        const span2 = document.createElement('span');
        span2.classList.add('platform-name');
        span2.classList.add('button_tag2');
        span2.textContent = `${tagsTree.childrenArray[i].childrenArray[j].name}`;
        div_info2.append(span2);
        // 配置
        div_wapper1.append(div_tab2);
        
        // **********
        // 小分類
        // **********
        if(0<tagsTree.childrenArray[i].childrenArray[j].childrenArray.length)
        {

          // 子要素を包む
          const div_tab_content2 = document.createElement('div');
          div_tab_content2.classList.add('accordion-tab-content');
          div_tab2.append(div_tab_content2);
          
          const div_wapper2 = document.createElement('div');
          div_wapper2.classList.add('wrapper');
          div_tab_content2.append(div_wapper2);
          for(let k=0; k<tagsTree.childrenArray[i].childrenArray[j].childrenArray.length; k++)
          {
            const div_tab3 = document.createElement('div');
            div_tab3.classList.add('accordion-tab');
            div_tab3.classList.add('button_tag3');
            
            // input
            const input_tag3 = document.createElement('input');
            input_tag3.type = 'radio';
            input_tag3.name = 'tag_root_' + String(i) + '_' + String(j);
            input_tag3.id = 'radio_tag_root_' + String(i) + '_' + String(j) + '_' + String(k);
            input_tag3.classList.add('accordion-input');
            div_tab3.append(input_tag3);
            // label
            const label_tag3 = document.createElement('label');
            label_tag3.htmlFor = input_tag3.id;
            label_tag3.classList.add('accordion-label');
            // イベントの追加
            label_tag3.addEventListener("click", setItemListTree, false);
            label_tag3.eventParam = [
              tagsTree.childrenArray[i].name,
              tagsTree.childrenArray[i].childrenArray[j].name,
              tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name,
            ];
            div_tab3.append(label_tag3);
            
            // content
            const div_content3 = document.createElement('div');
            div_content3.classList.add('accordion-content');
            div_tab3.append(div_content3);
            // info
            const div_info3 = document.createElement('div');
            div_info3.classList.add('accordion-info');
            div_content3.append(div_info3);
            // span
            const span3 = document.createElement('span');
            span3.classList.add('platform-name');
            span3.classList.add('button_tag3');
            span3.textContent = `${tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name}`;
            div_info3.append(span3);
            // 配置
            div_wapper2.append(div_tab3);            
          }
        }
      }
    }
  }

  //--------------------------------------------
  // 商品が選ばれているか確認します。
  //--------------------------------------------
  function IsSelectItem() {
    if(currentIndex < 0)
    {
      alert("商品をえらんでください");
      return false;
    }
    return true;
  }
  //--------------------------------------------
  // 試着可能なアイテムか確認します。
  //--------------------------------------------
  function IsHaveUUID() {
    if(currentIndex < 0)
    {
      alert("商品をえらんでください");
      return false;
    }
    if(selectedItem.uuid === '')
    {
      alert("試着できない商品です。");
      return false;
    }
    return true;
  }
  //--------------------------------------------
  // カメラ撮影に遷移します。
  //--------------------------------------------
  function gotoCamera() {
    if(!IsSelectItem())return;
    if(!IsHaveUUID())return;
    location.href='camera.html'
  }
  //--------------------------------------------
  // 注文画面に遷移します。
  //--------------------------------------------
  function gotoOrder() {
    if(!IsSelectItem())return;
    location.href='order.html'
  }

  //--------------------------------------------
  // 初期処理
  //--------------------------------------------
  // カテゴリーリストの作成
  setCategoryListTree_checkbox();
  // 対象アイテムの表示
  setItemListTree(['','','']);
}