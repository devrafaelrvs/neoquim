# Documentos públicos

Arquivos servidos direto pela URL, sem passar por rota do App Router.

## Pendente: `codigo-de-etica-neoquim.pdf`

**O arquivo ainda não está aqui.** Enquanto não estiver, o link do Código de Ética
no rodapé e na página `/canal-de-denuncias` responde 404.

Para publicar: copie o PDF **original** do CEC-8.5 para esta pasta com exatamente
este nome:

```
public/documentos/codigo-de-etica-neoquim.pdf
```

O caminho está fixado em `DOCUMENTOS.codigoEtica`, em
`src/constants/routes.constants.ts`.

O PDF original não foi recriado a partir do texto de propósito: é documento
controlado do SGQ, com cabeçalho de revisão, controle de alterações e aprovação
do Diretor Industrial. Um arquivo remontado pareceria oficial sem ser o
controlado — só o original serve.

## Ao publicar uma revisão nova

Sobrescreva o arquivo mantendo o mesmo nome. O caminho aparece no rodapé de
todas as páginas; renomear quebraria o link em todo o site.

O item A das Responsabilidades Profissionais do próprio código manda revisá-lo a
cada dois anos — a revisão 04 é de 10/04/2026, então a próxima é esperada para
2028.
