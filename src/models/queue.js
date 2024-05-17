class Queue {
    constructor(name, algorithm, priority) {
        this.name = name;
        this.algorithm = algorithm;
        this.priority = priority;
        this.processes = [];
    }

    setName(name) {
        this.name = name;
    }

    isEmpty() {
        return this.processes.length === 0;
    }

    size() {
        return this.processes.length;
    }

    enqueue(process) {
        const existingProcess = this.processes.find(p => p.id === process.id);

        if (existingProcess) {
            return false;
        } else {
            this.processes.push(process);
            this.sortByArrivalTime();
            
            return true;
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.processes.shift();
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.processes[0];
    }

    sortByArrivalTime() {
        // Sort processes by arrival time
        this.processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    }

    sortByBurstTime() {
        this.processes.sort((a, b) => a.burstTime - b.burstTime);
    }

    removeProcess(processId) {
        this.processes = this.processes.filter(process => process.id !== processId);
    }

    hasProcessWithId(processId) {
        return this.processes.some(process => process.id === processId);
    }
}


export default Queue;