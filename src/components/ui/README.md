# ui/

Componentes shadcn/ui (Radix UI + CVA), copiados como código-fonte — não são
uma dependência fechada, edite direto o arquivo pra customizar.

Já presentes: `button.tsx`, `card.tsx`, `badge.tsx`.

Pra adicionar um novo componente, o CLI (`npx shadcn add ...`) quebra neste
ambiente Windows (ver `docs/architecture.md`) — copiar manualmente do
repositório oficial [ui.shadcn.com](https://ui.shadcn.com/docs/components)
seguindo o mesmo padrão dos arquivos existentes.
