# Configurar Google Ads Tag (AW) e Conversões

## Objetivo
Configurar rastreamento de conversões no Google Ads para medir leads reais.

## Onde achar o ID AW
1. Acesse `https://ads.google.com`.
2. Vá em **Metas > Conversões**.
3. Clique em **Configurar tag** (ou Google tag).
4. Copie o ID no formato `AW-XXXXXXXXX`.

## Configuração recomendada (via GTM)
1. Tag `Conversion Linker` (All Pages).
2. Tag `Google Ads Conversion Tracking` para cada conversão:
   - Lead WhatsApp
   - Clique Instagram
   - Clique Maps
3. Em cada tag, preencher:
   - Conversion ID: `AW-...`
   - Conversion Label: fornecido na ação de conversão

## Triggers sugeridos
- WhatsApp: `Click URL contains wa.me`
- Instagram: `Click URL contains instagram.com/dradaianaferrazsc`
- Maps: `Click URL contains google.com/maps`

## Boas práticas
- Marcar `Lead WhatsApp` como conversão primária.
- Definir janela de conversão de 30 dias (inicial).
- Revisar correspondência com campanhas de busca mensalmente.

## Checklist final
- [ ] ID `AW-...` configurado
- [ ] Tags de conversão publicadas no GTM
- [ ] Conversões aparecendo no Google Ads
