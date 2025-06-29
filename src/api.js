const API_URL = 'https://aifarmer-backend.onrender.com/api';

export async function fetchCropData(cropName) {
  const res = await fetch(`${API_URL}/crop/${cropName}`);
  if (!res.ok) {
    throw new Error('Could not fetch crop data');
  }
  return res.json();
}
