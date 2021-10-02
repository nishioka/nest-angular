import {
  Table,
  DefaultScope,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Model,
  ForeignKey,
  Length,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  NotEmpty,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({
  tableName: 'announcement',
})
@DefaultScope(() => ({
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
  order: [['date', 'ASC']],
}))
export class Announcement extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  authorId: string;

  @BelongsTo(() => User)
  author: User;

  @NotEmpty
  @Length({
    min: 1,
    max: 1024,
    msg: `The length of content can't be longer than 1024 `,
  })
  @Column
  content: string;

  @Column
  date: Date;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
