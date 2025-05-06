import { Storage } from '@google-cloud/storage';
import repository from '@/app/api/models/repository';

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    credentials: {
      client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
  });

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET);

export async function GET(req) {
  const prefix = req.nextUrl.searchParams.get('prefix') || '';

  try {
    const [files] = await bucket.getFiles({ prefix });

    const foldersSet = new Set();
    const fileList = [];

    files.forEach(file => {
      const filePath = file.name;
      const relativePath = filePath.replace(prefix, '');

      // Extract folders from file path
      const parts = relativePath.split('/');
      if (parts.length > 1) {
        for (let i = 0; i < parts.length - 1; i++) {
          const folderPath = parts.slice(0, i + 1).join('/') + '/';
          foldersSet.add(prefix + folderPath);
        }
      }

      // Add file info (exclude folders themselves)
      if (!file.name.endsWith('/')) {
        fileList.push({
          name: file.name,
          size: parseInt(file.metadata.size || '0'),
          updated: file.metadata.updated,
          contentType: file.metadata.contentType,
        });
      }
    });
    const repo = await repository.findOne({ name: prefix });
    if (repo) {
      repo.views += 1;
      await repo.save(); // Don't forget to save changes to the DB
    }
    return new Response(JSON.stringify({
      prefix,
      folders: Array.from(foldersSet),
      files: fileList,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error listing folders and files:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
