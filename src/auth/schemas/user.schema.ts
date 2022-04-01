import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,  } from 'mongoose';
import * as mongoose from 'mongoose';
import { Task } from 'src/task/schemas/task.schema';


export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({
        // required: true,
        // unique: true,    
    })
    username: string;
    @Prop()
    password: string;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
    task: Task[];

}
export const UserSchema = SchemaFactory.createForClass(User);
