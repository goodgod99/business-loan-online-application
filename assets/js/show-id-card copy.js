document.addEventListener('DOMContentLoaded', function() {
    // 選取所有的上傳 input
    const inputs = document.querySelectorAll('input[type="file"]');

    inputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // 1. 將背景圖改為讀取到的圖片
                    input.style.backgroundImage = `url(${e.target.result})`;
                    
                    // 2. 加上 class 以調整 CSS (例如改成 background-size: cover)
                    input.classList.add('has-preview');
                    
                    // (選填) 移除 loading 狀態 (如果你有在做假 loading)
                    input.classList.remove('uploading'); 
                }
                
                // (選填) 加上 loading 效果
                input.classList.add('uploading');
                
                reader.readAsDataURL(file);
            }
        });
    });
});
