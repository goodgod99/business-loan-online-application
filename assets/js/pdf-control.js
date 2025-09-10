const pdfViewer = document.querySelector('.pdf-viwer');
const agreeBtn = document.getElementById('agreeBtn');
const url = pdfViewer.getAttribute('url');

// 異步載入 PDF
const loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function (pdf) {
    // 遍歷所有頁面並渲染
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(function (page) {
            const scale = 1.5; // 您可以調整此比例以獲得更好的解析度
            const viewport = page.getViewport({ scale: scale });

            // 建立 canvas 元素
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // 將 canvas 加入到容器中
            pdfViewer.appendChild(canvas);

            // 渲染 PDF 頁面到 canvas
            page.render({
                canvasContext: context,
                viewport: viewport
            });
        });
    }
});

// 捲動偵測邏輯
if (pdfViewer && agreeBtn) {
    pdfViewer.addEventListener('scroll', function () {
        // 檢查是否已滾動到底部
        if (pdfViewer.scrollHeight - pdfViewer.scrollTop <= pdfViewer.clientHeight + 1) {
            agreeBtn.classList.remove('disable');
        }
    });
}