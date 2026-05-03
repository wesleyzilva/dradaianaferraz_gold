<h1 align="center">Landing Page — Dra. Daiana Ferraz</h1>

<p align="center">
  <em>Closing the attribution loop between paid ad spend and patient acquisition for a dental aesthetics clinic</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21+-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google%20Ads-Integrated-4285F4?style=for-the-badge&logo=googleads&logoColor=white"/>
  <img src="https://img.shields.io/badge/GA4-Tracked-E37400?style=for-the-badge&logo=googleanalytics&logoColor=white"/>
  <img src="https://img.shields.io/badge/Status-Live-27AE60?style=for-the-badge"/>
</p>

**Live:** https://wesleyzilva.github.io/dradaianaferraz_gold/

---

> Conversion-optimised Angular application for a dental aesthetics clinic, engineered to close the attribution gap between paid ad spend and patient acquisition. Every WhatsApp interaction fires a Google Ads conversion event, feeding the algorithm with first-party signal and enabling a measurable, continuously declining cost per lead.

---

## The Problem

Healthcare clinics running Google Ads without a dedicated landing page lose most of their paid traffic to generic website pages — no clear call to action, no tracked conversion, and no feedback signal for the ad algorithm. Every unattributed WhatsApp click is a lead the campaign cannot learn from, inflating cost per acquisition indefinitely.

---

## The Solution

A single-purpose Angular landing page engineered around one goal: converting a visitor into a WhatsApp conversation. The page eliminates friction between ad click and contact by placing trust signals (professional photos, services, reviews) on a single scroll — then firing a Google Ads conversion event the moment the patient taps WhatsApp.

---

## Methodology

```
Google Ads campaign
    └─► Landing page (this repository)
             └─► Patient scrolls: hero → services → social proof → CTA
                      └─► Clicks WhatsApp button (data-track="whatsapp")
                               └─► gtag fires: AW-10874062456 / label ijghCNfp2pkcEPiMlMEo
                                        └─► GA4 records: generate_lead event
                                                 └─► Google Ads optimises bids for more leads

WhatsappSenderHttp (companion repository)
    └─► Reactivates existing patients via WhatsApp
    └─► Exports Customer Match → Google Ads re-targets the clinic's own patient base
```

**Tracking stack:**

| Platform | ID | Role |
|----------|----|------|
| Google Analytics 4 | `G-6M5N30T9FM` | Navigation and engagement analysis |
| Google Ads Conversion | `AW-10874062456` | WhatsApp click attribution |

---

## Results

- Attribution gap closed: every WhatsApp lead is now tied back to its Google Ads campaign
- Algorithm feedback loop active: conversion data flows directly into Smart Bidding
- Companion tool (`whatsappSenderHttp`) exports existing patients as Customer Match, enabling re-targeting of the clinic's own patient base from within Google Ads

---

## Tradeoffs

| Decision | Chosen | Alternative | Rationale |
|----------|--------|-------------|----------|
| Tag management | Direct `gtag.js` | Google Tag Manager | GTM was redundant for a single-goal page; direct integration reduces load time and eliminates a dependency that could delay the conversion event firing |
| Hosting | GitHub Pages | Custom domain (`dradaianaferraz.com.br`) | Zero infrastructure cost during validation phase; reversible — a CNAME swap and one env variable restore the custom domain |
| Framework | Angular | Plain HTML/JS | Angular adds ~300 KB to the initial bundle, but the component model makes future iterations (new services, A/B sections) maintainable without rewriting the page |
| Page structure | Single scroll | Multi-page site | A multi-page site would improve per-URL SEO but fragment the conversion path; a single scroll keeps patient intent focused from ad click to WhatsApp |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 21+, TypeScript, SCSS |
| Analytics | Google Analytics 4 (gtag.js direct) |
| Ads Attribution | Google Ads Conversion Tracking |
| Deployment | GitHub Pages via `angular-cli-ghpages` |
| CI/CD | GitHub Actions |

---

## Getting Started

```bash
npm install
ng serve          # development server → http://localhost:4200/
```

**Deploy to GitHub Pages:**
```bash
npm run deploy:pages
```

**When migrating to custom domain (`dradaianaferraz.com.br`):**  
1. Reverse the 7 URL references in `src/index.html`  
2. Add `CNAME` file to `public/` with content `dradaianaferraz.com.br`  
3. Run `npm run deploy:domain`

<p align="center">
  <img src="https://img.shields.io/badge/Angular-21+-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google%20Ads-Integrated-4285F4?style=for-the-badge&logo=googleads&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google%20Analytics%204-Tracked-E37400?style=for-the-badge&logo=googleanalytics&logoColor=white"/>
  <img src="https://img.shields.io/badge/Status-Live-27AE60?style=for-the-badge"/>
</p>

**Live URL:** https://wesleyzilva.github.io/dradaianaferraz_gold/

---

## The Problem It Solves

Healthcare clinics running Google Ads without a dedicated landing page lose most of their paid traffic to generic website pages with no clear conversion path. Every untracked WhatsApp click is a lead not attributed to the campaign — making it impossible to optimise ad spend.

