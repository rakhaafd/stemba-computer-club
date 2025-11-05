import { useState, useEffect } from 'react';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Badge } from '@components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setIsVisible(true);
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

  return (
    <div className="min-h-screen bg-[#161616] text-[#EFEEEA] overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#161616]/90 backdrop-blur-sm z-50 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#EFEEEA] rounded-full flex items-center justify-center">
                <span className="text-[#161616] font-bold text-lg font-primary">SCC</span>
              </div>
              <span className="text-xl font-bold font-primary">SCC</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['about', 'features', 'activities', 'team', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-[var(--color-primary)] hover:text-[#EFEEEA] transition-colors duration-200 capitalize font-medium"
                >
                  {item}
                </button>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
                  Join Waitlist
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-[#EFEEEA]">
                <DialogHeader>
                  <DialogTitle className="font-primary">Join Stemba Computer Club</DialogTitle>
                  <DialogDescription className="text-[var(--color-secondary)]">
                    Enter your email to get notified when registrations open.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#161616] border-[#2a2a2a] text-[#EFEEEA]"
                  />
                  <Button className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
                    Notify Me
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#161616] via-[#161616] to-[#1a1a1a]"></div>
        
        <div className={`text-center z-10 transition-all duration-1000 max-w-4xl mx-auto ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Badge variant="secondary" className="mb-6 bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
            🚀 Now Accepting New Members
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-primary tracking-tight">
            Stemba Computer Club
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--color-secondary)] mb-8 leading-relaxed">
            Where <span className="text-[#EFEEEA]">code meets creativity</span> and innovation knows no bounds. 
            Join the next generation of tech innovators.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
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
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[var(--color-secondary)] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[var(--color-secondary)] rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-[#161616] border-[#2a2a2a] text-center">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-[#EFEEEA] font-primary mb-2">
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-[var(--color-secondary)] text-[#161616]">
              Why Join Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-primary">
              What Makes Us <span className="text-[var(--color-secondary)]">Different</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Mentorship Program",
                description: "Get guidance from experienced mentors and industry professionals",
                icon: "🎯"
              },
              {
                title: "Project Portfolio",
                description: "Build an impressive portfolio of real-world projects",
                icon: "💼"
              },
              {
                title: "Career Development",
                description: "Prepare for tech careers with interview prep and resume workshops",
                icon: "🚀"
              },
              {
                title: "Community Events",
                description: "Participate in workshops, tech talks, and networking events",
                icon: "👥"
              },
              {
                title: "Resource Library",
                description: "Access curated learning resources and tools",
                icon: "📚"
              },
              {
                title: "Flexible Learning",
                description: "Learn at your own pace with structured learning paths",
                icon: "⏱️"
              }
            ].map((feature, index) => (
              <Card 
                key={feature.title}
                className="bg-[#161616] border-[#2a2a2a] hover:border-[#EFEEEA] transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-primary text-[#EFEEEA]">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[var(--color-secondary)]">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
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
              <Card key={member.name} className="bg-[#161616] border-[#2a2a2a] text-center">
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
      <footer className="border-t border-[#2a2a2a] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#EFEEEA] rounded-full flex items-center justify-center">
                  <span className="text-[#161616] font-bold text-lg font-primary">SCC</span>
                </div>
                <span className="text-xl font-bold font-primary">Stemba Computer Club</span>
              </div>
              <p className="text-[var(--color-secondary)] max-w-md">
                Empowering the next generation of tech innovators through collaborative learning 
                and hands-on projects.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-[#EFEEEA] mb-4 font-primary">Quick Links</h3>
              <div className="space-y-2">
                {['about', 'features', 'activities', 'team'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block text-[var(--color-secondary)] hover:text-[#EFEEEA] transition-colors duration-200 capitalize"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-[#EFEEEA] mb-4 font-primary">Contact</h3>
              <div className="space-y-2 text-[var(--color-secondary)]">
                <div>stemba.cc@email.com</div>
                <div>STEMBA School Campus</div>
                <div>Meeting: Every Wednesday 3-5 PM</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#2a2a2a] mt-8 pt-8 text-center text-[var(--color-secondary)]">
            <p>&copy; 2024 Stemba Computer Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;