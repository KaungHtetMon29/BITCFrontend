export default function Btn({
  name,
  className,
  func = () => {},
}: {
  name: string;
  className?: string;
  func?: any;
}) {
  return (
    <button
      onClick={() => func()}
      className={` px-2 py-1 rounded-lg text-base shadow-md ${className}`}
    >
      {name}
    </button>
  );
}
