function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.classList.toggle('show-password');
        toggleButton.setAttribute('aria-label', '隱藏密碼');
    } else {
        passwordInput.type = 'password';
        toggleButton.classList.toggle('show-password');
        toggleButton.setAttribute('aria-label', '顯示密碼');
    }

}
