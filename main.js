function visitFormat(num) {
    return Math.round(num / 100000) / 10 + ' Million';
}

async function updateStat(API_URL, element, formatter) {
    try {
        const response = await fetch(API_URL, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const serverData = await response.json(); 
        let formattedValue = serverData.value;

        if (formatter) {
            formattedValue = formatter(serverData.value);
        }

        element.innerHTML = formattedValue;
    } catch (error) {
        console.error('There was an error communicating with the server:', error);
    }
}

function fetchAllStats() {
    updateStat('http://localhost:5500/api/get-total-visits', document.getElementById('visit-display'), visitFormat);
    updateStat('http://localhost:5500/api/get-total-ccu', document.getElementById('ccu-display'));
}

// Fetch stats on initial page load
fetchAllStats();

// Fetch stats every 30 seconds
setInterval(fetchAllStats, 30000);