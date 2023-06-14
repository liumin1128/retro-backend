import { PubSub, withFilter } from 'graphql-subscriptions';

import { EventEmitter } from 'events';
const biggerEventEmitter = new EventEmitter();
biggerEventEmitter.setMaxListeners(1000);

export const pubSub = new PubSub({ eventEmitter: biggerEventEmitter });
export { withFilter };
