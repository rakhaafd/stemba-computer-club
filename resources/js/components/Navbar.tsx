import { Button } from '@components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

interface NavbarProps {
    scrollToSection: (sectionId: string) => any;
}

const Navbar = ({ scrollToSection }: NavbarProps) => {
    const { props } = usePage();
    const [email, setEmail] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const menuItems = ['about', 'features', 'activities', 'team', 'contact'];

    // Get auth from page props
    const auth = props.auth as { user: User | null } | undefined;
    const user = auth?.user;

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-[#2a2a2a] bg-[#161616]/90 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFEEEA]">
                            <span className="font-primary text-lg font-bold text-[#161616]">SCC</span>
                        </div>
                        <span className="font-primary text-xl font-bold">SCC</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-8 md:flex">
                        {menuItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className="cursor-pointer font-medium text-[var(--color-secondary)] capitalize transition-colors duration-200 hover:text-[#efeeea7b]"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Right Side - Auth Section */}
                    <div className="flex items-center gap-4">
                        {/* Desktop - Auth Buttons */}
                        <div className="hidden items-center gap-4 md:flex">
                            {user ? (
                                // User is logged in - Show avatar dropdown
                                <div className="relative">
                                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2 focus:outline-none">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFEEEA]">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                                            ) : (
                                                <span className="text-sm font-bold text-[#161616]">{user.name.charAt(0).toUpperCase()}</span>
                                            )}
                                        </div>
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] py-1 shadow-lg">
                                            <div className="border-b border-[#2a2a2a] px-4 py-2 text-sm text-[#EFEEEA]">{user.name}</div>
                                            <a
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-[var(--color-secondary)] transition-colors duration-200 hover:bg-[#2a2a2a] hover:text-[#EFEEEA]"
                                            >
                                                Edit Profile
                                            </a>
                                            <div className="my-1 border-t border-[#2a2a2a]"></div>
                                            <Link
                                                href="/auth/logout"
                                                method="post"
                                                as="button"
                                                className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-[var(--color-secondary)] transition-colors duration-200 hover:bg-[#2a2a2a] hover:text-[#EFEEEA]"
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // User is not logged in - Show login button
                                <a
                                    href="/auth/login"
                                    className="font-medium text-[var(--color-secondary)] transition-colors duration-200 hover:text-[#EFEEEA]"
                                >
                                    Login
                                </a>
                            )}
                        </div>

                        {/* Join Waitlist/Attendance Button - Desktop */}
                        <div className="hidden md:block">
                            <Link href="/user/presensi">
                                <Button className="bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">Attendance</Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-[var(--color-secondary)] transition-colors duration-200 hover:text-[#EFEEEA]"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mt-4 border-t border-[#2a2a2a] pt-4 pb-4 md:hidden">
                        <div className="flex flex-col space-y-4">
                            {menuItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        scrollToSection(item);
                                        setIsMenuOpen(false);
                                    }}
                                    className="py-2 text-left font-medium text-[var(--color-secondary)] capitalize transition-colors duration-200 hover:text-[#efeeea7b]"
                                >
                                    {item}
                                </button>
                            ))}

                            {/* Mobile Auth Section */}
                            <div className="border-t border-[#2a2a2a] pt-2">
                                {user ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 py-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFEEEA]">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                                                ) : (
                                                    <span className="text-sm font-bold text-[#161616]">{user.name.charAt(0).toUpperCase()}</span>
                                                )}
                                            </div>
                                            <span className="font-medium text-[#EFEEEA]">{user.name}</span>
                                        </div>
                                        <a
                                            href="/profile"
                                            className="block w-full py-2 text-left text-[var(--color-secondary)] transition-colors duration-200 hover:text-[#EFEEEA]"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Edit Profile
                                        </a>
                                        <Link
                                            href="/auth/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full cursor-pointer py-2 text-left text-[var(--color-secondary)] transition-colors duration-200 hover:text-[#EFEEEA]"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                ) : (
                                    <a
                                        href="/auth/login"
                                        className="block w-full py-2 text-center font-medium text-[var(--color-secondary)] transition-colors duration-200 hover:text-[#EFEEEA]"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </a>
                                )}
                            </div>

                            {/* Attendance Button - Mobile */}
                            <div className="pt-2">
                                <Link href="/user/presensi" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">Attendance</Button>
                                </Link>
                            </div>

                            {/* Join Waitlist Button - Mobile */}
                            <div className="pt-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">Join Waitlist</Button>
                                    </DialogTrigger>
                                    <DialogContent className="border-[#2a2a2a] bg-[#1a1a1a] text-[#EFEEEA]">
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
                                                className="border-[#2a2a2a] bg-[#161616] text-[#EFEEEA]"
                                            />
                                            <Button className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">Notify Me</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
