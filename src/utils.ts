export const getJSON = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(JSON.parse((event.target?.result || '').toString()));
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
};

export const getImage = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => resolve(event.target?.result);
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsDataURL(file);
  });
};
