export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/debajyoti-samanta-b49b292b5/",
      icon: "ri-linkedin-box-line",
      label: "LinkedIn",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-900 dark:bg-blue-900/30"
    },
    {
      href: "https://github.com/debajyotiSamanta",
      icon: "ri-github-line",
      label: "GitHub",
      gradient: "from-slate-700 to-slate-900",
      bgColor: "bg-gray-700 dark:bg-slate-900/30"
    },
    {
      href: "https://www.instagram.com/unique_engineer_07/",
      icon: "ri-instagram-line",
      label: "Instagram",
      gradient: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-900 dark:bg-pink-900/30"
    },
    {
      href: "https://www.facebook.com/debajyoti.samanta.588680",
      icon: "ri-facebook-circle-line",
      label: "Facebook",
      gradient: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-900 dark:bg-blue-900/30"
    }
  ];

  const footerSections = {
    "Navigation": [
      { label: "Home", href: "#home", icon: "ri-home-5-line" },
      { label: "Skills", href: "#skills", icon: "ri-trophy-line" },
      { label: "Projects", href: "#projects", icon: "ri-image-line" }
    ],
    "Resources": [
      { label: "Qualification", href: "#qualification", icon: "ri-book-open-line" },
      { label: "Services", href: "#services", icon: "ri-briefcase-line" },
      { label: "Contact", href: "#contact", icon: "ri-chat-3-line" }
    ]
  };

  const contactInfo = [
    { icon: "ri-mail-line", label: "Email", value: "debajyotisamanta2003@gmail.com", link: "mailto:debajyotisamanta2003@gmail.com" },
    { icon: "ri-whatsapp-line", label: "WhatsApp", value: "+91 9564555918", link: "https://api.whatsapp.com/send?phone=919564555918" },
    { icon: "ri-map-pin-line", label: "Location", value: "West Bengal, India", link: null }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 border-t border-gray-700 dark:border-gray-800 transition-colors animate__animated animate__fadeInUp overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          {/* Top Section with CTA */}
          <div className="mb-12 animate__animated animate__fadeInUp">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 border border-blue-200 dark:border-blue-900/50 rounded-3xl p-8 text-center backdrop-blur-sm">
              <h3 className="text-3xl md:text-4xl font-bold text-white dark:text-white mb-4">
                Ready to Create Something <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Extraordinary?</span>
              </h3>
              <p className="text-gray-300 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-medium">
                Let's collaborate and bring your digital vision to life with creativity and innovation.
              </p>
              <a href="#contact" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <span>Start Your Project</span>
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-12"></div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand & Social Section */}
            <div className="space-y-5 animate__animated animate__fadeInUp">
              <div>
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    D
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white dark:text-white">DEBAJYOTI SAMANTA</p>
                    <p className="text-xs text-gray-400 dark:text-gray-400">Developer</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 dark:text-gray-400 leading-relaxed font-medium">
                Crafting beautiful, responsive digital experiences with modern technologies and creative vision.
              </p>
              
              <div className="space-y-3 pt-3 border-t border-gray-700 dark:border-gray-800">
                <p className="text-sm font-bold text-white dark:text-white uppercase tracking-wider">Follow On Social</p>
                <div className="flex gap-2.5 flex-wrap">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      title={social.label}
                      className={`w-12 h-12 rounded-full ${social.bgColor} bg-gradient-to-br ${social.gradient} text-white flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 group`}
                    >
                      <i className={`${social.icon} group-hover:scale-125 transition-transform`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Column 1 */}
            <div className="animate__animated animate__fadeInUp" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-lg font-bold text-white dark:text-white mb-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm"></div>
                <span>Navigation</span>
              </h3>
              <ul className="space-y-3">
                {footerSections.Navigation.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition-all duration-300 text-sm font-medium flex items-center gap-3 group hover:translate-x-1"
                    >
                      <i className={`${link.icon} opacity-0 group-hover:opacity-100 transition-opacity`}></i>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="animate__animated animate__fadeInUp" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-lg font-bold text-white dark:text-white mb-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm"></div>
                <span>Resources</span>
              </h3>
              <ul className="space-y-3">
                {footerSections.Resources.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition-all duration-300 text-sm font-medium flex items-center gap-3 group hover:translate-x-1"
                    >
                      <i className={`${link.icon} opacity-0 group-hover:opacity-100 transition-opacity`}></i>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="animate__animated animate__fadeInUp" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-bold text-white dark:text-white mb-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm"></div>
                <span>Get In Touch</span>
              </h3>
              <ul className="space-y-3">
                {contactInfo.map((item, i) => (
                  <li key={i}>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={!item.link.startsWith("mailto") ? "_blank" : undefined}
                        rel={!item.link.startsWith("mailto") ? "noreferrer" : undefined}
                        className="text-gray-300 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400 transition-all duration-300 text-sm font-medium flex items-start gap-3 group"
                      >
                        <i className={`${item.icon} text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform`}></i>
                        <div className="group-hover:translate-x-1 transition-transform">
                          <p className="text-xs text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-0.5 font-medium">{item.label}</p>
                          <p className="break-all text-gray-100 dark:text-gray-100">{item.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="text-gray-300 dark:text-gray-400 text-sm font-medium flex items-start gap-3">
                        <i className={`${item.icon} text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0`}></i>
                        <div>
                          <p className="text-xs text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-0.5 font-medium\">{item.label}</p>
                          <p className="text-gray-100 dark:text-gray-100\">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-12"></div>

          {/* Bottom Section */}
          <div className="animate__animated animate__fadeInUp" style={{ animationDelay: "0.4s" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-300 dark:text-gray-400 font-medium">
              <div className="text-center md:text-left">
                {/* <p className="mb-1 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-600">Legal</p> */}
                <p>© {currentYear} Debajyoti Samanta. All rights reserved.</p>
              </div>
              <div className="text-center">
                {/* <p className="mb-1 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-600">Crafted With</p> */}
                <p>
                  Built with <span className="text-red-500 animate-pulse">❤</span> & <span className="text-blue-600 dark:text-blue-400 font-semibold">passion</span>
                </p>
              </div>
              <div className="text-center md:text-right">
                {/* <p className="mb-1 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-600">Design</p> */}
                <p>Designed & developed by Debajyoti Samanta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}