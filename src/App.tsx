import type React from "react"
import { useState } from "react"
import { AlertTriangle, Leaf } from "lucide-react"
import Logo from './assets/logo.png';

// पेज के प्रकार (Page types)
type Page = "home" | "stress" | "stress-result" | "carbon" | "carbon-result"

// भाषा के प्रकार (Language types)
type Language = "en" | "hi"

//  तनाव डेटा का इंटरफेस(Interface for stress data)
interface StressFormData {
  soilMoisture?: number // मिट्टी की नमी
  soilTemperature?: number // मिट्टी का तापमान
  soilPH?: number // मिट्टी का पीएच
  nitrogenLevel?: number // नाइट्रोजन स्तर
  phosphorusLevel?: number // फास्फोरस स्तर
  potassiumLevel?: number // पोटैशियम स्तर
  ambientTemperature?: number // परिवेश तापमान
  humidity?: number // आर्द्रता
  lightIntensity?: number // प्रकाश की तीव्रता
  chlorophyllContent?: number // क्लोरोफिल सामग्री
  electrochemicalSignal?: number // विद्युत रासायनिक संकेत
}

// कार्बन डेटा का इंटरफेस (Interface for carbon data)
interface CarbonFormData {
  cropType: string // फसल का प्रकार
  fieldSize: number // खेत का आकार
  fertilizer: number // उर्वरक
  pesticide: number // कीटनाशक
  irrigation: number // सिंचाई
  machinery: number // मशीनरी
  transportation: number // परिवहन
}

// मिट्टी के गुण (Soil properties)
const SOIL_PROPERTIES = [
  { name: "soilMoisture", label: "Soil Moisture", unit: "%", min: 0, max: 100 },
  { name: "soilTemperature", label: "Soil Temperature", unit: "°C", min: -10, max: 50 },
  { name: "soilPH", label: "Soil pH", unit: "pH", min: 0, max: 14 },
  { name: "nitrogenLevel", label: "Nitrogen Level", unit: "mg/kg", min: 0, max: 1000 },
  { name: "phosphorusLevel", label: "Phosphorus Level", unit: "mg/kg", min: 0, max: 1000 },
  { name: "potassiumLevel", label: "Potassium Level", unit: "mg/kg", min: 0, max: 1000 },
]

// पर्यावरण की स्थिति (Environmental conditions)
const ENVIRONMENTAL_CONDITIONS = [
  { name: "ambientTemperature", label: "Ambient Temperature", unit: "°C", min: -10, max: 50 },
  { name: "humidity", label: "Humidity", unit: "%", min: 0, max: 100 },
  { name: "lightIntensity", label: "Light Intensity", unit: "lux", min: 0, max: 100000 },
]

// पौधे के स्वास्थ्य संकेतक (Plant health indicators)
const PLANT_INDICATORS = [
  { name: "chlorophyllContent", label: "Chlorophyll Content", unit: "mg/g", min: 0, max: 100 },
  { name: "electrochemicalSignal", label: "Electrochemical Signal", unit: "mV", min: -1000, max: 1000 },
]

// कार्बन फुटप्रिंट के लिए फील्ड्स (Fields for carbon footprint)
const CARBON_FIELDS = [
  { name: "cropType", label: "Crop Type", type: "text" },
  { name: "fieldSize", label: "Field Size", unit: "hectares", type: "number", min: 0 },
  { name: "fertilizer", label: "Fertilizer Usage", unit: "kg/ha", type: "number", min: 0 },
  { name: "pesticide", label: "Pesticide Usage", unit: "L/ha", type: "number", min: 0 },
  { name: "irrigation", label: "Irrigation Water", unit: "m³/ha", type: "number", min: 0 },
  { name: "machinery", label: "Machinery Usage", unit: "hours/ha", type: "number", min: 0 },
  { name: "transportation", label: "Transportation Distance", unit: "km", type: "number", min: 0 },
]

// तनाव स्तर के अनुसार सिफारिशें (Recommendations based on stress level)
const STRESS_RECOMMENDATIONS: Record<string, string[]> = {
  Healthy: [
    "• Maintain optimal irrigation schedule",
    "• Continue current fertilization program",
    "• Monitor soil moisture regularly",
    "• Keep soil pH balanced",
    "• Maintain proper light exposure levels",
  ],
  "Moderate Stress": [
    "• Implement immediate soil moisture management",
    "• Apply balanced NPK fertilizer",
    "• Adjust light exposure/shade management",
    "• Check for pest infestations",
    "• Consider soil pH correction measures",
  ],
  "High Stress": [
    "• Urgent irrigation system adjustment required",
    "• Immediate nutrient supplementation needed",
    "• Implement protective measures",
    "• Conduct thorough pest inspection",
    "• Consult agricultural expert immediately",
    "• Consider crop protection measures",
  ],
}

