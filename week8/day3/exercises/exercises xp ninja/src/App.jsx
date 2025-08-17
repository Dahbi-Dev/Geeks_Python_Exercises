import './App.css'
import AddProduct from './features/inventory/AddProduct';
import InventoryList from "./features/inventory/InventoryList";

function App() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 md:col-span-1">
        <InventoryList />
      </div>
      <div className='col-span-1 md:col-span-2'>
        <AddProduct />
      </div>
    </div>
  )
}

export default App
