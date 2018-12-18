const baseURL = "https://pixabay.com/api/";
const apiKey = "";

const Pixabay = {
  search( term ) {
    return fetch(`${baseURL}?key=${apiKey}&q=${term}`
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.hits) {
        return jsonResponse.hits.map(image => ({
          id: image.id,
          type: image.type,
          tags: image.tags,
          previewURL: image.previewURL,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          user: image.user,
          pageURL: image.pageURL
        }));
      }
    });
  }
};

export default Pixabay;
