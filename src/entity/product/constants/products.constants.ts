import type { Product } from '@/entity/product/product.entity';

/**
 * Fonte única de verdade do portfólio.
 *
 * O campo `linha` foi transcrito do material técnico da Neoquim (apresentação
 * comercial de produtos). **Transcrição literal, de propósito** — percentual,
 * faixa de temperatura e proporção de uso são informação de formulação, não
 * texto de marketing. Não reescreva nem "melhore" essas descrições sem passar
 * pelo time técnico.
 *
 * O material é organizado por mercado e o site por produto. Onde um slide de
 * mercado descreve algo que tem página própria, o conteúdo mora na página
 * específica e não é repetido — ver `tinta-base-solvente`.
 *
 * Única exceção deliberada: `UNIGREEN T` aparece em `ester` e em
 * `petroleo-perfuracao`. O título do produto nomeia a linha UNIGREEN, e é o
 * lubrificante que a descrição de Inovação Química na Indústria Petrolífera promete — tirá-lo de
 * qualquer um dos dois deixaria a página incompleta. CONFIRMAR com o comercial.
 */
export const PRODUCTS: Product[] = [
  {
    slug: 'petroleo-perfuracao',
    titulo: 'Inovação Química na Indústria Petrolífera',
    descricao:
      'Atendemos às demandas mais complexas do setor de perfuração de petróleo com produtos rigorosamente testados. Através do fornecimento de lubrificantes especializados, redutores e sistemas de emulsificantes primários e secundários, entre outros. Entregamos confiabilidade que sua operação exige no campo.',
    detalhe:
      'Linha de insumos para fluidos de perfuração de poços de petróleo, atividade de origem da Neoquim desde 1983.',
    linha: [
      {
        itens: [
          {
            nome: 'UNIGREEN T',
            descricao:
              'É um redutor de torque, lubrificante de extrema pressão para fluidos de perfuração a base de água, sendo compatível com os produtos usados modernamente neste tipo de fluido, podendo ser utilizado em qualquer faixa de pH, também promove estabilidade adicional nas paredes do poço, auxilia na inibição e melhora o controle do filtrado em altas temperaturas. É solúvel em água tendo assim elevada eficiência como lubrificante.',
          },
          {
            nome: 'UNINVERT EPG',
            descricao:
              'É um produto composto por ácidos graxos combinados com agentes umectantes, que ao reagir com a cal viva ou hidratada resulta em um poderoso emulsionante para fluidos sintéticos de base parafínicos.',
          },
          {
            nome: 'UNINVERT OLF 01',
            descricao:
              'É um emulsificante primário. É essencialmente ácido gordo poliaminado e é usado para emulsionar água em fluidos de perfuração baseados em olefina / diesel. Proporciona excelente estabilidade à emulsão, atua como agente umectante, agente gelificante e estabilizador de fluidos em uma base de óleo mineral. Também é usado para controle de filtragem e estabilidade de temperatura.',
          },
          {
            nome: 'UNINVERT OLF 02',
            descricao:
              'É um emulsificante secundário. É essencialmente ácido gordo poliaminado e é usado para emulsionar água em fluidos de perfuração baseados em olefina / diesel. Proporciona excelente estabilidade à emulsão, atua como agente umectante, agente gelificante e estabilizador de fluidos em uma base de óleo mineral. Também é usado para controle de filtragem e estabilidade de temperatura.',
          },
          {
            nome: 'UNINVERT MR',
            descricao:
              'É um produto especialmente formulado para doar viscosidade a fluidos de emulsão inversa cuja fase continua é constituída por parafinas, meio em que as argilas organofilicas têm baixo rendimento por questão de polaridade.',
          },
          {
            nome: 'UNINVERT AF',
            descricao:
              'Reduz as propriedades reológicas em óleo base, atua como afinante e agente molhante que em sistemas contaminados por argilas, ou ocasionalmente fluidos que atinjam uma concentração muito alta de sólidos em perfuração.',
          },
          {
            nome: 'UNINVERT RF',
            descricao:
              'Formulado para atuar como redutor de filtrado em fluidos de emulsão inversa.',
          },
          {
            nome: 'UNINVER RF HT',
            descricao:
              'Redutor de filtrado para alta temperatura. Formulado para atuar em fluidos de emulsão inversa.',
          },
        ],
      },
    ],
    imagem: '/images/petroleo.jpg',
    imagemAlt:
      'Parque de tanques de armazenagem de matérias-primas da Neoquim',
    destaqueHome: true,
  },
  {
    slug: 'secantes-octoatos',
    titulo: 'Secantes — Octoatos',
    descricao:
      'Secagem de tintas industriais, produzidos desde 1987.',
    detalhe:
      'Para aplicação industrial em tintas, fabricada pela Neoquim desde 1987.',
    linha: [
      {
        titulo: 'Catalizadores octoatos',
        itens: [
          {
            nome: 'Octoato de cobalto',
            descricao:
              'Com excelente atividade, acelera o processo de oxidação da película da tinta atuando como secante de superfície a temperatura ambiente. Com o seu tom violeta, neutraliza o amarelamento das tintas claras.',
          },
          {
            nome: 'Octoato de cálcio',
            descricao:
              'É considerado como um secante secundário e estabilizante dos secantes de Cobalto. Ótimo umectante e dispersante de pigmentos.',
          },
          {
            nome: 'Octoato de manganês',
            descricao:
              'É promotor de polimerização com menor tendência a formar filmes enrugados. Devido a sua cor âmbar, a utilização deve ser moderada para evitar amarelamento nas tintas.',
          },
          {
            nome: 'Octoato de zinco',
            descricao:
              'É considerado um secante secundário utilizado principalmente como umectante e fungicida. Evita a precipitação de outros secantes, promovendo livre acesso do oxigênio necessário para o interior do filme.',
          },
          {
            nome: 'Octoato de zircônio',
            descricao:
              'É um catalisador de atividades secativas primárias. Em estufa tem a vantagem de diminuir o amarelamento.',
          },
          {
            nome: 'Octoato de chumbo',
            descricao:
              'É um catalisador de polimerização, atua como secante de profundidade, não atua no processo de oxidação, devendo estar sempre combinado com outros secantes, principalmente Octoatos de Cálcio, Cobalto, Manganês ou Zinco, sendo destinado para uso em tintas e vernizes industriais.',
          },
        ],
      },
      {
        titulo:
          'Misturas de octoatos — sais metalorgânicos diluídos em solventes alifáticos',
        itens: [
          {
            nome: 'MSE — 1',
            descricao: 'Cobalto, Zircônio, Zinco e Cálcio.',
          },
          {
            nome: 'MSE — 16',
            descricao: 'Cobalto, Zircônio, Zinco e Cálcio.',
          },
          {
            nome: 'MSE — 21',
            descricao:
              'Cobalto, Zinco, Zircônio, Cálcio e Neoskin (anti pele).',
          },
          {
            nome: 'MSE — 24',
            descricao:
              'Cobalto, Zinco, Zircônio, Cálcio e Neoskin (anti pele).',
          },
          {
            nome: 'NQ — 43',
            descricao: 'Cobalto, Zircônio, Zinco e Cálcio.',
          },
          {
            nome: 'NQ — 46',
            descricao: 'Cobalto, Zircônio, Zinco e Cálcio.',
          },
        ],
      },
    ],
    imagem: '/images/reatores.jpg',
    imagemAlt:
      'Interior da fábrica da Neoquim, com os reatores e a plataforma de operação',
    destaqueHome: true,
  },
  {
    slug: 'resinas-alquidicas',
    titulo: 'Resinas Alquídicas',
    descricao:
      'Resinas curtas, médias,longas e fenolada em óleo desenvolvidas para a formulação de tintas e vernizes de alta performance',
    detalhe:
      'Produção própria de resinas alquídicas para o mercado de tintas e vernizes, iniciada em 1989.',
    linha: [
      {
        itens: [
          {
            nome: 'Longas em óleo de soja',
            descricao:
              'Muito utilizada para a fabricação de esmaltes marítimos, formulações de vernizes, tintas serigráficas e industriais, com um maior tempo de secagem ao ar e excelente brilho e dureza.',
          },
          {
            nome: 'Médias em óleo de soja',
            descricao:
              'Recomendada para a fabricação de esmalte branco ou colorido, sintéticos automotivos. Apresenta filme de máxima durabilidade, com ótimas propriedades de cor inicial, retenção de brilho, resistência a intempéries e aderência.',
          },
          {
            nome: 'Curtas em óleo de soja',
            descricao:
              'Recomendada para a fabricação de esmalte branco ou colorido, sintéticos automotivos, veículo para moagem de laca ou esmalte, para massas e primes rápidos. Com excelente lixamento, apresenta filme de máxima durabilidade. É compatível com resinas a base de uréia e melamina, podendo também ser utilizada em formulações com pré polímero de diisocianato, apresentando ótimas propriedades de cor inicial, retenção de brilho, resistência a intempéries e ótima aderência.',
          },
          {
            nome: 'Fenoladas',
            descricao:
              'Resina muito utilizada na fabricação de vernizes e esmaltes de secagem rápida, sendo também utilizada em misturas com resinas médias com excelente rendimento e custo reduzido.',
          },
        ],
      },
    ],
    imagem: '/images/torre-reacao.jpg',
    imagemAlt:
      'Torre de reação e tanques de aço inoxidável da unidade da Neoquim',
    destaqueHome: true,
  },
  {
    slug: 'acidos-graxos',
    titulo: 'Ácidos Graxos',
    descricao:
      'Matéria-prima para resinas, dispersantes e formulações industriais.',
    detalhe:
      'Ácidos graxos empregados como matéria-prima na produção de resinas, dispersantes e formulações industriais.',
    linha: [
      {
        titulo: 'Ácidos graxos de tall oil',
        itens: [
          {
            nome: 'NEOLUB AGTD 5',
            descricao:
              'É um ácido graxo de tall oil fracionado sob condições diferenciada com no máximo 5% de ácidos resínicos a fim de obter-se um produto homogêneo e isento de cristais. Por possuir uma coloração mais clara é utilizado na fabricação de resinas, amidas, emulsificantes, resinas para fundição, agentes de flotação para minérios e diversos ésteres etoxilados.',
          },
          {
            nome: 'NEOLUB AGTD',
            descricao:
              'É um ácido graxo de Tall oil com no mínimo 30% de ácidos resínicos; líquido transparente marrom. Ao ser submetido a estoque prolongado forma cristais que decantam, devido a alta concentração de ácidos resínicos, e requer aquecimento 70 a 80 ºC para voltar ao estado líquido.',
          },
        ],
      },
    ],
    imagem: '/images/tanques-verdes.jpg',
    imagemAlt: 'Tanques verdes de estocagem a granel no pátio da Neoquim',
    destaqueHome: true,
  },
  {
    slug: 'catalisadores',
    titulo: 'Catalisadores',
    descricao: 'Catalisadores para processos de esterificação e polimerização.',
    detalhe:
      'Catalisadores aplicados em processos de esterificação e polimerização.',
    linha: [
      {
        titulo: 'Resina alquídica',
        itens: [
          {
            nome: 'NEOCAT LITIO 1,5%',
            descricao:
              'É utilizado como catalisador de alcoolize, esterificação ou transesterificação, podendo ser utilizado com qualquer poli álcool. É indicado na fabricação de resinas alquídicas devido a sua velocidade e boa retenção de cor, deve ser usado na proporção de 0,5 a 1,0% sobre o peso do óleo.',
          },
        ],
      },
      {
        titulo: 'Resina poliéster',
        itens: [
          {
            nome: 'NEOSEC COBRE 8%',
            descricao:
              'É considerado um estabilizador de resinas poliésteres e ótimo dispersante em tintas de impressão de cores escuras, sobretudo de pigmentos pretos.',
          },
          {
            nome: 'NEOCAT POTASSIO 10% e 15%',
            descricao:
              'São catalisadores de resinas poliésteres, normalmente é utilizado com o cobre e em algumas formulações substitui parte do Cobalto utilizado em resinas poliésteres cristais 0,25 a 0,50%.',
          },
          {
            nome: 'NEOCAT COBALTO 12%',
            descricao:
              'Utilizado na atividade de aceleração da catálise de resinas poliésteres, é aplicado em conjunto com os catalisadores (geralmente peróxidos) de resina poliéster. Na presença do cobalto os peróxidos se dissociam em radicais livre a temperatura ambiente proporcionando uma cura mais rápida da resina.',
          },
          {
            nome: 'NEOCAT COBALTO 210',
            descricao:
              'Trata-se de Neodecanoato de Cobalto, desenvolvido para atuar em resina poliéster. Utilizado como um alimentador de cobalto para resistir ao declínio da atividade ("drift").',
          },
          {
            nome: 'NEOCAT NT 13',
            descricao:
              'Produto constituído de sais metalorgânicos diluídos em álcool. É um complexo constituído de Cobalto, Cobre e Potássio, utilizado como acelerador ou ativador na resina poliéster diminuindo o tempo de gel após a adição do peróxido orgânico.',
          },
        ],
      },
    ],
    imagem: '/images/tanques-inox.jpg',
    imagemAlt:
      'Tanques de aço inoxidável ao pé da torre de reação da Neoquim',
    destaqueHome: true,
  },
  {
    slug: 'ester',
    titulo: 'Éster',
    descricao:
      'Linha de ésteres de base renovável para aplicações de alto desempenho.',
    detalhe:
      'Linhas NEOGREEN e UNIGREEN: ésteres de base renovável desenvolvidos para aplicações de alto desempenho, entre em contato, pois podemos desenvolver um Éster exclusivo pra sua empresa ou conforme sua necessidade.',
    linha: [
      {
        itens: [
          {
            nome: 'NEOGREEN',
            descricao:
              'É um éster metílico de óleo de soja usado como lubrificante sintético e também como veículo em várias formulações industriais.',
          },
          {
            nome: 'UNIGREEN T',
            descricao:
              'É um redutor de torque, lubrificante de extrema pressão para fluidos de perfuração a base de água, sendo compatível com os produtos usados modernamente neste tipo de fluido, podendo ser utilizado em qualquer faixa de pH, também promove estabilidade adicional nas paredes do poço, auxilia na inibição e melhora o controle do filtrado em altas temperaturas. É solúvel em água tendo assim elevada eficiência como lubrificante.',
          },
        ],
      },
    ],
    imagem: '/images/carregamento-granel.jpg',
    imagemAlt:
      'Caminhão-tanque em carregamento a granel no pátio da Neoquim',
    destaqueHome: true,
  },
  
  {
    slug: 'tinta-base-solvente',
    titulo: 'Tinta Base Solvente',
    descricao: 'Insumos completos para formulações base solvente.',
    detalhe:
      'Conjunto de insumos para formulações de tintas em base solvente. A Neoquim atende este mercado com emulsificantes, além das linhas de resinas alquídicas, secantes octoatos e dispersantes, cada uma detalhada em sua própria página.',
    linha: [
      {
        titulo: 'Emulsificante',
        itens: [
          {
            nome: 'NEOMUL',
            descricao:
              'Produto em composição pré-estabelecida, especialmente formulado para emulsões em sistemas alquídicos, garantindo uma perfeita estabilidade nas emulsões formadas, podendo ser utilizada em resinas fabricadas com glicerol, dando uma ótima compatibilidade final.',
          },
        ],
      },
    ],
    imagem: '/images/reator2.jpeg',
    imagemAlt:
      'Corredor do galpão da Neoquim com tambores de insumos paletizados',
    destaqueHome: true,
  },

  {
    slug: 'tinta-off-set',
    titulo: 'Tinta Off-Set',
    descricao: 'Insumos para tintas gráficas de impressão off-set.',
    detalhe:
      'Insumos destinados à formulação de tintas gráficas para impressão off-set.',
    linha: [
      {
        titulo: 'Secantes',
        itens: [
          {
            nome: 'NEOSEC COBALTO 12% OM',
            descricao:
              'Com excelente atividade, acelera o processo de oxidação da película da tinta. Atua como secante de superfície à temperatura ambiente. Utilizado na fabricação e formulação para tintas de impressão. Possui baixa volatilidade.',
          },
          {
            nome: 'NEOSEC MANGANÊS 6% OV',
            descricao:
              'Promove a polimerização com a menor tendência em formar filmes enrugados. Devido a sua cor âmbar, a aplicação deve ser moderada para evitar amarelamento em tinta clara. Possui baixa volatilidade.',
          },
        ],
      },
    ],
    imagem: '/images/armazem-tambores.jpg',
    imagemAlt: 'Armazém da Neoquim com tambores estocados sobre pallets',
    destaqueHome: false,
  },
  {
    slug: 'revenda-materia-prima',
    titulo: 'Revenda de Matéria Prima',
    descricao:
      'Distribuição Química Global Logistica eficiente na revenda e importação de matérias-primas nacionais e internacionais de alta qualidade.',
    detalhe:
      'Distribuição de matérias-primas químicas nacionais e importadas para a indústria.',
    linha: [
      {
        titulo: 'Ácidos',
        itens: [
          {
            nome: 'Ácido 2 etil hexanoico',
            descricao:
              'Sua utilização com certos metais pesados, que determinam seus respectivos tipos de aplicações, são largamente utilizados em secantes de tintas e estabilizantes de PVC. Os ésteres do ácido 2-etil hexanóico, especialmente os obtidos com diglicóis, triglicóis e polietilenoglicóis, além das propriedades lubrificantes, são excelentes plastificantes para PVC, nitrocelulose, borracha clorada e polipropileno. Além das características citadas, pode ser utilizado como estabilizante térmico e de cor para resinas alquídicas.',
          },
          {
            nome: 'Ácido isononanoico',
            descricao:
              'É um ácido sintético, da família química dos ácidos carboxílicos.',
          },
          {
            nome: 'Ácido neodecanoico',
            descricao:
              'É um material sintético, de ácido carboxílico terciário altamente ramificados em C10.',
          },
          {
            nome: 'Ácido dimérico',
            descricao:
              'É um ácido alifático com características difuncional e cadeia longa.',
          },
        ],
      },
      {
        titulo: 'Outros',
        itens: [
          {
            nome: 'Anidrido ftálico',
            descricao:
              'Utilizado na fabricação de: Estabilizantes de PVC; Plastificantes; Resinas Poliéster; Resinas Alquídicas; Corantes Sintéticos, ex.: Fenolftaleína; Aromatizantes.',
          },
          {
            nome: 'Anidrido maleico',
            descricao:
              'Utilizado na fabricação de Plastificantes, Resinas Poliéster, Resinas Alquídicas e Maleicas, Aditivos para óleos lubrificantes, Inseticidas, Herbicidas e Fungicidas, Ácido fumático, Cola para papel.',
          },
          {
            nome: 'Carbonato de zircônio',
            descricao:
              'Esta substância é usada em formulações, em locais industriais e na fabricação de outras substancias.',
          },
          {
            nome: 'Lecitina de soja',
            descricao:
              'Dispersante de pigmentos, a base de fosfatídeos naturais, de viscosidade média e alta performance com aditivos que proporciona um alto poder de dispersão. Auxilia na umectação e na floculação do veículo de moagem.',
          },
          {
            nome: 'Para tercil butil fenol (PTBF)',
            descricao:
              'Resina de formaldeído. É uma resina de fenol-formaldeído que é usado principalmente em adesivos.',
          },
          {
            nome: 'Glicerina bidestilada',
            descricao:
              'Produto originado na fabricação de óleos vegetais ou na produção de sabões. Purificada, a chamada glicerina loura é bi-destilada adquirindo então alto grau de pureza.',
          },
        ],
      },
    ],
    imagem: '/images/importacao-container.jpg',
    imagemAlt:
      'Carreta com contêiner de importação em descarga no galpão da Neoquim',
    destaqueHome: false,
  },
  {
    slug: 'dispersantes-inibidores',
    titulo: 'Dispersantes e Inibidores',
    descricao: 'Dispersantes de pigmentos e inibidores de secatividade.',
    detalhe:
      'Dispersantes de pigmentos e inibidores de secatividade para a indústria de tintas e vernizes.',
    linha: [
      {
        titulo: 'Dispersantes',
        itens: [
          {
            nome: 'NEOSPERSAN 51',
            descricao:
              'É um produto orgânico, dispersante e anti-sedimentante, usado como agente de moagem de pigmentos em tintas a base de solventes em geral. Auxilia na umectação e na floculação do veículo de moagem, não modificando a dureza da película, aumentando o brilho e diminuindo o escurecimento de tintas claras, pois diminui o tempo de moagem.',
          },
          {
            nome: 'NEOSPERSAN 61',
            descricao:
              'É um dispersante de pigmentos, a base de fosfatídeos naturais, de viscosidade média e alta performance com aditivos que proporciona um alto poder de dispersão. Auxilia na umectação e na floculação do veículo de moagem, não modificando a dureza da película, aumentando o brilho e diminuindo o escurecimento de tintas claras, pois diminui o tempo de moagem.',
          },
          {
            nome: 'NEOLEC 71',
            descricao:
              'É um dispersante de pigmentos, a base de fosfatídeos naturais, de viscosidade média e alta performance, diluídos em aditivos, com alto poder de dispersão e solvente aromático.',
          },
        ],
      },
      {
        titulo: 'Anti pele',
        itens: [
          {
            nome: 'NEOSKIN',
            descricao:
              'É agente antioxidante, de ação anti-pele em tintas e vernizes, constituído basicamente do metil etil cetoxima. Deve ser utilizado de 0,2 a 0,5% sobre o sólido da resina. Também tem por aplicação como um agente bloqueador para isocianato em poliuretanos, e na fabricação de silanos oxima (que são usados como reticuladores para selantes de silicone). Deve ser usado de 1 a 5%.',
          },
        ],
      },
    ],
    imagem: '/images/reator.jpeg',
    imagemAlt:
      'Galpão da Neoquim com tambores de insumos químicos paletizados',
    destaqueHome: false,
  },
];

/** Produto exibido em destaque no topo de /produtos. */
export const FEATURED_PRODUCT_SLUG = 'petroleo-perfuracao';

export const PRODUCT_DOC_NOTE =
  'Especificações técnicas, fichas de segurança e amostras podem ser solicitadas ao nosso time comercial.';
