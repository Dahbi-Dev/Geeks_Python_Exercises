import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import os
import uuid
import numpy as np
from collections import Counter

def generate_user_graph(users):
    """Generate a graph showing user BMIs."""
    if not users:
        return None
    
    # Extract data
    bmis = [user['bmi'] for user in users]
    names = [user['name'] if user['name'] else f"User {user['id']}" for user in users]
    
    # Limit to last 20 users for readability
    if len(users) > 20:
        bmis = bmis[-20:]
        names = names[-20:]
    
    plt.figure(figsize=(12, 8))
    
    # Create bar chart with colors based on BMI categories
    colors = []
    for bmi in bmis:
        if bmi < 18.5:
            colors.append('lightblue')  # Underweight
        elif 18.5 <= bmi < 24.9:
            colors.append('lightgreen')  # Normal
        elif 25 <= bmi < 29.9:
            colors.append('orange')  # Overweight
        else:
            colors.append('lightcoral')  # Obese
    
    bars = plt.bar(range(len(names)), bmis, color=colors, alpha=0.7, edgecolor='black')
    
    # Add value labels on bars
    for bar, bmi in zip(bars, bmis):
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 0.5,
                f'{bmi:.1f}', ha='center', va='bottom', fontsize=9)
    
    plt.title('User BMI Distribution', fontsize=16, fontweight='bold')
    plt.xlabel('Users', fontsize=12)
    plt.ylabel('BMI', fontsize=12)
    plt.xticks(range(len(names)), names, rotation=45, ha='right')
    
    # Add BMI category lines
    plt.axhline(y=18.5, color='blue', linestyle='--', alpha=0.7, label='Underweight')
    plt.axhline(y=24.9, color='green', linestyle='--', alpha=0.7, label='Normal')
    plt.axhline(y=29.9, color='orange', linestyle='--', alpha=0.7, label='Overweight')
    
    plt.legend()
    plt.grid(axis='y', alpha=0.3)
    
    # Save image to static folder
    filename = f"static/bmi_plot_{uuid.uuid4().hex}.png"
    plt.tight_layout()
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    plt.close()
    
    return filename

def generate_food_graph():
    """Generate a graph showing food recommendations by body type."""
    body_types = ['Underweight', 'Normal', 'Overweight', 'Obese']
    food_recommendations = {
        'Underweight': ['Nuts', 'Avocado', 'Whole Grains', 'Protein Shakes', 'Dairy'],
        'Normal': ['Fruits', 'Vegetables', 'Lean Protein', 'Whole Grains', 'Fish'],
        'Overweight': ['Leafy Greens', 'Lean Protein', 'Berries', 'Whole Grains', 'Low-fat Dairy'],
        'Obese': ['Vegetables', 'Lean Protein', 'Berries', 'Nuts (limited)', 'Water-rich Foods']
    }
    
    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    axes = axes.flatten()
    
    colors = ['lightblue', 'lightgreen', 'orange', 'lightcoral']
    
    for i, (body_type, foods) in enumerate(food_recommendations.items()):
        ax = axes[i]
        y_pos = np.arange(len(foods))
        
        # Create horizontal bar chart
        bars = ax.barh(y_pos, [1] * len(foods), color=colors[i], alpha=0.7)
        
        ax.set_yticks(y_pos)
        ax.set_yticklabels(foods)
        ax.set_xlabel('Recommendation Level')
        ax.set_title(f'{body_type} - Recommended Foods', fontweight='bold')
        ax.set_xlim(0, 1.2)
        
        # Remove x-axis ticks as they're not meaningful
        ax.set_xticks([])
    
    plt.suptitle('Food Recommendations by Body Type', fontsize=16, fontweight='bold')
    plt.tight_layout()
    
    filename = f"static/food_plot_{uuid.uuid4().hex}.png"
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    plt.close()
    
    return filename

def generate_exercise_graph():
    """Generate a graph showing exercise recommendations by body type."""
    body_types = ['Underweight', 'Normal', 'Overweight', 'Obese']
    exercise_data = {
        'Underweight': {'Strength Training': 4, 'Cardio': 2, 'Flexibility': 3, 'Sports': 3},
        'Normal': {'Strength Training': 3, 'Cardio': 3, 'Flexibility': 3, 'Sports': 4},
        'Overweight': {'Strength Training': 3, 'Cardio': 4, 'Flexibility': 2, 'Sports': 2},
        'Obese': {'Strength Training': 2, 'Cardio': 5, 'Flexibility': 2, 'Sports': 1}
    }
    
    exercise_types = list(exercise_data['Normal'].keys())
    
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Set up the bar positions
    x = np.arange(len(exercise_types))
    width = 0.2
    
    colors = ['lightblue', 'lightgreen', 'orange', 'lightcoral']
    
    # Create bars for each body type
    for i, (body_type, data) in enumerate(exercise_data.items()):
        values = [data[exercise] for exercise in exercise_types]
        bars = ax.bar(x + i * width, values, width, label=body_type, 
                     color=colors[i], alpha=0.7, edgecolor='black')
        
        # Add value labels on bars
        for bar, value in zip(bars, values):
            height = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                   f'{value}', ha='center', va='bottom', fontsize=9)
    
    ax.set_xlabel('Exercise Types', fontsize=12)
    ax.set_ylabel('Recommended Frequency (per week)', fontsize=12)
    ax.set_title('Exercise Recommendations by Body Type', fontsize=16, fontweight='bold')
    ax.set_xticks(x + width * 1.5)
    ax.set_xticklabels(exercise_types)
    ax.legend()
    ax.grid(axis='y', alpha=0.3)
    ax.set_ylim(0, 6)
    
    plt.tight_layout()
    
    filename = f"static/exercise_plot_{uuid.uuid4().hex}.png"
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    plt.close()
    
    return filename

