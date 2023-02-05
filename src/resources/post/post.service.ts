import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';
import dbConnect from '@/middleware/dbconnect.middleware';

class PostService {
    private post = PostModel;
    /*
    Create a post
    */
    connect: dbConnect;
    constructor() {
    }
    public async create(title: string, body: string): Promise<Post> {
        try {
            this.connect = new dbConnect();
            this.connect.connect();
            const post = await this.post.create({ title, body });
            return post;
        } catch (error) {
            throw new Error('Unable to create Post');
        } finally {
            this.connect.disconnect();
        }
    }
    public async get(): Promise<Post[]> {
        try {
            const post = await this.post.find();
            return post;
        } catch (error) {
            throw new Error('Unable to create Post');
        }
    }
}

export default PostService;