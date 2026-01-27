const posts = [
    {id: 1, title: "Post One"},
    {id: 2, title: "Post Two"},
    {id: 3, title: "Post Three"}
]

const getPosts = () => {
    return posts;
}

export const getPostLength = () => {
    return posts.length;
}

export default getPosts; // No curly braces when exporting a single entity (default) or when importing it