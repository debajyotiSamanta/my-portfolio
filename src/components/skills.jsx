import cpp from "../assets/c++.svg"
import c from "../assets/c-1.svg"
import css from "../assets/css-3.svg"
import figma from "../assets/figma-1.svg"
import git from "../assets/git-icon.svg"
import github from "../assets/github.png"
import html from "../assets/html-1.svg"
import java from "../assets/java.png"
import js from "../assets/logo-javascript.svg"
import nodejs from "../assets/nodejs-1.svg"
import python from "../assets/python-5.svg"
import react from "../assets/react-2.svg"
import tailwind from "../assets/Tailwind_CSS.png"
import sql from "../assets/sql.png"

export default function Skills() {
  const frontendSkills = [
    { img: html, name: "HTML", level: "Intermediate" },
    { img: css, name: "CSS", level: "Intermediate" },
    { img: tailwind, name: "Tailwind CSS", level: "Intermediate" },
    { img: js, name: "JavaScript", level: "Intermediate" },
    { img: react, name: "React", level: "Intermediate" },
    { img: git, name: "Git", level: "Intermediate" },
    { img: github, name: "GitHub", level: "Intermediate" },
  ]

  const designSkills = [
    { img: figma, name: "Figma", level: "Intermediate" },
    { img: c, name: "C", level: "Intermediate" },
    { img: cpp, name: "C++", level: "Basic" },
    { img: python, name: "Python", level: "Intermediate" },
    { img: nodejs, name: "NodeJs", level: "Basic" },
    { img: java, name: "Java", level: "Intermediate" },
    { img: sql, name: "SQL", level: "Intermediate" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 animate__animated animate__fadeInUp" id="skills">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-6">
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <span className="text-sm font-bold text-blue-400 dark:text-blue-300 uppercase tracking-wider">Expertise</span>
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white dark:text-white mb-4 animate__animated animate__slideInDown">
            Technical Skills
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-400 animate__animated animate__fadeInUp max-w-2xl mx-auto font-medium">
            Proficient in modern web technologies and tools that power today's digital experiences
          </p>
        </div>

        {/* Frontend Developer Section */}
        <div className="mb-20 animate__animated animate__slideInLeft" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold">
              <i className="ri-braces-line text-xl"></i>
            </div>
            <h3 className="text-2xl font-black text-white dark:text-white">Frontend Development</h3>
            <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full ml-4"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {frontendSkills.map((skill, i) => (
              <div 
                className="group relative animate__animated animate__zoomIn"
                key={i}
                style={{ 
                  animationDelay: `${i * 0.08}s`,
                  perspective: '1000px'
                }}
              >
                <div 
                  className="relative bg-gray-900 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 p-6 flex flex-col items-center text-center border border-gray-700 dark:border-gray-600 backdrop-blur-sm overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotateX(5deg) rotateY(-8deg) translateZ(20px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none"></div>
                  
                  <div 
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 p-1 mb-4 shadow-lg shadow-blue-600/50 relative z-10 transition-all duration-600 group-hover:scale-110"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'rotateY(0deg) scale(1)',
                      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'rotateY(180deg) scale(1.15)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gray-800 dark:bg-gray-850 flex items-center justify-center overflow-hidden">
                      <img 
                        src={skill.img} 
                        alt={skill.name} 
                        className="w-14 h-14 object-contain group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white dark:text-white mb-2 relative z-10 group-hover:scale-105 transition-transform duration-300">{skill.name}</h3>
                  <span className="text-xs text-blue-300 dark:text-blue-300 font-bold bg-blue-600/30 dark:bg-blue-900/50 px-3 py-1 rounded-full relative z-10 group-hover:scale-110 transition-transform duration-300">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Web Designer Section */}
        <div className="animate__animated animate__slideInRight" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center text-white font-bold">
              <i className="ri-pantone-line text-xl"></i>
            </div>
            <h3 className="text-2xl font-black text-white dark:text-white">Design & Other Languages</h3>
            <div className="flex-1 h-1 bg-gradient-to-r from-purple-600 to-transparent rounded-full ml-4"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {designSkills.map((skill, i) => (
              <div 
                className="group relative animate__animated animate__zoomIn"
                key={i}
                style={{ 
                  animationDelay: `${i * 0.08}s`,
                  perspective: '1000px'
                }}
              >
                <div 
                  className="relative bg-gray-900 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 p-6 flex flex-col items-center text-center border border-gray-700 dark:border-gray-600 backdrop-blur-sm overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotateX(5deg) rotateY(-8deg) translateZ(20px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none"></div>
                  
                  <div 
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-1 mb-4 shadow-lg relative z-10 transition-all duration-600 group-hover:scale-110"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'rotateY(0deg) scale(1)',
                      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'rotateY(180deg) scale(1.15)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gray-800 dark:bg-gray-850 flex items-center justify-center overflow-hidden">
                      <img 
                        src={skill.img} 
                        alt={skill.name} 
                        className="w-14 h-14 object-contain group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white dark:text-white mb-2 relative z-10 group-hover:scale-105 transition-transform duration-300">{skill.name}</h3>
                  <span className="text-xs text-purple-300 dark:text-purple-300 font-bold bg-purple-600/30 dark:bg-purple-900/50 px-3 py-1 rounded-full relative z-10 group-hover:scale-110 transition-transform duration-300">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}