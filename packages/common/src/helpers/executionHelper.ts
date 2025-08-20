/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

/**
 * Postpones execution of the callback into a separate task
 * @param callback
 */
export const deferExecution = (callback: () => void) =>
  setTimeout(() => callback(), 0);

export const yieldToMain = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};
