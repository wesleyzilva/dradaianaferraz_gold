# Configurar GTM (Google Tag Manager)

## Objetivo
Configurar o container GTM no site e deixá-lo pronto para disparar eventos de marketing.

## ID do seu container
- Container informado: `GTM-PG7CRPC7`

## Passo a passo
1. Acesse o GTM e entre no container `GTM-PG7CRPC7`.
2. Vá em **Workspace** e confirme se está no ambiente correto.
3. Clique em **Preview** para testar conexões.
4. Abra seu site: `https://wesleyzilva.github.io/dradaianaferraz_gold/`.
5. Verifique se o evento `gtm.js` aparece no painel de debug.
6. Clique em **Submit** para publicar o container.

## Estrutura mínima recomendada no GTM
- Tag: `Google tag - GA4` (All Pages)
- Tag: `Conversion Linker` (All Pages)
- Triggers de clique para WhatsApp, Instagram e Maps
- Eventos custom via `dataLayer` (ex.: `engagement_click`)

## Checklist final
- [ ] `gtm.js` dispara em todas as páginas
- [ ] Container publicado
- [ ] Preview sem erros
