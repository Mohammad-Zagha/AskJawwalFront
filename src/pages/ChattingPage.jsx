import React, { useEffect, useState } from 'react';
import { BiDislike } from 'react-icons/bi';
import { FaHistory, FaPaperclip, FaRegCopy } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { IoReload } from 'react-icons/io5';
import BotImage from '../assets/BotImage.jpeg'
import { HiAcademicCap } from 'react-icons/hi';
import { PiLampBold } from 'react-icons/pi';
import { VscTerminalCmd } from 'react-icons/vsc';
import { GoAlert } from 'react-icons/go';
import { motion } from 'framer-motion';
import { Dialog, useMediaQuery } from '@mui/material';
import jawalLogo from'../assets/logo2.webp'
import axios from 'axios';
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from 'react-query';
import SignIn from './Signin/SignIn';

const SupportBotPage = () => {
  const random = Math.random();
  const token = Cookies.get("_auth");
  const phoneNumber = Cookies.get("_auth_state");
  const [darkMode, setDarkMode] = useState(false);
  const [chatEmpty , setChatEmpty] = useState(false)
  const [chatMessages, setChatMessages] = useState([]);
  const [pdfFlag,setPdfFlag]=useState(true)
  const [chatMessage,setChatMessage] = useState('')
  const [chats,setChats]=useState([])
  const [chatTitle,setChatTitle]=useState("New Chat")
  const [aITyping,setAiTyping] =useState(false) 
  const [openDialog,setOpenDialog]= useState(false)

  const isNonMobile = useMediaQuery("(min-width:600px)");

const handleVoiceClick=(text)=>{
  const value = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(value)
}

  const toggleTheme = () => {
  
  };
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const sendFilesToServer = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]); // Use 'files' as field name for multiple files
    }
  
    try {
      const response = await axios.post('http://localhost:3541/api/v1/users/uploadPdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status== 200)
        {
          setPdfFlag(true)
          const message = {
            sender:'Bot',
            text:response.data,
            time:new Date().toLocaleTimeString()
          }
          setChatMessages([...chatMessages,message])
          console.log('Files uploaded successfully:', response.data);
        }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
  
      // Prepare messages for each file
      const newMessages = Array.from(files).map(file => ({
        sender: 'User',
        text: file.name,
        time: new Date().toLocaleTimeString()
      }));
  
      // Update chat messages state
      setChatMessages([...chatMessages, ...newMessages]);
      setChatMessage('');
      setChatEmpty(true);
  
      // Send files to server
      await sendFilesToServer(files);
    }
  };
 

