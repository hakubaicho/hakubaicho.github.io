/**
 * 定数定義
 */
// 表示データの配列最大数
const CONTROL_MAX = 11;
// 表示データのID配列
// コントロールの上から順に書いてください
const FACTORY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 99];
// APIアドレス
const endpoint = "https://script.google.com/macros/s/AKfycbxxCMfBibzO5IYg5ieiNRGA98CGyZRsYQZL82Ah9VSX3IyHUQC6gIOp0bsSNUDZsPE9WQ/exec"


//========================================
// FLEXSET
//========================================
/**
 * コントロールの初期化処理
 */
 function createTableElement_ForSet() {
  // テーブル配置の位置
  const div = document.getElementById('table-area');

  // テーブルの作成
  let table = document.createElement("table");

  //--------------------------------------------
  // テーブルヘッダ
  //--------------------------------------------
  let table_head = document.createElement("thead");
  let table_head_row = document.createElement("tr");
  let columns = ["工場名", "開始日", "経過日数", "サイン", "登録"];
  for (let i = 0; i < columns.length; i++) {
    let table_head_row_th = document.createElement("th");
    table_head_row_th.textContent = columns[i];
    table_head_row.appendChild(table_head_row_th);
  }
  table_head.appendChild(table_head_row);
  table.appendChild(table_head);
  div.appendChild(table);
  //--------------------------------------------
  // データ部
  //--------------------------------------------
  let table_body = document.createElement("tbody");
  for (let i = 0; i < CONTROL_MAX; i++) {
    let table_data_row = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      let input;
      let table_data_row_td = document.createElement("td");
      switch (j) {
        case 0:
          // 工場名
          input = document.createElement("input");
          input.id = `name-${i}`;
          input.type = "text";
          table_data_row_td.appendChild(input);
          break;

        case 1:
          // 開始日付
          input = document.createElement("input");
          input.id = `date-${i}`;
          input.type = "date";
          table_data_row_td.appendChild(input);
          break;
        case 2:
          // 経過日数
          table_data_row_td.id = `count-${i}`;
          break;
        case 3:
          // 単体表示URL
          let a = document.createElement("a");
          a.href = "FlexDisp.html" + "?id=" + String(FACTORY_IDS[i]);
          a.text = "URL";
          table_data_row_td.appendChild(a);
          break;
        case 4:
          // 登録ボタン
          let button = document.createElement("button");
          button.textContent = "登録";
          button.type = "button";
          button.onclick = function () {
            setData_ForSet(FACTORY_IDS[i], i);
          };
          table_data_row_td.appendChild(button);
          break;
      }
      table_data_row.appendChild(table_data_row_td);
    }
    table_body.appendChild(table_data_row);
  }
  table.appendChild(table_body);

}

/**
 * データを設定します。
 * @param {Number} id 工場ID
 * @param {Number} ctrlIndex コントロールのID
 */
function setData_ForSet(id, ctrlIndex) {
  document.getElementById('status-of-result').textContent = "更新中";
  console.log("setFactoryData()");
  // ログイン情報
  inputusername = document.getElementById('username').value;
  inputpassword = document.getElementById('password').value;


  let name = document.getElementById(`name-${ctrlIndex}`).value;// 名称
  let date = document.getElementById(`date-${ctrlIndex}`).value;// 日付
  let inputDate = "";
  try {
    // invalid dateを判定
    const isDate = v => !isNaN(new Date(v).getTime());
    if (isDate(date)) {
      inputDate = new Date(date);
    }
  }
  catch (exception) {
    console.log(exception.message);
  }
  // if (inputDate.length !== 0) {
  //   console.log(inputDate.getFullYear());
  //   console.log(inputDate.getMonth());
  //   console.log(inputDate.getDay());
  //   console.log(document.getElementById(`date-${ctrlIndex+1}`).value);
  // }

  $.ajax({
    type: 'GET',
    url: endpoint,
    dataType: 'jsonp',
    data: {
      kind: "set",
      username: inputusername,
      password: inputpassword,
      factoryCode: id,
      factoryName: name,
      factoryDate: date
    },
    success: out => {
      // データ取得の結果
      let todayDate = new Date();
      let strDate = "";
      strDate += `${todayDate.getFullYear()}/${todayDate.getMonth() + 1}/${todayDate.getDay()}`;
      strDate += " ";
      strDate += `${todayDate.getHours()}:${todayDate.getMinutes()}:${todayDate.getMinutes()}`;

      document.getElementById('status-of-result').textContent = `${out.message}`;
    }
  });
}
/**
 * データを取得します。
 * @param {string}} paramKind 実行する種別
 */
