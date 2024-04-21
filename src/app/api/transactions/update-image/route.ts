import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { updateTransactionImage } from "@/lib/api/transactions/mutations";
import { transactionIdSchema } from "@/lib/db/schema/transactions";

const updateImageSchema = z.object({
  id: z.string(),
  imageUrl: z.string().url(),
});

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateImageSchema.parse(await req.json());
    const validatedParams = transactionIdSchema.parse({ id });

    const { transaction } = await updateTransactionImage(
      validatedParams.id,
      validatedData.imageUrl
    );

    return NextResponse.json(transaction, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
