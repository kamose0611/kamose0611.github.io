var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      isFrontCamera: true, // 初期値は前面カメラ
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('');
      },
      switchCamera: function () {
        this.isFrontCamera = !this.isFrontCamera; // カメラの切り替え
        // ここにカメラ切り替えの処理を追加（例えば、フラッシュの設定など）
        console.log('カメラが切り替えられました。新しいカメラ:', this.isFrontCamera ? '前面' : '背面');
        // ...
      },
    },
  });
  