import random
import json
from faker import Faker

fake = Faker()

# List of possible values for 'Type'
types = ["NewSubscription", "Renewal", "PolicyChange", "CancelPending"]
comp =['ABC','PQR','XYZ']
# Generate 1000 records
records = []
for _ in range(1000):
    record = {
        "company": random.choice(comp),
        "year": random.randint(2010, 2025),
        "month": fake.month_name(),
        "Type": random.choice(types),
        "Premium": round(random.uniform(0, 2000), 4)
    }
    records.append(record)

# Save the records to a JSON file
with open('data.json', 'w') as file:
    json.dump(records, file, indent=2)

print("Generated 1000 records and saved to 'generated_records.json'")
