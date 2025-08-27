
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Send, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useLanguage } from './LanguageContext';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

// EmailJS'yi initialize et - Gerçek public key ile
emailjs.init("hc6_p9pVjoDzzlpRq");

// Ana Contact bileşeni
const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  // Rate limiting - 2 dakikada bir mesaj
  const RATE_LIMIT_MS = 2 * 60 * 1000; // 2 dakika

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting kontrolü
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const remainingTime = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000 / 60);
      toast.error(`${t('contact.rateLimit')} ${remainingTime} ${t('contact.rateLimitWait')}`);
      return;
    }

    // Enhanced input validation
    if (formData.name.trim().length < 2) {
      toast.error(t('contact.nameMinLength'));
      return;
    }

    if (formData.subject.trim().length < 3) {
      toast.error(t('contact.subjectMinLength'));
      return;
    }

    if (formData.message.trim().length < 10) {
      toast.error(t('contact.messageMinLength'));
      return;
    }

    // Enhanced email format validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t('contact.invalidEmail'));
      return;
    }

    // Spam protection - basic content filtering
    const spamKeywords = ['bitcoin', 'casino', 'loan', 'viagra', 'pharmacy'];
    const messageContent = formData.message.toLowerCase();
    const hasSpam = spamKeywords.some(keyword => messageContent.includes(keyword));
    
    if (hasSpam) {
      toast.error(t('contact.spamDetected'));
      return;
    }

    setIsSubmitting(true);
    console.log('📧 E-posta gönderimi başlatılıyor...', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      messageLength: formData.message.length
    });
    
    try {
      // EmailJS initialization check
      console.log('🔧 EmailJS yapılandırması kontrol ediliyor...');
      
      // EmailJS ile e-posta gönderimi - SMTP ayarları ekran görüntüsünden alındı
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        to_name: 'Sina Toprak Güleç',
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        reply_to: formData.email.trim()
      };

      console.log('📨 EmailJS parametreleri hazırlandı:', templateParams);

      // EmailJS send - Ekran görüntüsündeki bilgilerle
      console.log('🚀 EmailJS gönderimi başlatılıyor...');
      const response = await emailjs.send(
        'service_i12y0x5',           // Service ID 
        'template_acadkp4',         // Template ID - ekran görüntüsünden
        templateParams,
        'hc6_p9pVjoDzzlpRq'         // Gerçek public key
      );

      console.log('✅ EmailJS gönderim başarılı:', response);

      setFormData({ name: '', email: '', subject: '', message: '' });
      setLastSubmitTime(now);
      toast.success(t('contact.successMessage'));
      
    } catch (error: unknown) {
      console.error('❌ E-posta gönderme hatası:', error);
      const err = error as Error & { status?: number; text?: string };
      console.log('Hata detayları:', {
        name: err?.name,
        message: err?.message,
        status: err?.status,
        text: err?.text
      });
      
      // Detaylı hata analizi
      let errorMessage = 'Mesaj gönderilirken bir hata oluştu.';
      
      if (err?.status === 400 || err?.message?.includes('400')) {
        errorMessage = 'EmailJS yapılandırma hatası. Template veya Service ID kontrol edilmeli.';
      } else if (err?.status === 401 || err?.message?.includes('401')) {
        errorMessage = 'EmailJS yetkilendirme hatası. Public Key geçersiz.';
      } else if (err?.status === 403 || err?.message?.includes('403')) {
        errorMessage = 'Bu e-posta hizmeti için yetkiniz yok.';
      } else if (err?.status === 422 || err?.message?.includes('422')) {
        errorMessage = 'E-posta template parametreleri eksik veya hatalı.';
      } else if (err?.status === 429 || err?.message?.includes('429')) {
        errorMessage = 'Çok fazla istek gönderildi. Lütfen birkaç dakika bekleyin.';
      } else if (err?.status && err.status >= 500) {
        errorMessage = 'EmailJS sunucu hatası. Lütfen daha sonra tekrar deneyin.';
      } else if (err?.message?.includes('network') || err?.message?.includes('fetch')) {
        errorMessage = 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.';
      } else if (err?.message?.includes('template') || err?.message?.includes('Template')) {
        errorMessage = 'E-posta template bulunamadı. Yapılandırma kontrol edilmeli.';
      }
      
      toast.error(`🚨 ${errorMessage} ${t('contact.errorFallback')}`);
      
      // Development modunda detaylı hata göster
      if (process.env.NODE_ENV === 'development') {
        console.log('📋 Detaylı hata bilgisi:', {
          message: err?.message,
          status: err?.status,
          text: err?.text,
          stack: err?.stack
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.emailTitle'),
      value: "toprakgulec34@gmail.com",
      href: "mailto:toprakgulec34@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: t('contact.githubTitle'),
      value: "trimaticthread",
      href: "https://github.com/trimaticthread",
      color: "from-gray-600 to-gray-700"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: t('contact.linkedinTitle'),
      value: "sina-toprak-gulec-26761923b",
      href: "https://linkedin.com/in/sina-toprak-gulec-26761923b",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: t('contact.instagramTitle'),
      value: "@toprakgulecc02",
      href: "https://instagram.com/toprakgulecc02",
      color: "from-pink-500 to-purple-600"
    }
  ];

  return (
    <section id="iletisim" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-black via-gray-950 to-black">
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
              {t('contact.title')}
            </span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                  {t('contact.contactInfo')}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  {t('contact.description')}
                </p>
              </div>

              {/* Contact Methods - Mobile optimized */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    {/* Glowing card */}
                    <div className="relative bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-transparent overflow-hidden min-h-[120px] sm:min-h-[140px]">
                      {/* Animated gradient border on hover */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${method.color} p-[1px]`}>
                          <div className="w-full h-full bg-gray-900/90 rounded-xl" />
                        </div>
                      </div>
                      
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`} />
                      
                      {/* Content */}
                      <div className="relative z-10 text-center h-full flex flex-col justify-center">
                        <div className={`relative inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-r ${method.color} mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 mx-auto`}>
                          {/* Mobile Glow Effect - Always visible on mobile */}
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${method.color} blur-lg opacity-60 sm:opacity-0 sm:group-hover:opacity-80 transition-opacity duration-300 animate-pulse`} />
                          {/* Desktop Glow Effect - Only on hover */}
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${method.color} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                          {/* Icon Container */}
                          <div className="relative z-10">
                            {method.icon}
                          </div>
                        </div>
                        <h4 className="font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-emerald-400 transition-all duration-300 text-sm sm:text-base">
                          {method.title}
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300 break-words px-1">
                          {method.value}
                        </p>
                      </div>
                      
                      {/* Reflection effect */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-900/80 border-2 border-gray-800 rounded-2xl backdrop-blur-sm shadow-2xl">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg">
                      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {t('contact.formTitle')}
                    </h3>
                  </div>

                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                          {t('contact.name')}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          maxLength={50}
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-gray-800/60 border-2 border-gray-600 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 transition-colors h-10 sm:h-12 text-sm sm:text-base rounded-lg"
                          placeholder={t('contact.namePlaceholder')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                          {t('contact.email')}
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-gray-800/60 border-2 border-gray-600 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 transition-colors h-10 sm:h-12 text-sm sm:text-base rounded-lg"
                          placeholder={t('contact.emailPlaceholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                        {t('contact.subject')}
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        maxLength={100}
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="bg-gray-800/60 border-2 border-gray-600 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 transition-colors h-10 sm:h-12 text-sm sm:text-base rounded-lg"
                        placeholder={t('contact.subjectPlaceholder')}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                        {t('contact.message')}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        maxLength={1000}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-gray-800/60 border-2 border-gray-600 text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none transition-colors text-sm sm:text-base rounded-lg"
                        placeholder={t('contact.messagePlaceholder')}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs ${formData.message.length < 10 ? 'text-red-400' : 'text-gray-500'}`}>
                          {formData.message.length < 10 ? `${t('contact.minChars')} ${10 - formData.message.length} ${t('contact.moreChars')}` : t('contact.sufficient')}
                        </span>
                        <span className={`text-xs ${formData.message.length > 950 ? 'text-yellow-400' : 'text-gray-500'}`}>
                          {formData.message.length}/1000
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base rounded-lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>{t('contact.sending')}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{t('contact.sendMessage')}</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
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

export default ContactForm;
