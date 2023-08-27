export const handleCheckbox = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPublicTask: (publicTask: boolean) => void
) => {
  setPublicTask(e.target.checked);
};
