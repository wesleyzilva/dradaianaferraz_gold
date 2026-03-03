// Configuração principal do site desenvolvida por Wesley Silva.
export const SITE_CONFIG = {
  analytics: {
    googleTagId: 'G-XXXXXXXXXX',
  },

  professional: {
    name: 'Dra. Daiana Ferraz',
    title: 'Harmonização Orofacial e Odontologia Estética em São Carlos/SP',
    crm: 'CRO/SP 93910',
    photo: '/images/dra/dra-daiana-ferraz.jpg',
    bio: 'Atendimento em harmonização orofacial e odontologia estética em São Carlos/SP, com avaliação individual, planejamento clínico e foco em segurança do paciente.',
    whatsapp: 'https://wa.me/5516991400423',
  },

  navigation: [
    { label: 'Serviços', anchor: 'services' },
    { label: 'Linha Anna Pegova', anchor: 'products' },
    { label: 'Cartão Ouro', anchor: 'gold-card' },
    { label: 'Cartão Fidelidade', anchor: 'fidelity-card' },
    { label: 'Avaliações', anchor: 'reviews' },
    { label: 'Localização', anchor: 'location' },
  ],

  services: [
    {
      icon: '🔊',
      title: 'Ultrassom Microfocado',
      invasiveness: 'Não invasivo',
      description: 'Procedimento não cirúrgico para estímulo de colágeno e suporte à firmeza da pele, conforme avaliação individual.',
    },
    {
      icon: '💉',
      title: 'Toxina Botulínica (Botox)',
      invasiveness: 'Invasivo',
      description: 'Aplicação com indicação clínica para manejo de linhas de expressão, com planejamento conforme características de cada paciente.',
    },
    {
      icon: '💋',
      title: 'Preenchimento Labial',
      invasiveness: 'Invasivo',
      description: 'Procedimento com ácido hialurônico para definição de contorno e volume, sempre com avaliação prévia.',
    },
    {
      icon: '💧',
      title: 'Skinbooster',
      invasiveness: 'Invasivo',
      description: 'Protocolo voltado à hidratação cutânea e qualidade da pele, indicado após avaliação clínica.',
    },
    {
      icon: '🌟',
      title: 'Bioestimuladores de Colágeno',
      invasiveness: 'Invasivo',
      description: 'Indicado para estímulo de colágeno e suporte de firmeza da pele conforme indicação profissional.',
    },
    {
      icon: '🧵',
      title: 'Fios de PDO',
      invasiveness: 'Invasivo',
      description: 'Procedimento minimamente invasivo com objetivo de suporte tecidual e estímulo de colágeno, conforme avaliação.',
    },
    {
      icon: '🌸',
      title: 'Peeling Coreano',
      invasiveness: 'Não invasivo',
      description: 'Procedimento para renovação da pele e melhora de textura, com protocolo definido de forma individual.',
    },
    {
      icon: '👃',
      title: 'Rinomodelação',
      invasiveness: 'Invasivo',
      description: 'Procedimento não cirúrgico com planejamento individual para ajuste de contorno nasal, quando indicado.',
    },
  ],

  odontology: {
    title: 'Odontologia com foco em prevenção, função e estética',
    subtitle:
      'Atendimento odontológico com protocolos atualizados, diagnóstico cuidadoso e planejamento individual para saúde bucal.',
    services: [
      {
        icon: '🦷',
        title: 'Prevenção Bucal com Câmera Intraoral',
        description:
          'Mapeamento detalhado em tempo real para prevenir problemas e criar um plano inteligente de manutenção do seu sorriso.',
      },
      {
        icon: '✨',
        title: 'Clareamento Dental',
        description:
          'Clareamento dental com acompanhamento profissional e indicação individual, preservando a saúde bucal.',
      },
      {
        icon: '😁',
        title: 'Facetas',
        description:
          'Reabilitação estética de cor e formato com planejamento clínico e indicação individual.',
      },
      {
        icon: '🪥',
        title: 'Profilaxia e Limpeza Profissional',
        description:
          'Limpeza técnica com remoção de biofilme e manchas para manutenção da saúde bucal e prevenção contínua.',
      },
      {
        icon: '🦷',
        title: 'Prótese Dentária',
        description:
          'Reabilitação oral com próteses planejadas para devolver mastigação, conforto e estética do sorriso com adaptação personalizada.',
      },
      {
        icon: '😬',
        title: 'Tratamento para Bruxismo',
        description:
          'Diagnóstico e manejo do bruxismo para reduzir dores, proteger os dentes e melhorar a qualidade do sono com abordagem personalizada.',
      },
      {
        icon: '⚖️',
        title: 'Perícia Judicial em Harmonização e Odontologia',
        description:
          'Atuação técnica especializada com pareceres claros e suporte qualificado em demandas de odontologia e harmonização orofacial.',
      },
    ],
  },

  products: [
    {
      name: 'Limpeza de Pele Anna Pegova',
      description: 'Higienização profunda com ativos de alta performance para uma pele renovada, equilibrada e luminosa.',
      image: '/images/products/anna-pegova-limpeza.jpg',
    },
    {
      name: 'Hidratação Intensiva Anna Pegova',
      description: 'Reposição intensiva de hidratação para toque sedoso, viço imediato e conforto prolongado da pele.',
      image: '/images/products/anna-pegova-hidratacao.jpg',
    },
    {
      name: 'Revitalização Facial Anna Pegova',
      description: 'Blend de ativos premium para luminosidade, uniformidade e textura refinada com efeito de pele bem cuidada.',
      image: '/images/products/anna-pegova-revitalizacao.jpg',
    },
    {
      name: 'Linha Profissional Anna Pegova',
      description: 'Curadoria profissional de cabine e home care para potencializar e prolongar resultados entre as sessões.',
      image: '/images/products/anna-pegova-linha-profissional.jpg',
    },
  ],

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2!2d-51.2!3d-30.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zClínica+Dra+Daiana!5e0!3m2!1spt-BR!2sbr!4v0',

  location: {
    address: 'Balão do Bonde - Av. Cap. Luíz Brandão, 26',
    neighborhood: 'Vila Nery',
    city: 'São Carlos - SP',
    cep: '13568-450',
    phone: '(16) 99140-0423',
    email: 'odontologia.ipanema.sc@gmail.com',
    hours: 'Seg: 09h30–19h | Ter: 07h30–19h | Qua: 09h30–19h | Qui: 07h30–19h | Sex: 09h30–19h | Sáb: 09h30–12h',
    clinicPhotos: [
      '/images/clinica/interior-clinica-1.jpg',
      '/images/clinica/interior-clinica-2.jpg',
    ],
  },

  proceduresHarmonizacao: [
    {
      name: 'Harmonização Facial Completa',
      beforeImage: 'https://placehold.co/400x500/888888/FFFFFF?text=Antes',
      afterImage: 'https://placehold.co/400x500/C9A84C/FFFFFF?text=Depois',
    },
    {
      name: 'Preenchimento Labial',
      beforeImage: 'https://placehold.co/400x500/888888/FFFFFF?text=Antes',
      afterImage: 'https://placehold.co/400x500/C9A84C/FFFFFF?text=Depois',
    },
    {
      name: 'Toxina Botulínica',
      beforeImage: 'https://placehold.co/400x500/888888/FFFFFF?text=Antes',
      afterImage: 'https://placehold.co/400x500/C9A84C/FFFFFF?text=Depois',
    },
    {
      name: 'Bioestimuladores de Colágeno',
      beforeImage: 'https://placehold.co/400x500/888888/FFFFFF?text=Antes',
      afterImage: 'https://placehold.co/400x500/C9A84C/FFFFFF?text=Depois',
    },
  ],

  proceduresOdontologia: [
    {
      name: 'Clareamento Dental',
      beforeImage: 'https://placehold.co/400x500/888888/FFFFFF?text=Antes',
      afterImage: 'https://placehold.co/400x500/C9A84C/FFFFFF?text=Depois',
    },
    {
      name: 'Facetas',
      beforeImage: 'https://placehold.co/400x500/888888/FFFFFF?text=Antes',
      afterImage: 'https://placehold.co/400x500/C9A84C/FFFFFF?text=Depois',
    },
    {
      name: 'Profilaxia e Limpeza Profissional',
      beforeImage: 'https://placehold.co/400x500/888888/FFFFFF?text=Antes',
      afterImage: 'https://placehold.co/400x500/C9A84C/FFFFFF?text=Depois',
    },
    {
      name: 'Check-up Odontológico Preventivo',
      beforeImage: 'https://placehold.co/400x500/888888/FFFFFF?text=Antes',
      afterImage: 'https://placehold.co/400x500/C9A84C/FFFFFF?text=Depois',
    },
  ],

  reviews: [
    {
      author: 'Karina Machado Ramos',
      avatar: 'KR',
      photo: '/images/reviews/karina-machado-ramos.jpg',
      rating: 5,
      text: 'Experiência excelente, com atendimento técnico e humano. Destaca competência, atenção, paciência e muito cuidado com o paciente.',
      date: 'há 1 mês',
    },
    {
      author: 'Jesgiscler M. de Oliveira',
      avatar: 'JO',
      photo: '/images/reviews/jesgiscler-m-oliveira.jpg',
      rating: 5,
      text: 'Relata ótimo acolhimento em implante dentário e resolução da dor com cautela e profissionalismo, recomendando fortemente o atendimento.',
      date: 'há 8 meses',
    },
    {
      author: 'Thais Costa',
      avatar: 'TC',
      photo: '/images/reviews/thais-costa.jpg',
      rating: 5,
      text: 'Avaliação positiva do início ao fim do tratamento, mencionando procedimentos odontológicos e estéticos com boa experiência geral.',
      date: 'há 1 ano',
    },
  ],

  goldCard: {
    title: 'Conheça o Cartão Ouro',
    subtitle: 'Seu acesso ao Cartão Ouro em Harmonização Orofacial',
    description:
      'Condição para pacientes de harmonização, com regras claras de elegibilidade em serviços selecionados.',
    benefits: [
      'Benefícios válidos em serviços de harmonização selecionados',
      'Condições do Cartão Ouro aplicáveis a serviços de harmonização elegíveis, conforme regras vigentes da clínica.',
      'Acesso preferencial para avaliação e acompanhamento',
      'Planejamento personalizado por fase de tratamento',
      'Atendimento premium com foco em naturalidade',
      'Ficou com dúvidas? Entre em contato.',
    ],
    ctaText: 'Quero meu Cartão Ouro',
    whatsappMessage: 'Olá! Gostaria de saber mais sobre o Cartão Ouro para Harmonização e os benefícios disponíveis.',
  },

  fidelityCard: {
    title: 'Conheça o Cartão Ouro',
    subtitle: 'Programa Cartão Ouro para pacientes de Odontologia Premium',
    description:
      'Programa para pacientes de odontologia elegíveis, com regras específicas para retorno em até 12 meses.',
    benefits: [
      'Benefício válido para retorno em até 12 meses',
      'Elegível para pacientes por indicação via cartão ouro físico',
      'Condições do Cartão Ouro aplicáveis a serviços odontológicos elegíveis, conforme regras vigentes da clínica.',
    ],
    ctaText: 'Quero meu Cartão Ouro',
    whatsappMessage: 'Olá! Gostaria de saber mais sobre o Cartão Ouro da Odontologia e as regras do desconto Ouro.',
  },

  social: {
    instagram: 'https://instagram.com/dradaianaferrazsc',
    lattes: 'https://lattes.cnpq.br/3596228528846662',
    linkedin: 'https://www.linkedin.com/in/daiana-ferraz-87b678a8',
    googleBusiness: 'https://g.page/r/CdKq0HEOJamhEAE',
    doctoralia: 'https://www.doctoralia.com.br/daiana-ferraz/dentista/sao-carlos#profile-reviews',
  },

  reputation: {
    sourceUrl: '/reputation.json',
    google: {
      rating: '4,9',
      totalReviews: 119,
    },
    doctoralia: {
      rating: '5,0',
      totalReviews: 21,
    },
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Dra. Daiana Ferraz`,
    lastUpdated: '03/03/2026 14:00',
    technicalResponsible: 'Wesley Silva · wesley.zilva@gmail.com',
    technicalResponsibleEmail: 'wesley.zilva@gmail.com',
    privacyUrl: '/politica-de-privacidade.html',
    termsUrl: '/termos-de-uso.html',
    disclaimer: 'Procedimentos realizados por dentista habilitada. Resultados podem variar.',
  },
};
