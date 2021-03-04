export class TaskErrorInfo {
    code: string;
    status: string;
    errors?: any[];
    warnings?: any[];

    constructor(obj: TaskErrorInfo = <TaskErrorInfo>{}) {
        if (obj) {
            this.code = obj.code || '';
            this.status = obj.status || '';
            this.errors = obj.errors || [];
            this.warnings = obj.warnings || [];
        }
    }
}
