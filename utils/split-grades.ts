export default function splitGrades(num: number) {
  return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
