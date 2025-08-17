import { useSelector } from 'react-redux'
import { selectAllCategories } from '../store/selectors'

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
    const categories = useSelector(selectAllCategories)

    return (
        <div className="category-selector">
            <h3>Filter by Category</h3>
            <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="category-select"
            >
                <option value="all">All Categories</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <div className="category-chips">
                <button
                    className={`category-chip ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => onCategoryChange('all')}
                >
                    All
                </button>
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`category-chip ${selectedCategory === category.id ? 'active' : ''}`}
                        style={{
                            backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                            borderColor: category.color
                        }}
                        onClick={() => onCategoryChange(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategorySelector
