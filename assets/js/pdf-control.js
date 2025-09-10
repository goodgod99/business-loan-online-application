// PDF.js 設定
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        let pdfDoc = null;
        let currentPage = 1;
        let totalPages = 0;
        let hasScrolledToEnd = false;

        // 載入 PDF
        async function loadPDF() {
            try {
                const loadingTask = pdfjsLib.getDocument('../assets/pdf/privacy-policy.pdf');
                pdfDoc = await loadingTask.promise;
                totalPages = pdfDoc.numPages;
                
                document.getElementById('total-pages').textContent = totalPages;
                renderPage(currentPage);
                
                // 檢查是否已經看完所有頁面
                checkScrollComplete();
            } catch (error) {
                console.error('載入 PDF 時發生錯誤:', error);
            }
        }

        // 渲染指定頁面
        async function renderPage(pageNum) {
            try {
                const page = await pdfDoc.getPage(pageNum);
                const canvas = document.getElementById('pdf-canvas');
                const ctx = canvas.getContext('2d');
                
                const viewport = page.getViewport({ scale: 1.5 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                
                await page.render(renderContext).promise;
                document.getElementById('current-page').textContent = pageNum;
                
                // 檢查是否已經看完所有頁面
                checkScrollComplete();
            } catch (error) {
                console.error('渲染頁面時發生錯誤:', error);
            }
        }

        // 檢查是否已看完所有頁面
        function checkScrollComplete() {
            if (currentPage === totalPages) {
                hasScrolledToEnd = true;
                const agreeBtn = document.getElementById('agree-btn');
                agreeBtn.style.pointerEvents = 'auto';
                agreeBtn.style.opacity = '1';
            }
        }

        // 頁面控制事件
        document.getElementById('prev-page').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPage(currentPage);
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPage(currentPage);
            }
        });

        // 當模態框打開時載入 PDF
        document.getElementById('agree3').addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('privacyModal').style.display = 'block';
                loadPDF();
            }
        });

        // 關閉模態框
        document.getElementById('modal-close').addEventListener('click', () => {
            document.getElementById('privacyModal').style.display = 'none';
        });