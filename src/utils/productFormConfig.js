const inputList = [
  { field: "name", typeInput: "text" },
  { field: "brand", typeInput: "text" },
  { field: "type", typeInput: "array" },
  { field: "aroma", typeInput: "array" },
  {
    typeInput: "object",
    field: "capacity-price-stock",
    detail: [
      { name: "capacity", unit: "ml" },
      { name: "price", unit: "$" },
      { name: "stock", unit: "items" },
    ],
  },
  { field: "image", typeInput: "array" },
  { field: "description", typeInput: "text" },
];

export default inputList;
