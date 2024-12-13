import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessage((pre) => [...pre, msg]);
    });
    return () => socket.off("chatMessage");
  });

  const sendBtn = () => {
    if (name && message) {
      socket.emit("chatMessage", { name, text });
      setText("");
    }
  };
  return (
    <div className="h-screen ">
      <div className="h-5/6 overflow-hidden bg-purple-100 p-2 overflow-y-scroll">
        {message.map((msg, index) => {
          return (
            <div key={index}>
              <div
                className={`${
                  msg.name === name
                    ? "flex items-center justify-end"
                    : "flex items-center justify-start"
                } my-2 `}
              >
                <div
                  className={`${
                    msg.name === name
                      ? "bg-blue-500 flex items-center justify-end"
                      : "bg-gray-500"
                  } py-1 px-5 rounded max-w-sm`}
                >
                  <div className="break-words">
                    <div
                      className={` text-sm text-gray-300 ${
                        msg.name === name && "text-right"
                      }`}
                    >
                      {msg.name === name ? "me" : msg.name}
                    </div>
                    <div className="text-white ">{msg.text}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Name...."
          className="border outline-none rounded p-2"
        />
        <div className="flex items-end border p-1 rounded">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message"
            className="outline-none rounded p-2 flex flex-1"
            cols={10}
            rows={1}
          ></textarea>
          {name !== "" && message !== "" ? (
            <button
              onClick={sendBtn}
              className="bg-yellow-500 hover:bg-yellow-400 p-2 rounded text-white"
            >
              send
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Chat;
