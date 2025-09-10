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

            agreementCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', checkAgreements);
            });
        });