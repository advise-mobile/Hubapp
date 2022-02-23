import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {View, Appearance} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AuthActions from '../../store/ducks/Auth';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../assets/styles';
import * as S from './styles';

const TermsUse = props => {
	const colorScheme = Appearance.getColorScheme();
	const dispatch = useDispatch();

	const [acceptCheck, setAcceptCheck] = useState(false);

	const acceptTerms = useSelector(state => state.auth.acceptTerms);
	const loadingAcceptTerms = useSelector(state => state.auth.loadingAcceptTerms);
	const redirect = useSelector(state => state.auth.redirect);

	const data = {
		header: (
			<>
				<S.TermsText>
					Para fins deste documento, você deve considerar a{' '}
					<S.TermsTextBold>ADVISE PRODUTOS E SERVIÇOS EM TECNOLOGIA LTDA – ME</S.TermsTextBold>{' '}
					(“Advise”), pessoa jurídica de direito privado, inscrita no CNPJ/ME sob o nº
					05.149.280/0001-18, com sede na Avenida Santos Dumont, nº 1.060, Bairro Boa Vista,
					Londrina – Estado do Paraná, CEP 86.039-090, telefone 4003 3196 (Capitais e regiões
					metropolitanas) e 0800 500 9926 para Demais regiões, e-mail atendimento@advise.com.br,
					única e exclusiva proprietária das marcas e dos domínios associados ao Site e ao
					Aplicativo.
				</S.TermsText>
				<S.TermsText>
					Nós da Advise estamos comprometidos em oferecer a melhor experiência para todos que usam a
					nossa plataforma e por isso preparamos este documento (“Termo de Uso”) com todas as
					condições de uso da plataforma, suas funcionalidades, limitações e possibilidades, de
					acordo com as disposições a seguir expostas.
				</S.TermsText>
				<S.TermsText>
					Além de seguir os Termos de Uso, é necessário que você conheça nossa Política de
					Privacidade (https://advise.com.br/politica-de-privacidade/), a qual também integra o
					presente documento e estabelece informações sobre as condições em que a Advise
					(“Controladora”) realiza o tratamento dos seus dados pessoais durante o oferecimento da
					sua Plataforma e Serviços, bem como informações sobre os seus direitos enquanto titular
					desses dados.
				</S.TermsText>
			</>
		),
		definitions: (
			<>
				<S.TermsTextBold>1 DEFINIÇÕES</S.TermsTextBold>
				<S.TermsText>
					Os termos constantes neste Termo de Uso, sempre que iniciarem com letras maiúsculas, terão
					o significado estabelecido abaixo, seja no plural ou no singular: a. Aplicativo: o
					aplicativo (app) da Advise. Adaptado e desenvolvido para operação em telefone celular,
					tablet ou qualquer outro dispositivo móvel com sistemas iOS/Android.{'\n'}
					b. Aceitar ou Aceite: o ato do Usuário clicar na caixa{' '}
					<S.TermsTextBold>
						“Li e aceito os Termos de Uso e Política de Privacidade”
					</S.TermsTextBold>{' '}
					disposta no Site ou no Aplicativo. Tal ato implica no consentimento prévio, livre,
					expresso e informado do Usuário em relação a todo o disposto em tais documentos.{'\n'}
					c. Conteúdo: toda e qualquer informação disponibilizada pelo ou por meio do Site ou do
					Aplicativo, tais como publicações, andamentos, textos, dados, software, imagens, vídeos,
					áudios, recursos interativos, etc., incluindo-se os códigos fonte empregados para exibição
					desses conteúdos, como aqueles em linguagem HTML, CSS, PHP, entre outros.{'\n'}
					d. Advise ID: conta de acesso do Usuário à Advise.{'\n'}
					e. Dados de Conta: qualquer informação fornecida a Advise durante a criação da conta, mas
					não se limitando a dados do processo, número de inscrição da OAB, entre outros.{'\n'}
					f. Dados Financeiros Pessoais: qualquer dado fornecido pelo Usuário a Advise para
					manutenção de pacotes pagos, caso houver.{'\n'}
					g. Dados Pessoais: qualquer dado disponibilizado pelo Usuário que, de alguma forma, o
					identifique, tais como, mas não se limitando a, nome, inscrição da OAB, CPF, endereço,
					número de telefone, número de fax ou endereço de e-mail.{'\n'}
					h. Política de Privacidade: a política de privacidade que rege as disposições sobre a
					utilização dos dados do Usuário que pode ser encontrada no seguinte link:
					https://advise.com.br/politica-de-privacidade/.{'\n'}
					i. Site: endereço eletrônico https://advise.com.br ou qualquer outro que vier a
					substituí-lo.{'\n'}
					j. Software: software de propriedade exclusiva da Advise por meio do qual será acessado o
					conteúdo do usuário, quando solicitado, bem como geridos e manejados todos os dados do
					Usuário.{'\n'}
					k. Usuário: pessoa física, maior de idade, ou jurídica, com plena capacidade de contratar,
					que acessa o Site ou o Aplicativo e realiza o seu cadastro pessoal de modo a usufruir das
					funcionalidades oferecidas pela Advise, aderindo desta forma automaticamente ao presente
					Termo de Uso e à Política de Privacidade.{'\n'}
					l. Lei: significa leis, atos normativos, regras, regulamentos, instruções, circulares,
					decretos, resoluções, diretivas e quaisquer outros componentes de um ordenamento jurídico
					de uma dada jurisdição e suas subdivisões ou uma Ordem emanada por qualquer Autoridade
					Governamental.
				</S.TermsText>
			</>
		),
		intro: (
			<>
				<S.TermsTextBold>2 INTRODUÇÃO AO SERVIÇO</S.TermsTextBold>
				<S.TermsText>
					Ao criar sua conta e utilizar o serviço, seja por meio do site e/ou os aplicativos da
					Advise, o Usuário estará ciente de todo o disposto no presente Termo, sendo vedada a
					alegação de desconhecimento de toda e qualquer informação, estando o Termo de Uso
					disponível em sua conta Advise. A aceitação do presente instrumento é imprescindível para
					o acesso à Plataforma e para a utilização dos seus Serviços. Caso não concorde com as
					disposições destes Termos, o Usuário não deve acessá-la ou utilizá-la. O Termo abrange
					informações importantes sobre os serviços da Advise prestados ao Usuário e quaisquer
					encargos, impostos e tarifas que lhe serão cobrados. Eles incluem informações sobre
					futuras alterações no Termo de Uso, renovações automáticas, limitações de
					responsabilidade, informações de privacidade. O Usuário confirma que leu, compreendeu e
					aceitou cumpri-los de acordo com o presente. Para usar o Serviço Advise e acessar seu
					conteúdo, o Usuário confirma que quaisquer informações de cadastro que enviar para a
					Advise são verdadeiras, precisas e completas, sendo de sua exclusiva responsabilidade
					manter referidos dados atualizados.
				</S.TermsText>
			</>
		),
		changes: (
			<>
				<S.TermsTextBold>3 ALTERAÇÕES NO TERMO DE USO</S.TermsTextBold>
				<S.TermsText>
					Oportunamente, poderão ser realizadas alterações no Termo de Uso. Qualquer alteração que
					implique em mudanças de práticas significativas e que ensejem nova autorização será
					cientificada ao Usuário através de um aviso em destaque dentro do Serviço ou via e-mail.
					{'\n'}
					Em alguns casos informaremos previamente, e seu uso contínuo do Serviço depois que as
					alterações tiverem sido feitas constituirá no pleno direito na aceitação das alterações.
					{'\n'}
					Caso não deseje continuar utilizando o serviço após a nova versão do Termo de Uso, deverá
					encerrar o vínculo contratual entrando em contato conosco por meio de nosso Atendimento.
				</S.TermsText>
			</>
		),
		services: (
			<>
				<S.TermsTextBold>4 SERVIÇOS E CONTRATAÇÕES</S.TermsTextBold>
				<S.TermsTextUnderline>4.1 Acesso</S.TermsTextUnderline>
				<S.TermsText>
					O conteúdo contratado poderá ser acessado pelo endereço eletrônico https://advise.com.br
					na opção “Entrar”. O Usuário também poderá ter acesso ao software do plano contratado
					através de um aplicativo mobile disponível para Android e IOS. A combinação de usuário e
					senha assegura ao Usuário acesso individual e intransferível Plataforma, sendo que o
					Usuário se compromete a não informar seus dados cadastrais e/ou de acesso à Plataforma a
					terceiros, responsabilizando-se integralmente pelo uso que deles seja feito. Em nenhuma
					hipótese será permitida a cessão, venda, aluguel ou outra forma de transferência ou
					alienação do cadastro do Usuário. Caberá também ao Usuário assegurar que o seu equipamento
					seja compatível com as características técnicas que viabilizem a utilização da Plataforma
					e dos Serviços em navegadores (browsers) web, incluindo conexão à internet em alta
					velocidade ou banda larga. Os navegadores homologados para o uso do Advise Hub são: Google
					Chrome e Mozilla Firefox, sendo que os demais navegadores podem apresentar falhas na
					execução das funcionalidades do sistema. Além disso, o desempenho do Advise Hub dependerá
					diretamente do tamanho da banda de acesso à Internet dedicado. Recomenda-se que o Usuário
					tenha, no mínimo, uma banda de acesso dedicado de 05 (cinco) mbps. O Advise Hub é
					independente do sistema operacional e não necessita da instalação de qualquer software
					para ser utilizado, exceto para o uso das funcionalidades de exportação de relatórios,
					onde será necessário possuir o software adequado para abrir o formato de arquivo gerado.
					Quanto à configuração de hardware, usuários que utilizem o Advise Hub com equipamentos com
					pouca memória e/ou baixa capacidade de processamento podem ter a utilização do sistema
					comprometida e/ou causar a lentidão do sistema. Assim, é necessário que o acesso via
					desktop observe os requisitos mínimos listados no link: https://advise.com.br/requisitos/.
					Os requisitos referentes ao uso em smartphones e tablets estão descritos no item 4.5.
				</S.TermsText>
				<S.TermsTextUnderline>4.2 Funcionalidades</S.TermsTextUnderline>
				<S.TermsText>
					O “Advise Hub” contempla os módulos “Publicações”, “Processos”, “Pessoas”, “Financeiro”,
					“Jurisprudência” e “Prazos”, podendo eles serem contratados de forma isolada ou
					concomitante, com exceção da contratação isolada dos módulos “Pessoas” e “Financeiro”, que
					para serem contratados, deverão sempre estar vinculados à contratação de qualquer um dos
					demais módulos.
				</S.TermsText>
				<S.TermsText>4.2.1 Publicações:</S.TermsText>
				<S.TermsText>
					4.2.1.1. A Advise fornece ao Usuário através do produto disponível denominado "Hub"
					serviços de pesquisa, seleção e disponibilização das publicações jurídicas nos Diários de
					Justiça do Brasil que integram a abrangência contratada, em que constem o seu nome em
					conformidade com o cadastro principal na Seccional da OAB ou em variações do seu nome,
					desde que sugeridas pelo Usuário, aprovadas por nossa equipe, inseridas no sistema e de
					acordo com a periodicidade contratada. A pesquisa será realizada de acordo com as
					especificações e limitações do seu plano;
				</S.TermsText>
				<S.TermsText>
					4.2.1.2. Os Diários mencionados estão de acordo com a atual distribuição/organização do
					Tribunal ou Órgão Administrativo a que está vinculado. Assim, a Advise não terá
					responsabilidade de disponibilizar a(s) publicação(ões) se houver a segregação, supressão
					de conteúdos, extinção/cessação de disponibilidade do Diário ou conteúdo parcial, ou
					qualquer outra forma de alteração na organização;
				</S.TermsText>
				<S.TermsText>
					4.2.1.3. A pesquisa de publicações jurídicas será efetuada pelo nome completo do Usuário e
					variações do nome que forem previamente cadastradas e aprovadas por nossa equipe.
					Variações divergentes do cadastro original são de responsabilidade do Usuário em informar
					à Advise e serão inseridas a partir de sugestões do Usuário;
				</S.TermsText>
				<S.TermsText>
					4.2.1.4. Não serão aceitas sugestões de grafias de nomes de terceiro, palavras genéricas e
					com abrangência extensiva ou que sejam incoerentes com o fiel registro no sistema, salvo
					a(s) Palavra(s)-Chave(s) que o Usuário poderá inserir;
				</S.TermsText>
				<S.TermsText>
					4.2.1.5. A Advise não se responsabiliza por publicações incompletas ou em que conste nome
					do Usuário de forma imperfeita, abreviada, ou diversa do informado no ato da contratação e
					vigência do mesmo, além de ser isenta de responsabilidade em casos de erro(s) de grafia
					constante(s) na publicação, nomes e termos aglutinados ou qualquer outra forma
					disponibilizada pela Imprensa Oficial que inviabilize a busca dos termos contratados;
				</S.TermsText>
				<S.TermsText>
					4.2.1.6. O Usuário tem ciência e concorda que, no tocante aos serviços de publicações, é
					apenas e tão somente a busca e disponibilização diária de publicações na plataforma, não
					contemplando a busca de publicações retroativas, em caso de inadimplemento contratual, ou
					mesmo pedido voluntário do Usuário;
				</S.TermsText>
				<S.TermsText>
					4.2.1.7. Caso haja interesse do Usuário em solicitar a busca de publicações retroativas,
					será feito em contrato autônomo;
				</S.TermsText>
				<S.TermsText>
					4.2.1.8. Em eventual anomalia quanto ao conteúdo ou não disponibilização de uma
					publicação, a Advise terá um prazo máximo de até 72h (setenta e duas horas) úteis da data
					de publicação oficial do Diário para regularização em caráter informativo. O Usuário
					concorda que este atraso isenta a Advise de qualquer dano ocasionado pela perda da
					informação ao Usuário ou a qualquer outro terceiro por se tratar de serviço meramente
					informativo. A Advise se resguarda ao direito e liberalidade de acionar a cobertura
					securitaria que possui para revisão do problema e eventual reembolso dos prejuízos
					comprovados.
				</S.TermsText>
				<S.TermsText>
					4.2.1.9. Após a contratação, as primeiras publicações estarão disponíveis em seu acesso
					dento do prazo mínimo de 48 horas, a contar da data de ativação no sistema Advise, sendo o
					mesmo válido para casos de inserção ou alteração de Diários, nomes e/ou termos de
					pesquisa. Após o prazo acima estipulado, o Usuário receberá as publicações em até 24 horas
					após a divulgação no Diário contratado.
				</S.TermsText>
				<S.TermsText>
					4.2.1.10. Em caso de atraso na divulgação do(s) Diário(s) da Justiça/Oficial por meio da
					Imprensa Oficial ou Tribunal, a Advise estará isenta de qualquer responsabilidade e
					obrigação, posto que não utiliza meios extraoficiais para processar as publicações
					jurídicas. A partir da disponibilização do(s) Diário(s) da Justiça/Oficial a Advise
					manterá o prazo acima.
				</S.TermsText>
				<S.TermsText>4.2.2 Processos:</S.TermsText>
				<S.TermsText>
					4.2.2.1. A Advise procede a pesquisa de andamentos processuais conforme as especificidades
					do serviço contratado e mediante cadastro prévio com pesquisa automática de andamentos,
					consulta e geração de relatórios de andamento em arquivo, desde que os processos não
					estejam em segredo de justiça. Inobstante, caso o processo cadastrado mude de instância,
					caberá ao Usuário recadastrar na nova fonte.
				</S.TermsText>
				<S.TermsText>
					4.2.2.2. Os andamentos processuais estarão disponíveis para o acesso do Usuário no prazo
					máximo de até 24 horas após a divulgação, a depender do plano contratado.
				</S.TermsText>
				<S.TermsText>
					4.2.2.3. Em caso de atraso na divulgação dos andamentos processuais por meio do Tribunal,
					ou ainda, se o Tribunal não permitir as conexões a sua base de dados, a Advise estará
					isenta de qualquer responsabilidade e obrigação.
				</S.TermsText>
				<S.TermsText>
					4.2.2.4. A Advise não se responsabiliza por movimentações processuais não informadas, por
					processos cadastrados de maneira incompleta ou que constem dados incorretos. O Usuário se
					obriga ainda a informar através dos canais de atendimento, se porventura receber
					andamentos inexatos ou ainda se deixar de recebê-los, para que o sistema de captura de
					dados possa adaptar-se às eventuais alterações dos Tribunais.
				</S.TermsText>
				<S.TermsText>
					4.2.2.5. A pesquisa será realizada de acordo com as especificações e limitações do seu
					plano, podendo ser realizada uma nova contratação caso necessite de uma quantidade maior
					de processos.
				</S.TermsText>
				<S.TermsText>
					4.2.3. Pessoas: No Módulo “Pessoas”, o Usuário pode gerenciar informações como nome,
					telefone, e-mail e outras definições acerca de seus clientes.
				</S.TermsText>
				<S.TermsText>
					4.2.4. Financeiro: No Módulo “Financeiro”, há o cadastro de informações de fluxo de caixa,
					entradas e saídas financeiras, podendo o Usuário vincular o agendamento de pagamentos.
				</S.TermsText>
				<S.TermsText>
					4.2.5. Jurisprudência: No Módulo “Jurisprudência”, o Usuário poderá pesquisar
					jurisprudência com filtragem por tribunal, por datas, por tema e na íntegra, além de
					imprimi-las, envia-las por e-mail, baixa-las na íntegra e copiar a ementa já formatada
					para citação.
				</S.TermsText>
				<S.TermsText>
					4.2.6. Prazos: A Advise possui um serviço de agenda integrada ao Google Agenda,
					possibilitando o controle de prazos e monitoramento de atividades, onde o Usuário poderá
					visualizar os compromissos por ele criados dentro dos produtos Advise, ressalvada a
					disponibilidade do serviço perante o Google. A integração do Advise Hub com o Google
					Agenda se dará a partir de uma interface de programação de aplicações (API)
					disponibilizado pelo Google. Essa API possibilita a inserção e atualização de eventos
					dentro da Agenda de forma unilateral. Portanto, o Advise Hub não possui acesso aos demais
					eventos presentes na agenda e nem a futuras atualizações realizadas diretamente na
					aplicação do Google ou em qualquer outra integração. A integração com a agenda depende da
					autenticação e liberação de acesso à agenda por parte do Usuário, sendo que o Advise Hub
					não tem acesso a nenhuma informação referente à conta e acessos do Usuário. Para maiores
					informações acerca do uso da API do Google Agenda, o Usuário deverá acessar os Termos de
					Uso dessa ferramenta disponíveis no link: https://developers.google.com/terms e a Política
					de Privacidade disponível no link:
					https://support.google.com/calendar/answer/10366125?hl=pt-BR.
					{'\n\n'}O Usuário pode obter mais informações sobre nossos serviços acessando nosso site,
					ou entrando em contato com a Advise através do telefone disponível no site oficial da
					empresa “www.advise.com.br”.
				</S.TermsText>

				<S.TermsTextUnderline>4.3. Do caráter informativo</S.TermsTextUnderline>
				<S.TermsText>
					Os serviços da Advise tem caráter meramente informativo, desta forma o Usuário declara e
					reconhece que o serviço prestado é natureza complementar e suplementar a atividade
					advocatícia, não substituindo ou dispensando o diligente acompanhamento processual, não
					podendo ainda, eximir-se de suas responsabilidades nos termos da Lei nº 8.906, de 04 de
					julho de 1994 e artigos 2º e 12º do Código de Ética da Ordem dos Advogados do Brasil.
				</S.TermsText>
				<S.TermsTextUnderline>4.4. Do envio e recebimento de e-mails</S.TermsTextUnderline>
				<S.TermsText>
					A título de cortesia, a Advise procederá o disparo de e-mails visando emitir ao Usuário as
					notificações sobre novas publicações e/ou andamentos processuais disponibilizados através
					do sistema. Contudo, ressaltamos que esta notificação a ser via e-mail não é segura e
					confiável e poderá não chegar às caixas postais em virtude de oscilações da internet,
					anti-spams, caixas de entrada lotadas e outras variáveis características deste meio de
					comunicação. É sua responsabilidade informar ao seu provedor, administrador ou qualquer
					outro responsável pelo recebimento de e-mails os seguintes endereços eletrônicos:
					avisos@advisebrasil.com.br e avisos@plataforma.advise.com.br, a fim de garantir o
					recebimento de nossos alertas diários, isentando a Advise de qualquer responsabilização em
					caso de não recebimento. Do mesmo modo, é sua responsabilidade manter o cadastro de e-mail
					atualizado para recebimento do conteúdo contratado.
				</S.TermsText>
				<S.TermsTextUnderline>4.5. Dos aplicativos móveis</S.TermsTextUnderline>
				<S.TermsText>
					Nosso serviço inclui o uso do aplicativo móvel para smartphones e tablets nas plataformas
					iOS (Apple) e Android (Google) de acordo com o plano contratado. O Usuário poderá conferir
					as limitações de usabilidade do aplicativo móvel através do link
					https://advise.com.br/requisitos/, o qual será atualizado periodicamente pela Advise para
					exposição dos requisitos mínimos dos aparelhos celulares aptos à utilização do aplicativo
					móvel. A atualização dos requisitos de dispositivos móveis será realizada de acordo com o
					versionamento do sistema operacional iOS e Android, incumbindo ao Usuário checar se está
					em consonânica com os requisitos mínimos descritos no link citado, bem como se sua versão
					de sistema operacional e do aplicativo do Advise Hub estão atualizados.
				</S.TermsText>
				<S.TermsTextUnderline>4.6. Testes</S.TermsTextUnderline>
				<S.TermsText>
					Periodicamente, a Advise poderá oferecer testes de novos serviços por um período
					específico sem pagamento ou por uma taxa reduzida ("Teste"). A Advise se reserva no
					direito, a seu critério absoluto, de determinar sua elegibilidade para um Teste e, segundo
					as leis aplicáveis, de retirar ou modificar um Teste a qualquer momento sem aviso prévio e
					sem responsabilidade, na medida máxima permitida pela lei. Para alguns testes, exigiremos
					que o Usuário forneça suas informações de pagamento antes de iniciar a utilização, que
					funcionará com um aceite pelo novo serviço. Ao final destes testes, poderemos começar a
					cobrá-lo pela assinatura paga aplicável no primeiro dia após o final do teste nos meses
					subsequentes. Se o Usuário não quiser essa cobrança, deverá cancelar a assinatura paga
					aplicável por meio da página de assinatura da sua conta da Advise ou encerrar sua conta
					antes do final do teste.
				</S.TermsText>
				<S.TermsTextUnderline>4.7. Limitação de Responsabilidades</S.TermsTextUnderline>
				<S.TermsText>
					A Advise declara que:{'\n'}
					{'\u2022'} Não realiza qualquer prestação de consultoria ou assessoria jurídica, uma vez
					que esta é atividade privativa de advogados, de modo que todo contato entre o Usuário e a
					Advise mediante os canais para este fim destinar-se-á, única e exclusivamente, para
					atender solicitações ou dúvidas técnicas acerca da utilização da Plataforma e
					funcionamento dos Serviços oferecidos;{'\n'}
					{'\u2022'} Toda e qualquer informação extraída de diários oficiais, tribunais e demais
					órgãos é pública por essência. A Advise não produz, edita, modifica, altera ou mantém
					qualquer tipo de ingerência editorial ou de curadoria sobre o conteúdo retirado de diários
					oficiais e tribunais, de modo que tais funcionalidades agem como um mero indexador de
					conteúdo. Ainda, nenhuma funcionalidade oferecida pela Advise deve ser entendida como
					substituição à conferência e/ou validação de documentos e/ou informações junto aos órgãos
					oficiais. Assim, a Advise não será responsável pelo conteúdo veiculado;{'\n'}
					{'\u2022'} A Advise não se responsabiliza pela disponibilização parcial ou não
					disponibilização de ementas, inclusive em situações nas quais não seja possível a
					formatação correta de determinada ementa, a depender da forma pela qual referida
					informação é disponibilizada pelo tribunal em questão, como nos casos em que houver a
					segregação, supressão de conteúdos, extinção/cessação de disponibilidade do Diário ou
					conteúdo parcial, ou qualquer outra forma de alteração na organização;{'\n'}
					{'\u2022'} Não será responsabilizada por dano ou prejuízo que eventualmente resulte do uso
					inadequado dos Serviços, conforme vedações a comportamento do Usuário descritas acimas,
					incluindo também, mas não se limitando, a perdas de prazos processuais, erro de
					informações disponibilizadas pelos respectivos órgãos, dentre outros.
				</S.TermsText>
			</>
		),
		guidelines: (
			<>
				<S.TermsTextBold>5 DIRETRIZES DE USUÁRIO</S.TermsTextBold>
				<S.TermsText>Não é permitido de nenhuma maneira ao Usuário:</S.TermsText>
				<S.TermsText>
					{'\u2022'} Executar engenharia reversa, descompilar, desmontar, modificar ou criar
					trabalhos derivativos com base no Serviço Advise, no conteúdo ou em qualquer parte deste,
					a menos que seja firmado em acordo expresso;{'\n'}
					{'\u2022'} Burlar qualquer tecnologia usada pela Advise, por seus licenciadores ou por
					qualquer terceiro para comercializar seu conteúdo ou serviço; • Vender, alugar,
					sublicenciar ou arrendar qualquer parte do Serviço Advise ou seu conteúdo;{'\n'}
					{'\u2022'} Burlar quaisquer restrições territoriais aplicadas pela Advise ou por seus
					licenciadores; Fornecer sua senha para qualquer outra pessoa ou usar o nome de Usuário e a
					senha de outra pessoa, de forma que compete ao Usuário exclusivamente a manutenção da
					referida senha de acesso individual confidencial e segura, de forma que toda e qualquer
					atividade realizada com o uso da senha será de responsabilidade do Usuário. O Usuário, por
					sua vez, se compromete a informar prontamente a Advise eventual acesso de origem
					desconhecida à conta, através do canal de comunicação devido;{'\n'}
					{'\u2022'} Rastrear o Serviço Advise ou de outra forma usando quaisquer meios
					automatizados (incluindo robôs, extratores e spiders) para coletar informações da Advise;
					{'\n'}
					{'\u2022'} Incorrer, por si ou através de terceiro, em qualquer ato que:{'\n'}
					{'\u2022'} Seja ofensivo, abusivo, difamatório, pornográfico, ameaçador ou obsceno;{'\n'}
					{'\u2022'} Seja ilegal ou destinado a promover ou a cometer um ato ilegal de qualquer
					tipo, incluindo, entre outros, violações de direitos de propriedade intelectual, direitos
					de privacidade ou direitos proprietários da Advise ou de um terceiro;{'\n'}
					{'\u2022'} Inclua sua senha ou intencionalmente inclua a senha de qualquer outro Usuário
					ou inclua intencionalmente dados pessoais de terceiros, ou seja, destinado a solicitar
					tais dados pessoais;{'\n'}
					{'\u2022'} Inclua conteúdo malicioso como malware, cavalos de Troia ou vírus, ou interfira
					de outra forma no acesso de qualquer Usuário ao Serviço;{'\n'}
					{'\u2022'} Personifique ou deturpe sua afiliação com outro Usuário, pessoa ou entidade, ou
					seja, fraudulento, falso, enganoso ou ilusório de outra forma;{'\n'}
					{'\u2022'} Envolva a transmissão de mala direta não solicitada ou outras formas de spam
					("spam"), lixo eletrônico, correntes ou semelhantes, inclusive por meio da caixa de
					entrada da Advise;{'\n'}
					{'\u2022'} Esteja vinculado, faça menção ou promova de outra forma produtos ou serviços
					comerciais, exceto conforme expressamente autorizado pela Advise;{'\n'}
					{'\u2022'} Interfira com, ou de alguma forma descontinue, o Serviço Advise, adultere,
					viole ou tente sondar, varrer ou testar as vulnerabilidades no Serviço ou nos sistemas de
					computação, rede e regras de utilização da Advise, ou em qualquer um dos componentes de
					segurança, medidas de autenticação ou quaisquer outras medidas de proteção da Advise
					aplicáveis ao Serviço, ao Conteúdo ou a qualquer parte dele;{'\n'}
					{'\u2022'} Entre em conflito com os termos acordados, conforme determinado pela Advise.
				</S.TermsText>
				<S.TermsText>
					O Usuário confirma e concorda que se houver enquadramento do Usuário em qualquer um dos
					itens listados acima, poderá resultar em encerramento imediato ou suspensão da sua conta
					da Advise, sem prejuízo das medidas legais cabíveis, o que inclui cobrança de eventuais
					perdas e danos.
				</S.TermsText>
			</>
		),
		privacy: (
			<>
				<S.TermsTextBold>6 PRIVACIDADE, COLETA E USO DE DADOS</S.TermsTextBold>
				<S.TermsText>
					A Advise e o Usuário se comprometem a respeitar todas as leis e regulamentações aplicáveis
					no contexto do uso da Plataforma, em especial a Lei nº 13.709 – Lei Geral de Proteção de
					Dados Pessoais (LGPD).{'\n'}
					No que se refere à proteção de dados e às possíveis formas de uso do conteúdo pelo
					Usuário, este desde já concorda se compromete a:{'\n'}
					(i) cumprir e o presente Termos de Uso e a Política de Privacidade da Advise que pode ser
					acessada através do link https://advise.com.br/politica-de-privacidade/, bem como todas as
					demais regras aplicáveis ao uso da Plataforma e do conteúdo dela proveniente;{'\n'}
					(ii) será exclusivamente responsável pela coleta de eventual consentimento referente aos
					dados pessoais que porventura vier a inserir na Aplicação, inclusive no tocante à
					eventuais dados sensíveis, respondendo direta e exclusivamente pela sua coleta de forma
					livre, informada, inequívoca e relacionada a uma finalidade determinada, nos termos da
					Lei;{'\n'}
					(iii) não utilizar quaisquer dados de natureza pessoal inseridos na Plataforma para
					quaisquer finalidades que extrapolem o quanto expressamente autorizado pelo Titular, nos
					termos da Lei;{'\n'}
					(iv) não transferir, compartilhar, ceder ou de qualquer forma tornar disponível a
					terceiros qualquer porção do conteúdo contendo dados de natureza pessoal, para quaisquer
					finalidades;{'\n'}
					(v) não inserir e tratar quaisquer dados de natureza pessoal para quaisquer propósitos que
					não sejam o do próprio uso da Plataforma, quais sejam, para fins de pesquisa, seleção e
					disponibilização das publicações jurídicas de todos os Diários de Justiça do Brasil;{'\n'}
					O Usuário reconhece e concorda que por ocasião do preenchimento das informações
					necessárias para a formalização da contratação da Plataforma, foram obtidos dados pessoais
					de sua titularidade, fundados na base legal de execução do contrato, em conformidade com
					as políticas da Advise sobre privacidade e proteção de dados, bem como nos termos da
					legislação vigente.{'\n'}
					Os termos e condições aplicáveis à coleta, ao armazenamento, ao tratamento e ao uso dos
					dados de natureza pessoal relacionados única e exclusivamente ao Usuário (não ao conteúdo
					por ele inserido na Plataforma) são regidos estritamente em conformidade com a Política de
					Privacidade, disponível em https://advise.com.br/politica-de-privacidade/ (“Política de
					Privacidade”).{'\n'}
					Após a leitura da Política de Privacidade, se você tiver dúvidas, reclamações, quiser
					exercer seus direitos relacionados aos seus dados pessoais ou se comunicar sobre esse
					assunto, você pode entrar em contato com nosso Encarregado, através do seguinte canal:
					lgpd@advise.com.br.
				</S.TermsText>
			</>
		),
		maintenance: (
			<>
				<S.TermsTextBold>7 MANUTENÇÃO E MODIFICAÇÃO DO SERVIÇO</S.TermsTextBold>
				<S.TermsText>
					Será comunicado ao Usuário casos de dificuldades técnicas ou de manutenção que resulte em
					instabilidades temporárias.{'\n'}
					Ainda, a Advise se reserva o direito de a qualquer momento modificar ou descontinuar,
					temporária ou permanentemente, funções e recursos do Serviço Advise, mediante aviso.{'\n'}
					O Usuário compreende, concorda e aceita que a Advise irá manter, fazer upgrade e atualizar
					periodicamente o Serviço prestado. Havendo solicitações específicas do Usuário, a Advise
					irá verificar a viabilidade da modificação.
				</S.TermsText>
			</>
		),
		support: (
			<>
				<S.TermsTextBold>8 SUPORTE AO CLIENTE</S.TermsTextBold>
				<S.TermsText>
					Para obter informações sobre suporte ao cliente com perguntas relacionadas a contas e a
					pagamentos ("Perguntas de Suporte ao Cliente"), poderá o Usuário enviar um e-mail para
					nosso Departamento de Atendimento ao Cliente, utilizando o formulário de contato de
					Atendimento ao Cliente em nosso site através da opção de Chat disponível no canto inferior
					direito de todas as páginas ou por contato telefônico durante o horário comercial.{'\n'}A
					Advise possui prazo de até 72 (setenta e duas) horas úteis para retornar o atendimento,
					nos termos do contrato.
				</S.TermsText>
			</>
		),
		policies: (
			<>
				<S.TermsTextBold>9 DA POLÍTICA DE PAGAMENTOS, COBRANÇA E INATIVAÇÃO</S.TermsTextBold>
				<S.TermsText>
					O Usuário pagará pela licença de uso temporário do Advise "Hub" na forma, valor,
					periodicidade e vencimento descritos e especificados no Termo de Contratação.{'\n'}A
					Advise efetuará o reajuste dos preços dos serviços com base na anualidade e na variação do
					IPCA (Índice Nacional de Preços ao Consumidor Amplo) do IBGE (Instituto Brasileiro de
					Geografia e Estatística) ocorrida a contar da primeira contratação.{'\n'}O atraso no
					pagamento gerará multa de 2% (dois por cento) mais encargos da mora na proporção de 1% (um
					por cento) ao mês, calculados pro rata die, e com a possibilidade do prejuízo na suspensão
					dos serviços até regularização dos pagamentos.{'\n'}
				</S.TermsText>
				<S.TermsText>
					A política financeira quanto ao atraso no pagamento será a seguinte:{'\n'}• Após 02 (dois)
					dias do vencimento aprazado, o Usuário receberá uma notificação sobre o atraso;{'\n'}•
					Após o 5º (quinto) dia de inadimplemento, o Usuário receberá a segunda notificação
					referente ao atraso;{'\n'}• A partir do 10º (décimo) dia de atraso, o acesso às
					publicações será interrompido (bloqueio). Após o 20º (vigésimo) dia da parcela vencida,
					seu CONTRATO será rescindido automaticamente e o acesso inativado, impossibilitando o
					pagamento do boleto junto à rede bancária credenciada. Neste caso, para continuar a
					utilizar o serviço da Advise, o Usuário deverá entrar em contato com a Advise para
					solicitar a emissão e de um novo boleto, com a quitação das eventuais pendências
					remanescentes.{'\n'}
					Existindo pagamento do boleto de cobrança com atraso inferior há 20 (vinte) dias, a
					liberação do acesso às publicações e andamentos processuais se dará no 2º (segundo) dia
					útil subsequente ao pagamento. Seu contrato será renovado ao final do período, mediante
					assinatura de novo contrato, a menos que não seja realizado o pagamento mensal, o que
					ocasionará a finalização da prestação de serviço. O cancelamento entrará em vigor no dia
					seguinte à inativação.{'\n'}A Advise poderá alterar o preço das Assinaturas, do Período
					Pré-pago (para períodos que ainda não foram pagos), informando quaisquer alterações de
					preço ao Usuário de maneira prévia. A vigência e prazo do contrato estão estabelecidos no
					Termo de Contratação e Adesão.{'\n'}O Usuário utilizará os serviços da Advise pelo período
					mínimo contratado, estando sujeito à multa de 20% (vinte por cento) do saldo faltante, em
					caso de rescisão antecipada do contrato. A multa será cobrada proporcionalmente aos meses
					restantes para o término do período de serviço contratado, de acordo com o valor
					negociado.
				</S.TermsText>
			</>
		),
		dissatisfaction: (
			<>
				<S.TermsTextBold>10 INSATISFAÇÃO</S.TermsTextBold>
				<S.TermsText>
					Caso ocorra, por algum motivo, qualquer insatisfação com nossos serviços, solicitamos que
					entre em contato através de qualquer meio de comunicação que disponibilizamos, a fim de
					dirimir toda e qualquer dúvida, e/ou aborrecimento.
				</S.TermsText>
			</>
		),
		license: (
			<>
				<S.TermsTextBold>11 DA LICENÇA DE USO TEMPORÁRIO DO SOFTWARE</S.TermsTextBold>
				<S.TermsText>
					A Advise é detentora exclusiva do "Hub” e detentora de todos os direitos autorais
					(Software e suas marcas), podendo usar, fruir, gozar e dispor do referido bem,
					especialmente para incremento tecnológico, alteração de versões, acordos comerciais,
					campanhas promocionais, dentre outras funcionalidades ou serviços que possam ser
					agregados, tanto de forma onerosa, quanto gratuita, conforme direito de propriedade que
					lhe confere a Lei nº 9.608/1.998.{'\n'}O direito de propriedade não será transferido,
					cedido ou vendido a qualquer pessoa, que sempre será da titularidade da Advise, seja na
					sua versão original, seja nas sucessivas e posteriores versões que venham a ser
					desenvolvidas e que sejam disponibilizadas para o Usuário.{'\n'}O Advise "Hub”
					desenvolvidos pela Advise não são em hipótese alguma vendido, sendo somente licenciados
					para uso do Usuário.{'\n'}
					Eventual infração aos direitos autorais implicará em indenização na forma da lei pelos
					danos causados, seja ela realizada diretamente pelo Usuário, seja ela realizada por
					qualquer de seus prepostos, terceiros ou qualquer pessoa que tiver acesso ao Advise "Hub”
					por meio do Usuário.
				</S.TermsText>
			</>
		),
		foro: (
			<>
				<S.TermsTextBold>12 FORO</S.TermsTextBold>
				<S.TermsText>
					As partes elegem o Foro da Comarca de Londrina, Estado do Paraná para solucionar qualquer
					disputa, reivindicação ou controvérsia que surja em relação ao presente termo, bem como
					quaisquer disputas, reivindicações não contratuais que surjam em virtude de, ou em relação
					a eles.
				</S.TermsText>
			</>
		),
		customerService: (
			<>
				<S.TermsTextBold>13 ATENDIMENTO AO CLIENTE</S.TermsTextBold>
				<S.TermsText>
					Se o Usuário tiver dúvidas relacionadas aos serviços da Advise quanto à funcionalidades,
					pacotes, valores, ou qualquer outra hipótese entre em contato com o atendimento ao cliente
					da Advise, ou acesse nosso site.{'\n'}A utilização do sistema implica em plena aceitação
					dos termos aqui previstos.{'\n'}
					Agradecemos pela leitura do nosso Termo de Uso. Esperamos que o Usuário aproveite nossa
					plataforma jurídica!{'\n'}
				</S.TermsText>
			</>
		),
	};

	const handleAccept = () => {
		dispatch(AuthActions.termsUseRequest(true));
	};

	const checkRedirect = useCallback(() => {
		if (!!redirect) {
			dispatch(AuthActions.termsUseSuccess(false, false));
			props.navigation.dispatch(StackActions.replace('Login'));
			return;
		}
	}, [redirect]);

	const checkAcceptTerms = useCallback(() => {
		if (acceptTerms) {
			props.navigation.dispatch(StackActions.push('App'));
		}
	}, [acceptTerms]);

	useEffect(() => {
		checkRedirect();
		checkAcceptTerms();
	}, [acceptTerms, redirect]);

	const disabledButton = useMemo(() => !acceptCheck, [acceptCheck]);

	return (
		<View style={{flex: 1}}>
			<S.Container>
				<S.ContentWrapper>
					<S.Title>Licença de uso de software</S.Title>
					<S.Subtitle>Atualizado em 15/12/2021</S.Subtitle>
					<S.TextWrapper>
						{data.header}
						{data.definitions}
						{data.intro}
						{data.changes}
						{data.services}
						{data.guidelines}
						{data.privacy}
						{data.maintenance}
						{data.support}
						{data.policies}
						{data.dissatisfaction}
						{data.license}
						{data.foro}
						{data.customerService}
					</S.TextWrapper>
					<S.AcceptTermsWrapper scheme={colorScheme}>
						<S.TermsText color={colors.white}>Li e aceito os Termos de Uso.</S.TermsText>
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
							style={{width: 18, height: 18, marginRight: 12}}
						/>
					</S.AcceptTermsWrapper>
					<S.AcceptButton
						onPress={handleAccept}
						activeOpacity={0.7}
						disabled={disabledButton || loadingAcceptTerms}>
						<S.AcceptButtonText>Aceitar</S.AcceptButtonText>
					</S.AcceptButton>
				</S.ContentWrapper>
			</S.Container>
		</View>
	);
};

export default TermsUse;
