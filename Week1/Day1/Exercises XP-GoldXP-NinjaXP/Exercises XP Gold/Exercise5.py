# Exercise 5: Greatest Number


num1 = int(input("Input the 1st number: "))
num2 = int(input("Input the 2nd number: "))  
num3 = int(input("Input the 3rd number: "))
if num1 >= num2 and num1 >= num3:
    greatest = num1
elif num2 >= num1 and num2 >= num3:
    greatest = num2 
else:
    greatest = num3
print("The greatest number is:", greatest)
