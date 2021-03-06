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
    new ClothItem('', 'ふうせんねこ1',  'SNK001', 'img/SNK001.png','img/SNK001.png','商品選択', 'せなけいこ','ふうせんねこ'),
    new ClothItem('', 'ふうせんねこ2',  'SNK002', 'img/SNK002.png','img/SNK002.png','商品選択', 'せなけいこ','ふうせんねこ'),
    
    // せなけいこ-きれいなはこ
    new ClothItem('', 'おばけ', 'SNK003', 'img/SNK003.png','img/SNK003.png','商品選択', 'せなけいこ','きれいなはこ'),
    new ClothItem('', 'ねこちゃん', 'SNK004', 'img/SNK004.png','img/SNK004.png','商品選択', 'せなけいこ','きれいなはこ'),
    new ClothItem('', 'わんちゃん', 'SNK005', 'img/SNK005.png','img/SNK005.png','商品選択', 'せなけいこ','きれいなはこ'),

    // せなけいこ-ねないこだれだ
    new ClothItem('', 'ふくろうとみみずく', 'SNK006', 'img/SNK006.png','img/SNK006.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', 'くろねこ', 'SNK007', 'img/SNK007.png','img/SNK007.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', 'ねずみ', 'SNK008', 'img/SNK008.png','img/SNK008.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', 'おばけ1', 'SNK009', 'img/SNK009.png','img/SNK009.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', 'おばけ2', 'SNK010', 'img/SNK010.png','img/SNK010.png','商品選択', 'せなけいこ','ねないこだれだ'),


    // せなけいこ-いやだいやだ
    new ClothItem('', 'おひさま', 'SNK011', 'img/SNK011.png','img/SNK011.png','商品選択', 'せなけいこ','いやだいやだ'),
    new ClothItem('', 'くつ', 'SNK012', 'img/SNK012.png','img/SNK012.png','商品選択', 'せなけいこ','いやだいやだ'),
    new ClothItem('', 'くまちゃん', 'SNK013', 'img/SNK013.png','img/SNK013.png','商品選択', 'せなけいこ','いやだいやだ'),

    // せなけいこ-もじゃもじゃ
    new ClothItem('', 'ころ', 'SNK014', 'img/SNK014.png','img/SNK014.png','商品選択', 'せなけいこ','もじゃもじゃ'),
    new ClothItem('', 'ルルちゃん2', 'SNK016', 'img/SNK015.png','img/SNK015.png','商品選択', 'せなけいこ','もじゃもじゃ'),
    new ClothItem('', 'ルルちゃん1', 'SNK015', 'img/SNK016.png','img/SNK016.png','商品選択', 'せなけいこ','もじゃもじゃ'),

    // せなけいこ-にんじん
    new ClothItem('', 'うまさん', 'SNK017', 'img/SNK017.png','img/SNK017.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'きりんさん', 'SNK018', 'img/SNK018.png','img/SNK018.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'おさるさん', 'SNK019', 'img/SNK019.png','img/SNK019.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'ぶたさん', 'SNK020', 'img/SNK020.png','img/SNK020.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'かばさん', 'SNK021', 'img/SNK021.png','img/SNK021.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'うさぎさん', 'SNK022', 'img/SNK022.png','img/SNK022.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'ぼく', 'SNK023', 'img/SNK023.png','img/SNK023.png','商品選択', 'せなけいこ','にんじん'),
    
    // せなけいこ-あーんあん
    new ClothItem('', 'みんな', 'SNK026', 'img/SNK024.png','img/SNK024.png','商品選択', 'せなけいこ','あーんあん'),
    new ClothItem('', 'ぼく2', 'SNK025', 'img/SNK025.png','img/SNK025.png','商品選択', 'せなけいこ','あーんあん'),
    new ClothItem('', 'ぼく1', 'SNK024', 'img/SNK026.png','img/SNK026.png','商品選択', 'せなけいこ','あーんあん'),
    
    // せなけいこ-ルルちゃんのくつした
    new ClothItem('', 'ルルちゃん', 'SNK027', 'img/SNK027.png','img/SNK027.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', 'うさこ', 'SNK028', 'img/SNK028.png','img/SNK028.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', 'わんこ', 'SNK029', 'img/SNK029.png','img/SNK029.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', 'ねこちゃん', 'SNK030', 'img/SNK030.png','img/SNK030.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', 'ぞうさん', 'SNK031', 'img/SNK031.png','img/SNK031.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),

    // せなけいこ-にゃんにゃん
    new ClothItem('', 'とらねこ', 'SNK-032', 'img/SNK032.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', 'くろいねこ', 'SNK-033', 'img/SNK033.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', 'ねこちゃん', 'SNK-034', 'img/SNK034.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', 'ぶちねこ', 'SNK-035', 'img/SNK035.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', 'にゃんにゃん', 'SNK-036', 'img/SNK036.png','','商品選択', 'せなけいこ','にゃんにゃん'),



    // ハトソン探偵団
    new ClothItem('', 'ハトソンくん(基本)', 'HTS001', 'img/HTS001.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', 'よろこビーバー(基本)', 'HTS002', 'img/HTS002.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', 'ほしいゾウ(基本)', 'HTS003', 'img/HTS003.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', 'オットセール(基本)', 'HTS004', 'img/HTS004.png','','商品選択', 'ハトソン探偵団','オットセール'),

    new ClothItem('', 'ハトソンくん(説明)', 'HTS005', 'img/HTS005.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', 'よろこビーバー(説明)', 'HTS006', 'img/HTS006.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', 'ほしいゾウ(説明)', 'HTS007', 'img/HTS007.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', 'オットセール(説明)', 'HTS008', 'img/HTS008.png','','商品選択', 'ハトソン探偵団','オットセール'),

    new ClothItem('', 'ハトソンくん(歩く)', 'HTS009', 'img/HTS009.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', 'よろこビーバー(歩く)', 'HTS010', 'img/HTS010.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', 'ほしいゾウ(歩く)', 'HTS011', 'img/HTS011.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', 'オットセール(歩く)', 'HTS012', 'img/HTS012.png','','商品選択', 'ハトソン探偵団','オットセール'),

    new ClothItem('', 'ハトソンくん(よろこぶ)', 'HTS013', 'img/HTS013.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', 'よろこビーバー(よろこぶ)', 'HTS014', 'img/HTS014.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', 'ほしいゾウ(よろこぶ)', 'HTS015', 'img/HTS015.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', 'オットセール(よろこぶ)', 'HTS016', 'img/HTS016.png','','商品選択', 'ハトソン探偵団','オットセール'),
    
    new ClothItem('', 'ハトソンくん(おじぎ)', 'HTS017', 'img/HTS017.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', 'よろこビーバー(おじぎ)', 'HTS018', 'img/HTS018.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', 'ほしいゾウ(おじぎ)', 'HTS019', 'img/HTS019.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', 'オットセール(おじぎ)', 'HTS020', 'img/HTS020.png','','商品選択', 'ハトソン探偵団','オットセール'),

    
    
    // はんこ-動物
    new ClothItem('', 'にわとり', 'HNK046', 'img/HNK046.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'りす', 'HNK047', 'img/HNK047.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'ひつじ', 'HNK048', 'img/HNK048.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'ぞう', 'HNK049', 'img/HNK049.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'はと', 'HNK042', 'img/HNK042.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'ねこ', 'HNK043', 'img/HNK043.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'いぬ', 'HNK044', 'img/HNK044.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'はりねずみ', 'HNK045', 'img/HNK045.png','','商品選択', 'はんこ','どうぶつ'),
    
    // はんこ-お花
    new ClothItem('', 'お花1', 'HNK005', 'img/HNK005.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花2', 'HNK006', 'img/HNK006.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花3', 'HNK007', 'img/HNK007.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花4', 'HNK008', 'img/HNK008.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花5', 'HNK009', 'img/HNK009.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花6', 'HNK010', 'img/HNK010.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花7', 'HNK011', 'img/HNK011.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花8', 'HNK012', 'img/HNK012.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花9', 'HNK013', 'img/HNK013.png','','商品選択', 'はんこ','お花'),
    
    // はんこ-食べ物
    new ClothItem('', 'みかん', 'HNK031', 'img/HNK031.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', '洋ナシ', 'HNK032', 'img/HNK032.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'にんじん', 'HNK014', 'img/HNK014.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'えだまめ', 'HNK015', 'img/HNK015.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'ぴーまん', 'HNK016', 'img/HNK016.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'とうがらし', 'HNK017', 'img/HNK017.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'ばなな', 'HNK018', 'img/HNK018.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'りんご１', 'HNK019', 'img/HNK019.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'おれんじ', 'HNK020', 'img/HNK020.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'すいか', 'HNK021', 'img/HNK021.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'りんご2', 'HNK029', 'img/HNK029.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'さくらんぼ', 'HNK030', 'img/HNK030.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'アイスクリーム', 'HNK033', 'img/HNK033.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'ソフトクリーム', 'HNK034', 'img/HNK034.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'アイス', 'HNK035', 'img/HNK035.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'かき氷', 'HNK036', 'img/HNK036.png','','商品選択', 'はんこ','たべもの'),
    
    // はんこ-日本
    new ClothItem('', 'こけし', 'HNK058', 'img/HNK058.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'けん玉', 'HNK059', 'img/HNK059.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', '紙ふうせん', 'HNK060', 'img/HNK060.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'こま', 'HNK061', 'img/HNK061.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', '折リヅル', 'HNK062', 'img/HNK062.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'さけ1', 'HNK063', 'img/HNK063.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'さけ2', 'HNK064', 'img/HNK064.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'さけ3', 'HNK065', 'img/HNK065.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'ひょうたん', 'HNK066', 'img/HNK066.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'きゅうす', 'HNK067', 'img/HNK067.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'お茶', 'HNK068', 'img/HNK068.png','','商品選択', 'はんこ','日本'),
    
    // はんこ-お天気
    new ClothItem('', '雪', 'HNK069', 'img/HNK069.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '晴れ', 'HNK070', 'img/HNK070.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '雨', 'HNK071', 'img/HNK071.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '雷雲', 'HNK072', 'img/HNK072.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '雨雲', 'HNK073', 'img/HNK073.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', 'くもり', 'HNK074', 'img/HNK074.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '星', 'HNK075', 'img/HNK075.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '月', 'HNK076', 'img/HNK076.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '太陽', 'HNK077', 'img/HNK077.png','','商品選択', 'はんこ','お天気'),
    
    // はんこ-乗り物
    new ClothItem('', '車', 'HNK045', 'img/HNK037.png','','商品選択', 'はんこ','乗り物'),
    new ClothItem('', 'バス', 'HNK046', 'img/HNK038.png','','商品選択', 'はんこ','乗り物'),
    new ClothItem('', '飛行機', 'HNK047', 'img/HNK039.png','','商品選択', 'はんこ','乗り物'),
    new ClothItem('', 'バイク', 'HNK048', 'img/HNK040.png','','商品選択', 'はんこ','乗り物'),    
    new ClothItem('', '自転車', 'HNK049', 'img/HNK041.png','','商品選択', 'はんこ','乗り物'),
    
    // はんこ-その他
    new ClothItem('', 'ハート1', 'HNK001', 'img/HNK001.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'スター1', 'HNK002', 'img/HNK002.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'スター2', 'HNK003', 'img/HNK003.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'ハート2', 'HNK004', 'img/HNK004.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'パーティ1', 'HNK022', 'img/HNK022.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'パーティ2', 'HNK023', 'img/HNK023.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'パーティ3', 'HNK024', 'img/HNK024.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'パーティ4', 'HNK025', 'img/HNK025.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '旅1', 'HNK026', 'img/HNK026.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '旅2', 'HNK027', 'img/HNK027.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '旅3', 'HNK028', 'img/HNK028.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'マリン1', 'HNK050', 'img/HNK050.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'マリン2', 'HNK051', 'img/HNK051.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'マリン3', 'HNK052', 'img/HNK052.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'マリン4', 'HNK053', 'img/HNK053.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '楽器1', 'HNK054', 'img/HNK054.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '楽器2', 'HNK055', 'img/HNK055.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '楽器3', 'HNK056', 'img/HNK056.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '楽器4', 'HNK057', 'img/HNK057.png','','商品選択', 'はんこ','その他'),

    // ゆるふわ-どうぶつ
    new ClothItem('', 'くじら', 'YRF001', 'img/YRF001.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'らいおん', 'YRF002', 'img/YRF002.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'くま１', 'YRF003', 'img/YRF003.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'こあら', 'YRF004', 'img/YRF004.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'かんがるー', 'YRF005', 'img/YRF005.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'かば', 'YRF006', 'img/YRF006.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いか', 'YRF007', 'img/YRF007.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ひつじ１', 'YRF008', 'img/YRF008.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'はむすたー', 'YRF009', 'img/YRF009.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ごりら', 'YRF010', 'img/YRF010.png','','商品選択', 'ゆるふわ','どうぶつ'),

    new ClothItem('', 'ぞう', 'YRF011', 'img/YRF011.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いぬ１', 'YRF012', 'img/YRF012.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'だちょう', 'YRF013', 'img/YRF013.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ねこ１', 'YRF014', 'img/YRF014.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ぶた', 'YRF015', 'img/YRF015.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'あひる', 'YRF016', 'img/YRF016.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ありくい', 'YRF017', 'img/YRF017.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'やぎ', 'YRF018', 'img/YRF018.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'わし', 'YRF019', 'img/YRF019.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'わに', 'YRF020', 'img/YRF020.png','','商品選択', 'ゆるふわ','どうぶつ'),
    
    new ClothItem('', 'うさぎ１', 'YRF021', 'img/YRF021.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'はくちょう', 'YRF022', 'img/YRF022.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'しか', 'YRF023', 'img/YRF023.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'おおかみ', 'YRF024', 'img/YRF024.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'さる１', 'YRF025', 'img/YRF025.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'くま２', 'YRF026', 'img/YRF026.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'たこ', 'YRF027', 'img/YRF027.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うさぎ２', 'YRF028', 'img/YRF028.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'となかい', 'YRF029', 'img/YRF029.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うま', 'YRF030', 'img/YRF030.png','','商品選択', 'ゆるふわ','どうぶつ'),
    
    new ClothItem('', 'つるかめ', 'YRF031', 'img/YRF031.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いのしし', 'YRF032', 'img/YRF032.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ひつじ２', 'YRF033', 'img/YRF033.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'りゅう', 'YRF034', 'img/YRF034.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いぬ２', 'YRF035', 'img/YRF035.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'にわとり', 'YRF036', 'img/YRF036.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'さる２', 'YRF037', 'img/YRF037.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'へび', 'YRF038', 'img/YRF038.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うし', 'YRF039', 'img/YRF039.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うさぎ３', 'YRF040', 'img/YRF040.png','','商品選択', 'ゆるふわ','どうぶつ'),
    
    new ClothItem('', 'とら', 'YRF041', 'img/YRF041.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ねずみ', 'YRF042', 'img/YRF042.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ねこ２', 'YRF043', 'img/YRF043.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いぬ３', 'YRF044', 'img/YRF044.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'くろねこ', 'YRF045', 'img/YRF045.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'くろねこ', 'YRF046', 'img/YRF046.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'かえる', 'YRF047', 'img/YRF047.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うさぎ４', 'YRF048', 'img/YRF048.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'りす', 'YRF049', 'img/YRF049.png','','商品選択', 'ゆるふわ','どうぶつ'),
    
    // ゆるふわ-お花
    new ClothItem('', 'つばき', 'YRF050', 'img/YRF050.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'たんぽぽ', 'YRF051', 'img/YRF051.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'すずらん', 'YRF052', 'img/YRF052.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'すみれ', 'YRF053', 'img/YRF053.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'すいせん', 'YRF054', 'img/YRF054.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'らん', 'YRF055', 'img/YRF055.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'らなんきゅらす', 'YRF056', 'img/YRF056.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'ぱんじー', 'YRF057', 'img/YRF057.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'なのはな', 'YRF058', 'img/YRF058.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'ねこじゃらし', 'YRF059', 'img/YRF059.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'もも', 'YRF060', 'img/YRF060.png','','商品選択', 'ゆるふわ','お花'),
    
    new ClothItem('', 'まーがれっと', 'YRF061', 'img/YRF061.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'きく', 'YRF062', 'img/YRF062.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'いね', 'YRF063', 'img/YRF063.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ひがんばな', 'YRF064', 'img/YRF064.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ふじのはな', 'YRF065', 'img/YRF065.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ふりーじあ', 'YRF066', 'img/YRF066.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'くろっかす', 'YRF067', 'img/YRF067.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'しくらめん', 'YRF068', 'img/YRF068.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'こすもす', 'YRF069', 'img/YRF069.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ひまわり', 'YRF070', 'img/YRF070.png','','商品選択', 'ゆるふわ',''),
    
    // ゆるふわ-むし
    new ClothItem('', 'てんとうむし', 'YRF071', 'img/YRF071.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'たまむし', 'YRF072', 'img/YRF072.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'おにやんま', 'YRF073', 'img/YRF073.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'もんしろちょう', 'YRF074', 'img/YRF074.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'みつばち', 'YRF075', 'img/YRF075.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'みのむし', 'YRF076', 'img/YRF076.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'みんみんぜみ', 'YRF077', 'img/YRF077.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'くわがた(めす)', 'YRF078', 'img/YRF078.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'くわがた(おす)', 'YRF079', 'img/YRF079.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'くも', 'YRF80', 'img/YRF080.png','','商品選択', 'ゆるふわ','むし'),

    new ClothItem('', 'くまぜみ', 'YRF081', 'img/YRF081.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'こおろぎ', 'YRF082', 'img/YRF082.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'きりぎりす', 'YRF083', 'img/YRF083.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'かめむし', 'YRF084', 'img/YRF084.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'かまきり', 'YRF085', 'img/YRF085.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'かぶとむし', 'YRF086', 'img/YRF086.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'いととんぼ', 'YRF087', 'img/YRF087.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'いもむし', 'YRF088', 'img/YRF088.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'ほたる', 'YRF089', 'img/YRF089.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'ぎんやんま', 'YRF090', 'img/YRF090.png','','商品選択', 'ゆるふわ','むし'),
    
    new ClothItem('', 'かたつむり', 'YRF091', 'img/YRF091.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'だんごむし', 'YRF092', 'img/YRF092.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'あり', 'YRF093', 'img/YRF093.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'あかとんぼ', 'YRF094', 'img/YRF094.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'あげはちょう', 'YRF095', 'img/YRF095.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'あぶらぜみ', 'YRF096', 'img/YRF096.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'かたつむり', 'YRF097', 'img/YRF097.png','','商品選択', 'ゆるふわ','むし'),

    // ゆるふわ-おさかな
    new ClothItem('', 'たこ', 'YRF098', 'img/YRF098.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'たい', 'YRF099', 'img/YRF099.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'さんま', 'YRF100', 'img/YRF100.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'さめ', 'YRF101', 'img/YRF101.png','','商品選択', 'ゆるふわ',''),
    
    new ClothItem('', 'さけ', 'YRF102', 'img/YRF102.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'まぐろ', 'YRF103', 'img/YRF103.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'かい', 'YRF104', 'img/YRF104.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'えび', 'YRF105', 'img/YRF105.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'さば', 'YRF106', 'img/YRF106.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ひらめ', 'YRF107', 'img/YRF107.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ふぐ', 'YRF108', 'img/YRF108.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'かれい', 'YRF109', 'img/YRF109.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'いか', 'YRF110', 'img/YRF110.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'やどかり', 'YRF111', 'img/YRF111.png','','商品選択', 'ゆるふわ',''),

    new ClothItem('', 'かに', 'YRF-112', 'img/YRF112.png','','商品選択', 'ゆるふわ',''),

    // ゆるふわ-イベント
    new ClothItem('', 'イベント1', 'YRF113', 'img/YRF113.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント2', 'YRF114', 'img/YRF114.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント3', 'YRF115', 'img/YRF115.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント4', 'YRF116', 'img/YRF116.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント5', 'YRF117', 'img/YRF117.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント6', 'YRF118', 'img/YRF118.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント7', 'YRF119', 'img/YRF119.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント8', 'YRF120', 'img/YRF120.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント9', 'YRF121', 'img/YRF121.png','','商品選択', 'ゆるふわ','イベント'),
    
    new ClothItem('', 'イベント10', 'YRF122', 'img/YRF122.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント11', 'YRF123', 'img/YRF123.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント12', 'YRF124', 'img/YRF124.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント13', 'YRF125', 'img/YRF125.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント14', 'YRF126', 'img/YRF133.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント15', 'YRF127', 'img/YRF134.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント16', 'YRF128', 'img/YRF135.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント17', 'YRF129', 'img/YRF136.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント18', 'YRF130', 'img/YRF138.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント19', 'YRF131', 'img/YRF139.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント20', 'YRF132', 'img/YRF140.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント21', 'YRF133', 'img/YRF146.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント22', 'YRF134', 'img/YRF141.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント23', 'YRF135', 'img/YRF142.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント24', 'YRF136', 'img/YRF143.png','','商品選択', 'ゆるふわ','イベント'),
    
    // ゆるふわ-たべもの
    new ClothItem('', 'ぷりん', 'YRF137', 'img/YRF126.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'たいやき', 'YRF138', 'img/YRF127.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'ぱふぇ', 'YRF139', 'img/YRF128.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'けーき', 'YRF140', 'img/YRF129.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'だんご', 'YRF141', 'img/YRF130.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'ほっとけーき', 'YRF142', 'img/YRF131.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'きゃんでぃー', 'YRF143', 'img/YRF132.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'そふとくりーむ', 'YRF144', 'img/YRF137.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'すし', 'YRF145', 'img/YRF144.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'すいか', 'YRF146', 'img/YRF145.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'ぴざ', 'YRF147', 'img/YRF147.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'おにぎり', 'YRF148', 'img/YRF148.png','','商品選択', 'ゆるふわ','たべもの'),
    
    

    // [TryOn] せなけいこ
    new ClothItem('4eb4eadc-54ed-44ce-a825-b00e14f13bf7', 'ふうせんねこ1', 'SNK001', 'img/SNK001.png','img/e1-t.png','TryOn', 'せなけいこ',''),
    new ClothItem('5659faca-7d0a-44e6-97ee-831927bdf9c0', 'ふうせんねこ2', 'SNK002', 'img/SNK002.png','img/e2-t.png','TryOn', 'せなけいこ',''),
    new ClothItem('772bf012-6554-4d0f-baae-569b7a25f915', 'おばけ', 'SNK003', 'img/SNK003.png','img/e3-t.png','TryOn', 'せなけいこ',''),
    new ClothItem('1c1afadd-ba61-4eb9-937d-a4002aad6714', 'ねこちゃん', 'SNK004', 'img/SNK004.png','img/e4-t.png','TryOn', 'せなけいこ',''),
    // [TryOn] スーツ
    new ClothItem('6c3cd363-fb3a-4312-9c48-7f62cbbfa614', 'スーツ1', 'SUI-001', 'img/ee4272f9-c172-4843-adc3-2c85360bf1b5.jpg','','TryOn', 'スーツ',''),
    new ClothItem('1617ff56-6575-42eb-9c64-f111b542683b', 'スーツ2', 'SUI-002', 'img/ccca02db-fdaf-42bd-a026-a1e6394b3499.jpg','','TryOn', 'スーツ',''),
    // [TryOn] 浴衣
    new ClothItem('65481657-7d5c-4a20-9524-cda6d0286ec2', 'ゆかた1', 'YKT-001', 'img/9ef29bde-cd79-4cec-8331-3418a92962e2.jpg','','TryOn', 'ゆかた',''),
    new ClothItem('53fffeef-91c7-4d0b-8d01-edc30075054b', 'ゆかた2', 'YKT-002', 'img/f6f5eb8f-844d-43bf-82cd-77c0f0867ece.jpg','','TryOn', 'ゆかた',''),
  ];

  // 現在選択中の画像
  let currentIndex = -1;
  // 現在選択中のアイテム
  let selectedItem = new ClothItem('', '', '', '','','', '','');
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
    selectedItem = new ClothItem(
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

  

  //--------------------------------------------
  // 商品が選ばれているか確認します。
  //--------------------------------------------
  function IsSelectItem() {
    if(currentIndex < 0)
    {
      alert("えらんでください");
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
      alert("えらんでください");
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
  // 画面構成を作る
  // setItemList('');
  // setCategoryList();
  setCategoryListTree();
  setItemListTree(['','','']);
}