# Plano de Alinhamento Landing + Google Ads + Analytics

> Documento-base com respostas sugeridas para acelerar setup. Validar com a Dra. Daiana antes da ativação final.

## 1) Perfil real da cliente atendida hoje (respostas sugeridas)

- **Cliente que mais fecha hoje:** mulheres entre 28 e 55 anos, já com interesse em estética facial e odontologia estética, que valorizam segurança técnica e atendimento humanizado.
- **Faixa etária predominante (facial):** 30 a 50 anos.
- **Gênero predominante:** majoritariamente feminino, com demanda masculina crescente.
- **Perfil ocupacional:** principalmente profissionais ativas (CLT/autônomas), com parte menor de donas de casa e público por indicação familiar.
- **Maturidade de compra:** parte chega decidida por procedimento (ex.: botox/clareamento), parte chega com dúvida e precisa de avaliação.
- **Nível de educação prévia:** médio; campanha deve ter termos técnicos + populares e reforçar “avaliação individual”.

## 2) Origem da demanda atual

- **Canais principais:** indicação + Google + Instagram.
- **Busca no Google:** mistura de termo técnico ("toxina botulínica") e termo popular ("botox").
- **Termos citados por pacientes:** botox, preenchimento labial, clareamento, facetas, bruxismo, dentista estética em São Carlos.
- **Serviços com demanda orgânica:** botox, clareamento e avaliação odontológica.
- **Porta de entrada:** avaliação + clareamento + botox tendem a abrir jornada para outros tratamentos.

## 3) Comportamento de busca e maturidade

- **Linguagem de busca:** popular + técnica (usar ambas nas campanhas).
- **Comparação entre clínicas:** sim, especialmente em Google Maps, avaliações e credenciais profissionais.
- **Preço na jornada:** aparece cedo, mas confiança e segurança clínica são decisivas para fechamento.
- **Objeção principal:** receio de naturalidade/segurança e de “não saber o que é indicado”.
- **Busca por marca/profissional:** mais por profissional e credibilidade do que por marca de produto.

## 4) Restrições legais, técnicas e éticas

- **Procedimentos para maiores de idade:** harmonização injetável e condutas eletivas em geral devem ser avaliadas caso a caso e conforme normativas.
- **Evitar anúncio direto com tom agressivo:** procedimentos com maior risco de interpretação sensível (ex.: rinomodelação com promessa estética) devem ficar em linguagem educativa.
- **Termos proibidos:** “resultado garantido”, “transformação definitiva”, “cura”, “sem risco”.
- **Obrigatório reforçar:** avaliação prévia individual, indicação clínica e variação de resposta entre pacientes.
- **Contraindicações:** devem ser tratadas em consulta, não em promessa de anúncio.

## 5) Serviços prioritários para campanhas (6 frentes)

1. Toxina botulínica
2. Preenchimento labial
3. Clareamento dental
4. Facetas
5. Tratamento de bruxismo
6. Check-up odontológico preventivo

**Estratégia de escala:**
- Escalar: botox, clareamento, preenchimento.
- Manter presença: facetas, bruxismo, check-up.

## 6) Geografia e deslocamento

- **Foco principal:** São Carlos/SP e raio próximo.
- **Alcance sugerido:** raio inicial de 8 a 15 km; ajustar conforme CPL e qualidade de lead.
- **Público de fora:** pode converter, mas a campanha deve priorizar região local.
- **Localização pesa no fechamento:** sim (rota, tempo e facilidade de contato influenciam).

## 7) Jornada até o agendamento

- **Primeiro contato ideal:** WhatsApp para triagem rápida e envio para avaliação.
- **Dúvidas mais comuns:** indicação, duração, cuidados, contraindicações, valores, formas de atendimento.
- **Barreira principal:** confiança e clareza técnica antes do preço final.

## 8) Diferenciais reais da clínica

- Profissional identificada (nome + CRO).
- Atendimento humanizado com avaliação individual.
- Integração harmonização + odontologia no mesmo atendimento.
- Presença local forte (Google Business + redes sociais + prova social).

## 9) Expectativa com Google Ads

- **Lead qualificado:** contato da região-alvo com intenção real de avaliação e abertura para agenda.
- **Meta de qualidade x volume:** priorizar qualidade no início (fase 1) e ampliar volume após estabilizar conversão.

---

## Definição operacional das campanhas

### Estrutura recomendada
- **Uma campanha por serviço prioritário** (6 campanhas).
- **1 grupo de anúncios por campanha** na fase inicial (controle e leitura de dados mais limpa).

### Objetivo por campanha
- Padrão: **Contato via WhatsApp** + evento de conversão.
- Secundário: clique em rota e clique em ligação.

### Público e intenção
- Foco: **ambos** (decididos + pesquisando opções).
- Excluir/evitar termos: “curso”, “grátis”, “barato”, “emprego”, “SUS”, “revenda”, “material”.

### Linguagem dos anúncios
- Tom: **informativo, acolhedor e técnico na medida**.
- Mensagens-chave: avaliação individual, segurança clínica, profissional responsável, localização.
- Evitar: preço agressivo, promessas, superlativos absolutos.

### Alcance
- São Carlos + raio local.
- Excluir regiões de baixo potencial conforme relatório de termos/localização após 2 a 4 semanas.

---

## Ajustes necessários na landing (aplicados nesta entrega)

- Removida exposição de “antes e depois”.
- Linguagem reescrita para tom informativo (sem promessas implícitas de resultado).
- Inclusão de links visíveis para **Política de Privacidade** e **Termos de Uso/Aviso Legal**.
- CTA e pontos de contato mantidos com rastreamento por `data-track`.

## Mapa de eventos Analytics / GTM

- `conversion_whatsapp_harmonizacao`
- `conversion_whatsapp_odontologia`
- `conversion_whatsapp_location`
- `conversion_whatsapp_cartao_ouro`
- `conversion_route_maps`
- `conversion_uber`
- `cta_primary_hero`
- `cta_secondary_hero`

**Conversões prioritárias no Google Ads:** WhatsApp + Rota.

---

## Checklist técnico de conformidade (nicho sensível)

### A. Funcionamento técnico da página
- [x] URL carregando corretamente
- [x] Sem erro de página em branco
- [x] Sem dependência de âncora como URL principal de anúncio
- [x] Sem redirecionamento automático indevido
- [x] Responsiva (desktop e mobile)

### B. Estrutura mínima exigida pelo Google
- [x] Política de privacidade visível
- [x] Termos de uso/aviso legal visível
- [x] Nome da profissional
- [x] Forma de contato real
- [x] Identificação profissional (CRO)

### C. Conteúdo e linguagem
- [x] Sem promessas de resultado
- [x] Sem termos proibidos (“cura”, “garantido”, etc.)
- [x] Sem menção indevida de medicamentos/fármacos
- [x] Linguagem informativa e descritiva
- [x] Coerência entre anúncio e conteúdo da página

### D. Conformidade para nicho sensível
- [x] Tom educativo
- [x] Sem comparação “antes e depois” na landing
- [x] Sem gatilhos emocionais agressivos
- [x] Sem promessa implícita de transformação
