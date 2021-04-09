{
	function getCSV() {
		const filepath = "http://hakubaicho.github.io/onepage_forma/data/items.txt";
		let req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
		req.open("get", filepath, true); // アクセスするファイルを指定
		req.send(null); // HTTPリクエストの発行

		// レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
		req.onload = function(){
				convertTSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
				console.log('req onload');
		}
	}
	// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
	function convertTSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
		console.log('convertTSVtoArray' + ` = ${str}`);
		let result = []; // 最終的な二次元配列を入れるための配列
		let tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

		// 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
		for(var i=0;i<tmp.length;++i){
				result[i] = tmp[i].split('\t');
		}

		let value = '';
		for(let i=0;i<tmp.length;i++)
		{
				console.log(result[i]);
				value += '[${i}] ${tmp[i]}';
		}
		document.getElementById('output-tsv').textContent = value;
		alert(result[1][2]); // 300yen
	}
}