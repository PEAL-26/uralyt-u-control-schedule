import { useState } from "react";

import * as DocumentPicker from "expo-document-picker";

export function useSelectFolder() {
  const [folderUri, setFolderUri] = useState<string | null>(null);

  const selectFolder = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Permite selecionar qualquer tipo de documento
        copyToCacheDirectory: false, // Não copia automaticamente para o cache
      });

      console.log(result);
      // if (result === "success") {
      //   // Aqui, você pode utilizar o caminho do arquivo escolhido
      //   return result.uri;
      // } else {
      //   console.log("Seleção cancelada.");
      // }
    } catch (error) {
      console.error("Erro ao selecionar o diretório:", error);
    }

    return null;
  };

  // Função para salvar o arquivo no local selecionado
  const saveFile = async (selectedFolderUri: string) => {
    //   try {
    //     const backupFilePath = await exportSchedulesToTxt();
    //     if (backupFilePath && selectedFolderUri) {
    //       // Pega o nome do arquivo e adiciona ao caminho da pasta selecionada
    //       const fileName = "backup_schedules.txt";
    //       const destinationPath = `${selectedFolderUri}/${fileName}`;
    //       // Move o arquivo para o diretório selecionado
    //       await FileSystem.moveAsync({
    //         from: backupFilePath,
    //         to: destinationPath,
    //       });
    //       console.log("Backup salvo com sucesso no caminho:", destinationPath);
    //     }
    //   } catch (error) {
    //     console.error("Erro ao salvar o arquivo:", error);
    //   }
  };

  // const handleExport = async () => {
  //   const selectedFolder = await selectFolder();
  //   // if (selectedFolder) {
  //   //   setFolderUri(selectedFolder);
  //   //   await saveFile(selectedFolder);
  //   // }
  // };

  return { selectFolder, saveFile };
}
