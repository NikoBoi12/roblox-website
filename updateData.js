import { serverData } from "./data.js";
import { getGameStats } from "./getData.js";
import { projectSoulsUniverses } from "./info.js";

const SECONDS = 30;
const MILISECONDS = SECONDS * 1000;

async function updateServerData() {
    let combinedCCU = 0;
    let combinedVisits = 0;
    
    for (const universeId of projectSoulsUniverses) {
        const stats = await getGameStats(universeId);
        combinedCCU += stats.playing;
        combinedVisits += stats.visits;
    }

    serverData.currentCCU = combinedCCU;
    serverData.currentVisits = combinedVisits;

    console.log(`Updated Stats - CCU: ${combinedCCU}, Visits: ${combinedVisits}`);
}

function initUpdateData() {
    updateServerData();
    setInterval(updateServerData, MILISECONDS);
}

export { initUpdateData };