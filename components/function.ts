import axios, { AxiosPromise } from "axios";

interface openTextFileReturn {
  file: string;
  preview: string;
}

export const openTextFile = (): Promise<openTextFileReturn> =>
  new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.id = "uploadInput";
    input.click();
    input.onchange = function (event: Event) {
      const target = event.target as HTMLInputElement;
      getFileData(target.files![0]).then((res_first) => {
        processFile(target.files![0]).then((res) => {
          resolve({
            file: res.result,
            preview: res_first.preview,
          });
        });
      });
    };
  });

interface processFileReturn {
  result: string;
}

const processFile = (file: File): Promise<processFileReturn> =>
  new Promise((resolve) => {
    {
      const reader = new FileReader();
      reader.onload = function () {
        const result: any = reader.result;
        resolve({
          result: result?.toString(),
        });
      };
      reader.readAsDataURL(file);
    }
  });

export const getImgData = (file: any): AxiosPromise<any> => {
  const body = {
    requests: [
      {
        image: {
          content: file.split(",")[1],
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
  return axios({
    method: "post",
    url: `https://vision.googleapis.com/v1/images:annotate?key=${"AIzaSyDSXXzOO5yjpLH3i9OEPYIJ7_CpGraV2cs"}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body),
  });
};

interface returnValue {
  file: File;
  preview: string;
}

export const getFileData = (file: File): Promise<returnValue> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        file: file,
        preview: reader.result!.toString(),
      });
    };
    file && reader.readAsDataURL(file);
  });
