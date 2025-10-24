const BASE_URL = 'https://games.roblox.com/v1/games?universeIds=';

async function getGameStats(universeId) {
    const url = `${BASE_URL}${universeId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (!data || !data.data || data.data.length === 0) {
            return { visits: 0, playing: 0 };
        }

        const gameData = data.data[0];
        return {
            visits: gameData.visits || 0,
            playing: gameData.playing || 0
        };

    } catch (e) {
        console.error(`Problem with request for universe ${universeId}: ${e.message}`);
        return { visits: 0, playing: 0 };
    }
}

export { getGameStats };