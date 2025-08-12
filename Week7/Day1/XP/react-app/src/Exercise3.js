import React, { Component } from 'react';
import './Exercise.css';

class Exercise extends Component {
  render() {
    const style_header = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    return (
      <div>
        {/* Exercise 3: HTML Tags in React */}
        <h1 style={style_header}>This is a Header</h1>
        
        <p>This is a Paragraph</p>
        
        <a href="https://www.google.com">This is a Link</a>
        
        <form>
          <h3>This is a Form:</h3>
          <p>Enter your name:</p>
          <input type="text" />
          <button type="submit">Submit</button>
        </form>
        
        <div>
          <h3>Here is an Image:</h3>
          <img 
            src="https://via.placeholder.com/300x200/555555/ffffff?text=React+Logo" 
            alt="React Logo" 
            style={{ margin: '20px 0' }}
          />
        </div>
        
        <div>
          <h3>This is a List:</h3>
          <ul>
            <li>Coffee</li>
            <li>Tea</li>
            <li>Milk</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Exercise; 