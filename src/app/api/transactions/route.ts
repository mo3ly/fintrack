import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/lib/api/transactions/mutations";
import { 
  transactionIdSchema,
  insertTransactionParams,
  updateTransactionParams 
} from "@/lib/db/schema/transactions";

export async function POST(req: Request) {
  try {
    const validatedData = insertTransactionParams.parse(await req.json());
    const { transaction } = await createTransaction(validatedData);

    revalidatePath("/transactions"); // optional - assumes you will have named route same as entity

    return NextResponse.json(transaction, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  }
}


export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateTransactionParams.parse(await req.json());
    const validatedParams = transactionIdSchema.parse({ id });

    const { transaction } = await updateTransaction(validatedParams.id, validatedData);

    return NextResponse.json(transaction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = transactionIdSchema.parse({ id });
    const { transaction } = await deleteTransaction(validatedParams.id);

    return NextResponse.json(transaction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
