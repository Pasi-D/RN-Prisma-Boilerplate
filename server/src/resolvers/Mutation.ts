import { hash, compare } from "bcrypt";
import { MutationResolvers } from "../generated/resolvers";
import { createToken, getLoggedUserId } from "../utils";
import { TypeMap } from "./types/TypeMap";

export interface MutationParent {}

export const Mutation: MutationResolvers.Type<TypeMap> = {
  refreshToken: async (_parent, { token }, ctx) => {
    const userId = getLoggedUserId(ctx,token);
    return createToken(userId);
  },

  signup: async (_parent, { password, name, email }, ctx) => {
    const hashedPassword = await hash(password, 10);
    const user = await ctx.db.createUser({
      name,
      email,
      password: hashedPassword
    });

    return {
      token: createToken(user.id),
      user
    };
  },
  login: async (_parent, { email, password }, ctx) => {
    const user = await ctx.db.user({ email });

    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    return {
      token: createToken(user.id),
      user
    };
  }
};
