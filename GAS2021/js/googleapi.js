const endpoint = "https://script.google.com/macros/s/AKfycbzdq61ve4lpZy7cvJd0XZ-JfuRVJuLm0U8PDU8ivX38UQgNamfxwmyCgtxz_Bl9avVN/exec"
function inputToGoogleAPI(factoryCode) {
    document.getElementById('status-of-api').textContent = "データ取得中";
    $.ajax({
        type: 'GET',
        url: endpoint,
        dataType: 'jsonp',
        data: {
            text: 'Hi,There!'
        },
        success: out => {
          let startDate = "";
          let countDays = "";  
          switch(factoryCode)
          {
            case 1:
              startDate = out.startDate_1;
              countDays = out.pastDay_1;
              break;
            case 2:
              startDate = out.startDate_2;
              countDays = out.pastDay_2;
              break;
            case 3:
              startDate = out.startDate_3;
              countDays = out.pastDay_3;
              break;
            case 4:
              startDate = out.startDate_4;
              countDays = out.pastDay_4;
              break;
            case 5:
              startDate = out.startDate_5;
              countDays = out.pastDay_5;
              break;
            case 6:
              startDate = out.startDate_6;
              countDays = out.pastDay_6;
              break;
            case 7:
              startDate = out.startDate_7;
              countDays = out.pastDay_7;
              break;
            case 8:
              startDate = out.startDate_8;
              countDays = out.pastDay_8;
              break;
            case 9:
              startDate = out.startDate_9;
              countDays = out.pastDay_9;
              break;
            case 10:
              startDate = out.startDate_10;
              countDays = out.pastDay_10;
              break;
          }
            document.getElementById('date-start').textContent = startDate;
            document.getElementById('date-count').textContent = countDays + "日";
            // データ取得の結果
            let todayDate = new Date();
            let strDate = "";
            strDate +=`${todayDate.getFullYear()}/${todayDate.getMonth()+1}/${todayDate.getDay()}`;
            strDate +=" ";
            strDate +=`${todayDate.getHours()}:${todayDate.getMinutes()}/${todayDate.getMinutes()}`;
            document.getElementById('status-of-api').textContent = `データ取得完了:${strDate}`;
        }
    });
}