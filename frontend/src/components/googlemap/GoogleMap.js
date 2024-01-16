import { GoogleMap, Polyline } from "@react-google-maps/api"
import { decode } from '@googlemaps/polyline-codec';
import "../../assets/styles/googlemap.css"

const Map = ({ mapOptions }) => {

  const overviewPolyline = "cpkxAijqaVC_B`ATVDd@DHBBNf@hIHj@eCpCj@TvAb@n@PGVM`AEb@ArAJrB`@tDb@rEj@tG`@hEJ`DExF?jB@jBJhCJvBHfA@`BAZi@QCCCHBIBBfA\nGtBdInCbBb@VDf@@l@Ij@SxHkDb@Sd@OLBr@EHGBCFBrAXlEfApBd@rDt@lJxBdJpBpD~@pGvAnKbCRHPLJL?L?d@DvANl@dBvDh@hAPS`CqCpA_BX_@l@UTIFCVAf@?xEDxBBdGFhOPnBB@HfArAFRAnAApBDHrA~A\`@lCLxFRrGVlGT~BHCdAKpCY`JKzCAVzCJjBFnCHpFN~HX`EN|CF?JKA|BD^@P?BQB_@IAV{Cb@aHFm@V{@z@cCp@eBpAuDt@oBnCyHfAwC~@mCf@}A[W_@U]]k@w@Wg@IMa@_A[u@K[RkBZaBHIHWvBmJJs@Bc@Ce@o@gDAOB[?Uc@wCUcAAa@\mAPu@LCSYe@mACKGa@k@oICKCKE}@EiAIwAMcDCgBOsC[yGW}FQyE]mHKqCGmBVSvAaBdEkEJJEEKLzApAhCxBjAbAHHBC"
  const result = decode(overviewPolyline)
  const polylinePath = result.map(([lat, lng]) => ({lat, lng}));
  console.log(polylinePath)
  
  return (
    <GoogleMap 
      options={mapOptions}
      mapContainerClassName="map-container"
    >
      <Polyline
        path={polylinePath}
        options={{
          strokeColor: "#FF0000", // Set the color of the polyline
          strokeOpacity: 1.0, // Set the opacity of the polyline
          strokeWeight: 2, // Set the width of the polyline
        }}
      />
    </GoogleMap>
  )
}

export default Map