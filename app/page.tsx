"use client";

import React, { useState } from "react";

import db from "../lib/db";

const room = db.room("main");

function makeShout(text: string) {
  const maxX = window.innerWidth - 200; // Leave some margin
  const maxY = window.innerHeight - 100;
  return {
    text,
    x: Math.random() * maxX,
    y: Math.random() * maxY,
    angle: (Math.random() - 0.5) * 30,
    size: Math.random() * 20 + 24,
  };
}

function addShout({ text, x, y, angle, size }: { text: string, x: number, y: number, angle: number, size: number }) {
  const shoutElement = document.createElement('div');
  shoutElement.textContent = text;
  shoutElement.style.cssText = `
    left: ${x}px;
    top: ${y}px;
    position: fixed;
    z-index: 9999;
    font-size: ${size}px;
    font-weight: bold;
    pointer-events: none;
    transition: opacity 2s ease-out;
    opacity: 1;
    font-family: system-ui, -apple-system, sans-serif;
    white-space: nowrap;
    transform: rotate(${angle}deg);
  `;
  document.body.appendChild(shoutElement);
  setTimeout(() => {
    shoutElement.style.opacity = '0';
  }, 100);
  setTimeout(() => {
    shoutElement.remove();
  }, 2100);
}

function App() {
  const [value, setValue] = useState("");
  const { peers } = db.rooms.usePresence(room);
  const numUsers = 1 + Object.keys(peers).length;

  db.rooms.useTopicEffect(room, 'shout', (message) => {
    addShout(message);
  });
  const publishShout = db.rooms.usePublishTopic(room, 'shout');

  const handleSubmit = () => {
    const params = makeShout(value);
    addShout(params);
    publishShout(params);
    setValue("");
  };

  return (
    <div className="relative min-h-screen">
      <div className="font-mono min-h-screen flex justify-center items-center flex-col space-y-4">
        <div className="text-xs text-gray-500">
          Number of users online: {numUsers}
        </div>
        <h2 className="tracking-wide text-5xl text-gray-300">Shout</h2>
        <div className="flex items-center h-10 border-b border-gray-300">
          <input
            className="flex-1 h-full px-2 outline-none bg-transparent"
            autoFocus
            placeholder="Hello world..."
            type="text"
            value={value}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="text-xs text-center">
          <div>Open another tab to see shouts in real-time.</div>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm">
        Made with InstantDB, Next.js, and Tailwind CSS. <a className="underline underline-offset-2" href="https://github.com/nezaj/instant-shout">See the code</a>
      </div>
    </div>
  );
}

export default App;
