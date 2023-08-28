export const handleComment = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setComment: (comment: string) => void
) => {
  setComment(e.target.value);
};
