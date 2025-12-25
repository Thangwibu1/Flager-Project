
export const toNeo4jDate = (date: Date): number => {
  return date.getTime();
}

export const toPureDate = (neo4jDate: number): Date => {
  return new Date(Number(neo4jDate));
}
