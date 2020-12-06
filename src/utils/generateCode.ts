export const generateCode = () => {
  const codeA = Math.floor(Math.random()*(999-100+1)+100);
  const codeB = Math.floor(Math.random()*(999-100+1)+100);

  return `${codeA}-${codeB}`;
};
