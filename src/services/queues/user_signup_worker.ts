import { Worker } from 'bullmq';
import { REDIS_QUEUES } from '../../config/constant';
import config from '../../config/config';
import authService from '../auth/auth.service';


export function initSignupmailWorker() {
  console.log("[[ Initializing Signup Mail Worker...]]");
const myWorker = new Worker(REDIS_QUEUES.USER_SIGNUP, async (job) => {
    console.log('Processing job:', job.id);
    console.log(job?.data)
    await authService.sendAuthMail(JSON.parse(job.data))   
},
 {
    connection: config.redisConn.redisConnection1,
    limiter: {
        max: 50, // 50 jobs per 10 seconds 
        duration: 10 * 1000
    }
 }
);
  
myWorker.on('completed', (job) => {
    console.log(`Job with id ${job.id} has been completed`);
  });
  
  myWorker.on('failed', (job:any, err) => {
    console.log(`processing failed `);
  });


}