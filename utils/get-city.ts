export default function getCity(address: any, name: string) {
  for (let prop of ['city', 'town', 'village', 'hamlet', 'county']) {
    if (address.hasOwnProperty(prop))
      return address[prop];
  }
  return name;
};
