// import FormData from 'form-data';
// import fs from 'fs';
// import fetch from 'node-fetch';

// class MediaHandler {
//   constructor(uploadId) {
//     if (!uploadId) {
//       throw new Error('Upload ID is required for MediaHandler.');
//     }
//     this.uploadId = uploadId;
//     this.baseApi = 'https://media.bizonance.in/api/v1/image';
//   }

//   async upload(filePath) {
//     const url = `${this.baseApi}/upload/${this.uploadId}/META`;

//     try {
//       if (!fs.existsSync(filePath)) {
//         throw new Error(`File not found at path: ${filePath}`);
//       }

//       const form = new FormData();
//       const fileStream = fs.createReadStream(filePath);
//       form.append('file', fileStream);

//       const length = await new Promise((resolve, reject) => {
//         form.getLength((err, len) => (err ? reject(err) : resolve(len)));
//       });

//       const response = await fetch(url, {
//         method: 'POST',
//         body: form,
//         headers: {
//           ...form.getHeaders(),
//           'Content-Length': length,
//         },
//       });

//       if (!response.ok) {
//         const errorBody = await response.text();
//         throw new Error(
//           `Upload failed with status ${response.status}: ${errorBody}`,
//         );
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Upload Error:', error.message);
//       throw error;
//     }
//   }

//   async delete(fileName) {
//     if (!fileName) throw new Error('File name is required for deletion.');

//     const url = `${this.baseApi}/download/${this.uploadId}/${fileName}?delete=both`;

//     try {
//       const response = await fetch(url, { method: 'GET' });

//       if (!response.ok) {
//         const errorBody = await response.text();
//         throw new Error(
//           `Delete failed with status ${response.status}: ${errorBody}`,
//         );
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Delete Error:', error.message);
//       throw error;
//     }
//   }
// }

// // Initialize with the fixed upload ID
// const mediaHandler = new MediaHandler('473d09b1-bd47-4297-9b0c-f79e6a7c9fc8');

// export default mediaHandler;
