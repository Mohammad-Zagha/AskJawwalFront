import React, { useCallback, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { Typewriter } from "react-simple-typewriter";
import { FiUploadCloud } from "react-icons/fi";
import UserMessage from "../components/UserMessage";
import AiMessage from "../components/AiMessage";
import SupportBotPage from "./ChattingPage";

function Home() {
  const [showChat, setShowChat] = useState(false);
  const [chatMessage,setChatMessage] = useState('')
  const [filesNames, setFilesNames] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Accepted files:", acceptedFiles);
    const FilesNames = acceptedFiles.map((file) => file.name);
    setFilesNames(FilesNames);
    setShowChat(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (

 <SupportBotPage/>
)}



export default Home;
