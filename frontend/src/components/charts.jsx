import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TempChart({ data }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 🌡 Temperature Graph */}
      <div className="bg-white p-5 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">
          Temperature Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 💧 Humidity Graph */}
      <div className="bg-white p-5 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-green-600">
          Humidity Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
