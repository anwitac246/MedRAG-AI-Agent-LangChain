'use client';
import Navbar from "../components/Navbar";
import ChatLayout from "../components/ChatLayout";

const Chat = () => {
  return (
    <div className="h-screen bg-background">
      <Navbar variant="default" />
      <ChatLayout />
    </div>
  );
};

export default Chat;
