import "./App.css";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PackagesPage from "./components/PackagesPage";
import GalleryPage from "./components/GalleryPage";
import ServicePage from "./components/ServicePage";
import ContactPage from "./components/ContactPage";
import BookingForm from "./components/BookingForm";
import BookingOccasion from "./components/BookingOccasion";
import DecorationPage from "./components/DecorationPage";
import { SelectedSlotProvider } from "./contexts/SelectedSlotProvider";
// import PhonePeScannerPayment from "./components/PhonePeScannerPayment";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import PaymentPage from "./components/PaymentGateway";
import Toaster from "./components/Toaster";
import TermsCondition from "./components/TermsCondition";
import OfflineBooking from "./components/OfflineBooking";
import PhonePeScannerPayment from "./components/PhonePeScannerPayment";

function App() {
  return (
    <>
      {/* <Router> basename="/my-app" */}
      <SelectedSlotProvider>
        <Router>
          <Toaster />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/bookingform" element={<BookingForm />} />
            <Route path="/bookingoccastion" element={<BookingOccasion />} />
            <Route path="/decoration" element={<DecorationPage />} />
            <Route path="/offlinePayment" element={<PhonePeScannerPayment />} />
            <Route path="/paymentgateway" element={<PaymentPage />} />
            <Route path="/admin/adminlogin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/terms-condition" element={<TermsCondition />} />
            <Route path="/admin/offlinebook" element={<OfflineBooking />} />
          </Routes>
        </Router>
      </SelectedSlotProvider>
    </>
  );
}

export default App;
