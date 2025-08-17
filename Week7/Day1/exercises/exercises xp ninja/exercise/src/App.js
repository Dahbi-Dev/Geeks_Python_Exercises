import logo from "./logo.svg";
import "./App.css";
import "./output.css";
import Header from "./components/Header";
import Card from "./components/Card";
import Contact from "./components/Contact";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Card title="About the Company" icon="fa-building"></Card>
            <Card title="Our Values" icon="fa-earth-africa"></Card>
            <Card title="Our Mission" icon="fa-building-columns"></Card>
            <Contact></Contact>
        </div>
    );
}

export default App;
