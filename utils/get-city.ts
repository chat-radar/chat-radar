export default function getCity(address: any, name: string) {
  for (let prop of ['city', 'town', 'village', 'hamlet']) {
    if (address.hasOwnProperty(prop))
      return address[prop];
  }
  return name;
};
