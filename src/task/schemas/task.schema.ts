import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { TaskStatus } from '../task-status.enum';
import * as mongoose from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task{
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    status: TaskStatus;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    user: User;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
