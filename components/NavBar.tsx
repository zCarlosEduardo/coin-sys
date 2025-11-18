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

  return (
    <nav className="container mx-auto w-full mt-6 text-foreground flex justify-center">
      <div className="w-full max-w-auto bg-white px-6 py-4 rounded-lg shadow-md">
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors px-2"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/produtos"
            className="flex items-center gap-2 hover:text-amber-600 transition-colors px-2"
          >
            <Package className="w-4 h-4" />
            <span>Produtos</span>
          </Link>
          <Link
            href="/meu-perfil"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors px-2"
          >
            <User className="w-4 h-4" />
            <span>Meu Perfil</span>
          </Link>
          <Link
            href="/compras"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors px-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Compras</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-blue-600 transition-colors px-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-2 hover:text-gray-600 transition-colors"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <Building2 className="w-4 h-4" />
              <span>Departamentos</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-full left-0 mt-2 w-72 max-h-96 overflow-y-auto bg-white/80 rounded-md shadow-lg transition-all duration-200 z-50 ${
                isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#18181b",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            >
              {departamentos.map((departamento, index) => {
                const Icon = departamento.icon;
                return (
                  <Link
                    key={index}
                    href={`/departamentos/${departamento.slug}`}
                    className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-100/70 transition-colors"
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{departamento.nome}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <Link
            href="/configuracoes"
            className="flex items-center gap-2 hover:text-gray-600 transition-colors px-2"
          >
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <div className="flex items-center justify-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="mt-4 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/produtos"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Package className="w-5 h-5" />
                <span>Produtos</span>
              </Link>
              <Link
                href="/meu-perfil"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Meu Perfil</span>
              </Link>
              <Link
                href="/compras"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Compras</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              <div>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5" />
                    <span>Departamentos</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="mt-2 ml-4 space-y-1 max-h-64 overflow-y-auto">
                    {departamentos.map((departamento, index) => {
                      const Icon = departamento.icon;
                      return (
                        <Link
                          key={index}
                          href={`/departamentos/${departamento.slug}`}
                          className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{departamento.nome}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <Link
                href="/configuracoes"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
