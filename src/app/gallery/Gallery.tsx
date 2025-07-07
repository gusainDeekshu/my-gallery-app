// app/gallery/Gallery.tsx
'use client'; // This directive marks it as a Client Component

import React from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Define the type for the component's props
interface GalleryProps {
  filenames: string[];
}

export default function Gallery({ filenames }: GalleryProps) {
  // State to manage the lightbox
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  // Create the array of slide objects for the lightbox
  const slides = filenames.map(filename => ({
    src: `/gallery-images/${filename}`,
    width: 1200, // Optional: specify dimensions
    height: 800,
  }));

  const openLightbox = (imageIndex: number) => {
    setIndex(imageIndex);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filenames.map((filename, idx) => (
          <div 
            key={filename} 
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            onClick={() => openLightbox(idx)}
          >
            <Image
              src={`/gallery-images/${filename}`}
              alt={`Gallery image ${idx + 1}`}
              width={500}
              height={500}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              // Add a placeholder for better loading experience
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8/x8AAuMB8DtXNJsAAAAASUVORK5CYII="
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
      />
    </>
  );
}