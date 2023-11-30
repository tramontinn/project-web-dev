import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './homepage';
import MarketItemsCRUD from './MarketItemsCRUD';
import ListarFornecedores from './ListarFornecedores';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/MarketItemsCRUD" element={<MarketItemsCRUD />} />
        <Route path="/ListarFornecedores" element={<ListarFornecedores />} />
      </Routes>
    </Router>
  );
}

export default App;