var data = {
  message: 'こんにちは',
  name: 'よしぴー'
}

var vm = new Vue({
  el : '#app',
  data: data // = {message: 'こんにちは', name: 'よしぴー'
})

console.log(data === vm.$data)