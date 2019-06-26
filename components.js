import { Steps as MDSteps } from "mdx-deck";

/**
 * @param {JSX.Element[]} xs
 * @returns {(_: { step: number }) => JSX.Element}
 */
export const steps = xs => ({ step }) => xs[step] || null;

export const Steps = ({ children }) => (
  <MDSteps render={steps(children)} length={children.length - 1} />
);
