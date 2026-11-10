"use server";
import config from "@payload-config";
import { revalidatePath } from "next/cache";
import { getPayload } from "payload";

export async function createJulegave(formData: FormData) {
  const giftName = formData.get("giftName");
  const reciever = formData.get("reciever");
  const giftPrice = Number(formData.get("price"));

  if (
    typeof giftName !== "string" ||
    typeof reciever !== "string" ||
    !Number.isInteger(giftPrice) ||
    !giftName.trim() ||
    !reciever.trim()
  ) {
    throw new Error("Feil i inndata");
  }
  const payload = await getPayload({ config });
  await payload.create({
    collection: "julegaver",
    data: {
      giftName: giftName.trim(),
      reciever: reciever.trim(),
      price: giftPrice,
    },
    overrideAccess: false, //Fordi vi har satt accessregler i julegaver collection, må vi sette på overrideAccess for at den skal overholde reglene. Setter vi ikke på denne er defaulten slik at den overstyrer de reglene vi har satt
  });
  revalidatePath("/"); //Henter den nye julegaven fra payload, uten at det ser ut som en refresh
}

export async function getJulegaver() {
  const payload = await getPayload({ config });
  const queryResult = await payload.find({
    collection: "julegaver",
    sort: "-createdAt",
    limit: 100,
    overrideAccess: false,
  });
  return queryResult.docs;
}

export async function deleteJulegave(id: number) {
  if (!Number.isInteger(id)) {
    throw new Error("Ugyldig id!");
  }

  const payload = await getPayload({ config });
  await payload.delete({ collection: "julegaver", id, overrideAccess: false });
  revalidatePath("/");
}

export async function updateJulegave(id: number, formData: FormData) {
  const newGiftName = formData.get("giftName");
  const newReciever = formData.get("reciever");
  const newPrice = Number(formData.get("price"));

  if (!Number.isInteger(id)) {
    throw new Error("Id for julegaven er ikke gyldig");
  }

  if (
    typeof newGiftName !== "string" ||
    typeof newReciever !== "string" ||
    !Number.isInteger(newPrice) ||
    !newGiftName.trim() ||
    !newReciever.trim()
  ) {
    throw new Error("Feil i inndata");
  }

  const payload = await getPayload({ config });
  await payload.update({
    collection: "julegaver",
    id,
    data: {
      giftName: newGiftName.trim(),
      reciever: newReciever.trim(),
      price: newPrice,
    },
    overrideAccess: false,
  });
  revalidatePath("/");
}
