
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
      <div className="glass-card p-8 text-center max-w-sm mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-app-pink">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! Sidan hittades inte</p>
        <a href="/" className="inline-flex items-center text-app-pink hover:text-pink-400 transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Gå tillbaka
        </a>
      </div>
    </div>
  );
};

export default NotFound;
