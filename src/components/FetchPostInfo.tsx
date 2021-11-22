const fetchPostInfo = async (url: string): Promise<any> => {
  return await fetch(url).then(async (response: Response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};

export default fetchPostInfo;
