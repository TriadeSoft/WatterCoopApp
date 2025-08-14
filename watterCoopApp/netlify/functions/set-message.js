import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const AUTH_TOKEN = process.env.ADMIN_AUTH_TOKEN; // token para proteger el endpoint

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  // Validar token del admin
  const token = event.headers.authorization?.replace("Bearer ", "");
  if (token !== AUTH_TOKEN) {
    return { statusCode: 403, body: "No autorizado" };
  }

  try {
    const { title, description, expires_at, active } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('messages')
      .insert([{ title, description, expires_at, active }]);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Aviso guardado con éxito", data })
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: err.message }) };
  }
}