This project delivers a single-purpose, high-converting landing page that captures patient intent, routes it to WhatsApp, and records every conversion in Google Ads — closing the attribution loop.

---

## Conversion Architecture

```
Google Ads / Organic Search
    └─► Landing page (this repository)
             └─► Patient navigates: hero → services → social proof
                      └─► Clicks WhatsApp
                               └─► Conversion recorded: AW-10874062456
                                        └─► Google Ads optimises for more leads

WhatsappSenderHttp (companion repository)
    └─► reactivates existing patient base
    └─► exports Customer Match → Google Ads re-targets the clinic's own patients
```

---

## Tracking Configuration

| Platform | ID | Purpose |
|----------|----|---------|
| Google Tag Manager | `GTM-PG7CRPC7` | Central tag container |
| Google Analytics 4 | `G-7T08P5CXYW` | Navigation and engagement analysis |
| Google Ads Conversion | `AW-10874062456` | WhatsApp click attribution |

**Conversion label:** `ijghCNfp2pkcEPiMlMEo`  
Trigger: any click on an element with `data-track` containing `whatsapp`.

---

## Tracked Events

| Event | GA4 Name | Trigger |
|-------|----------|---------|
| WhatsApp lead | `generate_lead` | Click on WhatsApp button |
| Route request | `route_click` | Click to open Google Maps |
| Social profile | `social_click` | Instagram, Doctoralia, Google Business |
| Email contact | `contact_click` | Click on email |
| General engagement | `engagement_click` | Any tracked interaction |

---

## Patient Conversion Funnel

```
1. Entry via Google Ads or organic search
2. Hero section — specialist presentation
3. Service sections — dental aesthetics / facial harmonisation
4. Social proof — before/after photos, reviews
5. Location — clinic address and maps link
6. Conversion — WhatsApp click → lead captured
```

---

## Deployment

| Environment | Command | Notes |
|-------------|---------|-------|
| Local development | `ng serve` | http://localhost:4200/ |
| Local build | `ng build` | Output in `dist/` |
| GitHub Pages (current) | `npm run deploy:pages` | Uses base-href `/dradaianaferraz_gold/` |
| Custom domain (pending) | `npm run deploy:domain` | Use only when `dradaianaferraz.com.br` is active |

**Domain configuration:** `public/CNAME.pending` — rename to `public/CNAME` only when the custom domain is ready.

---

## Project Structure

```
src/                 Angular application source
public/              Static assets and build config
public/CNAME.pending Future custom domain configuration
googleAds/           Google Ads briefing and campaign docs
docs/                Project documentation
dist/                Build output
```

---

## Tech Stack

