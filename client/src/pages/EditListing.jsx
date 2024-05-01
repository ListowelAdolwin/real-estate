import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { RiChatDeleteFill } from "react-icons/ri";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function EditListing() {
  const navigate = useNavigate();
  const params = useParams();
  const listingId = params.listingId;
  const { currentUser, accessToken } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [uploadError, setUploadError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [listing, setListing] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getListing = async () => {
      const res = await fetch(`${API_URL}/api/listings/${listingId}`);
      const data = await res.json();
      setFormData(data);
    };
    getListing();
  }, []);

  const handleFileChange = (e) => {
    setUploadError("");
    const newImages = e.target.files;
    const updatedImages = [...selectedImages];

    for (let i = 0; i < newImages.length; i++) {
      updatedImages.push(newImages[i]);
    }

    setSelectedImages(updatedImages);
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleImagesUpload = (e) => {
    setIsLoading(true);
    setUploadError("");
    if (selectedImages.length === 0) {
      setUploadError("No image selected!");
      setIsLoading(false);
    } else if (selectedImages.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < selectedImages.length; i++) {
        promises.push(uploadImage(selectedImages[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          console.log("form data: ", formData);
          setSelectedImages([]);
          setUploadError("");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error while resolving promises", err);
          setUploadError("Error while uploading images (< 2Mb images only)");
          setIsLoading(false);
          setSelectedImages([]);
        });
    } else {
      console.log("You can upload a min of 1 image and max of 6 images");
      setUploadError("You can only upload max of 6 images");
      setIsLoading(false);
    }
  };

  const uploadImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "__" + image.name;
      const storageRef = ref(storage, fileName);
      //const storageRef = ref(storage, `listings/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleFormChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError(false);

    if (+formData.regularPrice < +formData.discountedPrice) {
      setUploadError("Discounted price cannot be greater than regular price!");
      return;
    }
    const res = await fetch(`${API_URL}/api/listings/update/${listingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...formData, author: currentUser._id }),
    });
    const data = await res.json();
    console.log("Res: ", res);
    console.log("Data: ", data);
    if (res.ok) {
      navigate(`/listing/${data._id}`);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto mb-12 shadow-lg">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>
      <hr className="-mt-4 mb-4" />
      <br />
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            maxLength="62"
            minLength="3"
            required
            onChange={handleFormChange}
            value={formData.name}
          />
          <textarea
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Description"
            id="description"
            name="description"
            required
            onChange={handleFormChange}
            value={formData.description}
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Address"
            id="address"
            name="adress"
            required
            onChange={handleFormChange}
            value={formData.address}
          />
          <div className="flex gap-4 p-3 items-center flex-wrap">
            <div className="flex gap-3 flex-wrap">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                onChange={handleFormChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                onChange={handleFormChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                onChange={handleFormChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                onChange={handleFormChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                onChange={handleFormChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                name="bedrooms"
                id="bedrooms"
                className="w-16 p-2 border border-gray-300 rounded-lg"
                required
                onChange={handleFormChange}
                value={formData.bedrooms}
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                name="bathrooms"
                id="bathrooms"
                className="w-16 p-2 border border-gray-300 rounded-lg"
                required
                onChange={handleFormChange}
                value={formData.bathrooms}
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="regularPrice"
                min="0"
                id="regularPrice"
                className="w-16 p-2 border border-gray-300 rounded-lg"
                required
                onChange={handleFormChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <span>Regular price</span>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  name="discountedPrice"
                  id="discountedPrice"
                  className="w-16 p-2 border border-gray-300 rounded-lg"
                  required
                  onChange={handleFormChange}
                  value={formData.discountedPrice}
                />
                <div className="flex flex-col items-center">
                  <span>Discounted price</span>
                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex">
            <p className="font-semibold">Images: </p>
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover (max 6)
            </span>
          </div>
          <div className="flex gap-3">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name="images"
              id="images"
              accept="images/*"
              multiple
              onChange={handleFileChange}
            />
            {isLoading ? (
              <div
                style={{
                  margin: "auto",
                }}
              >
                <Oval
                  height="30"
                  width="30"
                  color="#383B53"
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <button
                onClick={handleImagesUpload}
                type="button"
                className="px-3 text-green-700 border border-green-700 rounded hover:shadow-lg"
              >
                Upload
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {selectedImages.map((image, index) => (
              <div key={URL.createObjectURL(image)} className="relative">
                <img
                  className="w-full h-auto object-cover rounded-lg"
                  src={URL.createObjectURL(image)}
                  alt="Listing image"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-0 right-0 p-2 text-red-700 rounded-full bg-white hover:bg-gray-100"
                >
                  <RiChatDeleteFill />
                </button>
              </div>
            ))}
          </div>

          <div className="text-sm text-red-700">
            {uploadError && uploadError}
          </div>
          <button
            type="submit"
            className="p-2 bg-slate-700 text-white rounded-lg hover:opacity-95"
          >
            Update Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditListing;
