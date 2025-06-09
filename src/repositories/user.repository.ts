// src/repositories/user.repository.ts
import { IUserRepository } from '../interfaces/auth.types';
import { pool } from '../config/database.config';

export class UserRepository implements IUserRepository {
    async createUser(email: string, password: string): Promise<number> {
        const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id';
        try {
            const result = await pool.query(query, [email, password]);
            return result.rows[0].user_id;
        } catch (err) {
            throw new Error('Database error while creating user');
        }
    }
}