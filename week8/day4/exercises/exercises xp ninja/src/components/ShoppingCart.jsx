import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart, closeCart } from '../store/slices/cartSlice';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const { items, totalQuantity, totalAmount, isOpen } = useSelector(state => state.cart);

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCloseCart = () => {
        dispatch(closeCart());
    };

    const handleCheckout = () => {
        alert(`Checkout successful! Total: $${totalAmount.toFixed(2)}`);
        dispatch(clearCart());
        dispatch(closeCart());
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '400px',
            height: '100vh',
            backgroundColor: 'white',
            boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                padding: '1rem',
                backgroundColor: '#2c3e50',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h3 style={{ margin: 0 }}>Shopping Cart ({totalQuantity})</h3>
                <button
                    onClick={handleCloseCart}
                    style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '0.25rem'
                    }}
                >
                    ×
                </button>
            </div>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem'
            }}>
                {items.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: '#7f8c8d'
                    }}>
                        <p>Your cart is empty</p>
                        <p style={{ fontSize: '0.9rem' }}>Add some products to get started!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {items.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />

                                <div style={{ flex: 1 }}>
                                    <h4 style={{
                                        margin: '0 0 0.5rem 0',
                                        fontSize: '0.9rem',
                                        color: '#2c3e50'
                                    }}>
                                        {item.name}
                                    </h4>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                backgroundColor: '#e74c3c',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            -
                                        </button>

                                        <span style={{
                                            minWidth: '30px',
                                            textAlign: 'center',
                                            fontSize: '0.9rem'
                                        }}>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                                backgroundColor: '#27ae60',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: '#27ae60',
                                            fontSize: '0.9rem'
                                        }}>
                                            ${item.totalPrice.toFixed(2)}
                                        </span>

                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            style={{
                                                backgroundColor: '#e74c3c',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {items.length > 0 && (
                <div style={{
                    padding: '1rem',
                    borderTop: '1px solid #eee',
                    backgroundColor: '#f8f9fa'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                    }}>
                        <span>Total:</span>
                        <span style={{ color: '#27ae60' }}>
                            ${totalAmount.toFixed(2)}
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexDirection: 'column'
                    }}>
                        <button
                            onClick={handleCheckout}
                            style={{
                                padding: '0.75rem',
                                backgroundColor: '#27ae60',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Checkout
                        </button>

                        <button
                            onClick={handleClearCart}
                            style={{
                                padding: '0.5rem',
                                backgroundColor: '#95a5a6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
