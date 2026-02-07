import { baseUrl, profileImg } from "@/shared/constants";

export const renderUserImage = (image: string) =>
  image.startsWith("images") ? `${baseUrl.replace("/api/v1", "")}/public/${image}` : profileImg;
