import React, { useState } from "react";
import axios from "axios";

const ImageSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const API_KEY = "22255617-3b8ff4e47cbb1c544c6aed187"; // 여기에 자신의 Pixabay API 키를 넣으세요

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
                    searchTerm
                )}&image_type=photo&per_page=5`  // 결과를 5개로 제한
            );
            setImages(response.data.hits);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const handleSaveImage = (imageUrl) => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "downloaded_image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    className="border p-2 w-2/3 rounded-l-lg"
                    placeholder="Search for images..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 rounded-r-lg"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="border rounded-lg overflow-hidden shadow-lg"
                    >
                        <img
                            src={image.webformatURL}
                            alt={image.tags}
                            className="w-full h-auto"
                            onClick={() => setSelectedImage(image.webformatURL)}
                        />
                        <div className="p-2 text-center">
                            <button
                                onClick={() => handleSaveImage(image.webformatURL)}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save Image
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <img src={selectedImage} alt="Selected" className="w-full h-auto" />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageSearch