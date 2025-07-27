
export default function FileCard({ name, url }: { name: string; url: string }) {
  const ext = name.split('.').pop()?.toUpperCase();

  return (
    <div
      onClick={() => window.open(url, '_blank')}
      className="cursor-pointer bg-white border border-[#e4dcd2] rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
    >
      <div className="text-sm font-medium text-[#2e2e2e] truncate">{name}</div>
      <div className="text-xs mt-2 bg-[#f4e3c1] text-[#2e2e2e] w-fit px-2 py-0.5 rounded-full">
        {ext}
      </div>
    </div>
  );
}
