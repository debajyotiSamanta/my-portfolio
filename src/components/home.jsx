import myImage from "../assets/my_image.png";

export default function Home() {
  return (
    <section className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-950 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 animate__animated animate__fadeInUp" id="home">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8 animate__animated animate__slideInLeft">
            {/* Greeting Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-500/30 dark:to-purple-500/30 text-blue-100 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-bold border border-blue-500/50 dark:border-blue-500/40 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
              Crafting Digital Experiences
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <div>
                <p className="text-gray-300 dark:text-gray-400 text-lg mb-2 font-bold">Welcome, I'm</p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white dark:text-white leading-tight tracking-tight">
                  Debajyoti{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                    Samanta
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 dark:text-gray-200">
                  Frontend Developer & UI/UX Enthusiast
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 dark:text-gray-400 leading-relaxed max-w-lg font-medium">
              I specialize in building beautiful, responsive, and user-focused web applications. Armed with modern web technologies, I transform ideas into seamless digital experiences that matter.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl shadow-blue-900/50 dark:shadow-blue-600/40 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border-2 border-gray-600 dark:border-gray-500 text-gray-100 dark:text-white font-bold py-3 px-8 rounded-lg hover:border-blue-500 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-blue-400 dark:hover:text-blue-300 hover:text-blue-300 transition-all duration-300 hover:shadow-lg"
              >
                Start a Project
                <i className="ri-mail-line"></i>
              </a>
              <a
                href="/src/assets/my_resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-gray-800 dark:bg-gray-700 text-gray-100 dark:text-white border border-gray-600 dark:border-gray-500 font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300"
                title="Download Resume"
              >
                Download Resume
                <i className="ri-download-line"></i>
              </a>
              <a
                href="/src/assets/Debajyoti Samanta CV.pdf"
                download
                className="inline-flex items-center gap-2 bg-gray-800 dark:bg-gray-700 text-gray-100 dark:text-white border border-gray-600 dark:border-gray-500 font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300"
                title="Download CV"
              >
                Download CV
                <i className="ri-download-line"></i>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-8 flex-wrap">
              <a
                href="https://www.linkedin.com/in/debajyoti-samanta-b49b292b5/"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-xl hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                title="LinkedIn"
              >
                <i className="ri-linkedin-box-line group-hover:scale-125 transition-transform"></i>
              </a>
              <a
                href="https://github.com/debajyotiSamanta"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center text-xl hover:shadow-lg hover:shadow-slate-900/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                title="GitHub"
              >
                <i className="ri-github-line group-hover:scale-125 transition-transform"></i>
              </a>
              <a
                href="https://www.instagram.com/unique_engineer_07/"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center text-xl hover:shadow-lg hover:shadow-rose-600/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                title="Instagram"
              >
                <i className="ri-instagram-line group-hover:scale-125 transition-transform"></i>
              </a>
              <a
                href="https://www.facebook.com/debajyoti.samanta.588680"
                target="_blank"
                rel="noreferrer"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center text-xl hover:shadow-lg hover:shadow-blue-700/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                title="Facebook"
              >
                <i className="ri-facebook-circle-line group-hover:scale-125 transition-transform"></i>
              </a>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative animate__animated animate__slideInRight">
            {/* Background Blob */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            
            {/* Image Container */}
            <div className="relative bg-gray-900 dark:bg-gray-800 rounded-3xl p-2 shadow-2xl shadow-black/50 overflow-hidden">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 aspect-square flex items-center justify-center">
                <img
                  src={myImage}
                  alt="Debajyoti Samanta"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-gray-900 dark:bg-gray-800 rounded-xl p-4 shadow-2xl shadow-black/60 backdrop-blur-md border border-gray-700 dark:border-gray-600 animate__animated animate__slideInUp" style={{ animationDelay: "0.3s" }}>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-400">15+</div>
                <div className="text-sm text-gray-300 dark:text-gray-400 font-bold">Projects</div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-gray-900 dark:bg-gray-800 rounded-xl p-4 shadow-2xl shadow-black/60 backdrop-blur-md border border-gray-700 dark:border-gray-600 animate__animated animate__slideInDown" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <div className="text-2xl font-black text-purple-400">3+</div>
                <div className="text-sm text-gray-300 dark:text-gray-400 font-bold">Years Exp</div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {/* Biography Card */}
          <div className="group relative bg-gray-900 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl shadow-black/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 dark:border-gray-600 backdrop-blur-sm overflow-hidden animate__animated animate__fadeInUp" style={{ animationDelay: "0.1s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-2xl text-white shadow-lg shadow-blue-600/50">
                <i className="ri-user-heart-line"></i>
              </div>
              <h3 className="text-xl font-black text-white dark:text-white">About Me</h3>
            </div>
            <p className="text-gray-300 dark:text-gray-400 leading-relaxed text-sm font-medium">
              Passionate IT student at Meghnad Saha Institute of Technology. I specialize in creating elegant solutions to complex problems with modern web technologies.
            </p>
          </div>

          {/* Contact Card */}
          <div className="group relative bg-gray-900 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl shadow-black/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 dark:border-gray-600 backdrop-blur-sm overflow-hidden animate__animated animate__fadeInUp" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-2xl text-white shadow-lg shadow-green-600/50">
                <i className="ri-mail-send-line"></i>
              </div>
              <h3 className="text-xl font-black text-white dark:text-white">Get in Touch</h3>
            </div>
            <div className="space-y-3 relative z-10">
              <p className="text-gray-300 dark:text-gray-400 text-sm font-medium">
                <span className="font-bold text-white dark:text-white">Email</span>
                <br />
                <a href="mailto:debajyotisamanta2003@gmail.com" className="text-green-400 dark:text-green-400 hover:underline font-semibold">debajyotisamanta2003@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Skills Card */}
          <div className="group relative bg-gray-900 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl shadow-black/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 dark:border-gray-600 backdrop-blur-sm overflow-hidden animate__animated animate__fadeInUp" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center text-2xl text-white shadow-lg shadow-purple-600/50">
                <i className="ri-lightbulb-flash-line"></i>
              </div>
              <h3 className="text-xl font-black text-white dark:text-white">Expertise</h3>
            </div>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400 relative z-10 text-sm font-medium">
              <li className="flex items-center gap-2 group/item">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 group-hover/item:scale-150 transition-transform"></span>
                React & Modern JavaScript
              </li>
              <li className="flex items-center gap-2 group/item">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 group-hover/item:scale-150 transition-transform"></span>
                Responsive Web Design
              </li>
              <li className="flex items-center gap-2 group/item">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 group-hover/item:scale-150 transition-transform"></span>
                UI/UX Development
              </li>
            </ul>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-20 opacity-70 hover:opacity-100 transition-opacity">
          <div className="text-center">
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-3 font-bold">Explore My Work</p>
            <div className="flex justify-center">
              <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-500 rounded-full p-2 flex justify-center">
                <div className="w-1 h-3 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}