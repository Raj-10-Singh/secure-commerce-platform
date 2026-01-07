require("dotenv").config(); // MUST be first

const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const app = express();

// Database connection
require("./config/mongoose-connection");

// Routes
const index = require("./routes/index");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const ownerRoutes = require("./routes/ownerRoute");
const cartRoutes = require("./routes/cart");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // separate from JWT
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

app.use(flash());

// Flash messages middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// View engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", index);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/owner", ownerRoutes);

// Health check (IMPORTANT for deployment)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Dynamic PORT (REQUIRED)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
