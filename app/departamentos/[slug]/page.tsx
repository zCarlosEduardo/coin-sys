// app/departamentos/[slug]/page.tsx
import DepartamentoPageClient from "@/components/Departamentos/DepartamentoPageClient";

export default async function DepartamentoPage({ params }: Props ) {
  const { slug } = await params;
  return <DepartamentoPageClient slug={slug} />;
}