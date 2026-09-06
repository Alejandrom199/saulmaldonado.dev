import { Injectable, signal } from '@angular/core';
import { CvProfile } from '../models/cv-profile.model';
import { ICvDataProvider } from '../tokens/cv-data.token';

@Injectable({
  providedIn: 'root'
})
export class CvDataService implements ICvDataProvider {
  private readonly profileData: CvProfile = {
    fullName: 'Saúl Alejandro Maldonado López',
    title: 'Ingeniero de Software | Desarrollador Full Stack',
    statusBadge: 'Disponible para nuevas oportunidades',
    isAvailableForWork: true,
    summary: 'Ingeniero de Software con sólida experiencia en el ecosistema .NET (C#), Angular y SQL Server. Especializado en el diseño y desarrollo de APIs RESTful de alto rendimiento, arquitecturas modernas desacopladas y aplicaciones web empresariales de misión crítica dentro del sector financiero y bancario.',
    photoUrl: 'images/saul.jpg',
    contact: {
      email: 'alejandrom199916@gmail.com',
      phone: '0988806541',
      phoneFormatted: '+593 98 880 6541',
      location: 'Guayaquil, Ecuador',
      timezone: 'ECT (UTC-5)',
      githubUrl: 'https://github.com/Alejandrom199/',
      linkedinUrl: 'https://www.linkedin.com/in/smaldonado199/',
      pdfUrl: 'docs/cv-saul-maldonado.pdf'
    },
    experiences: [
      {
        id: 'viamatica-fullstack',
        company: 'Viamatica',
        project: 'INTECORE & INTECAV',
        role: 'Desarrollador Full Stack',
        period: 'febrero de 2026 - actualidad',
        isCurrent: true,
        employmentType: 'Tiempo Completo',
        location: 'Guayaquil, Ecuador',
        summary: 'Desarrollo de soluciones tecnológicas empresariales y plataformas core para el sector financiero, garantizando alta disponibilidad, seguridad y apego a reglas de negocio complejas.',
        responsibilities: [
          'Desarrollo y optimización de endpoints y microservicios backend en .NET Core y C# con estándares REST.',
          'Implementación rigurosa de reglas de negocio del dominio financiero y transaccional.',
          'Diseño y construcción de interfaces frontend dinámicas y componentes modulares con Angular.',
          'Modelado de bases de datos relacionales, optimización de consultas complejas y procedimientos almacenados en SQL Server.',
          'Mantenimiento evolutivo, refactorización y depuración profunda de módulos existentes.'
        ],
        technologies: ['.NET Core', 'Angular', 'SQL Server', 'GitFlow', 'Postman']
      },
      {
        id: 'viamatica-intern',
        company: 'Viamatica',
        project: 'Plan de Carrera - INTECAV',
        role: 'Pasante de desarrollo Backend',
        period: 'agosto de 2025 - febrero de 2026',
        isCurrent: false,
        employmentType: 'Pasantía',
        location: 'Guayaquil, Ecuador',
        summary: 'Participación en el ciclo de vida del desarrollo de software backend bajo metodologías ágiles, colaborando con equipos multidisciplinarios.',
        responsibilities: [
          'Diseño e implementación de módulos backend desacoplados utilizando .NET Core y C#.',
          'Desarrollo e integración de APIs RESTful para orquestar funcionalidades clave del sistema.',
          'Creación de esquemas de datos, entidades ORM y procedimientos almacenados en SQL.',
          'Codificación e implementación de reglas de negocio específicas del proyecto.',
          'Depuración, soporte y resolución de incidencias en servicios backend existentes.'
        ],
        technologies: ['.NET Core', 'Angular', 'SQL Server', 'GitFlow', 'Postman']
      },
      {
        id: 'siglo-21',
        company: 'Siglo 21',
        project: 'Infraestructura & Soporte Técnico',
        role: 'Técnico de Soporte',
        period: 'marzo de 2022 - septiembre de 2023',
        isCurrent: false,
        employmentType: 'Presencial',
        location: 'Guayaquil, Ecuador',
        summary: 'Gestión, mantenimiento preventivo y configuración de infraestructura computacional y estaciones de trabajo de alto rendimiento.',
        responsibilities: [
          'Ensamblaje, diagnóstico de fallas y configuración de CPUs y hardware de escritorio.',
          'Repotenciación de equipos portátiles mediante upgrades de hardware y despliegue de sistemas operativos (Windows y distribuciones Linux).',
          'Mantenimiento preventivo de hardware, optimización térmica y pruebas de estabilidad de procesadores.'
        ],
        technologies: ['Linux', 'Windows', 'Hardware & Periféricos', 'Redes', 'Mantenimiento']
      }
    ],
    skillGroups: [
      {
        id: 'backend',
        title: 'Desarrollo Backend & Arquitectura',
        items: [
          { name: '.NET Core / ASP.NET', category: 'backend', isHighlighted: true },
          { name: 'Spring Boot', category: 'backend' },
          { name: 'Node.js (Express)', category: 'backend' },
        ]
      },
      {
        id: 'frontend',
        title: 'Desarrollo Frontend',
        items: [
          { name: 'Angular', category: 'frontend', isHighlighted: true },
          { name: 'React', category: 'frontend' },
          { name: 'HTML5', category: 'frontend' },
          { name: 'CSS3', category: 'frontend' },
          { name: 'Tailwind CSS', category: 'frontend', isHighlighted: true },
          { name: 'Figma', category: 'frontend' }
        ]
      },
      {
        id: 'database',
        title: 'Bases de Datos & Caché',
        items: [
          { name: 'SQL Server', category: 'database', isHighlighted: true },
          { name: 'PostgreSQL', category: 'database' },
          { name: 'MySQL', category: 'database' },
          { name: 'Oracle Database', category: 'database' },
          { name: 'MongoDB', category: 'database' },
          { name: 'Redis', category: 'database' }
        ]
      },
      {
        id: 'cloud-devops',
        title: 'Cloud, DevOps & IaC',
        items: [
          { name: 'AWS (Amazon Web Services)', category: 'cloud-devops', isHighlighted: true },
          { name: 'Docker', category: 'cloud-devops', isHighlighted: true },
          { name: 'Kubernetes', category: 'cloud-devops' },
          { name: 'GitHub Actions', category: 'cloud-devops' },
          { name: 'Jenkins', category: 'cloud-devops' },
          { name: 'Terraform (IaC)', category: 'cloud-devops' },
          { name: 'Ansible', category: 'cloud-devops' }
        ]
      },
      {
        id: 'languages',
        title: 'Lenguajes de Programación',
        items: [
          { name: 'C#', category: 'languages', isHighlighted: true },
          { name: 'TypeScript', category: 'languages', isHighlighted: true },
          { name: 'JavaScript', category: 'languages' },
          { name: 'Python', category: 'languages' },
          { name: 'Java', category: 'languages' },
          { name: 'PHP', category: 'languages' }
        ]
      },
      {
        id: 'tools',
        title: 'Sistemas, Entorno & Herramientas',
        items: [
          { name: 'Linux (Debian / Ubuntu)', category: 'tools', isHighlighted: true },
          { name: 'Git & GitHub / GitLab', category: 'tools', isHighlighted: true },
          { name: 'GitFlow Workflow', category: 'tools', isHighlighted: true },
          { name: 'Postman', category: 'tools' },
          { name: 'Swagger', category: 'tools' },
          { name: 'Visual Studio', category: 'tools' },
          { name: 'VS Code', category: 'tools' }
        ]
      }
    ],
    certifications: [
      {
        id: 'cert-docker',
        title: 'Curso Profesional de Docker',
        issuer: 'Código Facilito',
        issueDate: 'mayo de 2026',
        badgeText: 'DevOps & Contenedores',
        credentialType: 'devops'
      },
      {
        id: 'cert-aws-educate',
        title: 'Cloud Computing 101 Trained',
        issuer: 'AWS Educate',
        issueDate: 'agosto de 2025',
        badgeText: 'AWS Cloud Badge',
        credentialType: 'cloud'
      },
      {
        id: 'cert-aws-academy',
        title: 'Cloud Foundations Trained',
        issuer: 'AWS Academy',
        issueDate: 'agosto de 2025',
        badgeText: 'AWS Official Training',
        credentialType: 'cloud'
      },
      {
        id: 'cert-web-designer',
        title: 'Curso de Web Designer',
        issuer: 'Digital House',
        issueDate: 'septiembre de 2024',
        badgeText: 'UI/UX & Web Standards',
        credentialType: 'design'
      },
      {
        id: 'cert-pentesting',
        title: 'Curso de Gestión de Metadatos y Prácticas de Pentesting',
        issuer: 'ZeroDay School Technology',
        issueDate: 'julio de 2024',
        badgeText: 'Ciberseguridad & Pentesting',
        credentialType: 'security'
      },
      {
        id: 'cert-angular',
        title: 'Curso Profesional de Angular',
        issuer: 'Código Facilito',
        issueDate: 'noviembre de 2023',
        badgeText: 'Frontend Architecture',
        credentialType: 'frontend'
      }
    ],
    education: [
      {
        degree: 'Ingeniería en Software',
        institution: 'Universidad de Guayaquil',
        period: '2026',
        status: 'Graduado',
        summary: 'Formación universitaria con sólida base teórico-práctica orientada al ciclo de vida completo del software, patrones de arquitectura escalables, ingeniería de datos y desarrollo de sistemas de misión crítica.',
        highlights: [
          'Desarrollo & Arquitectura de Software: Sólidas bases en algoritmia, estructuras de datos, programación orientada a objetos (POO), patrones de diseño arquitectónico y construcción de aplicaciones web y distribuidas.',
          'Bases de Datos & Analítica: Diseño, modelado y optimización de bases de datos relacionales avanzadas, junto con principios de inteligencia de negocios (BI) y fundamentos de IA.',
          'Calidad, Seguridad & Procesos (SDLC): Prácticas de verificación y validación (Testing / QA), seguridad informática, ingeniería de requerimientos y control de versiones (SCM).'
        ]
      }
    ],
    languages: [
      {
        language: 'Español',
        level: 'Nativo',
        note: 'Lengua materna, comunicación profesional fluida oral y escrita.'
      },
      {
        language: 'Inglés',
        level: 'A2 (Básico)',
        note: 'Comprensión y lectura de documentación técnica, especificaciones y código en inglés.'
      }
    ]
  };

  public readonly profile = signal<CvProfile>(this.profileData);

  public getProfile(): CvProfile {
    return this.profileData;
  }
}
