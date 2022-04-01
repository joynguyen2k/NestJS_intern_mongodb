import { TaskStatus } from "../task-status.enum";

export class BaseTaskDto{
    title: string;
    description: string;
    status: TaskStatus;
}