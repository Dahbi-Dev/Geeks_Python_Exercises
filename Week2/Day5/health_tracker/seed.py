from faker import Faker
import random
from db import create_user
from models import calculate_bmi, get_body_type, get_advice

fake = Faker()

for _ in range(10):
    height = random.randint(150, 190)
    weight = random.randint(50, 100)
    age = random.randint(18, 60)
    bmi = calculate_bmi(height, weight)
    body_type = get_body_type(bmi)
    advice = get_advice(body_type)

    create_user(height, weight, age, bmi, body_type, advice)

print("10 fake users inserted.")
