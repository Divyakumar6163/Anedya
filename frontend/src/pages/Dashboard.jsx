import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import DeviceCard from "../components/DeviceCard";
import TempChart from "../components/charts";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const fetchData = async () => {
    try {
      const [deviceRes, historyRes] = await Promise.all([
        API.get("/devices"),
        API.get("/devices/history"),
      ]);

      setDevices([deviceRes.data]);
      // console.log("Fetched device data:", deviceRes.data);
      setHistory(historyRes.data.data || []);
      // console.log("Fetched history data:", historyRes.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData();
  }, []);

  // Toggle relay
  const toggleRelay = async () => {
    try {
      await API.post("/devices/relay");
      fetchData();
    } catch (err) {
      console.error("Relay toggle failed:", err);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      fetchData();
    }, 3000);
    return () => clearInterval(id);
  }, [devices]);

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
            toggleRelay={toggleRelay}
            role={user?.role}
          />
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-lg shadow-sm mt-6">
        <TempChart data={history} />
      </div>
    </div>
  );
}
