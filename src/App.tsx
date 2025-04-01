import React, { useState, useEffect } from 'react';
import { 
  Brain, Trophy, ChevronDown, Shield, Database, Smartphone,
  ExternalLink, Building2, Award, Gift, Medal
} from 'lucide-react';

// Custom CSS styles for immersive animations and additional effects
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) translateZ(0); }
    50% { transform: translateY(-20px) translateZ(10px); }
  }

  @keyframes parallax {
    from { transform: translateZ(0); }
    to { transform: translateZ(100px); }
  }

  .perspective-view {
    perspective: 1000px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .scroll-container {
    transform-style: preserve-3d;
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .parallax-section {
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .glow-text {
    text-shadow: 0 0 10px rgba(255, 50, 50, 0.5),
                 0 0 20px rgba(255, 50, 50, 0.3),
                 0 0 30px rgba(255, 50, 50, 0.2);
  }

  .holographic-effect {
    background: linear-gradient(45deg, 
      rgba(255,50,50,0.1) 0%, 
      rgba(255,100,100,0.2) 50%, 
      rgba(255,50,50,0.1) 100%);
    box-shadow: 0 0 30px rgba(255,50,50,0.2),
                inset 0 0 10px rgba(255,50,50,0.2);
  }

  .cyber-border {
    position: relative;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  .cyber-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -1;
    background: linear-gradient(45deg, 
      #ff3232 0%, 
      #ff6464 50%, 
      #ff3232 100%);
    margin: -2px;
    border-radius: inherit;
    animation: borderGlow 3s linear infinite;
  }

  @keyframes borderGlow {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
`;

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-04-28').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setFinished(true);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
      {finished ? (
        <div className="col-span-4 text-center p-6 bg-black/30 rounded-lg backdrop-blur-sm border border-red-500/20">
          <div className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-red-700">
            Event Started!
          </div>
        </div>
      ) : (
        Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center p-4 sm:p-6 bg-black/30 rounded-lg backdrop-blur-sm border border-red-500/20 hover:border-red-500/40 transition-all transform hover:scale-105">
            <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-red-700">{value}</div>
            <div className="text-xs sm:text-sm text-gray-300 uppercase mt-2">{unit}</div>
          </div>
        ))
      )}
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "When and Where?",
      answer: `Sentinel Hack will take place on May 4th and 5th at K.S Institute of Technology, 
      14, Kanakapura Main Road, Municipal Corporation Layout, Raghuvanahalli, Bengaluru, Karnataka 560109.
      Click here for more details.`
    },
    {
      question: "How much will it cost?",
      answer: "The participation cost per head is Rs.200."
    },
    {
      question: "Duration?",
      answer: "You will have 24 hours to build your product. The event starts Thursday morning and runs until Friday morning. A detailed schedule will be released closer to the event."
    },
    {
      question: "Food?",
      answer: "We will provide free grub to keep you hacking for 24 hours. There will also be stalls for your convenience."
    },
    {
      question: "How do teams work?",
      answer: "Teams can have 2-4 members. Cross-college teams are allowed and members can be from different colleges."
    },
    {
      question: "How does registration work?",
      answer: "Apply via the provided Google form. Payment is made through online apps and a transaction screenshot must be uploaded. Confirmation will be sent via email."
    },
    {
      question: "What if this is my first hackathon?",
      answer: "Don’t worry – there will be mentors to help you. Plus, we have fun surprises for newcomers."
    },
    {
      question: "What should I bring?",
      answer: "Bring your college ID, laptop, charger, and spike busters."
    },
    {
      question: "Anything else?",
      answer: "Feel free to email us or reach out on Instagram if you have any questions."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-red-500/30 rounded-lg overflow-hidden transform transition-all hover:scale-[1.01]">
          <button
            className="w-full p-4 text-left flex justify-between items-center hover:bg-red-500/10 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span>{faq.question}</span>
            <ChevronDown className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
          </button>
          <div 
            className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} bg-black/20`}
          >
            <div className="p-4">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { Check } from 'lucide-react';

function Rules() {
  const rules = [
    "Participants should bring their own laptops, chargers, spike busters, and any additional hardware needed.",
    "Participants need to bring their college ID cards.",
    "Team leaders will receive a Registration Confirmation Mail upon entry finalization.",
    "Snacks and Beverages will be provided.",
    "Registration fee is Rs.200 per person (non-refundable).",
    "Teams must have between 2 to 4 members.",
    "Participants must follow instructions from the organizing committee.",
    "Once inside the venue, participants are not permitted to leave until the event ends.",
    "Downloading entire templates during the event will lead to disqualification.",
    "Judges’ decisions are final.",
    "Teams cannot withdraw once registered.",
    "Terms and conditions apply."
  ];

  return (
    <div className="max-w-3xl mx-auto text-gray-300 px-6 py-10 bg-black/30 rounded-xl border border-red-500/20 backdrop-blur-sm shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-3xl sm:text-5xl font-bold text-center mb-10">
        Rules & Regulations
      </h2>
      <ul className="space-y-4">
        {rules.map((rule, index) => (
          <li 
            key={index} 
            className="flex items-start gap-3 p-3 bg-black/40 rounded-lg border border-red-500/10 hover:border-red-500/30 transition-all"
          >
            <Check className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
            <span className="text-base sm:text-lg">{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


function Photos() {
  return (
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl sm:text-5xl font-bold mb-8">Sentinel Hack 3.0 Photos</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=400",
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400",
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400"
        ].map((url, index) => (
          <img key={index} src={url} alt={`Sentinel Hack ${index}`} className="w-full h-48 object-cover rounded-lg" />
        ))}
      </div>
      <a href="#" className="mt-4 inline-block text-red-500 hover:underline">View More</a>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="max-w-3xl mx-auto text-center text-gray-300">
      <h2 className="text-3xl sm:text-5xl font-bold mb-8">Contact Info</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Address</h3>
          <p>
            14, Kanakapura Main Road, Municipal Corporation Layout,<br /> 
            Raghuvanahalli, Bengaluru, Karnataka 560109
          </p>
          <a href="https://maps.app.goo.gl/wN9F4EZapNviBvp27" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">Click here</a>

        </div>
        <div>
          <h3 className="text-xl font-semibold">Phone</h3>
          <p>
            Swetha: 9353799412<br /> Nithya: 7204021012<br /> Puvan: 9008347759
          </p>
        </div>
        <div> 
          <h3 className="text-xl font-semibold">Email</h3>
          <p>sentinelhack@ksit.edu.in</p>
        </div>
        <div>
          <a href="#" className="inline-block mt-2 text-red-500 hover:underline">Reach Us</a>
        </div>
      </div>
    </div>
  );
}

import { Menu, X } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-black to-gray-900 border-b border-red-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-white backdrop-blur-md rounded-lg z-0"></div>
            <img src="../ksit logo nobg.jpeg.png" alt="KSIT LOGO" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">K. S. Institute of Technology</h1>
            <p className="text-xs text-gray-300">Department of Computer Science</p>
          </div>
          <div className="relative inline-block sm:block">
            <div className="absolute inset-0 bg-white backdrop-blur-md rounded-lg"></div>
            <img src="../25yrs.png" alt="25 Years Logo" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row gap-4 text-sm w-full sm:w-auto mt-3 sm:mt-0 text-center`}
        >
          {["Home", "Timer", "About", "Prizes", "Rules", "FAQs", "Sponsors", "Register"].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="hover:text-red-500 transition-colors text-white"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Bottom Text */}
      <div className="bg-black/50 py-2 text-center text-xs text-white">
        <p>In Association with Firefox Club & AICTE SPICES | Presents</p>
      </div>
    </header>
  );
}

import SectionBackground from './components/SectionBackground';

function App() {
  useEffect(() => {
    // Inject custom CSS for animations
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('animate-enter');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach((element) => {
      element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000');
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white scroll-smooth">
      <Header />
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <SectionBackground variant="gradient" />
        <div className="absolute inset-0 bg-gradient-radial from-red-500/20 via-transparent to-transparent"></div>
        <img 
            src="../headerbg.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-75"
            loading="lazy"
          />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center space-y-8 sm:space-y-12 px-4 max-w-6xl mx-auto">
        <div className="animate-float relative">
        <div className="relative w-24 sm:w-32 h-24 sm:h-32 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="../sentinel nobg.png" // Replace with the correct path
              alt="Centered Image"
              className=" object-contain"
            />
          </div>
        </div>

            <h1 className="text-4xl sm:text-7xl font-bold mt-4 sm:mt-8 animate-glow bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-600">
              SENTINEL HACK 5.0
            </h1>
            <p className="text-lg sm:text-2xl text-gray-300 mt-2 sm:mt-4 font-light tracking-wider">
              IF NOT NOW, WHEN?
            </p>
          </div>
          <CountdownTimer />
        </div>
        <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-32 px-4 relative border-t border-b border-red-500/20">
        <SectionBackground variant="particles" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative fade-up">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-8">About Sentinel Hack 5.0</h2>
          <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
            This 24-hour hackathon is an initiative by K.S Institute of Technology to inspire students 
            to pursue a technical future. Participants can expand their knowledge, build innovative solutions, 
            and solve real-world problems while working together.
          </p>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-16 sm:py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto text-center relative">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-16 fade-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-600">
              Exciting Prizes
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 items-center">
            <div className="prize-card prize-first rounded-2xl p-6 sm:p-12 transform hover:-translate-y-3 transition-all duration-500 fade-up group">
              <div className="prize-content">
                <div className="relative">
                  <Trophy className="w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-4 sm:mb-6 text-yellow-500 animate-float" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-yellow-500">1st Place</h3>
                <p className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-yellow-300 to-yellow-600 mb-2 sm:mb-4">₹30,000</p>
                <div className="text-yellow-400/80 text-xs sm:text-sm">
                  + Internship Opportunities
                </div>
              </div>
            </div>
            <div className="prize-card prize-second rounded-2xl p-4 sm:p-8 transform hover:-translate-y-2 transition-all duration-500 fade-up group" style={{ transitionDelay: '200ms' }}>
              <div className="prize-content">
                <div className="relative">
                  <Medal className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 text-gray-300 animate-float" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-gray-300">2nd Place</h3>
                <p className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-gray-400 mb-2 sm:mb-4">₹20,000</p>
                <div className="text-gray-400 text-xs sm:text-sm">+ Exciting Goodies</div>
              </div>
            </div>
            <div className="prize-card prize-third rounded-2xl p-4 sm:p-8 transform hover:-translate-y-2 transition-all duration-500 fade-up group" style={{ transitionDelay: '400ms' }}>
              <div className="prize-content">
                <div className="relative">
                  <Award className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 sm:mb-6 text-orange-400 animate-float" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-orange-400">3rd Place</h3>
                <p className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-orange-600 mb-2 sm:mb-4">₹10,000</p>
                <div className="text-orange-400/80 text-xs sm:text-sm">+ Special Rewards</div>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-16">
            <p className="text-sm text-gray-300">Prize money up to 60K with additional internship opportunities.</p>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section id="domains" className="py-16 sm:py-32 px-4 relative border-t border-b border-red-500/20">
        <SectionBackground variant="particles" />
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-16 fade-up">Domains</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: <Brain className="w-10 sm:w-12 h-10 sm:h-12" />, name: "Agriculture", desc: "Innovative Farming Solutions" },
              { icon: <Shield className="w-10 sm:w-12 h-10 sm:h-12" />, name: "Education", desc: "EdTech & Learning" },
              { icon: <Database className="w-10 sm:w-12 h-10 sm:h-12" />, name: "Healthcare", desc: "Medical Innovations" },
              { icon: <Smartphone className="w-10 sm:w-12 h-10 sm:h-12" />, name: "CyberSecurity", desc: "Digital Defense" },
              { icon: <Brain className="w-10 sm:w-12 h-10 sm:h-12" />, name: "FinTech", desc: "Financial Technologies" },
              { icon: <Shield className="w-10 sm:w-12 h-10 sm:h-12" />, name: "Open Innovation", desc: "Creative Solutions" },
            ].map((domain, index) => (
              <div 
                key={index} 
                className="p-4 sm:p-8 bg-gradient-to-br from-red-500/10 to-black rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all cursor-pointer group backdrop-blur-sm transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 fade-up"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-red-500 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {domain.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-1">{domain.name}</h3>
                <p className="text-gray-400 text-sm">{domain.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-16 sm:py-32 px-4 relative border-t border-b border-red-500/20">
        <SectionBackground variant="particles" />
        <Rules />
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-16 sm:py-32 px-4 relative border-t border-b border-red-500/20">
        <SectionBackground variant="particles" color="white" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent"></div>
        <div className="max-w-3xl mx-auto relative">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-16 fade-up">FAQs</h2>
          <FAQ />
        </div>
      </section>

      {/* Register Section */}
      <section id="register" className="py-16 sm:py-32 px-4 bg-gradient-to-b from-black to-red-900/20">
        <div className="max-w-2xl mx-auto text-center fade-up">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-8">REGISTER</h2>
          <p className="mb-8 text-gray-300">
            Apply via the provided Google form. Payment is done online (Rs.200 per person). Hurry, limited spots available!
          </p>
          <a 
            href="https://forms.google.com/register" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 sm:px-12 py-4 sm:py-6 rounded-xl text-lg sm:text-2xl font-semibold transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/20"
          >
            Register Now
            <ExternalLink className="w-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-16 sm:py-32 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-16 fade-up">Our Sponsors</h2>
          <div className="mb-8 sm:mb-20 fade-up">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-12 text-red-500">Platinum Sponsors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
              {[
                { name: "TechCorp", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200" },
                { name: "InnovateAI", logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200" },
              ].map((sponsor, index) => (
                <div key={index} className="p-6 sm:p-10 bg-gradient-to-br from-red-500/5 to-black rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all group backdrop-blur-sm">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 sm:mb-6 rounded-xl overflow-hidden bg-black/50">
                    <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-red-500">{sponsor.name}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8 sm:mb-20 fade-up">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-12 text-yellow-500">Gold Sponsors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                { name: "CloudSys", logo: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=200" },
                { name: "DevTech", logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200" },
                { name: "NetCore", logo: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=200" },
              ].map((sponsor, index) => (
                <div key={index} className="p-4 sm:p-8 bg-gradient-to-br from-yellow-500/5 to-black rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-xl overflow-hidden bg-black/50">
                    <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-yellow-500">{sponsor.name}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-8 sm:mb-20 fade-up">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-12 text-gray-400">Silver Sponsors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                { name: "StartUp", logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=200" },
                { name: "TechHub", logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200" },
                { name: "CodeLabs", logo: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=200" },
                { name: "WebTech", logo: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=200" },
              ].map((sponsor, index) => (
                <div key={index} className="p-4 sm:p-6 bg-gradient-to-br from-gray-500/5 to-black rounded-xl border border-gray-500/20 hover:border-gray-500/40 transition-all group">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-2 sm:mb-4 rounded-xl overflow-hidden bg-black/50">
                    <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-gray-400">{sponsor.name}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 sm:mt-20 fade-up">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8">Interested in Sponsoring?</h3>
            <a 
              href="mailto:sponsor@sentinelhack.com" 
              className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors group"
            >
              <Building2 className="w-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              <span className="text-xl sm:text-2xl">Become a Sponsor</span>
            </a>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-16 sm:py-32 px-4">
        <ContactInfo />
      </section>
    </div>
  );
}

export default App;