![Angular](https://img.shields.io/badge/Angular%2021-DD0031?style=flat-square&logo=angular&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![Google Tag Manager](https://img.shields.io/badge/GTM-246FDB?style=flat-square&logo=googletagmanager&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white)

---

## Author

**Wesley Gomes da Silva** · IT Manager · Agile Coach · Full-Stack Developer

[GitHub](https://github.com/wesleyzilva) · [LinkedIn](https://www.linkedin.com/in/wesleyzilva/) · [Portfolio](https://wesleyzilva.github.io/portfolioNearshoreWesIA/#hero)

## Finalidade deste projeto

Este repositório existe para transformar tráfego em conversão.

Fluxo principal:

1. O paciente chega ao site por Google Ads, busca orgânica ou link direto.
2. Navega pela landing page e clica no WhatsApp.
3. O clique é registrado como conversão no Google Ads.
4. A clínica recebe o contato para continuar o atendimento.

## Como este projeto se conecta ao outro repositório

```
Google Ads
    └─► Landing page (este repositório)
             └─► clique no WhatsApp
                      └─► conversão registrada no Google Ads

WhatsappSenderHttp (repositório irmão)
    └─► reativa a base de pacientes da clínica
    └─► exporta Customer Match para Google Ads
             └─► Google Ads volta a impactar a própria base
```

Resumo operacional:

- Este projeto capta novos contatos.
- O `whatsappSenderHttp` reativa pacientes já existentes.
- O Customer Match conecta a base da clínica com as campanhas.

## Publicação

### Ambiente atual

- URL atual: `https://wesleyzilva.github.io/dradaianaferraz_gold/`
- Publicação atual: GitHub Pages sem domínio próprio

### Comandos de publicação

| Cenário | Comando | Observação |
|---|---|---|
| Desenvolvimento local | `ng serve` | sobe em `http://localhost:4200/` |
| Build local | `ng build` | gera arquivos em `dist/` |
| Publicar no GitHub Pages | `npm run deploy:pages` | usa `base-href /dradaianaferraz_gold/` |
| Publicar com domínio próprio | `npm run deploy:domain` | usar apenas quando o domínio estiver ativo |

### Regra para domínio próprio

Enquanto o site estiver no GitHub Pages sem domínio, manter:

- `public/CNAME.pending` sem renomear
- publicação via `npm run deploy:pages`

Quando o domínio `dradaianaferraz.com.br` estiver pronto:

1. Renomear `public/CNAME.pending` para `public/CNAME`.
2. Publicar com `npm run deploy:domain`.

## Rastreamento configurado

| Ferramenta | ID | Uso |
|---|---|---|
| Google Tag Manager | `GTM-PG7CRPC7` | container principal de tags |
| Google Analytics 4 | `G-7T08P5CXYW` | análise de navegação |
| Google Ads | `AW-10874062456` | conversão de clique no WhatsApp |

Detalhe importante:

- Label de conversão: `ijghCNfp2pkcEPiMlMEo`
- O evento é disparado quando o clique acontece em elemento com `data-track` contendo `whatsapp`

## Mapa de navegação esperado nas plataformas Google

### Entrada esperada por origem de tráfego

Nas plataformas Google, a leitura esperada é esta:

| Origem | Como deve aparecer | Objetivo |
|---|---|---|
| Google Ads | `google / cpc` ou campanha equivalente | trazer lead novo para a landing |
| Busca orgânica | `google / organic` | captar demanda espontânea |
| Direto | `direct / (none)` | retorno de usuários ou acesso por link direto |

### Caminho esperado dentro da landing page

Como o site é uma landing page de página única, o funil esperado não é uma sequência de várias URLs, mas sim de interações na mesma página.

Fluxo principal esperado:

1. Entrada na landing page.
2. Visualização do bloco principal da hero.
3. Navegação para a área de interesse:
    - harmonização
    - odontologia
4. Consumo das seções de prova e decisão:
    - serviços
    - antes e depois
    - avaliações
    - localização
5. Clique final de contato:
    - WhatsApp
    - telefone
    - rota no Google Maps

### Eventos que devem aparecer no GA4 e GTM

Os principais eventos esperados são:

| Tipo | Evento esperado | Leitura prática |
|---|---|---|
| Lead | `generate_lead` | clique em WhatsApp ou telefone |
| Localização | `route_click` | clique para abrir rota/maps |
| Localização | `uber_click` | clique de deslocamento, se houver |
| Social | `social_click` | clique em Instagram, Doctoralia, Google Business etc. |
| Contato | `contact_click` | clique em e-mail |
| Engajamento | `engagement_click` | interações gerais em links e botões |

Observação importante:

- Todo clique de WhatsApp também deve gerar a conversão do Google Ads em `AW-10874062456/ijghCNfp2pkcEPiMlMEo`.

### Leitura esperada nas campanhas

Em campanhas Google Ads, este é o comportamento esperado:

1. A campanha leva para a landing page.
2. O usuário interage com a seção mais alinhada à intenção dele.
3. O usuário converte principalmente por WhatsApp.
4. O Google Ads registra a conversão de lead.

Sinais que indicam leitura correta:

- campanha gerando sessões na landing
- eventos `generate_lead` aparecendo no GA4
- conversões de Google Ads associadas ao clique em WhatsApp
- interações em `location`, `social` e `engagement` ajudando a entender qualidade do tráfego

## O que validar após publicar

- O site abre pela URL correta do GitHub Pages.
- Links internos carregam sem quebrar rota ou asset.
- O botão de WhatsApp abre corretamente.
- O clique no WhatsApp dispara evento no Google Ads.
- O `base href` usado no deploy corresponde ao ambiente publicado.
- O arquivo `CNAME` não foi enviado por engano enquanto ainda não houver domínio ativo.

## Estrutura relevante

```text
src/                 código da aplicação Angular
public/              arquivos públicos do build
public/CNAME.pending configuração futura de domínio próprio
dist/                saída do build
```

## Stack

Angular 21 · SCSS · angular-cli-ghpages

---

## Big Picture

This landing page is one node in a **closed-loop performance marketing system** for a healthcare clinic. The chain is: paid ad spend → landing page (conversion interface) → WhatsApp interaction → Google Ads conversion event → algorithm receives first-party signal → CPA decreases over time. Without this page, every ad click goes to an attribution-blind generic website, breaking the feedback loop that allows the campaign to self-optimise. This is a **growth infrastructure asset**, not a marketing page.

## Executive Tradeoffs

| Dimension | Decision | Alternative Rejected | Rationale |
|-----------|----------|---------------------|-----------|
| Framework | Angular SPA | Static HTML | Modular components enable future A/B testing, analytics injection, and route-level tracking without full rebuilds |
| Conversion channel | WhatsApp CTA | Contact form | Healthcare leads convert 3–5× higher via synchronous messaging; form → email → reply cycle loses warm intent |
| Attribution layer | Google Ads gTag + GA4 | Meta Pixel | Google Ads-native integration; browser privacy controls impact third-party pixels more severely |
| Hosting | GitHub Pages | Vercel / paid hosting | Zero cost, Git-native CI/CD, custom domain support; sufficient performance for single-page landing traffic |
| Analytics | GA4 event model | Universal Analytics | GA4's event-first model is required for Google Ads conversion import; UA is end-of-life |
