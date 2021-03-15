'use strict';

{
  // 画像パスを配列で保持
  const images = [
    'img/book4-1.png',
    'img/book4-2.png',
    'img/book4-3.png',

    'img/book5-1.png',
    'img/book5-2.png',
    'img/book5-3.png',

    'img/book6-1.png',
    'img/book6-2.png',
    'img/book6-3.png',
    'img/book6-4.png',
    'img/book6-5.png',
    'img/book6-6.png',

    'img/book7-1.png',
    'img/book7-2.png',
    'img/book7-3.png',

    'img/book8-1.png',
    'img/book8-2.png',
    'img/book8-3.png',
  ]
  let items = new Array();
  // 現在選択中の画像
  let currentIndex = 0;

  // メイン画像の設定
  const mainImage = document.getElementById('thumbnail_selected');
  mainImage.src = images[currentIndex];
  //------------------------------------
  // thumbnailsの処理
  //------------------------------------
  images.forEach((image, index) => {
    items.push(image);
    const img = document.createElement('img');

    //----------------------------------
    // 画像の表示
    //----------------------------------
    // 画像ファイルで表示
    img.src = image;
    // 画像をBase64Blobで管理
    // img.src = get_ImageBlob_fromIndex(index);
    const li = document.createElement('li');

    // 現在の選択中
    if(index === currentIndex)
    {
      li.classList.add('current');
    }
    // クリックされた時の処理
    li.addEventListener('click',() => {
      // 画像の切り替え
      mainImage.src = image;
      // thumbnailsのすべての要素を取得
      const thumbnails = document.querySelectorAll('.thumbnails > li');
      // 現在の付加されているcurrentを外す
      thumbnails[currentIndex].classList.remove('current');
      // currentの更新
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
      console.log('');
    });

    li.appendChild(img);
    document.querySelector('.thumbnails').appendChild(li);
  });

  // //------------------------------------
  // // nextの処理
  // //------------------------------------
  // const next = document.getElementById('next');
  // next.addEventListener( 'click',() => {
  //   let target = currentIndex + 1;
  //       // loop
  //   if(target >= images.length)
  //   {
  //     target = 0;
  //   }
  //   const thumbnails = document.querySelectorAll('.thumbnails > li')[target].click();
  // });
  // //------------------------------------
  // // prevの処理
  // //------------------------------------
  // const prev = document.getElementById('prev');
  // prev.addEventListener('click', () => {
  //   let target = currentIndex -1;
  //   // loop
  //   if(target < 0)
  //   {
  //     target = images.length - 1;
  //   }
  //   const thumnails = document.querySelectorAll('.thumbnails > li')[target].click();
  // });
  // //------------------------------------
  // // playの処理
  // //------------------------------------
  // let isPlaying = false;
  // let timeoutID;
  // const play = document.getElementById('play');
  // play.addEventListener('click', () => {
  //   if(isPlaying === false)
  //   {
  //     playSlideShow();
  //     play.textContent='Pause';
  //   }
  //   else
  //   {
  //     clearTimeout(timeoutID);
  //     play.textContent='Play';
  //   }
  //   isPlaying = !isPlaying;
  
  // });

  // function playSlideShow()
  // {
  //   // 一定時間ごとに処置
  //   timeoutID = setTimeout(() =>{
  //     next.click();
  //     playSlideShow();
  //   }, 1000);
  // }
}