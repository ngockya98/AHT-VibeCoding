document.getElementById('crawlForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const url = document.getElementById('url').value;
    const selector = document.getElementById('selector').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Đang crawl dữ liệu...</p>';

    try {
        const response = await fetch('http://localhost:8000/crawl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, selector })
        });
        const data = await response.json();
        if (data.success) {
            let html = '<table><tr><th>Title</th><th>Link</th></tr>';
            data.data.forEach(item => {
                html += `<tr><td>${item.title}</td><td><a href="${item.link}" target="_blank">${item.link}</a></td></tr>`;
            });
            html += '</table>';
            resultDiv.innerHTML = html;
        } else {
            resultDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
        }
    } catch (err) {
        resultDiv.innerHTML = `<p style="color:red;">Không thể kết nối tới backend.</p>`;
    }
});
