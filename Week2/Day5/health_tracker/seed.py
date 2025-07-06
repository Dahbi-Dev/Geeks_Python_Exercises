from faker import Faker
import random
from db import create_user, init_database
from models import calculate_bmi, get_body_type, get_advice

def generate_seed_data(num_users=20):
    """Generate seed data for testing."""
    fake = Faker()
    
    # Initialize database first
    try:
        init_database()
        print("Database initialized successfully!")
    except Exception as e:
        print(f"Database initialization error: {e}")
        return
    
    print(f"Generating {num_users} fake users...")
    
    for i in range(num_users):
        try:
            # Generate realistic data
            name = fake.name()
            height = random.randint(150, 195)  # cm
            weight = random.randint(45, 120)   # kg
            age = random.randint(18, 65)       # years
            
            # Calculate BMI and related fields
            bmi = calculate_bmi(height, weight)
            body_type = get_body_type(bmi)
            advice = get_advice(body_type)
            
            # Create user
            create_user(name, height, weight, age, bmi, body_type, advice)
            
            if (i + 1) % 5 == 0:
                print(f"Created {i + 1}/{num_users} users...")
                
        except Exception as e:
            print(f"Error creating user {i + 1}: {e}")
            continue
    
    print(f"Successfully generated {num_users} fake users!")
    print("Sample data:")
    print(f"  Heights: 150-195 cm")
    print(f"  Weights: 45-120 kg")
    print(f"  Ages: 18-65 years")

def generate_specific_bmi_distribution():
    """Generate users with specific BMI distribution for testing."""
    fake = Faker()
    
    # Define target BMI ranges and counts
    bmi_targets = [
        (16, 18.5, 3),    # Underweight
        (18.5, 24.9, 10), # Normal
        (25, 29.9, 5),    # Overweight
        (30, 35, 2)       # Obese
    ]
    
    print("Generating users with specific BMI distribution...")
    
    for min_bmi, max_bmi, count in bmi_targets:
        for _ in range(count):
            try:
                name = fake.name()
                age = random.randint(18, 65)
                
                # Generate height first
                height = random.randint(160, 185)  # cm
                
                # Calculate weight to achieve target BMI
                target_bmi = random.uniform(min_bmi, max_bmi)
                height_m = height / 100
                weight = target_bmi * (height_m ** 2)
                weight = round(weight, 1)
                
                # Ensure weight is realistic
                weight = max(40, min(150, weight))
                
                # Recalculate actual BMI
                bmi = calculate_bmi(height, weight)
                body_type = get_body_type(bmi)
                advice = get_advice(body_type)
                
                create_user(name, height, weight, age, bmi, body_type, advice)
                
            except Exception as e:
                print(f"Error creating user with BMI {min_bmi}-{max_bmi}: {e}")
                continue
    
    print("BMI distribution users created successfully!")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        try:
            num_users = int(sys.argv[1])
            generate_seed_data(num_users)
        except ValueError:
            print("Invalid number of users. Using default (20).")
            generate_seed_data()
    else:
        print("Generating default seed data...")
        generate_seed_data()
        
        print("\nGenerating BMI distribution data...")
        generate_specific_bmi_distribution()
        
        print("\nSeed data generation complete!")
        print("You can now start the Flask app and test the visualizations.")