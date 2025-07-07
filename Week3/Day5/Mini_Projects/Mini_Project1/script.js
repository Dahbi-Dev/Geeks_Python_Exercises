let selectedColor = '#ffffff';
let isDrawing = false;

// Initialize the grid
function initializeGrid() {
    const grid = document.getElementById('drawingGrid');
    grid.innerHTML = '';
    
    // Create 40x25 grid (1000 squares)
    for (let i = 0; i < 1000; i++) {
        const square = document.createElement('div');
        square.className = 'grid-square';
        square.style.backgroundColor = '#ffffff';
        
        // Add mouse event listeners
        square.addEventListener('mousedown', startDrawing);
        square.addEventListener('mouseover', draw);
        square.addEventListener('mouseup', stopDrawing);
        
        grid.appendChild(square);
    }
}

// Color palette functionality
function initializeColorPalette() {
    const colorSquares = document.querySelectorAll('.color-square');
    
    colorSquares.forEach(square => {
        square.addEventListener('click', function() {
            // Remove selected class from all squares
            colorSquares.forEach(s => s.classList.remove('selected'));
            
            // Add selected class to clicked square
            this.classList.add('selected');
            
            // Update selected color
            selectedColor = this.dataset.color;
            
            // Update color indicator
            const colorIndicator = document.querySelector('.color-indicator');
            colorIndicator.style.backgroundColor = selectedColor;
        });
    });
}

// Drawing functionality
function startDrawing(e) {
    isDrawing = true;
    this.style.backgroundColor = selectedColor;
    e.preventDefault(); // Prevent text selection
}

function draw(e) {
    if (isDrawing) {
        this.style.backgroundColor = selectedColor;
    }
}

function stopDrawing() {
    isDrawing = false;
}

// Prevent drawing when mouse leaves the grid
document.addEventListener('mouseup', function() {
    isDrawing = false;
});

// Clear canvas functionality
function clearCanvas() {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.backgroundColor = '#ffffff';
    });
}

// Prevent context menu on right click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    initializeGrid();
    initializeColorPalette();
});
