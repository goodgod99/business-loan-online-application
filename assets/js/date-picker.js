document.addEventListener('DOMContentLoaded', function () {
    // 生成年份選項 (民國50-60年)
    const yearSelect = document.getElementById('birthYear');
    yearSelect.innerHTML = '<option value="" disabled selected></option>';

    for (let year = 60; year >= 50; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // 生成月份選項 (1-12月)
    const monthSelect = document.getElementById('birthMonth');
    monthSelect.innerHTML = '<option value="" disabled selected></option>';
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month.toString().padStart(2, '0');
        option.textContent = month;
        monthSelect.appendChild(option);
    }

    // 生成日期選項 (1-31日)
    const daySelect = document.getElementById('birthDay');
    daySelect.innerHTML = '<option value="" disabled selected></option>';
    for (let day = 1; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day.toString().padStart(2, '0');
        option.textContent = day;
        daySelect.appendChild(option);
    }

    // 根據選擇的年月更新日期選項
    function updateDays() {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);

        if (year && month) {
            // 民國年轉換為西元年
            const westernYear = year + 1911;
            const daysInMonth = new Date(westernYear, month, 0).getDate();

            // 清空現有日期選項
            daySelect.innerHTML = '<option value="" disabled selected></option>';

            // 重新生成正確的日期選項
            for (let day = 1; day <= daysInMonth; day++) {
                const option = document.createElement('option');
                option.value = day.toString().padStart(2, '0');
                option.textContent = day;
                daySelect.appendChild(option);
            }
        }
    }

    // 當年份或月份改變時，更新日期選項
    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);
});