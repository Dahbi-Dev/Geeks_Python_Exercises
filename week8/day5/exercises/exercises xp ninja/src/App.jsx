import { Provider } from 'react-redux';
import { store } from './store/store';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import FilterTabs from './components/FilterTabs';
import TodoStats from './components/TodoStats';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Redux Todo App
            </h1>
          </div>

          <AddTodo />
          <FilterTabs />
          <TodoStats />
          <TodoList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
