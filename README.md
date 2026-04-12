# Landing Page — Dra. Daiana Ferraz

Landing page de conversão da clínica da Dra. Daiana Ferraz, com foco em captação de pacientes para odontologia estética e harmonização facial.

**Desenvolvimento:** Wesley Silva

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
