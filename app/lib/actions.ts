'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(
        {
            invalid_type_error: 'Please select a customer.'
        }
    ),
    amount: z.coerce.number().gt(0, { 
        message: 'Please enter an amount greater than $0.' 
    }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const UserFormSchema = z.object({
    name: z.string(),
    age: z.string(),
    title: z.string(),
    hometown: z.string()
})

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        }
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  try {
      await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return {
        message: 'Database Error: Failed to Update Invoice'
    }
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Invoice'
        }
    }
}

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
    revalidatePath('/dashboard/users/confirmation');
    redirect('/dashboard/users/confirmation');
}

export async function deleteUser(id: string) {
    try {
        await sql`DELETE FROM Users WHERE id = ${id}`;
        revalidatePath('/dashboard/users/confirmation');
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Invoice'
        }
    }
}