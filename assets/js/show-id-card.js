document.addEventListener('DOMContentLoaded', function () {
    // 選取所有的上傳 input
    const inputs = document.querySelectorAll('input[type="file"]');

    inputs.forEach(input => {
        input.addEventListener('change', function (e) {
            const file = e.target.files[0];
            // 找到外層的容器 (用來控制 watermark 和 re_upload 的顯示)
            const uploadBox = input.closest('.upload-box');

            if (file) {
                // ★ 新增檢查邏輯：判斷檔案類型
                const validTypes = ['image/jpeg', 'image/png', 'image/jpg']; // jpg 有時也是 image/jpeg，但有些瀏覽器/OS可能會不同，多寫保險

                if (!validTypes.includes(file.type)) {
                    alert('檔案格式錯誤！請僅上傳 JPG 或 PNG 格式的圖片。');

                    // 清空錯誤的檔案，讓 input 回復未選擇狀態
                    input.value = '';

                    // 確保 UI 狀態復原 (移除預覽圖、移除浮水印顯示class)
                    if (uploadBox) {
                        uploadBox.classList.remove('has-file');
                    }
                    input.style.backgroundImage = '';
                    input.classList.remove('has-preview');
                    input.classList.remove('uploading'); // 確保 loading 狀態也被移除

                    return; // ★ 重要：直接結束函式，不執行後面的 FileReader
                }

                // --- 通過檢查，執行原本的上傳預覽邏輯 ---

                // 有檔案時，對父層加上 class 來顯示浮水印與按鈕
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
            } else {
                // ★ 新增：如果使用者按了取消 (沒有檔案)，要復原狀態
                if (uploadBox) {
                    uploadBox.classList.remove('has-file');
                }
                input.style.backgroundImage = ''; // 清除背景圖
                input.classList.remove('has-preview');
            }
        });
    });
});
