import '../../assets/styles/routelist.css'

const  StaticRouteDetail  = ({ leg }) => {
  return(
    <>
      <div className='static-route-detail-main-div'>
        <div className='static-route-detail-leg'>
          {leg}
        </div>
        <div className='circle-marker'>

        </div>
      </div>
    </>
  )
}

export default StaticRouteDetail