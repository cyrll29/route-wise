import ModalHeader from '../../components/ModalHeader'


const AboutModal = () => {
  return (
    <>
      <ModalHeader 
        title='About'
        isRoute={false}
      />
      <h1>RouteWise Developers</h1>
      <p>We are a group of four passionate individuals hailing from the Polytechnic University of the Philippines, Sta. Mesa. </p>
      <p>Currently, we are all fourth-year students pursuing a Bachelor of Science in Computer Engineering.</p> 
      <p>Our journey through this program has equipped us with the knowledge and skills necessary to create this website and bring our vision to life.</p>
    </>
  )
}

export default AboutModal
