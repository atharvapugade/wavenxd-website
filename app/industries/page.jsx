import IndustriesClient from "./IndustriesClient";

async function getIndustries() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/industries`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch industries");
  }

  return res.json();
}

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <IndustriesClient industries={industries} />
    </section>
  );
}
