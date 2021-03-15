'use strict';

{
  // 画像パスを配列で保持
  const images = [

    'img/0001.png',
    'img/0002.png',
    'img/0003.png',
    'img/0004.png',
    'img/0005.png',
    'img/0006.png',
    'img/0007.png',
    'img/0008.png',
    'img/0009.png',
    'img/0010.png',

    'img/0011.png',
    'img/0012.png',
    'img/0013.png',
    'img/0014.png',
    'img/0015.png',
    'img/0016.png',
    'img/0017.png',
    'img/0018.png',
    'img/0019.png',
    'img/0020.png',

    'img/0021.png',
    'img/0022.png',
    'img/0023.png',
    'img/0024.png',
    'img/0025.png',
    'img/0026.png',
    'img/0027.png',
    'img/0028.png',
    'img/0029.png',
    'img/0030.png',

    'img/0031.png',
  ]
  const imagesTryOn = [

    'img/s0001.png',
    'img/s0002.png',
    'img/s0003.png',
    'img/s0004.png',
    'img/s0005.png',
    'img/s0006.png',
    'img/s0007.png',
    'img/s0008.png',
    'img/s0009.png',
    'img/s0010.png',

    'img/s0011.png',
    'img/s0012.png',
    'img/s0013.png',
    'img/s0014.png',
    'img/s0015.png',
    'img/s0016.png',
    'img/s0017.png',
    'img/s0018.png',
    'img/s0019.png',
    'img/s0020.png',

    'img/s0021.png',
    'img/s0022.png',
    'img/s0023.png',
    'img/s0024.png',
    'img/s0025.png',
    'img/s0026.png',
    'img/s0027.png',
    'img/s0028.png',
    'img/s0029.png',
    'img/s0030.png',

    'img/s0031.png',
  ]
  let items = new Array();
  // 現在選択中の画像
  let currentIndex = 0;

  // メイン画像の設定
  const mainImage = document.getElementById('thumbnail_selected');
  const mainImageTryOn = document.getElementById('thumbnail_selected_tryon');
  mainImage.src = images[currentIndex];
  mainImageTryOn.src = imagesTryOn[currentIndex];
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
      mainImageTryOn.src = imagesTryOn[index];
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