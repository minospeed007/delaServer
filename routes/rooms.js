import express from 'express'
import {createRoom,updateRoom,deleteRoom,getRoom,getRooms,updateRoomAvailability

} from '../controllers/room.js'
import {verifyAdmin} from '../utils/verifyToken.js'
const router = express.Router();
//CREATE
//post route

router.post("/:hotelid", createRoom);
// Update route
router.put("/:id", verifyAdmin,updateRoom)
router.put("/availability/:id",updateRoomAvailability)

// Delete Route
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

//GET
router.get("/:id", getRoom)

// GET ALL
router.get("/", getRooms)





export default router