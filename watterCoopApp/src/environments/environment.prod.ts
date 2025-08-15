export const environment = {
  production: true,
  emailJsPublicKey: process.env['NG_APP_EMAILJS_PUBLIC_KEY'] || '',
  emailJsServiceId: process.env['NG_APP_EMAILJS_SERVICE_ID'] || '',
  emailJsTemplateId: process.env['NG_APP_EMAILJS_TEMPLATE_ID'] || '',
  supabaseUrl: process.env['NG_APP_SUPABASE_URL'] || '',
  supabaseAnonKey: process.env['NG_APP_SUPABASE_ANON_KEY'] || ''
};
