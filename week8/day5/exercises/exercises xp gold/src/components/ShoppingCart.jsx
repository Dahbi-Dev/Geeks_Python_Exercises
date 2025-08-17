import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { selectProducts, selectCartItems, calculateTotalPrice } from '../store/selectors';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(calculateTotalPrice);

    const handleAddToCart = useCallback((product) => {
        dispatch(addToCart(product));
    }, [dispatch]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Shopping Cart</h1>

            <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Products</h2>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {products.map(product => (
                            <div key={product.id} style={{
                                border: '1px solid #ddd',
                                padding: '15px',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0' }}>{product.name}</h3>
                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                                        ${product.price}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <h2>Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <div>
                            <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
                                {cartItems.map(item => (
                                    <div key={item.id} style={{
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                                            <p style={{ margin: 0 }}>
                                                ${item.price} x {item.quantity}
                                            </p>
                                        </div>
                                        <div style={{ fontWeight: 'bold' }}>
                                            ${item.price * item.quantity}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                borderTop: '2px solid #333',
                                paddingTop: '15px',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                textAlign: 'right'
                            }}>
                                Total: ${totalPrice}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
