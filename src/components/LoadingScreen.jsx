// Owner: Bhawni - loading screen

import { useEffect, useState } from "react";

const messages = ["Waking up the servers...", "Counting the users...", "Polishing the charts..."];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % messages.length), 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loader">
      <div className="loader__sun"></div>
      <p>{messages[index]}</p>
    </div>
  );
}
