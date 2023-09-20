async function main() {
    const { startServer } = await import('@directus/api/server');
    startServer();
  }
  
main();