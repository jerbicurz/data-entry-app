'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const UserFormSchema = z.object({
    name: z.string(),
    age: z.string(),
    title: z.string(),
    hometown: z.string()
})

const CreateUser = UserFormSchema;

export async function insertUser(formData: FormData) {
    const { name, age, title, hometown} = CreateUser.parse({
        name: formData.get('name'),
        age: formData.get('age'),
        title: formData.get('title'),
        hometown: formData.get('hometown')
    });
    
    try {
        await sql`
          INSERT INTO users (name, age, title, hometown)
          VALUES (${name}, ${age}, ${title}, ${hometown})
        `;
    } catch (error) {
      return {
          message: 'Database Error: Failed to Insert User'
      }
    }
    revalidatePath('/dashboard/users');
    redirect('/dashboard/users');
}

export async function deleteUser(id: string) {
    try {
        await sql`DELETE FROM Users WHERE id = ${id}`;
        revalidatePath('/dashboard/users');
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Invoice'
        }
    }
}