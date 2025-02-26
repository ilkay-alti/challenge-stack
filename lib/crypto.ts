import bcrypt from "bcrypt";

export const passwordHash = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const passwordCompare = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};
