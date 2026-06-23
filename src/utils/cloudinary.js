/**
 * Direct client-side file upload to Cloudinary.
 * @param {File} file - The file to upload.
 * @returns {Promise<{url: string, publicId: string, resourceType: string}>}
 */
export async function uploadToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

  if (!cloudName) {
    throw new Error('Cloudinary Cloud Name is not configured in environment variables.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  // Note: Using the generic /upload endpoint allows Cloudinary to auto-detect resource types (images, raw PDFs, etc.)
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'Failed to upload file to Cloudinary';
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.error?.message || errorMessage;
    } catch (e) {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
  };
}
