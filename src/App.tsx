import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore, UserType } from '@/stores/useAuthStore';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import MainDashboard from '@/pages/MainDashboard';
import MyTokens from '@/pages/MyTokens';
import Support from '@/pages/Support';
import Education from '@/pages/Education';
import RealEstateDashboard from '@/pages/RealEstateDashboard';
import BuyerDashboard from '@/pages/BuyerDashboard';
import KYC from '@/pages/KYC';

// Protected Route Component
function ProtectedRoute({ children, requiredType }: { children: React.ReactNode; requiredType?: UserType }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredType && user?.userType !== requiredType) {
    // Redirect to their dashboard
    if (user?.userType === 'REAL_ESTATE') {
      return <Navigate to="/dashboard/real-estate" replace />;
    } else if (user?.userType === 'BUYER') {
      return <Navigate to="/dashboard/buyer" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// No longer needed - removed automatic redirect

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check auth on mount

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Main Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/tokens"
            element={
              <ProtectedRoute>
                <MyTokens />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/education"
            element={
              <ProtectedRoute>
                <Education />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/real-estate"
            element={
              <ProtectedRoute requiredType="REAL_ESTATE">
                <RealEstateDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/buyer"
            element={
              <ProtectedRoute requiredType="BUYER">
                <BuyerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kyc"
            element={
              <ProtectedRoute>
                <KYC />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
