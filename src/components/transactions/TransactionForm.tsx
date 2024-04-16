import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/[locale]/(app)/transactions/useOptimisticTransactions";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  type Transaction,
  insertTransactionParams,
} from "@/lib/db/schema/transactions";
import {
  createTransactionAction,
  deleteTransactionAction,
  updateTransactionAction,
} from "@/lib/actions/transactions";
import { type Category, type CategoryId } from "@/lib/db/schema/categories";
import { Textarea } from "@/components/ui/textarea";

// import Link from "next/link";
import { Link } from "next-view-transitions";

const TransactionForm = ({
  categories,
  categoryId,
  transaction,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  transaction?: Transaction | null;
  categories: Category[];
  categoryId?: CategoryId;
  openModal?: (transaction?: Transaction) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Transaction>(insertTransactionParams);
  const editing = !!transaction?.id;
  const [date, setDate] = useState<Date | undefined>(transaction?.date);

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("transactions");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Transaction }
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Transaction ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const transactionParsed = await insertTransactionParams.safeParseAsync({
      categoryId,
      ...payload,
    });
    if (!transactionParsed.success) {
      setErrors(transactionParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = transactionParsed.data;
    const pendingTransaction: Transaction = {
      updatedAt:
        transaction?.updatedAt ??
        new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt:
        transaction?.createdAt ??
        new Date().toISOString().slice(0, 19).replace("T", " "),
      id: transaction?.id ?? "",
      userId: transaction?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic &&
          addOptimistic({
            data: pendingTransaction,
            action: editing ? "update" : "create",
          });

        const error = editing
          ? await updateTransactionAction({ ...values, id: transaction.id })
          : await createTransactionAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingTransaction,
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
    <form action={handleSubmit} onChange={handleChange} className={"space-y-0"}>
      <div className="border px-2 py-2.5 rounded-xl mb-2 bg-yellow-200 dark:bg-yellow-600">
        <RadioGroup name="type" defaultValue={transaction?.type ?? "revenues"}>
          <div className="flex items-center justify-evenly">
            <div className="flex items-center space-s-2">
              <RadioGroupItem value="expenses" id="expenses" />
              <Label htmlFor="expenses">مصروفات</Label>
            </div>
            <div className="flex items-center space-s-2">
              <RadioGroupItem value="revenues" id="revenues" />
              <Label htmlFor="revenues">ايرادات</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="border rounded-lg py-2 px-4 bg-muted">
        {categoryId ? null : (
          <div>
            <Label
              className={cn(
                "mb-2 inline-block",
                errors?.categoryId ? "text-destructive" : ""
              )}>
              التصنيف
            </Label>
            <Select defaultValue={transaction?.categoryId} name="categoryId">
              <SelectTrigger
                className={cn(
                  errors?.categoryId ? "ring ring-destructive" : "",
                  "rtl-grid text-start bg-background"
                )}>
                <SelectValue placeholder="حدد التصنيف" />
              </SelectTrigger>
              <SelectContent className="rtl-grid">
                {categories?.length == 0 && (
                  <div className="text-sm px-2">
                    لا يوجد تصنيفات قم بإضافة تصنيف{" "}
                    <Link href={"categories"}>
                      <Button variant={"secondary"} size={"icon"} className="">
                        +
                      </Button>
                    </Link>
                  </div>
                )}
                {categories?.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id.toString()}
                    className="rtl-grid">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.categoryId ? (
              <p className="text-xs text-destructive mt-2">
                {errors.categoryId[0]}
              </p>
            ) : (
              <div className="h-6" />
            )}
          </div>
        )}

        <div>
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.date ? "text-destructive" : ""
            )}>
            التاريخ
          </Label>
          <br />
          <Popover>
            <Input
              name="date"
              onChange={() => {}}
              readOnly
              value={date?.toUTCString() ?? new Date().toUTCString()}
              className="hidden"
            />

            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full ps-3 text-start font-normal bg-background hover:bg-background",
                  !transaction?.date && "text-muted-foreground"
                )}>
                {date ? (
                  <span>{format(date, "PPP")}</span>
                ) : (
                  <span>اختر التاريخ</span>
                )}
                <CalendarIcon className="ms-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto" align="center">
              <Calendar
                mode="single"
                onSelect={(e: any) => setDate(e)}
                selected={date}
                disabled={(date: any) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                // initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors?.date ? (
            <p className="text-xs text-destructive mt-2">{errors.date[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
      </div>
      <div className="py-4">
        <div>
          <Input
            type="text"
            name="title"
            placeholder="عنوان المعاملة"
            className={cn(errors?.title ? "ring ring-destructive" : "")}
            defaultValue={transaction?.title ?? ""}
          />
          {errors?.title ? (
            <p className="text-xs text-destructive mt-2">{errors.title[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div className="hidden">
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.images ? "text-destructive" : ""
            )}>
            الصور
          </Label>
          <Input
            type="text"
            name="images"
            className={cn(errors?.images ? "ring ring-destructive" : "")}
            defaultValue={transaction?.images ?? ""}
          />
          {errors?.images ? (
            <p className="text-xs text-destructive mt-2">{errors.images[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div>
          <Input
            type="text"
            name="amount"
            placeholder="المبلغ"
            className={cn(errors?.amount ? "ring ring-destructive" : "")}
            defaultValue={transaction?.amount ?? ""}
          />
          {errors?.amount ? (
            <p className="text-xs text-destructive mt-2">{errors.amount[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div>
          {/* <Label
          className={cn(
            "mb-2 inline-block",
            errors?.description ? "text-destructive" : ""
          )}>
          الوصف (اختياري)
        </Label> */}
          <Textarea
            name="description"
            placeholder="الوصف (اختياري)"
            className={cn(errors?.description ? "ring ring-destructive" : "")}
            defaultValue={transaction?.description ?? ""}
          />
          {errors?.description ? (
            <p className="text-xs text-destructive mt-2">
              {errors.description[0]}
            </p>
          ) : (
            <div className="h-6" />
          )}
        </div>

        <div className="hidden">
          <Label
            className={cn(
              "mb-2 inline-block",
              errors?.status ? "text-destructive" : ""
            )}>
            الحالة
          </Label>
          <Input
            type="text"
            name="status"
            className={cn(errors?.status ? "ring ring-destructive" : "")}
            defaultValue={transaction?.status ?? ""}
          />
          {errors?.status ? (
            <p className="text-xs text-destructive mt-2">{errors.status[0]}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
      </div>

      <SaveButton errors={hasErrors} editing={editing} />

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
                addOptimistic({ action: "delete", data: transaction });
              const error = await deleteTransactionAction(transaction.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: transaction,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}>
          {isDeleting ? "جارٍ الحذف..." : "حذف"}
        </Button>
      ) : null}
    </form>
  );
};

export default TransactionForm;

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
  return (
    <Button
      type="submit"
      className="me-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}>
      {editing
        ? isUpdating
          ? "جاري الحفظ..."
          : "حفظ"
        : isCreating
        ? "جاري الإنشاء..."
        : "إنشاء"}
    </Button>
  );
};
