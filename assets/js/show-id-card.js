document.addEventListener('DOMContentLoaded', function () {
    // 選取所有的上傳 input
    const inputs = document.querySelectorAll('input[type="file"]');

    inputs.forEach(input => {
        input.addEventListener('change', function (e) {
            const file = e.target.files[0];
            // 找到外層的容器 (用來控制 watermark 和 re_upload 的顯示)
            const uploadBox = input.closest('.upload-box');

            if (file) {
                // ★ 新增：有檔案時，對父層加上 class 來顯示浮水印與按鈕
                if (uploadBox) {
                    uploadBox.classList.add('has-file');
                }

                const reader = new FileReader();

                reader.onload = function (e) {
                    // 1. 將背景圖改為讀取到的圖片
                    input.style.backgroundImage = `url(${e.target.result})`;

                    // 2. 加上 class 以調整 CSS (例如改成 background-size: cover)
                    input.classList.add('has-preview');

                    // (選填) 移除 loading 狀態
                    input.classList.remove('uploading');
                }

                // (選填) 加上 loading 效果
                input.classList.add('uploading');

                reader.readAsDataURL(file);
            } /* else {
                // ★ 新增：如果使用者按了取消 (沒有檔案)，要復原狀態
                if (uploadBox) {
                    uploadBox.classList.remove('has-file');
                }
                input.style.backgroundImage = ''; // 清除背景圖
                input.classList.remove('has-preview');
            } */
        });
    });
});
