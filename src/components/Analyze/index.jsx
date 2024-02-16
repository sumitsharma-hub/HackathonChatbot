import React from "react";

const Analyze = (props) => {
  const { logs } = props; // Assuming logs is an object

  return (
    <div className="p-4 flex gap-1 items-center">
      <div className="flex gap-4">
        <div className="w-full">
          <div className="relative right-0">
            <h1 className="py-1 text-white text-2xl underline">Bot Analyser.</h1>
          </div>
          <div className="mt-4 text-white terminal-style">
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
                {/* <div className=""></div> */}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
