import bcrypt from 'bcrypt';
import pool from '../utils/mysql';

class User {
    static async create(email: string, password: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        const values = [email, hashedPassword];

        try {
            await pool.query(query, values);
        } catch (error) {
            throw error;
        }
    }
}

export default User;
