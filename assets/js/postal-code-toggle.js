document.addEventListener("DOMContentLoaded", function () {
    const postalInputs = document.querySelectorAll('.postal-number');

    // 定義控制顯示隱藏的函式
    // input: 輸入框元素
    // isFocused: 是否正在聚焦狀態 (true/false)
    function updateLabelState(input, isFocused) {
        const parent = input.closest('.postal-code-display');
        if (!parent) return;
        const label = parent.querySelector('.postal-label');
        if (!label) return;

        // 隱藏條件：(1) 正在聚焦/輸入中 OR (2) 裡面已經有文字
        if (isFocused || input.value.trim() !== "") {
            label.style.display = 'none';
        } else {
            label.style.display = ''; // 恢復顯示
        }
    }

    postalInputs.forEach(function (input) {
        // 1. 初始化檢查 (頁面載入時若有預設值則隱藏)
        updateLabelState(input, false);

        // 2. 當游標點擊進去 (開始輸入) -> 強制隱藏
        input.addEventListener('focus', function () {
            updateLabelState(this, true);
        });

        // 3. 當游標離開 (結束輸入) -> 檢查是否有值決定是否顯示回來
        input.addEventListener('blur', function () {
            updateLabelState(this, false);
        });

        // 4. 當內容改變 (例如貼上文字) -> 確保狀態正確
        input.addEventListener('input', function () {
            // 這裡視為 true (focused) 比較保險，確保打字時絕對不出現
            updateLabelState(this, true);
        });
    });
});
