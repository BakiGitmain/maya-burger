import BurgerForm from "@/components/admin/menu/burger-form";

export default function AddMenuItemPage() {
  return (
    <div className="min-h-full bg-zinc-50 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-[1400px]">
        <BurgerForm mode="create" />
      </div>
    </div>
  );
}