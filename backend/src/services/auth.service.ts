import jwt from 'jsonwebtoken';

export const login = async (data: { email: string; password: string }) => {
  const token = jwt.sign(
    { id: 'user_id', email: data.email, role: 'user' },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );
  return token;
};
export const validUser = async (data: { userId: string }): Promise<boolean> => {
  return true;
};
