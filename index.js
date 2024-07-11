function iniciarPrograma() {
  const mc = require('minecraft-protocol');
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function conectarUsuarios(host, port, usernames) {
    const clients = [];

    usernames.forEach((nome, index) => {
      const client = mc.createClient({
        host: host,
        port: parseInt(port),
        username: nome
      });

      client.on('login', () => {
        console.log(`Conectado ao servidor Minecraft como ${nome}`);
        if (index === usernames.length - 1) {
          setTimeout(() => {
            clients.forEach(client => client.end());
            rl.close();
          }, 1000);
        }
      });

      clients.push(client);
    });
  }

  rl.question('Digite o endereço do server (valor antes do ":"): ', (host) => {
    rl.question('Digite a porta do server (valor após do ":"): ', (port) => {
      rl.question('Digite os nomes de usuário separados por espaço: ', (nomes) => {
        const usernames = nomes.split(' ');
        conectarUsuarios(host, port, usernames);
      });
    });
  });

  rl.on('close', () => {
    iniciarPrograma();
  });
}

iniciarPrograma();
