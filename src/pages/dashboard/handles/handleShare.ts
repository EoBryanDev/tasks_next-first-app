export const handleShare = async (id: string) => {
  await navigator.clipboard.writeText(
    `${process.env.NEXT_PUBLIC_URL}/task/${id}`
  );
};
