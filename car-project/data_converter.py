import pandas as pd
import json
import os

# .csv file location
INPUT_CSV_FILE = 'data_raw/toyota.csv' 

# .json output to then use as my database
OUTPUT_JSON_FILE = 'src/constants/carDatabase.json' 

def convert_csv_to_json(csv_path, json_path):
    
    if not os.path.exists(csv_path):
        print(f"Error: CSV file not found at {csv_path}")
        return

    try:
        # Load the data using Pandas
        df = pd.read_csv(csv_path)
        
        df.columns = df.columns.str.strip()

        # Price and Mileage are int
        df['price'] = pd.to_numeric(df['price'], errors='coerce', downcast='integer')
        df['mileage'] = pd.to_numeric(df['mileage'], errors='coerce', downcast='integer')

        # Convert the DataFrame to a JSON string
        # 'records' orientation outputs a list of JSON objects (e.g., [{}, {}, ...])
        json_data = df.to_json(
            orient='records', 
            indent=4,
            double_precision=1
            ) 
        
        # Save the JSON string to the target file
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
        with open(json_path, 'w') as f:
            f.write(json_data)
        
        print(f"✅ Success! Data converted and saved to {json_path}")
        print(f"   Total records exported: {len(df)}")
        
    except Exception as e:
        print(f"An error occurred: {e}")

# Run the script
convert_csv_to_json(INPUT_CSV_FILE, OUTPUT_JSON_FILE)