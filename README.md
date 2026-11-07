# 🔬 Simulador de Placa de Petri (Jogo da Vida de Conway)

Simulador web interativo da evolução de uma população de células em uma placa de Petri (grade bidimensional), baseado no clássico autômato celular **Jogo da Vida de Conway**. 

Projeto acadêmico desenvolvido para a disciplina de **Programação Web** do curso de Engenharia de Computação da **Universidade Federal de Santa Catarina (UFSC - Campus Araranguá)**.

---

## 🧬 Regras de Evolução Celular

O simulador opera em uma grade bidimensional finita de dimensão configurável ($N \times N$), onde cada célula assume o estado **Viva** ou **Morta** e interage com suas $8$ células vizinhas (horizontais, verticais e diagonais). As transições ocorrem simultaneamente a cada geração seguindo quatro regras estritas:

1. **Sobrevivência:** Uma célula viva com $2$ ou $3$ vizinhas vivas permanece viva na próxima geração.
2. **Morte por Isolamento:** Uma célula viva com menos de $2$ vizinhas vivas ($< 2$) morre por falta de interação.
3. **Morte por Superpopulação:** Uma célula viva com mais de $3$ vizinhas vivas ($> 3$) morre por escassez de recursos.
4. **Nascimento:** Uma célula morta com exatamente $3$ vizinhas vivas torna-se viva na próxima geração.

> **Simultaneidade e Tratamento de Bordas:** O motor lógico utiliza o conceito de **dupla matriz** (uma matriz de leitura para a geração atual e uma matriz limpa de escrita para a próxima geração), garantindo que o cálculo de uma célula não interfira nas demais da mesma geração. As bordas são tratadas como limites finitos (bordas opostas desconectadas).

---

## ✨ Funcionalidades

### Requisitos Principais
* **RF01 - Exibição da Grade:** Interface gráfica em CSS Grid distinguindo visualmente células vivas (amarelas) e mortas (cinzas).
* **RF02 - Configuração e Edição de Células:** Permite ativar ou desativar células clicando diretamente na grade antes de iniciar ou com a simulação pausada.
* **RF03 - Evolução Automática:** Comando para iniciar a progressão contínua das gerações via temporizador assíncrono.
* **RF04 - Pausar e Continuar:** Interrompe a execução automática preservando o estado exato da matriz para retomada ou edição.
* **RF05 - Evolução Passo a Passo:** Avança exatamente $+1$ geração por clique, facilitando a depuração e a análise do algoritmo.
* **RF06 - Reiniciar:** Limpa a placa de Petri e zera os contadores para iniciar um novo experimento.
* **RF07 - Contador de Gerações:** Exibição reativa do número de iterações acumuladas.
* **RF08 - Contagem de Células Vivas:** Cálculo automático em tempo real da população ativa na placa.

### Diferenciais e Melhorias Implementadas
* **📊 Painel Lateral de Telemetria:** Dashboard em tempo real exibindo total de iterações, células vivas, células mortas, além da taxa de natalidade (células que nasceram na última iteração) e mortalidade (células que morreram na última iteração).
* **🛑 Parada Automática Inteligente:** O algoritmo detecta automaticamente quando a colônia atinge a **extinção** ($0$ células vivas) ou a **estabilização estática** ($0$ nascimentos e $0$ mortes na transição), pausando o relógio e notificando o usuário.
* **⚙️ Rota Dedicada de Configuração (`/configuracao`):** Página exclusiva gerenciada pelo `vue-router` para redimensionamento dinâmico da matriz (de $5 \times 5$ até $50 \times 50$, com valor padrão $10 \times 10$).

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:** Vue.js 3 (Composition API, `ref`, `computed`, `watch`), Vue Router 4, HTML5, CSS3 (Grid & Flexbox)
* **Build Tool / Bundler:** Vite
* **Back-end:** Node.js, Express.js (Hospedagem e entrega dos arquivos estáticos compilados)

---

## 📂 Estrutura de Pastas

```text
simulador-placa-petri-vue/
├── server.js                      # Servidor Node.js/Express que hospeda o build do front-end
├── package.json                   # Dependências e scripts do servidor Express
└── frontend/                      # Aplicação Front-end (Vue 3 + Vite)
    ├── index.html                 # Ponto de entrada HTML
    ├── package.json               # Dependências do Vue, Vue Router e Vite
    ├── vite.config.js             # Configurações do empacotador Vite
    └── src/
        ├── main.js                # Inicialização do Vue e conexão com o roteador
        ├── style.css              # Estilos globais e reset CSS
        ├── App.vue                # Layout base e barra de navegação entre rotas
        ├── router.js              # Definição das rotas (/ e /configuracao)
        ├── petriLogic.js          # Motor matemático isolado (regras de Conway e bordas)
        ├── simulacaoStore.js      # Estado global reativo compartilhado entre páginas
        └── views/
            ├── SimuladorView.vue      # Tela principal (Grade + Controles + Painel Lateral)
            └── ConfiguracaoView.vue   # Tela dedicada para ajuste de dimensão da matriz
```

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) instalado em sua máquina.

### 2. Instalação das Dependências
Clone o repositório e instale os pacotes tanto da raiz (servidor Express) quanto da pasta `frontend` (aplicação Vue):

```bash
# 1. Instale as dependências do servidor Express (na raiz do projeto)
npm install

# 2. Entre na pasta do front-end e instale as dependências do Vue/Vite
cd frontend
npm install
```

### 3. Executando em Modo de Produção (Servidor Node.js + Express)
Conforme especificado nos requisitos da disciplina, o servidor Express serve a aplicação front-end compilada:

```bash
# 1. Dentro da pasta frontend, gere os arquivos otimizados de produção (pasta dist)
npm run build

# 2. Volte para a pasta raiz do projeto e inicie o servidor Express
cd ..
node server.js
```

Abra o navegador e acesse: **`http://localhost:3000`**

### 4. Executando em Modo de Desenvolvimento (Opcional - Hot Reload)
Caso queira editar os componentes `.vue` com atualização instantânea na tela durante o desenvolvimento:

```bash
cd frontend
npm run dev
```

---

## 👥 Equipe Desenvolvedora
* Pablo da Rosa Pimentel
* Kaio
* Saymon