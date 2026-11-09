import { ImageManipulator, SaveFormat } from "expo-image-manipulator";

// Reduz a foto e converte para JPEG antes do envio.
// A API recusa arquivos acima de 5 MB e formatos fora de JPEG, PNG e WebP.
// width: 1280 para análises (padrão); a foto de perfil usa bem menos.
export async function prepareImage(uri: string, width = 1280) {
  const image = await ImageManipulator.manipulate(uri)
    .resize({ width })
    .renderAsync();
  const result = await image.saveAsync({
    compress: 0.7,
    format: SaveFormat.JPEG,
  });
  return result.uri;
}
