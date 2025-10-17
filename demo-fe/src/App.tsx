import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-7xl relative z-10">
          {/* Header */}
          <header className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
            <div className="inline-block">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-3 sm:mb-4">
                ✨ My Todo List
              </h1>
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto">
              Stay organized and productive with your personal task manager
            </p>
          </header>

          {/* Navigation */}
          <Navigation />

          {/* Page Content */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>

          {/* Footer */}
          <footer className="mt-12 sm:mt-16 text-center text-gray-500 text-xs sm:text-sm">
            <div className="bg-white/40 backdrop-blur-sm rounded-lg py-4 px-6">
              <p className="flex items-center justify-center gap-2 flex-wrap">
                <span>Built with</span>
                <span className="font-semibold text-blue-600">React</span>
                <span>•</span>
                <span className="font-semibold text-blue-600">TypeScript</span>
                <span>•</span>
                <span className="font-semibold text-blue-600">PostgreSQL</span>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
