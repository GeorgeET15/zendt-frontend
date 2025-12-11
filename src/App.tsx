import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import LaunchScreen from "./components/LaunchScreen";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import DashboardSummary from "./components/dashboard/Summary";
import DashboardSubscriptions from "./components/dashboard/Subscriptions";
import DashboardClipcards from "./components/dashboard/Clipcards";
import DashboardDocuments from "./components/dashboard/Documents";
import DashboardQuestionnaires from "./components/dashboard/Questionnaires";
import DashboardActivity from "./components/dashboard/Activity";
import DashboardTransactions from "./components/dashboard/Transactions";
import ProfileHub from "./components/dashboard/ProfileHub";
import PrivacyPolicyPage from "./components/dashboard/PrivacyPolicyPage";
import TermsPage from "./components/dashboard/TermsPage";
import BusinessProfilePage from "./components/dashboard/BusinessProfilePage";
import SettingsPage from "./components/dashboard/SettingsPage";
import ProfileSettingsPage from "./components/dashboard/ProfileSettingsPage";
import KycPage from "./components/dashboard/KycPage";
import PricingPage from "./components/dashboard/PricingPage";
import AboutPage from "./components/dashboard/AboutPage";
import HelpPage from "./components/dashboard/HelpPage";
import VirtualAccountPage from "./components/dashboard/VirtualAccountPage";
import AddVirtualAccountPage from "./components/dashboard/AddVirtualAccountPage";
import InvoicePage from "./components/dashboard/InvoicePage";
import PaymentLinksPage from "./components/dashboard/PaymentLinksPage";
import PaymentLinkCreatePage from "./components/dashboard/PaymentLinkCreatePage";
import CardManagementPage from "./components/dashboard/CardManagementPage";
import ExplorePage from "./components/dashboard/ExplorePage";
import SettlementDetailsPage from "./components/dashboard/SettlementDetailsPage";
import BusinessProfileEditPage from "./components/dashboard/BusinessProfileEditPage";
import AddClientPage from "./components/dashboard/AddClientPage";
import BankAccountsPage from "./components/dashboard/BankAccountsPage";
import BankAccountDetailPage from "./components/dashboard/BankAccountDetailPage";
import PaymentPagesOptions from "./components/dashboard/PaymentPagesOptions";
import ComingSoonPage from "./components/dashboard/ComingSoonPage";
import RewardsPage from "./components/dashboard/RewardsPage";
import SpendingDetailsPage from "./components/dashboard/SpendingDetailsPage";
import InvoiceSuccessPage from "./components/dashboard/InvoiceSuccessPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useLocation } from "react-router-dom";

function RequireAuth() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function SplashGuard() {
  const location = useLocation();
  const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
  
  // If user hasn't seen splash in this session and not already on splash screen
  if (!hasSeenSplash && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
}

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LaunchScreen />} />
          <Route path="/splash" element={<SplashScreen />} />
          
          <Route element={<SplashGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<DashboardSummary />} />
              <Route path="summary" element={<Navigate to="home" replace />} />
              <Route path="card-management" element={<CardManagementPage />} />
              <Route path="subscriptions" element={<DashboardSubscriptions />} />
              <Route path="clipcards" element={<DashboardClipcards />} />
              <Route path="documents" element={<DashboardDocuments />} />
              <Route path="questionnaires" element={<DashboardQuestionnaires />} />
              <Route path="activity" element={<DashboardActivity />} />
              <Route path="transactions" element={<DashboardTransactions />} />
              <Route path="profile" element={<ProfileHub />} />
              <Route path="profile-settings" element={<ProfileSettingsPage />} />
              <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="business-profile" element={<BusinessProfilePage />} />
              <Route path="business-profile/edit" element={<BusinessProfileEditPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="bank-accounts" element={<BankAccountsPage />} />
              <Route path="bank-account/:id" element={<BankAccountDetailPage />} />
              <Route path="kyc" element={<KycPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="help" element={<HelpPage />} />
              <Route path="virtual-account" element={<VirtualAccountPage />} />
              <Route path="virtual-account/new" element={<AddVirtualAccountPage />} />
              <Route path="invoice" element={<InvoicePage />} />
              <Route path="invoice/success" element={<InvoiceSuccessPage />} />
              <Route path="payment-links" element={<PaymentLinksPage />} />
              <Route path="payment-links/new" element={<PaymentLinkCreatePage />} />
              <Route path="payment-pages" element={<PaymentPagesOptions />} />
              <Route path="add-client" element={<AddClientPage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="rewards" element={<RewardsPage />} />
              <Route path="spending-details" element={<SpendingDetailsPage />} />
              <Route path="coming-soon" element={<ComingSoonPage />} />
              <Route path="settlement" element={<SettlementDetailsPage />} />
            </Route>
          </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
