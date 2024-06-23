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
 
             

//         <div className="bg-transparent  text-white flex gap-2  " >

//           <div className="flex-col gap-2 justify-between w-4/5 p-4 bg-[#1C1D22] h-screen rounded-lg">
    
//           <div className="flex flex-col h-4/5">
          
//             <div className="flex justify-start">
//                <div className="w-1/2">
//                 <UserMessage />
//             </div>
//            </div>
//             <div className="flex justify-end">
//                 <div className="w-1/2">
//                <AiMessage />
//              </div>
//   </div>
//   <div className="flex justify-start">
//                <div className="w-1/2">
//                 <UserMessage />
//             </div>
//            </div>
//             <div className="flex justify-end">
//                 <div className="w-1/2">
//                <AiMessage />
//              </div>
//   </div>
//   <div className="flex justify-start">
//                <div className="w-1/2">
//                 <UserMessage />
//             </div>
//            </div>
//             <div className="flex justify-end">
//                 <div className="w-1/2">
//                <AiMessage />
//              </div>
//   </div>
// </div>
//             <div class="flex items-center px-4 py-3 gap-3 @container" dir="ltr">
//   <label class="flex flex-col min-w-40 h-12 flex-1">
//     <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
//       <input
//         placeholder="Chat with me..."
//         class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F9FAFA] focus:outline-0 focus:ring-0 border-none bg-[#3C3F4A] focus:border-none h-full placeholder:text-[#D5D6DD] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
//         value={chatMessage}
//         onChange={(e)=>setChatMessage(e.target.value)}
//       />
//       <div class="flex border-none bg-[#3C3F4A] items-center justify-center pr-4 pl-2 rounded-r-xl border-l-0">
//         <span class="truncate">Send</span>
//       </div>
//              <div className="w-12 h-12 rounded-full   ml-2  bg-[#3C3F4A] flex justify-center text-center hover:cursor-pointer"  
//             ><div className="mt-3">
//              <FiUploadCloud size={25}/>
//               </div></div>   
//     </div>
//   </label>
// </div>

//           </div>
//           <div className="flex flex-col h-screen w-80 bg-transparent text-white items-end">

// {/* Chat history header */}
// <div className="p-4 bg-transparent w-full text-left">
//   <h2 className="text-lg font-semibold">Chat History</h2>
// </div>




// </div>

//         </div>
      )}



export default Home;
