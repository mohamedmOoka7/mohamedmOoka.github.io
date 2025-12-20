#!/usr/bin/env python3
"""
Portfolio Analytics & Automation Script
Analyze visitor behavior, generate reports, and automate portfolio updates
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List


class PortfolioAnalyzer:
    """Analyze and generate reports for cybersecurity portfolio"""

    def __init__(self):
        self.projects = []
        self.skills = []
        self.stats = {}

    def load_project_data(self) -> None:
        """Load project information from portfolio"""
        self.projects = [
            {
                "name": "DFIR Investigation Lab",
                "category": "DFIR",
                "tags": ["DFIR", "Forensics", "Investigation"],
                "status": "Featured",
                "completion": 100,
            },
            {
                "name": "SOC Monitoring & Detection",
                "category": "SOC",
                "tags": ["SOC", "SIEM", "Detection"],
                "status": "Active",
                "completion": 95,
            },
            {
                "name": "Malware Analysis Lab",
                "category": "Malware",
                "tags": ["Malware", "Analysis", "Reverse Engineering"],
                "status": "Active",
                "completion": 90,
            },
            {
                "name": "Network Forensics",
                "category": "Network",
                "tags": ["Network", "PCAP", "Wireshark"],
                "status": "Active",
                "completion": 85,
            },
            {
                "name": "Log Analysis Automation",
                "category": "Automation",
                "tags": ["Python", "Automation", "Logs"],
                "status": "Active",
                "completion": 80,
            },
            {
                "name": "Threat Hunting",
                "category": "Hunting",
                "tags": ["Hunting", "Analytics", "Intelligence"],
                "status": "Active",
                "completion": 75,
            },
        ]

    def generate_skills_matrix(self) -> Dict[str, int]:
        """Generate skills proficiency matrix"""
        return {
            "Incident Response": 90,
            "Digital Forensics": 85,
            "Threat Detection": 88,
            "Log Analysis": 92,
            "SOC Operations": 87,
            "Malware Analysis": 80,
            "SIEM": 85,
            "Network Analysis": 83,
            "Python Scripting": 88,
            "Linux": 90,
            "Windows Forensics": 86,
        }

    def calculate_portfolio_stats(self) -> Dict[str, any]:
        """Calculate portfolio statistics"""
        total_projects = len(self.projects)
        avg_completion = sum(p["completion"] for p in self.projects) / total_projects
        categories = set(p["category"] for p in self.projects)

        return {
            "total_projects": total_projects,
            "average_completion": round(avg_completion, 2),
            "categories": len(categories),
            "featured_projects": sum(1 for p in self.projects if p["status"] == "Featured"),
            "active_projects": sum(1 for p in self.projects if p["status"] == "Active"),
        }

    def generate_report(self) -> str:
        """Generate comprehensive portfolio report"""
        self.load_project_data()
        skills = self.generate_skills_matrix()
        stats = self.calculate_portfolio_stats()

        report = []
        report.append("=" * 60)
        report.append("CYBERSECURITY PORTFOLIO ANALYSIS REPORT")
        report.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append("=" * 60)
        report.append("")

        # Portfolio Statistics
        report.append("PORTFOLIO STATISTICS")
        report.append("-" * 60)
        for key, value in stats.items():
            report.append(f"  {key.replace('_', ' ').title()}: {value}")
        report.append("")

        # Projects Overview
        report.append("PROJECTS OVERVIEW")
        report.append("-" * 60)
        for project in self.projects:
            report.append(f"  [{project['status']}] {project['name']}")
            report.append(f"    Category: {project['category']}")
            report.append(f"    Completion: {project['completion']}%")
            report.append(f"    Tags: {', '.join(project['tags'])}")
            report.append("")

        # Skills Matrix
        report.append("SKILLS PROFICIENCY MATRIX")
        report.append("-" * 60)
        for skill, level in sorted(skills.items(), key=lambda x: x[1], reverse=True):
            bar = "█" * (level // 10) + "░" * (10 - level // 10)
            report.append(f"  {skill:.<30} {bar} {level}%")
        report.append("")

        # Recommendations
        report.append("RECOMMENDATIONS")
        report.append("-" * 60)
        report.append("  • Continue developing featured projects for maximum impact")
        report.append("  • Add certifications section (OSCP, CEH, Security+)")
        report.append("  • Include blog posts on technical investigations")
        report.append("  • Showcase automation scripts and tools developed")
        report.append("")

        report.append("=" * 60)

        return "\n".join(report)

    def export_to_json(self, filename: str = "portfolio_data.json") -> None:
        """Export portfolio data to JSON"""
        self.load_project_data()

        data = {
            "generated_at": datetime.now().isoformat(),
            "projects": self.projects,
            "skills": self.generate_skills_matrix(),
            "statistics": self.calculate_portfolio_stats(),
        }

        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"Portfolio data exported to {filename}")


def main():
    """Main execution function"""
    print("\n🔒 Cybersecurity Portfolio Analyzer\n")

    analyzer = PortfolioAnalyzer()

    # Generate and display report
    report = analyzer.generate_report()
    print(report)

    # Export to JSON
    analyzer.export_to_json()

    # Save report to file
    with open("portfolio_report.txt", "w", encoding="utf-8") as f:
        f.write(report)

    print("\n✅ Analysis complete! Report saved to portfolio_report.txt")


if __name__ == "__main__":
    main()
