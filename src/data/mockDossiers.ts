import { ProcessoRSC } from '../types';

export const mockDossiers: ProcessoRSC[] = [
  {
    id: 'dossie-carlos-eduardo',
    tituloDossie: 'Dossiê 1: Carlos Eduardo Silva (Assistente em Administração - RSC-II)',
    dataCriacao: new Date().toLocaleDateString('pt-BR'),
    numeroProcessoSei: '23000.014820/2026-42',
    servidor: {
      nome: 'Carlos Eduardo Silva de Oliveira',
      matriculaSiape: '1948291',
      cargo: 'Assistente em Administração',
      nivelCargo: 'Classe D - Nível IV',
      campus: 'Campus São Paulo - Reitoria',
      lotacao: 'Diretoria de Gestão de Pessoas / Coordenadoria de Carreiras e Pagamento',
      email: 'carlos.eduardo@ifsp.edu.br',
      telefone: '(11) 3775-5200',
      tempoServicoPublico: '8 anos e 4 meses',
      titulacaoAtual: 'Graduação em Administração Pública',
      nivelRscSolicitado: 'RSC-II',
      equivalenciaTitulacao: 'Equivalência a Mestrado (Decreto nº 13.048/2026)',
    },
    declaracoes: {
      declaracaoVeracidade:
        'Declaro, sob as penas da lei (art. 299 do Código Penal Brasileiro e art. 132 da Lei nº 8.112/1990), que todos os documentos comprobatórios, certidões, portarias e diplomas anexados ao presente processo administrativo eletrônico são autênticos, fidedignos e expressam a exata verdade das atividades desempenhadas no âmbito do serviço público federal.',
      declaracaoConformidade:
        'Declaro integral cumprimento a todos os requisitos, diretrizes e critérios estabelecidos no Decreto nº 13.048/2026 e nas resoluções e portarias regulamentares pertinentes ao Plano de Carreira dos Cargos Técnico-Administrativos em Educação (PCCTAE), manifestando plena ciência quanto aos procedimentos de avaliação por comissão especial.',
      declaracaoNaoAcumulo:
        'Declaro que a presente pontuação não utiliza eventos ou atividades já computados concomitantemente para concessão de Incentivo à Qualificação (IQ) por titulação formal em duplicidade vedada pela legislação.',
      declaracaoCienciaRegulamento:
        'Declaro estar ciente de que a concessão do Reconhecimento de Saberes e Competências (RSC) gera efeitos financeiros e funcionais a partir da data do preenchimento dos requisitos e validação pela Comissão Especial do RSC-PCCTAE.',
    },
    memorial: {
      apresentacaoTrajetoria:
        'Ingressei no serviço público federal no ano de 2018 mediante concurso público para o cargo de Assistente em Administração (Classe D), no âmbito do Instituto Federal de Educação, Ciência e Tecnologia. Ao longo de mais de 8 anos de efetivo exercício, atuei precipuamente na Diretoria de Gestão de Pessoas, onde liderei a modernização dos fluxos de dimensionamento de pessoal, auditoria de folha de pagamento e implantação dos módulos informatizados do SIAPEnet e SouGov. Minha atuação sempre esteve pautada pela legalidade estrita, busca contínua por aprimoramento técnico e desenvolvimento de competências voltadas à eficiência na administração pública federal.',
      desenvolvimentoSaberes:
        'O desenvolvimento de meus saberes e competências alinha-se estritamente aos eixos e critérios do Decreto nº 13.048/2026. No Eixo I (Formação Continuada), totalizei mais de 680 horas em capacitações oficiais pela Escola Nacional de Administração Pública (ENAP) e Instituto Serzedello Corrêa (TCU), abrangendo Direito Administrativo Aplicado, Gestão por Competências e Auditoria Interna. No Eixo II (Produção Técnica e Tecnológica), sou coautor do Manual de Processos de Aposentadorias e Pensões da Instituição e desenvolvi a Planilha Automatizada de Controle de Vagas Docentes/TAEs via VBA/PowerBI. No Eixo III (Gestão e Governança), desempenhei a função de Coordenador Substituto por 3 anos e presidi a Comissão Própria de Avaliação Funcional e Comissões de Sindicância Administrativa. No Eixo IV (Extensão e Ensino), atuei como instrutor interno no curso de Formação Inicial de Novos Servidores por 4 edições consecutivas.',
      impactoInstitucional:
        'As ações desenvolvidas geraram impacto direto na governança institucional: redução do tempo médio de tramitação de processos de aposentadoria de 45 para 12 dias úteis; conformidade de 100% nos apontamentos da Controladoria-Geral da União (CGU) sobre pagamentos retroativos; e capacitação direta de mais de 180 novos servidores recém-empossados na Rede Federal. Tais realizações demonstram que as competências e saberes adquiridos transcendem o exercício rotineiro, consolidando a equivalência e mérito exigidos para o RSC-II.',
      conclusao:
        'Diante do exposto e da robusta documentação comprobatória anexada e indexada, submeto o presente Memorial Descritivo à Comissão Especial de Avaliação de RSC-PCCTAE, pugnando pelo deferimento do pleito de RSC-II conforme as disposições do Decreto nº 13.048/2026.',
    },
    indexacaoComprovantes: [
      {
        id: 'comp-1',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 6º, I (Cursos de Capacitação > 120h)',
        eixo: 'I - Formação e Qualificação',
        descricaoAtividade: 'Curso de Especialização Técnica em Gestão por Competências e Dimensionamento no Setor Público - ENAP (180 horas)',
        documentoCorrespondente: 'Certificado_ENAP_Gestao_Competencias_2022.pdf (Fls. 04-06)',
        periodoHoras: '180 horas / 2022',
        pontuacaoAtribuida: 15,
        pontuacaoMaximaPermitida: 20,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Certificado com código de autenticidade eletrônica verificado.',
      },
      {
        id: 'comp-2',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 6º, I (Cursos de Aperfeiçoamento 60-119h)',
        eixo: 'I - Formação e Qualificação',
        descricaoAtividade: 'Curso Avançado de Auditoria em Folha de Pagamento no Serviço Público - ISC/TCU (80 horas)',
        documentoCorrespondente: 'Certificado_TCU_Auditoria_Folha_2023.pdf (Fls. 07-08)',
        periodoHoras: '80 horas / 2023',
        pontuacaoAtribuida: 8,
        pontuacaoMaximaPermitida: 15,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Alinhamento direto com as atribuições da unidade de lotação.',
      },
      {
        id: 'comp-3',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 6º, II (Elaboração de Manuais e Guias Técnicos)',
        eixo: 'II - Produção Técnica e Tecnológica',
        descricaoAtividade: 'Elaboração e Publicação do Manual Institucional de Concessão de Benefícios e Aposentadorias do IF',
        documentoCorrespondente: 'Portaria_Aprovacao_Manual_DGP_N24_2024.pdf (Fls. 09-28)',
        periodoHoras: 'Publicado em Out/2024',
        pontuacaoAtribuida: 12,
        pontuacaoMaximaPermitida: 15,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Portaria de homologação pelo Reitor com menção expressa de autoria.',
      },
      {
        id: 'comp-4',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 6º, II (Desenvolvimento de Ferramentas / Fluxos)',
        eixo: 'II - Produção Técnica e Tecnológica',
        descricaoAtividade: 'Desenvolvimento do Painel BI de Monitoramento de Férias e Afastamentos dos Servidores',
        documentoCorrespondente: 'Relatorio_Tecnico_Painel_BI_Feriados.pdf (Fls. 29-35)',
        periodoHoras: 'Implantado em 2023',
        pontuacaoAtribuida: 10,
        pontuacaoMaximaPermitida: 12,
        statusValidacao: 'Em Conformidade',
        observacao: 'Declaração da Diretoria de TI atestando uso ativo por 14 campi.',
      },
      {
        id: 'comp-5',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 6º, III (Exercício de Função de Confiança / Chefia)',
        eixo: 'III - Gestão e Governança',
        descricaoAtividade: 'Exercício de Função Gratificada (FG-1) de Coordenador Substituto de Carreiras e Pagamento por 36 meses',
        documentoCorrespondente: 'Portaria_Nomeacao_FG1_e_Declaracao_Tempo.pdf (Fls. 36-39)',
        periodoHoras: '2021 a 2024 (36 meses)',
        pontuacaoAtribuida: 18,
        pontuacaoMaximaPermitida: 20,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Comprovado por extrato de assentamento funcional e portarias no DOU.',
      },
      {
        id: 'comp-6',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 6º, III (Participação em Comissões e Grupos de Trabalho)',
        eixo: 'III - Gestão e Governança',
        descricaoAtividade: 'Membro titular da Comissão Própria de Avaliação (CPA) e Presidente de Comissão de PAD',
        documentoCorrespondente: 'Portarias_Designacao_Comissoes_Conjunto.pdf (Fls. 40-44)',
        periodoHoras: '2022 a 2025',
        pontuacaoAtribuida: 8,
        pontuacaoMaximaPermitida: 10,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Relatórios finais homologados e juntados aos autos.',
      },
      {
        id: 'comp-7',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 6º, IV (Instrutoria e Capacitação Interna)',
        eixo: 'IV - Extensão e Ensino',
        descricaoAtividade: 'Instrutor do Módulo de Legislação de Pessoal no Programa de Formação Continuada de Servidores',
        documentoCorrespondente: 'Certificado_Instrutoria_DGP_4_Edicoes.pdf (Fls. 45-48)',
        periodoHoras: '60 horas totais ministradas',
        pontuacaoAtribuida: 10,
        pontuacaoMaximaPermitida: 15,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Avaliação de reação pelos discentes com média 9.7/10.',
      },
    ],
    resumoPontuacao: {
      totalPontos: 81,
      minimoExigido: 52,
      aptoParaConcessao: true,
      porEixo: {
        eixoI: 23,
        eixoII: 22,
        eixoIII: 26,
        eixoIV: 10,
      },
    },
    parecerPreliminarIA:
      'ANÁLISE PRELIMINAR DE CONFORMIDADE: O dossiê do servidor Carlos Eduardo Silva de Oliveira atende plenamente aos critérios formais e materiais exigidos pelo Decreto nº 13.048/2026 para o nível RSC-II. A pontuação total validada de 81 pontos supera amplamente o piso regulamentar de 52 pontos, com distribuição equilibrada e aderente nos 4 eixos de saberes. Todos os 7 documentos comprobatórios possuem identificação precisa de fls., portarias publicadas em boletim de serviço/DOU e autenticidade verificável.',
  },
  {
    id: 'dossie-juliana-menezes',
    tituloDossie: 'Dossiê 2: Dra. Juliana Menezes (Técnica de Laboratório - RSC-III)',
    dataCriacao: new Date().toLocaleDateString('pt-BR'),
    numeroProcessoSei: '23072.008914/2026-19',
    servidor: {
      nome: 'Juliana Menezes de Albuquerque',
      matriculaSiape: '2183940',
      cargo: 'Técnico de Laboratório / Área: Biologia e Química',
      nivelCargo: 'Classe D - Nível III',
      campus: 'Campus Ouro Preto',
      lotacao: 'Departamento de Ciências Biológicas e da Saúde / Laboratório Multiusuário',
      email: 'juliana.menezes@ifmg.edu.br',
      telefone: '(31) 3559-2100',
      tempoServicoPublico: '10 anos e 2 meses',
      titulacaoAtual: 'Mestrado em Biotecnologia Aplicada',
      nivelRscSolicitado: 'RSC-III',
      equivalenciaTitulacao: 'Equivalência a Doutorado (Decreto nº 13.048/2026)',
    },
    declaracoes: {
      declaracaoVeracidade:
        'Declaro, sob fé pública e penas da lei, que toda a documentação comprobatória referente a patentes, relatórios técnicos laboratoriais, gestão de resíduos perigosos e artigos técnicos em coautoria é autêntica e reflete fielmente minha atuação no Laboratório Multiusuário.',
      declaracaoConformidade:
        'Declaro pleno enquadramento aos termos do Decreto nº 13.048/2026 para a equivalência de RSC-III, tendo atingido a pontuação mínima exigida e demonstrado inovação, governança e geração de conhecimento aplicados à instituição.',
      declaracaoNaoAcumulo:
        'Declaro a estrita não sobreposição de pontuação em duplicidade com o título formal de mestrado já registrado nos assentamentos funcionais.',
      declaracaoCienciaRegulamento:
        'Declaro ciência dos prazos, recursos e rito sumário previstos na regulamentação do RSC-PCCTAE do IFMG.',
    },
    memorial: {
      apresentacaoTrajetoria:
        'Sou servidora do Instituto Federal desde 2016, alocada no Laboratório Multiusuário de Biologia e Química do Campus Ouro Preto. Minha carreira tem como eixo central a gestão de segurança química, biossegurança, suporte técnico a mais de 35 projetos de pesquisa acadêmica e fomento à inovação tecnológica regional em bioinsumos.',
      desenvolvimentoSaberes:
        'No âmbito do Decreto nº 13.048/2026, destaquei-me no Eixo II (Produção Científica e Tecnológica) com o registro de 1 depósito de patente de processo de biorremediação de efluentes minerários junto ao INPI, 4 artigos técnicos em periódicos Qualis A/B e elaboração dos Procedimentos Operacionais Padrão (POP) de 18 equipamentos de espectrofotometria e cromatografia. No Eixo III, gerenciei a adequação do laboratório à norma ABNT NBR ISO/IEC 17025. No Eixo IV, ministrei oficinas práticas de microscopia para escolas públicas da região dos Inconfidentes.',
      impactoInstitucional:
        'Graças às rotinas laboratoriais implementadas, o campus obteve acreditação para análises ambientais, captando mais de R$ 450 mil em projetos de extensão tecnológica com empresas e cooperativas locais, além de zerar os acidentes com agentes químicos e biológicos no decênio.',
      conclusao:
        'Diante do conjunto de evidências e excelência técnica comprovada, requeiro o deferimento do RSC-III com base nas prerrogativas do Decreto nº 13.048/2026.',
    },
    indexacaoComprovantes: [
      {
        id: 'comp-jul-1',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 7º, II (Propriedade Intelectual / Patentes INPI)',
        eixo: 'II - Produção Técnica e Tecnológica',
        descricaoAtividade: 'Depósito de Pedido de Patente de Invenção INPI - Processo de Biorremediação com microalgas nativas',
        documentoCorrespondente: 'Certificado_INPI_BR102023019842.pdf (Fls. 03-05)',
        periodoHoras: 'Concedido/Depositado 2023',
        pontuacaoAtribuida: 25,
        pontuacaoMaximaPermitida: 25,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Documento oficial expedido pelo INPI com coautoria institucional.',
      },
      {
        id: 'comp-jul-2',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 7º, II (Artigos Técnicos e Científicos)',
        eixo: 'II - Produção Técnica e Tecnológica',
        descricaoAtividade: 'Publicação de 3 artigos em periódicos indexados sobre biossegurança e química analítica',
        documentoCorrespondente: 'Artigos_Completos_Indexados_Qualis.pdf (Fls. 06-25)',
        periodoHoras: '2022-2024',
        pontuacaoAtribuida: 18,
        pontuacaoMaximaPermitida: 20,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Comprovado DOI e declaração de coautoria do orientador/pesquisador líder.',
      },
      {
        id: 'comp-jul-3',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 7º, III (Gestão de Laboratórios e Infraestrutura Complexa)',
        eixo: 'III - Gestão e Governança',
        descricaoAtividade: 'Responsável Técnica pelo Plano de Gerenciamento de Resíduos Perigosos (PGRP) do Campus',
        documentoCorrespondente: 'Portaria_Designacao_PGRP_e_Laudo.pdf (Fls. 26-38)',
        periodoHoras: '2020 a 2025 (5 anos)',
        pontuacaoAtribuida: 20,
        pontuacaoMaximaPermitida: 20,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Atestado pelos órgãos ambientais estaduais (FEAM/MG).',
      },
      {
        id: 'comp-jul-4',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 7º, I (Qualificação e Certificações Especializadas)',
        eixo: 'I - Formação e Qualificação',
        descricaoAtividade: 'Especialização em Biossegurança em Laboratórios Biomédicos - Fiocruz (360h)',
        documentoCorrespondente: 'Diploma_Especializacao_Fiocruz.pdf (Fls. 39-41)',
        periodoHoras: '360 horas / 2021',
        pontuacaoAtribuida: 15,
        pontuacaoMaximaPermitida: 15,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Curso de pós-graduação lato sensu reconhecido pelo MEC.',
      },
      {
        id: 'comp-jul-5',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 7º, IV (Projetos de Extensão Tecnológica Comunitária)',
        eixo: 'IV - Extensão e Ensino',
        descricaoAtividade: 'Coordenação técnica do projeto "Água Limpa nas Escolas Rurais" com 12 oficinas ministradas',
        documentoCorrespondente: 'Relatorio_Final_Extensao_Proex.pdf (Fls. 42-52)',
        periodoHoras: '120 horas / 2023-2024',
        pontuacaoAtribuida: 14,
        pontuacaoMaximaPermitida: 15,
        statusValidacao: 'Validade Confirmada',
        observacao: 'Certificado emitido pela Pró-Reitoria de Extensão.',
      },
    ],
    resumoPontuacao: {
      totalPontos: 92,
      minimoExigido: 60,
      aptoParaConcessao: true,
      porEixo: {
        eixoI: 15,
        eixoII: 43,
        eixoIII: 20,
        eixoIV: 14,
      },
    },
    parecerPreliminarIA:
      'ANÁLISE PRELIMINAR DE CONFORMIDADE: O dossiê da servidora Juliana Menezes de Albuquerque comprova alto nível de excelência científico-tecnológica, perfeitamente aderente ao RSC-III do Decreto nº 13.048/2026. A pontuação atingiu 92 pontos (mínimo de 60). Evidenciou-se impacto regional com depósito de patente, artigos científicos, gestão ambiental de resíduos químicos e extensão universitária.',
  },
  {
    id: 'dossie-rafael-albuquerque',
    tituloDossie: 'Dossiê 3: Rafael Albuquerque (Analista de TI - RSC-I)',
    dataCriacao: new Date().toLocaleDateString('pt-BR'),
    numeroProcessoSei: '23114.004120/2026-88',
    servidor: {
      nome: 'Rafael Albuquerque Santos',
      matriculaSiape: '3109482',
      cargo: 'Analista de Tecnologia da Informação',
      nivelCargo: 'Classe E - Nível I',
      campus: 'Campus Bento Gonçalves',
      lotacao: 'Diretoria de Tecnologia da Informação / Divisão de Redes e Segurança Cibernética',
      email: 'rafael.santos@ifrs.edu.br',
      telefone: '(54) 3455-3200',
      tempoServicoPublico: '4 anos e 1 mês',
      titulacaoAtual: 'Bacharelado em Ciência da Computação',
      nivelRscSolicitado: 'RSC-I',
      equivalenciaTitulacao: 'Equivalência a Especialização (Decreto nº 13.048/2026)',
    },
    declaracoes: {
      declaracaoVeracidade:
        'Declaro para os devidos fins legais que todos os certificados de segurança da informação, arquitetura em nuvem e implantação de infraestrutura anexados correspondem à verdade dos fatos.',
      declaracaoConformidade:
        'Declaro cumprimento integral aos critérios estipulados no Decreto nº 13.048/2026 e regulamento do IFRS para o nível RSC-I.',
      declaracaoNaoAcumulo:
        'Declaro que os cursos e produções técnicas listados são inéditos para fins de progressão por saberes.',
      declaracaoCienciaRegulamento:
        'Declaro ciência dos trâmites administrativos no SEI e publicação em Boletim de Serviço.',
    },
    memorial: {
      apresentacaoTrajetoria:
        'Ingressei no IFRS em 2022 como Analista de TI. Durante minha atuação, estruturei a política de segurança cibernética e a migração de servidores físicos para nuvem híbrida governamental.',
      desenvolvimentoSaberes:
        'No Eixo I, obtive certificações de alta relevância internacional e cursos da Escola Virtual de Governo (EV.G). No Eixo II, projetei a rede Wi-Fi 6 unificada de alta densidade e automatizei o provisionamento de contas federadas (Eduroam e Cafe/RNP). No Eixo III, atuei como gestor de contratos de TIC no valor de R$ 1,2 milhão.',
      impactoInstitucional:
        'A infraestrutura implantada reduziu o tempo de inatividade dos sistemas acadêmicos para menos de 0,05% e garantiu conectividade ininterrupta a mais de 4.000 discentes e docentes.',
      conclusao:
        'Requeiro a homologação do RSC-I com esteio nos termos do Decreto nº 13.048/2026.',
    },
    indexacaoComprovantes: [
      {
        id: 'comp-raf-1',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 5º, I (Certificações e Cursos Técnicos de TIC)',
        eixo: 'I - Formação e Qualificação',
        descricaoAtividade: 'Certificação Internacional em Segurança de Redes e Proteção de Dados LGPD - 120h',
        documentoCorrespondente: 'Certificado_Seguranca_Redes_LGPD.pdf (Fls. 03-05)',
        periodoHoras: '120 horas / 2023',
        pontuacaoAtribuida: 15,
        pontuacaoMaximaPermitida: 15,
        statusValidacao: 'Validade Confirmada',
      },
      {
        id: 'comp-raf-2',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 5º, II (Arquitetura e Soluções Tecnológicas)',
        eixo: 'II - Produção Técnica e Tecnológica',
        descricaoAtividade: 'Projeto e Implantação da Rede Sem Fio Eduroam e Alta Disponibilidade de Servidores',
        documentoCorrespondente: 'Relatorio_Tecnico_Implantacao_Eduroam.pdf (Fls. 06-18)',
        periodoHoras: '2023-2024',
        pontuacaoAtribuida: 16,
        pontuacaoMaximaPermitida: 20,
        statusValidacao: 'Validade Confirmada',
      },
      {
        id: 'comp-raf-3',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 5º, III (Fiscalização Técnica de Contratos de TIC)',
        eixo: 'III - Gestão e Governança',
        descricaoAtividade: 'Portaria de Fiscal Técnico Titular do Contrato de Links de Internet e Telefonia IP',
        documentoCorrespondente: 'Portarias_Fiscal_Contrato_TIC_2023_2025.pdf (Fls. 19-24)',
        periodoHoras: '24 meses de fiscalização',
        pontuacaoAtribuida: 14,
        pontuacaoMaximaPermitida: 15,
        statusValidacao: 'Validade Confirmada',
      },
      {
        id: 'comp-raf-4',
        itemCriterio: 'Decreto nº 13.048/2026 - Art. 5º, IV (Capacitação de Usuários em Boas Práticas)',
        eixo: 'IV - Extensão e Ensino',
        descricaoAtividade: 'Oficina de Conscientização em Phishing e Segurança da Informação para 300 servidores',
        documentoCorrespondente: 'Certificado_Palestrante_Semana_TIC.pdf (Fls. 25-28)',
        periodoHoras: '40 horas / 2024',
        pontuacaoAtribuida: 10,
        pontuacaoMaximaPermitida: 10,
        statusValidacao: 'Validade Confirmada',
      },
    ],
    resumoPontuacao: {
      totalPontos: 55,
      minimoExigido: 45,
      aptoParaConcessao: true,
      porEixo: {
        eixoI: 15,
        eixoII: 16,
        eixoIII: 14,
        eixoIV: 10,
      },
    },
    parecerPreliminarIA:
      'ANÁLISE PRELIMINAR DE CONFORMIDADE: O servidor Rafael Albuquerque Santos cumpre os requisitos de RSC-I com pontuação total de 55 pontos (mínimo de 45), atendendo prontamente aos pré-requisitos do Decreto nº 13.048/2026 com ampla evidência de entregas técnicas no ecossistema de TI do IFRS.',
  },
];

