"use server";

import DepartamentoPageClient from "@/components/Departamento/DepartamentoPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DepartamentoPage({ params }: Props) {
  const { slug } = await params;
  
  return <DepartamentoPageClient slug={slug} />;
}


export async function generateStaticParams() {

  const { departamentos } = await import("@/lib/departamentos/departamentos");
  
  return departamentos.map((dept) => ({
    slug: dept.slug,
  }));
}