export const isImageUrl = async (src: string, ops?: any) => {
  try {
    // const img = new Image();
    const res = await fetch(src, { method: "HEAD", ...ops });
    return res.headers.get("Content-Type")?.startsWith("image/");
    // const buff = await res.blob();
    // return buff.type.startsWith("image/");
  } catch (error) {
    return false;
  }
};
