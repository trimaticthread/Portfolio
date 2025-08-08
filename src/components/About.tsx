import { motion } from 'framer-motion';
import { Target, Zap, Heart, Coffee } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  const workingStyle = [
    {
      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: t('about.detailOriented')
    },
    {
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: t('about.fastProblemSolving')
    },
    {
      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: t('about.techPassion')
    },
    {
      icon: <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />,
      text: t('about.continuousLearning')
    }
  ];

  return (
    <section id="hakkimda" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400">
              {t('about.title')}
            </span>
          </h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Ana İçerik */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900/60 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-white">
              {t('about.greeting')}
            </h3>
            <div className="space-y-4 sm:space-y-6 text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              <p>
                {t('about.intro1')}
                <span className="text-emerald-400 font-semibold">{t('about.intro2')}</span>
                {t('about.intro3')}
              </p>
              <p>
                {t('about.intro4')}
                <span className="text-emerald-400 font-semibold">{t('about.intro5')}</span>
                {t('about.intro6')}
                <span className="text-cyan-400">C#, ASP.NET, React ve TypeScript</span>
                {t('about.intro7')}
              </p>
              <p>
                {t('about.intro8')}
              </p>
            </div>
          </motion.div>

          {/* Çalışma Tarzım */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-800/30 p-6 sm:p-8"
          >
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8 text-center">
              {t('about.workingStyle')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {workingStyle.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-colors border border-gray-700/30"
                >
                  <div className="text-emerald-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-gray-300 font-medium text-sm sm:text-base">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
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

export default About;
