import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    const form = document.getElementById("contact-form");
    const name = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const project = document.getElementById("contact-project");
    const message = document.getElementById("contact-message");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!name?.value || !email?.value || !project?.value) {
        if (message) {
          message.textContent = "Fill all the input fields";
          message.className = "text-center py-2 font-semibold text-red-600 dark:text-red-400";
        }
      } else {
        if (message) {
          message.textContent = "Message sent";
          message.className = "text-center py-2 font-semibold text-green-600 dark:text-green-400";
        }
        setTimeout(() => (message && (message.textContent = "")), 5000);
        if (name) name.value = "";
        if (email) email.value = "";
        if (project) project.value = "";
      }
    });
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 animate__animated animate__fadeInUp" id="contact">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Get in Touch</span>
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate__animated animate__slideInDown">
            Contact Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 animate__animated animate__slideInUp max-w-2xl mx-auto font-light">
            Let's discuss your project and create something amazing together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="animate__animated animate__slideInLeft">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <i className="ri-chat-3-line text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Let's Connect</h3>
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full ml-4"></div>
            </div>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="group relative bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <span className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                      <i className="ri-mail-line text-lg"></i>
                    </div>
                    Email
                  </span>
                  <a href="mailto:debajyotisamanta2003@gmail.com" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 break-all transition-colors font-light">
                    debajyotisamanta2003@gmail.com
                  </a>
                </div>
              </div>

              {/* Whatsapp */}
              <div className="group relative bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <span className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
                      <i className="ri-whatsapp-line text-lg"></i>
                    </div>
                    WhatsApp
                  </span>
                  <a href="https://api.whatsapp.com/send?phone=919564555918&text=Hello, more information!"
                     target="_blank" rel="noreferrer" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors font-light">
                    +91 9564555918
                  </a>
                </div>
              </div>

              {/* Additional Info */}
              <div className="group relative bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <span className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
                      <i className="ri-map-pin-line text-lg"></i>
                    </div>
                    Location
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 font-light">
                    West Bengal, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="animate__animated animate__slideInRight">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <i className="ri-quill-pen-line text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send a Message</h3>
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full ml-4"></div>
            </div>
            
            <form className="space-y-6" id="contact-form">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Full Name</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  className="w-full px-5 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800/50 dark:text-white rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-600/30 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 font-light"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Email Address</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  className="w-full px-5 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800/50 dark:text-white rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-600/30 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 font-light"
                  placeholder="john@example.com"
                />
              </div>

              {/* Project Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Project Details</label>
                <input 
                  type="text" 
                  id="contact-project" 
                  className="w-full px-5 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800/50 dark:text-white rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-600/30 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 font-light"
                  placeholder="Describe your project needs..."
                />
              </div>

              {/* Message Display */}
              <p id="contact-message" className="text-center py-3 font-semibold min-h-[2.5rem] transition-colors duration-300"></p>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send Message
                  <i className="ri-send-plane-2-line group-hover:translate-x-1 transition-transform"></i>
                </span>
              </button>

              <p className="text-center text-xs text-gray-500 dark:text-gray-400 font-light">
                I'll respond to your message as soon as possible
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
