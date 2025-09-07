import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Create from './components/Create';
import CreateStore from './components/Create-Store';
import DomainQuestion from './components/DomainQestion';
import DomainSetup from './components/DomainSetup';
import DomainVerify from './components/DomainVerify';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<SignIn />} />
        <Route path="/signup" element={<Create />} />
        <Route path="/Create-Store" element={<CreateStore />} />
        <Route path="/domain-question" element={<DomainQuestion />} />
        <Route path="/domain-setup" element={<DomainSetup />} />
        <Route path="/domain-verify" element={<DomainVerify />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
