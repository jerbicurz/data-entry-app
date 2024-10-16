import { lusitana } from "@/app/ui/fonts";
import CreateUserForm from "@/app/ui/users/create-form";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Create User</h1>
      </div>
      <CreateUserForm />
    </div>
  );
}