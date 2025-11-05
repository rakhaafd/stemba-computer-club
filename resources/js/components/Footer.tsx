const Footer = () => {
  return (
    <footer className="border-t border-[#2a2a2a] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
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
  );
};

export default Footer;