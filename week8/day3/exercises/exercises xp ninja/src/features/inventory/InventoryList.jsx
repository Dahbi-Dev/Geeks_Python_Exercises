import { useDispatch, useSelector } from 'react-redux'
import { removeProduct, updateQuantity } from './inventorySlice'

export default function inventoryList() {
    const products = useSelector(state => state.inventory.products)
    const dispatch = useDispatch()

    const handleRemove = (id) => {
        dispatch(removeProduct({ id }))
    }
    const handleUpdateQuantity = (id, quantity) => {
        const q = parseInt(quantity)
        dispatch(updateQuantity({ id, quantity: q }))
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Inventory</h1>
            <div className="flex flex-col gap-4">
                {!products.length && (
                    <p className="text-sm text-gray-500">No products in inventory</p>
                )}
                {products.map((product) => (
                    <div key={product.id} className="flex gap-4 items-center">
                        <div className="flex-1">
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p className="text-sm">
                                {product.description}
                            </p>
                        </div>
                        <div className="flex">
                            <button onClick={() => handleUpdateQuantity(product.id, parseInt(product.quantity) - 1)} className="py-1 px-4 border rounded-l-md">
                                -
                            </button>
                            <input type="number" value={product.quantity} onChange={(e) => handleUpdateQuantity(product.id, parseInt(e.target.value))} className="p-3 px-4 border text-sm font-bold flex-shrink" />
                            <button onClick={() => handleUpdateQuantity(product.id, parseInt(product.quantity) + 1)} className="py-1 px-4 border rounded-r-md">
                                +
                            </button>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleRemove(product.id)}
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
