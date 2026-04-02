const trustMetrics = [
  { value: "10,000+", label: "Deliveries Processed" },
  { value: "98%", label: "Update Accuracy" },
  { value: "Global", label: "Coverage" },
  { value: "Trusted", label: "By Businesses" },
  { value: "24/7", label: "Tracking Access" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-line bg-[#eef2f6]">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-8 md:grid-cols-5 md:px-8">
        {trustMetrics.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-2xl font-bold tracking-tight text-navy">{item.value}</p>
            <p className="mt-1 text-sm font-medium text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
