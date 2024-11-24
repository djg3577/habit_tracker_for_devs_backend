import { Application } from "express";
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import routes from "../api/routes";

export default ({ app }: { app: Application }) => {
  // Configure CORS with specific options
  app.use(cors({
    origin: ['http://localhost:5173', 'https://github.com'], // Add your frontend URL and GitHub
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }));

  // Handle preflight requests
  app.options('*', cors());

  // flexibility on PUT POST DELETE calls
  app.use(require("method-override")());

  // Increase payload limit if needed
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

  // Configure cookie parser with options if needed
  app.use(cookieParser());

  // ALL API
  app.use('/api', routes()); // Add /api prefix to match your baseURL
};
