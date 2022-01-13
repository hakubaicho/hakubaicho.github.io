$('#load').on('click', function (event) {
  //------------------------------------
  // JSONを読み込み
  //------------------------------------
  $.ajax({
    url: "data/products.json",
    type: "GET",
    dataType: 'json'
  }).done(function (data, textStatus, jqXHR) {
    console.log("[OK]");
    const products = data;
    const result = document.querySelector("#result");
    result.textContent = '';
    for (let i = 0; i < products.length; i++) {
      let productText = `商品ID:${products[i].id}`;
      productText += `名称:${products[i].name}`;
      productText += `価格:${products[i].price}`;
      productText += `画像:${products[i].image}`;
      productText += `送料:${products[i].delvFee}`;
      productText += `セール中:${products[i].isSale}`;

      const div = document.createElement('div');
      div.textContent = productText;
      result.appendChild(div);
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.log("[NG]");
  }).always(function () {

  });

});