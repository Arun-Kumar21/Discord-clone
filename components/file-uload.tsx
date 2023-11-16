"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@uploadthing/react";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {

    const fileType = value?.split(".").pop();

    if(value && fileType !== "pdf"){
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="upload"
                    className="rounded-full"
                />

                <button className="bg-rose-500 text-white  absolute top-0 right-0 rounded-full shadow-sm"
                  onClick ={()=>onChange("")}
                  type="button"
                >
                  <X className="h-4 w-4"/>
                </button>

            </div>
        )
    }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res:any) => {
        onChange(res?.[0].url);
      }}
      onClientError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
