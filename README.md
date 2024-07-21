# React Simple Blog Project (Simply Blog)

This is a simple blog project made using React.js.

## Image showcase

You may also view the screenshots of the project in the Public folder

Desktop Version
![Simply Blog Desktop Screenshot](/public/simply-blog.png)

Mobile Version
![Simply Blog Mobile Screenshot](/public/simply-blog-mobile.png)

## Installation and Setup

Requires `node` and `npm` installed globally on your machine

Install Dependencies

```
npm install
```

This project uses JSON Server for a mock backend

JSON-Server: http://localhost:8000

```
npm run server
```

Run Vite Frontend: http://localhost:5173

```
npm run dev
```

## Reflection

This is a CRUD project using React.js and JSON-Server for a mock backend.

The goal of this project is to implement my learning using React.js. While working on the project, I've also used [react-router](https://reactrouter.com/en/main), [react-hook-form](https://react-hook-form.com/) and [Tiptap](https://tiptap.dev/).

React-router was used for navigating between pages and I had also learned about how loaders and action were used. Although, in the end I did not use actions in my project due to some difficulties I was facing with react-hook-form.

React-hook-form was used for writing a new blog post and updating the blog post. I do not have a clue on the right way to implement an add post/update post and started using react-hook-form without much knowledge. It does not seems to be necessary in this project but I decided to stick to it to learn and understand how it works even though the usage was low.

Tiptap was used to implement a rich text editor for user to write post with simple formatting. It was quite a learning experience, took me about three days to figure it out properly. Especially when implementing the "link" format. It was tricky.

### Difficulties Faced

I had major difficulties with writing and updating the post to the JSON server due to react-router and react-hook-form. Since they both uses the form differently I had to figure out how to make them work together. In the end, I drop using actions from react-router and use react-hook-form onSubmit which I then added a async function to fetch the JSON.
