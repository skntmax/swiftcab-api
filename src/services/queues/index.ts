import { Queue } from 'bullmq';
import { REDIS_QUEUES } from '../../config/constant';
import config from '../../config/config';
import { queuesPayload } from '../../types/redis_queues';


class queue  {
      #queue 
      #queue_name
      #redisOptions 
      #redisConfig
      
     constructor(payload:queuesPayload) {
        this.#queue_name = payload.queue_name;
        this.#redisConfig = payload.redisConfig ?? config.redisConn.redisConnection1;
        this.#redisOptions = payload.redisOptions ?? config.redisConn.queueConfig.redisConnection1Config; // Default value

        this.#queue = new Queue(this.#queue_name ,{connection:this.#redisConfig }  );
         }

     enqueue(key:string, data:any) { 
             this.#queue.add(key, JSON.stringify(data) , this.#redisOptions); 
             }
}
 


export const signup_user_queue  = new queue( { queue_name:REDIS_QUEUES.USER_SIGNUP  }  ) // be default 0th database is selected 

// export const content_queue  = new queue(queue_keys.CONTENT_PUSH , config.redisConnection.connection3  )
// export const content_queue_failure  = new queue(queue_keys.CONTENT_PUSH_FAILURE ,config.redisConnection.connection3  )

// export const perday_notification_queue  = new queue(queue_keys.PER_DAY_NOTIFICATION ,config.redisConnection.connection3  )
