import { Input } from '@/components/ui/input';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [terminalText, setTerminalText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const terminalRef = useRef<HTMLDivElement>(null);
    const [activeFeature, setActiveFeature] = useState(0);
    const [showAchievements, setShowAchievements] = useState(false);

    // Function untuk menampilkan achievements ketika user berinteraksi dengan dots
    const handleFeatureChange = (index: number) => {
        setActiveFeature(index);
        if (!showAchievements) {
            setShowAchievements(true);
        }
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // ASCII Art untuk SCC
    const asciiArt = [
        '  ███████╗ ██████╗ ██████╗ ',
        '  ██╔════╝██╔════╝██╔════╝ ',
        '  ███████╗██║     ██║      ',
        '  ╚════██║██║     ██║      ',
        '  ███████║╚██████╗╚██████╗ ',
        '  ╚══════╝ ╚═════╝ ╚═════╝ ',
        '',
        'Stemba Computer Club',
        '>> System initialized successfully',
    ];

    // Animasi typing terminal
    useEffect(() => {
        const terminalLines = [
            '> ssh scc@stemba-computer-club',
            '> Connecting to mainframe...',
            '> Authentication successful ✓',
            '> System ready ✓',
            '',
            ...asciiArt,
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
                    setShowCursor((prev) => !prev);
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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    const features = [
        {
            icon: '🚀',
            title: 'Project-Based Learning',
            description: 'Learn by building real-world projects with modern technologies',
        },
        {
            icon: '👥',
            title: 'Collaborative Environment',
            description: 'Work together with like-minded peers and mentors',
        },
        {
            icon: '💡',
            title: 'Innovation Focus',
            description: 'Explore cutting-edge technologies and creative solutions',
        },
        {
            icon: '🏆',
            title: 'Competitions',
            description: 'Participate in hackathons and coding competitions',
        },
    ];

    const activities = [
        {
            title: 'Web Development',
            description: 'Build modern web applications with latest frameworks',
            skills: ['React', 'Next.js', 'TypeScript'],
        },
        {
            title: 'Mobile Development',
            description: 'Create cross-platform mobile applications',
            skills: ['React Native', 'Flutter', 'Kotlin'],
        },
        {
            title: 'AI & Machine Learning',
            description: 'Explore artificial intelligence and data science',
            skills: ['Python', 'TensorFlow', 'PyTorch'],
        },
        {
            title: 'UI/UX Design',
            description: 'Design beautiful and user-friendly interfaces',
            skills: ['Figma', 'Adobe XD', 'Prototyping'],
        },
        {
            title: 'DevOps & Cloud',
            description: 'Learn deployment and cloud infrastructure',
            skills: ['Docker', 'AWS', 'CI/CD'],
        },
        {
            title: 'Game Development',
            description: 'Create interactive games and simulations',
            skills: ['Unity', 'C#', '3D Modeling'],
        },
    ];

    const teamMembers = [
        {
            name: 'Alex Chen',
            role: 'Club President',
            avatar: '/avatars/alex.jpg',
            initial: 'AC',
        },
        {
            name: 'Sarah Kim',
            role: 'Tech Lead',
            avatar: '/avatars/sarah.jpg',
            initial: 'SK',
        },
        {
            name: 'Mike Rodriguez',
            role: 'Project Manager',
            avatar: '/avatars/mike.jpg',
            initial: 'MR',
        },
        {
            name: 'Emily Wang',
            role: 'Design Lead',
            avatar: '/avatars/emily.jpg',
            initial: 'EW',
        },
    ];

    const stats = [
        { number: '50+', label: 'Active Members' },
        { number: '15+', label: 'Projects Completed' },
        { number: '8', label: 'Hackathon Wins' },
        { number: '100%', label: 'Satisfaction Rate' },
    ];

    // Data untuk dokumentasi kegiatan
    const memories = [
        {
            id: 1,
            title: 'Hackathon 2024',
            description: 'Annual coding competition with 100+ participants',
            image: '/memories/hackathon.jpg',
            date: 'March 2024',
            type: 'Competition',
            highlights: ['24-hour coding', 'Industry judges', 'Prize pool $5K'],
        },
        {
            id: 2,
            title: 'Tech Workshop Series',
            description: 'Hands-on workshops on modern technologies',
            image: '/memories/workshop.jpg',
            date: 'January 2024',
            type: 'Workshop',
            highlights: ['React Masterclass', 'Cloud Computing', 'UI/UX Design'],
        },
        {
            id: 3,
            title: 'Industry Visit',
            description: 'Visit to leading tech companies in the area',
            image: '/memories/industry-visit.jpg',
            date: 'February 2024',
            type: 'Field Trip',
            highlights: ['Google Office', 'Startup Hub', 'Networking'],
        },
        {
            id: 4,
            title: 'Project Showcase',
            description: 'Showcasing member projects to the community',
            image: '/memories/showcase.jpg',
            date: 'December 2023',
            type: 'Exhibition',
            highlights: ['Live demos', 'Guest speakers', 'Community feedback'],
        },
        {
            id: 5,
            title: 'Code Retreat',
            description: 'Weekend coding retreat in the mountains',
            image: '/memories/retreat.jpg',
            date: 'November 2023',
            type: 'Retreat',
            highlights: ['Pair programming', 'Tech talks', 'Team building'],
        },
        {
            id: 6,
            title: 'Community Outreach',
            description: 'Teaching coding to local high school students',
            image: '/memories/outreach.jpg',
            date: 'October 2023',
            type: 'Volunteering',
            highlights: ['Mentoring', 'Workshops', 'STEM education'],
        },
    ];

    // Features data untuk Why Join Us section
    const joinUsFeatures = [
        {
            icon: '🛡️',
            title: 'Cyber Security',
            description:
                "Secure the Digital World. Gain the skills to protect systems, data, and networks from modern cyber threats. Through ethical hacking, network defense, and forensic analysis, you'll learn to think like a hacker — for the right reasons.",
            stats: 'Cyber Security',
            gradient: 'from-blue-500 to-purple-600',
        },
        {
            icon: '💻',
            title: 'Programming (Web Development)',
            description:
                "Build the Web of Tomorrow. From simple websites to dynamic web applications — learn how to code, design, and deploy interactive digital experiences. You'll master both front-end and back-end development using modern tools and frameworks.",
            stats: 'Web Development',
            gradient: 'from-green-500 to-blue-600',
        },
        {
            icon: '🎨',
            title: 'UI/UX Design',
            description:
                "Design Experiences that Matter. Combine creativity and empathy to design user-centered digital products. From wireframes to prototypes, you'll learn how to create interfaces that not only look great — but feel great to use.",
            stats: 'UI/UX Design',
            gradient: 'from-pink-500 to-orange-600',
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden bg-[#161616] text-[#EFEEEA]">
            {/* Navigation */}
            <Navbar scrollToSection={scrollToSection} />

            {/* Hero Section dengan Terminal Animation */}
            <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#161616] via-[#161616] to-[#1a1a1a]"></div>

                <div className="z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                    {/* Text Content */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Badge variant="secondary" className="mb-6 bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
                            Cyber Security · Web Development · UI/UX Design
                        </Badge>

                        <h1 className="mb-6 font-primary text-5xl font-bold tracking-tight md:text-7xl">Stemba Computer Club</h1>

                        <p className="mb-8 text-xl leading-relaxed text-[var(--color-secondary)] md:text-2xl">
                            A place where students learn, share knowledge, explore new challenges, and grow together as the next wave of digital
                            innovators.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                size="sm"
                                className="bg-[#EFEEEA] px-8 text-lg text-[#161616] hover:bg-[#e0ded9]"
                                onClick={() => scrollToSection('activities')}
                            >
                                Explore Activities
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-[var(--color-secondary)] px-8 text-lg text-[#EFEEEA] hover:bg-[var(--color-secondary)]/10"
                                onClick={() => scrollToSection('memories')}
                            >
                                View Memories
                            </Button>
                        </div>
                    </div>

                    {/* Terminal Animation */}
                    <div className={`transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Card className="relative overflow-hidden border-[#00ff00] bg-[#0a0a0a] font-mono">
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent"></div>
                            <CardHeader className="border-b border-[#00ff00]/30 pb-3">
                                <div className="flex items-center space-x-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                    <span className="ml-2 text-sm text-[#00ff00]">scc-terminal — bash — 80x24</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div
                                    ref={terminalRef}
                                    className="scrollbar-thin scrollbar-thumb-green-500/20 scrollbar-track-transparent h-80 overflow-auto p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-green-400"
                                    style={{
                                        scrollBehavior: 'smooth',
                                        fontFamily: 'Monaco, Consolas, monospace',
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
            <section className="bg-[#1a1a1a] py-16">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <Card
                                key={index}
                                className="group border-[#2a2a2a] bg-[#161616] text-center transition-all duration-300 hover:scale-105 hover:border-[var(--color-secondary)]"
                            >
                                <CardContent className="p-6">
                                    <div className="mb-2 font-primary text-3xl font-bold text-[#EFEEEA] transition-colors duration-300 group-hover:text-[var(--color-secondary)] md:text-4xl">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-[#99a1af] md:text-base">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <Badge variant="secondary" className="mb-4 bg-[#99a1af] text-[#161616]">
                            About Us
                        </Badge>
                        <h2 className="mb-4 font-primary text-3xl font-bold md:text-4xl">
                            Welcome to <span className="text-[#99a1af]">Stemba Computer Club</span>
                        </h2>
                        <p className="mx-auto max-w-3xl text-xl text-[var(--color-secondary)]">
                            A vibrant community where technology enthusiasts come together to learn, innovate, and shape the future through code.
                        </p>
                    </div>
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed text-[var(--color-secondary)]">
                                Stemba Computer Club (SCC) is a student community from the SIJA Department (Information Systems, Networking, and
                                Applications) at SMKN 7 Semarang.
                            </p>
                            <p className="text-lg leading-relaxed text-[var(--color-secondary)]">
                                We are passionate about technology, programming, UI/UX design, and cybersecurity — a place where students learn, share
                                knowledge, explore new challenges, and grow together as the next wave of digital innovators.
                            </p>
                            <div className="flex gap-4">
                                <Button className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">Join Our Community</Button>
                                <Button variant="outline" className="border-[#99a1af] text-[#EFEEEA] hover:bg-[#99a1af]/10">
                                    View Projects
                                </Button>
                            </div>
                        </div>

                        <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 gap-4">
                                    {features.map((feature, index) => (
                                        <div
                                            key={feature.title}
                                            className="rounded-lg border border-[#2a2a2a] bg-[#161616] p-4 transition-all duration-300 hover:border-[#99a1af]"
                                        >
                                            <div className="mb-2 text-2xl">{feature.icon}</div>
                                            <h3 className="mb-1 font-primary font-bold text-[#EFEEEA]">{feature.title}</h3>
                                            <p className="text-sm text-[#99a1af]">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Memories/Documentation Section */}
            <section id="memories" className="bg-[#161616] py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-16 text-center">
                        <Badge variant="secondary" className="mb-4 bg-[var(--color-secondary)] text-[#161616]">
                            Our Memories
                        </Badge>
                        <h2 className="mb-4 font-primary text-3xl font-bold md:text-4xl">
                            Club <span className="text-[var(--color-secondary)]">Activities</span>
                        </h2>
                        <p className="mx-auto max-w-3xl text-xl text-[var(--color-secondary)]">
                            Relive the amazing moments and events that make our community special
                        </p>
                    </div>

                    {/* Memories Grid */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {memories.map((memory) => (
                            <Card
                                key={memory.id}
                                className="group overflow-hidden border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 hover:scale-105 hover:border-[var(--color-secondary)]"
                            >
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[var(--color-secondary)]/20 to-[#EFEEEA]/10">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60"></div>
                                    <div className="absolute right-4 bottom-4 left-4">
                                        <div className="flex items-center justify-between">
                                            <Badge className="bg-[#161616] text-[var(--color-secondary)]">{memory.type}</Badge>
                                            <span className="rounded bg-[#161616] px-2 py-1 text-xs text-[var(--color-secondary)]">
                                                {memory.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="font-primary text-[#EFEEEA] transition-colors duration-300 group-hover:text-[var(--color-secondary)]">
                                        {memory.title}
                                    </CardTitle>
                                    <CardDescription className="text-[var(--color-secondary)]">{memory.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {memory.highlights.map((highlight, index) => (
                                            <div key={index} className="flex items-center text-sm text-[var(--color-secondary)]">
                                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-[var(--color-secondary)]"></div>
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

            {/* Animated Feature Showcase - Only 3 Feature Cards */}
            <section className="mb-16 px-12">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Left Side - Feature Cards */}
                    <div className="space-y-6">
                        <div className="relative h-96">
                            {joinUsFeatures.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className={`absolute inset-0 transform transition-all duration-1000 ${
                                        index === activeFeature ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                    }`}
                                >
                                    <Card className="relative h-full overflow-hidden border-[#2a2a2a] bg-gradient-to-br from-[#161616] to-[#1a1a1a]">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10`}></div>
                                        <CardContent className="relative z-10 flex h-full flex-col justify-center p-8">
                                            <div className="mb-4 text-5xl">{feature.icon}</div>
                                            <h3 className="mb-3 font-primary text-2xl font-bold text-[#EFEEEA]">{feature.title}</h3>
                                            <p className="mb-6 text-lg text-[var(--color-secondary)]">{feature.description}</p>
                                            <div className="font-primary text-3xl font-bold text-[var(--color-secondary)]">{feature.stats}</div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>

                        {/* Feature Navigation Dots - Moved under the cards */}
                        <div className="flex justify-center space-x-3">
                            {joinUsFeatures.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleFeatureChange(index)}
                                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                        index === activeFeature
                                            ? 'w-8 bg-[var(--color-secondary)]'
                                            : 'bg-[var(--color-secondary)]/30 hover:bg-[var(--color-secondary)]/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Achievements Content */}
                    <div className="space-y-6">
                        <h3 className="mb-6 font-primary text-2xl font-bold text-[#EFEEEA]">What You'll Achieve</h3>
                        {activeFeature === 0 && ( // Cyber Security
                            <>
                                {[
                                    'Learn ethical hacking and penetration testing fundamentals',
                                    'Understand how to secure systems and prevent cyberattacks',
                                    'Explore digital forensics and incident response',
                                    'Join CTF (Capture The Flag) competitions to test your skills',
                                    'Build a solid foundation for a cybersecurity career',
                                ].map((item, index) => (
                                    <div key={index} className="group flex items-start space-x-4">
                                        <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-secondary)] transition-transform duration-300 group-hover:scale-110">
                                            <div className="h-2 w-2 rounded-full bg-[#161616]"></div>
                                        </div>
                                        <p className="flex-1 text-lg text-[var(--color-secondary)] transition-colors duration-300 group-hover:text-[#EFEEEA]">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                                <div className="mt-8 border-t border-[#2a2a2a] pt-6">
                                    <h4 className="mb-3 font-primary text-lg font-bold text-[#EFEEEA]">Pathway to the Future:</h4>
                                    <p className="text-lg text-[var(--color-secondary)]">Cyber Analyst • Penetration Tester • Security Engineer</p>
                                </div>
                            </>
                        )}
                        {activeFeature === 1 && ( // Programming
                            <>
                                {[
                                    'Learn HTML, CSS, and JavaScript fundamentals',
                                    'Build responsive websites with modern frameworks',
                                    'Collaborate on real projects using Git and teamwork tools',
                                    'Gain hands-on experience through coding challenges and hackathons',
                                    'Create a portfolio that showcases your coding journey',
                                ].map((item, index) => (
                                    <div key={index} className="group flex items-start space-x-4">
                                        <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-secondary)] transition-transform duration-300 group-hover:scale-110">
                                            <div className="h-2 w-2 rounded-full bg-[#161616]"></div>
                                        </div>
                                        <p className="flex-1 text-lg text-[var(--color-secondary)] transition-colors duration-300 group-hover:text-[#EFEEEA]">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                                <div className="mt-8 border-t border-[#2a2a2a] pt-6">
                                    <h4 className="mb-3 font-primary text-lg font-bold text-[#EFEEEA]">Pathway to the Future:</h4>
                                    <p className="text-lg text-[var(--color-secondary)]">Web Developer • Front-End Engineer • Full-Stack Developer</p>
                                </div>
                            </>
                        )}
                        {activeFeature === 2 && ( // UI/UX Design
                            <>
                                {[
                                    'Understand the principles of good design and usability',
                                    'Learn how to use tools like Figma and Adobe XD',
                                    'Conduct user research and testing for real-world insight',
                                    'Create interactive prototypes and design systems',
                                    'Build a professional design portfolio that stands out',
                                ].map((item, index) => (
                                    <div key={index} className="group flex items-start space-x-4">
                                        <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-secondary)] transition-transform duration-300 group-hover:scale-110">
                                            <div className="h-2 w-2 rounded-full bg-[#161616]"></div>
                                        </div>
                                        <p className="flex-1 text-lg text-[var(--color-secondary)] transition-colors duration-300 group-hover:text-[#EFEEEA]">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                                <div className="mt-8 border-t border-[#2a2a2a] pt-6">
                                    <h4 className="mb-3 font-primary text-lg font-bold text-[#EFEEEA]">Pathway to the Future:</h4>
                                    <p className="text-lg text-[var(--color-secondary)]">UI/UX Designer • Product Designer • Interaction Designer</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-[#1a1a1a] py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <Badge variant="secondary" className="mb-4 bg-[#99a1af] text-[#161616]">
                            Why Join Us
                        </Badge>
                        <h2 className="mb-4 font-primary text-3xl font-bold md:text-4xl">
                            What Makes Us <span className="text-[#99a1af]">Different</span>
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: 'Mentorship Program',
                                description: 'Get guidance from experienced mentors and industry professionals',
                                icon: '🎯',
                            },
                            {
                                title: 'Project Portfolio',
                                description: 'Build an impressive portfolio of real-world projects',
                                icon: '💼',
                            },
                            {
                                title: 'Career Development',
                                description: 'Prepare for tech careers with interview prep and resume workshops',
                                icon: '🚀',
                            },
                            {
                                title: 'Community Events',
                                description: 'Participate in workshops, tech talks, and networking events',
                                icon: '👥',
                            },
                            {
                                title: 'Resource Library',
                                description: 'Access curated learning resources and tools',
                                icon: '📚',
                            },
                            {
                                title: 'Flexible Learning',
                                description: 'Learn at your own pace with structured learning paths',
                                icon: '⏱️',
                            },
                        ].map((feature, index) => (
                            <Card
                                key={feature.title}
                                className="group border-[#2a2a2a] bg-[#161616] transition-all duration-300 hover:border-[#EFEEEA]"
                            >
                                <CardHeader>
                                    <div className="mb-2 text-3xl transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>
                                    <CardTitle className="font-primary text-[#EFEEEA]">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-[#99a1af]">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Activities Section */}
            <section id="activities" className="px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <Badge variant="secondary" className="mb-4 bg-[#99a1af] text-[#161616]">
                            Our Focus Areas
                        </Badge>
                        <h2 className="mb-4 font-primary text-3xl font-bold md:text-4xl">
                            Explore <span className="text-[#99a1af]">Technologies</span>
                        </h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {activities.map((activity, index) => (
                            <Card
                                key={activity.title}
                                className="group border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 hover:scale-105 hover:border-[#99a1af]"
                            >
                                <CardHeader>
                                    <CardTitle className="font-primary text-[#EFEEEA] transition-colors duration-300 group-hover:text-[#99a1af]">
                                        {activity.title}
                                    </CardTitle>
                                    <CardDescription className="text-[#99a1af]">{activity.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {activity.skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="border-[#2a2a2a] bg-[#161616] text-[var(--color-secondary)]"
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
            <section id="team" className="bg-[#1a1a1a] py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-16 text-center">
                        <Badge variant="secondary" className="mb-4 bg-[#99a1af] text-[#161616]">
                            Meet The Team
                        </Badge>
                        <h2 className="mb-4 font-primary text-3xl font-bold md:text-4xl">
                            Our <span className="text-[#99a1af]">Leadership</span>
                        </h2>
                        <p className="mx-auto max-w-3xl text-xl text-[#99a1af]">
                            Passionate students dedicated to making technology education accessible to all.
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member) => (
                            <Card
                                key={member.name}
                                className="border-[#2a2a2a] bg-[#161616] text-center transition-all duration-300 hover:scale-105 hover:border-[var(--color-secondary)]"
                            >
                                <CardContent className="p-6">
                                    <Avatar className="mx-auto mb-4 h-20 w-20">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback className="bg-[#EFEEEA] font-primary text-[#161616]">{member.initial}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="font-primary text-[#EFEEEA]">{member.name}</CardTitle>
                                    <CardDescription className="mt-2 text-[#99a1af]">{member.role}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="px-6 py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <Card className="border-[#2a2a2a] bg-[#1a1a1a]">
                        <CardContent className="p-12">
                            <Badge variant="secondary" className="mb-4 bg-[#EFEEEA] text-[#161616]">
                                Limited Spots Available
                            </Badge>
                            <h2 className="mb-4 font-primary text-3xl font-bold text-[#99a1af] md:text-4xl">Ready to Start Your Tech Journey</h2>
                            <p className="mx-auto mb-8 max-w-2xl text-xl text-[var(--color-secondary)]">
                                Join Stemba Computer Club today and become part of a community that's shaping the future of technology.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="lg" className="bg-[#EFEEEA] px-8 text-lg text-[#161616] hover:bg-[#e0ded9]">
                                            Apply Now
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="border-[#2a2a2a] bg-[#1a1a1a] text-[#EFEEEA]">
                                        <DialogHeader>
                                            <DialogTitle className="font-primary">Application Form</DialogTitle>
                                            <DialogDescription className="text-[#99a1af]">
                                                Fill out your details to join Stemba Computer Club
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <Input placeholder="Full Name" className="border-[#2a2a2a] bg-[#161616]" />
                                            <Input placeholder="Email" className="border-[#2a2a2a] bg-[#161616]" />
                                            <Input placeholder="Grade/Year" className="border-[#2a2a2a] bg-[#161616]" />
                                            <Button className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">Submit Application</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-[#99a1af] px-8 text-lg text-[#EFEEEA] hover:bg-[#99a1af]/10"
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
