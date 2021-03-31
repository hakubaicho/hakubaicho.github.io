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
    new ClothItem('', 'ふうせんねこ1',  'SNK-001', 'img/book1-1.png','img/s0001.png','商品選択', 'せなけいこ','ふうせんねこ'),
    new ClothItem('', 'ふうせんねこ2',  'SNK-002', 'img/book1-2.png','img/s0002.png','商品選択', 'せなけいこ','ふうせんねこ'),

    // せなけいこ-ねないこだれだ
    new ClothItem('', 'ふくろうとみみずく', 'SNK-003', 'img/book3-1.png','img/s0006.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', 'くろねこ', 'SNK-004', 'img/book3-2.png','img/s0007.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', 'ねずみ', 'SNK-005', 'img/book3-3.png','img/s0008.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', 'おばけ1', 'SNK-006', 'img/book3-4.png','img/s0009.png','商品選択', 'せなけいこ','ねないこだれだ'),
    new ClothItem('', 'おばけ2', 'SNK-007', 'img/book3-5.png','img/s0010.png','商品選択', 'せなけいこ','ねないこだれだ'),

      // せなけいこ-きれいなはこ
    new ClothItem('', 'おばけ', 'SNK-008', 'img/book2-1.png','img/s0003.png','商品選択', 'せなけいこ','きれいなはこ'),
    new ClothItem('', 'ねこちゃん', 'SNK-009', 'img/book2-2.png','img/s0004.png','商品選択', 'せなけいこ','きれいなはこ'),
    new ClothItem('', 'わんちゃん', 'SNK-010', 'img/book2-3.png','img/s0005.png','商品選択', 'せなけいこ','きれいなはこ'),

    // せなけいこ-いやだいやだ
    new ClothItem('', 'おひさま', 'SNK-011', 'img/book4-1.png','img/s0011.png','商品選択', 'せなけいこ','いやだいやだ'),
    new ClothItem('', 'くつ', 'SNK-012', 'img/book4-2.png','img/s0012.png','商品選択', 'せなけいこ','いやだいやだ'),
    new ClothItem('', 'くまちゃん', 'SNK-013', 'img/book4-3.png','img/s0013.png','商品選択', 'せなけいこ','いやだいやだ'),

    // せなけいこ-もじゃもじゃ
    new ClothItem('', 'ころ', 'SNK-014', 'img/book5-1.png','img/s0014.png','商品選択', 'せなけいこ','もじゃもじゃ'),
    new ClothItem('', 'ルルちゃん1', 'SNK-015', 'img/book5-2.png','img/s0015.png','商品選択', 'せなけいこ','もじゃもじゃ'),
    new ClothItem('', 'ルルちゃん2', 'SNK-016', 'img/book5-3.png','img/s0016.png','商品選択', 'せなけいこ','もじゃもじゃ'),

    // せなけいこ-にんじん
    new ClothItem('', 'うまさん', 'SNK-017', 'img/book6-1.png','img/s0017.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'きりんさん', 'SNK-018', 'img/book6-2.png','img/s0018.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'おさるさん', 'SNK-019', 'img/book6-3.png','img/s0019.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'ぶたさん', 'SNK-020', 'img/book6-4.png','img/s0020.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'かばさん', 'SNK-021', 'img/book6-5.png','img/s0021.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'うさぎさん', 'SNK-022', 'img/book6-6.png','img/s0022.png','商品選択', 'せなけいこ','にんじん'),
    new ClothItem('', 'ぼく', 'SNK-023', 'img/book6-7.png','img/s0023.png','商品選択', 'せなけいこ','にんじん'),
    
    // せなけいこ-あーんあん
    new ClothItem('', 'ぼく1', 'SNK-024', 'img/book7-1.png','img/s0024.png','商品選択', 'せなけいこ','あーんあん'),
    new ClothItem('', 'ぼく2', 'SNK-025', 'img/book7-2.png','img/s0025.png','商品選択', 'せなけいこ','あーんあん'),
    new ClothItem('', 'みんな', 'SNK-026', 'img/book7-3.png','img/s0026.png','商品選択', 'せなけいこ','あーんあん'),
    
    // せなけいこ-ルルちゃんのくつした
    new ClothItem('', 'ルルちゃん', 'SNK-027', 'img/book8-1.png','img/s0027.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', 'うさこ', 'SNK-028', 'img/book8-2.png','img/s0028.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', 'わんこ', 'SNK-029', 'img/book8-3.png','img/s0029.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', 'ねこちゃん', 'SNK-030', 'img/book8-4.png','img/s0030.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),
    new ClothItem('', 'ぞうさん', 'SNK-031', 'img/book8-5.png','img/s0031.png','商品選択', 'せなけいこ','ルルちゃんのくつした'),

    // せなけいこ-にゃんにゃん
    new ClothItem('', 'とらねこ', 'SNK-032', 'img/b1.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', 'ねこちゃん', 'SNK-033', 'img/b2.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', 'くろいねこ', 'SNK-034', 'img/b3.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', 'ぶちねこ', 'SNK-035', 'img/b4.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    new ClothItem('', 'にゃんにゃん', 'SNK-036', 'img/b5.png','','商品選択', 'せなけいこ','にゃんにゃん'),
    // ハトソン探偵団
    new ClothItem('', 'ハトソンくん(基本)', 'HTS-001', 'img/ht1.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', 'ハトソンくん(説明)', 'HTS-002', 'img/ht5.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', 'ハトソンくん(歩く)', 'HTS-003', 'img/ht9.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', 'ハトソンくん(よろこぶ)', 'HTS-004', 'img/ht13.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),
    new ClothItem('', 'ハトソンくん(おじぎ)', 'HTS-005', 'img/ht17.png','','商品選択', 'ハトソン探偵団','ハトソンくん'),

    new ClothItem('', 'よろこビーバー(基本)', 'HTS-006', 'img/ht2.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', 'よろこビーバー(説明)', 'HTS-007', 'img/ht6.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', 'よろこビーバー(歩く)', 'HTS-008', 'img/ht10.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', 'よろこビーバー(よろこぶ)', 'HTS-009', 'img/ht14.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),
    new ClothItem('', 'よろこビーバー(おじぎ)', 'HTS-010', 'img/ht18.png','','商品選択', 'ハトソン探偵団','よろこビーバー'),

    new ClothItem('', 'ほしいゾウ(基本)', 'HTS-011', 'img/ht3.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', 'ほしいゾウ(説明)', 'HTS-012', 'img/ht7.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', 'ほしいゾウ(歩く)', 'HTS-013', 'img/ht11.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', 'ほしいゾウ(よろこぶ)', 'HTS-014', 'img/ht15.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),
    new ClothItem('', 'ほしいゾウ(おじぎ)', 'HTS-015', 'img/ht19.png','','商品選択', 'ハトソン探偵団','ほしいゾウ'),

    new ClothItem('', 'オットセール(基本)', 'HTS-016', 'img/ht4.png','','商品選択', 'ハトソン探偵団','オットセール'),
    new ClothItem('', 'オットセール(説明)', 'HTS-017', 'img/ht8.png','','商品選択', 'ハトソン探偵団','オットセール'),
    new ClothItem('', 'オットセール(歩く)', 'HTS-018', 'img/ht12.png','','商品選択', 'ハトソン探偵団','オットセール'),
    new ClothItem('', 'オットセール(よろこぶ)', 'HTS-019', 'img/ht16.png','','商品選択', 'ハトソン探偵団','オットセール'),
    new ClothItem('', 'オットセール(おじぎ)', 'HTS-020', 'img/ht20.png','','商品選択', 'ハトソン探偵団','オットセール'),

    
    
    // はんこ-動物
    new ClothItem('', 'にわとり', 'HNK-033', 'img/s46.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'りす', 'HNK-034', 'img/s47.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'ひつじ', 'HNK-035', 'img/s48.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'ぞう', 'HNK-036', 'img/s49.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'はと', 'HNK-037', 'img/s42.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'ねこ', 'HNK-038', 'img/s43.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'いぬ', 'HNK-039', 'img/s44.png','','商品選択', 'はんこ','どうぶつ'),
    new ClothItem('', 'はりねずみ', 'HNK-040', 'img/s45.png','','商品選択', 'はんこ','どうぶつ'),
    
    // はんこ-お花
    new ClothItem('', 'お花1', 'HNK-005', 'img/s5.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花2', 'HNK-006', 'img/s6.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花3', 'HNK-007', 'img/s7.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花4', 'HNK-008', 'img/s8.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花5', 'HNK-009', 'img/s9.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花6', 'HNK-010', 'img/s10.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花7', 'HNK-011', 'img/s11.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花8', 'HNK-012', 'img/s12.png','','商品選択', 'はんこ','お花'),
    new ClothItem('', 'お花9', 'HNK-013', 'img/s13.png','','商品選択', 'はんこ','お花'),
    
    // はんこ-食べ物
    new ClothItem('', 'みかん', 'HNK-031', 'img/s31.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', '洋ナシ', 'HNK-032', 'img/s32.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'にんじん', 'HNK-014', 'img/s14.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'えだまめ', 'HNK-015', 'img/s15.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'ぴーまん', 'HNK-016', 'img/s16.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'とうがらし', 'HNK-017', 'img/s17.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'ばなな', 'HNK-018', 'img/s18.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'りんご１', 'HNK-019', 'img/s19.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'おれんじ', 'HNK-020', 'img/s20.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'すいか', 'HNK-021', 'img/s21.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'りんご2', 'HNK-029', 'img/s29.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'さくらんぼ', 'HNK-030', 'img/s30.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'アイスクリーム', 'HNK-041', 'img/s33.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'ソフトクリーム', 'HNK-042', 'img/s34.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'アイス', 'HNK-043', 'img/s35.png','','商品選択', 'はんこ','たべもの'),
    new ClothItem('', 'かき氷', 'HNK-044', 'img/s36.png','','商品選択', 'はんこ','たべもの'),
    
    // はんこ-日本
    new ClothItem('', 'こけし', 'HNK-058', 'img/s58.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'けん玉', 'HNK-059', 'img/s59.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', '紙ふうせん', 'HNK-060', 'img/s60.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'こま', 'HNK-061', 'img/s61.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', '折リヅル', 'HNK-062', 'img/s62.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'さけ1', 'HNK-063', 'img/s63.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'さけ2', 'HNK-064', 'img/s64.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'さけ3', 'HNK-065', 'img/s65.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'ひょうたん', 'HNK-066', 'img/s66.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'きゅうす', 'HNK-067', 'img/s67.png','','商品選択', 'はんこ','日本'),
    new ClothItem('', 'お茶', 'HNK-068', 'img/s68.png','','商品選択', 'はんこ','日本'),
    
    // はんこ-お天気
    new ClothItem('', '雪', 'HNK-069', 'img/s69.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '晴れ', 'HNK-070', 'img/s70.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '雨', 'HNK-071', 'img/s71.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '雷雲', 'HNK-072', 'img/s72.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '雨雲', 'HNK-073', 'img/s73.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', 'くもり', 'HNK-074', 'img/s74.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '星', 'HNK-075', 'img/s75.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '月', 'HNK-076', 'img/s76.png','','商品選択', 'はんこ','お天気'),
    new ClothItem('', '太陽', 'HNK-077', 'img/s77.png','','商品選択', 'はんこ','お天気'),
    
    // はんこ-乗り物
    new ClothItem('', '車', 'HNK-045', 'img/s37.png','','商品選択', 'はんこ','乗り物'),
    new ClothItem('', 'バス', 'HNK-046', 'img/s38.png','','商品選択', 'はんこ','乗り物'),
    new ClothItem('', '飛行機', 'HNK-047', 'img/s39.png','','商品選択', 'はんこ','乗り物'),
    new ClothItem('', 'バイク', 'HNK-048', 'img/s40.png','','商品選択', 'はんこ','乗り物'),    
    new ClothItem('', '自転車', 'HNK-049', 'img/s41.png','','商品選択', 'はんこ','乗り物'),
    
    // はんこ-その他
    new ClothItem('', 'ハート1', 'HNK-001', 'img/s1.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'スター1', 'HNK-002', 'img/s2.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'スター2', 'HNK-003', 'img/s3.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'ハート2', 'HNK-004', 'img/s4.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'パーティ1', 'HNK-022', 'img/s22.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'パーティ2', 'HNK-023', 'img/s23.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'パーティ3', 'HNK-024', 'img/s24.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'パーティ4', 'HNK-025', 'img/s25.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '旅1', 'HNK-026', 'img/s26.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '旅2', 'HNK-027', 'img/s27.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '旅3', 'HNK-028', 'img/s28.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'マリン1', 'HNK-050', 'img/s50.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'マリン2', 'HNK-051', 'img/s51.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'マリン3', 'HNK-052', 'img/s52.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', 'マリン4', 'HNK-053', 'img/s53.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '楽器1', 'HNK-054', 'img/s54.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '楽器2', 'HNK-055', 'img/s55.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '楽器3', 'HNK-056', 'img/s56.png','','商品選択', 'はんこ','その他'),
    new ClothItem('', '楽器4', 'HNK-057', 'img/s57.png','','商品選択', 'はんこ','その他'),

    // ゆるふわ-どうぶつ
    new ClothItem('', 'くじら', 'YRF-001', 'img/yuru_0001.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'らいおん', 'YRF-002', 'img/yuru_0002.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'くま１', 'YRF-003', 'img/yuru_0003.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'こあら', 'YRF-004', 'img/yuru_0004.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'かんがるー', 'YRF-005', 'img/yuru_0005.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'かば', 'YRF-006', 'img/yuru_0006.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いか', 'YRF-007', 'img/yuru_0007.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ひつじ１', 'YRF-008', 'img/yuru_0008.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'はむすたー', 'YRF-009', 'img/yuru_0009.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ごりら', 'YRF-010', 'img/yuru_0010.png','','商品選択', 'ゆるふわ','どうぶつ'),

    new ClothItem('', 'ぞう', 'YRF-011', 'img/yuru_0011.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いぬ１', 'YRF-012', 'img/yuru_0012.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'だちょう', 'YRF-013', 'img/yuru_0013.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ねこ１', 'YRF-014', 'img/yuru_0014.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ぶた', 'YRF-015', 'img/yuru_0015.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'あひる', 'YRF-016', 'img/yuru_0016.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ありくい', 'YRF-017', 'img/yuru_0017.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'やぎ', 'YRF-018', 'img/yuru_0018.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'わし', 'YRF-019', 'img/yuru_0019.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'わに', 'YRF-020', 'img/yuru_0020.png','','商品選択', 'ゆるふわ','どうぶつ'),
    
    new ClothItem('', 'うさぎ１', 'YRF-021', 'img/yuru_0021.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'はくちょう', 'YRF-022', 'img/yuru_0022.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'しか', 'YRF-023', 'img/yuru_0023.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'おおかみ', 'YRF-024', 'img/yuru_0024.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'さる１', 'YRF-025', 'img/yuru_0025.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'くま２', 'YRF-026', 'img/yuru_0026.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'たこ', 'YRF-027', 'img/yuru_0027.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うさぎ２', 'YRF-028', 'img/yuru_0028.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'となかい', 'YRF-029', 'img/yuru_0029.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うま', 'YRF-030', 'img/yuru_0030.png','','商品選択', 'ゆるふわ','どうぶつ'),
    
    new ClothItem('', 'つるかめ', 'YRF-031', 'img/yuru_0031.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いのしし', 'YRF-032', 'img/yuru_0032.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ひつじ２', 'YRF-033', 'img/yuru_0033.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'りゅう', 'YRF-034', 'img/yuru_0034.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いぬ２', 'YRF-035', 'img/yuru_0035.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'にわとり', 'YRF-036', 'img/yuru_0036.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'さる２', 'YRF-037', 'img/yuru_0037.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'へび', 'YRF-038', 'img/yuru_0038.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うし', 'YRF-039', 'img/yuru_0039.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うさぎ３', 'YRF-040', 'img/yuru_0040.png','','商品選択', 'ゆるふわ','どうぶつ'),
    
    new ClothItem('', 'とら', 'YRF-041', 'img/yuru_0041.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ねずみ', 'YRF-042', 'img/yuru_0042.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'ねこ２', 'YRF-043', 'img/yuru_0043.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'いぬ３', 'YRF-044', 'img/yuru_0044.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'くろねこ', 'YRF-045', 'img/yuru_0045.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'くろねこ', 'YRF-046', 'img/yuru_0046.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'かえる', 'YRF-047', 'img/yuru_0047.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'うさぎ４', 'YRF-048', 'img/yuru_0048.png','','商品選択', 'ゆるふわ','どうぶつ'),
    new ClothItem('', 'りす', 'YRF-049', 'img/yuru_0049.png','','商品選択', 'ゆるふわ','どうぶつ'),
    
    // ゆるふわ-お花
    new ClothItem('', 'つばき', 'YRF-050', 'img/yuru_0050.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'たんぽぽ', 'YRF-051', 'img/yuru_0051.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'すずらん', 'YRF-052', 'img/yuru_0052.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'すみれ', 'YRF-053', 'img/yuru_0053.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'すいせん', 'YRF-054', 'img/yuru_0054.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'らん', 'YRF-055', 'img/yuru_0055.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'らなんきゅらす', 'YRF-056', 'img/yuru_0056.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'ぱんじー', 'YRF-057', 'img/yuru_0057.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'なのはな', 'YRF-058', 'img/yuru_0058.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'ねこじゃらし', 'YRF-059', 'img/yuru_0059.png','','商品選択', 'ゆるふわ','お花'),
    new ClothItem('', 'もも', 'YRF-060', 'img/yuru_0060.png','','商品選択', 'ゆるふわ','お花'),
    
    new ClothItem('', 'まーがれっと', 'YRF-061', 'img/yuru_0061.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'きく', 'YRF-062', 'img/yuru_0062.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'いね', 'YRF-063', 'img/yuru_0063.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ひがんばな', 'YRF-064', 'img/yuru_0064.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ふじのはな', 'YRF-065', 'img/yuru_0065.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ふりーじあ', 'YRF-066', 'img/yuru_0066.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'くろっかす', 'YRF-067', 'img/yuru_0067.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'しくらめん', 'YRF-068', 'img/yuru_0068.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'こすもす', 'YRF-069', 'img/yuru_0069.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ひまわり', 'YRF-070', 'img/yuru_0070.png','','商品選択', 'ゆるふわ',''),
    
    // ゆるふわ-むし
    new ClothItem('', 'てんとうむし', 'YRF-071', 'img/yuru_0071.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'たまむし', 'YRF-072', 'img/yuru_0072.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'おにやんま', 'YRF-073', 'img/yuru_0073.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'もんしろちょう', 'YRF-074', 'img/yuru_0074.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'みつばち', 'YRF-075', 'img/yuru_0075.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'みのむし', 'YRF-076', 'img/yuru_0076.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'みんみんぜみ', 'YRF-077', 'img/yuru_0077.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'くわがた(めす)', 'YRF-078', 'img/yuru_0078.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'くわがた(おす)', 'YRF-079', 'img/yuru_0079.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'くも', 'YRF-80', 'img/yuru_0080.png','','商品選択', 'ゆるふわ','むし'),

    new ClothItem('', 'くまぜみ', 'YRF-081', 'img/yuru_0081.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'こおろぎ', 'YRF-082', 'img/yuru_0082.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'きりぎりす', 'YRF-083', 'img/yuru_0083.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'かめむし', 'YRF-084', 'img/yuru_0084.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'かまきり', 'YRF-085', 'img/yuru_0085.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'かぶとむし', 'YRF-086', 'img/yuru_0086.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'いととんぼ', 'YRF-087', 'img/yuru_0087.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'いもむし', 'YRF-088', 'img/yuru_0088.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'ほたる', 'YRF-089', 'img/yuru_0089.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'ぎんやんま', 'YRF-090', 'img/yuru_0090.png','','商品選択', 'ゆるふわ','むし'),
    
    new ClothItem('', 'かたつむり', 'YRF-091', 'img/yuru_0091.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'だんごむし', 'YRF-092', 'img/yuru_0092.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'あり', 'YRF-093', 'img/yuru_0093.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'あかとんぼ', 'YRF-094', 'img/yuru_0094.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'あげはちょう', 'YRF-095', 'img/yuru_0095.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'あぶらぜみ', 'YRF-096', 'img/yuru_0096.png','','商品選択', 'ゆるふわ','むし'),
    new ClothItem('', 'かたつむり', 'YRF-097', 'img/yuru_0097.png','','商品選択', 'ゆるふわ','むし'),

    // ゆるふわ-おさかな
    new ClothItem('', 'たこ', 'YRF-098', 'img/yuru_0098.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'たい', 'YRF-099', 'img/yuru_0099.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'さんま', 'YRF-100', 'img/yuru_0100.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'さめ', 'YRF-101', 'img/yuru_0101.png','','商品選択', 'ゆるふわ',''),
    
    new ClothItem('', 'さけ', 'YRF-102', 'img/yuru_0102.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'まぐろ', 'YRF-103', 'img/yuru_0103.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'かい', 'YRF-104', 'img/yuru_0104.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'えび', 'YRF-105', 'img/yuru_0105.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'さば', 'YRF-106', 'img/yuru_0106.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ひらめ', 'YRF-107', 'img/yuru_0107.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'ふぐ', 'YRF-108', 'img/yuru_0108.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'かれい', 'YRF-109', 'img/yuru_0109.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'いか', 'YRF-110', 'img/yuru_0110.png','','商品選択', 'ゆるふわ',''),
    new ClothItem('', 'やどかり', 'YRF-111', 'img/yuru_0111.png','','商品選択', 'ゆるふわ',''),

    new ClothItem('', 'かに', 'YRF-112', 'img/yuru_0112.png','','商品選択', 'ゆるふわ',''),

    // ゆるふわ-イベント
    new ClothItem('', 'イベント1', 'YRF-113', 'img/yuru_0113.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント2', 'YRF-114', 'img/yuru_0114.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント3', 'YRF-115', 'img/yuru_0115.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント4', 'YRF-116', 'img/yuru_0116.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント5', 'YRF-117', 'img/yuru_0117.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント6', 'YRF-118', 'img/yuru_0118.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント7', 'YRF-119', 'img/yuru_0119.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント8', 'YRF-120', 'img/yuru_0120.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント9', 'YRF-121', 'img/yuru_0121.png','','商品選択', 'ゆるふわ','イベント'),
    
    new ClothItem('', 'イベント10', 'YRF-122', 'img/yuru_0122.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント11', 'YRF-123', 'img/yuru_0123.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント12', 'YRF-124', 'img/yuru_0124.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント13', 'YRF-125', 'img/yuru_0125.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント14', 'YRF-126', 'img/yuru_0133.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント15', 'YRF-127', 'img/yuru_0134.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント16', 'YRF-128', 'img/yuru_0135.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント17', 'YRF-129', 'img/yuru_0136.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント18', 'YRF-130', 'img/yuru_0138.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント19', 'YRF-131', 'img/yuru_0139.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント20', 'YRF-132', 'img/yuru_0140.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント21', 'YRF-133', 'img/yuru_0146.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント22', 'YRF-134', 'img/yuru_0141.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント23', 'YRF-135', 'img/yuru_0142.png','','商品選択', 'ゆるふわ','イベント'),
    new ClothItem('', 'イベント24', 'YRF-136', 'img/yuru_0143.png','','商品選択', 'ゆるふわ','イベント'),
    
    // ゆるふわ-たべもの
    new ClothItem('', 'ぷりん', 'YRF-137', 'img/yuru_0126.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'たいやき', 'YRF-138', 'img/yuru_0127.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'ぱふぇ', 'YRF-139', 'img/yuru_0128.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'けーき', 'YRF-140', 'img/yuru_0129.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'だんご', 'YRF-141', 'img/yuru_0130.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'ほっとけーき', 'YRF-142', 'img/yuru_0131.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'きゃんでぃー', 'YRF-143', 'img/yuru_0132.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'そふとくりーむ', 'YRF-144', 'img/yuru_0137.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'すし', 'YRF-145', 'img/yuru_0144.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'すいか', 'YRF-146', 'img/yuru_0145.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'ぴざ', 'YRF-0147', 'img/yuru_0147.png','','商品選択', 'ゆるふわ','たべもの'),
    new ClothItem('', 'おにぎり', 'YRF-148', 'img/yuru_0148.png','','商品選択', 'ゆるふわ','たべもの'),
    
    

    // [TryOn] せなけいこ
    new ClothItem('4eb4eadc-54ed-44ce-a825-b00e14f13bf7', 'ふうせんねこ1', 'SNK-001', 'img/e1.png','img/e1-t.png','TryOn', 'せなけいこ',''),
    new ClothItem('5659faca-7d0a-44e6-97ee-831927bdf9c0', 'ふうせんねこ2', 'SNK-002', 'img/e2.png','img/e2-t.png','TryOn', 'せなけいこ',''),
    new ClothItem('772bf012-6554-4d0f-baae-569b7a25f915', 'おばけ', 'SNK-003', 'img/e3.png','img/e3-t.png','TryOn', 'せなけいこ',''),
    new ClothItem('1c1afadd-ba61-4eb9-937d-a4002aad6714', 'ねこちゃん', 'SNK-004', 'img/e4.png','img/e4-t.png','TryOn', 'せなけいこ',''),
    // [TryOn] スーツ
    new ClothItem('6c3cd363-fb3a-4312-9c48-7f62cbbfa614', 'スーツ1', 'SUI-001', 'img/ee4272f9-c172-4843-adc3-2c85360bf1b5.jpg','','TryOn', 'スーツ',''),
    new ClothItem('1617ff56-6575-42eb-9c64-f111b542683b', 'スーツ2', 'SUI-002', 'img/ccca02db-fdaf-42bd-a026-a1e6394b3499.jpg','','TryOn', 'スーツ',''),
    // [TryOn] 浴衣
    new ClothItem('65481657-7d5c-4a20-9524-cda6d0286ec2', 'ゆかた1', 'YKT-001', 'img/9ef29bde-cd79-4cec-8331-3418a92962e2.jpg','','TryOn', 'ゆかた',''),
    new ClothItem('53fffeef-91c7-4d0b-8d01-edc30075054b', 'ゆかた2', 'YKT-002', 'img/f6f5eb8f-844d-43bf-82cd-77c0f0867ece.jpg','','TryOn', 'ゆかた',''),
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
    // if(items[currentIndex].uuid === '')
    // {
    //   alert("試着できない商品です。");
    //   return false;
    // }
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