const handleSendMessage = async () => {
  if (chatMessage.trim() === '') return;
  console.log(phoneNumber)
  chatMessages.length == 0? setChatTitle(chatMessage+"-"+(random).toFixed(5)):<></>

  const chat = chatMessages.map((chat) => chat.text);
  const newMessage = { sender: 'User', text: chatMessage, time: new Date().toLocaleTimeString() };

  setChatMessages([...chatMessages, newMessage]);
  setChatMessage('');
  setChatEmpty(true);

  // Add a temporary message indicating that the AI is typing
  const tempMessage = { sender: 'Bot', text: 'AI is typing...', time: new Date().toLocaleTimeString() };
  setChatMessages((prevMessages) => [...prevMessages, tempMessage]);

  try {
    const url = pdfFlag ? 'http://localhost:3541/api/v1/users/getAiResponse' : 'http://localhost:3541/api/v1/users/getAiResponseWithoutPdf';
    const response = await axios.post(url, {
      question: chatMessage,
      chatHistory: chat,
      userId:token,
      chatTitle:chatTitle
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Replace the temporary message with the actual response
    const botMessage = { sender: 'Bot', text: response.data, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = botMessage; // Replace the last message (temp message) with the actual response
      return updatedMessages;
    });

  } catch (error) {
    console.error('Error fetching AI response:', error);
    // Remove the temporary message if there's an error
    setChatMessages((prevMessages) => prevMessages.slice(0, -1));
  }
};
const getUserChats = async () => {
  try {
    const response = await axios.post('http://localhost:3541/api/v1/users/getUserChats', { userId:token });
    
   
    return response.data.chatHistory
  } catch (error) {
    console.error('Error fetching user chat history:', error.response ? error.response.data : error.message);
  }
};
const queryClient = useQueryClient();
const {
  status: chatsStatus,
  data: chatsData,
  error: chatsError,
} = useQuery({
  queryKey: ["chats"],
  queryFn: () => getUserChats(),
});
useEffect(()=>{
  setChats(chatsData)
  console.log(chatsData)
},[chatsData])
  return (
    <div className={`relative flex size-full min-h-screen flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-slate-50 text-black'} group/design-root overflow-x-hidden`} style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className={`flex items-center justify-between whitespace-nowrap border-b border-solid ${darkMode ? 'border-gray-600' : 'border-[#e7edf3]'} px-10 py-3`}>
          <div className="flex items-center gap-2 text-[#0e141b]">
          
            <img src={jawalLogo} className='h-5 w-10 mt-2' />
            
            <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em] mt-2">Ask Jawwal</h2>
          </div>
         { token!=undefined ?<div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className={`text-[#0e141b] text-xl font-bold leading-normal ${darkMode ? 'text-gray-300' : ''}`} href="#">Dashboard</a>
              <a className={`text-[#0e141b] text-sm font-medium leading-normal ${darkMode ? 'text-gray-300' : ''}`} href="#">Chat History</a>
              <a className={`text-[#0e141b] text-sm font-medium leading-normal ${darkMode ? 'text-gray-300' : ''}`} href="#">Knowledge Base</a>
              <a className={`text-[#0e141b] text-sm font-medium leading-normal ${darkMode ? 'text-gray-300' : ''}`} href="#">Integrations</a>
              <a className={`text-[#0e141b] text-sm font-medium leading-normal ${darkMode ? 'text-gray-300' : ''}`} href="#">Settings</a>
            </div>
            <div className="flex gap-2">
              <button className={`flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-[#e7edf3] text-[#0e141b]'} gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5`} onClick={toggleTheme}>
                <div className="text-[#56ec4b] font-bold text-xl " data-icon="MagnifyingGlass" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
              </button>
              <button className={`flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-[#e7edf3] text-[#0e141b]'} gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5`} onClick={toggleTheme}>
                <div className="text-[#56ec4b]" data-icon="Bell" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                  </svg>
                </div>
              </button>
              <button className={`flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-[#e7edf3] text-[#0e141b]'} gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5`} onClick={toggleTheme}>
                <div className="text-[#56ec4b]" data-icon="Question" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </button>
              <button className={`flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-[#e7edf3] text-[#0e141b]'} gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5`} onClick={toggleTheme}>
                <div className="text-[#56ec4b]" data-icon="DotsThree" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>: <button 
                  onClick={()=>setOpenDialog(true)}
                  style={{
                    background: "linear-gradient(to right, #00c6ff, #00e676)"
                  }}
              className="flex min-w-[84px] max-w-[480px]  cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4  text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Login</span>
              </button>}
        </header>
        <div className="gap-1 px-1 flex flex-1 justify-between py-1 ">
        <div className="layout-content-container flex flex-col w-80">
  {isNonMobile? (<div className="flex h-full min-h-[700px] flex-col justify-between bg-[#f0efed] p-4 rounded-xl"> {/* Changed bg-slate-50 to bg-gray-200 */}
    <div className="flex flex-col gap-5 bg-transparent h-full ">
      {token == undefined ?
       <motion.div 
       className="flex flex-col gap-2  border rounded-lg shadow-sm bg-slate-50 min-h-40"
       initial="hidden"
       animate="visible"
       transition={{ duration: 0.5 }}
       variants={variants}
     >      <div className="flex rounded-xl flex-col items-center justify-center h-screen bg-gradient-to-r from-green-500 to-teal-400 text-white">
     <h1 className="text-4xl font-extrabold mb-4">Sign In</h1>
     <p className="text-lg mb-6 flex justify-center text-center">Please sign in to access your account.</p>
     <button className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
       Sign In
     </button>
   </div></motion.div>
 :<div className='flex flex-col gap-3'>
     { chats?.map((chat, index) => (
        <div key={index} className="flex flex-col gap-2 mr-2" onClick={()=>{
          setChatTitle(chat.chatTitle)
          setChatMessages([])
          const messages = chat.messages.map((message,index)=>{
              {
                  if(index % 2== 0)
                    {
                        return      {
                          sender: phoneNumber.split(':')[1] ? phoneNumber.split(':')[1].replace('}', '') :'User',
                          text:message,
                          time:new Date().toLocaleTimeString()
                        }
                    }
                    else
                    {
                      return      {
                        sender:'Bot',
                        text:message,
                        time:new Date().toLocaleTimeString()
                      }
                    }
              }
          }
          )
          setChatMessages(messages)
          setChatEmpty(true)
          
        }}>
          <div className={`flex items-center gap-3 px-3 py-2 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} text-[#0e141b]`}>
            <div className="text-[#0e141b]" data-icon="Document" data-size="24px" data-weight="fill">
              <FaHistory />
            </div>
            <p className="text-[#0e141b] text-sm font-medium leading-normal">{ chat.chatTitle.split('-chat ')[0]}</p>
          </div>
        </div>
      ))}
  </div>}

    </div>
  </div>):<></>}
</div>

          <div className="layout-content-container flex flex-col flex-1 justify-between bg-slate-50">
            <div>
            <div className="flex flex-wrap justify-between gap-3 p-4 ">

<div className="flex min-w-72 flex-col gap-3 ">
  <p className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight ">{chatTitle}</p>
</div>
</div>
<div className='flex flex-col gap-2 max-h-[500px] overflow-y-auto '>
{chatEmpty ? (
  <div>
  {chatMessages.map((message, index) => (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: message.sender === 'Bot' ? 1 : 0.5 }} // Adjust duration for bot messages
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      key={index}
    >
      <div
        className={`flex gap-3 p-4 ${message.sender === 'User' ? 'justify-start' : 'justify-end'}`}
        onClick={() => handleVoiceClick(message.text)}
      >
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: `url(${message.sender === 'User'
              ? 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ' // Placeholder image for user
              : 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Placeholder image for bot
            })`,
          }}
        ></div>
        <div className="flex flex-1 flex-col items-stretch gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-3">
            <p className={`text-[#0e141b] text-base font-bold leading-tight ${darkMode ? 'text-gray-300' : ''}`}>
  {message.sender === 'User' ? 
    (phoneNumber && phoneNumber.split(':')[1] ? phoneNumber.split(':')[1].replace('}', '') : 'User')
    : 'Bot'}
</p>
              <p className={`text-[#4e7397] text-sm font-normal leading-normal ${darkMode ? 'text-gray-400' : ''}`}>{message.time}</p>
            </div>
            <p className={`text-[#0e141b] text-base font-normal leading-normal ${darkMode ? 'text-gray-300' : ''}`}>{message.text}</p>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>

 ):(
  <motion.div 
  className="flex flex-col gap-2 p-4 border rounded-lg   min-h-40"
  initial="hidden"
  animate="visible"
  transition={{ duration: 0.5 }}
  variants={variants}
>
  <div className='flex flex-col gap-3 justify-center min-h-[450px]  items-center border-non'>
      <img src={jawalLogo}/>
  <div className="flex justify-center mt-14 gap-4 p-4 ">
      <motion.div 
        className="flex flex-col gap-2 p-4  rounded-lg shadow-sm bg-slate-50 min-h-40 border-2 border-green-400"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={variants}
      >
        <HiAcademicCap color="blue" size={25} />
        <p className="text-base text-gray-400">
        Welcome to Jawwal Assistant! Ask me anything        </p>
      </motion.div>
      <motion.div 
        className="flex flex-col gap-2 p-4  rounded-lg shadow-sm bg-slate-50 min-h-40 border-2 border-green-400"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.1 }}
        variants={variants}
      >
        <PiLampBold color="orange" size={25} />
        <p className="text-base text-gray-400">
        How can I help you today? I'm here to answer your FAQs        </p>
      </motion.div>
      <motion.div 
        className="flex flex-col gap-2 p-4 border-2 border-green-400 rounded-lg shadow-sm bg-slate-50 min-h-40"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={variants}
      >
        <VscTerminalCmd color="black" size={25} />
        <p className="text-base text-gray-400">
        Have a question about our tech solutions? Just type it here!        </p>
      </motion.div>
      <motion.div 
        className="flex flex-col gap-2 p-4 border-2 border-green-400 rounded-lg shadow-sm bg-slate-50 min-h-40"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
        variants={variants}
      >
        <GoAlert color="yellow" size={25} />
        <p className="text-base text-gray-400">
        Explore FAQs about our mobile offerings. I'm ready  </p>
      </motion.div>
    </div></div> </motion.div>)}
