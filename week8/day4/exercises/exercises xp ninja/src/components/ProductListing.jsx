import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setSelectedCategory } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';

const ProductListing = () => {
    const dispatch = useDispatch();
    const { items, loading, error, categories, selectedCategory } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const filteredProducts = selectedCategory === 'All'
        ? items
        : items.filter(product => product.category === selectedCategory);

    const handleAddToCart = (product) => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        }));
    };

    const handleCategoryChange = (category) => {
        dispatch(setSelectedCategory(category));
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                fontSize: '1.2rem'
            }}>
                Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                color: '#e74c3c',
                fontSize: '1.2rem'
            }}>
                Error: {error}
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Our Products</h2>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: selectedCategory === category ? '#3498db' : '#ecf0f1',
                                color: selectedCategory === category ? 'white' : '#2c3e50',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            transition: 'transform 0.2s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover'
                            }}
                        />

                        <div style={{ padding: '1rem' }}>
                            <h3 style={{
                                margin: '0 0 0.5rem 0',
                                fontSize: '1.1rem',
                                color: '#2c3e50'
                            }}>
                                {product.name}
                            </h3>

                            <p style={{
                                margin: '0 0 0.5rem 0',
                                color: '#7f8c8d',
                                fontSize: '0.9rem',
                                lineHeight: '1.4'
                            }}>
                                {product.description}
                            </p>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                <span style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    color: '#27ae60'
                                }}>
                                    ${product.price}
                                </span>

                                <span style={{
                                    fontSize: '0.8rem',
                                    color: product.stock > 5 ? '#27ae60' : '#e74c3c',
                                    fontWeight: 'bold'
                                }}>
                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                </span>
                            </div>

                            <button
                                onClick={() => handleAddToCart(product)}
                                disabled={product.stock === 0}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: product.stock > 0 ? '#3498db' : '#95a5a6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#7f8c8d',
                    fontSize: '1.1rem'
                }}>
                    No products found in this category.
                </div>
            )}
        </div>
    );
};

export default ProductListing;
