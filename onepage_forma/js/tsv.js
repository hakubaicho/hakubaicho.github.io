{
	function getCSV() {
		const filepath = "../data/items.txt";
		let req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
		req.addEventListener('load', (event) => { // ロードさせ実行
			const response = event.target.responseText; // 受け取ったテキストを返す
			document.getElementById('output-tsv').textContent = response; // 表示
		});
		req.open("get", filepath, true); // アクセスするファイルを指定
		req.send(); // HTTPリクエストの発行
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