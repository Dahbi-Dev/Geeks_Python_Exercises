class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius
    
    def area(self):
        return 3.14159 * (self.radius ** 2)
    
    def definition(self):
        print("A circle is a round shape with all points at equal distance from the center.")
        print(f"This circle has a radius of {self.radius} units.")

# Testing the Circle class
print("=== Circle Examples ===")

# Default circle
circle1 = Circle()
print(f"Default circle - Radius: {circle1.radius}")
print(f"Perimeter: {circle1.perimeter():.2f}")
print(f"Area: {circle1.area():.2f}")

print()

# Custom circle
circle2 = Circle(5)
print(f"Custom circle - Radius: {circle2.radius}")
print(f"Perimeter: {circle2.perimeter():.2f}")
print(f"Area: {circle2.area():.2f}")

print()

# Print definition
circle2.definition()