// भविष्यवाणी परिणाम का इंटरफेस (Interface for prediction result)
interface PredictionResult {
  value: number
  recommendation: string
  stressLevel?: "Healthy" | "Moderate Stress" | "High Stress"
}

function App() {
  // स्टेट वेरिएबल्स (State variables)
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [language, setLanguage] = useState<Language>("en")
  const [stressData, setStressData] = useState<StressFormData>({})
  const [carbonData, setCarbonData] = useState<CarbonFormData>({
    cropType: "",
    fieldSize: undefined as unknown as number,
    fertilizer: undefined as unknown as number,
    pesticide: undefined as unknown as number,
    irrigation: undefined as unknown as number,
    machinery: undefined as unknown as number,
    transportation: undefined as unknown as number,
  })
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)

  // तनाव डेटा इनपुट हैंडलर (Stress data input handler)
  const handleStressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStressData((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : Number(value),
    }))
  }

  // कार्बन डेटा इनपुट हैंडलर (Carbon data input handler)
  const handleCarbonInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCarbonData((prev) => ({
      ...prev,
      [name]: name === "cropType" ? value : value === "" ? undefined : Number(value),
    }))
  }

  // भविष्यवाणी हैंडलर (Prediction handler)
  const handlePredict = (type: "stress" | "carbon") => {
    if (type === "stress") {
      const value = Math.random() * 100 // This will be replaced with actual API call
      let stressLevel: PredictionResult["stressLevel"]

      if (value < 30) {
        stressLevel = "Healthy"
      } else if (value < 70) {
        stressLevel = "Moderate Stress"
      } else {
        stressLevel = "High Stress"
      }

      setPredictionResult({
        value: -1, // This won't be displayed
        recommendation: STRESS_RECOMMENDATIONS[stressLevel].join("\n"),
        stressLevel,
      })
    } else {
      // Carbon footprint calculation (to be implemented)
      const value = Math.random() * 1000
      setPredictionResult({
        value: Number(value.toFixed(2)),
        recommendation: `Consider implementing:
        • Precision agriculture techniques
        • Efficient irrigation systems
        • Reduced tillage practices
        • Organic fertilizers
        • Local sourcing to reduce transportation`,
      })
    }
    setCurrentPage(type === "stress" ? "stress-result" : "carbon-result")
  }

  //(Render prediction result)
  const renderPredictionResult = (type: "stress" | "carbon") => (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 p-8">
      <div className="max-w-4xl mx-auto bg-green-600 bg-opacity-90 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {type === "stress" ? "Crop Health Recommendations" : "Carbon Footprint Recommendations"}
        </h2>

        {predictionResult && (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg">
              <div className="text-center mb-6">
                <p className="text-xl text-white mb-2">{type === "stress" ? "Plant Status" : "Carbon Footprint"}</p>
                <p className="text-4xl font-bold text-white">
                  {type === "stress" ? predictionResult.stressLevel : `${predictionResult.value} kg CO₂e`}
                </p>
              </div>

              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
                <ul className="text-white space-y-2 list-none">
                  {predictionResult.recommendation.split("\n").map((rec, index) => (
                    <li key={index} className="pl-2">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentPage(type === "stress" ? "stress" : "carbon")}
                className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-50"
              >
                Back to Calculator
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  //(Render home page)
  const renderHomePage = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-700 to-green-900 bg-opacity-50">
      <div className="bg-white bg-opacity-20 p-8 rounded-lg backdrop-blur-sm w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          {language === "en" ? "Greetings! Please select" : "नमस्ते! कृपया चुनें"}
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => setCurrentPage("stress")}
            className="w-full py-4 bg-white hover:bg-green-50 text-green-800 font-semibold rounded-lg transition-colors"
          >
            {language === "en" ? "Crop Stress Predictor" : "फसल तनाव भविष्यवाणी"}
          </button>
          <button
            onClick={() => setCurrentPage("carbon")}
            className="w-full py-4 bg-white hover:bg-green-50 text-green-800 font-semibold rounded-lg transition-colors"
          >
            {language === "en" ? "Carbon Footprint" : "कार्बन पदचिह्न"}
          </button>
        </div>
      </div>
    </div>
  )

  //(Render stress predictor page)
  const renderStressPredictor = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 p-8">
      <div className="max-w-4xl mx-auto bg-green-600 bg-opacity-90 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {language === "en" ? "Crop Health Predictor" : "फसल स्वास्थ्य भविष्यवाणी"}
        </h2>

        <div className="space-y-8">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              {language === "en" ? "Soil Properties" : "मिट्टी के गुण"}
            </h3>
            <div className="space-y-4">
              {SOIL_PROPERTIES.map((field) => (
                <div key={field.name}>
                  <label className="block text-white mb-2">
                    {language === "en" ? field.label : `${field.label} (${field.unit})`}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name={field.name}
                      value={stressData[field.name as keyof StressFormData] ?? ""}
                      onChange={handleStressInputChange}
                      min={field.min}
                      max={field.max}
                      step="any"
                      className="w-full p-2 pr-12 rounded bg-white bg-opacity-90"
                      placeholder="--Enter value--"
                    />
                    <span className="absolute right-3 top-2 text-gray-600">{field.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white bg-opacity-20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              {language === "en" ? "Environmental Conditions" : "पर्यावरण की स्थिति"}
            </h3>
            <div className="space-y-4">
              {ENVIRONMENTAL_CONDITIONS.map((field) => (
                <div key={field.name}>
                  <label className="block text-white mb-2">
                    {language === "en" ? field.label : `${field.label} (${field.unit})`}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name={field.name}
                      value={stressData[field.name as keyof StressFormData] ?? ""}
                      onChange={handleStressInputChange}
                      min={field.min}
                      max={field.max}
                      step="any"
                      className="w-full p-2 pr-12 rounded bg-white bg-opacity-90"
                      placeholder="--Enter value--"
                    />
                    <span className="absolute right-3 top-2 text-gray-600">{field.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white bg-opacity-20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              {language === "en" ? "Plant Health Indicators" : "पौधे के स्वास्थ्य संकेतक"}
            </h3>
            <div className="space-y-4">
              {PLANT_INDICATORS.map((field) => (
                <div key={field.name}>
                  <label className="block text-white mb-2">
                    {language === "en" ? field.label : `${field.label} (${field.unit})`}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name={field.name}
                      value={stressData[field.name as keyof StressFormData] ?? ""}
                      onChange={handleStressInputChange}
                      min={field.min}
                      max={field.max}
                      step="any"
                      className="w-full p-2 pr-12 rounded bg-white bg-opacity-90"
                      placeholder="--Enter value--"
                    />
                    <span className="absolute right-3 top-2 text-gray-600">{field.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handlePredict("stress")}
              className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-50"
            >
              {language === "en" ? "Predict" : "भविष्यवाणी करें"}
            </button>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="bg-white bg-opacity-20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-30 flex items-center gap-2">
              <AlertTriangle size={20} />
              {language === "en" ? "Upload file" : "फ़ाइल अपलोड करें"}
            </button>
            <button className="bg-white bg-opacity-20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-30 flex items-center gap-2">
              <Leaf size={20} />
              {language === "en" ? "Connect your IOT Device" : "अपना IOT डिवाइस कनेक्ट करें"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  //(Render carbon calculator page)
  const renderCarbonCalculator = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 p-8">
      <div className="max-w-4xl mx-auto bg-green-600 bg-opacity-90 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {language === "en" ? "Carbon Footprint Calculator" : "कार्बन पदचिह्न कैलकुलेटर"}
        </h2>

        <div className="space-y-6">
          {CARBON_FIELDS.map((field) => (
            <div key={field.name}>
              <label className="block text-white mb-2">
                {language === "en" ? field.label : `${field.label} ${field.unit ? `(${field.unit})` : ""}`}
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  value={carbonData[field.name as keyof CarbonFormData] ?? ""}
                  onChange={handleCarbonInputChange}
                  min={field.min}
                  step="any"
                  className="w-full p-3 rounded bg-white bg-opacity-90"
                  placeholder="--Enter value--"
                />
                {field.unit && <span className="absolute right-3 top-3 text-gray-600">{field.unit}</span>}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePredict("carbon")}
              className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-50"
            >
              {language === "en" ? "Calculate" : "गणना करें"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
            <img src={Logo || "./assets/logo.png"} alt="CropGuard Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold text-green-800">CropGuard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setCurrentPage("home")} className="text-green-800 hover:text-green-600">
                {language === "en" ? "Home" : "होम"}
              </button>
              <a
                href="https://pmkisan.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-800 hover:text-green-600"
              >
                {language === "en" ? "PM Kisan Samman Nidhi" : "पीएम किसान सम्मान निधि"}
              </a>
              <button onClick={() => setCurrentPage("stress")} className="text-green-800 hover:text-green-600">
                {language === "en" ? "Stress Predictor" : "तनाव भविष्यवाणी"}
              </button>
              <button onClick={() => setCurrentPage("carbon")} className="text-green-800 hover:text-green-600">
                {language === "en" ? "Carbon Footprint" : "कार्बन पदचिह्न"}
              </button>
              <select
                className="border border-green-300 rounded px-2 py-1"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {currentPage === "home" && renderHomePage()}
      {currentPage === "stress" && renderStressPredictor()}
      {currentPage === "stress-result" && renderPredictionResult("stress")}
      {currentPage === "carbon" && renderCarbonCalculator()}
      {currentPage === "carbon-result" && renderPredictionResult("carbon")}
    </div>
  )
}

export default App

