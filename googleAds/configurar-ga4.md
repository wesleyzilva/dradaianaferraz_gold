# Configurar GA4 (Google Analytics 4)

## Objetivo
Conectar o site ao GA4 para medir tráfego e eventos de lead.

## Onde achar o Measurement ID
1. Acesse `https://analytics.google.com`.
2. Vá em **Admin**.
3. Clique em **Fluxos de dados**.
4. Abra o fluxo **Web** do site.
5. Copie o ID de medição no formato `G-XXXXXXXXXX`.

## Configuração no GTM
1. Criar tag **Google tag**.
2. Inserir o ID `G-...`.
3. Trigger: **All Pages**.
4. Publicar container.

## Eventos recomendados para leads
- `generate_lead` (WhatsApp)
- `social_click` (Instagram)
- `view_map` (Google Maps)
- `engagement_click` (evento custom vindo do site)

## Marcar conversões no GA4
1. Admin > Events.
2. Marque como conversão:
   - `generate_lead`
   - `social_click` (opcional)
   - `view_map` (opcional)

## Checklist final
- [ ] ID `G-...` configurado
- [ ] Eventos recebendo no Realtime
- [ ] Conversões marcadas no GA4
