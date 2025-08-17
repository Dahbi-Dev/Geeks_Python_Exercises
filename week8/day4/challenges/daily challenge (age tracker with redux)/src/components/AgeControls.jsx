import { useDispatch, useSelector } from 'react-redux';
import { ageUpAsync, ageDownAsync, resetAge } from '../store/ageSlice';
import './AgeControls.css';

const AgeControls = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.age.loading);

    const handleAgeUp = () => {
        dispatch(ageUpAsync());
    };

    const handleAgeDown = () => {
        dispatch(ageDownAsync());
    };

    const handleReset = () => {
        dispatch(resetAge());
    };

    return (
        <div className="age-controls">
            <h3>Age Controls</h3>
            <form className="controls-form" onSubmit={(e) => e.preventDefault()}>
                <div className="button-group">
                    <button
                        type="button"
                        onClick={handleAgeUp}
                        disabled={loading}
                        className="age-button age-up"
                    >
                        {loading ? 'Processing...' : 'Age Up (+1)'}
                    </button>

                    <button
                        type="button"
                        onClick={handleAgeDown}
                        disabled={loading}
                        className="age-button age-down"
                    >
                        {loading ? 'Processing...' : 'Age Down (-1)'}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={loading}
                        className="age-button reset-button"
                    >
                        Reset Age
                    </button>
                </div>
            </form>

            {loading && (
                <p className="loading-text">
                    Please wait while we update your age...
                </p>
            )}
        </div>
    );
};

export default AgeControls;
