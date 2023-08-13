import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
//* styled component
const ImgThumbnail = styled.img`
  height: 300px;
  object-fit: cover;
`;
function Product(props) {
  const navigete = useNavigate();
  const { productArr } = props;
  return (
    <div className="row">
      {productArr.map((product) => (
        <div className=" col-lg-4 col-md-6 col-sm-12  mb-4" key={product._id}>
          <div className="card">
            <ImgThumbnail
              src={product.itemThumbnail}
              className="card-img-top"
              alt="cookie"
            />
            <div className="card-body">
              <h5 className="card-title">{product.itemName}</h5>
              Descipt : <p className="card-text">{product.itemDesc}</p>
              <p className="card-text">Price : {product.itemPrice}</p>
            </div>
            <button
              className="btn btn-outline-dark btn-sm m-1 "
              onClick={() => {
                navigete(`./product/${product._id}`, {
                  state: {
                    itemName: product.itemName,
                    itemPrice: product.itemPrice,
                    itemDesc: product.itemDesc,
                    itemQty: product.itemQty,
                    thumbnail: product.itemThumbnail,
                    email: product.email,
                  },
                });
              }}
            >
              ViewMore
            </button>
            {/* <Link
              className="btn btn-outline-dark btn-sm m-1 "
              to={{
                pathname: `./product/${product._id}`,
                state: { name: "tom", age: 18 },
              }}
            >
              ViewMore
            </Link> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
