import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

// Reduz a foto e converte para JPEG antes do envio.
// A API recusa arquivos acima de 5 MB e formatos fora de JPEG, PNG e WebP.
export async function prepareImage(uri: string) {
  const image = await ImageManipulator.manipulate(uri)
    .resize({ width: 1280 })
    .renderAsync();
  const result = await image.saveAsync({
    compress: 0.7,
    format: SaveFormat.JPEG,
  });
  return result.uri;
}
