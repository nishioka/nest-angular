import {
  Table,
  DefaultScope,
  Column,
  Model,
  Unique,
  IsEmail,
  NotEmpty,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';

import { Announcement } from './announcement.entity';

@DefaultScope(() => ({
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
  order: [['employeeNo', 'ASC']],
}))
@Table({
  tableName: 'user',
})
export class User extends Model {
  // @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Unique
  @NotEmpty
  @Column
  employeeNo: string;

  @NotEmpty
  @Column
  name: string;

  @IsEmail
  @Column
  email: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @HasMany(() => Announcement, 'authorId')
  messages: Announcement[];
}
