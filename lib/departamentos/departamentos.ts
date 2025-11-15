import {
  Layers,
  DoorOpen,
  Headphones,
  UserPlus,
  Phone,
  DollarSign,
  Landmark,
  Scale,
  Building2,
  Wrench,
  Users,
  Monitor,
  LucideIcon,
} from "lucide-react";

// Tipos de permissões (para implementação futura)
export type UserRole = "admin" | "gestor" | "funcionario";

export interface Departamento {
  id: string;
  slug: string; // URL amigável
  nome: string;
  icon: LucideIcon;
  cor: string;
  corIcone: string;
  responsavel?: string;
  funcionarios?: number;
  allowedRoles?: UserRole[];
}

export const departamentos: Departamento[] = [

  {
    id: "2",
    slug: "abertura",
    nome: "Abertura",
    icon: DoorOpen,
    cor: "bg-green-500",
    corIcone: "text-green-500",
    responsavel: "João Silva",
    funcionarios: 8,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "3",
    slug: "assistencia",
    nome: "Assistência 24h",
    icon: Headphones,
    cor: "bg-purple-500",
    corIcone: "text-purple-500",
    funcionarios: 15,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "4",
    slug: "cadastro",
    nome: "Cadastro",
    icon: UserPlus,
    cor: "bg-cyan-500",
    corIcone: "text-cyan-500",
    funcionarios: 6,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "5",
    slug: "central",
    nome: "Central",
    icon: Phone,
    cor: "bg-indigo-500",
    corIcone: "text-indigo-500",
    funcionarios: 20,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "6",
    slug: "cobranca",
    nome: "Cobrança",
    icon: DollarSign,
    cor: "bg-yellow-500",
    corIcone: "text-yellow-500",
    responsavel: "Carlos Souza",
    funcionarios: 10,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "7",
    slug: "financeiro",
    nome: "Financeiro",
    icon: Landmark,
    cor: "bg-emerald-500",
    corIcone: "text-emerald-500",
    funcionarios: 5,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "8",
    slug: "juridico",
    nome: "Jurídico",
    icon: Scale,
    cor: "bg-red-500",
    corIcone: "text-red-500",
    funcionarios: 4,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "9",
    slug: "servicos-gerais",
    nome: "Serviços Gerais",
    icon: Building2,
    cor: "bg-gray-500",
    corIcone: "text-gray-500",
    funcionarios: 12,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "10",
    slug: "regulagem",
    nome: "Regulagem",
    icon: Wrench,
    cor: "bg-orange-500",
    corIcone: "text-orange-500",
    funcionarios: 7,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "11",
    slug: "rh",
    nome: "Recursos Humanos",
    icon: Users,
    cor: "bg-pink-500",
    corIcone: "text-pink-500",
    funcionarios: 6,
    allowedRoles: ["admin", "gestor"],
  },
  {
    id: "12",
    slug: "sistemas",
    nome: "Sistemas",
    icon: Monitor,
    cor: "bg-violet-500",
    corIcone: "text-violet-500",
    funcionarios: 5,
    allowedRoles: ["admin", "gestor"],
  },
];

// Funções auxiliares
export function getDepartamentoBySlug(slug: string): Departamento | undefined {
  return departamentos.find((dept) => dept.slug === slug);
}

export function getDepartamentoById(id: string): Departamento | undefined {
  return departamentos.find((dept) => dept.id === id);
}

// Função para filtrar departamentos por permissão (implementação futura)
export function getDepartamentosPermitidos(userRole: UserRole): Departamento[] {
  if (userRole === "admin") {
    return departamentos; // Admin vê tudo
  }
  
  // Gestor vê apenas seu departamento + geral (implementar lógica específica)
  return departamentos.filter((dept) => 
    dept.allowedRoles?.includes(userRole)
  );
}