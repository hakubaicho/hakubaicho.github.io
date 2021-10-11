
/**
 * 定数定義
 * 送受信先
 */
const endpoint = "https://script.google.com/macros/s/AKfycbxxCMfBibzO5IYg5ieiNRGA98CGyZRsYQZL82Ah9VSX3IyHUQC6gIOp0bsSNUDZsPE9WQ/exec"
function setFactoryData(param_factoryCode) {
  document.getElementById('status-of-result').textContent = "更新中";
  console.log("setFactoryData()");
  // ログイン情報
  inputusername = document.getElementById('username').value;
  inputpassword = document.getElementById('password').value;
  //------------------------------------
  // 工場名称を取得します。
  //------------------------------------
  let strTextboxID;
  switch (param_factoryCode) {
    case 1: strTextboxID = "factoryName-01"; break;
    case 2: strTextboxID = "factoryName-02"; break;
    case 3: strTextboxID = "factoryName-03"; break;
    case 4: strTextboxID = "factoryName-04"; break;
    case 5: strTextboxID = "factoryName-05"; break;
    case 6: strTextboxID = "factoryName-06"; break;
    case 7: strTextboxID = "factoryName-07"; break;
    case 8: strTextboxID = "factoryName-08"; break;
    case 9: strTextboxID = "factoryName-09"; break;
    case 10: strTextboxID = "factoryName-10"; break;
  }
  console.log(document.getElementById(strTextboxID).value);
  let paramfactoryName = document.getElementById(strTextboxID).value;
  //------------------------------------
  // 開始日付を設定します。
  //------------------------------------
  let strDateID;
  switch (param_factoryCode) {
    case 1: strDateID = "factoryDate-01"; break;
    case 2: strDateID = "factoryDate-02"; break;
    case 3: strDateID = "factoryDate-03"; break;
    case 4: strDateID = "factoryDate-04"; break;
    case 5: strDateID = "factoryDate-05"; break;
    case 6: strDateID = "factoryDate-06"; break;
    case 7: strDateID = "factoryDate-07"; break;
    case 8: strDateID = "factoryDate-08"; break;
    case 9: strDateID = "factoryDate-09"; break;
    case 10: strDateID = "factoryDate-10"; break;
  }
  let paramFactoryDate = document.getElementById(strDateID).value;
  let inputDate = "";
  try {
    // invalid dateを判定
    const isDate = v => !isNaN(new Date(v).getTime());
    if (isDate(paramFactoryDate)) {
      inputDate = new Date(paramFactoryDate);
    }
  }
  catch (exception) {
    console.log(exception.message);
  }
  if (inputDate.length !== 0) {
    console.log(inputDate.getFullYear());
    console.log(inputDate.getMonth());
    console.log(inputDate.getDay());
    console.log(document.getElementById(strDateID).value);
  }

  $.ajax({
    type: 'GET',
    url: endpoint,
    dataType: 'jsonp',
    data: {
      kind: "set",
      username: inputusername,
      password: inputpassword,
      factoryCode: param_factoryCode,
      factoryName: paramfactoryName,
      factoryDate: inputDate
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
 * データを取得します
 * @param {string}} paramKind 実行する種別
 */
function getFactoryData(paramKind) {
  document.getElementById('status-of-result').textContent = "取得中";
  console.log("getFactoryData()");
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

        for (let i = 0; i < 10; i++) {
          //------------------------------------
          // 工場名称を取得します。
          //------------------------------------
          let strTextboxID;
          switch (i + 1) {
            case 1: strTextboxID = "factoryName-01"; break;
            case 2: strTextboxID = "factoryName-02"; break;
            case 3: strTextboxID = "factoryName-03"; break;
            case 4: strTextboxID = "factoryName-04"; break;
            case 5: strTextboxID = "factoryName-05"; break;
            case 6: strTextboxID = "factoryName-06"; break;
            case 7: strTextboxID = "factoryName-07"; break;
            case 8: strTextboxID = "factoryName-08"; break;
            case 9: strTextboxID = "factoryName-09"; break;
            case 10: strTextboxID = "factoryName-10"; break;
          }
          //------------------------------------
          // 開始日付を設定します。
          //------------------------------------
          let strDateID;
          switch (i + 1) {
            case 1: strDateID = "factoryDate-01"; break;
            case 2: strDateID = "factoryDate-02"; break;
            case 3: strDateID = "factoryDate-03"; break;
            case 4: strDateID = "factoryDate-04"; break;
            case 5: strDateID = "factoryDate-05"; break;
            case 6: strDateID = "factoryDate-06"; break;
            case 7: strDateID = "factoryDate-07"; break;
            case 8: strDateID = "factoryDate-08"; break;
            case 9: strDateID = "factoryDate-09"; break;
            case 10: strDateID = "factoryDate-10"; break;
          }
          //------------------------------------
          // 経過日数を設定します。
          //------------------------------------
          let strCountID;
          switch (i + 1) {
            case 1: strCountID = "factoryCount-01"; break;
            case 2: strCountID = "factoryCount-02"; break;
            case 3: strCountID = "factoryCount-03"; break;
            case 4: strCountID = "factoryCount-04"; break;
            case 5: strCountID = "factoryCount-05"; break;
            case 6: strCountID = "factoryCount-06"; break;
            case 7: strCountID = "factoryCount-07"; break;
            case 8: strCountID = "factoryCount-08"; break;
            case 9: strCountID = "factoryCount-09"; break;
            case 10: strCountID = "factoryCount-10"; break;
          }
          let textBoxfactoryName = document.getElementById(strTextboxID);
          let dateFactoryDate = document.getElementById(strDateID);
          let pFactoryCount = document.getElementById(strCountID);
          for (let j = 0; j < out.factoryData.length; j++) {
            if (String(i + 1) === String(out.factoryData[j].factoryCode)) {
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

      document.getElementById('status-of-result').textContent = `${out.message}`;
    }
  });
}
function getFactoryDataForSingle(factoryCode) {
  document.getElementById('status-of-result').textContent = "取得中";
  console.log("getFactoryDataForSingle(factoryCode)");
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

      document.getElementById('status-of-result').textContent = `${out.message}`;
    }
  });
}
