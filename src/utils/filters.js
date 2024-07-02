export const FILTERS = [
    {
      type: "color",
      values: ["Red", "Blue", "Green", "White", "Purple", "Pink", "Grey"],
    },
    {
      type: "gender",
      values: ["Men", "Women"],
    },
    {
      type: "price",
      values: [
        {
          label: "0-Rs250",
          min: 0,
          max: 250,
        },
        {
          label: "Rs251-450",
          min: 251,
          max: 450,
        },
        {
          label: "Rs 450",
          min: 451,
          max: Number.MAX_SAFE_INTEGER,
        },
      ],
    },
    {
      type: "type",
      values: ["Polo", "Hoodie", "Basic"],
    },
  ];

