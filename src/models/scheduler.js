import Queue from "./queue";

class Scheduler {
    constructor() {
        this.queues = [];
        this.rq = new Queue();
        this.processInterval = null;
    }
    
    execute() {
        // Check for processes in queues every second
        this.processInterval = setInterval(() => {
            this.checkQueues();
        }, 1000);
    }

    addQueue(queue) {
        this.queues.push(queue);
    }

    queueExists(name) {
        return this.queues.find(queue => queue.name === name);
    }

    findProcessById(processId, queueIndex) {
        const queue = this.queues[queueIndex];
        if (queue) {
            return queue.findProcessById(processId);
        }
        return null;
    }    

    findProcessByIdInRq(processId) {
        return this.rq.findProcessById(processId);
    }

    removeQueue(queueName) {
        this.queues = this.queues.filter(queue => queue.name !== queueName);
    }

    getQueues() {
        return this.queues;
    }

    getRq() {
        return this.rq;
    }

    clearQueues() {
        this.queues = [];
        this.rq = new Queue();
    }

    checkQueues() {
        let highestPriorityQueue = null;
    
        // Find the queue with the highest priority process
        for (const queue of this.queues) {
            if (queue.processes.length > 0) {
                if (!highestPriorityQueue || queue.priority > highestPriorityQueue.priority) {
                    highestPriorityQueue = queue;
                }
            }
        }
    
        // Execute the process from the queue with the highest priority
        if (highestPriorityQueue) {
            this.executeProcess(highestPriorityQueue);
        }
    }
    
    executeProcess(queue) {
        // Remove the process from the queue
        const process = queue.dequeue();
        
        // Execute the process (you can implement your execution logic here)
        console.log(`Executing process ${process.id} from queue ${queue.name}`);
    }
    
}

export default Scheduler;
