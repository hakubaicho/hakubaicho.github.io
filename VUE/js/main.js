Vue.filter('number_format', function (val) {
  return val.toLocaleString();
});
const app = new Vue({
  el: "#app",
  data: {
    // セール対象を表示(true:チェックあり / false:チェックなし)
    showSaleItem: false,
    // 送料無料を表示(true:チェックあり / false:チェックなし)
    showDelvFree: false,
    // 並び替え(1:標準/2:安い順/3:高い順)
    sortOrder: 1,

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
  },
  // filters:{
  //   number_format: function(val){
  //     return val.toLocaleString();
  //   },
  // },
  computed: {
    filteredList: function () {
      let newList = [];
      //----------------------------
      // 抽出
      //----------------------------
      for (let i = 0; i < this.products.length; i++) {
        let isShow = true;
        // セール商品
        if (this.showSaleItem && !(this.products[i].isSale)) {
          isShow = false;
        }
        // 送料無料
        if (this.showDelvFree && (this.products[i].delvFee > 0)) {
          isShow = false;
        }
        if (isShow) {
          newList.push(this.products[i]);
        }
      }
      //----------------------------
      // 並べ替え
      //----------------------------
      // 配列の並べ替え
      if (2 == this.sortOrder) {
        newList.sort(function (a, b) {
          return a.price - b.price;
        });
      }
      if (3 == this.sortOrder) {
        newList.sort(function (a, b) {
          return b.price - a.price;
        });
      }
      return newList;
    }
  },
  watch: {
    showSaleItem: function (newVal, oldVal) {
      console.log("showSaleItemが呼び出された");
    },
    showDelvFree: function (newVal, oldVal) {
      console.log("showDelvFreeが呼び出された");
    },
    sortOrder: function (newVal, oldVal) {
      console.log("sortOrderが呼び出された");
    },
  },
});