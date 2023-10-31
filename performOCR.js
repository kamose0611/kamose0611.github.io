// カメラへのアクセス
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    // 画像の取得
    var video = document.getElementById('camera');
    video.srcObject = stream;

    // カメラの映像をCanvasに描画
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    video.addEventListener('loadedmetadata', function () {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });

    // 商品名と数量を表示するフィールド
    var productNameField = document.getElementById('productName');
    var productQuantityField = document.getElementById('productQuantity');

    // OCRの適用
    video.addEventListener('canplay', function () {
      setInterval(function () {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 画像データを取得
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // OCRエンジンに画像データを送信し、テキストを取得
        applyOCR(imageData, productNameField, productQuantityField);
      }, 1000); // 1秒ごとにOCRを適用（適切な間隔を調整する必要があります）
    });
  })
  .catch(function (error) {
    console.error('カメラにアクセスできません: ', error);
  });

// OCRの適用
function applyOCR(imageData, productNameField, productQuantityField) {
  Tesseract.recognize(
    imageData,
    'eng',
    { logger: (info) => console.log(info) }
  ).then(({ data: { text } }) => {
    console.log('OCR テキスト:', text);

    // テキストから商品名と数量を抽出
    const { productName, productQuantity } = extractProductInfo(text);

    // 商品名と数量をフィールドに設定
    productNameField.value = productName || '';
    productQuantityField.value = productQuantity || '';
  });
}

// テキストから商品名と数量を抽出するカスタム関数
function extractProductInfo(text) {
  // テキスト解析ロジックを実装
  // ここでは簡単な例として "商品名: 〇〇\n数量: 1" のパターンを検索
  const namePattern = /商品名: ([^\n\r]+)/;
  const quantityPattern = /数量: (\d+)/;

  const productNameMatches = text.match(namePattern);
  const productQuantityMatches = text.match(quantityPattern);

  const productName = productNameMatches && productNameMatches[1];
  const productQuantity = productQuantityMatches && productQuantityMatches[1];

  return {
    productName,
    productQuantity,
  };
}