function getData_ForSet(paramKind) {
  document.getElementById('status-of-result').textContent = "取得中";
  let result = false;
  // ログイン情報
  inputusername = document.getElementById('username').value;
  inputpassword = document.getElementById('password').value;

  $.ajax({
    type: 'GET',
    url: endpoint,
    dataType: 'jsonp',
    data: {
      kind: paramKind,
      username: inputusername,
      password: inputpassword,
    },
    success: out => {
      result = true;
      if ('factoryData' in out) {
        for (let i = 0; i < CONTROL_MAX; i++) {
          let textBoxfactoryName = document.getElementById(`name-${i}`);  // 工場名称を取得します。
          let dateFactoryDate = document.getElementById(`date-${i}`);     // 開始日付を設定します。
          let pFactoryCount = document.getElementById(`count-${i}`);    // 経過日数を設定します。

          for (let j = 0; j < out.factoryData.length; j++) {
            if (FACTORY_IDS[i] === out.factoryData[j].factoryCode) {
              console.log(out.factoryData[i]);
              // 所在地
              textBoxfactoryName.textContent = out.factoryData[j].factoryName;  // 文字表示
              textBoxfactoryName.value = out.factoryData[j].factoryName;        // テキストボックスの場合
              // 開始日付
              try {
                // invalid dateを判定
                const isDate = v => !isNaN(new Date(v).getTime());
                if (isDate(out.factoryData[j].factoryDate)) {
                  inputDate = new Date(out.factoryData[j].factoryDate);

                  var year = inputDate.getFullYear();
                  var month = inputDate.getMonth() + 1;
                  var day = inputDate.getDate();

                  var toTwoDigits = function (num, digit) {
                    num += ''
                    if (num.length < digit) {
                      num = '0' + num
                    }
                    return num
                  };

                  var yyyy = toTwoDigits(year, 4);
                  var mm = toTwoDigits(month, 2);
                  var dd = toTwoDigits(day, 2);
                  var ymd = yyyy + "-" + mm + "-" + dd;
                  dateFactoryDate.textContent = ymd;  // テキスト表示
                  dateFactoryDate.value = ymd;        // 入力コントロール
                }
              }
              catch (exception) {
                console.log(exception.message);
              }
              // 経過日数
              pFactoryCount.textContent = out.factoryData[j].pastDay + "日";
            }
          }
        }
      }
      // データ取得の結果
      let todayDate = new Date();
      let strDate = "";
      strDate += `${todayDate.getFullYear()}/${todayDate.getMonth() + 1}/${todayDate.getDay()}`;
      strDate += " ";
      strDate += `${todayDate.getHours()}:${todayDate.getMinutes()}:${todayDate.getMinutes()}`;

      document.getElementById('status-of-result').textContent = `${out.message} ${strDate}`;
    }
  });
}
//========================================
// FLEXGET
//========================================
/**
 * コントロールの初期化処理
 */
 function createTableElement_ForGet() {
  // テーブル配置の位置
  const div = document.getElementById('table-area');

  // テーブルの作成
  let table = document.createElement("table");

  //--------------------------------------------
  // テーブルヘッダ
  //--------------------------------------------
  let table_head = document.createElement("thead");
  let table_head_row = document.createElement("tr");
  let columns = ["工場名", "開始日", "経過日数"];
  for (let i = 0; i < columns.length; i++) {
    let table_head_row_th = document.createElement("th");
    table_head_row_th.textContent = columns[i];
    table_head_row.appendChild(table_head_row_th);
  }
  table_head.appendChild(table_head_row);
  table.appendChild(table_head);
  div.appendChild(table);
  //--------------------------------------------
  // データ部
  //--------------------------------------------
  let table_body = document.createElement("tbody");
  for (let i = 0; i < CONTROL_MAX; i++) {
    let table_data_row = document.createElement("tr");
    let columns = [
      `name-${i}`,
      `date-${i}`,
      `count-${i}`
    ];
    for (let i = 0; i < columns.length; i++) {
      let table_data_row_td = document.createElement("td");
      table_data_row_td.id = columns[i];
      table_data_row.appendChild(table_data_row_td);
    }
    table_body.appendChild(table_data_row);
  }
  table.appendChild(table_body);

}

/**
 * データを取得します
 * @param {string}} paramKind 実行する種別
 */
