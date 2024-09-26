import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuario' })
export class Usuario {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cedula!: string;

    @Column()
    fecha_nacimiento!: Date;

    @Column()
    nombres!: string;

    @Column()
    apellidos!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    rememberSession!: boolean
}