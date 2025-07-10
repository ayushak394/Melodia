import React, { useState } from "react";
import axios from "axios";
import {
  FaUnlockAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaUsersCog,
  FaUserPlus,
  FaHome,
  FaHeart,
} from "react-icons/fa";

function DeveloperPanel() {
  const [secretCode, setSecretCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.REACT_APP_API_URL;

  const verifySecret = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await axios.get(`${baseURL}/api/auth/pending-admins`, {
        params: { devSecret: secretCode },
      });
      setPendingAdmins(response.data.pendingAdmins);
      setVerified(true);
      setMessage("Developer secret verified. Loading pending requests.");
    } catch (err) {
      setError("Invalid developer secret or server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const approveAdmin = async (userId) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await axios.post(`${baseURL}/api/auth/approve-admin`, {
        devSecret: secretCode,
        userId,
      });
      setPendingAdmins((prev) => prev.filter((u) => u._id !== userId));
      setMessage("Admin approved successfully!");
    } catch (err) {
      setError("Approval failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0d0d2b] via-[#1e1e4f] to-[#3a3a8a] text-white font-sans overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/noisy.png')] bg-repeat">
      <header className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 py-4 bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-indigo-900/90 shadow-2xl border-b border-purple-700 backdrop-blur-sm sticky top-0 z-50">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3 mb-4 sm:mb-0">
          <img
            src="/waveform.png"
            alt="Melodia Logo"
            className="w-10 h-10 lg:w-12 lg:h-12 rounded-full filter brightness-0 invert"
          />
          <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
            Melodia
          </span>
        </h1>
        <a
          href="/"
          className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105 text-sm sm:text-base flex items-center gap-2"
        >
          <FaHome className="text-lg" />
          Home
        </a>
      </header>

      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl mx-auto bg-[#1f1f3a]/90 p-8 rounded-3xl shadow-2xl border border-[#3a3a8a] backdrop-blur-md animate-fade-in border-2 border-teal-400/40">
          <h1 className="text-4xl font-extrabold mb-8 text-teal-300 text-center drop-shadow-lg flex items-center justify-center gap-3">
            <FaUsersCog className="text-5xl" /> Developer Approval Panel
          </h1>

          {!verified ? (
            <div className="max-w-md mx-auto bg-[#2a2a4f] p-6 rounded-lg shadow-xl border border-gray-700">
              <label htmlFor="secretCode" className="block text-gray-300 text-lg font-medium mb-3">
                <FaUnlockAlt className="inline-block mr-2 text-teal-400" /> Enter Developer Secret
              </label>
              <input
                id="secretCode"
                type="password"
                placeholder=""
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-500 text-lg"
                autoComplete="off"
              />
              <button
                onClick={verifySecret}
                disabled={loading}
                className={`w-full mt-5 py-3 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-blue-900 text-gray-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/50"
                }`}
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full"></span>{" "}
                    Verifying...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-xl" /> Verify 
                  </>
                )}
              </button>
              {error && (
                <p className="text-red-400 mt-4 text-center font-medium bg-red-900/20 p-2 rounded-md animate-shake flex items-center justify-center gap-2">
                  <FaTimesCircle /> {error}
                </p>
              )}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold mb-6 text-cyan-400 flex items-center gap-3">
                <FaUserPlus className="text-4xl" /> Pending Admin Requests
                <span className="ml-auto text-lg font-bold bg-purple-700 px-3 py-1 rounded-full">
                  {pendingAdmins.length}
                </span>
              </h2>
              {message && (
                <p className="text-green-400 mb-6 text-center font-medium bg-green-900/20 p-2 rounded-md animate-fade-in flex items-center justify-center gap-2">
                  <FaCheckCircle /> {message}
                </p>
              )}
              {error && (
                <p className="text-red-400 mb-6 text-center font-medium bg-red-900/20 p-2 rounded-md animate-shake flex items-center justify-center gap-2">
                  <FaTimesCircle /> {error}
                </p>
              )}

              {pendingAdmins.length === 0 ? (
                <p className="text-gray-400 text-lg text-center p-8 bg-[#2a2a4f] rounded-lg shadow-inner border border-gray-700">
                  All clear! No pending admin requests at the moment.
                </p>
              ) : (
                <ul className="space-y-4">
                  {pendingAdmins.map((user) => (
                    <li
                      key={user._id}
                      className="bg-[#2a2a4f] p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center shadow-lg border border-purple-800 hover:border-teal-500 transition-all duration-300 transform hover:scale-[1.01]"
                    >
                      <div className="text-center sm:text-left mb-3 sm:mb-0">
                        <p className="font-bold text-xl text-teal-300">{user.username}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <p className="text-gray-400 text-sm">{user.phone}</p>
                      </div>
                      <button
                        onClick={() => approveAdmin(user._id)}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 ${
                          loading
                            ? "bg-green-900 text-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-green-400/50"
                        }`}
                      >
                        {loading ? (
                          <>
                            <span className="animate-spin h-4 w-4 border-b-2 border-white rounded-full"></span>{" "}
                            Approving...
                          </>
                        ) : (
                          <>
                            <FaCheckCircle /> Approve
                          </>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-center border-t border-purple-800">
        <p className="text-gray-400 text-sm sm:text-base">
          © {new Date().getFullYear()} Melodia. All rights reserved.
        </p>
        <p className="mt-2 text-gray-500 text-xs sm:text-sm">
          Developed with{" "}
          <FaHeart className="inline text-red-500 mx-1 animate-pulse" /> by:{" "}
          <span className="font-medium text-teal-300">Ayush Kumar</span> &{" "}
          <span className="font-medium text-teal-300">Anshika Shekhar</span>
        </p>
      </footer>
    </div>
  );
}

export default DeveloperPanel;