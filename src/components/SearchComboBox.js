// import { useState, useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";
// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css"

// const SearchComboBox = () => {

//   const [selected, setSelected] = useState(null);

//   return (
//     <>
//       <div className="places-container">
//         <PlacesAutocomplete setSelected={setSelected} />
//       </div>
//     </>
//   )
// }

// const PlacesAutocomplete = ({ setSelected }) => {
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: {status, data},
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address) => {
//     setValue(address, false)
//     clearSuggestions();

//     const result = await getGeocode({ address });
//     const { lat, lng } = await getLatLng(result[0]);
//     setSelected({ lat, lng })
//   }

//   return (
//     <Combobox onSelect={handleSelect}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         className="combobox-input"
//         placeholder="Search a place"
//       />
//       <ComboboxPopover>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description}/>
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>

//     </Combobox>
//   )
// }

// export default SearchComboBox
