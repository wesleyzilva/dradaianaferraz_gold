# Workspace Avançado para Projetos Angular

Este workspace foi configurado para facilitar o desenvolvimento de landing pages Angular para Dra. Daiana Ferraz (dentista e harmonização orofacial), com suporte a múltiplos projetos, agentes, MCP, skills e permissões.

## Estrutura
- **/src/**: Código-fonte principal do projeto Angular.
- **/.workspace/agent/**: Configuração de agentes e automações.
- **/.workspace/mcp/**: Integração com Model Context Protocol.
- **/.workspace/skills/**: Skills e automações customizadas.
- **/.workspace/permissions/**: Permissões e políticas de execução.

## Instruções Gerais
1. Para rodar um projeto Angular:
   ```bash
   npm install
   ng serve
   ```
2. Para adicionar um novo projeto Angular:
   ```bash
   ng generate application nome-do-projeto
   ```
3. Para rodar scripts de automação, consulte a pasta `.workspace/agent`.

## Colaboração
- Siga as instruções de cada subpasta para customização de agentes, skills e permissões.
- Documente novas skills e automações criadas.

---
Dúvidas? Consulte este README ou abra uma issue no repositório.
