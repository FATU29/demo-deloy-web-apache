import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SettingsPage from "./pages/SettingsPage";
import { Card, CardContent } from "./components/ui/card";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
        <Card className="max-w-7xl mx-auto">
          <CardContent className="p-6 sm:p-8 lg:p-12 space-y-8">
            {/* Header */}
            <header className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                ✨ My Todo List
              </h1>
              <Separator className="max-w-md mx-auto" />
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                Stay organized and productive with your personal task manager
              </p>
            </header>

            <Separator />

            {/* Navigation */}
            <Navigation />

            <Separator />

            {/* Page Content */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>

            <Separator className="mt-auto" />

            {/* Footer */}
            <footer className="text-center">
              <Card className="bg-muted/50">
                <CardContent className="py-4">
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
                    <span>Built with</span>
                    <span className="font-semibold">React</span>
                    <span>•</span>
                    <span className="font-semibold">TypeScript</span>
                    <span>•</span>
                    <span className="font-semibold">PostgreSQL</span>
                  </p>
                </CardContent>
              </Card>
            </footer>
          </CardContent>
        </Card>
      </main>
    </BrowserRouter>
  );
}

export default App;
