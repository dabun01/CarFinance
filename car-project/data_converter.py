import pandas as pd
import json
import os

# --- Configuration ---
INPUT_CSV_FILE = 'car-project/data_raw/toyota.csv' 
# This is the file name you will import directly into React
OUTPUT_JSON_FILE = 'src/constants/carDatabase.json' 
# ---------------------

def convert_csv_to_json(csv_path, json_path):
    """Loads CSV data and exports it as a JSON array of records."""
    
    if not os.path.exists(csv_path):
        print(f"Error: CSV file not found at {csv_path}")
        return

    try:
        # Load the data using Pandas
        df = pd.read_csv(csv_path)
        
        # --- OPTIONAL: Clean/Simplify Data Here ---
        # If the dataset is too big, you might filter columns you don't need
        # df = df[['model', 'year', 'price', 'mileage', 'fuel_type']]
        # ------------------------------------------

        # Convert the DataFrame to a JSON string
        # 'records' orientation outputs a list of JSON objects (e.g., [{}, {}, ...])
        json_data = df.to_json(orient='records', indent=4) 
        
        # Save the JSON string to the target file
        with open(json_path, 'w') as f:
            f.write(json_data)
        
        print(f"✅ Success! Data converted and saved to {json_path}")
        print(f"   Total records exported: {len(df)}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

# Run the script
convert_csv_to_json(INPUT_CSV_FILE, OUTPUT_JSON_FILE)