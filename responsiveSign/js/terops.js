let teropArray = [];
let counterTerop = 0;
let playingIDTerop = 0;

function reloadTerop(param){
	teropArray=[];
	for(let i=0;i<param.length;i++)
	{
		const terop = {terop:param[i].terop, title:""};
		teropArray.push(terop);
	}
}
/**
 * 画僧の変更
 */
function changeTerop() {
	if (counterTerop < teropArray.length) {
		document.getElementById('terops').innerText = teropArray[counterTerop].terop;
		counterTerop++;
	} else {
		document.getElementById('terops').innerText = teropArray[0].terop;
		counterTerop = 1;
	}
}

/**
 * スライドショーの開始・停止
 */
function playTerop() {
	if (playingIDTerop == 0) {
		playingIDTerop = setInterval(changeTerop, 2000);
	} else {
		clearInterval(playingIDTerop);
		playingIDTerop = 0;
	}
}