import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostSupply = () => {
  // Camera
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const debounceRef = useRef(null); 
  const [cameraOn, setCameraOn] = useState(false);
  const [images, setImages] = useState([]); // multiple images

  // Cities
  const [cityInput, setCityInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  // Caption
  const [caption, setCaption] = useState("");
  const [successMessage, setSuccessMessage] = useState(false)
  const navigate = useNavigate();
  // Start camera
  useEffect(() => {
    if (cameraOn) startCamera();
  }, [cameraOn]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
      alert("Cannot access camera.");
      setCameraOn(false);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());
    setCameraOn(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    setImages([...images, dataUrl]); // append new image
    stopCamera();
  };

  

  // ----------------- City Autocomplete -----------------
  const fetchCitySuggestions = async (input) => {
  if (!input) return [];

  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        input
      )}&limit=5&lang=en&filter=countrycode:za&apiKey=fa5e83263b164f498cea52c4b7804a91`
    );

    const data = await res.json();
    //console.log("API RESPONSE:", data); 

    if (!data.features) return [];

    return data.features
      .map((item) => item.properties.city || item.properties.name)
      .filter(Boolean);
  } catch (err) {
    console.error("City fetch error:", err);
    return [];
  }
};

  

  const handleCityChange = (e) => {
  const value = e.target.value;
  setCityInput(value);

  if (debounceRef.current) clearTimeout(debounceRef.current);

  if (!value) {
    setSuggestions([]);
    return;
  }

  debounceRef.current = setTimeout(async () => {
    const results = await fetchCitySuggestions(value);
    setSuggestions(results.filter((c) => !selectedCities.includes(c)));
  }, 400);
};

  const addCity = (city) => {
    if (!selectedCities.includes(city)) setSelectedCities([...selectedCities, city]);
    setCityInput("");
    setSuggestions([]);
  };

  const removeCity = (city) => {
    setSelectedCities(selectedCities.filter((c) => c !== city));
  };

  
  const handlePost = () => {
    if (!caption || selectedCities.length === 0 || images.length === 0) return;

    const post = {
      caption,
      cities: selectedCities,
      images,
      createdAt: new Date().toISOString(),
    };
    console.log("POST DATA:", post);
   
    // reset form
    setSelectedCities([]);
    setCityInput("");
    setCaption("");
    setImages([]);
    setSuccessMessage("Post created successfully!");
    navigate('/dashboard');
  };

  return (
    <div className="CreatePost">
        <h2>Create Post</h2>

        {/* Cities input */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Type a town..."
            value={cityInput}
            onChange={handleCityChange}
            
          />
          {suggestions.length > 0 && (
            <div style={{ border: "1px solid #ccc", background: "white", maxHeight: "120px", overflowY: "auto" }}>
              {suggestions.map((city, index) => (
                <div key={index} onClick={() => addCity(city)} style={{ padding: "6px", cursor: "pointer" }}>
                  {city}
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: "8px" }}>
            {selectedCities.map((city, index) => (
              <div
                key={index}
                style={{
                  padding: "5px 10px",
                  margin: "3px",
                  background: "#e5e5e5",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {city}
                <span
                  onClick={() => removeCity(city)}
                  style={{ marginLeft: "6px", cursor: "pointer", fontWeight: "bold" }}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />


        {/* Camera */}
        {!cameraOn && (
          <button onClick={() => setCameraOn(true)} style={{ width: "100%", marginBottom: "10px" }}>
            Open Camera
          </button>
        )}
        {cameraOn && (
          <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
            <button onClick={capturePhoto} style={{ width: "100%", marginTop: "10px" }}>
              Take Photo
            </button>
          </div>
        )}


        {/* Display all images */}
        {images.map((img, index) => (
          <div key={index} style={{ marginTop: "10px", position: "relative" }}>
            <img src={img} alt={`capture-${index}`} style={{ width: "100%" }} />
            <button
              onClick={() => setImages(images.filter((_, i) => i !== index))}
              style={{ position: "absolute", top: "5px", right: "5px" }}
            >
              ×
            </button>
          </div>
        ))}

        <canvas ref={canvasRef} style={{ display: "none" }} />

       {successMessage && <div className='text-success fw-bold mt-2'>Registration successful!</div>} 
        <button
          onClick={handlePost}
          disabled={selectedCities.length === 0 || !caption || images.length === 0} 
        >
          Post
        </button>

      </div>
    
  );
};

export default PostSupply;