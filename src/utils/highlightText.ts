export const highlightText = (text: string, keyword: string) => {
  return text.split(new RegExp(`(${keyword})`, 'gi'))
}
