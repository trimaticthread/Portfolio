
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Building2, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageContext";

const Experience = () => {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Experience data with proper language support
  const experiences = [
    {
      id: 1,
      company: "ÖLÇSAN Teknoloji",
      position: language === 'tr' ? "Siber Güvenlik Stajyeri" : "Cyber Security Intern",
      duration: language === 'tr' ? "Ağu 2023 - Eyl 2023" : "Aug 2023 - Sep 2023",
      location: language === 'tr' ? "İstanbul, Türkiye" : "Istanbul, Turkey",
      description: language === 'tr' 
        ? "BGYS (Bilgi Güvenliği Yönetim Sistemi) ve siber güvenlik alanında kapsamlı eğitim aldım. Network güvenliği konularında uzmanlaştım ve penetrasyon testi deneyimi kazandım."
        : "I received comprehensive training in ISMS (Information Security Management System) and cybersecurity. I specialized in network security and gained penetration testing experience.",
      achievements: language === 'tr' 
        ? [
            "BGYS (Bilgi Güvenliği Yönetim Sistemi) eğitimi aldım.",
            "Network ve Network Güvenliği konularında eğitim aldım.",
            "Siber Güvenlik eğitimi aldım.",
            "Localde ve Hack The Box (HTB) platformunda makine çözümleri yaptım."
          ]
        : [
            "Received ISMS (Information Security Management System) training.",
            "Trained in Network and Network Security topics.",
            "Received Cybersecurity training.",
            "Solved machines locally and on Hack The Box (HTB) platform."
          ],
      tech: ["BGYS/ISMS", "Team Work", "Cybersecurity", "Pentest", "HTB", "Network Security"],
      color: "from-emerald-600 via-teal-600 to-cyan-600"
    },
    {
      id: 2,
      company: "Ciner Yayın Holding",
      position: language === 'tr' ? "Bilgi Sistem Yöneticisi Stajyeri" : "Information System Manager Intern",
      duration: language === 'tr' ? "Ağustos 2022" : "August 2022",
      location: language === 'tr' ? "İstanbul, Türkiye" : "Istanbul, Turkey",
      description: language === 'tr'
        ? "BT operasyonlarının sorunsuz çalışması için teknik destek sağladım. IT sistemlerini izledim, bakımını yaptım ve sorunları verimli bir şekilde çözdüm."
        : "I provided technical support for the smooth operation of IT operations. I monitored, maintained IT systems and solved problems efficiently.",
      achievements: language === 'tr'
        ? [
            "BT operasyonlarının sorunsuz çalışması için teknik destek sağladım.",
            "IT sistemlerini izledim, bakımını yaptım ve sorunları verimli bir şekilde çözdüm.",
            "IT altyapı gereksinimlerini yönettim ve donanım bileşenleri tedarik ettim.",
            "Organizasyon içindeki tüm ağ, donanım ve yazılım bilgilerinin kayıtlarını tutup organize ettim."
          ]
        : [
            "Provided technical support for smooth IT operations.",
            "Monitored, maintained IT systems and solved problems efficiently.",
            "Managed IT infrastructure requirements and procured hardware components.",
            "Kept and organized records of all network, hardware and software information within the organization."
          ],
      tech: ["Linux", "LAN", "SQL", "DNS", "DHCP", "Firewall", "TCP"],
      color: "from-blue-600 via-indigo-600 to-purple-600"
    }
  ];

  const nextPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev + 1) % experiences.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const prevPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev - 1 + experiences.length) % experiences.length);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section id="deneyim" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400">
              {t('experience.title')}
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        {/* Mobile Experience List */}
        <div className="block lg:hidden space-y-6 max-w-2xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-gradient-to-br ${exp.color} rounded-2xl p-1 shadow-2xl`}
            >
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 space-y-4 text-white h-full">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">{exp.company}</h3>
                    <p className="text-base sm:text-lg font-semibold text-white/90">{exp.position}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-white/70 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
                
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4">{exp.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-white text-sm">{t('experience.keyAchievements')}</h4>
                  <ul className="space-y-1">
                    {exp.achievements.slice(0, 2).map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-white/90">
                        <div className="w-1 h-1 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-white text-sm">{t('experience.technologies')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white">
                        {tech}
                      </span>
                    ))}
                    {exp.tech.length > 4 && (
                      <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white">
                        +{exp.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop 3D Book Container */}
        <div className="relative hidden lg:flex justify-center items-center mt-8">
          <div className="relative w-full max-w-6xl flex items-center justify-center">
            {/* Book Base */}
            <motion.div 
              className="relative flex"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Left Page */}
              <div 
                className={`relative w-[28rem] h-[36rem] bg-gradient-to-br from-gray-900 to-gray-800 rounded-l-2xl shadow-2xl transition-all duration-700 transform-gpu ${isAnimating ? 'animate-pulse' : ''}`}
                style={{ zIndex: 10 }}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="text-center mb-6 flex-shrink-0">
                    <Building2 className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t('experience.title')}
                    </h3>
                    <p className="text-gray-300 text-xs">
                      {t('experience.subtitle')}
                    </p>
                  </div>

                  {/* Experience Timeline */}
                  <div className="flex-1 relative pr-2">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-cyan-400"></div>
                    
                    {experiences.map((exp, index) => (
                      <div 
                        key={exp.id}
                        className={`relative mb-6 pl-12 transition-all duration-300 ${
                          index === currentPage ? 'opacity-100 scale-105' : 'opacity-60 scale-95'
                        }`}
                      >
                        <div className={`absolute left-4.5 w-3 h-3 rounded-full -translate-x-1/2 ${
                          index === currentPage ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-500/50' : 'bg-gray-500'
                        } transition-all duration-300`}></div>
                        
                        <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 border border-gray-600/50 hover:border-emerald-500/30 transition-colors">
                          <h4 className="font-semibold text-white text-xs mb-1 break-words">{exp.company}</h4>
                          <p className="text-emerald-400 text-xs mb-1 break-words">{exp.position}</p>
                          <p className="text-gray-400 text-xs break-words">{exp.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Page Shadow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-l-2xl pointer-events-none"></div>
              </div>

              {/* Right Page */}
              <div 
                className={`relative w-[28rem] h-[36rem] bg-gradient-to-br ${experiences[currentPage].color} rounded-r-2xl shadow-2xl transition-all duration-700 transform-gpu ${isAnimating ? 'animate-pulse' : ''}`}
                style={{ zIndex: 20 }}
              >
                {/* Right Page Content */}
                <div className="p-6 flex flex-col h-full text-white relative z-10 overflow-hidden">
                  {/* Company Info */}
                  <div className="mb-4 flex-shrink-0">
                    <h3 className="text-xl font-bold mb-1 break-words">{experiences[currentPage].company}</h3>
                    <p className="text-lg font-semibold mb-2 text-white/90 break-words">{experiences[currentPage].position}</p>
                    
                    <div className="flex flex-col gap-1 text-xs text-white/80 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span className="break-words">{experiences[currentPage].duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="break-words">{experiences[currentPage].location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4 flex-shrink-0">
                    <p className="text-white/90 text-xs leading-relaxed break-words">
                      {experiences[currentPage].description}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="mb-4 flex-1 min-h-0 overflow-hidden">
                    <h4 className="font-semibold mb-2 text-white text-sm">{t('experience.keyAchievements')}</h4>
                    <div className="h-full max-h-40 overflow-y-auto pr-2 experience-scroll">
                      <ul className="space-y-1.5">
                        {experiences[currentPage].achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-white/90">
                            <div className="w-1 h-1 bg-white/60 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="break-words leading-tight">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex-shrink-0">
                    <h4 className="font-semibold mb-2 text-white text-sm">{t('experience.technologies')}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {experiences[currentPage].tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-xs bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white break-words"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-4 right-4 w-12 h-12 border border-white/30 rounded-lg rotate-12 animate-spin-slow" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/30 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/10 rounded-lg animate-ping" />
                </div>

                {/* Page Reflection */}
                <div className="absolute inset-0 bg-gradient-to-l from-white/10 via-transparent to-transparent rounded-r-2xl pointer-events-none"></div>
              </div>

              {/* Book Spine */}
              <div className="absolute left-1/2 top-0 w-4 h-[36rem] bg-gradient-to-b from-gray-600 to-gray-800 -translate-x-1/2 z-30 shadow-lg">
                <div className="w-full h-full bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
              </div>
            </motion.div>

            {/* Navigation Controls */}
            <Button
              onClick={prevPage}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-600 backdrop-blur-sm w-12 h-12 rounded-full p-0 disabled:opacity-50 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              onClick={nextPage}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-600 backdrop-blur-sm w-12 h-12 rounded-full p-0 disabled:opacity-50 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Page Indicators - Desktop Only */}
        <div className="hidden lg:flex justify-center mt-8 gap-3">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentPage(index);
                  setTimeout(() => setIsAnimating(false), 800);
                }
              }}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 disabled:opacity-50 hover:scale-125 ${
                index === currentPage
                  ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-500/50'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 sm:w-80 sm:h-80 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
    </section>
  );
};

export default Experience;
