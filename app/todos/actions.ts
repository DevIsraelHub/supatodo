"use server";

import { Todo } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const supabase = createClient();
  const text = formData.get("todo") as string | null;

  if (!text) {
    throw new Error("Text is required!");
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in!");
  }
  const { error } = await supabase.from("todos").insert({
    task: text,
    user_id: user.id,
  });

  if (error) {
    throw new Error("Error adding task" + " " + error.message);
  }

  revalidatePath("/todo")

  console.log(text);
}

export async function deleteTodo(id: number) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in!");
  }
  const { error } = await supabase.from("todos").delete().match({
    user_id: user.id,
    id: id,
  })
  if (error) {
    throw new Error("Error deleting todo" + " " + error.message);
  }

  revalidatePath("/todos")
}

export async function updateTodo(todo: Todo) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in!");
  }
  const { error } = await supabase.from("todos").update(todo).match({
    user_id: user.id,
    id: todo.id,
  })

  if (error) {
    throw new Error("Error updating todo" + " " + error.message);
  }
  revalidatePath("/todos")
}