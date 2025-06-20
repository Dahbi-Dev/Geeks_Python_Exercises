# Exercise 1 : Conway’s Game of Life

import random
import time
import os

class Cell:
    """Represents a single cell in the Game of Life grid"""
    
    def __init__(self, x, y, alive=False):
        self.x = x
        self.y = y
        self.alive = alive
        self.next_state = False
    
    def set_next_state(self, state):
        """Set the cell's state for the next generation"""
        self.next_state = state
    
    def update(self):
        """Update the cell to its next state"""
        self.alive = self.next_state
    
    def toggle(self):
        """Toggle the cell's current state"""
        self.alive = not self.alive
    
    def __str__(self):
        return "██" if self.alive else "  "

class GameOfLife:
    """Main Game of Life engine with expandable borders"""
    
    def __init__(self, width, height, border_mode='fixed'):
        self.original_width = width
        self.original_height = height
        self.width = width
        self.height = height
        self.border_mode = border_mode  # 'fixed' or 'expandable'
        self.max_size = 100  # Maximum grid size for expandable mode
        self.generation = 0
        self.grid = []
        self.initialize_grid()
    
    def initialize_grid(self):
        """Initialize the grid with Cell objects"""
        self.grid = []
        for y in range(self.height):
            row = []
            for x in range(self.width):
                row.append(Cell(x, y))
            self.grid.append(row)
    
    def get_cell(self, x, y):
        """Get a cell at coordinates (x, y), returns None for out-of-bounds in fixed mode"""
        if self.border_mode == 'fixed':
            if x < 0 or x >= self.width or y < 0 or y >= self.height:
                return None  # Treat as dead cell
            return self.grid[y][x]
        else:  # expandable mode
            if x < 0 or x >= self.width or y < 0 or y >= self.height:
                return Cell(x, y, False)  # Dead cell outside current bounds
            return self.grid[y][x]
    
    def count_live_neighbors(self, x, y):
        """Count the number of live neighbors for a cell at (x, y)"""
        count = 0
        for dy in [-1, 0, 1]:
            for dx in [-1, 0, 1]:
                if dx == 0 and dy == 0:
                    continue  # Skip the cell itself
                
                neighbor = self.get_cell(x + dx, y + dy)
                if neighbor and neighbor.alive:
                    count += 1
        return count
    
    def expand_grid_if_needed(self):
        """Expand the grid if life is approaching the borders (expandable mode only)"""
        if self.border_mode != 'expandable':
            return
        
        if self.width >= self.max_size or self.height >= self.max_size:
            return
        
        # Check if expansion is needed
        needs_expansion = False
        
        # Check edges for live cells or potential births
        for x in range(self.width):
            for y in range(self.height):
                if (x <= 1 or x >= self.width - 2 or y <= 1 or y >= self.height - 2):
                    if self.grid[y][x].alive or self.count_live_neighbors(x, y) == 3:
                        needs_expansion = True
                        break
            if needs_expansion:
                break
        
        if needs_expansion:
            self.expand_grid()
    
    def expand_grid(self):
        """Expand the grid by adding padding around the current grid"""
        new_width = min(self.width + 4, self.max_size)
        new_height = min(self.height + 4, self.max_size)
        
        new_grid = []
        for y in range(new_height):
            row = []
            for x in range(new_width):
                # Calculate corresponding position in old grid
                old_x = x - 2
                old_y = y - 2
                
                if (0 <= old_x < self.width and 0 <= old_y < self.height):
                    # Copy existing cell
                    old_cell = self.grid[old_y][old_x]
                    new_cell = Cell(x, y, old_cell.alive)
                else:
                    # Create new dead cell
                    new_cell = Cell(x, y, False)
                
                row.append(new_cell)
            new_grid.append(row)
        
        self.grid = new_grid
        self.width = new_width
        self.height = new_height
        print(f"Grid expanded to {self.width}x{self.height}")
    
    def step(self):
        """Advance the game by one generation"""
        self.expand_grid_if_needed()
        
        # Calculate next states for all cells
        for y in range(self.height):
            for x in range(self.width):
                cell = self.grid[y][x]
                neighbors = self.count_live_neighbors(x, y)
                
                if cell.alive:
                    # Live cell rules
                    if neighbors < 2:
                        cell.set_next_state(False)  # Dies by underpopulation
                    elif neighbors == 2 or neighbors == 3:
                        cell.set_next_state(True)   # Lives on
                    else:
                        cell.set_next_state(False)  # Dies by overpopulation
                else:
                    # Dead cell rules
                    if neighbors == 3:
                        cell.set_next_state(True)   # Birth by reproduction
                    else:
                        cell.set_next_state(False)  # Stays dead
        
        # Update all cells to their next states
        for y in range(self.height):
            for x in range(self.width):
                self.grid[y][x].update()
        
        self.generation += 1
    
    def set_cell(self, x, y, alive):
        """Set a specific cell's state"""
        if 0 <= x < self.width and 0 <= y < self.height:
            self.grid[y][x].alive = alive
    
    def get_population(self):
        """Get the current population count"""
        count = 0
        for y in range(self.height):
            for x in range(self.width):
                if self.grid[y][x].alive:
                    count += 1
        return count
    
    def clear(self):
        """Clear all cells"""
        for y in range(self.height):
            for x in range(self.width):
                self.grid[y][x].alive = False
    
    def load_pattern(self, pattern_name):
        """Load a predefined pattern"""
        self.clear()
        center_x = self.width // 2
        center_y = self.height // 2
        
        if pattern_name == 'random':
            for y in range(self.height):
                for x in range(self.width):
                    self.grid[y][x].alive = random.random() < 0.3
        
        elif pattern_name == 'glider':
            pattern = [
                [0, 1, 0],
                [0, 0, 1],
                [1, 1, 1]
            ]
            self.place_pattern(pattern, center_x - 1, center_y - 1)
        
        elif pattern_name == 'blinker':
            pattern = [
                [1],
                [1],
                [1]
            ]
            self.place_pattern(pattern, center_x, center_y - 1)
        
        elif pattern_name == 'beacon':
            pattern = [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 1, 1],
                [0, 0, 1, 1]
            ]
            self.place_pattern(pattern, center_x - 2, center_y - 2)
        
        elif pattern_name == 'cross_pattern':
            # Based on the image provided
            # Top cross
            pattern1 = [
                [0, 0, 1, 1, 0, 0],
                [1, 1, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [0, 0, 1, 1, 0, 0]
            ]
            self.place_pattern(pattern1, center_x - 3, center_y - 8)
            
            # Middle left cross
            pattern2 = [
                [0, 0, 1, 0, 0],
                [1, 1, 0, 0, 0],
                [1, 1, 0, 1, 0],
                [0, 0, 1, 1, 1],
                [0, 0, 1, 1, 0],
                [0, 0, 1, 1, 0]
            ]
            self.place_pattern(pattern2, center_x - 8, center_y - 3)
            
            # Middle right cross
            pattern3 = [
                [0, 0, 1, 1, 1],
                [0, 0, 0, 1, 0],
                [1, 1, 1, 1, 0],
                [1, 1, 0, 0, 0],
                [1, 1, 1, 1, 0]
            ]
            self.place_pattern(pattern3, center_x + 2, center_y - 2)
            
            # Bottom cross
            pattern4 = [
                [0, 0, 1, 1, 0, 0],
                [1, 1, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1],
                [0, 0, 1, 1, 0, 0]
            ]
            self.place_pattern(pattern4, center_x - 3, center_y + 4)
    
    def place_pattern(self, pattern, start_x, start_y):
        """Place a pattern on the grid at the specified position"""
        for y, row in enumerate(pattern):
            for x, cell in enumerate(row):
                grid_x = start_x + x
                grid_y = start_y + y
                if 0 <= grid_x < self.width and 0 <= grid_y < self.height:
                    self.grid[grid_y][grid_x].alive = (cell == 1)
    
    def display(self):
        """Display the current state of the grid"""
        os.system('cls' if os.name == 'nt' else 'clear')  # Clear screen
        print(f"Generation: {self.generation} | Population: {self.get_population()} | Grid: {self.width}x{self.height}")
        print(f"Border Mode: {self.border_mode}")
        print("-" * (self.width * 2 + 2))
        
        for y in range(self.height):
            print("|", end="")
            for x in range(self.width):
                print(str(self.grid[y][x]), end="")
            print("|")
        
        print("-" * (self.width * 2 + 2))

def main():
    """Main function to run the Game of Life"""
    print("Conway's Game of Life")
    print("=" * 50)
    
    # Get user preferences
    width = int(input("Enter grid width (default 30): ") or "30")
    height = int(input("Enter grid height (default 20): ") or "20")
    
    print("\nBorder modes:")
    print("1. Fixed borders (cells die at edges)")
    print("2. Expandable borders (grid grows as needed)")
    border_choice = input("Choose border mode (1/2, default 1): ") or "1"
    border_mode = 'fixed' if border_choice == '1' else 'expandable'
    
    # Create game instance
    game = GameOfLife(width, height, border_mode)
    
    # Pattern selection
    print("\nAvailable patterns:")
    print("1. Random")
    print("2. Glider")
    print("3. Blinker")
    print("4. Beacon")
    print("5. Cross Pattern (from your image)")
    
    pattern_choice = input("Choose pattern (1-5, default 5): ") or "5"
    patterns = {
        '1': 'random',
        '2': 'glider',
        '3': 'blinker',
        '4': 'beacon',
        '5': 'cross_pattern'
    }
    
    game.load_pattern(patterns.get(pattern_choice, 'cross_pattern'))
    
    # Game loop
    print("\nStarting simulation... Press Ctrl+C to stop")
    print("Commands during simulation:")
    print("- Press Enter to step manually")
    print("- Type 'auto' for automatic mode")
    print("- Type 'quit' to exit")
    
    try:
        auto_mode = False
        while True:
            game.display()
            
            if auto_mode:
                time.sleep(0.5)
                game.step()
            else:
                user_input = input("\nPress Enter to step, 'auto' for auto mode, 'quit' to exit: ")
                if user_input.lower() == 'quit':
                    break
                elif user_input.lower() == 'auto':
                    auto_mode = True
                    print("Switched to automatic mode...")
                else:
                    game.step()
            
            # Check if population is zero
            if game.get_population() == 0:
                print("Population extinct! Game over.")
                break
                
    except KeyboardInterrupt:
        print("\nGame stopped by user.")

if __name__ == "__main__":
    main()