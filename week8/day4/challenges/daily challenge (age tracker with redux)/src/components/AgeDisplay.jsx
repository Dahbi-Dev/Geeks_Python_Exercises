import { useSelector } from 'react-redux';
import './AgeDisplay.css';

const AgeDisplay = () => {
    const age = useSelector((state) => state.age.value);
    const loading = useSelector((state) => state.age.loading);

    return (
        <div className="age-display">
            <h2>Current Age:</h2>
            {loading ? (
                <div className="loading-container">
                    <p>Updating age...</p>
                </div>
            ) : (
                <div className="age-value">
                    <span className="age-number">{age}</span>
                    <span className="age-text">years old</span>
                </div>
            )}
        </div>
    );
};

export default AgeDisplay;
