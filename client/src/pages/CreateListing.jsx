import React from "react";

function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <hr className="-mt-4 mb-4" />
      <br />
      <form className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Description"
            id="description"
            name="description"
            required
          />
          <input
            className="border p-3 rounded-lg"
            type="text"
            placeholder="Address"
            id="address"
            name="adress"
            required
          />
          <div className="flex gap-4 p-3 items-center flex-wrap">
            <div className="flex gap-3 flex-wrap">
              <input type="checkbox" name="sell" id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="parking" id="parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="furnished" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" />
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
                defaultValue="0"
                required
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
                defaultValue="0"
                required
              />
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                name="regularPrice"
                id="regularPrice"
                className="w-16 p-2 border border-gray-300 rounded-lg"
                defaultValue="0"
                required
              />
              <div className="flex flex-col items-center">
                <span>Regular price</span>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                name="discountedPrice"
                id="discountedPrice"
                className="w-16 p-2 border border-gray-300 rounded-lg"
                defaultValue="0"
                required
              />
              <div className="flex flex-col items-center">
                <span>Discounted price</span>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
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
            />
            <button className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
