import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { useLanguage } from './LanguageContext';
const Technologies = () => {
  const {
    t
  } = useLanguage();
  const techCategories = [{
    id: 1,
    title: t('technologies.frontend'),
    techs: [{
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
    }, {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
    }, {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    }, {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
    }]
  }, {
    id: 2,
    title: t('technologies.backend'),
    techs: [{
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    }, {
      name: "C#",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
    }, {
      name: "ASP.NET",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg"
    }, {
      name: "Entity Framework",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg"
    }]
  }, {
    id: 3,
    title: t('technologies.toolsDatabase'),
    techs: [{
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    }, {
      name: "VS Code",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
    }, {
      name: "Visual Studio",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg"
    }, {
      name: "SQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
    }, {
      name: "MSSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg"
    }, {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    }]
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  const techVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };
  return <section id="teknolojiler" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="container mx-auto relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400">
              {t('technologies.title')}
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('technologies.subtitle')}
          </p>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }}>
          {techCategories.map(category => <motion.div key={category.id} variants={cardVariants} className="h-full">
              <Card className="p-4 sm:p-6 border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-800/40 hover:border-emerald-500/30 hover:from-gray-900/90 hover:to-gray-800/60 transition-all duration-500 backdrop-blur-sm group h-full flex flex-col bg-gray-950">
                <motion.h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-white text-center group-hover:text-emerald-400 transition-colors duration-300" initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4,
              delay: 0.2
            }}>
                  {category.title}
                </motion.h3>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 justify-items-center flex-1">
                  {category.techs.map((tech, index) => <motion.div key={tech.name} className="flex flex-col items-center text-center group/tech w-full" variants={techVariants} initial="hidden" whileInView="visible" viewport={{
                once: true
              }} transition={{
                delay: index * 0.1
              }} whileHover={{
                y: -8,
                scale: 1.05
              }}>
                      <div className="tech-icon mb-2 sm:mb-3 group-hover/tech:scale-110 transition-all duration-300 p-2 sm:p-3 rounded-xl group-hover/tech:bg-emerald-500/10 group-hover/tech:shadow-lg group-hover/tech:shadow-emerald-500/20">
                        <img src={tech.icon} alt={tech.name} className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 transition-all duration-300 group-hover/tech:brightness-110 group-hover/tech:drop-shadow-lg" onError={e => {
                    e.currentTarget.style.display = 'none';
                  }} />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300 group-hover/tech:text-emerald-400 transition-colors font-medium leading-tight break-words text-center px-1">
                        {tech.name}
                      </span>
                    </motion.div>)}
                </div>
              </Card>
            </motion.div>)}
        </motion.div>
        
        <motion.div className="mt-12 sm:mt-16 text-center" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.5
      }}>
          <p className="text-gray-300 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed px-4">
            {t('technologies.description')}
          </p>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 sm:w-80 sm:h-80 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
    </section>;
};
export default Technologies;