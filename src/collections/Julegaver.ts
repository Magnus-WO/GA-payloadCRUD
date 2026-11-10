import { CollectionConfig } from "payload";

export const Julegaver: CollectionConfig = {
  slug: "julegaver",
  labels: { singular: "Julegave", plural: "Julegaver" },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: { useAsTitle: "giftName" },
  fields: [
    {
      name: "giftName",
      label: "Hva er julegaven?",
      type: "text",
      required: true,
    },
    {
      name: "reciever",
      type: "text",
      label: "Hvem skal få denne gaven?",
      required: true,
    },
    {
      name: "price",
      label: "Hva koster gaven?",
      type: "number",
      defaultValue: 150,
      min: 0,
    },
    {
      name: "hasBeenBought",
      label: "Er gaven kjøpt inn?",
      defaultValue: false,
      type: "checkbox",
    },
  ],
};
