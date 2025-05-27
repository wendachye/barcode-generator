'use client';

import { Toaster } from '@/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
export default function PasswordGate() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      toast.error('Incorrect password', { position: 'top-center' });
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md p-6 rounded-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Barcode Label Generator</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            autoComplete="username"
            className="hidden"
            tabIndex={-1}
          />
          <Input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="mb-4"
            required
          />
          <Button className="w-full" type="submit">
            Unlock
          </Button>
        </form>
      </div>

      <Toaster />
    </div>
  );
}
