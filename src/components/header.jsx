import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    let isDark;

    if (savedTheme) {
      isDark = savedTheme === "dark";
    } else {
      // Check system preference
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    setIsDarkTheme(isDark);
    updateTheme(isDark);
  }, []);

  const updateTheme = (isDark) => {
    const htmlElement = document.documentElement;
    
    if (isDark) {
      htmlElement.classList.add("dark");
      document.body.classList.add("dark-theme");
    } else {
      htmlElement.classList.remove("dark");
      document.body.classList.remove("dark-theme");
    }
  };

  const toggleTheme = () => {
    const newIsDark = !isDarkTheme;
    setIsDarkTheme(newIsDark);
    updateTheme(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "#home", icon: "ri-home-5-line", label: "Home" },
    { href: "#skills", icon: "ri-trophy-line", label: "Skills" },
    { href: "#qualification", icon: "ri-book-open-line", label: "Qualification" },
    { href: "#services", icon: "ri-briefcase-line", label: "Services" },
    { href: "#projects", icon: "ri-image-line", label: "Projects" },
    { href: "#contact", icon: "ri-chat-3-line", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-2xl border-b border-gradient-to-r from-blue-800/50 to-purple-800/50 dark:from-blue-900/60 dark:to-purple-900/60 shadow-2xl shadow-black/50 dark:shadow-black/70 animate__animated animate__fadeInDown transition-all duration-300" style={{backgroundImage: 'linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,58,138,0.1) 50%, rgba(88,27,140,0.1) 100%)'}}>
      <nav className="flex justify-between items-center px-4 sm:px-6 py-3.5 max-w-7xl mx-auto w-full">
        {/* Logo with Enhanced Design */}
        <a href="#home" className="flex items-center gap-3 group transform hover:scale-105 transition-transform duration-300 whitespace-nowrap">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-600/70 group-hover:shadow-blue-500/100 transition-shadow duration-300 group-hover:rotate-12">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"></div>
            D
          </div>
          <div className="flex flex-col">
            <span className="hidden sm:inline text-sm font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wider">DEBAJYOTI SAMANTA</span>
            <span className="hidden md:inline text-xs text-gray-400 dark:text-gray-500 font-bold tracking-widest">DEVELOPER</span>
          </div>
        </a>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-2 lg:gap-1 items-center flex-wrap justify-center flex-1 mx-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-gray-200 dark:text-gray-300 hover:text-blue-300 dark:hover:text-blue-300 transition-colors duration-300 text-sm lg:text-base whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-transparent dark:hover:from-blue-900/40 dark:hover:to-transparent group font-semibold"
              >
                <i className={`${link.icon} text-base lg:text-lg group-hover:scale-110 transition-transform duration-300`}></i>
                <span className="hidden lg:inline font-medium">{link.label}</span>
                {/* Animated underline */}
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-yellow-400 dark:text-yellow-400 hover:shadow-lg shadow-lg shadow-black/40 dark:shadow-blue-700/30 transition-all duration-300 hover:scale-110 group border border-gray-600 dark:border-gray-700 font-bold"
            aria-label="Toggle theme"
            title={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur transition-opacity duration-300"></div>
            {isDarkTheme ? (
              <i className="ri-sun-line text-lg relative z-10"></i>
            ) : (
              <i className="ri-moon-line text-lg relative z-10"></i>
            )}
          </button>
          
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden cursor-pointer text-xl text-gray-200 dark:text-white relative p-2.5 rounded-lg transition-all duration-300 group border border-transparent hover:border-blue-600/50 dark:hover:border-blue-500/50 hover:bg-blue-900/30 dark:hover:bg-blue-900/40 font-bold"
          >
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 blur transition-opacity duration-300"></div>
            <i className={`ri-${isMenuOpen ? "close" : "menu-4"}-line relative z-10 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-900 to-gray-950 dark:from-gray-950 dark:to-gray-900 border-t border-gradient-to-r from-blue-800/40 to-purple-800/40 dark:from-blue-900/50 dark:to-purple-900/50 shadow-2xl shadow-black/60 animate__animated animate__slideInDown\">
          <ul className="flex flex-col py-3 px-4 space-y-1.5">
            {navLinks.map((link, index) => (
              <li key={link.href} style={{ animationDelay: `${index * 0.05}s` }} className="animate__animated animate__fadeInLeft">
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-gray-200 dark:text-gray-300 hover:text-blue-300 dark:hover:text-blue-300 bg-gradient-to-r from-transparent to-transparent hover:from-blue-900/30 hover:to-blue-900/20 dark:hover:from-blue-900/40 dark:hover:to-blue-900/20 px-4 py-3 rounded-lg transition-all duration-300 font-bold group border border-transparent hover:border-blue-600/50 dark:hover:border-blue-600/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  <i className={`${link.icon} text-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10`}></i>
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}