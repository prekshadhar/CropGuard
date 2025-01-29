import sys
import joblib
import numpy as np
from pathlib import Path

# Get the directory containing the script
script_dir = Path(__file__).parent

# Load the trained model from the models directory
model = joblib.load(script_dir / 'models' / 'stress_prediction_model.joblib')
le = joblib.load(script_dir / 'models' / 'label_encoder.joblib')

# Get input data from command line arguments
input_data = sys.argv[1:]
input_data = [float(x) for x in input_data]

# Make prediction
prediction = model.predict([input_data])[0]

# Convert numerical prediction back to category
health_status = le.inverse_transform([prediction])[0]

print(health_status)

