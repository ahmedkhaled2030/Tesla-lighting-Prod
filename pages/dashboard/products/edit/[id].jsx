import styles from "../../../../styles/addProductDashboard.module.scss";
import React, { useEffect, useRef, useState } from "react";

import Sidebar from "@/components/SideBarDashboard";
import DataTableDashboard from "@/components/DataTableDashboard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import Image from "next/image";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Editor } from "@tinymce/tinymce-react";
import NavbarDashboard from "@/components/NavbarDashboard";
import Cookies from "js-cookie";
const EditProduct = ({ categoryList, editProps }) => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "left",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => {
    console.log(newState, "newState");
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const colors = ["Gold", "Black", "Brown", "Blue", "Green"];

  const editorRef = useRef(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(Cookies.get("token"));
  }, [token]);
  const router = useRouter();

  // images
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const [imageScreens, setImageScreens] = useState([]);
  const [uploading, setUploading] = useState(null);

  const handleImage = (e) => {
    //console.log(e.target.files);
    setImage(e.target.files);
  };
  const uploadImages = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (var item of image) {
      formData.append("image", item);
    }

    axios
      .post("http://18.214.112.247:4000/product/upload", formData, {
        onUploadProgress: (data) => {
          setUploading(Math.round((data.loaded / data.total) * 100));
        },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        //console.log(res.data.data);
        res.data.data.map((item) => {
          setImagePath((oldArray) => [...oldArray, item._id]);
          setImageScreens((oldArray) => [...oldArray, item.path]);
        });
      })
      .catch((error) => {
        //console.log(error);
      });
  };
  // images

  const [category, setCategory] = useState(editProps.product.category);
  const [subcategory, setSubCategory] = useState([]);
  const [selectedSubcategory, setSelectedSubCategory] = useState("");
  const [model, setModel] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [status, setStatus] = useState("");

  const handleCategory = (event) => {
    //console.log(event.target.value, "event.target.value");
    setCategory(event.target.value);
    setSubCategory(event.target.value.subCategories);
  };

  const handleSubCategory = (e) => {
    //console.log(e.target.value);
    setSelectedSubCategory(e.target.value);
    setModel(e.target.value.subCategories);
  };

  const handleModel = (e) => {
    setSelectedModel(e.target.value);
  };
  const [sale, setSale] = useState(editProps.product.sale);
  const [isNew, setIsNew] = useState(editProps.product.new);
  const [selectedColors, setSelectedColors] = useState(
    editProps.product.colors
  );
  const [description, setDescription] = useState(
    "write here what you need to explain about product"
  );

  //console.log(colors, "colors");
  const handleSale = (e) => {
    console.log(e.target.value);
    setSale(e.target.value);
  };

  const handleIsNew = (e) => {
    setIsNew(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const [size, setSize] = useState(editProps.product.size);
  const [sizeInput, setSizeInput] = useState(null);

  //console.log(size, "size");
  const handleSizeInputs = (e) => {
    //console.log('')
    e.preventDefault();
    setSizeInput({ ...sizeInput, [e.target.name]: e.target.value });
  };

  const handleSize = (e) => {
    e.preventDefault();
    setSize((prev) => [...prev, sizeInput]);
  };
  const [addDataInputs, setAddDataInputs] = useState(null);
  //console.log(addDataInputs, "addDataInputs");
  const addData = (e) => {
    e.preventDefault();
    setAddDataInputs({ ...addDataInputs, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value, "value");
    const isChecked = e.target.checked;
    console.log(isChecked);

    setSelectedColors(
      isChecked
        ? [...selectedColors, value]
        : selectedColors.filter((item) => item !== value)
    );
  };
  console.log(selectedColors, "selectedColors");

  const addProduct = (e) => {
    e.preventDefault();

    console.log({
      new: isNew,
      colors: selectedColors,
      size: size,
      description: editorRef.current.getContent(),
      sale: sale,
      ...addDataInputs,
    });

    axios
      .put(
        `http://18.214.112.247:4000/dashboard/product/${editProps.product._id}`,
        {
          new: isNew,
          colors: selectedColors,
          size: size,
          description: editorRef.current.getContent(),
          sale: sale,
          ...addDataInputs,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        handleClick({
          vertical: "top",
          horizontal: "left",
        });
        router.push(`/dashboard/products`);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const productInputs = [
    {
      id: 1,
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Title",
      value: editProps.product.title,
    },

    {
      id: 2,
      label: "Price",
      type: "number",
      name: "price",
      placeholder: "price",
      min: "1",
      value: editProps.product.price,
    },
    {
      id: 3,
      label: "ShippingCost",
      type: "number",
      name: "shippingCost",
      placeholder: "shippingCost",
      min: "1",
      value: editProps.product.shippingCost,
    },
    {
      id: 4,
      label: "Discount",
      type: "number",
      name: "discount",
      placeholder: "Discount",
      min: "1",
      value: editProps.product.discount,
    },
    {
      id: 5,
      label: "Stock",
      type: "number",
      name: "stock",
      placeholder: "Stock",
      min: "1",
      value: editProps.product.stock,
    },
  ];

  return (
    <div className={styles.products}>
      <Sidebar />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <div className={styles.productsContainer}>
        <div className={styles.new}>
          <div className={styles.newContainer}>
            <div className={styles.top}>
              <h1>Add Product</h1>
            </div>
            <div className={styles.bottom}>
              <div className={styles.left}>
                {imageScreens.map((img) => (
                  <Image
                    src={img}
                    alt={img}
                    width="100"
                    height="100"
                    objectFit="contain"
                  />
                ))}
              </div>

              <Box
                className={styles.right}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <form>
                  {/* <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <label htmlFor="file">
                      Image:
                      <DriveFolderUploadOutlined className={styles.icon} />
                    </label>
                    <input
                      type="file"
                      id="file"
                      multiple
                      onChange={handleImage}
                      style={{ display: "none" }}
                    />
                    <Button
                      onClick={uploadImages}
                      sx={{ my: 1, mx: 5, width: 150 }}
                      variant="contained"
                      color="secondary"
                      disabled={image.length == 0}
                    >
                      Upload Images
                    </Button>
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        mx: 5,
                      }}
                    >
                      {uploading && (
                        <CircularProgress
                          variant="determinate"
                          value={uploading}
                        />
                      )}
                      {uploading && (
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                          >
                            {uploading}%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box> */}

                  {/* <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">
                      category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Category"
                      onChange={handleCategory}
                    >
                      {categoryList.map((item) => (
                        <MenuItem value={item} key={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}

                  {/* SubcategoryList */}

                  {/* <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">
                      sub Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedSubcategory}
                      label="subcategory"
                      onChange={handleSubCategory}
                    >
                      {subcategory.length > 0 &&
                        subcategory.map((item) => (
                          <MenuItem value={item} key={item._id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl> */}

                  {/* Model */}

                  {/* <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">Model</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedModel}
                      label="model"
                      onChange={handleModel}
                    >
                      {model.length > 0 &&
                        model.map((item) => (
                          <MenuItem value={item} key={item._id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl> */}

                  {/* Sale */}

                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">Sale</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sale}
                      label="sale"
                      onChange={handleSale}
                    >
                      <MenuItem value={true}>true</MenuItem>
                      <MenuItem value={false}>false</MenuItem>
                    </Select>
                  </FormControl>

                  {/* isNew */}

                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">New</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={isNew}
                      label="isNew"
                      onChange={handleIsNew}
                    >
                      <MenuItem value={true}>true</MenuItem>
                      <MenuItem value={false}>false</MenuItem>
                    </Select>
                  </FormControl>

                  {/* Colors */}

                  <FormControl sx={{ width: 200 }}>
                    <InputLabel id="demo-simple-select-label">
                      Colors
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={colors}
                      label="colors"
                    >
                      {colors?.map((color) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <ListItem
                            variant="plain"
                            color="warning"
                            sx={{ borderRadius: "sm" }}
                          >
                            <Checkbox
                              color="warning"
                              label={color}
                              value={color}
                              checked={selectedColors.find(
                                (item) => item == color
                              )}
                              overlay
                              sx={{ color: "inherit" }}
                              onChange={handleChange}
                            />
                          </ListItem>
                        </Box>
                      ))}

                      {/* <MenuItem value={"Gold"}>Gold</MenuItem>
                      <MenuItem value={"Black"}>Black</MenuItem>
                      <MenuItem value={"Brown"}>Brown</MenuItem>
                      <MenuItem value={"Blue"}>Blue</MenuItem>
                      <MenuItem value={"Green"}>Green</MenuItem> */}
                    </Select>
                  </FormControl>

                  {productInputs.map((input) => (
                    <div key={input.id}>
                      <TextField
                        sx={{ width: 250 }}
                        id="outlined-basic"
                        label={input.label}
                        variant="outlined"
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        min={input.min}
                        onChange={addData}
                        defaultValue={input.value}
                      />
                    </div>
                  ))}

                  <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={editProps.product.description}
                    apiKey="8gxcb11g7m4xvisnyof1cbmu31sn3qt8ysggr7tkz7fq6ekh"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor link lists",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount ",
                      ],
                      toolbar:
                        "undo redo | formatselect | lists" +
                        " fontsize fontfamily  | copy blockquote forecolor   backcolor  | strikethrough    " +
                        "bold italic  underline | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      my: 2,
                    }}
                  >
                    <label className={styles.label}>Size</label>
                    <TextField
                      id="outlined-basic"
                      label="value"
                      variant="outlined"
                      name="value"
                      onChange={handleSizeInputs}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Price"
                      name="price"
                      variant="outlined"
                      onChange={handleSizeInputs}
                    />

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleSize}
                    >
                      Add Size
                    </Button>

                    <div className={styles.extraItems}>
                      {size.map((option) => (
                        <span key={option.value} className={styles.extraItem}>
                          {option.value} => {option.price} $
                        </span>
                      ))}
                    </div>
                  </Box>
                </form>

                <Box sx={{ margin: "auto", marginTop: "20px" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={addProduct}
                  >
                    Edit Product
                  </Button>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const token = ctx.req?.cookies.token || "";
  console.log(ctx.params.id);
  const categoryRes = await axios.get(
    `http://18.214.112.247:4000/category/list`,

    {
      headers: {
        Authorization: token,
      },
    }
  );
  const editRes = await axios.get(
    `http://18.214.112.247:4000/product/${ctx.params.id}`,

    {
      headers: {
        Authorization: token,
      },
    }
  );

  return {
    props: {
      categoryList: categoryRes.data.data,
      editProps: editRes.data.data,
    },
  };
};

export default EditProduct;
