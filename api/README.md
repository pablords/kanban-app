
# kanban-api

Api para gerenciamento de board kanban.

## Rodando localmente

Para garantir que o ambiente de dev, foi configurado containers com script de entrypoint no host. Assim não é necessario usar comandos `NPM`direto no projeto. Basta subir os containers que já estão configurados para `live-reload`

Na raiz do projeto

```bash
 chmod +x api/.docker/entrypoint.sh
```

Inicie o dock-compose 

```bash
  docker-compose up -d
```
- Aguarde o build terminar `(pode demorar umpouco na primeira vez)`




