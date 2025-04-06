import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379' // Update this to match your Redis server
});

client.on('error', err => console.error('Redis Client Error:', err));
client.on('connect', () => console.log('Connected to Redis'));
client.on('ready', () => console.log('Redis client is ready'));

try {
  await client.connect();
} catch (err) {
  console.error('Error connecting to Redis:', err);
}

export default client;
