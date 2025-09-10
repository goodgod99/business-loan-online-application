document.addEventListener('DOMContentLoaded', () => {
    const agreementCheckboxes = document.querySelectorAll('input[name="agreements"]');
    const nextButton = document.querySelector('a[name="next-btn"]');

    function checkAgreements() {
        const allChecked = Array.from(agreementCheckboxes).every(checkbox => checkbox.checked);
        if (allChecked) {
            nextButton.classList.remove('disable');
        } else {
            nextButton.classList.add('disable');
        }
    }

    // 頁面載入時先執行一次檢查
    checkAgreements()

    agreementCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', checkAgreements);
    });
});