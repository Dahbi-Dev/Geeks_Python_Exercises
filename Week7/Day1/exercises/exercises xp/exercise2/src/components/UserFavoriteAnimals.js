import React from 'react';

class UserFavoriteAnimals extends React.Component {
    render() {
        return (
            <div>
                <h4>My Favorite Animals</h4>
                <ul style={{ listStyleType: 'none' }}>
                    {this.props.favoriteAnimals.map((animal, index) => (
                        <li key={index}>{animal}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UserFavoriteAnimals;