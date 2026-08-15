import type { ProductLineGroup } from '@/entity/product/product.entity';

/**
 * Seção "Linha e aplicações" da página de detalhe.
 *
 * Grupo sem `titulo` sai como lista direta — só produtos que dividem a linha
 * por aplicação (Catalisadores, Revenda, Secantes) ganham o rótulo.
 */
export function ProductLine({ grupos }: { grupos: ProductLineGroup[] }) {
  return (
    <div className="flex flex-col gap-7">
      {grupos.map((grupo) => (
        <div key={grupo.titulo ?? 'geral'} className="flex flex-col gap-3">
          {grupo.titulo ? (
            <h3 className="text-xs font-semibold uppercase tracking-wide text-brand">
              {grupo.titulo}
            </h3>
          ) : null}

          <ul className="flex flex-col gap-3">
            {grupo.itens.map((item) => (
              <li key={item.nome} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <p className="text-sm leading-relaxed text-muted">
                  <strong className="font-semibold text-ink">
                    {item.nome}
                  </strong>{' '}
                  — {item.descricao}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
