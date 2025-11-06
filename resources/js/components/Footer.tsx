const Footer = () => {
    return (
        <footer className="border-t border-[#2a2a2a] px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFEEEA]">
                                <span className="font-primary text-lg font-bold text-[#161616]">SCC</span>
                            </div>
                            <span className="font-primary text-xl font-bold">Stemba Computer Club</span>
                        </div>
                        <p className="max-w-md text-[--color-secondary]">
                            Empowering the next generation of tech innovators through collaborative learning and hands-on projects.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 font-primary font-bold text-[#EFEEEA]">Contact</h3>
                        <div className="space-y-2 text-[--color-secondary]">
                            <div>stembascc@gmail.com</div>
                            <div>@scc_stemba on instagram</div>
                            <div>Meeting: Every Friday 3-5 PM</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-[#2a2a2a] pt-8 text-center text-[--color-secondary]">
                    <p>&copy; 2025 Stemba Computer Club. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
