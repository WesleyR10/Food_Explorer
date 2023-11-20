const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/uploads")

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename( //renomear o local do arquivo
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath)
    } catch {
      return;
    }

    await fs.promises.unlink(filePath) //Para deletar o arquivo
  }


  async deleteFileTMP(file) {
    console.log('Deleting file from tmp:', file); // Adicione um log para verificar o arquivo sendo excluído da pasta tmp

    const tmpFilePath = path.resolve(uploadConfig.TMP_FOLDER, file);

    try {
      await fs.promises.unlink(tmpFilePath); // Exclui o arquivo apenas da pasta tmp
      console.log('File deleted from tmp successfully'); // Log após a exclusão do arquivo temporário
    } catch {
      return;
    }
  }
}

module.exports = DiskStorage