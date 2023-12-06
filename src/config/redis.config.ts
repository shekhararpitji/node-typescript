import { createClient } from 'redis';

export const client= createClient()
export const redis=async() => {
    try {
        await client.connect();
        console.log('redis server connected succesfully')
    } catch (error:any) {
        console.log('error occured in redis' , error.message)
    }

}

