
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Code, Lock, Server, Wifi, Activity, Zap } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Hero3DVisual = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [terminalText, setTerminalText] = useState('');

  const codeSnippets = [
    {
      title: 'security.py',
      language: 'python',
      code: `# Penetration Testing
import nmap
import requests

def scan_network(target):
    nm = nmap.PortScanner()
    result = nm.scan(target, '22-443')
    return result

def check_vulnerabilities():
    # SQL Injection test
    payload = "' OR '1'='1"
    response = requests.get(url, params=payload)
    return response.status_code`
    },
    {
      title: 'webapp.tsx',
      language: 'typescript',
      code: `// React TypeScript
interface SecurityConfig {
  encryption: boolean;
  tokenExpiry: number;
  csrf: boolean;
}

const AuthProvider: React.FC = () => {
  const [isSecure, setIsSecure] = useState(true);
  
  const validateToken = async (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  };
  
  return <AuthContext.Provider value={{ validateToken }} />;
};`
    },
    {
      title: 'server.js',
      language: 'javascript',
      code: `// Node.js Backend
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

app.post('/api/secure', authenticate, (req, res) => {
  // Secure endpoint
  res.json({ success: true, data: sanitize(req.body) });
});`
    }
  ];

  const terminalCommands = [
    '$ sudo nmap -sS -O target.com',
    '$ hydra -l admin -P wordlist.txt ssh://target.com',
    '$ sqlmap -u "http://target.com/search?q=test"',
    '$ nikto -h http://target.com',
    '$ gobuster dir -u http://target.com -w wordlist.txt'
  ];

  // Terminal typing animation
  useEffect(() => {
    let currentCommand = 0;
    let currentChar = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const typeTerminal = () => {
      const command = terminalCommands[currentCommand];
      
      if (isDeleting) {
        setTerminalText(command.substring(0, currentChar - 1));
        currentChar--;
        timeout = setTimeout(typeTerminal, 50);
        
        if (currentChar === 0) {
          isDeleting = false;
          currentCommand = (currentCommand + 1) % terminalCommands.length;
          timeout = setTimeout(typeTerminal, 500);
        }
      } else {
        setTerminalText(command.substring(0, currentChar + 1));
        currentChar++;
        timeout = setTimeout(typeTerminal, 100);
        
        if (currentChar === command.length) {
          timeout = setTimeout(() => {
            isDeleting = true;
            typeTerminal();
          }, 2000);
        }
      }
    };

    typeTerminal();
    return () => clearTimeout(timeout);
  }, []);

  // Auto-switch tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % codeSnippets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Main 3D Container */}
      <div className="relative w-full max-w-2xl mx-auto">
        
        {/* Floating Security Dashboard */}
        <motion.div
          initial={{ opacity: 0, rotateX: -15, z: -100 }}
          animate={{ opacity: 1, rotateX: 0, z: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-0 right-0 w-64 h-40 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-300"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="p-4 h-full">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">{t('hero3d.securityMonitor')}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{t('hero3d.firewall')}</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{t('hero3d.sslTls')}</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-300"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{t('hero3d.intrusionDetection')}</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-700"></div>
              </div>
              
              {/* Mini chart */}
              <div className="mt-3 flex items-end gap-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-sm"
                    style={{ height: `${Math.random() * 20 + 10}px` }}
                    animate={{ height: `${Math.random() * 20 + 10}px` }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Code Editor */}
        <motion.div
          initial={{ opacity: 0, rotateY: 15, z: -50 }}
          animate={{ opacity: 1, rotateY: 0, z: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
          style={{ transformStyle: 'preserve-3d', height: '400px' }}
        >
          {/* Window Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <Code className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-300">{t('hero3d.codeEditor')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-800/30 border-b border-gray-700/30">
            {codeSnippets.map((snippet, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === index
                    ? 'bg-gray-700/50 text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {snippet.title}
              </button>
            ))}
          </div>

          {/* Code Content */}
          <div className="p-4 h-full overflow-hidden">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <pre className="text-sm text-gray-300 leading-relaxed font-mono">
                <code className="language-typescript">
                  {codeSnippets[activeTab].code}
                </code>
              </pre>
            </motion.div>
          </div>

          {/* Syntax highlighting overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-6 w-16 h-0.5 bg-emerald-400/30 rounded animate-pulse"></div>
            <div className="absolute top-32 left-8 w-12 h-0.5 bg-cyan-400/30 rounded animate-pulse delay-500"></div>
            <div className="absolute top-44 left-12 w-20 h-0.5 bg-blue-400/30 rounded animate-pulse delay-1000"></div>
          </div>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, rotateX: 15, z: -100 }}
          animate={{ opacity: 1, rotateX: 0, z: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-0 left-0 w-80 h-32 bg-black/90 backdrop-blur-xl rounded-lg border border-emerald-500/30 shadow-2xl shadow-emerald-500/10 transform -rotate-2 hover:rotate-0 transition-transform duration-300"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="p-3 h-full">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-emerald-400">{t('hero3d.terminal')}</span>
            </div>
            
            <div className="font-mono text-xs text-green-400">
              <div className="flex items-center gap-1">
                <span className="text-emerald-400">root@kali:</span>
                <span className="text-cyan-400">~</span>
                <span className="text-white"># {terminalText}</span>
                <div className="w-2 h-4 bg-emerald-400 animate-pulse"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Tech Icons */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotateY: [0, 10, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-0 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-blue-500/30 flex items-center justify-center"
        >
          <Server className="w-8 h-8 text-blue-400" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotateY: [0, -10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border border-emerald-500/30 flex items-center justify-center"
        >
          <Lock className="w-7 h-7 text-emerald-400" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotateX: [0, 15, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-0 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl border border-cyan-500/30 flex items-center justify-center"
        >
          <Wifi className="w-6 h-6 text-cyan-400" />
        </motion.div>

        {/* Connecting Lines */}
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg className="w-full h-full">
            <motion.path
              d="M 100 100 Q 200 50 300 100 T 500 100"
              stroke="url(#gradient)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};

export default Hero3DVisual;
