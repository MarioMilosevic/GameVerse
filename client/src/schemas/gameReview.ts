import z from "zod";

export const gameReviewSchema = z
  .object({
    rating: z.number(),
    content: z
      .string()
      .min(2),
  })
  .required();

export type GameReviewSchema = z.infer<typeof gameReviewSchema>;
export type GameReviewFields = keyof GameReviewSchema;

export type GameReviewFieldErrors = {
  [key in GameReviewFields]?: string;
};

export type GameReviewTouchedFields = {
  [key in GameReviewFields]?: boolean;
};
