import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from sklearn.preprocessing import LabelEncoder
import joblib
from pathlib import Path

# Get the current directory
current_dir = Path(__file__).parent

# Read the data from local  
data_path = current_dir / 'datasets' / 'plant_health_data_processed.csv'
data = pd.read_csv(str(data_path))

print("Data shape:", data.shape)
print("\nData types:")
print(data.dtypes)
print("\nSample data:")
print(data.head())

# Preprocess the data
le = LabelEncoder()
data['Plant_Health_Status'] = le.fit_transform(data['Plant_Health_Status'])
data['Light_Intensity'] = pd.to_numeric(data['Light_Intensity'], errors='coerce')

# Split the data into features (X) and target (y)
X = data.drop('Plant_Health_Status', axis=1)
y = data['Plant_Health_Status']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the random forest model
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = rf_model.predict(X_test)

# Evaluate the model
print("\nModel Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))

# Save the model and label encoder in the api folder
model_path = current_dir / 'models'
model_path.mkdir(exist_ok=True)  # Create models directory if it doesn't exist

joblib.dump(rf_model, model_path / 'stress_prediction_model.joblib')
joblib.dump(le, model_path / 'label_encoder.joblib')

print("\nModel and Label Encoder saved successfully in the api/models directory.")

# Feature importance
feature_importance = pd.DataFrame({'feature': X.columns, 'importance': rf_model.feature_importances_})
feature_importance = feature_importance.sort_values('importance', ascending=False)
print("\nFeature Importance:")
print(feature_importance)

