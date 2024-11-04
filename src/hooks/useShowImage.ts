import React from 'react';

export function useShowImage() {
  const uploadImageInput = React.useRef<HTMLInputElement>(null);
  const showImageRef = React.useRef<HTMLImageElement>(null);

  const handleFileInputClick = React.useCallback(() => {
    uploadImageInput.current?.click();
  }, []);
  const handleShowImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        showImageRef.current?.setAttribute('src', e.target.result);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return {
    uploadImageInput,
    showImageRef,
    handleFileInputClick,
    handleShowImage,
  };
}