def generate_bmi_distribution_pie():
    """Generate a pie chart showing BMI distribution."""
    # This would use actual user data in a real application
    # For now, we'll create a sample distribution
    
    categories = ['Underweight', 'Normal', 'Overweight', 'Obese']
    sizes = [15, 45, 25, 15]  # Sample percentages
    colors = ['lightblue', 'lightgreen', 'orange', 'lightcoral']
    explode = (0.1, 0, 0, 0.1)  # explode underweight and obese
    
    plt.figure(figsize=(10, 8))
    plt.pie(sizes, explode=explode, labels=categories, colors=colors,
            autopct='%1.1f%%', shadow=True, startangle=90)
    plt.title('BMI Distribution', fontsize=16, fontweight='bold')
    plt.axis('equal')
    
    filename = f"static/bmi_distribution_{uuid.uuid4().hex}.png"
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    plt.close()
    
    return filename

def generate_competition_graph(competitions):
    """Generate a graph showing competition statistics."""
    if not competitions:
        return None
    
    # Extract data
    names = [comp['name'][:20] + '...' if len(comp['name']) > 20 else comp['name'] for comp in competitions]
    participant_counts = [comp['participant_count'] for comp in competitions]
    max_participants = [comp['max_participants'] for comp in competitions]
    
    # Limit to last 10 competitions for readability
    if len(competitions) > 10:
        names = names[-10:]
        participant_counts = participant_counts[-10:]
        max_participants = max_participants[-10:]
    
    plt.figure(figsize=(12, 8))
    
    x = np.arange(len(names))
    width = 0.35
    
    # Create bars
    bars1 = plt.bar(x - width/2, participant_counts, width, label='Current Participants', 
                   color='lightblue', alpha=0.7, edgecolor='black')
    bars2 = plt.bar(x + width/2, max_participants, width, label='Max Participants', 
                   color='lightcoral', alpha=0.7, edgecolor='black')
    
    # Add value labels on bars
    for bar, count in zip(bars1, participant_counts):
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 0.5,
                f'{count}', ha='center', va='bottom', fontsize=9)
    
    for bar, count in zip(bars2, max_participants):
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 0.5,
                f'{count}', ha='center', va='bottom', fontsize=9)
    
    plt.title('Competition Participation Statistics', fontsize=16, fontweight='bold')
    plt.xlabel('Competitions', fontsize=12)
    plt.ylabel('Number of Participants', fontsize=12)
    plt.xticks(x, names, rotation=45, ha='right')
    plt.legend()
    plt.grid(axis='y', alpha=0.3)
    
    # Save image to static folder
    filename = f"static/competition_plot_{uuid.uuid4().hex}.png"
    plt.tight_layout()
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    plt.close()
    
    return filename

def generate_age_distribution_graph(users):
    """Generate a histogram showing age distribution of users."""
    if not users:
        return None
    
    ages = [user['age'] for user in users]
    
    plt.figure(figsize=(10, 6))
    
    # Create histogram
    plt.hist(ages, bins=10, color='skyblue', alpha=0.7, edgecolor='black')
    
    plt.title('Age Distribution of Users', fontsize=16, fontweight='bold')
    plt.xlabel('Age', fontsize=12)
    plt.ylabel('Number of Users', fontsize=12)
    plt.grid(axis='y', alpha=0.3)
    
    # Add statistics
    mean_age = np.mean(ages)
    plt.axvline(mean_age, color='red', linestyle='--', 
               label=f'Mean Age: {mean_age:.1f}')
    plt.legend()
    
    filename = f"static/age_distribution_{uuid.uuid4().hex}.png"
    plt.tight_layout()
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    plt.close()
    
    return filename

def generate_bmi_vs_age_scatter(users):
    """Generate a scatter plot showing BMI vs Age relationship."""
    if not users:
        return None
    
    ages = [user['age'] for user in users]
    bmis = [user['bmi'] for user in users]
    body_types = [user['body_type'] for user in users]
    
    plt.figure(figsize=(10, 6))
    
    # Color map for body types
    color_map = {'Underweight': 'lightblue', 'Normal': 'lightgreen', 
                 'Overweight': 'orange', 'Obese': 'lightcoral'}
    colors = [color_map.get(bt, 'gray') for bt in body_types]
    
    plt.scatter(ages, bmis, c=colors, alpha=0.6, s=50, edgecolors='black')
    
    plt.title('BMI vs Age Distribution', fontsize=16, fontweight='bold')
    plt.xlabel('Age', fontsize=12)
    plt.ylabel('BMI', fontsize=12)
    plt.grid(True, alpha=0.3)
    
    # Add BMI category lines
    plt.axhline(y=18.5, color='blue', linestyle='--', alpha=0.7, label='Underweight')
    plt.axhline(y=24.9, color='green', linestyle='--', alpha=0.7, label='Normal')
    plt.axhline(y=29.9, color='orange', linestyle='--', alpha=0.7, label='Overweight')
    
    plt.legend()
    
    filename = f"static/bmi_age_scatter_{uuid.uuid4().hex}.png"
    plt.tight_layout()
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    plt.close()
    
    return filename