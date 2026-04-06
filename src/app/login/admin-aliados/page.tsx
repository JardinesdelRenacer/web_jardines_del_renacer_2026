'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import FadeIn from '@/components/animations/FadeIn';

export default function AdminAliadosLoginPage() {
  const router = useRouter();
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const cleanCedula = cedula.replace(/\D/g, '');
    const validCedula = cleanCedula.length >= 6 && cleanCedula.length <= 10;
    if (!validCedula) {
      setError('Ingresa una cedula valida.');
      setLoading(false);
      return;
    }

    // Credenciales de prueba del panel de aliados.
    if (cleanCedula === '2222222222' && password === 'aliados123') {
      localStorage.setItem(
        'alliesAdminUser',
        JSON.stringify({
          cedula: cleanCedula,
          role: 'admin_aliados',
          name: 'Administrador Aliados Comerciales',
        }),
      );
      router.push('/dashboard-aliados');
      return;
    }

    setError('Cedula o contrasena incorrectos para el panel de aliados.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-background via-primary/5 to-background">
      <Container>
        <FadeIn>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-display text-text mb-3">
                Login Admin Aliados
              </h1>
              <p className="text-textLight">
                Acceso independiente para gestion de aliados comerciales.
              </p>
            </div>

            <div className="glass border-2 border-primary/20 p-8 rounded-3xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Cedula administrativa"
                  value={cedula}
                  onChange={(event) => {
                    setCedula(event.target.value);
                    setError('');
                  }}
                  placeholder="Ingresa tu cedula"
                  required
                />

                <Input
                  label="Contrasena"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError('');
                  }}
                  placeholder="••••••••••"
                  required
                />

                {error && (
                  <p className="text-sm text-primary bg-primary/10 border border-primary/30 rounded-xl px-3 py-2">
                    {error}
                  </p>
                )}

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-textLight">
                  <p className="font-semibold text-primary mb-1">Credenciales de prueba</p>
                  <p>Cedula: <span className="font-mono text-text">2222222222</span></p>
                  <p>Contrasena: <span className="font-mono text-text">aliados123</span></p>
                </div>

                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                  {loading ? 'Ingresando...' : 'Entrar al panel de aliados'}
                </Button>
              </form>
            </div>

            <div className="text-center mt-6">
              <Link href="/" className="text-textLight hover:text-primary transition-colors">
                Volver al inicio
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

