# Landing Page — Dra. Daiana Ferraz

Landing page de conversão para a clínica da Dra. Daiana Ferraz, especialista em odontologia estética e harmonização facial.

**Desenvolvimento:** Wesley Silva

## Objetivo de negócio

Converter visitantes (vindos de Google Ads ou busca orgânica) em pacientes via clique direto no WhatsApp.  
Cada clique no botão WhatsApp é registrado como conversão no Google Ads, fechando o ciclo anúncio → site → agendamento.

## Como os dois projetos funcionam juntos

```
Google Ads
    └─► Landing page (este repo)          ← paciente vê e clica no WhatsApp
             └─► Conversão AW registrada  ← gtag dispara no clique

WhatsappSenderHttp (repo irmão)
    └─► 01_gerar_lista.py                 ← monta CSV com pacientes da base
    └─► 02_sender.js                      ← envia mensagens personalizadas
    └─► 04_gerar_customer_match.py        ← exporta emails/fones para Google Ads
             └─► Customer Match no Google Ads ← retargeting da base de pacientes
```

O site atrai novos leads. O sender reativa pacientes já cadastrados. O Customer Match fecha o loop fazendo Google Ads alcançar a própria base da clínica.

## Publicação

| Ambiente | URL | Comando |
|---|---|---|
| GitHub Pages (atual) | https://wesleyzilva.github.io/dradaianaferraz_gold/ | `npm run deploy` |
| Domínio próprio (futuro) | https://dradaianaferraz.com.br | `npm run deploy:domain` |

> Para ativar o domínio próprio: renomear `public/CNAME.pending` → `public/CNAME` e executar `npm run deploy:domain`.

## Rastreamento configurado

| Ferramenta | ID | Finalidade |
|---|---|---|
| Google Tag Manager | `GTM-PG7CRPC7` | Contêiner central de tags |
| Google Analytics 4 | `G-7T08P5CXYW` | Comportamento do visitante |
| Google Ads | `AW-10874062456` | Conversões de clique no WhatsApp |

Label de conversão: `ijghCNfp2pkcEPiMlMEo` — disparado via `mini-analytics.component.ts` em todo clique em elemento com `data-track` contendo `whatsapp`.

## Comandos essenciais

```bash
ng serve          # dev local em localhost:4200
npm run deploy    # build + deploy para GitHub Pages
ng build          # build apenas (dist/)
```

**Stack:** Angular 21 · SCSS · angular-cli-ghpages
