import DepartamentoPageClient from "@/components/departamentos/DepartamentoPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DepartamentoPage({ params }: Props) {
  const { slug } = await params;

  return <DepartamentoPageClient slug={slug} />;
}