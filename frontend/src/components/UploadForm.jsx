import "../styles/UploadForm.css";

const UploadBankStatement = () => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload-pdf/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload Success:", response.data);
      // You can use setState to update your UI with the response
    } catch (error) {
      console.error(
        "Upload Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    console.log("jsonOutput", jsonOutput);
  }, [jsonOutput]);
  return (
    <div className="formContainer">
      <div className="formBox">
        <form action="" method="post" className="form">
          <h1>Upload statement</h1>
          <input
            type="file"
            onChange={(e) => {
              // setBankStatement(e.target.files[0])
              // console.log(e.target.files[0])
              handleFileChange(e);
            }}
          />
        </form>
      </div>
    </div>
  );
};
export default UploadBankStatement;