</div>
            </div>
            <div className="flex items-center px-4 py-3 gap-3 @container mb-40">
  <label className="flex flex-col min-w-40 h-12 flex-1">
    <div className={`flex w-full flex-1 items-stretch rounded-xl h-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-[#e7edf3] text-[#0e141b]'} border-none`}>
      <input
        placeholder="Type your message here"
        className={`form-input flex w-full min-w-0  flex-1 resize-none overflow-hidden rounded-xl text-[#0e141b] focus:outline-0 focus:ring-0 border-none ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-[#e7edf3] placeholder-[#4e7397]'} px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal`}
        value={chatMessage}
        onChange={(e)=>setChatMessage(e.target.value)}
      />
      <div className={`flex items-center justify-center rounded-r-xl border-l-0 ${darkMode ? 'bg-gray-800' : 'bg-[#e7edf3]'} text-[#0e141b]`}>
        <button onClick={()=>{setChatEmpty(true)

            handleSendMessage();
        }} className={`cursor-pointer rounded-r-xl h-full px-4 ${darkMode ? 'bg-[#1980e6] text-slate-50' : 'bg-[#45fe89] text-slate-50'} text-sm font-medium leading-normal`}>
        <IoMdSend />
        </button>
  
      </div>
    </div>
  </label>
</div>

<Dialog open={openDialog} onClose={()=>setOpenDialog(false)} sx={{borderRadius:"10px"}}>

<SignIn/>
</Dialog>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportBotPage;
