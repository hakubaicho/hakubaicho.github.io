'use strict';

{
  // 画像パスを配列で保持
  // const images = [
  //   'img/pic00.png',
  //   'img/pic01.png',
  //   'img/pic02.png',
  //   'img/pic03.png',
  //   'img/pic04.png',
  //   'img/pic05.png',
  //   'img/pic06.png',
  //   'img/pic07.png',
  // ]
  const images = [
    'image/0000.jpg',
    'image/0001.jpg',
    'image/0002.jpg',
    'image/0003.jpg',
    'image/0004.jpg',
    'image/0005.jpg',
    'image/0006.jpg',
    'image/0007.jpg',
    'image/0008.jpg',
    'image/0009.jpg',

    'image/0010.jpg',
    'image/0011.jpg',
    'image/0012.jpg',
    'image/0013.jpg',
    'image/0014.jpg',
    'image/0015.jpg',
    'image/0016.jpg',
    'image/0017.jpg',
    'image/0018.jpg',
    'image/0019.jpg',

    'image/0020.jpg',
    'image/0021.jpg',
    'image/0022.jpg',
    'image/0023.jpg',
    'image/0024.jpg',
    'image/0025.jpg',
    'image/0026.jpg',
    'image/0027.jpg',
    'image/0028.jpg',
    'image/0029.jpg',

    'image/0030.jpg',
    'image/0031.jpg',
    'image/0032.jpg',
    'image/0033.jpg',
    'image/0034.jpg',
    'image/0035.jpg',
    'image/0036.jpg',
    'image/0037.jpg',
    'image/0038.jpg',
    'image/0039.jpg',

    'image/0040.jpg',
    'image/0041.jpg',
    'image/0042.jpg',
    'image/0043.jpg',
    'image/0044.jpg',
    'image/0045.jpg',
    'image/0046.jpg',
    'image/0047.jpg',
    'image/0048.jpg',
    'image/0049.jpg',

    'image/0050.jpg',
    'image/0051.jpg',
    'image/0052.jpg',
    'image/0053.jpg',
    'image/0054.jpg',
    'image/0055.jpg',
    'image/0056.jpg',
    'image/0057.jpg',
    'image/0058.jpg',
    'image/0059.jpg',

    'image/0060.jpg',
    'image/0061.jpg',
    'image/0062.jpg',
    'image/0063.jpg',
    'image/0064.jpg',
    'image/0065.jpg',
    'image/0066.jpg',
    'image/0067.jpg',
    'image/0068.jpg',
    'image/0069.jpg',

    'image/0070.jpg',
    'image/0071.jpg',
    'image/0072.jpg',
    'image/0073.jpg',
    'image/0074.jpg',
    'image/0075.jpg',
    'image/0076.jpg',
    'image/0077.jpg',
    'image/0078.jpg',
    'image/0079.jpg',

    'image/0080.jpg',
    'image/0081.jpg',
    'image/0082.jpg',
    'image/0083.jpg',
    'image/0084.jpg',
    'image/0085.jpg',
    'image/0086.jpg',
    'image/0087.jpg',
    'image/0088.jpg',
    'image/0089.jpg',

    'image/0090.jpg',
    'image/0091.jpg',
    'image/0092.jpg',
    'image/0093.jpg',
    'image/0094.jpg',
    'image/0095.jpg',
    'image/0096.jpg',
    'image/0097.jpg',
    'image/0098.jpg',
    'image/0099.jpg',
  ]
  let items = new Array();
  // 現在選択中の画像
  let currentIndex = 0;

  // メイン画像の設定
  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];
  //------------------------------------
  // thumbnailsの処理
  //------------------------------------
  images.forEach((image, index) => {
    items.push(image);
    const img = document.createElement('img');
    img.src = image;
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

  //------------------------------------
  // nextの処理
  //------------------------------------
  const next = document.getElementById('next');
  next.addEventListener( 'click',() => {
    let target = currentIndex + 1;
        // loop
    if(target >= images.length)
    {
      target = 0;
    }
    const thumbnails = document.querySelectorAll('.thumbnails > li')[target].click();
  });
  //------------------------------------
  // prevの処理
  //------------------------------------
  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex -1;
    // loop
    if(target < 0)
    {
      target = images.length - 1;
    }
    const thumnails = document.querySelectorAll('.thumbnails > li')[target].click();
  });
  //------------------------------------
  // playの処理
  //------------------------------------
  let isPlaying = false;
  let timeoutID;
  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if(isPlaying === false)
    {
      playSlideShow();
      play.textContent='Pause';
    }
    else
    {
      clearTimeout(timeoutID);
      play.textContent='Play';
    }
    isPlaying = !isPlaying;
  
  });

  function playSlideShow()
  {
    // 一定時間ごとに処置
    timeoutID = setTimeout(() =>{
      next.click();
      playSlideShow();
    }, 1000);
  }
}