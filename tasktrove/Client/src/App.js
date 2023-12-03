import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/User/Login/Login";
import Register from "./components/User/Register/Register";
import Home from "./components/User/Home/Home";
import Header from "./components/User/header/Header";
import B_Profile from "./components/User/B_profile/B_Profile";
import Footer from "./components/User/footer/Footer";
import Services from "./components/User/services/Services";
import Contact from "./components/User/contact/Contact";
import Company_Home from "./components/Company_Home/Company_Home";
import Realestate from "./components/User/services_pages/Realestate";
import Rentals from "./components/User/services_pages/Rentals";
import Movers from "./components/User/services_pages/Movers";
import Interior from "./components/User/services_pages/Interior";
import Event from "./components/User/services_pages/Event";
import Brand from "./components/User/services_pages/Brand";
import CompanyMessage from "./components/User/CompanyMessage/CompanyMessage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/header" element={<Header/>}/>
          <Route path="/profile" element={<B_Profile/>}/>
          <Route path="/footer" element={<Footer/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/realestate" element={<Realestate/>}/>
          <Route path="/brand" element={<Brand/>}/>
          <Route path="/event" element={<Event/>}/>
          <Route path="/interior" element={<Interior/>}/>
          <Route path="/movers" element={<Movers/>}/>
          <Route path="/rentals" element={<Rentals/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/company-home" element={<Company_Home/>}/>
          <Route path="/company-message" element={<CompanyMessage />} />
          {/* <Route path="/contact" element={<Contact_Us/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
