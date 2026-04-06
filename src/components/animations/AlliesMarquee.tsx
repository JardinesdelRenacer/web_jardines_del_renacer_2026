'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { allies as defaultAllies, type CommercialAlly } from '@/config/allies';
import { readCommercialAllies } from '@/lib/alliesStorage';

export default function AlliesMarquee() {
  const [allies, setAllies] = useState<CommercialAlly[]>(defaultAllies);

  useEffect(() => {
    setAllies(readCommercialAllies());

    const syncFromStorage = () => setAllies(readCommercialAllies());
    window.addEventListener('storage', syncFromStorage);
    return () => window.removeEventListener('storage', syncFromStorage);
  }, []);

  const featuredAllies = useMemo(
    () => allies.filter((ally) => ally.featured).slice(0, 18),
    [allies],
  );

  const sourceAllies = featuredAllies.length > 0 ? featuredAllies : defaultAllies;
  const duplicatedAllies = [...sourceAllies, ...sourceAllies];

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-hidden overflow-y-visible py-10 md:py-12">
      <motion.div
        className="flex w-max items-center gap-8 px-4 md:gap-12 md:px-6"
        animate={{
          x: [0, -50 + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
      >
        {duplicatedAllies.map((ally, index) => (
          <motion.div
            key={`${ally.id}-${index}`}
            className="flex-shrink-0"
            animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
            transition={{
              duration: 4.8 + (index % 3) * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.12,
            }}
            whileHover={{ y: -10, scale: 1.04 }}
          >
            <a
              href={ally.url || '/contacto'}
              target={ally.url ? '_blank' : undefined}
              rel={ally.url ? 'noopener noreferrer' : undefined}
              aria-label={`Visitar ${ally.name}`}
              className="group block"
            >
              <div
                className="relative flex h-40 w-40 md:h-52 md:w-52 items-center justify-center overflow-hidden rounded-full border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_24px_60px_rgba(25,52,91,0.16)] transition-all duration-500 group-hover:border-primary/35 group-hover:shadow-[0_30px_70px_rgba(25,52,91,0.24)]"
                style={{ ...ally.containerStyle, ...ally.innerStyle }}
              >
                <div
                  className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(255,255,255,0))]"
                  style={ally.glowStyle}
                />
                <div
                  className="relative z-10 h-[82%] w-[104%] md:h-[84%] md:w-[104%]"
                  style={ally.logoStyle}
                >
                  {ally.logo.startsWith('data:') ? (
                    // Permitimos data URL para logos subidos desde el panel admin.
                    <img
                      src={ally.logo}
                      alt={ally.name}
                      className="h-full w-full object-contain transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={ally.logo}
                      alt={ally.name}
                      fill
                      className="object-contain transition-all duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
