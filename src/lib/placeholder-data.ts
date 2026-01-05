import type { Candidate, Company, Job, Application } from '@/lib/types';

export const DUMMY_CANDIDATE: Candidate = {
  id: 'cand1',
  email: 'ana.silva@email.com',
  name: 'Ana Silva',
  avatarUrl: 'https://picsum.photos/seed/avatar1/200/200',
  role: 'candidate',
  title: 'Desenvolvedora Full Stack Sênior',
  skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
  salaryExpectation: 12000,
  experience: [
    {
      title: 'Desenvolvedora Full Stack Sênior',
      company: 'Tech Solutions Inc.',
      period: 'Jan 2020 - Presente',
      description: 'Liderou o desenvolvimento do novo portal do cliente usando React e Node.js, resultando em um aumento de 30% na satisfação do usuário. Mentorou desenvolvedores juniores.'
    },
    {
      title: 'Desenvolvedora Web Pleno',
      company: 'Web Wizards',
      period: 'Jun 2017 - Dez 2019',
      description: 'Desenvolveu e manteve aplicações web para diversos clientes, utilizando principalmente Angular e PHP.'
    }
  ],
  resumeUrl: 'path/to/resume_ana.pdf',
};

export const DUMMY_COMPANY: Company = {
  id: 'comp1',
  email: 'rh@inovatech.com',
  name: 'Ricardo Mendes',
  avatarUrl: 'https://picsum.photos/seed/avatar2/200/200',
  role: 'company',
  companyName: 'InovaTech',
  website: 'https://www.inovatech.com',
  about: 'A InovaTech é líder em soluções de software como serviço (SaaS), focada em otimizar a produtividade de equipes em todo o mundo. Estamos sempre em busca de talentos para se juntar à nossa equipe inovadora.'
};

export const DUMMY_JOBS: Job[] = [
  {
    id: 'job1',
    title: 'Engenheiro de Software Backend (Node.js)',
    companyId: 'comp1',
    companyName: 'InovaTech',
    companyLogoUrl: 'https://picsum.photos/seed/logo1/200/200',
    location: 'São Paulo, SP (Remoto)',
    type: 'Full-time',
    salary: 'R$ 10.000 - R$ 14.000',
    description: 'Buscamos um Engenheiro de Software Backend experiente para construir e manter a espinha dorsal de nossas aplicações. Você trabalhará com microserviços, APIs RESTful e garantirá a escalabilidade de nossos sistemas.',
    requirements: ['Node.js', 'TypeScript', 'Express.js', 'Bancos de dados SQL e NoSQL', 'Mensageria (RabbitMQ/Kafka)'],
    datePosted: '2 dias atrás',
  },
  {
    id: 'job2',
    title: 'Desenvolvedor Frontend (React)',
    companyId: 'comp2',
    companyName: 'DesignCo',
    companyLogoUrl: 'https://picsum.photos/seed/logo2/200/200',
    location: 'Rio de Janeiro, RJ (Híbrido)',
    type: 'Full-time',
    salary: 'R$ 8.000 - R$ 11.000',
    description: 'Junte-se à nossa equipe para criar interfaces de usuário bonitas e intuitivas. Você colaborará com designers de UX/UI para transformar wireframes em realidade.',
    requirements: ['React', 'Redux/Context API', 'CSS-in-JS', 'Testes unitários (Jest/RTL)', 'Figma'],
    datePosted: '5 dias atrás',
  },
  {
    id: 'job3',
    title: 'DevOps Engineer',
    companyId: 'comp1',
    companyName: 'InovaTech',
    companyLogoUrl: 'https://picsum.photos/seed/logo1/200/200',
    location: 'Remoto',
    type: 'Contract',
    description: 'Procuramos um Engenheiro DevOps para automatizar nossos processos de CI/CD, gerenciar nossa infraestrutura na AWS e garantir a alta disponibilidade de nossos serviços.',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD (Jenkins/GitLab CI)'],
    datePosted: '1 semana atrás',
  },
  {
    id: 'job4',
    title: 'UI/UX Designer Sênior',
    companyId: 'comp2',
    companyName: 'DesignCo',
    companyLogoUrl: 'https://picsum.photos/seed/logo2/200/200',
    location: 'Belo Horizonte, MG (Remoto)',
    type: 'Full-time',
    description: 'Lidere a visão de design de nossos produtos, desde a pesquisa com usuários até a prototipação e testes de usabilidade. Crie experiências que encantam nossos clientes.',
    requirements: ['Figma', 'Adobe XD', 'Pesquisa de Usuário', 'Design Systems', 'Prototipação Interativa'],
    datePosted: '10 dias atrás',
  },
];

export const DUMMY_APPLICATIONS: Application[] = [
    {
        id: 'app1',
        jobId: 'job1',
        candidateId: 'cand1',
        dateApplied: '1 dia atrás',
        status: 'Reviewed'
    },
    {
        id: 'app2',
        jobId: 'job2',
        candidateId: 'cand1',
        dateApplied: '4 dias atrás',
        status: 'Pending'
    },
    {
        id: 'app3',
        jobId: 'job3',
        candidateId: 'cand1',
        dateApplied: '1 semana atrás',
        status: 'Interviewing'
    },
     {
        id: 'app4',
        jobId: 'job4',
        candidateId: 'cand1',
        dateApplied: '2 semanas atrás',
        status: 'Rejected'
    }
];

export const DUMMY_CANDIDATES_FOR_JOB: Candidate[] = [
  DUMMY_CANDIDATE,
  {
    id: 'cand2',
    email: 'bruno.costa@email.com',
    name: 'Bruno Costa',
    avatarUrl: 'https://picsum.photos/seed/avatar3/200/200',
    role: 'candidate',
    title: 'Engenheiro de Dados Pleno',
    skills: ['Python', 'SQL', 'Spark', 'Airflow', 'GCP'],
    experience: [],
    resumeUrl: 'path/to/resume_bruno.pdf',
  },
  {
    id: 'cand3',
    email: 'carla.dias@email.com',
    name: 'Carla Dias',
    avatarUrl: 'https://picsum.photos/seed/avatar4/200/200',
    role: 'candidate',
    title: 'Gerente de Projetos de TI',
    skills: ['Scrum', 'Kanban', 'JIRA', 'Agile', 'PMP'],
    experience: [],
    resumeUrl: 'path/to/resume_carla.pdf',
  },
  {
    id: 'cand4',
    email: 'daniel.rocha@email.com',
    name: 'Daniel Rocha',
    avatarUrl: 'https://picsum.photos/seed/avatar5/200/200',
    role: 'candidate',
    title: 'Desenvolvedor Backend Júnior',
    skills: ['Node.js', 'JavaScript', 'SQL'],
    experience: [],
    resumeUrl: 'path/to/resume_daniel.pdf',
  },
];
