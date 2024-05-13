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

    removeProcess(processId) {
        this.processes = this.processes.filter(process => process.id !== processId);
    }

    hasProcessWithId(processId) {
        return this.processes.some(process => process.id === processId);
    }
}


export default Queue;