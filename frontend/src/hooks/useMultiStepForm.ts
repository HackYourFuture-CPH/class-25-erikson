import { ReactElement } from 'react';
import useFormStore from '../store/form.store';

export const useMultistepForm = (steps: ReactElement[]) => {
  const { currentIndex, setCurrentIndex } = useFormStore();

  const next = () => {
    return currentIndex >= steps.length - 1
      ? setCurrentIndex(currentIndex)
      : setCurrentIndex(currentIndex + 1);
  };

  const back = () => {
    return currentIndex <= 0 ? setCurrentIndex(currentIndex) : setCurrentIndex(currentIndex - 1);
  };

  const goTo = (currentIndex: number) => {
    setCurrentIndex(currentIndex);
  };

  return {
    currentIndex,
    step: steps[currentIndex],
    steps,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
};
