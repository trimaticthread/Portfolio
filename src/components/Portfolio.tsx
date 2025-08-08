import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { ExternalLink, Calendar, User, Github, Globe, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from './LanguageContext';

interface ProjectDetails {
  client: string;
  year: string;
  technologies: string[];
  link: string;
  longDescription: string;
  github?: string;
  demo?: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  gradient: string;
  details: ProjectDetails;
  featured?: boolean;
  status: "completed" | "in-progress" | "planning";
}

const Portfolio = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: t('projects.documentVerification.title'),
      category: t('projects.documentVerification.category'),
      description: t('projects.documentVerification.description'),
      image: "/turkakk.png",
      gradient: "from-violet-600 via-purple-600 to-indigo-600",
      featured: true,
      status: "completed",
      details: {
        client: t('projects.documentVerification.client'),
        year: "2025",
        technologies: ["TypeScript", "C#/.Net Core Api", "MSSQL Server", "Entity Framework", "React", "Git & GitHub"],
        link: "https://example.com/project",
        github: "https://github.com/trimaticthread/Turkak-New-Ui",
        demo: "https://demo.example.com",
        longDescription: t('projects.documentVerification.longDescription')
      }
    },
    {
      id: 2,
      title: t('projects.hotelBooking.title'),
      category: t('projects.hotelBooking.category'),
      description: t('projects.hotelBooking.description'),
      image: "/hote.png",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      featured: true,
      status: "completed",
      details: {
        client: t('projects.hotelBooking.client'),
        year: "2024",
        technologies: ["C#", "MSSQL Server", "Windows Forms", "Git & GitHub"],
        link: "https://example.com/hotel",
        github: "https://github.com/trimaticthread/HotelRegistration",
        longDescription: t('projects.hotelBooking.longDescription')
      }
    }
  ];

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "planning":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return t('portfolio.completed');
      case "in-progress":
        return t('portfolio.inProgress');
      case "planning":
        return t('portfolio.planning');
      default:
        return "Unknown";
    }
  };

  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-black via-gray-950 to-black">
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
              {t('portfolio.title')}
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('portfolio.description')}
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Project Display */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className={`bg-gradient-to-br ${projects[currentIndex].gradient} p-1 rounded-2xl sm:rounded-3xl shadow-2xl`}>
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 min-h-[500px] sm:min-h-[600px] lg:min-h-[500px] flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
                      
                      {/* Project Info */}
                      <div className="w-full lg:flex-1 space-y-4 sm:space-y-6 text-white text-center lg:text-left order-2 lg:order-1">
                        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                            {projects[currentIndex].featured && (
                              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs font-semibold border border-white/30">
                                <Star className="w-3 h-3" />
                                {t('portfolio.featured')}
                              </div>
                            )}
                            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(projects[currentIndex].status)}`}>
                              {getStatusText(projects[currentIndex].status)}
                            </div>
                          </div>
                          
                          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight">
                            {projects[currentIndex].title}
                          </h3>
                          
                          <p className="text-emerald-200 font-medium text-sm sm:text-base">
                            {projects[currentIndex].category}
                          </p>
                        </div>

                        <p className="text-white/90 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {projects[currentIndex].description}
                        </p>

                        {/* Technologies */}
                        <div className="space-y-2 sm:space-y-3">
                          <h4 className="font-semibold text-sm text-white/80">{t('portfolio.technologies')}</h4>
                          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                            {projects[currentIndex].details.technologies.slice(0, 4).map((tech) => (
                              <span 
                                key={tech} 
                                className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/20 text-white rounded-full border border-white/30 backdrop-blur-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                            {projects[currentIndex].details.technologies.length > 4 && (
                              <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-white/20 text-white rounded-full border border-white/30 backdrop-blur-sm font-medium">
                                +{projects[currentIndex].details.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                          <Button 
                            onClick={() => openProjectDetails(projects[currentIndex])}
                            className="w-full sm:flex-1 bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 backdrop-blur-sm font-semibold flex items-center justify-center gap-2 text-sm sm:text-base py-3 px-4 sm:px-6 min-h-[44px]"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">{t('portfolio.viewDetails')}</span>
                            <span className="sm:hidden">{t('portfolio.details')}</span>
                          </Button>
                        </div>
                      </div>

                      {/* Project Visual - Mobile optimized */}
                      <div className="w-full lg:flex-1 lg:max-w-md order-first lg:order-last">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl sm:rounded-2xl" />
                          <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/20 aspect-video sm:aspect-[4/3] lg:min-h-[300px] overflow-hidden">
                            {projects[currentIndex].image !== "/placeholder.svg" ? (
                              <div className="absolute inset-0">
                                <img 
                                  src={projects[currentIndex].image}
                                  alt={projects[currentIndex].title}
                                  className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-105"
                                  loading="lazy"
                                  onError={(e) => {
                                    console.log('Image failed to load:', projects[currentIndex].image);
                                    // Optionally handle broken images
                                  }}
                                />
                                {/* Image overlay for better text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl sm:rounded-2xl" />
                              </div>
                            ) : (
                              <div className="text-center text-white/60 flex items-center justify-center h-full p-4 sm:p-6 lg:p-8">
                                <div>
                                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 mx-auto mb-2 sm:mb-3 lg:mb-4 bg-white/10 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center">
                                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12" />
                                  </div>
                                  <p className="text-xs sm:text-sm">{t('portfolio.projectImage')}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <Button
              onClick={prevProject}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-gray-900/80 hover:bg-gray-800/80 text-white border border-gray-700 backdrop-blur-sm rounded-full p-0 shadow-lg hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            
            <Button
              onClick={nextProject}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-gray-900/80 hover:bg-gray-800/80 text-white border border-gray-700 backdrop-blur-sm rounded-full p-0 shadow-lg hover:scale-110 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>

          {/* Project Thumbnails */}
          <div className="mt-6 sm:mt-8 flex justify-center gap-2 sm:gap-4 overflow-x-auto pb-4">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                onClick={() => goToProject(index)}
                className={`flex-shrink-0 relative group ${
                  index === currentIndex ? 'ring-2 ring-emerald-400' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-20 h-12 sm:w-24 sm:h-16 rounded-lg bg-gradient-to-br ${project.gradient} p-0.5`}>
                  <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="text-white text-xs font-medium text-center px-1 sm:px-2">
                      {project.title.split(' ').slice(0, 2).join(' ')}
                    </div>
                  </div>
                </div>
                {index === currentIndex && (
                  <motion.div
                    layoutId="active-project"
                    className="absolute inset-0 rounded-lg border-2 border-emerald-400"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Project Counter */}
          <div className="text-center mt-4 sm:mt-6">
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} / {projects.length}
            </span>
          </div>
        </div>
      </div>

      <ProjectDetailsDialog 
        project={selectedProject} 
        open={selectedProject !== null} 
        onOpenChange={() => setSelectedProject(null)} 
      />

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 sm:w-80 sm:h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
    </section>
  );
};

interface ProjectDetailsDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectDetailsDialog = ({ project, open, onOpenChange }: ProjectDetailsDialogProps) => {
  const { t } = useLanguage();
  
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-gray-900/95 border-gray-700/50 max-h-[90vh] overflow-y-auto backdrop-blur-xl mx-4 sm:mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white mb-2 pr-6">{project.title}</DialogTitle>
          <DialogDescription className="text-emerald-400 font-medium text-sm sm:text-base">{project.category}</DialogDescription>
        </DialogHeader>

        <div className="relative h-32 sm:h-48 md:h-64 bg-gradient-to-br from-gray-800 to-gray-900 mb-4 sm:mb-6 overflow-hidden rounded-lg border border-gray-700/50">
          {project.image !== "/placeholder.svg" ? (
            <div className="absolute inset-0">
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="text-center text-gray-400 flex items-center justify-center h-full">
              <div>
                <Globe className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base">{t('portfolio.projectImage')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{project.details.longDescription}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4">
            <div>
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">{t('portfolio.client')}</h4>
              <p className="text-gray-300 text-sm sm:text-base">{project.details.client}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">{t('portfolio.year')}</h4>
              <p className="text-gray-300 text-sm sm:text-base">{project.details.year}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-emerald-400 mb-3">{t('portfolio.technologies')}</h4>
            <div className="flex flex-wrap gap-2">
              {project.details.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="text-xs sm:text-sm bg-gray-800/50 text-gray-300 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg border border-gray-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {project.details.github && (
            <div className="pt-2 sm:pt-4">
              <Button 
                className="bg-gray-900 hover:bg-gray-800 border-gray-700 text-gray-300 text-sm sm:text-base"
                onClick={() => window.open(project.details.github, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                {t('portfolio.github')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Portfolio;
