document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input[type="file"]');

    inputs.forEach(input => {
        input.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // 1. 設定 Canvas 大小
                    canvas.width = img.width;
                    canvas.height = img.height;

                    // 2. 畫上原圖
                    ctx.drawImage(img, 0, 0);

                    // 3. 設定浮水印樣式
                    // 字體大小設為圖片寬度的 6% (可自行調整)
                    // 確保字體夠大且明顯
                    const fontSize = Math.floor(canvas.width * 0.07);
                    ctx.font = `bold ${fontSize}px Arial`;
                    ctx.fillStyle = "#A5A5A5"; // 白色半透明
                    ctx.textAlign = "center";   // 水平置中
                    ctx.textBaseline = "middle"; // 垂直置中

                    // 4. 繪製單一傾斜浮水印
                    ctx.save(); // 儲存狀態

                    // 移動原點到圖片正中心
                    ctx.translate(canvas.width / 2, canvas.height*3 / 5);

                    // 旋轉 -6 度 (逆時針)
                    ctx.rotate(-6 * Math.PI / 180);

                    // 在原點 (即圖片中心) 畫出文字
                    ctx.fillText("僅供台新銀行辦理業務使用", 0, 0);

                    ctx.restore(); // 恢復狀態

                    // 5. 輸出結果
                    const watermarkedUrl = canvas.toDataURL('image/jpeg', 0.8);
                    input.style.backgroundImage = `url(${watermarkedUrl})`;
                    input.classList.add('has-preview');
                };

                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    });
});
