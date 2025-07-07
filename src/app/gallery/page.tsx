// app/gallery/page.tsx

import fs from 'fs';
import path from 'path';
import Gallery from './Gallery'; // We will create this next

export const metadata = {
  title: 'Photo Gallery',
  description: 'A collection of our favorite photos.',
};

export default function GalleryPage() {
  // 1. Define the path to the gallery images directory
  const imageDirectory = path.join(process.cwd(), '/public/gallery-images');

  // 2. Read the filenames from the directory
  // We use a try-catch block to prevent errors if the directory doesn't exist
  let imageFilenames: string[];
  try {
    imageFilenames = fs.readdirSync(imageDirectory);
  } catch (error) {
    console.error("Could not read the gallery images directory:", error);
    // If the directory doesn't exist, return an empty array
    imageFilenames = [];
  }
  
  // 3. Render the client component, passing the filenames as a prop
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Photo Gallery</h1>
      <p className="text-center text-lg text-gray-600 mb-12">
        A collection of beautiful moments. Click on any image to view it larger.
      </p>
      
      {imageFilenames.length > 0 ? (
        <Gallery filenames={imageFilenames} />
      ) : (
        <p className="text-center text-xl">The gallery is currently empty.</p>
      )}
    </div>
  );
}