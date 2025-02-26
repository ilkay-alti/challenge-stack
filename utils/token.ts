import prisma from "../lib/prisma";

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 12 * 3600 * 1000); //12 hours
    const existingToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    if (existingToken) {
      if (existingToken.expires > new Date()) {
        const ExpiredPasswordResetToken =
          await prisma.passwordResetToken.findUnique({
            where: {
              id: existingToken.id,
            },
          });
        return ExpiredPasswordResetToken;
      }

      await prisma.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const newPasswordResetToken = await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return newPasswordResetToken;
  } catch (e: any) {
    throw new Error(`Error in generating password reset token: ${e}`);
  }
};
export const generateTwoFactorToken = async (email: string) => {
  try {
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 600 * 1000); // 10 minutes
    const existing2FactorToken = await prisma.twoFactorToken.findFirst({
      where: {
        email,
      },
    });

    if (existing2FactorToken) {
      if (existing2FactorToken.expires > new Date()) {
        const ExpiredTwoFactorToken = await prisma.twoFactorToken.findUnique({
          where: {
            id: existing2FactorToken.id,
          },
        });
        return ExpiredTwoFactorToken;
      }
      await prisma.twoFactorToken.delete({
        where: {
          id: existing2FactorToken.id,
        },
      });
    }

    const new2FactorToken = await prisma.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return new2FactorToken;
  } catch (e) {
    throw new Error(`Error in generating 2 Factor token: ${e}`);
  }
};
