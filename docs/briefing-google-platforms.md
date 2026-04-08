# Briefing de Configuração — Google Platforms
**Dra. Daiana Ferraz · São Carlos/SP**
**Responsável técnico do site:** Wesley Silva · wesley.zilva@gmail.com
**Data:** Abril/2026

---

## 1. Visão Geral do Projeto

Site Angular de landing page para a **Dra. Daiana Ferraz** (CRO/SP 93910), especialista em Harmonização Orofacial e Odontologia Estética em São Carlos/SP.

O objetivo principal do site é **gerar contato via WhatsApp e telefone** (leads qualificados). Toda a infraestrutura de rastreamento já está implementada no código — a pessoa técnica só precisa criar as Tags/Triggers dentro das plataformas Google.

- **URL atual:** https://wesleyzilva.github.io/dradaianaferraz_gold/
- **Telefone/WhatsApp:** +55 (16) 99140-0423
- **E-mail da clínica:** odontologia.ipanema.sc@gmail.com
- **Instagram:** @dradaianaferrazsc
- **LinkedIn:** https://www.linkedin.com/in/daiana-ferraz-87b678a8
- **Google Business:** https://g.page/r/CdKq0HEOJamhEAE
- **Doctoralia:** https://www.doctoralia.com.br/daiana-ferraz/dentista/sao-carlos

---

## 2. IDs e Plataformas — Status Atual

| Plataforma | Status | ID / Ação necessária |
|---|---|---|
| **Google Tag Manager** | ✅ Ativo no site | `GTM-PG7CRPC7` — já instalado no `index.html` |
| **Google Analytics 4** | ⚠️ Placeholder | `G-XXXXXXXXXX` → **criar conta GA4 e substituir pelo ID real** |
| **Google Ads** | ❌ Não configurado | Criar conta, criar Ação de Conversão e Tag no GTM |
| **Google Business** | ✅ Ativo | `g.page/r/CdKq0HEOJamhEAE` — perfil já vinculado no site |
| **Search Console** | ⚠️ Pendente | Verificar domínio após conectar domínio próprio |

> ⚠️ O GTM está **100% instalado** e funcional. Todos os eventos já são empurrados para o `dataLayer` automaticamente. Basta criar as Tags e Triggers **dentro do GTM**.

---

## 3. O que criar no Google Tag Manager (GTM-PG7CRPC7)

### 3.1 Tag de Configuração — Google Analytics 4

| Campo | Valor |
|---|---|
| Tipo de Tag | Google Analytics: Configuração do GA4 |
| ID de Medição | ID real obtido no painel GA4 (formato `G-XXXXXXXXXX`) |
| Trigger | All Pages |
| Nome sugerido | `GA4 - Configuração Base` |

### 3.2 Tags de Evento — GA4 (uma tag por evento abaixo)

Todos os eventos abaixo já são disparados automaticamente pelo site via `dataLayer`. Basta criar uma **Tag GA4 Event** para cada um com o Trigger do tipo **Custom Event** com o nome exato do evento.

| Nome da Tag (sugerido) | Evento no dataLayer | Tipo de Tag | Parâmetros a enviar |
|---|---|---|---|
| `GA4 - Lead WhatsApp/Telefone` | `generate_lead` | GA4 Event | `event_label`, `event_category` |
| `GA4 - Clique Uber` | `uber_click` | GA4 Event | `event_label`, `event_category` |
| `GA4 - Clique Rota Maps` | `route_click` | GA4 Event | `event_label`, `event_category` |
| `GA4 - Clique Social` | `social_click` | GA4 Event | `event_label`, `event_category` |
| `GA4 - Clique E-mail` | `contact_click` | GA4 Event | `event_label`, `event_category` |
| `GA4 - Engajamento Geral` | `engagement_click` | GA4 Event | `event_label`, `event_category` |
| `GA4 - IP Visitante` | `visitor_ip` | GA4 Event | `visitor_ip` |

> Para cada Tag GA4 Event, configure o Trigger como:
> - Tipo: **Custom Event**
> - Nome do evento: exatamente como escrito na coluna "Evento no dataLayer" acima

### 3.3 Tag Google Ads — Conversão Principal

| Campo | Valor |
|---|---|
| Tipo de Tag | Google Ads: Acompanhamento de conversões |
| ID de conversão | Obtido no Google Ads ao criar a Ação de Conversão |
| Rótulo de conversão | Obtido no Google Ads ao criar a Ação de Conversão |
| Trigger | Custom Event → `generate_lead` |
| Nome sugerido | `Google Ads - Conversão WhatsApp/Lead` |

---

## 4. Mapa Completo de Rastreamento (data-track no site)

Todos os botões e links do site já possuem o atributo `data-track` e disparam eventos no `dataLayer` automaticamente. Use a tabela abaixo para referência e criação de Triggers no GTM se necessário.

