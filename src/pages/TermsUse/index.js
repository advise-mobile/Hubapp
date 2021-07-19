import React, { useState, useMemo, useEffect } from 'react';
import { View } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '../../store/ducks/Auth'
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../../assets/styles'
import * as S from './styles';

const TermsUse = props => {

  const dispatch = useDispatch();

  const [disabledCheck, setDisabledCheck] = useState(true);
  const [acceptCheck, setAcceptCheck] = useState(false);

  const acceptTerms = useSelector(state => state.auth.acceptTerms);
  const loadingAcceptTerms = useSelector(state => state.auth.loadingAcceptTerms);

  const data = {
    header: (
      <>
        <S.TermsText>
          ADVISE, única e exclusiva proprietária das marcas e dos domínios associados ao Site e ao Aplicativo, estabelece as presentes condições de uso para a utilização de nossos serviços (“Termo de Uso”). {`\n`}
          Nós da Advise estamos comprometidos em melhorar a produtividade do seu trabalho e por isso preparamos este documento com todas as condições de uso da plataforma, suas funcionalidades, limitações e possibilidades, de acordo com as disposições a seguir expostas.
        </S.TermsText>
      </>
    ),
    definitions: (
      <>
        <S.TermsTextBold>
          1 DEFINIÇÕES
        </S.TermsTextBold>
        <S.TermsText>
          1.1 Os termos constantes neste Termo de Uso, sempre que constarem, terão o significado estabelecido abaixo, seja no plural ou no singular: {`\n`}
          a. Parceiros: Seccionais da OAB, entre outros. {`\n`}
          b. Aplicativo: o aplicativo (app) da Advise. Adaptado e desenvolvido para operação em telefone celular, tablet ou qualquer outro dispositivo móvel (iOS/ANDROID). {`\n`}
          c. Aceitar ou Aceite: o ato do Usuário clicar na caixa <S.TermsTextBold>“Li e aceito os Termos de Uso e Política de Privacidade”</S.TermsTextBold> disposta no Site ou no Aplicativo. Tal ato implica no consentimento prévio, expresso e informado do Usuário em relação a todo o disposto em tais documentos. {`\n`}
          d. Conteúdo: toda e qualquer informação disponibilizada pelo ou por meio do Site ou do Aplicativo, tais como publicações, andamentos, textos, dados, software, imagens, vídeos, áudios, recursos interativos, etc., incluindo-se os códigos fonte empregados para exibição desses conteúdos, como aqueles em linguagem HTML, CSS, PHP, entre outros. {`\n`}
          e. Advise ID: conta de acesso do Usuário à Advise. {`\n`}
          f. Dados de Conta: qualquer informação fornecida a Advise durante a criação da conta, mas não se limitando a dados do processo, número de inscrição da OAB, entre outros. {`\n`}
          g. Dados Financeiros Pessoais: qualquer dado fornecido pelo Usuário a Advise para manutenção de pacotes pagos, caso houver. {`\n`}
          h. Dados Pessoais: qualquer dado disponibilizado pelo Usuário que, de alguma forma, o identifique, tais como, mas não se limitando a, nome, inscrição da OAB, CPF, endereço, número de telefone, número de fax ou endereço de e-mail. {`\n`}
          i. Política de Privacidade: a política de privacidade que rege as disposições sobre a utilização dos dados do Usuário que pode ser encontrada no seguinte link : http://advise.com.br/Ajuda/Politica {`\n`}
          j. Site: endereço eletrônico http://www.advise.com.br ou qualquer outro que vier a substituí-lo. {`\n`}
          k. Software: software de propriedade exclusiva da Advise por meio do qual será acessado o conteúdo do usuário, quando solicitado, bem como geridos e manejados todos os dados do Usuário. {`\n`}
          l. Usuário: pessoa física, maior de idade, ou jurídica, com plena capacidade de contratar, que acessa o Site ou o Aplicativo e realiza o seu cadastro pessoal de modo a usufruir das funcionalidades oferecidas pela Advise, aderindo desta forma automaticamente ao presente Termo de Uso e à Política de Privacidade.
        </S.TermsText>
      </>
    ),
    intro: (
      <>
        <S.TermsTextBold>
          2 INTRODUÇÃO AO SERVIÇO
        </S.TermsTextBold>
        <S.TermsText>
          Ao criar sua conta e utilizar o serviço, seja por meio do site e/ou os aplicativos da Advise, o Usuário estará ciente de todo o disposto no presente Termo, sendo vedada a alegação de desconhecimento de toda e qualquer informação, estando o Termo de Uso disponível em sua conta Advise. O Usuário confirma que leu, compreendeu e aceitou cumpri-los de acordo com o presente. {`\n`}
          O Termo abrange informações importantes sobre os serviços da Advise prestados ao Usuário e quaisquer encargos, impostos e tarifas que lhe serão cobrados. Eles incluem informações sobre futuras alterações no Termo de Uso, renovações automáticas, limitações de responsabilidade, informações de privacidade. {`\n`}
          Para usar o Serviço Advise e acessar seu conteúdo, o Usuário confirma que quaisquer informações de cadastro que enviar para a Advise são verdadeiras, precisas e completas.
        </S.TermsText>
      </>
    ),
    changes: (
      <>
        <S.TermsTextBold>
          3 ALTERAÇÕES NO TERMO DE USO
        </S.TermsTextBold>
        <S.TermsText>
          Oportunamente, poderão ser realizadas alterações no Termo de Uso. Qualquer alteração será cientificada ao Usuário através de um aviso em destaque dentro do Serviço ou via e-mail. {`\n`}
          Em alguns casos informaremos previamente, e seu uso contínuo do Serviço depois que as alterações tiverem sido feitas constituirá no pleno direito na aceitação das alterações. {`\n`}
          Caso não deseje continuar utilizando o serviço após a nova versão do Termo de Uso, deverá encerrar o vínculo contratual entrando em contato conosco por meio do formulário de Atendimento ao Cliente.
        </S.TermsText>
      </>
    ),
    services: (
      <>
        <S.TermsTextBold>
          4 SERVIÇOS E CONTRATAÇÕES
        </S.TermsTextBold>
        <S.TermsTextUnderline>
          4.1 Dos Serviços
        </S.TermsTextUnderline>
        <S.TermsText>
          A Advise fornece ao Usuário através dos produtos disponíveis denominados “Inbox”, “Start” e "Hub" serviços de pesquisa, seleção e disponibilização das publicações jurídicas de todos os Diários de Justiça do Brasil, em que constem o seu nome em conformidade com o cadastro principal na Seccional da OAB ou em variações do seu nome, desde que sugeridas pelo Usuário, aprovadas por nossa equipe, inseridas no sistema e de acordo com a periodicidade contratada. {`\n`}
          Os Diários mencionados estão de acordo com a atual distribuição/organização do Tribunal ou Órgão Administrativo a que está vinculado. Assim, a Advise não terá responsabilidade de disponibilizar a(s) publicação(ões) se houver a segregação, supressão de conteúdos, extinção/cessação de disponibilidade do Diário ou conteúdo parcial, ou qualquer outra forma de alteração na organização. {`\n`}
          A Advise poderá ainda proceder a pesquisa de andamentos processuais conforme as especificidades do serviço contratado e mediante cadastro prévio com pesquisa automática de andamentos, consulta e geração de relatórios de andamento em arquivo, desde que os processos não estejam em segredo de justiça. Inobstante, caso o processo cadastrado mude de instância, caberá ao Usuário recadastrar na nova fonte. {`\n`}
          Estas movimentações oficiais dos processos serão disponibilizadas em sua conta para acesso pelo endereço eletrônico http://www.advise.com.br na opção “Entrar”. {`\n`}
          A Advise poderá, a título de cortesia e por liberalidade, enviar notificações referentes as movimentações por e-mail. {`\n`}
          A depender do produto contratado, o Usuário poderá ter acesso ao banco de dados de Jurisprudências da Advise. {`\n`}
          A Advise possui um serviço de agenda integrada ao Google Agenda, possibilitando o controle de prazos e monitoramento de atividades, onde o Usuário poderá visualizar os compromissos por ele criados dentro dos produtos Advise, ressalvada a disponibilidade do serviço perante o Google. {`\n`}
          O Usuário poderá ter acesso ao software do plano contratado através de um aplicativo mobile disponível para Android e IOS. {`\n`}
          No Módulo “Pessoas”, o Usuário pode gerenciar informações como nome, telefone, e-mail e outras definições acerca de seus clientes. {`\n`}
          Já no Módulo “Financeiro”, há o cadastro de informações de fluxo de caixa, entradas e saídas financeiras, podendo o Usuário vincular o agendamento de pagamentos com a agenda integrada. {`\n`}
          O Usuário pode obter mais informações sobre nossos serviços acessando nosso site, ou entrando em contato com a Advise através do telefone disponível no site oficial da empresa “www.advise.com.br”.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.1.1 Do Advise Inbox
        </S.TermsTextUnderline>
        <S.TermsText>
          O “Advise Inbox” contempla o módulo “Movimentações” e dentro dele estão inclusos os serviços de “Publicações” (Publicações Jurídicas) e “Processos” (Andamentos Processuais). {`\n`}
          Para o serviço de “Publicações” o Usuário poderá receber as publicações disponibilizadas nos Diários de Justiça e Oficiais que forem contratados, de acordo com as limitações do seu plano, podendo realizar uma nova contratação caso necessite de uma quantidade maior de processos. {`\n`}
          O serviço de ”Processos” se refere às atualizações dos processos previamente cadastrados pelo Usuário, observadas as restrições do plano contratado, cabendo ao Usuário informar o número do processo e demais informações relevantes, podendo realizar uma nova contratação caso necessite modificar o seu plano.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.1.2 Do Advise Start
        </S.TermsTextUnderline>
        <S.TermsText>
          O “Advise Start” contempla  contempla o módulo “Movimentações” e dentro dele estão inclusos os serviços de “Publicações” (Publicações Jurídicas) e “Processos” (Andamentos Processuais); tem ainda como diferencial os módulos “Pessoas”, “Prazos”, “Financeiro” e “Jurisprudência”. {`\n`}
          Para o serviço de “Publicações” o Usuário poderá receber as publicações disponibilizadas nos Diários de Justiça e Oficiais que forem contratados, de acordo com as limitações do seu plano, podendo realizar uma nova contratação caso necessite de uma quantidade maior de processos. {`\n`}
          O serviço de ”Processos” se refere às atualizações dos processos previamente cadastrados pelo Usuário, observadas as restrições do plano contratado, cabendo ao Usuário informar o número do processo e demais informações relevantes, podendo realizar uma nova contratação caso necessite modificar o seu plano. {`\n`}
          No Módulo “Pessoas”, o Usuário pode gerenciar informações como nome, telefone, e-mail e outras definições acerca de seus clientes. {`\n`} 
          No Módulo “Prazos”, na qual o Usuário poderá gerenciar os prazos processuais de forma eficaz. {`\n`}
          O Usuário poderá cadastrar tarefas em geral e compromissos diversos como prazos, reuniões, audiências, entre outros. Estes compromissos poderão ser sincronizados à conta Google do Usuário. A sincronização com o Google Agenda poderá ser ativada e desativada sempre que o Usuário desejar. Além disso, neste módulo, o Usuário poderá visualizar os compromissos a partir dos filtros: a vencer, vencidos, importantes e concluídos. {`\n`}
          A Advise não se responsabiliza por eventual falha no envio de alertas e o Usuário tem ciência de que será necessário checar os alertas sempre pelo aplicativo e/ou site. {`\n`}
          No Módulo “Jurisprudência”, o usuário poderá pesquisar jurisprudência com filtragem por tribunal, por datas, por tema e na íntegra, além de imprimi-las, enviá-las por email, baixá-las na íntegra e copiar a ementa já formatada para citação. {`\n`}
          Já no Módulo “Financeiro”, há possibilidade de cadastro de informações de fluxo de caixa, entradas e saídas financeiras, podendo o Usuário vincular o agendamento de pagamentos com a agenda integrada.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.1.3 Do Advise Hub
        </S.TermsTextUnderline>
        <S.TermsText>
          O “Advise Hub” contempla todos os módulos do “Advise Start”, podendo eles serem contratados de forma isolada ou concomitante, podendo inclusive contratar os serviços de “Publicações” e/ou “Processos” separadamente, com a exceção de contratação isolada dos módulos “Pessoas” e “Financeiro”, que para serem contratados, deverão sempre estar vinculados à contratação de qualquer um dos demais módulos.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.2 Das Pesquisas e Buscas
        </S.TermsTextUnderline>
        <S.TermsText>
          A pesquisa de publicações jurídicas será efetuada pelo nome completo do Usuário e variações do nome que forem previamente cadastradas e aprovadas por nossa equipe. Variações divergentes do cadastro original são de responsabilidade do Usuário em informar à Advise e serão inseridas a partir de sugestões do Usuário. {`\n`}
          Não serão aceitas sugestões de grafias de nomes de terceiro, ou que sejam incoerentes com o fiel registro no sistema, salvo a(s) Palavra(s)-Chave(s) que o Usuário poderá inserir. {`\n`}
          A Advise não se responsabiliza por publicações incompletas ou em que conste nome do Usuário de forma imperfeita, abreviada, ou diversa do informado no ato da contratação e vigência do mesmo, além de ser isenta de responsabilidade em casos de erro(s) de grafia constante(s) na publicação, nomes e termos aglutinados ou qualquer outra forma disponibilizada pela Imprensa Oficial que inviabilize a busca dos termos contratados. {`\n`}
          O Usuário tem ciência e concorda que, no tocante aos serviços de publicações, é apenas e tão somente a busca e disponibilização diária de publicações na plataforma, não contemplando a busca de publicações retroativas, em caso de inadimplemento contratual, ou mesmo pedido voluntário do Usuário. {`\n`}
          Caso haja interesse do Usuário em solicitar a busca de publicações retroativas, será feito em contrato autônomo. {`\n`}
          Caso o plano contemple “Andamentos Processuais”, a Advise não se responsabiliza por movimentações processuais não informadas, por processos cadastrados de maneira incompleta ou que constem dados incorretos. O Usuário se obriga ainda a informar através dos canais de atendimento, se porventura receber andamentos inexatos ou ainda se deixar de recebê-los, para que o sistema de captura de dados possa adaptar-se às eventuais alterações dos Tribunais. {`\n`}
          Em caso de atraso na divulgação dos andamentos processuais por meio do Tribunal, ou ainda, se o Tribunal não permitir as conexões em sua base de dados por meio de Webservice, a Advise estará isenta de qualquer responsabilidade e obrigação.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.3 Do prazo
        </S.TermsTextUnderline>
        <S.TermsText>
          Após a contratação, as primeiras publicações estarão disponíveis em seu acesso dentro do prazo mínimo de 48 horas, a contar da data de ativação no sistema Advise, sendo o mesmo válido para casos de inserção ou alteração de Diários, nomes e/ou termos de pesquisa. {`\n`}
          Após o prazo acima estipulado, o Usuário receberá as publicações em até 24 horas após a divulgação no Diário contratado. {`\n`}
          O regramento contido acima é válido para o Advise “Inbox”, “Start” e "Hub”. {`\n`}
          Em caso de atraso na divulgação do(s) Diário(s) da Justiça/Oficial por meio da Imprensa Oficial ou Tribunal, a Advise estará isenta de qualquer responsabilidade e obrigação, posto que não utiliza meios extraoficiais para processar as publicações jurídicas. A partir da disponibilização do(s) Diário(s) da Justiça/Oficial a Advise manterá o prazo acima. {`\n`}
          No caso dos andamentos processuais, os mesmos estarão disponíveis para o acesso do Usuário no prazo máximo de até 24 horas após a divulgação, a depender do plano contratado.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.4 Do caráter informativo
        </S.TermsTextUnderline>
        <S.TermsText>
          Os serviços da Advise tem caráter meramente informativo, desta forma o Usuário declara e reconhece que o serviço prestado é natureza complementar e suplementar a atividade advocatícia, não substituindo ou dispensando o diligente acompanhamento processual, não podendo ainda, eximir-se de suas responsabilidades nos termos da Lei nº 8.906, de 04 de julho de 1994 e artigos 2º e 12º do Código de Ética da Ordem dos Advogados do Brasil.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.5 Do não recebimento de uma publicação
        </S.TermsTextUnderline>
        <S.TermsText>
          Em eventual anomalia quanto ao conteúdo ou não disponibilização de uma publicação, a Advise terá um prazo máximo de até 72 (setenta e duas horas) da data de publicação oficial do Diário para regularização em caráter informativo. O Usuário concorda que este atraso isenta a Advise de qualquer dano ocasionado pela perda da informação ao Usuário ou a qualquer outro terceiro por se tratar de serviço meramente informativo. A Advise se resguarda ao direito e liberalidade de acionar a cobertura securitária que possui para revisão do problema e eventual reembolso dos prejuízos comprovados. {`\n`}
          A informação acima é destinada exclusivamente ao serviço de publicação jurídica.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.6 Do envio e recebimento de e-mails
        </S.TermsTextUnderline>
        <S.TermsText>
          A título de cortesia, a Advise procederá o disparo de e-mails visando emitir ao Usuário as notificações sobre novas publicações e/ou andamentos processuais disponibilizados no endereço eletrônico http://www.advise.com.br, contudo, ressaltamos que esta notificação a ser via e-mail não é segura e confiável e poderá não chegar às caixas postais em virtude de oscilações da internet, anti-spams, caixas de entrada lotadas e outras variáveis características deste meio de comunicação. {`\n`}
          É sua responsabilidade informar ao seu provedor, administrador ou qualquer outro responsável pelo recebimento de e-mails os seguintes endereços eletrônicos: avisos@plataforma.advise.com.br, contratos@plataforma.advise.com.br e cobranca@plataforma.advise.com.br, a fim de garantir o recebimento de nossos alertas diários, isentando a Advise de qualquer responsabilização em caso de não recebimento.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.7 Dos aplicativos móveis
        </S.TermsTextUnderline>
        <S.TermsText>
          Nosso serviço inclui o uso do aplicativo móvel para smartphones e tablets nas plataformas iOS (Apple) e Android (Google) de forma limitada, de acordo com o plano contratado. O Usuário deve verificar em nosso site todos os recursos disponibilizados e sua limitação.
        </S.TermsText>
        <S.TermsTextUnderline>
          4.8 Testes
        </S.TermsTextUnderline>
        <S.TermsText>
          Periodicamente, a Advise poderá oferecer testes de novos serviços por um período específico sem pagamento ou por uma taxa reduzida ("Teste"). A Advise se reserva no direito, a seu critério absoluto, de determinar sua elegibilidade para um Teste e, segundo as leis aplicáveis, de retirar ou modificar um Teste a qualquer momento sem aviso prévio e sem responsabilidade, na medida máxima permitida pela lei. {`\n`}
          Para alguns testes, exigiremos que o Usuário forneça suas informações de pagamento antes de iniciar a utilização, que funcionará com um aceite pelo novo serviço. Ao final destes testes, poderemos começar a cobrá-lo pela assinatura paga aplicável no primeiro dia após o final do teste nos meses subsequentes. {`\n`}
          Se o Usuário não quiser essa cobrança, deverá cancelar a assinatura paga aplicável por meio da página de assinatura da sua conta da Advise ou encerrar sua conta antes do final do teste.
        </S.TermsText>
      </>
    ),
    guidelines: (
      <>
        <S.TermsTextBold>
          5 DIRETRIZES DE USUÁRIO
        </S.TermsTextBold>
        <S.TermsText>
          Não é permitido de nenhuma maneira ao Usuário:
        </S.TermsText>
        <S.TermsText>
          • Executar engenharia reversa, descompilar, desmontar, modificar ou criar trabalhos derivativos com base no Serviço Advise, no conteúdo ou em qualquer parte deste, a menos que seja expressamente acordado; {`\n`}
          • Burlar qualquer tecnologia usada pela Advise, por seus licenciadores ou por qualquer terceiro para comercializar seu conteúdo ou serviço; {`\n`}
          • Vender, alugar, sublicenciar ou arrendar qualquer parte do Serviço Advise ou seu conteúdo; {`\n`}
          • Burlar quaisquer restrições territoriais aplicadas pela Advise ou por seus licenciadores; {`\n`}
          • Fornecer sua senha para qualquer outra pessoa ou usar o nome de Usuário e a senha de outra pessoa; {`\n`}
          • Rastrear o Serviço Advise ou de outra forma usando quaisquer meios automatizados (incluindo robôs, extratores e spiders) para coletar informações da Advise;  {`\n`}
          • Incorrer, por si ou através de terceiro, em qualquer ato que: {`\n`}
          • Seja ofensivo, abusivo, difamatório, pornográfico, ameaçador ou obsceno; {`\n`}
          • Seja ilegal ou destinado a promover ou a cometer um ato ilegal de qualquer tipo, incluindo, entre outros, violações de direitos de propriedade intelectual, direitos de privacidade ou direitos proprietários da Advise ou de um terceiro; {`\n`}
          • Inclua sua senha ou intencionalmente inclua a senha de qualquer outro Usuário ou inclua intencionalmente dados pessoais de terceiros, ou seja, destinado a solicitar tais dados pessoais; {`\n`}
          • Inclua conteúdo malicioso como malware, cavalos de Troia ou vírus, ou interfira de outra forma no acesso de qualquer Usuário ao Serviço; {`\n`}
          • Personifique ou deturpe sua afiliação com outro Usuário, pessoa ou entidade, ou seja, fraudulento, falso, enganoso ou ilusório de outra forma; {`\n`}
          • Envolva a transmissão de mala direta não solicitada ou outras formas de spam ("spam"), lixo eletrônico, correntes ou semelhantes, inclusive por meio da caixa de entrada da Advise; {`\n`}
          • Esteja vinculado, faça menção ou promova de outra forma produtos ou serviços comerciais, exceto conforme expressamente autorizado pela Advise; {`\n`}
          • Interfira com, ou de alguma forma descontinue, o Serviço Advise, adultere, viole ou tente sondar, varrer ou testar as vulnerabilidades no Serviço ou nos sistemas de computação, rede e regras de utilização da Advise, ou em qualquer um dos componentes de segurança, medidas de autenticação ou quaisquer outras medidas de proteção da Advise aplicáveis ao Serviço, ao Conteúdo ou a qualquer parte dele; {`\n`}
          • Entre em conflito com os termos acordados, conforme determinado pela Advise.
        </S.TermsText>
        <S.TermsText>
          O Usuário confirma e concorda que se houver enquadramento do Usuário em qualquer um dos itens listados acima, poderá resultar em encerramento imediato ou suspensão da sua conta da Advise, sem prejuízo das medidas legais cabíveis, o que inclui cobrança de eventuais perdas e danos.
        </S.TermsText>
      </>
    ),
    maintenance: (
      <>
        <S.TermsTextBold>
          6 MANUTENÇÃO E MODIFICAÇÃO DO SERVIÇO
        </S.TermsTextBold>
        <S.TermsText>
          Será comunicado ao Usuário casos de dificuldades técnicas ou de manutenção que resulte em instabilidades temporárias. {`\n`}
          Ainda, a Advise se reserva o direito de a qualquer momento modificar ou descontinuar, temporária ou permanentemente, funções e recursos do Serviço Advise, mediante aviso. {`\n`}
          O Usuário compreende, concorda e aceita que a Advise não tem obrigação de manter, fazer upgrade, atualizar o Serviço, ou de fornecer todo ou qualquer conteúdo específico por meio do Serviço de forma gratuita e ilimitada.
        </S.TermsText>
      </>
    ),
    support: (
      <>
        <S.TermsTextBold>
          7 SUPORTE AO CLIENTE
        </S.TermsTextBold>
        <S.TermsText>
          Para obter informações sobre suporte ao cliente com perguntas relacionadas a contas e a pagamentos ("Perguntas de Suporte ao Cliente"), poderá o Usuário enviar um e-mail para nosso Departamento de Atendimento ao Cliente, utilizando o formulário de contato de Atendimento ao Cliente em nosso site através da opção de Chat disponível no canto inferior direito de todas as páginas ou por contato telefônico durante o horário comercial. {`\n`}
          A Advise possui prazo de até 72 (setenta e duas) horas para retornar o atendimento, nos termos do contrato.
        </S.TermsText>
      </>
    ),
    policies: (
      <>
        <S.TermsTextBold>
          8 DA POLÍTICA DE PAGAMENTOS, COBRANÇA E INATIVAÇÃO
        </S.TermsTextBold>
        <S.TermsText>
          O Usuário pagará pela licença de uso temporário do Advise “Inbox”, “Start” e "Hub" na forma, valor, periodicidade e vencimento descritos e especificados no Termo de Contratação. {`\n`}
          A Advise efetuará o reajuste dos preços dos serviços com base na anualidade e na variação do IPCA (Índice Nacional de Preços ao Consumidor Amplo) do IBGE (Instituto Brasileiro de Geografia e Estatística) ocorrida a contar da primeira contratação. {`\n`}
          O atraso no pagamento gerará multa de 2% (dois por cento) mais encargos da mora na proporção de 1% (um por cento) ao mês, calculados pro rata die, e com a possibilidade do prejuízo na suspensão dos serviços até regularização dos pagamentos.
        </S.TermsText>
        <S.TermsText>
          A política financeira quanto ao atraso no pagamento será a seguinte: {`\n`}
          • Após 02 (dois) dias do vencimento aprazado, o Usuário receberá uma notificação sobre o atraso; {`\n`}
          • Após o 5º (quinto) dia de inadimplemento, o Usuário receberá a segunda notificação referente ao atraso; {`\n`}
          • A partir do décimo dia de atraso, o acesso às publicações será interrompido (bloqueio). Após o 20º (vigésimo) dia da parcela vencida, seu CONTRATO será rescindido automaticamente e o acesso inativado, impossibilitando o pagamento do boleto junto à rede bancária credenciada. Neste caso, para continuar a utilizar o serviço da Advise, o Usuário deverá entrar em contato com a Advise para solicitar a emissão e de um novo boleto, com a quitação das eventuais pendências remanescentes. {`\n`}
          Existindo pagamento do boleto de cobrança com atraso inferior há 20 (vinte) dias, a liberação do acesso às publicações e andamentos processuais se dará no 2º (segundo) dia útil subsequente ao pagamento. {`\n`}
          Seu contrato será renovado ao final do período, mediante assinatura de novo contrato, a menos que não seja realizado o pagamento mensal, o que ocasionará a finalização da prestação de serviço. {`\n`}
          O cancelamento entrará em vigor no dia seguinte à inativação. {`\n`}
          A Advise poderá alterar o preço das Assinaturas, do Período Pré-pago (para períodos que ainda não foram pagos), informando quaisquer alterações de preço ao Usuário de maneira prévia.
        </S.TermsText>
      </>
    ),
    dissatisfaction: (
      <>
        <S.TermsTextBold>
          9 INSATISFAÇÃO
        </S.TermsTextBold>
        <S.TermsText>
          Caso ocorra, por algum motivo, qualquer insatisfação com nossos serviços, solicitamos que entre em contato através de qualquer meio de comunicação que disponibilizamos, a fim de dirimir toda e qualquer dúvida, e/ou aborrecimento.
        </S.TermsText>
      </> 
    ),
    license: (
      <>
        <S.TermsTextBold>
          10 DA LICENÇA DE USO TEMPORÁRIO DO SOFTWARE
        </S.TermsTextBold>
        <S.TermsText>
          A Advise é detentora exclusiva do “Inbox”, “Start” e "Hub” e detentora de todos os direitos autorais (Software e suas marcas), podendo usar, fruir, gozar e dispor do referido bem, especialmente para incremento tecnológico, alteração de versões, acordos comerciais, campanhas promocionais, dentre outras funcionalidades ou serviços que possam ser agregados, tanto de forma onerosa, quanto gratuita, conforme direito de propriedade que lhe confere a Lei nº 9.608/1.998. {`\n`}
          O direito de propriedade não será transferido, cedido ou vendido a qualquer pessoa, que sempre será da titularidade da Advise, seja na sua versão original, seja nas sucessivas e posteriores versões que venham a ser desenvolvidas e que sejam disponibilizadas para o Usuário. {`\n`}
          O Advise “Inbox”, “Start” e "Hub desenvolvidos pela Advise não são em hipótese alguma vendido, sendo somente licenciados para uso do Usuário. {`\n`}
          Eventual infração aos direitos autorais implicará em indenização na forma da lei pelos danos causados, seja ela realizada diretamente pelo Usuário, seja ela realizada por qualquer de seus prepostos, terceiros ou qualquer pessoa que tiver acesso ao Advise “Inbox”, “Start” e "Hub” por meio do Usuário.
        </S.TermsText>
      </> 
    ),
    foro: (
      <>
        <S.TermsTextBold>
          11 FORO
        </S.TermsTextBold>
        <S.TermsText>
          As partes elegem o Foro da Comarca de Londrina, Estado do Paraná para solucionar qualquer disputa, reivindicação ou controvérsia que surja em relação ao presente termo, bem como quaisquer disputas, reivindicações não contratuais que surjam em virtude de, ou em relação a eles.
        </S.TermsText>
      </> 
    ),
    customerService: (
      <>
        <S.TermsTextBold>
          12 ATENDIMENTO AO CLIENTE
        </S.TermsTextBold>
        <S.TermsText>
          Se o Usuário tiver dúvidas relacionadas aos serviços da Advise quanto à funcionalidades, pacotes, valores, ou qualquer outra hipótese entre em contato com o atendimento ao cliente da Advise, ou acesse nosso site. {`\n`}
          A utilização do sistema implica em plena aceitação dos termos aqui previstos. {`\n`}
          Agradecemos pela leitura do nosso Termo de Uso. Esperamos que o Usuário aproveite nossa plataforma jurídica! {`\n`}
        </S.TermsText>
      </> 
    )
  }

  const handleAccept = () => {
    dispatch(AuthActions.termsUseRequest(true));
  }

  const onMomentumScrollEnd = (event) => {
    const realSizeScroll =  event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y;

    console.log(realSizeScroll, event.nativeEvent.contentSize.height, parseInt(event.nativeEvent.contentSize.height) - 10);

    if (parseInt(realSizeScroll) > (parseInt(event.nativeEvent.contentSize.height) - 10)) {
      setDisabledCheck(false);
    }
  }
  
  useEffect(() => {
    
    const checkAcceptTerms = () => {
      if (acceptTerms) {
        props.navigation.dispatch(StackActions.push('App'));
      }
    };

    checkAcceptTerms();

  }, [acceptTerms]);

  const disabledButton = useMemo(() => !acceptCheck, [acceptCheck]);

  return (
    <View style={{flex: 1}} >
      <S.Container>
        <S.ContentWrapper>
          <S.Title> Termos de uso </S.Title>
          <S.TextWrapper onMomentumScrollEnd={onMomentumScrollEnd}>
            {data.header}
            {data.definitions}
            {data.intro}
            {data.changes}
            {data.services}
            {data.guidelines}
            {data.maintenance}
            {data.support}
            {data.policies}
            {data.dissatisfaction}
            {data.license}
            {data.foro}
            {data.customerService}
          </S.TextWrapper>
          <S.AcceptTermsWrapper>
            <S.TermsText>Li e aceito os Termos de Uso.</S.TermsText>
            <CheckBox
              lineWidth={1.5}
              boxType={'square'}
              value={acceptCheck}
              onValueChange={setAcceptCheck}
              animationDuration={0.2}
              tintColor={colors.primary}
              onCheckColor={colors.white}
              onFillColor={colors.primary}
              onTintColor={colors.primary}
              style={{ width: 18, height: 18, marginRight: 12 }}
              disabled={disabledCheck}
            />
          </S.AcceptTermsWrapper>
          <S.AcceptButton onPress={handleAccept} activeOpacity={0.7} disabled={disabledButton || loadingAcceptTerms} >
            <S.AcceptButtonText>
              Aceitar
            </S.AcceptButtonText>
          </S.AcceptButton>
        </S.ContentWrapper>
      </S.Container>
    </View>
  )
};

export default TermsUse;
