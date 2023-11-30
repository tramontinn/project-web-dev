import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './homepage';
import MarketItemsCRUD from './MarketItemsCRUD';
import ListSuppliers from './ListSuppliers';
import CrudDonators from './CrudDonators';
import ListDonators from './ListDonators';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/MarketItemsCRUD" element={<MarketItemsCRUD />} />
        <Route path="/ListSuppliers" element={<ListSuppliers />} />
        <Route path="/CrudDonators" element={<CrudDonators />} />
        <Route path="/ListDonators" element={<ListDonators />} />
      </Routes>
    </Router>
  );
}

export default App;