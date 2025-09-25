// // import { Router } from "express";
// // import { studentSignup, createUserByAdmin, login } from "../controllers/auth";
// // import { adminOnly } from "../middleware/authMiddleware";
// // import { createUser, setPassword } from "../controllers/adminController";

// // const router = Router();

// // // Student signup
// // router.post("/signup/student", studentSignup);

// // // Admin creates teacher/parent
// // router.post("/signup/admin", adminOnly, createUserByAdmin);

// // // Login
// // router.post("/login", login);


// // // Admin creates teacher/parent/admin
// // router.post("/create-user", adminOnly, createUser);

// // // User sets their own password
// // router.post("/set-password/:token", setPassword);

// // export default router;


// import { Router } from "express";
// import { studentSignup, createUserByAdmin, login, setPassword } from "../controllers/auth";
// import { adminOnly } from "../middleware/authMiddleware";

// const router = Router();

// // Student signup
// router.post("/signup/student", studentSignup);

// // Admin creates teacher/parent/admin
// router.post("/signup/admin", adminOnly, createUserByAdmin);

// // Login
// router.post("/login", login);

// // Set password link
// router.post("/set-password/:token", setPassword);

// export default router;

// // routes/auth.ts
// import { Router } from "express";
// import { studentSignup, createUserByAdmin, login, setPassword } from "../controllers/auth";
// import { adminOnly } from "../middleware/authMiddleware";

// const router = Router();

// router.post("/signup/student", studentSignup);
// router.post("/signup/admin", adminOnly, createUserByAdmin); // admin creates teacher/parent/admin
// router.post("/set-password/:token", setPassword);
// router.post("/login", login);

// export default router;

import { Router } from "express";
import { studentSignup, createUserByAdmin, login, setupPassword } from "../controllers/auth";
import { adminOnly } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup/student", studentSignup);
router.post("/signup/admin", adminOnly, createUserByAdmin); // Admin creates teacher/parent/admin
router.post("/login", login);
router.post("/setup-password", setupPassword);

export default router;

