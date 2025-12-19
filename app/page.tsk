"use client"

import { useEffect, useState, useRef } from "react"
import {
  Mail,
  Github,
  Linkedin,
  Download,
  Shield,
  Eye,
  Baseline as ChartLine,
  Search,
  AlertTriangle,
  Terminal,
  Code,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Scroll observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[90px] animate-pulse delay-2000" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Mooka
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {["about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeSection === item ? "text-cyan-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 animate-slideIn" />
                  )}
                </button>
              ))}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full hover:bg-white/10"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/5 animate-slideDown">
            <div className="flex flex-col gap-4 p-6">
              {["about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left text-lg capitalize text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fadeInUp">
          <div className="inline-block">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-4 animate-slideDown">
              Cybersecurity Professional
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block text-white animate-fadeInUp delay-100">Mohamed</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-fadeInUp delay-200">
              Mooka
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fadeInUp delay-300">
            DFIR Analyst & SOC Operations Specialist
          </p>

          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto animate-fadeInUp delay-400">
            Documenting hands-on cybersecurity projects, incident response investigations, and practical security
            analysis through comprehensive case studies.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 animate-fadeInUp delay-500">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                5+
              </div>
              <div className="text-sm text-gray-500 mt-2">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                3+
              </div>
              <div className="text-sm text-gray-500 mt-2">Years Learning</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-gray-500 mt-2">Dedicated</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-8 animate-fadeInUp delay-600">
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300"
            >
              <Eye className="w-5 h-5 mr-2" />
              View Projects
            </Button>
            <Button
              onClick={() => window.open("https://github.com/mohamedmOoka7", "_blank")}
              variant="outline"
              className="border-2 border-cyan-500/30 bg-transparent hover:bg-cyan-500/10 text-white px-8 py-6 rounded-full text-lg font-semibold backdrop-blur-sm"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
          </div>

          <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-8 md:p-12 hover:border-cyan-500/50 transition-all duration-500 group animate-fadeInUp">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Cybersecurity Analyst with a strong focus on{" "}
                  <span className="text-cyan-400 font-semibold">Digital Forensics & Incident Response (DFIR)</span> and{" "}
                  <span className="text-blue-400 font-semibold">SOC operations</span>.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Experienced in investigating security incidents, analyzing complex log data, and reconstructing
                  detailed attack timelines through hands-on laboratory environments and real-world simulations.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  My approach combines technical expertise with analytical thinking to identify threats, understand
                  attacker methodologies, and provide actionable security insights.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                  <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Security First</h3>
                    <p className="text-sm text-gray-400">Proactive threat detection and rapid incident response</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <Search className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Deep Analysis</h3>
                    <p className="text-sm text-gray-400">Thorough investigation of artifacts and evidence</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                  <Terminal className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Hands-On Practice</h3>
                    <p className="text-sm text-gray-400">Real-world scenarios and practical implementations</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="relative py-32 px-6 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, name: "DFIR", color: "cyan" },
              { icon: Eye, name: "SOC Operations", color: "blue" },
              { icon: ChartLine, name: "SIEM", color: "purple" },
              { icon: Search, name: "Log Analysis", color: "cyan" },
              { icon: AlertTriangle, name: "Threat Detection", color: "blue" },
              { icon: Terminal, name: "Incident Response", color: "purple" },
              { icon: Code, name: "Linux", color: "cyan" },
              { icon: Code, name: "Windows Forensics", color: "blue" },
            ].map((skill, index) => (
              <Card
                key={skill.name}
                className={`bg-slate-900/50 backdrop-blur-xl border-white/10 p-6 hover:border-${skill.color}-500/50 transition-all duration-500 group cursor-pointer animate-fadeInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${skill.color}-500/20 to-${skill.color}-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <skill.icon className={`w-7 h-7 text-${skill.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Focus{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Areas</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Terminal,
                title: "Incident Response",
                description: "Handling security incidents from detection to containment and recovery.",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: AlertTriangle,
                title: "Threat Detection",
                description: "Log-based detection and alert triage in SOC environments.",
                gradient: "from-blue-500 to-purple-600",
              },
              {
                icon: Search,
                title: "Digital Forensics",
                description: "Analyzing host and log artifacts to reconstruct attacker activity.",
                gradient: "from-purple-500 to-cyan-600",
              },
            ].map((area, index) => (
              <Card
                key={area.title}
                className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-8 hover:border-cyan-500/50 transition-all duration-500 group cursor-pointer animate-fadeInUp relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.gradient} opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:opacity-30 transition-all duration-300`}
                >
                  <area.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {area.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">{area.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="relative py-32 px-6 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "DFIR Investigation Lab",
                description:
                  "DFIR case study covering detection, forensic analysis, and attacker timeline reconstruction.",
                link: "project-dfir.html",
                icon: Search,
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                title: "SOC Monitoring & Detection",
                description: "SOC-focused monitoring and alert triage scenarios using log analysis techniques.",
                icon: Eye,
                gradient: "from-blue-500 to-purple-600",
              },
              {
                title: "Malware Analysis Basics",
                description: "Static and basic dynamic analysis of malware samples to identify malicious behavior.",
                icon: AlertTriangle,
                gradient: "from-purple-500 to-cyan-600",
              },
            ].map((project, index) => (
              <Card
                key={project.title}
                className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-8 hover:border-cyan-500/50 transition-all duration-500 group cursor-pointer animate-fadeInUp relative overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => project.link && window.open(project.link, "_blank")}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:opacity-30 transition-all duration-300`}
                >
                  <project.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm">{project.description}</p>

                {project.link && (
                  <div className="mt-6 text-cyan-400 font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                    View Project
                    <span className="text-xl">→</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Download,
                label: "Download Resume",
                link: "assets/Mohamed_Mooka_CV.pdf",
                gradient: "from-cyan-500 to-blue-600",
              },
              {
                icon: Mail,
                label: "Email",
                link: "mailto:mohamed.ashraf.abdallah65@gmail.com",
                gradient: "from-blue-500 to-purple-600",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                link: "https://www.linkedin.com/in/mohamed-mooka/",
                gradient: "from-purple-500 to-cyan-600",
              },
              {
                icon: Github,
                label: "GitHub Projects",
                link: "https://github.com/mohamedmOoka7",
                gradient: "from-cyan-500 to-blue-600",
              },
            ].map((contact, index) => (
              <Card
                key={contact.label}
                className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6 hover:border-cyan-500/50 transition-all duration-500 group cursor-pointer animate-fadeInUp relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => window.open(contact.link, contact.label === "Email" ? "_self" : "_blank")}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.gradient} opacity-20 flex items-center justify-center group-hover:scale-110 group-hover:opacity-30 transition-all duration-300`}
                  >
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {contact.label}
                    </h3>
                  </div>

                  <span className="text-cyan-400 text-xl group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-8 text-center">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Mohamed Mooka — Cybersecurity Portfolio</p>
      </footer>
    </div>
  )
}
