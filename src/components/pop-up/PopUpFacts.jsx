import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./popup.css";

const PopUpFacts = ({ limit, setLimit, handleAddFacts }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="pop-pup-container" data-aos="zoom-in-up">
      <form className="form-container">
        <h3> How many cat facts do you want to add to your list?</h3>
        <input
          value={limit}
          type="number"
          placeholder="type a number of facts..."
          onChange={(e) => setLimit(e.target.value)}
        />
        <label> Limit : 300</label>
        <button
          className="btn btn-info"
          onClick={(e) => handleAddFacts(e, limit)}
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default PopUpFacts;
