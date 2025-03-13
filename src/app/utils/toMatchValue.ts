export function extractIndicatorValues(data: Record<string, any>, indicator: string): any[] {
  // Mapeo de nombres esperados a nombres en la API
  const indicatorKeyMap: Record<string, string> = {
    dolar: 'Dolares',
    euro: 'Euros',
    uf: 'UFs',
    ipc: 'IPCs',
    utm: 'UTMs'
  };

  // Buscar la clave correcta
  const normalizedKey = indicatorKeyMap[indicator.toLowerCase()];

  if (normalizedKey && data[normalizedKey]) {
    return data[normalizedKey]; 
  } else {
    console.warn(`No se encontró '${indicator}' en la respuesta de la API.`);
    return [];
  }
}
