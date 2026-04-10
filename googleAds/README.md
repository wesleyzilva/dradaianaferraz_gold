# Google Platforms — Hub Central de Rastreamento

Site: `https://wesleyzilva.github.io/dradaianaferraz_gold/`  
Responsável técnico: Wesley Silva  
Atualizado: 2026-04-10

---

## Estado atual (resumo executivo)

| Plataforma | Status | Detalhe |
|---|---|---|
| GTM `GTM-PG7CRPC7` | ✅ Instalado | Snippet no `<head>` + noscript `<body>` |
| GA4 `G-7T08P5CXYW` | ✅ Script direto no HTML | `window.gtag` definido, eventos chegam ao GA4 |
| Google Ads `AW-...` | ⏳ Pendente | ID ainda não configurado |
| Search Console | ⏳ Pendente | Propriedade não verificada |
| GTM — Tags publicadas | ⏳ Pendente | Container vazio, publicação necessária |

---

## Arquivos por plataforma

| Arquivo | Plataforma |
|---|---|
| [configurar-gtm.md](./configurar-gtm.md) | Google Tag Manager |
| [configurar-ga4.md](./configurar-ga4.md) | Google Analytics 4 |
| [configurar-google-ads.md](./configurar-google-ads.md) | Google Ads (conversões) |
| [configurar-no-site-angular.md](./configurar-no-site-angular.md) | Código Angular — o que está feito no site |
| [desejocampanhasGoogleAds.md](./desejocampanhasGoogleAds.md) | Planejamento de campanhas |

---

## Ordem de execução recomendada

```
1. GA4 (analytics.google.com)
   └─ Confirmar fluxo Web ativo com ID G-7T08P5CXYW
   └─ Marcar generate_lead como conversão

2. Google Ads (ads.google.com)
   └─ Criar ação de conversão "Lead WhatsApp"  → copiar AW-... e Rótulo
   └─ Criar ação "Clique Instagram"            → copiar Rótulo
   └─ Criar ação "Clique Maps"                 → copiar Rótulo

3. GTM (tagmanager.google.com) — container GTM-PG7CRPC7
   └─ Tag: Google tag GA4 (All Pages) com G-7T08P5CXYW
   └─ Tag: Conversion Linker (All Pages)
   └─ Tag: Google Ads Conversion — Lead WhatsApp
   └─ Tag: Google Ads Conversion — Instagram
   └─ Tag: Google Ads Conversion — Maps
   └─ Publicar container

4. Search Console (search.google.com/search-console)
   └─ Adicionar propriedade URL: https://wesleyzilva.github.io/dradaianaferraz_gold/
   └─ Verificar via tag HTML ou GTM
   └─ Enviar sitemap: /dradaianaferraz_gold/sitemap.xml
```

---

## IDs configurados no site

| ID | Onde está | Para que serve |
|---|---|---|
| `GTM-PG7CRPC7` | `src/index.html` | Container de todas as tags |
| `G-7T08P5CXYW` | `src/index.html` + `src/app/config/site-config.ts` | GA4 Analytics |
| `AW-XXXXXXXXX` | ⏳ a preencher | Google Ads conversões |

---

## Eventos rastreados automaticamente pelo site

O componente `mini-analytics` captura todos os cliques e envia para GA4 via `window.gtag` E `window.dataLayer`:

| Ação do usuário | Evento GA4 | Categoria |
|---|---|---|
| Botão WhatsApp (qualquer) | `generate_lead` | lead |
| Link `wa.me` sem data-track | `generate_lead` | lead |
| Botão/link telefone | `generate_lead` | lead |
| Link Instagram | `social_click` | social |
| Rota Google Maps | `route_click` | location |
| Solicitar Uber | `uber_click` | location |
| E-mail | `contact_click` | contact |
| Outros links/botões | `engagement_click` | engagement |

---

## Checklist geral

- ✅ GTM snippet instalado no HTML
- ✅ GA4 carregado diretamente (window.gtag definido)
- ✅ Evento generate_lead disparado em todos os botões WhatsApp
- ✅ CTA WhatsApp no hero com data-track="cta_whatsapp_hero"
- ✅ 24+ elementos com data-track no site
- [ ] GTM container publicado (tags GA4 + Conversion Linker + Ads)
- [ ] Google Ads ID AW-... configurado
- [ ] Conversões visíveis em GA4 Realtime
- [ ] Conversões visíveis em Google Ads
- [ ] Search Console verificado e sitemap enviado
