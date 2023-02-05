import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validate';
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();
    constructor() {
        this.intialiseRoutes();
    }
    private intialiseRoutes(): void {
        this.router.post(
            `${this.path}`, validationMiddleware(validate.create),this.create
        );
        this.router.get(
            `${this.path}`, this.get
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body);
            res.status(201).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const post = await this.PostService.get();
            res.status(201).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default PostController;
