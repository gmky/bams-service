import { genSalt, hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: 'Tên dăng nhập', length: 50 })
  username: string;

  @Column({ unique: true, comment: 'Địa chỉ email', length: 255 })
  email: string;

  @Column({ comment: 'Tên hiển thị', length: 255 })
  name: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'salt', comment: 'Mã salt mật khẩu', length: 255 })
  salt: string;

  @Exclude({ toPlainOnly: true })
  @Column({ unique: true, comment: 'Mật khẩu', length: 1000 })
  password: string;

  @Column({
    name: 'created_by',
    comment: 'Người tạo',
    nullable: true,
    length: 50,
  })
  createdBy: string;

  @CreateDateColumn({ name: 'created_date', comment: 'Ngày tạo' })
  createdDate: Date;

  @Column({ name: 'last_modified_by', comment: 'Người cập nhật', length: 50 })
  lastModifiedBy: string;

  @UpdateDateColumn({ name: 'last_modified_date', comment: 'Ngày cập nhật' })
  lastModifiedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    // Hash password
    const salt = await genSalt();
    this.salt = salt;
    this.password = await hash(this.password, salt);
  }
}
