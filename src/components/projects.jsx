import ludo from "../assets/ludo.png"
import personalLib from "../assets/personal book library.png"
import project1 from "../assets/project1.png"
import project2 from "../assets/project2.png"
import project3 from "../assets/project3.png"
import project4 from "../assets/project4.png"
import project5 from "../assets/project5.png"
import solarSystem from "../assets/solar_system.png"

export default function Projects() {
  const projects = [
    {
      img: project1,
      subtitle: "Web",
      title: "Responsive web page design",
      link: "https://debajyotisamanta.github.io/CODECANVAS/",
      description: "A visually stunning responsive web page built with HTML, CSS, and JavaScript. Showcasing modern design principles and seamless user experience across devices."
    },
    {
      img: project2,
      subtitle: "Web",
      title: "Responsive landing page design",
      link: "https://debajyotisamanta.github.io/CodeClauseInternship_ResponsiveLandingPage/",
      description: "A sleek and responsive landing page designed to captivate visitors. Built with HTML, CSS, and JavaScript, it features modern aesthetics and smooth interactions for an engaging user experience."
    },
    {
      img: project3,
      subtitle: "Web",
      title: "Age Calculator",
      link: "https://debajyotisamanta.github.io/CodeAlpha_Project_AGE-CALCULATOR/",
      description: "An intuitive age calculator web application built with HTML, CSS, and JavaScript. It allows users to easily calculate their age based on their birthdate, providing a user-friendly interface and accurate results."
    },
    {
      img: project4,
      subtitle: "Web",
      title: "Fitness Tracker Dashboard",
      link: "https://debajyotisamanta.github.io/Fitness-Tracker-Dashboard/",
      description: "A sleek and responsive fitness tracker dashboard built with HTML, CSS, and JavaScript. It provides users with an intuitive interface to monitor their fitness goals, track workouts, and visualize progress through interactive charts and graphs."
    },
    {
      img: project5,
      subtitle: "Web",
      title: "Event Management System",
      link: "https://debajyotisamanta.github.io/CodeClauseInternship_Event_management_System/",
      description: "A comprehensive event management system built with HTML, CSS, and JavaScript. It allows users to create, manage, and track events seamlessly, providing features such as event registration, scheduling, and attendee management for a smooth user experience."
    },
    {
      img: ludo,
      subtitle: "Game",
      title: "Ludo Multiplayer Game",
      link: "https://debajyotisamanta.github.io/LUDO/",
      description: "A fun and interactive multiplayer Ludo game built with HTML, CSS, and JavaScript. Features smooth gameplay, intuitive controls, and engaging visuals for an enjoyable gaming experience."
    },
    {
      img: personalLib,
      subtitle: "Web",
      title: "📚Personal Book Library",
      link: "https://debajyotisamanta.github.io/Personal-Book-Library/",
      description: "A sleek and responsive personal book library web application built with HTML, CSS, and JavaScript. It allows users to easily manage their book collection, add new books, and track their reading progress through an intuitive interface."
    },
    {
      img: solarSystem,
      subtitle: "Web",
      title: "3D Solar System",
      link: "https://debajyotisamanta.github.io/Solar_system/",
      description: "A visually stunning 3D solar system simulation built with HTML, CSS, and JavaScript. It allows users to explore the planets, moons, and other celestial bodies in an interactive and immersive way, providing an educational and engaging experience."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 animate__animated animate__fadeInUp" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Featured Work</span>
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-white mb-4 animate__animated animate__slideInDown">
            Projects & Creations
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-400 animate__animated animate__slideInUp max-w-2xl mx-auto font-medium">
            A showcase of my best work - from responsive websites to interactive applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="group relative bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 animate__animated animate__fadeInUp overflow-hidden backdrop-blur-sm border border-gray-700 dark:border-gray-600"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-700 dark:to-gray-600">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge */}
                <span className="absolute top-4 right-4 inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {p.subtitle}
                </span>
              </div>

              {/* Content */}
              <div className="p-6" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}>
                <h3 className="text-xl font-bold text-white dark:text-white mb-3 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {p.title}
                </h3>
                
                <div className="mb-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 group-hover:w-24"></div>

                </div>
                <p className="text-sm text-gray-300 dark:text-gray-400 font-medium mt-2 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {p.description}
                </p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 group/btn text-sm"
                >
                  View Project
                  <i className="ri-arrow-right-line group-hover/btn:translate-x-1 transition-transform"></i>
                </a>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 w-0 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}