const { Sequelize, where } = require("sequelize");
const { Op } = require("sequelize");
const model = require("../models/index");
const Post = model.Posts;
class PostsActions {
    async GetAllPosts() {
        const postsList = await Post.findAll();
        return postsList;
    }
    async CreatePosts(posts) {
        const newPosts = await Post.create(posts);
        return newPosts;
    }
    async EditPosts(id, dataPosts) {
        const posts = await Post.findByPk(id);
        await posts.update({
            title: dataPosts.title,
            content: dataPosts.content,
        });
    }
    async DeletePosts(id) {
        await Post.destroy({
            where: {
                id,
            },
        });
    }
}

module.exports = new PostsActions();
