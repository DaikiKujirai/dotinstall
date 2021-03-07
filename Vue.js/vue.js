new Vue({
  el: '#app',
  data: {
    fruits: ['りんご', 'バナナ', 'ぶどう'],
  },
  methods: {
    remove: function() {
      this.fruits.shift()
    }
  }
})