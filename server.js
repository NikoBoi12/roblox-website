import express from "express";
import cors from "cors";
import { initUpdateData } from "./updateData.js";
import { serverData } from "./data.js";

initUpdateData();

const PORT = 5500;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/get-total-visits', (req, expressRes) => {
    expressRes.status(200).json({
        message: "Successfully grabbed total visits",
        value: serverData.currentVisits
    });
});

app.get('/api/get-total-ccu', (req, expressRes) => {
    expressRes.status(200).json({
        message: "Successfully grabbed total ccu",
        value: serverData.currentCCU
    });
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});