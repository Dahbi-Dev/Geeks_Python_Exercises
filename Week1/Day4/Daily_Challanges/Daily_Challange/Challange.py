import math

class Pagination:
    """
    A pagination system that breaks large lists into manageable pages.
    
    This class provides navigation methods with method chaining support
    and handles edge cases with proper error handling.
    """
    
    def __init__(self, items=None, page_size=10):
        """
        Initialize the Pagination system.
        
        Args:
            items (list, optional): List of items to paginate. Defaults to None (empty list).
            page_size (int, optional): Number of items per page. Defaults to 10.
        """
        # Initialize items as empty list if None is provided
        self.items = items if items is not None else []
        
        # Set page size and validate it's positive
        if page_size <= 0:
            raise ValueError("Page size must be greater than 0")
        self.page_size = page_size
        
        # Current page index (0-based internally)
        self.current_idx = 0
        
        # Calculate total number of pages
        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 1
    
    def get_visible_items(self):
        """
        Get the items visible on the current page.
        
        Returns:
            list: Items for the current page using list slicing.
        """
        start_idx = self.current_idx * self.page_size
        end_idx = start_idx + self.page_size
        return self.items[start_idx:end_idx]
    
    def go_to_page(self, page_num):
        """
        Navigate to a specific page number (1-based indexing).
        
        Args:
            page_num (int): Page number to navigate to (starts from 1).
            
        Raises:
            ValueError: If page_num is out of valid range.
        """
        # Convert to 0-based index
        page_idx = int(page_num) - 1
        
        # Validate page range
        if page_idx < 0 or page_idx >= self.total_pages:
            raise ValueError(f"Page number must be between 1 and {self.total_pages}")
        
        self.current_idx = page_idx
        # Note: go_to_page doesn't return self (as per requirements)
    
    def first_page(self):
        """
        Navigate to the first page.
        
        Returns:
            Pagination: self for method chaining.
        """
        self.current_idx = 0
        return self
    
    def last_page(self):
        """
        Navigate to the last page.
        
        Returns:
            Pagination: self for method chaining.
        """
        self.current_idx = self.total_pages - 1 if self.total_pages > 0 else 0
        return self
    
    def next_page(self):
        """
        Move to the next page if not already on the last page.
        
        Returns:
            Pagination: self for method chaining.
        """
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self
    
    def previous_page(self):
        """
        Move to the previous page if not already on the first page.
        
        Returns:
            Pagination: self for method chaining.
        """
        if self.current_idx > 0:
            self.current_idx -= 1
        return self
    
    def __str__(self):
        """
        String representation showing current page items, each on a new line.
        
        Returns:
            str: Items on current page joined by newlines.
        """
        visible_items = self.get_visible_items()
        return '\n'.join(str(item) for item in visible_items)
    
    def get_page_info(self):
        """
        Get current pagination information.
        
        Returns:
            dict: Dictionary containing current page info.
        """
        return {
            'current_page': self.current_idx + 1,
            'total_pages': self.total_pages,
            'page_size': self.page_size,
            'total_items': len(self.items),
            'items_on_page': len(self.get_visible_items())
        }


