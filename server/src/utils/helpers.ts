import prisma from "../../prisma/prismaClient";

export async function getAverageRating(gameId: number) {
  try {
    const ratingAggregation = await prisma.review.aggregate({
      where: { gameId },
      _avg: {
        rating: true,
      },
    });
    return ratingAggregation._avg.rating?.toFixed(1) || 0;
  } catch (error) {
    console.error(error);
  }
}
