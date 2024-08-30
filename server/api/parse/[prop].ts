export default defineEventHandler(async (event) => {
  const prop:string = getRouterParam(event, 'prop')!;

  return parseXml(prop);
})