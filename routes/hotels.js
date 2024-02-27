import express from 'express'
import {createHotel,countByType,countByCity,updateHotel,
    deleteHotel,getHotel,getHotels,getHotelRooms,

} from '../controllers/hotel.js'
import {verifyAdmin} from '../utils/verifyToken.js'
const router = express.Router();
//CREATE
//post route

router.post("/", createHotel);
// Update route
router.put("/:id", verifyAdmin,updateHotel)
// Delete Route
router.delete("/:id",verifyAdmin, deleteHotel)

//GET
router.get("/find/:id", getHotel)

// GET ALL
router.get("/", getHotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)





export default router