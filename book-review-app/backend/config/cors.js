const corsOption = {
  origin: "http://localhost:5173/",
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

export default corsOption;
