import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import styles from './FileDrop.module.css';

interface FileDropProps {
  onImageSelect: (selectedImage: File | undefined) => void;
  selectedImage?: File;
  label?: string;
}

export function FileDrop({ onImageSelect, label, selectedImage }: FileDropProps) {
  const [imageData, setImageData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const uploadFile = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
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

  const clearImage = () => {
    setImageData(null);
    onImageSelect(undefined);
  };

  return (
    <div
      className={styles.dropArea}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={uploadFile}
    >
      <span className={styles.label}>{label}</span>
      {imageData || selectedImage ? (
        <div className={styles.imageContainer}>
          <i className={styles.closeButton} onClick={clearImage}>
            x
          </i>
          <img
            src={imageData || (selectedImage && URL.createObjectURL(selectedImage))}
            alt='Dropped ImageData'
            className={styles.attachedPhoto}
          />
        </div>
      ) : (
        <div className={styles.title}>
          <div className={styles.container}>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileSelect}
              className={styles.fileInput}
              ref={inputRef as any}
              style={{
                opacity: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
            <img src='images/gallery.png' alt='background-drop' />
          </div>
          <p>Drag an image here or click to select</p>
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
