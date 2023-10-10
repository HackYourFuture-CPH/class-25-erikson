import { DragEvent, useState } from 'react';
import styles from './FileDrop.module.css';

interface FileDropProps {
  onImageSelect: (selectedImage: File) => void;
}

export function FileDrop({ onImageSelect }: FileDropProps) {
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setError(null);
        onImageSelect(file);
      };

      reader.onerror = () => {
        setError('Error reading the file path.');
      };

      reader.readAsDataURL(file);
    } else {
      setError('Please drop an image.');
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDrop={handleDrop} 
      className={styles.dropArea}>
        {imageData ? (
        <img src={imageData} alt='Dropped ImageData' className={styles.attachedPhoto} />
        ) : (
          <div className={styles.title}>
            <img src='images/gallery.png' alt='background-drop' />
            <p>Drag an image here</p>
          </div>
        )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
