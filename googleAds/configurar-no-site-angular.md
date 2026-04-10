# Configurar no Site Angular (este projeto)

## Objetivo
Garantir que o site está preparado para GTM/GA4/Ads e eventos de lead.

## O que já foi implementado
- ✅ GTM `GTM-PG7CRPC7` inserido no `<head>` do `index.html` (snippet JS + noscript iframe).
- ✅ GA4 `G-7T08P5CXYW` carregado diretamente via `gtag.js` no `index.html` — `window.gtag` sempre definido.
- ✅ `mini-analytics.component.ts` — listener global de cliques, envia eventos para `window.gtag` E `window.dataLayer`.
- ✅ Botão WhatsApp CTA no hero com `data-track="cta_whatsapp_hero"` — gera evento `generate_lead`.
- ✅ 24+ elementos com `data-track` em todo o site.
- ✅ SEO técnico reforçado (meta tags, OG, JSON-LD, hreflang).
- ✅ `analytics.googleTagId: 'G-7T08P5CXYW'` em `site-config.ts`.

## Arquivos principais
- `src/index.html` — GTM snippet + gtag.js direto
- `src/app/components/mini-analytics/mini-analytics.component.ts` — lógica de tracking
- `src/app/config/site-config.ts` — IDs e configurações
- `src/app/components/hero/hero.component.ts` — CTA WhatsApp hero

## Eventos rastreados automaticamente
| `data-track` / href | Evento GA4 | Categoria |
|---|---|---|
| `*whatsapp*` | `generate_lead` | lead |
| `href` com `wa.me` | `generate_lead` | lead |
| `*phone*` | `generate_lead` | lead |
| `*route*` | `route_click` | location |
| `*uber*` | `uber_click` | location |
| `social_*` | `social_click` | social |
| `*email*` | `contact_click` | contact |
| outros | `engagement_click` | engagement |

## O que ainda precisa ser feito
1. **GTM**: publicar tags GA4 + Conversion Linker + Google Ads (ver `configurar-gtm.md`).
2. **GA4**: confirmar eventos no painel Realtime e marcar `generate_lead` como conversão (ver `configurar-ga4.md`).
3. **Google Ads**: configurar ID `AW-...` e rótulos de conversão (ver `configurar-google-ads.md`).
4. **Search Console**: verificar propriedade `https://wesleyzilva.github.io/dradaianaferraz_gold/`.

## Teste rápido pós-publicação GTM
1. Abrir GTM Preview → entrar no site publicado.
2. Clicar em: botão WhatsApp (hero + location), link Instagram, rota no Maps.
3. Confirmar eventos `generate_lead` e `social_click` no GA4 Realtime.

## Checklist final
- ✅ GTM snippet no HTML
- ✅ `gtag.js` GA4 carregado diretamente
- ✅ `G-7T08P5CXYW` configurado
- ✅ CTA WhatsApp hero com `data-track`
- [ ] GTM container publicado com tags GA4 + Conversion Linker
- [ ] Google Ads `AW-...` configurado no GTM
- [ ] Conversões visíveis em GA4 e Google Ads
- [ ] Search Console verificado
