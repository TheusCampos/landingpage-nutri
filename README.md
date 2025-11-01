# Projeto Nutricionista — Site Institucional

Este repositório contém um site estático responsivo para apresentação de serviços de nutrição, depoimentos de pacientes, galeria de imagens e vídeos, além de seções informativas e formulário de contato. O foco é performance, acessibilidade e uma experiência moderna em dispositivos móveis e desktop.

## 1. Introdução

- Objetivo principal
  - Divulgar serviços de nutrição e bem-estar, destacar resultados (depoimentos, antes/depois), e facilitar o agendamento de consultas.
- Tecnologias utilizadas
  - Frontend: HTML5, CSS3, JavaScript (vanilla)
  - Bibliotecas/CDNs: Google Fonts, Font Awesome, AOS (Animate On Scroll)
  - Backend: não há (site estático)
  - Banco de dados: não há
- Ambiente de desenvolvimento
  - Windows (projeto validado), mas funciona em qualquer OS que sirva arquivos estáticos.
  - Servidor estático opcional: Python HTTP Server, ou qualquer servidor simples (ex.: `npx serve`, Live Server).

## 2. Processo de Desenvolvimento

- Estrutura de pastas e arquivos principais

```text
Projeto-nutricionista/
├─ assets/
│  ├─ captions/            # Legendas WEBVTT para vídeos
│  │  ├─ video1.vtt
│  │  ├─ video2.vtt
│  │  ├─ video3.vtt
│  │  └─ video4.vtt
│  ├─ css/
│  │  └─ style.css         # Estilos principais (variáveis, grids, animações, utilitários)
│  ├─ img/
│  │  └─ Dr-nutri-morango.png
│  └─ js/
│     └─ main.js           # Scripts (menu mobile, AOS init, lightbox, rotação de grids)
└─ index.html              # Página principal e marcação semântica
```

- Dependências instaladas
  - Nenhuma dependência via `npm` é necessária; bibliotecas são carregadas via CDN.
  - Opcional: Python 3.x para rodar o servidor local.

- Passos para configuração do ambiente
  1) Clonar/copiar o repositório
  2) Rodar um servidor estático (exemplos abaixo)
  3) Abrir o navegador em `http://localhost:8000/`

- Desafios encontrados e soluções implementadas
  - Responsividade e qualidade de imagens: uso de `<picture>` com `srcset` e `sizes`, atributos `loading="lazy"`, `decoding="async"` e dimensões (`width`/`height`) para reduzir Layout Shift.
  - Carrossel de texto contínuo: animação CSS suave, itens duplicados para loop sem cortes e respeito a `prefers-reduced-motion`, com opção de forçar animação via `data-force-motion="true"`.
  - Depoimentos: migração de slider para grid responsivo de cards (texto + antes/depois + vídeo), com lightbox acessível e vídeos com legendas WEBVTT.
  - Performance: rotação infinita de cards apenas quando visíveis (IntersectionObserver), `preload="none"` em vídeos, poster estático, e pausa ao hover.
  - CORS/ORB em imagens externas: uso de `referrerpolicy="no-referrer"` e `crossorigin="anonymous"`; recomendação de mover mídias para `assets/img/` no ambiente de produção.

## 3. Funcionamento do Sistema

- Fluxo principal de funcionamento
  - Header com navegação e menu mobile
  - Hero com imagem responsiva e mensagem
  - Divisor com carrossel de texto contínuo (marquee suave)
  - Sobre mim (conteúdo e estatísticas)
  - Serviços (blocos com imagem + texto)
  - Depoimentos (grid de cards: texto, antes/depois, vídeo)
  - Galeria separada (imagens e vídeos em grids distintos com rotação contínua)
  - Contato (formulário básico)

- Interação entre componentes
  - `assets/js/main.js` cuida de:
    - Inicialização do AOS
    - Menu mobile (abrir/fechar, acessível ao teclado)
    - Efeito de cabeçalho ao scroll
    - Lightbox acessível para imagens de depoimentos
    - Rotação infinita de cards com fade e pausa ao hover (aplicado a `.media-grid[data-rotate="true"]`)

