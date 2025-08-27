import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Shield, Code, Download, Eye, Menu, X, ArrowUp, Home, User, Briefcase, Settings, FolderOpen, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { LanguageProvider, useLanguage } from '../components/LanguageContext';
import AnimatedBackground from '../components/AnimatedBackground';
import Hero3DVisual from '../components/Hero3DVisual';
import LoadingScreen from '../components/LoadingScreen';
import About from '../components/About';
import Experience from '../components/Experience';
import Technologies from '../components/Technologies';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-gray-800/60 rounded-xl p-1.5 border border-gray-700/50 backdrop-blur-sm">
      <button
        onClick={() => setLanguage('tr')}
        className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 min-w-[40px] ${
          language === 'tr' 
            ? 'bg-emerald-500 text-black shadow-md' 
            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        TR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 min-w-[40px] ${
          language === 'en' 
            ? 'bg-emerald-500 text-black shadow-md' 
            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
        }`}
      >
        EN
      </button>
    </div>
  );
};

const AppContent = () => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('anasayfa');
  const [isLoading, setIsLoading] = useState(true);

  const navItems = [
    { id: 'anasayfa', label: t('nav.home'), icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'hakkimda', label: t('nav.about'), icon: <User className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'deneyim', label: t('nav.experience'), icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'teknolojiler', label: t('nav.technologies'), icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'portfolio', label: t('nav.portfolio'), icon: <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'iletisim', label: t('nav.contact'), icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> }
  ];

  // Scroll to top button visibility and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);

      // Active section tracking
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.burger-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Content */}
      <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
        {/* Animated 3D Background */}
        <AnimatedBackground />
      
      {/* Mobile-First Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Better sizing and positioning */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer flex-shrink-0"
              onClick={() => scrollToSection('anasayfa')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/logo2.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  STG
                </span>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 ml-2">
                  Solutions
                </span>
              </div>
            </motion.div>

            {/* Right Side Controls - Better spacing */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Language Toggle */}
              <LanguageToggle />
              
              {/* Burger Menu Button - Better design */}
              <div className="burger-menu-container">
                <motion.button 
                  className="relative p-3 rounded-xl bg-gray-800/60 hover:bg-gray-700/60 transition-all duration-300 border border-gray-700/50 hover:border-emerald-500/50 min-w-[48px] min-h-[48px] flex items-center justify-center group"
                  onClick={toggleMenu}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={20} className="text-emerald-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={20} className="text-white group-hover:text-emerald-400 transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Transparent Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 burger-menu-container"
          >
            {/* Transparent Background */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content - Better mobile padding */}
            <div className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-full max-w-sm mx-auto"
              >
                {/* Menu Header - Responsive text sizes */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-6 sm:mb-8 lg:mb-12"
                >
                  <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 mb-2">
                    {t('nav.navigation')}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base">{t('nav.explore')}</p>
                </motion.div>

                {/* Navigation Items - Better mobile touch targets */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                      whileHover={{ x: 10, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full flex items-center justify-center sm:justify-start gap-3 sm:gap-4 px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 rounded-2xl transition-all duration-300 group backdrop-blur-sm min-h-[48px] ${
                        activeSection === item.id 
                          ? 'bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-emerald-400 border border-emerald-500/50 shadow-lg shadow-emerald-500/20' 
                          : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
                      }`}
                    >
                      <div className={`transition-colors duration-300 flex-shrink-0 ${
                        activeSection === item.id ? 'text-emerald-400' : 'text-gray-400 group-hover:text-white'
                      }`}>
                        {item.icon}
                      </div>
                      <span className="font-medium text-sm sm:text-base">{item.label}</span>
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="active-menu-item"
                          className="ml-auto w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Contact Button - Touch-friendly */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="mt-6 sm:mt-8 lg:mt-12"
                >
                  <Button 
                    onClick={() => scrollToSection('iletisim')}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 rounded-2xl min-h-[48px]"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {t('nav.getInTouch')}
                  </Button>
                </motion.div>

                {/* Menu Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  className="mt-6 sm:mt-8 text-center"
                >
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t('footer.copyright')}
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 right-1/6 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 left-1/6 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Clean layout like the screenshot */}
      <section id="anasayfa" className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-b from-black via-gray-950 to-black pt-20 sm:pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
            
            {/* Left Content - Main hero content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left order-2 lg:order-1 flex flex-col justify-center space-y-8"
            >
              {/* Main Title */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                  <span className="block text-white">Sina Toprak</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400">
                    Güleç
                  </span>
                </h1>
              </div>
              
              {/* Subtitle */}
              <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium leading-relaxed">
                {t('hero.subtitle')}
              </h2>
              
              {/* Description */}
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg">
                {t('hero.description')}
              </p>

              {/* Feature List - Clean icon-text layout */}
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4 text-emerald-400"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <Monitor size={20} />
                  </div>
                  <span className="text-base font-medium">
                    {t('hero.webDevelopment')}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 text-emerald-400"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <Code size={20} />
                  </div>
                  <span className="text-base font-medium">
                    {t('hero.integrationAutomation')}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-4 text-emerald-400"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <Shield size={20} />
                  </div>
                  <span className="text-base font-medium">
                    {t('hero.cybersecurity')}
                  </span>
                </motion.div>
              </div>

              {/* CTA Buttons - Better responsive layout */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-none lg:max-w-xl">
                <Button 
                  onClick={() => {
                    // CV PDF dosyasını yeni sekmede aç
                    window.open('/Sina_Toprak_Güleç_CV.pdf', '_blank');
                    
                    // Aynı zamanda otomatik indirme başlat
                    const link = document.createElement('a');
                    link.href = '/Sina_Toprak_Güleç_CV.pdf';
                    link.download = 'Sina_Toprak_Güleç_CV.pdf';
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black flex items-center justify-center gap-2 sm:gap-3 w-full sm:flex-1 font-semibold text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 rounded-xl"
                >
                  <Download size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{t('hero.downloadCV')}</span>
                </Button>
                <Button 
                  onClick={() => scrollToSection('portfolio')}
                  variant="outline" 
                  className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black flex items-center justify-center gap-2 sm:gap-3 w-full sm:flex-1 font-semibold text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105 rounded-xl"
                >
                  <Eye size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{t('hero.viewProjects')}</span>
                </Button>
              </div>
            </motion.div>

            {/* Right Content - 3D Visual with Hero3DVisual component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="order-1 lg:order-2 h-[400px] lg:h-[600px] flex items-center justify-center"
            >
              <Hero3DVisual />
            </motion.div>
          </div>
        </div>

        {/* Background Effects - Minimal */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-32 h-32 lg:w-48 lg:h-48 bg-emerald-500/3 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/6 w-24 h-24 lg:w-32 lg:h-32 bg-cyan-500/3 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Experience Section */}
      <Experience />

      {/* Technologies Section */}
      <Technologies />

      {/* Portfolio Section */}
      <Portfolio />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="relative z-10 bg-gray-950/80 border-t border-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button - Touch-friendly */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 min-w-[48px] min-h-[48px]"
        >
          <ArrowUp size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        </motion.button>
      )}
      </div>
    </>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default Index;
