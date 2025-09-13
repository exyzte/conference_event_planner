import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { roomMaxCapacity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from './mealsSlice';


const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const venueItems = useSelector((state) => state.venue);
    const avItems = useSelector((state) => state.av);
    const mealsItems = useSelector((state) => state.meals);
    const mealsItemsWithType = mealsItems.map((item)=> ({
        ...item,
        type: "mealForPeople"
    }));
    const dispatch = useDispatch();
    
    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    const handleAddToCart = (index) => {
        dispatch(incrementQuantity(index));
      };
    
      const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
          dispatch(decrementQuantity(index));
        }
      };

    const handleDecrementAvQuantity = (index) => {
          dispatch(decrementAvQuantity(index));
    };

    const handleIncrementAvQuantity = (index) => {
          dispatch(incrementAvQuantity(index));
    }

    const handleMealSelection = (index) => {
        const item = mealsItems[index];
        if(item.selected && item.type === "mealForPeople") {
        const newNumberOfPeople = item.selected ? numberOfPeople : 0;
        dispatch(toggleMealSelection(index, newNumberOfPeople));
        } 
        else {
            dispatch(toggleMealSelection(index));
        }
    };

    const getItemsFromTotalCost = () => {
        const items = [];
        venueItems.forEach((item) => {
            if (item.quantity > 0) {
                items.push({ ...item, type: "venue" });
            }
        });
        avItems.forEach((item)=> {
            if (
                item.quantity > 0 && 
                !items.some((i) => i.name === item.name && i.type === "av")
            ) {
                items.push({ ...items, type: "av" });
            }
        });
        mealsItems.forEach((item) => {
            if(item.selected) {
                const itemForDisplay = { ...item, type: "meals" };
                if(item.numberOfPeople) {
                    itemForDisplay.numberOfPeople = numberOfPeople;
                }
            }
        });
        return items;
    };
    mealsItems.forEach((item) => {
        if (item.selected) {
            const itemForDisplay = { ...item, type: "meals" };
        }
    })

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {
        console.log(items);
        return <>
            <div className="display_box1">
                {items.length === 0 && <p>No items selected</p>}
                <table className="table_item_data">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                            <tr key={index}>
                                <td>{item.name</td>
                                <td>{item.cost}</td>
                                <td>
                                    {item.type === "meals" || item.numberOfPeople
                                    ? `For ${numberOfPeople} people`
                                    : item.quantity}
                                </td>
                                <td>{item.type === "meals" || item.numberOfPeople
                                    ? `${item.cost * numberOfPeople}`
                                    : `${item.cost * item.quantity}`
}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    }

    };
    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
          venueItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
          });
        } else if (section === "addons") {
            addonsItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        }  else if (section = "meals") {
            mealsItems.forEach((item) => {
                if(item.selected) {
                totalCost += item.cost * numberOfPeople;
                }
            });
        }
        return totalCost;
      };
    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av")
    const mealsTotalCost = calculateTotalCost("meals");
    const totalCosts = {
        venue: venueTotalCost, 
        av: avTotalCost, 
        meals: mealsTotalCost,
    };
    const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;
    const navigateToProducts = (idType) => {
        if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
          if (showItems) { // Check if showItems is false
            setShowItems(!showItems); // Toggle showItems to true only if it's currently false
          }
        }
      }

    return (
        <>
            <navbar className="navbar_event_conference">
                <div className="company_logo">Conference Expense Planner</div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue" onClick={() => navigateToProducts("#venue")} >Venue</a>
                        <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                        <a href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
                    </div>
                    <button className="details_button" onClick={() => setShowItems(!showItems)}>
                        Show Details
                    </button>
                </div>
            </navbar>
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                             <div id="venue" className="venue_container container_main">
        <div className="text">
 
          <h1>Venue Room Selection</h1>
        </div>
        <div className="venue_selection">
          {venueItems.map((item, index) => (
            <div className="venue_main" key={index}>
              <div className="img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="text">{item.name}</div>
              <div>${item.cost}</div>
              <div className="button_container">
  {(() => {
    // This is the key line: using square brackets [] to access the object property
    const maxQuantity = roomMaxCapacity[item.name]; 
    const isIncrementDisabled = item.quantity >= maxQuantity;
    const isDecrementDisabled = item.quantity === 0;

    return (
      <>
        {/* Minus Button: Disabled if quantity is 0 */}
        <button
          className={isDecrementDisabled ? "btn-warning btn-disabled" : "btn-warning btn-plus"}
          onClick={() => handleRemoveFromCart(index)}
        >
          &#8211;
        </button>
        
        {/* Quantity Display */}
        <span className="selected_count">
          {item.quantity > 0 ? ` ${item.quantity}` : "0"}
        </span>
        
        {/* Plus Button: Disabled if at max capacity */}
        <button
          className={isIncrementDisabled ? "btn-success btn-disabled" : "btn-success btn-plus"}
          onClick={() => handleAddToCart(index)}
        >
          &#43;
        </button>
      </>
    );
  })()}
</div>
            </div>
          ))}
        </div>
        <div className="total_cost">Total Cost: ${venueTotalCost}</div>
      </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="venue_container container_main">


                                <div className="text">

                                    <h1> Add-ons Selection</h1>

                                </div>
                                <div className="addons_selection">
                                    { avItems.map((item, index) => {
                                        <div className="av_data venue_main" key={index}>
                                            <img src={item.img} alt={item.name} />
                                        <div className="text"> {item.name} </div>
                                        <div> {item.const} </div>
                                            <div className="addons_btn">
                                                <button className="btn-warning" onClick={()=>handleDecrementAvQuantity}>&ndash;</button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button className="btn-success" onClick={handleIncrementAvQuantity}>&#43;</button>
                                            </div>
                                        </div>
                                    })}
                                </div>
                                <div className="total_cost">Total Cost: {avTotalCost}</div>
                                    
                            </div>

                            {/* Meal Section */}

                            <div id="meals" className="venue_container container_main">

                                <div className="text">

                                    <h1>Meals Selection</h1>
                                </div>

                                <div className="input-container venue_selection">
                                    <label htmlFor="numberOfPeople"><h3>Number of people:</h3></label>
                                    <input type="number" name="input_box5" className="input_box5" id="numberOfPeople" value={numberOfPeople}
                                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                        min="1"                                    
                                        />
                                </div>
                                <div className="meal_selection">
                                
                                        {mealsItems.map((item, index)=> {
                                            <div className="meal_item" key={index} style={{ padding: 15 }}>
                                                <div className="inner">
                                                    <input type="checkbox" id={ `meal_${index}` }
                                                    checked= { item.selected }
                                                    onChange={()=> handleMealSelection(index)}
                                                    />
                                                    <label htmlFor={`meal_${index}`}> {item.name} </label>
                                                </div>
                                                <div className="meal_cost">${item.cost}</div>
                                            </div>
                                        })}
                                </div>
                                <div className="total_cost">Total Cost: {mealsTotalCost}</div>

                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
                            <TotalCost totalCosts={ totalCosts } handleClick={handleToggleItems} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                        </div>
                    )
                }




            </div>
        </>

    );
};

export default ConferenceEvent;
