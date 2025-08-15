export const environment = {
  production: true,
  emailJsPublicKey: process.env['NG_APP_EMAILJS_PUBLIC_KEY'] as string,
  emailJsServiceId: process.env['NG_APP_EMAILJS_SERVICE_ID'] as string,
  emailJsTemplateId: process.env['NG_APP_EMAILJS_TEMPLATE_ID'] as string,
  supabaseUrl: process.env['NG_APP_SUPABASE_URL'] as string,
  supabaseAnonKey: process.env['NG_APP_SUPABASE_ANON_KEY'] as string
};
