def calculate_bmi(height, weight):
    """
    Calculate BMI using the formula: weight (kg) / (height (m))^2
    
    Args:
        height: Height in centimeters
        weight: Weight in kilograms
    
    Returns:
        BMI value rounded to 1 decimal place
    """
    try:
        # Convert height from cm to meters
        height_m = height / 100
        
        # Calculate BMI
        bmi = weight / (height_m ** 2)
        
        # Round to 1 decimal place
        return round(bmi, 1)
        
    except (ZeroDivisionError, TypeError):
        raise ValueError("Invalid height or weight values")

def get_body_type(bmi):
    """
    Determine body type based on BMI value according to WHO standards.
    
    Args:
        bmi: BMI value
    
    Returns:
        Body type string
    """
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 25:
        return "Normal"
    elif 25 <= bmi < 30:
        return "Overweight"
    else:
        return "Obese"

def get_default_advice(body_type):
    """
    Get default advice for a body type (used for new users).
    
    Args:
        body_type: Body type string
    
    Returns:
        Dictionary with food_advice and exercise_advice
    """
    advice_map = {
        'Underweight': {
            'food_advice': 'Eat more calorie-dense foods: nuts, avocados, whole grains, protein shakes, and dairy products. Focus on frequent, nutritious meals.',
            'exercise_advice': 'Focus on strength training to build muscle mass. Include compound exercises like squats, deadlifts, and bench press. Limit excessive cardio.'
        },
        'Normal': {
            'food_advice': 'Maintain a balanced diet with fruits, vegetables, lean proteins, whole grains, and healthy fats. Stay hydrated and eat regular meals.',
            'exercise_advice': 'Maintain current activity with a mix of cardio and strength training. Aim for 150 minutes of moderate exercise weekly.'
        },
        'Overweight': {
            'food_advice': 'Focus on portion control, increase vegetables and fruits, choose lean proteins, and limit processed foods. Consider consulting a nutritionist.',
            'exercise_advice': 'Increase cardio activities like brisk walking, swimming, or cycling. Add strength training 2-3 times per week. Gradually increase intensity.'
        },
        'Obese': {
            'food_advice': 'Consult healthcare professionals for a comprehensive plan. Focus on whole foods, reduce calorie intake, and avoid sugary drinks and processed foods.',
            'exercise_advice': 'Start with low-impact activities like walking or swimming. Gradually increase duration and intensity. Consider working with a fitness professional.'
        }
    }
    
    return advice_map.get(body_type, {
        'food_advice': 'Consult with a healthcare professional for personalized advice.',
        'exercise_advice': 'Consult with a fitness professional for personalized advice.'
    })

def validate_user_input(height, weight, age):
    """
    Validate user input for realistic ranges.
    
    Args:
        height: Height in cm
        weight: Weight in kg
        age: Age in years
    
    Returns:
        Tuple (is_valid, error_message)
    """
    errors = []
    
    # Height validation (realistic range)
    if height < 50 or height > 250:
        errors.append("Height must be between 50-250 cm")
    
    # Weight validation (realistic range)
    if weight < 10 or weight > 300:
        errors.append("Weight must be between 10-300 kg")
    
    # Age validation
    if age < 1 or age > 120:
        errors.append("Age must be between 1-120 years")
    
    # Check for reasonable BMI ranges
    try:
        bmi = calculate_bmi(height, weight)
        if bmi < 10 or bmi > 80:
            errors.append("BMI calculation results in unrealistic value. Please check height and weight.")
    except:
        errors.append("Unable to calculate BMI with provided values")
    
    if errors:
        return False, "; ".join(errors)
    
    return True, ""

def get_bmi_category_info():
    """
    Get information about BMI categories.
    
    Returns:
        Dictionary with BMI category information
    """
    return {
        "Underweight": {
            "range": "< 18.5",
            "health_risk": "Possible nutritional deficiency and osteoporosis",
            "color": "lightblue"
        },
        "Normal": {
            "range": "18.5 - 24.9",
            "health_risk": "Low risk",
            "color": "lightgreen"
        },
        "Overweight": {
            "range": "25.0 - 29.9",
            "health_risk": "Moderate risk of heart disease, diabetes",
            "color": "orange"
        },
        "Obese": {
            "range": "≥ 30.0",
            "health_risk": "High risk of heart disease, diabetes, stroke",
            "color": "lightcoral"
        }
    }

def get_personalized_advice(bmi, age, body_type):
    """
    Get personalized advice based on BMI, age, and body type.
    
    Args:
        bmi: BMI value
        age: Age in years
        body_type: Body type string
    
    Returns:
        Dictionary with personalized advice
    """
    base_advice = get_default_advice(body_type)
    
    # Age-specific modifications
    if age < 18:
        base_advice['food_advice'] += " Remember you're still growing - consult with a pediatrician or nutritionist."
        base_advice['exercise_advice'] += " Focus on fun activities and sports appropriate for your age."
    elif age > 65:
        base_advice['food_advice'] += " Ensure adequate protein and calcium for bone health."
        base_advice['exercise_advice'] += " Include balance and flexibility exercises. Consult your doctor before starting new programs."
    
    # BMI-specific modifications
    if bmi < 16:
        base_advice['food_advice'] = "Severely underweight - please consult healthcare provider immediately. " + base_advice['food_advice']
    elif bmi > 35:
        base_advice['food_advice'] = "Severely obese - please consult healthcare provider for comprehensive treatment plan. " + base_advice['food_advice']
    
    return base_advice

# Test the functions
if __name__ == "__main__":
    # Test BMI calculations
    test_cases = [
        (175, 70, 25),  # Normal BMI
        (160, 50, 30),  # Underweight
        (180, 90, 35),  # Overweight
        (165, 85, 40),  # Obese
    ]
    
    print("Testing BMI calculations:")
    print("-" * 50)
    
    for height, weight, age in test_cases:
        try:
            is_valid, error = validate_user_input(height, weight, age)
            if is_valid:
                bmi = calculate_bmi(height, weight)
                body_type = get_body_type(bmi)
                advice = get_default_advice(body_type)
                
                print(f"Height: {height}cm, Weight: {weight}kg, Age: {age}")
                print(f"BMI: {bmi}")
                print(f"Body Type: {body_type}")
                print(f"Food Advice: {advice['food_advice']}")
                print(f"Exercise Advice: {advice['exercise_advice']}")
                print("-" * 50)
            else:
                print(f"Invalid input: {error}")
                print("-" * 50)
        except Exception as e:
            print(f"Error: {e}")
            print("-" * 50)