const { Storage } = require('@google-cloud/storage');

// Instantiate the storage object with your service account key
const storage = new Storage({ keyFilename: '/Users/diyagoyal/Downloads/tata-429322-4858991658b8.json' });
const bucketName = 'aquarium-models'; // Replace with your actual bucket name

async function uploadFile(filePath, destination) {
    try {
      await storage.bucket(bucketName).upload(filePath, { destination });
      console.log(`File uploaded to ${bucketName}/${destination}`);
      return `https://storage.googleapis.com/${bucketName}/${destination}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('File upload failed');
    }
  }
  
  module.exports = uploadFile;
