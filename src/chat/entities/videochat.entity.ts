import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VideoChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: string;

  @Column()
  sessionId: string;
}
