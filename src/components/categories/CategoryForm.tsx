import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/[locale]/(app)/categories/useOptimisticCategories";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBackPath } from "@/components/shared/BackButton";

import {
  type Category,
  insertCategoryParams,
} from "@/lib/db/schema/categories";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/lib/actions/categories";
import { useScopedI18n } from "@/locales/client";
import { Loader, Save } from "lucide-react";

const CategoryForm = ({
  category,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  category?: Category | null;

  openModal?: (category?: Category) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Category>(insertCategoryParams);
  const editing = !!category?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("categories");

  const t = useScopedI18n("categories");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Category }
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(t(`${action}Failed`), {
        description: data?.error ?? t("genericError"),
      });
    } else {
      router.refresh();
      toast.success(t(`${action}Success`));
      postSuccess && postSuccess();
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const categoryParsed = await insertCategoryParams.safeParseAsync({
      ...payload,
    });
    if (!categoryParsed.success) {
      setErrors(categoryParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = categoryParsed.data;
    const pendingCategory: Category = {
      updatedAt:
        category?.updatedAt ??
        new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt:
        category?.createdAt ??
        new Date().toISOString().slice(0, 19).replace("T", " "),
      id: category?.id ?? "",
      userId: category?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic &&
          addOptimistic({
            data: pendingCategory,
            action: editing ? "update" : "create",
          });

        const error = editing
          ? await updateCategoryAction({ ...values, id: category.id })
          : await createCategoryAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingCategory,
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-3"}>
      {/* Schema fields start */}
      <div className="border px-2 py-3 rounded-xl mb-2 bg-yellow-200 dark:bg-yellow-600">
        <RadioGroup name="type" defaultValue={category?.type ?? "revenues"}>
          <div className="flex items-center justify-evenly">
            <div className="flex items-center space-s-2">
              <RadioGroupItem value="expenses" id="expenses" />
              <Label htmlFor="expenses">{t("expenses")}</Label>
            </div>
            <div className="flex items-center space-s-2">
              <RadioGroupItem value="revenues" id="revenues" />
              <Label htmlFor="revenues">{t("revenues")}</Label>
            </div>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.name ? "text-destructive" : ""
          )}>
          {t("name")}
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={category?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic &&
                addOptimistic({ action: "delete", data: category });
              const error = await deleteCategoryAction(category.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: category,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}>
          {t(isDeleting ? "deleting" : "delete")}
        </Button>
      ) : null}
    </form>
  );
};

export default CategoryForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  const t = useScopedI18n("categories");

  return (
    <Button
      type="submit"
      className="me-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}>
      {isUpdating || isCreating ? (
        <Loader className="me-1 h-4 w-4 animate-spin" />
      ) : (
        <Save className="me-1 h-4 w-4" />
      )}
      {editing
        ? isUpdating
          ? t("updating")
          : t("update")
        : isCreating
        ? t("creating")
        : t("create")}
    </Button>
  );
};
