Quiz App — Teen Wolf

Aplicativo de perguntas e respostas sobre a série Teen Wolf, desenvolvido com React Native, TypeScript e Expo. O jogador escolhe o tamanho da partida, responde às perguntas e recebe um resultado baseado em sua porcentagem de acertos.

img src="./assets/img/image.png" alt="Demonstração do aplicativo" width="400" height="auto" />

![Demonstração do aplicativo](./assets/img/video.gif)

Sobre o projeto

O Quiz App possui um banco com 40 perguntas, divididas em categorias como Geral, Sobrenatural, Esportes e Relacionamentos. Cada pergunta apresenta quatro alternativas, a resposta correta e uma explicação.

O aplicativo foi configurado para Android, iOS e Web com Expo Router. Também possui um build para Android gerado pelo EAS Build.

Funcionalidades

Escolha de 5, 10, 15 ou 20 perguntas.

Perguntas organizadas por categorias.

Correção automática e explicação de cada resposta.

Pontuação e barra de progresso durante a partida.

Animação de entrada ao trocar de questão.

Efeito de tremor quando a resposta está incorreta.

Bloqueio das alternativas depois da seleção.

Tela final com quantidade e porcentagem de acertos.

Mensagem personalizada conforme o desempenho.

Botão para jogar novamente.

Funcionalidade Adicional: Partida Personalizada com Feedback Animado

Descrição

A nova funcionalidade permite que o jogador escolha a quantidade de perguntas antes de começar: 5, 10, 15 ou 20. As opções maiores que a quantidade disponível no banco são desabilitadas automaticamente.

Durante a partida, o aplicativo compara o índice da alternativa selecionada com o campo answerIndex da pergunta. Depois da escolha:

As alternativas são bloqueadas para impedir uma segunda resposta.

A alternativa correta recebe um destaque visual.

A alternativa errada selecionada recebe outro estilo.

As demais opções ficam com menor destaque.

O aplicativo informa se a resposta está correta ou incorreta.

A explicação do campo explanation é exibida.

Se houver erro, o cartão executa uma animação de tremor.

Ao carregar uma nova questão, são executadas animações de opacidade e deslocamento vertical. A interface também mostra a categoria, a pontuação e uma barra calculada por:

progresso = (questão atual / total de questões) × 100

No final, a porcentagem de acertos gera uma classificação:

85% ou mais: Fã de verdade.

60% a 84%: Mandou bem.

30% a 59%: Quase lá.

Abaixo de 30%: Vale tentar novamente.

Desafios e Aprendizados

Para implementar essa funcionalidade, foi necessário pesquisar e praticar:

O Hook useState, usado para controlar escolhas e dados da partida.

O Hook useEffect, usado para iniciar animações quando a pergunta ou resposta muda.

O Hook useRef, usado para manter os valores de Animated.Value.

A API Animated, incluindo Animated.timing, Animated.parallel e Animated.sequence.

Renderização condicional para exibir o feedback somente depois da resposta.

Estilos condicionais para diferenciar respostas corretas e incorretas.

Comunicação entre componentes por propriedades e funções como onStart, onOptionPress e onPlayAgain.

Cálculos de porcentagem para o progresso e o resultado final.

Tipagem com TypeScript e organização das perguntas em JSON.

O principal aprendizado foi entender como estados, propriedades e efeitos trabalham juntos. Quando o usuário escolhe uma alternativa, o React Native atualiza automaticamente as cores, o feedback, a pontuação e as animações da tela.

Tecnologias utilizadas

React 19

React Native 0.81

TypeScript

Expo SDK 54

Expo Router

React Native Animated API

EAS Build

Estrutura principal

app/
index.tsx # Controle das telas e estado da partida
components/
StartScreen.tsx # Tela inicial e seleção de perguntas
QuizScreen.tsx # Perguntas, alternativas e animações
QuizScreen.styles.tsx # Estilos da tela do quiz
ResultScreen.tsx # Pontuação e classificação final
data/
questoes.json # Banco de perguntas
assets/
img/ # Imagens, fundo e logotipo

Como executar

Pré-requisitos

Node.js instalado.

Expo Go no celular ou um emulador Android/iOS configurado.

Instalação

npm install

Iniciar o projeto

npx expo start

Depois, use o QR Code no Expo Go ou escolha no terminal a opção para abrir no Android, iOS ou navegador.

Comandos disponíveis

npm start # Inicia o Expo
npm run android # Abre no Android
npm run ios # Abre no iOS
npm run web # Abre no navegador
npm run lint # Analisa a qualidade do código

Build do aplicativo

Acessar o build no Expo
https://expo.dev/accounts/nicolly77/projects/quiz-app/builds/3ab489b3-a382-4c41-9f3b-94a6df2bc653

Autora Nicolly Oliveira

Desenvolvido por NicollyOliveiraS.
