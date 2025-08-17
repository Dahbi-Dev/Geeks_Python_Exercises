import React from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from './inventorySlice';

export default function AddProduct() {
    const dispatch = useDispatch()
    
    const [data , setData] = React.useState({
        name: "",
        description: "",
        quantity: 0,
    })

    // handle change
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.type == "number" ? parseInt(e.target.value) : e.target.value,
        })
    };
    const AddProductHandler = () => {
        if (data.name === "" || data.description === "" || data.quantity === 0) {
            alert("Please fill in all the fields")
            return
        }
        dispatch(addProduct(data))
    }
    return (
        // tailwind
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Add Product</h1>
            <label htmlFor="name" className="text-sm font-bold">
                Name
            </label>
            <input type="text" id="name" name="name" className="border rounded p-2" onChange={handleChange} />
            <label htmlFor="description" className="text-sm font-bold">
                Description
            </label>
            <textarea id="description" name="description" className="border rounded p-2" onChange={handleChange}></textarea>
            <label htmlFor="quantity" className="text-sm font-bold">
                Quantity
            </label>
            <input type="number" id="quantity" name="quantity" className="border rounded p-2" onChange={handleChange} />
            <button onClick={AddProductHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Product
            </button>
        </div>
    )
}
