import Queue from "./queue";
import { RR, MQ } from "../utils/consts"


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

    appendQueue() {
        this.queues.push(new Queue(`Q${this.queues.length + 1}`, null, null))
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

    updateProcess(algorithm, updatedProcess, handleSetMessage) {
        if (algorithm === MQ || algorithm === RR) {

            // Find the process in the specified queue
            const queueNumber = updatedProcess.queueNumber;
            const queue = this.queues[queueNumber];

            if (!queue) {
                handleSetMessage("error", `Queue Q${queueNumber} does not exist.`);
                return;
            }

            // Find and update the process
            const processIndex = queue.processes.findIndex(p => p.id === updatedProcess.id);
            if (processIndex !== -1) {
                queue.processes[processIndex] = updatedProcess;
                queue.sortByArrivalTime();

                handleSetMessage("success", `Updated P${updatedProcess.id} in queue Q${queueNumber}.`);
            } else {
                handleSetMessage("error", `Process P${updatedProcess.id} not found in queue Q${queueNumber}.`);
            }
        } else {
            // For other algorithms, assume the process is in the ready queue
            const processIndex = this.rq.processes.findIndex(p => p.id === updatedProcess.id);
            if (processIndex !== -1) {
                // Update the process in the ready queue
                this.rq.processes[processIndex] = updatedProcess;
                this.rq.sortByArrivalTime();
                
                handleSetMessage("success", `Updated P${updatedProcess.id} in the ready queue.`);
            } else {
                handleSetMessage("error", `Process P${updatedProcess.id} not found in the ready queue.`);
            }
        }
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
