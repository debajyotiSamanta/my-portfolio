

export default function Testimonial() {
  const testimonials = [
    {
      quote: "Debajyoti's attention to detail and modern design approach transformed our vision into reality. Highly professional and excellent communication throughout the project.",
      name: "Sarah Johnson",
      subtitle: "Startup Founder",
      avatar: "SJ",
      icon: "ri-star-line",
      color: "from-blue-500 to-cyan-500",
      rating: 5
    },
    {
      quote: "Working with Debajyoti was seamless. The code quality, responsiveness of the website, and design execution were all top-notch. Recommended!",
      name: "Michael Chen",
      subtitle: "Digital Marketing Manager",
      avatar: "MC",
      icon: "ri-thumb-up-line",
      color: "from-green-500 to-emerald-500",
      rating: 5
    },
    {
      quote: "As a non-technical founder, Debajyoti made the development process so easy to understand. Great developer and even better at client management.",
      name: "Emma Williams",
      subtitle: "E-commerce Business Owner",
      avatar: "EW",
      icon: "ri-heart-line",
      color: "from-pink-500 to-rose-500",
      rating: 5
    },
    {
      quote: "I believe in building secure, scalable applications that protect user data. Authentication and security are crucial for earning trust.",
      name: "Debajyoti Samanta",
      subtitle: "Frontend Developer",
      avatar: "DS",
      icon: "ri-shield-check-line",
      color: "from-purple-500 to-indigo-500",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 animate__animated animate__fadeInUp relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center gap-3 mb-6 bg-gray-800 dark:bg-blue-900/20 px-4 py-2 rounded-full border border-gray-700 dark:border-blue-800/50 backdrop-blur-sm">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Testimonials & Feedback</span>
            <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-white mb-6 animate__animated animate__slideInDown">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-400 max-w-2xl mx-auto font-medium animate__animated animate__slideInUp">
            Real feedback from satisfied clients who trusted me with their projects
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-700 dark:border-gray-600 p-8 animate__animated animate__fadeInUp backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              {/* Top Decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 opacity-5 rounded-full -mr-12 -mt-12 transition-all duration-300 group-hover:scale-150"></div>

              {/* Rating Stars */}
              <div className="relative z-10 flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, idx) => (
                  <i key={idx} className="ri-star-fill text-yellow-400 text-sm"></i>
                ))}
              </div>

              {/* Quote Text */}
              <p className="relative z-10 text-gray-200 dark:text-gray-300 mb-8 leading-relaxed italic font-medium text-base">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="relative z-10 border-t border-gray-700 dark:border-gray-700/50 pt-6 flex items-center gap-4">
                {/* Avatar */}
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0`}>
                  {t.avatar}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white dark:text-white">{t.name}</h3>
                  <span className={`text-sm font-semibold bg-gradient-to-r ${t.color} bg-clip-text text-transparent`}>
                    {t.subtitle}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-lg flex-shrink-0`}>
                  <i className={t.icon}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