export const decretoInfo = {
  numero: 'Decreto nº 13.048/2026',
  ementa: 'Regulamenta o Reconhecimento de Saberes e Competências (RSC) no âmbito do Plano de Carreira dos Cargos Técnico-Administrativos em Educação (PCCTAE) de que trata a Lei nº 11.091/2005.',
  niveis: [
    {
      nivel: 'RSC-I',
      equivalencia: 'Equivalência ao título de Especialização (Pós-Graduação Lato Sensu)',
      pontuacaoMinima: 45,
      requisitos: 'Experiência profissional consolidada, formação continuada de no mínimo 360h acumuladas ou cursos de aperfeiçoamento, participação em projetos institucionais.',
    },
    {
      nivel: 'RSC-II',
      equivalencia: 'Equivalência ao título de Mestrado (Pós-Graduação Stricto Sensu)',
      pontuacaoMinima: 52,
      requisitos: 'Elaboração de manuais, guias, produtos técnicos ou softwares, exercício de funções de gestão ou representação, instrutoria interna, liderança de comissões permanentes.',
    },
    {
      nivel: 'RSC-III',
      equivalencia: 'Equivalência ao título de Doutorado (Pós-Graduação Stricto Sensu)',
      pontuacaoMinima: 60,
      requisitos: 'Inovação de alto impacto, patentes, publicações científicas/técnicas indexadas, gestão de infraestruturas complexas, coordenação de projetos integrados de pesquisa/extensão.',
    },
  ],
  eixos: [
    {
      eixo: 'Eixo I: Formação Continuada e Qualificação Profissional',
      descricao: 'Cursos de aperfeiçoamento, capacitação oficial (ENAP, EV.G, Universidades/IFs), certificações técnicas, pós-graduações e treinamentos especializados.',
      teto: 'Até 30 pontos',
    },
    {
      eixo: 'Eixo II: Produção Técnica, Científica e Tecnológica',
      descricao: 'Elaboração de manuais de procedimentos, notas técnicas, patentes, softwares, artigos, fluxogramas, painéis gerenciais e soluções operacionais inovadoras.',
      teto: 'Até 45 pontos',
    },
    {
      eixo: 'Eixo III: Atividades de Gestão, Governança e Representação',
      descricao: 'Exercício de Cargos de Direção (CD), Funções Gratificadas (FG), comissões permanentes (CPA, CIS, CPP), comissões de PAD/Sindicância e grupos de trabalho normativos.',
      teto: 'Até 35 pontos',
    },
    {
      eixo: 'Eixo IV: Atuação Acadêmica, Ensino, Extensão e Transferência de Conhecimento',
      descricao: 'Instrutoria interna, tutoria, orientação técnica de estagiários, bancas examinadoras, projetos de extensão comunitária e oficinas de capacitação.',
      teto: 'Até 25 pontos',
    },
  ],
};
