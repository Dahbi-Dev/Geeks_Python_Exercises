#🌟 Exercise 7 : Temperature Advice

import random

def get_random_temp(season):
    if season == "winter":
        return round(random.uniform(-10, 16), 1)
    elif season == "spring":
        return round(random.uniform(10, 23), 1)
    elif season == "summer":
        return round(random.uniform(24, 40), 1)
    elif season == "autumn":
        return round(random.uniform(10, 24), 1)
    else:
        return round(random.uniform(-10, 40), 1)  # fallback

def main():
    month = int(input("Enter the current month (1-12): "))

    if month in [12, 1, 2]:
        season = "winter"
    elif month in [3, 4, 5]:
        season = "spring"
    elif month in [6, 7, 8]:
        season = "summer"
    elif month in [9, 10, 11]:
        season = "autumn"
    else:
        season = "unknown"

    temp = get_random_temp(season)
    print(f"\nThe temperature right now is {temp} degrees Celsius.")

    # Temperature advice
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp < 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 <= temp < 24:
        print("Nice weather.")
    elif 24 <= temp < 32:
        print("A bit warm, stay hydrated.")
    elif 32 <= temp <= 40:
        print("It’s really hot! Stay cool.")
    else:
        print("Unusual temperature detected.")

# Run the main function
main()
