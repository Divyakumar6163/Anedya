import { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown, FaPowerOff } from "react-icons/fa";

export default function DeviceCard({ device, history, toggleRelay, role }) {
  const [relayState, setRelayState] = useState(device.relay);
  const [status, setStatus] = useState(device.status);

  const [tempChange, setTempChange] = useState(0);
  const [humChange, setHumChange] = useState(0);

  useEffect(() => {
    // console.log("Device prop updated:", device);
    setRelayState(device.relay);
    setStatus(device.status);
  }, [device]);
  useEffect(() => {
    if (!history || history.length < 2) return;

    const last = history[history.length - 1];
    const prev = history[history.length - 2];

    const tempDiff = last.temperature - prev.temperature;
    const humDiff = last.humidity - prev.humidity;

    setTempChange(Number(tempDiff.toFixed(2)));
    setHumChange(Number(humDiff.toFixed(2)));
  }, [history]);

  const handleToggle = async () => {
    // const newState = !relayState;

    // // optimistic UI
    // setRelayState(newState);
    // setStatus(newState ? "online" : "offline");

    try {
      await toggleRelay();
    } catch (err) {
      // rollback if failed
      // setRelayState(!newState);
      // setStatus(!newState ? "online" : "offline");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-5 w-full md:w-1/2 lg:w-1/3 transition hover:shadow-2xl">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${
            status === "online"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* DATA GRID */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* 🌡 TEMP */}
        <div className="p-3 rounded-xl bg-blue-50">
          <p className="text-sm text-blue-700 font-medium">Temperature</p>
          <p className="text-lg font-bold">{device?.temperature}°C</p>

          <div className="flex items-center gap-1 text-sm mt-1">
            {tempChange > 0 ? (
              <span className="text-green-600 flex items-center gap-1">
                <FaArrowUp /> {tempChange}
              </span>
            ) : tempChange < 0 ? (
              <span className="text-red-600 flex items-center gap-1">
                <FaArrowDown /> {tempChange}
              </span>
            ) : (
              <span className="text-gray-400">0.00</span>
            )}
          </div>
        </div>

        {/* 💧 HUM */}
        <div className="p-3 rounded-xl bg-green-50">
          <p className="text-sm text-green-700 font-medium">Humidity</p>
          <p className="text-lg font-bold">{device.humidity}%</p>

          <div className="flex items-center gap-1 text-sm mt-1">
            {humChange > 0 ? (
              <span className="text-green-600 flex items-center gap-1">
                <FaArrowUp /> {humChange}
              </span>
            ) : humChange < 0 ? (
              <span className="text-red-600 flex items-center gap-1">
                <FaArrowDown /> {humChange}
              </span>
            ) : (
              <span className="text-gray-400">0.00</span>
            )}
          </div>
        </div>
      </div>

      {/* BUTTON */}
      {(role === "admin" || role === "operator") && (
        <button
          onClick={handleToggle}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold transition ${
            relayState
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          <FaPowerOff />
          {relayState ? "Turn OFF" : "Turn ON"}
        </button>
      )}
    </div>
  );
}
