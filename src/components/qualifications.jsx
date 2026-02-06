
export default function Qualification() {
  const qualifications = {
    education: [
      {
        title: "B-Tech (Information Technology)",
        institution: "Meghnad Saha Institute of Technology",
        period: "2023-2027",
        score: "Pursuing",
        icon: "ri-graduation-cap-line",
        color: "from-pink-500 to-rose-500",
        borderColor: "border-pink-500"
      },
      {
        title: "Higher Secondary Education",
        institution: "Raghunath Bari Ramtarak High School",
        period: "2020-2022",
        score: "83.8%",
        icon: "ri-book-open-line",
        color: "from-purple-500 to-pink-500",
        borderColor: "border-purple-500"
      },
      {
        title: "Secondary Education",
        institution: "Kaminachak Sasibhusan Kanailal Vidyayatan",
        period: "2018-2020",
        score: "85%",
        icon: "ri-pencil-ruler-2-line",
        color: "from-blue-500 to-purple-500",
        borderColor: "border-blue-500"
      }
    ],
    experience: [
      {
        title: "Frontend Developer",
        institution: "Hackerspace - MSIT Official Coding Community",
        period: "Current",
        description: "Building responsive web interfaces and mentoring juniors",
        icon: "ri-code-line",
        color: "from-blue-500 to-cyan-500",
        borderColor: "border-blue-500"
      },
      {
        title: "CDP Lead",
        institution: "Hackerspace - MSIT Official Coding Community",
        period: "Current",
        description: "Leading coding development program initiatives",
        icon: "ri-team-line",
        color: "from-emerald-500 to-teal-500",
        borderColor: "border-emerald-500"
      },
      {
        title: "Frontend Developer Intern",
        institution: "CodeAlpha & CodeClause",
        period: "2024",
        description: "Worked on real-world projects with mentorship",
        icon: "ri-briefcase-line",
        color: "from-indigo-500 to-purple-500",
        borderColor: "border-indigo-500"
      }
    ]
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 animate__animated animate__fadeInUp" id="qualification">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Background</span>
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white dark:text-white mb-4 animate__animated animate__slideInDown">
            Qualification
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-400 animate__animated animate__slideInUp max-w-2xl mx-auto font-medium">
            Education & professional experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className="animate__animated animate__slideInLeft">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <i className="ri-book-open-line text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-white dark:text-white">Education</h3>
              <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full ml-4"></div>
            </div>
            <div className="space-y-6 relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent rounded-full"></div>
              
              {qualifications.education.map((edu, i) => (
                <div key={i} className="relative pl-20 animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 w-14 h-14 rounded-full bg-gradient-to-br ${edu.color} p-1 shadow-lg flex items-center justify-center text-white text-xl z-10`}>
                    <i className={edu.icon}></i>
                  </div>

                  {/* Card */}
                  <div className={`group bg-gray-900 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${edu.borderColor} border-l-2 backdrop-blur-sm hover:bg-opacity-80 dark:hover:bg-opacity-80`}>
                    <h4 className="text-lg font-bold text-white dark:text-white mb-2 group-hover:text-blue-400 dark:group-hover:text-blue-400 transition-colors">
                      {edu.title}
                    </h4>
                    <p className="text-sm text-gray-300 dark:text-gray-400 mb-3 font-medium">
                      {edu.institution}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                        {edu.period}
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {edu.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="animate__animated animate__slideInRight">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
                <i className="ri-briefcase-line text-xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-white dark:text-white">Experience</h3>
              <div className="flex-1 h-1 bg-gradient-to-r from-green-500 to-transparent rounded-full ml-4"></div>
            </div>
            <div className="space-y-6 relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-emerald-500 to-transparent rounded-full"></div>
              
              {qualifications.experience.map((exp, i) => (
                <div key={i} className="relative pl-20 animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 w-14 h-14 rounded-full bg-gradient-to-br ${exp.color} p-1 shadow-lg flex items-center justify-center text-white text-xl z-10`}>
                    <i className={exp.icon}></i>
                  </div>

                  {/* Card */}
                  <div className={`group bg-gray-900 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${exp.borderColor} border-l-2 backdrop-blur-sm hover:bg-opacity-80 dark:hover:bg-opacity-80`}>
                    <h4 className="text-lg font-bold text-white dark:text-white mb-2 group-hover:text-green-400 dark:group-hover:text-green-400 transition-colors">
                      {exp.title}
                    </h4>
                    <p className="text-sm text-gray-300 dark:text-gray-400 mb-2 font-medium">
                      {exp.institution}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-400 dark:text-gray-400 mb-3 italic font-medium">
                        {exp.description}
                      </p>
                    )}
                    <span className="inline-block text-xs font-bold text-gray-300 dark:text-gray-300 uppercase tracking-wider bg-gray-700 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
