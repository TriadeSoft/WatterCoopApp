const fs = require('fs');
const path = require('path');

// Leer el archivo environment.prod.ts
const envFilePath = path.join(__dirname, '../src/environments/environment.prod.ts');
let content = fs.readFileSync(envFilePath, 'utf8');

// Reemplazar las variables con los valores reales del entorno
const replacements = {
  'process.env[\'NG_APP_EMAILJS_PUBLIC_KEY\']': `'${process.env.NG_APP_EMAILJS_PUBLIC_KEY || ''}'`,
  'process.env[\'NG_APP_EMAILJS_SERVICE_ID\']': `'${process.env.NG_APP_EMAILJS_SERVICE_ID || ''}'`,
  'process.env[\'NG_APP_EMAILJS_TEMPLATE_ID\']': `'${process.env.NG_APP_EMAILJS_TEMPLATE_ID || ''}'`,
  'process.env[\'NG_APP_SUPABASE_URL\']': `'${process.env.NG_APP_SUPABASE_URL || ''}'`,
  'process.env[\'NG_APP_SUPABASE_ANON_KEY\']': `'${process.env.NG_APP_SUPABASE_ANON_KEY || ''}'`
};

// Aplicar los reemplazos
Object.entries(replacements).forEach(([placeholder, value]) => {
  content = content.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
});

// Escribir el archivo modificado
fs.writeFileSync(envFilePath, content);

console.log('✅ Variables de entorno reemplazadas en environment.prod.ts');
console.log('📝 Variables encontradas:', Object.keys(replacements));
console.log('🔑 Valores configurados:', Object.values(replacements).filter(v => v !== "''"));
