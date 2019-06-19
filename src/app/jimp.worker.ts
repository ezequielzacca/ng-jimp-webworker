/// <reference lib="webworker" />
import { compressImage } from "./jimp.utils";

addEventListener("message", async ({ data }: { data: string }) => {
  var compressedBase64 = await compressImage(data);
  postMessage(compressedBase64);
});
