import { Request, Response, Router } from "express";

const router = Router();

//Get user by id method
router.get("/:id", (req: Request, res: Response) => {
  res.send("Get user by id method");
});

//Get all users method
router.get("/", (req: Request, res: Response) => {
  res.send("Get all users method");
});

//Create user method
router.post("/", (req: Request, res: Response) => {
  res.send("Create method");
});

//Update user method
router.put("/:id", (req: Request, res: Response) => {
  res.send("Update method");
});

//Delete user method
router.delete("/:id", (req: Request, res: Response) => {
  res.send("Delete method");
});

export default router;
