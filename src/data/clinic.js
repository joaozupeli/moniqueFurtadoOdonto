/**
 * ============================================================
 * DADOS DA CLÍNICA — Dra. Monique Furtado Odontologia
 * Demo personalizado a partir de odontoproto (molde intacto)
 * ============================================================
 */

export const clinic = {
  name: 'Dra. Monique Furtado Odontologia',
  shortName: 'Dra. Monique',
  discipline: 'Odontologia',
  established: 2015,

  tagline: 'Sorrisos naturais, reabilitação com elegância',
  shortDescription:
    'Clínica boutique em Mercês, Curitiba — implantodontia, prótese, facetas, reabilitação oral, estética e odontologia digital, com foco em makeovers naturais.',

  hero: {
    kicker: 'Mercês · Curitiba',
    lines: ['Sorrisos naturais,', 'reabilitação com'],
    lineAccent: 'elegância.',
    lead:
      'Implantes, facetas e odontologia digital em um consultório boutique em Mercês. Planejamento cuidadoso, estética feminina e resultados que parecem seus.',
  },

  whatsapp: '5541996291911',
  whatsappDisplay: '(41) 99629-1911',
  whatsappDefaultMessage:
    'Olá! Gostaria de agendar uma avaliação na Dra. Monique Furtado Odontologia.',

  phone: '(41) 99629-1911',
  email: 'contato@dramoniquefurtado.com.br',

  address: {
    street: 'Travessa Amando Mann, 83 — Sala 2',
    neighborhood: 'Mercês',
    city: 'Curitiba',
    state: 'PR',
    zip: '80430-010',
    full: 'Travessa Amando Mann, 83 — Sala 2, Mercês, Curitiba — PR, 80430-010',
  },

  hours: [
    { days: 'Segunda a sexta', time: '08:00 — 18:00' },
    { days: 'Sábado', time: 'Sob agendamento' },
    { days: 'Domingo', time: 'Fechado' },
  ],

  social: {
    instagram: 'https://www.instagram.com/dramoniquemf/',
    facebook: null,
    youtube: null,
  },

  stats: [
    { value: 5.0, suffix: '', label: 'Avaliação DentMap (~22 reviews)' },
    { value: 6, suffix: '', label: 'Frentes de tratamento' },
    { value: 98, suffix: '%', label: 'Indicariam a clínica' },
    { value: 1, suffix: '', label: 'Canal direto no WhatsApp' },
  ],

  manifesto:
    'Estética com critério clínico: cada sorriso planejado com precisão digital, materiais nobres e um olhar boutique — natural, feminino e elegante.',

  principles: [
    {
      title: 'Estética natural',
      text: 'Facetas, clareamento e harmonização pensados para realçar o seu sorriso — sem artificialidade.',
    },
    {
      title: 'Reabilitação previsível',
      text: 'Implantes e próteses com planejamento digital, etapas claras e acompanhamento próximo.',
    },
    {
      title: 'Odontologia digital',
      text: 'Diagnóstico e desenho do sorriso com tecnologia que antecipa o resultado antes do tratamento.',
    },
    {
      title: 'Atendimento boutique',
      text: 'Consultório acolhedor em Mercês, com conversa direta no WhatsApp e agenda pensada no seu ritmo.',
    },
  ],
}

