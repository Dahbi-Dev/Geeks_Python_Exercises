import random
import requests
import psycopg2

# Database configuration
DB_CONFIG = {
    'dbname': 'countries_db',
    'user': 'postgres',
    'password': 'root',
    'host': 'localhost',
    'port': 7070,
}

def fetch_countries():
    """Fetch countries from REST Countries API"""
    url = "https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,population"
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"API Error: {e}")
        return None

def extract_data(country):
    """Extract required fields from country data"""
    name = country.get("name", {}).get("common", "Unknown")
    capital = country.get("capital", ["Unknown"])[0]
    flag = country.get("flags", {}).get("png", "")
    subregion = country.get("subregion", "Unknown")
    population = country.get("population", 0)
    
    return (name, capital, flag, subregion, population)

def save_to_db(countries_data):
    """Save countries to database"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()
        
        # Create table if not exists
        cur.execute("""
            CREATE TABLE IF NOT EXISTS countries (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                capital VARCHAR(255),
                flag TEXT,
                subregion VARCHAR(255),
                population BIGINT
            )
        """)
        
        inserted = 0
        for data in countries_data:
            try:
                cur.execute("""
                    INSERT INTO countries (name, capital, flag, subregion, population) 
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT (name) DO NOTHING
                """, data)
                
                if cur.rowcount > 0:
                    inserted += 1
                    print(f"✅ {data[0]}")
                    
            except Exception as e:
                print(f"❌ Error: {data[0]} - {e}")
        
        conn.commit()
        cur.close()
        conn.close()
        
        print(f"\n📊 Inserted {inserted} countries")
        return inserted
        
    except psycopg2.Error as e:
        print(f"Database Error: {e}")
        return 0

def main():
    """Main function"""
    print("🌍 Fetching countries...")
    
    # Fetch all countries
    countries = fetch_countries()
    if not countries:
        print("❌ Failed to fetch countries")
        return
    
    print(f"✅ Got {len(countries)} countries")
    
    # Pick 10 random countries
    selected = random.sample(countries, min(10, len(countries)))
    print(f"🎲 Selected {len(selected)} random countries")
    
    # Extract data and save
    data = [extract_data(country) for country in selected]
    save_to_db(data)

if __name__ == "__main__":
    main()