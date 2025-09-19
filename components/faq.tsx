"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Sparkles, ArrowRight, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: number;
  company: string;
  question: string;
  answer: string;
  keywords: string[];
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const PayZoneGroupFAQ: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load from localStorage
    const saved = typeof window !== 'undefined' ? localStorage.getItem('faqChatHistory') : null;
    return saved
      ? JSON.parse(saved, (key, value) => (key === 'timestamp' ? new Date(value) : value))
      : [
          {
            id: 1,
            text: "Hello! I'm Grok, your AI assistant for the PayZone Group. Ask about Payzon IT Services, Payzon Marketing, Payzon Shoppy, Payzon API, Sadaiv Satya News, or Sadaiv Yuva Foundation. Try typing or speaking your question!",
            sender: 'bot',
            timestamp: new Date(),
          },
        ];
  });
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [suggestions, setSuggestions] = useState<FAQItem[]>([]);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);

  const faqData: FAQItem[] = [
    // PayZone (Payments)
    { id: 1, company: 'PayZone', question: 'How secure are my transactions with PayZone?', answer: 'PayZone uses bank-grade 256-bit SSL encryption and is PCI DSS compliant. All transactions are processed through secure gateways with real-time fraud detection and multi-layer security protocols.', keywords: ['secure', 'transactions', 'security', 'encryption', 'fraud'] },
    { id: 2, company: 'PayZone', question: 'What payment methods are supported by PayZone?', answer: 'We support all major payment methods including UPI, Net Banking, Credit/Debit Cards (Visa, MasterCard, RuPay), Digital Wallets, and NEFT/RTGS transfers with instant processing.', keywords: ['payment methods', 'supported', 'UPI', 'cards', 'wallets'] },
    { id: 3, company: 'PayZone', question: 'How fast are PayZone transactions?', answer: 'Most transactions are processed instantly. UPI payments reflect within seconds, while bank transfers typically complete within 2-4 hours during business hours.', keywords: ['fast', 'transactions', 'speed', 'instant', 'time'] },

    // Payzon IT Services (Web Development)
    { id: 4, company: 'Payzon IT Services', question: 'What web development services does Payzon IT Services offer?', answer: 'Payzon IT Services provides custom website design, full-stack development, CMS integration, and maintenance services for businesses of all sizes.', keywords: ['web development', 'services', 'website', 'design', 'development'] },
    { id: 5, company: 'Payzon IT Services', question: 'How can I integrate my existing system with Payzon IT Services?', answer: 'We offer seamless integration with platforms like WordPress, React, Node.js, and provide custom APIs with detailed documentation.', keywords: ['integrate', 'system', 'integration', 'API', 'documentation'] },

    // Payzon Marketing (Digital Marketing)
    { id: 6, company: 'Payzon Marketing', question: 'What digital marketing services are available?', answer: 'Payzon Marketing offers SEO, PPC advertising, social media management, content marketing, email campaigns, and analytics-driven strategies.', keywords: ['digital marketing', 'services', 'SEO', 'PPC', 'social media'] },
    { id: 7, company: 'Payzon Marketing', question: 'How does Payzon Marketing measure campaign success?', answer: 'We use advanced analytics to track ROI, conversion rates, engagement metrics, and provide real-time dashboards.', keywords: ['measure', 'campaign', 'success', 'analytics', 'ROI'] },

    // Payzon Shoppy (E-commerce)
    { id: 8, company: 'Payzon Shoppy', question: 'What features does Payzon Shoppy offer for online stores?', answer: 'Payzon Shoppy provides e-commerce platforms with inventory management, secure checkout, multi-vendor support, and AI-recommended products.', keywords: ['features', 'online stores', 'e-commerce', 'inventory', 'checkout'] },
    { id: 9, company: 'Payzon Shoppy', question: 'How secure is shopping on Payzon Shoppy?', answer: 'We implement SSL encryption, two-factor authentication, and regular security audits to protect customer data.', keywords: ['secure', 'shopping', 'security', 'encryption', 'authentication'] },

    // Payzon API (Fintech API)
    { id: 10, company: 'Payzon API', question: 'What fintech solutions does Payzon API provide?', answer: 'Payzon API offers APIs for payment processing, fraud detection, lending platforms, and blockchain integration.', keywords: ['fintech', 'solutions', 'API', 'payment', 'fraud'] },
    { id: 11, company: 'Payzon API', question: 'How to integrate Payzon API into my app?', answer: 'Our developer portal provides SDKs for multiple languages, sandbox environments, and 24/7 support.', keywords: ['integrate', 'API', 'app', 'SDK', 'sandbox'] },

    // Sadaiv Satya (News)
    { id: 12, company: 'Sadaiv Satya', question: 'What is Sadaiv Satya news platform?', answer: 'Sadaiv Satya is a real-time news platform delivering fast coverage across India with AI-powered insights.', keywords: ['Sadaiv Satya', 'news', 'platform', 'coverage', 'AI'] },
    { id: 13, company: 'Sadaiv Satya', question: 'How does Sadaiv Satya ensure news accuracy?', answer: 'We use AI verification, source cross-checking, and professional journalists for high accuracy.', keywords: ['accuracy', 'news', 'verification', 'sources', 'journalists'] },

    // Sadaiv Yuva Foundation (Non-Profit)
    { id: 14, company: 'Sadaiv Yuva Foundation', question: 'What is the mission of Sadaiv Yuva Foundation?', answer: 'Sadaiv Yuva Foundation focuses on youth empowerment, education, skill development, and community service.', keywords: ['mission', 'Sadaiv Yuva', 'foundation', 'youth', 'education'] },
    { id: 15, company: 'Sadaiv Yuva Foundation', question: 'How can I donate to Sadaiv Yuva Foundation?', answer: 'Donations can be made via bank transfer, UPI, or credit card, with tax deductions under section 80G.', keywords: ['donate', 'foundation', 'donations', 'tax', '80G'] },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // Save to localStorage
    localStorage.setItem('faqChatHistory', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSubmit(transcript);
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    // Update suggestions based on input
    if (input.trim()) {
      const filtered = faqData
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(input.toLowerCase()) ||
            faq.keywords.some((kw) => kw.toLowerCase().includes(input.toLowerCase()))
        )
        .slice(0, 3); // Limit to 3 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions(faqData.slice(0, 3)); // Show random top 3 when input is empty
    }
  }, [input]);

  const calculateSimilarity = (str1: string, str2: string): number => {
    const set1 = new Set(str1.toLowerCase().split(' ').filter(Boolean));
    const set2 = new Set(str2.toLowerCase().split(' ').filter(Boolean));
    const intersection = new Set([...set1].filter((x) => set2.has(x)));
    return intersection.size / Math.max(set1.size, set2.size);
  };

  const findBestMatch = (query: string): FAQItem | null => {
    let bestMatch: FAQItem | null = null;
    let highestScore = 0;

    faqData.forEach((faq) => {
      const questionScore = calculateSimilarity(query, faq.question);
      const keywordScore =
        faq.keywords.reduce((acc, kw) => acc + (query.toLowerCase().includes(kw.toLowerCase()) ? 1 : 0), 0) /
        faq.keywords.length;
      const totalScore = (questionScore + keywordScore) / 2;

      if (totalScore > highestScore) {
        highestScore = totalScore;
        bestMatch = faq;
      }
    });

    return highestScore > 0.3 ? bestMatch : null;
  };

  const handleSubmit = (query: string = input) => {
    if (!query.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: query,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    // Find match
    const match = findBestMatch(query);

    const botResponseText = match
      ? `${match.answer}\n\n(Regarding ${match.company} - ${match.question})`
      : "I'm sorry, I couldn't find a specific answer. Please provide more details or contact our support team.";

    // Simulate typing effect
    setTypingMessage('');
    let currentText = '';
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < botResponseText.length) {
        currentText += botResponseText[index];
        setTypingMessage(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
        setMessages((prev) => [
          ...prev,
          {
            id: messages.length + 2,
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
        setTypingMessage(null);
        if (match) speakText(match.answer);
      }
    }, 30);
  };

  const handleSuggestionClick = (faq: FAQItem) => {
    setInput(faq.question);
    handleSubmit(faq.question);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current.speaking) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  };

  return (
    <div className=" bg-gradient-to-br from-black via-purple-950 to-blue-950 relative overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-conic from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />

      {/* Orbiting Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-blue-400/50 to-purple-400/50 rounded-full"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* FAQ Explorer Orb */}
      {/* <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 cursor-pointer group z-20"
        whileHover={{ scale: 1.2, rotate: 90 }}
        transition={{ duration: 0.3 }}
      >
        <Sparkles className="w-6 h-6 text-white" />
        <div className="absolute hidden group-hover:flex flex-col gap-2 bottom-20 right-0">
          {['PayZone', 'Payzon IT Services', 'Payzon Marketing', 'Payzon Shoppy', 'Payzon API', 'Sadaiv Satya', 'Sadaiv Yuva Foundation'].map((company) => (
            <button
              key={company}
              onClick={() => setInput(`Tell me about ${company}`)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/20 transition-all"
            >
              {company}
            </button>
          ))}
        </div>
      </motion.div> */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center m">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            PayZone Group AI Assistant
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mt-3 max-w-xl mx-auto">
            Your futuristic guide to PayZone's innovative ventures, powered by AI and voice interaction.
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          className="w-full max-w-4xl bg-gradient-to-br from-white/5 to-blue-900/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Chat Messages */}
          <div className="h-[50vh] sm:h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/50 scrollbar-track-transparent">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} perspective-1000`}
                >
                  <div
                    className={`max-w-[70%] sm:max-w-[60%] p-4 sm:p-5 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white/10 text-white/90 border border-white/20'
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                    <span className="text-xs text-white/50 mt-2 block">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
              {typingMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[60%] p-4 sm:p-5 rounded-2xl bg-white/10 text-white/90 border border-white/20">
                    <p className="text-sm sm:text-base leading-relaxed">{typingMessage}</p>
                    <span className="text-xs text-white/50 mt-2 block">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 sm:px-6 py-3 bg-white/5 border-t border-white/10"
              >
                <p className="text-xs sm:text-sm text-white/60 mb-2">Suggested Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleSuggestionClick(faq)}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-white text-xs sm:text-sm hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 transition-all"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div className="border-t border-white/10 p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
            <motion.button
              onClick={toggleListening}
              className={`p-2 sm:p-3 rounded-xl transition-colors ${
                isListening ? 'bg-red-500/30 text-red-400' : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
              animate={isListening ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, repeat: isListening ? Infinity : 0, repeatType: 'reverse' }}
            >
              <Mic className="w-4 sm:w-5 h-4 sm:h-5" />
            </motion.button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Ask about any PayZone company..."
              className="flex-1 bg-transparent text-white outline-none text-sm sm:text-base placeholder-white/40"
            />
            <motion.button
              onClick={() => handleSubmit()}
              className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white hover:scale-105 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-4 sm:w-5 h-4 sm:h-5" />
            </motion.button>
            <motion.button
              onClick={() => speakText(messages[messages.length - 1]?.text || '')}
              className={`p-2 sm:p-3 rounded-xl transition-colors ${
                isSpeaking ? 'bg-green-500/30 text-green-400' : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
              animate={isSpeaking ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, repeat: isSpeaking ? Infinity : 0, repeatType: 'reverse' }}
            >
              <Volume2 className="w-4 sm:w-5 h-4 sm:h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8 sm:mt-12"
        >
          <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:scale-105">
            Contact Human Support
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        .perspective-1000 {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default PayZoneGroupFAQ;