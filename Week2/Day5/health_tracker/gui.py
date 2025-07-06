import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import requests
import json
from PIL import Image, ImageTk
import io
from models import calculate_bmi, get_body_type, get_default_advice


class HealthTrackerGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Health Tracker - BMI Calculator")
        self.root.geometry("1200x800")
        self.root.configure(bg='#f0f0f0')
        
        # API base URL
        self.api_url = "http://localhost:5000"
        
        self.create_widgets()
        
    def create_widgets(self):
        # Main title
        title_label = tk.Label(self.root, text="Health Tracker", 
                              font=("Arial", 24, "bold"), 
                              bg='#f0f0f0', fg='#2c3e50')
        title_label.pack(pady=10)
        
        # Create notebook for tabs
        notebook = ttk.Notebook(self.root)
        notebook.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Tab 1: Add New User
        self.create_add_user_tab(notebook)
        
        # Tab 2: Search Users with Visualizations
        self.create_enhanced_search_tab(notebook)
        
        # Tab 3: Statistics and Visualizations
        self.create_statistics_tab(notebook)
        
    def create_add_user_tab(self, notebook):
        # Add User Frame
        add_frame = ttk.Frame(notebook)
        notebook.add(add_frame, text="Add New User")
        
        # Input fields frame
        input_frame = ttk.LabelFrame(add_frame, text="User Information", padding="10")
        input_frame.pack(fill='x', padx=10, pady=10)
        
        # Name
        ttk.Label(input_frame, text="Name:").grid(row=0, column=0, sticky='w', pady=5)
        self.name_entry = ttk.Entry(input_frame, width=30)
        self.name_entry.grid(row=0, column=1, padx=10, pady=5)
        
        # Height
        ttk.Label(input_frame, text="Height (cm):").grid(row=1, column=0, sticky='w', pady=5)
        self.height_entry = ttk.Entry(input_frame, width=30)
        self.height_entry.grid(row=1, column=1, padx=10, pady=5)
        
        # Weight
        ttk.Label(input_frame, text="Weight (kg):").grid(row=2, column=0, sticky='w', pady=5)
        self.weight_entry = ttk.Entry(input_frame, width=30)
        self.weight_entry.grid(row=2, column=1, padx=10, pady=5)
        
        # Age
        ttk.Label(input_frame, text="Age:").grid(row=3, column=0, sticky='w', pady=5)
        self.age_entry = ttk.Entry(input_frame, width=30)
        self.age_entry.grid(row=3, column=1, padx=10, pady=5)
        
        # Calculate button
        calc_button = ttk.Button(input_frame, text="Calculate BMI & Add User", 
                               command=self.calculate_and_add_user)
        calc_button.grid(row=4, column=0, columnspan=2, pady=20)
        
        # Results frame
        results_frame = ttk.LabelFrame(add_frame, text="Results", padding="10")
        results_frame.pack(fill='both', expand=True, padx=10, pady=10)
        
        self.result_text = scrolledtext.ScrolledText(results_frame, height=15, width=80)
        self.result_text.pack(fill='both', expand=True)
        
    def create_enhanced_search_tab(self, notebook):
        # Search Frame
        search_frame = ttk.Frame(notebook)
        notebook.add(search_frame, text="Search Users")
        
        # Search input frame
        search_input_frame = ttk.LabelFrame(search_frame, text="Search", padding="10")
        search_input_frame.pack(fill='x', padx=10, pady=10)
        
        ttk.Label(search_input_frame, text="Search by name:").grid(row=0, column=0, sticky='w', pady=5)
        self.search_entry = ttk.Entry(search_input_frame, width=40)
        self.search_entry.grid(row=0, column=1, padx=10, pady=5)
        
        # Bind Enter key to search
        self.search_entry.bind('<Return>', lambda event: self.search_users())
        
        search_button = ttk.Button(search_input_frame, text="Search", command=self.search_users)
        search_button.grid(row=0, column=2, padx=10, pady=5)
        
        show_all_button = ttk.Button(search_input_frame, text="Show All Users", command=self.show_all_users)
        show_all_button.grid(row=0, column=3, padx=10, pady=5)
        
        # Create main content frame with paned window
        main_content = ttk.PanedWindow(search_frame, orient='horizontal')
        main_content.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Left panel for search results
        left_frame = ttk.LabelFrame(main_content, text="Search Results", padding="10")
        main_content.add(left_frame, weight=1)
        
        self.search_result_text = scrolledtext.ScrolledText(left_frame, height=25, width=50)
        self.search_result_text.pack(fill='both', expand=True)
        
        # Right panel for visualizations
        right_frame = ttk.LabelFrame(main_content, text="Visualizations", padding="10")
        main_content.add(right_frame, weight=1)
        
        # Visualization controls
        viz_control_frame = ttk.Frame(right_frame)
        viz_control_frame.pack(fill='x', pady=(0, 10))
        
        ttk.Button(viz_control_frame, text="Show BMI Chart", 
                  command=self.show_bmi_chart).pack(side='left', padx=5)
        ttk.Button(viz_control_frame, text="Show Food Recommendations", 
                  command=self.show_food_chart).pack(side='left', padx=5)
        ttk.Button(viz_control_frame, text="Show Exercise Recommendations", 
                  command=self.show_exercise_chart).pack(side='left', padx=5)
        
        # Image display area
        self.image_frame = ttk.Frame(right_frame)
        self.image_frame.pack(fill='both', expand=True)
        
        # Create a canvas for image display with scrollbars
        self.canvas = tk.Canvas(self.image_frame, bg='white')
        v_scrollbar = ttk.Scrollbar(self.image_frame, orient='vertical', command=self.canvas.yview)
        h_scrollbar = ttk.Scrollbar(self.image_frame, orient='horizontal', command=self.canvas.xview)
        
        self.canvas.configure(yscrollcommand=v_scrollbar.set, xscrollcommand=h_scrollbar.set)
        
        v_scrollbar.pack(side='right', fill='y')
        h_scrollbar.pack(side='bottom', fill='x')
        self.canvas.pack(side='left', fill='both', expand=True)
        
        # Initial message
        self.canvas.create_text(200, 100, text="Select a visualization to display", 
                               font=("Arial", 12), fill='gray')
        
    def create_statistics_tab(self, notebook):
        # Statistics Frame
        stats_frame = ttk.Frame(notebook)
        notebook.add(stats_frame, text="Statistics")
        
        # Control buttons
        control_frame = ttk.Frame(stats_frame)
        control_frame.pack(fill='x', padx=10, pady=10)
        
        ttk.Button(control_frame, text="Refresh Statistics", 
                  command=self.refresh_statistics).pack(side='left', padx=5)
        
        # Statistics display
        self.stats_text = scrolledtext.ScrolledText(stats_frame, height=10, width=80)
        self.stats_text.pack(fill='x', padx=10, pady=10)
        
        # Load initial statistics
        self.refresh_statistics()
        
    def calculate_and_add_user(self):
        try:
            # Get input values
            name = self.name_entry.get().strip() or "Anonymous"
            height = float(self.height_entry.get())
            weight = float(self.weight_entry.get())
            age = int(self.age_entry.get())
            
            # Validate inputs
            if height <= 0 or weight <= 0 or age <= 0:
                messagebox.showerror("Error", "All values must be positive numbers")
                return
            
            # Calculate BMI locally first
            bmi = calculate_bmi(height, weight)
            body_type = get_body_type(bmi)
            advice = get_default_advice(body_type)
            
            # Send to API
            data = {
                "name": name,
                "height": height,
                "weight": weight,
                "age": age
            }
            
            try:
                response = requests.post(f"{self.api_url}/user-data", json=data)
                if response.status_code == 200:
                    result = response.json()
                    self.display_user_result(result, name, height, weight, age)
                    self.clear_input_fields()
                else:
                    # Fallback to local calculation
                    self.display_local_result(name, height, weight, age, bmi, body_type, advice)
            except requests.exceptions.RequestException:
                # API not available, use local calculation
                self.display_local_result(name, height, weight, age, bmi, body_type, advice)
                
        except ValueError:
            messagebox.showerror("Error", "Please enter valid numeric values")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")
    
    def display_user_result(self, result, name, height, weight, age):
        """Display results from API"""
        self.result_text.delete(1.0, tk.END)
        
        result_text = f"""
=== BMI CALCULATION RESULTS ===

User Information:
• Name: {name}
• Height: {height} cm
• Weight: {weight} kg
• Age: {age} years

BMI Results:
• BMI: {result.get('BMI', 'N/A')}
• Body Type: {result.get('Body Type', 'N/A')}

Personalized Advice:
• Food Advice: {result.get('Food Advice', 'N/A')}
• Exercise Advice: {result.get('Exercise Advice', 'N/A')}

User ID: {result.get('user_id', 'N/A')}
Status: Successfully added to database!
"""
        self.result_text.insert(tk.END, result_text)
        
    def display_local_result(self, name, height, weight, age, bmi, body_type, advice):
        """Display local calculation results"""
        self.result_text.delete(1.0, tk.END)
        
        result_text = f"""
=== BMI CALCULATION RESULTS ===

User Information:
• Name: {name}
• Height: {height} cm
• Weight: {weight} kg
• Age: {age} years

BMI Results:
• BMI: {bmi}
• Body Type: {body_type}

Personalized Advice:
• Food Advice: {advice['food_advice']}
• Exercise Advice: {advice['exercise_advice']}

Note: Database connection unavailable - showing local calculation only.
"""
        self.result_text.insert(tk.END, result_text)
        
    def search_users(self):
        query = self.search_entry.get().strip()
        if not query:
            messagebox.showwarning("Warning", "Please enter a search term")
            return
            
        try:
            response = requests.get(f"{self.api_url}/search-users", params={"name": query})
            if response.status_code == 200:
                data = response.json()
                self.display_search_results(data)
                # Automatically show BMI chart after search
                self.show_bmi_chart()
            elif response.status_code == 404:
                self.search_result_text.delete(1.0, tk.END)
                self.search_result_text.insert(tk.END, f"No users found matching '{query}'")
            else:
                messagebox.showerror("Error", "Failed to search users")
        except requests.exceptions.RequestException:
            messagebox.showerror("Error", "Unable to connect to server")
    
    def show_all_users(self):
        try:
            response = requests.get(f"{self.api_url}/statistics")
            if response.status_code == 200:
                stats = response.json()
                self.display_statistics(stats)
                # Show BMI chart when displaying all users
                self.show_bmi_chart()
            else:
                messagebox.showerror("Error", "Failed to retrieve statistics")
        except requests.exceptions.RequestException:
            messagebox.showerror("Error", "Unable to connect to server")
    
    def display_search_results(self, data):
        """Display search results"""
        self.search_result_text.delete(1.0, tk.END)
        
        result_text = f"=== SEARCH RESULTS ===\n"
        result_text += f"Query: '{data['query']}'\n"
        result_text += f"Found {data['count']} user(s)\n\n"
        
        for i, user in enumerate(data['users'], 1):
            result_text += f"--- User {i} ---\n"
            result_text += f"• Name: {user['name']}\n"
            result_text += f"• Height: {user['height']} cm\n"
            result_text += f"• Weight: {user['weight']} kg\n"
            result_text += f"• Age: {user['age']} years\n"
            result_text += f"• BMI: {user['bmi']}\n"
            result_text += f"• Body Type: {user['body_type']}\n"
            result_text += f"• Food Advice: {user['food_advice']}\n"
            result_text += f"• Exercise Advice: {user['exercise_advice']}\n\n"
        
        self.search_result_text.insert(tk.END, result_text)
    
    def display_statistics(self, stats):
        """Display database statistics"""
        self.search_result_text.delete(1.0, tk.END)
        
        result_text = f"""
=== DATABASE STATISTICS ===

Total Users: {stats['total_users']}
Average BMI: {stats['average_bmi']}
BMI Range: {stats['min_bmi']} - {stats['max_bmi']}

Body Type Distribution:
• Underweight: {stats['distribution']['underweight']} users
• Normal: {stats['distribution']['normal']} users
• Overweight: {stats['distribution']['overweight']} users
• Obese: {stats['distribution']['obese']} users

Note: Use the search bar above to find specific users by name.
"""
        self.search_result_text.insert(tk.END, result_text)
    
    def show_bmi_chart(self):
        """Display BMI chart from the API"""
        try:
            response = requests.get(f"{self.api_url}/public-user-data")
            if response.status_code == 200:
                self.display_image_from_response(response, "BMI Chart")
            else:
                self.show_error_message("Failed to load BMI chart")
        except requests.exceptions.RequestException:
            self.show_error_message("Unable to connect to server")
    
    def show_food_chart(self):
        """Display food recommendations chart from the API"""
        try:
            response = requests.get(f"{self.api_url}/public-food")
            if response.status_code == 200:
                self.display_image_from_response(response, "Food Recommendations")
            else:
                self.show_error_message("Failed to load food recommendations chart")
        except requests.exceptions.RequestException:
            self.show_error_message("Unable to connect to server")
    
    def show_exercise_chart(self):
        """Display exercise recommendations chart from the API"""
        try:
            response = requests.get(f"{self.api_url}/public-exercises")
            if response.status_code == 200:
                self.display_image_from_response(response, "Exercise Recommendations")
            else:
                self.show_error_message("Failed to load exercise recommendations chart")
        except requests.exceptions.RequestException:
            self.show_error_message("Unable to connect to server")
    
    def display_image_from_response(self, response, title):
        """Display image from HTTP response"""
        try:
            # Clear canvas
            self.canvas.delete("all")
            
            # Load image from response
            image_data = io.BytesIO(response.content)
            pil_image = Image.open(image_data)
            
            # Resize image to fit canvas while maintaining aspect ratio
            canvas_width = self.canvas.winfo_width()
            canvas_height = self.canvas.winfo_height()
            
            if canvas_width > 1 and canvas_height > 1:  # Canvas is initialized
                # Calculate scaling factor
                scale_x = canvas_width / pil_image.width
                scale_y = canvas_height / pil_image.height
                scale = min(scale_x, scale_y, 1.0)  # Don't scale up
                
                new_width = int(pil_image.width * scale)
                new_height = int(pil_image.height * scale)
                
                pil_image = pil_image.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Convert to PhotoImage
            photo = ImageTk.PhotoImage(pil_image)
            
            # Display image
            self.canvas.create_image(10, 10, anchor='nw', image=photo)
            self.canvas.configure(scrollregion=self.canvas.bbox("all"))
            
            # Keep a reference to prevent garbage collection
            self.canvas.image = photo
            
            # Add title
            self.canvas.create_text(10, pil_image.height + 20, anchor='nw', 
                                   text=f"{title} - Generated from Server", 
                                   font=("Arial", 12, "bold"), fill='blue')
            
        except Exception as e:
            self.show_error_message(f"Error displaying image: {str(e)}")
    
    def show_error_message(self, message):
        """Display error message in canvas"""
        self.canvas.delete("all")
        self.canvas.create_text(200, 100, text=message, 
                               font=("Arial", 12), fill='red')
    
    def refresh_statistics(self):
        """Refresh statistics display"""
        try:
            response = requests.get(f"{self.api_url}/statistics")
            if response.status_code == 200:
                stats = response.json()
                self.display_statistics_in_tab(stats)
            else:
                self.stats_text.delete(1.0, tk.END)
                self.stats_text.insert(tk.END, "Failed to retrieve statistics")
        except requests.exceptions.RequestException:
            self.stats_text.delete(1.0, tk.END)
            self.stats_text.insert(tk.END, "Unable to connect to server")
    
    def display_statistics_in_tab(self, stats):
        """Display statistics in the statistics tab"""
        self.stats_text.delete(1.0, tk.END)
        
        result_text = f"""
=== DATABASE STATISTICS ===

Total Users: {stats['total_users']}
Average BMI: {stats['average_bmi']}
BMI Range: {stats['min_bmi']} - {stats['max_bmi']}

Body Type Distribution:
• Underweight: {stats['distribution']['underweight']} users
• Normal: {stats['distribution']['normal']} users
• Overweight: {stats['distribution']['overweight']} users
• Obese: {stats['distribution']['obese']} users

Last Updated: {self.get_current_time()}
"""
        self.stats_text.insert(tk.END, result_text)
    
    def get_current_time(self):
        """Get current time as string"""
        from datetime import datetime
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    def clear_input_fields(self):
        """Clear all input fields"""
        self.name_entry.delete(0, tk.END)
        self.height_entry.delete(0, tk.END)
        self.weight_entry.delete(0, tk.END)
        self.age_entry.delete(0, tk.END)

def main():
    root = tk.Tk()
    app = HealthTrackerGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()