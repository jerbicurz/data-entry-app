import { fetchUsers } from '@/app/lib/data';
import { DeleteUser } from './buttons';
import { UserTable } from '@/app/lib/definitions';
import { useSearchParams } from 'next/navigation';

export default async function UsersTable({
  currentPage
}: {
    currentPage: number
}) {
    const users = await fetchUsers(currentPage);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                <div className="md:hidden">
                {users?.map((user) => (
                    <div key={user.id} className="mb-2 w-full rounded-md bg-white p-4">
                        <div className="flex items-center justify-between border-b pb-4">
                            <div>
                            <div className="mb-2 flex items-center">
                                <p>{user.name}</p>
                            </div>
                            <p className="text-sm text-gray-500">{user.age}</p>
                            </div>
                            <p>{user.hometown}</p>
                        </div>
                        <div className="flex w-full items-center justify-between pt-4">
                            <div>
                            <p className="text-xl font-medium">
                                {user.title}
                            </p>
                            </div>
                            <div className="flex justify-end gap-2">
                            <DeleteUser id={user.id} />
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Age
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Title
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Hometown
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {users?.map((user) => (
                    <tr
                        key={user.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                            <p>{user.name}</p>
                        </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                        {user.age}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                        {user.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                        {user.hometown}
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                            <DeleteUser id={user.id} />
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}