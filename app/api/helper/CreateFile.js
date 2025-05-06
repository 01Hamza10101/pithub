import { Storage } from '@google-cloud/storage';

export async function CreateFile(FilePath, FileName, FileType = 'text/plain', FileContent = '') {
  const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
  });

  const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET);

  const normalizedFilePath = FilePath.replace(/\/$/, '');

  const normalizedFileName = FileName.replace(/\/$/, '');

  const fullPath = normalizedFilePath
    ? `${normalizedFilePath}/${normalizedFileName}`
    : normalizedFileName;

  const file = bucket.file(fullPath);

  await file.save(FileContent, {
    contentType: FileType,
    resumable: false,
  });
}
