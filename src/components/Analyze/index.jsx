import React from "react";

const Analyze = (props) => {
  const { logs, isDarkMode } = props;

  function capitalizeWords(str) {
    return str.replace(/\b[a-z]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 32));
  }
  return (
    <div className="p-4 flex gap-1 items-center break-words">
      <div className="flex gap-4 max-w-full">
        <div className={`w-full ${isDarkMode ? "text-black" : "text-white"}`}>
          <div className="relative right-0">
            <h3 className="py-1 text-2xl underline font-bold">DIAGNOSIS</h3>
          </div>
          <div className="mt-4 max-h-[38rem] overflow-y-auto">
            <div className="terminal-style">
              {Object.entries(logs).map(([key, value], index) => (
                <div key={index} className="log-entry mb-2">
                  <span className="log-key text-[#00a67d] mr-2 font-bold text-lg">{capitalizeWords(key)}:</span>
                  <br />
                  {Array.isArray(value) ? (
                    <ul className="list-disc pl-5">
                      {value.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="log-value">{JSON.stringify(value)}</span>
                  )}
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