export const services = [
  {
    id: 'implantes',
    title: 'Implantodontia',
    description: 'Reposição dentária com planejamento digital e resultado estável.',
    detail:
      'Do planejamento guiado à coroa definitiva: cirurgia cuidadosa, prótese provisória quando o caso permite e acompanhamento no pós-operatório.',
    topics: ['Cirurgia', 'Prótese sobre implante', 'Planejamento digital'],
    icon: 'implant',
  },
  {
    id: 'proteses',
    title: 'Próteses',
    description: 'Coroas, pontes e próteses com encaixe, função e estética.',
    detail:
      'Materiais selecionados para mastigar bem e ficar natural. Ajustes com acompanhamento próximo até o conforto ideal.',
    topics: ['Coroas', 'Pontes', 'Prótese removível'],
    icon: 'smile',
  },
  {
    id: 'facetas',
    title: 'Facetas',
    description: 'Laminados em cerâmica ou resina para um sorriso harmônico.',
    detail:
      'Design do sorriso alinhado ao seu rosto. Mock-up quando indicado, para você aprovar o visual antes da cimentação.',
    topics: ['Cerâmica', 'Resina', 'Design do sorriso'],
    icon: 'sparkle',
  },
  {
    id: 'reabilitacao',
    title: 'Reabilitação oral',
    description: 'Casos complexos reunindo implantes, próteses e estética.',
    detail:
      'Plano integrado quando faltam dentes, há desgaste ou desarmonia. Etapas, prazos e valores transparentes desde o início.',
    topics: ['Plano integrado', 'Função', 'Estética'],
    icon: 'tooth',
  },
  {
    id: 'clareamento',
    title: 'Clareamento',
    description: 'Protocolo dosado para clarear com conforto e previsibilidade.',
    detail:
      'Medimos a cor inicial, cuidamos da sensibilidade e ajustamos a concentração por sessão — consultório ou caseiro supervisionado.',
    topics: ['Consultório', 'Caseiro', 'Manutenção'],
    icon: 'sparkle',
  },
  {
    id: 'digital',
    title: 'Odontologia digital',
    description: 'Diagnóstico e planejamento com precisão de ponta a ponta.',
    detail:
      'Escaneamento, simulação e guias digitais para implantes e estética. Você vê o caminho antes de começar.',
    topics: ['Escaneamento', 'Simulação', 'Guias digitais'],
    icon: 'braces',
  },
]

export const ticker = [
  'Mercês · Curitiba',
  'Implantodontia',
  'Próteses',
  'Facetas',
  'Reabilitação oral',
  'Clareamento',
  'Odontologia digital',
  'WhatsApp direto',
]

export const team = [
  {
    id: 'monique-furtado',
    name: 'Dra. Monique Furtado',
    role: 'Cirurgiã-dentista',
    tag: 'Condução clínica',
    category: 'clinical',
    photo: null,
    bio: 'Responsável pela Dra. Monique Furtado Odontologia em Mercês. Foco em implantodontia, prótese, facetas e reabilitação com estética natural e odontologia digital.',
    formation: 'CRO-PR · Odontologia',
    specialties: ['Implantodontia', 'Prótese', 'Facetas', 'Reabilitação oral', 'Estética'],
    funFact: 'Gosta de mostrar o mock-up do sorriso antes de qualquer cimentação — o paciente decide junto.',
    showWhatsApp: true,
  },
  {
    id: 'recepcao',
    name: 'Recepção',
    role: 'Atendimento',
    tag: 'Primeiro contato',
    category: 'admin',
    photo: null,
    bio: 'Organiza a agenda e responde o WhatsApp com o mesmo tom acolhedor e boutique da clínica.',
    formation: 'Atendimento ao paciente',
    specialties: ['Agendamento', 'Acolhimento'],
    funFact: 'Quase sempre responde antes de você sair de casa.',
    showWhatsApp: true,
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Paciente Mercês',
    rating: 5,
    text: 'Ambiente elegante e atendimento cuidadoso. Fiz facetas e o resultado ficou natural — exatamente o que eu queria.',
    treatment: 'Facetas',
    year: '2025',
  },
  {
    id: 2,
    name: 'Paciente Curitiba',
    rating: 5,
    text: 'Planejamento de implante com clareza de prazo e valor. Recomendo pela atenção e pela estética do consultório.',
    treatment: 'Implantodontia',
    year: '2025',
  },
  {
    id: 3,
    name: 'Paciente Batel',
    rating: 5,
    text: 'Clínica limpa, equipe atenciosa e WhatsApp que realmente responde. Ideal para quem busca estética sem exagero.',
    treatment: 'Clareamento',
    year: '2024',
  },
]
