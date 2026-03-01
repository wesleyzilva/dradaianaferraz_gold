# Configurar no Site Angular (este projeto)

## Objetivo
Garantir que o site está preparado para GTM/GA4/Ads e eventos de lead.

## O que já foi implementado
- GTM inserido no HTML com container `GTM-PG7CRPC7`.
- Evento custom de clique enviado para `dataLayer`: `engagement_click`.
- SEO técnico reforçado (meta tags, OG, JSON-LD, hreflang).

## Arquivos principais
- `src/index.html`
- `src/app/components/mini-analytics/mini-analytics.component.ts`
- `src/app/config/site-config.ts`
- `src/app/app.ts`

## O que você precisa preencher
1. Em `src/app/config/site-config.ts`, atualizar:
   - `analytics.googleTagId` com seu `G-...` real.
2. No GTM, publicar as tags de GA4 e Ads.

## Teste rápido pós-publicação
1. Abrir GTM Preview.
2. Entrar no site publicado.
3. Clicar em:
   - botão de WhatsApp
   - link do Instagram
   - rota no Maps
4. Confirmar disparo dos eventos.

## Checklist final
- [ ] `G-...` salvo no `site-config.ts`
- [ ] GTM Preview validado
- [ ] Tags publicadas
- [ ] Conversões visíveis em GA4 e Google Ads
