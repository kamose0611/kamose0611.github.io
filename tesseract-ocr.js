const resultElement = document.getElementById('result');
Tesseract.recognize(
    image,
    'eng', // 使用する言語を指定
    {
        logger: info => {
            console.log(info);
        },
    }
).then(({ data: { text } }) => {
    resultElement.textContent = text;
});
