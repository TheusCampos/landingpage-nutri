# Projeto Nutricionista — Site estático

## Funcionamento

- Propósito: apresentar serviços de nutrição com foco em bem-estar, gerar confiança e incentivar o agendamento de consultas.
- Principais funcionalidades:
  - Layout totalmente responsivo (mobile, tablet e desktop).
  - Hero com chamada para ação (CTA) e imagem otimizada.
  - Divisor com carrossel de texto contínuo entre Hero e Sobre.
  - Seção “Sobre” com destaques e estatísticas.
  - Consultas/Serviços com imagens otimizadas e layout equilibrado.
  - Depoimentos em grid com cards: texto, comparação antes/depois (lightbox) e vídeo incorporado.
  - Formulário de contato simples (alerta de envio) e botão flutuante do WhatsApp.
  - Animações suaves via AOS (Animate On Scroll).
  - Otimizações de mídia: WebP/JPEG com `srcset`/`sizes`, `loading="lazy"`, `decoding="async"`.
- Fluxo básico de navegação:
  - Header → Hero → Carrossel de texto → Sobre → Consultas/Serviços → Benefícios → Depoimentos → Contato.

## Estrutura

- Componentes principais (em `index.html`):
  - Header e menu de navegação.
  - Hero (título, subtítulo, CTA, contadores, imagem).
  - Divisor com carrossel de texto.
  - Sobre (texto, destaque, estatísticas, imagem).
  - Consultas/Serviços (blocos com textos e imagens).
  - Benefícios (lista e CTA).
  - Depoimentos (grid de cards com imagens e vídeo, lightbox).
  - Contato (formulário).
- Organização de diretórios:
  - `index.html` — página principal e estrutura do conteúdo.
  - `assets/css/style.css` — estilos globais, paleta via variáveis CSS, utilitários de imagem, responsividade, grid de depoimentos e lightbox.
  - `assets/js/main.js` — inicialização do AOS, menu mobile, efeito do header no scroll, formulário de contato e lógica do lightbox.
  - `assets/img/Dr-nutri-morango.png` — imagem local do Hero (demais imagens podem ser externas/otimizadas).
- Tecnologias utilizadas:
  - HTML5, CSS3, JavaScript (sem build).
  - AOS (CDN), Font Awesome (CDN), Google Fonts (Playfair Display).

### Estrutura de arquivos (árvore)

```
Projeto-nutricionista/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── Dr-nutri-morango.png
└── README.md
```

### Mapa rápido por seção e classes principais

- Header: `.header-container`, `.nav-links`, `.mobile-menu`
- Hero: `.hero`, `.hero-container`, `.hero-content`, `.hero-image`, `.hero-title`, `.hero-subtitle`, `.btn`
- Divisor/Carrossel: `.section-divider`, `.text-carousel`, `.carousel-inner`, `.carousel-item`
- Sobre: `.about`, `.about-container`, `.about-content`, `.about-highlight`, `.about-stats`, `.stat-item`, `.stat-number`, `.stat-text`
- Serviços: `.services-extended`, `.service-block`, `.service-text`, `.service-image`
- Benefícios: `.benefits` (seção) e `.benefits-btn` (botão)
- Depoimentos: `.testimonials`, `.testimonials-grid`, `.testimonial-card`, `.before-after`, `.testimonial-video`, `.lightbox` (overlay), `.lightbox-close`, `.lightbox-caption`
- Contato: `.contact`, `.contact-container`, `.contact-form`

### CSS e JS principais

- CSS:
  - Variáveis: `:root` com `--verde-vibrante`, `--verde-medio`, `--verde-profundo`, `--verde-escuro`, `--branco`.
  - Responsividade: media queries em `992px` (tablet) e `576px` (mobile).
  - Carrossel: `@keyframes carousel-scroll`, fallback para `prefers-reduced-motion` e atributo `data-force-motion` para forçar animação quando necessário.
  - Depoimentos: grid de 3/2/1 colunas, hover sutil, bloco antes/depois e lightbox com fade.
- JavaScript (assets/js/main.js):
  - `AOS.init()` — animações de entrada.
  - Menu mobile — alterna `.nav-links.active` e `aria-expanded`.
  - Formulário de contato — alerta de envio e `reset()`.
  - Efeito no header — padding e sombra conforme scroll.
  - Lightbox — abre imagens (via `.lightbox-trigger`), fecha com botão/fundo/ESC, mantém foco acessível e legenda via `data-caption`.

## Como Usar

- Requisitos:
  - Navegador moderno.
  - Conexão com internet (para CDNs e imagens externas).
  - Opcional: servidor local para desenvolvimento.
- Execução:
  - Opção 1 (mais simples): abrir `index.html` diretamente no navegador.
  - Opção 2 (servidor local):
    - Python (Windows): `py -m http.server 8000`
    - Python (Linux/macOS): `python3 -m http.server 8000`
    - Node.js: `npx serve . -p 8000`
- Personalização básica:
  - Textos e rótulos: editar diretamente em `index.html`.
  - Imagens: usar formatos WebP quando possível, manter `alt` descritivo e `srcset/sizes` para responsividade.
  - Vídeos: substituir as URLs dos iframes (YouTube/Vimeo); manter `loading="lazy"`.
  - Cores: ajustar variáveis em `:root` dentro de `assets/css/style.css`.
- Acessibilidade e desempenho:
  - Garantir `alt` nas imagens e `aria-*` em elementos interativos (lightbox, botões).
  - Lazy loading, `decoding="async"` e `fetchpriority` para priorizar conteúdos críticos.