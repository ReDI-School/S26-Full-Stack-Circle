import Tag from '@components/Tag';
import { Card } from '@components/Card';
export default function Atendees({ atendees }: { atendees: string[] }) {
  return (
    <Card>
      <div className="flex flex-col gap-7.5">
        <p className="text-xl">ATENDEES</p>
        <div className="flex gap-4 flex-wrap">
          {atendees.map((atendee) => {
            return <Tag label={atendee} key={atendees.indexOf(atendee)}></Tag>;
          })}
        </div>
      </div>
    </Card>
  );
}
