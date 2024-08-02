document.getElementById('domainForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const domain = document.getElementById('domainInput').value; 
    const url = `https://pointsdb-bulk-domain-check-v1.p.rapidapi.com/domain_check?domains=${encodeURIComponent(domain)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '975e540268mshf96eb4500d2f267p1568dfjsn4727a7022c0a',
            'x-rapidapi-host': 'pointsdb-bulk-domain-check-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); 
        console.log(result); 

        
        document.getElementById('result').textContent = JSON.stringify(result, null, 2);

        
        if (result.hasOwnProperty(domain)) {
            const availability = result[domain] ? 'kullanılabilir' : 'kullanılamaz';
            document.getElementById('result').textContent = `${domain} ${availability}.`;
        } else {
            document.getElementById('result').textContent = 'Beklenmeyen API yanıtı.';
        }
    } catch (error) {
        console.error('Hata:', error);
        document.getElementById('result').textContent = `Bir hata oluştu: ${error.message}`;
    }
});
