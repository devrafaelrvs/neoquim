import { Card } from '@/components/ui/Card';
import { TIMELINE } from '@/entity/company/constants/company.constants';

export function Timeline() {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {TIMELINE.map((entrada) => (
        <li key={entrada.marco} className="flex">
          <Card className="flex w-full flex-col gap-2 p-5">
            <span className="text-xs font-bold tracking-widest text-accent uppercase">
              {entrada.marco}
            </span>
            <p className="text-sm leading-relaxed text-muted">
              {entrada.texto}
            </p>
          </Card>
        </li>
      ))}
    </ol>
  );
}
