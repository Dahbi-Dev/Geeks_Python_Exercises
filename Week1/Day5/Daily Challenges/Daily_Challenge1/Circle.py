#Daily Challenge - Circle

import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must specify radius or diameter")

    @property
    def diameter(self):
        return self.radius * 2

    @diameter.setter
    def diameter(self, value):
        self.radius = value / 2

    @property
    def area(self):
        return math.pi * (self.radius ** 2)

    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f}, area={self.area:.2f})"

    def __add__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        # Add radii of two circles to create a new Circle
        return Circle(radius=self.radius + other.radius)

    def __gt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius > other.radius

    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius < other.radius

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return math.isclose(self.radius, other.radius, rel_tol=1e-9)

    def __repr__(self):
        # For debugging and interactive shell
        return f"Circle(radius={self.radius})"

# Example usage:

if __name__ == "__main__":
    c1 = Circle(radius=5)
    c2 = Circle(diameter=10)

    print(c1)  # Circle(radius=5.00, diameter=10.00, area=78.54)
    print(c2)  # Circle(radius=5.00, diameter=10.00, area=78.54)

    c3 = c1 + c2
    print(f"c3: {c3}")  # c3: Circle(radius=10.00, diameter=20.00, area=314.16)

    print(c1 > c2)  # False
    print(c1 == c2) # True

    circles = [c3, c1, c2]
    circles.sort()
    print("Sorted circles:", circles)
