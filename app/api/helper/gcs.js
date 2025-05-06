// utils/gcs.js
import { Storage } from '@google-cloud/storage';
import mime from 'mime-types';
import fs from 'fs';
import path from 'path';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET);

// Upload a single file to GCS
export async function uploadFile(localFilePath, destinationPath) {
  const contentType = mime.lookup(localFilePath) || 'application/octet-stream';
  await bucket.upload(localFilePath, {
    destination: destinationPath,
    metadata: { contentType },
  });
}

// Upload a full folder to GCS
export async function uploadFolder(localFolderPath, destinationFolder = '') {
  const files = fs.readdirSync(localFolderPath);
  for (const file of files) {
    const fullPath = path.join(localFolderPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await uploadFolder(fullPath, path.join(destinationFolder, file));
    } else {
      await uploadFile(fullPath, path.join(destinationFolder, file));
    }
  }
}

// wroking
export async function SaveChanges(path, content) {
  const contentType = mime.lookup(path) || 'text/plain';
  const file = bucket.file(path);
  await file.save(content, { contentType });
}


// Commit changes: here, simulated by writing a commit log
// export async function commitChanges(message = 'Commit made') {
//   const timestamp = new Date().toISOString();
//   const content = `Commit at ${timestamp}: ${message}`;
//   const file = bucket.file(`commits/${timestamp}.txt`);
//   await file.save(content, { contentType: 'text/plain' });
// }

// Get file content working 
export async function getFileContent(filePath) {
  const file = bucket.file(filePath);
  const [contents] = await file.download();
  return contents.toString('utf-8');
}

// Delete file or folder working
export async function deletePath(gcsPath, type) {
  if (type === 'folder') {

    const [files] = await bucket.getFiles({ gcsPath });

    // Also try deleting the folder marker (e.g., "folder/")
    const folderMarker = bucket.file(gcsPath);
    const [markerExists] = await folderMarker.exists();
    if (markerExists) {
      await folderMarker.delete();
      console.log(`Deleted folder marker: ${folderMarker.name}`);
    }

    if (files.length === 0) {
      console.log(`No files found under gcsPath: ${gcsPath}`);
      return;
    }

    await Promise.all(files.map(file => file.delete()));
    console.log(`Deleted ${files.length} file(s) under folder ${gcsPath}`);
  } else if (type === 'file') {
    console.log(`Deleting file: ${gcsPath}`);
    const file = bucket.file(gcsPath);
    const [exists] = await file.exists();

    if (!exists) {
      console.log(`File does not exist: ${gcsPath}`);
      return;
    }

    await file.delete();
    console.log(`Deleted file: ${gcsPath}`);
  } else {
    throw new Error(`Unknown type: ${type}`);
  }
}



// Create file () working
export async function createFile(filePath, content = '//empty file', contentType = 'text/plain') {
  const file = bucket.file(filePath);
  await file.save(content, { contentType });
}

// Create folder () working
export async function createFolder(folderPath) {
  const cleanPath = folderPath.replace(/\/+$/, ''); // remove ALL trailing slashes
  const file = bucket.file(`${cleanPath}/`);
  await file.save('', { contentType: 'text/plain' });
}


// Rename file or folder  working
export async function renamePath(oldPath, newPath) {
  const [files] = await bucket.getFiles({ gcsPath: oldPath });
  for (const file of files) {
    const newFilePath = file.name.replace(oldPath, newPath);
    await file.copy(bucket.file(newFilePath));
    await file.delete();
  }
}
