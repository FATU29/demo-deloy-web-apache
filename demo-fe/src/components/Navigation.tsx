import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, Home, Info, Settings } from "lucide-react";

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: Home,
    },
    {
      path: "/about",
      label: "About",
      icon: Info,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <Card>
      <nav className="p-4 flex items-center justify-between gap-4">
        {/* Back Button */}
        {!isHomePage && (
          <Button
            onClick={() => navigate(-1)}
            variant="secondary"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        )}

        {/* Navigation Links */}
        <section className="flex items-center gap-2 flex-1 justify-end">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                asChild
                variant={isActive ? "default" : "outline"}
              >
                <Link to={item.path}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </section>
      </nav>
    </Card>
  );
}
