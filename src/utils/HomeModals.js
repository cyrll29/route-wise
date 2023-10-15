import React from 'react'
import AboutModal from '../views/modals/AboutModal'
import ReportModal from '../views/modals/ReportModal'
import NotifModal from '../views/modals/NotifModal'
import HindranceModal from '../views/modals/HindranceModal'
import RoadModal from '../views/modals/RoadModal'
import RouteModal from '../views/modals/RouteModal'

const HomeModals = (props) => {
    return (
        <>
            {props.aboutModal ? <AboutModal /> : <></>}
            {props.reportModal ? <ReportModal /> : <></>}
            {props.notifModal ? <NotifModal /> : <></>}
            {props.routeModal ? <RouteModal /> : <></>}
            {props.roadModal ? <RoadModal /> : <></>}
            {props.hindranceModal ? <HindranceModal /> : <></>}
        </>
    )
}

export default HomeModals
