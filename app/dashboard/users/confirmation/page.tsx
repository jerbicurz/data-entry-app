import { fetchUserPages, fetchUsers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { UsersTableSkeleton } from "@/app/ui/skeletons";
import { CreateUserButton } from "@/app/ui/users/buttons";
import Pagination from "@/app/ui/users/pagination";
import Table from "@/app/ui/users/table";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchUserPages();
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: '/dashboard/users/confirmation' },
                    {
                        label: 'Table View',
                        href: '/dashboard/users/confirmation',
                        active: true,
                    },
                ]}
            />
            <div>Success!</div>
            <div className="w-40">
                <CreateUserButton />
            </div>
            <Suspense key={currentPage} fallback={<UsersTableSkeleton />}>
                <Table currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    );
}