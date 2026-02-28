import DepartamentoPageClient from "@/components/departamentos/DepartamentoPageClient";

interface Props {
  params: { slug: string };
}

export default async function DepartamentoPage({ params }: Props) {
  const { slug } = params;
  return <DepartamentoPageClient slug={slug} />;
}

export async function generateStaticParams() {
  const { departamentos } = await import("@/lib/departamentos/departamentos");

  return departamentos.map((dept) => ({
    slug: dept.slug,
  }));
}