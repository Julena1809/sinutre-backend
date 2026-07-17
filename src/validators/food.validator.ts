export function validateFood(data: any) {

  const {
    name,
    caloriesPer100g,
    carbsPer100g,
    proteinPer100g,
    fatPer100g
  } = data;


  if (!name || typeof name !== "string") {
    return "Nome do alimento é obrigatório";
  }


  const nutrients = [
    caloriesPer100g,
    carbsPer100g,
    proteinPer100g,
    fatPer100g
  ];


  if (
    nutrients.some(
      value => typeof value !== "number"
    )
  ) {
    return "Valores nutricionais devem ser números";
  }


  if (
    nutrients.some(
      value => value < 0
    )
  ) {
    return "Valores nutricionais não podem ser negativos";
  }


  return null;
}