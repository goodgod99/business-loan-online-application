function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.classList.add('show-password');
        toggleButton.setAttribute('aria-label', '隱藏密碼');
    } else {
        passwordInput.type = 'password';
        toggleButton.classList.remove('show-password');
        toggleButton.setAttribute('aria-label', '顯示密碼');
    }
}

// 初始化密碼切換按鈕的可訪問性屬性
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.password-toggle');
    
    toggleButtons.forEach(button => {
        button.setAttribute('aria-label', '顯示密碼');
        button.setAttribute('type', 'button');
        button.innerHTML = '<i class="eye-icon"></i>';
    });
});