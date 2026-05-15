'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Button from './Button';

interface PaymentDropdownProps {
  wompiUrl: string;
  pseUrl: string;
  className?: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  buttonSize?: 'sm' | 'md' | 'lg';
}

/**
 * Componente interactivo para mostrar un menú desplegable de pagos.
 * Contiene enlaces para redirigir al usuario a pasarelas como Wompi y PSE.
 * 
 * @param props.wompiUrl - URL generada para el checkout de Wompi.
 * @param props.pseUrl - URL generada para iniciar el pago con PSE.
 * @param props.className - Clases CSS adicionales para el contenedor principal.
 * @param props.buttonVariant - Estilo visual del botón que abre el menú.
 * @param props.buttonSize - Tamaño del botón que abre el menú.
 */
export default function PaymentDropdown({ wompiUrl, pseUrl, className, buttonVariant = 'primary', buttonSize = 'lg' }: PaymentDropdownProps) {
  // Estado que controla si el menú desplegable es visible o no
  const [isOpen, setIsOpen] = useState(false);
  // Referencia al contenedor principal para detectar clics fuera de él
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Efecto de ciclo de vida (useEffect) que añade un "Event Listener".
   * Si el usuario hace clic fuera de este componente cuando está abierto,
   * el menú se cerrará automáticamente.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <Button
        type="button"
        variant={buttonVariant}
        size={buttonSize}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full sm:w-auto"
      >
        Pagar Plan
        <svg
          className={cn('w-5 h-5 transition-transform duration-300', isOpen ? 'rotate-180' : '')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-64 rounded-2xl glass border border-primary/20 shadow-xl overflow-hidden z-50 origin-top-left sm:origin-top-right animate-in fade-in zoom-in-95 duration-200 bg-white/95 backdrop-blur-xl">
          <div className="py-2 flex flex-col">
            <a href={wompiUrl} className="px-5 py-4 text-text hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-4 font-medium border-b border-gray-100">
              <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100">
                <Image src="/images/Wompi_logo.jpg" alt="Wompi" fill className="object-contain p-0.5" />
              </div>
              Pagar con Wompi
            </a>
            <a href={pseUrl} className="px-5 py-4 text-text hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-4 font-medium">
              <div className="relative w-12 h-12 flex-shrink-0 bg-[#003087] rounded-lg overflow-hidden shadow-sm">
                <Image src="/images/logo-pse.png" alt="PSE" fill className="object-contain scale-[1.15]" />
              </div>
              Pagar con PSE
            </a>
          </div>
        </div>
      )}
    </div>
  );
}