def test_pagination():
    """Test function to demonstrate pagination functionality"""
    print("=== Pagination System Test ===\n")
    
    # Test 1: Basic functionality with alphabet
    print("Test 1: Basic Alphabet Pagination")
    alphabetList = list("abcdefghijklmnopqrstuvwxyz")
    p = Pagination(alphabetList, 4)
    
    print("Initial page (should be first 4 letters):")
    print(p.get_visible_items())
    print()
    
    # Test 2: String representation
    print("Test 2: String Representation")
    print("Current page displayed with __str__():")
    print(str(p))
    print()
    
    # Test 3: Navigation methods
    print("Test 3: Navigation Methods")
    print("Moving to next page:")
    p.next_page()
    print(p.get_visible_items())
    print()
    
    print("Going to last page:")
    p.last_page()
    print(p.get_visible_items())
    print()
    
    # Test 4: Method chaining
    print("Test 4: Method Chaining")
    print("Chaining: first_page().next_page().next_page()")
    chained_result = p.first_page().next_page().next_page().get_visible_items()
    print(chained_result)
    print()
    
    # Test 5: go_to_page functionality
    print("Test 5: go_to_page() Method")
    try:
        p.go_to_page(3)
        print(f"After go_to_page(3), current page: {p.current_idx + 1}")
        print(f"Items: {p.get_visible_items()}")
    except ValueError as e:
        print(f"Error: {e}")
    print()
    
    # Test 6: Error handling
    print("Test 6: Error Handling")
    try:
        p.go_to_page(0)  # Should raise ValueError
    except ValueError as e:
        print(f"Expected error for page 0: {e}")
    
    try:
        p.go_to_page(10)  # Should raise ValueError for alphabet with 4 items per page
    except ValueError as e:
        print(f"Expected error for page 10: {e}")
    print()
    
    # Test 7: Edge cases
    print("Test 7: Edge Cases")
    
    # Empty pagination
    empty_p = Pagination()
    print(f"Empty pagination items: {empty_p.get_visible_items()}")
    print(f"Empty pagination total pages: {empty_p.total_pages}")
    
    # Single item
    single_p = Pagination(['only_item'], 5)
    print(f"Single item pagination: {single_p.get_visible_items()}")
    
    # Large page size
    large_p = Pagination(list(range(5)), 10)
    print(f"Large page size: {large_p.get_visible_items()}")
    print()
    
    # Test 8: Page information
    print("Test 8: Page Information")
    info = p.get_page_info()
    print("Current pagination info:")
    for key, value in info.items():
        print(f"  {key}: {value}")


def interactive_demo():
    """Interactive demo for users to test pagination"""
    print("\n=== Interactive Pagination Demo ===")
    
    # Create sample data
    sample_data = [f"Item {i+1}" for i in range(25)]
    p = Pagination(sample_data, 5)
    
    print(f"Created pagination with {len(sample_data)} items, 5 per page")
    print("Commands: next, prev, first, last, goto <page>, info, quit")
    
    while True:
        print(f"\n--- Page {p.current_idx + 1} of {p.total_pages} ---")
        print(str(p))
        print("-" * 30)
        
        command = input("Enter command: ").strip().lower()
        
        try:
            if command == 'next':
                p.next_page()
            elif command == 'prev':
                p.previous_page()
            elif command == 'first':
                p.first_page()
            elif command == 'last':
                p.last_page()
            elif command.startswith('goto'):
                parts = command.split()
                if len(parts) == 2:
                    page_num = int(parts[1])
                    p.go_to_page(page_num)
                else:
                    print("Usage: goto <page_number>")
            elif command == 'info':
                info = p.get_page_info()
                for key, value in info.items():
                    print(f"{key}: {value}")
            elif command == 'quit':
                break
            else:
                print("Unknown command. Try: next, prev, first, last, goto <page>, info, quit")
        
        except ValueError as e:
            print(f"Error: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")


if __name__ == "__main__":
    # Run the required test cases
    print("Running Required Test Cases:")
    print("=" * 40)
    
    alphabetList = list("abcdefghijklmnopqrstuvwxyz")
    p = Pagination(alphabetList, 4)

    print("p.get_visible_items():")
    print(p.get_visible_items())
    # Expected: ['a', 'b', 'c', 'd']

    print("\nAfter p.next_page():")
    p.next_page()
    print(p.get_visible_items())
    # Expected: ['e', 'f', 'g', 'h']

    print("\nAfter p.last_page():")
    p.last_page()
    print(p.get_visible_items())
    # Expected: ['y', 'z']

    print("\nAfter p.go_to_page(7) - current page number:")
    try:
        p.go_to_page(7)
        print(p.current_idx + 1)
        # Expected: 7
    except ValueError as e:
        print(f"Error: {e}")

    print("\nTrying p.go_to_page(0) - should raise ValueError:")
    try:
        p.go_to_page(0)
    except ValueError as e:
        print(f"Caught expected error: {e}")
    
    # Run comprehensive tests
    print("\n" + "=" * 50)
    test_pagination()
    
    # Offer interactive demo
    demo_choice = input("\nWould you like to try the interactive demo? (y/n): ")
    if demo_choice.lower().startswith('y'):
        interactive_demo()