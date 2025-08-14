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
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
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

  // Obtener mensajes activos que no hayan expirado
  async getActiveMessages() {
    try {
      const now = new Date().toISOString();
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .eq('active', true)
        .gt('expires_at', now)
        .order('expires_at', { ascending: true });

      if (error) throw error;
      return data ?? [];
    } catch (err) {
      console.error('Error fetching active messages:', err);
      return [];
    }
  }
}
