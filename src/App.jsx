import { useState } from "react";
import "./App.css";

// images
import LogoIcon from "./assets/logo.svg";
import ShopCart from "./assets/icon-cart.svg";
import ShopCartWhite from "./assets/icon-cart-white.svg";
import UserImage from "./assets/Oval.png";
import FullStar from "./assets/icon-full-star.svg";
import EmptyStar from "./assets/icon-empty-star.svg";
import MinusIcon from "./assets/icon-minus.svg";
import PlusIcon from "./assets/icon-plus.svg";
import DeleteIcon from "./assets/icon-delete.svg";
import Sneaker1 from "./assets/sneaker1.png";
import Sneaker2 from "./assets/sneaker2.png";
import Sneaker3 from "./assets/sneaker3.png";
import Sneaker4 from "./assets/sneaker4.png";
import Placeholder from "./assets/user-placeholder.png";

function StarRating({ rating }) {
  return (
    <div className="comments-stars">
      {[1, 2, 3, 4, 5].map((index) => (
        <img
          key={index}
          src={index <= rating ? FullStar : EmptyStar}
          alt={`star-${index}`}
        />
      ))}
    </div>
  );
}

const Comment = ({
  id,
  user,
  stars,
  headline,
  writtenReview,
  onDelete,
  onEditClick,
}) => {
  return (
    <div className="comments">
      <img className="comments-UserImage" src={UserImage} alt="User Avatar" />
      <div className="comments-main-box">
        <h3>{user}</h3>
        <StarRating rating={stars} />
        <h3>{headline}</h3>
        <p>{writtenReview}</p>
        <div>
          <button onClick={() => onDelete(id)}>Delete</button>
          <button onClick={() => onEditClick(id)}>Edit</button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(Sneaker1);
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [headline, setHeadline] = useState("");
  const [writtenReview, setWrittenReview] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const handleCartClick = () => {
    setCartActive(!cartActive);
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.sneakerName === "Fall Limited Edition Sneakers"
      );

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;
        setCartItems(updatedCartItems);
      } else {
        const newItem = {
          sneakerName: "Fall Limited Edition Sneakers",
          quantity: quantity,
        };
        setCartItems([...cartItems, newItem]);
      }

      setTotalQuantity((prevQuantity) => prevQuantity + quantity);

      setQuantity(0);
    }
  };

  const handleDeleteFromCart = () => {
    setCartItems([]);
    setTotalQuantity(0);
  };

  const handleLittleImageClick = (imageName) => {
    setSelectedImage(imageName);
  };

  const handleWriteReviewClick = () => {
    setShowComments(false);
    setShowAddReview(true);
  };

  const handleCancelReviewClick = () => {
    setEditingComment(null);
    setShowComments(true);
    setShowAddReview(false);
  };

  const handleAddReviewClick = () => {
    if (
      overallRating === 0 ||
      headline.trim().length < 4 ||
      writtenReview.trim().length < 15
    ) {
      return;
    }

    const newReview = {
      rating: overallRating,
      headline,
      writtenReview,
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
    setOverallRating(0);
    setHeadline("");
    setWrittenReview("");
    setShowComments(true);
    setShowAddReview(false);
    setEditingComment(null);
  };

  const handleStarClick = (rating) => {
    setOverallRating(rating);
  };

  const handleHeadlineChange = (event) => {
    setHeadline(event.target.value);
  };

  const handleWrittenReviewChange = (event) => {
    setWrittenReview(event.target.value);
  };

  const handleDeleteComment = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  const handleEditComment = (id) => {
    const commentToEdit = reviews.find((comment) => comment.id === id);
    setEditingComment(commentToEdit);
    setOverallRating(commentToEdit.rating);
    setHeadline(commentToEdit.headline);
    setWrittenReview(commentToEdit.writtenReview);
    setShowComments(false);
    setShowAddReview(true);
  };

  const handleSaveEdit = () => {
    if (
      overallRating === 0 ||
      headline.trim().length < 4 ||
      writtenReview.trim().length < 15
    ) {
      return;
    }

    const updatedReviews = reviews.map((review) =>
      review.id === editingComment.id
        ? {
            ...review,
            rating: overallRating,
            headline,
            writtenReview,
          }
        : review
    );

    setReviews(updatedReviews);
    setOverallRating(0);
    setHeadline("");
    setWrittenReview("");
    setShowComments(true);
    setShowAddReview(false);
    setEditingComment(null);
  };

  return (
    <>
      <div className="navbar">
        <a href="#">
          <img className="Logo-icon" src={LogoIcon}></img>
        </a>
        <a className="nav-link" href="#">
          Collections
        </a>
        <a className="nav-link" href="#">
          Men
        </a>
        <a className="nav-link" href="#">
          Women
        </a>
        <a className="nav-link" href="#">
          about
        </a>
        <a className="nav-link" href="#">
          Contact
        </a>

        <div>
          <img
            className={`ShopCart`}
            src={ShopCart}
            onClick={handleCartClick}
          />
          {totalQuantity > 0 && (
            <span className="cart-number">{totalQuantity}</span>
          )}
        </div>

        <div className={`cart-box ${cartActive ? "cart-box-active" : ""}`}>
          <h2 className="Cart-text">Cart</h2>
          <hr className="Cart-line"></hr>
          {cartItems.length === 0 ? (
            <h2 className="Cart-empty">Your cart is empty.</h2>
          ) : (
            <div>
              {cartItems.map((item, index) => (
                <>
                  <div className="Checkout-box" key={index}>
                    <div className="Checkout-img"></div>
                    <div className="Checkout-info">
                      {item.sneakerName}
                      <p>
                        $125.00 x {item.quantity}{" "}
                        <span>${125 * item.quantity}.00</span>
                      </p>
                    </div>
                    <img
                      className="Checkout-delete"
                      src={DeleteIcon}
                      onClick={handleDeleteFromCart}
                    ></img>
                  </div>
                  <button className="Checkout-button">Checkout</button>
                </>
              ))}
            </div>
          )}
        </div>

        <div className="UserImagesBox">
          <img className="UserImage" src={UserImage}></img>
        </div>
      </div>

      <hr></hr>

      <div className="sneaker">
        <div>
          <div className="main-image-box">
            <img className="main-sneaker-image" src={selectedImage} />
          </div>
          <div className="little-image-box">
            <div
              className={
                selectedImage == Sneaker1 ? "sneaker-box-activated" : null
              }
              onClick={() => handleLittleImageClick(Sneaker1)}
            >
              <img className="sneaker-images" src={Sneaker1} />
            </div>
            <div
              className={
                selectedImage == Sneaker2 ? "sneaker-box-activated" : null
              }
              onClick={() => handleLittleImageClick(Sneaker2)}
            >
              <img className="sneaker-images" src={Sneaker2} />
            </div>
            <div
              className={
                selectedImage == Sneaker3 ? "sneaker-box-activated" : null
              }
              onClick={() => handleLittleImageClick(Sneaker3)}
            >
              <img className="sneaker-images" src={Sneaker3} />
            </div>
            <div
              className={
                selectedImage == Sneaker4 ? "sneaker-box-activated" : null
              }
              onClick={() => handleLittleImageClick(Sneaker4)}
            >
              <img className="sneaker-images" src={Sneaker4} />
            </div>
          </div>
        </div>

        <div>
          <p className="sneaker-company">Sneaker Company</p>

          <h1>Fall Limited Edition Sneakers</h1>

          <div className="star-box">
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={FullStar}></img>
            <img src={EmptyStar}></img>
            <p>4.2 out of 5</p>
          </div>

          <p className="sneaker-description">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>

          <div className="sneaker-price">
            <h2>$125.00</h2>
            <h3>$250.00</h3>
            <div className="discount">50%</div>
          </div>

          <div className="cart-controls">
            <div className="sneaker-quantity">
              <img
                className="minus-box"
                src={MinusIcon}
                onClick={handleDecrement}
              ></img>
              <p>{quantity}</p>
              <img
                className="plus-box"
                src={PlusIcon}
                onClick={handleIncrement}
              ></img>
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
              <img src={ShopCartWhite}></img>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="review">
        {showComments && (
          <div className="review-first-box">
            <h1>Customer reviews</h1>
            <button className="write-review" onClick={handleWriteReviewClick}>
              Write a review
            </button>
          </div>
        )}
        {showComments && (
          <>
            {reviews.map((review) => (
              <Comment
                key={review.id}
                id={review.id}
                user="Me"
                stars={review.rating}
                headline={review.headline}
                writtenReview={review.writtenReview}
                onDelete={handleDeleteComment}
                onEditClick={handleEditComment}
              />
            ))}
            <div className="comments">
              <img src={Placeholder}></img>
              <div className="comments-main-box">
                <h3>Ryan Welles</h3>
                <StarRating rating={4} />
                <h3>Good for its price</h3>
                <p>
                  The quality is good considering the affordable price point.
                  They look good with jeans and are quite comfortable for daily
                  wear.
                </p>
              </div>
            </div>

            <div className="comments">
              <img src={Placeholder}></img>
              <div className="comments-main-box">
                <h3>Emily Moore</h3>
                <StarRating rating={5} />
                <h3>Great quality</h3>
                <p>
                  Comfortable for long walks, and they ve held up great so far.
                  The ve quickly become my go-to pair!
                </p>
              </div>
            </div>

            <div className="comments">
              <img src={Placeholder}></img>
              <div className="comments-main-box">
                <h3>Patricia Lebsack</h3>
                <StarRating rating={5} />
                <h3>Recommended</h3>
                <p>
                  Absolutely love these sneakers! They have a sleek, modern
                  design with a comfortable fit right out of the box.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {showAddReview && (
        <div className="add-review">
          <h1>{editingComment ? "Edit review" : "Add a review"}</h1>
          <h3>Overall Rating</h3>
          <div className="add-review-stars">
            {[1, 2, 3, 4, 5].map((rating) => (
              <img
                key={rating}
                src={rating <= overallRating ? FullStar : EmptyStar}
                onClick={() => handleStarClick(rating)}
              />
            ))}
          </div>
          <h3>Headline</h3>
          <input
            placeholder="What’s most important to know?"
            className="Headline-input"
            type="text"
            onChange={handleHeadlineChange}
            value={headline}
          />

          <h3>Written review</h3>
          <input
            placeholder="What did you like or dislike? What did you use this product for?"
            className="written-review-input"
            type="text"
            onChange={handleWrittenReviewChange}
            value={writtenReview}
          />

          <div className="add-review-buttons">
            <button className="Cancel-button" onClick={handleCancelReviewClick}>
              Cancel
            </button>
            <button
              className="Add-button"
              onClick={editingComment ? handleSaveEdit : handleAddReviewClick}
            >
              {editingComment ? "Save" : "Add"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
