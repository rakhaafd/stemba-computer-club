import { useState, useEffect, useRef } from 'react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import { Input } from '@/components/ui/input';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // ASCII Art untuk SCC
  const asciiArt = [
    "  ███████╗ ██████╗ ██████╗ ",
    "  ██╔════╝██╔════╝██╔════╝ ",
    "  ███████╗██║     ██║      ",
    "  ╚════██║██║     ██║      ",
    "  ███████║╚██████╗╚██████╗ ",
    "  ╚══════╝ ╚═════╝ ╚═════╝ ",
    "",
    "Stemba Computer Club",
    ">> System initialized successfully"
  ];

  // Animasi typing terminal
  useEffect(() => {
    const terminalLines = [
      "> ssh scc@stemba-computer-club",
      "> Connecting to mainframe...",
      "> Authentication successful ✓",
      "> System ready ✓",
      "",
      ...asciiArt
    ];

    let currentIndex = 0;
    let currentChar = 0;
    let currentText = '';

    const typeWriter = () => {
      if (currentIndex < terminalLines.length) {
        const line = terminalLines[currentIndex];
        
        if (currentChar < line.length) {
          currentText += line[currentChar];
          setTerminalText(currentText);
          currentChar++;
          setTimeout(typeWriter, 35);
        } else {
          currentText += '\n';
          setTerminalText(currentText);
          currentIndex++;
          currentChar = 0;
          setTimeout(typeWriter, 80);
        }
      } else {
        // Animasi cursor blink setelah selesai
        const cursorInterval = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
      }
    };

    const timer = setTimeout(typeWriter, 800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalText]);

  // Animasi features rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: "🚀",
      title: "Project-Based Learning",
      description: "Learn by building real-world projects with modern technologies"
    },
    {
      icon: "👥",
      title: "Collaborative Environment",
      description: "Work together with like-minded peers and mentors"
    },
    {
      icon: "💡",
      title: "Innovation Focus",
      description: "Explore cutting-edge technologies and creative solutions"
    },
    {
      icon: "🏆",
      title: "Competitions",
      description: "Participate in hackathons and coding competitions"
    }
  ];

  const activities = [
    {
      title: "Web Development",
      description: "Build modern web applications with latest frameworks",
      skills: ["React", "Next.js", "TypeScript"]
    },
    {
      title: "Mobile Development",
      description: "Create cross-platform mobile applications",
      skills: ["React Native", "Flutter", "Kotlin"]
    },
    {
      title: "AI & Machine Learning",
      description: "Explore artificial intelligence and data science",
      skills: ["Python", "TensorFlow", "PyTorch"]
    },
    {
      title: "UI/UX Design",
      description: "Design beautiful and user-friendly interfaces",
      skills: ["Figma", "Adobe XD", "Prototyping"]
    },
    {
      title: "DevOps & Cloud",
      description: "Learn deployment and cloud infrastructure",
      skills: ["Docker", "AWS", "CI/CD"]
    },
    {
      title: "Game Development",
      description: "Create interactive games and simulations",
      skills: ["Unity", "C#", "3D Modeling"]
    }
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Club President",
      avatar: "/avatars/alex.jpg",
      initial: "AC"
    },
    {
      name: "Sarah Kim",
      role: "Tech Lead",
      avatar: "/avatars/sarah.jpg",
      initial: "SK"
    },
    {
      name: "Mike Rodriguez",
      role: "Project Manager",
      avatar: "/avatars/mike.jpg",
      initial: "MR"
    },
    {
      name: "Emily Wang",
      role: "Design Lead",
      avatar: "/avatars/emily.jpg",
      initial: "EW"
    }
  ];

  const stats = [
    { number: "50+", label: "Active Members" },
    { number: "15+", label: "Projects Completed" },
    { number: "8", label: "Hackathon Wins" },
    { number: "100%", label: "Satisfaction Rate" }
  ];

  // Data untuk dokumentasi kegiatan
  const memories = [
    {
      id: 1,
      title: "Hackathon 2024",
      description: "Annual coding competition with 100+ participants",
      image: "/memories/hackathon.jpg",
      date: "March 2024",
      type: "Competition",
      highlights: ["24-hour coding", "Industry judges", "Prize pool $5K"]
    },
    {
      id: 2,
      title: "Tech Workshop Series",
      description: "Hands-on workshops on modern technologies",
      image: "/memories/workshop.jpg",
      date: "January 2024",
      type: "Workshop",
      highlights: ["React Masterclass", "Cloud Computing", "UI/UX Design"]
    },
    {
      id: 3,
      title: "Industry Visit",
      description: "Visit to leading tech companies in the area",
      image: "/memories/industry-visit.jpg",
      date: "February 2024",
      type: "Field Trip",
      highlights: ["Google Office", "Startup Hub", "Networking"]
    },
    {
      id: 4,
      title: "Project Showcase",
      description: "Showcasing member projects to the community",
      image: "/memories/showcase.jpg",
      date: "December 2023",
      type: "Exhibition",
      highlights: ["Live demos", "Guest speakers", "Community feedback"]
    },
    {
      id: 5,
      title: "Code Retreat",
      description: "Weekend coding retreat in the mountains",
      image: "/memories/retreat.jpg",
      date: "November 2023",
      type: "Retreat",
      highlights: ["Pair programming", "Tech talks", "Team building"]
    },
    {
      id: 6,
      title: "Community Outreach",
      description: "Teaching coding to local high school students",
      image: "/memories/outreach.jpg",
      date: "October 2023",
      type: "Volunteering",
      highlights: ["Mentoring", "Workshops", "STEM education"]
    }
  ];

  // Features data untuk Why Join Us section
  const joinUsFeatures = [
    {
      icon: "🎯",
      title: "Personalized Mentorship",
      description: "1-on-1 guidance from industry experts and senior members",
      gradient: "from-purple-500 to-pink-500",
      stats: "50+ Mentors"
    },
    {
      icon: "💼",
      title: "Project Portfolio",
      description: "Build real-world projects that impress employers",
      gradient: "from-blue-500 to-cyan-500",
      stats: "15+ Projects"
    },
    {
      icon: "🚀",
      title: "Career Launchpad",
      description: "Exclusive internship opportunities and job referrals",
      gradient: "from-green-500 to-emerald-500",
      stats: "80% Placement"
    },
    {
      icon: "👥",
      title: "Vibrant Community",
      description: "Connect with 200+ passionate tech enthusiasts",
      gradient: "from-orange-500 to-red-500",
      stats: "200+ Members"
    },
    {
      icon: "📚",
      title: "Learning Resources",
      description: "Access to premium courses and learning materials",
      gradient: "from-indigo-500 to-purple-500",
      stats: "100+ Resources"
    },
    {
      icon: "⚡",
      title: "Fast-Track Growth",
      description: "Accelerate your learning with structured pathways",
      gradient: "from-yellow-500 to-orange-500",
      stats: "2x Growth"
    }
  ];

  return (
    <div className="min-h-screen bg-[#161616] text-[#EFEEEA] overflow-hidden">
      {/* Navigation */}
      <Navbar scrollToSection={scrollToSection} />
      
      {/* Hero Section dengan Terminal Animation */}
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#161616] via-[#161616] to-[#1a1a1a]"></div>
       
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center z-10">
          {/* Text Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Badge variant="secondary" className="mb-6 bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
              Cyber Security · Web Development · UI/UX Design
            </Badge>
           
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-primary tracking-tight">
              Stemba Computer Club
            </h1>
           
            <p className="text-xl md:text-2xl text-[var(--color-secondary)] mb-8 leading-relaxed">
              Where <span className="text-[#EFEEEA]">code meets creativity</span> and innovation knows no bounds.
              Join the next generation of tech innovators.
            </p>
           
            <div className="flex gap-4 flex-wrap">
              <Button
                size="sm"
                className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9] text-lg px-8"
                onClick={() => scrollToSection('activities')}
              >
                Explore Activities
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10 text-lg px-8"
                onClick={() => scrollToSection('memories')}
              >
                View Memories
              </Button>
            </div>
          </div>

          {/* Terminal Animation */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Card className="bg-[#0a0a0a] border-[#00ff00] font-mono relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none"></div>
              <CardHeader className="border-b border-[#00ff00]/30">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-[#00ff00] text-sm ml-2">scc-terminal — bash — 80x24</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div 
                  ref={terminalRef}
                  className="h-80 p-4 overflow-auto text-green-400 text-sm leading-relaxed whitespace-pre-wrap font-mono scrollbar-thin scrollbar-thumb-green-500/20 scrollbar-track-transparent"
                  style={{ 
                    scrollBehavior: 'smooth',
                    fontFamily: 'Monaco, Consolas, monospace'
                  }}
                >
                  {terminalText}
                  {showCursor && <span className="animate-pulse">▊</span>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-[#161616] border-[#2a2a2a] text-center hover:border-[var(--color-secondary)] transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-[#EFEEEA] font-primary mb-2 group-hover:text-[var(--color-secondary)] transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-[var(--color-secondary)] text-sm md:text-base">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Memories/Documentation Section */}
      <section id="memories" className="py-20 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-[var(--color-secondary)] text-[#161616]">
              Our Memories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-primary">
              Club <span className="text-[var(--color-secondary)]">Activities</span>
            </h2>
            <p className="text-xl text-[var(--color-secondary)] max-w-3xl mx-auto">
              Relive the amazing moments and events that make our community special
            </p>
          </div>

          {/* Memories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memories.map((memory) => (
              <Card 
                key={memory.id} 
                className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[var(--color-secondary)] transition-all duration-300 group hover:scale-105 overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-[var(--color-secondary)]/20 to-[#EFEEEA]/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-[#161616] text-[var(--color-secondary)]">
                        {memory.type}
                      </Badge>
                      <span className="text-xs text-[var(--color-secondary)] bg-[#161616] px-2 py-1 rounded">
                        {memory.date}
                      </span>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-primary text-[#EFEEEA] group-hover:text-[var(--color-secondary)] transition-colors duration-300">
                    {memory.title}
                  </CardTitle>
                  <CardDescription className="text-[var(--color-secondary)]">
                    {memory.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {memory.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center text-sm text-[var(--color-secondary)]">
                        <div className="w-1.5 h-1.5 bg-[var(--color-secondary)] rounded-full mr-2"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section id="features" className="py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-[var(--color-secondary)] text-[#161616]">
              Why Join Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-primary">
              Your <span className="text-[var(--color-secondary)]">Tech Journey</span> Starts Here
            </h2>
            <p className="text-xl text-[var(--color-secondary)] max-w-3xl mx-auto">
              Experience the difference with our unique approach to tech education and community building
            </p>
          </div>

          {/* Animated Feature Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="h-96 relative">
                {joinUsFeatures.map((feature, index) => (
                  <div
                    key={feature.title}
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                      index === activeFeature
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-10'
                    }`}
                  >
                    <Card className="bg-gradient-to-br from-[#161616] to-[#1a1a1a] border-[#2a2a2a] h-full relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10`}></div>
                      <CardContent className="p-8 h-full flex flex-col justify-center relative z-10">
                        <div className="text-5xl mb-4">{feature.icon}</div>
                        <h3 className="text-2xl font-bold text-[#EFEEEA] mb-3 font-primary">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-[var(--color-secondary)] mb-6">
                          {feature.description}
                        </p>
                        <div className="text-3xl font-bold text-[var(--color-secondary)] font-primary">
                          {feature.stats}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#EFEEEA] mb-6 font-primary">
                What You'll Achieve
              </h3>
              {[
                "Master in-demand tech skills through hands-on projects",
                "Build a professional network with industry experts",
                "Create an impressive portfolio that stands out",
                "Gain real-world experience before graduation",
                "Develop leadership and teamwork abilities",
                "Access exclusive career opportunities"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-6 h-6 bg-[var(--color-secondary)] rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-[#161616] rounded-full"></div>
                  </div>
                  <p className="text-lg text-[var(--color-secondary)] group-hover:text-[#EFEEEA] transition-colors duration-300 flex-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Navigation Dots */}
          <div className="flex justify-center space-x-3 mb-12">
            {joinUsFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeFeature
                    ? 'bg-[var(--color-secondary)] w-8'
                    : 'bg-[var(--color-secondary)]/30 hover:bg-[var(--color-secondary)]/50'
                }`}
              />
            ))}
          </div>

          {/* Additional Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎓",
                title: "Structured Learning Paths",
                description: "Follow curated roadmaps for different tech domains"
              },
              {
                icon: "🤝",
                title: "Peer Learning",
                description: "Learn from and with other passionate students"
              },
              {
                icon: "🌐",
                title: "Global Network",
                description: "Connect with alumni working at top tech companies"
              }
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="bg-[#161616] border-[#2a2a2a] hover:border-[var(--color-secondary)] transition-all duration-300 group hover:scale-105 text-center"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-primary text-[#EFEEEA] mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-[var(--color-secondary)]">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-[var(--color-secondary)] text-[#161616]">
              About Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-primary">
              Welcome to <span className="text-[var(--color-secondary)]">Stemba Computer Club</span>
            </h2>
            <p className="text-xl text-[var(--color-secondary)] max-w-3xl mx-auto">
              A vibrant community where technology enthusiasts come together to learn,
              innovate, and shape the future through code.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-[var(--color-secondary)] leading-relaxed">
                Founded with a vision to democratize technology education, Stemba Computer Club
                has been at the forefront of nurturing young tech talent since our inception.
              </p>
              <p className="text-lg text-[var(--color-secondary)] leading-relaxed">
                We believe in hands-on learning, collaborative projects, and creating an
                inclusive environment where every member can thrive and discover their
                passion for technology.
              </p>
              <div className="flex gap-4">
                <Button className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
                  Join Our Community
                </Button>
                <Button variant="outline" className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10">
                  View Projects
                </Button>
              </div>
            </div>
           
            <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={feature.title}
                      className="bg-[#161616] p-4 rounded-lg border border-[#2a2a2a] hover:border-[var(--color-secondary)] transition-all duration-300"
                    >
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <h3 className="font-bold text-[#EFEEEA] mb-1 font-primary">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[var(--color-secondary)]">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-[var(--color-secondary)] text-[#161616]">
              Our Focus Areas
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-primary">
              Explore <span className="text-[var(--color-secondary)]">Technologies</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <Card
                key={activity.title}
                className="bg-[#1a1a1a] border-[#2a2a2a] hover:border-[var(--color-secondary)] transition-all duration-300 group hover:scale-105"
              >
                <CardHeader>
                  <CardTitle className="font-primary text-[#EFEEEA] group-hover:text-[var(--color-secondary)] transition-colors duration-300">
                    {activity.title}
                  </CardTitle>
                  <CardDescription className="text-[var(--color-secondary)]">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {activity.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-[#161616] text-[var(--color-secondary)] border-[#2a2a2a]"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-[var(--color-secondary)] text-[#161616]">
              Meet The Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-primary">
              Our <span className="text-[var(--color-secondary)]">Leadership</span>
            </h2>
            <p className="text-xl text-[var(--color-secondary)] max-w-3xl mx-auto">
              Passionate students dedicated to making technology education accessible to all.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="bg-[#161616] border-[#2a2a2a] text-center hover:border-[var(--color-secondary)] transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-[#EFEEEA] text-[#161616] font-primary">
                      {member.initial}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-primary text-[#EFEEEA]">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-[var(--color-secondary)] mt-2">
                    {member.role}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardContent className="p-12">
              <Badge variant="secondary" className="mb-4 bg-[#EFEEEA] text-[#161616]">
                Limited Spots Available
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-primary text-[var(--color-secondary)]">
                Ready to Start Your Tech Journey
              </h2>
              <p className="text-xl text-[var(--color-secondary)] mb-8 max-w-2xl mx-auto">
                Join Stemba Computer Club today and become part of a community that's
                shaping the future of technology.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9] text-lg px-8">
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-[#EFEEEA]">
                    <DialogHeader>
                      <DialogTitle className="font-primary">Application Form</DialogTitle>
                      <DialogDescription className="text-[var(--color-secondary)]">
                        Fill out your details to join Stemba Computer Club
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Full Name" className="bg-[#161616] border-[#2a2a2a]" />
                      <Input placeholder="Email" className="bg-[#161616] border-[#2a2a2a]" />
                      <Input placeholder="Grade/Year" className="bg-[#161616] border-[#2a2a2a]" />
                      <Button className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
                        Submit Application
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[var(--color-secondary)] text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10 text-lg px-8"
                  onClick={() => scrollToSection('about')}
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;