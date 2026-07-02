'use client';

import { motion } from 'framer-motion';

interface Props {
    x: number;
    y: number;
    active?: boolean;
    onClick?: () => void;
    label?: string;
}

export default function MapMarker({
    x,
    y,
    active = false,
    onClick,
    label,
}: Props) {
    return (
        <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={onClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            {/* pulso sutil detrás del marcador (azul suave) */}
            <motion.div
                aria-hidden
                animate={{
                    scale: active ? [1, 1.6, 1] : [1, 1.15, 1],
                    opacity: [0.8, 0.3, 0.8],
                }}
                transition={{ repeat: Infinity, duration: active ? 1.4 : 2.2, ease: 'easeInOut' }}
                className={`${active ? 'h-8 w-8' : 'h-6 w-6'} absolute rounded-full ${active ? 'bg-[#2b6cb0]/30' : 'bg-[#2b6cb0]/20'}`}
            />

            {/* marcador: círculo blanco con punto azul interior */}
            <motion.div
                animate={{ scale: active ? 1.05 : 1 }}
                transition={{ duration: 0.15 }}
                className={`${active ? 'h-6 w-6' : 'h-5 w-5'} relative rounded-full overflow-hidden flex items-center justify-center shadow-sm`}
            >
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                    <div className={`${active ? 'h-3 w-3' : 'h-2.5 w-2.5'} rounded-full bg-[#2b6cb0]`} />
                </div>
            </motion.div>

            {/* Etiqueta cuando está activo */}
            {active && label && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 pointer-events-none">
                    <div className="bg-[#0f172a] text-white text-xs px-2 py-1 rounded-md shadow-md">
                        {label}
                    </div>
                </div>
            )}
        </motion.div>
    );
}