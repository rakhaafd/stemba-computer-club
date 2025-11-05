import { useState } from 'react';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/dialog';

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

const Navbar = ({ scrollToSection }: NavbarProps) => {
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['about', 'features', 'activities', 'team', 'contact'];

  return (
    <nav className="fixed top-0 w-full bg-[#161616]/90 backdrop-blur-sm z-50 border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EFEEEA] rounded-full flex items-center justify-center">
              <span className="text-[#161616] font-bold text-lg font-primary">SCC</span>
            </div>
            <span className="text-xl font-bold font-primary">SCC</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-[var(--color-secondary)] hover:text-[#efeeea7b] transition-colors duration-200 cursor-pointer capitalize font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--color-secondary)] hover:text-[#EFEEEA] transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Join Waitlist Button - Desktop */}
          <div className="hidden md:block">
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#2a2a2a] pt-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item);
                    setIsMenuOpen(false);
                  }}
                  className="text-[var(--color-secondary)] hover:text-[#efeeea7b] transition-colors duration-200 capitalize font-medium text-left py-2"
                >
                  {item}
                </button>
              ))}
              <div className="pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#EFEEEA] text-[#161616] hover:bg-[#e0ded9]">
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;