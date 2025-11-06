interface PlaceImageProps {
  src: string;
  alt: string;
}

export default function PlaceImage({ src, alt }: PlaceImageProps) {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
