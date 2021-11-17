let picArray = [];
let counter = 0;
let playingID = 0;

function reloadPicture(param){
	picArray=[];
	for(let i=0;i<param.length;i++)
	{
		const pic = {src:param[i].url, title:""};
		picArray.push(pic);
	}
}
/**
 * 画僧の変更
 */
function changePicture() {
	if (counter < picArray.length) {
		document.getElementById('pics').src = picArray[counter].src;
		counter++;
	} else {
		document.getElementById('pics').src = picArray[0].src;
		counter = 1;
	}
}

/**
 * スライドショーの開始・停止
 */
function playSlidedeshow() {
	if (playingID == 0) {
		// document.getElementById('playButton').innerHTML = 'STOP';
		playingID = setInterval(changePicture, 5000);
	} else {
		// document.getElementById('playButton').innerHTML = 'START';
		clearInterval(playingID);
		playingID = 0;
	}
}

