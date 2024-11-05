import React, { useState } from "react";
import axios from "axios";



const InputPodcast = () => {
  const [frontImage, setfrontImage] = useState(null);
  const [audioFile, setaudioFile] = useState(null);
  const [Dragging, setDragging] = useState(false);
  const [Inputs, setInputs] = useState({
    title : '', 
    description: '',
     category:''
    });

  const handleChangeImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setfrontImage(file);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    setDragging(false)
    const file = e.dataTransfer.files[0];
    setfrontImage(file)
  };
  const handleAudioFile = (e) =>{
    e.preventDefault();
    const file = e.target.files[0];
    setaudioFile(file);
  };
  const onChangeInputs = (e) => {
    const {name,value} = e.target;
    setInputs({...Inputs, [name]:value})
  };


  const handleSubmitPodcast = async () =>{


// console.log(Inputs,frontImage,audioFile)


const data =  new FormData();
data.append("title",Inputs.title);
data.append("description",Inputs.description);
data.append("category",Inputs.category);
data.append("frontImage",frontImage);
data.append("audioFile",audioFile);

try {
  const res = await axios.post("http://localhost:1000/api/v1/add-podcast",
    data,
  {
    headers:{
    "Content-Type": "multipart/form-data",
  },
    withCredentials:true,
  }
);
console.log(res.data);
} catch (error) {
  console.log(error)
}

  }

  return (
    <div className="my-4 px-4 lg:px-12">
      <h1 className="text-2xl font-semibold">Create your podcast</h1>
      <div className="mt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-2/6 flex items-center justify-center lg:justify-start">
          <div
            className="size-[20vh] lg:size-[60vh] flex items-center justify-center hover:bg-slate-50 transition-all duration-300"
            style={{ border: "1px dashed black" }}
            onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDropImage}
          >
            <input
              type="file"
              accept="image/*"
              id="file"
              name="frontImage"
              className="hidden"
              onChange={handleChangeImage}
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="thumbnail"
                className="h-[100%] w-[100%] object-cover"
              />
            ) : (
              <>
                <label
                  htmlFor="file"
                  className={`text-xl p-4 h-[100%] w-[100%] hover:cursor-pointer flex items-center justify-center ${
                    Dragging ? "bg-blue-200" : ""
                  } hover:bg-zinc-200 transition-all duration-300`}
                  
                >
                  <div className=" text-center">
                    Drag and drop the thumbnail or Click to browser
                  </div>
                </label>
              </>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col ">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title for your podcast"
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded "
              value={Inputs.title}
              onChange={onChangeInputs}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="title">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Description for your podcast"
              className="mt-4 px-4 py-2 outline-none border border-zinc-800 rounded "
              rows={4}
              value={Inputs.description}
              onChange={onChangeInputs}
            />
          </div>
          <div className="flex  mt-4">
            <div className="flex flex-col w-2/6">
              <label htmlFor="audioFile">Select Audio</label>
              <input
                type="file"
                accept=".mp3, .wav, .m4a, .ogg"
                id="audioFile"
                className="mt-4"
                onChange={handleAudioFile}
              />
            </div>
            <div className="flex flex-col w-4/6">
              <label htmlFor="category">Select Category</label>
              <select
                name="category"
                id="category"
                className="border border-zinc-900 rounded mt-4 outline-none px-4 py-2 "
                value={Inputs.category}
              onChange={onChangeInputs}
              >
                <option value="">Select Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Bussiness">Bussiness</option>
                <option value="Education">Education</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Governement">Government</option>
              </select>
            </div>
          </div>
          <div className="mt-8 lg:mt-6 flex">
            <button className="bg-zinc-900 w-full text-white rounded px-8 py-2 font-semibold hover:bg-zinc-800 transition-all duration-300" 
            onClick={handleSubmitPodcast}>
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
