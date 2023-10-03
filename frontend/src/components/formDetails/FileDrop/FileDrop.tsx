import { DragEvent, useState } from 'react';
import classes from "./FileDrop.module.css";
 
interface FileDropProps {
  onImageSelect: (selectedImage: File | undefined) => void;
}

export function FileDrop({ onImageSelect }: FileDropProps) {
  const [imageData, setImageData] = useState<string | null>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageData(reader.result as string);
        onImageSelect(file);
      };

      reader.onerror = () => {
        console.error('Error reading the file path.');
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {imageData ? (
        <img
          src={imageData}
          alt="Dropped Image"
          className={classes.dropArea}
        />
      ) : (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={classes.dropArea}
        >
          <div className={classes.title}>
            <img src="images/gallery.png" />
            <p>Add image</p>
          </div>
        </div>
      )}
    </>
  );
}
