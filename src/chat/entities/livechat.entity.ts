import { Column, Entity } from 'typeorm';

@Entity()
export class LiveChat {
  @Column()
  roomId: string;

  @Column()
  sessionId: string;

  @Column()
  message: string;

  @Column()
  creationDate: any;
}
