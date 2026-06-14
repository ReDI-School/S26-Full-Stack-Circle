interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
        ✏️ Edit Event Form
      </h1>
      <p className="text-sm text-gray-500 mt-2 font-mono">
        Editing Event ID: <span className="text-amber-600 font-bold">{id}</span>
      </p>
    </div>
  );
}
