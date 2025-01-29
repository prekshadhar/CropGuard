import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/predict', (req, res) => {
  const { soilMoisture, soilTemperature, soilPH, nitrogenLevel, phosphorusLevel, potassiumLevel, ambientTemperature, humidity, lightIntensity, chlorophyllContent, electrochemicalSignal } = req.body;

  const pythonProcess = spawn('python', [
    join(__dirname, 'predict.py'),
    soilMoisture, soilTemperature, soilPH, nitrogenLevel, phosphorusLevel, potassiumLevel, 
    ambientTemperature, humidity, lightIntensity, chlorophyllContent, electrochemicalSignal
  ]);

  pythonProcess.stdout.on('data', (data) => {
    const prediction = data.toString().trim();
    res.json({ prediction });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
    res.status(500).json({ error: 'An error occurred while making the prediction' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});