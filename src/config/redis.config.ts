const Redis = require('ioredis');
import { createClient } from "redis";

export const client = createClient({
//   socket: {
//     connectTimeout: 10000,
//   },
});
export const redis = async () => {
  try {
    const redis = new Redis({
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        family: 4,           // 4 (IPv4) or 6 (IPv6)
        connectTimeout: 10000, // 10 seconds
      });
    // await client.connect();
    console.log("redis server connected succesfully");
  } catch (error) {
    console.log("error occured in redis", error);
  }
};
// export 
