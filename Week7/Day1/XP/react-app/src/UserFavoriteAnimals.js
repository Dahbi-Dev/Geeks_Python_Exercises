import React, { Component } from 'react';

class UserFavoriteAnimals extends Component {
  render() {
    return (
      <div>
        <h3>Favorite Animals:</h3>
        <ul>
          {this.props.favAnimals.map((animal, index) => (
            <li key={index}>{animal}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserFavoriteAnimals; 