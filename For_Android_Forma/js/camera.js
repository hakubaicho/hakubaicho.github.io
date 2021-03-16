{
  // 音声の再生
  const musicCountDown = document.getElementById('sound-countdown');
  const musicShutter = document.getElementById('sound-shutter');
  const textSoundStatus = document.getElementById('soundStatus');

  // カウントダウン音声
  function play_countdown() {
    textSoundStatus.textContent="nowPlaying";
    // 先頭から再生
    musicCountDown.currentTime = 0;
    musicCountDown.play();  // 再生
  };

  // シャッター音声
  function play_shutter() {
    textSoundStatus.textContent="nowPlaying";
    // 先頭から再生
    musicShutter.currentTime = 0;
    musicShutter.play();  // 再生
  };

  // カウントダウン音声完了時
  musicCountDown.addEventListener("ended", function () {
    textSoundStatus.textContent="ended";
    // 次回開始のため
    musicCountDown.pause();
    musicCountDown.currentTime = 0;
     
    // -----------------------------------
    // 必要な処理を行う
    // -----------------------------------
    // シャッター音を鳴らす。
    play_shutter();
    // 撮影処理を行う。
    //  videocapture();
    // -----------------------------------
   }, false);

  // シャッター音声完了時
   musicShutter.addEventListener("ended", function () {
    textSoundStatus.textContent="ended";
     // 次回開始のため
     musicShutter.pause();
     musicShutter.currentTime = 0;
   }, false);

}