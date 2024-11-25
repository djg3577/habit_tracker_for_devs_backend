import jwt from "jsonwebtoken";

export interface JWTPayload {
  userId: number;
  // Add any other claims you need
  [key: string]: any;
}

/**
 * Validates a JWT token and returns the user ID
 * @param tokenString The JWT token to validate
 * @returns The user ID from the token payload
 * @throws Error if token is invalid
 */
export const validateJWT = async (tokenString: string): Promise<number> => {
  try {
    const jwtKey = process.env.JWT_KEY;
    console.log(tokenString, jwtKey);
    // Verify the token and get the decoded payload
    const decoded = jwt.verify(tokenString, jwtKey, {
      algorithms: ["HS256"], // Specify the algorithm explicitly
    }) as JWTPayload;
    console.log(decoded);
    if (!decoded || typeof decoded.userId !== "number") {
      throw new Error("Invalid token payload");
    }

    return decoded.userId;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // Handle specific JWT errors
      switch (error.name) {
        case "TokenExpiredError":
          throw new Error("Token has expired");
        case "JsonWebTokenError":
          throw new Error("Invalid token");
        case "NotBeforeError":
          throw new Error("Token not yet active");
        default:
          throw new Error(`JWT validation error: ${error.message}`);
      }
    }

    // Handle any other errors
    throw new Error("Failed to validate token");
  }
};
