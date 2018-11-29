import quip from "quip";
import App from "./App.jsx";


class PixabayImage extends quip.apps.Record {

  static getProperties = () => ({
    id: "string",
    type: "string",
    tags: "string",
    previewURL: "string",
    webformatURL: "string",
    largeImageURL: "string",
    user: "string",
    pageURL: "string"
  });

  static getDefaultProperties = () => ({
    id: "",
    type: "",
    tags: "",
    previewURL: "",
    webformatURL: "",
    largeImageURL: "",
    user: "",
    pageURL: ""
  });
}
quip.apps.registerClass(PixabayImage, "pixabay-image");

class SelectedImage extends quip.apps.Record {
  static getProperties = () => ({
    selectedImage: quip.apps.ImageRecord
  })

  static getDefaultProperties = () => ({
    selectedImage: {}
  })

}
quip.apps.registerClass(SelectedImage, "selected-image");


class PixabayRoot extends quip.apps.RootRecord {
  static getProperties = () => ({
      selectedImage: SelectedImage,
  })

  static getDefaultProperties = () => ({
    selectedImage: {},
  })

}
quip.apps.registerClass(PixabayRoot, "root");

quip.apps.initialize({
    initializationCallback: function(rootNode, params) {
        let rootRecord = quip.apps.getRootRecord();
        let selectedImage = rootRecord.get("selectedImage");
        let showPlaceholder = false;
        if (params.isCreation) {
            showPlaceholder = true;
        }
        ReactDOM.render(<App selectedImage={selectedImage} showPlaceholder={showPlaceholder} />, rootNode);
    },
});
