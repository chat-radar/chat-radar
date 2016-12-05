export default function splitAddress(address: string) {
  const parts = address.split(', ');

  const city = parts.shift();
  const other = parts.join(', ');

  return { city, other };
};
