 

const ImageUploadBox = ({lable,onChange}) => {
  return (
    <div style={{ marginBottom: "15px" }}>  
        <p>{lable}</p>
        <input type="file"  accept='image/*' onChange={onChange}/>
    </div>
  );
};

export default ImageUploadBox;