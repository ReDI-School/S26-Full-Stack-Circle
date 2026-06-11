import Tag from '@components/Tag';
import { Card } from '@components/Card';
export default function Attendees({ attendees }: { attendees: string[] }) {
  return (
    <Card>
      <div className="flex flex-col gap-7.5">
        <p className="text-xl">ATTENDEES</p>
        <div className="flex gap-4 flex-wrap">
          {attendees.length === 0
            ? <p className="text-ec-secondary">No attendees yet.</p>
            : attendees.map((attendee) => (
                <Tag label={attendee} key={attendees.indexOf(attendee)} />
              ))}
        </div>
      </div>
    </Card>
  );
}
