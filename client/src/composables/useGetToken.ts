import { gameVerseToken } from "@/shared/constants";
export default function useGetJWT() {
  const jwtToken = localStorage.getItem(gameVerseToken);
  if (!jwtToken) {
    return null;
  }

  return jwtToken;
}
