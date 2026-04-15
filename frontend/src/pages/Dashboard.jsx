import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import DeviceCard from "../components/DeviceCard";
import TempChart from "../components/charts";
import { AuthContext } from "../context/AuthContext";
import socket from "../services/socket";

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  /* ===========================
     INITIAL FETCH (ONLY ONCE)
  =========================== */
  const fetchData = async () => {
    try {
      const [deviceRes, historyRes] = await Promise.all([
        API.get("/devices"),
        API.get("/devices/history"),
      ]);

      setDevices([deviceRes.data]);

      // ✅ REPLACE (NOT APPEND)
      setHistory(historyRes.data || []);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  /* ===========================
     SOCKET (REAL-TIME DATA)
  =========================== */
  useEffect(() => {
    socket.off("dataUpdated"); // 🔥 prevent duplicates

    socket.on("dataUpdated", (data) => {
      setHistory((prev) => {
        const updated = [...prev, data];

        // keep last 50 only
        if (updated.length > 50) updated.shift();

        return updated;
      });
    });

    return () => {
      socket.off("dataUpdated");
    };
  }, []);

  /* ===========================
     LOAD ON MOUNT
  =========================== */
  useEffect(() => {
    fetchData();
  }, []);

  /* ===========================
     TOGGLE RELAY
  =========================== */
  const toggleRelay = async (currentRelay) => {
    try {
      const newState = !currentRelay;

      await API.post("/devices/relay");

      setDevices((prev) =>
        prev.map((d) => ({
          ...d,
          relay: newState,
        })),
      );

      // 🔥 If turning OFF → reload DB history
      if (!newState) {
        fetchData();
      }

      // 🔥 If turning ON → clear graph (socket will refill)
      else {
        setHistory([]);
      }
    } catch (err) {
      console.error("Relay toggle failed:", err);
    }
  };

  /* ===========================
     LOADING UI
  =========================== */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-purple-900 bg-clip-text text-transparent">
        IoT Dashboard
      </h1>

      {/* Devices */}
      <div className="flex flex-wrap justify-end gap-8 mt-6">
        {devices.map((d, index) => (
          <DeviceCard
            key={index}
            device={d}
            history={history}
            toggleRelay={() => toggleRelay(d.relay)} // ✅ FIXED
            role={user?.role}
          />
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-lg shadow-sm">
        <TempChart data={history} />
      </div>
    </div>
  );
}
