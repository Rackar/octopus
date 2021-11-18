function copy(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const promise = navigator.clipboard.writeText(text);
    promise.then(
      () => {
        console.log('Copied to clipboard: ', text);
        resolve();
      },
      err => {
        console.error('Could not copy text: ', err);
        reject(err);
      }
    );
  });
}

export { copy };
