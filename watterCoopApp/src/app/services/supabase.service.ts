import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    if (!environment.supabaseUrl || !environment.supabaseAnonKey) {
      throw new Error('Supabase credentials are not configured in environment.ts');
    }

    // Configurar Supabase con persistencia de sesión
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey, {
      auth: {
        persistSession: true, // Mantener sesión activa
        storageKey: 'watter-coop-auth', // Clave personalizada para localStorage
        autoRefreshToken: true, // Renovar token automáticamente
        detectSessionInUrl: true // Detectar sesión en URL
      }
    });
  }

  // Para casos donde necesites acceso directo al cliente
  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Verificar conexión
  async checkConnection(): Promise<boolean> {
    try {
      const { error } = await this.supabase.from('messages').select('id').limit(1);
      return !error;
    } catch (err) {
      console.error('Error checking Supabase connection:', err);
      return false;
    }
  }

  async getUserRole(): Promise<string | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await this.supabase
      .from('profiles')
      .select('role, id, email')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error obteniendo rol:', error);
      return null;
    }

    return data?.role || null;
  }

  // Obtener mensajes activos que no hayan expirado
  async getActiveMessages(limit: number = 1) {
    try {
      const now = new Date().toISOString();
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .eq('active', true)
        .gt('expires_at', now)
        .order('expires_at', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data ?? [];
    } catch (err) {
      console.error('Error fetching active messages:', err);
      return [];
    }
  }

  // Verificar si hay sesión activa
  async hasActiveSession(): Promise<boolean> {
    try {
      const { data: { session } } = await this.supabase.auth.getSession();
      return !!session;
    } catch (error) {
      console.error('Error verificando sesión:', error);
      return false;
    }
  }

  // Obtener sesión actual
  async getCurrentSession() {
    try {
      const { data: { session } } = await this.supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Error obteniendo sesión:', error);
      return null;
    }
  }
}
