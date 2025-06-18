# >>> 3 <= 3 < 9
print("3 <= 3 < 9:", 3 <= 3 < 9)  # ✅ True (chained comparisons work in Python)

# >>> 3 == 3 == 3
print("3 == 3 == 3:", 3 == 3 == 3)  # ✅ True (all are equal)

# >>> bool(0)
print("bool(0):", bool(0))  # ✅ False (0 is considered False in Python)

# >>> bool(5 == "5")
print("bool(5 == '5'):", bool(5 == "5"))  # ✅ False (int ≠ str)

# >>> bool(4 == 4) == bool("4" == "4")
print("bool(4 == 4) == bool('4' == '4'):", bool(4 == 4) == bool("4" == "4"))  
# ✅ True (both are True → bool(True) == bool(True) → True)

# >>> bool(bool(None))
print("bool(bool(None)):", bool(bool(None)))  
# ✅ False → bool(None) is False, and bool(False) is also False

# More evaluations
x = (1 == True)        # ✅ True (1 is treated as True)
y = (1 == False)       # ✅ False (1 ≠ False)
a = True + 4           # ✅ 5 (True is 1)
b = False + 10         # ✅ 10 (False is 0)

print("x is", x)
print("y is", y)
print("a:", a)
print("b:", b)
