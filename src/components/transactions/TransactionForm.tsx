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
import { CalendarIcon, Coins, Loader, Save } from "lucide-react";
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
import { currencies } from "@/constant/config";
import { useScopedI18n } from "@/locales/client";

const TransactionForm = ({
  categories,
  categoryId,
  transaction,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
  currency,
}: {
  transaction?: Transaction | null;
  categories: Category[];
  categoryId?: CategoryId;
  openModal?: (transaction?: Transaction) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
  currency: string | undefined;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Transaction>(insertTransactionParams);
  const editing = !!transaction?.id;
  const [date, setDate] = useState<Date | undefined>(transaction?.date);
  const [type, setType] = useState<string | undefined>(transaction?.type);

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("transactions");
  const t = useScopedI18n("transactions");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Transaction }
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(t(`${action}Failed`), {
        description: data?.error ?? t("genericError"),
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(t(`${action}Success`));
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
    // @ts-ignore
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
      <div className="border px-2 py-3 rounded-xl mb-2 bg-yellow-200 dark:bg-yellow-600 hidden">
        <RadioGroup name="type" defaultValue={type ?? "revenues"}>
          <div className="flex items-center justify-evenly">
            <div className="flex items-center space-s-2">
              <RadioGroupItem
                value="expenses"
                id="expenses"
                checked={type === "expenses"}
                onClick={() => setType("expenses")}
              />
              <Label htmlFor="expenses">{t("expenses")}</Label>
            </div>
            <div className="flex items-center space-s-2">
              <RadioGroupItem
                value="revenues"
                id="revenues"
                checked={type === "revenues"}
                onClick={() => setType("revenues")}
              />
              <Label htmlFor="revenues">{t("revenues")}</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="pb-4 pt-2">
        <div className="flex items-center justify-between px-3 py-2 text-lg bg-secondary/50 rounded-lg">
          <Coins className="text-secondary-foreground me-2" />
          <input
            type="string"
            name="amount"
            placeholder="0.00"
            defaultValue={transaction?.amount ?? ""}
            className={cn(
              "outline-none bg-secondary/50 w-full px-2 rounded",
              errors?.amount && "border-b border-destructive text-destructive"
            )}
          />
          <span className="ms-2">
            {currencies.find((c) => c.code == currency)?.symbol}
          </span>
        </div>
      </div>

      <div className="rounded-lg pt-2 px-4 border">
        {categoryId ? null : (
          <div>
            <Label
              className={cn(
                "mb-2 inline-block",
                errors?.categoryId ? "text-destructive" : ""
              )}>
              {t("category")}
            </Label>
            <Select
              defaultValue={transaction?.categoryId}
              name="categoryId"
              onValueChange={(id) =>
                setType(categories.find((c) => c.id == id)?.type)
              }>
              <SelectTrigger
                className={cn(
                  errors?.categoryId ? "ring ring-destructive" : "",
                  " bg-background"
                )}>
                <SelectValue placeholder={t("selectCategory")} />
              </SelectTrigger>
              <SelectContent className="">
                {categories?.length == 0 && (
                  <div className="text-sm px-2">
                    {t("noCategory")}{" "}
                    <Link href={"/categories"}>
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
            {t("date")}
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
                  <span>{format(new Date(), "PPP")}</span>
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
            placeholder={t("name")}
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
            Images
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
          <Textarea
            name="description"
            placeholder={t("description")}
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
            Status
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
          {t(isDeleting ? "deleting" : "delete")}
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
  const t = useScopedI18n("transactions");

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
