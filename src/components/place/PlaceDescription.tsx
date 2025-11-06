interface PlaceDescriptionProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function PlaceDescription({
  title,
  subtitle,
  description,
}: PlaceDescriptionProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}
