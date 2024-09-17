// import fs from "fs";
// import path from "path";
import { db } from "./connection";
import { schedule } from "./schemas";
import * as FileSystem from "expo-file-system";

// Função para realizar o backup
export const backupDatabase = async () => {
  try {
    // // Localização do banco de dados atual
    // const dbFilePath = path.join(__dirname, "database.sqlite"); // Mude o caminho se necessário
    // // Localização do arquivo de backup (adiciona timestamp ao nome do arquivo)
    // const backupFileName = `database_backup_${new Date()
    //   .toISOString()
    //   .replace(/[:.]/g, "-")}.sqlite`;
    // const backupFilePath = path.join(__dirname, "backups", backupFileName); // Crie uma pasta 'backups' ou altere o caminho se necessário

    // // Verifica se o diretório de backups existe, se não, cria-o
    // if (!fs.existsSync(path.join(__dirname, "backups"))) {
    //   fs.mkdirSync(path.join(__dirname, "backups"));
    // }

    // // Realiza a cópia do arquivo de banco de dados
    // fs.copyFileSync(dbFilePath, backupFilePath);

    // console.log(`Backup realizado com sucesso: ${backupFilePath}`);
  } catch (error) {
    console.error("Erro ao realizar o backup:", error);
  }
};

export const exportData = async () => {
  try {
    const data = await db.select().from(schedule);

    const formattedData = data
      .map((item) => `${item.id},${item.date},${item.spoons},${item.pH}`)
      .join("\n");

    const backupFilePath = `${FileSystem.documentDirectory}backup_schedules.txt`;
    await FileSystem.writeAsStringAsync(backupFilePath, formattedData);
    console.log(`Backup realizado com sucesso: ${backupFilePath}`);

    return backupFilePath
  } catch (error) {
    console.error("Erro ao realizar o backup:", error);
  }
};

export const importFromTxt = async () => {
  try {
    const backupFilePath = `${FileSystem.documentDirectory}backup_schedules.txt`;

    const fileInfo = await FileSystem.getInfoAsync(backupFilePath);
    if (!fileInfo.exists) {
      throw new Error("Arquivo de backup não encontrado");
    }

    const fileData = await FileSystem.readAsStringAsync(backupFilePath);
    const lines = fileData.trim().split("\n");

    // Mapear os dados e inseri-los no banco de dados
    for (const line of lines) {
      const [id, date, spoons, pH] = line.split(",");

      // Insere cada linha na tabela schedules
      await db.insert(schedule).values({
        id: parseInt(id),
        date,
        spoons: parseFloat(spoons),
        pH: parseFloat(pH),
      });
    }

    console.log("Dados importados com sucesso!");
  } catch (error) {
    console.error("Erro ao importar os dados:", error);
  }
};
