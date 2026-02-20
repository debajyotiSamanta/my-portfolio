
export default function Services() {
  const services = [
    {
      icon: "ri-layout-4-line",
      title: "UI/UX Design",
      desc: "Creating intuitive, beautiful interfaces that users love. I focus on user-centered design principles and modern aesthetics.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "ri-code-line",
      title: "Web Development",
      desc: "Building responsive, performant websites using modern technologies. From concept to deployment, I ensure quality code.",
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: "ri-palette-line",
      title: "Brand Design",
      desc: "Developing cohesive visual identities that represent your brand. Logo design, color schemes, and brand guidelines.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "ri-computer-line",
      title: "Software Developer Engineer",
      desc: "Developing robust, scalable software solutions with clean code architecture. Expertise in full-stack development and software engineering best practices.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 animate__animated animate__fadeInUp" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">What I Offer</span>
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-white mb-4 animate__animated animate__slideInDown">
            Services
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-400 animate__animated animate__slideInUp max-w-2xl mx-auto font-medium">
            Comprehensive solutions to bring your digital vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-8 border border-gray-700 dark:border-gray-600 backdrop-blur-sm overflow-hidden animate__animated animate__fadeInUp"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Icon Container */}
              <div className={`relative z-10 w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} p-3 mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center text-white text-3xl`}>
                <i className={service.icon}></i>
              </div>

              {/* Content */}
              <h2 className="relative z-10 text-2xl font-bold text-white dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-br ${service.color} group-hover:bg-clip-text transition-all duration-300">
                {service.title}
              </h2>
              <p className="relative z-10 text-gray-300 dark:text-gray-400 leading-relaxed font-medium mb-6">
                {service.desc}
              </p>

              {/* Divider */}
              <div className="relative z-10 h-1 w-0 group-hover:w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"></div>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}