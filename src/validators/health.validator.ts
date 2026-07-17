export function validateHealthData(data: any) {

  const {
    targetDietDaily,
    levelActivity
  } = data;


  if (
    typeof targetDietDaily !== "number" ||
    targetDietDaily <= 0
  ) {
    return "Meta calórica deve ser um número positivo";
  }


  const levels = [
    "BAIXO",
    "MODERADO",
    "ALTO"
  ];


  if (!levels.includes(levelActivity)) {
    return "Nível de atividade inválido";
  }


  return null;
}