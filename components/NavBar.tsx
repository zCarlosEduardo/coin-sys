"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Package,
  LayoutDashboard,
  Building2,
  ChevronDown,
  User,
  Settings,
  Menu,
  X,
  Layers,
  DoorOpen,
  Headphones,
  UserPlus,
  Phone,
  DollarSign,
  Landmark,
  Scale,
  Wrench,
  Users,
  Monitor,
  ShoppingCart,
} from "lucide-react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const departamentos = [
    { nome: "Geral", icon: Layers, slug: "", isGeneral: true },
    { nome: "Abertura", icon: DoorOpen, slug: "abertura" },
    { nome: "Assistência 24h", icon: Headphones, slug: "assistencia" },
    { nome: "Cadastro", icon: UserPlus, slug: "cadastro" },
    { nome: "Central", icon: Phone, slug: "central" },
    { nome: "Cobrança", icon: DollarSign, slug: "cobranca" },
    { nome: "Financeiro", icon: Landmark, slug: "financeiro" },
    { nome: "Jurídico", icon: Scale, slug: "juridico" },
    { nome: "Serviços Gerais", icon: Building2, slug: "servicos-gerais" },
    { nome: "Regulagem", icon: Wrench, slug: "regulagem" },
    { nome: "Recursos Humanos", icon: Users, slug: "rh" },
    { nome: "Sistemas", icon: Monitor, slug: "sistemas" },
  ];

  const getDepartamentoLink = (dept: any) =>
    dept.isGeneral
      ? "/Departamentos"
      : `/Departamentos/${dept.slug}`;

  return (
    <nav className="container mx-auto w-full mt-6 text-foreground flex justify-center">
      <div className="w-full bg-white px-6 py-4 rounded-lg shadow-md">
        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:flex items-center justify-center gap-8">
          <Link href="/" className="flex items-center gap-2 hover:text-gray-600">
            <Home className="w-4 h-4" />
            Home
          </Link>

          <Link href="/produtos" className="flex items-center gap-2 hover:text-amber-600">
            <Package className="w-4 h-4" />
            Produtos
          </Link>

          <Link href="/meu-perfil" className="flex items-center gap-2 hover:text-gray-600">
            <User className="w-4 h-4" />
            Meu Perfil
          </Link>

          <Link href="/compras" className="flex items-center gap-2 hover:text-gray-600">
            <ShoppingCart className="w-4 h-4" />
            Compras
          </Link>

          <Link href="/dashboard" className="flex items-center gap-2 hover:text-blue-600">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          {/* Dropdown Departamentos */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Departamentos
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-full left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white rounded-md shadow-lg z-50 transition-all ${
                isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {departamentos.map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <Link
                    key={index}
                    href={getDepartamentoLink(dept)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <Icon className="w-5 h-5" />
                    {dept.nome}
                  </Link>
                );
              })}
            </div>
          </div>

          <Link href="/configuracoes" className="flex items-center gap-2 hover:text-gray-600">
            <Settings className="w-4 h-4" />
            Configurações
          </Link>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="lg:hidden">
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mt-4 space-y-2">
              <Link href="/" className="flex gap-3 px-4 py-3 hover:bg-gray-100">
                <Home /> Home
              </Link>

              <Link href="/produtos" className="flex gap-3 px-4 py-3 hover:bg-gray-100">
                <Package /> Produtos
              </Link>

              <Link href="/meu-perfil" className="flex gap-3 px-4 py-3 hover:bg-gray-100">
                <User /> Meu Perfil
              </Link>

              <Link href="/compras" className="flex gap-3 px-4 py-3 hover:bg-gray-100">
                <ShoppingCart /> Compras
              </Link>

              {/* Departamentos Mobile */}
              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex justify-between px-4 py-3 hover:bg-gray-100"
                >
                  <div className="flex gap-3">
                    <Building2 />
                    Departamentos
                  </div>
                  <ChevronDown
                    className={`${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="ml-4 space-y-1">
                    {departamentos.map((dept, index) => {
                      const Icon = dept.icon;
                      return (
                        <Link
                          key={index}
                          href={getDepartamentoLink(dept)}
                          className="flex gap-3 px-4 py-2 hover:bg-gray-100"
                        >
                          <Icon className="w-4 h-4" />
                          {dept.nome}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link href="/configuracoes" className="flex gap-3 px-4 py-3 hover:bg-gray-100">
                <Settings /> Configurações
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}