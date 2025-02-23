import React, { useState, useEffect } from "react";
import { useGetVoiceByCatQuery } from "../redux/api/UserApi";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import VoicePlayer from "../components/elements/voicenotes";

export default function SinglePage() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [activeDropdown, setActiveDropdown] = useState(null); // State to track which dropdown is active
  const [filteredVoices, setFilteredVoices] = useState([]); // State to store filtered voices
  const router = useRouter();

  const { categoryId } = router.query;
  const {
    data: voices = [], // Provide a default empty array to prevent errors
    isLoading,
    isError,
  } = useGetVoiceByCatQuery(categoryId);

  // Initialize filteredVoices with voices data when voices change
  useEffect(() => {
    setFilteredVoices(voices);
  }, [voices]);

  // Handle the download functionality
  const handleDownload = (audioSrc) => {
    const link = document.createElement("a");
    link.href = audioSrc;
    link.download = audioSrc.split("/").pop(); // Extract the filename from the URL and set it as the download name
    link.click();
  };

  // Filter voices based on the search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = voices.filter((voice) =>
      voice.voicename.toLowerCase().includes(query)
    );
    setFilteredVoices(filtered);
  };

  // Toggle dropdown visibility for a specific voice card
  const handleDropdownToggle = (id) => {
    setActiveDropdown((prev) => (prev === id ? null : id)); // Toggle dropdown for clicked card
  };

  return (
    <div className="container pt-5">
      <div className="d-flex gap-4">
        <Link href="/">
          <ArrowLeft color="black" />
        </Link>
        <h5>All Voice Notes</h5>
      </div>
      <div className="card-body p-0 mb-2 pt-2">
        <div className="form-group mb-0">
          <input
            className="form-control"
            id="elementsSearchInput"
            type="text"
            value={searchQuery}
            onChange={handleSearch} // Call the search function on text input
            placeholder="Search Voices..."
          />
        </div>
      </div>
      <div className="audios pb-5 mt-4">
        {filteredVoices.length > 0 ? (
          filteredVoices.map((voice) => (
            <div className="card p-3 mb-2 shadow" key={voice.id}>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-3">
                  {voice.voicename} - {voice.author}
                </h6>
                <h6
                  className="mb-3"
                  onClick={() => handleDropdownToggle(voice.id)}
                >
                  <EllipsisVertical size={16} />
                </h6>
              </div>

              {/* Only show dropdown for the active card */}
              {activeDropdown === voice.id && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "20px",
                  }}
                >
                  <button
                    className="dropdown-item"
                    onClick={() => handleDownload(voice.audio)}
                  >
                    Download
                  </button>
                </div>
              )}
              <div className="d-flex align-items-center">
                <VoicePlayer
                  audioSrc={`https://client-vazhivilakk-backend.onrender.com${voice.audio}`}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No voices available.</p>
        )}
      </div>
    </div>
  );
}
