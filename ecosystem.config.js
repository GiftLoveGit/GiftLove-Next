module.exports = {
  apps: [
    {
      name: 'giftlove',  // Nome do aplicativo
      script: 'node_modules/next/dist/bin/next', // Script para iniciar o Next.js
      args: 'start',  // Argumento para iniciar o servidor de produção do Next.js
      watch: false,  // Desabilitar watch em produção
      env: {
        NODE_ENV: 'production'  // Definir o ambiente como produção
      }
    }
  ],

  deploy: {
    production: {
      user: 'giftlove',  // Substitua pelo nome de usuário SSH
      host: '143.110.230.44',  // Substitua pelo host SSH
      ref: 'origin/main',  // Branch do Git para fazer o deploy
      repo: 'https://github.com/GiftLoveGit/GiftLove-Next',  // Repositório Git
      path: '/var/www/html/GiftLove-Next',  // Caminho de destino no servidor
      'pre-deploy-local': '',  // Comandos antes do deploy local (opcional)
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',  // Comandos após o deploy
      'pre-setup': ''  // Comandos antes do setup (opcional)
    }
  }
};