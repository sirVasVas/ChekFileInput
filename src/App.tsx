import { useState } from "react";
import "./styles.css";

export default function App() {
  const [msg, setMsg] = useState("");
  const [acText, setacText] = useState("image/png, image/jpeg");

  function change1(
    event: React.ChangeEvent<HTMLInputElement>,
    typeName: string
  ) {
    const files = event.target.files;
    let formData = new FormData();

    if (files && files[0]) {
      formData.append("files", files[0]);
      formData.append("typeName", typeName);
      //https://beeceptor.com/console/testpresto
      fetch("https://testpresto.free.beeceptor.com", {
        //https://requestbin.com/r/enfe3xfu84b4g/29ydWemvfKTv5RBJOpdLCGkXQOM
        //fetch("https://enfe3xfu84b4g.x.pipedream.net", {

        method: "POST",
        body: formData
        //headers: { "Access-Control-Allow-Origin": "*" }
      })
        //.then((response) => response.json())
        .then((result) => {
          alert("Success");
          setMsg(JSON.stringify(result));
          console.log("Success:", result);
        })
        .catch((error) => {
          setMsg(JSON.stringify(JSON.stringify(error)));
          console.error("Error:", error);
          alert("Error + " + error);
        });

      alert("Send");
    } else {
      alert("No file to send");
    }
  }

  return (
    <div className="App">
      <h1>Check select / send file </h1>
      <div style={{ marginBottom: "20px" }}>
        accept =image/* in &nbsp;
        <input
          type="file"
          accept="image/*"
          onChange={(event) => change1(event, "image/*")}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        accept = image/, .jpg, .png in &nbsp;
        <input
          type="file"
          accept="image/,.jpg, .png"
          onChange={(event) => change1(event, "image/, .jpg, .png")}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        accept ={" "}
        <input
          type="text"
          onChange={(event) => setacText(event.target.value)}
          value={acText}
        />
        &nbsp; in &nbsp;
        <input
          type="file"
          accept={acText}
          onChange={(event) => change1(event, acText)}
        />
      </div>
      <br />
      <br />
      <div id="msgid">{msg}</div>
    </div>
  );
}
