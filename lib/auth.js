import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "rupal-admin-secret-key";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/admin_token=([^;]+)/);
  return match ? match[1] : null;
}

export function isAdminAuthenticated(request) {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded?.role === "admin";
}
