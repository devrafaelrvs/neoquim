# Documentos públicos

Arquivos servidos direto pela URL, sem passar por rota do App Router.

## `codigo-de-etica-neoquim.pdf`

Original do **CEC-8.5 — Código de Ética e Conduta, revisão 04 (10/04/2026)**,
publicado com nome em kebab-case. É esse arquivo que abre no link do Código de
Ética no rodapé e na página `/canal-de-denuncias`.

O caminho está fixado em `DOCUMENTOS.codigoEtica`, em
`src/constants/routes.constants.ts`.

O nome do arquivo original (`CEC 8.5- Codigo de ética e conduta Rev 04 (1).pdf`)
não serve como URL: espaço, acento e parêntese exigem percent-encoding e
quebram em cliente que normaliza a URL de forma diferente. Sempre renomeie para
kebab-case ASCII ao publicar aqui.

O PDF não foi recriado a partir do texto de propósito: é documento controlado do
SGQ, com cabeçalho de revisão, controle de alterações e aprovação do Diretor
Industrial. Um arquivo remontado pareceria oficial sem ser o controlado — só o
original serve.

## Ao publicar uma revisão nova

Sobrescreva o arquivo mantendo o mesmo nome. O caminho aparece no rodapé de
todas as páginas; renomear quebraria o link em todo o site.

O item A das Responsabilidades Profissionais do próprio código manda revisá-lo a
cada dois anos — a revisão 04 é de 10/04/2026, então a próxima é esperada para
2028.
