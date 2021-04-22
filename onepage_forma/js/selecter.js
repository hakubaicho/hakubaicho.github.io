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
    // remark06         : 未使用        [選択できる対象か判断]
    // remark07         : 未使用        
    // remark08         : 未使用
    // remark09         : 未使用        [オーバーレイ画像]
    // remark10         : 未使用        [ボタン色]
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

      this.formaSrc       = formaSrc;
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
    // parent         : 親要素
    // childrenArray  : 子要素
    constructor(nodeName, remark) {
      this.name = nodeName;
      this.remarkcode = remark;
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

    new ClothItem('せなけいこ','ふうせんねこ','','','SNK001','ふうせんねこ1','2189','','','','','','','','SNK001.webp','T-SNK001.webp','et1.png','05c8e7df-0c0a-4ce8-80c6-56e121785578'),
    new ClothItem('せなけいこ','ふうせんねこ','','','SNK002','ふうせんねこ2','2189','','','','','','','','SNK002.webp','T-SNK002.webp','et2.png','8b6fddf5-17ac-49e5-9e45-6154f30f0e9e'),
    new ClothItem('せなけいこ','きれいなはこ','','','SNK003','おばけ','2189','','','','','','','','SNK003.webp','T-SNK003.webp','et3.png','11d7f474-5525-4c2f-8c35-8f923a1344bd'),
    new ClothItem('せなけいこ','きれいなはこ','','','SNK004','ねこちゃん','2189','','','','','','','','SNK004.webp','T-SNK004.webp','et4.png','a6ae0d47-01a3-4d1c-81bd-9bfebcd9decd'),
    new ClothItem('せなけいこ','きれいなはこ','','','SNK005','わんちゃん','2189','','','','','','','','SNK005.webp','T-SNK005.webp','et5.png','55017871-19d3-4edc-826e-e4c88195f0b3'),
    new ClothItem('せなけいこ','ねないこだれだ','','','SNK006','ふくろうとみみずく','2189','','','','','','','','SNK006.webp','T-SNK006.webp','et6.png','c18cdde3-eaf6-4f01-8fe0-83d508e4e5fb'),
    new ClothItem('せなけいこ','ねないこだれだ','','','SNK007','くろねこ','2189','','','','','','','','SNK007.webp','T-SNK007.webp','et7.png','decd82e2-8b87-4b5a-bebe-e24bd8ac0992'),
    new ClothItem('せなけいこ','ねないこだれだ','','','SNK008','ねずみ','2189','','','','','','','','SNK008.webp','T-SNK008.webp','et8.png','da4b0dda-ad8a-4c59-b79d-fd773baf2dff'),
    new ClothItem('せなけいこ','ねないこだれだ','','','SNK009','おばけ1','2189','','','','','','','','SNK009.webp','T-SNK009.webp','et9.png','032b985b-670c-46f2-8053-d4afa61b8cd4'),
    new ClothItem('せなけいこ','ねないこだれだ','','','SNK010','おばけ2','2189','','','','','','','','SNK010.webp','T-SNK010.webp','et10.png','49ee4f15-c313-45be-8bb6-ebbeb97880c8'),
    new ClothItem('せなけいこ','いやだいやだ','','','SNK011','おひさま','2189','','','','','','','','SNK011.webp','T-SNK011.webp','et11.png','c2239929-2196-458c-a4eb-f3ca639025a3'),
    new ClothItem('せなけいこ','いやだいやだ','','','SNK012','くつ','2189','','','','','','','','SNK012.webp','T-SNK012.webp','et12.png','b1cc5e0b-8eea-44e5-93fb-dcc70179fe9a'),
    new ClothItem('せなけいこ','いやだいやだ','','','SNK013','くまちゃん','2189','','','','','','','','SNK013.webp','T-SNK013.webp','et13.png','eea93b1e-ac3c-4c7a-ad31-ca7b4be318b3'),
    new ClothItem('せなけいこ','もじゃもじゃ','','','SNK014','ころ','2189','','','','','','','','SNK014.webp','T-SNK014.webp','et14.png','8be8a64e-1059-4ff4-b7cc-a3cb1d7d8cf3'),
    new ClothItem('せなけいこ','もじゃもじゃ','','','SNK015','ルルちゃん1','2189','','','','','','','','SNK015.webp','T-SNK015.webp','et15.png','15e9b1af-606d-45b7-977e-097edba290f6'),
    new ClothItem('せなけいこ','もじゃもじゃ','','','SNK016','ルルちゃん2','2189','','','','','','','','SNK016.webp','T-SNK016.webp','et16.png','89ba4823-bb1b-49b3-99fa-b7606fb1dd4b'),
    new ClothItem('せなけいこ','にんじん','','','SNK017','うまさん','2189','','','','','','','','SNK017.webp','T-SNK017.webp','et17.png','22773ae6-2be0-4085-9441-2f0c5ea684c2'),
    new ClothItem('せなけいこ','にんじん','','','SNK018','きりんさん','2189','','','','','','','','SNK018.webp','T-SNK018.webp','et18.png','7daeaf8b-5334-463e-aace-7419348cf8e4'),
    new ClothItem('せなけいこ','にんじん','','','SNK019','おさるさん','2189','','','','','','','','SNK019.webp','T-SNK019.webp','et19.png','9b2890d5-2250-4053-82e3-d3b0545bf14e'),
    new ClothItem('せなけいこ','にんじん','','','SNK020','ぶたさん','2189','','','','','','','','SNK020.webp','T-SNK020.webp','et20.png','16c6ec5b-71b9-4d74-adda-c05880648a40'),
    new ClothItem('せなけいこ','にんじん','','','SNK021','かばさん','2189','','','','','','','','SNK021.webp','T-SNK021.webp','et21.png','c7be5c5a-2314-4366-b512-a5ed590c5daa'),
    new ClothItem('せなけいこ','にんじん','','','SNK022','うさぎさん','2189','','','','','','','','SNK022.webp','T-SNK022.webp','et22.png','782e533a-21e3-4867-a6c8-096b1714c73a'),
    new ClothItem('せなけいこ','にんじん','','','SNK023','ぼく','2189','','','','','','','','SNK023.webp','T-SNK023.webp','et23.png','46648342-0429-4bda-b602-f4d7c78d16a6'),
    new ClothItem('せなけいこ','あーんあん','','','SNK024','みんな','2189','','','','','','','','SNK024.webp','T-SNK024.webp','et24.png','6676c15f-11f7-48f3-9f50-c7e747d9d7ab'),
    new ClothItem('せなけいこ','あーんあん','','','SNK025','ぼく2','2189','','','','','','','','SNK025.webp','T-SNK025.webp','et25.png','b09e1c08-4816-4c5f-b49c-88e17d658927'),
    new ClothItem('せなけいこ','あーんあん','','','SNK026','ぼく1','2189','','','','','','','','SNK026.webp','T-SNK026.webp','et26.png','1382f553-5b25-4284-9e6d-5fd805457e6e'),
    new ClothItem('せなけいこ','ルルちゃんのくつした','','','SNK027','ルルちゃん','2189','','','','','','','','SNK027.webp','T-SNK027.webp','et27.png','dc2814e2-154b-41f5-826a-87c073070a11'),
    new ClothItem('せなけいこ','ルルちゃんのくつした','','','SNK028','うさこ','2189','','','','','','','','SNK028.webp','T-SNK028.webp','et28.png','58074f2c-e4fc-488d-abbe-1f2ab879c00e'),
    new ClothItem('せなけいこ','ルルちゃんのくつした','','','SNK029','わんこ','2189','','','','','','','','SNK029.webp','T-SNK029.webp','et29.png','4d1ed7b7-b6ae-4599-8980-4ac489360a24'),
    new ClothItem('せなけいこ','ルルちゃんのくつした','','','SNK030','ねこちゃん','2189','','','','','','','','SNK030.webp','T-SNK030.webp','et30.png','cc41912f-7f87-4541-a92d-e8949b82eb6f'),
    new ClothItem('せなけいこ','ルルちゃんのくつした','','','SNK031','ぞうさん','2189','','','','','','','','SNK031.webp','T-SNK031.webp','et31.png','861b6497-020c-4ddc-b35b-4a1f205fdf6e'),
    new ClothItem('せなけいこ','にゃんにゃん','','','SNK032','とらねこ','2189','','','','','','','','SNK032.webp','T-SNK032.webp','et32.png','204ffd5c-809a-45f3-ba73-b2bc7aba1edd'),
    new ClothItem('せなけいこ','にゃんにゃん','','','SNK033','くろいねこ','2189','','','','','','','','SNK033.webp','T-SNK033.webp','et33.png','ece4e97d-8ad5-44f7-b84d-036dd5a27699'),
    new ClothItem('せなけいこ','にゃんにゃん','','','SNK034','ねこちゃん','2189','','','','','','','','SNK034.webp','T-SNK034.webp','et34.png','aa9790b1-98e5-4ea1-b9ea-5602807cd9ea'),
    new ClothItem('せなけいこ','にゃんにゃん','','','SNK035','ぶちねこ','2189','','','','','','','','SNK035.webp','T-SNK035.webp','et35.png','8c2835d3-190a-4e5a-b6ac-aafe9e6f563c'),
    new ClothItem('せなけいこ','にゃんにゃん','','','SNK036','にゃんにゃん','2189','','','','','','','','SNK036.webp','T-SNK036.webp','et36.png','d188a2b5-37c1-4029-8a62-ed84c4d79f98'),
    
    new ClothItem('ハトソン','ハトソンくん','','','HTS001','ハトソンくん','2189','','','','','','','','HTS001.webp','T-HTS001.webp','hts1.png','e48859fe-4be5-42da-89e6-086ba412b226'),
    new ClothItem('ハトソン','よろこビーバー','','','HTS002','よろこビーバー','2189','','','','','','','','HTS002.webp','T-HTS002.webp','hts2.png','5a8835e0-efce-4679-98a4-26a9c586075f'),
    new ClothItem('ハトソン','ほしいゾウ','','','HTS003','ほしいゾウ','2189','','','','','','','','HTS003.webp','T-HTS003.webp','hts3.png','66d3ef77-94f4-4f93-80d1-6839b324917f'),
    new ClothItem('ハトソン','オットセール','','','HTS004','オットセール','2189','','','','','','','','HTS004.webp','T-HTS004.webp','hts4.png','9a55328a-cda6-4de6-b804-50bcf510c87a'),
    
    new ClothItem('ハトソン','ハトソンくん','','','HTS005','ハトソンくん　説明','2189','','','','','','','','HTS005.webp','T-HTS005.webp','hts5.png','7cfffc63-bd79-46b9-a292-e179b172a14c'),
    new ClothItem('ハトソン','よろこビーバー','','','HTS006','よろこビーバー　説明','2189','','','','','','','','HTS006.webp','T-HTS006.webp','hts6.png','073242bc-fd22-4878-911a-4636301668e7'),
    new ClothItem('ハトソン','ほしいゾウ','','','HTS007','ほしいゾウ　説明','2189','','','','','','','','HTS007.webp','T-HTS007.webp','hts7.png','87052758-86d8-4200-9d40-f7ef90c9418a'),
    new ClothItem('ハトソン','オットセール','','','HTS008','オットセール　説明','2189','','','','','','','','HTS008.webp','T-HTS008.webp','hts8.png','14425363-e692-446a-9940-ca031936a9d8'),
    
    new ClothItem('ハトソン','ハトソンくん','','','HTS009','ハトソンくん　歩く','2189','','','','','','','','HTS009.webp','T-HTS009.webp','hts9.png','57367387-193c-4618-b75d-3215ddf62b79'),
    new ClothItem('ハトソン','よろこビーバー','','','HTS010','よろこビーバー　歩く','2189','','','','','','','','HTS010.webp','T-HTS010.webp','hts10.png','c9de7bb1-75a4-41e3-bf25-75faaabfcbc8'),
    new ClothItem('ハトソン','ほしいゾウ','','','HTS011','ほしいゾウ　歩く','2189','','','','','','','','HTS011.webp','T-HTS011.webp','hts11.png','de0ed779-b6cf-4dae-a26f-d241d1543ade'),
    new ClothItem('ハトソン','オットセール','','','HTS012','オットセール　歩く','2189','','','','','','','','HTS012.webp','T-HTS012.webp','hts12.png','9bc7c7b0-ce25-49be-9431-b413e6fd5af2'),
    
    new ClothItem('ハトソン','ハトソンくん','','','HTS023','ハトソンくん　よろこぶ','2189','','','','','','','','HTS013.webp','T-HTS013.webp','hts13.png','18b8bae4-10e3-4c32-bfc3-de58205f5da9'),
    new ClothItem('ハトソン','よろこビーバー','','','HTS014','よろこビーバー　よろこぶ','2189','','','','','','','','HTS014.webp','T-HTS014.webp','hts14.png','c7773d40-9961-4831-9b22-34e9a9ce1786'),
    new ClothItem('ハトソン','ほしいゾウ','','','HTS015','ほしいゾウ　よろこぶ','2189','','','','','','','','HTS015.webp','T-HTS015.webp','hts15.png','4156322a-ea23-4455-b99a-420ccc389fca'),
    new ClothItem('ハトソン','オットセール','','','HTS016','オットセール　よろこぶ','2189','','','','','','','','HTS016.webp','T-HTS016.webp','hts16.png','0eca6f31-3479-4e8e-92bc-e69e89f565e9'),
    
    new ClothItem('ハトソン','ハトソンくん','','','HTS017','ハトソンくん　おじぎ','2189','','','','','','','','HTS017.webp','T-HTS017.webp','hts17.png','82330404-c6fc-4b2a-bfed-17d9a3f716f8'),
    new ClothItem('ハトソン','よろこビーバー','','','HTS018','よろこビーバー　おじぎ','2189','','','','','','','','HTS018.webp','T-HTS018.webp','hts18.png','ddf1acab-6f5b-4c4a-9428-ff2fdf5f4742'),
    new ClothItem('ハトソン','ほしいゾウ','','','HTS019','ほしいゾウ　おじぎ','2189','','','','','','','','HTS019.webp','T-HTS019.webp','hts19.png','0d5cea27-7249-4b9f-9072-cdda2e6fa2f6'),
    new ClothItem('ハトソン','オットセール','','','HTS020','オットセール　おじぎ','2189','','','','','','','','HTS020.webp','T-HTS020.webp','hts20.png','e5795055-aa8f-4018-b191-51d0d7aa6d6e'),
    
    new ClothItem('ｲﾄｰﾖｰｶﾄﾞｰ ﾛｺﾞ','','','T','IYL001','ロゴ1','2189','','','','1','1','','','S-IYL001.webp','T-IYL001.webp','I-IYL001.jpg','033a5f3d-b355-4d7d-ba11-6add7dc7948a'),
    new ClothItem('ｲﾄｰﾖｰｶﾄﾞｰ ﾛｺﾞ','','','T','IYL002','ロゴ2','2189','','','','1','1','','','S-IYL002.webp','T-IYL002.webp','I-IYL002.jpg','c01b1742-87aa-4bd7-9017-2283ddd9da07'),
    new ClothItem('ｲﾄｰﾖｰｶﾄﾞｰ ﾛｺﾞ','','','T','IYL003','ロゴ3','2189','','','','1','1','','','S-IYL003.webp','T-IYL003.webp','I-IYL003.jpg','2ddbdb5b-e97f-4bee-b71b-a27ecbaf8004'),
    new ClothItem('ｲﾄｰﾖｰｶﾄﾞｰ ﾛｺﾞ','','','T','IYL004','ロゴ4','2189','','','','1','1','','','S-IYL004.webp','T-IYL004.webp','I-IYL004.jpg','a2266906-5737-44ad-9888-1299f2f0d658'),
    new ClothItem('ｲﾄｰﾖｰｶﾄﾞｰ ﾛｺﾞ','','','T','IYL005','ロゴ5','2189','','','','1','1','','','S-IYL005.webp','T-IYL005.webp','I-IYL005.jpg','d3b528c2-a2fb-4b0a-b95d-9a8284ec0519'),
    new ClothItem('ｲﾄｰﾖｰｶﾄﾞｰ ﾛｺﾞ','','','T','IYL006','ロゴ6','2189','','','','1','1','','','S-IYL006.webp','T-IYL006.webp','I-IYL006.jpg','17b504d8-db9f-409c-a825-9925b78ab00a'),

    new ClothItem('スタンプ','その他','','','HNK001','ハート1','2189','','','','','','','','HNK001.webp','T-HNK001.webp','t1.png','f54d5e8f-0431-4cd9-91de-b42e7abb1db5'),
    new ClothItem('スタンプ','その他','','','HNK002','スター1','2189','','','','','','','','HNK002.webp','T-HNK002.webp','t2.png','0fa0e9ab-911d-4f43-a5f8-a5720a1216bd'),
    new ClothItem('スタンプ','その他','','','HNK003','スター2','2189','','','','','','','','HNK003.webp','T-HNK003.webp','t3.png','3c429862-a6d2-465c-adf4-791750fdb250'),
    new ClothItem('スタンプ','その他','','','HNK004','ハート2','2189','','','','','','','','HNK004.webp','T-HNK004.webp','t4.png','bb2e84e2-ef90-49b9-a1e2-d1b4f36a9a8d'),
    new ClothItem('スタンプ','お花','','','HNK005','お花1','2189','','','','','','','','HNK005.webp','T-HNK005.webp','t5.png','14ed1d7b-1481-4eae-91fa-4f7ab6a89930'),
    new ClothItem('スタンプ','お花','','','HNK006','お花2','2189','','','','','','','','HNK006.webp','T-HNK006.webp','t6.png','805499ba-5cd3-42d5-92f3-542cd524dc6f'),
    new ClothItem('スタンプ','お花','','','HNK007','お花3','2189','','','','','','','','HNK007.webp','T-HNK007.webp','t7.png','a7a08f8c-4dfa-4b2c-b8fd-68ed3b7ea075'),
    new ClothItem('スタンプ','お花','','','HNK008','お花4','2189','','','','','','','','HNK008.webp','T-HNK008.webp','t8.png','1517ccd1-16f2-426c-8cec-82a4a2deccb4'),
    new ClothItem('スタンプ','お花','','','HNK009','お花5','2189','','','','','','','','HNK009.webp','T-HNK009.webp','t9.png','7eb5d642-5204-490d-a17a-2417454034f1'),
    new ClothItem('スタンプ','お花','','','HNK010','お花6','2189','','','','','','','','HNK010.webp','T-HNK010.webp','t10.png','a61e0abb-723e-4260-a52d-fe9b4266d34b'),
    new ClothItem('スタンプ','お花','','','HNK011','お花7','2189','','','','','','','','HNK011.webp','T-HNK011.webp','t11.png','04f5f9f8-c364-460e-a022-7a0cce8d513a'),
    new ClothItem('スタンプ','お花','','','HNK012','お花8','2189','','','','','','','','HNK012.webp','T-HNK012.webp','t12.png','1df42e32-2500-40a0-b559-28417703615b'),
    new ClothItem('スタンプ','お花','','','HNK013','お花9','2189','','','','','','','','HNK013.webp','T-HNK013.webp','t13.png','f46d27c9-bb7f-4367-86d2-53ff4ce24630'),
    new ClothItem('スタンプ','食べ物','','','HNK014','ニンジン','2189','','','','','','','','HNK014.webp','T-HNK014.webp','t14.png','9a006c3c-c551-49cf-bd94-1de8539eb9fc'),
    new ClothItem('スタンプ','食べ物','','','HNK015','エダマメ','2189','','','','','','','','HNK015.webp','T-HNK015.webp','t15.png','ac503afe-cd65-4854-879e-a3ab77206fee'),
    new ClothItem('スタンプ','食べ物','','','HNK016','ピーマン','2189','','','','','','','','HNK016.webp','T-HNK016.webp','t16.png','18a24e29-284d-4b5b-a553-2352e89c0f8f'),
    new ClothItem('スタンプ','食べ物','','','HNK017','トウガラシ','2189','','','','','','','','HNK017.webp','T-HNK017.webp','t17.png','8f5098fd-746c-4dde-9f21-59bfe8e78b68'),
    new ClothItem('スタンプ','食べ物','','','HNK018','バナナ','2189','','','','','','','','HNK018.webp','T-HNK018.webp','t18.png','50c0e876-80f7-493a-b79a-ae41b3fb1421'),
    new ClothItem('スタンプ','食べ物','','','HNK019','リンゴ1','2189','','','','','','','','HNK019.webp','T-HNK019.webp','t19.png','071d82b7-132b-4ab8-9f47-985586dcd7d5'),
    new ClothItem('スタンプ','食べ物','','','HNK020','オレンジ','2189','','','','','','','','HNK020.webp','T-HNK020.webp','t20.png','8f2b893f-7552-4165-801c-ec4070898e71'),
    new ClothItem('スタンプ','食べ物','','','HNK021','スイカ','2189','','','','','','','','HNK021.webp','T-HNK021.webp','t21.png','73d9633f-dc71-4767-a306-9459b3b8644d'),
    new ClothItem('スタンプ','その他','','','HNK022','パーティ1','2189','','','','','','','','HNK022.webp','T-HNK022.webp','t22.png','c6df3b41-f3c2-4b27-8bad-b58bf7812ddc'),
    new ClothItem('スタンプ','その他','','','HNK023','パーティ2','2189','','','','','','','','HNK023.webp','T-HNK023.webp','t23.png','94dae3a2-52c3-47ce-9bce-4de90dcdfe37'),
    new ClothItem('スタンプ','その他','','','HNK024','パーティ3','2189','','','','','','','','HNK024.webp','T-HNK024.webp','t24.png','5ace3264-dfad-46e5-8856-7328f748b70d'),
    new ClothItem('スタンプ','その他','','','HNK025','パーティ4','2189','','','','','','','','HNK025.webp','T-HNK025.webp','t25.png','b3975c0b-a390-44d7-be91-90f13167147a'),
    new ClothItem('スタンプ','その他','','','HNK026','旅1','2189','','','','','','','','HNK026.webp','T-HNK026.webp','t26.png','e9552b54-4dfb-4b46-a6bc-528fc71e6b54'),
    new ClothItem('スタンプ','その他','','','HNK027','旅2','2189','','','','','','','','HNK027.webp','T-HNK027.webp','t27.png','0dc5df7b-df29-4a97-9659-2c313a315d98'),
    new ClothItem('スタンプ','その他','','','HNK028','旅3','2189','','','','','','','','HNK028.webp','T-HNK028.webp','t28.png','37592b9f-6fe7-4f82-ad5c-a75c769ecda0'),
    new ClothItem('スタンプ','食べ物','','','HNK029','リンゴ2','2189','','','','','','','','HNK029.webp','T-HNK029.webp','t29.png','45441798-b3c4-477f-b0a1-95faa3b41881'),
    new ClothItem('スタンプ','食べ物','','','HNK030','サクランボ','2189','','','','','','','','HNK030.webp','T-HNK030.webp','t30.png','25eef3b2-fdf9-4ed9-bb46-603a18b77ebd'),
    new ClothItem('スタンプ','食べ物','','','HNK031','ミカン','2189','','','','','','','','HNK031.webp','T-HNK031.webp','t31.png','cfaa5e92-e0e6-4048-b899-f766b114b323'),
    new ClothItem('スタンプ','食べ物','','','HNK032','洋ナシ','2189','','','','','','','','HNK032.webp','T-HNK032.webp','t32.png','93968834-a8b7-40bf-91c8-d22f54f11811'),
    new ClothItem('スタンプ','食べ物','','','HNK033','アイスクリーム','2189','','','','','','','','HNK033.webp','T-HNK033.webp','t33.png','823a8324-ac93-4f9f-8e60-07793a19462b'),
    new ClothItem('スタンプ','食べ物','','','HNK034','ソフトクリーム','2189','','','','','','','','HNK034.webp','T-HNK034.webp','t34.png','16c59b4f-8d07-4fd3-a35f-7ea9abeaa08f'),
    new ClothItem('スタンプ','食べ物','','','HNK035','アイス','2189','','','','','','','','HNK035.webp','T-HNK035.webp','t35.png','86450e37-2c2a-4f6f-8b3e-b25d6c3c792e'),
    new ClothItem('スタンプ','食べ物','','','HNK036','カキ氷','2189','','','','','','','','HNK036.webp','T-HNK036.webp','t36.png','14f4e6a7-f600-40af-8a50-22dd5aa980d5'),
    new ClothItem('スタンプ','乗り物','','','HNK037','車','2189','','','','','','','','HNK037.webp','T-HNK037.webp','t37.png','42f531d4-1106-458e-b10f-22a8d302f5e3'),
    new ClothItem('スタンプ','乗り物','','','HNK038','バス','2189','','','','','','','','HNK038.webp','T-HNK038.webp','t38.png','5ef8119c-c441-4e04-bc04-27db9ca2ad14'),
    new ClothItem('スタンプ','乗り物','','','HNK039','飛行機','2189','','','','','','','','HNK039.webp','T-HNK039.webp','t39.png','c0fecb73-ae55-4ddd-b1ac-d95fee6b679f'),
    new ClothItem('スタンプ','乗り物','','','HNK040','バイク','2189','','','','','','','','HNK040.webp','T-HNK040.webp','t40.png','2a9c9b35-f0ae-424c-a21b-8165ece08722'),
    new ClothItem('スタンプ','乗り物','','','HNK041','自転車','2189','','','','','','','','HNK041.webp','T-HNK041.webp','t41.png','ef34b610-31a1-4898-8dad-3de0894c57e2'),
    new ClothItem('スタンプ','動物','','','HNK042','ハト','2189','','','','','','','','HNK042.webp','T-HNK042.webp','t42.png','96d0f0cb-5b05-4def-828c-d8963e56642d'),
    new ClothItem('スタンプ','動物','','','HNK043','ネコ','2189','','','','','','','','HNK043.webp','T-HNK043.webp','t43.png','39b4bdbd-e617-4e1d-aa4f-d78dfd719908'),
    new ClothItem('スタンプ','動物','','','HNK044','イヌ','2189','','','','','','','','HNK044.webp','T-HNK044.webp','t44.png','8025c570-d091-45f6-9b19-8bbc4344658f'),
    new ClothItem('スタンプ','動物','','','HNK045','ハリネズミ','2189','','','','','','','','HNK045.webp','T-HNK045.webp','t45.png','5f127eaf-3b75-4fbe-9bc2-f2d6ef647e53'),
    new ClothItem('スタンプ','動物','','','HNK046','ニワトリ','2189','','','','','','','','HNK046.webp','T-HNK046.webp','t46.png','fe287144-0202-478e-82ad-9e3474223730'),
    new ClothItem('スタンプ','動物','','','HNK047','リス','2189','','','','','','','','HNK047.webp','T-HNK047.webp','t47.png','43682cc7-6066-4133-a256-15e19e968380'),
    new ClothItem('スタンプ','動物','','','HNK048','ヒツジ','2189','','','','','','','','HNK048.webp','T-HNK048.webp','t48.png','4ace6bb7-6d90-48c6-acce-8da42a4c18c9'),
    new ClothItem('スタンプ','動物','','','HNK049','ゾウ','2189','','','','','','','','HNK049.webp','T-HNK049.webp','t49.png','2941a35e-50aa-440a-8486-723caf29c163'),
    new ClothItem('スタンプ','その他','','','HNK050','マリン1','2189','','','','','','','','HNK050.webp','T-HNK050.webp','t50.png','86d354ff-7031-4c2e-b3cd-6bef27811f8c'),
    new ClothItem('スタンプ','その他','','','HNK051','マリン2','2189','','','','','','','','HNK051.webp','T-HNK051.webp','t51.png','3a6fd1a0-d83e-4e06-85f1-d4205654b232'),
    new ClothItem('スタンプ','その他','','','HNK052','マリン3','2189','','','','','','','','HNK052.webp','T-HNK052.webp','t52.png','15d61e06-4098-4f28-9100-d15ec916fe71'),
    new ClothItem('スタンプ','その他','','','HNK053','マリン4','2189','','','','','','','','HNK053.webp','T-HNK053.webp','t53.png','c4069551-afac-471e-92f8-1625f47a66e1'),
    new ClothItem('スタンプ','その他','','','HNK054','楽器1','2189','','','','','','','','HNK054.webp','T-HNK054.webp','t54.png','1e7a91f5-2cbd-40f9-93c3-e07d7eb26514'),
    new ClothItem('スタンプ','その他','','','HNK055','楽器2','2189','','','','','','','','HNK055.webp','T-HNK055.webp','t55.png','35a5746f-067c-45e2-86f8-582e8b1f03f4'),
    new ClothItem('スタンプ','その他','','','HNK056','楽器3','2189','','','','','','','','HNK056.webp','T-HNK056.webp','t56.png','0f58d6ff-9d33-412d-98ca-bb1ca5d7bfac'),
    new ClothItem('スタンプ','その他','','','HNK057','楽器4','2189','','','','','','','','HNK057.webp','T-HNK057.webp','t57.png','1568aba3-982b-4050-9837-f281d1bc1fd7'),
    new ClothItem('スタンプ','日本','','','HNK058','こけし','2189','','','','','','','','HNK058.webp','T-HNK058.webp','t58.png','56e5afc6-2da2-43b1-98f3-574a6e8cd056'),
    new ClothItem('スタンプ','日本','','','HNK059','けん玉','2189','','','','','','','','HNK059.webp','T-HNK059.webp','t59.png','5e4afa09-17ef-444c-98ea-e14e0f4ef0d8'),
    new ClothItem('スタンプ','日本','','','HNK060','紙ふうせん','2189','','','','','','','','HNK060.webp','T-HNK060.webp','t60.png','00d08c7e-6da6-463e-b600-e8d7c04268c2'),
    new ClothItem('スタンプ','日本','','','HNK061','こま','2189','','','','','','','','HNK061.webp','T-HNK061.webp','t61.png','8b767b74-7954-4b06-a381-fb6ad5e7b060'),
    new ClothItem('スタンプ','日本','','','HNK062','折りヅル','2189','','','','','','','','HNK062.webp','T-HNK062.webp','t62.png','2e32b1a4-ded9-48a7-b7a1-32c5b5045659'),
    new ClothItem('スタンプ','日本','','','HNK063','サケ1','2189','','','','','','','','HNK063.webp','T-HNK063.webp','t63.png','3283294d-46ed-4533-a23c-1d4feb827f94'),
    new ClothItem('スタンプ','日本','','','HNK064','サケ2','2189','','','','','','','','HNK064.webp','T-HNK064.webp','t64.png','800081c4-5b9a-4f28-91fb-a026ff0aa128'),
    new ClothItem('スタンプ','日本','','','HNK065','サケ3','2189','','','','','','','','HNK065.webp','T-HNK065.webp','t65.png','35175675-0090-47a6-994e-b6b7e9bb6996'),
    new ClothItem('スタンプ','日本','','','HNK066','ひょうたん','2189','','','','','','','','HNK066.webp','T-HNK066.webp','t66.png','bb57366a-72d1-4533-a373-eaa490d85bd4'),
    new ClothItem('スタンプ','日本','','','HNK067','きゅうす','2189','','','','','','','','HNK067.webp','T-HNK067.webp','t67.png','c5e828aa-d7d6-4c09-95dd-bcf12842ebc3'),
    new ClothItem('スタンプ','日本','','','HNK068','お茶','2189','','','','','','','','HNK068.webp','T-HNK068.webp','t68.png','d63ec4e4-9dab-4450-8753-62f03f8a5c6e'),
    new ClothItem('スタンプ','お天気','','','HNK069','雪','2189','','','','','','','','HNK069.webp','T-HNK069.webp','t69.png','d53f9f31-7c77-4e68-88e2-7a13f47a99c3'),
    new ClothItem('スタンプ','お天気','','','HNK070','晴れ','2189','','','','','','','','HNK070.webp','T-HNK070.webp','t70.png','e9a62499-7fcd-4202-a80d-756667b5079c'),
    new ClothItem('スタンプ','お天気','','','HNK071','雨','2189','','','','','','','','HNK071.webp','T-HNK071.webp','t71.png','60f2581c-cde9-4ec2-8f29-a8842b33aadd'),
    new ClothItem('スタンプ','お天気','','','HNK072','雷雲','2189','','','','','','','','HNK072.webp','T-HNK072.webp','t72.png','25c2f55f-a155-4004-ad78-d616068a7391'),
    new ClothItem('スタンプ','お天気','','','HNK073','雨雲','2189','','','','','','','','HNK073.webp','T-HNK073.webp','t73.png','d321402d-6c89-4695-aaeb-7a5442af4e13'),
    new ClothItem('スタンプ','お天気','','','HNK074','くもり','2189','','','','','','','','HNK074.webp','T-HNK074.webp','t74.png','71fdbe37-efd0-49fa-ae3d-8439c39ea467'),
    new ClothItem('スタンプ','お天気','','','HNK075','星','2189','','','','','','','','HNK075.webp','T-HNK075.webp','t75.png','3d450174-5d24-465d-a452-2ec2d13693b9'),
    new ClothItem('スタンプ','お天気','','','HNK076','月','2189','','','','','','','','HNK076.webp','T-HNK076.webp','t76.png','6a049702-d685-4727-a2f2-cfead2a6a08a'),
    new ClothItem('スタンプ','お天気','','','HNK077','太陽','2189','','','','','','','','HNK077.webp','T-HNK077.webp','t77.png','81c77e0a-7184-482b-9dab-a0b0cda97a42'),
    new ClothItem('ゆるふわ','動物','','','YRF001','クジラ','2189','','','','','','','','YRF001.webp','T-YRF001.webp','y001.png','0554bcfe-811c-4a58-b7ab-bda02ede5c6c'),
    new ClothItem('ゆるふわ','動物','','','YRF002','ライオン','2189','','','','','','','','YRF002.webp','T-YRF002.webp','y002.png','82650395-d327-43ba-afac-66b50e4c734e'),
    new ClothItem('ゆるふわ','動物','','','YRF003','クマ1','2189','','','','','','','','YRF003.webp','T-YRF003.webp','y003.png','0a2d521e-4ee6-41f1-a818-555c2e9c3a80'),
    new ClothItem('ゆるふわ','動物','','','YRF004','コアラ','2189','','','','','','','','YRF004.webp','T-YRF004.webp','y004.png','abca8598-2d59-4fe7-97f0-7eded26b27f9'),
    new ClothItem('ゆるふわ','動物','','','YRF005','カンガルー','2189','','','','','','','','YRF005.webp','T-YRF005.webp','y005.png','92ab7984-b410-4154-bcec-368ab0f42e4e'),
    new ClothItem('ゆるふわ','動物','','','YRF006','カバ','2189','','','','','','','','YRF006.webp','T-YRF006.webp','y006.png','57daa558-dc10-42c6-9fc8-c290fa7cf7e4'),
    new ClothItem('ゆるふわ','動物','','','YRF007','イカ','2189','','','','','','','','YRF007.webp','T-YRF007.webp','y007.png','e5788776-3340-436c-a07f-31ce75b4aa6b'),
    new ClothItem('ゆるふわ','動物','','','YRF008','ヒツジ1','2189','','','','','','','','YRF008.webp','T-YRF008.webp','y008.png','d9f20420-eed4-4b8d-b46e-f37720f0642c'),
    new ClothItem('ゆるふわ','動物','','','YRF009','ハムスター','2189','','','','','','','','YRF009.webp','T-YRF009.webp','y009.png','4192fcf2-303d-4198-bd34-37e2901e9376'),
    new ClothItem('ゆるふわ','動物','','','YRF010','ゴリラ','2189','','','','','','','','YRF010.webp','T-YRF010.webp','y010.png','a70ca89a-e1a7-433d-b333-f8a56cde212a'),
    new ClothItem('ゆるふわ','動物','','','YRF011','ゾウ','2189','','','','','','','','YRF011.webp','T-YRF011.webp','y011.png','f3aef71e-3ac1-45d0-9756-4e9fca305f73'),
    new ClothItem('ゆるふわ','動物','','','YRF012','イヌ1','2189','','','','','','','','YRF012.webp','T-YRF012.webp','y012.png','f010d4e7-8a64-4f36-8865-1d1387145a3a'),
    new ClothItem('ゆるふわ','動物','','','YRF013','ダチョウ','2189','','','','','','','','YRF013.webp','T-YRF013.webp','y013.png','bd18f418-d46e-4f80-8db0-0442bd584524'),
    new ClothItem('ゆるふわ','動物','','','YRF014','ネコ1','2189','','','','','','','','YRF014.webp','T-YRF014.webp','y014.png','700db9bf-72aa-4819-803d-1682140036bb'),
    new ClothItem('ゆるふわ','動物','','','YRF015','ブタ','2189','','','','','','','','YRF015.webp','T-YRF015.webp','y015.png','6c717dd5-7eaf-48e2-baae-40e42d46e546'),
    new ClothItem('ゆるふわ','動物','','','YRF016','アヒル','2189','','','','','','','','YRF016.webp','T-YRF016.webp','y016.png','83aebd30-89e8-44c0-b0b0-4d40dd8ed692'),
    new ClothItem('ゆるふわ','動物','','','YRF017','アリクイ','2189','','','','','','','','YRF017.webp','T-YRF017.webp','y017.png','7384cc68-b186-4b04-9889-8afceab423d9'),
    new ClothItem('ゆるふわ','動物','','','YRF018','ヤギ','2189','','','','','','','','YRF018.webp','T-YRF018.webp','y018.png','a39fe471-c971-4950-b7f7-92580b18fa9a'),
    new ClothItem('ゆるふわ','動物','','','YRF019','ワシ','2189','','','','','','','','YRF019.webp','T-YRF019.webp','y019.png','8099454b-c2a2-4341-8d99-fbbb69c264de'),
    new ClothItem('ゆるふわ','動物','','','YRF020','ワニ','2189','','','','','','','','YRF020.webp','T-YRF020.webp','y020.png','c7662c8b-9ca0-4945-bc1b-8c23e5ecd6ab'),
    new ClothItem('ゆるふわ','動物','','','YRF021','ウサギ1','2189','','','','','','','','YRF021.webp','T-YRF021.webp','y021.png','18afce0d-1d1b-4fb2-8ccd-d6eba6d844f9'),
    new ClothItem('ゆるふわ','動物','','','YRF022','ハクチョウ','2189','','','','','','','','YRF022.webp','T-YRF022.webp','y022.png','03531e6d-41ab-4056-b644-5e43341b55d7'),
    new ClothItem('ゆるふわ','動物','','','YRF023','シカ','2189','','','','','','','','YRF023.webp','T-YRF023.webp','y023.png','45cde873-942f-4890-bb13-21fb13c75ece'),
    new ClothItem('ゆるふわ','動物','','','YRF024','オオカミ','2189','','','','','','','','YRF024.webp','T-YRF024.webp','y024.png','31c95d5b-0bc2-4734-8ed3-e2394727c7e7'),
    new ClothItem('ゆるふわ','動物','','','YRF025','サル1','2189','','','','','','','','YRF025.webp','T-YRF025.webp','y025.png','c8154d1e-7a24-4654-b1b8-33286fbc54a0'),
    new ClothItem('ゆるふわ','動物','','','YRF026','クマ2','2189','','','','','','','','YRF026.webp','T-YRF026.webp','y026.png','8dd546bb-05d3-4b0a-a12a-1762b1c16174'),
    new ClothItem('ゆるふわ','動物','','','YRF027','タコ','2189','','','','','','','','YRF027.webp','T-YRF027.webp','y027.png','512c5e56-0cf2-4920-ae27-371497a4b8ea'),
    new ClothItem('ゆるふわ','動物','','','YRF028','ウサギ2','2189','','','','','','','','YRF028.webp','T-YRF028.webp','y028.png','57b6c81f-24a8-4e00-be86-9cac3b9f750c'),
    new ClothItem('ゆるふわ','動物','','','YRF029','トナカイ','2189','','','','','','','','YRF029.webp','T-YRF029.webp','y029.png','970bb2b1-72a8-4116-b81c-5217b7075fc5'),
    new ClothItem('ゆるふわ','動物','','','YRF030','ウマ','2189','','','','','','','','YRF030.webp','T-YRF030.webp','y030.png','d85e23a6-284e-4032-a8bf-cdb09ffb2705'),
    new ClothItem('ゆるふわ','動物','','','YRF031','ツルカメ','2189','','','','','','','','YRF031.webp','T-YRF031.webp','y031.png','2906f147-bb9d-47c6-af71-b55e09a0fe0b'),
    new ClothItem('ゆるふわ','動物','','','YRF032','イノシシ','2189','','','','','','','','YRF032.webp','T-YRF032.webp','y032.png','2b2235cc-8936-4a1a-95bc-39bbe469f20a'),
    new ClothItem('ゆるふわ','動物','','','YRF033','ヒツジ2','2189','','','','','','','','YRF033.webp','T-YRF033.webp','y033.png','b2908eb0-6fcb-4dfa-9dee-e1fe0a322102'),
    new ClothItem('ゆるふわ','動物','','','YRF034','リュウ','2189','','','','','','','','YRF034.webp','T-YRF034.webp','y034.png','d1b02365-5026-4052-bf12-ee8fe9b70eb4'),
    new ClothItem('ゆるふわ','動物','','','YRF035','イヌ2','2189','','','','','','','','YRF035.webp','T-YRF035.webp','y035.png','8ed7d1d9-4f95-4ec3-a3f1-70d93996ccd3'),
    new ClothItem('ゆるふわ','動物','','','YRF036','ニワトリ','2189','','','','','','','','YRF036.webp','T-YRF036.webp','y036.png','7e2fd2ae-8336-4819-8d86-a6dccec2a204'),
    new ClothItem('ゆるふわ','動物','','','YRF037','サル2','2189','','','','','','','','YRF037.webp','T-YRF037.webp','y037.png','57451e91-1f1c-47ed-b3ff-d748862314b0'),
    new ClothItem('ゆるふわ','動物','','','YRF038','ヘビ','2189','','','','','','','','YRF038.webp','T-YRF038.webp','y038.png','dfa2042b-42cf-46a9-b91b-32a4f1dfbab8'),
    new ClothItem('ゆるふわ','動物','','','YRF039','ウシ','2189','','','','','','','','YRF039.webp','T-YRF039.webp','y039.png','e37fe8bd-d626-4848-a8a2-0614a777187a'),
    new ClothItem('ゆるふわ','動物','','','YRF040','ウサギ3','2189','','','','','','','','YRF040.webp','T-YRF040.webp','y040.png','7adfd951-23b5-4567-8157-25aea0ef988f'),
    new ClothItem('ゆるふわ','動物','','','YRF041','トラ','2189','','','','','','','','YRF041.webp','T-YRF041.webp','y041.png','6a48d7e4-a442-461a-bf01-f86666f7f673'),
    new ClothItem('ゆるふわ','動物','','','YRF042','ネズミ','2189','','','','','','','','YRF042.webp','T-YRF042.webp','y042.png','d60dc78b-1aa2-4488-af88-e457843451ae'),
    new ClothItem('ゆるふわ','動物','','','YRF043','ネコ2','2189','','','','','','','','YRF043.webp','T-YRF043.webp','y043.png','00fcf484-7bac-4ebe-9fbb-8d0caade591a'),
    new ClothItem('ゆるふわ','動物','','','YRF044','イヌ3','2189','','','','','','','','YRF044.webp','T-YRF044.webp','y044.png','25527ebb-5084-404d-8a34-90c0931c3bab'),
    new ClothItem('ゆるふわ','動物','','','YRF046','クロネコ','2189','','','','','','','','YRF046.webp','T-YRF046.webp','y046.png','3e0bd296-bd91-444b-b42f-3b37f1e872f3'),
    new ClothItem('ゆるふわ','動物','','','YRF047','カエル','2189','','','','','','','','YRF047.webp','T-YRF047.webp','y047.png','8e7ee0e2-6bc7-4590-ac8a-fc59671b587f'),
    new ClothItem('ゆるふわ','動物','','','YRF048','ウサギ4','2189','','','','','','','','YRF048.webp','T-YRF048.webp','y048.png','1a26a28c-d664-453a-837a-a47c987f35d2'),
    new ClothItem('ゆるふわ','動物','','','YRF049','リス','2189','','','','','','','','YRF049.webp','T-YRF049.webp','y049.png','8b304f97-d46c-41c0-a04a-ca1265c2a1d4'),
    new ClothItem('ゆるふわ','お花','','','YRF050','椿','2189','','','','','','','','YRF050.webp','T-YRF050.webp','y050.png','e4dd6f4e-d9df-4e24-a186-710f31d54a6b'),
    new ClothItem('ゆるふわ','お花','','','YRF051','たんぽぽ','2189','','','','','','','','YRF051.webp','T-YRF051.webp','y051.png','b2cb4f39-002f-466d-b0de-ba306010efd9'),
    new ClothItem('ゆるふわ','お花','','','YRF052','すずらん','2189','','','','','','','','YRF052.webp','T-YRF052.webp','y052.png','b86a212f-77b1-4193-b1fe-27064f6a59a8'),
    new ClothItem('ゆるふわ','お花','','','YRF053','すみれ','2189','','','','','','','','YRF053.webp','T-YRF053.webp','y053.png','83f39aea-94b1-4e57-99b9-c89f98eae36f'),
    new ClothItem('ゆるふわ','お花','','','YRF054','水仙','2189','','','','','','','','YRF054.webp','T-YRF054.webp','y054.png','e2f9223e-760e-45e4-bc99-7598268be3ed'),
    new ClothItem('ゆるふわ','お花','','','YRF055','ラン','2189','','','','','','','','YRF055.webp','T-YRF055.webp','y055.png','c0c871f5-e845-4062-8921-9b438b1a137a'),
    new ClothItem('ゆるふわ','お花','','','YRF056','ラナンキュラス','2189','','','','','','','','YRF056.webp','T-YRF056.webp','y056.png','6d40f68f-9d7b-4c9a-830a-f8becb406298'),
    new ClothItem('ゆるふわ','お花','','','YRF057','パンジー','2189','','','','','','','','YRF057.webp','T-YRF057.webp','y057.png','77d34b18-d5a0-47f4-9180-25775d3132c4'),
    new ClothItem('ゆるふわ','お花','','','YRF058','菜の花','2189','','','','','','','','YRF058.webp','T-YRF058.webp','y058.png','d608bdd5-715a-47d9-bd14-22be784dc529'),
    new ClothItem('ゆるふわ','お花','','','YRF059','猫じゃらし','2189','','','','','','','','YRF059.webp','T-YRF059.webp','y059.png','fe27b386-5826-4447-990e-af1b7d3bfabc'),
    new ClothItem('ゆるふわ','お花','','','YRF060','桃','2189','','','','','','','','YRF060.webp','T-YRF060.webp','y060.png','c07c6d70-8021-49c9-b554-1751061e2569'),
    new ClothItem('ゆるふわ','お花','','','YRF061','マーガレット','2189','','','','','','','','YRF061.webp','T-YRF061.webp','y061.png','cf5e2d10-55a7-4244-b79d-2f24f2241372'),
    new ClothItem('ゆるふわ','お花','','','YRF062','菊','2189','','','','','','','','YRF062.webp','T-YRF062.webp','y062.png','bd58396d-4292-44a3-af9b-1112819837a4'),
    new ClothItem('ゆるふわ','お花','','','YRF063','稲','2189','','','','','','','','YRF063.webp','T-YRF063.webp','y063.png','6bceb549-8346-4066-a7d5-7edca12f4b1e'),
    new ClothItem('ゆるふわ','お花','','','YRF064','彼岸花','2189','','','','','','','','YRF064.webp','T-YRF064.webp','y064.png','4a3275e8-fbe9-419e-9ffb-4c4acd2a2d41'),
    new ClothItem('ゆるふわ','お花','','','YRF065','藤の花','2189','','','','','','','','YRF065.webp','T-YRF065.webp','y065.png','ff448490-b473-4d78-8aa5-998a7c0ce7b9'),
    new ClothItem('ゆるふわ','お花','','','YRF066','フリージア','2189','','','','','','','','YRF066.webp','T-YRF066.webp','y066.png','795c10a6-45d3-4fd0-9d0d-ebdc259178c7'),
    new ClothItem('ゆるふわ','お花','','','YRF067','クロッカス','2189','','','','','','','','YRF067.webp','T-YRF067.webp','y067.png','1b418fdd-4b12-4998-8550-eacb47f0cd7b'),
    new ClothItem('ゆるふわ','お花','','','YRF068','シクラメン','2189','','','','','','','','YRF068.webp','T-YRF068.webp','y068.png','856fd743-7a2d-4bd8-96f4-ef4bf41dc14f'),
    new ClothItem('ゆるふわ','お花','','','YRF069','コスモス','2189','','','','','','','','YRF069.webp','T-YRF069.webp','y069.png','70ace135-61ba-4255-9a96-0f5848ac79a0'),
    new ClothItem('ゆるふわ','お花','','','YRF070','ヒマワリ','2189','','','','','','','','YRF070.webp','T-YRF070.webp','y070.png','e7a76f6d-3030-43de-ad9b-fe67f4b6128a'),
    new ClothItem('ゆるふわ','虫','','','YRF071','てんとう虫','2189','','','','','','','','YRF071.webp','T-YRF071.webp','y071.png','60ba087a-6af0-4b4e-8165-87ae59c4b690'),
    new ClothItem('ゆるふわ','虫','','','YRF072','タマムシ','2189','','','','','','','','YRF072.webp','T-YRF072.webp','y072.png','5488298a-db39-489a-81ed-2e9b4888ca4d'),
    new ClothItem('ゆるふわ','虫','','','YRF073','オニヤンマ','2189','','','','','','','','YRF073.webp','T-YRF073.webp','y073.png','80e5af07-4db2-44f7-b631-bffa02227689'),
    new ClothItem('ゆるふわ','虫','','','YRF074','モンシロチョウ','2189','','','','','','','','YRF074.webp','T-YRF074.webp','y074.png','274c12f6-1138-4a42-a7db-ddba487a623f'),
    new ClothItem('ゆるふわ','虫','','','YRF075','ミツバチ','2189','','','','','','','','YRF075.webp','T-YRF075.webp','y075.png','83fda250-3e99-476b-aa19-23065ef9e8c1'),
    new ClothItem('ゆるふわ','虫','','','YRF076','ミノムシ','2189','','','','','','','','YRF076.webp','T-YRF076.webp','y076.png','3528a9e6-1fda-48cd-92a6-93965d763f19'),
    new ClothItem('ゆるふわ','虫','','','YRF077','ミンミンゼミ','2189','','','','','','','','YRF077.webp','T-YRF077.webp','y077.png','6910ea15-ee1f-436d-98c4-b27d1035893f'),
    new ClothItem('ゆるふわ','虫','','','YRF078','クワガタ（メス）','2189','','','','','','','','YRF078.webp','T-YRF078.webp','y078.png','6cea28f6-7c2c-4bc7-acbf-c064825428e8'),
    new ClothItem('ゆるふわ','虫','','','YRF079','クワガタ（オス）','2189','','','','','','','','YRF079.webp','T-YRF079.webp','y079.png','d0671e80-e642-4328-9ae9-04e6e5e0549e'),
    new ClothItem('ゆるふわ','虫','','','YRF080','クモ','2189','','','','','','','','YRF080.webp','T-YRF080.webp','y080.png','a06f0ae7-6438-4074-ba5c-dea911143d20'),
    new ClothItem('ゆるふわ','虫','','','YRF081','クマゼミ','2189','','','','','','','','YRF081.webp','T-YRF081.webp','y081.png','c7a012d3-061c-4804-9677-4960b1c9a37b'),
    new ClothItem('ゆるふわ','虫','','','YRF082','コオロギ','2189','','','','','','','','YRF082.webp','T-YRF082.webp','y082.png','b454e091-b73f-4edf-8a3c-9c87e5aa83a4'),
    new ClothItem('ゆるふわ','虫','','','YRF083','キリギリス','2189','','','','','','','','YRF083.webp','T-YRF083.webp','y083.png','7b8eab52-6e84-4825-914a-c6ad4013159f'),
    new ClothItem('ゆるふわ','虫','','','YRF084','カメムシ','2189','','','','','','','','YRF084.webp','T-YRF084.webp','y084.png','89645d63-042f-4615-9e52-b147bd526e99'),
    new ClothItem('ゆるふわ','虫','','','YRF085','カマキリ','2189','','','','','','','','YRF085.webp','T-YRF085.webp','y085.png','26c71307-e1b7-4b72-9688-ecaf90b3c110'),
    new ClothItem('ゆるふわ','虫','','','YRF086','カブトムシ','2189','','','','','','','','YRF086.webp','T-YRF086.webp','y086.png','b28a0d52-84af-41ae-b259-e9e54bc20abf'),
    new ClothItem('ゆるふわ','虫','','','YRF087','イトトンボ','2189','','','','','','','','YRF087.webp','T-YRF087.webp','y087.png','0cedb802-4f32-41ad-84fd-23805be3e3fe'),
    new ClothItem('ゆるふわ','虫','','','YRF088','イモムシ','2189','','','','','','','','YRF088.webp','T-YRF088.webp','y088.png','d2c99747-a6c5-4a76-adc8-a6452f8167ed'),
    new ClothItem('ゆるふわ','虫','','','YRF089','ホタル','2189','','','','','','','','YRF089.webp','T-YRF089.webp','y089.png','97e6ac6a-c707-4637-8563-d9d9a57b5b9c'),
    new ClothItem('ゆるふわ','虫','','','YRF090','ギンヤンマ','2189','','','','','','','','YRF090.webp','T-YRF090.webp','y090.png','f2cde8fd-1e0c-4643-9736-bfd7c18db9d3'),
    new ClothItem('ゆるふわ','虫','','','YRF091','カタツムリ1','2189','','','','','','','','YRF091.webp','T-YRF091.webp','y091.png','ccce18fc-1f17-41e8-ba28-9b4ed4eee9ad'),
    new ClothItem('ゆるふわ','虫','','','YRF092','ダンゴムシ','2189','','','','','','','','YRF092.webp','T-YRF092.webp','y092.png','85a3eca9-30c2-4752-8b20-6596daa4e819'),
    new ClothItem('ゆるふわ','虫','','','YRF093','アリ','2189','','','','','','','','YRF093.webp','T-YRF093.webp','y093.png','9ff6533c-b415-4512-abea-dd5e2c17c469'),
    new ClothItem('ゆるふわ','虫','','','YRF094','赤とんぼ','2189','','','','','','','','YRF094.webp','T-YRF094.webp','y094.png','ce969775-e718-4f36-8666-9e1e93b62142'),
    new ClothItem('ゆるふわ','虫','','','YRF095','アゲハチョウ','2189','','','','','','','','YRF095.webp','T-YRF095.webp','y095.png','c323b32d-96f0-4ab0-826a-0cd4e77fadbc'),
    new ClothItem('ゆるふわ','虫','','','YRF096','アブラゼミ','2189','','','','','','','','YRF096.webp','T-YRF096.webp','y096.png','d089ba66-ae33-47e5-96ba-b64125da2b14'),
    new ClothItem('ゆるふわ','虫','','','YRF097','カタツムリ2','2189','','','','','','','','YRF097.webp','T-YRF097.webp','y097.png','5e805a3b-b26e-4d49-8685-96c31ba4d6b3'),
    new ClothItem('ゆるふわ','お魚','','','YRF098','タコ','2189','','','','','','','','YRF098.webp','T-YRF098.webp','y098.png','06318f7c-6d2a-4e3b-ac91-c46fece811a8'),
    new ClothItem('ゆるふわ','お魚','','','YRF099','タイ','2189','','','','','','','','YRF099.webp','T-YRF099.webp','y099.png','9dfb9a9d-6c3b-4eaa-8730-522cc11353a0'),
    new ClothItem('ゆるふわ','お魚','','','YRF100','サンマ','2189','','','','','','','','YRF100.webp','T-YRF100.webp','y100.png','f01cc1fe-0032-4eec-96f6-ce8fd8c384c3'),
    new ClothItem('ゆるふわ','お魚','','','YRF101','サメ','2189','','','','','','','','YRF101.webp','T-YRF101.webp','y101.png','8b5eaad3-dc46-49d6-8899-09b491ccaff8'),
    new ClothItem('ゆるふわ','お魚','','','YRF102','サケ','2189','','','','','','','','YRF102.webp','T-YRF102.webp','y102.png','e64f20a0-f5af-4fd4-91f5-fcda024e5d8b'),
    new ClothItem('ゆるふわ','お魚','','','YRF103','マグロ','2189','','','','','','','','YRF103.webp','T-YRF103.webp','y103.png','82e2b7c5-c4dc-4158-b4c5-3f88ac78d19a'),
    new ClothItem('ゆるふわ','お魚','','','YRF104','貝','2189','','','','','','','','YRF104.webp','T-YRF104.webp','y104.png','d09c482d-1205-48e3-8338-9c745d11c26f'),
    new ClothItem('ゆるふわ','お魚','','','YRF105','エビ','2189','','','','','','','','YRF105.webp','T-YRF105.webp','y105.png','ed5a7578-d385-4abd-80a6-1844eaad340f'),
    new ClothItem('ゆるふわ','お魚','','','YRF106','サバ','2189','','','','','','','','YRF106.webp','T-YRF106.webp','y106.png','d03a11d6-7564-4746-91be-9a8d9f62fe8a'),
    new ClothItem('ゆるふわ','お魚','','','YRF107','ヒラメ','2189','','','','','','','','YRF107.webp','T-YRF107.webp','y107.png','cfc1396d-cd6d-4bb0-b210-47c956aa3846'),
    new ClothItem('ゆるふわ','お魚','','','YRF108','フグ','2189','','','','','','','','YRF108.webp','T-YRF108.webp','y108.png','0e0c8d7f-5fab-4f12-8f7e-d15cf3c52b43'),
    new ClothItem('ゆるふわ','お魚','','','YRF109','カレイ','2189','','','','','','','','YRF109.webp','T-YRF109.webp','y109.png','0c116598-0a48-445e-96e2-69f41a547173'),
    new ClothItem('ゆるふわ','お魚','','','YRF110','イカ','2189','','','','','','','','YRF110.webp','T-YRF110.webp','y110.png','f6d13298-2e62-480c-9006-9668e514cfe7'),
    new ClothItem('ゆるふわ','お魚','','','YRF111','ヤドカリ','2189','','','','','','','','YRF111.webp','T-YRF111.webp','y111.png','52d51c24-cbd5-4c5f-9de3-0a36f7fb752b'),
    new ClothItem('ゆるふわ','お魚','','','YRF112','カニ','2189','','','','','','','','YRF112.webp','T-YRF112.webp','y112.png','45175306-31b9-4906-a908-85e8a8c1d84d'),
    new ClothItem('ゆるふわ','イベント','','','YRF113','イベント1','2189','','','','','','','','YRF113.webp','T-YRF113.webp','y113.png','aa5f11fd-8119-4fb4-8bd1-4a44317665a1'),
    new ClothItem('ゆるふわ','イベント','','','YRF114','イベント2','2189','','','','','','','','YRF114.webp','T-YRF114.webp','y114.png','d8abd3f9-3da1-4dcc-b1bd-c852b7e5c454'),
    new ClothItem('ゆるふわ','イベント','','','YRF115','イベント3','2189','','','','','','','','YRF115.webp','T-YRF115.webp','y115.png','22fa6ea2-2325-4101-b3aa-8f0c4e713394'),
    new ClothItem('ゆるふわ','イベント','','','YRF116','イベント4','2189','','','','','','','','YRF116.webp','T-YRF116.webp','y116.png','d45dfe2d-7c69-4f30-99d7-6196bba727db'),
    new ClothItem('ゆるふわ','イベント','','','YRF117','イベント5','2189','','','','','','','','YRF117.webp','T-YRF117.webp','y117.png','17d9f7ca-6ee8-49c3-b8ad-8e856e988cf0'),
    new ClothItem('ゆるふわ','イベント','','','YRF118','イベント6','2189','','','','','','','','YRF118.webp','T-YRF118.webp','y118.png','e120eeaf-60be-434e-8f1e-5322db052da2'),
    new ClothItem('ゆるふわ','イベント','','','YRF119','イベント7','2189','','','','','','','','YRF119.webp','T-YRF119.webp','y119.png','d824cd28-5a8c-4f1f-895b-ce729e3d68bf'),
    new ClothItem('ゆるふわ','イベント','','','YRF120','イベント8','2189','','','','','','','','YRF120.webp','T-YRF120.webp','y120.png','61a40247-a04a-4292-92eb-ced1ea28529c'),
    new ClothItem('ゆるふわ','イベント','','','YRF121','イベント9','2189','','','','','','','','YRF121.webp','T-YRF121.webp','y121.png','1268c6f0-53c2-45cd-94cc-6b8693e82ebc'),
    new ClothItem('ゆるふわ','イベント','','','YRF122','イベント10','2189','','','','','','','','YRF122.webp','T-YRF122.webp','y122.png','f1bcb684-90b8-465f-aa25-da369ddb368e'),
    new ClothItem('ゆるふわ','イベント','','','YRF123','イベント11','2189','','','','','','','','YRF123.webp','T-YRF123.webp','y123.png','1d4ea832-a3a5-482c-98a5-282e1ec0281e'),
    new ClothItem('ゆるふわ','イベント','','','YRF124','イベント12','2189','','','','','','','','YRF124.webp','T-YRF124.webp','y124.png','085f2ffc-e5a3-4cae-bac0-df94f41af989'),
    new ClothItem('ゆるふわ','イベント','','','YRF125','イベント13','2189','','','','','','','','YRF125.webp','T-YRF125.webp','y125.png','898e6a80-7fba-42d0-a438-90a06444aace'),
    new ClothItem('ゆるふわ','イベント','','','YRF138','イベント14','2189','','','','','','','','YRF138.webp','T-YRF138.webp','y138.png','0f6aef4e-3476-41ef-8c9d-6981ca4f72bb'),
    new ClothItem('ゆるふわ','イベント','','','YRF139','イベント15','2189','','','','','','','','YRF139.webp','T-YRF139.webp','y139.png','b38b5de8-a5c0-4cff-ba4e-b8137c3ee7fe'),
    new ClothItem('ゆるふわ','イベント','','','YRF140','イベント16','2189','','','','','','','','YRF140.webp','T-YRF140.webp','y140.png','f4ce3fab-06c1-4281-b3f9-f49a96fdea7e'),
    new ClothItem('ゆるふわ','イベント','','','YRF141','イベント17','2189','','','','','','','','YRF141.webp','T-YRF141.webp','y141.png','44fd0ba7-0225-4b24-b160-a90375af83e6'),
    new ClothItem('ゆるふわ','イベント','','','YRF142','イベント18','2189','','','','','','','','YRF142.webp','T-YRF142.webp','y142.png','2796000c-997c-432b-be25-c331a0107420'),
    new ClothItem('ゆるふわ','イベント','','','YRF143','イベント19','2189','','','','','','','','YRF143.webp','T-YRF143.webp','y143.png','4389fdca-87aa-45dc-8d28-8148ab6cbf73'),
    new ClothItem('ゆるふわ','イベント','','','YRF146','イベント20','2189','','','','','','','','YRF146.webp','T-YRF146.webp','y146.png','5e0a03b3-ab51-46b3-a725-7bd5b1f180db'),
    new ClothItem('ゆるふわ','イベント','','','YRF133','イベント21','2189','','','','','','','','YRF133.webp','T-YRF133.webp','y133.png','5f474ad0-aa66-46ee-8530-eac59680d40e'),
    new ClothItem('ゆるふわ','イベント','','','YRF134','イベント22','2189','','','','','','','','YRF134.webp','T-YRF134.webp','y134.png','a3592e9c-e8b2-4fb4-baec-f24019c0373c'),
    new ClothItem('ゆるふわ','イベント','','','YRF045','イベント23','2189','','','','','','','','YRF045.webp','T-YRF045.webp','y045.png','3d40f956-86ba-408d-bbf1-1e4cde508a8f'),
    new ClothItem('ゆるふわ','イベント','','','YRF135','イベント24','2189','','','','','','','','YRF135.webp','T-YRF135.webp','y135.png','1d6674a4-e69c-4c99-80ab-3210b3131608'),
    new ClothItem('ゆるふわ','イベント','','','YRF136','イベント25','2189','','','','','','','','YRF136.webp','T-YRF136.webp','y136.png','aef34ba5-54cf-4361-919e-1666579bd8bb'),
    new ClothItem('ゆるふわ','食べ物','','','YRF126','プリン','2189','','','','','','','','YRF126.webp','T-YRF126.webp','y126.png','0ff2c8bb-16e2-48b9-ae88-4df8c1c6f555'),
    new ClothItem('ゆるふわ','食べ物','','','YRF127','たい焼き','2189','','','','','','','','YRF127.webp','T-YRF127.webp','y127.png','9292f3c7-c4b1-4879-8ee1-069542bf193f'),
    new ClothItem('ゆるふわ','食べ物','','','YRF128','パフェ','2189','','','','','','','','YRF128.webp','T-YRF128.webp','y128.png','1bf0e724-bb28-483b-8501-d94f792504ff'),
    new ClothItem('ゆるふわ','食べ物','','','YRF129','ケーキ','2189','','','','','','','','YRF129.webp','T-YRF129.webp','y129.png','538e41d3-694c-4e3e-8b5a-1873ad27249e'),
    new ClothItem('ゆるふわ','食べ物','','','YRF130','だんご','2189','','','','','','','','YRF130.webp','T-YRF130.webp','y130.png','d2d0ff68-016f-4b2b-86b0-8ec4bcf1e695'),
    new ClothItem('ゆるふわ','食べ物','','','YRF131','ホットケーキ','2189','','','','','','','','YRF131.webp','T-YRF131.webp','y131.png','16193ffa-3ee7-4d22-b711-8e5ad13d5407'),
    new ClothItem('ゆるふわ','食べ物','','','YRF132','キャンディー','2189','','','','','','','','YRF132.webp','T-YRF132.webp','y132.png','aeca51d9-99d6-4610-ba89-242f9b1c73c9'),
    new ClothItem('ゆるふわ','食べ物','','','YRF137','ソフトクリーム','2189','','','','','','','','YRF137.webp','T-YRF137.webp','y137.png','b0d68423-6066-4ae8-842f-f9ca9f9325fc'),
    new ClothItem('ゆるふわ','食べ物','','','YRF144','すし','2189','','','','','','','','YRF144.webp','T-YRF144.webp','y144.png','25731b54-5996-4a1c-8fc9-54f3ddd8c544'),
    new ClothItem('ゆるふわ','食べ物','','','YRF145','スイカ','2189','','','','','','','','YRF145.webp','T-YRF145.webp','y145.png','538a5433-f25b-48e3-9aff-89b627877de3'),
    new ClothItem('ゆるふわ','食べ物','','','YRF147','ピザ','2189','','','','','','','','YRF147.webp','T-YRF147.webp','y147.png','59316a31-28f9-4b05-889a-676acff65584'),
    new ClothItem('ゆるふわ','食べ物','','','YRF148','おにぎり','2189','','','','','','','','YRF148.webp','T-YRF148.webp','y148.png','84c2e5dc-7c16-4b28-9dcc-6bb054c7dbdc'),
  ];

  // 現在選択中の画像
  let currentIndex = -1;
  // 現在選択中のアイテム
  let selectedItem = new ClothItem();
  // タグ要素の取得メイン画像の設定
  const imgDesign = document.getElementById('thumbnail_selected');
  const imgWeared = document.getElementById('thumbnail_selected_tryon');
  const boxDetail = document.getElementById('detail-box');
  const btnCate_01 = document.getElementById('button_category_tag1');
  const btnCate_02 = document.getElementById('button_category_tag2');
  const btnCate_03 = document.getElementById('button_category_tag3');
  
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
    // **********
    // タイムアウト
    countReset();
    // **********
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
    btnCate_01.classList.add('item-hide');
    btnCate_02.classList.add('item-hide');
    btnCate_03.classList.add('item-hide');
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
              btnCate_01.classList.add('item-hide');
            }
            else
            {
              btnCate_01.classList.remove('item-hide');
              btnCate_01.classList.add('item-show');
            }
            if(keyWord[1]=='')
            {
              btnCate_02.classList.add('item-hide');
            }
            else
            {
              btnCate_02.classList.remove('item-hide');
              btnCate_02.classList.add('item-show');
            }
            if(keyWord[2]=='')
            {
              btnCate_03.classList.add('item-hide');
            }
            else
            {
              btnCate_03.classList.remove('item-hide');
              btnCate_03.classList.add('item-show');
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
            btnCate_01.classList.add('item-hide');
          }
          else
          {
            btnCate_01.classList.remove('item-hide');
            btnCate_01.classList.add('item-show');
          }
          if(keyWord[1]=='')
          {
            btnCate_02.classList.add('item-hide');
          }
          else
          {
            btnCate_02.classList.remove('item-hide');
            btnCate_02.classList.add('item-show');
          }
          if(keyWord[2]=='')
          {
            btnCate_03.classList.add('item-hide');
          }
          else
          {
            btnCate_03.classList.remove('item-hide');
            btnCate_03.classList.add('item-show');
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
      // li要素の生成
      //----------------------------------
      const li = document.createElement('li');      
      // クリックされた時の処理
      // li.addEventListener("click", click_item, false);
      // li.eventParam = index;
      li.addEventListener("click", function(){click_item(index)}, false);
      targetTag.appendChild(li);
      item.setLocation(location);
      //----------------------------------
      // 注釈画像の表示
      // https://naifix.com/relative-absolute/
      //----------------------------------
      const div_imgRemark_container = document.createElement('div');
      div_imgRemark_container.classList.add('remark-container');
      li.appendChild(div_imgRemark_container);
      //----------------------------------
      // 画像の表示
      //----------------------------------
      // imgタグを生成し、イメージを割り当て
      const img = document.createElement('img');
      // img.loading = 'lazy';
      img.loading = 'auto';
      img.classList.add('imgDesign');
      img.src = item.designsrc;
      div_imgRemark_container.appendChild(img);
      //----------------------------------
      // 注釈画像の表示
      //----------------------------------     
      let imgsrc_overlay = '';
      switch(item.remark09)
      {
        case 'OVL01':
          imgsrc_overlay = 'img/remarks/STAR-small.webp';
          break;
        default:
          break;
      }
      if(imgsrc_overlay != '')
      {
        // imgタグを生成し、イメージを割り当て
        const imgRemark = document.createElement('img');
        imgRemark.classList.add('imgremark');
        imgRemark.src = imgsrc_overlay;
        div_imgRemark_container.appendChild(imgRemark);
      }
      // 次！
      location++;
    });
  }
  //--------------------------------------------
  // アイテムが選択された時の処理
  //--------------------------------------------
  function click_item(index, location) {
    // **********
    // タイムアウト
    countReset();
    // **********

    // クリック対象でなければ終了
    if(items[index].remark06 != '')
    {
      return;
    }
    // 選択中のボタン表示
    if(items[index].tag1 =='')
    {
      btnCate_01.classList.add('item-hide');
    }
    else
    {
      btnCate_01.classList.remove('item-hide');
      btnCate_01.classList.add('item-show');
    }
    if(items[index].tag2 =='')
    {
      btnCate_02.classList.add('item-hide');
    }
    else
    {
      btnCate_02.classList.remove('item-hide');
      btnCate_02.classList.add('item-show');
    }
    if(items[index].tag3 =='')
    {
      btnCate_03.classList.add('item-hide');
    }
    else
    {
      btnCate_03.classList.remove('item-hide');
      btnCate_03.classList.add('item-show');
    }
    document.getElementById('category_tag1').textContent=items[index].tag1;
    document.getElementById('category_tag2').textContent=items[index].tag2;
    document.getElementById('category_tag3').textContent=items[index].tag3;
    // 画像の切り替え
    imgDesign.src = items[index].designsrc;
    imgWeared.src = items[index].wearedImageSrc;

    // androidに選択したデータを送る
    // fromHTML_call_Set_Item(
    //                         items[index].uuid,
    //                         items[index].itemName,
    //                         items[index].designID,
    //                         items[index].designsrc,
    //                         items[index].wearedImageSrc,
    //                         items[index].tag1,
    //                         items[index].tag2,
    //                         items[index].tag3
    //                           );
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
    selectedItem.formaSrc       = items[index].formaSrc;
     
    selectedItem.uuid           = items[index].uuid;

    // タグ要素の取得メイン画像の設定
    imgDesign.classList.remove('item-hide');
    imgDesign.classList.add('item-show');
    imgWeared.classList.remove('item-hide');
    imgWeared.classList.add('item-show');
    boxDetail.classList.remove('item-hide');
    boxDetail.classList.add('item-show');
    document.getElementById('item_detail_tag1').textContent = items[index].tag1;
    document.getElementById('item_detail_tag2').textContent = items[index].tag2;
    document.getElementById('item_detail_tag3').textContent = items[index].tag3;
    document.getElementById('item_detail_name').textContent = items[index].itemName;
    document.getElementById('item_detail_designID').textContent = items[index].designID;
    
    
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
    imgDesign.classList.add('item-hide');
    imgWeared.classList.add('item-hide');
    boxDetail.classList.add('item-hide');
    document.getElementById('item_detail_tag1').textContent = selectedItem.tag1;
    document.getElementById('item_detail_tag2').textContent = selectedItem.tag2;
    document.getElementById('item_detail_tag3').textContent = selectedItem.tag3;
    document.getElementById('item_detail_name').textContent = selectedItem.itemName;
    document.getElementById('item_detail_designID').textContent = selectedItem.designID;

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
  // [Tree]カテゴリーリストを生成します。
  // チェックボックス型
  //--------------------------------------------
  function setCategoryListTree_checkbox() {
    const tagsTree = new TagsTree('root', '');   // タグのTree

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
          tagsTree.addChild(new TagsTree(item.tag1, item.remark10));
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
              tagsTree.childrenArray[i].addChild(new TagsTree(item.tag2, item.remark10));
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
                  tagsTree.childrenArray[i].childrenArray[j].addChild(new TagsTree(item.tag3, item.remark10));
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
      
      if(0 < tagsTree.childrenArray[i].childrenArray.length)
      {
        haveChild = true;
      }
      else
      {
        haveChild = false;
      }
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
      label_open.classList.add('button_tag1');

      // ボタン色
      switch(tagsTree.childrenArray[i].remarkcode)
      {
        case '1':
          label_open.classList.add('button_color1_tag1');
          break;
        case '2':
          label_open.classList.add('button_color2_tag1');
          break;
        case '3':
          label_open.classList.add('button_color3_tag1');
          break;
        case '4':
          label_open.classList.add('button_color4_tag1');
          break;
        default:
          break;
      }
      // label_open.textContent = `${tagsTree.childrenArray[i].name}`;
      // イベントの追加
      label_open.addEventListener("click", setItemListTree, false);
      label_open.eventParam = [
                            tagsTree.childrenArray[i].name,
                            '',
                            '',
                          ];
      label_open.style.overflow = 'hidden';
      div_accordion.append(label_open);

      // テキストを追加する
      const textSpan = document.createElement('span');
      textSpan.classList.add('text-category-span1');
      textSpan.textContent = `${tagsTree.childrenArray[i].name}`;
      textSpan.eventParam = [
        tagsTree.childrenArray[i].name,
        '',
        '',
      ];
      label_open.append(textSpan);

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
      img_categorytag1.classList.add('img_categorytag1');
      img_categorytag1.classList.add('imgcategory');
      img_categorytag1.eventParam = [
        tagsTree.childrenArray[i].name,
        '',
        '',
      ];
      label_open.append(img_categorytag1);

      


    

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
        // ボタン色
        switch(tagsTree.childrenArray[i].childrenArray[j].remarkcode)
        {
          case '1':
            label_open.classList.add('button_color1_tag2');
            break;
          case '2':
            label_open.classList.add('button_color2_tag2');
            break;
          case '3':
            label_open.classList.add('button_color3_tag2');
            break;
          case '4':
            label_open.classList.add('button_color4_tag2');
            break;
          default:
            break;
        }
        // label_open.textContent = `${tagsTree.childrenArray[i].childrenArray[j].name}`;

        // イベントの追加
        label_open.addEventListener("click", setItemListTree, false);
        label_open.eventParam = [
                                  tagsTree.childrenArray[i].name,
                                  tagsTree.childrenArray[i].childrenArray[j].name,
                                  '',
                            ];
        div_tag2.append(label_open);

        // テキストを追加する
        const textSpan2 = document.createElement('span');
        textSpan2.classList.add('text-category-span2');
        textSpan2.textContent = `${tagsTree.childrenArray[i].childrenArray[j].name}`;
        textSpan2.eventParam = [
          tagsTree.childrenArray[i].name,
          tagsTree.childrenArray[i].childrenArray[j].name,
          '',
        ];
        label_open.append(textSpan2);
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
        img_categorytag2.classList.add('img_categorytag2');
        img_categorytag2.classList.add('imgcategory');
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
          // ボタン色
          switch(tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].remarkcode)
          {
            case '1':
              label_open.classList.add('button_color1_tag3');
              break;
            case '2':
              label_open.classList.add('button_color2_tag3');
              break;
            case '3':
              label_open.classList.add('button_color3_tag3');
              break;
            case '4':
              label_open.classList.add('button_color4_tag3');
              break;
            default:
              break;
          }
          // label_open.textContent = `${tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name}`;
          // イベントの追加
          label_open.addEventListener("click", setItemListTree, false);
          label_open.eventParam = [
                                    tagsTree.childrenArray[i].name,
                                    tagsTree.childrenArray[i].childrenArray[j].name,
                                    tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name,
                              ];
          div_tag3.append(label_open);

          // テキストを追加する
          const textSpan3 = document.createElement('span');
          textSpan3.classList.add('text-category-span3');
          textSpan3.textContent = `${tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name}`;
          textSpan3.eventParam = [
            tagsTree.childrenArray[i].name,
            tagsTree.childrenArray[i].childrenArray[j].name,
            tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name,
          ];
          label_open.append(textSpan3);
          // アイコンを追加する。
          const img_categorytag3 = document.createElement('img');
          // 対象画像を検索
          for(let detect = 0; detect < items.length; detect++) {
            if(items[detect].check_tag([tagsTree.childrenArray[i].name,tagsTree.childrenArray[i].childrenArray[j].name,tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name]))
            {
              img_categorytag3.src = items[detect].designsrc;
              // img_category.src ="img/logos/c4_character_stop.png";
              break;
            }
          }
          img_categorytag3.classList.add('img_categorytag3');
          img_categorytag3.classList.add('imgcategory');
          img_categorytag3.eventParam = [
            tagsTree.childrenArray[i].name,
            tagsTree.childrenArray[i].childrenArray[j].name,
            tagsTree.childrenArray[i].childrenArray[j].childrenArray[k].name,
          ];
          label_open.append(img_categorytag3);
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
  // 商品が選ばれているか確認します。
  //--------------------------------------------
  function IsSelectItem() {
    // if(currentIndex < 0)
    // {
    //   alert("商品をえらんでください");
    //   return false;
    // }
    if(selectedItem.designID == '')
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
    // if(currentIndex < 0)
    // {
    //   alert("商品をえらんでください");
    //   return false;
    // }
    if(selectedItem.designID == '')
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
  // 選択中のアイテムをクリア
  selectedItem = new ClothItem(
    '', '', '', 
    '', 
    '', '', '', '', '', '', '','','','',
    '', '','',
    ''
  );
  selectedItem.clear_img_src();
  currentIndex = -1;
  // カテゴリーリストの作成
  setCategoryListTree_checkbox();
  // 対象アイテムの表示
  setItemListTree(['','','']);
}