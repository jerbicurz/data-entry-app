import { sql } from '@vercel/postgres';
import {
  UserTable,
} from './definitions';

const ITEMS_PER_PAGE_USERS = 6;
export async function fetchUsers(currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE_USERS;
  try {
    const data = await sql<UserTable>`
      SELECT * FROM users LIMIT ${ITEMS_PER_PAGE_USERS} OFFSET ${offset}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the users.');
  }
}

export async function fetchUserPages() {
  try {
    const count = await sql`SELECT COUNT(*) FROM Users`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE_USERS);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users.');
  }
}
