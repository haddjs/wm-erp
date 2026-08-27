import { db, delay, genId } from "./mock-db";

export interface UploadFileResponse {
  file_id: string;
  file_path: string;
  file_url: string;
}

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  await delay(400);
  const record: UploadFileResponse = {
    file_id: genId("file"),
    file_path: file.name,
    file_url: URL.createObjectURL(file),
  };
  db.files.set(record.file_id, record);
  return record;
}

export async function getFileById(fileId: string): Promise<UploadFileResponse> {
  await delay();
  const record = db.files.get(fileId);
  if (!record) throw new Error("File not found");
  return record;
}

export async function openFileWithAuth(filePath: string): Promise<void> {
  await delay();
  const record = [...db.files.values()].find(
    (f) => f.file_path === filePath,
  );
  const url = record?.file_url ?? filePath;
  window.open(url, "_blank");
}
