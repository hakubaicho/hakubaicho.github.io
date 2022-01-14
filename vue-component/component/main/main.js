const app = new Vue({
  el: "#app",
  data: {
    // 商品リスト
    // id:    Keyとして用意する
    // name:
    // price:
    // image:
    // delvFee:
    // isSale:
    products: [],
    isError: false,
    message: "",
  },

  created: function () {
    //------------------------------------
    // jQueryでJSONを読み込み
    //------------------------------------
    $.ajax({
      url: "data/products.json",
      type: "GET",
      dataType: 'json'
    }).done(function (data, textStatus, jqXHR) {
      console.log("[OK]");
      console.log(this);
      console.log(this.showDelvFree);
      // this.products = data;
      const datas = data;
      for (let i = 0; i < datas.length; i++) {
        this.products.push(datas[i]);
      }
    }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log("[NG]");
        this.isError = true;
        this.message = `読み込み失敗: ${textStatus}`;
      }.bind(this))
      .always(function () {

      });
  }
});