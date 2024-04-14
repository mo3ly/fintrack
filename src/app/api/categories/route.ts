import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/lib/api/categories/mutations";
import { 
  categoryIdSchema,
  insertCategoryParams,
  updateCategoryParams 
} from "@/lib/db/schema/categories";

export async function POST(req: Request) {
  try {
    const validatedData = insertCategoryParams.parse(await req.json());
    const { category } = await createCategory(validatedData);

    revalidatePath("/categories"); // optional - assumes you will have named route same as entity

    return NextResponse.json(category, { status: 201 });
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

    const validatedData = updateCategoryParams.parse(await req.json());
    const validatedParams = categoryIdSchema.parse({ id });

    const { category } = await updateCategory(validatedParams.id, validatedData);

    return NextResponse.json(category, { status: 200 });
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

    const validatedParams = categoryIdSchema.parse({ id });
    const { category } = await deleteCategory(validatedParams.id);

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