function getData_ForGet(paramKind) {
  document.getElementById('status-of-result').textContent = "取得中";
  console.log("getData()");
  let result = false;
  // ログイン情報
  inputusername = document.getElementById('username').value;
  inputpassword = document.getElementById('password').value;

  // データ取得処理
  $.ajax({
    type: 'GET',
    url: endpoint,
    dataType: 'jsonp',
    data: {
      kind: paramKind,
      username: inputusername,
      password: inputpassword,
    },
    success: out => {
      result = true;
      if ('factoryData' in out) {

        for (let i = 0; i < CONTROL_MAX; i++) {
          let strTextboxID = `name-${i}`;     // 工場名称を取得します。
          let strDateID = `date-${i}`;        // 開始日付を設定します。
          let strCountID = `count-${i}`;      // 経過日数を設定します。
          let textBoxfactoryName = document.getElementById(strTextboxID);
          let dateFactoryDate = document.getElementById(strDateID);
          let pFactoryCount = document.getElementById(strCountID);

          let isHitRow = false;
          for (let j = 0; j < out.factoryData.length; j++) {
            console.log(FACTORY_IDS[i] + " " + out.factoryData[j].factoryCode);
            if (FACTORY_IDS[i] === out.factoryData[j].factoryCode) {
              isHitRow = true;
              console.log(out[i]);
              // 所在地
              textBoxfactoryName.textContent = out.factoryData[j].factoryName;  // 文字表示
              textBoxfactoryName.value = out.factoryData[j].factoryName;        // テキストボックスの場合
              // 開始日付
              try {
                // invalid dateを判定
                const isDate = v => !isNaN(new Date(v).getTime());
                if (isDate(out.factoryData[j].factoryDate)) {
                  inputDate = new Date(out.factoryData[j].factoryDate);

                  var year = inputDate.getFullYear();
                  var month = inputDate.getMonth() + 1;
                  var day = inputDate.getDate();

                  var toTwoDigits = function (num, digit) {
                    num += ''
                    if (num.length < digit) {
                      num = '0' + num
                    }
                    return num
                  };

                  var yyyy = toTwoDigits(year, 4);
                  var mm = toTwoDigits(month, 2);
                  var dd = toTwoDigits(day, 2);
                  var ymd = yyyy + "-" + mm + "-" + dd;
                  dateFactoryDate.textContent = ymd;  // テキスト表示
                  dateFactoryDate.value = ymd;        // 入力コントロール
                }
              }
              catch (exception) {
                console.log(exception.message);
              }
              // 経過日数
              pFactoryCount.textContent = out.factoryData[j].pastDay + "日";
            }
          }
        }
      }
      // データ取得の結果
      let todayDate = new Date();
      let strDate = "";
      strDate += `${todayDate.getFullYear()}/${todayDate.getMonth() + 1}/${todayDate.getDay()}`;
      strDate += " ";
      strDate += `${todayDate.getHours()}:${todayDate.getMinutes()}:${todayDate.getMinutes()}`;

      document.getElementById('status-of-result').textContent = `${out.message} ${strDate}`;
    }
  });
}
//========================================
// FLEXDISP
//========================================
/**
 * 特定IDのデータを取得します
 * @param {Number} factoryCode 工場ID
 */
 function dispData(factoryCode) {
  document.getElementById('status-of-result').textContent = "取得中";
  let result = false;
  $.ajax({
    type: 'GET',
    url: endpoint,
    dataType: 'jsonp',
    data: {
      kind: "singlesign",
      factoryCode: factoryCode
    },
    success: out => {
      result = true;
      if ('factoryData' in out) {
        // 代入先
        let factoryName = document.getElementById("factoryName");
        let factoryDate = document.getElementById("factoryDate");
        let factoryCount = document.getElementById("factoryCount");
        if (String(factoryCode) === String(out.factoryData.factoryCode)) {
          console.log(out);
          // 所在地
          factoryName.value = out.factoryData.factoryName;
          factoryName.textContent = out.factoryData.factoryName;
          // 開始日付
          try {
            // invalid dateを判定
            const isDate = v => !isNaN(new Date(v).getTime());
            if (isDate(out.factoryData.factoryDate)) {
              inputDate = new Date(out.factoryData.factoryDate);

              var year = inputDate.getFullYear();
              var month = inputDate.getMonth() + 1;
              var day = inputDate.getDate();

              var toTwoDigits = function (num, digit) {
                num += '';
                if (num.length < digit) {
                  num = '0' + num;
                }
                return num;
              };

              var yyyy = toTwoDigits(year, 4);
              var mm = toTwoDigits(month, 2);
              var dd = toTwoDigits(day, 2);
              var ymd = yyyy + "-" + mm + "-" + dd;
              factoryDate.value = ymd;
              factoryDate.textContent = ymd;
            }
          }
          catch (exception) {
            console.log(exception.message);
          }
          // 経過日数
          factoryCount.textContent = out.factoryData.pastDay + "日";
        }
      }
      // データ取得の結果
      let todayDate = new Date();
      let strDate = "";
      strDate += `${todayDate.getFullYear()}/${todayDate.getMonth() + 1}/${todayDate.getDay()}`;
      strDate += " ";
      strDate += `${todayDate.getHours()}:${todayDate.getMinutes()}:${todayDate.getMinutes()}`;

      document.getElementById('status-of-result').textContent = `${out.message} ${strDate}`;
    }
  });
}