// Configuração principal do site desenvolvida por Wesley Silva.
export const SITE_CONFIG = {
  analytics: {
    googleTagId: 'G-7T08P5CXYW',
  },

  professional: {
    name: 'Dra. Daiana Ferraz',
    title: 'Harmonização Orofacial e Odontologia Estética em São Carlos/SP',
    crm: 'CRO/SP 93910',
    photo: 'assets/daiana/Daiana1.jpeg',
    photos: [
      'assets/daiana/Daiana1.jpeg',
      'assets/daiana/Daiana2.jpeg',
      'assets/daiana/Daiana3.jpeg',
      'assets/daiana/Daiana4.webp',
      'assets/daiana/Daiana5.jpeg',
      'assets/daiana/Daiana6.jpg',
    ],
    bio: 'Atendimento em harmonização orofacial e odontologia estética em São Carlos/SP, com avaliação individual, planejamento clínico e foco em segurança do paciente.',
    whatsapp: 'https://wa.me/5516991400423',
  },

  navigation: [
    { label: 'Serviços', anchor: 'services' },
    { label: 'Linha Anna Pegova', anchor: 'products' },
    { label: 'Voucher Ouro', anchor: 'gold-card' },
    { label: 'Voucher Fidelidade', anchor: 'fidelity-card' },
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
      title: 'Toxina Botulínica',
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
      name: 'Sérum Exosome Anna Pegova',
      description: 'Tecnologia com exossomos para regeneração celular e rejuvenescimento profundo com efeito intenso de renovação.',
      image: 'assets/produtos/SerumExosome.jpeg',
    },
    {
      name: 'Pego Lift C Anna Pegova',
      description: 'Sérum com vitamina C para firmeza, luminosidade e uniformização do tom da pele com ação antiidade.',
      image: 'assets/produtos/pegoLiftC.jpeg',
    },
    {
      name: 'Sérum Clareador Anna Pegova',
      description: 'Tratamento concentrado para uniformização do tom da pele e redução de manchas com ativos clareadores.',
      image: 'assets/produtos/serumClareador.jpeg',
    },
    {
      name: 'Pérolas Essenciais Anna Pegova',
      description: 'Tratamento em pérolas ativas para renovação e revitalização da pele com textura luxuosa.',
      image: 'assets/produtos/PerolasEssenciais.jpeg',
    },
    {
      name: 'Mousse Hidratante Anna Pegova',
      description: 'Limpeza suave e hidratação simultânea em fórmula espumante de alta performance para pele equilibrada.',
      image: 'assets/produtos/MousseHidratante.jpeg',
    },
    {
      name: 'Hidratante Protetor Fator 51 Anna Pegova',
      description: 'Proteção solar com fator 51 e ação antioxidante para uso diário, mantendo a pele hidratada e protegida.',
      image: 'assets/produtos/hidratanteProtetorFator51Antioxidante.jpeg',
    },
    {
      name: 'Stick Base Facial Hidratante Anna Pegova',
      description: 'Cobertura prática e hidratante em formato stick para uso diário, unificando o tom com leveza.',
      image: 'assets/produtos/stickBaseFacialHidratante.jpeg',
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
      'assets/ambiente/ambiente1.jpg',
      'assets/ambiente/ambiente2.jpg',
      'assets/ambiente/ambiente3.jpg',
      'assets/ambiente/ambiente4.jpg',
      'assets/ambiente/ambiente5.jpg',
      'assets/ambiente/ambiente6.jpg',
      'assets/ambiente/ambiente7.jpg',
    ],
  },

  proceduresHarmonizacao: [
    { name: 'Toxina Botulínica',           image: 'assets/servicosHarmonizacao/invasivo/Injetaveis.webp' },
    { name: 'Preenchimento Labial',       image: 'assets/servicosHarmonizacao/invasivo/Preenchimento.webp' },
    { name: 'Skinbooster',                image: 'assets/servicosHarmonizacao/invasivo/PreencimentoAcidoHialuronico.webp' },
    { name: 'Bioestimuladores de Colágeno', image: 'assets/servicosHarmonizacao/invasivo/MicroAgulhamento.webp' },
    { name: 'Fios de PDO',                image: 'assets/servicosHarmonizacao/invasivo/Injetaveis.webp' },
    { name: 'Rinomodelação',              image: 'assets/servicosHarmonizacao/invasivo/PreencimentoAcidoHialuronico.webp' },
    { name: 'Ultrassom Microfocado',      image: 'assets/servicosHarmonizacao/naoInvasivo/UltrassomMicrofocado.jpeg' },
    { name: 'Peeling Coreano',            image: 'assets/servicosHarmonizacao/naoInvasivo/Peeling.webp' },
  ],

  proceduresOdontologia: [
    { name: 'Prevenção Bucal com Câmera Intraoral', image: 'assets/servicosDentista/cameraIntraOral.webp' },
    { name: 'Clareamento Dental', image: 'assets/servicosDentista/Clareamento.jpeg' },
    { name: 'Facetas', image: 'assets/servicosDentista/Lentes.jpeg' },
    { name: 'Profilaxia e Limpeza Profissional', image: 'assets/servicosDentista/clareamentoCaseiro.jpg' },
    { name: 'Prótese Dentária', image: 'assets/servicosDentista/Proteses.jpeg' },
    { name: 'Tratamento para Bruxismo', image: 'assets/servicosDentista/bruximoPlaca.png' },
  ],

  reviews: [
    {
      author: 'Sara Carreiro',
      avatar: 'SC',
      rating: 5,
      text: 'Eu tinha muito medo de ficar com um resultado artificial no preenchimento labial. A Dra. Daiana foi transparente do início ao fim — me mostrou fotos, explicou cada etapa e o resultado ficou incrivelmente natural. Valeu cada centavo. Quem tiver essa dúvida: pode ir com confiança.',
      date: 'há 1 semana',
    },
    {
      author: 'Graciele Silva',
      avatar: 'GS',
      rating: 5,
      text: 'Confesso que fui com receio de sentir muita dor. A Dra. Daiana usou anestésico, foi delicada e me avisou de cada etapa antes de fazer. Não senti praticamente nada. O preenchimento ficou maravilhoso e o custo-benefício é ótimo — já indiquei para várias amigas.',
      date: 'há 1 semana',
    },
    {
      author: 'Maria Helena Ambrosio Ferraz',
      avatar: 'MH',
      rating: 5,
      text: 'Tinha medo de dentista desde criança. A Dra. Daiana foi tão acolhedora que esse medo foi embora. Fiz o ultrassom microfocado — ela explicou tudo com clareza, sem enrolação. O resultado foi além do que esperava. Ainda fiz peeling coreano e amei! Minha dentista favorita para sempre 😘',
      date: 'há 1 semana',
    },
    {
      author: 'Helen Sagueshima',
      avatar: 'HS',
      rating: 5,
      text: 'Estava insegura se o investimento valeria a pena. A Dra. Daiana apresentou um plano detalhado com valores antes de qualquer procedimento, sem surpresa. Me senti cuidada do começo ao fim. Indico e volto sempre — já é parte do meu autocuidado! 💖',
      date: 'há 1 semana',
    },
    {
      author: 'Diego Carreiro',
      avatar: 'DC',
      rating: 5,
      text: 'Nunca tinha feito nenhum procedimento estético e fui cheio de dúvidas. A Dra. Daiana respondeu tudo com paciência, sem me apressar. Resultado excelente e me senti seguro em cada etapa. Recomendo sem hesitar. Pode confiar.',
      date: 'há 6 dias',
    },
    {
      author: 'Debora Olegario',
      avatar: 'DO',
      rating: 5,
      text: 'O que mais me impressionou foi a honestidade: quando perguntei sobre um procedimento que não era pra mim, ela falou abertamente. Isso gera confiança. Profissional ética, atualizada e com preço justo. Esse tipo de transparência é raro.',
      date: 'há 1 semana',
    },
    {
      author: 'Karina Rosa',
      avatar: 'KR',
      rating: 5,
      text: 'Fui com muito medo de ficar com o rosto "estranho" depois do ultrassom microfocado. Ela me mostrou casos reais, tirou todas as minhas dúvidas e explicou o que esperar semana a semana. O resultado foi progressivo e natural. Adorei!',
      date: 'há 1 semana',
    },
    {
      author: 'Andre Felipe Camelo',
      avatar: 'AC',
      rating: 5,
      text: 'Minha maior dúvida era se o resultado compensaria o investimento. Compensou — e muito. A Dra. Daiana é cuidadosa, experiente e deixa tudo muito claro antes de começar. Sem letra miúda, sem surpresa no final. Recomendo a todos!',
      date: 'há 1 semana',
    },
    {
      author: 'Karina Machado Ramos',
      avatar: 'KM',
      rating: 5,
      text: 'Além de ser tecnicamente impecável, a Dra. Daiana tem um lado humano que poucos profissionais têm. Ela ouve, explica com calma e faz você se sentir segura. Para quem tem medo ou insegurança: esse é o lugar certo. Saí de lá emocionada de gratidão.',
      date: 'há 3 meses',
    },
    {
      author: 'Jesgiscler M. de Oliveira',
      avatar: 'JO',
      rating: 5,
      text: 'Cheguei com dor e medo do implante. A Dra. Daiana foi cautelosa, explicou o procedimento passo a passo e me deixou confortável. Resolveu o problema com competência e humanidade. Recomendo de olhos fechados — profissional maravilhosa.',
      date: 'há 9 meses',
    },
    {
      author: 'Igor (Doctoralia)',
      avatar: 'IG',
      rating: 5,
      text: 'Tinha muito receio de não entender o que estava sendo feito. A Dra. Daiana explicou cada detalhe do tratamento com clareza, sem usar termos complicados. O pós-atendimento foi atencioso. Esse cuidado com a informação faz toda a diferença. Recomendo muito!',
      date: 'Doctoralia · verificada',
    },
    {
      author: 'Edna Oliveira',
      avatar: 'EO',
      rating: 5,
      text: 'Fomos mãe e filha juntas — e as duas saímos encantadas. Ambiente limpo, acolhedor e profissional que transmite segurança desde o primeiro contato. Para quem tem medo de dentista: vá uma vez e esse medo passa. Indico a todos que conheço!',
      date: 'há 1 ano',
    },
  ],

  goldCard: {
    title: 'Voucher Ouro · Harmonização',
    subtitle: 'Indique alguém e ganhe um serviço exclusivo',
    description:
      'Pacientes de harmonização podem indicar amigos e familiares. Quando a pessoa indicada fechar um procedimento, você ganha um serviço exclusivo — tudo a combinar diretamente com a Dra. Daiana (Até sua corrida do Uber?) !',
    benefits: [
      'Voucher válido em serviços de harmonização selecionados',
      'Quem indica e fecha: ganha um serviço exclusivo à combinar',
      'Planejamento personalizado por fase de tratamento',
      'Atendimento com foco em resultado natural e seguro',
      'Dúvidas? Basta responder no WhatsApp.',
    ],
    ctaText: 'Quero meu voucher e indicar alguém',
    whatsappMessage: 'Oi! Vi no site o Voucher Ouro de harmonização e quero saber mais. Tenho interesse em indicar alguém também!',
  },

  fidelityCard: {
    title: 'Voucher Ouro · Odontologia',
    subtitle: 'Indique alguém e ganhe um serviço exclusivo',
    description:
      'Pacientes de odontologia podem indicar amigos e familiares. Quando a pessoa indicada fechar um procedimento, você ganha um serviço exclusivo — tudo a combinar diretamente com a Dra. Daiana.',
    benefits: [
      'Voucher válido para retorno em até 12 meses',
      'Elegível por indicação via voucher ouro físico',
      'Quem indica e fecha: ganha um serviço exclusivo à combinar',
      'Dúvidas? Basta responder no WhatsApp.',
    ],
    ctaText: 'Quero meu voucher e indicar alguém',
    whatsappMessage: 'Oi! Vi no site o Voucher Ouro de odontologia e quero saber mais. Tenho interesse em indicar alguém também!',
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

  imagesHarmonizacaoInvasivo: [
    { src: 'assets/servicosHarmonizacao/invasivo/Injetaveis.webp',                   icon: '💉', label: 'Toxina Botulínica',          description: 'Aplicação com indicação clínica para manejo de linhas de expressão, com planejamento conforme características de cada paciente.' },
    { src: 'assets/servicosHarmonizacao/invasivo/Preenchimento.webp',                icon: '💋', label: 'Preenchimento Labial',        description: 'Procedimento com ácido hialurônico para definição de contorno e volume, sempre com avaliação prévia.' },
    { src: 'assets/servicosHarmonizacao/invasivo/PreencimentoAcidoHialuronico.webp', icon: '💧', label: 'Skinbooster',                 description: 'Protocolo voltado à hidratação cutânea e qualidade da pele, indicado após avaliação clínica.' },
    { src: 'assets/servicosHarmonizacao/invasivo/MicroAgulhamento.webp',             icon: '🌟', label: 'Bioestimuladores de Colágeno', description: 'Indicado para estímulo de colágeno e suporte de firmeza da pele conforme indicação profissional.' },
    { src: 'assets/servicosHarmonizacao/invasivo/Injetaveis.webp',                   icon: '🧵', label: 'Fios de PDO',                 description: 'Procedimento minimamente invasivo com objetivo de suporte tecidual e estímulo de colágeno, conforme avaliação.' },
    { src: 'assets/servicosHarmonizacao/invasivo/PreencimentoAcidoHialuronico.webp', icon: '👃', label: 'Rinomodelação',               description: 'Procedimento não cirúrgico com planejamento individual para ajuste de contorno nasal, quando indicado.' },
  ],

  imagesHarmonizacaoNaoInvasivo: [
    { src: 'assets/servicosHarmonizacao/naoInvasivo/UltrassomMicrofocado.jpeg',      icon: '🔊', label: 'Ultrassom Microfocado',        description: 'Procedimento não cirúrgico para estímulo de colágeno e suporte à firmeza da pele, conforme avaliação individual.' },
    { src: 'assets/servicosHarmonizacao/naoInvasivo/Peeling.webp',                   icon: '🌸', label: 'Peeling Coreano',              description: 'Procedimento para renovação da pele e melhora de textura, com protocolo definido de forma individual.' },
    { src: 'assets/servicosHarmonizacao/naoInvasivo/laser-EmBreve.webp',             icon: '✨', label: 'Laser',                        description: 'Em breve disponível na clínica com protocolo individualizado.', comingSoon: true },
    { src: 'assets/servicosHarmonizacao/naoInvasivo/RadioFrequencia-EmBreve.webp',   icon: '📡', label: 'Radiofrequência',              description: 'Em breve disponível na clínica com protocolo individualizado.', comingSoon: true },
  ],

  imagesOdontologia: [
    { src: 'assets/servicosDentista/cameraIntraOral.webp',       icon: '🦷', label: 'Câmera Intraoral',              description: 'Mapeamento detalhado em tempo real para prevenir problemas e criar um plano inteligente de manutenção do seu sorriso.' },
    { src: 'assets/servicosDentista/Clareamento.jpeg',           icon: '✨', label: 'Clareamento de Consultório',     description: 'Clareamento dental com acompanhamento profissional e indicação individual, preservando a saúde bucal.' },
    { src: 'assets/servicosDentista/clareamentoCaseiro.jpg',     icon: '🪥', label: 'Clareamento Caseiro',            description: 'Protocolo supervisionado para uso em casa, com moldeiras personalizadas e gel indicado individualmente.' },
    { src: 'assets/servicosDentista/facetasCeramica.webp',       icon: '😁', label: 'Facetas de Cerâmica',            description: 'Reabilitação estética de cor e formato com planejamento clínico e indicação individual.' },
    { src: 'assets/servicosDentista/Lentes.jpeg',                icon: '😁', label: 'Lentes de Contato Dental',      description: 'Alternativa estética de alta precisão para correção de cor e forma com resultado natural e conservador.' },
    { src: 'assets/servicosDentista/Proteses.jpeg',              icon: '🦷', label: 'Prótese / Ponte Fixa',           description: 'Reabilitação oral com próteses planejadas para devolver mastigação, conforto e estética do sorriso.' },
    { src: 'assets/servicosDentista/ProteseProtocolo.webp',      icon: '🦷', label: 'Prótese Protocolo',              description: 'Solução de reabilitação completa com protocolo de alta estética e funcionalidade.' },
    { src: 'assets/servicosDentista/bruximoPlaca.png',           icon: '😬', label: 'Placa para Bruxismo',            description: 'Diagnóstico e manejo do bruxismo para reduzir dores, proteger os dentes e melhorar a qualidade do sono.' },
    { src: 'assets/servicosDentista/BruxismoAcido.webp',         icon: '😬', label: 'Bruxismo e Erosão Ácida',        description: 'Abordagem personalizada para proteger a estrutura dental da erosão causada pelo bruxismo e acidez.' },
    { src: 'assets/servicosDentista/ortodontia.jpg',             icon: '🦷', label: 'Ortodontia',                     description: 'Tratamento para alinhamento dos dentes com planejamento individualizado e acompanhamento contínuo.' },
    { src: 'assets/servicosDentista/pericia.png',                icon: '⚖️', label: 'Perícia Odontológica',             description: 'Laudo técnico com rigor científico para fins legais, seguros ou processos judiciais.' },
    { src: 'assets/servicosDentista/periciaOdonto.webp',         icon: '⚖️', label: 'Perícia Especializada',             description: 'Avaliação pericial odontológica com documentação detalhada e suporte especializado.' },
  ],

  // ── ANTES & DEPOIS ──
  // Adicione as fotos nas pastas abaixo e preencha os campos before/after:
  //   Invasivo:   assets/servicosHarmonizacao/invasivo/antesDepois/
  //   Não Invasivo: assets/servicosHarmonizacao/naoInvasivo/antesDepoisNaoInvasivo/
  //   Odontologia:  assets/servicosDentista/antesDepois/
  beforeAfterHarmonizacaoInvasivo: [
    { label: 'Preenchimento Labial',       before: 'assets/servicosHarmonizacao/invasivo/antesDepois/preenchimentoLabial1.jpeg', after: 'assets/servicosHarmonizacao/invasivo/antesDepois/PreenchimentoLabial.jpeg', description: 'Procedimento com ácido hialurônico para definição e volume labial com resultado natural e harmônico.' },
    { label: 'Toxina Botúlínica',           before: null as string | null, after: null as string | null, description: 'Aplicação com indicação clínica para suavização de linhas de expressão, com resultado sutil e personalizado.' },
    { label: 'Rinomodelação',              before: 'assets/servicosHarmonizacao/invasivo/antesDepois/rinomodelacao1.jpg', after: 'assets/servicosHarmonizacao/invasivo/antesDepois/Rinomodelacao.jpeg', description: 'Procedimento não cirúrgico com planejamento individual para ajuste de contorno nasal, quando indicado.' },
    { label: 'Microagulhamento',           before: null as string | null, after: null as string | null, description: 'Estimulação de colágeno com agulhas finas para melhora de textura, poros e cicatrizes.' },
  ],

  beforeAfterHarmonizacaoNaoInvasivo: [
    { label: 'Ultrassom Microfocado',      before: null as string | null, after: 'assets/servicosHarmonizacao/naoInvasivo/antesDepoisNaoInvasivo/Ultrassomicrofocado.jpeg', description: 'Tecnologia de ultrassom para lifting e sustentação sem cortes, com resultado progressivo.' },
    { label: 'Peeling Coreano',            before: null as string | null, after: null as string | null, description: 'Protocolo de renovação celular para uniformidade de tom, textura e luminosidade da pele.' },
    { label: 'Bioestimulador de Colágeno', before: null as string | null, after: 'assets/servicosHarmonizacao/naoInvasivo/antesDepoisNaoInvasivo/BioestimuladorColageno.jpeg', description: 'Estimulação profunda de colágeno para firmeza e rejuvenescimento gradual e natural.' },
  ],

  beforeAfterOdontologia: [
    { label: 'Clareamento Dental',         before: null as string | null, after: null as string | null, description: 'Clareamento com acompanhamento profissional e indicação individual, preservando a saúde bucal.' },
    { label: 'Facetas de Cerâmica',        before: null as string | null, after: null as string | null, description: 'Reabilitação estética de cor e formato com planejamento clínico e indicação individual.' },
    { label: 'Prótese Dentária',          before: null as string | null, after: null as string | null, description: 'Reabilitação oral com próteses planejadas para devolver mastigação, conforto e estética.' },
    { label: 'Tratamento para Bruxismo',   before: null as string | null, after: null as string | null, description: 'Diagnóstico e manejo do bruxismo para proteger os dentes e melhorar a qualidade do sono.' },
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} Dra. Daiana Ferraz`,
    lastUpdated: '31/03/2026 23:00',
    technicalResponsible: 'Wesley Silva · wesley.zilva@gmail.com',
    technicalResponsibleEmail: 'wesley.zilva@gmail.com',
    privacyUrl: 'politica-de-privacidade.html',
    termsUrl: 'termos-de-uso.html',
    disclaimer: 'Procedimentos realizados por dentista habilitada. Resultados podem variar.',
  },
};
