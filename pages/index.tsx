import { useEffect, useState } from "react";
import axios from "axios";
import Main from "../components/Main";

export default function Home() {
  const [state, setState] = useState<string>();

  function openTextFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.id = "uploadInput";
    input.click();
    input.onchange = function (event: any) {
      processFile(event.target.files[0]);
    };
  }

  function processFile(file: any) {
    const reader = new FileReader();
    reader.onload = function () {
      var result: any = reader.result;
      setState(result);
    };
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (!state) return;
    const body = {
      requests: [
        {
          image: {
            content: state.split(",")[1],
          },
          features: [
            {
              maxResults: 10,
              type: "OBJECT_LOCALIZATION",
            },
          ],
        },
      ],
    };
    axios({
      method: "post",
      url: `https://vision.googleapis.com/v1/images:annotate?key=${"AIzaSyDSXXzOO5yjpLH3i9OEPYIJ7_CpGraV2cs"}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  return <Main />;
}
