import { getAccessToken } from './driveAuth';

export const saveToDrive = async (fileName: string, content: string): Promise<string> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('No access token available. Please sign in first.');
  }

  const metadata = {
    name: fileName,
    mimeType: 'application/json',
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([content], { type: 'application/json' }));

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: form,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error?.message || 'Failed to upload file to Drive');
  }

  const data = await res.json();
  return data.id;
};
