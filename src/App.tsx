import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Assuming Sonner is used elsewhere
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page Imports
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PlaylistViewPage from "./pages/PlaylistViewPage";
import LibraryPage from "./pages/LibraryPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// Mock authentication check - replace with actual auth logic
const isAuthenticated = () => {
  // For this example, let's assume if a user navigates away from /auth, they are "logged in"
  // Or, more simply for now, always return true to allow access to protected routes
  // In a real app, this would check localStorage, context, etc.
  return true; // For now, let's allow access. Control access via navigation from AuthPage
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // User not authenticated, redirect to login page
    return <Navigate to="/auth" replace />;
  }
  return children;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth page is public */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/playlist/:id" 
            element={
              <ProtectedRoute>
                <PlaylistViewPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/library" 
            element={
              <ProtectedRoute>
                <LibraryPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback for any other routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;