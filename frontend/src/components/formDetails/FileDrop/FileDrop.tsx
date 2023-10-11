import { ChangeEvent, DragEvent, useState } from 'react';
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
    handleFiles(event.dataTransfer.files);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
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
      setError('Please select a valid image file.');
    }
  };

  return (
    <div className={styles.dropArea} onDragOver={handleDragOver} onDrop={handleDrop}>
      <input
        type='file'
        accept='image/*'
        onChange={handleFileSelect}
        className={styles.fileInput}
      />
      {imageData ? (
        <img src={imageData} alt='Dropped ImageData' className={styles.attachedPhoto} />
      ) : (
        <div className={styles.title}>
          <img src='images/gallery.png' alt='background-drop' />
          <p>Drag an image here or click to select</p>
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
