export type InternshipIcon = 'server' | 'globe' | 'git' | 'container' | 'activity' | 'network';

export type InternshipArea = {
  title: string;
  detail: string;
  icon: InternshipIcon;
};

export type Internship = {
  slug: string;
  org: string;
  role: string;
  period: string;
  when: string;
  cardMeta: string;
  lead: string;
  image: string;
  companyUrl: string;
  areas: InternshipArea[];
};

export const internships: Internship[] = [
  {
    slug: 'atlas',
    org: 'Atlas Computer Technology',
    role: 'System Engineering Intern',
    period: 'Summer 2026',
    when: 'Jun 22 – Sep 11, 2026 · Addis Ababa',
    cardMeta: 'System engineering · Summer 2026',
    lead: 'Three months in the System Engineering department, putting classwork onto real infrastructure: Linux servers, web deployment, CI/CD, containers, and monitoring.',
    image: '/images/atlas.png',
    companyUrl: 'https://www.act.com.et/',
    areas: [
      {
        title: 'Linux systems',
        icon: 'server',
        detail:
          'Installed and administered Ubuntu, Rocky Linux, Oracle Linux, and RHEL, and compared them with Solaris and AIX. Practiced partitioning, LVM, ext4 and XFS, and software RAID.'
      },
      {
        title: 'Web deployment',
        icon: 'globe',
        detail:
          'Deployed applications with NGINX, Apache HTTP Server, and Apache Tomcat, then locked them down with SSL/TLS and HTTPS.'
      },
      {
        title: 'CI/CD',
        icon: 'git',
        detail:
          'Used Git and self-hosted GitLab, and built pipelines with GitHub Actions, Jenkins, and GitLab CI so changes could be tested and deployed.'
      },
      {
        title: 'Containers',
        icon: 'container',
        detail:
          'Wrote Dockerfiles, ran multi-container setups with Docker Compose, and deployed, scaled, and rolled back apps on Kubernetes with Minikube.'
      },
      {
        title: 'Observability',
        icon: 'activity',
        detail:
          'Collected and read system and application metrics with Prometheus, Grafana, Netdata, SigNoz, and OpenTelemetry.'
      },
      {
        title: 'Networking',
        icon: 'network',
        detail:
          'Worked with IP addressing, DHCP, DNS, and firewalls (UFW and firewalld) so services could be reached and locked down.'
      }
    ]
  }
];
