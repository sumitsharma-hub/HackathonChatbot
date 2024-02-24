import React, { useState } from "react";

const Resize = () => {
  const [htmlStr, setHtmlInput] = useState(
    `<h2>Dolo 650</h2><p>Dolo 650 is a brand of paracetamol manufactured by Micro Labs. It is used for relieving fever and mild to moderate pain like headache, toothache, joint and muscle pain etc.</p><h3>Composition</h3> <p>Each uncoated tablet contains Paracetamol 650mg.</p><h3>Uses</h3><ul><li>Relief of mild to moderate pain like headache, toothache, joint and muscle pain etc.</li> <li>Reduces fever associated with common illnesses like cold, flu etc.</li></ul><h3>Dosage</h3> <p>Adults and children 12 years and above: 1-2 tablets every 4-6 hours when necessary. Maximum 4g (6 tablets) in 24 hours.</p><p>Children under 12 years: Ask doctor before use.</p><h3>Side Effects</h3><p>Nausea, vomiting, rash, difficulty in breathing etc. (in rare cases). Stop use and consult doctor in case of any side effects.</p> <h3>Precautions</h3><ul><li>Do not exceed the prescribed dose.</li><li>Consult doctor if symptoms persist for more than 3 days.</li> <li>Use with caution in case of liver disease.</li></ul><p>Dolo 650 is a commonly used OTC drug for fever and pain relief. It provides effective relief when taken as directed. Consult a doctor for any medical condition before use.</p>`
  );

  setTimeout(() => {
    var resp2 = {
      summarized_question:
        " <h2>Information about Dolo650</h2><p>Dolo650 is a brand name for the drug Paracetamol. Paracetamol is a pain reliever and fever reducer. It is commonly used to treat headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.</p><h3>Drug Class</h3><p>Paracetamol belongs to the drug class known as analgesics-antipyretics. Analgesics are drugs that relieve pain. Antipyretics are drugs that reduce fever.</p><h3>How it Works</h3> <p>Paracetamol works by blocking the production of prostaglandins, which are substances in the body that can cause pain and fever. By blocking prostaglandins, paracetamol reduces pain and fever.</p><h3>Dosage</h3><p>The usual adult dosage of Dolo650 is 1-2 tablets every 4-6 hours as needed, with a maximum of 8 tablets in 24 hours. Dolo650 tablets should be swallowed whole with a glass of water.</p><h3>Side Effects</h3> <p>Common side effects of Dolo650 include nausea, vomiting, constipation, and diarrhea. Allergic reactions like skin rash may also occur in some people. Liver damage is a rare but serious side effect if taken in high doses.</p><p>People with liver or kidney disease should use paracetamol only under medical supervision. Pregnant and breastfeeding women should also consult their doctor before use.</p>",
    };

    //var JSonREsp=  JSON.parse(resp2);
    console.log(resp2.summarized_question);
    setHtmlInput(resp2.summarized_question);
  }, 4000);
  return <div dangerouslySetInnerHTML={{ __html: htmlStr }} />;
};

export default Resize;