| `data-track` | Local no Site | Evento GA4 | Categoria |
|---|---|---|---|
| `cta_primary_hero` | Botão principal do Hero (WhatsApp) | `generate_lead` | lead |
| `cta_secondary_hero` | Botão secundário do Hero (agendar) | `engagement_click` | engagement |
| `conversion_whatsapp_location` | WhatsApp na seção Localização | `generate_lead` | lead |
| `conversion_route_maps` | Endereço → abre rota no Google Maps | `route_click` | location |
| `conversion_uber` | Botão "Solicitar Uber" | `uber_click` | location |
| `conversion_phone_location` | Telefone clicável na Localização | `generate_lead` | lead |
| `conversion_email_location` | E-mail clicável na Localização | `contact_click` | contact |
| `social_instagram` | Instagram no Footer | `social_click` | social |
| `social_instagram_hero` | Link @dradaianaferrazsc no Hero | `social_click` | social |
| `social_linkedin` | LinkedIn no Footer | `social_click` | social |
| `social_doctoralia` | Doctoralia no Footer | `social_click` | social |
| `social_lattes` | Lattes no Footer | `social_click` | social |
| `social_google_business` | Google Business no Footer | `social_click` | social |
| `legal_privacy_view` | Link Política de Privacidade | `page_view_legal` | legal |
| `legal_terms_view` | Link Termos de Uso | `page_view_legal` | legal |

---

## 5. Conversões Prioritárias — Marcar no GA4 e Google Ads

As seguintes ações devem ser configuradas como **Conversões** no GA4 e importadas para o Google Ads:

| Prioridade | Evento | Justificativa |
|---|---|---|
| 🥇 Alta | `generate_lead` | Clique no WhatsApp ou Telefone = contato direto com a clínica |
| 🥈 Alta | `route_click` | Pediu rota = alta intenção de visitar fisicamente |
| 🥈 Alta | `uber_click` | Pediu Uber = alta intenção de visitar fisicamente |
| 🥉 Média | `social_click` | Interesse em conhecer mais a profissional |
| 🔵 Acompanhamento | `engagement_click` | Engajamento geral com o conteúdo do site |

---

## 6. Públicos de Remarketing (criar no GA4)

Configure os seguintes públicos no GA4 para uso em campanhas Google Ads:

| Nome do Público | Condição | Uso sugerido |
|---|---|---|
| Visitantes sem conversão | Sessão > 0 **E** sem evento `generate_lead` | Remarketing — reengajar quem não clicou no WhatsApp |
| Interessados em Harmonização | Clicou no botão "Harmonização" no menu | Audiência para campanhas de harmonização |
| Interessados em Odontologia | Clicou no botão "Odontologia" no menu | Audiência para campanhas de odontologia |
| Alta intenção (rota/uber) | Disparou `route_click` ou `uber_click` | Audiência de quem quase foi até a clínica |

---

## 7. Google Business Profile

- **Perfil já vinculado no site** via Schema.org e `sameAs`
- Vincular o **Google Business ao Google Ads** para usar extensões de local nas campanhas
- Ativar as extensões:
  - Extensão de **local** (endereço na clínica)
  - Extensão de **chamada** (+55 16 99140-0423)
  - Extensão de **mensagem** (WhatsApp)

---

## 8. Search Console

- Verificar a propriedade `https://wesleyzilva.github.io/dradaianaferraz_gold/` via GTM (método mais simples — já que o GTM está ativo)
- Enviar o sitemap após verificação (gerar sitemap se necessário)
- > Se o domínio migrar para um domínio próprio (ex: `www.dradaianaferraz.com.br`), criar nova propriedade e atualizar o canonical no `src/index.html`

---

## 9. Pendências do Desenvolvedor (após IDs fornecidos)

Após a pessoa técnica fornecer os IDs abaixo, o desenvolvedor precisa atualizar:

| O que substituir | Arquivo | Campo |
|---|---|---|
| ID real do GA4 (`G-XXXXXXXXXX`) | `src/app/config/site-config.ts` | `analytics.googleTagId` |
| Imagem OG real (1200×630px) | `src/index.html` | `<meta property="og:image">` |
| Imagem Twitter Card real | `src/index.html` | `<meta name="twitter:image">` |
| URL canônica (se migrar domínio) | `src/index.html` | `<link rel="canonical">` + `og:url` + `hreflang` |

---

## 10. Checklist Final para Entrega

- [ ] Criar conta **Google Analytics 4** e copiar ID real (`G-XXXXXXXX`)
- [ ] Criar Tag GA4 Configuration no GTM (All Pages)
- [ ] Criar Tags GA4 Event para cada evento da tabela da seção 3.2
- [ ] Marcar `generate_lead`, `uber_click`, `route_click` como **Conversões** no GA4
- [ ] Criar conta **Google Ads** → criar Ação de Conversão → criar Tag de Conversão no GTM
- [ ] Vincular Google Ads ao GA4 (importar conversões)
- [ ] Vincular Google Business ao Google Ads (extensões de local/chamada)
- [ ] Criar Públicos de Remarketing no GA4 (seção 6)
- [ ] Verificar propriedade no **Search Console** via GTM
- [ ] Substituir ID `G-XXXXXXXXXX` no `site-config.ts` pelo ID real
- [ ] Substituir imagem OG placeholder por foto real (1200×630px)
- [ ] Testar todos os eventos com o **Google Tag Assistant** antes de ir ao ar

---

*Documento gerado em Abril/2026 · Responsável técnico: Wesley Silva*
