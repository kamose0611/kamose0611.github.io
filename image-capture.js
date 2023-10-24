const inputElement = document.createElement('input');
inputElement.type = 'file';
inputElement.accept = 'image/*';
inputElement.capture = 'camera';

// カメラアクセスをリクエスト
inputElement.click();

// ファイル選択時に実行
inputElement.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        // ここに画像からOCRを適用するコードを追加します
    }
});
