import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { Metadata } from "../layout/Metadata";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { CheckoutSteps } from "./CheckoutSteps";
import PinDrop from "@mui/icons-material/PinDrop";

interface ShippingProps {
  history: any;
}

export const Shipping: React.FC<ShippingProps> = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { shippingInfo } = useSelector((state: any) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e: any) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digit long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };
  return (
    <Fragment>
      <Metadata title="Shipping Details" />
      <CheckoutSteps activeStep={0} />
      <div>
        <div className="h-screen flex flex-col items-center justify-center mx-auto ">
          <h2 className="font-bold text-3xl italic uppercase pb-4">
            Shipping Details
          </h2>
          <form
            className="transition-all md:focus-within:scale-105 antialiased duration-200 ease-in-out space-y-6 shadow-lg md:p-16 rounded-l-xl "
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md ">
              <HomeIcon className="mx-4" />
              <input
                autoFocus
                className="
                focus-within:outline-none flex-grow "
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md">
              <LocationCityIcon className="mx-4" />

              <input
                className=" 
                focus-within:outline-none flex-grow "
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md">
              <PinDrop className="mx-4" />
              <input
                id="number-pinCode"
                className="
                focus-within:outline-none flex-grow"
                type="number"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className="border-2 border-gray-500  hover:border-black p-4 hover:shadow-md">
              <PhoneIcon className="mx-4" />
              <input
                className="
                focus-within:outline-none flex-grow  "
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size={10}
              />
            </div>
            <div className="border-2 border-gray-500 flex  hover:border-black p-4 hover:shadow-md">
              <PublicIcon className="mx-4" />
              <select
                className="
                focus-within:outline-none flex-grow appearance-none cursor-pointer"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div className=" border-gray-500  hover:border p-4 hover:shadow-md">
                <TransferWithinAStationIcon className="mx-4" />
                <select
                  className="
                focus-within:outline-none flex-grow appearance-none cursor-pointer"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Confirm Order"
              className="bg-black text-white w-full p-3 font-sans font-bold hover:bg-gray-700 cursor-pointer "
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};
