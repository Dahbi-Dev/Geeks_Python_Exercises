import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../store/slices/cartSlice';
import { simulateLogout } from '../store/slices/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { totalQuantity } = useSelector(state => state.cart);

    const handleLogout = () => {
        dispatch(simulateLogout());
    };

    const handleCartClick = () => {
        dispatch(toggleCart());
    };

    return (
        <header style={{
            backgroundColor: '#2c3e50',
            color: 'white',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>🛒 E-Commerce Store</h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {isAuthenticated && (
                    <span style={{ fontSize: '0.9rem' }}>
                        Welcome, {user?.name}!
                    </span>
                )}

                <button
                    onClick={handleCartClick}
                    style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        position: 'relative',
                        fontSize: '0.9rem'
                    }}
                >
                    🛒 Cart
                    {totalQuantity > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            backgroundColor: '#f39c12',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 'bold'
                        }}>
                            {totalQuantity}
                        </span>
                    )}
                </button>

                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#95a5a6',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
