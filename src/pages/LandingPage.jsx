import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import SignIn from "./Signin/SignIn";

const LandingPage = () => {
    const navigate=useNavigate();
    const [openDialog,setOpenDialog]= useState(false)
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
            </div>
            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
            ASK Jawwal
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">
                Features
              </a>
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">
                Pricing
              </a>
              <a className="text-[#111418] text-sm font-medium leading-normal" href="#">
                Docs
              </a>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={()=>navigate('/Chat')}
              className="flex min-w-[84px] max-w-[480px] bg-[#56ec4b] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4  text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Chat</span>
              </button>
              <button onClick={()=>setOpenDialog(true)} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Log In</span>
              </button>
            </div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://cdn.usegalileo.ai/sdxl10/990505d8-e6e2-47bb-94e4-e253679d46e7.png')",
                  }}
                >
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    <Typewriter
                  words={[
                    "Jawwal Assistant: Your go-to AI for instant answers to all your questions.",
                    "Simplify your search for information ",
                    "Effortlessly find the answers you need with Jawwal Assistant, your intelligent FAQ chatbot",
                  ]}
                  loop={5}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Create a better customer experience with an AI-powered assistant that's
                      available 24/7 to answer questions, book appointments, and more.
                    </h2>
                  </div>
                  <button onClick={()=>navigate("/chat")} className="flex min-w-[84px] bg-[#56ec4b] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5  text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Start Chating</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <h1 className="text-[#111418] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                Why Ask Jawwal
              </h1>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      "url('https://cdn.usegalileo.ai/stability/26ce911d-3b3f-43a2-b3a5-2fcb49df7269.png')",
                  }}
                ></div>
                <div>
                  <p className="text-[#111418] text-base font-medium leading-normal">Easy setup</p>
                  <p className="text-[#637588] text-sm font-normal leading-normal">
                    Get up and running in minutes with our no-code chatbot builder.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      "url('https://cdn.usegalileo.ai/sdxl10/03fd1ff3-ae83-482b-924d-a3b5d4620359.png')",
                  }}
                ></div>
                <div>
                  <p className="text-[#111418] text-base font-medium leading-normal">
                    Powerful integrations
                  </p>
                  <p className="text-[#637588] text-sm font-normal leading-normal">
                    Connect ChatGenie with your favorite tools like HubSpot, Zapier, and Google
                    Sheets.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style={{
                    backgroundImage:
                      "url('https://cdn.usegalileo.ai/sdxl10/d2a8a367-eec3-417d-b670-3769b13904bd.png')",
                  }}
                ></div>
                <div>
                  <p className="text-[#111418] text-base font-medium leading-normal">
                    Real-time training
                  </p>
                  <p className="text-[#637588] text-sm font-normal leading-normal">
                    Improve your chatbot's accuracy over time by training it on real conversations.
                  </p>
                </div>
              </div>
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



export default LandingPage;
