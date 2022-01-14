Vue.component('product-list',
  {
    template: `
    <div class="container">
      <product-header
        v-bind:count="filteredList.length"
        v-bind:showSaleItem="showSaleItem"
        v-bind:showDelvFree="showDelvFree"
        v-bind:sortOrder="sortOrder"
        v-bind:isError="isError"
        v-bind:message="message"

        v-on:showSaleItemChanged="showSaleItemChanged"
        v-on:showDelvFreeChanged="showDelvFreeChanged"
        v-on:sortOrderChanged="sortOrderChanged"
      >
      </product-header>
      
      <div class="list">
        <product 
          v-for="product in filteredList"
          v-bind:product="product"
          v-bind:key="product.id"
        >
        </product>
      </div>
    </div>
    `,

    components: {
      'product-header': productHeader,
      'product': product
    },

    props: ['products','isError','message'],

    data: function () {
      return {
        // セール対象を表示(true:チェックあり / false:チェックなし)
        showSaleItem: false,
        // 送料無料を表示(true:チェックあり / false:チェックなし)
        showDelvFree: false,
        // 並び替え(1:標準/2:安い順/3:高い順)
        sortOrder: 1,
      };
    },


    methods: {
      showSaleItemChanged: function () {
        console.log("showSaleItemChanged");
        this.showSaleItem = !this.showSaleItem;
      },
      showDelvFreeChanged: function () {
        console.log("showDelvFreeChanged");
        this.showDelvFree = !this.showDelvFree;
      },
      sortOrderChanged: function (order) {
        this.sortOrder = order;
      }
    },

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
    }
  }

);