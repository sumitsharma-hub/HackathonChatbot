import React from "react";

const Analyze = (props) => {
  const { logs, isDarkMode } = props;
console.log('isDarkMode', isDarkMode);
  return (
    <div className="p-4 flex gap-1 items-center break-words overflow-y-auto hide-scroll ">
      <div className="flex gap-4 max-w-full">
        <div className={`w-full ${isDarkMode? "text-black":"text-white"}`}>
          <div className="relative right-0">
            <h1 className="py-1  text-2xl underline">DIAGNOSIS</h1>
          </div>
          <div className="mt-4  terminal-style">
            {Object.entries(logs).map(([key, value], index) => (
              <>
                <div key={index} className="log-entry">
                  <span className="log-key text-[#00a67d] mr-2">{key}:</span>
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
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
