import random from 'random';

/**
 * 랜덤 숫자 생성
 *
 * @param length - 숫자의 글이
 * @returns {string} - 랜덤 숫자
 */
export const generateRandomNumber = (length: number): string => {
  const maxNumber = 10 ** length - 1;
  const randomNumber = String(random.int(0, maxNumber)).padStart(length, '0');
  return randomNumber;
};
