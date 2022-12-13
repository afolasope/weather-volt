import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Details, Error, Home } from './pages';
import { Form, Header } from './components';
import { useCitiesContext } from './context/cities_context';


function App() {
  const { isLoading } = useCitiesContext();

  return (
    <Router>
      <main className="wrapper">
        <header>
          <Header />
          <div className="header-bottom">
            <Form />
          </div>
        </header>
        {isLoading && (
          <svg
            className="loading"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="35" />
          </svg>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:cityId" element={<Details />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
