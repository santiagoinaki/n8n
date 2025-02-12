const { npm_config_user_agent: UA } = process.env;
const [packageManager] = (UA ?? '').split(' ');
const [name, version] = packageManager.split('/');

// Verifica si el comando es para instalar pnpm globalmente
const isGlobalPnpmInstall = process.argv.some(arg => 
  arg.includes('install') && 
  arg.includes('-g') && 
  arg.includes('pnpm@')
);

// Permite npm install -g pnpm@... o si hay una variable de entorno
if (name !== 'pnpm' && !isGlobalPnpmInstall && process.env.ALLOW_NPM_INSTALL !== 'true') {
  const suggestion = '\x1b[1;92mpnpm\x1b[0;31m';
  console.error('\x1b[0;31m');
  console.error('╭───────────────────────────────────────────╮');
  console.error(`│\tPlease use ${suggestion} instead of ${name} \t    │`);
  console.error('╰───────────────────────────────────────────╯');
  console.error('\x1b[0m');
  process.exit(1);
}
