/**
 * 数値を3桁区切りにフォーマットするフィルター
 */
Vue.filter('number_format', function (val) {
  return val.toLocaleString();
});