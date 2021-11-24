const fetchInfoAndSetLocalStorage = async (
  url: string,
  localStorageName: string
): Promise<any> => {
  return await fetch(url)
    .then(async (response: Response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((responseJson) => {
      localStorage.setItem(
        `${localStorageName}-info`,
        JSON.stringify(responseJson)
      );
      return responseJson;
    });
};

export default fetchInfoAndSetLocalStorage;
