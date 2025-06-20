# Exercise 1: Bank Account System with ATM

class BankAccount:
    def __init__(self, balance, username, password):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = False
        
    def authenticate(self, username, password):
        if username == self.username and password == self.password:
            self.authenticated = True
            return True
        else:
            return False
    
    def deposit(self):
        if not self.authenticated:
            raise Exception("You must be authenticated to perform this action.")
        
        while True:
            try:
                money_deposit = int(input("Please Deposit: "))
                if money_deposit <= 0:
                    raise ValueError("The number must be positive.")
                else:
                    self.balance += money_deposit
                    print(f"The Balance After Deposit is ${self.balance}")
                    break
            except ValueError as e:
                if "invalid literal" in str(e):
                    print("Please enter a valid number.")
                else:
                    print(e)
            except Exception as e:
                print(f"An error occurred: {e}")
                
    def withdraw(self):
        if not self.authenticated:
            raise Exception("You must be authenticated to perform this action.")
        
        while True:
            try:
                withdraw = int(input("Please withdraw: "))
                if withdraw <= 0:
                    raise ValueError("The number must be positive.")
                elif withdraw > self.balance:
                    raise ValueError("Insufficient funds.")
                else:
                    self.balance -= withdraw
                    print(f"The Balance After withdraw is ${self.balance}")
                    break
            except ValueError as e:
                if "invalid literal" in str(e):
                    print("Please enter a valid number.")
                else:
                    print(e)
            except Exception as e:
                print(f"An error occurred: {e}")
    
    def get_balance(self):
        if not self.authenticated:
            raise Exception("You must be authenticated to perform this action.")
        return self.balance
                
class MinimumBalanceAccount(BankAccount):
    def __init__(self, balance, username, password, minimum_balance=0):
        super().__init__(balance, username, password)
        self.minimum_balance = minimum_balance
    
    def withdraw(self):
        if not self.authenticated:
            raise Exception("You must be authenticated to perform this action.")
        
        while True:
            try:
                withdraw = int(input("Please withdraw: "))
                if withdraw <= 0:
                    raise ValueError("The number must be positive.")
                elif withdraw > self.balance:
                    raise ValueError("Insufficient funds.")
                elif (self.balance - withdraw) < self.minimum_balance:
                    raise Exception(f"Cannot withdraw. Balance would fall below minimum balance of ${self.minimum_balance}.")
                else:
                    self.balance -= withdraw
                    print(f"The Balance After withdraw is ${self.balance}")
                    break
            except ValueError as e:
                if "invalid literal" in str(e):
                    print("Please enter a valid number.")
                else:
                    print(e)
            except Exception as e:
                print(f"An error occurred: {e}")

class ATM:
    def __init__(self, account_list, try_limit):
        # Validate account_list contains BankAccount instances
        if not isinstance(account_list, list):
            raise Exception("account_list must be a list")
        
        for account in account_list:
            if not isinstance(account, (BankAccount, MinimumBalanceAccount)):
                raise Exception("All accounts must be BankAccount or MinimumBalanceAccount instances")
        
        self.account_list = account_list
        
        # Validate try_limit is a positive number
        try:
            if not isinstance(try_limit, int) or try_limit <= 0:
                raise Exception("try_limit must be a positive number")
            self.try_limit = try_limit
        except Exception as e:
            print(f"Invalid try_limit: {e}. Setting try_limit to 2.")
            self.try_limit = 2
        
        self.current_tries = 0
        
        # Start the ATM
        self.show_main_menu()
    
    def show_main_menu(self):
        print("\n" + "="*50)
        print("           WELCOME TO THE ATM")
        print("="*50)
        
        while True:
            print("\nMain Menu:")
            print("1. Log in")
            print("2. Exit")
            
            try:
                choice = input("Please select an option (1 or 2): ").strip()
                
                if choice == "1":
                    username = input("Enter username: ").strip()
                    password = input("Enter password: ").strip()
                    self.log_in(username, password)
                elif choice == "2":
                    print("Thank you for using our ATM. Goodbye!")
                    break
                else:
                    print("Invalid option. Please select 1 or 2.")
            except KeyboardInterrupt:
                print("\nExiting ATM. Goodbye!")
                break
            except Exception as e:
                print(f"An error occurred: {e}")
    
    def log_in(self, username, password):
        # Check credentials against all accounts
        for account in self.account_list:
            if account.authenticate(username, password):
                print(f"Welcome, {username}!")
                self.current_tries = 0  # Reset tries on successful login
                self.show_account_menu(account)
                return
        
        # No match found
        self.current_tries += 1
        print(f"Invalid credentials. Attempt {self.current_tries} of {self.try_limit}")
        
        if self.current_tries >= self.try_limit:
            print("Maximum login attempts reached. Shutting down for security.")
            exit()
    
    def show_account_menu(self, account):
        print(f"\nAccount Menu - Current Balance: ${account.get_balance()}")
        
        while True:
            print("\nAccount Options:")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Check Balance")
            print("4. Log out")
            
            try:
                choice = input("Please select an option (1-4): ").strip()
                
                if choice == "1":
                    account.deposit()
                elif choice == "2":
                    account.withdraw()
                elif choice == "3":
                    print(f"Current Balance: ${account.get_balance()}")
                elif choice == "4":
                    account.authenticated = False  # Log out user
                    print("Logged out successfully.")
                    break
                else:
                    print("Invalid option. Please select 1, 2, 3, or 4.")
            except Exception as e:
                print(f"An error occurred: {e}")
            except KeyboardInterrupt:
                print("\nLogging out...")
                account.authenticated = False
                break

# Example Usage and Testing
if __name__ == "__main__":
    # Create some test accounts
    account1 = BankAccount(1000, "john_doe", "password123")
    account2 = MinimumBalanceAccount(500, "jane_smith", "mypass456", minimum_balance=100)
    account3 = BankAccount(750, "bob_wilson", "secure789")
    
    # Create account list
    accounts = [account1, account2, account3]
    
    print("Test Accounts Created:")
    print("1. Username: john_doe, Password: password123, Balance: $1000")
    print("2. Username: jane_smith, Password: mypass456, Balance: $500 (Min: $100)")
    print("3. Username: bob_wilson, Password: secure789, Balance: $750")
    
    # Initialize ATM
    try:
        atm = ATM(accounts, 3)
    except Exception as e:
        print(f"Error initializing ATM: {e}")
        
    # Test with invalid inputs
    print("\n" + "="*50)
    print("Testing ATM with invalid inputs:")
    
    # Test invalid account list
    try:
        invalid_atm = ATM(["not_an_account"], 3)
    except Exception as e:
        print(f"Caught expected error for invalid account list: {e}")
    
    # Test invalid try_limit
    try:
        invalid_atm2 = ATM(accounts, -1)
    except Exception as e:
        print(f"Handled invalid try_limit gracefully")