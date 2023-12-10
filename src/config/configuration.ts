export default () => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    username: process.env.DATABASE_USERNAME,
  },
  riotGames: {
    apiKey: process.env.RIOT_GAMES_API_KEY,
  },
});