- APIs consumidas ou criadas
  - Não há APIs próprias. Algumas mídias exemplificativas são carregadas de domínios externos (Unsplash, Samplelib, YouTube/iframe em certas seções).

- Processos automatizados
  - Rotação de cards (grids de mídia) é automatizada via intervalo controlado em JS, somente enquanto o grid estiver visível (IntersectionObserver).
  - AOS aplica animações na entrada dos elementos (on scroll).

## 4. Instruções de Uso

- Como executar o projeto localmente

```bash
# Usando Python (recomendado pela simplicidade)
python -m http.server 8000
# Acesse: http://localhost:8000/
```

```bash
# Alternativa com Node (sem instalação global)
npx serve . -p 8000
# Acesse: http://localhost:8000/
```

- Variáveis de ambiente necessárias
  - Não há variáveis de ambiente obrigatórias; é um site estático.

- Comandos importantes
  - Iniciar servidor local: `python -m http.server 8000`
  - Ajustar velocidade da rotação de cards:

```js
// assets/js/main.js
const TRANSITION_MS = 300;   // duração do fade
const INTERVAL_MS  = 2500;   // tempo entre rotações
```

- Exemplos de código
  - Imagens responsivas com `<picture>`

```html
<picture>
  <source type="image/webp"
          srcset="img/foto-320.webp 320w, img/foto-640.webp 640w"
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 320px">
  <img src="img/foto-640.jpg" alt="Descrição descritiva" loading="lazy" decoding="async" width="320" height="210">
</picture>
```

  - Carrossel de texto contínuo

```css
.text-carousel .carousel-inner {
  display: flex;
  gap: 40px;
  padding: 14px 0;
  animation: carousel-scroll 22s linear infinite;
}
@keyframes carousel-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
/* Forçar animação quando necessário */
.text-carousel[data-force-motion="true"] .carousel-inner {
  animation: carousel-scroll 22s linear infinite !important;
}
```

  - Rotação de cards com fade (JS)

```js
const grids = document.querySelectorAll('.media-grid[data-rotate="true"]');
const TRANSITION_MS = 300; // fade
const INTERVAL_MS  = 2500; // intervalo

function rotateOnce(grid) {
  const first = grid.firstElementChild;
  if (!first) return;
  first.classList.add('fade-out');
  setTimeout(() => {
    grid.appendChild(first);
    first.classList.remove('fade-out');
  }, TRANSITION_MS);
}

function initRotatingGrid(grid) {
  let timer = null;
  const start = () => { timer = setInterval(() => rotateOnce(grid), INTERVAL_MS); };
  const stop  = () => { clearInterval(timer); timer = null; };
  grid.addEventListener('mouseenter', stop);
  grid.addEventListener('mouseleave', start);
  start();
}

grids.forEach(initRotatingGrid);
```

## 5. Considerações Finais

- Melhorias planejadas
  - Migrar todas as imagens externas para `assets/img/` com versões otimizadas (WebP + fallback JPEG) para evitar bloqueios externos.
  - Adicionar agendamento integrado (API/Backend) e persistência de dados (ex.: Firebase ou um backend Node/Express com DB relacional/noSQL).
  - Testes de acessibilidade (axe, Lighthouse) e automação de build/otimização (minificação, cache busting).
  - Melhorar SEO (metatags, schema.org) e Analytics.

- Observações relevantes
  - Em ambientes com “Reduzir Animações” ativado (`prefers-reduced-motion`), animações são minimizadas por acessibilidade. Se desejar manter animações, use o atributo `data-force-motion="true"` nos componentes.
  - Para evitar erros de carregamento (CORS/ORB) em mídia externa, prefira hospedar os arquivos localmente.
  - O projeto é estático e não requer instalação de dependências; um servidor de arquivos é suficiente para testar.

---

Para dúvidas ou ajustes, sinta-se à vontade para abrir uma issue ou solicitar melhorias específicas (ex.: trocar imagens, ajustar velocidades, adicionar novas seções).