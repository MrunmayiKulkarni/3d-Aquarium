const mongoose = require('mongoose');

const aquariumSchema = new mongoose.Schema({
  userId: String, // Reference to the user who created the customization
  aquariumId: String, // Unique ID for each aquarium
  customizations: Object, // Store customization data (e.g., fish, background, etc.)
  modelUrl: String, // URL to the model stored in Google Cloud Storage
  createdAt: { type: Date, default: Date.now },
});

const Aquarium = mongoose.model('CustomAquarium', aquariumSchema);
module.exports = Aquarium;
