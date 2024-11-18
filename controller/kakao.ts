import { Request, Response } from "express";
import KakaoService from "../services/kakao";
import connection from "../db";
interface DecodedToken {
  user_id: number;
  iat: number;
  exp: number;
}
interface AuthRequest extends Request {
  user?: DecodedToken;
}
class KakaoController {
  private kakaoService: KakaoService;

  constructor() {
    this.kakaoService = new KakaoService(connection);
  }

  public redirectToKakaoLogin = (req: Request, res: Response) => {
    try {
      const { redirectUri } = req.query;
      const kakaoAuthURL = this.kakaoService.getKakaoAuthURL(
        redirectUri as string
      );
      res.redirect(kakaoAuthURL);
    } catch (error) {
      console.error("Failed to generate Kakao login URL:", error);
      res.status(500).json({ error: "Failed to generate Kakao login URL" });
    }
  };

  public handleKakaoCallback = async (req: Request, res: Response) => {
    console.log(req);
    try {
      const { code } = req.query;
      if (!code || typeof code !== "string") {
        return res
          .status(400)
          .json({ error: "Authorization code is required" });
      }

      const result = await this.kakaoService.processKakaoCallback(code);
      res.json(result);
    } catch (error) {
      console.error("Kakao callback error:", error);
      res.status(500).json({ error: "Failed to process Kakao login" });
    }
  };

  public getProfile = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user?.user_id) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const profile = await this.kakaoService.getUserProfile(req.user.user_id);
      res.json(profile);
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  };
}

export default KakaoController;
