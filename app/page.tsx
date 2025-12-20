"use client"

import { useEffect, useState } from "react"
import {
  Mail,
  Github,
  Linkedin,
  Download,
  Shield,
  Eye,
  Search,
  AlertTriangle,
  Terminal,
  Menu,
  X,
  Fingerprint,
  Activity,
  FileSearch,
  Bug,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.2 },
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] bg-security-green/5 rounded-full blur-[120px] animate-pulse-slow"
          style={{
            left: `${20 + mousePosition.x / 50}px`,
            top: `${10 + mousePosition.y / 50}px`,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] bg-security-blue/5 rounded-full blur-[100px] animate-pulse-slow"
          style={{
            right: `${10 + mousePosition.x / 80}px`,
            top: `${30 + mousePosition.y / 60}%`,
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-security-red/5 rounded-full blur-[90px] animate-pulse-slow"
          style={{
            left: "40%",
            bottom: "10%",
            animationDelay: "4s",
          }}
        />

        {/* Matrix Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f08_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f08_1px,transparent_1px)] bg-[size:3rem_3rem] animate-grid-flow" />

        {/* Scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-security-green/5 to-transparent animate-scanline" />
      </div>

      <nav className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-background/60 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold tracking-tight text-security-green font-mono">
              {"<"}
              <span className="text-foreground">Mooka</span>
              {" />"}
            </div>

            <div className="hidden md:flex items-center gap-10">
              {[
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium tracking-wide transition-all duration-300 ${
                    activeSection === item.id ? "text-security-green" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-7 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-security-green to-transparent animate-glow" />
                  )}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="text-security-green" /> : <Menu className="text-security-green" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-border/40 animate-slide-down">
            <div className="flex flex-col gap-4 p-6">
              {["about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left text-lg capitalize text-muted-foreground hover:text-security-green transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="space-y-8 terminal-section">
            <div className="font-mono text-security-green text-sm animate-typing">
              <span className="opacity-60">mooka@cybersec:~$</span> whoami
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
                <span className="block text-foreground animate-glitch" data-text="Mohamed">
                  Mohamed
                </span>
                <span className="block text-security-green animate-glitch-delayed" data-text="Mooka">
                  Mooka
                </span>
              </h1>

              <div className="font-mono text-sm md:text-base text-security-blue flex items-center gap-2">
                <Terminal className="w-4 h-4 animate-pulse" />
                <span className="animate-typing-delayed">Cybersecurity Analyst | DFIR & SOC Operations</span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed animate-fade-in-up">
              Investigating security incidents, analyzing threat patterns, and reconstructing attack timelines through
              hands-on forensic analysis and incident response.
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-3xl pt-8 animate-fade-in-up">
              <div className="group">
                <div className="text-4xl md:text-6xl font-bold font-mono text-security-green mb-2 group-hover:animate-glitch">
                  [05+]
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-mono">// Projects</div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-6xl font-bold font-mono text-security-blue mb-2 group-hover:animate-glitch">
                  [03+]
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-mono">// Years Learning</div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-6xl font-bold font-mono text-security-red mb-2 group-hover:animate-glitch">
                  [100%]
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-mono">// Dedicated</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-8 animate-fade-in-up">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-security-green hover:bg-security-green/90 text-background px-8 py-6 text-base font-mono font-semibold shadow-lg shadow-security-green/20 hover:shadow-xl hover:shadow-security-green/30 transition-all duration-300 border border-security-green/20"
              >
                <Eye className="w-5 h-5 mr-2" />
                View Projects
              </Button>
              <Button
                onClick={() => window.open("https://github.com/mohamedmOoka7", "_blank")}
                variant="outline"
                className="border-2 border-security-green/40 bg-transparent hover:bg-security-green/10 text-foreground px-8 py-6 text-base font-mono font-semibold"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce-slow">
            <div className="w-6 h-10 border-2 border-security-green/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-security-green rounded-full animate-scroll-dot" />
            </div>
            <span className="text-xs font-mono text-security-green/60">scroll</span>
          </div>
        </div>
      </section>

      <section id="about" className="section relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="font-mono text-security-green text-sm mb-4">
              <span className="opacity-60">mooka@cybersec:~$</span> cat about.txt
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              About <span className="text-security-green font-mono italic">Me</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-security-green via-security-blue to-transparent mt-4" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-foreground">
                Cybersecurity Analyst with deep focus on{" "}
                <span className="text-security-green font-semibold font-mono">
                  Digital Forensics & Incident Response
                </span>{" "}
                and <span className="text-security-blue font-semibold font-mono">SOC operations</span>.
              </p>
              <p className="text-muted-foreground">
                Specialized in investigating security incidents, analyzing complex log data, and reconstructing detailed
                attack timelines through hands-on laboratory environments and real-world simulations.
              </p>
              <p className="text-muted-foreground">
                Combining technical expertise with analytical thinking to identify threats, understand attacker
                methodologies, and provide actionable security insights.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: Shield,
                  title: "Security First",
                  desc: "Proactive threat detection and rapid incident response",
                  color: "security-green",
                },
                {
                  icon: Search,
                  title: "Deep Analysis",
                  desc: "Thorough investigation of artifacts and evidence",
                  color: "security-blue",
                },
                {
                  icon: Terminal,
                  title: "Hands-On Practice",
                  desc: "Real-world scenarios and practical implementations",
                  color: "security-red",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`group p-6 border-l-4 border-${item.color} bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:translate-x-2`}
                >
                  <div className="flex items-start gap-4">
                    <item.icon className={`w-6 h-6 text-${item.color} flex-shrink-0 mt-1 group-hover:animate-pulse`} />
                    <div>
                      <h3 className="font-bold text-foreground mb-1 font-mono">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section relative py-32 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="font-mono text-security-green text-sm mb-4">
              <span className="opacity-60">mooka@cybersec:~$</span> ls -la skills/
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Technical <span className="text-security-blue font-mono italic">Skills</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-security-blue via-security-green to-transparent mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, name: "DFIR", color: "security-green" },
              { icon: Eye, name: "SOC Operations", color: "security-blue" },
              { icon: Activity, name: "SIEM", color: "security-red" },
              { icon: Search, name: "Log Analysis", color: "security-green" },
              { icon: AlertTriangle, name: "Threat Detection", color: "security-blue" },
              { icon: Terminal, name: "Incident Response", color: "security-red" },
              { icon: Fingerprint, name: "Linux", color: "security-green" },
              { icon: FileSearch, name: "Windows Forensics", color: "security-blue" },
            ].map((skill, index) => (
              <div
                key={skill.name}
                className={`group relative p-6 bg-background border-2 border-border hover:border-${skill.color} transition-all duration-300 hover:translate-y-[-4px] cursor-pointer`}
              >
                <div className="flex flex-col items-start gap-3">
                  <skill.icon className={`w-8 h-8 text-${skill.color} group-hover:animate-pulse`} />
                  <h3 className="text-sm font-bold font-mono text-foreground group-hover:text-${skill.color} transition-colors">
                    {skill.name}
                  </h3>
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 bg-${skill.color} group-hover:w-full transition-all duration-300`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="font-mono text-security-green text-sm mb-4">
              <span className="opacity-60">mooka@cybersec:~$</span> cat focus_areas.md
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Focus <span className="text-security-red font-mono italic">Areas</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-security-red via-security-blue to-transparent mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Terminal,
                title: "Incident Response",
                desc: "Handling security incidents from detection to containment and recovery.",
                color: "security-green",
              },
              {
                icon: AlertTriangle,
                title: "Threat Detection",
                desc: "Log-based detection and alert triage in SOC environments.",
                color: "security-blue",
              },
              {
                icon: Search,
                title: "Digital Forensics",
                desc: "Analyzing host and log artifacts to reconstruct attacker activity.",
                color: "security-red",
              },
            ].map((area, i) => (
              <div key={i} className="group space-y-6">
                <div
                  className={`w-16 h-16 border-2 border-${area.color} flex items-center justify-center group-hover:bg-${area.color}/10 transition-colors duration-300`}
                >
                  <area.icon className={`w-8 h-8 text-${area.color}`} />
                </div>
                <h3 className="text-2xl font-bold font-mono text-foreground group-hover:text-${area.color} transition-colors">
                  {area.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{area.desc}</p>
                <div className={`h-px w-0 bg-${area.color} group-hover:w-24 transition-all duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section relative py-32 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="font-mono text-security-green text-sm mb-4">
              <span className="opacity-60">mooka@cybersec:~$</span> cd projects/ && ls
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Featured <span className="text-security-green font-mono italic">Projects</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-security-green via-security-red to-transparent mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "DFIR Investigation Lab",
                desc: "DFIR case study covering detection, forensic analysis, and attacker timeline reconstruction.",
                icon: Search,
                color: "security-green",
                link: "project-dfir.html",
              },
              {
                title: "SOC Monitoring & Detection",
                desc: "SOC-focused monitoring and alert triage scenarios using log analysis techniques.",
                icon: Eye,
                color: "security-blue",
              },
              {
                title: "Malware Analysis Basics",
                desc: "Static and basic dynamic analysis of malware samples to identify malicious behavior.",
                icon: Bug,
                color: "security-red",
              },
            ].map((project, i) => (
              <div
                key={i}
                className={`group relative bg-background border-2 border-border hover:border-${project.color} p-8 cursor-pointer transition-all duration-300 hover:translate-y-[-8px]`}
                onClick={() => project.link && window.open(project.link, "_blank")}
              >
                <div className="space-y-6">
                  <project.icon className={`w-12 h-12 text-${project.color} group-hover:animate-pulse`} />

                  <h3
                    className={`text-2xl font-bold font-mono text-foreground group-hover:text-${project.color} transition-colors`}
                  >
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">{project.desc}</p>

                  <div className="flex items-center gap-2 font-mono text-sm text-${project.color}">
                    <span>View Project</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>

                <div
                  className={`absolute top-0 left-0 w-0 h-0.5 bg-${project.color} group-hover:w-full transition-all duration-500`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-0 h-0.5 bg-${project.color} group-hover:w-full transition-all duration-500 delay-100`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section relative py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <div className="font-mono text-security-green text-sm mb-4">
              <span className="opacity-60">mooka@cybersec:~$</span> echo $CONTACT_INFO
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Get In <span className="text-security-blue font-mono italic">Touch</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-security-blue via-security-green to-transparent mt-4 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Download,
                label: "Resume",
                href: "assets/Mohamed_Mooka_CV.pdf",
                download: true,
                color: "security-green",
              },
              {
                icon: Mail,
                label: "Email",
                href: "mailto:mohamed.ashraf.abdallah65@gmail.com",
                color: "security-blue",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/mohamed-mooka/",
                target: "_blank",
                color: "security-red",
              },
              {
                icon: Github,
                label: "GitHub",
                href: "https://github.com/mohamedmOoka7",
                target: "_blank",
                color: "security-green",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                download={item.download}
                target={item.target}
                className={`group relative p-8 bg-background border-2 border-border hover:border-${item.color} transition-all duration-300 hover:translate-y-[-4px] flex flex-col items-center gap-4`}
              >
                <item.icon className={`w-10 h-10 text-${item.color} group-hover:animate-pulse`} />
                <span className="font-mono text-sm font-bold text-foreground group-hover:text-${item.color} transition-colors">
                  {item.label}
                </span>
                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 bg-${item.color} group-hover:w-full transition-all duration-300`}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative py-12 px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-security-green">©</span> 2025 Mohamed Mooka{" "}
            <span className="text-security-green">|</span> Cybersecurity Portfolio
          </p>
        </div>
      </footer>
    </div>
  )
}
